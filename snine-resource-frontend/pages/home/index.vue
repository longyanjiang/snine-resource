<template>
  <div class="page-home">
    <div class="page-home-l flex_column">
      <div class="title">
        <!-- <com-title name="文章列表" /> -->
      </div>
      <com-title name="我上传的文章资源列表" />
      <div class="article scroll-none">
        <com-list :listData="myAllArticles" type="md" />
      </div>
      <com-title name="我上传的图片资源列表" />
      <div class="images scroll-none">
        <com-list :listData="myAllImgs" />
      </div>
      <com-title name="我上传的文件资源列表" />
      <div class="file scroll-none">
        <com-list :listData="myAllImgs" type="file" />
      </div>
    </div>
    <div class="page-home-r flex_column">
      <div class="home-public-top flex_between" :style="{ zIndex: isOpenDrawer ? '-1' : '0' }" >
        <div class="article-list">
          <com-title name="热门文章推荐" />
        </div>
        <div class="chart">
          <div id="myChart"></div>
        </div>
      </div>
      <div class="home-public-btm"></div>
    </div>
  </div>
</template>

<script>
import ComTitle from "@/components/Base/ComTitle/ComTitle.vue";
import ComList from "@/components/Base/ComList/ComList.vue";
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
  },
  data() {
    return {
      myAllImgs: [],
      myImgCount: "",
      myAllArticles: []
    };
  },
  methods: {
    async initData(){
      const [allImgs,allArticle] = await Promise.all([await this.$myApi.query.GetQueryAllImg(),await this.$myApi.query.GetQueryArticle()])
      console.log(allImgs);
      this.myAllImgs = allImgs.data.rows;
      this.myAllArticles = allArticle.data.rows;
    },
    echartsInit() {
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      // 开始渲染
      myChart.setOption({
        title: { text: "我的上传" },
        tooltip: {},
        toolbox: {
          feature: {
            dataView: {},
            saveAsImage: {
              pixelRatio: 2,
            },
          },
        },
        xAxis: {
          data: ["文章", "图片", "文件"],
          barWidth: 10,
        },
        yAxis: {},
        series: [
          {
            name: "上传量",
            type: "bar",
            barWidth: 20,
            data: [5, 20, 36],
          },
        ],
      });
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
    this.echartsInit();
  },
};
</script>
<style lang='less' scoped>
.page-home {
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  height: calc(100vh - 75px);
  &-l {
    flex: 4;
    .title {
      // background: yellow;
      // height: 50px;
    }
    .article {
      flex: 1;
      // background: blueviolet;
      overflow-y: scroll;
      border-bottom: 1px solid rgba(7, 17, 27, 0.1);
    }
    .images {
      flex: 1;
      overflow-y: scroll;
      border-bottom: 1px solid rgba(7, 17, 27, 0.1);
    }
    .file {
      flex: 1;
      overflow-y: scroll;
      border-bottom: 1px solid rgba(7, 17, 27, 0.1);
    }
  }
  &-r {
    margin-left: 20px;
    flex: 6;
    .home-public-top {
      flex: 3;
      // z-index: -1;
      .article-list {
        padding: 0 15px;
        flex: 1;
        border: 1px solid turquoise;
      }
      .chart {
        padding: 0 15px;
        flex: 1;
        #myChart {
          width: 100%;
          height: 80%;
          z-index: 0;
        }
      }
    }
    .home-public-btm {
      flex: 2;
      background: yellowgreen;
    }
  }
}
</style>