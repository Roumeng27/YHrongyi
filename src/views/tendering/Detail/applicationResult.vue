<template>
    <div class="newBox">
        <div v-show="passJudgeShow">
            <!-- 资审申请结果 -->
            <div class="wrapper" v-show="writeFlag">
                    <div class="box" v-show="headerBtn">
                        <button class="btn" @click="newly(1)">保存</button>
                        <button class="btn" @click="newly(2)">下一步</button>
                    </div>
                    <el-collapse v-model="activeName" accordion>
                        <!--招标项目信息 -->
                        <el-collapse-item title="招标项目信息" name="1">
                            <div class="edit_list">
                                <ul class="contentBox">
                                    <li>
                                        <p>招标项目名称：<span>{{nameOfTenderProject}}</span></p>
                                    </li>
                                    <li>
                                        <p>招标(采购)人：<span>{{nameOfPurchaser}}</span></p>
                                        <p >招标项目预算金额(万元)：<span>{{budgetAmount}}</span></p>
                                    </li>
                                    <li>
                                        <p>招标项目编号：<span>{{biddingProjectNumber}}</span></p>
                                        <p>入场项目编号：<span>{{amountId}}</span></p>
                                    </li>
                                </ul>
                            </div>
                            <div v-show="breakBagFlag">   
                                <el-table
                                        ref="multipleTable"
                                        :data="subpackageData"
                                        tooltip-effect="dark"
                                        style="width: 100%">
                                    <el-table-column
                                        label="序号">
                                        <template slot-scope="scope">{{ scope.$index+1 }}</template>
                                    </el-table-column>
                                    <el-table-column
                                        prop="entrySubcontractNumber"
                                        label="入场项目(分包)编号">
                                    </el-table-column>
                                    <el-table-column
                                        prop="subcontractName"
                                        label="分包名称">
                                    </el-table-column>
                                    <el-table-column
                                        prop="subcontractingControlAmount"
                                        label="分包控制金额(万元)">
                                    </el-table-column>
                                    <el-table-column
                                        label="查看">
                                        <template slot-scope="scope">
                                            <i class="el-icon-search"  style="cursor: pointer;" @click="lookoverItem(scope.row)"></i>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </div>
                        </el-collapse-item>
                        <!--资格预审结果 -->
                        <el-collapse-item title="资格预审结果" name="2">
                            <div class="choose">
                                <el-radio-group v-model="examinationResult" size="small" @change="changeRadio">
                                    <el-radio label="">全部</el-radio>
                                    <el-radio label="通过">资审通过</el-radio>
                                    <el-radio label="不通过">资审不通过</el-radio>
                                </el-radio-group>
                            </div>
                            <el-table :data="reasultData" stripe style="width: 100%">
                                <el-table-column  prop="index"  label="序号">
                                    <template slot-scope="scope">{{ scope.$index+1 }}</template>
                                </el-table-column>
                                <el-table-column  prop="companyName"  label="单位名称">
                                </el-table-column>
                                <el-table-column prop="projectLeader" label="项目负责人">
                                </el-table-column>
                                <el-table-column prop="examinationResult" label="审查结果"></el-table-column>
                                <el-table-column prop="reason" label="原因"></el-table-column>
                                <el-table-column fixed="right" label="操作" width="100">
                                    <template slot-scope="scope">
                                        <i class="el-icon-plus"  style="cursor: pointer;" @click="reasonChoose(scope.row)"></i>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </el-collapse-item>
                    </el-collapse>
            </div>
            <!-- 下一步 -->
            <div class="nextWrapper" v-show="nextFlag">
                <div class="box" v-show="headerBtn">
                    <button class="btn" @click="goBack">上一步</button>
                    <button class="btn" @click="submit">提交</button>
                </div>
                <el-collapse v-model="activeName" accordion>
                    <!--招标项目信息 -->
                    <el-collapse-item title="招标项目信息" name="1">
                        <div class="edit_list">
                            <ul class="contentBox">
                                <li>
                                    <p>招标项目名称：<span>{{nameOfTenderProject}}</span></p>
                                </li>
                                <li>
                                    <p>招标(采购)人：<span>{{nameOfPurchaser}}</span></p>
                                    <p >招标项目预算金额(万元)：<span>{{budgetAmount}}</span></p>
                                </li>
                                <li>
                                    <p>招标项目编号：<span>{{biddingProjectNumber}}</span></p>
                                    <p>入场项目编号：<span>{{amountId}}</span></p>
                                </li>
                            </ul>
                        </div>
                        <div v-show="breakBagFlag">   
                                <el-table
                                        ref="multipleTable"
                                        :data="subpackageData"
                                        tooltip-effect="dark"
                                        style="width: 100%">
                                    <el-table-column
                                        label="序号">
                                        <template slot-scope="scope">{{ scope.$index+1 }}</template>
                                    </el-table-column>
                                    <el-table-column
                                        prop="entrySubcontractNumber"
                                        label="入场项目(分包)编号">
                                    </el-table-column>
                                    <el-table-column
                                        prop="subcontractName"
                                        label="分包名称">
                                    </el-table-column>
                                    <el-table-column
                                        prop="subcontractingControlAmount"
                                        label="分包控制金额(万元)">
                                    </el-table-column>
                                    <el-table-column
                                        label="查看">
                                        <template slot-scope="scope">
                                            <i class="el-icon-search"  style="cursor: pointer;" @click="lookoverItem(scope.row)"></i>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </div>
                    </el-collapse-item>
                    <!-- 资格预审结果 -->
                    <el-collapse-item title="资格预审结果" name="2">
                            <div class="choose">
                                <el-radio-group v-model="examinationResult" size="small" @change="changeRadio">
                                    <el-radio label="">全部</el-radio>
                                    <el-radio label="通过">资审通过</el-radio>
                                    <el-radio label="不通过">资审不通过</el-radio>
                                </el-radio-group>
                            </div>
                            <el-table :data="reasultData" stripe style="width: 100%">
                                <el-table-column label="序号">
                                    <template slot-scope="scope">{{ scope.$index+1 }}</template>
                                </el-table-column>
                                <el-table-column  prop="companyName"  label="单位名称">
                                </el-table-column>
                                <el-table-column prop="projectLeader" label="项目负责人">
                                </el-table-column>
                                <el-table-column prop="examinationResult" label="审查结果">
                                </el-table-column>
                                <el-table-column prop="reason" label="原因">
                                </el-table-column>
                            </el-table>
                    </el-collapse-item>
                    <!-- 相关附件 -->
                    <el-collapse-item title="相关附件" name="3">
                        <el-table :data="enclosureData" stripe style="width: 100%">
                            <el-table-column  prop="index"  label="附件名称">
                            </el-table-column>
                            <el-table-column  prop="number"  label="附件列表">
                            </el-table-column>
                            <el-table-column  label="管理">
                                <i class="el-icon-setting"  style="cursor: pointer;" @click="managementInfo"></i>
                            </el-table-column>
                        </el-table>
                    </el-collapse-item>
                    <!-- 办理记录 -->
                    <el-collapse-item title="办理记录" name="6">
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
            <!-- 分包信息详情 -->
            <div class="winWrapper" v-show="lookFlag">
                <div class="winBox">
                    <div class="win_title">
                        <p>分包信息</p>
                        <i class="el-icon-close" @click="closeLook"></i>
                    </div>
                    <el-collapse v-model="activeName" accordion>
                        <!-- 招标项目信息 -->
                        <el-collapse-item title="招标项目信息" name="1">
                            <ul class="contentBox">
                                <li>
                                    <p>招标项目名称：<span>{{nameOfTenderProject}}</span></p>
                                    <p>招标项目编号：<span>{{biddingProjectNumber}}</span></p>
                                </li>
                                <li>
                                    <p>招标(采购)人：<span>{{nameOfPurchaser}}</span></p>
                                </li>
                                <li>
                                    <p>入场项目编号：<span>{{amountId}}</span></p>
                                </li>
                            </ul>
                        </el-collapse-item>
                        <!-- 分包信息-->
                        <el-collapse-item title="分包信息" name="2">
                            <div class="edit_list">
                                <ul class="contentBox">
                                    <li class="notic">
                                        <p style="color:red;">标段包编号(赋码)：<span></span></p>
                                    </li>
                                    <li class="notic">
                                        <p style="color:red;">统一交易标志码：<span></span></p>
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
            <!-- 资格预审结果 -->
            <div class="detailsWrapper" v-show="detailsFlag">
                <div class="detailsBox">
                    <div class="details_title">
                        <p>选择原因</p>
                        <i class="el-icon-close" style="cursor:pointer;" @click="closeDetails"></i>
                    </div>
                    <div style="margin-top:10px;margin-left:1%;display:flex;align-items:center;">
                        <p style="width:100px;font-size:16px;">审查结果:</p>
                        <el-radio v-model="passoroff" label="通过">通过</el-radio>
                        <el-radio v-model="passoroff" label="不通过">不通过</el-radio>
                    </div>  
                    <div class="find_main">
                        <div class="find_input">
                            <div class="input_write">
                                <el-input v-model="reason" type="textarea" :rows="5"></el-input>
                            </div>
                            <p><i class="el-icon-arrow-down" @click="showData" style="font-size:20px;"></i></p>
                            <p><i class="el-icon-close" @click="clearData" style="font-size:20px;"></i></p>
                        </div>
                        <div class="find_list" v-show="reasonList">
                            <div class="item_box">
                                <div class="items_title">
                                    <i class="el-icon-message" style="color:#fddf78;font-size:18px;"></i>
                                    <p>资审不通过原因</p>
                                </div>
                                <div style="padding:0 20px;">
                                    <el-checkbox-group v-model="checked" @change="changeCheck">
                                        <el-checkbox :label="item.value" v-for="item in checkBoxList" :key="item.value">{{item.value}}</el-checkbox>
                                    </el-checkbox-group>
                                </div>
                            </div>
                            <div class="find_btn">
                                <div class="sure" @click="Sure">确定</div>
                            </div>
                        </div>
                    </div>
                    <div class="find_btn">
                        <div class="sure_btn" @click="choiseSure">确定选择</div>
                    </div>
                </div>
            </div>
            <!-- 资格预审报告 -->
            <div class="manageWrapper" v-show="manageFlag">
                <div class="manageBox">
                    <div class="manage_title">
                        <p>资格预审报告</p>
                        <i class="el-icon-close" @click="closeManage"></i>
                    </div>
                </div>
            </div>
            <!-- 提交弹窗 -->
            <el-dialog
                title="系统提示"
                :visible.sync="submitBox"
                width="40%"
                :before-close="handleClose">
                <div class="icon">
                    <i class="el-icon-success"></i>
                    <span>提交成功！</span>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="submitSure()">确 定</el-button>
                </span>
            </el-dialog>
            <!-- 保存弹窗 -->
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
                    <el-button type="primary" @click="saveBoxSure()">确 定</el-button>
                </span>
            </el-dialog>
        </div>
        <div v-show="frameShow">
            <el-dialog
                title="系统提示"
                :visible.sync="frameShow"
                width="40%"
                :before-close="handleClose">
                <div class="icon">
                    <i class="el-icon-warning"></i>
                    <span>尚未完成资审公告，无法进行资审申请结果操作!</span>
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
    import { quillEditor } from 'vue-quill-editor' //调用编辑器
    import {formatDate,changeTime,uniq,getRepeat} from '../../../api/base.js'
    export default {
        data(){
            return {
                frameShow:false,
                passJudgeShow:true,
                passoroff:'',//通过与否
                tableItem:{},//当点编辑的时候，要编辑的当前行对象
                projectObj:JSON.parse(window.localStorage.projectObj),
                activeName:['1','2','3','4','5','6'],
                tableData:[],
                multipleSelection:[],//多选框
                writeFlag:true,// 总包输入 列表
                radio:'',
                radioList:[
                    {
                        value:'通过'
                    },
                    {
                        value:'不通过'
                    }
                ],
                // 招标项目信息所需字段
                nameOfTenderProject:'',// 招标项目名称
                biddingProjectNumber:'',// 招标项目编号
                nameOfPurchaser:'',// 招标(采购)人
                budgetAmount:'',// 招标项目预算金额
                amountOfBiddingProject:'',//招标项目金额
                biddingProcurementMode:'',// 招标采购方式
                biddingOrganization:'',// 招标组织方式
                typesOfBiddingProjects:'',// 招标项目类型
                amountId:'',// 总包
                entrySubcontractNumber:'',// 入场项目编号 分包
                projectCode:'',//入场项目编号 总包
                saveBox:false,//保存弹窗
                // 招标信息 下边的分包信息(总包不显示 分包显示)
                breakBagFlag:false,
                enclosureData:[
                    {
                       number:'1' 
                    }
                ],
                subpackageData:[],
                // 中标信息详情
                lookFlag:false,
                scopeOfTender:'',// 招标范围
                subcontractingControlAmount:'',// 分包控制金额
                qualificationExaminationMethod:'',// 资格审查方式	
                electronicBidEvaluation:'',// 是否电子招投标
                subcontractContents:'',// 分包内容
                subcontractName:'',// 分包名称 
                totalProjectId:'',
                // 查找人员
                name:'',
                // 资格预审结果
                detailsFlag:false,
                props1: {
                    label: 'name',
                    children: 'zones',
                    isLeaf: 'leaf'
                },
                reasonList:false,
                // 下一步
                headerBtn:true,// 提交和上一步的按钮
                nextFlag:false,// 下一步
                // 办理记录
                manageDate:[],
                creationTime:'',// 时间
                // 提交弹窗
                submitBox:false,
                // 保存
                saveBox:false,// 保存弹窗
                // 资格预审结果
                examinationResult:'',// radio框
                reasultData:[],// 列表数据
                // 资格预审报告
                manageFlag:false,
                checkBoxList:[],
                checked:[],
                reason:'',// 原因
                newArr:[],
                abidid:'',// 投标报名id
                bidInforId:'',// 点击每条列表的ID
                saveArr:[],// 保存所需数组
                applyAssociatedProjectId:'',// 控住状态表ID
            }
        },
        created(){
            if(this.projectObj.totalProjectId.indexOf("-") != -1){
                // 分包
                this.entrySubcontractNumber = this.projectObj.totalProjectId;
                this.breakBagFlag = true;
                this.getItemInfo();// 根据项目入场分包编号查询
            }else{
                // 总包
                this.projectCode = this.projectObj.totalProjectId;
                this.breakBagFlag = false;
            }
            this.getbiddingInfo();// 招标项目信息
            this.getInitInfo();// 资审结果 ---> 初始化 
            this.changeRadio();// 资审结果 ---> 根据条件查询 
            this.getList();// 资格预审结果列表
            // this.getDecideList();
        },
		methods:{
            // 查看分包详情
            lookoverItem(row){
                this.entrySubcontractNumber = row.entrySubcontractNumber;// 入场项目分包编号
                this.subcontractName = row.subcontractName;// 分包名称 
                this.subcontractContents = row.subcontractContents;// 分包内容
                this.scopeOfTender = row.scopeOfTender;// 招标范围
                this.subcontractingControlAmount = row.subcontractingControlAmount;// 分包控制金额	
                this.qualificationExaminationMethod = row.projectInformationVo.qualificationExaminationMethod;// 资格审查方式 
                this.electronicBidEvaluation = row.projectInformationVo.electronicBidEvaluation;// 是否电子招投标
                this.lookFlag = true;
            },
            // 关闭查看详情
            closeLook(){
                this.lookFlag = false
            },
            // 资格预审结果 ---> 原因选择
            reasonChoose(row){
                this.tableItem = row;
                this.detailsFlag = true;
                this.reason = row.reason;
                this.detailsFlag = true;
                this.getnoPass(row);// 资格预审结果 ---> 资审不通过原因
            },
            // 资格预审结果 ---> 关闭
            closeDetails(){
                this.detailsFlag = false;
            },
            // 资格预审结果 ---> 选择原因 ---> X号清空input
            clearData(){
                this.reason = ''
            },
            // 资格预审结果 ---> 选择原因 ---> 展示下边的原因列表
            showData(){
                this.reasonList = !this.reasonList;
            },
            // 相关附件 ---> 管理
            managementInfo(){
                this.manageFlag = true;
            },
            // 相关附件 ---> 关闭
            closeManage(){
                this.manageFlag = false;
            },
            // 保存和下一步公用方法
            newly(num){
                if(num == 1){
                    // 保存
                    this.saveInfo(num)
                }else{
                    // 下一步
                    this.writeFlag = false;// 输入框的页面
                    this.nextFlag = true;// 下一步页面
                    this.getmanageInfo();// 办理记录
                    this.saveInfo(num);// 保存
                }
            },
            // 上一步
            goBack(){
                this.writeFlag = true;// 输入框的页面
                this.nextFlag = false;// 下一步页面
            },
            // 保存弹窗 ---> 确定	
            saveBoxSure(){
                this.saveBox = false;
            },
            // 提交
            submit(){
                let object ={}
                if(this.projectObj.totalProjectId.indexOf("-") != -1 && this.projectObj.totalProjectId!=null){
                    // 入场项目分包编号
                    object={
                        entrySubcontractNumber:this.projectObj.totalProjectId,
                        applyAssociatedProjectId:this.applyAssociatedProjectId
                    }
                }else{
                    // 入场项目编号
                    object ={
                        projectCode:this.projectObj.totalProjectId,
                        applyAssociatedProjectId:this.applyAssociatedProjectId
                    }
                }
                this.$axios({
                    method: "POST",
                    url: baseUrl+"/auditApplyController/submit",
                    data:object
                }).then(res=>{
                    if(res.data.status == 200){
                        if(res.data.data.state == '待办理'){
                            this.writeFlag = true;
                            this.headerBtn = false;
                            this.nextFlag = false;
                        }
                    }else{
                        console.log(res.data.msg);
                    }
                }).catch(err=>{
                    console.log(err)
                })
                this.submitBox = true;
            },
            // 提交 ---> 关闭
            submitSure (){
                this.submitBox = false;
            },
            // 弹窗 ---> 关闭
            handleClose(){
                this.submitBox = false;
                this.saveBox = false;
                this.frameShow = false;
            },
			// 根据项目入场分包编号查询
            getItemInfo(){
                let arr =[];
                arr.push(this.entrySubcontractNumber)
                this.$axios({
                    method: "POST",
                    url: baseUrl+"/projectInformationController/selectByProjectEntrySubcontractNumber",
                    data:{
                        projectEntrySubcontractNumbers:arr
                    }
                }).then(res=>{
                    if(res.data.status == 200){
                        this.subpackageData = res.data.data;
                    }else{
                        console.log(res.data.msg);
                    }
                }).catch(err=>{
                    console.log(err)
                })
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
                        console.log(res.data.msg);
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
                        console.log(res.data.msg);
                    }
                }).catch(err=>{
                    console.log(err)
                })
            },
            // 资审结果 ---> 初始化 
            getInitInfo(){
                let object ={}
                if(this.projectObj.totalProjectId.indexOf("-") != -1 && this.projectObj.totalProjectId!=null){
                    // 入场项目分包编号
                    object={
                        entrySubcontractNumber:this.projectObj.totalProjectId
                    }
                }else{
                    // 入场项目编号
                    object ={
                        projectCode:this.projectObj.totalProjectId
                    }
                }
                this.$axios({
                    method: "POST",
                    url: baseUrl+"/auditApplyController/queryState",
                    data:object
                }).then(res=>{
                    if(res.data.status == 200){
                        if(res.data.data.state == "" || res.data.data == null){
                            this.writeFlag = true;
                            this.nextFlag = false;
                        }else if(res.data.data.state == '编辑中' || res.data.data.state == '办理未通过'){
                            this.writeFlag = false;
                            this.nextFlag = true;
                        }else{
                            this.writeFlag = true;
                            this.headerBtn = false;
                            this.nextFlag = false;
                        }
                        this.applyAssociatedProjectId = res.data.data.applyAssociatedProjectId;
                    }else{
                        console.log(res.data.msg);
                    }
                }).catch(err=>{
                    console.log(err)
                })
            },
            // 上一步的查询
            getLastTempInfo(){

            },
            // 资格预审结果 ---> 根据条件查询 获取radio框
            changeRadio(){
                let object ={}
                if(this.projectObj.totalProjectId.indexOf("-") != -1 && this.projectObj.totalProjectId!=null){
                    // 入场项目分包编号
                    object={
                        entrySubcontractNumber:this.projectObj.totalProjectId,
                        examinationResult:this.examinationResult
                    }
                }else{
                    // 入场项目编号
                    object ={
                        projectCode:this.projectObj.totalProjectId,
                        examinationResult:this.examinationResult
                    }
                }
                this.$axios({
                    method: "POST",
                    url: baseUrl+"/auditApplyController/selectList",
                    data:object
                }).then(res=>{
                    if(res.data.status == 200){
                        this.reasultData = res.data.data;
                    }else{
                        console.log(res.data.msg);
                    }
                }).catch(err=>{
                    console.log(err)
                })
            },
            // 保存公共方法
            saveInfo(num){
                if(this.projectObj.totalProjectId.indexOf("-") != -1 && this.projectObj.totalProjectId!=null){
                    // 分包
                    this.reasultData.forEach(item=>{
                        item.entrySubcontractNumber=this.projectObj.totalProjectId
                    })

                }else{
                    // 总包
                    this.reasultData.forEach(item=>{
                        item.projectCode=this.projectObj.totalProjectId
                    })
                }
                this.$axios({
                    method:'POST',
                    url:baseUrl + '/auditApplyController/saveOrNextStep',
                    data:{
                        list:this.reasultData
                    }
                }).then(res=>{
                    if(res.data.status == 200){
                        this.applyAssociatedProjectId = res.data.data.applyAssociatedProjectId;
                        this.getList();// 资格预审结果列表
                        if(num == 1){
                            this.saveBox = true;
                        }else{
                            this.saveBox = false;
                        }
                        
                    }else{
                        console.log(res.data.msg);
                    }
                }).catch(err=>{
                    console.log(err);
                }) 
            },
            // 资格预审结果 ---> 资审不通过原因
            getnoPass(row){
                this.bidInforId = row.bidInforId
                if(row.reason != null){
                    let arr = row.reason.split(',');
                    let newArr = arr.join().split('，')
                }
                this.$axios({
                    method: "POST",
                    url: baseUrl+"/interfaceTableController/selectByname",
                    data:{
                        dropDownBox:'资审不通过原因'
                    }
                }).then(res=>{
                    if(res.data.status == 200){
                        this.checkBoxList = res.data.data.data;
                        // 从后端获取的原因 给总列表赋值 
                        for(let i=0;i<this.checkBoxList.length;i++){
                            for(let j=0;j<newArr.length;j++){
                                if(this.checkBoxList[i].value == newArr[j]){
                                    this.checked.push(this.checkBoxList[i].value)
                                }
                            }
                        }
                    }else{
                        console.log(res.data.msg);
                    }
                }).catch(err=>{
                    console.log(err)
                })
            },
            // 资审不通过原因及原因合并成一个数组
            changeCheck(val){},
            // 确定
            Sure(){
                this.reason = this.checked.join(',')                                                                               
            },
            // 查找人员 ---> 确定选择
            choiseSure(){
                this.detailsFlag = false;
                this.tableItem.reason = this.checked.join(',');
                this.tableItem.examinationResult  = this.passoroff;
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
                            if(item.value == "资审公告" && item.state == "办理通过"){
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
            // 资格预审结果列表
            getList(){
                let object ={}
                if(this.projectObj.totalProjectId.indexOf("-") != -1 && this.projectObj.totalProjectId!=null){
                    // 入场项目分包编号
                    object={
                        entrySubcontractNumber:this.projectObj.totalProjectId
                    }
                }else{
                    // 入场项目编号
                    object ={
                        projectCode:this.projectObj.totalProjectId
                    }
                }
                this.$axios({
                    method: "POST",
                    url: baseUrl+"/auditApplyController/selectList",
                    data:object
                }).then(res=>{
                    if(res.data.status == 200){
                        this.reasultData = res.data.data;
                        this.reasultData.forEach(item=>{
                            this.abidid = item.bidInforId
                        })
                    }else{
                        console.log(res.data.msg);
                    }
                }).catch(err=>{
                    console.log(err)
                })
            },
            
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
.pickWrapper,.findWrapper,.addWrapper,.winWrapper{
    width: 100%;
    height: 100%;
    position: fixed;
    left: 185px;
    top: 0;
    background: rgba(0, 0, 0, .3);
    z-index: 99;
    padding: 50px;
	
}
.detailsWrapper{
    width: 100%;
    height: 100%;
    position: fixed;
    left: 185px;
    top: 0;
    background: rgba(0, 0, 0, .3);
    z-index: 99;
    padding:130px  490px;
}
.manageWrapper{
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    background: rgba(0, 0, 0, .3);
    z-index: 99;
    padding:10px;
}
.manageBox {
    width: 100%;
    height: 100%;
    background: #fff;
    position: relative;
	overflow: hidden;
	overflow-y: scroll;
}
.pickBox,.addBox,.winBox{
    width: 87%;
    height: 100%;
    background: #fff;
    position: relative;
	overflow: hidden;
	overflow-y: scroll;
}
.detailsBox{
    width: 400px;
    height: 100%;
    background: #fff;
    display: flex;
    flex-direction: column;
	overflow: hidden;
	overflow-y: scroll;
}
.win_title,.find_title,.add_title,.details_title,.manage_title{
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
.find_input{
    width: 100%;
    display: flex;
    justify-content: space-between;
    border:1px solid #ccc;
    margin: 20px 0;
}
.find_input p{
    width: 20px;
    height: 20px;
    line-height: 20px;
    text-align: center;
    border:1px solid #ccc;
}
.input_write{
    width: 90%;
    padding:0 5px;
}
.el-icon-close,.el-icon-arrow-down{
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
.notic,h6,b{
    color:red;
}
/* 查找人员 头部 */
.findBox{
    width: 87%;
    height: 100%;
    background: #fff;
    display: flex;
    flex-direction: column;
	overflow: hidden;
	overflow-y: scroll;
}
.find_write{
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50px;
}
.find_list{
    width: 100%;
    border: 1px solid #ccc;
    height: 200px;
    position: relative;
}
.item_box{
    padding:0 10px;
}
.items_title{
    width: 100%;
    display: flex;
    align-items: center;
    height: 30px;
}
.items_title>p{
    padding: 0 10px;
}
.input_item{
    width: 450px;
    display: flex;
    align-items: center;
}
.input_item>.el-input{
    width: 250px !important;
}
.input_item p{
    width:130px;
    text-align:right;
    padding: 0 5px;
}
.input_button{
    height: 38px;
    padding:0 25px;
    background-color: #0095d5;
    border: none;
    color: #ffffff;
    font-size: 16px;
    cursor: pointer;
    margin-right: 2px;
}
/* 查找人员 主体内容 */
.find_main{
    flex: 1;
    overflow: hidden;
    overflow-y: scroll;
    padding: 0 5px;
}
.find_table{
    width: 100%;
    height: 500px;
}
.pagination{
    padding: 0 50px;
    width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
}
/* 查找人员 页脚 */
.find_btn {
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.sure{
    padding: 0 10px;
    height: 30px;
    line-height: 30px;
    border: 1px solid #ccc;
    color: #000;
    font-size: 14px;
    cursor: pointer;
    text-align: center;
    position: absolute;
    bottom: 10px;
    left: 45%;
}
.sure_btn{
    height: 40px;
    line-height: 40px;
    padding:0 10px;
    background-color: #0095d5;
    border: none;
    color: #ffffff;
    font-size: 16px;
    cursor: pointer;
    text-align: center;
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
    padding-right: 5px;
    text-align: left;
    color: #333;
    height: 100%;
    text-align: right;
}
.write_input{
    width: 250px;
}
.write_textarea{
    width: 900px !important;;
}
.write_item{
    width: 810px !important;;
}
.edit_list{
    padding: 0 50px;
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
.item_title{
	line-height: 30px;
	font-weight: bold;
	padding: 0 10px;
}
.el-icon-plus{
	font-size: 20px;
}
.choose{
    width: 100%;
    height: 40px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding:  0 20px;
}
</style>