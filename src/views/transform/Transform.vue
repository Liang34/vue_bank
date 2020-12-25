<!--  -->
<template>
  <div>
    <el-container>
      <el-button @click="back" class="left">取消</el-button>
    <el-main>
        <h3>请输入转账账号</h3>
        <span>Please Input The Transform Account</span>
        <el-input v-model="account" placeholder="请输入号码数为19的银行卡，只支持输入数字" oninput="value=value.replace(/[^\d]/g,'')"></el-input>
    </el-main>
      <el-button @click="comfirm" class="right">确认</el-button>
  </el-container>
  <Footer @selectNum="inputNum" @selectOpt="selectOpt"/>
  </div>
</template>

<script>
import Footer from '../../components/input/Footer'
import { checkAccount } from '../../api/user/login'
export default {
  data () {
    return {
      account: ''
    }
  },
  methods: {
    back () {
      this.$router.back()
    },
    inputNum (val) {
      this.account += val
    },
    selectOpt (opt) {
      if (opt === 'Enter') {
        this.comfirm()
      } else if (opt === 'Clear') {
        this.account = ''
      } else if (opt === 'Cancel') {
        this.account = this.account.substring(0, this.account.length - 1)
      }
    },
    async comfirm () {
      const temp = sessionStorage.getItem('card')
      if (temp === this.account.trim()) {
        this.$alert('不能转入本账号', 'error', {
          confirmButtonText: '确定'
        })
        return
      }
      if (this.account.trim().length !== 19) {
        this.$alert('请输入正确的银行卡账号', 'error', {
          confirmButtonText: '确定'
        })
      } else {
        this.$confirm(`您所转账的账号为：${this.account}<br/>是否继续?`, 'info', {
          dangerouslyUseHTMLString: true,
          center: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'info'
        }).then(() => {
          this.send()
          // console.log('iiiiiiiiiiiiiii')
          // const res = await checkAccount(this.account)
          // console.log(res)
          // if (res.code === '0') {
          //   console.log(res)
          //   if (res.msg === 3) {
          //     this.$alert('抱歉，该用户已被注销', '错误', {
          //       confirmButtonText: '确定'
          //     })
          //     return
          //   }
          //   // 将目标账号存到本地
          //   sessionStorage.setItem('transAccount', this.account)
          //   // 存储开户行
          //   if (res.data.Bank && res.data.Bank === '中国建设银行') {
          //     sessionStorage.setItem('transIsBank', true)
          //   } else {
          //     sessionStorage.setItem('transIsBank', false)
          //   }
          //   // 存储转账用户信息
          //   // res.data.dname && sessionStorage.setItem('transName', res.data.dname)
          //   // 跳到转账金额页面
          //   this.$router.push('/transformMoneny')
          // } else if (res.code === '1') {
          //   this.$alert('账号不正确，请重新输入', '错误', {
          //     confirmButtonText: '确定'
          //   })
          // }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消转账'
          })
        })
      }
    },
    async send () {
      console.log('iiiiiiiiiiiiiii')
      const res = await checkAccount(this.account)
      console.log(res)
      if (res.code === '0') {
        console.log(res.msg)
        if (res.msg === '3') {
          this.$alert('抱歉，该用户已被注销', '错误', {
            confirmButtonText: '确定'
          })
          return
        }
        // 将目标账号存到本地
        sessionStorage.setItem('transAccount', this.account)
        // 存储开户行
        if (res.data.Bank && res.data.Bank === '中国建设银行') {
          sessionStorage.setItem('transIsBank', true)
        } else {
          sessionStorage.setItem('transIsBank', false)
        }
        // 存储转账用户信息
        // res.data.dname && sessionStorage.setItem('transName', res.data.dname)
        // 跳到转账金额页面
        this.$router.push('/transformMoneny')
      } else if (res.code === '1') {
        this.$alert('账号不正确，请重新输入', '错误', {
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
.el-container {
  background-color: #3650A5;
  height: 520px;
  overflow: hidden;
}
.el-main {
  margin-top: 80px;
  color: white;
}
.right {
  position: absolute;
  right: 20px;
  top: 560px;
  width: 150px;
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
  width: 400px;
  margin: auto;
}
</style>
