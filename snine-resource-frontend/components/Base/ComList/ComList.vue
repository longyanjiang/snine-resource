<template>
    <ul class="com-list">
        <li v-for="(item, index) in listData" :key="index" class="flex_between">
            <div>
                <span :style="{backgroundColor: index < 3 ? '#314659' : '',color: index < 3 ? '#fff' : '#000'}" class="num">{{index + 1}}</span>
                <span class="filename" v-if="item.filename" @click="openImg(item.filepath)">{{item.filename}}</span>
                <span class="filename"  v-if="item.articleName" @click="openImg(item.filepath)">{{item.articleName}}</span>
            </div>
            <div>
                <el-button type="text" v-clipboard="item.filepath" v-clipboard:success="copysuccess" v-if="type=='img'">复制地址</el-button>
                <el-button type="text" v-if="type=='file'" @click="uploadFile(item.filepath,item.filename)">下载文件</el-button>
                <el-button type="text" v-if="type=='md'" @click="readArticle(item)">阅读文章</el-button>
            </div>
        </li>
        <el-dialog :visible.sync="dialogTableVisible">
            <img class="dialogImg" :src="dialogImg">
        </el-dialog>
    </ul>
</template>

<script>

export default {
    components: {},
    data(){
        return {
            dialogTableVisible: false,
            dialogImg: ''
        }
    },
    props:{
        listData: {
            type: Array,
            default: []
        },
        type: {
            type: String,
            default: 'img' //三种类型  img  file  md
        }
    },  
    methods: {
        copysuccess(e){
            this.$notify({title: '复制',message: "复制成功！",  type:'success'});
        },
        uploadFile(url,name){
            let a = document.createElement('a')
            a.href = url;
            a.download = name
            a.click();
        },
        openImg(url){
            if(this.type == 'img'){
                this.dialogImg = url;
                this.dialogTableVisible = true;
            }else{
                return;
            }
        },
        readArticle(item){
            console.log(item);
        }
    },
}
</script>
<style lang='less' scoped>
ul{
    padding: 0 10px 0 10px;
    height: 99%;
    // box-shadow: 0 4px 8px 0 rgba(7,17,27,.1);
}
li{
    line-height: 30px;
    .num{
        display: inline-block;
        width: 20px;
        height: 20px;
        margin-top: 1.5px;
        margin-right: 16px;
        font-weight: 600;
        font-size: 12px;
        line-height: 20px;
        text-align: center;
        border-radius: 20px;
    }
    .filename{
        cursor: pointer;
    }
}
.dialogImg{
    width: 100%;
    height: 100%;
}
</style>