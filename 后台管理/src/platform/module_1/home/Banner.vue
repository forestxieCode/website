<template>
  <div id="Banner">
    <el-row class="row-bot">
      <el-col :span="22">
        <span>{{title}}</span>
      </el-col>
       <el-col :span="2" class="padd-right">
          <el-button type="primary" @click="addbanlanImage" size="small">添加</el-button>
      </el-col>
    </el-row>
    <el-row class="padd" :span="24">
    </el-row>
  
    <el-row  :gutter="10" class="content">
            <el-col :span="6" v-for="item in CarousesData" :key="item.id">
              <div class="item">
                <div class="top">
                  <img :src="item.picPath" alt="">
                </div>
                <div class="title">
                   <span class="circular">{{item.sort}}</span>
                   {{item.title}}
                </div>
                <div class="overhold">
                    <span class="el-icon-zoom-in" @click="showimg(item.picPath,item.title)"></span>
                    <span class="el-icon-delete" @click="deleteCarouse(item.id)"></span>
                </div>
              </div>
            </el-col>
    </el-row>

    <el-dialog
      :title="(frompropo.type!=3&&frompropo.type!=4)?'图片上传':'添加房型'"
      :visible.sync="visibleUploadImg"
      width="30%"
      >
      <el-form :model="frompropo"  ref="fromUpload"  :rules="funcFormRuleList" label-width="80px">
          <el-col :span="24">
              <el-form-item label="序号" prop="sort">
                <el-input v-model="frompropo.sort" size="small" required></el-input>
              </el-form-item>
          </el-col>
          <el-col :span="24">
              <el-form-item label="标题" prop="title">
                <el-input v-model="frompropo.title" size="small" ></el-input>
              </el-form-item>
          </el-col>
          <el-col :span="24">
              <el-form-item label="上传">
                <el-upload
                    class="avatar-uploader"
                    :action="`${apiHost}/auth/file/uploadRichAttanch`"
                    accept='.png,.jpg'
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    name="upfile"
                    :before-upload="beforeAvatarUpload"
                    >
                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
                <!-- <el-input v-model="fromdata.password" size="small" ></el-input>   -->
              </el-form-item>
          </el-col>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="visibleUploadImg = false" size="small">取 消</el-button>
        <el-button type="primary" @click="sublimt()" size="small">确 定</el-button>
      </span>
      </el-dialog>

      <el-dialog
      :title="imgtitle"
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

export default {
  name: "Banner",
  data() {
    return {
      title:'',
      visibleUploadImg:false,
      frompropo:{
            title:'',
            sort:'',
            picPath:'',
            remark:'',
            type:1
      },
      imgtitle:'',
      imageUrl: '',
      VisibleZoom:false,
      CarousesData:[],
      imgUrl:'',
      apiHost:originApi,
      funcFormRuleList: {
					index: [{
						required: true,
						message: '请输入元素id'
					}]
				},
    }
  },
  mounted() {
     var path = this.$route.path
      if(path.includes('/Home/banner')){
        this.frompropo.type = 1
        this.title = '首页的轮播图'
      }else if(path.includes('/IndustrialTourism/banner')){
        this.frompropo.type = 2
         this.title = '工业旅游轮播图'
      }else if(path.includes('/IndustrialTourism/HotelReservation')){
        this.frompropo.type = 3
         this.title = '酒店预订'
      }else if(path.includes('/IndustrialTourism/ConferenceServices')){
        this.frompropo.type = 4
         this.title = '会议室预订'
      }
    this.getCarouses()
  },
  watch: {
      $route: {
        handler: function(val, oldVal){
            var path = this.$route.path
              if(path.includes('/Home/banner')){
                this.frompropo.type = 1
                this.title = '首页的轮播图'
              }else if(path.includes('/IndustrialTourism/banner')){
                this.frompropo.type = 2
                this.title = '工业旅游轮播图'
              }else if(path.includes('/IndustrialTourism/HotelReservation')){
                this.frompropo.type = 3
                this.title = '酒店预订'
              }else if(path.includes('/IndustrialTourism/ConferenceServices')){
                this.frompropo.type = 4
                this.title = '会议室预订'
              }
            this.getCarouses()
        },
        // 深度观察监听
        deep: true
      }
},
  methods: {
    showimg(Url,title){
      this.VisibleZoom=true 
      this.imgUrl = Url
      this.imgtitle= title
    },
    sublimt(){
      this.$refs['fromUpload'].validate((valid) => {
          if (!valid) return 
          if(this.frompropo.url==''){
            this.$message('请上传图片')
            return 
          }
          var str = JSON.stringify(this.frompropo)
          saveCarouse(JSON.parse(str)).then(res => {
          if(res.success){
              this.$message.success('保存成功')
              this.visibleUploadImg = false
              this.getCarouses()
            }
          })
      })
    },
    addbanlanImage(){
      this.visibleUploadImg=true
      for(let key in this.frompropo){
                if(key!='type'){
                  this.frompropo[key]  = ''
                } 
      }
      this.imgUrl = ''
      this.imageUrl=''
    },
    handleAvatarSuccess(res, file) {
        this.frompropo.picPath = res.data.url
        this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
        const isLt2M = file.size / 1024 / 1024 < 10;
        if (!isLt2M) return this.$message.error("上传图片大小不能超过 10MB!");
        return isLt2M;
    },
    getCarouses(){
      getCarouses(this.frompropo.type).then(res =>{
        if(res.success){
          this.CarousesData = res.data
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
    }
  }
}
</script>
<style scoped>
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

