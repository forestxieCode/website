<template>
  <div class="page__organization">
    <el-row :gutter="20">
      <page-header>
        <template slot="title">用户管理</template>
        <el-button  type="primary" size="mini" class="fr"  @click="addNewPosition">新增</el-button>
      </page-header>

      <el-col :span="8">
        <div class="table-title">
          <span>部门</span>
          <el-button type="primary" size="mini" class="fr" @click.stop="deleteDepartment">删除</el-button>
          <el-button type="primary" size="mini" class="fr" style="margin-right:10px;" @click.stop="editDepartment">编辑</el-button>
          <el-button type="primary" size="mini" class="fr" @click="addNewDepartment">新增</el-button>
        </div>
        <div>
          <el-tree ref="tree" :data="departmentList" :props="departmentProps" highlight-current @node-click="toggleDepartment"  :style="{ height: mainBodyHeight + 'px',border:'1px solid #eee' }" class="organization-tree" :default-expanded-keys="openMenuArr" node-key="id"></el-tree>
        </div>
      </el-col>
      <el-col :span="16">
        <div class="table-title">
          <!-- <span>用户</span> -->
        </div>
        <el-table :data="positionList" border :max-height="mainBodyHeight">
          <el-table-column prop="nickName" label="姓名" align="center" width="200"></el-table-column>
          <el-table-column prop="loginName" label="账号" align="center" width="200"></el-table-column>
          <el-table-column prop="status" label="状态"  align="center" width="120">
            <template slot-scope="scope" width="80">
              <span :style="{'color':scope.row.status?'#ff0000':'#606266'}">{{scope.row.status?'已禁用':'正常'}}</span>
            </template>
          </el-table-column>
          <el-table-column  align="center" label="操作">
            <template slot-scope="scope">
                <el-button type="text" size="small" @click="assignUser(scope.row.id)">角色分配</el-button>
                <el-button type="text" size="small" @click="initPassword(scope.row.id)">初始化密码</el-button>
                <el-button type="text" size="small" @click="userbing(scope.row.id)">用户绑定</el-button>
                <el-button type="text" size="small" @click="BFSConfig(scope.row.id)">代办配置</el-button>
                <el-button type="text" @click.stop="editPosition(scope.row)" v-if="!scope.row.status">编辑</el-button>
                <el-button type="text" @click.stop="deletePosition(scope.row)" v-if="!scope.row.status">停用</el-button>
            </template>
          </el-table-column>
        </el-table>

        <!-- <el-pagination
                        @size-change="handleSizeChange($event)"
                        @current-change="handleCurrentChange($event)"
                        :current-page="pagePrame.pageNumber"
                        :page-sizes="[13, 30, 60, 100]"
                        :page-size="pagePrame.pageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="totalCount"
        >
        </el-pagination> -->
      </el-col>
    </el-row>
    <el-dialog :visible.sync="dialogDepartmentVisible" title="部门" width="600px">
      <el-form :model="formDepartmentInfo" :rules="formDepartmentInfoRules" ref="formDepartmentInfo" label-width="100px">
        <el-form-item label="名称" prop="name">
          <el-input v-model="formDepartmentInfo.name" size="small"></el-input>
        </el-form-item>
        <el-form-item label="排序" prop="sort">
          <el-input v-model="formDepartmentInfo.sort" size="small"></el-input>
        </el-form-item>
        <el-form-item label="菜单类型" prop="type">
          <el-select v-model="formDepartmentInfo.type" placeholder="请选择" size="small">
            <el-option label="公司" :value="0"></el-option>
            <el-option label="部门" :value="1"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogDepartmentVisible = false">取消</el-button>
        <el-button type="primary" size="small" @click="saveNewDepartmentInfo">确定</el-button>
      </span>
    </el-dialog>

    <el-dialog :visible.sync="dialogUserVisible" title="用户" size="tiny" width="600px">
      <el-form :model="formUserInfo" :rules="formUserInfoRules" ref="formUserInfo" label-width="80px">
        <el-form-item label="登录账号" prop="loginName">
          <el-input v-model="formUserInfo.loginName" size="small" :disabled="isEdit"></el-input>
        </el-form-item>
        <el-form-item label="登录密码" prop="password">
          <el-input v-model="formUserInfo.password" size="small" :disabled="isEdit" type="password"></el-input>
        </el-form-item>
        <el-form-item label="用户名称" prop="nickName">
          <el-input v-model="formUserInfo.nickName" size="small"></el-input>
        </el-form-item>
        <el-form-item label="用户邮箱" prop="email">
          <el-input v-model="formUserInfo.email" size="small"></el-input>
        </el-form-item>
        <el-form-item label="手机号码" prop="phone">
          <el-input v-model="formUserInfo.phone" size="small"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" align="right">
        <el-button size="small" @click="dialogUserVisible = false">取消</el-button>
        <el-button type="primary" size="small" @click="saveNewUseInfo">保存</el-button>
      </span>
    </el-dialog>
    <el-dialog :visible.sync="dialogAssignRolesVisible" title="分配角色" width="600px" class="role-user">
      <el-row :gutter="20">
        <el-col :span="12">
          <p class="table-title">未选角色</p>
          <el-table :data="roleList" :height="350" border>
            <el-table-column prop="name" label="角色名称"></el-table-column>
            <el-table-column label="操作" width="50">
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="assignUserRoleById(scope.row.id)">添加</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
        <el-col :span="12">
          <p class="table-title">已选角色</p>
          <el-table :data="userRoleList" :height="350" border>
            <el-table-column prop="name" label="角色名称"></el-table-column>
            <el-table-column label="操作" width="50">
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="deleteUserRoleById(scope.row.id)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </el-dialog>

    




    <!-- <el-dialog :visible.sync="UserbindingVisible" title="用户绑定" width="550">
      <el-row :gutter="20" style="background:#eee;">
        <el-col :span="12" >
          <p class="table-title">选择系统</p>
              <el-tree :data="systemSelect" 
              :props="departmentProps" 
              :highlight-current="true"
              :check-strictly="true"
              show-checkbox
              ref="systemSelect"
              node-key="id"
              :default-checked-keys="defaultsystemSelectKeyList"
              :default-expand-all="true"
              @node-click="getStudentListByOrgId"
              style="margin-bottom:10px;"
              >
              </el-tree>
        </el-col>
        <el-col :span="12" style="background:#eee;">
          <p class="table-title">设置账号</p>
           <el-form :model="formPasswordInfo" :rules="formPasswordRules" ref="formSetuserbind" label-width="120px">
              <el-form-item label="用户名" prop="username">
                <el-input v-model="formPasswordInfo.username" size="small" ></el-input>
              </el-form-item>
              <el-form-item label="密   码" prop="password">
                <el-input v-model="formPasswordInfo.password" size="small" ></el-input>
              </el-form-item>
          </el-form>
  
        </el-col>
      </el-row>
      <span slot="footer">
        <el-button @click="UserbindingVisible = false" size="small">取消</el-button>
        <el-button type="primary" @click="saveUserbind" size="small">保存</el-button>
      </span>
    </el-dialog>  -->

      <el-dialog :visible.sync="UserbindingVisible" title="用户绑定" width="60%" >
        <div class="userbind" style="margin-bottom:10px;" v-for="(item,index) in formPasswordInfobuff" :key="index" >
              <el-row :gutter="10" >
                <el-col :span="6">
                       <div class="item">
                          <span class="title">关联系统:</span>
                          <el-select v-model="item.projectid" size="small" :disabled="item.id!=''">
                                <el-option v-for="linkType in systemSelect" :key="linkType.id" :label="linkType.name" :value="linkType.id"></el-option>
                          </el-select>
                       </div>
                </el-col>
                <el-col :span="7">
                       <div class="item">
                         <span class="title">用户账号:</span>
                         <el-input v-model="item.username" size="small" ></el-input>
                       </div>
                </el-col>
                <el-col :span="7">
                       <div class="item">
                         <span class="title">用户密码:</span>
                         <el-input v-model="item.password" size="small" ></el-input>
                       </div> 
                </el-col>
                <el-col :span="4">
                     <el-button type="danger" icon="el-icon-minus" size="small" @click="minusitem(item)"></el-button> 
                     <el-button type="primary" icon="el-icon-plus" size="success" @click="pulsitem" v-if="(formPasswordInfobuff.length-1)==index"></el-button> 
                </el-col>
              </el-row>
        </div>
      <span slot="footer">
        <el-button @click="UserbindingVisible = false" size="small">取消</el-button>
        <el-button type="primary" @click="saveUserbind" size="small">保存</el-button>
      </span>
    </el-dialog> 

    <el-dialog :visible.sync="interconnectSysVisible " title="代办配置" width="400px" >
        <!-- <div class="userbind" style="margin-bottom:10px;" v-for="(item,index) in formPasswordInfobuff" :key="index" > 
        </div> -->
        <el-row>
          <el-col :span="24">
              <el-tree ref="roleModuleTree" node-key="id" :data="BfsList" :props="moduleListProps" :default-checked-keys="defaultCheckedMoeuleKeyList"
              :check-strictly="true"  show-checkbox
              :default-expand-all="true">
              </el-tree>
          </el-col>
        </el-row>
      <span slot="footer">
        <el-button @click="interconnectSysVisible = false" size="small">关闭</el-button>
        <el-button type="primary" @click="saveInterconnectSys" size="small">保存</el-button>
      </span>
    </el-dialog> 

  </div>
