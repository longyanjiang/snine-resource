<template>
  <div class="page-login">
    <div
      class="page-login-form"
      :style="{ zIndex: $store.state.status.isDrawerOpen ? '-1' : '0' }"
    >
      <div class="page-login-form-logo">
        <img src="../../assets/image/logo.png" alt="" />
        <span class="email">邮箱登录</span>
      </div>
      <el-form ref="ruleForm" :model="form" :rules="rules" label-width="80px">
        <el-form-item prop="email">
          <el-input v-model="form.email" placeholder="邮箱" clearable>
            <i slot="prefix" class="el-input__icon el-icon-user"></i>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="form.password"
            placeholder="密码"
            clearable
            show-password
          >
            <i slot="prefix" class="el-input__icon el-icon-unlock"></i>
          </el-input>
        </el-form-item>
      </el-form>
      <div class="page-login-form-middle">
        <div class="forget">
          <el-checkbox v-model="checked">自动登录</el-checkbox>
          <el-button type="text" @click="forgetPassword()">忘记密码</el-button>
        </div>
        <el-button
          type="primary"
          class="login"
          :loading="loading"
          @click="login('ruleForm')"
          >登 录</el-button
        >
        <div class="register">
          <nuxt-link to="/register">
            <el-button type="text" size="medium">注册用户</el-button>
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { validateEmail } from "../../utlis/validates.js";
export default {
  layout: "default",
  head() {
    return {
      title: "登录 - Snine 小助手",
    };
  },
  data() {
    return {
      rules: {
        email: [{ validator: validateEmail, trigger: "blur" }],
        password: [
          { required: true, message: "请输入您的密码", trigger: "blur" },
          {
            min: 6,
            max: 15,
            message: "长度在 6 到 15 个字符",
            trigger: "blur",
          },
        ],
      },
      form: {
        email: "",
        password: "",
      },
      checked: true,
      loading: false,
    };
  },
  methods: {
    login(formName) {
      this.$refs[formName].validate(async (valid) => {
        this.loading = true;
        if (!valid) {
          return false;
        }
        const result = await this.$myApi.user.PostLogin(this.form);
        this.loading = false;
        if (result.code == 1) {
          this.$notify({ title: "成功", message: result.msg, type: "success" });
          this.$router.push({ name: "home" });
        } else {
          this.$notify({ title: "错误", message: result.msg, type: "error" });
        }
      });
    },
    async forgetPassword() {
      const data = { email: "927898639@qq.com", password: "sunny521" };
      const result = await this.$myApi.user.PostLogin(data);
      if (result.code == 1) {
        this.$notify({ title: "成功", message: result.msg, type: "success" });
        let userInfo = result.data;
        console.log(userInfo);
        this.$store.commit("user/SET_USERINFO", userInfo);
        console.log(this.$store.state);
        this.$router.push({ name: "home" });
      } else {
        this.$notify({ title: "错误", message: result.msg, type: "error" });
      }
    },
  },
  async asyncData(ctx) {},
};
</script>

<style lang='less' scoped>
.page-login {
  height: 100vh;
  // padding: 80px 30px 0 0;
  background-image: url("https://imgchr.com/content/images/system/home_cover_1601010270144_8921bc.jpg");
  background: url("https://gw.alipayobjects.com/zos/rmsportal/TVYTbAXWheQpRcWDaDMu.svg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  backface-visibility: hidden;
  display: flex;
  font-size: 16px;
  justify-content: center;
  &-form {
    margin-top: 10vh;
    width: 380px;
    &-logo {
      display: flex;
      justify-content: center;
      height: 230px;
      overflow: hidden;
      position: relative;
      .email {
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
      img {
        width: 430px;
        height: 260px;
      }
    }
    &-middle {
      display: flex;
      flex-direction: column;
      .forget {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .register {
        display: flex;
        justify-content: flex-end;
      }
      .login {
        margin: 10px 0;
      }
    }
  }

  /deep/ .el-form-item__content {
    margin-left: 0 !important;
  }
}
</style>
