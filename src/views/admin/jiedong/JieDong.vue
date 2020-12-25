<!--  -->
<template>
  <div class="warp">
    <h3 class="title">欢迎来到后台管理系统</h3>
    <div class="form">
      <h5>请输入账号与身份证</h5>
      <el-input v-model="Bno" placeholder="请输入解冻账号" oninput="value=value.replace(/[^\d]/g,'')"></el-input>
      <el-input v-model="Didcard" placeholder="请输入持卡人身份证" oninput="value=value.replace(/[^\d]/g,'')"></el-input>
      <el-button @click="back">返回</el-button>
      <el-button @click="submit">提交</el-button>
    </div>
  </div>
</template>

<script>
import { updateState } from '../../../api/admin/option'
export default {
  data () {
    return {
      Bno: '', // 挂失a账号
      Didcard: '' // 身份证号
    }
  },
  methods: {
    back () {
      this.$router.replace('/adminMain')
    },
    async submit () {
      if (this.Bno.trim().length !== 19 || this.Didcard.trim().length !== 18) {
        this.$alert('输入有误，请重新输入', 'error', {
          confirmButtonText: '确定'
        })
        return
      }
      const res = await updateState(this.Bno, this.Didcard, 0)
      if (res.code === '0') {
        this.$alert('成功解冻', 'success', {
          confirmButtonText: '确定'
        })
        this.$router.replace('/adminMain')
      } else {
        this.$alert(res.msg, 'error', {
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
  overflow: hidden;
}
.title {
  color: #fcfcfc;
  font-size: 60px;
  padding-top: 20px;
  box-sizing: border-box;
}
.form {
  width: 400px;
  height: 400px;
  border: solid 1px;
  border-radius: 15px;
  background-color: #fcfcfc;
  opacity: .9;
  margin: 100px auto;
}
.el-input {
  width: 300px;
  display: block;
  margin: auto;
  margin-bottom: 30px;
}
h5 {
  margin-top: 60px;
  font-size: 30px;
  margin-bottom: 50px;
}
</style>
