<template>
  <div class="box">
    <el-row class="row-bot">
      <el-col :span="24">
        <span>采集列表</span>
      </el-col>
    </el-row>
    <el-row class="row-top">
      <el-col class="search-div_box" :span="5">
        <span class="name-title">电表名称：</span>
        <el-input class="search-input" v-model="name" placeholder="选择名称"></el-input>
      </el-col>
      <el-col :span="19" class="col-left">
        <el-button size="small" @click="inquire()">查 询</el-button>
        <el-button size="small" type="primary" @click="centerDialogVisible = true">新 增</el-button>
      </el-col>
    </el-row>
    <!--新增详情-->
    <el-dialog title="采集列表新增" :visible.sync="centerDialogVisible" width="600px">
      <el-form
        :rules="rules"
        ref="formInline"
        :inline="true"
        :model="formInline"
        class="demo-form-inline"
        :label-position="labelPosition"
      >
        <el-row>
          <el-col :span="24">
            <el-form-item label="电表编码" prop="ammeterNum">
              <el-input class="search-input" v-model="formInline.ammeterNum"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="电表名称" prop="ammeterName">
              <el-input class="search-input" v-model="formInline.ammeterName"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="电表点位" prop="pointName">
              <el-input class="search-input" v-model="formInline.pointName"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <el-form-item label="设备名称" prop="deviceName">
              <el-input class="search-input" v-model="formInline.deviceName"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="设备类型" prop="deviceType">
              <el-input class="search-input" v-model="formInline.deviceType"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <el-form-item label="电压编号" prop="pointDesc">
              <el-input class="search-input" v-model="formInline.voltageNum"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="测点详情" prop="pointDesc">
              <el-input class="search-input" v-model="formInline.pointDesc"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('formInline')">保 存</el-button>
      </span>
    </el-dialog>

    <el-table
      v-loading="loading"
      :data="tableData"
      :header-row-style="HeightClass"
      :row-style="HeightClass"
      border
    >
      <el-table-column
        prop="ammeter_num"
        align="center"
        min-width="80"
        label="电表编码"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        prop="device_name"
        align="center"
        min-width="100"
        label="设备名称"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        prop="device_type"
        align="center"
        min-width="100"
        label="设备类型"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        prop="ammeter_name"
        align="center"
        min-width="100"
        label="电表名称"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        prop="voltage_num"
        align="center"
        min-width="80"
        label="电压编号"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        prop="point_name"
        align="center"
        min-width="150"
        label="测点"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        prop="point_desc"
        align="center"
        min-width="150"
        label="测点详情"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column width="180" align="center" label="操作">
        <template slot-scope="scope">
          <el-row>
            <el-col :span="12">
              <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编 辑</el-button>
            </el-col>
            <el-col :span="12">
              <el-button
                size="mini"
                @click.native.prevent="handleDelete(scope.$index, tableData)"
              >删 除</el-button>
            </el-col>
          </el-row>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[13, 30, 60, 100]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalElements"
    ></el-pagination>
    <!-- 编辑 -->
    <el-dialog title="编辑" :visible.sync="centerDialogEdit" width="600px">
      <el-form :inline="true" class="demo-form-inline" :label-position="labelPosition">
        <el-row>
          <el-col :span="24">
            <el-form-item label="电表编码">
              <el-input class="search-input" v-model="ammeterNum"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="电压编号">
              <el-input class="search-input" v-model="voltageNum"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="电表名称">
              <el-input class="search-input" v-model="ammeterName"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <el-form-item label="设备名称">
              <el-input class="search-input" v-model="deviceName"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="设备类型">
              <el-input class="search-input" v-model="deviceType"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <el-form-item label="测点名称">
              <el-input class="search-input" v-model="pointName"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="测点详情">
              <el-input class="search-input" v-model="pointDesc"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogEdit = false">取 消</el-button>
        <el-button type="primary" @click="submitEdit()">保 存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  getFindAll,
  postCreate,
  postFindByConds,
  getFindById,
  getDeleteId
} from "../api/index";
export default {
  data() {
    return {
      loading: true,
      name: "",
      tableData: [],
      currentPage: 1,
      pageSize: 13,
      totalElements: 1,
      labelPosition: "right",
      centerDialogVisible: false,
      centerDialogEdit: false,
      formInline: {
        ammeterName: "",
        pointName: "",
        pointDesc: "",
        ammeterNum: "",
        voltageNum: "",
        deviceName: "",
        deviceType: ""
      },
      rules: {
        ammeterName: [
          { required: true, message: "请输入电表名称", trigger: "blur" }
        ],
        pointName: [{ required: true, message: "请输入点位", trigger: "blur" }],
        pointDesc: [
          { required: true, message: "请输入点位详情", trigger: "blur" }
        ],
        ammeterNum: [
          { required: true, message: "请输入电表编码", trigger: "blur" }
        ],
        deviceName: [
          { required: true, message: "请输入设备名称", trigger: "blur" }
        ],
        deviceType: [
          { required: true, message: "请输入设备类型", trigger: "blur" }
        ]
      },
      ammeterName: "",
      pointName: "",
      pointDesc: "",
      ammeterNum: "",
      voltageNum: "",
      deviceName: "",
      deviceType: "",
      id: ""
    };
  },
  created() {
    this._getFindAll();
  },
  methods: {
    _getFindAll() {
      getFindAll(this.currentPage, this.pageSize).then(res => {
        console.log("res", res);
        if (res.success === true) {
          this.tableData = res.data.content;
          this.totalElements = res.data.totalElements;
          this.loading = false;
        } else {
          this.$message("数据连接问题！");
        }
      });
    },
    // 新增
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let para = {
            ammeter_name: this.formInline.ammeterName,
            ammeter_num: this.formInline.ammeterNum,
            point_desc: this.formInline.pointDesc,
            point_name: this.formInline.pointName,
            voltage_num: this.formInline.voltageNum,
            device_name: this.formInline.deviceName,
            device_type: this.formInline.deviceType
          };
          postCreate(para).then(res => {
            if (res.success === true) {
              this.centerDialogVisible = false;
              this._getFindAll();
              this.$message("新增成功");
            }
          });
        }
      });
    },
    // 查询
    inquire() {
      let para = { ammeter_name: this.name };
      postFindByConds(this.currentPage, this.pageSize, para).then(res => {
        this.tableData = res.data.content;
        this.totalElements = res.data.totalElements;
      });
    },
    handleEdit(index, row) {
      this.centerDialogEdit = true;
      [
        this.ammeterName,
        this.pointName,
        this.pointDesc,
        this.ammeterNum,
        this.voltageNum,
        this.deviceName,
        this.deviceType
      ] = [
        row.ammeter_name,
        row.point_name,
        row.point_desc,
        row.ammeter_num,
        row.voltage_num,
        row.device_name,
        row.device_type
      ];
      this.id = row.id;
    },
    // 编辑
    submitEdit() {
      console.log(1);
      let para = {
        ammeter_name: this.ammeterName,
        ammeter_num: this.ammeterNum,
        id: this.id,
        point_desc: this.pointDesc,
        point_name: this.pointName,
        voltage_num: this.voltageNum,
        device_name: this.deviceName,
        device_type: this.deviceType
      };
      postCreate(para).then(res => {
        console.log("res", res);
        this.centerDialogEdit = false;
        this._getFindAll();
        this.$message("编辑成功");
      });
    },
    // 删除  getDeleteId
    handleDelete(index, rows) {
      let id = rows[index].id;
      getDeleteId(id).then(res => {
        rows.splice(index, 1);
        this.$message("删除成功");
      });
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this._getFindAll();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this._getFindAll();
    },
    HeightClass() {
      return "height: 45px";
    }
  }
};
</script>

<style scoped>
.box {
  width: 100%;
  background: #fff;
  padding: 10px;
  font-size: 24px;
  color: #333;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  letter-spacing: 1.5px;
}
.row-top {
  padding: 15px 0px;
}
.row-bot {
  border-bottom: 1px solid #dcdfe6;
  padding-bottom: 10px;
}
.col-left {
  padding-left: 20px;
}
.name-title {
  font-size: 16px;
}
.elCas {
  width: 175px;
  margin-right: 10px;
}
.search-input {
  width: 455px;
}
</style>
