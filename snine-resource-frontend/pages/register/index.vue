<template>
  <div class="page-login">
    <div class="page-login-form">
      <div class="page-login-form-logo">
        <img src="../../assets/image/logo.png" alt="">
        <span class="email">邮箱注册</span>
      </div>
      <el-form ref="ruleForm" :model="form" :rules="rules"  label-width="80px">
        <el-form-item prop="email">
          <el-input v-model="form.email" placeholder="请输入您的邮箱" clearable>
            <i slot="prefix" class="el-input__icon el-icon-user"></i>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="form.password" placeholder="至少六位数，区分大小写" clearable show-password >
            <i slot="prefix" class="el-input__icon el-icon-unlock"></i>
          </el-input>
        </el-form-item>
        <el-form-item prop="password2">
          <el-input v-model="form.password2" placeholder="确认您的密码" clearable show-password >
            <i slot="prefix" class="el-input__icon el-icon-unlock"></i>
          </el-input>
        </el-form-item>
        <el-form-item prop="username">
          <el-input v-model="form.username" placeholder="请输入您的姓名" clearable >
            <i slot="prefix" class="el-input__icon el-icon-user"></i>
          </el-input>
        </el-form-item>
        <el-form-item prop="nickname">
          <el-input v-model="form.nickname" placeholder="请输入您的昵称" clearable >
            <i slot="prefix" class="el-input__icon el-icon-edit"></i>
          </el-input>
        </el-form-item>
      </el-form>
      <div class="page-login-form-middle">
        <el-button type="primary" :loadin='loading'  @click="register('ruleForm')">注 册 用 户</el-button>
        <nuxt-link to="/login">
            <el-button type="text" size="medium" class="login">使用已有账户登录</el-button>
        </nuxt-link>
      </div>
    
    </div>
  </div>
</template>

<script>
import {validateEmail} from '../../utlis/validates.js';
export default {
  layout: "default",
  head() {
    return {
      title: "注册 - Snine 小助手",
    };
  },
  data() {
    return {
      rules:{
        email: [
         { validator: validateEmail, trigger: 'blur'}
        ],
        password: [
          { required: true, message: '请输入您的密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ],
        password2:[
          { required: true, message: '请确认您的密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ],
        username: [
          { required: true, message: '请输入您的姓名', trigger: 'blur' },
          { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
        ],
        nickname: [
          { required: true, message: '请输入您的昵称', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
        ]
      },
      form: {
        email: "",
        password: "",
        password2: '',
        username: '',
        nickname: ''
      },
      checked: true,
      loading: false
    };
  },
  methods:{
    register(formName) {
      this.$refs[formName].validate(async(valid) => {
        if (!valid) { return false; } 
        this.loading = true
        if (!valid) { return false; } 
        if(this.form.password !== this.form.password2){
          this.$notify({title: '输入错误',message: "两次输入密码不一致，请检查你的密码",type: 'error'});
          return false;
        }
        const result = await this.$myApi.user.PostRegister(this.form)
        this.loading = false;
        if(result.code == 1){
          this.$notify({title: '注册成功',message: result.msg,type: 'success'});
          this.$router.push({name:'login'})
        }else{
          this.$notify({title: '注册失败',message: result.msg,type: 'error'});
        }
      });
    },
  }
};
</script>

<style lang='less' scoped>
.page-login {
  // min-height: 100vh;
  // padding: 80px 30px 0 0;
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
