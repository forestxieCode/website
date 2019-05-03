<template>
    <div class="navMenu">
      <section :style="{ width }" class="sidebar-item sidebar-item--normal">
        <el-menu class="sidebar-menu">
          <el-menu-item v-for="(submenu,index) in data" :key="submenu.id" :index="submenu.route" class="app-main-sidebar" v-if="submenu.type_status != 'Button'">
              <div @mouseenter="showChild(submenu,index)" @mouseleave="enterul">
                <div v-if="submenu.childMenus && submenu.childMenus.length">
                  <img :src="`static/img/${submenu.styleClass}`" alt="" class="module-logo" >
                  {{ submenu.name }}
                  <i class="el-icon-arrow-right check-more"></i>
                </div>
                <router-link :to="submenu.route" v-else>
                  <img :src="`static/img/${submenu.styleClass}`" alt="" class="module-logo" >
                  {{ submenu.name }}
                </router-link>
              </div>
            </el-menu-item>
          </el-menu>
        </section>
        <cascader-panel v-if="childMenu && childMenu.length" :data="childMenu"></cascader-panel>
    </div>
</template>

<script>
export default {
  name: 'CascaderPanel',
  props: {
    data: Array
  },
  data () {
    return {
      childMenu: [],
      currentIndex: -1,
      width: '190px',
      left: 0,
      routeMenu: this.$route.path
    }
  },
  watch: {
    data () {
      this.childMenu = []
      this.currentIndex = -1
    }
  },
  methods: {
    showChild (item, index) {
      this.currentIndex = index
      this.childMenu = item.childMenus
      this.left += 190
    },
    enterul () {
      this.currentIndex = -1
      this.childMenu = []
    }
  }
}
</script>

<style scoped>
.cascader-panel {
  display: flex;
  height: 100%;
}
.isactive{
  color: blue;
}
li{
  width: 120px;
  cursor: pointer;
}
.check-more{
  font-weight: bold;
  color: #fff;
  text-align: right;
}
.navMenu{
  position: absolute;
  z-index: 999;
  height: 100%;
  background: #232837;
  /* overflow: hidden; */
  width:190px;
  left:190px;
}
</style>
