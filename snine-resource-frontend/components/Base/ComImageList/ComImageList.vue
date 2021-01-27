<template>
  <div class="com_image">
    <div class="title">
        {{name}}
    </div>
    <div class="flex_warp">
      <div class="box" v-for="(item, index) in list" :key="index">
        <el-image
          class="img flex_center"
          :src="item.filepath"
          fit="cover"
        ></el-image>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {};
  },
  props: {
    list: {
      type: Array,
      default: [],
    },
    name: {
      type: String,
      defalut: "精选壁纸"
    }
  },
};
</script>
<style lang='less' scoped>
.com_image{
  background: #fff;
  padding: 15px;
  border-radius: 10px;
  .title{
    padding: 20px 15px;
}
.box {
  width: 20%;
  .img {
    width: 95%;
    height: 95%;
    border-radius: 5px;
  }
}
}

</style>