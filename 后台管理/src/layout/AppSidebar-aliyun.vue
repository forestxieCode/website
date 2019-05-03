<template>
	<aside class="layout__sidebar">
		<section :style="{ width }" class="sidebar-item sidebar-item--normal">
			<el-menu class="sidebar-menu" :default-active="routeMenu" :default-openeds="currentOpenedMenu" unique-opened>
				<!-- <cascader-panel :data="productServes" @changeWidth="changeMenuWidth"></cascader-panel> -->
				<!-- <template v-for="submenu in productServes" v-if="submenu.type_status != 'Button'"> -->
					<el-menu-item v-for="submenu in productServes" :key="submenu.id" :index="submenu.route" class="app-main-sidebar" v-if="submenu.type_status != 'Button'">
						<div @mouseenter="findItemChild(submenu)" @mouseleave="lostItemChild">
							<div v-if="submenu.childMenus && submenu.childMenus.length">
								<img :src="`static/img/${submenu.styleClass}`" alt="" class="module-logo" >
								{{ submenu.name }}
								<i class="el-icon-arrow-right check-more" v-show="isHoverOpen"></i>
							</div>
							<router-link :to="submenu.route" v-else>
								<img :src="`static/img/${submenu.styleClass}`" alt="" class="module-logo" >
								{{ submenu.name }}
							</router-link>
						</div>
						<!-- <template slot="title"> -->

						<!-- </template> -->
						<!-- <el-menu-item v-for="item in submenu.childMenus" v-if="item.type_status != 'Button'" :key="item.id" :index="item.route">
							<router-link v-if="item.linkType !== 3" :to="item.route">
								{{ item.name }}
							</router-link>
							<span v-else-if="item.childMenus.length" @click="treeSidebarVisibleclick(item.childMenus)"></span>
							<li v-else class="el-menu-item">
								<a :href="item.route" target="_blank">{{ item.name }}</a>
							</li>
						</el-menu-item> -->
					</el-menu-item>
					<!-- <el-menu-item v-else class="sidebar-menu__first-level" :index="submenu.route" :key="submenu.id">
						<router-link :to="submenu.route">
							<img :src="`static/img/${submenu.styleClass}`" alt="" class="module-logo">
							{{ submenu.name }}
						</router-link>
					</el-menu-item> -->
				<!-- </template> -->
			</el-menu>
		</section>
		<cascader-panel :data="sidebarList" v-if="sidebarList.length"></cascader-panel>
		<!-- <section class="sidebar-item sidebar-item--sub left_nav sub-sidebar">
			<el-menu class="sidebar-menu" :default-active="this.$route.path">
				<el-menu-item v-for="(item,index) in sidebarList" :key="index" :index="item.route" style="padding: 0!important;">
					<div v-if="item.childMenus && item.childMenus.length" class="sub-list">
						{{item.name}}
						<i class="el-icon-arrow-right check-more"></i>
					</div>
					<router-link :to="item.route" v-else>{{item.name}}
					</router-link>
				</el-menu-item>
			</el-menu>
		</section> -->
		<!-- <section class="sidebar-item sidebar-item--sub left_nav sub-sidebar">
			<el-menu class="sidebar-menu" :default-active="this.$route.path">
				<el-menu-item v-for="(item,index) in sidebarList" :key="index" :index="item.route" style="padding: 0!important;">
					<div v-if="item.childMenus && item.childMenus.length">{{item.name}}
					<i class="el-icon-arrow-right check-more"></i>
					</div>
					<router-link :to="item.route" v-else>{{item.name}}
					</router-link>
				</el-menu-item>
			</el-menu>
		</section> -->
		<section class="sidebar-item sidebar-item--sub left_nav" v-if="isSubSidebar">
			<div class="history-back sidebar-div" v-if="hasHistoryBack">
				<history-back :route="historyRoute"></history-back>
			</div>
			<div class="sidebar-div" v-if="!hasHistoryBack">
				{{sidebarName}}
			</div>
			<el-menu class="sidebar-menu" :default-active="this.$route.path">
				<el-menu-item v-for="(item,index) in navList" :key="index" :index="item.route" style="padding: 0!important;">
					<router-link :to="item.route">{{item.name}}</router-link>
				</el-menu-item>
			</el-menu>
		</section>
	</aside>
