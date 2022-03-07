import instance from "../../utils/require";

const base = "http://localhost:3000/admin/api/"

// 注册
export function userLogin(data) {
	const config = {
    method: 'post',
    url: `${base}login`,
    data
	}
	return instance(config)
}

// 登录
export function userRegister(data) {
	const config = {
    method: 'post',
    url: `${base}register`,
    data
	}
	return instance(config)
}

// 获取所有管理员信息 getAdmin
export function getAdmin() {
	const config = {
    method: 'get',
    url: `${base}getAdmin`,
	}
	return instance(config)
}

// 删除管理员
export function deleteAdmin(id,data) {
	const config = {
    method: 'delete',
    url: `${base}getAdmin/${id}`,
    data
	}
	return instance(config)
}

// 获取某个管理员的信息
export function getAAdmin(id) {
	const config = {
    method: 'get',
    url: `${base}getAdmin/${id}`,
	}
	return instance(config)
}

// 编辑管理员信息
export function editAAdmin(id,data) {
	const config = {
    method: 'put',
    url: `${base}editAdmin/${id}`,
    data
	}
	return instance(config)
}