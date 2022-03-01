<template>
<div>
  <el-table
		:data="tableData"
		style="width: 100%">
		<el-table-column
			label="创建日期"
			width="180">
			<template slot-scope="scope">
				<span style="margin-left: 10px">{{ scope.row.createExtraTime }}</span>
			</template>
		</el-table-column>
		<el-table-column
			label="名称"
			width="180">
			<template slot-scope="scope">
				<span style="margin-left: 10px">{{ scope.row.extraName }}</span>
			</template>
		</el-table-column>
    	<el-table-column
			label="价格"
			width="180">
			<template slot-scope="scope">
				<span style="margin-left: 10px">￥{{ scope.row.extraPrice }}</span>
			</template>
		</el-table-column>
		<el-table-column label="操作">
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
import { getExtra, deleteExtra } from './api'
export default {
	data() {
		return {
			tableData: []
		}
	},
	methods: {
		// 编辑菜单
		handleEdit(index, row) {
			// console.log(index, row)
      this.$router.push({
        name: 'addExtra',
        query: {
          status: 0, // 状态为0表示编辑
          id: row._id
        }
      })
		},
		// 删除菜单
		async handleDelete(index, row) {
			let id = row._id
			const res = await deleteExtra(id)
      if(res.success) {
        this.$message.success('删除成功')
        this.getListData()
        return
      }
      this.$message.error('删除失败')
      // console.log(res)
		},
		// 获取列表数据
		async getListData() {
			const res = await getExtra()
      res.forEach(item => {
        item.createExtraTime = item.createExtraTime?.slice(0, 10)
      })
      this.tableData = res
      // console.log(res)
		}
	},
	created() {
		this.getListData()
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