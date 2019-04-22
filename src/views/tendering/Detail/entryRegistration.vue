<template>
    <div class="pageWrap">
        <div v-show="passJudgeShow">
            <!-- 项目入场登记 -->
            <div class="box"></div>
            <el-collapse v-model="activeName" accordion>
                <!--立项基本信息 -->
                <el-collapse-item title="立项基本信息" name="1">
                    <ul class="contentBox">
                        <li>
                            <p>批复项目名称：<span>{{approvalProjectName}}</span></p>
                        </li>
                        <li>
                            <p>批复文号：<span>{{approvalNumber}}</span></p>
                            <p>批复核准部门：<span>{{approvalAndApprovalDepartment}}</span></p>
                        </li> 
                        <li>
                            <p>监督部门: <span>{{supervisionDepartment}}</span></p>	
                            <p>审核部门：<span>{{auditDepartment}}</span></p>
                        </li> 
                        <li>
                            <p>项目所在地：<span>{{projectLocation}}</span></p>
                            <p>审批权限：<span>{{approvalJurisdiction}}</span></p>
                        </li>
                        <li>
                            <p>是否涉密：<span>{{isItConfidential}}</span></p>
                        </li>
                        <li>
                            <p>工程性质：<span>{{engineeringProperties}}</span></p>
                            <p>是否为政府和社会资本合作PPP类项目: <span>{{projectType}}</span> </p>
                        </li>
                        <li>
                            <p>资金来源：<span>{{sourceOfFunds}}</span></p>
                            <p>项目资金总额：<span>{{totalProjectFunds}}</span></p>
                        </li>
                    </ul>
                    <div class="contentLast">
                        <div class="noteBox">
                            <div class="noteContent">
                                <div class="noteLeft" style="width:220px;">资金比例：</div>
                                <div class="noteFlex">
                                    <span class="guoyou"><span>国有资金：<span>{{stateOwnedFunds}}</span>万元,<span>{{stateOwnedFundsPercentage}}</span>%;</span></span>
                                    <span class="ziyou"><span>自有资金：<span>{{ownFunds}}</span>万元,<span>{{ownFundsPercentage}}</span>%;</span></span>
                                    <span class="waiguo"><span>外国政府及组织资金：<span>{{foreignGovernmentsAndOrganizationalFunds}}</span>万元,<span>{{foreignGovernmentsAndOrganizationalFundsPercentage}}</span>%;</span></span>
                                    <span class="jingwai"><span>境外人投资：<span>{{overseasPrivateInvestment}}</span>万元,<span>{{overseasPrivateInvestmentPercentage}}</span>%;</span></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </el-collapse-item>
                <!-- 附件 -->
                <el-collapse-item title="附件" name="2">
                    <div class="new_m_b">
                        <div class="new_m_b2">
                            <el-table :data="enclosureData" stripe style="width: 100%">
                                <el-table-column prop="appendixName" label="附件名称" width="150">
                                </el-table-column>
                                <el-table-column label="附件列表(点击查看)" prop="attachlist">
                                </el-table-column>
                            </el-table>
                        </div>
                    </div>
                </el-collapse-item>
                <!-- 项目基本信息 -->
                <el-collapse-item title="项目基本信息" name="3">
                    <ul class="contentBox">
                        <li>
                            <p>项目审批文件名称：<span>{{projectApprovalDocumentsName}}</span></p>
                            <p>北京投资项目统一代码：<span>{{investmentProjectsUnifiedCode}}</span></p>
                        </li> 
                        <li>
                            <p>项目法人： <span>{{projectLegalPerson}}</span></p>	
                            <p>项目法人代码：<span>{{projectLegalPersonCode}}</span></p>
                        </li> 
                        <li>
                            <p>项目行业分类：<span>{{projectIndustryClassification}}</span></p>
                        </li>
                        <li>
                            <p>项目规模：<span>{{projectScale}}</span></p>
                            <p>项目建立时间：<span>{{projectEstablishmentTime}}</span></p>
                        </li>
                        <li>
                            <p>联系人：<span>{{contacts}}</span></p>
                            <p>联系方式： <span>{{contactInformation}}</span> </p>
                        </li>
                    </ul>
                </el-collapse-item>
                <!-- 项目预算信息 -->
                <el-collapse-item title="项目预算信息" name="4">
                    <ul class="contentBox">
                        <li>
                            <p>项目名称：<span>{{entryName}}</span></p>
                        </li> 
                        <li>
                            <p>预算项目批准备案文号： <span>{{budgetProjectApprovalRecordNumber}}</span></p>	
                            <p>预算受文单位：<span>{{budgetRecipientUnit}}</span></p>
                        </li> 
                        <li>
                            <p>预算受文单位代码：<span>{{budgetRecipientUnitCode}}</span></p>
                            <p>预算金额：<span>{{budgetAmount}}</span></p>
                        </li>
                        <li>
                            <p>采购人名称：<span>{{nameOfPurchaser}}</span></p>
                            <p>采购人代码：<span>{{purchaserCode}}</span></p>
                        </li>
                    </ul>
                </el-collapse-item>
                <!--招标项目信息 -->
                <el-collapse-item title="招标项目信息" name="5">
                    <ul class="contentBox">
                        <li>
                            <h6>项目编号(赋码)：<b>{{itemNumberAssignment}}</b></h6>
                        </li> 
                        <li>
                            <p>入场项目编号： <span>{{totalProjectId}}</span></p>
                        </li> 
                        <li>
                            <p>招标项目名称：<span>{{nameOfTenderProject}}</span></p>
                        </li>
                        <li>
                            <p>招标项目编号：<span>{{biddingProjectNumber}}</span></p>
                            <p>招标项目金额(万元)：<span>{{amountOfBiddingProject}}</span></p>
                        </li>
                        <li>
                            <p>招标采购方式：<span>{{biddingProcurementMode}}</span></p>
                            <p>招标组织方式：<span>{{biddingOrganization}}</span></p>
                        </li>
                        <li>
                            <p>专业类别：<span>{{professionalCategory}}</span></p>
                            <p>招标项目类型：<span>{{typesOfBiddingProjects}}</span></p>
                        </li>
                        <li>
                            <p>是否公布预算：<span>{{whetherAnnounceBudget}}</span></p>
                            <p>是否分包：<span>{{isSubcontracting}}</span></p>
                        </li>
                    </ul>
                </el-collapse-item>
                <!-- 办理记录 -->
                <el-collapse-item title="办理记录" name="6">
                    <el-table :data="handleRecordData" style="width: 100%">
                        <el-table-column prop="step" label="步骤"  width="180">
                        </el-table-column>
                        <el-table-column  prop="handlingPersonnel" label="办理人员" width="180">
                        </el-table-column>
                        <el-table-column prop="creationTime" label="时间">
                        </el-table-column>
                        <el-table-column prop="state" label="状态">
                        </el-table-column>
                        <el-table-column prop="remarks" label="备注">
                        </el-table-column>
                    </el-table>
                </el-collapse-item>
            </el-collapse>
        </div>
        <div v-show="!passJudgeShow">
            <el-dialog
                title="系统提示"
                :visible.sync="dialogVisible"
                width="40%"
                :before-close="handleClose">
                <div class="icon">
                    <i class="el-icon-warning"></i>
                    <span>尚未发提交通过，无法进行项目入场登记操作!</span>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="surePass()">确 定</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import '../../../assets/css/style.css'
    import baseUrl from '../../../api/api'
    import dayjs from "dayjs";
    export default {
        data(){
            return {
                passJudgeShow:true,//判断
                dialogVisible:false,//判断是否进行入场登记操作
                projectObj:JSON.parse(window.localStorage.projectObj),
                activeName:'1',
                currentPage:1,//当前页
                pagesize: 8, //每页条数
                pageTotal: 0, //总页数
                totalSize: 0, //总条数
                enclosureData:[ //新建项目
                    {
                        appendixName: "立项批复文件",
                        attachlist: ""
                    },
                    {
                        appendixName: " 项目负责人授权书",
                        attachlist: ""
                    }
                ],
                approvalProjectName:'',//批复项目名称
                approvalNumber:'',//批复文号
                approvalAndApprovalDepartment:'',//批复核准部门
                supervisionDepartment:"",//监督部门
                auditDepartment:'',//审核部门
                projectLocation:'',//项目所在地
                approvalJurisdiction:'',//审批权限
                isItConfidential:'',//是否涉密
                engineeringProperties:'',//工程性质
                projectType:'',//是否为政府和社会资本类项目
                sourceOfFunds:'',//资金来源
                totalProjectFunds:'',//项目资金总额
                stateOwnedFunds:'',//国有资金
                stateOwnedFundsPercentage:'',//国有资金百分比
                ownFunds:'',//自有资金
                ownFundsPercentage:'',//自有资金百分比
                foreignGovernmentsAndOrganizationalFunds:'',//外国政府资金
                foreignGovernmentsAndOrganizationalFundsPercentage:'',//外国政府资金百分比
                overseasPrivateInvestment:'',//境外人投资
                overseasPrivateInvestmentPercentage:'',//境外人投资百分比
                projectApprovalDocumentsName:'',//项目审批文件名称
                investmentProjectsUnifiedCode:'',//北京投资项目统一代码
                projectLegalPerson:'',//项目法人
                projectLegalPersonCode:'',//项目法人代码
                projectIndustryClassification:'',//项目行业分类
                projectScale:'',//项目规模
                projectEstablishmentTime:"",//项目建立时间
                contacts:'',//联系人
                contactInformation:'',//联系方式
                entryName:'',//项目名称
                budgetProjectApprovalRecordNumber:'',//预算项目批准备案文号
                budgetRecipientUnit:'',//预算受文单位
                budgetRecipientUnitCode:'',//预算受文单位代码
                budgetAmount:'',//预算金额
                nameOfPurchaser:'',//采购人名称
                purchaserCode:'',//采购人代码
                itemNumberAssignment:'',//项目编号赋码
                totalProjectId:'',//入场项目编号
                nameOfTenderProject:'',//招标项目名称
                biddingProjectNumber:'',//招标项目编号
                amountOfBiddingProject:'',//招标项目金额
                biddingProcurementMode:'',//招标采购方式
                biddingOrganization:'',//招标组织方式
                professionalCategory:'',//专业类别
                typesOfBiddingProjects:'',//招标项目类型
                whetherAnnounceBudget:'',//是否公布预算
                isSubcontracting:'',//是否分包
                handleRecordData:[],//办理记录列表
            }
        },
        methods:{
            // 招标项目信息
            getbiddingInfo(){
                this.$axios({
                    method: "GET",
                    url: baseUrl+"/projectInformationController/selectById/"+this.projectObj.projectInformaPrimaryKeyId,
                }).then(res=>{
                    if(res.data.status == 200){
                        this.approvalProjectName = res.data.data.approvalProjectName,//批复项目名称
                        this.approvalNumber = res.data.data.approvalNumber,//批复项目编号
                        this.approvalAndApprovalDepartment = res.data.data.approvalAndApprovalDepartment,//批复核准部门
                        this.supervisionDepartment = res.data.data.supervisionDepartment,//监督部门
                        this.auditDepartment = res.data.data.auditDepartment;//审核部门
                        this.projectLocation = res.data.data.projectLocation;//项目所在地
                        this.approvalJurisdiction = res.data.data.approvalJurisdiction;//审批权限
                        this.isItConfidential = res.data.data.isItConfidential;//是否涉密
                        this.engineeringProperties = res.data.data.engineeringProperties;//工程性质
                        this.projectType = res.data.data.projectType;//项目类型
                        this.totalProjectFunds = res.data.data.totalProjectFunds;//项目资金总额
                        this.projectApprovalDocumentsName = res.data.data.projectApprovalDocumentsName;//项目审批文件名称
                        this.investmentProjectsUnifiedCode = res.data.data.investmentProjectsUnifiedCode;//北京投资项目统一代码
                        this.projectLegalPerson = res.data.data.projectLegalPerson;//项目法人
                        this.projectLegalPersonCode = res.data.data.projectLegalPersonCode;//项目法人代码
                        this.projectIndustryClassification = res.data.data.projectIndustryClassification;//项目行业分类
                        this.projectScale = res.data.data.projectScale;//项目规模
                        if(res.data.data.projectEstablishmentTime == null){
                            this.projectEstablishmentTime = ''
                        }else{
                            this.projectEstablishmentTime = dayjs(res.data.data.projectEstablishmentTime).format('YYYY-MM-DD')//项目建立时间
                        }
                        this.entryName = res.data.data.entryName;//项目名称
                        this.budgetProjectApprovalRecordNumber = res.data.data.budgetProjectApprovalRecordNumber;//预受项目批准备案文号
                        this.budgetRecipientUnit = res.data.data.budgetRecipientUnit;//预算受文单位
                        this.budgetRecipientUnitCode = res.data.data.budgetRecipientUnitCode;//预算受文单位代码
                        this.purchaserCode = res.data.data.purchaserCode;//采购人代码
                        this.professionalCategory = res.data.data.professionalCategory;//专业类别
                        this.whetherAnnounceBudget = res.data.data.whetherAnnounceBudget;//是否公布预算
                        this.isSubcontracting = res.data.data.isSubcontracting;//是否公布预算
                        this.itemNumberAssignment = res.data.data.itemNumberAssignment;//项目编号赋码
                        this.nameOfTenderProject = res.data.data.nameOfTenderProject;// 招标项目名称
                        this.biddingProjectNumber = res.data.data.biddingProjectNumber;// 招标项目编号
                        this.totalProId = res.data.data.totalProjectId;//入场项目编号
                        this.amountOfBiddingProject = res.data.data.amountOfBiddingProject;// 招标项目金额 
                        this.nameOfPurchaser = res.data.data.nameOfPurchaser;// 招标(采购)人
                        this.tenderContents = res.data.data.tenderContents;// 招标内容
                        this.budgetAmount = res.data.data.budgetAmount;//招标项目预算金额
                        this.contactInformation = res.data.data.contactInformation//联系方式
                        this.contacts = res.data.data.contacts//联系人
                        this.subcontractingControlAmount = res.data.data.subcontractingControlAmount//分包控制金额
                        this.biddingOrganization = res.data.data.biddingOrganization,//招标组织方式
                        this.biddingProcurementMode = res.data.data.biddingProcurementMode,//招标采购方式
                        this.typesOfBiddingProjects = res.data.data.typesOfBiddingProjects,//招标项目类型
                        this.sourceOfFunds =res.data.data.sourceOfFunds//资金来源
                        if(res.data.data.stateOwnedFunds != null){//国有资金
                            this.stateOwnedFunds = res.data.data.stateOwnedFunds;
                            this.stateOwnedFundsPercentage = res.data.data.stateOwnedFundsPercentage;
                        }else{
                            $('.guoyou').hide();
                        };
                        if(res.data.data.ownFunds != null){//自有资金
                            this.ownFunds = res.data.data.ownFunds;
                            this.ownFundsPercentage = res.data.data.ownFundsPercentage;
                        }else{
                            $('.ziyou').hide();
                        };
                        if(res.data.data.foreignGovernmentsAndOrganizationalFunds != null){//外国政府及组织
                            this.foreignGovernmentsAndOrganizationalFunds = res.data.data.foreignGovernmentsAndOrganizationalFunds;
                            this.foreignGovernmentsAndOrganizationalFundsPercentage = res.data.data.foreignGovernmentsAndOrganizationalFundsPercentage;
                        }else{
                            $('.waiguo').hide();
                        };
                        if(res.data.data.overseasPrivateInvestment != null){//境外投资
                            this.overseasPrivateInvestment = res.data.data.overseasPrivateInvestment;
                            this.overseasPrivateInvestmentPercentage= res.data.data.overseasPrivateInvestmentPercentage;
                        }else{
                            $('.jingwai').hide();
                        }
                    }else{
                        console.log(res.data.msg);
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
                                this.passJudgeShow = !this.passJudgeShow;
                            }else{
                                this.passJudgeShow = true;
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
                this.dialogVisible = false;
            },
            //办理记录查询
            getRecordList(){
                this.$axios({
                    method:'POST',
                    url:baseUrl + '/subcontractItemController/selectHistory',
                    data:{
                        entrySubcontractNumber:this.projectObj.totalProjectId
                    }
                }).then(res=>{
                    if(res.data.status == 200){
                    this.handleRecordData = res.data.data
                    this.handleRecordData.map((item,index)=>{
                        item.creationTime = dayjs(item.creationTime.format('YYYY-MM-DD'))
                    })
                    }else{
                        console.log(res.data.msg)
                    }
                }).catch(err=>{
                    console.log(err)
                })
            }
        },
        created(){
            this.getbiddingInfo();
            this.getRecordList();
            // this.getDecideList();
        }
    }
</script>

<style scoped>
.box{
    width: 100%;
    height: 35px;
    background: #d3d7d4;
}
.el-collapse{
    width: 90%;
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
.contentLast{
    display: flex;
    padding: 0 30px;
    line-height: 30px;
}
.last_box{
    flex: 1;
}
.last_content{
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.money{
    flex: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
h6,b{
    color:red;
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
</style>