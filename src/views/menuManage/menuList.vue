<template>
<div>
  <el-table
		:data="tableData"
		max-height="550"
		style="width: 100%"
		>
		<!-- <el-table-column
      type="selection"
      width="55">
		</el-table-column> -->
		<el-table-column
			label="创建日期"
			width="180">
			<template slot-scope="scope">
				<span style="margin-left: 10px">{{ scope.row.createTime }}</span>
			</template>
		</el-table-column>
		<el-table-column
			label="菜名"
			width="180">
			<template slot-scope="scope">
				<span style="margin-left: 10px">{{ scope.row.menu }}</span>
			</template>
		</el-table-column>
		<el-table-column
			label="今日推荐"
			width="180">
			<template slot-scope="scope">
				<span style="margin-left: 10px">{{ scope.row.isHot }}</span>
			</template>
		</el-table-column>
		<el-table-column
			label="所属类别"
			:filters="tableClassify"
      :filter-method="filterTag"
			width="180">
			 <!-- <template slot-scope="scope">
        <el-tag
          disable-transitions>{{scope.row.menuType}}</el-tag>
      </template> -->
			<template slot-scope="scope">
				<span style="margin-left: 10px">{{ scope.row.menuType }}</span>
			</template>
		</el-table-column>
		<el-table-column
			label="价格"
			width="180">
			<template slot-scope="scope">
				<span style="margin-left: 10px">￥{{ scope.row.price }}</span>
			</template>
		</el-table-column>
		<el-table-column
			label="描述"
			width="180">
			<template slot-scope="scope">
				<span style="margin-left: 10px">{{ scope.row.describe?scope.row.describe:'— —' }}</span>
			</template>
		</el-table-column>
		<el-table-column
			label="图片"
			width="180">
			<template slot-scope="scope">
				<img style="width:50px;height:50px;" v-imgUrl="scope.row.menuImage" alt="">
			</template>
		</el-table-column>
		<el-table-column label="操作" fixed="right" width="200">
			<template slot-scope="scope">
				<el-button
					size="mini"
					@click="handleEdit(scope.$index, scope.row)">编辑</el-button>
				<el-button
					size="mini"
					type="danger"
					@click="handleDelete(scope.$index, scope.row)">删除</el-button>
			</template>
		</el-table-column>
	</el-table>
</div>
</template>

<script>
import { getMenuList, deleteMenu, getClassify } from './api'
export default {
	data() {
		return {
			tableData: [],
			tableClassify: []
		}
	},
	methods: {
		filterTag(value, row) {
			// console.log(row)
			return row.menuType === value;
		},
		handleSelectionChange(val) {
			console.log(val);
		},
		// 编辑菜单
		handleEdit(index, row) {
			let id = row._id
			this.$router.push({
				name: 'addMenu',
				query: {
					id: id
				}
			})
		},
		// 删除菜单
		async handleDelete(index, row) {
			let id = row._id
			const data = await deleteMenu(id)
			if(data.success === true){
				this.$message({
					message: '删除成功',
					type: 'success'
				});
				this.getListData()
			} else {
				this.$message({
					message: '删除失败',
					type: 'error'
				});
			}
		},
		// 获取列表数据
		async getListData() {
			try {
				const data = await getMenuList()
				// 简单处理时间戳
				data.forEach(item => {
					item.createTime = item.createTime.substr(0, 10)
				})
				// console.log(data)
				this.tableData = data
			} catch(err) {
				console.log(err)
				this.$message({
					message: '请登录系统后再进行操作',
					type: 'error'
				});
			}
		},
		// 获取全部分类
		async getAllClassify() {
			try{
				const res = await getClassify()
				this.tableClassify = res.map(item => {
					return {text: item.classifyName, value:item.classifyName}
				})
				console.log(this.tableClassify)
			} catch(err) {

			}
		}
	},
	created() {
		this.getListData()
		this.getAllClassify()
	}
}
</script>

<style scoped lang='less'>
</style>
<style lang='less'>
	.el-table .cell{
		text-align: center;
		margin: auto;
	}
</style>