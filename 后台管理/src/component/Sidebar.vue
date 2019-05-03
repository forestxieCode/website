<template>
  <div class="third-sidebar">
    <el-menu :default-active="defaultActive" class="el-menu-vertical-demo">
      <div style="overflow:hidden">
      <el-button type="text" @click="historyBack" style="float:left;line-height:78px;padding:0 14px;padding-right:10px;">
        <i class="fa fa-chevron-left" aria-hidden="true"></i>
        返回
      </el-button>
      <h4>{{title}}</h4>
    </div>
      <el-menu-item v-for="menu in specialMenu" :key="menu.route" :index="menu.index">
        <router-link :to="{path:menu.route,query:{id:id,name:name}}">{{menu.name}}</router-link>
      </el-menu-item>
    </el-menu>
  </div>
</template>
<script>
export default {
  name: 'ThirdSidebar',
  props: ['title', 'defaultActive', 'id', 'name'],
  data () {
    return {
      specialMenu: []
    }
  },
  created () { },
  methods: {
    historyBack () {
      window.location.href = window.location.origin + '#' + '/customer-admin/customer-info'
    }
  }
}
</script>
<style>
.third-sidebar,
.third-sidebar .el-menu{
  height:100%;
}

.third-sidebar h4{
  width: 100%;
  line-height: 78px;
  background: #d9dee4;
  padding-left: 16px;
  margin: 0;
}
.third-sidebar .el-menu-item a{
  display: block;
  width:100%;
  height:100%;
}
.third-sidebar .el-menu-vertical-demo .is-active a{
  color:#20a0ff
}
</style>
