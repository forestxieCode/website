<template>
  <div :style="[style]" class="layout__sub-sidebar">
    <!-- <h4 class="sub-sidebar__title">{{ title }}</h4> -->
    <el-menu :default-active="$route.path" class="sub-sidebar__menu" unique-opened>
      <template v-for="menu in menus">
        <el-submenu v-if="menu.childMenus.length" :key="menu.route" :index="menu.route">
          <template slot="title">{{ menu.name }}</template>
          <el-menu-item v-for="submenu in menu.childMenus" :key="submenu.route" :index="submenu.route">
            <link-type :link="submenu"></link-type>
          </el-menu-item>
        </el-submenu>
        <el-menu-item v-else :key="menu.route" :index="menu.route">
          <link-type :link="menu"></link-type>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script>
import LinkType from '@/component/LinkType'

import { sidebarTypes, sidebarBox, subSidebarBox } from '@/app/js/config'

export default {
  name: 'TreeSubSidebar',
  components: { LinkType },
  props: ['title', 'menus'],
  data () {
    return {
      style: {
        width: `${subSidebarBox[sidebarTypes.tree].width}px`,
        left: `${sidebarBox[sidebarTypes.tree].width}px`
      }
    }
  }
}
</script>
