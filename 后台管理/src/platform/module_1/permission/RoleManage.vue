<template>
	<div class="page__role-manage">
		<page-header>
			<template slot="title">角色管理</template>
		</page-header>
		<el-row :gutter="10">
			<el-col :span="6">
				<div class="table-title">
					<span>角色列表</span>
					<el-button type="primary" size="mini" class="fr" @click="addNewDepartment">新增</el-button>
				</div>
				<el-table :data="roles" border :height="contentHeight" :highlight-current-row="true" @row-click="changeRoleName"
				 :current-row-key="currentRoleId" row-key="id">
					<el-table-column prop="name" label="角色名称"></el-table-column>
					<el-table-column label="操作" width="90">
						<template slot-scope="scope">
							<el-button type="text" @click="editRoleInfo(scope.row)">编辑</el-button>
							<el-button type="text" @click="deleteRoleInfo(scope.row)">删除</el-button>
						</template>
					</el-table-column>
				</el-table>
			</el-col>
			<el-col :span="6">
				<div class="table-title">
					<span>选择菜单</span>
					<el-button size="mini" type="primary" class="fr" @click="saveUserMenu">保存</el-button>
				</div>
				<el-tree ref="roleModuleTree" node-key="id" :data="moduleList" :props="moduleListProps" :default-checked-keys="defaultCheckedMoeuleKeyList"
				 :check-strictly="true" :style="{ height: contentHeight + 'px',border:'1px solid #eee' }" show-checkbox
				 :default-expand-all="true">
					<span class="custom-tree-node" slot-scope="{ node, data }">
						<span v-if="data.type_status === 'Button'" style="color: #ff9933;"><i class="fa fa-lock" aria-hidden="true"></i> {{ data.name }}</span>
						<span v-else-if="data.type_status === 'Data'" style="color: #58d761;"><i class="fa fa-lock" aria-hidden="true"></i> {{ data.name }}</span>
						<span v-else >{{ data.name }}</span>
					</span>
				 </el-tree>
			</el-col>
			<el-col :span="12">
				<div class="table-title">角色用户</div>
				<el-table :data="roleDate" :height="contentHeight" border style="width: 100%">
					<el-table-column type="index" label="序号" width="50">
					</el-table-column>
					<el-table-column prop="nickName" label="姓名">
					</el-table-column>
					<el-table-column prop="loginName" label="账号">
					</el-table-column>
					<el-table-column label="操作" width="120">
						<template slot-scope="scope">
							<el-button type="text" size="small" @click="handleDeleteUserRole(scope.row.userId)">删除用户</el-button>
						</template>
					</el-table-column>
				</el-table>
			</el-col>
		</el-row>
		<el-dialog :visible.sync="dialogRoleVisible" title="部门" width="600px">
			<el-form :model="roleParams" :rules="roleParamsRules" ref="roleParams" label-width="100px">
				<el-form-item label="名称" prop="name">
					<el-input v-model="roleParams.name" size="small"></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button size="small" @click="dialogRoleVisible = false">取消</el-button>
				<el-button type="primary" size="small" @click="saveNewRoleInfo">确定</el-button>
			</span>
		</el-dialog>
		<el-dialog :visible.sync="dialogAssignRolesVisible" title="分配角色" width="600px" class="role-user">
			<el-row :gutter="20">
				<el-col :span="12">
					<p class="table-title">未选角色</p>
					<el-table :data="roleList" :height="200" border>
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
					<el-table :data="userRoleList" :height="200" border>
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
	</div>
</template>

