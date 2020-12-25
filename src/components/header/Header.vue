<!-- 头部 -->
<template>
<div class="warp">
    <img src="./logo.jpg" class="logo"/>
    <div class="title">
      <h1 class="bdtitle shadow">中国建设银行</h1>
      <span class="mititle shadow">China Construction Bank</span>
    </div>
    <span class="split shadow">|</span>
    <div class="title tt2">
      <p class="excelC shadow">追求卓越</p>
      <p class="excelE shadow">Strving For Excellence</p>
    </div>
    <div class="title tt3">
      <p class="excelC shadow">客服服务热线</p>
      <p class="excelE shadow">Call Center</p>
    </div>
    <p class="excelC shadow num">95533</p>
</div>
</template>

<script>
export default {
  data () {
    return {
    }
  }
}

</script>
<style lang='scss' scoped>
.warp{
  display: flex;
  overflow: hidden;
}
.logo{
  width: 100px;
  height: 100px;
  margin-left: 20px;
  margin-bottom: 10px;
  margin-right: 10px;
}
.title{
  display: flex;
  flex-direction: column;
  margin-right: 5px;
}
.bdtitle{
  font-size: 50px;
  font-weight: 700;
  margin-bottom: 10px;
  white-space: nowrap;
}
.mititle{
  font-size: 30px;
}
.split {
  font-size: 80px;
}
.excelC {
  margin: 10px 0;
  font-size: 30px;
}
.excelE {
  margin-top: 20px;
  font-size: 18px;
}
// 文字阴影
// .shadow {
//   text-shadow: 0 0 0.2em rgb(79, 69, 230), 0 0 0.2em rgb(109, 76, 161)
// }
.tt3 {
  position: absolute;
  right: 150px;
}
.tt2 {
  margin-right: 100px;
}
.num {
  position: absolute;
  right: 20px;
  top: 20px;
}
</style>
