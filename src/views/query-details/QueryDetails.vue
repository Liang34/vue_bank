<!-- 显示交易记录 -->
<template>
<div>
    <div class="warp">
    <el-table :data="tableData" border height="400">
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
  <el-button @click="$router.back()" class="left">返回</el-button>
  <el-button @click="$router.replace('/main')" class="right">回到主菜单</el-button>
  </div>
  <Footer/>
</div>
</template>

<script>
import Footer from '../../components/input/Footer'
import { queryTrans } from '../../api/user/option'
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
        //   Tartget: '1234567891234567891'
        // }
      ]
    }
  },
  async mounted () {
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
    const res = await queryTrans(this.$route.params.times)
    if (res.code === '0') {
      if (res.data.t) {
        const tempArr = res.data.t
        console.log(tempArr)
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
          // 格式化时间
          console.log(tempArr[i].ttime.split('T'))
          temp.Ttime = tempArr[i].ttime.split('T')[0].split('-')[0] + '年' + tempArr[i].ttime.split('T')[0].split('-')[1] + '月' + tempArr[i].ttime.split('T')[0].split('-')[2] + '日' + tempArr[i].ttime.split('T')[1].split(':')[0] + '时' + tempArr[i].ttime.split('T')[1].split(':')[1] + '分'
          temp.Poundage = tempArr[i].poundage
          temp.Tartget = tempArr[i].target
          this.tableData.push(temp)
        }
      }
    }
  },
  components: {
    Footer
  }
  // methods: {
  //   dateFormat (fmt, date) {
  //     let ret
  //     const opt = {
  //       'Y+': date.getFullYear().toString(),
  //       'm+': (date.getMonth() + 1).toString(),
  //       'd+': date.getDate().toString(),
  //       'H+': date.getHours().toString(),
  //       'M+': date.getMinutes().toString(),
  //       'S+': date.getSeconds().toString()
  //     }
  //     for (const k in opt) {
  //       ret = new RegExp('(' + k + ')').exec(fmt)
  //       if (ret) {
  //         fmt = fmt.replace(ret[1], (ret[1].length === 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, '0')))
  //       }
  //     }
  //     return fmt
  //   }
  // }
}

</script>
<style lang='scss' scoped>
.warp {
  background-color: #3650A5;
  height: 520px;
  overflow: hidden;
}
.el-table {
  position: absolute;
  top: 150px;
  left: 50%;
  transform: translateX(-50%);
  width: 800px;
}
.right {
  position: absolute;
  right: 20px;
  top: 560px;
  width: 150px;
  height: 50px;
  font-size: 20px;
  border-radius: 15px;
  background-color: rgb(99, 69, 233);
  color: white;
}
.left {
  position: absolute;
  left: 20px;
  top: 560px;
  width: 100px;
  height: 50px;
  font-size: 20px;
  border-radius: 15px;
  background-color: rgb(99, 69, 233);
  color: white;
}
</style>
