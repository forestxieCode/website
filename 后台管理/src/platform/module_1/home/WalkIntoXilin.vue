<template>
  <div id="WalkIntoXilin">
    <el-row class="row-bot">
      <el-col :span="22">
        <span>{{title}}</span>
      </el-col>
      <el-col :span="2" class="padd-right">
        <el-button
          type="primary"
          size="small"
          @click="go_to_add"
          :disabled="!Jurisdiction.FillIn"
        >新建</el-button>
        <!-- <span>首页轮播图</span> -->
      </el-col>
    </el-row>
    <el-row class="padd" :gutter="4" :span="24">
      <el-col :span="4.5">
        <el-date-picker
          v-model="value6"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          size="small"
        ></el-date-picker>
      </el-col>
      <el-col :span="2">
        <el-input
          v-model="parameter.title"
          :placeholder="(parameter.type!==5&&parameter.type!==6)?'文章标题':'房间类型'"
          size="small"
        ></el-input>
      </el-col>
      <el-col :span="2">
        <el-select v-model="parameter.status" placeholder="请选择状态" size="small">
          <el-option label="全部" value></el-option>
          <el-option label="未发布" value="1"></el-option>
          <el-option label="发布" value="2"></el-option>
        </el-select>
      </el-col>
      <el-col :span="2" v-if="parameter.type==4">
        <el-select v-model="parameter.childType" placeholder="请选择类型" size="small">
          <el-option label="全部" value></el-option>
          <el-option label="金牌活动" value="1"></el-option>
          <el-option label="品牌介绍" value="2"></el-option>
        </el-select>
      </el-col>
      <el-col :span="2" class="padd-left">
        <el-button size="small" @click="getList">查 询</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-table
          v-loading="loading"
          :data="tableData"
          :row-style="HeightClass"
          :row-class-name="tableRowClassName"
          border
          style="width: 100%"
        >
          <el-table-column align="center" min-width="120" label="缩略图" prop="picPath">
            <template slot-scope="scope">
              <img :src="scope.row.picPath" min-width="70" height="70">
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            min-width="120"
            :label="(parameter.type!==5&&parameter.type!==6)?'标题':'房型'"
            show-overflow-tooltip
          >
            <template slot-scope="scope">{{scope.row.title}}</template>
          </el-table-column>
          <el-table-column align="center" min-width="120" label="发布时间" show-overflow-tooltip>
            <template
              slot-scope="scope"
            >{{scope.row.publishtime!=''?new Date(scope.row.publishtime).Format('yyyy-MM-dd'):'__'}}</template>
          </el-table-column>

          <el-table-column
            v-if="parameter.type!=5&&parameter.type!=6"
            align="center"
            min-width="120"
            label="作者"
            show-overflow-tooltip
          >
            <template slot-scope="scope">{{scope.row.author}}</template>
          </el-table-column>

          <el-table-column
            align="center"
            min-width="120"
            label="类型"
            v-if="parameter.type==4"
            show-overflow-tooltip
          >
            <template slot-scope="scope">{{scope.row.childType==1?'金牌活动':'品牌介绍'}}</template>
          </el-table-column>

          <el-table-column align="center" min-width="120" label="发布状态" show-overflow-tooltip>
            <template slot-scope="scope">{{scope.row.status==2?'发布':'未发布'}}</template>
          </el-table-column>

          <el-table-column align="center" min-width="120" label="操作" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-button
                type="text"
                @click="go_to_eidt(scope.row.id)"
                :disabled="(!Jurisdiction.FillIn||scope.row.status==2)"
              >编辑</el-button>
              <el-button
                type="text"
                @click="isPublish(scope.row.id)"
                :disabled="(!Jurisdiction.Release||!scope.row.status==1||scope.row.status==2)"
              >发布</el-button>

              <el-button
                type="text"
                @click="deleteNews(scope.row.id)"
                :disabled="!Jurisdiction.FillIn||!Jurisdiction.ToExamine||!Jurisdiction.Release"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          @size-change="handleSizeChange($event)"
          @current-change="handleCurrentChange($event)"
          :current-page="parameter.pageNumber"
          :page-sizes="[13, 30, 60, 100]"
          :page-size="parameter.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalCount"
        ></el-pagination>
      </el-col>
    </el-row>

    <el-dialog title="发布" :visible.sync="dialogFormVisible">
      <el-row>
        <el-col :span="24">
          <div>
            <div style="font-size: 14px;color: #606266;text-indent: 1.5em;">意见</div>
            <div style="padding:20px;">
              <el-input type="textarea" v-model="isPulicinfo.approve_remark" :rows="5"></el-input>
            </div>
          </div>
        </el-col>
      </el-row>

      <!-- <el-form-item label="活动名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="活动区域" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
      </el-form-item>-->

      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="publicFun(3)" size="small">发 布</el-button>
        <el-button type="danger" @click="publicFun(2)" size="small">驳 回</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { formatDateTime, syntaxHighlight } from "../protUserLog/util/index";
import { getList, isPublish, deleteNews } from "@/api/index";

function butJurisdiction(route, speMenu) {
  let arr = [];
  for (const columnMenu of speMenu) {
    if (columnMenu.route === route) {
      for (let item of columnMenu.childMenus) {
        if (item.type_status == "Data") arr.push(item);
      }
      return arr;
    } else {
      const result = butJurisdiction(route, columnMenu.childMenus || []);
      if (result) return result;
    }
  }
}

