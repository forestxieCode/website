<template>
  <div id="Banner">
    <el-row class="row-bot">
      <el-col :span="22">
        <span>系统设置</span>
      </el-col>
       <el-col :span="2" class="padd-right">
          <el-button type="primary" @click="addbanlanImage" size="small" :disabled="mp3Data.length&&vidoData.length">添加</el-button>
        <!-- <span>首页轮播图</span> -->
      </el-col>
    </el-row>
    <el-row class="padd" :span="24">
    </el-row>
  
    <el-row  :gutter="30" :span="24" class="content">
           <el-col :span="12" >
             背景音乐
               <div class="medo">
                   <video 
                    v-if="mp3Data.length&&mp3Data[0].picPath"
                    :src="mp3Data[0].picPath" 
                    controls="controls"
                    width="100%"
                    height="100%"
                    >
                </video>
                 <div class="defalut" v-else>
                    暂无音频，请上传
                </div>
               </div>
               <div style="text-align:center" v-if="mp3Data.length">
                 <el-button type="danger" style="width:300px;" @click="deleteCarouse(mp3Data[0].id)">删除</el-button>
               </div>
                 
          </el-col>
          <el-col :span="12" >
             开场动画
                <div class="medo">
                  <video 
                    v-if="vidoData.length&&vidoData[0].picPath"
                    :src="vidoData[0].picPath" 
                    controls="controls"
                    width="100%"
                    height="100%"
                    >
                </video>
                <div class="defalut" v-else>
                    暂无视频，请上传
                </div>
                
                </div>
                <div style="text-align:center" v-if="vidoData.length">
                     <el-button type="danger"  style="width:300px;" @click="deleteCarouse(vidoData[0].id)">删除</el-button>
                </div>
          </el-col>
    </el-row>

    <el-dialog
      title="编辑"
      :visible.sync="visibleUploadImg"
      width="45%"
      >
      <el-form :model="frompropo"  ref="fromUpload"  :rules="funcFormRuleList" label-width="80px">
          <el-row>
          <el-col :span="24">
              <el-form-item label="添加音乐" >
                <el-upload
                    class="avatar-uploader"
                    :action="`${apiHost}/auth/file/uploadRichAttanch`"
                    accept='.mp3'
                    :show-file-list="false"
                    :data="paramsdata"
                    name="upfile"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload"
                    :on-progress="uploadAvatarProcess"
                    >
                    <!-- <video
                      v-if="mp3 !='' && mp3Flag == false"
                      :src="mp3"
                      width="350"
                      height="180"
                      controls="controls"
                    ></video> -->
                    <audio 
                    v-if="mp3 !='' && mp3Flag == false"
                    :src="mp3" controls="controls"
                    width="350"
                    height="120"
                    >您的浏览器不支持音频播放
                    </audio>   
                    <i  v-else-if="mp3 =='' && mp3Flag == false&&mp3Data.length==0"
                     class="el-icon-plus avatar-uploader-icon"></i>
                    <el-progress
                      v-if="mp3Flag == true"
                      type="circle"
                      :percentage="mp3UploadPercent"
                      style="margin-top:30px"
                    ></el-progress> 
                </el-upload>
              </el-form-item>
          </el-col>
           <el-col :span="24">
          <el-form-item label="添加视频">
                  <el-upload
                    class="avatar-uploader"
                    :action="`${apiHost}/auth/file/uploadRichAttanch`"
                    accept='.mp4,.qlv,.qsv,.ogg,.flv,.avi,.wmv,.rmvb'  
                    :data="paramsdata"   
                    name="upfile"                             
                    :show-file-list="false"
                    :before-upload="beforeUploadVideo"                
                    :on-success="handleVideoSuccess"                   
                    :on-progress="uploadVideoProcess">               
                    <video
                      v-if="Video !='' && videoFlag == false"
                      :src="Video"
                      width="600"
                      height="300"
                      controls="controls"
                    >您的浏览器不支持视频播放</video>   
                    <i
                      v-else-if="Video =='' && videoFlag == false&&vidoData.length==0"
                      class="el-icon-plus avatar-uploader-icon"
                    ></i>           
                    <el-progress
                      v-if="videoFlag == true"
                      type="circle"
                      :percentage="videoUploadPercent"
                      style="margin-top:30px"
                    ></el-progress>  
                  </el-upload>
        </el-form-item>
        </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="visibleUploadImg = false" size="small">取 消</el-button>
        <el-button type="primary" @click="sublimt()" size="small">确 定</el-button>
      </span>
      </el-dialog>

      <el-dialog
      title="图片查看"
      :visible.sync="VisibleZoom"
      width="30%"
      >
      <el-row>
         <el-col :span="24">
            <img :src="imgUrl" alt="" style="width:100%;height:100%;">
        </el-col>  
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="VisibleZoom = false" size="small">取 消</el-button>
        <!-- <el-button type="primary" @click="sublimt()" size="small">确 定</el-button> -->
      </span>
      </el-dialog>
  </div>
