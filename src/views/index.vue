<template>
	<div class="">
		<el-container style="border: 1px solid #eee; height: 100vh;">
			<el-aside width="200px" style="background-color: rgb(238, 241, 246)">
				<el-menu :default-openeds="['1']" router>
					<el-submenu index="1">
						<template slot="title"><i class="el-icon-message"></i>菜单管理</template>
						<el-menu-item-group>
							<!-- <template slot="title">分组一</template> -->
							<el-menu-item index="/menuManage/menuList" >菜单列表</el-menu-item>
							<el-menu-item index='/menuManage/addMenu'>新建菜品</el-menu-item>
						</el-menu-item-group>
					</el-submenu>
					
				</el-menu>
			</el-aside>
			
			<el-container>
				<el-header style="font-size: 18px; color: white; background: skyblue;">
					<span>点单管理系统</span>
				</el-header>
				
				<el-main>
					<!-- <el-table
						:data="tableData"
						style="width: 100%">
						<el-table-column
							label="提交日期"
							width="180">
							<template slot-scope="scope">
								<span style="margin-left: 10px">{{ scope.row.date }}</span>
							</template>
						</el-table-column>
						<el-table-column
							label="菜名"
							width="180">
							<template slot-scope="scope">
								<span style="margin-left: 10px">{{ scope.row.name }}</span>
							</template>
						</el-table-column>
						<el-table-column
							label="所属类别"
							width="180">
							<template slot-scope="scope">
								<span style="margin-left: 10px">{{ scope.row.category }}</span>
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
					</el-table> -->
					<router-view></router-view>
				</el-main>
			</el-container>
		</el-container>
	</div>
</template>

<script>
export default {
	data() {
		return {
			// tableData: [
			// 	{
			// 		date: '2016-05-02',
			// 		name: '可乐',
			// 		address: '上海市普陀区金沙江路 1518 弄',
			// 		category: '饮料'
			// 	}
			// ]
		}
	},
	methods: {
		handleEdit(index, row) {
			console.log(index, row);
		},
		handleDelete(index, row) {
			console.log(index, row);
		}
	}
}
</script>
<style scoped lang='less'>
	
	.el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
  
  .el-aside {
    color: #333;
  }
</style>

// <style lang='less'>
// 	.el-table .cell{
// 		text-align: center;
// 		margin: auto;
// 	}
// </style>