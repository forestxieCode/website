import axios from 'axios'
import apiHost from '@/api/apiConfig'

const originApi = apiHost.ORIGIN




// 保存新闻
export function saveNews(parameter) {
  return axios.post(originApi + '/auth/website/saveNews', parameter)
}
// 新闻编辑
export function getNewsById(id) {
  return axios.get(originApi + '/auth/website/getNewsById?id=' + id)
}

// 会议室订单
export function getMeetingList(params) {
  return axios.get(originApi + '/auth/website/getMeetingList', {
    params
  })
}
export function deleteMeeting(id) {
  return axios.get(originApi + '/auth/website/deleteMeeting?id=' + id)
}
// 酒店订单
export function getHotelList(params) {
  return axios.get(originApi + '/auth/website/getHotelList', {
    params
  })
}
export function deleteHotel(id) {
  return axios.get(originApi + '/auth/website/deleteHotel?id=' + id)
}
// 选择审批人
export function getApprovalPersonnel(params) {
  return axios.get(originApi + '/auth/user/getApprovalPersonnel', {
    params
  })
}
// 获取代办列表的数据
export function getTodoList(params) {
  return axios.get(originApi + '/auth/website/getTodoList', {
    params
  })
}

export function getFlowTasksById(params) {
  return axios.get(originApi + '/auth/website/getFlowTasksById', {
    params
  })
}
export function approval(params) {
  return axios.post(originApi + '/auth/website/approval', params)
}
