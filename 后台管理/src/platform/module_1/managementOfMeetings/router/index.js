const AppContainer = () => import('@/layout/AppContainer')
const MeetingShowImg = r => { require.ensure(['../MeetingShowImg'], () => { r(require('../MeetingShowImg')) }) }
const MeetingRoomManage = r => { require.ensure(['../MeetingRoomManage'], () => { r(require('../MeetingRoomManage')) }) }
const MeetingOrder = r => { require.ensure(['../MeetingOrder'], () => { r(require('../MeetingOrder')) }) }

export default {
  path: '/managementOfMeetings',
  component: AppContainer,
  children: [
    {
      path: 'MeetingShowImg',
      component: MeetingShowImg,
      meta: {
        subSidebarVisible: true
      }
    },
    {
        path: 'MeetingRoomManage',
        component: MeetingRoomManage,
        meta: {
          subSidebarVisible: true
        }
    },
    {
        path: 'MeetingOrder',
        component: MeetingOrder,
        meta: {
          subSidebarVisible: true
        }
    }
  ]
}
