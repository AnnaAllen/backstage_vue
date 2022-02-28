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

// 查询分类
export function deleteClassify(id,data) {
	const config = {
    method: 'delete',
    url: `${base}addClassify/${id}`,
    data
	}
	return instance(config)
}