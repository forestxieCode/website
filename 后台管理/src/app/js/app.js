import { sidebarTypes } from '@/app/js/config'
import { assign } from '@/shared/util'

/**
 * 插入路由 meta 信息
 * @param {Object[]} routes
 * @param {Object} menu
 * @param {String} [path = '']
 */
const insertRouterMeta = function insertRouterMeta (routes, menu, path = '') {
  routes.forEach(route => {
    const currentPath = path + (route.path[0] === '/' ? route.path : '/' + route.path)

    if (currentPath === menu.route) {
      if (!route.meta) route.meta = {}
      if (!menu.sidebarType) menu.sidebarType = sidebarTypes.default

      assign(route.meta, menu, {
        extra: ['id', 'parentId', 'name', 'linkType', 'sidebarType', {
          toKey: 'sidebarState',
          fromKey: 'sidebarStatus'
        }],
        onlyExtra: true
      })
    } else {
      if (route.children) insertRouterMeta(route.children, menu, currentPath)
    }
  })
}

/**
 * 获取路由对象信息
 * @param {Object[]} routes = [] - vur-router $route list
 * @param {String} currentPath
 * @param {String} [prePath = ''] - 父级路由地址
 * @returns {Object}
 */
export const getRouteInfo = function getRouteInfo (routes = [], currentPath, prePath = '') {
  for (const route of routes) {
    // 因为 currentPath 是不能被改变的
    // 所以这里 copy 一份 currentPath 用作当前块的 path 判断
    let currentPathCopy = currentPath

    const routePath = prePath + (route.path[0] === '/' ? route.path : '/' + route.path)
    // 因为可能存在动态路由
    // 所以这里把当前路由的动态路径替换成动态路径标识
    // e.g. '/policy-news/industry-info/1' => '/policy-news/industry-info/:id'
    const routeParams = routePath.match(/:\w+/)

    if (routeParams) currentPathCopy = currentPathCopy.slice(0, routeParams.index) + routeParams[0]

    if (routePath === currentPathCopy) {
      return route
    } else {
      const routeInfo = getRouteInfo(route.children, currentPath, routePath)
      if (routeInfo) return routeInfo
    }
  }
}

/**
 * 获取路由的 sidebarState 值
 * @param {Object} vm
 * @param {String} [to = vm.$route.path]
 * @returns {Number}
 */
// export const getRouteSidebarState = function getRouteSidebarState (vm, to) {
//   if (!to) to = vm.$route.path

//   const routeInfo = getRouteInfo(vm.$router.options.routes, to)
//   return routeInfo && routeInfo.meta && routeInfo.meta.sidebarState
//     ? routeInfo.meta.sidebarState
//     : sidebarStatus.default
// }

/**
 * 设置路由 meta 信息
 * @param {Object} routes
 * @param {Object[]} menus
 */

export const setRouterMeta = function setRouterMeta (routes, menus) {
  menus.forEach(menu => {
    menu.childMenus && menu.childMenus.length
      ? setRouterMeta(routes, menu.childMenus)
      : insertRouterMeta(routes, menu)
  })
}

export const phoneNumberValidator = function phoneNumberValidator (rule, value, callback) {
  const {
    type,
    required = false,
    typeMsg = '请输入正确的数字',
    requiredMsg = '请输入手机号码',
    validateMsg = '手机号码格式不正确'
  } = rule

  if (required && !value) {
    return callback(new Error(requiredMsg))
  }
  if (type && (typeof value !== type)) { // eslint-disable-line
    return callback(new Error(typeMsg))
  }
  if (value && !/^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/.test(value)) {
    return callback(new Error(validateMsg))
  }
  callback()
}

export const accountValidator = function accountNumberValidator (rule, value, callback) {
  const { required = false, requiredMsg = '请输入账号', validateMsg = '账号格式不正确' } = rule

  if (required && !value) {
    return callback(new Error(requiredMsg))
  }
  if (value && !/^(\w+\.*)*$/.test(value)) {
    return callback(new Error(validateMsg))
  }
  callback()
}

export const emailValidator = function emailValidator (rule, value, callback) {
  const { required = false, requiredMsg = '请输入邮箱地址', validateMsg = '邮箱格式不正确' } = rule

  if (required && !value) {
    return callback(new Error(requiredMsg))
  }
  if (value && !/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(value)) {
    return callback(new Error(validateMsg))
  }
  callback()
}
