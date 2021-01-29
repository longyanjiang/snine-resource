<template>
  <div class="page_home flex_between">
    <div class="page_home_l flex_3 scroll_none" :style="{ zIndex: isOpenDrawer ? '-1' : '0' }" >
      <div class="page_home_l_title">
        <h3>上传的所有资源</h3>
      </div>
      <div class="page_home_l_content scroll_none">
        <com-title titleName="我最新上传的图片" />
        <com-list :listData="myAllImgs" />
        <com-title titleName="我最新上传的文章" />
        <com-list :listData="myAllArticles" />
      </div>
    </div>

    <div
      class="page_home_r flex_5 flex_column"
      :style="{ zIndex: isOpenDrawer ? '-1' : '0' }"
    >
      <com-image-list :list="myAllImgs" name="我的上传" class="flex_1" />
      <com-image-list
        class="flex_1"
        :list="myAllImgs"
        name="精选壁纸"
        style="marginTop: 30px"
      />
      <com-welcome />
    </div>
  </div>
</template>

<script>
import ComTitle from "@/components/Base/ComTitle/ComTitle.vue";
import ComList from "@/components/Base/ComList/ComList.vue";
import ComImageList from "@/components/Base/ComImageList/ComImageList.vue";
import ComWelcome from '../../components/Base/ComWelcome/ComWelcome.vue';
export default {
  head() {
    return {
      title: "Snine的主页",
    };
  },
  layout: "home",
  components: {
    ComTitle,
    ComList,
    ComImageList,
    ComWelcome,
  },
  data() {
    return {
      myAllImgs: [],
      myImgCount: "",
      myAllArticles: [],
      date: new Date(),
    };
  },
  methods: {
    async initData() {
      const [allImgs, allArticle] = await Promise.all([
        await this.$myApi.query.GetQueryAllImg(),
        await this.$myApi.query.GetQueryArticle(),
      ]);
      this.myAllImgs = allImgs.data.rows;
      this.myAllArticles = allArticle.data.rows;
    },
  },
  created() {},
  computed: {
    isOpenDrawer: function () {
      return this.$store.state.status.isDrawerOpen;
    },
  },
  mounted() {
    this.initData();
  },
};
</script>
<style lang='less' scoped>
.page_home {
  padding: 0 20px 20px;
  height: calc(100vh - 75px);
  &_l {
    &_title{
      height: 60px;
      display: flex;
      align-items: center;
    }
    &_content{
      overflow-y: scroll;
      height: calc(100% - 60px);
    }
    border-radius: 10px;
    background: #fff;
    padding: 0 15px 10px;
    height: 97%;
    margin-right: 15px; 
  }
  &_r {
    padding: 0 20px 20px;
  }
}
</style>

