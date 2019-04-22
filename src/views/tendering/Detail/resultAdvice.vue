<template>
    <div class="myDiv">
        <div  v-show="passJudgeShow" style="height:100%;overflow:hidden;">
            <div v-show="transactShow">
                <div class="div_box">
                    <div class="box">
                        <button class="btn" @click="saveInfo()">保存信息</button>
                        <button class="btn" @click="confirmEnd()">确认通知完毕</button>
                    </div>
                    <div class="new_main">
                        <el-collapse v-model="activeName" accordion>
                            <!--招标项目信息 -->
                            <el-collapse-item title="招标项目信息" name="1">
                                <div class="new_m_b">
                                    <div class="new_m_b2">
                                        <!--名称  -->
                                        <div class="noteBox">
                                            <div class="noteContent">
                                            <div class="noteLeft">招标项目名称：</div>
                                            <div class="noteFlex">
                                                <span>{{nameOfTenderProject}}</span>
                                            </div>
                                            </div>
                                        </div>
                                        <!-- 采购人及金额 -->
                                        <div class="noteBox">
                                            <div class="noteContent">
                                            <div class="noteLeft">招标(采购)人：</div>
                                            <div class="noteFlex">
                                                <span>{{nameOfPurchaser}}</span>
                                            </div>
                                            <div style="display: inline-flex;margin-left:30px;width:50%;">
                                                <span style="width:130px;">招标项目金额(万元)：</span>
                                                <span>{{amountOfBiddingProject}}</span>
                                            </div>
                                            </div>
                                        </div>
                                        <!-- 招标及入场编号 -->
                                        <div class="noteBox">
                                            <div class="noteContent">
                                            <div class="noteLeft">招标项目编号：</div>
                                            <div class="noteFlex">
                                                <span>{{biddingProjectNumber}}</span>
                                            </div>
                                            <div style="display: inline-flex;margin-left:30px;width:50%;">
                                                <span style="width:100px;">入场项目编号：</span>
                                                <span>{{totalProId}}</span>
                                            </div>
                                            </div>
                                        </div>
                                        <!-- 表格 -->
                                        <div class="table_box"  v-if="projectObj.totalProjectId.indexOf('-') > -1">
                                            <el-table :data="enclosureData" stripe style="width: 100%">
                                                <el-table-column  type="index"  label="序号" :index="typeIndex" width="70">
                                                </el-table-column>
                                                <el-table-column  prop="entrySubcontractNumber"  label="入场项目(分包)编号" width="200">
                                                </el-table-column>
                                                <el-table-column  prop="subcontractName"  label="分包名称">
                                                </el-table-column>
                                                <el-table-column  prop="subcontractingControlAmount"  label="分包控制金额(万元)">
                                                </el-table-column>
                                                <el-table-column prop="operation" label="查看">
                                                    <template slot-scope="scope">
                                                        <i class="el-icon-search" style="font-size:22px;cursor:pointer;" @click="lookFile(scope.row)"></i>
                                                    </template>
                                                </el-table-column>
                                            </el-table>
                                        </div>
                                    </div>
                                </div>
                            </el-collapse-item>
                            <!--通知书信息 -->
                            <el-collapse-item title="通知书信息" name="2">
                                <!-- 招标文件发售时间 -->
                                <div class="noteBox">
                                    <div class="noteContent">
                                        <div class="noteLeft" style="width:130px;"><span style="color:#f00;">*</span>招标文件发售时间：</div>
                                        <div class="noteTime">
                                            <div class="timeBox">
                                                <el-date-picker v-model="tenderTime" type="daterange"  range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
                                                </el-date-picker>
                                            </div>
                                        </div>
                                        <div style="display: inline-flex;margin-left:5px;">
                                            <span style="width:40px;">上午</span>
                                            <div class="noteTime">
                                                <div class="timeBox">
                                                    <el-time-select  placeholder="开始时间" v-model="morningbegin" :picker-options="{start: '08:00',step: '00:30',end: '17:30'}">
                                                    </el-time-select>
                                                </div>
                                                <span>-</span>
                                                <div class="timeBox">
                                                    <el-time-select  placeholder="结束时间" v-model="morningend" :picker-options="{start: '08:00',step: '00:30',end: '17:30'}">
                                                    </el-time-select>
                                                </div>
                                            </div>
                                            <span style="width:40px;">下午</span>
                                            <div class="noteTime">
                                                <div class="timeBox">
                                                    <el-time-select  placeholder="开始时间" v-model="afterbegin" :picker-options="{start: '08:00', step: '00:30', end: '17:30'}">
                                                    </el-time-select>
                                                </div>
                                                <span>-</span>
                                                <div class="timeBox">
                                                    <el-time-select  placeholder="结束时间" v-model="afterend" :picker-options="{start: '08:00',step: '00:30',end: '17:30'}">
                                                    </el-time-select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <!--招标文件发售地点  -->
                                <div class="noteBox">
                                    <div class="noteContent">
                                        <div class="noteLeft">招标文件发售地点：</div>
                                        <div class="noteFlex">
                                        <el-input v-model="venueBiddingDocuments" clearable></el-input>
                                        </div>
                                    </div>
                                </div>
                                <!-- 招标文件工本费 -->
                                <div class="noteBox">
                                    <div class="noteContent">
                                        <div class="noteLeft"><span style="color:#f00;">*</span>招标文件工本费：</div>
                                        <div class="noteline">
                                            <p>人民币</p>
                                            <div class="moneyBox">
                                                <el-input v-model="costBiddingDocuments" clearable></el-input>
                                            </div>
                                            <p>元</p>
                                        </div>
                                    </div>
                                </div>
                                <!-- 工本费接收账户 -->
                                <div class="noteBox">
                                    <div class="noteContent">
                                        <div class="noteLeft">工本费接收账户：</div>
                                        <div class="noteFlex">
                                            <el-input v-model="costBiddingDocumentsAccount" clearable></el-input>
                                        </div>
                                        <div style="display: inline-flex;margin-left:30px;">
                                            <el-button>设置账户</el-button>
                                        </div>
                                    </div>
                                </div>
                                <!-- 递交截止时间 -->
                                <div class="noteBox">
                                    <div class="noteContent">
                                        <div class="noteLeft"><span style="color:#f00;">*</span>递交投标文件截止时间：</div>
                                        <div class="noteFlex">
                                        <el-date-picker v-model="submissionDocumentsEndTime" type="datetime"  placeholder="选择日期时间">
                                        </el-date-picker>
                                        </div>
                                    </div>
                                </div>
                                <!--递交投标文件地点  -->
                                <div class="noteBox">
                                    <div class="noteContent">
                                        <div class="noteLeft">递交投标文件地点：</div>
                                        <div class="noteFlex">
                                            <el-input v-model="submissionTenderDocuments"></el-input>
                                        </div>
                                    </div>
                                </div>
                                <!--负责人和联系方式  -->
                                <div class="noteBox">
                                    <div class="noteContent">
                                        <div class="noteLeft">项目负责人：</div>
                                        <div class="noteFlex">
                                            <el-input v-model="projectLeader" clearable></el-input>
                                        </div>
                                        <div style="display: inline-flex;margin-left:30px;width:50%;">
                                            <span style="width:130px;">联系方式:</span>
                                            <el-input v-model="contactInformation" clearable></el-input>
                                        </div>
                                    </div>
                                </div>
                                <!-- 备注 -->
                                <div class="noteBox" style="margin-bottom:10px;">
                                    <div class="noteContent">
                                        <div class="noteLeft">备注：</div>
                                        <div class="noteFlex">
                                            <el-input v-model="remarks" clearable></el-input>
                                        </div>
                                    </div>
                                </div>
                            </el-collapse-item>
                            <!--资审通过通知书 -->
                            <el-collapse-item title="资审通过通知书" name="3">
                                <div>
                                    <button class="btn" style="margin-top:10px;" @click="sendNotice()">发送通知书</button>
                                    <div style="color:#f00;">注：对任一单位的资审通过通知书/资审结果通知书签章后，会自动对其他单位的资审通过通知书/资审结果通知书进行自动批量签章。</div>
                                    <el-table :data="passBookData" stripe style="width: 100%" @selection-change="handleSelectionChange">
                                        <el-table-column type="selection" width="55" align='center'>
                                        </el-table-column>
                                        <el-table-column  type="index"  label="序号" :index="typeIndex" width="70">
                                        </el-table-column>
                                        <el-table-column  prop="unitName"  label="单位名称">
                                        </el-table-column>
                                        <el-table-column  prop="noticeIssueUnitName"  label="项目负责人">
                                        </el-table-column>
                                        <el-table-column  prop="issueTime"  label="发出时间">
                                        </el-table-column>
                                        <el-table-column  prop="auditResults"  label="资审结果">
                                        </el-table-column>
                                        <el-table-column label="通知书状态">
                                            <template slot-scope="scope">
                                                <span>{{noticeStatus}}</span>
                                            </template>
                                        </el-table-column>
                                    </el-table>
                                </div>
                            </el-collapse-item>
                            <!--资审结果通知书 -->
                            <el-collapse-item title="资审结果通知书" name="4">
                                <div>
                                    <button class="btn" style="margin:10px;"  @click="sendNotice()">发送通知书</button>
                                    <el-table :data="auditResultData" stripe style="width: 100%" @selection-change="handleSelectionChange">
                                        <el-table-column type="selection" width="55" align='center'>
                                        </el-table-column>
                                        <el-table-column  type="index"  label="序号" :index="typeIndex" width="70">
                                        </el-table-column>
                                        <el-table-column  prop="unitName"  label="单位名称">
                                        </el-table-column>
                                        <el-table-column  prop="noticeIssueUnitName"  label="项目负责人">
                                        </el-table-column>
                                        <el-table-column  prop="issueTime"  label="发出时间">
                                        </el-table-column>
                                        <el-table-column  prop="auditResults"  label="资审结果">
                                        </el-table-column>
                                        <el-table-column label="通知书状态">
                                            <template slot-scope="scope">
                                                <span>{{noticeStatus}}</span>
                                            </template>
                                        </el-table-column>
                                    </el-table>
                                </div>
                            </el-collapse-item>
                        </el-collapse>
                    </div>
                </div>
                <!-- 查看分包信息弹框 -->
                <div v-show="subcontractInforShow" class="fb_box">
                    <div class="new_head">
                        <div style="padding-left:10px;">分包信息</div>
                        <div @click="closeSubShow()" style="font-size:28px;padding-right:10px;cursor:pointer;">×</div>
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
                                                <span>{{nameOfTenderProject}}</span>
                                            </div>
                                            </div>
                                        </div>
                                        <!-- 采购人 -->
                                        <div class="noteBox">
                                            <div class="noteContent">
                                            <div class="noteLeft">招标(采购)人：</div>
                                            <div class="noteFlex">
                                                <span>{{nameOfPurchaser}}</span>
                                            </div>
                                            </div>
                                        </div>
                                        <!-- 招标及入场编号 -->
                                        <div class="noteBox">
                                            <div class="noteContent">
                                            <div class="noteLeft">招标项目编号：</div>
                                            <div class="noteFlex">
                                                <span>{{biddingProjectNumber}}</span>
                                            </div>
                                            <div style="display: inline-flex;margin-left:30px;width:50%;">
                                                <span style="width:100px;">入场项目编号：</span>
                                                <span>{{totalProId}}</span>
                                            </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </el-collapse-item>
                            <!-- 第二步 -->
                            <el-collapse-item title="分包信息" name="2">
                                <div class="new_m_b">
                                    <div class="new_m_b2">
                                        <!-- 标段包编号(赋码) -->
                                        <div class="noteBox">
                                            <div class="noteContent">
                                            <div class="noteLeft" style="color:#f00;">标段包编号(赋码)：</div>
                                            <div class="noteFlex">
                                                <span  style="color:#f00;"></span>
                                            </div>
                                            </div>
                                        </div>
                                        <!--统一交易标志码  -->
                                        <div class="noteBox">
                                            <div class="noteContent">
                                            <div class="noteLeft" style="color:#f00;">统一交易标志码：</div>
                                            <div class="noteFlex">
                                                <span  style="color:#f00;"></span>
                                            </div>
                                            </div>
                                        </div>
                                        <!--入场项目分包编号  -->
                                        <div class="noteBox">
                                            <div class="noteContent">
                                            <div class="noteLeft">入场项目分包编号：</div>
                                            <div class="noteFlex">
                                                <span>{{entrySubcontractNumber}}</span>
                                            </div>
                                            </div>
                                        </div>
                                        <!-- 分包名称 -->
                                        <div class="noteBox">
                                            <div class="noteContent">
                                            <div class="noteLeft">分包名称：</div>
                                            <div class="noteFlex">
                                                <span>{{subcontractName}}</span>
                                            </div>
                                            </div>
                                        </div>
                                        <!-- 分包内容 -->
                                        <div class="noteBox">
                                            <div class="noteContent">
                                            <div class="noteLeft">分包内容：</div>
                                            <div class="noteFlex">
                                                <span>{{subcontractContents}}</span>
                                            </div>
                                            </div>
                                        </div>
                                        <!-- 招标范围 -->
                                        <div class="noteBox">
                                            <div class="noteContent">
                                            <div class="noteLeft">招标范围：</div>
                                            <div class="noteFlex">
                                                <span>{{scopeOfTender}}</span>
                                            </div>
                                            </div>
                                        </div>
                                        <!--分包控制金额及审查方式  -->
                                        <div class="noteBox">
                                            <div class="noteContent">
                                            <div class="noteLeft">分包控制金额：</div>
                                            <div class="noteFlex">
                                                <span>{{subcontractingControlAmount}}</span>
                                            </div>
                                            <div style="display: inline-flex;margin-left:30px;width:50%;">
                                                <span style="width:100px;">资格审查方式：</span>
                                                <span>{{qualificationExaminationMethod}}</span>
                                            </div>
                                            </div>
                                        </div>
                                        <!--电子化开评标  -->
                                        <div class="noteBox">
                                            <div class="noteContent">
                                            <div class="noteLeft">电子化开评标：</div>
                                            <div class="noteFlex">
                                                <span>{{electronicBidEvaluation}}</span>
                                            </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </el-collapse-item>
                        </el-collapse>
                    </div>
                </div>
                <!-- 确认保存弹窗 -->
                <el-dialog
                    title="执行成功"
                    :visible.sync="saveBox"
                    width="40%"
                    :before-close="handleClose">
                    <div class="icon">
                        <i class="el-icon-success"></i>
                        <span>保存成功！</span>
                    </div>
                    <span slot="footer" class="dialog-footer">
                        <el-button type="primary" @click="sureSave()">确 定</el-button>
                    </span>
                </el-dialog>
                <!-- 点击确认通知完毕 -->
                <el-dialog
                    title="警告信息"
                    :visible.sync="failDiologShow"
                    width="40%"
                    :before-close="handleClose">
                    <div class="icon">
                        <i class="el-icon-warning"></i>
                        <span>尚有单位未发出通知书！</span>
                    </div>
                    <span slot="footer" class="dialog-footer">
                        <el-button type="primary" @click="failSave()">确 定</el-button>
                    </span>
                </el-dialog>
            </div>
            <div v-show="deliverShow"> 
                <div class="pass_box">
                    <el-table :data="tableData" stripe style="width: 100%">
                        <el-table-column type="index" width="70" label="序号" :index="typeIndex">
                        </el-table-column>
                        <el-table-column prop="unitName" label="单位名称" width="210">
                        </el-table-column>
                        <el-table-column prop="noticeIssueUnitName" label="联系人" >
                        </el-table-column>
                        <el-table-column prop="auditResults" label="是否通过资审">
                        </el-table-column>
                        <el-table-column prop="noticeStatus" label="通知书发送状态">
                        </el-table-column>
                        <el-table-column prop="join" label="是否参加">
                        </el-table-column>
                        <el-table-column prop="noticeIssueUnitName" label="项目负责人">
                        </el-table-column>
                    </el-table>
                </div>
            </div>
        </div>
        <div v-show="frameShow">
            <el-dialog
                title="系统提示"
                :visible.sync="frameShow"
                width="40%"
                :before-close="handleClose">
                <div class="icon">
                    <i class="el-icon-warning"></i>
                    <span>尚未完成资审申请结果，无法发送资格预审通知书!</span>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="handleClose()">确 定</el-button>
                </span>
            </el-dialog>
        </div>
  </div>
