const AppContainer = () => import('@/layout/AppContainer')
const List = r => { require.ensure(['../List'], () => { r(require('../List')) }) }


export default {
  path: '/CompanyNews',
  component: AppContainer,
  children: [
    {
      path: 'list',
      component: List,
      meta: {
        subSidebarVisible: true
      }
    },
  ]
}
