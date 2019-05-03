// linkType默认为1,
// 1：路由跳转
// 2：tab切换
// 3：新链接
export const linkTypes = {
  default: 1,
  route: 1,
  tab: 2,
  newTab: 3
}

// sidebarTypes默认为1
// 1：普通侧边栏
// 2：树形菜单栏
// 3：第三种菜单栏
export const sidebarTypes = {
  default: 1,
  normal: 1,
  tree: 2,
  init: 4
}

// 侧边栏的显示，默认为3
// 1：打开
// 2：关闭
// 3：隐藏
export const sidebarStatus = {
  default: 3,
  open: 1,
  close: 2,
  hide: 3
}

// header高度
export const headerBox = {
  height: 50
}

// 配置常用服务样式
export const commonServiceBox = {
  height: 35,
  padding: {
    top: 0,
    right: 20,
    bottom: 0,
    left: 20
  }
}

// 根据菜单类型设置sidebar宽
// 普通菜单宽：200
// 树形菜单：180
export const sidebarBox = {
  1: {
    width: 184
  },
  2: {
    width: 180
  },
  3: {
    width: 0
  },
  4: {
    width: 50
  }
}

// 子菜单宽度
export const subSidebarBox = {
  1: {
    width: 150
  },
  2: {
    width: 120
  }
}

// 设置页面内容头部标题样式
export const mainContentBox = {
  padding: {
    top: 15,
    right: 20,
    bottom: 15,
    left: 20
  }
}

export const pageHeader = {
  height: 40,
  margin: { bottom: 10 }
}

// logo宽 === 左侧导航栏宽
export const logoWidth = {
  width: 280
}
