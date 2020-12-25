<!-- 开户 -->
<template>
  <div class="warp">
    <div class="form" v-if="!isSecond">
        <h5>请输入开户用户的详细信息</h5>
      <el-form
        :model="DForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="储户姓名" prop="Dname" required>
          <el-input v-model="DForm.Dname" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="身份证" prop="Didcard" required>
          <el-input v-model="DForm.Didcard" placeholder="请输入身份证"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" required prop="Dphone">
          <el-input v-model="DForm.Dphone" placeholder="请输入电话"></el-input>
        </el-form-item>
        <el-form-item label="联系地址" prop="Daddress" required>
          <el-input v-model="DForm.Daddress" placeholder="请输入联系地址"></el-input>
        </el-form-item>
        <el-form-item label="储户性别" prop="Dsex" required>
          <el-radio-group v-model="DForm.Dsex" size="medium">
            <el-radio border label="男"></el-radio>
            <el-radio border label="女"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-button @click="back">返回</el-button>
          <el-button @click="resetForm">重置</el-button>
          <el-button @click="submitForm">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="form" v-if="isSecond">
      <h5>请输入开户用户的银行卡信息</h5>
        <div class="el-form">
          <el-input v-model="bpassword" placeholder="请输入银行卡密码" class="password" type="password"></el-input>
          <el-input v-model="bpassword2" placeholder="请再次确认密码" class="password" type="password"></el-input>
          <el-select v-model="btype" placeholder="请选择银行卡类型">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-button @click="back">返回</el-button>
          <el-button @click="reset">重置</el-button>
          <el-button @click="submit">提交</el-button>
        </div>
    </div>
  </div>
</template>

<script>
import { openAccount, openCard } from '../../../api/admin/option'
export default {
  data () {
    return {
      DForm: {
        Dname: '',
        Didcard: '',
        Dsex: '',
        Dphone: '',
        Daddress: ''
      },
      isSecond: false,
      bpassword: '',
      options: [{
        value: '活期账户',
        label: '活期账户'
      }, {
        value: '定期账户',
        label: '定期账户'
      }, {
        value: '信用卡账户',
        label: '信用卡账户'
      }],
      btype: '',
      dno: '', // 后台生成
      bpassword2: ''
    }
  },
  methods: {
    // (dname, didcard, dsex, dphone, daddress)
    async submitForm () {
      this.DForm.Dsex = this.DForm.Dsex === '男' ? 'true' : 'false'
      const res = await openAccount(this.DForm.Dname, this.DForm.Didcard, this.DForm.Dsex, this.DForm.Dphone, this.DForm.Daddress)
      if (res.code === '0') {
        this.dno = res.data.dno
        this.isSecond = true
      } else {
        this.$alert(res.msg, 'error', {
          confirmButtonText: '确定'
        })
      }
    },
    resetForm () {
      this.DForm.Dname = ''
      this.DForm.Didcard = ''
      this.DForm.Dsex = ''
      this.DForm.Dphone = ''
      this.DForm.Daddress = ''
    },
    async submit () {
      if (this.bpassword.trim().length !== 6 || !this.btype) {
        this.$alert('请输入正确的银行卡密码及选择正确的类型', '错误', {
          confirmButtonText: '确定'
        })
        return
      }
      if (this.bpassword2 !== this.bpassword) {
        this.$alert('两次密码输入不一致', '错误', {
          confirmButtonText: '确定'
        })
        return
      }
      const res = await openCard(this.dno, this.bpassword, this.btype)
      if (res.code === '0') {
        this.$alert('成功创建用户', 'success', {
          confirmButtonText: '确定'
        })
        this.$router.replace('/adminMain')
      }
    },
    reset () {
      this.bpassword = ''
      this.btype = ''
    },
    back () {
      this.$confirm('表单未提交，确定返回？', 'info', {
        dangerouslyUseHTMLString: true,
        center: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'info'
      }).then(() => {
        this.$router.back()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消返回'
        })
      })
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
}
.form {
  position: relative;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 600px;
  height: 500px;
  background-color: #fcfcfc;
}
.el-form {
 margin-top: 40px;
 width: 500px;
}
h5 {
  padding-top: 20px;
  font-size: 30px;
}
.password {
  width: 400px;
  margin: 60px auto;
  margin-left: 100px;
  display: block;
}
.el-select {
  width: 400px;
  margin: 30px auto;
  margin-left: 100px;
  display: block;
}

</style>