</template>

<script>
import { formatDateTime, syntaxHighlight } from "../protUserLog/util/index"
import { getCarouses , saveCarouse , deleteCarouse } from '@/api'
import apiHost from '@/api/apiConfig'
const originApi = apiHost.ORIGIN
function initfromUpload(){
  return {
    title:'',
    sort:'',
    picPath:'',
    remark:'',
    type:1
  }
}

export default {
  name: "Banner",
  data() {
    return {
      visibleUploadImg:false,
      frompropo:initfromUpload(),
      imageUrl: '',
      mp3Data:[],
      vidoData:[],
      imgUrl:'',
      apiHost:originApi,
      funcFormRuleList: {
					index: [{
						required: true,
						message: '请输入元素id'
					}]
        },
        // 视频
        videoFlag:false,      //刚开始的时候显示为flase
        videoUploadPercent: '0%',  //进度条刚开始的时候为0%
        paramsdata:{
            '参数': '参数值'    //添加其他参数
        },
        Video:'',
        mp3Flag:false,
        mp3UploadPercent:'0%',
        mp3:''
    }
  },
  computed:{
  },
  mounted() {
    this.getCarouses()
  },
  methods: {
    sublimt(){
      // this.$refs['fromUpload'].validate((valid) => {
      //     if (!valid) return 
      //     if(this.frompropo.url==''){
      //       this.$message('请上传图片')
      //       return 
      //     }
      //     var str = JSON.stringify(this.frompropo)
      //     saveCarouse(JSON.parse(str)).then(res => {
      //     if(res.success){
      //         this.$message.success('保存成功')
      //         this.visibleUploadImg = false
      //         this.getCarouses()
      //       }
      //     })
      // })
      if(this.mp3){
        var fromUpload = initfromUpload()
        fromUpload.title='音乐'
        fromUpload.type=5
        fromUpload.picPath = this.mp3
        var str = JSON.stringify(fromUpload)
        saveCarouse(JSON.parse(str)).then(res => {
          if(res.success){
             this.$message.success('保存成功')
          }
        })
      }
      if(this.Video){
        var fromUpload = initfromUpload()
         fromUpload.type=6
         fromUpload.title='视频'
         fromUpload.picPath = this.Video
         var str = JSON.stringify(fromUpload)
         saveCarouse(JSON.parse(str)).then(res => {
          if(res.success){
             this.$message.success('保存成功')
           }
         })
      }
      this.mp3 = ''
      this.Video =''
      this.visibleUploadImg=false 
      this.getCarouses()
    },
    addbanlanImage(){
      this.visibleUploadImg=true
      this.frompropo=initfromUpload()
      this.imgUrl = ''
      this.imageUrl=''
    },
    handleAvatarSuccess(res, file) {
        this.mp3Flag = false;
        this.mp3UploadPercent = 0;
        this.mp3 = res.data.url;
    },
    beforeAvatarUpload(file) {
        const isLt2M = file.size / 1024 / 1024 < 5;
        if (!isLt2M) return this.$message.error("上传音频不能超过 5MB!");
        return isLt2M;
    },
    uploadAvatarProcess(event, file, fileList){
      this.mp3Flag = true;
      this.mp3UploadPercent = parseInt(file.percentage);

    },
    getCarouses(){
      getCarouses(5).then(res =>{
        if(res.success){
          this.mp3Data = res.data
        }
      })
      getCarouses(6).then(res =>{
        if(res.success){
          this.vidoData = res.data
        }
      })
    },
    deleteCarouse(id){
       	this.$confirm('是否确认删除?', '提示', {
					type: 'warning'
				}).then(() => {
       deleteCarouse(id).then(res=>{
        if(res.success){
          this.$message.success('删除成功')
          this.getCarouses()
        }else {
          this.$message('删除失败')
        }
      })
     })
    },
    //上传视频
    beforeUploadVideo(file) {          //视频上传之前判断他的大小
      const isLt10M = file.size / 1024 / 1024  < 30;
      if (!isLt10M) {
        this.$message.error('上传视频大小不能超过30MB!');
        return false;
      }
    },
    uploadVideoProcess(event, file, fileList){    //视频上传的时候获取上传进度传给进度条
      this.videoFlag = true;
      this.videoUploadPercent = parseInt(file.percentage);
    },
    handleVideoSuccess(res, file) {           //视频上传成功之后返回视频地址
      this.videoFlag = false;
      this.videoUploadPercent = 0;
      this.Video = res.data.url;
    }


  }
}
</script>
<style scoped>
.medo{
  width: 100%;
  height: 320px;
  margin-bottom: 20px;
}
.defalut{
  margin-top: 20px;
  width: 100%;
  height: 300px;
  background: #eee;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #333;
  font-weight: 700;
  font-size: 20px;
}

