<template>
  <div id="AddWalkIntoInfo">
    <el-row class="row-bot">
      <el-col :span="20">
        <span>审核信息</span>
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

        <el-col :span="24" style="padding:0px;">
          <div style="font-size: 14px;color: #606266;text-indent: 1.5em;">审批日记</div>
          <div style="padding:20px;">
            <el-table :data="this.AddForminfo.newsInfoLogs" border style="width: 100%">
              <el-table-column width="90" align="center" type="index" label="序号"></el-table-column>
              <el-table-column align="center" min-width="120" label="审批时间" show-overflow-tooltip>
                <template
                  slot-scope="scope"
                >{{new Date(scope.row.create_time).Format('yyyy-MM-dd')}}</template>
              </el-table-column>
              <el-table-column align="center" min-width="120" label="审批人" show-overflow-tooltip>
                <template slot-scope="scope">{{scope.row.approve_name}}</template>
              </el-table-column>
              <el-table-column align="center" min-width="120" label="审批状态" show-overflow-tooltip>
                <template slot-scope="scope">{{scope.row.approve_status}}</template>
              </el-table-column>

              <el-table-column align="center" min-width="120" label="审批意见" show-overflow-tooltip>
                <template slot-scope="scope">{{scope.row.approve_remark}}</template>
              </el-table-column>
            </el-table>
          </div>
        </el-col>
        <el-col :span="24" style="padding:0px;">
          <div style="font-size: 14px;color: #606266;text-indent: 1.5em;">审批意见</div>
          <div style="padding:20px;">
            <el-input type="textarea" v-model="agencyinfo.approve_remark" :rows="6"></el-input>
          </div>
        </el-col>

        <el-col :span="24"></el-col>
        <el-col :span="24" style="padding:0px;">
          <el-form-item style="text-align:center;">
            <el-button type="primary" size="small" @click="openSave ">提交审批</el-button>
            <el-button type="primary" size="small" @click="UnAgencySave">驳回</el-button>
            <router-link to="/news/offcial-news">
              <el-button size="small" @click="$router.go(-1)">取消</el-button>
            </router-link>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-dialog title="请选择审批人" :visible.sync="dialogVisible" width="20%">
      <div>
        <el-select v-model="value" placeholder="请选择" @change="selectValue">
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
        <el-button type="primary" @click="AgencySave">通 过</el-button>
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
import {
  saveNews,
  getNewsById,
  getApprovalPersonnel,
  getFlowTasksById,
  approval
} from "./api/index";
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
      oaid: "",
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
      agencyinfo: {},
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
    // this.AddForminfo.id = this.$route.query.id;
    this.type = this.$route.query.type;
    this.oaid = this.$route.query.oaid;
    if (!this.oaid) {
      if (ueditor) ueditor.setContent("");
    } else {
      this.getFlowTasksById();
    }
  },
  destroyed() {
    ueditor = undefined;
  },
  mounted() {
    this.getApprovalPersonnel();
  },
  methods: {
    getFlowTasksById() {
      getFlowTasksById({ id: this.oaid }).then(res => {
        if (res.success) {
          this.agencyinfo = res.data;
          this.AddForminfo = this.agencyinfo.newsInfo;
          if (ueditor) ueditor.setContent(this.AddForminfo.content);
        }
      });
    },
    openSave() {
      if (this.agencyinfo.isnode) {
        this.dialogVisible = true;
      } else {
        this.agencyinfo.approve_status = 3;
        this.sublimt();
      }
    },
    AgencySave() {
      if (this.value) {
        this.agencyinfo.approve_status = 3;
        this.sublimt();
      } else {
        this.$message.error("请选择审核人");
      }
    },
    selectValue(id) {
      this.options.forEach(item => {
        if (id == item.userId) {
          this.agencyinfo.approve_man = item.userName;
          this.agencyinfo.approve_man_id = item.userId;
          this.agencyinfo.approve_man_dep = item.organizationName;
          this.agencyinfo.approve_man_depid = item.organizationId;
        }
      });
    },
    UnAgencySave() {
      this.$confirm("确定驳回？", "提示", {
        type: "warning"
      }).then(() => {
        this.agencyinfo.approve_status = 2;
        this.sublimt();
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
    getApprovalPersonnel() {
      getApprovalPersonnel().then(res => {
        if (res.success) {
          this.options = res.data;
        }
      });
    },
    sublimt() {
      // if (this.AddForminfo.title == "") {
      //   this.$message("请输入标题");
      //   return;
      // } else if (this.AddForminfo.sort == "") {
      //   this.$message("请输入序号");
      //   return;
      // } else if (this.AddForminfo.remark == "") {
      //   this.$message("请输入描述");
      //   return;
      // } else if (this.AddForminfo.picPath == "") {
      //   this.$message("请上传图片");
      //   return;
      // } else if (
      //   this.AddForminfo.author == "" &&
      //   this.type != 5 &&
      //   this.type != 6
      // ) {
      //   this.$message("请输入作者");
      //   return;
      // } else if (this.AddForminfo.child_type == "" && this.type == 4) {
      //   this.$message("请选择类型");
      //   return;
      // } else if (
      //   this.AddForminfo.content == "" &&
      //   this.type != 5 &&
      //   this.type != 6
      // ) {
      //   this.$message("请输入内容");
      //   return;
      // }
      var data_ = {};
      for (var key in this.agencyinfo) {
        if (key != "newsInfo") {
          data_[key] = this.agencyinfo[key];
        }
      }
      var str = JSON.stringify(data_);
      approval(JSON.parse(str)).then(res => {
        if (res.success) {
          this.dialogVisible = false;
          this.$message.success("保存成功");
          this.$router.push({ path: "/agency-management/agency-list" });
        } else {
          this.$message(res.msg);
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



