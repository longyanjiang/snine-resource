<template>
  <div class="page-about">
    <div class="content">
        <h1>关于本站</h1>
        <p>本站是一个个人项目，主要是为了存储图片而开发的项目,一部分是为了给与博客的图片提供一个在线图片存储，同时也是一个壁纸收藏网站，会保留个人一些喜欢的壁纸。</p>
        <p>本站同时支持md文件上传，方便保留您的博客，且支持在线编辑，重新下载等功能</p>
        <p>欢迎您贡献您的壁纸用于加入我们的壁纸库，供大家使用，在此上传切审核通过的图片将会在 <a style="color:blue" href="http://gallery.jiangly.com/" target="_blank" rel="noopener noreferrer">此网站</a>用于展示，供大家使用</p>

        <h1>关于项目</h1>
        <li>前端使用： vue + nuxt + element + axios开发，采用ssr服务端渲染 </li>
        <li>后端使用： express + jwt + cors + multer开发, 采用jsonwebtoken进行前后端交互</li>
        <li>数据库使用: mysql + sequelize模型</li>
        <li>项目部署：采用pm2部署</li>
        <br>
        <br>
        <br>
        <p>本站上传的图片会一直保留,如果有特殊情况，本站将会公告通知备份，不会直接删除，请放心使用。</p>
    </div>
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

<style lang='less' scoped>
.page-about {
  margin: 0 auto;
  min-height: 100vh;
  background-image: url("https://imgchr.com/content/images/system/home_cover_1601010270144_8921bc.jpg");
  background: url('https://gw.alipayobjects.com/zos/rmsportal/TVYTbAXWheQpRcWDaDMu.svg');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  backface-visibility: hidden;
  .content{
    margin: 100px auto;
    width: 950px;
    height: 1000px;
    h1{
      margin-top: 40px;
      padding: 10px 15px;
      font-size: 22px;
      font-weight: normal;
      border-bottom: 1px solid #E5E5E5;
      margin-bottom: 30px;
    }
    p,li{
      line-height: 160%;
      margin: 10px 0;
      color: #333;
    }
  }
}
</style>
