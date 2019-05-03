const AppContainer = () => import('@/layout/AppContainer')
const userLog = () => import('../userLog/userLog')
export default {
  path: '/protUserLog',
  component: AppContainer,
  children: [
    {
      path: 'userLog',
      component: userLog
    }
  ]
}
