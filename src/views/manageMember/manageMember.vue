<template>
<div>
  <el-table
		:data="tableData"
		style="width: 100%">
		<el-table-column
			label="创建日期"
			width="180">
			<template slot-scope="scope">
				<span style="margin-left: 10px">{{ scope.row.userCreateTime }}</span>
			</template>
		</el-table-column>
		<el-table-column
			label="管理员昵称"
			width="180">
			<template slot-scope="scope">
				<span style="margin-left: 10px">{{ scope.row.userName }}</span>
			</template>
		</el-table-column>
    <el-table-column
			label="管理员微信号"
			width="180">
			<template slot-scope="scope">
				<span style="margin-left: 10px">{{ scope.row.weChatNumBer ? scope.row.weChatNumBer : '— —' }}</span>
			</template>
		</el-table-column>
    <el-table-column
			label="管理员邮箱"
			width="180">
			<template slot-scope="scope">
				<span style="margin-left: 10px">{{ scope.row.userEmail }}</span>
			</template>
		</el-table-column>
		<el-table-column label="操作">
			<template slot-scope="scope">
				<el-button
					size="mini"
					@click="handleEdit(scope.$index, scope.row)">忘记密码</el-button>
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
import { getAdmin,deleteAdmin } from './api'
export default {
	data() {
		return {
			tableData: [
        {
          _id:"621c7c215a8d484d2f8e34a5",
          createClassifyTime:"2022-02-28",
          classifyName:"饮料",
        }
      ]
		}
	},
	methods: {
		// 编辑菜单
		handleEdit(index, row) {
			// console.log(index, row)
			this.$router.push({
				name: 'editManage',
				query: {
					id: row._id
				}
			})
		},
		// 删除管理员
		async handleDelete(index, row) {
			let id = row._id
			const res = await deleteAdmin(id)
      if(res.success) {
        this.$message.success('删除成功')
        this.getListData()
        return
      }
      this.$message.error('删除失败')
      // console.log(res)
		},
		// 获取管理员数据
		async getListData() {
			const res = await getAdmin()
      res.code == 0 && res.model.forEach(item => {
        item.userCreateTime = item.userCreateTime.slice(0, 10)
      })
      this.tableData = res.model
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