</template>

<script>
import { getProjects , getBfsList , saveUserBfs , getUserBfsByUserId} from '@/api/index'
import PageHeader from '@/component/PageHeader'
import { pageHeader } from '@/app/js/config'
import {
  getNewOrganizationList,
  getOrgUsers,
  saveOrgDepartmentInfo,
  deleteOrgDepartmentInfo,
  saveUserRoleInfo,
  deleteUserRoleSelect,
  saveOrgPositionInfo,
  deleteOrgPositionInfo,
  saveOrgUserInfo,
  checkOrgLoginName,
  getUnselectRoleList,
  getRoleAssignList,
  editOrgList,
  editUserInfo,
  initPassword,
  saveEditUserInfo,
  saveUserproject,
  getByUserId,
  batchSave,
  deleteUserproject,
  getAuthUsers
} from './api'

const departmentProps = {
  children: 'childs',
  label: 'name'
}

const moduleListProps = {
		label: 'name',
    id:'id',
}

function findColumnMenuById (id, speMenu) {
  for (const columnMenu of speMenu) {
    if (columnMenu.id === id) {
      return columnMenu
    } else {
      const result = findColumnMenuById(id, columnMenu.childs || [])
      if (result) return result
    }
  }
}

function findOpenMenuArr (id, speList) {
  const parentsId = [id]
  let parentSpecialList = {}
  do {
    parentSpecialList = findColumnMenuById(id, speList)
    parentsId.unshift(parentSpecialList.parentId)
    id = parentSpecialList.parentId
  } while (parentSpecialList.parentId !== speList[0].parentId)
  return parentsId
}
function initformPasswordInfo(userId){
    return {
        username:'',
        password:'',
        projectid:'',
        userid:userId||'',
        id:''
      }
} 

