<template>
  <div class="myDiv">
    <!-- 头部 -->
    <div class="head_box">
        <div class="head_l" @click="newManage()">新建资审公告</div>
        <div>
            <el-radio v-model="radio" label="1">全部</el-radio>
            <el-radio v-model="radio" label="2">编辑中</el-radio>
            <el-radio v-model="radio" label="3">代办理</el-radio>
            <el-radio v-model="radio" label="4">办理通过</el-radio>
            <el-radio v-model="radio" label="5">办理未通过</el-radio>
        </div>    
    </div>
    <div class="head_bottom">
      <span class="head_b_b">招标项目(分包)名称：<el-input v-model="nameOfTenderProject" placeholder="请输入内容"></el-input></span>
      <span class="head_b_b">入场项目(分包)编号：<el-input v-model="totalProjectId" placeholder="请输入内容"></el-input></span>
      <span><button class="btn" @click="searchList()">搜索</button></span>
    </div>
    <!-- 主体 -->
    <div class="main_box">
        <el-table :data="tableData" stripe style="width: 100%">
          <el-table-column type="index" width="70" label="编号" :index="typeIndex">
          </el-table-column>
          <el-table-column prop="totalProjectId" label="入场(分包)编号" width="150">
          </el-table-column>
          <el-table-column prop="nameOfTenderProject" label="招标项目名称" width="120">
          </el-table-column>
          <el-table-column prop="biddingProjectNumber" label="分包名称">
          </el-table-column>
          <el-table-column prop="nameOfPurchaser" label="分包分类">
          </el-table-column>
          <el-table-column prop="state" label="状态">
          </el-table-column>
          <el-table-column prop="biddingProcurementMode" label="发布状态">
          </el-table-column>
          <el-table-column prop="biddingProcurementMode" label="公告截止时间">
          </el-table-column>
          <el-table-column prop="operation" label="操作">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="look()">查看</el-button>
            </template>
          </el-table-column>
      </el-table>
    </div>
    <div class="pagination">
      <template>
        <Page :total="totalSize" :current="PageNum" :page-size='20' show-elevator @on-change="page" v-if="pageTotal>1"></Page>
      </template>
    </div>
    <!-- 新建资审公告弹框 -->
    <div class="mask" v-show="show"></div>
    <div  class="new_pro" v-show="show">
      <div class="new_head">
        <div style="padding-left:10px;">挑选分包</div>
        <div @click="close()" style="font-size:28px;padding-right:10px;cursor:pointer;">×</div>
      </div>
      <div class="head_bottom">
        <span class="head_b_b">招标项目名称：<el-input v-model="input" placeholder="请输入内容"></el-input></span>
        <span class="head_b_b">入场项目编号：<el-input v-model="input" placeholder="请输入内容"></el-input></span>
        <span><button class="btn">搜索</button></span>
      </div>
      <div style="width:90%;margin-left:19%;margin-bottom:1%;">挑选状态：
        <el-select v-model="value1" clearable placeholder="请选择">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </div> 
      <!-- 新增主体表格 -->
      <div class="new_table">
          <el-table :data="tableData" stripe style="width: 100%">
            <el-table-column type="selection" width="55" align='center'>
            </el-table-column>
            <el-table-column type="index" width="70" label="编号" :index="typeIndex">
            </el-table-column>
            <el-table-column prop="admissionNum" label="入场项目编号" width="120">
            </el-table-column>
            <el-table-column prop="name" label="招标项目名称">
            </el-table-column>
            <el-table-column prop="tendNum" label="分包名称">
            </el-table-column>
            <el-table-column prop="purchaser" label="分包分类">
            </el-table-column>
            <el-table-column prop="mode" label="招标方式">
            </el-table-column>
            <el-table-column prop="mode" label="分包控制金额(万元)">
            </el-table-column>
            <el-table-column prop="state" label="分包状态">
            </el-table-column>
        </el-table>
      </div>
      <div style="width:100%;text-align:center;position:fixed;left:0;bottom:10px;">
        <el-button type="primary">确定选择</el-button>
      </div>
    </div>
    <!-- 点击确定选——-新增资审公告弹框上一步 -->
    <div class="mask1" v-show="nextShow"></div>
    <div  class="new_pro new_pro_top" v-show="nextShow">
      <div class="new_head">
          <div style="padding-left:10px;">新增资审公告</div>
          <div @click="closeNextShow1()" style="font-size:28px;padding-right:10px;cursor:pointer;">×</div>
      </div>
      <div class="new_nav">
          <button class="nav_co nav_save">保存</button>
          <button class="nav_co nav_next" @click="nextTo()">下一步</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components:{},
  props:{},
  data(){
    return {
      totalId:"",//搜索编号
      nameProject:"",//搜索分包名称
      totalProjectId:"",//入场项目编号
      nameOfTenderProject:"",//招标项目名称
      biddingProjectNumber:"",//招标项目编号
      nameOfPurchaser:"",//招标采购人
      biddingProcurementMode:"",//招标采购方式
      state:"",//状态
      radio: "1", //头部单选框
      input: "", //头部输入框
      activeName: '1',//弹框折叠效果
      PageNum:1,//当前页
      PageSize: 20, //每页条数
      pageTotal: 0, //总页数
      totalSize: 0, //总条数
      tableData:[
        {
            totalProjectId: '2016-05-02',
            nameOfTenderProject: '王小虎',
            biddingProjectNumber: '上海市普陀',
            nameOfPurchaser:'分类',
            state:'未通过',
            biddingProcurementMode:'未发布',
            biddingProcurementMode:'2019年3月1日'
          }
      ],//列表数据
      show:false,//新建资审公告弹框
      nextShow:true,//上一步弹框
      enclosureData:[],//查看未通过数据列表
      options: [{
          value: '选项1',
          label: '未挑选'
        }, {
          value: '选项2',
          label: '已挑选'
        }],
      value1:'',
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
    //新建资审公告弹框打开
    newManage(){
      this.show = !this.show;
    },
    close(){
      this.show = !this.show;
    }
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
.head_box {
  width: 100%;
  height: 35px;
  line-height: 35px;
  display: flex;
  justify-content: space-between;
  background: #ffffff;
  padding: 0 3px;
}
.head_l {
  padding: 2px 6px;
  background-color: #0095d5;
  color: #ffffff;
  cursor: pointer;
}
.head_bottom {
  width: 100%;
  text-align: center;
  margin: 1% 0;
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
  cursor: pointer;
}
.mask,.mask1{
  position: fixed;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: #333;
  opacity: 0.3;
  overflow: hidden;
  outline: 0;
  -webkit-overflow-scrolling: touch;
  background-color: rgb(0, 0, 0);
  filter: alpha(opacity=60);
  background-color: rgba(0, 0, 0, 0.6);
}
.mask{
   z-index: 2;
}
.mask1{
  z-index: 4;
}
/* 新建项目 */
.new_pro {
  z-index: 3;
  background: #f0f4f6;
  width: 100%;
  height: 98%;
  position: absolute;
  left: 10%;
  top: 10%;
  transform: translate(-10%, -10%);
  overflow-y: hidden;
}
.new_pro_top{
  z-index: 5;
}
.new_head {
  width: 100%;
  height: 35px;
  line-height: 35px;
  background-color: #0058a9;
  color: #ffffff;
  display: flex;
  justify-content: space-between;
  font-size: 16px;
}
.nav_co {
  padding: 8px 20px;
  background-color: #0095d5;
  border: none;
  color: #ffffff;
  font-size: 16px;
  margin-bottom: 10px;
  cursor: pointer;
}
/* 查看 */
.new_main {
  width: 1000px;
  height: 100%;
  margin: 0 auto;
  overflow-y: scroll;
}
.new_m_one {
    width: 100%;
}

.new_m_t {
  width: 98%;
  height: 40px;
  line-height: 40px;
  background: #d1d1d1;
  font-size: 20px;
  display: flex;
  justify-content: space-between;
   padding:0 10px;
}
.new_m_b{
    width: 100%;
    height: auto;
    padding-bottom: 10px;
    background: #ffffff;
}
.new_m_b2{
  width: 90%;
  margin:0 auto;
}
.noteBox {
  height: 40px;
  line-height: 40px;
  color: #333;
}
.noteBox .noteContent {
		display: flex;
		width: 100%;
}
	
.noteContent .noteLeft {
  display: inline-block;
}

.noteContent .noteFlex {
  flex: 1;
  flex-direction: column;
  display: inline-block;
}
.new_m_two{
  margin:10px 0;
}
.fail_box{
  width:100%;
  margin:0 auto;
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  border-bottom: 1px dashed #333;
}
</style>