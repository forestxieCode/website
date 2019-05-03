import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

import { getModuleList, getCommentServiceList } from '@/api'
import { setRouterMeta } from '@/app/js/app'
import { sidebarStatus, sidebarTypes, headerBox, sidebarBox, subSidebarBox, mainContentBox } from '@/app/js/config'

if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'development-test') {
  Vue.use(Vuex)
}

const IS_OPEN_COMMON_SERVICE = 'is-open-common-service'

export default new Vuex.Store({
  state: {
    moduleList: [],
    productServes: [],
    secondMenu: [],
    commonService: [],
    navList: [],
    sidebar: {},
    sidebarState: sidebarStatus.open,
    commonServiceHeight: +window.localStorage.getItem(IS_OPEN_COMMON_SERVICE),
    subSidebarVisible: false,
    secondMenuVisible: true,
    isSubSidebar: false,
    routeMeta: {},
    contentOverflowY: 'auto',
    historyRoute: '',
    sidebarName: '',
    hasHistoryBack: true,
    mainPaddingLeft: 50,
    isCollapse: true
  },
  getters: {
    mainRect (state) {
      const top = headerBox.height
      return {
        top,
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight - top
      }
    },
    mainContent (state, getters) {
      const type = Object.keys(state.routeMeta).length
        ? state.routeMeta.sidebarType || sidebarTypes.default
        : sidebarTypes.default
      const top = headerBox.height + mainContentBox.padding.top + 13
      let width = document.documentElement.clientWidth - mainContentBox.padding.left - mainContentBox.padding.right

      if (state.sidebarState === sidebarStatus.open) width -= sidebarBox[type].width
      if (state.subSidebarVisible) width -= subSidebarBox[type].width

      // const tableHeight = top - 50 // 减去页面header高
      const height = document.documentElement.clientHeight - top - mainContentBox.padding.bottom
      return {
        top,
        width,
        height: height,
        tableHeight: height - 50
      }
    }
  },
  mutations: {
    changeIsCollapse(state, value){
      state.isCollapse = value
    },
    historyBackOpt (state, route) {
      state.historyRoute = route
    },
    changeMainPaddingLift (state, value) {
      state.mainPaddingLeft = value
    },
    changeHistoryBack (state, visible) {
      state.hasHistoryBack = visible
    },
    updateModuleList (state, moduleList) {
      state.moduleList = moduleList
    },
    updateSibarList (state, navList) {
      state.navList = navList
    },
    changeSidebarName (state, name) {
      state.sidebarName = name
    },
    menuSubServes (state, secondMenu) {
      state.secondMenu = secondMenu.data
    },
    updateProductServes (state, productServes) {
      state.productServes = productServes
    },
    updateCommonService (state, commonService) {
      state.commonService = commonService
    },
    spliceCommonService (state, id) {
      for (const [index, service] of state.commonService.entries()) {
        if (service.id === id) {
          state.commonService.splice(index, 1)
          break
        }
      }
    },
    changeNormalSidebar (state, sidebar) {
      state.sidebar = sidebar
    },
    changeSidebarState (state, _state) {
      state.sidebarState = _state
    },
    changeSidebarType (state, visible) {
      state.isSubSidebar = visible
    },
    changeSubSidebarVisible (state, visible) {
      state.subSidebarVisible = visible
    },
    changeSecondMenuVisible (state, visible) {
      state.secondMenuVisible = visible
    },
    changeCommonServiceHeight (state, height) {
      state.commonServiceHeight = height
      window.localStorage.setItem(IS_OPEN_COMMON_SERVICE, height)
    },
    changeRouteMeta (state, meta) {
      state.routeMeta = meta
    },
    changeContentOverflowY (state, value) {
      state.contentOverflowY = value
    }
  },
  actions: {
    updateProductServes ({ commit, state }, routes) {
      return axios.all([getModuleList()]).then(axios.spread((moduleList) => {
        if(moduleList.data.length){
          let menuList = moduleList.data.sort(sortMenu('order'))
          commit('updateModuleList', menuList)
          commit('updateProductServes', menuList)
          // commit('menuSubServes', menuSubList)
          setRouterMeta(routes, menuList)
          const { sidebarType, parentId } = state.routeMeta
          if (sidebarType === sidebarTypes.normal) {
            const routeModule = getRouteModuleById(state.moduleList, parentId)
            if (routeModule) commit('changeNormalSidebar', routeModule)
          }
        }
      }))
    },
    getCommonService ({ commit }) {
      getCommentServiceList().then(response => {
        if (response.success) {
          commit('updateCommonService', response.data)
        }
      })
    }
  }
})

function getRouteModuleById (moduleList, id) {
  for (const md of moduleList) {
    if (md.id === id) return md

    const { childMenus } = md
    if (childMenus.length) {
      const routeModule = getRouteModuleById(childMenus, id)
      if (routeModule) return routeModule
    }
  }
}

function sortMenu (key) {
  return (a, b) => a[key] - b[key]
}
