<template>
  <header class="layout__header" :style="{ height }">
    <h1 class="product-logo" :style="{ width }">
      <img class="logo" src="../asset/logo.jpg" alt="logo" style="margin-top: 5px;
    height:40px;">
    </h1>
    <el-menu
      :default-active="$route.path"
      class="header-menu product-menu"
      theme="dark"
      mode="horizontal"
    >
      <el-menu-item index="/" class="el-menu-item common-service">
        <router-link class="module-link" to="/" exact>
          <!-- 缺陷列表 -->
        </router-link>
      </el-menu-item>
      <!-- <el-menu-item v-for="menu in productServes" :key="menu.id" :index="menu.route">
        <router-link class="module-link" :to="menu.route" exact>{{menu.name}}</router-link>
      </el-menu-item>-->
      <!-- <i class="split-line"></i> -->
      <el-menu-item
        v-for="common in commonService"
        :key="common.id"
        :index="common.route"
        class="el-menu-item common-service"
      >
        <router-link class="module-link" :to="common.route" exact>{{common.name}}</router-link>
      </el-menu-item>
      <!-- <router-link to="/permission/head-menu">
        <i class="el-icon-plus" style="color: #cccccc;font-size: 18px;margin-top: 15px;"></i>
      </router-link> -->
    </el-menu>
    <user-menu></user-menu>
  </header>
</template>

<script>
// import crossMenu from 'cross-menu'

// import getModuleList from '@/api/index'

import LinkType from "@/component/LinkType";
import UserMenu from "./component/UserMenu";

import { headerBox, commonServiceBox, logoWidth } from "@/app/js/config";
import { getUserInfo } from "@/api/index";

export default {
  name: "AppHeader",
  components: {
    UserMenu,
    LinkType
  },
  data() {
    return {
      height: headerBox.height + "px",
      activePlatform: 0,
      minHeight: 0,
      width: logoWidth.width+20 + "px"
    };
  },
  computed: {
    commonService() {
      return this.$store.state.commonService;
    },
    productServes() {
      return this.$store.state.productServes;
    }
  },
  // watch: {
  //   productServes (newValue) {
  //     if (newValue.length) {
  //       this.$nextTick(() => {
  //         debugger
  //         this.minHeight = headerBox.height * this.productServes.length + 'px'
  //         debugger
  //         const left = document.querySelector('.product-menu').offsetLeft

  //         crossMenu({
  //           menu: document.querySelector('.platform-side'),
  //           menuItemTag: 'li',
  //           submenu: document.querySelector('.category-side'),
  //           submenuItemTag: 'ul',
  //           position: { top: headerBox.height, left },
  //           delay: 100,
  //           activeIndex: 1,
  //           keepSubmenuVisible: true
  //         })
  //       })
  //     }
  //   }
  // },
  created() {
    // getModuleList().then(response => {
    //   this.headerMenu = response.data
    // })
  },
  methods: {
    handleToggleCommonService() {
      this.$store.commit(
        "changeCommonServiceHeight",
        this.$store.state.commonServiceHeight ? 0 : commonServiceBox.height
      );
    }
  }
};
</script>

<style scoped>
.product-logo {
  float: left;
  height: 100%;
  margin: 0;
  font-size: 18px;
  font-weight: 400;
  color: #fff;
  text-align: center;
}

.product-logo img {
  margin-top: 10px;
}

.logo-text {
  vertical-align: top;
  display: inline-block;
}

.header-menu .product-serve > .el-menu {
  position: relative;
}

.header-menu .product-serve .category-side::before {
  content: "";
  position: absolute;
  top: 0;
  left: 127px;
  height: 100%;
  border-left: 1px solid #384456;
}

.header-menu .platform-side {
  float: left;
  width: 127px;
}

.header-menu .platform-side .platform-list {
  padding-left: 0;
}

.header-menu .platform-side .platform-item {
  padding-left: 20px;
}

