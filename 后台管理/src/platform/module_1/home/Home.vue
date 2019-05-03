<template>
  <div id="emergency">
    <el-row class="row-bot">
      <el-col :span="20">
        <span></span>
      </el-col>
       <!-- <el-col :span="4" class="padd-right">
        <el-button size="small" @click="add_element(0)" type="danger" style="margin-right: 20px;" v-if="button[1]">新 增</el-button>
      </el-col> -->
    </el-row>
    <el-row class="padd" :span="24">
        <el-col :span="3"  style="margin-left:5px;">
          <el-select v-model="pagePrame.projectid" size="small">
            <el-option v-for="linkType in projectdata" :key="linkType.id" :label="linkType.name"  placeholder="所属系统" :value="linkType.id"></el-option>
        </el-select>
        </el-col>
        <el-col :span="2" class="padd-left">
        <el-button size="small" @click="getSystemList">查 询</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24" >
            <el-table v-loading="loading" :data="tableData" :row-style="HeightClass"  :row-class-name="tableRowClassName" border>
                        <el-table-column fixed label="序号" width="70" type="index"  align="center">
                        </el-table-column>
                        <el-table-column
                          align="center"
                          min-width="120"
                          label="所属系统"
                          show-overflow-tooltip
                        >
                          <template slot-scope="scope">
                            {{scope.row.project.name}}
                          </template>
                        </el-table-column>

                         <el-table-column align="center" min-width="120" label="用户账号" show-overflow-tooltip prop="username" >
                        </el-table-column>

                        <el-table-column align="center" min-width="120" label="用户账号" show-overflow-tooltip prop="password" >
                        </el-table-column>
                          <!-- <el-table-column
                          align="center"
                          min-width="120"
                          label="用户密码"
                          show-overflow-tooltip
                        >
                          <template slot-scope="scope">
                            {{scope.row.operate_name}}
                          </template>
                        </el-table-column> -->

                  
                         <el-table-column
                          align="center"
                          min-width="180"
                          label="操作"
                          show-overflow-tooltip
                        >
                        <template slot-scope="scope">
                              <el-button type="text" @click="edite(scope.row)">编辑</el-button>
                              <el-button type="text" @click="delte(scope.row)">删除</el-button>
                        </template>
                        </el-table-column>
                      </el-table>

                      <el-pagination
                        @size-change="handleSizeChange($event)"
                        @current-change="handleCurrentChange($event)"
                        :current-page="pagePrame.pageNumber"
                        :page-sizes="[13, 30, 60, 100]"
                        :page-size="pagePrame.pageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="totalCount"
                      ></el-pagination>
         </el-col>
    </el-row>

    <el-dialog
      title="编辑"
      :visible.sync="centerDialogVisible"
      width="45%"
      >
      <el-form :model="fromdata"   ref="fromdata"  label-width="180px">
          <el-col :span="24">
              <el-form-item label="关联系统" >
                <el-input v-model="info" size="small" :disabled="true"></el-input>
              </el-form-item>
           </el-col>
          <el-col :span="24">
              <el-form-item label="用户账号" >
                <el-input v-model="fromdata.username" size="small" ></el-input>
              </el-form-item>
           </el-col>
          <el-col :span="24">
              <el-form-item label="用户密码">
                <el-input v-model="fromdata.password" size="small" ></el-input>
              </el-form-item>
          </el-col>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="sublimt()" size="small">确 定</el-button>
      </span>
       </el-dialog>
  </div>
</template>

<script>
// import { getUserInfo,getProjects } from '@/api/index'
// import { getSystemList , deleteSystemList ,updateSystem } from "./api/index";
// import { formatDateTime, syntaxHighlight } from "../protUserLog/util/index";

export default {
  name: "Emergency",
  data() {
    return {
      loading:false,
      tableData:[],
      totalCount:0,
      pagePrame:{
          pageNumber:1,
          pageSize:13,
          projectid:'',
      },
      projectid:'',
      projectdata:[],
      centerDialogVisible:false,
      info:'',
      fromdata:{
        username:'',
        password:'',
        id:'',
        projectid:'',
        userid:''
      }
    }
  },
  computed:{
    	productServes() {
				return this.$store.state.productServes
      }
  },
  created() {
    
  },
  mounted() {
    this.getProjects()
    this.getSystemList()
  },
  methods: {
    getSystemList(){
      this.loading  = true 
      getSystemList(this.pagePrame).then(res =>{
         if(res.success){
           this.totalCount = res.data.totalCount
           this.tableData = res.data.result
           this.loading = false
         }
      })
    },
    handleCurrentChange(val){
      this.pagePrame.currentPage = val
      this.getSystemList()
    },
    handleSizeChange(val){
      this.pagePrame.pageSize = val
      this.getSystemList()
    }, 
    formartTime(time){
      if(time){
        let date = new Date(time)
        return date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()
      }else {
        return ''
      }   
    },
    tableRowClassName ({row, rowIndex}) {
      //把每一行的索引放进row
      row.index = rowIndex;
    },
    HeightClass({ row, rowIndex }) {
      if ((this.getIndex) === rowIndex ) {
        return {
        "background-color": "#ff870f", "height": "45px"
      }}
      return "height: 45px";
    },
    edite(row){
    
      this.info = row.project.name
      this.fromdata.username = row.username
      this.fromdata.password = row.password
      this.fromdata.id = row.id
      this.fromdata.projectid = row.projectid
       this.fromdata.userid = row.userid

      this.centerDialogVisible = true
    },
    delte(row){
      deleteSystemList(row.id).then(res=>{
        if(res.success){
          this.$message.success(res.msg)
          this.getSystemList()
        }else {
           this.$message('删除失败')
        }
      })
    },
    getProjects(){
      getProjects().then(res =>{
        if(res.success){
          this.projectdata = res.data
        }
      })
    },
    sublimt(){
        updateSystem(this.fromdata).then(res =>{
          if(res.success){
            this.$message.success(res.msg)
            this.centerDialogVisible = false
            this.getSystemList()
          }else {
            this.$message('保存失败')
          }
        })
    }
  }
}
</script>
<style scoped>
#emergency {
  width: 100%;
  background: #fff;
  padding: 10px;
  font-size: 24px;
  color: #333;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  letter-spacing: 1.5px;
}
#emergency .item1{
		position: absolute;
    top: 8px;
    left: 31px;
	}
#emergency  .item2{
    position: absolute;
    top: 8px;
    left: 102px;

	}
#emergency .item3{
	    position: absolute;
    top: 8px;
    left: 205px;

}
#emergency .item4{
   	position: absolute;
    top: 8px;
    left: 307px;
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

.middlebad {
  font-size: 14px;
  text-align: center;
  line-height: 33px;
}
.col-span {
  max-height: 740px;
  min-height: 600px;
  padding: 0 20px;
  overflow: auto;
}
.col-span p {
  font-size: 18px;
  display: block;
  color: #333;
  padding-bottom: 10px;
  line-height: 25px;
}
.col-span p span {
  color: #999;
  font-size: 16px;
}
.el-table--enable-row-hover .el-table__body tr:hover>td{
background-color: #fff !important;
}
pre {
  /* outline: 1px solid #ccc; */
  padding: 5px;
  margin: 5px;
  background-color: #999;
  color:#fff
}

.string {
  color: green;
}

/* .number {
  color: darkorange;
} */

.boolean {
  color: blue;
}

.null {
  color: magenta;
}

.key {
  color: red;
}
</style>
<style>
.el-date-editor .el-range-separator{
  padding: 0 2px;
}

</style>

