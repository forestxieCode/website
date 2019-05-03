<template>
	<div class="page__permission-menu">
		<page-header>
			<template slot="title">菜单配置</template>
		</page-header>
		<div class="page-body">
			<div class="menu-tree">
				<el-tree ref="trees" :data="menus" :props="menuTreeProps" :auto-expand-parent="false" :filter-node-method="filter"
				 :default-expanded-keys="expandedMenusId" :style="{ height: contentHeight + 'px' }" node-key="id" highlight-current
				 @node-click="handleToggleMenu" @node-expand="handleExpendMenu" @node-collapse="handleCollapseMenu"></el-tree>
			</div>
			<div class="page-content" :style="{ height: contentHeight + 'px' }" style="overflow: auto;">
				<div class="table-title">当前菜单</div>
				<el-table :data="currentMenuData" border>
					<el-table-column v-for="menu in menuTableColumns" :key="menu.prop" :prop="menu.prop" :label="menu.label" :width="menu.width"
					 :min-width="menu.minWidth" :align="menu.align">
						<template slot-scope="scope">{{ _getMenuPropLabel(scope.row, menu.prop) }}</template>
					</el-table-column>
					<el-table-column label="操作" width="80" align="center">
						<template slot-scope="scope">
							<el-button type="text" @click="handleEditMenuInfo(scope.row)">
								<i class="fa fa-pencil-square-o" aria-hidden="true"></i>
							</el-button>
							<el-button v-if="scope.row.id > 0" type="text" @click="handleEditFuncInfo(scope.row)">
								<i class="fa fa-lock" aria-hidden="true"></i>
							</el-button>
						</template>
					</el-table-column>
				</el-table>
				<div class="table-title">
					<span>子菜单</span>
					<el-button type="primary" size="mini" @click="handleAddNewMenu">
						<i class="fa fa-plus" aria-hidden="true"></i>
						<span>新增</span>
					</el-button>
				</div>
				<el-table :data="submenuList" :default-sort="{ prop: 'order' }" border>
					<el-table-column v-for="menu in menuTableColumns" :key="menu.prop" :prop="menu.prop" :label="menu.label" :width="menu.width"
					 :min-width="menu.minWidth" :align="menu.align">
						<template slot-scope="scope">{{ _getMenuPropLabel(scope.row, menu.prop) }}</template>
					</el-table-column>
					<el-table-column label="操作" width="80" align="center">
						<template slot-scope="scope">
							<el-button type="text" @click="handleEditMenuInfo(scope.row)">
								<i class="fa fa-pencil-square-o" aria-hidden="true"></i>
							</el-button>
							<el-button type="text" :disabled="!!scope.row.childMenus.length" @click="handleDeleteMenuInfo(scope.row)">
								<i class="fa fa-trash-o" aria-hidden="true"></i>
							</el-button>
						</template>
					</el-table-column>
				</el-table>
			</div>
		</div>
		<el-dialog :visible.sync="dialogMenuInfoVisible" :close-on-click-modal="false" :close-on-press-escape="false" title="添加"
		 custom-class="menu-info-dialog" width="600px">
			<el-form ref="menuForm" label-width="80px" :model="menuForm" :rules="menuFormRuleList">
				<el-row :gutter="20">
					<el-col :span="12">
						<el-form-item label="名称" prop="name">
							<el-input v-model="menuForm.name" size="small"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="排序" prop="order">
							<el-input v-model.number="menuForm.order" size="small"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="路由" prop="route">
							<el-input v-model="menuForm.route" size="small"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="链接类型" prop="linkType">
							<el-select v-model="menuForm.linkType" size="small">
								<el-option v-for="linkType in linkTypeOptions" :key="linkType.value" :label="linkType.label" :value="linkType.value"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="侧边状态" prop="sidebarStatus">
							<el-select v-model="menuForm.sidebarStatus" size="small">
								<el-option v-for="linkType in sidebarStateOptions" :key="linkType.value" :label="linkType.label" :value="linkType.value"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="侧边样式" prop="styleClass">
							<el-input v-model="menuForm.styleClass" size="small"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="12">
						<el-form-item label="常用服务" prop="iscommon">
							<el-switch v-model="menuForm.iscommon" on-text="是" off-text="否" on-color="#00a854" off-color="#f04134" :on-value="1"
							 :off-value="0"></el-switch>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
			<span slot="footer">
				<el-button @click="dialogMenuInfoVisible = false" size="small">取消</el-button>
				<el-button type="primary" @click="handleSaveMenuInfo" size="small">保存</el-button>
			</span>
		</el-dialog>
		<el-dialog :visible.sync="dialogfuncInfoVisible" :close-on-click-modal="false" :close-on-press-escape="false" title="页面权限"
		custom-class="menu-info-dialog" width="800px">
			<el-tabs v-model="tabValues" type="border-card" @tab-click="handleClick">
				<el-tab-pane label="功能权限" name="Button">
					<el-form ref="funcForm" label-width="80px" :model="funcForm" :rules="funcFormRuleList">
						<el-row :gutter="20">
							<el-col :span="12">
								<el-form-item label="功能名称" prop="name">
									<el-input v-model="funcForm.name" size="small"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item label="功能编码" prop="code">
									<el-input v-model="funcForm.code" size="small"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item label="功能地址" prop="route">
									<el-input v-model="funcForm.route" size="small"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item label="元素ID" prop="element_id">
									<el-input v-model="funcForm.element_id" size="small"></el-input>
								</el-form-item>
							</el-col>
						</el-row>
					</el-form>
					<div style="text-align: right;margin-bottom: 20px;">
						<el-button type="primary" @click="handleSaveFuncInfo(1,1)" size="small">新增</el-button>
						<el-button type="primary" v-if="funcForm.id" @click="handleSaveFuncInfo(1,2)" size="small">修改</el-button>
						<el-button @click="dialogfuncInfoVisible = false" size="small">取消</el-button>
					</div>
					<el-table :data="funcList" border max-height="300">
						<el-table-column label="名称" prop="name" align="center"></el-table-column>
						<el-table-column label="编码" prop="code" align="center"></el-table-column>
						<el-table-column label="地址" prop="route" align="center"></el-table-column>
						<el-table-column label="ID" prop="element_id" align="center"></el-table-column>
						<el-table-column label="操作" align="center" width="80">
							<template slot-scope="scope">
								<el-button type="text" @click="updataFuncInfo(1,scope.row)">
									<i class="fa fa-pencil-square-o" aria-hidden="true"></i>
								</el-button>
								<el-button type="text" @click="handleDeleteFuncInfo(1,scope.row)">
									<i class="fa fa-trash-o" aria-hidden="true"></i>
								</el-button>
							</template>
						</el-table-column>
					</el-table>
				</el-tab-pane>
				<el-tab-pane label="数据权限" name="Data">
					<el-form ref="funcForm" label-width="80px" :model="funcForm">
						<el-row :gutter="20">
							<el-col :span="12">
								<el-form-item label="名称" prop="name">
									<el-input v-model="funcForm.name" size="small"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item label="编码" prop="code">
									<el-input v-model="funcForm.code" size="small"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item label="地址" prop="route">
									<el-input v-model="funcForm.route" size="small"></el-input>
								</el-form-item>
							</el-col>
						</el-row>
					</el-form>
					<div style="text-align: right;margin-bottom: 20px;">
						<el-button type="primary" @click="handleSaveFuncInfo(2,1)" size="small">新增</el-button>
						<el-button type="primary" v-if="funcForm.id" @click="handleSaveFuncInfo(2,2)" size="small">修改</el-button>
						<el-button @click="dialogfuncInfoVisible = false" size="small">取消</el-button>
					</div>
					<el-table :data="funcLists" border max-height="300">
						<el-table-column label="名称" prop="name" align="center"></el-table-column>
						<el-table-column label="编码" prop="code" align="center"></el-table-column>
						<el-table-column label="地址" prop="route" align="center"></el-table-column>
						<el-table-column label="操作" align="center" width="80">
							<template slot-scope="scope">
								<el-button type="text" @click="updataFuncInfo(2,scope.row)">
									<i class="fa fa-pencil-square-o" aria-hidden="true"></i>
								</el-button>
								<el-button type="text" @click="handleDeleteFuncInfo(2,scope.row)">
									<i class="fa fa-trash-o" aria-hidden="true"></i>
								</el-button>
							</template>
						</el-table-column>
					</el-table>
				</el-tab-pane>
			</el-tabs>
		</el-dialog>
	</div>
