<!--  -->
<template>
 <div>
    <el-container>
    <el-aside width="200px">
      <el-button @click="transMoneny(200)">2&nbsp;0&nbsp;0</el-button>
      <el-button @click="transMoneny(500)">5&nbsp;0&nbsp;0</el-button>
      <el-button @click="transMoneny(1000)">1,000</el-button>
      <el-button @click="back">返&nbsp;回</el-button>
    </el-aside>
    <el-main>
      <h3>请选择或输入转账金额</h3>
      <span>Please Select Or Enter Amount</span>
      <el-input v-model="moneny" placeholder="请输入转账金额" oninput="value=value.replace(/[^\d.]/g,'')"></el-input>
      <el-select v-model="arriveTime" placeholder="请选择到账时间">
       <el-option
         v-for="item in options"
         :key="item.value"
         :label="item.label"
         :value="item.value">
       </el-option>
      </el-select>
      <p>可选择实时到账或延迟到账,</p>
      <p>跨行需要收取手续费,</p>
      <p>每日单笔转账金额不大于50000元,</p>
      <p>信用卡用户不支持转账,</p>
      <p>定期用户需要额外扣10元手续费</p>
    </el-main>
    <el-aside width="200px">
      <el-button @click="transMoneny(2000)">2,000</el-button>
      <el-button @click="transMoneny(3000)">3,000</el-button>
      <el-button @click="transMoneny(5000)">5,000</el-button>
      <el-button @click="comfirm">确&nbsp;定</el-button>
    </el-aside>
  </el-container>
  <!-- <el-container v-if="!isShow">
    <el-main>
      <h3>转账中，请稍后</h3>
      <img src="./money.gif" alt="moneny"/>
    </el-main>
  </el-container> -->
  <Footer @selectNum="inputNum" @selectOpt="selectOpt"/>
 </div>
</template>

