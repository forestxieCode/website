import Vue from 'vue'
import Router from 'vue-router'

import platformSaleRouter from '@platformSale/router'
// import platformWindRouter from '@platformWind/router'

if (process.env.NODE_ENV !== 'production') Vue.use(Router)
// if (process.env.NODE_)

// const Home = r => { require.ensure(['@platformSale/view/Home'], () => { r(require('@platformSale/view/Home')) }) }
const Err404 = r => { require.ensure(['@/view/Err404'], () => { r(require('@/view/Err404')) }) }

/**
 * 权限分为多少种？颗粒细度？
 *
 * 如果权限类型较多，使用后端路由方案
 * 相反，如果权限类型较少（三种以内？），可使用前端路由方案
 *
 * 后端路由方案：
 * 前端生成无权限路由
 * 后端根据用户权限生成路由数据，前端动态添加权限路由
 *
 * 前端路由方案：
 * 前端生成所有有路由和权限表（或直接在每条路由的 meta 对象内添加权限标识）
 * 根据后端返回的权限标识从对应的权限表内生成有效路由
 *
 * router 将来要做两件事
 * 1. 路由跳转之前的错误页面判断
 * 2. 根据 router 生成组件内容或是条件判断
 */

const routes = [
  { path: '/404', component: Err404 },
  ...platformSaleRouter
  // ...platformWindRouter
]

export default new Router({ routes })
