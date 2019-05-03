<template>
	<aside class="layout__sidebar">
		<section :style="{width: isCollapse ? '50px' : '184px' }" class="sidebar-item sidebar-item--normal">
			<el-menu class="sidebar-menu" :default-active="routeMenu" :default-openeds="currentOpen" unique-opened :collapse="isCollapse">
				<template v-for="submenu in productServes" v-if="submenu.type_status != 'Button'">
					<el-submenu v-if="submenu.childMenus && submenu.childMenus.length " :key="submenu.id" :index="submenu.route">
						<template slot="title">
							<img :src="`static/img/${submenu.styleClass}`" alt="" class="module-logo">{{ submenu.name }}
						</template>
						<el-menu-item v-for="item in submenu.childMenus" v-if="item.type_status != 'Button'" :key="item.id" :index="item.route">
							<router-link v-if="item.linkType !== 3" :to="item.route">
								{{ item.name }}
							</router-link>
							<span v-else-if="item.childMenus.length" @click="treeSidebarVisibleclick(item.childMenus)"></span>
							<li v-else class="el-menu-item">
								<a :href="item.route" target="_blank">{{ item.name }}</a>
							</li>
						</el-menu-item>
					</el-submenu>
					<el-menu-item v-else class="sidebar-menu__first-level" :index="submenu.route" :key="submenu.id">
						<router-link :to="submenu.route">
							<img :src="`static/img/${submenu.styleClass}`" alt="" class="module-logo">{{ submenu.name }}
						</router-link>
					</el-menu-item>
				</template>
			</el-menu>
			<div class="comp__sidebar-ear" :style="{width: isCollapse ? '50px' : '184px' }" @click="toggleSidebarVisible">
				<img v-show="!isCollapse" src="../asset/indent-left.png" alt="">
				<img v-show="isCollapse" src="../asset/indent-right.png" alt="">
			</div>
		</section>

		<section class="sidebar-item sidebar-item--sub left_nav" v-if="isSubSidebar" :style="{left: isCollapse ? '50px' : '184px'}">
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
	import SidebarEar from '@/component/SidebarEar'
	import {
		sidebarBox,
		sidebarTypes,
		linkTypes,
		sidebarStatus
	} from '@/app/js/config'


	export default {
		name: 'AppSidebar',
		components: {
			HistoryBack,
			SidebarEar
		},
		data() {
			return {
				linkTypes,
				subMenuVisible: false,
				treeSidebarVisible: false,
				subSidebarTitle: '',
				subSidebar: [],
				menuData: [],
				routeMenu: this.$route.path,
				currentOpen: []
			}
		},
		computed: {
			isCollapse() { //主菜单是否展开 true 是收起 false 是展开
				return this.$store.state.isCollapse
			},
			productServes() { //左侧主菜单参数
				return this.$store.state.productServes
			},
			mainPaddingLeft() {//左侧菜单占用的总宽度
				return this.$store.state.mainPaddingLeft
			},
			isSubSidebar() { // 是否有三级菜单
				return this.$store.state.isSubSidebar
			},
			hasHistoryBack() { //三级菜单是否有返回按钮
				return this.$store.state.hasHistoryBack
			},
			historyRoute() { //三级菜单返回按钮的地址
				return this.$store.state.historyRoute
			},
			navList() { //三级菜单的参数
				return this.$store.state.navList
			},
			currentOpenedMenu() { //当前展开的菜单 只能找到主菜单里面的
				for (let menu of this.productServes) {
					const submenus = menu.childMenus || []
					if (submenus && submenus.length > 1) {
						if (submenus.find(sm => sm.route === this.$route.path)) {
							this.routeMenu = menu.route
							console.log(this.routeMenu)
							return [menu.route]
						} else {
							for (let menus of submenus) {
								if (menus.childMenus.length > 0) {
									if (menus.childMenus.find(sm => sm.route === this.$route.path)) {
										this.routeMenu = menus.route
										console.log(this.routeMenu)
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
		created() {
			this.width = this.mainPaddingLeft + 'px'
		},
		mounted(){
			if(this.isSubSidebar){ //判断是否有三级菜单
				this.routeMenu = this.historyRoute
				this.currentOpen.push(this.historyRoute)
			}
		},
		watch:{
			isSubSidebar(val){ //监听三级菜单改变
				if(val){
					this.routeMenu = this.historyRoute
					this.currentOpen.push(this.historyRoute)
				}
			}
		},
		methods: {
			toggleSidebarVisible() { //展开和收起
				if (!this.isCollapse) {
					this.$store.commit('changeIsCollapse', true)
					this.$store.commit('changeMainPaddingLift', '50')
					this.width = '50px'
				} else {
					this.$store.commit('changeIsCollapse', false)
					this.$store.commit('changeMainPaddingLift', '184')
					this.width = '184px'

					for (let menu of this.productServes) {
						const submenus = menu.childMenus || []
						if (submenus && submenus.length > 1) {
							if (submenus.find(sm => sm.route === this.$route.path)) {
								if (menu.route === this.$route.path) {
									this.routeMenu = menu.route
									this.currentOpen = [menu.route]
								} else {
									menu.childMenus.forEach(elem => {
										if (elem.route === this.$route.path) {
											this.routeMenu = elem.route
											this.currentOpen = [elem.route]
										}
									})
								}
							} else {
								for (let menus of submenus) {
									if (menus.childMenus.length > 0) {
										if (menus.childMenus.find(sm => sm.route === this.$route.path)) {
											this.routeMenu = menu.route;
											this.currentOpen = [menu.route]
										}
									}
								}
							}
						}
					}
				}
			},
			treeSidebarVisibleclick(menus) {
				this.treeSidebarVisible = true
				this.menuData = menus
				this.$store.commit('changeSubSidebarVisible', true)
			}
		}
	}
</script>

<style>
	.layout__container .sidebar-item--normal {
		position: relative;
		float: left;
		overflow: auto;
		padding-bottom: 30px;
	}

	.layout__container .el-menu--collapse {
		width: 50px;
	}

	.layout__container .sidebar-item--sub {
		position: absolute;
		z-index: 999;
		width: 120px;
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
		border-bottom: 1px solid #000;
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

	/* .sidebar-menu .el-submenu{
		overflow: hidden;
	} */

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
		color: #208DF7
	}

	.layout__container .layout__sidebar .sidebar-item--normal .el-menu-item.is-active a {
		color: #208DF7
	}

	.layout__container .second-sidebar-menu .is-active a {
		color: #208DF7
	}

	.el-submenu__title:focus,
	.el-submenu__title:hover,
	.el-menu-item:focus,
	.el-menu-item:hover {
		color: #208DF7;
		background-color: transparent
	}

	.el-submenu__title:focus a,
	.el-submenu__title:hover a,
	.el-menu-item:focus a,
	.el-menu-item:hover a {
		color: #208DF7;
	}

	.layout__sidebar .el-submenu:hover .el-submenu__title,
	.layout__sidebar .el-submenu:focus .el-submenu__title {
		color: #208DF7;
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
		background: #ff870f
	} */

	.layout__container .layout__sidebar .left_nav {
		background: #444757;
	}

	.layout__container .layout__sidebar .left_nav .sidebar-div {
		background: #444757;
		color: #ccc !important;
	}

	.layout__container .layout__sidebar .left_nav .history-back {
		background: #444757;
		border-bottom: 1px solid #333642;
	}

	.layout__container .layout__sidebar .left_nav .history-back .el-button {
		color: #ccc !important;
		font-size: 16px;
	}

	.layout__container .layout__sidebar .left_nav .sidebar-menu {
		background-color: #444757;
	}

	.layout__container .layout__sidebar .left_nav .sidebar-menu .el-menu-item>a {
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
<style scoped>
	.comp__sidebar-ear {
		position: fixed;
		z-index: 99999;
		bottom: 0;
		left: 0;
		/* width: 184px; */
		height: 30px;
		text-align: right;
		cursor: pointer;
		background: #303B59;
	}

	.comp__sidebar-ear img {
		margin-top: 5px;
		margin-right: 10px;
		width: 20px;
		height: 20px;
	}
</style>
