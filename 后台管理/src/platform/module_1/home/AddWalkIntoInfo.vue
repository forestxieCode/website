<template>
  <div id="AddWalkIntoInfo">
    <el-row class="row-bot">
      <el-col :span="20">
        <span>{{titlestr}}{{title}}</span>
      </el-col>
      <el-col :span="4" class="padd-right">
        <el-button size="small" @click="$router.go(-1)" type="primary">返回</el-button>
      </el-col>
    </el-row>
    <el-form ref="form" :model="AddForminfo" label-width="100px">
      <el-row class="padd" :gutter="20">
        <el-col :span="12">
          <el-form-item label="标题" required>
            <el-input v-model="AddForminfo.title" size="small"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="排序" required>
            <el-input v-model="AddForminfo.sort" size="small"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="简述" required>
            <el-input
              type="textarea"
              v-model="AddForminfo.remark"
              size="small"
              style="width:100%"
              :rows="9"
            ></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="缩略图片" required>
            <el-upload
              accept=".png, .jpg"
              class="avatar-uploader"
              :action="`${apiHost}/auth/file/uploadRichAttanch`"
              :show-file-list="false"
              name="upfile"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <img v-else-if="AddForminfo.picPath" :src="AddForminfo.picPath" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
        </el-col>

        <el-col :span="type==4?12:24" v-if="type!=5&&type!=6">
          <el-form-item label="发文作者" required>
            <el-input v-model="AddForminfo.author" size="small"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="type==4">
          <el-form-item label="类型" required>
            <el-select v-model="AddForminfo.childType" placeholder="请选择" size="small">
              <el-option
                v-for="item in selectType"
                :key="item.value"
                :label="item.name"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="24" style="padding:0px;" v-if="type!=5&&type!=6">
          <div style="font-size: 14px;color: #606266;text-indent: 1.5em;">内容</div>
          <div class="vue-ueditor">
            <VueUEditor @ready="editorReady"/>
          </div>
        </el-col>
        <el-col :span="24"></el-col>
        <el-col :span="24" style="padding:0px;">
          <el-form-item style="text-align:center;">
            <el-button type="primary" size="small" @click="sublimt">保存</el-button>
            <!-- <el-button type="primary" size="small" @click="SaveandPublic">保存并发布</el-button> -->
            <el-button type="primary" size="small" @click="dialogVisible=true">提交审批</el-button>
            <router-link to="/news/offcial-news">
              <el-button size="small" @click="$router.go(-1)">取消</el-button>
            </router-link>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <el-dialog title="请选择审批人" :visible.sync="dialogVisible" width="20%">
      <div>
        <el-select v-model="AddForminfo.approve_man_id" placeholder="请选择" @change="selectValue">
          <el-option
            v-for="item in options"
            :key="item.userId"
            :label="item.userName"
            :value="item.userId"
          ></el-option>
        </el-select>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="AgencySave">保 存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
function initselectType() {
  return [
    {
      name: "金牌活动",
      value: 1
    },
    {
      name: "品牌介绍",
      value: 2
    }
  ];
}
import { formatDateTime, syntaxHighlight } from "../protUserLog/util/index";
import VueUEditor from "vue-ueditor";
import { saveNews, getNewsById, getApprovalPersonnel } from "./api/index";
import apiHost from "@/api/apiConfig";
const originApi = apiHost.ORIGIN;

