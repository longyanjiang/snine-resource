<template>
  <div class="page-about">
    <div>这就是关于页面</div>
  </div>
</template>

<script>
export default {
  layout: "default",
  head() {
    return {
      title: "Snine的资源库",
    };
  },
};
</script>

<style>
.page-about {
  margin: 0 auto;
  min-height: 100vh;
  text-align: center;
  background-image: url("https://imgchr.com/content/images/system/home_cover_1601010270144_8921bc.jpg");
  background: url('https://gw.alipayobjects.com/zos/rmsportal/TVYTbAXWheQpRcWDaDMu.svg');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  backface-visibility: hidden;
}
</style>
