<template>
    <div class="newBox">
        <div v-show="passJudgeShow">
            <!-- 项目分包 -->
            <div class="Wrapper" v-show="writeFlag">
                <el-collapse v-model="activeName" accordion>
                    <!--招标项目信息 -->
                    <el-collapse-item title="招标项目信息" name="1">
                        <ul class="contentBox">
                        <li>
                            <h6>项目编号(赋码)：<b>S110000A001013214</b></h6>
                        </li>
                        <li>
                            <h6>招标项目编号(赋码)：<b>	S110000A001013214003</b></h6>
                        </li>
                        <li>
                            <p>招标项目名称：<span>{{nameOfTenderProject}}</span></p>
                        </li>
                        <li>
                            <p>招标项目编号：<span>{{biddingProjectNumber}}</span></p>
                            <p>入场项目编号：<span>{{amountId}}</span></p>
                        </li> 
                        <li>
                            <p>招标项目金额： <span>{{amountOfBiddingProject}}万元</span></p>	
                            <p>招标项目类型：<span>{{typesOfBiddingProjects}}</span></p>
                        </li> 
                        <li>
                            <p>招标采购方式：<span>{{biddingProcurementMode}}</span></p>
                            <p>招标组织方式：<span>{{biddingOrganization}}</span></p>
                        </li>
                        </ul>
                    </el-collapse-item>
                    <!-- 附件 -->
                    <el-collapse-item title="附件" name="2">
                        <el-table :data="enclosureData" stripe style="width: 100%">
                                <el-table-column  prop="name"  label="附件名称" width="200">
                                </el-table-column>
                                <el-table-column prop="list" label="附件列表(点击查看)">
                                </el-table-column>
                                <el-table-column fixed="right" label="操作" width="100">
                                <template slot-scope="scope">
                                    <i class="el-icon-setting"  style="cursor: pointer;"></i>
                                </template>
                                </el-table-column>
                        </el-table>
                    </el-collapse-item>
                    <!-- 分包信息 -->
                    <el-collapse-item title="分包信息" name="3">
                        <el-table
                            ref="multipleTable"
                            :data="subpackageData"
                            style="width: 100%">
                            <el-table-column
                                label="序号"
                                width="120"
                            >
                                <template slot-scope="scope">{{scope.$index+1}}</template>
                            </el-table-column>
                            <el-table-column
                                prop="entrySubcontractNumber"
                                label="入场项目(分包)编号">
                            </el-table-column>
                            <el-table-column
                                prop="subcontractName"
                                label="分包名称"
                                show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column
                                prop="subcontractingControlAmount"
                                label="分包控制金额(万元)"
                                show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column
                                prop="projectSubcontractCreationTime"
                                label="创建时间"
                                show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column fixed="right" label="查看" width="100">
                                <template slot-scope="scope">
                                    <i class="el-icon-search"  style="cursor: pointer;" @click="lookoverItem(scope.row)"></i>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-collapse-item>
                    <!-- 相关分包信息 -->
                    <el-collapse-item title="相关分包信息" name="4">
                        <el-table
                            ref="multipleTable"
                            :data="aboutList"
                            style="width: 100%"
                            >
                            <el-table-column
                                label="序号"
                                width="120"
                            >
                                <template slot-scope="scope">{{scope.$index+1}}</template>
                            </el-table-column>
                            <el-table-column
                                prop="entrySubcontractNumber"
                                label="入场项目(分包)编号">
                            </el-table-column>
                            <el-table-column
                                prop="subcontractName"
                                label="分包名称"
                                show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column
                                prop="subcontractingControlAmount"
                                label="分包控制金额(万元)"
                                show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column
                                prop="projectSubcontractCreationTime"
                                label="创建时间"
                                show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column fixed="right" label="查看" width="100">
                                <template slot-scope="scope">
                                    <i class="el-icon-search"  style="cursor: pointer;" @click="lookoverItem(scope.row)"></i>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-collapse-item>
                    <!-- 办理记录 -->
                    <el-collapse-item title="办理记录" name="5">
                        <el-table :data="manageDate" stripe style="width: 100%">
                            <el-table-column  prop="step"  label="步骤">
                            </el-table-column>
                            <el-table-column  prop="handlingPersonnel"  label="办理人员">
                            </el-table-column>
                            <el-table-column  prop="creationTime"  label="时间">
                            </el-table-column>
                            <el-table-column  prop="state"  label="状态">
                            </el-table-column>
                            <el-table-column  prop="remarks"  label="备注">
                            </el-table-column>
                        </el-table>
                    </el-collapse-item>
                </el-collapse>
            </div>
            <!-- 查看详情 -->
            <div class="lookWrapper" v-show="lookFlag">
                <div class="lookBox">
                    <div class="pick_title">
                        <p>分包信息</p>
                        <i class="el-icon-close" @click="closeLook"></i>
                    </div>
                    <el-collapse v-model="searchName" accordion>
                        <!--招标项目信息 -->
                        <el-collapse-item title="招标项目信息" name="1">
                            <div class="edit_list">
                                <ul class="contentBox">
                                    <li>
                                        <p>招标项目名称：<span>{{nameOfTenderProject}}</span></p>
                                        <p>招标项目编号<span>{{biddingProjectNumber}}</span></p>
                                    </li>
                                    <li>
                                        <p>招标(采购)人：<span>{{nameOfPurchaser}}</span></p>
                                        <p>招标(采购)代理机构：<span></span></p>
                                    </li>
                                    <li>
                                        <p>入场项目编号：<span>{{amountId}}</span></p>
                                    </li>
                                </ul>
                            </div>
                        </el-collapse-item>
                        <!--分包信息 -->
                        <el-collapse-item title="分包信息" name="2">
                            <div class="edit_list">
                                <ul class="contentBox">
                                    <li class="notic">
                                        <p>标段包编号(赋码)：<span></span></p>
                                    </li>
                                    <li class="notic">
                                        <p>统一交易标志码：<span></span></p>
                                    </li>
                                    <li>
                                        <p>入场项目分包编号：<span>{{entrySubcontractNumber}}</span></p>
                                    </li>
                                    <li>
                                        <p>分包名称：<span>{{subcontractName}}</span></p>
                                    </li>
                                    <li>
                                        <p>分包内容：<span>{{subcontractContents}}</span></p>
                                    </li>
                                    <li>
                                        <p>招标范围：<span>{{scopeOfTender}}</span></p>
                                    </li>
                                    <li>
                                        <p>分包控制金额：<span>{{subcontractingControlAmount}} <b style="color:#000;">万元</b> </span></p>
                                        <p>资格审查方式：<span>{{qualificationExaminationMethod}} </span></p>
                                    </li>
                                    <li>
                                        <p>是否电子招投标：<span>{{electronicBidEvaluation}}</span></p>
                                    </li>
                                </ul>
                            </div>
                        </el-collapse-item>
                    </el-collapse>
                </div>
            </div>
        </div>
        <!-- 判断弹框 -->
        <div v-show="frameShow">
            <el-dialog
                title="系统提示"
                :visible.sync="frameShow"
                width="40%"
                :before-close="handleClose">
                <div class="icon">
                    <i class="el-icon-warning"></i>
                    <span>尚未发提交通过，无法进行项目分包操作!</span>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="handleClose()">确 定</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
    
