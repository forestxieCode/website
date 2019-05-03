<template>
  <div class="page__permission-menu">
    <page-header>
      <template slot="title">菜单配置</template>
    </page-header>
    <div class="page-body">
      <div class="menu-tree">
        <el-tree :data="menus" ref="tree" :props="menuTreeProps" :auto-expand-parent="false" :default-expanded-keys="expandedMenusId" :style="{ height: contentHeight + 'px' }" node-key="id" highlight-current @node-click="handleToggleMenu" @node-expand="handleExpendMenu" @node-collapse="handleCollapseMenu"></el-tree>
      </div>
      <div class="page-content">
        <div class="table-title">当前菜单</div>
        <el-table :data="currentMenuData" border>
          <el-table-column v-for="menu in menuTableColumns" :key="menu.prop" :prop="menu.prop" :label="menu.label" :width="menu.width" :min-width="menu.minWidth" :align="menu.align">
            <template slot-scope="scope">{{ _getMenuPropLabel(scope.row, menu.prop) }}</template>
          </el-table-column>
          <el-table-column label="操作" width="80" align="center">
            <template slot-scope="scope">
              <el-button type="text" @click="handleEditMenuInfo(scope.row)">
                <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
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
          <el-table-column v-for="menu in menuTableColumns" :key="menu.prop" :prop="menu.prop" :label="menu.label" :width="menu.width" :min-width="menu.minWidth" :align="menu.align">
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
    <el-dialog :visible.sync="dialogMenuInfoVisible" :close-on-click-modal="false" :close-on-press-escape="false" title="添加" custom-class="menu-info-dialog" width="600px">
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
              <el-switch v-model="menuForm.iscommon" on-text="是" off-text="否" on-color="#00a854" off-color="#f04134" :on-value="1" :off-value="0"></el-switch>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer">
        <el-button @click="dialogMenuInfoVisible = false" size="small">取消</el-button>
        <el-button type="primary" @click="handleSaveMenuInfo" size="small">保存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import PageHeader from '@/component/PageHeader'
import { pageHeader } from '@/app/js/config'
import {getModuleList} from '@/api/index'
import { assign } from '@/shared/util'
import { saveMenuInfo, deleteMenuInfo, editMeneInfo } from './api'

const linkTypeOptions = [
  { label: '其它', value: 0 },
  { label: '当前应用', value: 1 },
  { label: '当前标签', value: 2 },
  { label: '新标签', value: 3 }
]
const sidebarStateOptions = [
  { label: '展开', value: 1 },
  { label: '关闭', value: 2 },
  { label: '隐藏', value: 3 }
]
const converMenuPropList = [
  { prop: 'linkType', list: linkTypeOptions },
  { prop: 'sidebarStatus', list: sidebarStateOptions },
  { prop: 'iscommon', list: [{ label: '否', value: false }, { label: '是', value: true }] }
]

