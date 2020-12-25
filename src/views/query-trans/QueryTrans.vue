<!--  -->
<template>
  <div>
    <el-container>
    <el-button @click="back" class="left">取消</el-button>
    <el-main>
      <h3>请输入交易时间</h3>
      <span>Please Input Time</span>
      <el-select v-model="value" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </el-main>
    <el-button @click="comfirm" class="right">确认</el-button>
  </el-container>
  <Footer/>
  </div>
</template>

<script>
import Footer from '../../components/input/Footer'
export default {
  data () {
    return {
      options: [
        {
          value: '0',
          label: '近一周的交易'
        },
        {
          value: '1',
          label: '近一月的交易'
        },
        {
          value: '2',
          label: '近一年的交易'
        }
      ],
      value: ''
    }
  },
  methods: {
    back () {
      this.$router.back()
    },
    comfirm () {
      this.$router.push(`/queryTrans/details${this.value}`)
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
  width: 100px;
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
  width: 180px;
  margin: 20px auto;
}
.el-select {
  display: block;
  width: 300px;
  margin: auto;
}
</style>