</template>

<script>
import baseUrl from '../../../api/api.js'
import '../../../assets/css/style.css'
import {formatDate,isEmpty,formatTime} from '../../../api/base.js'
export default {
    data(){
        return {
            dialogVisible:false,
            frameShow:false,
            passJudgeShow:true,//判断弹框
            activeName:['1','2','3','4','5','6'],// 主页面 卡片
            searchName:['1','2'],// 查看详情页面 卡片
            projectObj:JSON.parse(window.localStorage.projectObj),
            // 分页所需字段
            currentPage:1,// 当前页
            pageSize: 10, // 每页条数
            // 招标项目信息所需字段
            nameOfTenderProject:'',// 招标项目名称
            biddingProjectNumber:'',// 招标项目编号
            nameOfPurchaser:'',// 招标(采购)人
			budgetAmount:'',// 招标项目预算金额
			amountOfBiddingProject:'',//招标项目金额
			biddingProcurementMode:'',// 招标采购方式
			biddingOrganization:'',// 招标组织方式
            typesOfBiddingProjects:'',// 招标项目类型
            amountId:'',// 总包 入场项目编号
            entrySubcontractNumber:'',//分包  入场项目编号
            // 分包信息所需字段
            subpackageData:[],
            // 相关分包信息所需字段
            aboutList:[],// 列表
            // 办理记录
            manageDate:[],
            creationTime:'',// 时间
            enclosureData:[ //新建项目
                {
                    name: " 项目负责人授权书",
                    list: "王小虎"
                }
            ],
            // 展示页面所需字段
            writeFlag:true,
            entrySubcontractNumber:'',// 入场项目分包编号
            subcontractName:'',// 分包名称
            subcontractContents:'',// 分包内容
            scopeOfTender:'',// 招标范围
			subcontractingControlAmount:'',// 分包控制金额
			qualificationExaminationMethod:'',// 资格审查方式	
			electronicBidEvaluation:'',// 是否电子招投标
            // 查看详情所需字段
            lookFlag:false,

        }
    },
    created(){
        // this.getDecideList();
        this.getbiddingInfo();// 招标项目信息
        this.getlookOverInfo();// 分包信息
        this.getAboutInfo();// 相关分包信息
        this.getmanageInfo();// 办理记录
    },
    methods:{// 查看详情
        lookoverItem(row){
            this.getbiddingInfo();
            this.lookFlag = true
            this.entrySubcontractNumber = row.entrySubcontractNumber;// 入场项目分包编号
            this.subcontractName = row.subcontractName;// 分包名称
            this.subcontractContents = row.subcontractContents;// 分包内容
            this.scopeOfTender = row.scopeOfTender;// 招标范围
            this.subcontractingControlAmount = row.subcontractingControlAmount;// 分包控制金额
            this.qualificationExaminationMethod = row.qualificationExaminationMethod;// 资格审查方式
            this.electronicBidEvaluation = row.electronicBidEvaluation;// 资格审查方式		
        },
        // 关闭查看详情
        closeLook(){
            this.lookFlag = false
        },
        // 招标项目信息
        getbiddingInfo(){
            this.$axios({
                method: "GET",
                url: baseUrl+"/projectInformationController/selectById/"+this.projectObj.projectInformaPrimaryKeyId,
            }).then(res=>{
                if(res.data.status == 200){
                    this.nameOfTenderProject = res.data.data.nameOfTenderProject;// 招标项目名称
                    this.biddingProjectNumber = res.data.data.biddingProjectNumber;// 招标项目编号
					this.amountOfBiddingProject = res.data.data.amountOfBiddingProject;// 招标项目金额
					this.biddingProcurementMode = res.data.data.biddingProcurementMode;// 招标采购方式
					this.biddingOrganization = res.data.data.biddingOrganization;// 招标组织方式
					this.typesOfBiddingProjects = res.data.data.typesOfBiddingProjects;// 招标项目类型
					this.nameOfPurchaser = res.data.data.nameOfPurchaser;// 招标(采购)人
                    this.budgetAmount = res.data.data.budgetAmount;// 招标项目预算金额 
					this.amountId = res.data.data.totalProjectId;// 总包 入场项目编号
                }else{
                    this.$layer.msg(res.data.msg);
                }
            }).catch(err=>{
                console.log(err);
            })
        },
        // 分包信息
        getlookOverInfo(){
            let lookArr = [];
            lookArr.push(this.projectObj.totalProjectId)
            this.$axios({
				method: "POST",
				url: baseUrl+"/projectInformationController/selectByProjectEntrySubcontractNumber",
				data:{
					projectEntrySubcontractNumbers:lookArr
				}
			}).then(res=>{
				if(res.data.status == 200){
                    this.subpackageData = res.data.data;// 项目分包列表
                    console.log(this.subpackageData,'===')
                    this.subpackageData.forEach((item,index) => {
                        //  过滤时间格式
                        item.projectSubcontractCreationTime = formatDate(item.projectSubcontractCreationTime)
                    });
				}else{
					this.$layer.msg(res.data.msg);
				}
			}).catch(err=>{
				console.log(err)
			})
        },
        // 相关分包信息
        getAboutInfo(){
            this.$axios({
				method: "POST",
				url: baseUrl+"/subcontractItemController/selectList",
				data:{
                    totalProjectId:this.projectObj.totalProjectId.split('-')[0],// 入场项目（分包）编号
					pageNo:this.currentPage,
					pageSize:this.pageSize
				}
			}).then(res=>{
				if(res.data.status == 200){
                    this.aboutList = res.data.data.list;// 项目分包列表
                    this.aboutList.forEach((item,index) => {
                        //  过滤时间格式
                        item.projectSubcontractCreationTime = formatDate(item.projectSubcontractCreationTime)
                    });
				}else{
					this.$layer.msg(res.data.msg);
				}
			}).catch(err=>{
				console.log(err)
			})
        },
         // 办理记录
        getmanageInfo(){
            this.$axios({
                method: "POST",
                url: baseUrl+"/subcontractItemController/selectHistory",
                data:{
                    entrySubcontractNumber:this.projectObj.totalProjectId
                }
            }).then(res=>{
                if(res.data.status == 200){
                    this.manageDate = res.data.data;
                    this.manageDate.forEach(item => {
                        item.creationTime = formatDate(item.creationTime)
                    });
                }else{
                    this.$layer.msg(res.data.msg);
                }
            }).catch(err=>{
                console.log(err)
            })
        },
        //判断是否可以跳转下一个界面
        getDecideList(){
            this.$axios({
                method:'POST',
                url:baseUrl + '/interfaceTableController/selfTendering',
                data:{
                    dropDownBox:'自行招标',
                    projectEntrySubcontractNumbers:this.projectObj.totalProjectId
                }
            }).then(res=>{
                if(res.data.status == 200){
                    res.data.data.data.map((item,index)=>{
                        if(item.value == "项目入场登记" && item.state == "办理通过"){
                            this.passJudgeShow = true;
                            this.frameShow = false;
                        }else{
                            this.frameShow = true;
                            this.passJudgeShow = false;
                        }
                    })
                }else{
                    this.$layer.msg(res.data.msg)
                }
            }).catch(err=>{
                console.log(err)
            })
        },
        handleClose(){
            this.frameShow = false;
        }
    }
}
</script>