#Banner {
  width: 100%;
  background: #fff;
  padding: 10px;
  font-size: 24px;
  color: #333;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  letter-spacing: 1.5px;
}
.row-bot {
  border-bottom: 1px solid #dcdfe6;
  padding-bottom: 10px;
}
.search-input {
  width: 100%;
}
.padd {
  padding: 10px 0px;
}
.padd-left {
  padding-left: 40px;
}
.padd-right{

  text-align: end;
}

.item {
  position: relative;
  height: 300px;
  border-radius: 4px;
  overflow: hidden;
  background: rgba(255,255,255,1);
  box-shadow: 0px 1px 29px 0px rgba(0, 0, 0, 0.1)
}
.item .top{
  width: 100%;
  height: 83%;
}
.item .top img{
  width: 100%;
  height: 100%;
}
.item .title{
  padding: 10px;
  width: 100%;
  height: 17%;
  font-size: 18px;
  color: #333;
  line-height: 16%;
}
.item .circular{
  background: #388bff;
  height: 25px;
  width: 25px;
  color: #fff;
  border-radius: 100%;
  text-align: center;
  display: inline-block;
  line-height: 25px;
}
.item .overhold{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
  opacity: 0;
  
}
.item .overhold span{
  color: #fff;
  margin: 20px;
  cursor: pointer;
}
.overhold:hover{
  opacity: 1;
  transition: all .5s linear;
}
</style>

<style>
.el-date-editor .el-range-separator{
  padding: 0 2px;
}

.el-date-editor .el-range-separator{
  padding: 0 2px;
}
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}
.avatar-uploader .el-upload:hover {
    border-color: #409EFF;
}
.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}
.avatar {
    width: 178px;
    height: 178px;
    display: block;
}
.content .el-col {
    border-radius: 4px;
    padding-bottom:10px;  
}
.bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>

