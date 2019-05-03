<template>
  <div :style="[style]" class="layout__sub-sidebar">
    <h4 class="sub-sidebar__title">{{ title }}</h4>
    <el-menu :default-active="$route.path" class="sub-sidebar__menu" unique-opened>
      <template v-for="menuItem in menu">
        <el-submenu v-if="menuItem.childMenus.length" :key="menuItem.route" :index="menuItem.route">
          <template slot="title">{{ menuItem.name }}</template>
          <el-menu-item v-for="submenu in menuItem.childMenus" :key="submenu.route" :index="submenu.route">
            <link-type :link="submenu"></link-type>
          </el-menu-item>
        </el-submenu>
        <el-menu-item v-else :key="menuItem.route" :index="menuItem.route">
          <link-type :link="menuItem"></link-type>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script>
import LinkType from '@/component/LinkType'

import { sidebarTypes, sidebarBox, subSidebarBox } from '@/app/js/config'

export default {
  name: 'NormalSubSidebar',
  components: { LinkType },
  data () {
    return {
      style: {
        width: `${subSidebarBox[sidebarTypes.tree].width}px`,
        left: `${sidebarBox[sidebarTypes.tree].width}px`
      },
      title: 'sub',
      menu: []
    }
  }
}
</script>