export default {
  components: { PageHeader },
  data () {
    return {
      formBatchModifyUser: {
        departmentID: undefined,
        positionID: undefined
      },
      UserbindingVisible:false,
      departmentProps: departmentProps,
      defaultCheckedMoeuleKeyList:[],
      openMenuArr: [],
      currentKey: '',
      dialogBatchModifyUserVisible: false,
      departmentList: [],
      positionList: [],
      positionListForBatchModify: [],
      userList: [],
      roleList: [],
      userRoleList: [],
      userId: '',
      moduleListProps:moduleListProps,
      defaultsystemSelectKeyList:[],
      dialogDepartmentVisible: false,
      dialogPositionVisible: false,
      dialogUserVisible: false,
      dialogAssignRolesVisible: false,
      interconnectSysVisible:false,
      formDepartmentInfo: getDepartmentInfoForm(),
      formPositionInfo: getPositionInfoForm(),
      formUserInfo: getUserInfoForm(),
      formPasswordInfo:initformPasswordInfo(),
      formPasswordInfobuff:[],
      pagePrame:{
          pageNumber:1,
          pageSize:13,
          loginName:'',
          nickName:''
      },
      totalCount:0,
      formDepartmentInfoRules: {
        name: [
          { required: true, message: '请输入名称' }
        ],
        sort: [
          { required: true, message: '请输入排序' }
        ],
        type: [
          { required: true, message: '请输入类型' }
        ]
      },
      formUserInfoRules: {
        loginName: [
          { required: true, message: '请输入登录账号' }
        ],
        password: [
          { required: true, message: '请输入登录密码' }
        ],
        nickName: [
          { required: true, message: '请输入用户名称' }
        ],
        email: [
          { validator: checkEmail, trigger: 'blur' }
        ],
        phone: [
          { validator: checkPhone, trigger: 'blur' }
        ]
      },
      departmentRowKey: null,
      departmentParentId: null,
      positionRowKey: null,
      employeeArr: [],
      jobId: '',
      uploadExportFileList: [],
      isEdit: false,
      uploadUsersErrors: [],
      systemSelect:[],
      BfsList:[]
    }
  },
  computed: {
    contentHeight() {
				return this.$store.getters.mainContent.height - pageHeader.height - pageHeader.margin.bottom - 38
		},
		contentHalfHeight() {
				return (this.$store.getters.mainContent.height - pageHeader.height - pageHeader.margin.bottom - 86) / 2
		},
    mainBodyHeight () {
      return this.$store.getters.mainContent.height - pageHeader.height - pageHeader.margin.bottom - 40
    }
  },
  mounted () {
    this.getUserList()
    this.getProjects()
    this.getOrgsList()
    this.getBfsList()
  },
  methods: {
    getBfsList(){
      getBfsList().then(res =>{
        if(res.success){
          this.BfsList = res.data
        }
      })
    },
    saveUserBfs(){

    },
    getUserBfsByUserId(id){
        getUserBfsByUserId({userId:id}).then(res=>{
          if(res.success){
            if(res.data.length>0){
              var data = res.data.map(item => item.bfsId)
              this.defaultCheckedMoeuleKeyList = data
            }else {
              // this.defaultCheckedMoeuleKeyList
              // this.$set(this.defaultCheckedMoeuleKeyList,[])
              this.defaultCheckedMoeuleKeyList=[]
              this.$refs.roleModuleTree.setCheckedKeys([]); 
              // console.log(12)
            }
            //  = res.data
          }
        })
    },
    handleSizeChange(val){
      this.pagePrame.pageSize = val
      this.getUserList ()
    },
    handleCurrentChange(val){
        this.pagePrame.pageNumber = val
        this.getUserList ()
    },
    saveUserbind(){
      this.formPasswordInfobuff.forEach(item =>{
        item.userid = this.userId
        if(item.projectid==''){
            this.$message('请选择关联系统')
            return
        }else if(item.username==''){
           this.$message('用户账号不能为空')
           return 
        }else if(item.password==''){
          this.$message('用户密码不能为空')
          return 
        }
      })
      batchSave({data:this.formPasswordInfobuff}).then(res=>{
        if(res.success){
            this.$message.success('保存成功')
            this.UserbindingVisible = false
        }else {
          this.$message(res.msg)
        }
      })
    },
    pulsitem(){
      this.formPasswordInfobuff.push(initformPasswordInfo(this.userId))
    },
    minusitem(item){
          this.$confirm('此操作将不可撤销, 是否继续?', '提示', {
              type: 'warning'
            })
            this.$confirm('确定删除该项，是否继续?','提示',{
              type:'warning'
            }).then(()=>{
              let index = this.formPasswordInfobuff.indexOf(item)
              if(index!=-1){
                this.formPasswordInfobuff.splice(index,1)
              }
              deleteUserproject({id:item.id}).then(res =>{
                if(res.success){
                  this.$message({ message: '操作成功！', type: 'success', duration: 1500 })
                  this.getUserList()
                } 
                else {
                  this.$message.warning(res.msg)
                }
              })
            }).catch(() => {
              this.$message({ type: 'info', message: '已取消删除', duration: 1500 })
            })
    },
    assignUser (id) {
      this.userId = id
      getUnselectRoleList(id).then(response => {
        this.roleList = response.data
      })
      getRoleAssignList(id).then(response => {
        this.dialogAssignRolesVisible = true
        this.userRoleList = response.data
      })
    },
    getOrgsList () {
      getNewOrganizationList().then(response => {
        this.departmentList = response.data
        if (!this.openMenuArr.length) {
          this.openMenuArr.push(response.data[0].id)
          this.currentKey = response.data[0].id
          this.$nextTick(() => {
            this.$refs.tree.setCurrentKey(response.data[0].id)
          })
        } else {
          this.openMenuArr = findOpenMenuArr(this.currentKey, this.departmentList)
          this.$nextTick(() => {
            this.$refs.tree.setCurrentKey(this.currentKey)
          })
        }
        this.getUserList()
      })
    },
    userbing(id){
      this.userId = id
      this.formPasswordInfobuff = []
      getByUserId({userid: this.userId}).then(res=>{
        if(res.success){
          if(res.data.length>0){
            this.formPasswordInfobuff = res.data
          }else {
              this.formPasswordInfobuff.push(initformPasswordInfo())
          }
          this.UserbindingVisible = true
        }
      })
    },
    BFSConfig(id){
        this.userId = id
        this.getUserBfsByUserId(id)
        this.interconnectSysVisible = true
        

    },
    saveInterconnectSys(){
      var data = this.$refs.roleModuleTree.getCheckedKeys()
      saveUserBfs({bfsIds:data.join(','),userId:this.userId}).then(res =>{
        if(res.success){
           this.$message.success('保存成功')
           this.interconnectSysVisible=false
        }
      })
    },
    getUserList () {
      getOrgUsers(this.currentKey).then(response => {
        this.positionList = response.data
      })
      // getAuthUsers(this.pagePrame).then(response => {
      //   if(response.success){
      //     this.positionList = response.data.result
      //     this.totalCount = response.data.totalCount
      //   }else {
      //     this.$message.info('接口报错')
      //   }
      // })
    },
    saveNewDepartmentInfo () {
      this.$refs.formDepartmentInfo.validate((valid) => {
        if (!valid) return false
        this.formDepartmentInfo.parentId = this.formDepartmentInfo.id ? this.formDepartmentInfo.parentId : this.currentKey
        let formParams = this.formDepartmentInfo
        saveOrgDepartmentInfo(formParams).then(response => {
          if (response.success) {
            this.dialogDepartmentVisible = false
            this.$message({ message: '操作成功！', type: 'success', duration: 1500 })
            this.getOrgsList()
          } else {
            this.$message.warning(response.msg)
          }
        })
      })
    },
    editDepartment () {
      editOrgList(this.currentKey).then(response => {
        for (let key in this.formDepartmentInfo) {
          this.formDepartmentInfo[key] = response.data[key]
        }
        this.dialogDepartmentVisible = true
      })
    },
    deleteDepartment () {
      this.$confirm('此操作将不可撤销, 是否继续?', '提示', {
        type: 'warning'
      }).then(() => {
        deleteOrgDepartmentInfo(this.currentKey).then(response => {
          if (response.success) {
            this.$message({ message: '操作成功！', type: 'success', duration: 1500 })
            this.getOrgsList()
            this.currentKey = this.departmentParentId
            this.getUserList()
          } else {
            this.$message(response.msg)
          }
        })
      }).catch(() => {
        this.$message({ type: 'info', message: '已取消删除', duration: 1500 })
      })
    },
    toggleDepartment (department) {
      if (department.id === this.currentKey) return
      this.departmentParentId = department.parentId
      this.currentKey = department.id
      this.openMenuArr = findOpenMenuArr(department.id, this.departmentList)
      this.getUserList()
    },
    addNewPosition () {
      this.isEdit = false
      this.formUserInfo = getUserInfoForm()
      this.dialogUserVisible = true
    },
    saveNewPositionInfo () {
      this.$refs.formPositionInfo.validate((valid) => {
        if (!valid) return false
        this.formPositionInfo.orgId = this.departmentRowKey
        saveOrgPositionInfo(this.formPositionInfo).then(response => {
          if (response.success) {
            this.dialogPositionVisible = false
            this.$message({ message: '操作成功！', type: 'success', duration: 1500 })
          } else {
            this.$message.warning(response.msg)
          }
        })
      })
    },
    editPosition (position) {
      editUserInfo(position.id).then(response => {
        for (let key in this.formUserInfo) {
          this.formUserInfo[key] = response.data[key]
        }
        this.isEdit = true
        this.dialogUserVisible = true
      })
    },
    deletePosition (position) {
      this.$confirm('此操作将不可撤销, 是否继续?', '提示', {
        type: 'warning'
      }).then(() => {
        deleteOrgPositionInfo(position.id).then(response => {
          if (response.success) {
            this.$message({ message: '操作成功！用户已禁用', type: 'success', duration: 1500 })
            this.getUserList()
          } else {
            this.$message.warning(response.msg)
          }
        })
      }).catch(() => {
        this.$message({ type: 'info', message: '已取消删除', duration: 1500 })
      })
    },
    togglePosition (position) {
      if (position.id === this.positionRowKey) return

      this.jobId = position.id
      this.positionRowKey = position.id
    },
    addNewDepartment () {
      this.formDepartmentInfo = getDepartmentInfoForm()
      this.dialogDepartmentVisible = true
    },
    saveNewUseInfo () {
      this.$refs.formUserInfo.validate((valid) => {
        if (!valid) return false
        this.formUserInfo.organiztionId = this.currentKey
        if (this.isEdit) {
          saveEditUserInfo(this.formUserInfo).then(response => {
            if (response.success) {
              this.dialogUserVisible = false
              this.$message({ message: response.msg, type: 'success', duration: 1500 })
              this.getUserList()
            } else {
              this.$message.error(response.msg)
            }
          })
        } else {
          saveOrgUserInfo(this.formUserInfo).then(response => {
            if (response.success) {
              this.dialogUserVisible = false
              this.$message({ message: response.msg, type: 'success', duration: 1500 })
              this.getUserList()
            } else {
              this.$message.error(response.msg)
            }
          })
        }
      })
    },
    assignUserRoleById (id) {
      const addUserParams = {
        roleid: id,
        userid: this.userId
      }
      saveUserRoleInfo(addUserParams).then(response => {
        if (response.success) {
          this.assignUser(this.userId)
        } else {
          this.$message.warning(response.msg)
        }
      })
    },
    deleteUserRoleById (id) {
      deleteUserRoleSelect(id).then(response => {
        if (response.success) {
          this.assignUser(this.userId)
        } else {
          this.$message.warning(response.msg)
        }
      })
    },
    initPassword (id) {
      initPassword(id).then(response => {
        if (response.success) {
          this.$message(response.msg)
        } else {
          this.$message.warning(response.msg)
        }
      })
    },
    getProjects(){
      getProjects().then(res =>{
        if(res.success){
          this.systemSelect = res.data
          // console.log(res)
        }
      })
    },
    
  }
}

