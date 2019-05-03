<template>
  <div class="left_nav">
	  <!-- <el-menu
      class="el-menu-vertical-demo">
      <el-menu-item index="2" v-for="(item,index) in navList" :key="index">
         <router-link :to="item.route">{{item.name}}</router-link>
      </el-menu-item>
    </el-menu> -->
  </div>
</template>

<script>
export default {
  name: 'LeftNav',
  // props: {
  //   navList: Array
  // },
  data () {
    return {}
  },
  methods: {

  }
}
</script>
<style>
	/* .left_nav .router-link-active{
		color: #409EFF;
	}
	.left_nav .el-menu-item a{
		text-align: center;
		display: block;
	} */
</style>
<style scoped>
	.left_nav{
		width: 100px;
	}
	.el-menu{
		height: 100%;
	}
</style>
