const AppContainer = () => import('@/layout/AppContainer')
const Banner = r => {
  require.ensure(['../Banner'], () => {
    r(require('../Banner'))
  })
}
const WalkIntoXilin = r => {
  require.ensure(['../WalkIntoXilin'], () => {
    r(require('../WalkIntoXilin'))
  })
}
const AddWalkIntoInfo = r => {
  require.ensure(['../AddWalkIntoInfo'], () => {
    r(require('../AddWalkIntoInfo'))
  })
}

const MeetingOrder = r => {
  require.ensure(['../MeetingOrder'], () => {
    r(require('../MeetingOrder'))
  })
}
const OrderManage = r => {
  require.ensure(['../OrderManage'], () => {
    r(require('../OrderManage'))
  })
}

const AgencyList = r => {
  require.ensure(['../AgencyList'], () => {
    r(require('../AgencyList'))
  })
}

const Agency = r => {
  require.ensure(['../Agency'], () => {
    r(require('../Agency'))
  })
}

export const home = {
  path: '/',
  component: AppContainer,
  redirect: '/Home/WalkIntoXilin',
  children: [{
      path: 'Home/banner',
      component: Banner
    },
    {
      path: 'Home/WalkIntoXilin',
      component: WalkIntoXilin
    },
    {
      path: 'Home/TechnologicalInnovation',
      component: WalkIntoXilin
    },
    {
      path: 'Home/AddWalkIntoInfo',
      component: AddWalkIntoInfo
    },
    {
      path: 'Home/Agency',
      component: Agency
    }
  ]
}
// 公司新闻
export const CompanyNews = {
  path: '/CompanyNews',
  component: AppContainer,
  children: [{
    path: 'list',
    component: WalkIntoXilin,
    meta: {
      subSidebarVisible: true
    }
  }, ]
}
//工业旅游
export const IndustrialTourism = {
  path: '/IndustrialTourism',
  component: AppContainer,
  children: [{
      path: 'banner',
      component: Banner,
      meta: {
        subSidebarVisible: true
      }
    },
    {
      path: 'TourLine',
      component: WalkIntoXilin,
      meta: {
        subSidebarVisible: true
      }
    },
    {
      path: 'HotelReservation',
      component: Banner,
      meta: {
        subSidebarVisible: true
      }
    },
    {
      path: 'ConferenceServices',
      component: Banner,
      meta: {
        subSidebarVisible: true
      }
    },
  ]
}
// 社会责任
export const SocialResponsibility = {
  path: '/SocialResponsibility',
  component: AppContainer,
  children: [{
    path: 'list',
    component: WalkIntoXilin,
    meta: {
      subSidebarVisible: true
    }
  }, ]
}

// 党群建设
export const PartyMassesConstruction = {
  path: '/PartyMassesConstruction',
  component: AppContainer,
  children: [{
    path: 'list',
    component: WalkIntoXilin,
    meta: {
      subSidebarVisible: true
    }
  }, ]
}

// 酒店房间
export const HotelManagement = {
  path: '/HotelManagement',
  component: AppContainer,
  children: [{
      path: 'RoomManage',
      component: WalkIntoXilin,
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
// 会议室房间
export const managementOfMeetings = {
  path: '/managementOfMeetings',
  component: AppContainer,
  children: [{
      path: 'MeetingRoomManage',
      component: WalkIntoXilin,
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
// 代办列表
export const AgencyManagement = {
  path: '/agency-management',
  component: AppContainer,
  children: [{
    path: 'agency-list',
    component: AgencyList
  }]
}
