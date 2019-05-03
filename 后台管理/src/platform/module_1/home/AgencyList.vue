<template>
  <div class="agencylist">
    <el-row class="row-bot">
      <el-col :span="22">
        <span>代办列表</span>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-table
          :data="tableData"
          :row-style="HeightClass"
          :row-class-name="tableRowClassName"
          border
          style="width: 100%"
        >
          <el-table-column :key="Math.random()" width="90" align="center" type="index" label="序号"></el-table-column>
          <el-table-column
            :key="Math.random()"
            align="center"
            min-width="120"
            label="类型"
            show-overflow-tooltip
          >
            <template slot-scope="scope">{{selectType(scope.row.newsInfo.type)}}</template>
          </el-table-column>
          <el-table-column
            :key="Math.random()"
            align="center"
            min-width="120"
            label="文章标题"
            show-overflow-tooltip
          >
            <template slot-scope="scope">{{scope.row.newsInfo.title}}</template>
          </el-table-column>

          <el-table-column
            :key="Math.random()"
            align="center"
            min-width="120"
            label="提交时间"
            show-overflow-tooltip
          >
            <template slot-scope="scope">{{new Date(scope.row.createTime).Format('yyyy-MM-dd')}}</template>
          </el-table-column>

          <el-table-column
            :key="Math.random()"
            align="center"
            min-width="120"
            label="审批状态"
            show-overflow-tooltip
          >
            <template slot-scope="scope">{{SelectStusta(scope.row.newsInfo.status)}}</template>
          </el-table-column>

          <el-table-column
            :key="Math.random()"
            align="center"
            min-width="120"
            label="操作"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <el-button
                type="text"
                @click="agency(scope.row.newsInfo.id,scope.row.newsInfo.type,scope.row.id)"
              >审核</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          @size-change="handleSizeChange($event)"
          @current-change="handleCurrentChange($event)"
          :current-page="pageNumber"
          :page-sizes="[13, 30, 60, 100]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalCount"
        ></el-pagination>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { getTodoList } from "./api/index";
function SelectType(id) {
  return [];
}

export default {
  data() {
    return {
      tableData: [],
      pageNumber:1,
      pageSize:13,
      totalCount:0

    };
  },
  mounted() {
    this.getTodoList();
  },
  methods: {
    agency(id, type, oaid) {
      this.$router.push({
        path: "/Home/Agency",
        query: { id: id, type: type, oaid: oaid }
      });
    },
    getTodoList() {
      getTodoList({ approve_status: 1,pageNumber:this.pageNumber,pageSize:this.pageSize }).then(res => {
        if (res.success) {
          this.tableData = res.data.result;
          this.totalCount = res.data.totalCount

        }
      });
    },
    selectType(id) {
      const type = [
        "走进锡林",
        "科技创新",
        "公司新闻",
        "游览专线",
        "酒店预订",
        "会议服务",
        "社会服务",
        "党群建设"
      ];
      return type[id - 1];
    },
    SelectStusta(id) {
      const data_ = {
        "0": "未提交",
        "-1": "部长审批中",
        "-2": "分管领导审批中",
        "1": "待发布",
        "2": "已发布"
      };
      return data_[id + ""];
    },
    handleSizeChange(val){

    },
    handleCurrentChange(val){

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
    }
  }
};
</script>
<style>
.agencylist {
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
