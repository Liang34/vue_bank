<!--  -->
<template>
  <div>
    <el-container class="warp">
      <el-aside width="400px">
        <img src="./login.jpg" class="logo"/>
      </el-aside>
      <el-main>
        <p class="bigtitle">请插入您的卡</p>
        <p class="mintitle">Please Insert Your Card</p>
        <img src="./card.png" class="card"/>
      <el-input v-model="account" placeholder="请输入号码数为19的银行卡，只支持输入数字" oninput="value=value.replace(/[^\d]/g,'')"></el-input>
      <el-button type="primary" @click="checkInput">确认</el-button>
    </el-main>
  </el-container>
  <Footer @selectNum="inputNum" @selectOpt="selectOpt"/>
  </div>
</template>

<script>
import Footer from '../../components/input/Footer'
export default {
  data () {
    return {
      account: ''
    }
  },
  methods: {
    // 收集数据，跳转组件
    checkInput () {
      if (this.account.trim().length !== 19) {
        this.$alert('请输入正确的银行卡账号', 'error', {
          confirmButtonText: '确定'
        })
      } else {
        this.$router.push(`/login/${this.account.trim()}`)
      }
    },
    inputNum (val) {
      this.account += val
    },
    selectOpt (opt) {
      if (opt === 'Enter') {
        this.checkInput()
      } else if (opt === 'Clear') {
        this.account = ''
      } else if (opt === 'Cancel') {
        this.account = this.account.substring(0, this.account.length - 1)
      }
    }
  },
  components: {
    Footer
  }
}

</script>
<style lang='scss' scoped>
.warp {
  background-color: #3650A5;
  height: 520px;
  overflow: hidden;
}
.el-aside {
  margin-top: 30px;
  margin-bottom: 30px;
  margin-left: 200px;
}
.el-main {
  margin-top: 100px;
  text-align: center;
  color: white;
}
.bigtitle {
  font-size: 40px;
  margin-bottom: 10px;
}
.mintitle {
  font-size: 30px;
  margin-bottom: 60px;
}
.card {
  margin: auto;
  display: block;
}
.el-input {
  margin: auto;
  width: 500px;
  margin-top: 20px;
  display: inline-block;
}
.el-button{
  margin-left: 5px;;
}
.logo {
  display: block;
  width: 100%;
  height: 100%;
}
</style>
