<!--  -->
<template>
  <div>
    <div class="warp">
    <div v-if="!hasData">
      <el-container>
        <el-main>
          <h3 class="China">正在读取IC卡数据，请稍后...</h3>
          <h3 class="English">Reading IC Card Data, Please Wait...</h3>
          <img class="card" src="./ard.png" />
        </el-main>
      </el-container>
    </div>
    <div v-if="hasData">
      <header>
        <span class="time">{{auth_time}}</span>
        <h3>请输入你的密码然后按下Enter键</h3>
        <h3>Please Input Your PIN And Press 'Enter'</h3>
        <!-- <span>请在{{auth_time}}秒内输入密码</span> -->
      </header>
      <main>
          <el-input v-model="password" placeholder="请输入密码" type="password"></el-input>
          <el-button class="exit" @click="exit">退卡</el-button>
          <el-button class="comfirm" @click="enter">确认</el-button>
      </main>
    </div>
  </div>
    <Footer @selectNum="inputNum" @selectOpt="selectOpt"/>
  </div>
</template>

<script>
import Footer from '../../components/input/Footer'
import { checkAccount, checkPassword } from '../../api/user/login'
export default {
  mounted () {
    // 获取参数this.$route.params.id
    this._checkAccount()
  },
  data () {
    return {
      hasData: false,
      password: '',
      auth_time: 0, // 倒计时
      authTimeTimer: '' // 定时器
    }
  },
  methods: {
    inputTime () {
      if (this.hasData) {
        this.auth_time = 60
        this.authTimeTimer = setInterval(() => {
          this.auth_time--
          if (this.auth_time <= 0) {
            alert('已超时,请重新输入账号')
            clearInterval(this.authTimeTimer)
            this.$router.replace('/')
          }
        }, 1000)
      }
    },
    exit () {
      clearInterval(this.authTimeTimer)
      this.$router.replace('/')
    },
    async enter () {
      if (this.password.trim().length !== 6) {
        this.$alert('密码格式有误', '错误', {
          confirmButtonText: '确定'
        })
        clearInterval(this.authTimeTimer)
        this.inputTime()
        return
      }
      clearInterval(this.authTimeTimer)
      // 发送ajax检验密码
      const res = await checkPassword(this.$route.params.id, this.password)
      if (res.code === '0') {
        // 存储姓名
        // sessionStorage.setItem('Dname', res.data.Dname)
        this.$router.replace('/main')
      } else if (res.code === '1') {
        if (res.msg === '1') { // 挂失
          this.$alert('抱歉，该账号已挂失，请更换账号', '挂失', {
            confirmButtonText: '确定'
          })
          this.$router.replace('/')
        } else if (res.msg === '2') { // 冻结
          this.$alert('该卡已经被冻结，你可以进行存钱，请联系管理员', '冻结', {
            confirmButtonText: '确定'
          })
          sessionStorage.setItem('dongjie', true)
          this.$router.replace('/main')
        } else if (res.msg === '3') { // 销户
          this.$alert('抱歉，该账号已经被销户，请更换账号', '销户', {
            confirmButtonText: '确定'
          })
          this.$router.replace('/')
        } else {
          this.$alert(`抱歉，你输入的密码有误，请重新输入，当前还剩${3 - res.data.errorCount}次机会`, '密码错误', {
            confirmButtonText: '确定'
          })
          clearInterval(this.authTimeTimer)
          this.inputTime()
        }
      }
    },
    inputNum (val) {
      this.password += val
    },
    selectOpt (opt) {
      if (opt === 'Enter') {
        this.checkInput()
      } else if (opt === 'Clear') {
        this.password = ''
      } else if (opt === 'Cancel') {
        this.password = this.password.substring(0, this.password.length - 1)
      }
    },
    async _checkAccount () {
      const result = await checkAccount(this.$route.params.id)
      if (result.code === '0') {
        // 账号存在
        // 存取账号信息
        sessionStorage.setItem('card', this.$route.params.id)
        // 存储开户行
        if (result.data.bank && result.data.bank === '中国建设银行') {
          sessionStorage.setItem('isBank', true)
        } else {
          sessionStorage.setItem('isBank', false)
        }
        // 存储银行卡类型
        if (result.data.btype === '活期账户') {
          sessionStorage.setItem('BankType', 0)
        } else if (result.data.btype === '定期账户') {
          sessionStorage.setItem('BankType', 1)
        } else if (result.data.btype === '信用卡账户') {
          sessionStorage.setItem('BankType', 2)
        }
        this.hasData = true
        this.inputTime()
      } else if (result.code === '1') {
        this.$alert('账号不正确，请重新输入', '错误', {
          confirmButtonText: '确定'
        })
        this.$router.replace('/')
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
header {
 text-align: center;
 padding-top: 100px;
}
h3 {
  color: white;
  font-size: 30px;
  margin-top: 20px;
  margin-bottom: 20px;
}
.China {
  margin-bottom: 20px;
}
.card {
  display: block;
  margin: 60px auto;
};
.English {
  margin-top: 20px;
}
.el-container {
    text-align: center;
}
.el-header {
  margin-top: 100px;
}
.large {
  width: 60px;
}
main{
  text-align: center;
}
.el-input {
  width: 200px;
}
.exit {
  position: absolute;
  left: 20px;
  top: 560px;
  width: 150px;
  height: 50px;
  font-size: 20px;
  border-radius: 15px;
  background-color: rgb(99, 69, 233);
  color: white;
}
.comfirm {
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
.time {
  margin: auto;
  display: block;
  background-color: black;
  color: yellow;
  width: 80px;
  height: 80px;
  font-size: 30px;
  text-align: center;
  line-height: 80px;
}
</style>
