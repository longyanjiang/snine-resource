<template>
  <div class="com_welcome">
    <div>欢迎使用本系统，{{week}}，祝您使用愉快。</div>
    <div>当前时间{{ date }}</div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      date: "",
      week:''
    };
  },
  methods: {
    timeFormate(timeStamp) {
      let year = new Date(timeStamp).getFullYear();
      let month =
        new Date(timeStamp).getMonth() + 1 < 10
          ? "0" + (new Date(timeStamp).getMonth() + 1)
          : new Date(timeStamp).getMonth() + 1;
      let date =
        new Date(timeStamp).getDate() < 10
          ? "0" + new Date(timeStamp).getDate()
          : new Date(timeStamp).getDate();
      let hh =
        new Date(timeStamp).getHours() < 10
          ? "0" + new Date(timeStamp).getHours()
          : new Date(timeStamp).getHours();
      let mm =
        new Date(timeStamp).getMinutes() < 10
          ? "0" + new Date(timeStamp).getMinutes()
          : new Date(timeStamp).getMinutes();
      let ss =
        new Date(timeStamp).getSeconds() < 10
          ? "0" + new Date(timeStamp).getSeconds()
          : new Date(timeStamp).getSeconds();
      this.date =
        year +
        "年" +
        month +
        "月" +
        date +
        "日" +
        " " +
        hh +
        ":" +
        mm +
        ":" +
        ss;
    },
    nowTimes() {
      setInterval(() => {
        this.timeFormate(new Date());
      }, 1000);
    },
    getweek(){
        let arr = new Array("日", "一", "二", "三", "四", "五", "六");  
        let week = new Date().getDay();  
        this.week = "今天是星期"+ arr[week];  
    }
  },
  mounted() {
    this.nowTimes();
    this.getweek();
  },
};
</script>
<style lang='less' scoped>
.com_welcome {
  display: flex;
  justify-content: space-between;
  background: #fff;
  border-radius: 10px;
  margin-top: 15px;
  align-items: center;
  padding:0 10px;
  height: 40px;
}
</style>