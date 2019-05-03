import axios from 'axios'
import apiHost from '@/api/apiConfig'

const ORIGIN = apiHost.ORIGIN

export const saveMenuInfo = function saveMenuInfo(data) {
	return axios.post(ORIGIN + '/api/module/save', data, {
		headers: {
			'Content-Type': 'application/json;charset=UTF-8'
		}
	})
}

export const deleteMenuInfo = function deleteMenuInfo(id) {
	return axios.delete(ORIGIN + '/api/module/' + id)
}

export const saveOrganization = function saveOrganization(data) {
	return axios.post(ORIGIN + '/auth/org/', data)
}

export const deleteOrganization = function deleteOrganization(id) {
	return axios.delete(ORIGIN + '/org/' + id)
}

export const getUserListByOrgId = function getUserListByOrgId(id, type) {
	const params = {
		orgId: id,
		orgType: type
	}
	return axios.get(ORIGIN + '/user/getListByOrgId', {
		params
	})
}

export const getRoleList = function getRoleList() {
	return axios.get(ORIGIN + '/auth/role/')
}

export const getMenuList = function getMenuList(id) {
	return axios.get(ORIGIN + '/auth/roleModule/getListByRoleId/' + id)
}

export const saveMenusInfo = function saveMenusInfo(params) {
	return axios.post(ORIGIN + '/auth/roleModule/', params)
}

export const deleteUserRoleSelect = function deleteUserRoleSelect(id) {
	return axios.delete(ORIGIN + '/auth/userRole/' + id)
}

export const getRoleAssignList = function getRoleAssignList(id) {
	return axios.get(ORIGIN + '/auth/userRole/getListByUserId/' + id)
}

export const saveUserRoleInfo = function saveUserRoleInfo(params) {
	return axios.post(ORIGIN + '/auth/userRole/', params)
}

export const getAssignList = function getAssignList(id) {
	return axios.get(ORIGIN + '/auth/userRole/getListByRoleId/' + id)
}

export const getAssignSelect = function getAssignSelect(id) {
	return axios.get(ORIGIN + '/auth/roleModule/getModulesByRoleId/' + id)
}

export const getAllRoleAssignList = function getAllRoleAssignList(id) {
	return axios.get(ORIGIN + '/auth/userRole/getGrantRoleList/' + id)
}

export const getUnselectRoleList = function getUnselectRoleList(id) {
	return axios.get(ORIGIN + '/auth/role/unselectedRole/' + id)
}

export const deleteRoleInfo = function deleteRoleInfo(id) {
	return axios.delete(ORIGIN + '/auth/role/' + id)
}

export const saveRoleInfo = function saveRoleInfo(params) {
	return axios.post(ORIGIN + '/auth/role/', params)
}

export const getRoleDel = function getRoleDel(userId, roleId) {
	return axios.put(ORIGIN + '/userRole/deleteUserRoleId/' + userId + '/' + roleId)
}

export const editRoleInfo = function editRoleInfo(id) {
	return axios.get(ORIGIN + '/auth/role/' + id)
}

export const getUserRoleList = function getUserRoleList(id) {
	return axios.get(ORIGIN + '/userRole/getListByUserId/' + id)
}

export const addUserRole = function addUserRole(userid, roleid) {
	return axios.post(ORIGIN + '/userRole/', {
		userid,
		roleid
	})
}

export const deleteUserRole = function deleteUserRole(id) {
	return axios.delete(ORIGIN + '/userRole/' + id)
}

export const saveUserInfo = function saveUserInfo(data) {
	return axios.post(ORIGIN + '/user/', data)
}

export const deleteUser = function deleteUser(id) {
	return axios.delete(ORIGIN + '/user/' + id)
}

// organization
export const getNewOrganizationList = () => axios.get(ORIGIN + '/auth/org/')

export const saveOrgDepartmentInfo = (params) => axios.post(ORIGIN + '/auth/org/', params)

export const getOrgUsers = (id) => axios.get(ORIGIN + '/auth/user/getOrgUserList/' + id)

export const deleteOrgDepartmentInfo = (id) => axios.delete(ORIGIN + '/auth/org/' + id)

export const getOrgPositionList = (id) => axios.get(ORIGIN + '/common/job/getJobByOrgId?orgId=' + id)

export const saveOrgPositionInfo = (params) => axios.get(ORIGIN + '/common/job/save', {
	params
})
export const deleteOrgPositionInfo = (id) => axios.put(ORIGIN + '/auth/user/' + id)

export const getNewAllStudents = (params) => axios.get(ORIGIN + '/api/user/getOrgUserList', {
	params
})

export const saveOrgUserInfo = (params) => axios.post(ORIGIN + '/auth/user/', params)
export const getAllRoleList = () => axios.get(ORIGIN + '/api/userRole/getAllRole')

export const checkOrgLoginName = (name) => axios.get(ORIGIN + '/api/user/checkLoginname?loginname=' + name)

export const getDelEmployee = (userIds) => axios.get(ORIGIN + '/api/user/deleteUser?ids=' + userIds)

export const getEditEmplyee = (userId) => axios.get(ORIGIN + '/api/user/editUser?userId=' + userId)

export const getDelBatches = (ids, jobId) => axios.get(ORIGIN + '/api/user/deleteUserInfo?ids=' + ids + '&jobId=' +
	jobId)

export const batchModifyUserInfo = function batchModifyUserInfo(usersID, departmentID, positionID) {
	const params = {
		userIds: JSON.stringify(usersID).slice(1, -1),
		deptId: departmentID,
		jobId: positionID
	}
	return axios.get(ORIGIN + '/api/user/updateUserDeptJob', {
		params
	})
}

export const editOrgList = (id) => axios.get(ORIGIN + '/auth/org/edit/' + id)

export const getOrgUserList = (id) => axios.get(ORIGIN + '/api/user/getUserByJobId?jobId=' + id)

export const editUserInfo = (id) => axios.get(ORIGIN + '/auth/user/editUser/' + id)

export const editMeneInfo = (id) => axios.get(ORIGIN + '/api/module/edit/' + id)

export const initPassword = (id) => axios.put(ORIGIN + '/auth/user/initPassword/' + id)

export const saveEditUserInfo = (params) => axios.put(ORIGIN + '/auth/user/updateUser', params)

export const getCommonModules = (params) => axios.get(ORIGIN + '/api/moduleusercommon/getCommonModules', {params:params})

export const savaCommonModules = (params) => axios.get(ORIGIN + '/api/moduleusercommon/sava2', {params:params})




export const saveUserproject = (params) => axios.post(ORIGIN + '/auth/project/save', params)

export const batchSave = (params) => axios.post(ORIGIN + '/auth/project/batchSave', params)

export const getByUserId = (params) => axios.get(ORIGIN + '/auth/project/getByUserId', {params:params})


export const deleteUserproject = (params) => axios.get(ORIGIN + '/auth/project/delete', {params:params})

export const getAuthUsers = (params) => axios.get(ORIGIN + '/auth/user/getAuthUsers', {params:params})

 
// export function getProjects () {
// 	return axios.get(originApi + '/auth/project/getProjects')
//   }
