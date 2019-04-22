<template>
  <div class="myDiv">
    <!-- 头部 -->
    <div class="head_box">
        <div class="head_l" @click="newManage()">新建投标邀请</div>
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
          <el-table-column prop="operation" label="查看邀请函">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="checkInvitation()">查看</el-button>
            </template>
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
    <!-- 新建挑选分包项目弹框 -->
    <div class="mask"  v-show="show"></div>
    <div class="new_pro" v-show="show">
      <div class="new_head">
        <div style="padding-left:10px;">挑选招标公告</div>
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
    <!-- 查看邀请函 -->
    <div class="mask1"  v-show="invitaShow"></div>
    <div class="new_pro" v-show="invitaShow">
        <div class="new_head">
            <div style="padding-left:10px;">查看邀请函</div>
            <div @click="closeInvitaShow()" style="font-size:28px;padding-right:10px;cursor:pointer;">×</div>
        </div>
        <div class="new_table">
          <el-table :data="tableData" stripe style="width: 100%">
            <el-table-column type="index" width="70" label="编号" :index="typeIndex">
            </el-table-column>
            <el-table-column prop="admissionNum" label="单位名称" width="120">
            </el-table-column>
            <el-table-column prop="name" label="项目负责人">
            </el-table-column>
            <el-table-column prop="tendNum" label="邀请函发出状态">
            </el-table-column>
            <el-table-column prop="purchaser" label="发出时间">
            </el-table-column>
            <el-table-column prop="mode" label="查看邀请函">
            </el-table-column>
            <el-table-column prop="mode" label="回执件">
            </el-table-column>
            <el-table-column prop="state" label="备注">
            </el-table-column>
        </el-table>
      </div>
    </div>
    <!-- 查看办理通过弹框 -->
    <div class="mask2"  v-show="passShow"></div>
    <div class="new_pro" v-show="passShow">
        <div class="new_head">
            <div style="padding-left:10px;">邀请招标录入</div>
            <div @click="closePassShow()" style="font-size:28px;padding-right:10px;cursor:pointer;">×</div>
        </div>
        <div class="new_main">
            <el-collapse v-model="activeName" accordion>
                <!-- 第一步 -->
                <el-collapse-item title="招标项目信息" name="1">
                    <div class="new_m_b">
                        <div class="new_m_b2">
                            <!--名称  -->
                            <div class="noteBox">
                                <div class="noteContent">
                                    <div class="noteLeft">招标项目名称：</div>
                                    <div class="noteFlex">
                                        <span>测试</span>
                                    </div>
                                </div>
                            </div>
                            <!--编号  -->
                            <div class="noteBox">
                                <div class="noteContent">
                                    <div class="noteLeft"><span style="color:#f00;">*</span>招标项目编号：</div>
                                    <div class="noteFlex">
                                        <span>131</span>
                                    </div>
                                    <div style="display: inline-flex;margin-left:30px;width:50%;">
                                        <span style="width:130px;"><span style="color:#f00;">*</span>招标项目预算金额:</span>
                                        <span>部门</span>
                                    </div>
                                </div>
                            </div>
                            <!-- 招标(采购)人 -->
                            <div class="noteBox">
                                <div class="noteContent">
                                    <div class="noteLeft">招标(采购)人：</div>
                                    <div class="noteFlex">
                                        <span>测试</span>
                                    </div>
                                </div>
                            </div>
                            <!-- 地址 -->
                            <div class="noteBox">
                                <div class="noteContent">
                                    <div class="noteLeft">地址：</div>
                                    <div class="noteFlex">
                                        <span>测试</span>
                                    </div>
                                </div>
                            </div>
                            <!-- 联系方式 -->
                            <div class="noteBox">
                                <div class="noteContent">
                                    <div class="noteLeft">联系方式：</div>
                                    <div class="noteFlex">
                                        <span>测试</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </el-collapse-item>
                <!-- 第二步 -->
                <el-collapse-item title="邀请函信息" name="2">
                    <div class="new_m_b">
                        <div class="new_m_b2">
                            <!--企业资质要求  -->
                            <div class="noteBox">
                                <div class="noteContent">
                                    <div class="noteLeft">企业资质要求：</div>
                                    <div class="noteFlex">
                                        <span>测试</span>
                                    </div>
                                </div>
                            </div>
                            <!--项目负责人资质要求  -->
                            <div class="noteBox">
                                <div class="noteContent">
                                    <div class="noteLeft">项目负责人资质要求：</div>
                                    <div class="noteFlex">
                                        <span>测试</span>
                                    </div>
                                </div>
                            </div>
                            <!--其他资格要求  -->
                            <div class="noteBox">
                                <div class="noteContent">
                                    <div class="noteLeft">其他资格要求：</div>
                                    <div class="noteFlex">
                                        <span>测试</span>
                                    </div>
                                </div>
                            </div>
                            <!--是否允许联合体  -->
                            <div class="noteBox">
                                <div class="noteContent">
                                    <div class="noteLeft">是否允许联合体：</div>
                                    <div class="noteFlex">
                                        <span>测试</span>
                                    </div>
                                </div>
                            </div>
                            <!-- 联合体要求 -->
                            <div class="noteBox">
                                <div class="noteContent">
                                    <div class="noteLeft">联合体要求：</div>
                                    <div class="noteFlex">
                                        <span>测试</span>
                                    </div>
                                </div>
                            </div>
                            <!-- 投标回执截止时间 -->
                            <div class="noteBox">
                                <div class="noteContent">
                                    <div class="noteLeft">投标回执截止时间：</div>
                                    <div class="noteFlex">
                                        <span>测试</span>
                                    </div>
                                </div>
                            </div>
                            <!--招标文件发售时间  -->
                            <div class="noteBox">
                                <div class="noteContent">
                                    <div class="noteLeft">招标文件发售时间：</div>
                                    <div class="noteFlex">
                                        <span>测试</span>
                                    </div>
                                </div>
                            </div>
                            <!--招标文件发售时间  -->
                            <div class="noteBox">
                                <div class="noteContent">
                                    <div class="noteLeft">招标文件发售地点：</div>
                                    <div class="noteFlex">
                                        <span>测试</span>
                                    </div>
                                </div>
                            </div>
                            <!-- 招标文件工本费 -->
                            <div class="noteBox">
                                <div class="noteContent">
                                    <div class="noteLeft">招标文件工本费：</div>
                                    <div class="noteFlex">
                                        <span>测试</span>
                                    </div>
                                </div>
                            </div>
                            <!--招标文件工本费接收账户  -->
                            <div class="noteBox">
                                <div class="noteContent">
                                    <div class="noteLeft">招标文件工本费接收账户：</div>
                                    <div class="noteFlex">
                                        <span>测试</span>
                                    </div>
                                </div>
                            </div>
                            <!--投标人需提交资料  -->
                            <div class="noteBox">
                                <div class="noteContent">
                                    <div class="noteLeft">投标人需提交资料：</div>
                                    <div class="noteFlex">
                                        <span>测试</span>
                                    </div>
                                </div>
                            </div>
                            <!--递交投标文件截止时间  -->
                            <div class="noteBox">
                                <div class="noteContent">
                                    <div class="noteLeft">递交投标文件截止时间：</div>
                                    <div class="noteFlex">
                                        <span>测试</span>
                                    </div>
                                </div>
                            </div>
                            <!-- 递交投标文件地点 -->
                            <div class="noteBox">
                                <div class="noteContent">
                                    <div class="noteLeft">递交投标文件地点：</div>
                                    <div class="noteFlex">
                                        <span>测试</span>
                                    </div>
                                </div>
                            </div>
                            <!--负责人及联系方式  -->
                            <div class="noteBox">
                                <div class="noteContent">
                                    <div class="noteLeft"><span style="color:#f00;">*</span>项目负责人：</div>
                                    <div class="noteFlex">
                                        <span>131</span>
                                    </div>
                                    <div style="display: inline-flex;margin-left:30px;width:50%;">
                                        <span style="width:130px;"><span style="color:#f00;">*</span>联系方式:</span>
                                        <span>部门</span>
                                    </div>
                                </div>
                            </div>
                            <!-- 备注 -->
                            <div class="noteBox">
                                <div class="noteContent">
                                    <div class="noteLeft">备注：</div>
                                    <div class="noteFlex">
                                        <span>测试</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </el-collapse-item>
                <!-- 第三步 -->
                <el-collapse-item title="邀请单位信息" name="3">
                    <div class="new_m_b">
                        <div class="new_m_b2">
                            <div style="display:flex;justify-content:space-between;">
                                <div>
                                    <button class="nav_co nav_save" style="cursor: pointer;">打印</button>
                                    <button class="nav_co nav_next" style="cursor: pointer;">新增邀请单位</button>
                                    <button class="nav_co nav_next" style="cursor: pointer;">发出邀请函</button>
                                </div>
                                <div>
                                    <el-radio v-model="radio" label="1">全部</el-radio>
                                    <el-radio v-model="radio" label="2">未发出</el-radio>
                                    <el-radio v-model="radio" label="3">已发出</el-radio>
                                </div>      
                            </div>  
                            <div>
                                <el-table :data="enclosureData" stripe style="width: 100%">
                                    <el-table-column type="selection" width="55" align='center'>
                                    </el-table-column>
                                    <el-table-column type="index" width="50" label="编号" :index="typeIndex">
                                    </el-table-column>
                                    <el-table-column  prop="name"  label="单位名称">
                                    </el-table-column>
                                    <el-table-column prop="list" label="项目负责人" width="100">
                                    </el-table-column>
                                    <el-table-column prop="list" label="发出时间">
                                    </el-table-column>
                                    <el-table-column prop="list" label="支付标书费"  width="100">
                                    </el-table-column>
                                    <el-table-column prop="list" label="缴纳保证金"  width="100">
                                    </el-table-column>
                                    <el-table-column prop="list" label="邀请函状态"  width="100">
                                    </el-table-column>
                                    <el-table-column prop="list" label="回执件">
                                    </el-table-column>
                                    <el-table-column prop="list" label="修改">
                                    </el-table-column>
                                    <el-table-column prop="list" label="签章">
                                    </el-table-column>
                                    <el-table-column fixed="right" label="操作" width="100">
                                    <template slot-scope="scope">
                                        <i class="el-icon-setting"  style="cursor: pointer;" ></i>
                                    </template>
                                    </el-table-column>
                                </el-table>
                            </div>
                        </div>
                    </div>
                </el-collapse-item>
                 <!-- 第四步 -->
                <el-collapse-item title="办理记录" name="4">
                    <div style="margin-top:10px;">
                        <el-table :data="enclosureData" stripe style="width: 100%">
                            <el-table-column  prop="name"  label="步骤" width="200">
                            </el-table-column>
                            <el-table-column prop="list" label="办理人员">
                            </el-table-column>
                            <el-table-column prop="list" label="时间">
                            </el-table-column>
                            <el-table-column prop="list" label="状态">
                            </el-table-column>
                            <el-table-column prop="list" label="备注">
                            </el-table-column>
                        </el-table>
                    </div>
                </el-collapse-item>
            </el-collapse>
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
      enclosureData:[],//查看未通过数据列表
      show:false,//新建项目分包弹框
      invitaShow:false,//查看邀请函
      passShow:false,//办理通过弹框
      options: [{
          value: '选项1',
          label: '未挑选'
        }, {
          value: '选项2',
          label: '已挑选'
        }],
        value1: '',
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
    //新增挑选公告弹框
    newManage(){
      this.show = !this.show;
    },
    close(){
      this.show = !this.show;
    },
    //查看邀请函
    checkInvitation(){
        this.invitaShow = !this.invitaShow;
    },
    closeInvitaShow(){
        this.invitaShow = !this.invitaShow;
    },
    //查看办理通过弹框
    look(){
        this.passShow = !this.passShow;
    },
    closePassShow(){
        this.passShow = !this.passShow;
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
.mask,.mask1,.mask2,.mask3{
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
.mask,.mask1,.mask2,.mask3{
   z-index: 2;
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