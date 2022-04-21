<template>
	<div class="index">
		<el-container style="height: 100vh;">
			<el-aside width="200px" style="background-color: #081f3e">
				<el-menu :default-openeds="[1,2,3,4,5]" router :unique-opened="true" :default-active="$route.path">
					<el-submenu index="6">
						<template slot="title"><i class="el-icon-message"></i>首页管理</template>
						<el-menu-item-group>
							<el-menu-item index="/weAppIndex/index" >首页</el-menu-item>
							<!-- <el-menu-item index='/menuManage/addMenu'>新建菜品</el-menu-item> -->
						</el-menu-item-group>
					</el-submenu>
					<el-submenu index="1">
						<template slot="title"><i class="el-icon-message"></i>菜单管理</template>
						<el-menu-item-group>
							<el-menu-item index="/menuManage/menuList" >菜单列表</el-menu-item>
							<el-menu-item index='/menuManage/addMenu'>新建菜品</el-menu-item>
						</el-menu-item-group>
					</el-submenu>
					<el-submenu index="2">
						<template slot="title"><i class="el-icon-tickets"></i>分类管理</template>
						<el-menu-item-group>
							<el-menu-item index="/classifyManage/classify" >分类列表</el-menu-item>
							<el-menu-item index='/classifyManage/editClassify'>新建分类</el-menu-item>
							<el-menu-item index='/classifyManage/extra'>小料列表</el-menu-item>
							<el-menu-item index='/classifyManage/addExtra'>新增小料</el-menu-item>
						</el-menu-item-group>
					</el-submenu>
					<el-submenu index="3">
						<template slot="title"><i class="el-icon-s-data"></i>用户点单统计</template>
						<el-menu-item-group>
							<!-- <el-menu-item index="/" >热销分类</el-menu-item> -->
							<el-menu-item index='/statistics/statistics'>热销菜品</el-menu-item>
						</el-menu-item-group>
					</el-submenu>
					<el-submenu index="4">
						<template slot="title"><i class="el-icon-s-data"></i>订单管理</template>
						<el-menu-item-group>
							<el-menu-item index="/order/index" >处理订单</el-menu-item>
							<!-- <el-menu-item index='/'>伪完成订单</el-menu-item> -->
						</el-menu-item-group>
					</el-submenu>
					<el-submenu index="5">
						<template slot="title"><i class="el-icon-s-data"></i>管理员管理</template>
						<el-menu-item-group>
							<el-menu-item index="/manageMember/manageMember" >管理员列表</el-menu-item>
							<el-menu-item index="/manageMember/editManage" >管理员信息</el-menu-item>
						</el-menu-item-group>
					</el-submenu>
				</el-menu>
			</el-aside>
			<el-container>
				<el-header style="font-size: 18px; color: white; background: #6c8dae;">
					<div class="title">通用点单系统</div>
					<div class="user"></div>
				</el-header>
				<el-main>
					<div class="inside-box">
						<router-view></router-view>
					</div>
					<!-- <el-tabs type="border-card">
						<el-tab-pane>
							<span slot="label"><i class="el-icon-date"></i> 我的行程</span>
						</el-tab-pane>
					</el-tabs> -->
				</el-main>
			</el-container>
		</el-container>
	</div>
</template>

<script>
export default {
	data() {
		return {
			data: ''
		}
	},
	methods: {
		handleEdit(index, row) {
			console.log(index, row);
		},
		handleDelete(index, row) {
			console.log(index, row);
		},
	},

}
</script>
<style scoped lang='less'>
	.index {
		background: #e8e8e8;
		.inside-box{
			background-color: white;
			box-sizing: border-box;
			height: 600px;
			// line-height: 90vh;
			width: 85vw;
			border-radius: 5px;
			padding: 20px;
			margin: 20px auto;
		}
	}
	.el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
  .el-main {
		padding: 0;
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