var ueditor = undefined;
export default {
  name: "AddWalkIntoInfo",
  components: {
    VueUEditor
  },
  data() {
    return {
      title: "",
      titlestr: "",
      AddForminfo: {
        id: "",
        title: "",
        sort: "",
        content: "",
        picPath: "",
        type: 1,
        remark: "",
        status: 0,
        author: "",
        approve_man_id: ""
      },
      dialogVisible: false,
      selectType: initselectType(),
      imageUrl: "",
      apiHost: originApi,
      type: "",
      options: [],
      value: "",
      selectPeople: []
    };
  },
  computed: {},
  created() {
    this.AddForminfo.id = this.$route.query.id;
    this.type = this.$route.query.type;
    if (this.type == 1) {
      this.titlestr = "走进锡林文档";
    } else if (this.type == 2) {
      this.titlestr = "科技创新文档";
    } else if (this.type == 3) {
      this.titlestr = "公司新闻文档";
    } else if (this.type == 4) {
      this.titlestr = "游览专线文档";
      this.$set(this.AddForminfo, "childType", "");
    } else if (this.type == 5) {
      this.titlestr = "酒店房间信息";
    } else if (this.type == 6) {
      this.titlestr = "会议室房间信息";
    } else if (this.type == 7) {
      this.titlestr = "社会责任文档";
    } else if (this.type == 8) {
      this.titlestr = "党群建设文档";
    }
    if (!this.AddForminfo.id) {
      if (ueditor) ueditor.setContent("");
    } else {
      this.getNewsById(this.AddForminfo.id);
    }
    this.title = this.AddForminfo.id ? "编辑" : "新增";
    // console.log(id)
  },
  destroyed() {
    ueditor = undefined;
  },
  mounted() {
    this.getApprovalPersonnel();
  },
  methods: {
    AgencySave() {
      if (this.AddForminfo.approve_man_id) {
        this.AddForminfo.status = -1;
        this.sublimt();
      } else {
        this.$message.error("请选择审核人");
      }
    },
    selectValue(id) {
      this.options.forEach(item => {
        if (id == item.userId) {
          this.AddForminfo.approve_man = item.userName;
          this.AddForminfo.approve_man_id = item.userId;
          this.AddForminfo.approve_man_dep = item.organizationName;
          this.AddForminfo.approve_man_depid = item.organizationId;
        }
      });
    },
    handleAvatarSuccess(res, file) {
      this.AddForminfo.picPath = res.data.url;
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) return this.$message.error("上传图片大小不能超过 2MB!");
      return isLt2M;
    },
    editorReady(editorInstance) {
      ueditor = editorInstance;
      ueditor.setContent(this.AddForminfo.content || "");
      ueditor.addListener(
        "contentChange",
        () => (this.AddForminfo.content = ueditor.getContent())
      );
    },
    SaveandPublic() {
      this.AddForminfo.status = 2;
      this.sublimt();
    },
    getApprovalPersonnel() {
      var type_ = "";
      if (this.type == 8) {
        type_ = this.type;
      } else {
        type_ = "";
      }
      getApprovalPersonnel({ type: type_ }).then(res => {
        if (res.success) {
          this.options = res.data;
        }
      });
    },
    sublimt() {
      if (this.type != "") {
        this.AddForminfo.type = this.type;
      }
      if (this.type != 5 && this.type != 6) {
        this.AddForminfo.content = ueditor.getContent();
      }
      if (this.AddForminfo.title == "") {
        this.$message("请输入标题");
        return;
      } else if (this.AddForminfo.sort == "") {
        this.$message("请输入序号");
        return;
      } else if (this.AddForminfo.remark == "") {
        this.$message("请输入描述");
        return;
      } else if (this.AddForminfo.picPath == "") {
        this.$message("请上传图片");
        return;
      } else if (
        this.AddForminfo.author == "" &&
        this.type != 5 &&
        this.type != 6
      ) {
        this.$message("请输入作者");
        return;
      } else if (this.AddForminfo.child_type == "" && this.type == 4) {
        this.$message("请选择类型");
        return;
      } else if (
        this.AddForminfo.content == "" &&
        this.type != 5 &&
        this.type != 6
      ) {
        this.$message("请输入内容");
        return;
      }
      var str = JSON.stringify(this.AddForminfo);
      saveNews(JSON.parse(str)).then(res => {
        if (res.success) {
          this.$message.success("保存成功");
          if (this.type == 1) {
            this.$router.push({ path: "/Home/WalkIntoXilin" });
          } else if (this.type == 2) {
            this.$router.push({ path: "/Home/TechnologicalInnovation" });
          } else if (this.type == 3) {
            this.$router.push({ path: "/CompanyNews/list" });
          } else if (this.type == 4) {
            this.$router.push({ path: "/IndustrialTourism/TourLine" });
          } else if (this.type == 5) {
            this.$router.push({ path: "/HotelManagement/RoomManage" });
          } else if (this.type == 6) {
            this.$router.push({
              path: "/managementOfMeetings/MeetingRoomManage"
            });
          } else if (this.type == 7) {
            this.titlestr = "社会服务文档";
            this.$router.push({ path: "/SocialResponsibility/list" });
          } else if (this.type == 8) {
            this.titlestr = "党群建设文档";
            this.$router.push({ path: "/PartyMassesConstruction/list" });
          }
        } else {
          this.$message(res.msg);
        }
      });
    },
    getNewsById(id) {
      getNewsById(id).then(res => {
        if (res.success) {
          this.AddForminfo = res.data;
          if (ueditor) ueditor.setContent(res.data.content);
        }
      });
    }
  }
};
</script>
<style scoped>
#AddWalkIntoInfo {
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
.padd-right {
  text-align: end;
}
</style>
<style>
.el-date-editor .el-range-separator {
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
  border-color: #409eff;
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
.vue-ueditor {
  box-sizing: border-box;
  padding: 20px;
  /* display: block;
  position: relative;
  width:80%; */
}
</style>