<style scoped>
.newBox{
    width: 100%;
    height: 100%;
    background: #fff;
    position: relative;
}
.wrapper,.nextWrapper{
    width: 100%;
    height: 100%;
}
/* 检索页面 */
.pickWrapper,.searchWrapper,.lookWrapper,.winWrapper{
    width: 100%;
    height: 100%;
    position: fixed;
    left: 185px;
    top: 0;
    background: rgba(0, 0, 0, .3);
    z-index: 99;
    padding: 50px;
	
}
.pickBox,.searchBox,.lookBox,.winBox{
    width: 90%;
    height: 100%;
    background: #fff;
    position: relative;
	overflow: hidden;
	overflow-y: scroll;
}
.pick_title,.search_title{
    width: 100%;
    height: 35px;
    padding: 0 20px;
    background: #0058a9;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #fff;
    font-size: 18px;
}
.el-icon-close{
    font-size: 24px; 
}
.search_input,.search_input{
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 10px 50px;
}
.write{
    display: flex;
    align-items: center;
}
.write p{
    width: 220px;
}
.pick_btn {
    position: absolute;
    left: 0;
    top: 500px;
    bottom: 0;
    right: 0;
    margin: auto;
    width: 100px;
    height: 40px;
}
.btn{
    height: 100%;
    padding:0 25px;
    background-color: #0095d5;
    border: none;
    color: #ffffff;
    font-size: 16px;
    cursor: pointer;
    margin-right: 2px;
}


