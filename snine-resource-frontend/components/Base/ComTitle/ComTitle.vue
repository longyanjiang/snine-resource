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
  top: 0;
  left: 0;
  height: 30px;
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