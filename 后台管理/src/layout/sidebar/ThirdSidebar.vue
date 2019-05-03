<template>
  <section :style="{ width }" class="sidebar-item sidebar-item--tree">
    <el-tree :data="sidebar" :props="sidebarProps" node-key="nodeId" highlight-current @current-change="handleToggleNode"></el-tree>
    <sidebar-ear v-show="sidebarEarVisible"></sidebar-ear>
    <sub-sidebar v-show="$store.state.subSidebarVisible" :title="subSidebarTitle" :menus="subSidebar"></sub-sidebar>
  </section>
</template>

<script>
import SidebarEar from '@/component/SidebarEar'
import SubSidebar from '@/layout/subSidebar/TreeSubSidebar'

import { getGroupTree, getSubModuleList } from '@/api'
import { sidebarStatus, sidebarBox, sidebarTypes } from '@/app/js/config'
import { setRouterMeta } from '@/app/js/app'

export default {
  name: 'TreeSidebar',
  components: { SidebarEar, SubSidebar },
  data () {
    return {
      width: sidebarBox[sidebarTypes.tree].width + 'px',
      sidebar: [],
      sidebarProps: {
        children: 'childList',
        label: 'name'
      },
      subSidebar: [],
      subSidebarTitle: '',
      currentNodeKey: ''
    }
  },
  computed: {
    sidebarEarVisible () {
      return this.$store.state.sidebarState !== sidebarStatus.hide
    }
  },
  created () {
    getGroupTree().then(response => {
      if (response.success) {
        this.sidebar = [response.data]
        this.$nextTick(() => {
          document.querySelector('.sidebar-item--tree').querySelector('.el-tree-node__content').click()
        })
      } else {
        this.$message.warning(response.msg)
      }
    })
  },
  methods: {
    handleToggleNode (item) {
      this.subSidebarTitle = item.name

      getSubModuleList(item.type).then(response => {
        if (response.success) {
          this.subSidebar = response.data
          this.$store.commit('changeSubSidebarVisible', !!(this.subSidebar && this.subSidebar.length))
          setRouterMeta(this, response.data)
        } else {
          this.$message.warning(response.msg)
        }
      })
    }
  }
}
</script>

<style>
.sidebar-item--tree .el-tree {
  overflow: auto;
  height: 100%;
  border: none;
}
</style>
