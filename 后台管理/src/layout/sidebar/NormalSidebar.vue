<template>
  <section :style="{ width }" class="sidebar-item sidebar-item--normal">
    <h2 class="sidebar-title">{{ sidebar.name }}</h2>
    <el-menu :default-active="$route.path" :default-openeds="openedMenu" class="sidebar-menu" background-color="#545c64" unique-opened>
      <template v-for="menuItem in menu">
        <el-submenu v-if="menuItem.childMenus && menuItem.childMenus.length" :key="menuItem.route" :index="menuItem.route">
          <template slot="title">{{ menuItem.name }}</template>
          <el-menu-item v-for="submenu in menuItem.childMenus" :key="submenu.route" :index="submenu.route">
            <span v-if="submenu.childMenus.length" @click="showSubMenu">{{submenu.name}}</span>
            <router-link v-else-if="submenu.linkType === linkTypes.route" :to="link.route">{{ submenu.name }}</router-link>
            <a v-else-if="submenu.linkType === linkTypes.tab" :href="submenu.route">{{ submenu.name }}</a>
            <a v-else :href="submenu.route" target="_blank">{{ submenu.name }}</a>
          </el-menu-item>
        </el-submenu>
        <el-menu-item v-else :key="menuItem.route" :index="menuItem.route">
          <link-type :link="menuItem"></link-type>
        </el-menu-item>
      </template>
    </el-menu>
    <sidebar-ear v-show="sidebarEarVisible"></sidebar-ear>
  </section>
</template>

<script>
import LinkType from '@/component/LinkType'
import SidebarEar from '@/component/SidebarEar'
import SubSidebar from '@/layout/subSidebar/NormalSubSidebar'

import { sidebarStatus, sidebarBox, sidebarTypes, linkTypes } from '@/app/js/config'

export default {
  name: 'NormalSidebar',
  components: { LinkType, SidebarEar, SubSidebar },
  data () {
    return {
      width: `${sidebarBox[sidebarTypes.normal].width}px`,
      linkTypes,
      subMenuVisible: false
    }
  },
  computed: {
    sidebar () {
      return this.$store.state.sidebar
    },
    menu () {
      if (this.sidebar.childMenus && this.sidebar.childMenus.length) {
        return this.sidebar.childMenus.sort((a, b) => a.order - b.order)
      }
      return []
    },
    openedMenu () {
      for (const menuItem of this.menu) {
        if (menuItem.childMenus && menuItem.childMenus.length) {
          const activeMenu = menuItem.childMenus.find(submenu => submenu.route === this.$route.path)
          if (activeMenu) return [menuItem.route]
        }
      }
      return []
    },
    sidebarEarVisible () {
      return this.$store.state.sidebarState !== sidebarStatus.hide
    }
  },
  methods: {
    showSubMenu () {
      this.subMenuVisible = true
    }
  }
}
</script>

<style scoped>
/* .sidebar-title {
  position: relative;
  padding-left: 20px;
  margin: 0;
  font-size: 22px;
  line-height: 2.5;
  font-weight: 400;
  color: #171d25;
}

.sidebar-title::after {
  content: '';
  position: absolute;
  right: 20px;
  bottom: 0;
  left: 20px;
  border-top: 1px solid #cadbe6;
  border-bottom: 1px solid #f9fafc;
} */
</style>

<style>
/* .sidebar-item--normal>.sidebar-menu {
  padding-top: 10px;
  background-color: transparent;
}

.sidebar-item--normal .sidebar-menu .el-submenu .el-menu,
.sidebar-item--normal .sidebar-menu .el-submenu.is-opened .el-submenu__title {
  color:#bbb;
  background-color:#435168
}

.sidebar-item--normal .sidebar-menu .el-menu-item,
.sidebar-item--normal .sidebar-menu .el-submenu__title {
  height: 40px;
  line-height: 40px;
}

.sidebar-item--normal .sidebar-menu>.el-menu-item,
.sidebar-item--normal .sidebar-menu .el-submenu .el-menu>.el-menu-item {
  padding: 0 !important;
}

.sidebar-item--normal .sidebar-menu .el-menu-item .comp__link-type a {
  display: block;
  font-weight: 700;
  text-decoration: none;
  color:#fff
}

.sidebar-item--normal .sidebar-menu .el-submenu .el-menu>.el-menu-item .comp__link-type a {
  padding: 0 40px;
}

.sidebar-item--normal .sidebar-menu .el-menu-item:hover,
.sidebar-item--normal .sidebar-menu .el-menu-item .comp__link-type a:hover,
.sidebar-item--normal .sidebar-menu .el-submenu__title:hover {
  color:#fff
}

.sidebar-item--normal .sidebar-menu .comp__link-type a.router-link-active {
  color:#fff
}

.sidebar-item--normal .sidebar-menu .el-submenu .el-submenu__title {
  font-weight: 700;
} */
</style>
