<!--  -->
<template>
  <div>
    <el-container v-if="!showGif">
    <el-aside width="200px">
      <el-button @click="saveMoneny(200)">2&nbsp;0&nbsp;0</el-button>
      <el-button @click="saveMoneny(500)">5&nbsp;0&nbsp;0</el-button>
      <el-button @click="saveMoneny(1000)">1,000</el-button>
      <el-button @click="back">返&nbsp;回</el-button>
    </el-aside>
    <el-main>
      <h3>请选择或输入存款金额</h3>
      <span>Please Select Or Enter Amount</span>
      <el-input v-model="moneny" placeholder="请输入存款金额" oninput="value=value.replace(/[^\d]/g,'')"></el-input>
      <p>本机目前仅接收100元纸币,</p>
      <p>数目必须是100元的整数倍,</p>
      <p>每日单笔存款限度额为10,000元,</p>
      <p>￥100 Is Accept,</p>
      <p>Account Limitation Is ￥10,000</p>
    </el-main>
    <el-aside width="200px">
      <el-button @click="saveMoneny(2000)">2,000</el-button>
      <el-button @click="saveMoneny(3000)">3,000</el-button>
      <el-button @click="saveMoneny(5000)">5,000</el-button>
      <el-button @click="comfirm">确&nbsp;定</el-button>
    </el-aside>
  </el-container>
  <el-container v-if="showGif">
    <el-main>
      <h3>存钞中，请稍后</h3>
      <img src="./save_moneny.gif" alt="moneny"/>
    </el-main>
  </el-container>
  <Footer @selectNum="inputNum" @selectOpt="selectOpt"/>
  </div>
</template>

<script>
import Footer from '../../components/input/Footer'
import { deposit } from '../../api/user/option'
export default {
  data () {
    return {
      moneny: '',
      showGif: false
    }
  },
  methods: {
    async comfirm () {
      if (this.moneny === '') {
        this.$alert('请输入金额', 'error', {
          confirmButtonText: '确定'
        })
        return
      } else if (this.moneny < 0 || this.moneny % 100 !== 0 || this.moneny > 10000) {
        this.$alert('输入金额非法', 'error', {
          confirmButtonText: '确定'
        })
        return
      }
      this.showGif = true
      const result = await deposit(this.moneny)
      if (result.code === '0') {
        this.$alert(`存款成功, 当前账户余额为${result.data.balance}， 可用余额为${result.data.bamount}`, 'success', {
          confirmButtonText: '确定'
        })
        this.showGif = false
      } else if (result.code === '1') {
        this.$alert(result.msg, 'error', {
          confirmButtonText: '确定'
        })
        this.showGif = false
      }
    },
    saveMoneny (val) {
      this.moneny = val
    },
    back () {
      this.$router.back()
    },
    inputNum (val) {
      this.moneny += val
    },
    selectOpt (opt) {
      if (opt === 'Enter') {
        this.comfirm()
      } else if (opt === 'Clear') {
        this.moneny = ''
      } else if (opt === 'Cancel') {
        this.moneny = this.moneny.substring(0, this.moneny.length - 1)
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
.el-aside {
  text-align: center;
}
.el-main {
  margin-top: 80px;
  color: white;
  text-align: center;
}
.el-button {
  display: block;
  margin: 60px !important;
  width: 100px;
  height: 50px;
  font-size: 20px;
  border-radius: 15px;
  background-color: rgb(99, 69, 233);
  color: white;
}
h3 {
  margin: 0 auto;
  font-size: 35px;
  width: 360px;
  margin-bottom: 20px;
}
span {
  margin: 0 auto;
  width: 300px;
  font-size: 20px;
  margin-bottom: 20px;
  display: block;
}
.el-input {
  width: 300px;
  display: block;
  margin: 0 auto;
  margin-bottom: 80px;
}
p{
  margin: auto;
  width: 300px;
  line-height: 30px;
}
</style>
