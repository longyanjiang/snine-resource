<template>
  <div class="app-menu-list">
    <ul>
      <li v-for="(nav, index) in navList" :key="index">
        <nuxt-link :to="nav.path" active-class="current">
          <i :class='nav.icon'></i>
          {{nav.name}}
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    navList: {
      type: Array,
      default: [],
    },
  },
};
</script>
<style lang='less' scoped>
.app-menu-list {
  height: 100%;
  display: flex;
  align-items: center;
  font-size: 18px;
  ul {
    display: flex;
    align-items: center;
    li {
      margin-left: 20px;
      list-style: none;
      cursor: pointer;
      &:hover{
            color: aqua;
          }
      .current {
        color: #f08;
      }
    }
  }
}
</style>