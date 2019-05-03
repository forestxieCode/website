<template>
	<div id="app">
		<app-header></app-header>
		<common-service v-show="$store.state.commonServiceHeight"></common-service>
		<main :style="{ top }" class="main">
			<router-view></router-view>
		</main>
	</div>
</template>

<script>
	import AppHeader from '@/layout/AppHeader'
	import CommonService from '@/layout/CommonService'
	import {
		sidebarStatus,
		sidebarTypes,
		headerBox
	} from '@/app/js/config'
	import {
		getRouteInfo
	} from '@/app/js/app'
	import "./app/css/element-ui.scss";

	Array.prototype.remove = function(val) {
		var index = this.indexOf(val);
		if (index > -1) {
			this.splice(index, 1);
		}
	};

	const ROUTE_PATH = '$route.path'

	const getRouteModuleByPath = function getRouteModuleByPath (moduleList, path) {
	  for (const moduleItem of moduleList) {
	    const md = getRouteModule(moduleItem.childMenus, path)
	    if (md) return moduleItem
	  }
	}

	// const getRouteModule = function getRouteModule (menus, path) {
	//   for (const menu of menus) {
	//     const { childMenus = [] } = menu

	//     if (childMenus && Array.isArray(childMenus) && childMenus.length > 0) {
	//       const matchedMenu = getRouteModule(childMenus, path)
	//       if (matchedMenu) return menu
	//     } else {
	//       // 因为可能存在动态路由
	//       // 所以这里使用路由匹配方式而不是全等
	//       // e.g. /policy-news/industry-info/:id
	//       const match = path.match(menu.route)
	//       if (match && match[0]) return menu
	//       // if (menu.route === path) return menu
	//     }
	//   }
	// }

	let dataPromise = null

	export default {
		name: 'App',
		components: {
			AppHeader,
			CommonService
		},
		data() {
			return {
				routeMeta: {},
			}
		},
		computed: {
			top() {
				return `${headerBox.height + this.$store.state.commonServiceHeight}px`
			},
			menuSubServes() {
				return this.$store.state.menuSubServes
			}
		},
		created() {
			// 触发vuex里面action
			dataPromise = this.$store.dispatch('updateProductServes', this.$router.options.routes)
		},
		watch: {
			[ROUTE_PATH](to, from) {
				dataPromise.then(() => {
					//跳页面收起菜单
// 					this.$store.commit('changeIsCollapse', true)
// 					this.$store.commit('changeMainPaddingLift', '50')

// 					const { isSubSidebar } = this.$store.state
// 					console.log(isSubSidebar)

					// if (isSubSidebar) {
					// 	this.$store.commit('changeMainPaddingLift', parseInt(this.mainPaddingLeft) + 120)
					// } else{
					// 	if(parseInt(this.mainPaddingLeft) > 184){
					// 		this.$store.commit('changeMainPaddingLift', parseInt(this.mainPaddingLeft) - 120)
					// 	} else{
					// 		this.$store.commit('changeMainPaddingLift', parseInt(this.mainPaddingLeft))
					// 	}
					// }
					// } else {
					//   this.$store.commit('changeSidebarType', false)
					// }
					// const route = getRouteInfo(this.$router.options.routes, to)
					// this.routeMeta = route ? route.meta : {
					//   sidebarState: 1,
					//   sidebarType: sidebarTypes.normal,
					//   platform: 'sale'
					// }

					// debugger
					// 判断是否是用户电量的常用服务，目前先写死，等以后优化
					// console.log(this.$store.state.secondMenu.data)
					// this.$store.state.secondMenu.data.forEach(elem => {
					// debugger
					// if (to === '/customer-detail/agent-info') {
					//   this.$store.commit('changeSecondMenuVisible', false)
					// } else if (to === '/elec/electricity') {
					//   this.$store.commit('changeSecondMenuVisible', false)
					// } else if (to === '/elec/contrac-info') {
					//   this.$store.commit('changeSecondMenuVisible', false)
					// } else if (to === '/elec/billing-info') {
					//   this.$store.commit('changeSecondMenuVisible', false)
					// } else {
					//   this.$store.commit('changeSecondMenuVisible', true)
					// }
					// })

					// this.routeMeta = getRouteInfo(this.$router.options.routes, to).meta || {}
					// this.$store.commit('changeRouteMeta', this.routeMeta)
					// console.log(this.routeMeta)

					// const { sidebarState, sidebarType, platform } = this.routeMeta

					// 切换路由时需要做以下几件事情

					// 1. 找到当前路由的 sidebarStatus 值
					// this.$store.commit('changeSidebarState', sidebarState || sidebarStatus.default)

					// 2. 根据当前路由的 sidebarType 值确定 sidebar
					// if (sidebarType === sidebarTypes.normal) {
					//   const routeModule = getRouteModuleByPath(this.$store.state.moduleList, to)
					//   if (routeModule) this.$store.commit('changeNormalSidebar', routeModule)
					// }

					// 3. 隐藏 subSidebar
					// TOFIXED: 这不太合理，需要等到业务清晰之后解决
					// if (platform === 'sale') this.$store.commit('changeSubSidebarVisible', false)
				})
			}
		}
	}
</script>

<style scoped>
	@import "./app/css/base.css";
	@import "./app/css/app.css";
	
	.main {
		position: absolute;
		right: 0;
		bottom: 0;
		left: 0;
		overflow-y: auto;
	}
</style>
