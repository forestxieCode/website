<template>
	<div class="head-menu">
		<div class="head-menu_selected">固定至导航 {{submenuList.length}}/6</div>
		<div class="checkbox-box" :style="{height:contentHeight + 'px'}">
			<el-checkbox-group v-model="submenuList" :max="6">
				<div class="optionList" v-for="item in menu" v-if="item.childMenus.length>0">
					<h3>{{item.name}}</h3>
					<el-checkbox v-for="city in item.childMenus" :label="city.id" :key="city.id">{{city.name}}</el-checkbox>
				</div>
			</el-checkbox-group>
		</div>
		<el-button type="primary" size="mini" style="margin-top: 20px;" @click="savaCommonModules">保存</el-button>
	</div>
</template>

<script>
	import PageHeader from '@/component/PageHeader'
	import {
		pageHeader
	} from '@/app/js/config'
	import {
		getModuleList
	} from '@/api/index'
	import {
		assign
	} from '@/shared/util'
	import {
		saveMenuInfo,
		deleteMenuInfo,
		editMeneInfo,
		getCommonModules,
		savaCommonModules
	} from './api'

	function sortOrder(key) {
		return (a, b) => a[key] - b[key]
	}

	export default {
		name: 'MenuConfig',
		components: {
			PageHeader
		},
		data() {
			return {
				menu: [],
				submenuList: []
			}
		},
		computed: {
			contentHeight() {
				return this.$store.getters.mainContent.tableHeight - 80
			},
			commonService() {
				return this.$store.state.commonService
			}
		},
		created() {
			this.getModuleList();
			this.getCommonModules()
		},
		mounted() {
			let dom = document.querySelector('.layout__content');
			dom.style.backgroundColor = '#f2f2f2'
		},
		destroyed() {
			let dom = document.querySelector('.layout__content');
			dom.style.backgroundColor = '#fff'
		},
		watch: {
			commonService(to, from) {
				this.getCommonModules()
			}
		},
		methods: {
			getCommonModules(){
				this.submenuList = [];
				this.commonService.forEach(item => {
					this.submenuList.push(item.id)
				})
			},
			getModuleList() {
				getModuleList().then(response => {
					this.menu = response.data
				})
			},
			savaCommonModules(){
				savaCommonModules({modulesIds:JSON.stringify(this.submenuList)}).then(res => {
					if(res.success){
						this.$message.success('保存成功!')
						getCommonModules().then(res => {
							if(res.success){
								this.$store.commit('updateCommonService', res.data)
							}else{
								this.$message.warning(res.msg);
							}
						})
					}else if(!res.success && res.code == 0){
						this.$alert(res.msg, '提示', {
							confirmButtonText: '确定'
						});
						return;
					}else{
						this.$message.warning(res.msg);
					}
				})
			}
		}
	}
</script>
<style scoped>
	.head-menu {
		background: #fff;
		padding: 1% 2%;
		box-sizing: border-box;
	}
	
	.head-menu_selected{
		margin-top: 10px;
		color: #ff5a5a;
		line-height: 30px;
	}
	
	.optionList {
		padding: 30px 0;
		border-bottom: 1px dashed #d9d9d9;
	}

	.optionList h3 {
		font-size: 16px;
		padding: 0;
		margin: 0 0 20px 0;
	}
	
	.checkbox-box{
		overflow: auto;
	}
</style>
<style>
	.head-menu .el-checkbox {
		margin: 0 0 5px 0;
		width: 160px;
	}
</style>
