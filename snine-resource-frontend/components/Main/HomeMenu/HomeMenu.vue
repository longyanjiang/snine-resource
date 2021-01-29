<template>
  <div class="app-menu-list">
    <com-upload-private ref="drawer"/>
    <ul>
      <li v-for="(item, index) in menuList" :key="index">
        <div>
          <el-dropdown >
            <span class="el-dropdown-link">
              <span class="btnName"><i :class="item.icon"></i>{{ item.btnName == 'xx' ? username : item.btnName }}</span><i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                v-for="(route, index) in item.routes"
                :icon="route.iconPath"
                :key="index"
                ><span style="width: 100%,height:100%,padding: 10px" @click="clickItem(route)">{{ route.routeName }}</span></el-dropdown-item
              >
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import ComUploadPrivate from '../../Base/ComUploadPrivate/ComUploadPrivate.vue';
export default {
  name:'HomeMenu',
  components:{
    ComUploadPrivate
  },
  props: {
     menuList: {
      type: Array,
      default: [],
    },
  },
  data() {
    return {
     
    };
  },
  computed:{
      username:function(){
          const {username} = this.$store.state.user.userInfo
          return username ? username : 'xxx'
      }
  },
  methods:{
    clickItem( item ) {
      console.log(item,item.path);
      this.$router.push({ path: item.path });
    }
  }
};
</script>
<style lang='less' scoped>
.app-menu-list {
  height: 100%;
  display: flex;
  align-items: center;
  ul {
    display: flex;
    align-items: center;
    li {
      color:#333;
      margin-left: 10px;
      list-style: none;
      i{
          margin-right: 4px;
      }
      &:hover {
        color: aqua;
        i{
            color: aqua;
        }
        .btnName{
          color: aqua;
        }
      }
    }
  }

  .el-dropdown-link {
    cursor: pointer;
    color: #333;
    font-size: 16px;
    &:focus{
        outline: none;
        user-select: none;
    }
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
}
</style>