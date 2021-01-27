<template>
  <div class="page-login">
    <div class="page-login-form">
      <div class="page-login-form-logo">
        <img src="../../../assets/image/logo.png" alt="">
        <span class="email">注册完成</span>
      </div>
      <div class="page-login-form-middle">
        
      </div>
    
    </div>
  </div>
</template>

<script>
export default {
  layout: "default",
  head() {
    return {
      title: "注册 - Snine 小助手",
    };
  },
  data() {
    return {
   
    };
  },
  methods:{
   
  }
};
</script>

<style lang='less' scoped>
.page-login {
  min-height: 100vh;
  padding: 80px 30px 0 0;
  background-image: url("https://imgchr.com/content/images/system/home_cover_1601010270144_8921bc.jpg");
  background: url("https://gw.alipayobjects.com/zos/rmsportal/TVYTbAXWheQpRcWDaDMu.svg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  backface-visibility: hidden;
  display: flex;
  font-size: 20px;
  justify-content: center;
  &-form {
    margin-top: 10vh;
    width: 380px;
    &-logo{
      display: flex;
      justify-content: center;
      height: 230px;
      overflow: hidden;
      position: relative;
      .email{
        position: absolute;
        bottom: 18px;
        font-size: 20px;
        color: #1890ff;
        font-weight: 500;
        padding: 12px 16px;
        border-bottom: 5px solid #1890ff;
        cursor: pointer;
        text-decoration: none;
      }
      img{
        width: 430px;
        height: 260px;
        -webkit-user-drag: none;
      }
    }
    &-middle {
        display: flex;
        justify-content: space-between;
        align-items: center;
        button{
            width: 50% !important;
        }
        .login{
            font-size: 20px;
        }
    }
  }

  /deep/ .el-form-item__content{
    margin-left: 0 !important;
  }
  
}
</style>
