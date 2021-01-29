<template>
  <div class="app-header">
    <img src="@/assets/image/logo.png" @click="$router.push('/login')" alt="" />
    <div class="app-header-item">
        <home-menu :menuList="menuList" />
    </div>
  </div>
</template>

<script>
import HomeMenu from "../HomeMenu/HomeMenu";
export default {
  components: {
    HomeMenu,
  },
  data() {
    return {
      menuList: [
        {
          btnName: "xx",
          icon: "iconfont icon-yonghutouxiang",
          routes: [
            {
              iconPath: "iconfont icon-shezhi",
              routeName: "修改密码",
            },
            {
              iconPath: "iconfont icon-gerenzhongxin-zhong",
              routeName: "个人中心",
            },
          ],
        },
        {
          btnName: "关于",
          icon: "iconfont icon-guanyu",
          routes: [
            {
              iconPath: "iconfont icon-guanyu",
              routeName: "关于我们",
              path: "/about"
            },
            {
              iconPath: "iconfont icon-icon-bangzhu",
              routeName: "帮助使用",
            },
          ],
        },
      ],
    };
  },
};
</script>

<style lang='less' scoped>
.app-header {
  position: fixed;
  top: 0;
  width: calc(100vw - 80px);
  color: #1890ff;
  height: 75px;
  display: flex;
  justify-content: space-between;
  // background: url('http://localhost:5288/images/1610616056459navbg.jpg') no-repeat center;
  align-items: center;
  padding: 0 50px;
  overflow: hidden;
  img {
    height: 90px;
    cursor: pointer;
  }
  &-item{
      display: flex;
      justify-content: center;
      align-items: center;
  }
}
</style>