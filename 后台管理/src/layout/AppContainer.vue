<template>
  <div :style="[style]" class="layout__container">
    <app-sidebar></app-sidebar>
    <section class="layout__content layout__content--sale-platform" :style="{padding,overflowY: $store.state.contentOverflowY }">
      <router-view></router-view>
    </section>
  </div>
</template>

<script>
import AppSidebar from '@/layout/AppSidebar'

import { sidebarStatus, sidebarTypes, mainContentBox } from '@/app/js/config'

export default {
  name: 'AppContainer',
  components: { AppSidebar },
  data () {
    return {
      padding: Object.keys(mainContentBox.padding).map(key => `${mainContentBox.padding[key]}px`).join(' ')
    }
  },
  computed: {
    sidebarType () {
      return this.$store.state.routeMeta.sidebarType || sidebarTypes.init
    },
    mainPaddingLeft () {
      return this.$store.state.mainPaddingLeft
    },
		isCollapse(){
			return this.$store.state.isCollapse
		},
    style () {
      let left = 0
      const { isSubSidebar } = this.$store.state
      // debugger
      // this.mainPaddingLeft = 50
      if (isSubSidebar) {//有三级菜单
        if(this.isCollapse){//侧导航收起
        	this.$store.commit('changeMainPaddingLift', 170)
        }else{
        	this.$store.commit('changeMainPaddingLift', 304)
        }
      } else{//没有三级菜单
        if(this.isCollapse){//侧导航收起
        	this.$store.commit('changeMainPaddingLift', 50)
        }else{
        	this.$store.commit('changeMainPaddingLift', 184)
        }
      }
      return { left: left + 'px', paddingLeft: this.mainPaddingLeft + 'px' }
    },
    sidebarVisible () {
      return this.$store.state.sidebarState !== sidebarStatus.hide
    }
  }
}
</script>
