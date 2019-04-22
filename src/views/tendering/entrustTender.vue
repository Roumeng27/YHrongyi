<template>
	<div class="myDiv">
		<div class="head_bottom">
			<span class="head_b_b">招标项目(分包)名称：<el-input v-model="input" placeholder="请输入内容"></el-input></span>
			<span class="head_b_b">入场项目(分包)编号：<el-input v-model="input" placeholder="请输入内容"></el-input></span>
			<span><button class="btn">搜索</button></span>
      	</div>
      	<!-- 主体 -->
		<div class="main_box">
			<el-table  stripe style="width: 100%">
				<el-table-column type="index" width="70" label="编号" :index="typeIndex"></el-table-column>
				<el-table-column label="入场项目(分包)编号" width="180"></el-table-column>
				<el-table-column  label="招标项目名称" width="180"></el-table-column>
				<el-table-column  label="招标项目编号"></el-table-column>
				<el-table-column  label="分包名称"></el-table-column>
				<el-table-column  label="查看"></el-table-column>
				<el-table-column  label="操作">
					<template slot-scope="scope">
						<el-button type="text" size="small">查看</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
        <div class="pagination">
			<template>
				<Page :total="totalSize" :current="PageNum" :page-size='20' show-elevator @on-change="page" v-if="pageTotal>1"></Page>
			</template>
      	</div>
	</div>
</template>

<script>
export default {
	components:{},
	props:{},
	data(){
		return {
			input: "", //头部输入框
			activeName: '1',//弹框折叠效果
			PageNum:1,//当前页
			PageSize: 20, //每页条数
			pageTotal: 0, //总页数
			totalSize: 0, //总条数
			tableData: [ ],//列表数据
		}
	},
	watch:{},
	computed:{},
	methods:{
		//编号问题
		typeIndex(index) {
			return index + (this.PageNum - 1) * 20 + 1;
		},
		//分页
		page(val) {
			this.PageNum = val;
		},
	},
	created(){},
	mounted(){}
}
</script>
<style scoped>
	.myDiv {
	width: 100%;
	height: 100%;
	}
	.head_bottom {
	width: 100%;
	text-align: center;
	margin: 2% 0;
	background: #f5f7fa;
	}
	.head_b_b > .el-input {
	width: 20% !important;
	height: 35px !important;
	}
	.btn {
		margin-left: 2%;
		padding: 8px 14px;
		background: #0095d5;
		color: #ffffff;
		border: none;
		border-radius: 3px;
	}
</style>