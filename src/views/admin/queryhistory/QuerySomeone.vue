<template>
  <div class="warp">
        <div class="form1">
          <el-button @click="back">返回</el-button>
          <el-input v-model="bno" placeholder="请输入需要查询的账号"  class="input" oninput="value=value.replace(/[^\d]/g,'')"></el-input>
          <el-date-picker
            v-model="value2"
            type="daterange"
            align="right"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions">
          </el-date-picker>
          <el-button @click="submit" class="su">提交</el-button>
        </div>
    <el-table :data="tableData" border height="450">
      <el-table-column
        prop="Tno"
        label="交易编号"
        width="180">
      </el-table-column>
      <el-table-column
        prop="Ttype"
        label="交易类型">
      </el-table-column>
      <el-table-column
        prop="Tamount"
        label="交易金额">
      </el-table-column>
      <el-table-column
        prop="Ttime"
        label="交易时间"
        width="190">
      </el-table-column>
      <el-table-column
        prop="Poundage"
        label="手续费">
      </el-table-column>
      <el-table-column
        prop="Tartget"
        label="目标账号"
        width="180">
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { queryUserTrans } from '../../../api/admin/option'
export default {
  data () {
    return {
      bno: '',
      options: [
        {
          value: '0',
          label: '近一周的交易'
        },
        {
          value: '1',
          label: '近一月的交易'
        },
        {
          value: '2',
          label: '近一年的交易'
        }
      ],
      tableData: [
        // {
        //   Tno: '2016-05-02',
        //   Ttype: '取款',
        //   Tamount: '1000',
        //   Ttime: '2020.12.12',
        //   Poundage: '100',
        //   Tartget: '1234567891234567891'
        // }
      ],
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      },
      value2: ''
    }
  },
  methods: {
    dateFormat (fmt, date) {
      let ret
      const opt = {
        'Y+': date.getFullYear().toString(), // 年
        'm+': (date.getMonth() + 1).toString(), // 月
        'd+': date.getDate().toString(), // 日
        'H+': date.getHours().toString(), // 时
        'M+': date.getMinutes().toString(), // 分
        'S+': date.getSeconds().toString() // 秒
        // 有其他格式化字符需求可以继续添加，必须转化成字符串
      }
      for (const k in opt) {
        ret = new RegExp('(' + k + ')').exec(fmt)
        if (ret) {
          fmt = fmt.replace(ret[1], (ret[1].length === 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, '0')))
        }
      }
      return fmt
    },
    back () {
      this.$router.back()
    },
    async submit () {
      if (this.value2.length !== 2 || this.bno.trim().length !== 19) {
        this.$alert('请输入正确的账号及选择正确的交易时间', '错误', {
          confirmButtonText: '确定'
        })
        return
      }
      // const endDate = new Date()
      // let startTime = null
      // console.log(endDate)
      // if (this.times === '0') { // 进一周
      //   startTime = new Date(endDate - 1000 * 60 * 60 * 24 * 7)
      //   console.log(startTime)
      // } else if (this.times === '1') { // 近一月
      //   // 获取三十天前日期
      //   startTime = new Date(endDate - 1000 * 60 * 60 * 24 * 30) // 最后一个数字30可改，30天的意思
      //   console.log(startTime)
      // } else if (this.times === '2') { // 近一年
      //   startTime = new Date(endDate - 1000 * 60 * 60 * 24 * 365)
      //   console.log(startTime)
      // }
      this.value2[0] = this.dateFormat('YYYY-mm-dd HH:MM', this.value2[0])
      this.value2[1] = this.dateFormat('YYYY-mm-dd HH:MM', this.value2[1])
      const res = await queryUserTrans(this.bno, this.value2[0], this.value2[1])
      if (res.code === '0') {
        this.isShow = false
        if (res.data.t) {
          const tempArr = res.data.t
          for (let i = 0; i < tempArr.length; i++) {
            const temp = {}
            temp.Tno = tempArr[i].tno
            if (tempArr[i].ttype === '0') {
              temp.Ttype = '取款'
            } else if (tempArr[i].ttype === '1') {
              temp.Ttype = '存款'
            } else if (tempArr[i].ttype === '2') {
              temp.Ttype = '转入金额'
            } else if (tempArr[i].ttype === '3') {
              temp.Ttype = '转出金额'
            }
            temp.Tamount = tempArr[i].tamount
            temp.Ttime = tempArr[i].ttime.split('T')[0].split('-')[0] + '年' + tempArr[i].ttime.split('T')[0].split('-')[1] + '月' + tempArr[i].ttime.split('T')[0].split('-')[2] + '日' + tempArr[i].ttime.split('T')[1].split(':')[0] + '时' + tempArr[i].ttime.split('T')[1].split(':')[1] + '分'
            temp.Poundage = tempArr[i].poundage
            temp.Tartget = tempArr[i].target
            this.tableData.push(temp)
          }
        }
      } else {
        this.$alert(res.msg, '错误', {
          confirmButtonText: '确定'
        })
      }
    }
  }
}

</script>
<style lang='scss' scoped>
.warp {
  height: 650px;
  background: url("../admin.png") no-repeat;
  background-size: 100%;
  text-align: center;
}
.el-table {
  position: absolute;
  top: 250px;
  left: 50%;
  transform: translateX(-50%);
  width: 800px;
}
.form1 {
  position: absolute;
  top: 150px;
  left: 50%;
  transform: translateX(-50%);
  display: block;
  width: 1000px;
}

.el-date-picker {
  margin-right: 40px;
  margin-left: 20px;
}

.input {
  margin: 20px;
  display: inline-block;
  width: 300px;
}
.su {
  margin-left: 20px;
}
</style>
