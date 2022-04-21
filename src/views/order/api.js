import instance from "../../utils/require";

const base = "http://localhost:3000/admin/api/"

// 查询进行中订单
export function getDoingOrder(data) {
	const config = {
    method: 'post',
    url: `${base}getUserOrder`,
    data
	}
	return instance(config)
}

// 完成订单
export function finishOrder(data) {
	const config = {
    method: 'post',
    url: `${base}changeOrder`,
    data
	}
	return instance(config)
}