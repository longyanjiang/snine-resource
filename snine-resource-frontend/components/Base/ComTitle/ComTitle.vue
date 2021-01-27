<template>
  <div class="com-title flex_start_center">
      TO:{{titleName}}
  </div>
</template>

<script>
export default {
  props:{
    titleName:{
      type: String,
      default: ''
    }
  }
};
</script>
<style lang='less' scoped>
.com-title{
  padding: 10px 15px;
  font-size: 16px;
  position: relative;
  font-style: oblique;
  height: 30px;
  z-index: -1;
  &::before{
    display: block;
    content: "";
    position: absolute;
    left: 0;
    top: 13px;
    bottom: 13px;
    width: 4px;
    background: linear-gradient(#2db7f5,#6bc30d);
  }
}
</style>