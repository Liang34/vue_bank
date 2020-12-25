<!--  -->
<template>
  <div>
    <el-container>
      <el-button @click="exit" class="left">退卡</el-button>
    <el-main>
        <h3>请选择所需服务</h3>
        <h4>Please Select Service</h4>
        <p>你的账户余额为：{{balance}}</p>
        <p>今天已取款：{{hastake}}</p>
        <p>今天还可以取款：{{cantake}}</p>
    </el-main>
      <el-button @click="back" class="right">返回主菜单</el-button>
  </el-container>
  <Footer/>
  </div>
</template>

<script>
import Footer from '../../components/input/Footer'
import { queryBalance } from '../../api/user/option'
export default {
  data () {
    return {
      balance: 100,
      hastake: 100
    }
  },
  async mounted () {
    const res = await queryBalance()
    if (res.code === '0') {
      // 已取金额
      this.hastake = res.data.btamount
      // 可用金额
      this.balance = res.data.bamount
    }
  },
  computed: {
    // 计算属性的 getter
    cantake: function () {
      // `this` 指向 vm 实例
      return 10000 - this.hastake
    }
  },
  methods: {
    back () {
      this.$router.back()
    },
    exit () {
      sessionStorage.clear()
      this.$router.push('/')
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
  margin-left: 80px;
}
h3 {
  font-size: 30px;
  width: 230px;
  margin: 40px auto;
  // text-shadow: 0 0 0.2em rgb(230, 69, 182), 0 0 0.2em rgb(109, 76, 161)
}
h4 {
  font-size: 20px;
  width: 230px;
  margin: 40px auto;
  // text-shadow: 0 0 0.2em rgb(230, 69, 182), 0 0 0.2em rgb(109, 76, 161)
}
p {
  width: 200px;
  margin: 20px auto;
  // text-shadow: 0 0 0.2em rgb(230, 69, 182), 0 0 0.2em rgb(109, 76, 161)
}
.left {
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
</style>
