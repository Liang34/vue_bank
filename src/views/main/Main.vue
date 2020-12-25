<!-- 主界面 -->
<template>
  <div>
    <div class="main">
    <el-container>
      <el-aside width="200px">
          <el-button @click="queryBalance">查询余额</el-button>
          <el-button @click="queryTrans">交易查询</el-button>
          <el-button @click="editPassowrd">修改密码</el-button>
      </el-aside>
      <el-main>
          <h3>请选择所需服务</h3>
          <h3>Please Select Service</h3>
          <el-button @click="exit">退卡</el-button>
      </el-main>
      <el-aside width="200px">
          <el-button @click="getMoneny" :disabled='isDongjie'>取款</el-button>
          <el-button @click="saveMoneny">存款</el-button>
          <el-button @click="transform" :disabled='isDongjie'>转账</el-button>
      </el-aside>
    </el-container>
    </div>
    <Footer/>
  </div>
</template>

<script>
import Footer from '../../components/input/Footer'
import { logout } from '../../api/user/login'
export default {
  data () {
    return {
      // 存储用户数据
      isDongjie: false
    }
  },
  mounted () {
    if (sessionStorage.getItem('dongjie')) {
      this.isDongjie = true
    }
  },
  methods: {
    getMoneny () {
      this.$router.push('/getMoneny')
    },
    saveMoneny () {
      this.$router.push('/saveMoneny')
    },
    transform () {
      this.$router.push('/transform')
    },
    queryBalance () {
      this.$router.push('/queryBalance')
    },
    queryTrans () {
      this.$router.push('/queryTrans')
    },
    editPassowrd () {
      this.$router.push('/editPassowrd')
    },
    // 退卡
    async exit () {
      const res = await logout()
      if (res.code === '0') {
        sessionStorage.clear()
        this.$router.push('/')
      } else {
        this.$alert('登出失败，请重新再试', '错误', {
          confirmButtonText: '确定'
        })
      }
    }
  },
  components: {
    Footer
  }
}
</script>
<style lang='scss' scoped>
.main {
  background-color: #3650A5;
  height: 520px;
  overflow: hidden;
}
.el-aside {
   color: #333;
   text-align: center;
   margin: 50px;
   margin-top: 100px;
   // line-height: 200px;
 }
 .el-main {
   color: #333;
   text-align: center;
   line-height: 160px;
 }
.el-button+.el-button {
   margin: 10px auto;
   display: block;
   margin-top: 100px;
 }
 .el-main {
   color: white;
 }
 .el-button {
  width: 150px;
  height: 50px;
  font-size: 20px;
  border-radius: 15px;
  background-color: rgb(99, 69, 233);
  color: white;
 }
 h3 {
  color: white;
  font-size: 30px;
  margin-top: 10px;
  // text-shadow: 0 0 0.2em rgb(230, 69, 182), 0 0 0.2em rgb(109, 76, 161)
 }
</style>
