<template>
  <div class="uploadCom">
    <div @click="openDrawer" class="uploadCom-btn">
        <i class="iconfont icon-shangchuan"></i>
        <span>上传</span>
    </div>
    <el-drawer title="JPG PNG GIF 20 MB" direction="ttb" size='50%' :modal-append-to-body='bool' :wrapperClosable='bool' :visible.sync="drawer" @close='closeDrawer'>
      <div class="upload-content">
        <div class="upload-content-top">
            <div class="drag-wrapper" ref="drag" id="drop_area">
                <i class="el-icon-upload" style='fontSize:67px'></i>
                <span>请将图片拖到此处或 <el-button type='text' class="drag-wrapper-btn"  @click="proxyClick">点击上传</el-button></span>
                <input type="file" id="uploadInput" multiple="multiple" accept="image/*" @change="tirggerFileAll($event)" />
            </div>
            <div class="successImg" v-if="successImgs.length">
                <el-table :data="successImgs" style="width: 100%">
                    <el-table-column prop="filename" label="图片名称"></el-table-column>
                    <el-table-column prop="filesize" label="图片大小"></el-table-column>
                    <el-table-column prop="url" label="图片路径"></el-table-column>
                    <el-table-column fixed="right" label="操作" width="100">
                        <template slot-scope="scope">
                            <el-button v-clipboard="scope.row.url" v-clipboard:success="copysuccess" type="text"  size="small">复制地址</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
        
        <div class="upload-list">
          <div class="upload-list-item"  v-for="(item,index) in previewImgsArr" :key="index">
              <el-image style="width: 100%; height: 100%" :src="item" fit="fill"></el-image>
              <span class="mask">
                  <i class="el-icon-zoom-in"  @click="enlargeImg(item)"></i>
                  <i class="el-icon-delete" @click="removeImg(index)"></i>
              </span>
          </div>
        </div>
      </div>
      <el-button @click="uploadFile" class="upload-button">上传图片</el-button>
    </el-drawer>
    <el-dialog :visible.sync="dialogVisible" :modal='bool'>
        <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      bool:false,
      drawer: false,
      previewImgsArr: [], //存放本地图片的预览地址
      uploadFileArr: [], //存放多个实例化的file.需要上传的文件
      successImgs: [], //上传成功之后接口返回的数据
      dialogVisible: false,
      dialogImageUrl: ''
    };
  },
  methods: {
    copysuccess({value,e}){
        this.$notify({title: '复制',message: "复制成功！",  type:'success'});
    },
    proxyClick(){
        document.getElementById("uploadInput").click();
    }, //点击上传框触发上传图片的input

    tirggerFileAll(e) {
      const files = e.target.files;
      [].forEach.call(files, this.readAndPreview);
    }, //上传图片触发的时间，携带event

    enlargeImg(url){ 
        this.dialogImageUrl = url
        this.dialogVisible = true
    }, //放大预览图片

    removeImg(index){
      this.previewImgsArr.splice(index, 1);
      this.uploadFileArr.splice(index, 1);
      this.$notify({title: '移除成功',message: "已经移除该图片了！",  type:'success'});
    }, //删除预览图片

    readAndPreview(file) {
      const reader = new FileReader();
      reader.readAsDataURL(file); //readAsDataURL方法会使用base-64进行编码
      reader.onload = ((e) => { //简单图片读取完成之后把它分别放入预览图片数组和上传图片数组
        if (this.previewImgsArr.length > 4) { //因为判断在添加完之前 所以这里的4实际是五张图
            this.$notify({title: '图片超限',message: "最多一次五张图片哟",  type:'warning'});
        } else {
            if (this.previewImgsArr.indexOf(e.target.result) == -1) {
                this.previewImgsArr.push(e.target.result);
                this.uploadFileArr.push(file);
            } else {
                this.$notify({title: '重复图片',message: "已经过滤掉重复图片啦！",  type:'warning'});
            }
        }
      });
    }, //把图片转换成bolb对象再分别存入预览上传数组

    openDrawer() {
      this.$store.commit('status/SET_ISDRAWEROPEN', true)
      this.drawer = true;
      setTimeout(() => {
        let _vm = this;
        let dp = document.getElementById("drop_area");
        dp.addEventListener("dragover", function (e) {
          e.stopPropagation();
          e.preventDefault();
          e.dataTransfer.dropEffect = "copy";
        });
        dp.addEventListener("drop", function (e) {
          e.stopPropagation();
          e.preventDefault();
          const passType = ['png','jpg','jpeg','gif']
          let files = e.dataTransfer.files;
          let imgFiles = [].filter.call(files,(t)=>{
              const type = t.type.split('/')[1]
              return passType.includes(type) //因为拖曳没有版本禁止图片拖动其他格式文件，直接过滤掉非图片的文件
          });
          [].forEach.call(imgFiles, _vm.readAndPreview);
        });
      }, 100);
    }, //打开弹窗就给列表增加拖曳的监听事件用于拖曳上传图片

    async uploadFile() {
      let formData = new FormData();
      for (let i = 0; i < this.uploadFileArr.length; i++) {
        formData.append("files", this.uploadFileArr[i]);
      }
      //TODO 添加上传参数
      const result = await this.$myApi.upload.PostUploadFile(formData)
      this.successImgs = [...this.successImgs, ...result.data]
      this.previewImgsArr = [], //存放本地图片的预览地址
      this.uploadFileArr = []   //上传的地址都清空
    },

    closeDrawer(){
      setTimeout(() => {
        this.$store.commit('status/SET_ISDRAWEROPEN', false)
      }, 500);
      this.previewImgsArr = [], //存放本地图片的预览地址
      this.uploadFileArr = []
    }, //关闭抽屉让所有东西初始化
  },
};
</script>
<style lang='less' scoped>
.uploadCom {
  color: #333333;
  margin-right: 8px;
  &-btn{
      cursor: pointer;
      &:hover{
          color: aqua;
      }
  }
}

.upload-content {
  display: flex;
  flex-direction: column;
  &-top{
    display: flex;
    justify-content: center;
    padding: 0 30px;
    .drag-wrapper{
        width: 500px;
        margin-right:50px;
        height: 180px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border: 1px dashed #d9d9d9;
        input{
            display: none;
        }
        &-btn{
            color: #409eff;
            font-style: normal;
            cursor: pointer;
        }
    }
  }
  .upload-list{
      flex: 1;
      display: flex;
      align-items: center;
      &-item{
        width: 180px;
        height: 180px;
        overflow: hidden;
        margin-left: 30px;
        margin-top: 10px;
        position: relative;
        border: 1px solid #c0ccda;
        .mask{
            position: absolute;
            width: 100%;
            height: 100%;
            left: 0;
            top: 0;
            cursor: default;
            text-align: center;
            color: #fff;
            opacity: 0;
            font-size: 20px;
            background-color: rgba(0,0,0,.5);
            transition: opacity .3s;
            display: flex;
            align-items: center;
            justify-content: center;
            i {
               cursor: pointer;
               margin: 10px; 
            }
            &:hover{
                opacity: 1;
            }
        }
      }
    }
}

.upload-button{
    color: #fff;
    position: absolute;
    bottom: 20px;
    right: 20px;
    background: linear-gradient(90deg,#2db7f5,#6bc30d)
}
.successImg{
    flex: 1;
    height: 180px;
    overflow-y: scroll;
}
</style>