import axios from 'axios'
import apiHost from '@/api/apiConfig'

const originApi = apiHost.ORIGIN

// 列表数据 /loginfo/findAll
export function getHomeFindAll(currentPage, pageSize) {
  return axios.get(originApi + '/loginfo/findAll?currentPage=' + currentPage + '&pageSize=' + pageSize)
}
// 查询 /loginfo/getBYConds
export function getBYConds(currentPage, pageSize, startDate, endDate) {
  return axios.get(originApi + '/loginfo/getBYConds?currentPage=' + currentPage + '&pageSize=' + pageSize + '&start_date=' + startDate + '&end_date=' + endDate)
}
// 根据ID查询详情 /loginfo/getById/{id}
export function getById(id) {
  return axios.get(originApi + '/loginfo/getById/' + id)
}
// 



// 新页面
export function getList(prate) {
  // return axios.get(originApi + '/auth/defect/getList?pageNumber='+prate.pageNumber+'&pageSize='+prate.pageSize+'&status='+prate.status)
  return axios.get(originApi + '/auth/defect/getList?pageNumber='+prate.pageNumber+'&pageSize='+prate.pageSize+'&status='+prate.status+'&operatename='+prate.operatename+'&findname='+prate.findname+'&phenomenon='+prate.phenomenon+'&process='+prate.process+'&startdate='+prate.startdate+'&enddate='+prate.enddate)
}
// 保存
export function saveinfo(prate) {
  return axios.post(originApi + '/auth/defect/save',prate)
}
// 日记
export function getDefectChild(id) {
  return axios.get(originApi + '/auth/defect/getDefectChild?id='+id)
}

export function getSystemList(pramer) {
  return axios.get(originApi + '/auth/project/getList?pageNumber='+pramer.pageNumber+'&pageSize='+pramer.pageSize+'&projectid='+pramer.projectid)
}

export function deleteSystemList(id) {
  return axios.get(originApi + '/auth/project/delete?id='+id)
}
export function updateSystem(prate) {
  return axios.post(originApi + '/auth/project/update',prate)
}
// 会议室订单
export function getMeetingList(pramer) {
  return axios.get(originApi + '/auth/website/getMeetingList?pageNumber='+pramer.pageNumber+'&pageSize='+pramer.pageSize)
}
export function deleteMeeting(id) {
  return axios.get(originApi + '/auth/website/deleteMeeting?id='+id)
}