const getInitMenuForm = function getInitMenuForm () {
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
let isCommonServe = false

function sortOrder (key) {
  return (a, b) => a[key] - b[key]
}

const getCurrentMenu = function getCurrentMenu (id, list) {
  for (const item of list) {
    if (item.id === id) return item

    const { childMenus } = item
    if (childMenus.length > 0) {
      const currentMenu = getCurrentMenu(id, childMenus)
      if (currentMenu) return currentMenu
    }
  }
}

export default {
  name: 'MenuConfig',
  components: { PageHeader },
  data () {
    return {
      linkTypeOptions: linkTypeOptions,
      sidebarStateOptions: sidebarStateOptions,
      menuForm: getInitMenuForm(),
      menuTreeProps: { label: 'name', children: 'childMenus' },
      currentMenu: [],
      submenuList: [],
      parentMenu: '',
      expandedMenusId: [-1],
      // menus: [],
      menuTableColumns: [
        { label: '排序', prop: 'order', width: 50, align: 'center' },
        { label: '名称', prop: 'name', minWidth: 100 },
        { label: '路由', prop: 'route', minWidth: 200 },
        { label: '链接类型', prop: 'linkType', minWidth: 80, align: 'center' },
        { label: '侧边状态', prop: 'sidebarStatus', minWidth: 80, align: 'center' },
        { label: '常用', prop: 'iscommon', minWidth: 50, align: 'center' }
      ],
      menuFormRuleList: {
        id: [{ required: true, message: '请输入 id' }],
        order: [{ required: true, message: '请输入排序' }],
        name: [{ required: true, message: '请输入名称' }]
      },
      dialogMenuInfoVisible: false
    }
  },
  computed: {
    contentHeight () {
      return this.$store.getters.mainContent.height - pageHeader.height - pageHeader.margin.bottom - 38
    },
    rootModule () {
      return { id: -1, name: '功能菜单', childMenus: this.productServes }
    },
    currentMenuData () {
      return [this.currentMenu]
    },
    // submenuList () {
    //   return this.currentMenu.childMenus
    // },
    menus () {
      return [this.rootModule]
    }
  },
  watch: {
    productServes (to, from) {
      this.currentMenu = getCurrentMenu(this.currentMenu.id, to)
    }
  },
  created () {
    // this.menus.push(this.rootModule)
    this.getModuleList()
  },
  methods: {
    handleEditMenuInfo (menu) {
      editMeneInfo(menu.id).then(response => {
        this.menuForm = response.data
        this.dialogMenuInfoVisible = true
      })
      // isCommonServe = menu.iscommon
    },
    getModuleList () {
      getModuleList().then(response => {
        response.data.sort(sortOrder('order'))
        this.menus[0].childMenus = response.data
        if (!this.currentMenu.length) {
          this.currentMenu = response.data
          this.submenuList = response.data
          this.$nextTick(() => {
            this.$refs.tree.setCurrentKey(this.menus[0])
            this.currentMenu = this.menus[0]
          })
        } else {
          console.log(this.currentMenu)
          this.submenuList = this.currentMenu.childMenus
          this.$nextTick(() => {
            this.$refs.tree.setCurrentKey(this.currentMenu)
          })
        }
      })
    },
    handleToggleMenu (menu) {
      this.parentMenu = menu.id
      this.currentMenu = menu
      this.submenuList = this.currentMenu.childMenus
    },
    handleExpendMenu ({ id }) {
      this.expandedMenusId.push(id)
    },
    handleCollapseMenu ({ id }) {
      const index = this.expandedMenusId.findIndex(menuId => menuId === id)
      if (index > -1) this.expandedMenusId.splice(index, 1)
    },
    _getMenuPropLabel (menu, key) {
      //  判断表格当行数据的链接类型、侧边状态、是否是常用
      if (!menu[key]) return '-'

      for (const conver of converMenuPropList) {
        if (conver.prop === key) return conver.list.find(item => item.value === menu[key]).label
      }
      return menu[key]
    },
    handleAddNewMenu () {
      this.menuForm = getInitMenuForm()
      if (this.$refs.menuForm) this.$refs.menuForm.resetFields()

      assign(this.menuForm, this.currentMenu, {
        extra: ['typeid', { toKey: 'parentId', fromKey: 'id' }],
        onlyExtra: true
      })
      this.dialogMenuInfoVisible = true
    },
    async handleSaveMenuInfo () {
      saveMenuInfo(this.menuForm).then(response => {
        if (response.success) {
          this.$message.success({ message: '操作成功', duration: 1200 })
          this.$store.dispatch('updateProductServes', this.$router.options.routes)
          this.getModuleList()
          this.dialogMenuInfoVisible = false
        } else {
          this.$message.error({ message: '操作失败', duration: 1200 })
        }
      })
    },
    async handleDeleteMenuInfo ({ name, id, iscommon } = {}) {
      this.$confirm('是否确定删除?', '提示', {
        type: 'warning'
      }).then(() => {
        deleteMenuInfo(id).then(response => {
          if (response.success) {
            this.$message('删除成功！')
            this.$store.dispatch('updateProductServes', this.$router.options.routes)
            this.getModuleList()
          }else {
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