</template>

<script>
	import HistoryBack from '@/component/HistoryBack'
	import CascaderPanel from '@/component/CascaderPanel'

	import {
		sidebarBox,
		sidebarTypes,
		linkTypes
	} from '@/app/js/config'

	export default {
		name: 'AppSidebar',
		components: {
			HistoryBack,
			CascaderPanel
		},
		data() {
			return {
				width: `${sidebarBox[sidebarTypes.init].width}px`,
				linkTypes,
				subMenuVisible: false,
				treeSidebarVisible: false,
				subSidebarTitle: '',
				subSidebar: [],
				menuData: [],
				routeMenu: this.$route.path,
				isHoverOpen: false,
				subSidebarList: false,
				thirdSidebarList: false,
				sidebarList: []
			}
		},
		computed: {
			hasHistoryBack() {
				return this.$store.state.hasHistoryBack
			},
			historyRoute() {
				return this.$store.state.historyRoute
			},
			sidebar() {
				return this.$store.state.sidebar
			},
			sidebarName() {
				return this.$store.state.sidebarName
			},
			menu() {
				if (this.sidebar.childMenus && this.sidebar.childMenus.length) {
					return this.sidebar.childMenus.sort((a, b) => a.order - b.order)
				}
				return []
			},
			isSubSidebar() {
				return this.$store.state.isSubSidebar
			},
			navList() {
				return this.$store.state.navList
			},
			openedMenu() {
				for (const menuItem of this.menu) {
					if (menuItem.childMenus && menuItem.childMenus.length) {
						const activeMenu = menuItem.childMenus.find(submenu => submenu.route === this.$route.path)
						if (activeMenu) return [menuItem.route]
					}
				}
				return []
			},
			productServes() {
				return this.$store.state.productServes
			},
			currentOpenedMenu() {
				for (let menu of this.productServes) {
					const submenus = menu.childMenus || []
					if (submenus && submenus.length > 1) {
						if (submenus.find(sm => sm.route === this.$route.path)) {
							return [menu.route]
						} else {
							for (let menus of submenus) {
								if (menus.childMenus.length > 0) {
									if (menus.childMenus.find(sm => sm.route === this.$route.path)) {
										this.routeMenu = menus.route;
										return [menu.route]
									}
								}
							}
						}
					}
				}
				return []
			}
		},
		methods: {
			treeSidebarVisibleclick(menus) {
				this.treeSidebarVisible = true
				this.menuData = menus
				this.$store.commit('changeSubSidebarVisible', true)
			},
			findItemChild (sub) {
				this.width = '190px'
				this.isHoverOpen = true
				this.subSidebarList = true
				if(sub.childMenus && sub.childMenus.length){
					this.sidebarList = sub.childMenus
				} else{
					this.sidebarList = []
					this.subSidebarList = false
				}
			},
			lostItemChild () {
				// this.width = '50px'
				// this.isHoverOpen = false
				// this.subSidebarList = false
			},
			changeMenuWidth(width){
				this.width=width
			}
		}
	}
</script>