function checkPhone (rule, value, callback) {
  if (!value) {
    return callback()
  }

  /1[34578]\d{9}/.test(value) ? callback() : callback(new Error('手机号码格式错误！'))
}

function checkEmail (rule, value, callback) {
  if (!value) {
    return callback()
  }

  /\S+@\w+\.\w+/.test(value) ? callback() : callback(new Error('邮箱格式错误！'))
}

function checkLoginName (rule, value, callback) {
  checkOrgLoginName(value).then(response => {
    response ? callback(new Error('账号已存在！')) : callback()
  })
}

function getUserInfoForm () {
  return {
    loginName: '',
    password: '',
    nickName: '',
    email: '',
    imagepath: '',
    phone: '',
    id: '',
    organiztionId: '',
    status: 0,
    isadmin: 0
  }
}

function getPositionInfoForm () {
  return {
    orgId: '',
    name: '',
    remark: '',
    seqNo: ''
  }
}

function getDepartmentInfoForm () {
  return {
    id: '',
    name: '',
    parentId: '',
    sort: '',
    type: '',
    enterpriseId: ''
  }
}
</script>

<style scoped>
.dialog__upload-error .error-content {
  border-radius: 5px;
  color: #f04134;
  background-color: #d9d9d9;
}

.dialog__upload-error .error-title {
  height: 20px;
  padding-left: 1em;
  font-size: 16px;
  line-height: 35px;
  color: #d73435;
}

.dialog__upload-error .error-list {
  overflow: auto;
  max-height: 300px;
  padding: 1px 1em;
  font-size: 12px;
  line-height: 1.5;
  background-color: #e9e9e9;
}
</style>


<style>
.page__organization .el-table .el-button--text {
  font-size: 12px;
}

.page__organization .el-table .cell {
  cursor: pointer;
}

.page__organization .organization-tree{
  overflow:auto
}
.page__organization .role-user .el-dialog{
  height:500px;
}
.userbind .item{
  display: flex;
}
.userbind .item .title{
  display: flex;
  width:150px;
  align-items: center;
}
</style>
