import instance from "../../utils/require";

const base = "http://localhost:3000/admin/api/"

// 创建分类
export function createClassify(data) {
	const config = {
    method: 'post',
    url: `${base}addClassify`,
    data
	}
	return instance(config)
}

// 查询分类
export function getClassify() {
	const config = {
    method: 'get',
    url: `${base}getClassify`,
	}
	return instance(config)
}

// 删除分类
export function deleteClassify(id,data) {
	const config = {
    method: 'delete',
    url: `${base}addClassify/${id}`,
    data
	}
	return instance(config)
}

// 创建小料
export function createExtra(data) {
	const config = {
    method: 'post',
    url: `${base}addExtra`,
    data
	}
	return instance(config)
}

// 删除小料
export function deleteExtra(id,data) {
	const config = {
    method: 'delete',
    url: `${base}getExtra/${id}`,
    data
	}
	return instance(config)
}

// 查询小料
export function getExtra() {
	const config = {
    method: 'get',
    url: `${base}getExtra`,
	}
	return instance(config)
}

// 查询某个小料
export function editExtra(id) {
	const config = {
    method: 'get',
    url: `${base}editExtra/${id}`,
	}
	return instance(config)
}

// 修改某个小料
export function changeExtra(id, data) {
	const config = {
    method: 'put',
    url: `${base}changeExtra/${id}`,
		data
	}
	return instance(config)
}