</template>

<script>
	import PageHeader from '@/component/PageHeader'
	import { saveMenuInfo, deleteMenuInfo } from './api'
	import { TERM } from '@/shared/constant'
	import { assign } from '@/shared/util'
	import { pageHeader } from '@/app/js/config'

	let isCommonServe = false

	const ROOT_ID = -1
	const linkTypeOptions = [{
			label: '其它',
			value: 0
		},
		{
			label: '当前应用',
			value: 1
		},
		{
			label: '当前标签',
			value: 2
		},
		{
			label: '新标签',
			value: 3
		}
	]
	const sidebarStateOptions = [{
			label: '展开',
			value: 1
		},
		{
			label: '关闭',
			value: 2
		},
		{
			label: '隐藏',
			value: 3
		}
	]
	const converMenuPropList = [{
			prop: 'linkType',
			list: linkTypeOptions
		},
		{
			prop: 'sidebarStatus',
			list: sidebarStateOptions
		},
		{
			prop: 'iscommon',
			list: [{
				label: '否',
				value: false
			}, {
				label: '是',
				value: true
			}]
		}
	]

	const getCurrentMenu = function getCurrentMenu(id, list) {
		for (const item of list) {
			if (item.id === id) return item
			const { childMenus } = item
			if (childMenus.length > 0) {
				const currentMenu = getCurrentMenu(id, childMenus)
				if (currentMenu) return currentMenu
			}
		}
	}

	const getInitMenuForm = function getInitMenuForm() {
		return {
			order: '',
			linkType: 1,
			sidebarStatus: 1,
			name: '',
			route: '',
			styleClass: '',
			iscommon: 0
		}
	}

	function initFuncForm(){
		return {
			childMenus: [],
			name: '',
			code: '',
			route: '',
			element_id: '',
			parentId: '',
			type_status: 'Button'
		}
	}
	export default {
		name: 'MenuConfig',
		components: {
			PageHeader
		},
		data() {
			return {
				dialogMenuInfoVisible: false,
				linkTypeOptions: linkTypeOptions,
				sidebarStateOptions: sidebarStateOptions,
				dialogfuncInfoVisible: false,
				parentInfo: {},
				funcForm: initFuncForm(),
				funcList: [],
				funcLists: [],
				funcFormRuleList: {
					element_id: [{
						required: true,
						message: '请输入元素id'
					}],
					name: [{
						required: true,
						message: '请输入功能名称'
					}]
				},
				menuForm: getInitMenuForm(),
				menuFormRuleList: {
					id: [{
						required: true,
						message: '请输入 id'
					}],
					order: [{
						required: true,
						message: '请输入排序'
					}],
					name: [{
						required: true,
						message: '请输入名称'
					}]
				},
				menuTableColumns: [{
						label: '排序',
						prop: 'order',
						width: 50,
						align: 'center'
					},
					{
						label: '名称',
						prop: 'name',
						minWidth: 100
					},
					{
						label: '路由',
						prop: 'route',
						minWidth: 200
					},
					{
						label: '链接类型',
						prop: 'linkType',
						minWidth: 80,
						align: 'center'
					},
					{
						label: '侧边状态',
						prop: 'sidebarStatus',
						minWidth: 80,
						align: 'center'
					},
					{
						label: '常用',
						prop: 'iscommon',
						minWidth: 50,
						align: 'center'
					}
				],
				menuTreeProps: {
					label: 'name',
					children: 'childMenus'
				},
				rootModule: {},
				currentMenu: [],
				menus:[],
				currentMenuData: [],
				submenuList: [],
				expandedMenusId: [ROOT_ID],
				tabValues: 'Button',
				selectObj: ''
			}
		},
		computed: {
			contentHeight() {
				return this.$store.getters.mainContent.height - pageHeader.height - pageHeader.margin.bottom - 38
			},
			productServes() {
				return this.$store.state.productServes
			}
		},
		created() {
			this.setData()
		},
		mounted(){
			setTimeout(()=>{
				this.$refs.trees.filter('Button');
			}, 200);
		},
		destroyed() {
			isCommonServe = false
		},
		watch: {
			productServes(to, from) {
				this.setData()
				this.currentMenu = getCurrentMenu(this.currentMenu.id, to)
			}
		},
		methods: {
			setData(){
				this.rootModule = {
					id: ROOT_ID,
					name: '功能菜单',
					order: 999,
					childMenus: this.productServes
				}
				this.currentMenu = this.rootModule;
				this.menus = [this.rootModule]
				this.currentMenuData = [this.currentMenu]
				this.submenuList = [];
				this.currentMenu.childMenus.forEach(item => {
					if(item.type_status !== "Button" && item.type_status !== "Data"){
						this.submenuList.push(item)
					}
				})
			},
			filter(value,data){
				if(data.type_status == 'Data'){
					return false
				}else if(data.type_status == 'Button'){
					return false
				}else{
					return true
				}
			},
			_getMenuPropLabel(menu, key) {
				//  判断表格当行数据的链接类型、侧边状态、是否是常用
				if (!menu[key]) return '-'

				for (const conver of converMenuPropList) {
					if (conver.prop === key) return conver.list.find(item => item.value === menu[key]).label
				}
				return menu[key]
			},
			handleToggleMenu(menu) {
				this.currentMenu = menu
				this.currentMenuData = [this.currentMenu]
				this.submenuList = [];
				this.currentMenu.childMenus.forEach(item => {
					if(item.type_status !== "Button" && item.type_status !== "Data"){
						this.submenuList.push(item)
					}
				})
			},
			handleExpendMenu({id}) {
				this.expandedMenusId.push(id)
			},
			handleCollapseMenu({id}) {
				const index = this.expandedMenusId.findIndex(menuId => menuId === id)
				if (index > -1) this.expandedMenusId.splice(index, 1)
			},
			handleAddNewMenu() {
				this.menuForm = getInitMenuForm()
				if (this.$refs.menuForm) this.$refs.menuForm.resetFields()

				assign(this.menuForm, this.currentMenu, {
					extra: ['typeid', {
						toKey: 'parentId',
						fromKey: 'id'
					}],
					onlyExtra: true
				})
				this.dialogMenuInfoVisible = true
			},
			handleClick(){
				let parentId = this.funcForm.parentId
				this.funcForm = initFuncForm()
				this.funcForm.parentId = parentId
			},
			handleEditFuncInfo(Func) {
				this.funcList = [];
				this.funcLists = [];
				Func.childMenus.forEach(item => {
					if(item.type_status === 'Button'){
						this.funcList.push(item)
					}else if(item.type_status === 'Data'){
						this.funcLists.push(item)
					}
				})
				this.parentInfo = Func;
				this.funcForm.parentId = Func.id;
				this.dialogfuncInfoVisible = true
			},
			handleSaveFuncInfo(type,sta) {
				if(type == 1) {
					this.funcForm.type_status = "Button"
				}else{
					this.funcForm.type_status = "Data"
					this.funcForm.element_id = ''
				}
				if(sta == 1) this.funcForm.id = ''

				this.$refs['funcForm'].validate((valid) => {
					if (valid) {
						saveMenuInfo(this.funcForm).then(res =>{
							if(res.success){
								if(this.funcForm.id){
									this.selectObj.name = this.funcForm.name
									this.selectObj.code = this.funcForm.code
									this.selectObj.route = this.funcForm.route
									this.$message.success('修改成功!');
								}else{
									res.data.childMenus = [];
									if(type == 1){
										this.funcList.push(res.data);
									}else{
										this.funcLists.push(res.data);
									}
									this.parentInfo.childMenus.push(res.data);
									this.funcForm = initFuncForm();
									this.funcForm.parentId = this.funcList[0].parentId
									this.$message.success('添加成功!');
								}
							}else if(!res.success && res.code == 0){
								this.$alert(res.msg, '提示', {
									confirmButtonText: '确定'
								});
								return;
							}else{
								this.$message.warning(res.msg);
							}
						})
					} else {
						return false;
					}
				});
			},
			updataFuncInfo(type,item){ //选择要修改的数据
				if(type == 1){
					this.funcForm.element_id = item.element_id
				}else{
					this.funcForm.element_id = ''
				}
				this.funcForm.id = item.id
				this.funcForm.name = item.name
				this.funcForm.code = item.code
				this.funcForm.route = item.route
				this.selectObj = item
			},
			handleDeleteFuncInfo(type,item){
				this.$confirm('是否确定删除?', '提示', {
					type: 'warning'
				}).then(() => {
					deleteMenuInfo(item.id).then(response => {
						if (response.success) {
							if(type == 1){
								this.funcList.remove(item);
							}else{
								this.funcLists.remove(item);
							}
							this.parentInfo.childMenus.remove(item);
							this.$message.success('删除成功！')
						}else{
							this.$message.warning(res.msg);
						}
					})
				})
			},
			handleEditMenuInfo(menu) {
				isCommonServe = menu.iscommon
				this.menuForm = menu
				this.dialogMenuInfoVisible = true
			},
			async handleSaveMenuInfo() {
				const { $message, $store } = this
				const { success } = await saveMenuInfo(this.menuForm)
				if (!success) return $message.error({
					message: '操作失败',
					duration: 1200
				})

				$message.success({
					message: TERM.OPERATE_SUCCESS,
					duration: 1200
				})
				$store.dispatch('updateProductServes', this.$router.options.routes)

				if (this.menuForm.iscommon !== isCommonServe) $store.dispatch('getCommonService')

				this.dialogMenuInfoVisible = false
			},
			handleDeleteMenuInfo({ name, id, iscommon } = {}) {
				this.$confirm('是否确定删除?', '提示', {
					type: 'warning'
				}).then(() => {
					deleteMenuInfo(id).then(response => {
						if (response.success) {
							this.$message.success('删除成功！')
							this.$store.dispatch('updateProductServes', this.$router.options.routes)
						} else {
              this.$message.warning(response.msg)
            }
					})
				})
			}
		}
	}
</script>

<style scoped>
	.page-content {
		padding-left: 220px;
	}

	.fa-trash-o {
		color: #ff4949;
	}

	.is-disabled .fa-trash-o {
		color: #bfcbd9;
	}
</style>

<style>
	.page__permission-menu {
		height: 100%;
	}

	.page__permission-menu .menu-tree {
		position: fixed;
		width: 210px;
	}

	.page__permission-menu .el-tree {
		overflow: auto;
	}

	.page__permission-menu .menu-info-dialog .el-select {
		width: 100%;
	}
</style>
