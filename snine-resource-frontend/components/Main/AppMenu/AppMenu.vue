<template>
  <div class="app-menu-list">
    <ul>
      <com-upload-public />
      <!-- <li><i class='iconfont icon-shangchuan'></i>上传</li> -->
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
import ComUploadPublic from '@/components/Base/ComUploadPublic/ComUploadPublic'
export default {
  props: {
    navList: {
      type: Array,
      default: [],
    },
  },
  components:{
    ComUploadPublic
  },
  data() {
    return {};
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