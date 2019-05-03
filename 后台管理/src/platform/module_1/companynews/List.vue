<template>
  <div id="WalkIntoXilin">
    <el-row class="row-bot">
      <el-col :span="22">
        <span>公司新闻</span>
      </el-col>
      <el-col :span="2" class="padd-right">
          <el-button type="primary"  size="small" @click="go_to_add">添加</el-button>
        <!-- <span>首页轮播图</span> -->
      </el-col>
    </el-row>
    <el-row class="padd" :gutter="4" :span="24">
        <el-col :span="4.5" >
           <el-date-picker
            v-model="value6"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期" size="small">
          </el-date-picker>
        </el-col>

        <el-col :span="2" >
            <el-input v-model="parameter.title" placeholder="文章标题" size="small"></el-input>
        </el-col>
        <el-col :span="2" >
            <el-select v-model="parameter.status" placeholder="请选择状态" size="small">
                <el-option label="全部" value=""></el-option>
                <el-option label="未发布" value="1"></el-option>
                <el-option label="发布" value="2"></el-option>
            </el-select>
        </el-col>
        <el-col :span="2" class="padd-left">
        <el-button size="small" @click="getList">查 询</el-button>
      </el-col>
    </el-row>
      <!-- <img src="./test_img/walk02.jpg" alt="" style="width:100px;height:40px;"> -->
    <el-row>
        <el-col :span="24" >
             <el-table v-loading="loading" :data="tableData" :row-style="HeightClass"  :row-class-name="tableRowClassName" border style="width: 100%">
                   <el-table-column
                          align="center"
                          min-width="120"
                          label="缩略图"
                          prop="picPath"   
                    >
                          <template  slot-scope="scope">
                               <img :src="scope.row.picPath"  min-width="70" height="70"/>
                          </template>
                    </el-table-column>
                    <el-table-column
                          align="center"
                          min-width="120"
                          label="标题"
                          show-overflow-tooltip
                    >
                          <template slot-scope="scope">
                            {{scope.row.title}}
                          </template>
                    </el-table-column>
                    <el-table-column
                          align="center"
                          min-width="120"
                          label="发布时间"
                          show-overflow-tooltip
                    >
                      <template slot-scope="scope">
                            {{scope.row.publishtime!=''?new Date(scope.row.publishtime).Format('yyyy-MM-dd'):'__'}}
                      </template>
                    </el-table-column>

                      <el-table-column
                          align="center"
                          min-width="120"
                          label="作者"
                          show-overflow-tooltip
                    >
                      <template slot-scope="scope">
                             {{scope.row.author}}
                      </template>
                    </el-table-column>

                    <el-table-column
                          align="center"
                          min-width="120"
                          label="发布状态"
                          show-overflow-tooltip
                    >
                          <template slot-scope="scope">
                             {{scope.row.status==2?'发布':'未发布'}}
                          </template>
                    </el-table-column>
                    <el-table-column
                          align="center"
                          min-width="120"
                          label="操作"
                          show-overflow-tooltip
                    >
                          <template slot-scope="scope">
                            <el-button type="text" @click="go_to_eidt(scope.row.id)">编辑</el-button>
                            <el-button type="text" @click="isPublish(scope.row.id)" :disabled="scope.row.status==2">发布</el-button>
                            <el-button type="text" @click="deleteNews(scope.row.id)">删除</el-button>
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
import { formatDateTime, syntaxHighlight } from "../protUserLog/util/index";
import { getList , isPublish ,deleteNews  } from '@/api/index'

export default {
  name: "Emergency",
  data() {
    return {
      loading:false,
      totalCount:0,
      parameter:{
        startdate:'',
        enddate:'',
        title:'',
        type:3,
        pageNumber:1,
        pageSize:13,
        status:''
      },
      tableData:[
      ],
      value6:[]
    }
  },
  computed:{

  },
  created() {
    
  },
  mounted() {
    this.getList()
  },
  methods: {
     HeightClass({ row, rowIndex }) {
      if ((this.getIndex) === rowIndex ) {
        return {
        "background-color": "#ff870f", "height": "45px"
      }}
      return "height: 45px";
    },
    tableRowClassName ({row, rowIndex}) {
      //把每一行的索引放进row
      row.index = rowIndex;
    },
    go_to_add(){
      this.$router.push({path:'/Home/AddWalkIntoInfo',query:{type:3}});
    },
    go_to_eidt(id){
      this.$router.push({path:'/Home/AddWalkIntoInfo',query:{id:id,type:3}});
    },
    handleCurrentChange(val){
      this.parameter.pageNumber = val
      this.getList()
    },
    handleSizeChange(val){
      this.parameter.pageSize = val
      this.getList()
    },
    getList(){
      if(this.value6.length>0){
          this.parameter.startdate = new Date(this.value6[0]).Format('yyyy-MM-dd')
          this.parameter.enddate = new Date(this.value6[1]).Format('yyyy-MM-dd')
      }
      getList(this.parameter).then(res =>{
        if(res.success){
          this.value6=''
          this.parameter.title = ''
          this.parameter.status = ''
          this.tableData = res.data.result 
          this.totalCount = res.data.totalCount
        }
      })
    },
    isPublish(id){
      	this.$confirm('确定发布?', '提示', {
					type: 'warning'
				}).then(() => {
      isPublish(id).then(res =>{
          if(res.success){
            this.$message.success('发布成功')
            this.getList()
          }else {
            this.$message('发布失败')
          }
        })
      })
    },
    deleteNews(id){
      	this.$confirm('确定发布?', '提示', {
					type: 'warning'
				}).then(() => {
          deleteNews(id).then(res =>{
            if(res.success){
              this.$message.success('删除成功')
              this.getList()
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
.padd-right{
  text-align: end;
}
</style>
<style>
.el-date-editor .el-range-separator{
  padding: 0 2px;
}
</style>