.header-menu .platform-side .platform-item.active {
  color: #ffb800;
  background-color: #242c37;
  cursor: context-menu;
}

.header-menu .category-side {
  padding: 10px 20px;
  margin-left: 127px;
}

.header-menu .category-side .category-list {
  display: none;
  padding-left: 0;
}

.header-menu .category-side .category-list.active {
  display: block;
}

.header-menu .category-side .category-item {
  display: inline-block;
  vertical-align: top;
  width: 150px;
  margin: 0 15px;
}

.header-menu .module-list {
  padding-left: 0;
}

.header-menu .module-list .category-title {
  font-size: 14px;
  line-height: 30px;
  font-weight: 700;
  margin: 0 0 5px;
  color: #6c747f;
  border-bottom: 1px solid #3a4658;
}

.header-menu .module-list .module-item {
  padding: 0;
}

.el-menu-item.common-service.active {
  color: #ffb800;
}
</style>

<style>
header.layout__header .header-menu {
  float: left;
  border-radius: 0;
  margin-left: 40px;
}

header.layout__header .header-menu .el-submenu {
  font-size: 14px;
}

header.layout__header .header-menu > .el-menu-item,
header.layout__header .header-menu > .el-submenu,
header.layout__header .header-menu > .el-submenu .el-submenu__title {
  height: 50px;
  line-height: 50px;
  border-bottom: none;
}

header.layout__header .el-menu.el-menu--horizontal {
  border-bottom: none;
}

header.layout__header .product-menu > .el-menu-item {
  padding: 0;
}

header.layout__header .product-menu > .el-menu-item > a {
  display: block;
  padding: 0 20px;
}

header.layout__header .header-menu > .el-submenu > .el-menu {
  top: 48px;
  width: 1120px;
  border: none;
  border-radius: 0;
  color: #fff;
  background-color: #242c37;
}

header.layout__header .header-menu .el-submenu .el-menu-item {
  height: 30px;
  line-height: 30px;
  background-color: transparent;
}

header.layout__header .header-menu > .el-menu-item:hover::after,
header.layout__header .header-menu > .el-submenu:hover::after {
  display: none;
}

header.layout__header .header-menu .el-menu-item,
header.layout__header .header-menu .el-submenu__title,
header.layout__header .header-menu .el-submenu .el-menu-item,
header.layout__header .header-menu .el-submenu .el-submenu__icon-arrow {
  color: #000;
}

header.layout__header .header-menu > .el-menu-item:hover,
header.layout__header .header-menu > .el-submenu.is-active .el-submenu__title,
header.layout__header .header-menu > .el-submenu:hover .el-submenu__title {
  border-bottom: none;
}

header.layout__header .header-menu > .el-menu-item:hover,
header.layout__header .header-menu > .el-submenu:hover .el-submenu__title {
  color: ##208DF7;
}

header.layout__header .header-menu .el-submenu .el-menu-item.is-active,
header.layout__header .el-menu-item.is-active,
header.layout__header .header-menu .el-submenu:hover .el-submenu__icon-arrow {
  color:##208DF7;
}

.layout__container .layout__sidebar .sidebar-menu .el-menu-item.is-active {
  color: ##208DF7;
}

header.layout__header .header-menu .el-submenu .el-menu-item:hover {
  color: #ffb800;
  background-color: transparent;
}

header.layout__header .header-menu .category-side .comp__link-type a {
  display: block;
  padding-left: 20px;
  text-decoration: none;
}

header.layout__header
  .header-menu
  .category-side
  .comp__link-type
  a.router-link-active {
  color: #ffb800;
}

header .header-menu {
  border-bottom: none;
}

header .el-menu-item {
  font-size: 16px;
}

header .home-img {
  width: 20px;
  margin-right: 4px;
  margin-top: -6px;
}

header .common-service {
  font-size: 12px;
}

header .split-line {
  float: left;
  display: inline-block;
  height: 28px;
  margin-top: 14px;
  width: 2px;
  background: #000;
}
</style>