export default {
  name: "Emergency",
  data() {
    return {
      title: "走进锡林管理",
      loading: false,
      totalCount: 0,
      parameter: {
        startdate: "",
        enddate: "",
        title: "",
        type: 1,
        pageNumber: 1,
        pageSize: 13,
        childType: ""
      },
      tableData: [],
      Jurisdiction: {
        ToExamine: false,
        FillIn: false,
        Release: false
      },
      isPulicinfo: {
        id: "",
        approve_status: "",
        approve_remark: ""
      },
      value6: "",
      dialogFormVisible: false
    };
  },
  mounted() {
    this.JurisdictionFun();
    var path = this.$route.path;
    if (path == "/Home/WalkIntoXilin") {
      this.parameter.type = 1;
      this.title = "走进锡林管理";
    } else if (path == "/Home/TechnologicalInnovation") {
      this.parameter.type = 2;
      this.title = "科技创新";
    } else if (path == "/CompanyNews/list") {
      this.parameter.type = 3;
      this.title = "公司新闻";
    } else if (path == "/IndustrialTourism/TourLine") {
      this.parameter.type = 4;
      this.title = "浏览专线";
    } else if (path == "/SocialResponsibility/list") {
      this.parameter.type = 7;
      this.title = "社会服务";
    } else if (path == "/PartyMassesConstruction/list") {
      this.parameter.type = 8;
      this.title = "党群建设";
    } else if (path == "/HotelManagement/RoomManage") {
      this.parameter.type = 5;
      this.title = "酒店预订";
    } else if (path == "/managementOfMeetings/MeetingRoomManage") {
      this.parameter.type = 6;
      this.title = "会议服务";
    }
    this.getList();
  },
  watch: {
    $route: {
      handler: function(val, oldVal) {
        var path = this.$route.path;
        if (path == "/Home/WalkIntoXilin") {
          this.parameter.type = 1;
          this.title = "走进锡林管理";
        } else if (path == "/Home/TechnologicalInnovation") {
          this.parameter.type = 2;
          this.title = "科技创新";
        } else if (path == "/CompanyNews/list") {
          this.parameter.type = 3;
          this.title = "公司新闻";
        } else if (path == "/IndustrialTourism/TourLine") {
          this.parameter.type = 4;
          this.title = "浏览专线";
        } else if (path == "/SocialResponsibility/list") {
          this.parameter.type = 7;
          this.title = "社会服务";
        } else if (path == "/PartyMassesConstruction/list") {
          this.parameter.type = 8;
          this.title = "党群建设";
        } else if (path == "/HotelManagement/RoomManage") {
          this.parameter.type = 5;
          this.title = "酒店预订";
        } else if (path == "/managementOfMeetings/MeetingRoomManage") {
          this.parameter.type = 6;
          this.title = "会议服务";
        }
        this.JurisdictionFun();
        this.getList();
      },
      // 深度观察监听
      deep: true
    },
    productServes(to, from) {
      this.JurisdictionFun();
    }
  },
  computed: {
    productServes() {
      return this.$store.state.productServes;
    }
  },
  methods: {
    JurisdictionFun() {
      let arr = butJurisdiction(
        this.$router.history.current.path,
        this.productServes
      );
      if (arr && arr.length) {
        for (let item of arr) {
          this.Jurisdiction[item.code] = true;
        }
      }
    },
    HeightClass({ row, rowIndex }) {
      if (this.getIndex === rowIndex) {
        return {
          "background-color": "#ff870f",
          height: "45px"
        };
      }
      return "height: 45px";
    },

    tableRowClassName({ row, rowIndex }) {
      //把每一行的索引放进row
      row.index = rowIndex;
    },
    go_to_add() {
      this.$router.push({
        path: "/Home/AddWalkIntoInfo",
        query: { type: this.parameter.type }
      });
    },
    go_to_eidt(id) {
      this.$router.push({
        path: "/Home/AddWalkIntoInfo",
        query: { id: id, type: this.parameter.type }
      });
    },
    handleCurrentChange(val) {
      this.parameter.pageNumber = val;
      this.getList();
    },
    handleSizeChange(val) {
      this.parameter.pageSize = val;
      this.getList();
    },
    getList() {
      if (this.value6.length > 0) {
        this.parameter.startdate = new Date(this.value6[0]).Format(
          "yyyy-MM-dd"
        );
        this.parameter.enddate = new Date(this.value6[1]).Format("yyyy-MM-dd");
      }
      getList(this.parameter).then(res => {
        if (res.success) {
          this.value6 = "";
          this.parameter.title = "";
          this.parameter.status = "";
          this.parameter.startdate = "";
          this.parameter.enddate = "";
          this.tableData = res.data.result;
          this.totalCount = res.data.totalCount;
        }
      });
    },
    isPublish(id) {
      this.dialogFormVisible = true;
      this.isPulicinfo.id = id;
    },

    publicFun(state) {
      this.isPulicinfo.approve_status = state;
      isPublish(this.isPulicinfo).then(res => {
        if (res.success) {
          this.dialogFormVisible = false;
          if (state == 3) {
            this.$message.success("发布成功");
          } else {
            this.$message.success("驳回成功");
          }
          this.getList();
        } else {
          this.dialogFormVisible = false;
          if (state == 3) {
            this.$message.success("发布失败");
          } else {
            this.$message.success("驳回失败");
          }
        }
      });
    },
    deleteNews(id) {
      this.$confirm("确定发布?", "提示", {
        type: "warning"
      }).then(() => {
        deleteNews(id).then(res => {
          if (res.success) {
            this.$message.success("删除成功");
            this.getList();
          } else {
            this.$message("删除失败");
          }
        });
      });
    }
  }
};
</script>
<style scoped>
#WalkIntoXilin {
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
</style>

