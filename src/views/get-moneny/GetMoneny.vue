<!--  -->
<template>
 <div>
    <el-container v-if="isShow">
    <el-aside width="200px">
      <el-button @click="getMoneny(200)">2&nbsp;0&nbsp;0</el-button>
      <el-button @click="getMoneny(500)">5&nbsp;0&nbsp;0</el-button>
      <el-button @click="getMoneny(1000)">1,000</el-button>
      <el-button @click="back">返&nbsp;回</el-button>
    </el-aside>
    <el-main>
      <h3>请选择或输入取款金额</h3>
      <span>Please Select Or Enter Amount</span>
      <el-input v-model="moneny" placeholder="请输入取款金额" oninput="value=value.replace(/[^\d]/g,'')"></el-input>
      <p>本机目前仅提供100元纸币,</p>
      <p>数目必须是100元的整数倍,</p>
      <p>每日单笔取款限度额为5,000元,</p>
      <p>￥100 Is Available,</p>
      <p>Account Limitation Is ￥5,000</p>
    </el-main>
    <el-aside width="200px">
      <el-button @click="getMoneny(2000)">2,000</el-button>
      <el-button @click="getMoneny(3000)">3,000</el-button>
      <el-button @click="getMoneny(5000)">5,000</el-button>
      <el-button @click="comfirm">确&nbsp;定</el-button>
    </el-aside>
  </el-container>
  <el-container v-if="!isShow">
    <el-main>
      <h3>出钞中，请稍后</h3>
      <img src="./money.gif" alt="moneny"/>
    </el-main>
  </el-container>
  <Footer @selectNum="inputNum" @selectOpt="selectOpt"/>
 </div>
</template>

<script>
import Footer from '../../components/input/Footer'
import { withdrawal } from '../../api/user/option'
export default {
  data () {
    return {
      moneny: '',
      extMoneny: '', // 手续费
      isShow: true // 是否展示
    }
  },
  methods: {
    getMoneny (val) {
      this.moneny = val
    },
    back () {
      this.$router.back()
    },
    comfirm () {
      console.log('22222222222222')
      if (this.moneny === '') {
        this.$alert('输入金额不能为空', 'error', {
          confirmButtonText: '确定'
        })
        return
      } else if (this.moneny < 0 || this.moneny % 100 !== 0 || this.moneny > 5000) {
        this.$alert('输入金额非法', 'error', {
          confirmButtonText: '确定'
        })
        return
      }
      const temp = sessionStorage.getItem('BankType')
      const isLocalBank = sessionStorage.getItem('isBank')
      if (isLocalBank === 'true') { // 本地用户
        if (temp === '0') { // 活期用户
          this.extMoneny = 0
          // 计算手续费
          this.$confirm(`你的卡是活期账号, 当前需要取${this.moneny}元,<br>， 需要收取手续费${this.extMoneny}元,是否继续?`, 'info', {
            dangerouslyUseHTMLString: true,
            center: true,
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'info'
          }).then(() => {
            this.send(this.moneny, this.extMoneny)
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消取款'
            })
          })
        } else if (temp === '1') { // 定期用户
          // 扣10块
          this.extMoneny = 10
          this.$confirm(`你的卡是定期账号， 当前需要取${this.moneny}元,<br>， 需要收取手续费${this.extMoneny}元,是否继续?`, 'info', {
            dangerouslyUseHTMLString: true,
            center: true,
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'info'
          }).then(() => {
            this.send(this.moneny, this.extMoneny)
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消取款'
            })
          })
        } else if (temp === '2') { // 信用卡用户
          // 上限2000
          if (this.moneny > 2000) {
            this.$alert(`你的卡是信用卡账号，最多能取2000，当前输入${this.moneny}元`, 'error', {
              confirmButtonText: '确定'
            })
          } else {
            this.extMoneny = 0
            this.$confirm(`你的卡是信用卡, 当前需要取${this.moneny}元,<br> 需要收取手续费${this.extMoneny}元,是否继续?`, 'info', {
              dangerouslyUseHTMLString: true,
              center: true,
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'info'
            }).then(() => {
              this.send(this.moneny, this.extMoneny)
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消取款'
              })
            })
          }
        }
      } else { // 跨行用户
        if (temp === '0') { // 活期用户
          this.extMoneny = this.moneny / 100
          // 计算手续费
          this.$confirm(`你的卡是活期账号, 不属于建行, 当前需要取${this.moneny}元,<br> 需要收取跨行手续费${this.extMoneny}元,是否继续?`, 'info', {
            dangerouslyUseHTMLString: true,
            center: true,
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'info'
          }).then(() => {
            this.send(this.moneny, this.extMoneny)
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消取款'
            })
          })
        } else if (temp === '1') { // 定期用户
          // 扣10块
          this.extMoneny = this.moneny / 100
          this.extMoneny += 10
          this.$confirm(`你的卡是定期账号, 不属于建行, 当前需要取${this.moneny}元,<br> 需要收取手续费${this.extMoneny}元, 其中包括定期10元,是否继续?`, 'info', {
            dangerouslyUseHTMLString: true,
            center: true,
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'info'
          }).then(() => {
            this.send(this.moneny, this.extMoneny)
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消取款'
            })
          })
        } else if (temp === '2') { // 信用卡用户
          // 上限2000
          if (this.moneny > 2000) {
            this.$alert(`你的卡是信用卡账号，最多能取2000，当前输入${this.moneny}元`, 'error', {
              confirmButtonText: '确定',
              callback: action => {
                this.$message({
                  type: 'error',
                  message: '金额过大'
                })
              }
            })
          } else {
            this.extMoneny = this.moneny / 100
            this.$confirm(`你的卡是信用卡, 不属于建行, 当前需要取${this.moneny}元,<br> 需要收取跨行手续费${this.extMoneny}元,是否继续?`, 'info', {
              dangerouslyUseHTMLString: true,
              center: true,
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'info'
            }).then(() => {
              this.send(this.moneny, this.extMoneny)
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消取款'
              })
            })
          }
        }
      }
    },
    async send (moneny, extrmoneny) {
      this.isShow = false
      const result = await withdrawal(moneny, extrmoneny)
      if (result.code === '0') {
        this.$alert(`取款成功, 当前账户余额为${result.data.balance}， 可用余额为${result.data.bamount}`, 'success', {
          confirmButtonText: '确定'
        })
        this.isShow = true
      } else {
        this.$alert(result.msg, 'error', {
          confirmButtonText: '确定'
        })
        this.isShow = true
      }
    },
    inputNum (val) {
      this.moneny += val
    },
    selectOpt (opt) {
      if (opt === 'Enter') {
        this.checkInput()
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
  color: #333;
  text-align: center;
  overflow: hidden;
}
.el-main {
  color: #333;
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
