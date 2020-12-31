<!--  -->
<template>
  <div class="warp">
    <h3 class="title">欢迎来到后台管理系统</h3>
    <div class="form" v-if="!isSecond">
      <h5>请输入要修改密码的账号</h5>
      <el-input v-model="Bno" placeholder="请输入要修改密码的账号" oninput="value=value.replace(/[^\d]/g,'')"></el-input>
      <el-button @click="back">返回</el-button>
      <el-button @click="submit">提交</el-button>
    </div>
    <div class="form" v-if="isSecond">
      <h5>请输入要修改密码</h5>
      <el-input v-model="password1" placeholder="请输入新的密码" oninput="value=value.replace(/[^\d]/g,'')" type="password"></el-input>
      <el-input v-model="password2" placeholder="请再次确认" oninput="value=value.replace(/[^\d]/g,'')" type="password"></el-input>
      <el-button @click="back">返回</el-button>
      <el-button @click="submit2">提交</el-button>
    </div>
  </div>
</template>

<script>
import { queryUserInfo, resetUserPassword } from '../../../api/admin/option'
export default {
  data () {
    return {
      Bno: '',
      isSecond: false,
      password1: '',
      password2: ''
    }
  },
  methods: {
    back () {
      this.$router.replace('/adminMain')
    },
    async submit () {
      if (this.Bno.trim().length !== 19) {
        this.$alert('输入有误，请重新输入', 'error', {
          confirmButtonText: '确定'
        })
        return
      }
      const res = await queryUserInfo(this.Bno, this.Didcard)
      if (res.code === '0') {
        this.$confirm(`该银行卡所对应用户的身份证为${res.data.didcard},请核对身份`, 'info', {
          dangerouslyUseHTMLString: true,
          center: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'info'
        }).then(() => {
          this.isSecond = true
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消修改密码'
          })
        })
      } else {
        this.$alert(res.msg, 'error', {
          confirmButtonText: '确定'
        })
      }
    },
    async submit2 () {
      if (this.password1.trim().length !== 6 || this.password1.trim().length !== 6) {
        this.$alert('输入有误，请重新输入', 'error', {
          confirmButtonText: '确定'
        })
        return
      }
      if (this.password1.trim() !== this.password2.trim()) {
        this.$alert('两次密码不一致，请重新输入', 'error', {
          confirmButtonText: '确定'
        })
        return
      }
      const res = await resetUserPassword(this.password1, this.Bno)
      if (res.code === '0') {
        this.$alert('修改密码成功', 'success', {
          confirmButtonText: '确定'
        })
      } else {
        this.$alert(res.msg, 'error', {
          confirmButtonText: '确定'
        })
      }
    }
  }
}

</script>
<style lang='scss' scoped>
.warp {
  height: 650px;
  background: url("../admin.png") no-repeat;
  background-size: 100%;
  text-align: center;
  overflow: hidden;
}
.title {
  color: #fcfcfc;
  font-size: 60px;
  padding-top: 20px;
  box-sizing: border-box;
}
.form {
  width: 400px;
  height: 400px;
  border: solid 1px;
  border-radius: 15px;
  background-color: #fcfcfc;
  opacity: .9;
  margin: 100px auto;
}
.el-input {
  width: 300px;
  display: block;
  margin: auto;
  margin-bottom: 30px;
}
h5 {
  margin-top: 60px;
  font-size: 30px;
  margin-bottom: 50px;
}
</style>
