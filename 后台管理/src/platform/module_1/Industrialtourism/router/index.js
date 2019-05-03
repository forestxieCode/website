const AppContainer = () => import('@/layout/AppContainer')
const banner = r => { require.ensure(['../banner'], () => { r(require('../banner')) }) }
const TourLine = r => { require.ensure(['../TourLine'], () => { r(require('../TourLine')) }) }
const HotelReservation = r => { require.ensure(['../HotelReservation'], () => { r(require('../HotelReservation')) }) }
const ConferenceServices = r => { require.ensure(['../ConferenceServices'], () => { r(require('../ConferenceServices')) }) }

export default {
  path: '/IndustrialTourism',
  component: AppContainer,
  children: [
    {
      path: 'banner',
      component: banner,
      meta: {
        subSidebarVisible: true
      }
    },
    {
      path: 'TourLine',
      component: TourLine,
      meta: {
        subSidebarVisible: true
      }
    },
    {
      path: 'HotelReservation',
      component: HotelReservation,
      meta: {
        subSidebarVisible: true
      }
    },
    {
      path: 'ConferenceServices',
      component: ConferenceServices,
      meta: {
        subSidebarVisible: true
      }
    },
  ]
}
