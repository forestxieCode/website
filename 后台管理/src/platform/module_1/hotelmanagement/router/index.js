const AppContainer = () => import('@/layout/AppContainer')
const OrderManage = r => { require.ensure(['../OrderManage'], () => { r(require('../OrderManage')) }) }
const ShowImg = r => { require.ensure(['../ShowImg'], () => { r(require('../ShowImg')) }) }
const RoomManage = r => { require.ensure(['../RoomManage'], () => { r(require('../RoomManage')) }) }

export default {
  path: '/HotelManagement',
  component: AppContainer,
  children: [
    {
      path: 'ShowImg',
      component: ShowImg,
      meta: {
        subSidebarVisible: true
      }
    },
    {
        path: 'RoomManage',
        component: RoomManage,
        meta: {
          subSidebarVisible: true
        }
    },
    {
        path: 'OrderManage',
        component: OrderManage,
        meta: {
          subSidebarVisible: true
        }
    }
  ]
}
