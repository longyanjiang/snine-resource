<template>
  <div class="app-layout-wrap">
    <home-header />
    <div class="app-content">
      <slot></slot>
    </div>
    <app-footer />
  </div>
</template>

<script>
import HomeHeader from "@/components/Main/HomeHeader/HomeHeader";
import AppFooter from "@/components/Main/AppFooter/AppFooter";
export default {
  components: {
    HomeHeader,
    AppFooter,
  },
};
</script>

<style lang='less' scoped>
.app-content{
    padding: 75px 0 0 0;
}
</style>