</template>

<script>
import '../../../assets/css/style.css'
import baseUrl from '../../../api/api'
import dayjs from "dayjs"
export default {
  components:{},
  props:{},
  data(){
    return {
        zhuangtai:'',
        deliverShow:false,
        tableData:[],
        failDiologShow:false,
        noticeStatus:'',
        carIdArr:[],
        prequalificaId:'',
        transactShow:true,
        frameShow:false,
        passJudgeShow:true,
        value:'',
        projectObj:JSON.parse(window.localStorage.projectObj),
        activeName:'2',
        nameOfTenderProject:'',//招标项目名称
        nameOfPurchaser:'',//招标采购人
        amountOfBiddingProject:'',//招标项目金额
        biddingProjectNumber:'',//招标项目编号
        totalProId:'',//入场项目编号
        enclosureData:[],//招标项目信息--表格数据
        currentPage:1,
        passBookData:[],//资审通过通知书数据
        auditResultData:[],//资审结果通知书数据
        entrySubcontractNumber:'',//入场项目分包编号
        subcontractName:'',//分包名称
        subcontractContents:'',//分包内容
        scopeOfTender:'',//招标范围
        subcontractingControlAmount:'',//分包控制金额
        qualificationExaminationMethod:'',//资格审查方式
        electronicBidEvaluation:'',//电子化开评标
        subcontractInforShow:false,//查看分包表格
        saveBox:false,//提交弹框
        tenderTime:'',//招标发售时间
        tenderOfferStartTime:'',//招标文件发售开始时间
        tenderOfferEndTime:'',//招标文件发售结束时间
        morningbegin:'',//上午开始时间
        morningend:'',//上午结束时间
        afterbegin:'',//下午开始时间
        afterend:'',//下午结束时间
        sellingTimeMorning:'',//发售时间上午
        sellingTimeAfternoon:'',//发售时间下午
        venueBiddingDocuments:'',//招标文件发售地点
        costBiddingDocuments:'',//招标文件工本费
        costBiddingDocumentsAccount:'',//工本费账户
        submissionDocumentsEndTime:'',//递交文件截止时间
        submissionTenderDocuments:'',//递交投标文件地点
        projectLeader:'',//项目负责人
        contactInformation:'',//联系方式
        remarks:'',//备注
    }
  },
  watch:{},
  computed:{},
  methods:{
        // 招标项目信息
        getbiddingInfo(){
            this.$axios({
                method: "GET",
                url: baseUrl+"/projectInformationController/selectById/"+this.projectObj.projectInformaPrimaryKeyId,
            }).then(res=>{
                if(res.data.status == 200){
                    this.nameOfTenderProject = res.data.data.nameOfTenderProject;// 招标项目名称
                    this.biddingProjectNumber = res.data.data.biddingProjectNumber;// 招标项目编号
                    this.totalProId = res.data.data.totalProjectId;//入场项目编号
                    this.amountOfBiddingProject = res.data.data.amountOfBiddingProject;// 招标项目金额 
                    this.nameOfPurchaser = res.data.data.nameOfPurchaser;// 招标(采购)人
                    this.tenderContents = res.data.data.tenderContents;// 招标内容
                }else{
                    console.log(res.data.msg);
                }
            }).catch(err=>{
                console.log(err)
            })
        },
        //招标项目信息--》表格分包
        getsubList(){
            if(this.projectObj.totalProjectId.indexOf("-") != -1){
                //分包
                this.EntrySubNum = this.projectObj.totalProjectId;
                // this.EntrySubNum = "R190301ZG0002-04";
            }else{
                $('.table_box').hide();
            }
            let lookArr = [];
            lookArr.push(this.EntrySubNum)
            this.$axios({
                method: "POST",
                url: baseUrl+"/projectInformationController/selectByProjectEntrySubcontractNumber",
                data:{
                    projectEntrySubcontractNumbers:lookArr
                }
            }).then(res=>{
                if(res.data.status == 200){
                    this.enclosureData = res.data.data;
                }else{
                    console.log(res.data.msg);
                }
            }).catch(err=>{
                console.log(err)
            })
        },
        //查询-判断
        getJudgeList(){
            let obj = {};
            if(this.projectObj.totalProjectId.indexOf("-") != -1){
                //分包
                obj={
                    entrySubcontractNumber:this.projectObj.totalProjectId
                }
               
            }else{
                 obj={
                    projectCode:this.projectObj.totalProjectId
                }
            }
            this.$axios({
                method:'POST',
                url:baseUrl + '/CapitalNotController/select/public',
                data:obj
            }).then(res=>{
                if(res.data.status == 200){
                    this.prequalificaId = res.data.data[0].prequalificaId;
                    this.zhuangtai = res.data.data[0].state;
                    if(res.data.data.length == 0 || this.zhuangtai != "办理通过"){
                        this.transactShow = true;
                        this.deliverShow = false;
                    }else if(this.zhuangtai == "办理通过"){
                        this.deliverShow = true;
                        this.transactShow = false;
                    }
                }
            }).catch(err=>{
                console.log(err)
            })
        },
        //资审通过通知书与资审结果通知书
        getAuditPassList(){
            let obj = {};
            if(this.projectObj.totalProjectId.indexOf("-") != -1){
                //分包
                if(this.zhuangtai  == "办理通过"){
                    obj={
                        entrySubcontractNumber:'R190301WG0033-06',
                        noticeStatus:'已发送'
                    }
                }else{
                     obj={
                        entrySubcontractNumber:'R190301WG0033-06',
                    }
                }
            }else{
                if(this.zhuangtai == "办理通过"){
                    obj={
                        projectCode:this.projectObj.totalProjectId,
                        noticeStatus:'已发送'
                    }
                }else{
                    obj={
                        projectCode:this.projectObj.totalProjectId
                    }
                }
                
            }
            this.$axios({
                method:'POST',
                url:baseUrl + '/CapitalNotController/select/notice',
                data:obj
            }).then(res=>{
                if(res.data.status == 200){
                    this.tableData = res.data.data;
                    res.data.data.map((item,index)=>{
                        if(item.issueTime == null){
                            item.issueTime = ""
                        }else{
                            item.issueTime = dayjs(item.issueTime).format('YYYY-MM-DD');
                        };
                        this.noticeStatus = item.noticeStatus;
                        if(item.auditResults == "通过"){
                            this.passBookData.push(item);
                        }else if(item.auditResults == "不通过"){
                            this.auditResultData.push(item);
                        }
                    })
                }else{
                    this.$layer.msg(res.data.msg);
                }
            }).catch(err=>{
                console.log(err)
            })
        },
        //编号问题
        typeIndex(index) {
            return index + (this.currentPage - 1) * 10 + 1;
        },
        //点击查看表格分包
        lookFile(row){
            this.subcontractInforShow = true;
            this.getbiddingInfo();
            this.entrySubcontractNumber = row.entrySubcontractNumber;// 入场项目分包编号
            this.subcontractName = row.subcontractName;// 分包名称 
            this.subcontractContents = row.subcontractContents;// 分包内容
            this.scopeOfTender = row.scopeOfTender;// 招标范围
            this.subcontractingControlAmount = row.subcontractingControlAmount;// 分包控制金额    
            this.qualificationExaminationMethod = row.projectInformationVo.qualificationExaminationMethod;// 资格审查方式 
            this.electronicBidEvaluation = row.projectInformationVo.electronicBidEvaluation;// 是否电子招投标
        },
        closeSubShow(){
            this.subcontractInforShow = false;
            this.addInforShow = false;
        },
        //保存信息
        saveInfo(){
            this.saveBox = true;
        },
        sureSave(){
            // 上午发售时间
            let morningArr = [];
            morningArr.push(this.morningbegin,this.morningend)
            this.sellingTimeMorning = morningArr.toString()
            // 下午发售时间
            let afterArr = [];
            afterArr.push(this.afterbegin,this.afterend)
            this.sellingTimeAfternoon = afterArr.toString()
            //招标文件发售时间
            this.tenderOfferStartTime = this.tenderTime[0];
            this.tenderOfferEndTime = this.tenderTime[1];
            let object={}
            if(this.projectObj.totalProjectId.indexOf("-") != -1 && this.projectObj.totalProjectId!=null){
                // 入场项目分包编号
                object={
                    entrySubcontractNumber:this.projectObj.totalProjectId,
                    tenderOfferStartTime:this.tenderOfferStartTime,
                    tenderOfferEndTime:this.tenderOfferEndTime,
                    sellingTimeMorning:this.sellingTimeMorning,
                    sellingTimeAfternoon:this.sellingTimeAfternoon,
                    venueBiddingDocuments:this.venueBiddingDocuments,
                    costBiddingDocuments:this.costBiddingDocuments,
                    costBiddingDocumentsAccount:this.costBiddingDocumentsAccount,
                    submissionDocumentsEndTime:this.submissionDocumentsEndTime,
                    submissionTenderDocuments:this.submissionTenderDocuments,
                    projectLeader:this.projectLeader,
                    contactInformation:this.contactInformation,
                    remarks:this.remarks
                }
            }else{
                // 入场项目编号
                object ={
                    projectCode:this.projectObj.totalProjectId,
                    tenderOfferStartTime:this.tenderOfferStartTime,
                    tenderOfferEndTime:this.tenderOfferEndTime,
                    sellingTimeMorning:this.sellingTimeMorning,
                    sellingTimeAfternoon:this.sellingTimeAfternoon,
                    venueBiddingDocuments:this.venueBiddingDocuments,
                    costBiddingDocuments:this.costBiddingDocuments,
                    costBiddingDocumentsAccount:this.costBiddingDocumentsAccount,
                    submissionDocumentsEndTime:this.submissionDocumentsEndTime,
                    submissionTenderDocuments:this.submissionTenderDocuments,
                    projectLeader:this.projectLeader,
                    contactInformation:this.contactInformation,
                    remarks:this.remarks
                }
            }
            return this.$axios({
                method:'POST',
                url:baseUrl + '/CapitalNotController/saveOrUpdate',
                data:object
            }).then(res=>{
                if(res.data.status == 200){
                    this.saveBox = false;
                    this.prequalificaId = res.data.data.prequalificaId;
                }else{
                    console.log(res.data.msg)
                }
            }).catch(err=>{
                console.log(err)
            })
        },
        handleSelectionChange(val){
            let deleteArr = [];
            for(let i in val){
                deleteArr.push(val[i].companyId);
            }
            this.carIdArr = deleteArr;
        },
        async sendNotice(){
            await this.sureSave();
            this.$axios({
                method:'POST',
                url:baseUrl + '/CapitalNotController/sendNotice',
                data:{
                    prequalificaId:this.prequalificaId,
                    companyIds:this.carIdArr
                }
            }).then(res=>{
                if(res.data.status == 200){
                    res.data.data.map((item,index)=>{
                        if(item.issueTime == null){
                            item.issueTime = ""
                        }else{
                            item.issueTime = dayjs(item.issueTime).format('YYYY-MM-DD');
                        };
                        this.noticeStatus = item.noticeStatus;
                        if(item.auditResults == "通过"){
                            this.passBookData.push(item);
                        }else if(item.auditResults == "不通过"){
                            this.auditResultData.push(item);
                        }
                    })
                }
            }).catch(err=>{
                console.log(err)
            })
        },
        confirmEnd(){
            if(this.noticeStatus != "已发出"){
                this.failDiologShow = true;
            }else{
                this.$axios({
                    method:'POST',
                    url:baseUrl + '/CapitalNotController/submit',
                    prequalificaId:this.prequalificaId
                }).then(res=>{
                    if(res.data.status == 200){
                        this.transactShow = true;
                    }
                }).catch(err=>{
                    console.log(err)
                })
            }
        },
        failSave(){
            this.failDiologShow = false;
        },
        handleClose(){
            this.saveBox = false;
            this.frameShow = false;
            this.failDiologShow = false;
        },
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
                        if(item.value == "资审申请结果" && item.state == "办理通过"){
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
        }
       
  },
  created(){
      this.getbiddingInfo();
      this.getsubList();
      this.getAuditPassList();
      this.getJudgeList();
    //   this.getDecideList();
  },
  mounted(){}
}
</script>
<style scoped>
.myDiv{
    width: 100%;
    height: 100%;
    margin:0 auto;
    overflow-y: hidden;
}
.div_box{
    position: relative;
    width: 1400px;
    min-width: 1350px;
    overflow: auto;
}
.el-collapse-item__content{
    padding-bottom: 85px !important;
}
.box,.agin{
    width: 100%;
    height: 40px;
    background: #e2e2e2;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 0 30px 0 2px;
}
.btn{
    height: 40px;
    padding:0 25px;
    background-color: #0095d5;
    border: none;
    color: #ffffff;
    font-size: 16px;
    cursor: pointer;
    margin-right: 2px;
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
.noteBox .noteContent {
    display: flex;
    width: 100%;
    padding:0 20px;
}
.noteContent{
    margin: 2px 0;
}
.noteContent .noteLeft {
    display: inline-block;
}
.noteContent .noteFlex {
    flex: 1;
    flex-direction: column;
    display: inline-block;
}
.noteFlex span{
    padding: 0 2px;
}
.noteTime{
    display: flex;
    width: 300px;
}
.noteline{
    display: flex;
}
h6,b{
    color:red;
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
.notic,h6,b{
    color:red;
}
.messageBox{
    width: 80%;
    display: flex;
    flex-direction: column;
    text-align: center;
    line-height: 30px;
    margin: 0 auto;
}
h1{
    font-weight: normal;
}
.title_box{
    width: 100%;
    height: 100px;
    border-bottom: 2px  dashed red;
}
.main_box{
    width: 100%;
    flex-direction: column;
    margin-top: 10px;
}
.main_box li{
    display: flex;
    justify-content: flex-start;
    align-items: center;
}
.main_box li span{
   padding-left: 150px;
}
.last{
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    text-align: right;
}
.mask {
  position: fixed;
  width: 100%;
  height: 90%;
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
  z-index: 2;
}
.backTop{
    z-index: 3;
}
.fb_box{
    border:7px solid #b2b2b2;
    /* border-bottom: none; */
    width: 85%;
    height: 90%;
    z-index: 5;
    position: absolute;
    top:7%;
    background:#f0f4f6;
    overflow: hidden;
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
.new_nav{
    background-color: #e2e2e2;
    height: 40px;
}
.nav_co {
  padding: 8px 20px;
  background-color: #0095d5;
  border: none;
  color: #ffffff;
  font-size: 16px;
  margin-left: 10px;
  margin-bottom: 10px;
  cursor: pointer;
}
.new_main {
  width: 90%;
  height:100%;
  margin: 0 auto;
  overflow-y: scroll;
  margin-top:20px;
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
.el-radio{
  height: 30px !important;
  line-height: 30px !important;
}
.el-radio:last-child{
  height: 30px !important;
  line-height: 30px !important;
}
/* 弹窗 */
.icon{
    width: 100%;
    padding: 0 10px;
    display: flex;
    align-items: center;
}
.el-icon-warning{
    font-size: 100px;
    color: #0a5e9d;
}
.icon span{
    margin-left: 20px;
    font-size:18px;
}
.fail_box{
  width:100%;
  margin:0 auto;
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  border-bottom: 1px dashed #333;
}
/* 弹窗 */
.icon{
    width: 100%;
    padding: 0 10px;
    display: flex;
    align-items: center;
}
.el-icon-success{
    font-size: 100px;
    color: #0a5e9d;
}
.el-icon-question{
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
/* 场地预约 */
table{
  border-collapse: collapse;
  word-break: break-all;
}
tr{
  display: table-row;
  vertical-align: inherit;
  border-color: inherit;
}
.GridTitle.Room{
  width: 11%;
}
.GridTitle{
  background-color: #009EE0;
  border: 2px solid;
  border-color: White;
  color: #FFF;
  font-size: 14px;
  font-weight: bold;
  text-align: center;
  font-family: 微软雅黑;
}
.GridContent{
  text-align: center;
  background-color: #E5F5FC;
  border: 2px solid;
  border-color: White;
}
.ContentTable{
  height: 120px;
  width: 100%;
}
.ContentTr{
  height: 60px;
  line-height: 60px;
  vertical-align: middle;
}
.ContentTd{
  width: 31%;
  border-right: 2px solid White;
  float: left;
}
.sureSelect{
    position: fixed;
    bottom: 5%;
    left:50%;
}
</style>