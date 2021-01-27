<template>
  <div class="page_home flex_between" >
    <div class="page_home_l flex_3 flex_column" :style="{ zIndex: isOpenDrawer ? '-1' : '0' }">
      <div class="flex_1">
        <com-title titleName='我最新上传的图片' />
      </div>
      <div class="flex_1">
        <com-title titleName='我最新上传的文章' />
      </div>
    </div>

    <div class="page_home_r flex_5 flex_column" :style="{ zIndex: isOpenDrawer ? '-1' : '0' }">
      <com-image-list :list="myAllImgs" name="我的上传" />
      <com-image-list :list="myAllImgs" name="精选壁纸" style="marginTop: 17px"/>
      <div class="time flex_1 flex_end">当前时间{{date}}</div>
    </div>
  </div>
</template>

<script>
import ComTitle from "@/components/Base/ComTitle/ComTitle.vue";
import ComList from "@/components/Base/ComList/ComList.vue";
import ComImageList from "@/components/Base/ComImageList/ComImageList.vue";
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
    ComImageList
  },
  data() {
    return {
      myAllImgs: [],
      myImgCount: "",
      myAllArticles: [],
      date: new Date()
    };
  },
  methods: {
    async initData() {
      const [allImgs, allArticle] = await Promise.all([
        await this.$myApi.query.GetQueryAllImg(),
        await this.$myApi.query.GetQueryArticle(),
      ]);
      console.log(allImgs);
      this.myAllImgs = allImgs.data.rows;
      this.myAllArticles = allArticle.data.rows;
      this.nowTimes()
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
    timeFormate(timeStamp) {
      let year = new Date(timeStamp).getFullYear();
      let month =new Date(timeStamp).getMonth() + 1 < 10? "0" + (new Date(timeStamp).getMonth() + 1): new Date(timeStamp).getMonth() + 1;
      let date =new Date(timeStamp).getDate() < 10? "0" + new Date(timeStamp).getDate(): new Date(timeStamp).getDate();
      let hh =new Date(timeStamp).getHours() < 10? "0" + new Date(timeStamp).getHours(): new Date(timeStamp).getHours();
      let mm =new Date(timeStamp).getMinutes() < 10? "0" + new Date(timeStamp).getMinutes(): new Date(timeStamp).getMinutes();
      let ss =new Date(timeStamp).getSeconds() < 10? "0" + new Date(timeStamp).getSeconds(): new Date(timeStamp).getSeconds();
      this.date = year + "年" + month + "月" + date +"日"+" "+hh+":"+mm+':'+ss ;
    },
    nowTimes(){
      setInterval(() => {
       this.timeFormate(new Date())
      }, 1000);
    },
  },
  created() {},
  computed: {
    isOpenDrawer: function () {
      return this.$store.state.status.isDrawerOpen;
    },
    time: function(){
      return new Date()
    }
  },
  mounted() {
    this.initData();
    // this.echartsInit();
  },
};
</script>
<style lang='less' scoped>
.page_home {
  padding: 0 20px 20px;
  height: calc(100vh - 75px);
  &_l{
    border-radius: 10px;
    background: #fff;
    height: 98%;
    margin-right: 15px;
  }
  &_r{
    padding: 0 20px 20px;
    .time{
      background: #fff;
      border-radius: 10px;
      margin-top: 15px;
      align-items: center;
      padding-right: 10px;
    }
  }
}
</style>

