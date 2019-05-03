import axios from 'axios'
import apiHost from '@/api/apiConfig'

const originApi = apiHost.ORIGIN

// 电厂
export function getPowerPlantList() {
  return axios.get(originApi + '/auth/org/getPlants')
}

// 值班表填写和详情 ---新增里面的值班单位
export function getBeonDutyCompany() {
  return axios.get(originApi + '/auth/org/')
}

export function getModuleList() {
  return axios.get(originApi + '/api/module/getModules')
}

export function getCommentServiceList() {
  return axios.get(originApi + '/api/moduleusercommon/getCommonModules')
}

export function getUserInfo() {
  return axios.get(originApi + '/auth/user/getUser/')
}

export const modifyPassword = (params) => axios.post(originApi + '/auth/user/updatePassword', params)

export function getSubMeteorological() {
  if (process.env.NODE_ENV === 'production') {
    return axios.get(originApi + '/basedata/basedata/chronometer/getWeatherInfoprd')
  } else {
    return axios.get(originApi + '/basedata/basedata/chronometer/getWeatherInfo')
  }
}

export function getSubMeteorological2() {
  if (process.env.NODE_ENV === 'production') {
    return axios.get(originApi + '/basedata/basedata/chronometer/getWeatherInfoprdDetail')
  } else {
    return axios.get(originApi + '/basedata/basedata/chronometer/getWeatherInfoDetail')
  }
}

export function getSubHydrology(id, date) {
  if (process.env.NODE_ENV === 'production') {
    return axios.get(originApi + '/basedata/basedata/chronometer/getWaterInfoprd?orgIds=' + id + '&dateStr=' + date + '')
  } else {
    return axios.get(originApi + '/basedata/basedata/chronometer/getWaterInfo?orgIds=' + id + '&dateStr=' + date + '')
  }
}
// 获取所有系统
export const getProjects = (params) => axios.get(originApi + '/auth/project/getProjects?remark=1', {
  params: params
})

// 上传图片
export const uploadRichAttanch = (params) => axios.post(originApi + '/auth/file/uploadRichAttanch')

// 获取新闻
export function getList(params) {
  return axios.get(originApi + '/auth/website/getList', {
    params
  })
}
// 获取新闻2
export function getList_(parame) {
  return axios.get(originApi + '/auth/website/getList?pageNumber=' + parame.pageNumber + '&pageSize=' + parame.pageSize + '&status=' + parame.status + '&startdate=' + parame.startdate + '&enddate=' + parame.enddate + '&title=' + parame.title + '&type=' + parame.type + '&childType=' + parame.childType)
}
// 发布
export function isPublish(params) {
  return axios.post(originApi + '/auth/website/isPublish', params)
}
// 删除新闻
export function deleteNews(id) {
  return axios.get(originApi + '/auth/website/deleteNews?id=' + id)
}

// 查询所有轮播图
export function getCarouses(type) {
  return axios.get(originApi + '/auth/website/getCarouses?type=' + type)
}
// 保存轮播图
export function saveCarouse(parameter) {
  return axios.post(originApi + '/auth/website/saveCarouse', parameter)
}
// 删除轮播图
export function deleteCarouse(id) {
  return axios.get(originApi + '/auth/website/deleteCarouse?id=' + id)
}
export function signOut(id) {
  return axios.get(originApi + '/auth/user/quit')
}

// 获取所有的bfs的代办
export function getBfsList(params) {
  return axios.get(originApi + '/auth/project/getBfsList', {
    params
  })
}

// 保存选中的bfs
export function saveUserBfs(params) {
  return axios.post(originApi + '/auth/project/saveUserBfs', params)
}
// 查询用户选择的bfs
export function getUserBfsByUserId(params) {
  return axios.get(originApi + '/auth/project/getUserBfsByUserId', {
    params
  })
}
