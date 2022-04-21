import instance from "../../utils/require";

const base = "http://localhost:3000/admin/api/"

// 查询分类
export function getClassify() {
	const config = {
    method: 'get',
    url: `${base}getClassify`,
	}
	return instance(config)
}

// 获取全部菜单
export function getMenuList() {
	const config = {
			method: 'get',
			url: `${base}categoriesList`
	}
	return instance(config)
}

// 提交首页修改
export function setIndexPage(data) {
	const config = {
		method: 'post',
		url: `${base}weApp`,
		data
	}
	return instance(config)
}

// 获取当前首页的值
export function getIndexVal() {
	const config = {
			method: 'get',
			url: `${base}getIndexPage`
	}
	return instance(config)
}