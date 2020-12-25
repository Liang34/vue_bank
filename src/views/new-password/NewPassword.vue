<!--  -->
<template>
  <div>
    <el-container>
      <el-button @click="back" class="left">取消</el-button>
    <el-main>
        <h3>请输入新密码</h3>
        <span>Please Input The New Password</span>
        <el-input v-model="password1" placeholder="请输入密码" type="password" oninput="value=value.replace(/[^\d]/g,'')"></el-input>
        <span>请确认密码</span>
        <el-input v-model="password2" placeholder="请输入密码" type="password" oninput="value=value.replace(/[^\d]/g,'')"></el-input>
    </el-main>
      <el-button @click="comfirm" class="right">确认</el-button>
  </el-container>
  <Footer @selectNum="inputNum" @selectOpt="selectOpt"/>
  </div>
</template>

<script>
import Footer from '../../components/input/Footer'
import { resetPassword } from '../../api/user/option'
export default {
  data () {
    return {
      password1: '',
      password2: ''
    }
  },
  methods: {
    back () {
      this.$router.back()
    },
    async comfirm () {
      // this.$router.replace('/newPassword')
      // 发送ajax
      if (this.password1 !== this.password2) {
        this.$alert('两次密码不一致，请重新输入', 'error', {
          confirmButtonText: '确定'
        })
        return
      }
      const result = await resetPassword(this.password1)
      if (result.code === '0') {
        this.$alert('成功，请重新登录', 'success', {
          confirmButtonText: '确定'
        })
        this.$router.replace('/')
      } else {
        this.$alert(result.msg, 'error', {
          confirmButtonText: '确定'
        })
      }
    },
    inputNum (val) {
      if (this.password1.length >= 6 && this.password2.length < 6) {
        this.password2 += val
      } else if (this.password1.length < 6) {
        this.password1 += val
      }
    },
    selectOpt (opt) {
      if (opt === 'Enter') {
        this.checkInput()
      } else if (opt === 'Clear') {
        this.password = ''
      } else if (opt === 'Cancel') {
        this.password = this.password.substring(0, this.password.length - 1)
      }
    }
  },
  components: {
    Footer
  }
}

</script>
<style lang='scss' scoped>
.el-container {
  background-color: #3650A5;
  height: 520px;
  overflow: hidden;
}
.el-main {
  margin-top: 80px;
  color: white;
  // text-shadow: 0 0 0.2em rgb(230, 69, 182), 0 0 0.2em rgb(109, 76, 161);
}
.right {
  margin-left: 120px;
}
h3 {
  font-size: 30px;
  width: 230px;
  margin: 40px auto;
}
span {
  display: block;
  width: 280px;
  margin: 20px auto;
}
.el-input {
  display: block;
  width: 300px;
  margin: auto;
}
.right {
  position: absolute;
  right: 20px;
  top: 560px;
  width: 100px;
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