<style>
	.layout__container .sidebar-item--normal {
		position: absolute;
		overflow: auto;
		z-index: 99;
		width:190px;
	}

	.layout__container .app-main-sidebar{
		color: #fff;
		position: relative;
	}

	.layout__container .sub-list{
		color:#fff;
		text-align: center;
	}

	.layout__container .sub-sidebar{
		position: absolute;
		left:190px;
		top:0;
		z-index: 99;

	}

	.layout__container .sidebar-item--sub {
		width: 190px;
		float: left;
		background: #f4f7f9;
	}

	.layout__container .sidebar-item.sidebar-item--sub .sidebar-menu {
		background: #f4f7f9
	}

	.layout__container .sidebar-item--sub .sidebar-div {
		height: 60px;
		background: #cfd2d9;
		line-height: 60px;
		text-align: center;
	}

	.layout__container .sidebar-item--sub .sidebar-div .el-button {
		font-size: 20px;
	}

	.layout__container .sidebar-item--sub .is-active {
		background: #fff;
	}

	.layout__sidebar .sidebar-item .router-link-active {
		border-right: none
	}

	.sidebar-item--normal::-webkit-scrollbar {
		/*滚动条整体样式*/
		width: 1px;
		/*高宽分别对应横竖滚动条的尺寸*/
		height: 1px;
	}

	.sidebar-item--normal::-webkit-scrollbar-thumb {
		/*滚动条里面小方块*/
		border-radius: 5px;
		-webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
		background: rgba(0, 0, 0, 0.2);
	}

	.sidebar-item--normal::-webkit-scrollbar-track {
		/*滚动条里面轨道*/
		-webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
		border-radius: 0;
		background: rgba(0, 0, 0, 0.1);
	}

	.sidebar-menu .el-submenu .el-menu .el-menu-item {
		border-bottom: 1px solid #404453;
	}

	.sidebar-item--normal .sidebar-menu .el-menu-item,
	.sidebar-item--normal .sidebar-menu .el-submenu__title {
		height: 44px;
		line-height: 44px;
	}

	.sidebar-item--normal a {
		display: block;
		font-size: 12px;
		text-decoration: none;
		color: #ccc
	}

	.sidebar-item--normal .sidebar-menu .el-submenu .el-submenu__title {
		font-weight: 700;
		color: #ccc
	}

	.layout__sidebar .sidebar-item .sidebar-menu,
	.layout__sidebar li .el-menu {
		background: #232837;
		border-right: none;
	}

	.layout__sidebar .second-sidebar-menu a {
		color: #ccc;
		padding: 0 20px;
		font-weight: 700
	}

	.layout__container .layout__sidebar .sidebar-menu .el-menu-item.is-active {
		color: #ff5a5a
	}

	.layout__container .layout__sidebar .sidebar-item--normal .el-menu-item.is-active a {
		color: #ff5a5a
	}

	.layout__container .second-sidebar-menu .is-active a {
		color: #ff5a5a
	}

	.el-submenu__title:focus,
	.el-submenu__title:hover,
	.el-menu-item:focus,
	.el-menu-item:hover {
		color: #ff5a5a;
		background-color: transparent
	}

	.el-submenu__title:focus a,
	.el-submenu__title:hover a,
	.el-menu-item:focus a,
	.el-menu-item:hover a {
		color: #ff5a5a;
	}

	.layout__sidebar .el-submenu:hover .el-submenu__title,
	.layout__sidebar .el-submenu:focus .el-submenu__title {
		color: #ff5a5a;
	}

	.layout__sidebar .sidebar-item .sidebar-menu li.is-active .el-menu {
		background: #2f313f
	}

	.layout__sidebar .el-submenu__title {
		font-size: 12px;
	}

	.module-logo {
		width: 16px;
		margin-right: 18px;
		margin-top: -2px;
		margin-left: -4px;
	}

	.layout__sidebar .el-submenu.is-active .el-submenu__title {
		position: relative;
		color: #fff !important
	}

	/* .el-submenu.is-active .el-submenu__title::before {
		content: '';
		position: absolute;
		left: 0;
		top: 0;
		width: 3px;
		height: 100%;
		background: #ff5a5a
	} */

	.layout__container .layout__sidebar .left_nav {
		background: #444757;
	}
	.layout__container .layout__sidebar .left_nav .sidebar-div{
		background: #444757;
		color: #ccc!important;
	}
	.layout__container .layout__sidebar .left_nav .history-back{
		background: #444757;
		border-bottom: 1px solid #333642;
	}

	.layout__container .layout__sidebar .left_nav .history-back .el-button{
		color: #ccc!important;
		font-size: 16px;
	}

	.layout__container .layout__sidebar .left_nav .sidebar-menu{
		background-color: #444757;
	}

	.layout__container .layout__sidebar .left_nav .sidebar-menu .el-menu-item>a{
		color: #ccc;
	}

	.layout__container .layout__sidebar .left_nav .el-menu-item .router-link-active {
		background: #505366;
	}

	.layout__container .layout__sidebar .left_nav .el-menu-item a {
		text-align: center;
		display: block;
		background: #444757;
	}
</style>
