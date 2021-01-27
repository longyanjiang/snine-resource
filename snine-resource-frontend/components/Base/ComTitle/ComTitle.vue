<template>
  <div class="com-title flex_start_center">
      TO:{{name}}
  </div>
</template>

<script>
export default {
  props:{
    name:{
      type: String,
      default: ''
    }
  }
};
</script>
<style lang='less' scoped>
.com-title{
  color:rgba(0,0,0,.45);
  padding: 10px 15px;
  position: relative;
  // box-shadow: 0 4px 8px 0 rgba(7,17,27,.1);
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