<script>
	import PageHeader from '@/component/PageHeader'

	import {
		getRoleList,
		editRoleInfo,
		saveRoleInfo,
		deleteRoleInfo,
		getMenuList,
		saveMenusInfo,
		getAssignList,
		getRoleAssignList,
		getAllRoleAssignList,
		saveUserRoleInfo,
		getAssignSelect,
		getRoleDel,
		deleteUserRoleSelect
	} from './api'
	import {
		pageHeader
	} from '@/app/js/config'

	function initRoleParams() {
		return {
			id: '',
			name: ''
		}
	}

	function initUserParams() {
		return {
			id: '',
			roleId: '',
			userId: '',
			name: ''
		}
	}

	function initAddUserParams() {
		return {
			id: '',
			roleId: '',
			userInd: ''
		}
	}

	const moduleListProps = {
		children: 'childMenus',
		label: 'name',
		type_status:'type_status'
	}

	export default {
		name: 'RoleManage',
		components: {
			PageHeader
		},
		data() {
			return {
				roles: [],
				moduleList: [],
				roleDate: [],
				roleList: [],
				userRoleList: [],
				defaultCheckedMoeuleKeyList: [],
				currentRoleId: '',
				roleId: '',
				roleParams: initRoleParams(),
				userParams: initUserParams(),
				addUserParams: initAddUserParams(),
				roleParamsRules: {
					name: [{
						required: true,
						message: '请输入名称'
					}]
				},
				moduleListProps: moduleListProps,
				dialogRoleVisible: false,
				dialogAssignRolesVisible: false
			}
		},
		computed: {
			contentHeight() {
				return this.$store.getters.mainContent.height - pageHeader.height - pageHeader.margin.bottom - 38
			},
			contentHalfHeight() {
				return (this.$store.getters.mainContent.height - pageHeader.height - pageHeader.margin.bottom - 86) / 2
			}
		},
		async created() {
			this.getRoleList()
		},
		methods: {
			getRoleList() {
				getRoleList().then(response => {
					if (response.success) {
						this.roles = response.data
						this.$nextTick(() => {
							this.currentRoleId = response.data[0].id
							this.getMenuList()
							this.getAssignList()
						})
					} else {
						this.$message.warning(response.msg)
					}
				})
			},
			getMenuList() {
				getMenuList(this.currentRoleId).then(response => {
					this.moduleList = response.data
					getAssignSelect(this.currentRoleId).then(response => {
						this.$refs.roleModuleTree.setCheckedKeys(response.data)
					})
				})
			},
			getAssignList() {
				getAssignList(this.currentRoleId).then(response => {
					this.roleDate = response.data
				})
			},
			// 删除
			handleDeleteUserRole(id) {
				this.$confirm('此操作将不可撤销, 是否继续?', '提示', {
					type: 'warning'
				}).then(() => {
					getRoleDel(id, this.currentRoleId).then((response) => {
						if (response.success) {
							this.$message('删除成功！')
							this.getAssignList()
						} else {
              this.$message.warning(response.msg)
            }
					})
				})
			},
			addNewDepartment() {
				this.roleParams = initRoleParams()
				this.dialogRoleVisible = true
			},
			saveNewRoleInfo() {
				this.$refs.roleParams.validate((valid) => {
					if (!valid) return false
					saveRoleInfo(this.roleParams).then(response => {
						if (response.success) {
							this.$message('保存成功!')
							this.dialogRoleVisible = false
							this.getRoleList()
						} else {
             				 this.$message.warning(response.msg)
            			}
					})
				})
			},
			editRoleInfo(role) {
				editRoleInfo(role.id).then(response => {
					this.roleParams = response.data
					this.dialogRoleVisible = true
				})
			},
			deleteRoleInfo(role) {
				this.$confirm('此操作将不可撤销, 是否继续?', '提示', {
					type: 'warning'
				}).then(() => {
					deleteRoleInfo(role.id).then(response => {
						if (response.success) {
							this.$message('保存成功!')
							this.getRoleList()
						} else {
              this.$message.warning(response.msg)
            }
					})
				})
			},
			saveUserMenu() {
				const userParams = {
					roleId: this.currentRoleId,
					moduleIds: this.$refs.roleModuleTree.getCheckedKeys()
				}
				saveMenusInfo(userParams).then(response => {
					if (response.success) {
						this.$message('保存成功!')
					} else {
						this.$message.warning(response.msg)
					}
				})
			},
			changeRoleName(row) {
				if (row.id === this.currentRoleId) return
				this.currentRoleId = row.id
				this.getMenuList()
				this.getAssignList()
			},
			assignUser(id) {
				getRoleAssignList(id).then(response => {
					this.dialogAssignRolesVisible = true
					this.userRoleList = response.data
				})
				getAllRoleAssignList(id).then(response => {
					if (response.success) {
						// this.$refs.tree.setCheckedKeys([])
					}
				})
			}
		}
	}
</script>

<style scoped>
	.role-user {
		padding-left: 320px;
	}
</style>


<style>
	.page__role-manage .el-table tr {
		cursor: pointer;
	}

	.page__role-manage .el-tree {
		overflow: auto;
	}

	.page__role-manage .role-user {
		height: 700px;
	}
</style>
