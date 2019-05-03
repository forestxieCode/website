<template>
  <div id="WalkIntoXilin">
    <el-row class="row-bot">
      <el-col :span="22">
        <span>酒店房间订单管理</span>
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
        <el-input v-model="parameter.title" placeholder="房间名称" size="small"></el-input>
      </el-col>
      <!-- <el-col :span="2" >
            <el-select v-model="parameter.status" placeholder="请选择状态" size="small">
                <el-option label="全部" value=""></el-option>
                <el-option label="未发布" value="1"></el-option>
                <el-option label="发布" value="2"></el-option>
            </el-select>
      </el-col>-->
      <el-col :span="2" class="padd-left">
        <el-button size="small" @click="getList">查 询</el-button>
      </el-col>
    </el-row>
    <!-- <img src="./test_img/walk02.jpg" alt="" style="width:100px;height:40px;"> -->
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
              <img :src="scope.row.newsInfo.picPath" min-width="70" height="70">
            </template>
          </el-table-column>
          <el-table-column align="center" min-width="120" label="房间类型" show-overflow-tooltip>
            <template slot-scope="scope">{{scope.row.newsInfo.title}}</template>
          </el-table-column>
          <el-table-column align="center" min-width="120" label="入住时间" show-overflow-tooltip>
            <template slot-scope="scope">{{new Date(scope.row.inTime).Format('yyyy-MM-dd')}}</template>
          </el-table-column>
          <el-table-column align="center" min-width="120" label="离开时间" show-overflow-tooltip>
            <template slot-scope="scope">{{new Date(scope.row.outTime).Format('yyyy-MM-dd')}}</template>
          </el-table-column>
          <el-table-column align="center" min-width="120" label="房间数量" show-overflow-tooltip>
            <template slot-scope="scope">{{scope.row.roomCount}}</template>
          </el-table-column>

          <el-table-column align="center" min-width="120" label="入住人数" show-overflow-tooltip>
            <template slot-scope="scope">{{scope.row.peopleCount}}</template>
          </el-table-column>

          <el-table-column align="center" min-width="120" label="预订人" show-overflow-tooltip>
            <template slot-scope="scope">{{scope.row.name}}</template>
          </el-table-column>

          <el-table-column align="center" min-width="120" label="手机号码" show-overflow-tooltip>
            <template slot-scope="scope">{{scope.row.phone}}</template>
          </el-table-column>

          <el-table-column align="center" min-width="120" label="操作" show-overflow-tooltip>
            <template slot-scope="scope">
              <!-- <el-button type="text" @click="go_to_eidt(scope.row.id)">编辑</el-button> -->
              <el-button type="text" @click="deleteOrder(scope.row.id)">删除</el-button>
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
  </div>
</template>

<script>
import { getHotelList, deleteHotel } from "./api/index";

export default {
  name: "Emergency",
  data() {
    return {
      loading: false,
      totalCount: 0,
      parameter: {
        startdate: "",
        enddate: "",
        title: "",
        pageNumber: 1,
        pageSize: 13,
        status: ""
      },
      tableData: [],
      value6: []
    };
  },
  computed: {},
  mounted() {
    this.getList();
  },
  methods: {
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
      getHotelList(this.parameter).then(res => {
        if (res.success) {
          this.value6 = "";
          this.parameter.title = "";
          // this.parameter.status = ''
          this.tableData = res.data.result;
          this.totalCount = res.data.totalCount;
          // console.log(this.totalCount)
        }
      });
    },
    deleteOrder(id) {
      this.$confirm("确定发布?", "提示", {
        type: "warning"
      }).then(() => {
        deleteHotel(id).then(res => {
          if (res.success) {
            this.$message.success("删除成功");
            this.getList();
          } else {
            this.$message("删除失败");
          }
        });
      });
    }
    // deleteNews(id){
    //   	this.$confirm('确定发布?', '提示', {
    // 			type: 'warning'
    // 		}).then(() => {
    //       deleteNews(id).then(res =>{
    //         if(res.success){
    //           this.$message.success('删除成功')
    //           this.getList()
    //         }else {
    //           this.$message('删除失败')
    //         }

    //       })

    //     })
    // }
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

