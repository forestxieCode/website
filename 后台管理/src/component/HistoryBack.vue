<template>
  <el-button class="page-back" type="text" @click="historyBack">
    <i class="fa fa-chevron-left" aria-hidden="true"></i>
    返回
  </el-button>
</template>

<script>
export default {
  name: 'HistoryBack',
	props: {
		route: String
	},
  data () {
    return {}
  },
  methods: {
    historyBack () {
			if(this.route){
				this.$router.push(this.route)
			}else{
				this.$router.go(-1)
			}
    }
  }
}
</script>

<style scoped>
.page-back {
  position: relative;
  top: -1px;
  padding-top: 0;
  margin-right: 20px;
}

.page-back::after {
  /* content: ''; */
  position: absolute;
  top: -3px;
  right: -15px;
  height: 20px;
  border-left: 1px solid #bfbfbf;
}

.page-back .fa {
  margin-right: 3px;
}
</style>