<script>
import Footer from '../../components/input/Footer'
import { trasform } from '../../api/user/option'
export default {
  data () {
    return {
      moneny: '',
      extMoneny: '', // 手续费
      // isShow: true, // 是否展示
      options: [{
        value: '0',
        label: '实时到账'
      }, {
        value: '1',
        label: '24小时后到账'
      }],
      arriveTime: ''
    }
  },
  methods: {
    transMoneny (val) {
      this.moneny = val
    },
    back () {
      this.$router.back()
    },
    comfirm () {
      if (this.moneny === '') {
        this.$alert('请输入正确金额', 'error', {
          confirmButtonText: '确定'
        })
        return
      } else if (this.moneny < 0 || this.moneny > 50000) {
        this.$alert('请输入正确金额', 'error', {
          confirmButtonText: '确定'
        })
        return
      }
      if (isNaN(this.moneny)) {
        this.$alert('请输入正确金额', 'error', {
          confirmButtonText: '确定'
        })
        return
      }
      // 目标账号户号
      const target = sessionStorage.getItem('transAccount')
      // 目标账户姓名
      // const targetNmae = sessionStorage.getItem('transName')
      // 原账号类型
      const temp = sessionStorage.getItem('BankType')
      // 是否本地账号
      const isLocalBank = sessionStorage.getItem('isBank')
      // 目的账户是否是本地用户
      const targetIsLocal = sessionStorage.getItem('transIsBank')
      if (isLocalBank === 'true') { // 原账户是本地用户
        if (targetIsLocal === 'true') { // 目标也是本地
          if (temp === '0') { // 活期用户
            this.extMoneny = 0
            // 计算手续费
            this.$confirm(`你的卡是活期账号, 当前需要转账${this.moneny}元,<br>需要收取手续费${this.extMoneny}元,<br/>目标账号为：${target}<br/>是否继续?`, 'info', {
              dangerouslyUseHTMLString: true,
              center: true,
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'info'
            }).then(() => {
              this.send(this.moneny, target, this.extMoneny)
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消转账'
              })
            })
          } else if (temp === '1') { // 定期用户
            // 扣10块
            this.extMoneny = 10
            this.$confirm(`你的卡是定期账号， 当前需要转账${this.moneny}元,<br>， 需要收取手续费${this.extMoneny}元,<br/>目标账号为：${target}<br>是否继续?`, 'info', {
              dangerouslyUseHTMLString: true,
              center: true,
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'info'
            }).then(() => {
              this.send(this.moneny, target, this.extMoneny)
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消转账'
              })
            })
          } else if (temp === '2') { // 信用卡用户
            // 上限2000
            if (this.moneny > 2000) {
              this.$alert(`你的卡是信用卡账号，最多能转账2000，当前输入${this.moneny}元`, 'error', {
                confirmButtonText: '确定'
              })
            } else {
              this.extMoneny = 0
              this.$confirm(`你的卡是信用卡, 当前需要转账${this.moneny}元,<br> 需要收取手续费${this.extMoneny}元,<br/>目标账号为：${target}<br>是否继续?`, 'info', {
                dangerouslyUseHTMLString: true,
                center: true,
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'info'
              }).then(() => {
                this.send(this.moneny, target, this.extMoneny)
              }).catch(() => {
                this.$message({
                  type: 'info',
                  message: '已取消转账'
                })
              })
            }
          }
        } else if (targetIsLocal === 'false') { // 目标账户不是本地
          if (temp === '0') { // 活期用户
            this.extMoneny = this.moneny / 100
            // 计算手续费
            this.$confirm(`你的卡是活期账号, 当前需要转账${this.moneny}元,<br>目标账户不属于本地，需要收取手续费${this.extMoneny}元,<br/>目标账号为：${target}<br/>是否继续?`, 'info', {
              dangerouslyUseHTMLString: true,
              center: true,
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'info'
            }).then(() => {
              this.send(this.moneny, target, this.extMoneny)
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消转账'
              })
            })
          } else if (temp === '1') { // 定期用户
            this.extMoneny = this.moneny / 100
            // 扣10块
            this.extMoneny += 10
            this.$confirm(`你的卡是定期账号， 当前需要转账${this.moneny}元,<br>目标账户不属于本地，需要收取手续费${this.extMoneny}元,<br/>目标账号为：${target}<br>是否继续?`, 'info', {
              dangerouslyUseHTMLString: true,
              center: true,
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'info'
            }).then(() => {
              this.send(this.moneny, target, this.extMoneny)
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消转账'
              })
            })
          } else if (temp === '2') { // 信用卡用户
            // 上限2000
            if (this.moneny > 2000) {
              this.$alert(`你的卡是信用卡账号，最多能转账2000，当前输入${this.moneny}元`, 'error', {
                confirmButtonText: '确定'
              })
            } else {
              this.extMoneny = this.moneny / 100
              this.$confirm(`你的卡是信用卡, 当前需要转账${this.moneny}元,<br>目标账户不属于本地，需要收取手续费${this.extMoneny}元,<br/>目标账号为：${target}<br>是否继续?`, 'info', {
                dangerouslyUseHTMLString: true,
                center: true,
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'info'
              }).then(() => {
                this.send(this.moneny, target, this.extMoneny)
              }).catch(() => {
                this.$message({
                  type: 'info',
                  message: '已取消转账'
                })
              })
            }
          }
        }
      } else { // 跨行用户
        if (temp === '0') { // 活期用户
          this.extMoneny = this.moneny / 100
          // 计算手续费
          this.$confirm(`你的卡是活期账号, 不属于建行, 当前需要转账${this.moneny}元,<br> 需要收取跨行手续费${this.extMoneny}元,<br/>目标账号为：${target}<br>是否继续?`, 'info', {
            dangerouslyUseHTMLString: true,
            center: true,
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'info'
          }).then(() => {
            this.send(this.moneny, target, this.extMoneny)
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消转账'
            })
          })
        } else if (temp === '1') { // 定期用户
          // 扣10块
          this.extMoneny = this.moneny / 100
          this.extMoneny += 10
          this.$confirm(`你的卡是定期账号, 不属于建行, 当前需要转账${this.moneny}元,<br> 需要收取手续费${this.extMoneny}元, 其中包括定期10元,<br/>目标账号为：${target}<br>是否继续?`, 'info', {
            dangerouslyUseHTMLString: true,
            center: true,
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'info'
          }).then(() => {
            this.send(this.moneny, target, this.extMoneny)
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消转账'
            })
          })
        } else if (temp === '2') { // 信用卡用户
          // 上限2000
          if (this.moneny > 2000) {
            this.$alert(`你的卡是信用卡账号，最多能转账2000，当前输入${this.moneny}元`, 'error', {
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
            this.$confirm(`你的卡是信用卡, 不属于建行, 当前需要转账${this.moneny}元,<br> 需要收取跨行手续费${this.extMoneny}元,<br/>目标账号为：${target}<br>是否继续?`, 'info', {
              dangerouslyUseHTMLString: true,
              center: true,
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'info'
            }).then(() => {
              this.send(this.moneny, target, this.extMoneny)
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消转账'
              })
            })
          }
        }
      }
    },
    // 这里情况比较特殊，可能要多发一次请求看看余额是否足够，留个坑
    async send (cash, transAccount, poundage) {
      console.log(this.arriveTime)
      //   this.isShow = false
      const res = await trasform(this.arriveTime, cash, transAccount, poundage)
      if (res.code === '0') {
        this.$alert('转账成功', '成功', {
          confirmButtonText: '确定'
        })
      } else {
        this.$alert(res.msg, 'error', {
          confirmButtonText: '确定'
        })
      }
      // if (this.arriveTime === '0') { // 立即到账
      //   const res = await trasform(this.arriveTime, cash, transAccount, poundage)
      // } else if (this.arriveTime === '1') { // 延迟1min发送请求
      //   setTimeout(async () => {
      //     await trasform(this.arriveTime, cash, transAccount, poundage)
      //   }, 1000 * 10)
      // }
    //   if (result.code === '0') {
    //     this.$alert(`取款成功, 当前账户余额为${result.data.balance}， 可用余额为${result.data.bamount}`, 'success', {
    //       confirmButtonText: '确定'
    //     })
    //     this.isShow = true
    //   } else {
    //     this.$alert(result.msg, 'error', {
    //       confirmButtonText: '确定'
    //     })
    //     this.isShow = true
    //   }
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
  margin-bottom: 20px;
}
.el-select {
  width: 300px;
  display: block;
  margin: 0 auto;
  margin-bottom: 40px;
}
p{
  margin: auto;
  width: 300px;
  line-height: 30px;
}
</style>
