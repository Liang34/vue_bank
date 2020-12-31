<template>
  <div class="warp">
    <el-button @click="back">&lt;返回</el-button>
    <el-table
    :data="tableData"
    height="500px"
    border
    stripe>
    <el-table-column
      prop="dno"
      label="储户编号"
      width="150">
    </el-table-column>
    <el-table-column
      prop="dname"
      label="储户姓名"
      width="150">
    </el-table-column>
    <el-table-column
      prop="didcard"
      label="身份证"
      width="250">
    </el-table-column>
    <el-table-column
      prop="daddress"
      label="地址">
    </el-table-column>
    <el-table-column
      prop="dphone"
      label="联系电话"
      width="180">
    </el-table-column>
    <el-table-column
      prop="dsex"
      label="性别"
      width="100">
    </el-table-column>
    <el-table-column
      prop="bno"
      label="银行卡号"
      width="250">
    </el-table-column>
    <el-table-column
      prop="btype"
      label="银行卡类型"
      width="100">
    </el-table-column>
    <el-table-column
      prop="status"
      label="银行卡状态"
      width="100">
    </el-table-column>
  </el-table>
  </div>
</template>

<script>
import { queryAllUser } from '../../../api/admin/option'
export default {
  data () {
    return {
      tableData: [
        // {
        //   dno: '603604', // 储户编号
        //   dname: '111111', // 姓名
        //   didcard: '11111111111111111111', // 身份证
        //   daddress: '广东省广州市广东省广州市', // 地址
        //   dphone: '11111111111', // 联系电话
        //   dsex: '男',
        //   bno: '111111111111111',
        //   btype: '活期用户',
        //   status: '正常'
        // }
      ]
    }
  },
  async mounted () {
    const res = await queryAllUser()
    if (res.code === '0') {
      const userArray = res.data.t
      for (let i = 0; i < userArray.length; i++) {
        const obj = {}
        obj.dno = userArray[i].dno
        obj.dname = userArray[i].dname
        obj.didcard = userArray[i].didcard
        obj.daddress = userArray[i].daddress
        obj.dphone = userArray[i].dphone
        obj.dsex = userArray[i].dsex === true ? '男' : '女'
        obj.bno = userArray[i].bno
        obj.btype = userArray[i].btype
        if (userArray[i].status === '0') {
          obj.status = '正常'
        } else if (userArray[i].status === '1') {
          obj.status = '挂失'
        } else if (userArray[i].status === '2') {
          obj.status = '冻结'
        } else if (userArray[i].status === '3') {
          obj.status = '销户'
        }
        this.tableData.push(obj)
      }
    }
  },
  methods: {
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
  width: 95%;
}
.el-button {
  position: relative;
  right: 45%;
  top: 8%;
}
</style>
