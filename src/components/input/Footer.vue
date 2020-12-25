<!--  -->
<template>
  <el-row :gutter="20">
    <el-col :span="6">
      <!-- <img src="./footer_left.png" class="left_top">
      <img src="./footer_l.png" class="left_bottom"> -->
    </el-col>
    <el-col :span="6" :offset="10">
      <div class="inner">
              <el-button @click="selectNumber(7)">7</el-button>
              <el-button @click="selectNumber(8)">8</el-button>
              <el-button @click="selectNumber(9)">9</el-button>
              <el-button @click="selectOpt('Cancel')" class="large">Cancel</el-button>
              <el-button @click="selectNumber(4)">4</el-button>
              <el-button @click="selectNumber(5)">5</el-button>
              <el-button @click="selectNumber(6)">6</el-button>
              <el-button @click="selectOpt('Clear')" class="large">Clear</el-button>
              <el-button @click="selectNumber(1)">1</el-button>
              <el-button @click="selectNumber(2)">2</el-button>
              <el-button @click="selectNumber(3)">3</el-button>
              <el-button @click="selectOpt('Enter')" class="large">Enter</el-button>
              <el-button @click="selectNumber(0)">0</el-button>
              <el-button @click="selectNumber('00')">00</el-button>
              <el-button @click="selectNumber('')">*</el-button>
              <el-button class="large"> </el-button>
      </div>
    </el-col>
    <el-col :span="6" :offset="2">
      <!-- <img src="./footer_r.png" class="right_top">
      <img src="./footer_right.png" class="right_bottom"> -->
    </el-col>
  </el-row>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  methods: {
    selectNumber (val) {
      this.$emit('selectNum', val)
    },
    selectOpt (opt) {
      this.$emit('selectOpt', opt)
    }
  }
}

</script>
<style lang='scss' scoped>
.el-row {
  margin-top: 20px;
}
.inner {
  background-color: white;
  border: solid 1px;
  width: 300px;
  height: 290px;
  border-radius: 7px;
  display: grid;
  grid-template-columns: 50px 50px 50px 50px;
  grid-template-rows: 50px 50px 50px 50px;
  grid-row-gap: 10px;
  grid-column-gap: 10px;
  padding: 35px;
  box-sizing: border-box;
}
.el-button+.el-button{
  margin: 0;
  padding: 0;
}
.left_top {
  display: block;
  width: 200px;
  height: 80px;
  margin: 40px 100px;
}
.left_bottom {
  display: block;
  width: 300px;
  height: 80px;
  margin: 20px 60px;
}
.right_top {
  display: block;
  width: 200px;
  height: 80px;
  margin: 40px 60px;
}
.right_bottom {
  display: block;
  width: 200px;
  height: 120px;
  margin-top: 20px;
  margin-left: 60px;
}
</style>
