const AppContainer = () => import('@/layout/AppContainer')
const MenuConfig = () => import('../MenuConfig')
const RoleAssign = () => import('../RoleAssign')
const RoleManage = () => import('../RoleManage')
const MenusConfig = () => import('../MenusConfig')
const HeadMenu = () => import('../HeadMenu')
const UpLoad = () => import('../UpLoad')

export default {
  path: '/permission',
  component: AppContainer,
  children: [
    {
      path: 'menu-config',
      component: MenuConfig
    },
    {
      path: 'role-assign',
      component: RoleAssign
    },
    {
      path: 'role-manage',
      component: RoleManage
    },
    {
      path: 'menus-config',
      component: MenusConfig
    },
		{
			path: 'head-menu',
			component: HeadMenu
    },
    {
      path: 'up-load',
			component: UpLoad
    }
  ]
}
