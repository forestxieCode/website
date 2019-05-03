import axios from 'axios'
import apiHost from '@/api/apiConfig'

const originApi = apiHost.ORIGIN

// 获取所有  /point/findAll
export function getFindAll(currentPage, pageSize) {
  return axios.get(originApi + '/point/findAll?currentPage=' + currentPage + '&pageSize=' + pageSize)
}

// 新增 /point/create
export function postCreate(params) {
  return axios.post(originApi + '/point/create', params)
}

// 查询 /point/findByConds
export function postFindByConds(currentPage, pageSize, params) {
  return axios.post(originApi + '/point/findByConds?currentPage=' + currentPage + '&pageSize=' + pageSize, params)
}

// 编辑 /point/findById/{id}
export function getFindById(id) {
  return axios.get(originApi + '/point/findById/' + id)
}

// 删除 /point/delete/{id}
export function getDeleteId(id) {
  return axios.delete(originApi + '/point/delete/' + id)
}
