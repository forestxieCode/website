import { platform } from '../app/js/config'

const AppContainer = () => import('@/layout/AppContainer')
import { home, CompanyNews,IndustrialTourism,SocialResponsibility,PartyMassesConstruction,HotelManagement,managementOfMeetings,AgencyManagement} from '../home/router'
// import Companynews from '../companynews/router'

import permissionRouter from '../permission/router'
import protUserLogRouter from '../protUserLog/router'

// import Industrialtourism from '../Industrialtourism/router'
// import socialresponsibility from '../socialresponsibility/router'
// import partymassesconstruction from '../partymassesconstruction/router'
// import hotelmanagement from '../hotelmanagement/router'
// import managementOfMeetings from '../managementOfMeetings/router'

// import checkRouter from '../check/router'
const router = [
  permissionRouter,
  protUserLogRouter,

  home,
  CompanyNews,
  IndustrialTourism,
  SocialResponsibility,
  PartyMassesConstruction,
  HotelManagement,
  managementOfMeetings,
  AgencyManagement
  // Home,
  // Companynews,
  // Industrialtourism,
  // socialresponsibility,
  // partymassesconstruction,
  // hotelmanagement,
  // managementOfMeetings
  // {
  //   path: '/',
  //   component: AppContainer,
  //   children: [
  //     {
  //       path: '/home/banner',
  //       component:Home
  //     }
  //   ]
  // }
].map(router => {
  router.children.map(route => {
    if (!route.meta) route.meta = {}
    Object.assign(route.meta, { platform: platform.key })
  })
  return router
})

export default router