.box{
    width: 100%;
    height: 40px;
    background: #e2e2e2;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 0 30px 0 2px;
}
.btn{
    height: 100%;
    padding:0 25px;
    background-color: #0095d5;
    border: none;
    color: #ffffff;
    font-size: 16px;
    cursor: pointer;
    margin-right: 2px;
}
.el-collapse{
    width: 80%;
    margin: 10px auto;
}
.contentBox{
    display: flex;
    flex-direction: column;
    padding: 0 30px;
}
.contentBox li{
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    line-height: 30px;
}
.contentBox li p{
    color: #333;
}
.contentBox li span{
    color:#6e622e;
}
.btn{
    padding: 10px;
}
.notic,h6,b{
    color:red;
}
/* 清空信息 */
.clear{
    display: flex;
    justify-content: flex-end;
    margin-bottom: 5px;
}
/* 输入框 */
.noteBox{
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items:center;
    padding: 4px 0;
}
.noteItem{
    display: flex;
    align-items: center;
}
.noteItem p{
    padding:  0 5px;
}
.noteLeft{
    width: 130px;
    display: flex;
    justify-content: center;
    text-align: center;
}
.star{
    color: red;
    padding-right: 5px;
}
.write_input{
    width: 250px;
}
.write_textarea{
    width: 890px !important;;
}
.write_item{
    width: 800px !important;;
}
.write_info {
    width: 550px;
}
.edit_list{
    padding: 0 50px;
}

.infobox{
    width: 100%;
    padding: 0 40px;
}
.infobox_title{
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    line-height: 50px;
    border-bottom: 1px dotted #7F7F7F;
}
.infobox_title span{
    font-size: 20px;
}
.infobox_title h1{
    font-size: 22px;
    font-weight: normal;
}
.infobox_title p{
    font-size: 12px;
}
.infobox_main{
    width: 100%;
    display: flex;
    flex-direction: column
}
.infobox_item{
    padding: 10px 0 10px 0;
}
.note_box{
    display: flex;
    line-height: 26px;
}
.note_box p{
    width: 200px;
}
.infobox_footer{
    width: 100%;
    text-align: end;
}
/* 弹窗 */
.icon{
    width: 100%;
    padding: 0 10px;
    display: flex;
    align-items: center;
    z-index: 9999;
}
.el-icon-success,.el-icon-warning{
    font-size: 100px;
    color: #0a5e9d;
}
.icon span{
    padding: 0 10px;
    font-size: 20px;
}
.dialog_header{
    width: 100%;
    height: 40px;
    display: flex;
    justify-content: space-between;
    align-items:center;
}
.dialog_header p span{
    color: red;
}
.item_title{
	line-height: 30px;
	font-weight: bold;
	padding: 0 10px;
}
.el-icon-plus{
	font-size: 26px;
}

</style>