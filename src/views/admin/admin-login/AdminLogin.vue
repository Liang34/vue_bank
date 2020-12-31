<!--  -->
<template>
  <div class="warp">
    <div class="form">
      <p> 请输入账号和密码 </p>
      <el-input placeholder="请输入管理员账号" v-model="adminNum" oninput="value=value.replace(/[^\d]/g,'')"></el-input>
      <el-input placeholder="请输入管理员密码" v-model="adminPassword" show-password></el-input>
      <el-button round @click="reset">重置</el-button>
      <el-button round @click="comfirm">确定</el-button>
    </div>
  </div>
</template>

<script>
import { adminLogin } from '../../../api/admin/login'
export default {
  data () {
    return {
      adminNum: '',
      adminPassword: ''
    }
  },
  methods: {
    async comfirm () {
      if (this.adminNum.trim().length !== 5 || this.adminPassword.trim().length !== 10) {
        this.$alert('账号密码格式有误，请重新输入', '错误', {
          confirmButtonText: '确定'
        })
        return
      }
      const res = await adminLogin(this.adminNum, this.adminPassword)
      if (res.code === '0') {
        this.$router.replace('/adminMain')
      } else {
        this.$alert('账号或密码错误，请重新再试，请重新输入', '错误', {
          confirmButtonText: '确定'
        })
      }
    },
    reset () {
      this.adminNum = ''
      this.adminPassword = ''
    }
  }
}

</script>
<style lang='scss' scoped>
.warp {
  height: 650px;
  background: url('../admin.png') no-repeat;
  background-size:100%;
}
.form {
  text-align: center;
  height: 400px;
  width: 400px;
  position: relative;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: #fcfcfc;
  border: solid 1px;
  border-radius: 15px;
  opacity: .95;
  padding-top: 20px;
  box-sizing: border-box;
}
p {
  margin-bottom: 60px;
  font-size: 25px;
}
.el-input {
  margin: 10px auto;
  display: block;
  width: 350px;
  background-color: #fcfcfc;
  font-weight: 700;
}
.el-button {
  margin-top: 30px;
}
</style>
