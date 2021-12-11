import instance from "../../utils/require";

const base = "http://localhost:3000/admin/api/"

// 提交菜单
export function setMenuItem(data) {
    const config = {
        method: 'post',
        url: `${base}addCategories`,
        data
    }
    return instance(config)
}

// 删除菜单
export function deleteMenu(id, data) {
    const config = {
        method: 'delete',
        url: `${base}addCategories/${id}`,
        data
    }
    return instance(config)
}

// 编辑菜单
export function editMenuItem(id, data) {
    const config = {
        method: 'put',
        url: `${base}addCategories/${id}`,
        data
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

// 获取菜单
export function getAMenu(id) {
    const config = {
        method: 'get',
        url: `${base}categoriesList/${id}`
    }
    return instance(config)
}