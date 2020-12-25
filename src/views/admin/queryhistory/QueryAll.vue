<!-- 显示交易记录 -->
<template>
<div>
    <div class="warp">
        <div class="form1">
          <el-button @click="back">返回</el-button>
          <el-select v-model="times" placeholder="请选择交易的时间">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-button @click="submit">提交</el-button>
        </div>
    <el-table
    :data="tableData"
    border height="500">
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
    <el-table-column
      prop="Orign"
      label="源账号"
      width="180">
    </el-table-column>
  </el-table>
  </div>
  <Footer/>
</div>
</template>

<script>
import { queryBankTrans } from '../../../api/admin/option'
export default {
  data () {
    return {
      tableData: [
        // {
        //   Tno: '2016-05-02',
        //   Ttype: '取款',
        //   Tamount: '1000',
        //   Ttime: '2020.12.12',
        //   Poundage: '100',
        //   Tartget: '1234567891234567891',
        //   Orign: '1234567891234567892'
        // }
      ],
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
      times: ''
    }
  },
  methods: {
    async submit () {
      if (!this.times) {
        this.$alert('请选择正确的交易时间', '错误', {
          confirmButtonText: '确定'
        })
        return
      }
      // const endDate = new Date()
      // let startTime = null
      // console.log(endDate)
      // if (this.$route.params.times === '0') { // 进一周
      //   startTime = new Date(endDate - 1000 * 60 * 60 * 24 * 7)
      //   console.log(startTime)
      // } else if (this.$route.params.times === '1') { // 近一月
      //   // 获取三十天前日期
      //   startTime = new Date(endDate - 1000 * 60 * 60 * 24 * 30) // 最后一个数字30可改，30天的意思
      //   console.log(startTime)
      // } else if (this.$route.params.times === '2') { // 近一年
      //   startTime = new Date(endDate - 1000 * 60 * 60 * 24 * 365)
      //   console.log(startTime)
      // }
      const res = await queryBankTrans(this.times)
      if (res.code === '0') {
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
            temp.Orign = tempArr[i].bno
            this.tableData.push(temp)
          }
        }
      }
    },
    back () {
      this.$router.back()
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
  top: 220px;
  left: 50%;
  transform: translateX(-50%);
  width: 1000px;
}
.form1 {
  position: absolute;
  top: 150px;
  left: 50%;
  transform: translateX(-50%);
  width: 600px;
  display: block;
}
.el-select {
  margin-right: 20px;
  margin-left: 20px;
}
</style>
