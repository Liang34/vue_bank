<!--  -->
<template>
  <div>
    <el-container>
    <el-button @click="back" class="left">取消</el-button>
    <el-main>
        <h3>请输入旧密码</h3>
        <span>Please Input The Old Password</span>
        <el-input v-model="password" placeholder="请输入旧密码" oninput="value=value.replace(/[^\d]/g,'')" type="password"></el-input>
    </el-main>
      <el-button @click="comfirm" class="right">确认</el-button>
  </el-container>
  <Footer @selectNum="inputNum" @selectOpt="selectOpt"/>
  </div>
</template>

<script>
import Footer from '../../components/input/Footer'
import { checkPassword } from '../../api/user/login'
export default {
  data () {
    return {
      password: ''
    }
  },
  methods: {
    back () {
      this.$router.back()
    },
    async comfirm () {
      if (this.password.trim().length !== 6) {
        this.$alert('密码格式不正确，请重新输入', '错误', {
          confirmButtonText: '确定'
        })
        return
      }
      // 取出用户的idcard
      const account = sessionStorage.getItem('card')
      const res = await checkPassword(account, this.password)
      // 跳转到新密码页面
      if (res.code === '0') {
        this.$router.replace('/newPassword')
      } else if (res.code === '1') {
        this.$alert('密码错误，请重新输入', '错误', {
          confirmButtonText: '确定'
        })
      }
    },
    inputNum (val) {
      this.password += val
    },
    selectOpt (opt) {
      if (opt === 'Enter') {
        this.comfirm()
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
h3 {
  font-size: 30px;
  width: 200px;
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
</style>
