<!--  -->
<template>
  <div class="warp">
      <h3 class="title">请选择你要查询的方式</h3>
      <div class="funwarp">
          <div class="card" @click="back"><div class="img"></div>返回</div>
          <div class="card" @click="kaihu"><div class="img"></div>查询储户交易历史</div>
          <div class="card" @click="xiaohu"><div class="img"></div>查询银行近期流水</div>
      </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  methods: {
    back () {
      this.$router.back()
    },
    kaihu () {
      this.$router.push('/querySomeone')
    },
    xiaohu () {
      this.$router.push('/queryAll')
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
.funwarp {
  display: flex;
  position: absolute;
  top: 60%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.card {
  width: 180px;
  height: 250px;
  background-color: #fcfcfc;
  border-radius: 15px;
  border: solid 1px;
  margin-left: 20px;
  opacity: .9;
  font-size: 20px;
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
