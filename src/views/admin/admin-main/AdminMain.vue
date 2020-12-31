<!--  -->
<template>
  <div class="warp">
      <h3 class="title">欢迎来到后台管理系统</h3>
      <h3 class="titleS">请选择你要进行的操作</h3>
      <div class="funwarp">
          <div class="card" @click="kaihu"><div class="img"></div>开户</div>
          <div class="card" @click="xiaohu"><div class="img"></div>销户</div>
          <div class="card" @click="guashi"><div class="img"></div>挂失</div>
          <div class="card" @click="jiegua"><div class="img"></div>解挂</div>
          <div class="card" @click="dongjie"><div class="img"></div>冻结</div>
          <div class="card" @click="jiedong"><div class="img"></div>解冻</div>
          <div class="card" @click="xiugaimima"><div class="img"></div>修改密码</div>
          <div class="card" @click="chaxunyuer"><div class="img"></div>查询余额</div>
          <div class="card" @click="lishijiaoyi"><div class="img"></div>历史交易查询</div>
          <div class="card" @click="queryAll"><div class="img"></div>查询所有用户</div>
          <div class="card" @click="logout"><div class="img"></div>退出登录</div>
      </div>
  </div>
</template>

<script>
import { logoutadmin } from '../../../api/admin/login'
export default {
  data () {
    return {
    }
  },
  methods: {
    async logout () {
      this.$router.replace('/admin')
      const res = await logoutadmin()
      if (res.code === '0') {
        this.$router.replace('/admin')
      }
    },
    kaihu () {
      this.$router.push('/kaihu')
    },
    xiaohu () {
      this.$router.push('/xiaohu')
    },
    guashi () {
      this.$router.push('/guashi')
    },
    jiegua () {
      this.$router.push('/jiegua')
    },
    dongjie () {
      this.$router.push('/dongjie')
    },
    jiedong () {
      this.$router.push('/jiedong')
    },
    xiugaimima () {
      this.$router.push('/xiugaimima')
    },
    chaxunyuer () {
      this.$router.push('/chaxunyuer')
    },
    lishijiaoyi () {
      this.$router.push('/queryhistory')
    },
    queryAll () {
      this.$router.push('/queryAllUser')
    }
  }
}

</script>
<style lang='scss' scoped>
.warp {
  height: 650px;
  background: url('../admin.png') no-repeat;
  background-size:100%;
  text-align: center;
}
.title {
  color: #fcfcfc;
  font-size: 60px;
  padding-top: 20px;
  box-sizing: border-box;
}
.titleS {
  color: #fcfcfc;
  font-size: 30px;
  margin-top: 30px;
}
.funwarp {
  display: flex;
  position: relative;
  top: 90px;
  // margin-top: 20px;
  margin-right: 10px;
}
.card {
  width: 160px;
  height: 250px;
  background-color: #fcfcfc;
  border-radius: 15px;
  border: solid 1px;
  margin-left: 20px;
  opacity: .9;
  font-size: 20px;
  transition: all .5s;
}
.card:hover {
  background-color: black;
  color: #fcfcfc;
  transform: rotate(360deg);
}
.img {
  background: url('./user.png') no-repeat;
  background-size:100%;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  overflow: hidden;
  margin: 40px auto;
}
</style>
