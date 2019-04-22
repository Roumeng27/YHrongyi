<template>
  <div class="myDiv">
        <!-- 上一步弹框 -->
        <div v-show="show">
            <div class="new_nav">
                <button class="nav_co nav_save" @click="saveFile()">保存</button>
                <button class="nav_co nav_next" @click="nextTo()">下一步</button>
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
                                <div class="table_box" v-if="projectObj.totalProjectId.indexOf('-') > -1">
                                    <el-table :data="subcontractData" stripe style="width: 100%">
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
                                                <i class="el-icon-search" @click="lookFile(scope.row)"></i>
                                            </template>
                                        </el-table-column>
                                    </el-table>
                                </div>
                            </div>
                        </div>
                    </el-collapse-item>
                    <!-- 第二步 -->
                    <el-collapse-item title="资格预审文件信息" name="2">
                        <div class="new_m_b">
                            <div class="new_m_b2">
                                <!--文件编号 -->
                                <div class="noteBox">
                                    <div class="noteContent">
                                    <div class="noteLeft">文件编号：</div>
                                    <div class="noteFlex">
                                        <span>{{documentNumber}}</span>
                                    </div>
                                    </div>
                                </div>
                                <!-- 申请资格 -->
                                <div class="noteBox" style="margin-bottom: 20px;">
                                    <div class="noteContent">
                                    <div class="noteLeft"><span style="color:#f00;">*</span>申请资格：</div>
                                    <div class="noteFlex">
                                        <el-input type="textarea" v-model="applicationQualification"></el-input>
                                    </div>
                                    </div>
                                </div>
                                <!--文件递交截止时间及申请有效期  -->
                                <div class="noteBox">
                                    <div class="noteContent">
                                    <div class="noteLeft"><span style="color:#f00;">*</span>文件递交截止时间：</div>
                                    <div class="noteFlex">
                                        <el-date-picker value-format="timestamp" v-model="fileSubmissionEndTime" type="datetime" placeholder="选择日期时间">
                                        </el-date-picker>
                                    </div>
                                    <div style="display: inline-flex;margin-left:30px;width:50%;">
                                        <span style="width:130px;">申请有效期(天)：</span>
                                        <el-input v-model="applyEffective"></el-input>
                                    </div>
                                    </div>
                                </div>
                                <!-- 文件递交地址 -->
                                <div class="noteBox" style="margin-bottom: 20px;margin-top:10px;">
                                    <div class="noteContent">
                                    <div class="noteLeft"><span style="color:#f00;">*</span>文件递交地址：</div>
                                    <div class="noteFlex">
                                        <el-input type="textarea" v-model="documentSubmissionAddress"></el-input>
                                    </div>
                                    </div>
                                </div>
                                <!--文件评审时间  -->
                                <div class="noteBox">
                                    <div class="noteContent">
                                    <div class="noteLeft"><span style="color:#f00;">*</span>文件评审时间：</div>
                                    <div class="noteFlex">
                                        <el-date-picker value-format="timestamp" v-model="documentReviewTime" type="datetime" placeholder="选择日期时间">
                                        </el-date-picker>
                                    </div>
                                    </div>
                                </div>
                                <!--文件开启方式  -->
                                <div class="noteBox">
                                    <div class="noteContent">
                                    <div class="noteLeft"><span style="color:#f00;">*</span>文件开启方式：</div>
                                    <div class="noteFlex">
                                        <el-select v-model="fileOpeningMode" placeholder="请选择">
                                            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </div>
                                    </div>
                                </div>
                                <!-- 评审办法 -->
                                <div class="noteBox">
                                    <div class="noteContent">
                                    <div class="noteLeft"><span style="color:#f00;">*</span>评审办法：</div>
                                    <div class="noteFlex">
                                        <el-input v-model="reviewMethod"></el-input>
                                    </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </el-collapse-item>
                </el-collapse>
            </div>
        </div>
        <!-- 下一步弹框 -->
        <div v-show="nextShow">
            <div class="new_nav">
                <button class="nav_co nav_save" @click="submitFile()">提交</button>
                <button class="nav_co nav_next" @click="backTo()">上一步</button>
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
                                    <el-table :data="subcontractData" stripe style="width: 100%">
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
                                                <i class="el-icon-search" @click="lookFile(scope.row)"></i>
                                            </template>
                                        </el-table-column>
                                    </el-table>
                                </div>
                            </div>
                        </div>
                    </el-collapse-item>
                    <!-- 第二步 -->
                    <el-collapse-item title="资格预审文件信息" name="2">
                        <div class="new_m_b">
                            <div class="new_m_b2">
                                <!--文件编号 -->
                                <div class="noteBox">
                                    <div class="noteContent">
                                    <div class="noteLeft">文件编号：</div>
                                    <div class="noteFlex">
                                        <span>{{value}}</span>
                                    </div>
                                    </div>
                                </div>
                                <!-- 申请资格 -->
                                <div class="noteBox">
                                    <div class="noteContent">
                                    <div class="noteLeft">申请资格：</div>
                                    <div class="noteFlex">
                                        <span>{{applicationQualification}}</span>
                                    </div>
                                    </div>
                                </div>
                                <!--文件递交截止时间及申请有效期  -->
                                <div class="noteBox">
                                    <div class="noteContent">
                                    <div class="noteLeft">文件递交截止时间：</div>
                                    <div class="noteFlex">
                                        <span>{{fileSubmissionEndTime}}</span>
                                    </div>
                                    <div style="display: inline-flex;margin-left:30px;width:50%;">
                                        <span style="width:130px;">申请有效期(天)：</span>
                                        <span>{{applyEffective}}</span>
                                    </div>
                                    </div>
                                </div>
                                <!-- 文件递交地址 -->
                                <div class="noteBox">
                                    <div class="noteContent">
                                    <div class="noteLeft">文件递交地址：</div>
                                    <div class="noteFlex">
                                        <span>{{documentSubmissionAddress}}</span>
                                    </div>
                                    </div>
                                </div>
                                <!--文件评审时间  -->
                                <div class="noteBox">
                                    <div class="noteContent">
                                    <div class="noteLeft">文件评审时间：</div>
                                    <div class="noteFlex">
                                        <span>{{documentReviewTime}}</span>
                                    </div>
                                    </div>
                                </div>
                                <!--文件开启方式  -->
                                <div class="noteBox">
                                    <div class="noteContent">
                                    <div class="noteLeft">文件开启方式：</div>
                                    <div class="noteFlex">
                                        <span>{{fileOpeningMode}}</span>
                                    </div>
                                    </div>
                                </div>
                                <!-- 评审办法 -->
                                <div class="noteBox">
                                    <div class="noteContent">
                                    <div class="noteLeft">评审办法：</div>
                                    <div class="noteFlex">
                                        <span>{{reviewMethod}}</span>
                                    </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </el-collapse-item>
                    <!-- 第三步 -->
                    <el-collapse-item title="相关附件" name="3">
                        <div class="new_m_b">
                            <div class="new_m_b2">
                            <el-table :data="enclosureData" stripe style="width: 100%">
                                <el-table-column prop="appendixName" label="附件名称" width="150">
                                </el-table-column>
                                <el-table-column label="附件列表(点击查看)">
                                <template slot-scope="scope">
                                    <li v-for='item in scope.row.attachlist' @click="downLoadupFile(item)" class="temLi">
                                        {{item.fileName}}
                                    </li>
                                </template>
                                </el-table-column>
                                <el-table-column fixed="right" label="操作" width="100">
                                <template slot-scope="scope">
                                    <i class="el-icon-setting"  style="cursor: pointer;" @click="shezhi(scope.row)"></i>
                                </template>
                                </el-table-column>
                            </el-table>
                            </div>
                        </div>
                    </el-collapse-item>
                    <!-- 第四步 -->
                    <el-collapse-item title="办理记录" name="4">
                        <div class="new_m_b">
                            <div class="new_m_b2">
                            <el-table :data="handleRecordData" style="width: 100%">
                                <el-table-column prop="date" label="步骤"  width="180">
                                </el-table-column>
                                <el-table-column  prop="name" label="办理人员" width="180">
                                </el-table-column>
                                <el-table-column prop="address" label="时间">
                                </el-table-column>
                                <el-table-column prop="address" label="状态">
                                </el-table-column>
                                <el-table-column prop="address" label="备注">
                                </el-table-column>
                            </el-table>
                            </div>
                        </div>
                    </el-collapse-item>
                </el-collapse>
            </div>
        </div>
        <!-- 上传资格预审文件弹框 -->
        <div class="mask" v-show="file"></div>
        <div class="file_box" v-show="file">
            <!-- 头部 -->
            <div class="file_head">
                <div class="file_title" style="padding-left:10px;">资格预审文件</div>
                <div style="padding-right:10px;font-size:25px;cursor:pointer;" @click="closeFile()">×</div>
            </div>
            <!-- 上传删除 -->
            <div class="file_nav">
                <input type="file" @change="loadFile($event)" ref="file" name="file" class="file_btn" multiple="multiple" accept=".doc,.docx,.txt,.rar,.zip,.xls,.xlsx,.pdf,image/gif,image/png,image/bmp,image/pdf,image/jpg,image/jpeg">
                <button style="margin-right:3px;">上传</button>
                <button @click="deleteFile()">删除</button>
            </div>
            <!-- 表格 -->
            <div class="fileTableData">
                <el-table :data="fileData" style="width: 100%"  @selection-change="handleSelectionChange">
                    <el-table-column type="selection" width="55" align='center'>
                    </el-table-column>
                    <el-table-column type="index" width="70" label="序号" :index="typeIndex">
                    </el-table-column>
                    <el-table-column prop="fileName" label="文件名称"  width="180">
                    </el-table-column>
                    <el-table-column  prop="fileSize" label="文件大小">
                    </el-table-column>
                    <el-table-column  prop="uploadingPeople" label="上传人">
                    </el-table-column>
                    <el-table-column  prop="formatTime" label="上传时间"  width="170">
                    </el-table-column>
                    <el-table-column prop="operation" label="下载">
                        <template slot-scope="scope">
                        <span class="upload" @click="downloadFile(scope.row.attachmeId,scope.row.fileName)">点击下载</span>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div style="color:#f00;padding:15px 0;position:fixed;bottom:5px;left:5px;">
            ★：附件上传大小限制为102400 KB；请上传后缀名为doc,docx,txt,rar,zip,jpg,jpeg,pdf,xls,xlsx,gif,bmp,png类型的文件!
            </div>
        </div>
        <!--确认提交弹窗 -->
        <el-dialog
            title="执行成功"
            :visible.sync="submitBoxShow"
            width="40%"
            :before-close="handleClose">
            <div class="icon">
                <i class="el-icon-success"></i>
                <span>提交成功！</span>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitSave()">确 定</el-button>
            </span>
        </el-dialog>
  </div>
</template>

<script>
import baseUrl from '../../../api/api'
import dayjs from "dayjs"
export default {
  components:{},
  props:{},
  data(){
    return {
        projectObj:JSON.parse(window.localStorage.projectObj),
        value:'',
        activeName:'2',
        subcontractData:[],//分包数据
        enclosureData:[
            {
            appendixName: "资格预审文件",
            attachlist: []
          },
        ],//下一步附件数据
        fileData:[],//资格预审上传文件数据
        handleRecordData:[],//办理记录数据
        currentPage:1,//当前页
        nameOfTenderProject:'',//招标项目名称
        nameOfPurchaser:'',//招标采购人
        EntrySubNum:'',//分包编号
        amountOfBiddingProject:'',//招标项目金额
        biddingProjectNumber:'',//招标项目编号
        totalProId:'',//入场项目编号
        show:true,//上一步弹框
        nextShow:false,//下一步弹框
        file:false,//资格预审文件上传
        submitBoxShow:false,//提交成功弹框
        options:[//文件开启方式
            {
                value:'远程电子开标',
                label:'远程电子开标'
            },
            {
                value:'现场电子开标',
                label:'现场电子开标'
            },
            {
                value:'现场纸质开标',
                label:'现场纸质开标'
            },
        ],
        documentNumber:'',//文件编号
        applicationQualification:'',//申请资格
        fileSubmissionEndTime:'',//文件递交截止时间
        applyEffective:'',//申请有效期
        documentSubmissionAddress:'',//文件递交地址
        documentReviewTime:'',//文件评审时间
        fileOpeningMode:'',//文件开启方式
        reviewMethod:'',//评审办法
        prequalificaId:'',//资格预审id   
        qulifyId:'',//查询返回的id    
        attachmeId:'',//上传文件id                
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
                this.$layer.msg(res.data.msg);
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
                this.subcontractData = res.data.data
            }else{
                this.$layer.msg(res.data.msg);
            }
            
        }).catch(err=>{
            console.log(err)
        })
    },
    //一进入页面判断状态是哪个，从而展示不同的界面
    getStateList(){
        let obj = {}
        if(this.projectObj.totalProjectId.indexOf("-") != -1){
            //分包
            obj = {
                entrySubcontractNumber:this.projectObj.totalProjectId
            }
        }else{
             obj = {
                projectCode:this.projectObj.totalProjectId,
            }
        }
        this.$axios({
            method: "POST",
            url:baseUrl + '/prequalificaController/queryByProjectCode',
            data:obj
        }).then(res=>{
            this.documentNumber = res.data.data.documentNumber;
            this.qulifyId = res.data.data.prequalificaId
            if(res.data.data == null){
                if(this.projectObj.totalProjectId.indexOf("-") != -1){
                    $('.table_box').show();
                }else{
                    $('.table_box').hide();
                }
                this.show = true;
            }else if(res.data.data.state == '编辑中'){
                this.qulifyId = res.data.data.prequalificaId
                this.nextShow = false;
                this.show = true;
                if(this.projectObj.totalProjectId.indexOf("-") != -1){
                    this.projectNum = res.data.data.entrySubcontractNumber;
                }else{
                    this.projectNum = res.data.data.projectCode;
                    $('.table_box').hide();
                }
                this.applicationQualification = res.data.data.applicationQualification;
                if(res.data.data.fileSubmissionEndTime == ""){
                    this.fileSubmissionEndTime  = "";
                }else{
                    this.fileSubmissionEndTime = dayjs(res.data.data.fileSubmissionEndTime).format('YYYY-MM-DD');
                }
                this.applyEffective = res.data.data.applyEffective;
                this.documentSubmissionAddress = res.data.data.documentSubmissionAddress;
                if(res.data.data.documentReviewTime == ""){
                    this.documentReviewTime = "";
                }else{
                    this.documentReviewTime = dayjs(res.data.data.documentReviewTime).format('YYYY-MM-DD HH:mm:ss');
                }
                this.fileOpeningMode = res.data.data.fileOpeningMode;
                this.reviewMethod = res.data.data.reviewMethod;
                this.qulifyId = res.data.data.prequalificaId;
            }else if(res.data.data.state == '办理通过' || res.data.data.state == '待办理'){
                this.qulifyId = res.data.data.prequalificaId
                $('.new_nav').hide();
                this.nextShow = true;
                this.show = false;
                if(this.projectObj.totalProjectId.indexOf("-") != -1){
                    $('.table_box').show();
                }else{
                    $('.table_box').hide();
                }
                this.applicationQualification = res.data.data.applicationQualification;
                if(res.data.data.fileSubmissionEndTime == ""){
                    this.fileSubmissionEndTime  = "";
                }else{
                    this.fileSubmissionEndTime = dayjs(res.data.data.fileSubmissionEndTime).format('YYYY-MM-DD');
                }
                this.applyEffective = res.data.data.applyEffective;
                this.documentSubmissionAddress = res.data.data.documentSubmissionAddress;
                if(res.data.data.documentReviewTime == ""){
                    this.documentReviewTime = "";
                }else{
                    this.documentReviewTime = dayjs(res.data.data.documentReviewTime).format('YYYY-MM-DD HH:mm:ss');
                }
                this.fileOpeningMode = res.data.data.fileOpeningMode;
                this.reviewMethod = res.data.data.reviewMethod;
                this.prequalificaId = res.data.data.prequalificaId;
            }
        }).catch(err=>{
            console.log(err)
        })
    },
    //编号问题
    typeIndex(index) {
        return index + (this.currentPage - 1) * 10 + 1;
    },
    //下一步
    nextTo(){
        // if(!this.applicationQualification){
        //     this.$layer.msg('请输入申请资格');
        //     return false;
        // }else if(!this.fileSubmissionEndTime){
        //     this.$layer.msg('请选择文件递交截止时间');
        //     return false;
        // }else if(!this.documentSubmissionAddress){
        //     this.$layer.msg('请选择文件递交地址');
        //     return false;
        // }else if(!this.documentReviewTime){
        //     this.$layer.msg('请选择文件评审时间');
        //     return false;
        // }else if(!this.fileOpeningMode){
        //     this.$layer.msg('请选择文件开启方式');
        //     return false;
        // }else if(!this.reviewMethod){
        //     this.$layer.msg('请填写评审方法');
        //     return false;
        // }
        let objData = {}
        if(this.projectObj.totalProjectId.indexOf("-") != -1){
            //分包
            objData={
                entrySubcontractNumber:this.projectObj.totalProjectId,
                prequalificaId:this.qulifyId,
                applicationQualification:this.applicationQualification,
                fileSubmissionEndTime:this.fileSubmissionEndTime,
                applyEffective:this.applyEffective,
                documentSubmissionAddress:this.documentSubmissionAddress,
                documentReviewTime:this.documentReviewTime,
                fileOpeningMode:this.fileOpeningMode,
                reviewMethod:this.reviewMethod
            }
        }else{
            objData={
                projectCode:this.projectObj.totalProjectId,
                prequalificaId:this.qulifyId,
                applicationQualification:this.applicationQualification,
                fileSubmissionEndTime:this.fileSubmissionEndTime,
                applyEffective:this.applyEffective,
                documentSubmissionAddress:this.documentSubmissionAddress,
                documentReviewTime:this.documentReviewTime,
                fileOpeningMode:this.fileOpeningMode,
                reviewMethod:this.reviewMethod
            }
        }
        this.$axios({
            method: "POST",
            url: baseUrl+"/prequalificaController/saveOrNextStep",
            data:objData
        }).then(res=>{
            if(res.data.status == 200){
                let obj = {}
                if(this.projectObj.totalProjectId.indexOf("-") != -1){
                    //分包
                    obj = {
                        entrySubcontractNumber:this.projectObj.totalProjectId
                    }
                }else{
                    obj = {
                        projectCode:this.projectObj.totalProjectId,
                    }
                }
                this.$axios({
                    method: "POST",
                    url:baseUrl + '/prequalificaController/queryByProjectCode',
                    data:obj
                }).then(res=>{
                    if(res.data.status == 200){
                        this.qulifyId = res.data.data.prequalificaId;
                    }
                }).catch(err=>{
                    console.log(err)
                })
                this.uploadList();
                this.nextShow = true;
                this.show = false;
                this.applicationQualification = res.data.data.applicationQualification;
                if(res.data.data.fileSubmissionEndTime == ""){
                    this.fileSubmissionEndTime  = "";
                }else{
                    this.fileSubmissionEndTime = dayjs(res.data.data.fileSubmissionEndTime).format('YYYY-MM-DD');
                }
                this.applyEffective = res.data.data.applyEffective;
                this.documentSubmissionAddress = res.data.data.documentSubmissionAddress;
                if(res.data.data.documentReviewTime == ""){
                    this.documentReviewTime = "";
                }else{
                    this.documentReviewTime = dayjs(res.data.data.documentReviewTime).format('YYYY-MM-DD HH:mm:ss');
                }
                this.fileOpeningMode = res.data.data.fileOpeningMode;
                this.reviewMethod = res.data.data.reviewMethod;
                this.prequalificaId = res.data.data.prequalificaId;
            }else{
                this.$layer.msg(res.data.msg)
            }
        }).catch(err=>{
            console.log(err)
        })
    },
    //保存
    saveFile(){
        // if(!this.applicationQualification){
        //     this.$layer.msg('请输入申请资格');
        //     return false;
        // }else if(!this.fileSubmissionEndTime){
        //     this.$layer.msg('请选择文件递交截止时间');
        //     return false;
        // }else if(!this.documentSubmissionAddress){
        //     this.$layer.msg('请选择文件递交地址');
        //     return false;
        // }else if(!this.documentReviewTime){
        //     this.$layer.msg('请选择文件评审时间');
        //     return false;
        // }else if(!this.fileOpeningMode){
        //     this.$layer.msg('请选择文件开启方式');
        //     return false;
        // }else if(!this.reviewMethod){
        //     this.$layer.msg('请填写评审方法');
        //     return false;
        // }
        let objData = {}
        if(this.projectObj.totalProjectId.indexOf("-") != -1){
            //分包
            objData={
                entrySubcontractNumber:this.projectObj.totalProjectId,
                prequalificaId:this.qulifyId,
                applicationQualification:this.applicationQualification,
                fileSubmissionEndTime:this.fileSubmissionEndTime,
                applyEffective:this.applyEffective,
                documentSubmissionAddress:this.documentSubmissionAddress,
                documentReviewTime:this.documentReviewTime,
                fileOpeningMode:this.fileOpeningMode,
                reviewMethod:this.reviewMethod
            }
        }else{
            objData={
                projectCode:this.projectObj.totalProjectId,
                prequalificaId:this.qulifyId,
                applicationQualification:this.applicationQualification,
                fileSubmissionEndTime:this.fileSubmissionEndTime,
                applyEffective:this.applyEffective,
                documentSubmissionAddress:this.documentSubmissionAddress,
                documentReviewTime:this.documentReviewTime,
                fileOpeningMode:this.fileOpeningMode,
                reviewMethod:this.reviewMethod
            }
        }
        this.$axios({
            method: "POST",
            url: baseUrl+"/prequalificaController/saveOrNextStep",
            data:objData
        }).then(res=>{
            if(res.data.status == 200){
                let obj = {}
                if(this.projectObj.totalProjectId.indexOf("-") != -1){
                    //分包
                    obj = {
                        entrySubcontractNumber:this.projectObj.totalProjectId
                    }
                }else{
                    obj = {
                        projectCode:this.projectObj.totalProjectId,
                    }
                }
                this.$axios({
                    method: "POST",
                    url:baseUrl + '/prequalificaController/queryByProjectCode',
                    data:obj
                }).then(res=>{
                    if(res.data.status == 200){
                        this.qulifyId = res.data.data.prequalificaId;
                    }
                }).catch(err=>{
                    console.log(err)
                })
                this.show = true;
            }else{
                this.$layer.msg(res.data.msg)
            }
        }).catch(err=>{
            console.log(err)
        })
    },
    //上一步
    backTo(){
        this.show = true;
        this.nextShow = false;
        this.fileSubmissionEndTime = new Date(this.fileSubmissionEndTime).getTime();
        this.documentReviewTime = new Date(this.documentReviewTime).getTime();
    },
    //提交
    submitFile(){
        this.submitBoxShow = true;
        
    },
    submitSave(){
        this.$axios({
            method: "POST",
            url: baseUrl+"/prequalificaController/submit",
            data:{
                prequalificaId:this.prequalificaId
            }
        }).then(res=>{
            if(res.data.status == 200){
                this.submitBoxShow = false;
                this.nextShow = true;
                this.show = false;
                $('.new_nav').hide();
            }else{
                this.$layer.msg(res.data.msg);
                this.submitBoxShow = false;
            }
        }).catch(err=>{
            console.log(err);
        })
    },
    //打开预审文件上传弹框
    shezhi(row){
        this.file = true;
        this.uploadList();
    },
    //关闭资格预审文件上传弹框
    closeFile(){
        this.file = false;
        this.uploadList();
    },
     //上传文件
    loadFile(event){
        var file = event.target.files[0];
        var fileSize = file.size; 
        if(fileSize > 102400) {
            this.$layer.msg('图片大小不能超过102400KB');
            return false;
        }
        this.files = file;
        var formData = new FormData();
        formData.append("projectId", this.prequalificaId);
        formData.append("file", this.files);
        formData.append("user", '张三');
        formData.append("fileType", '资格预审文件');
        this.$axios({
                method: 'POST',
                url: baseUrl + '/attachmeController/multifileUpload',
                data:formData
                }).then(res=>{
                if(res.data.status == 200){
                    this.uploadList();
                }else{
                    console.log(res.data.msg)
                }
            }).catch(err=>{
                console.log(err);
            })
    },
    //上传列表
    uploadList(){
      this.$axios({
        method: 'POST',
        url: baseUrl + '/attachmeController/queryAttachme',
        data:{
            fileType:'资格预审文件',
            relevanceCorrelationId:this.prequalificaId,
        }
      }).then(res=>{
            if(res.data.status == 200){
                this.fileData = res.data.data;
                var arr = [];
                this.fileData.map((item,index)=>{
                    item.formatTime = dayjs(item.uploadTime).format('YYYY-MM-DD HH:mm:ss')
                    arr.push(item)
                })
                this.enclosureData[0].attachlist = arr
            }else{
                console.log(res.data.msg)
            }
        }).catch(err=>{
            console.log(err);
        })
    },
    downLoadupFile(item){
      this.downloadFile(item.attachmeId,item.fileName)
    },
    //删除表格checkbox
    handleSelectionChange(val){
        let deleteArr = [];
        for(let i in val){
          deleteArr.push(val[i].attachmeId);
        }
        this.attachmeId = deleteArr;
    },
    //删除文件列表
    deleteFile(){
      this.$axios({
          method: 'POST',
          url: baseUrl + '/attachmeController/deleteAttachem',
          data:{
            attachmeId:this.attachmeId
          }
        }).then(res=>{
          if(res.data.status == 200){
            this.uploadList();
            for(var i=0;i<this.fileData.length;i++){
              for(var j=0;j<this.attachmeId.length;j++){
                if(this.fileData[i].attachmeId == this.attachmeId[j]){
                  this.fileData.splice(i,1);
                }
              }
            }
          }else{
            console.log(res.data.msg)
          }
        }).catch(err=>{
          console.log(err);
        })
    },
    //下载文件列表
    downloadFile(attachmeId,fileName){
      this.$axios({
          method: 'POST',
          url: baseUrl + '/attachmeController/downloadAttachem',
          data:{
            attachmeId:attachmeId,
            fileName:fileName
          },
          responseType:'blob'
          }).then(res=>{
            var blob = res.data;
            var name = JSON.parse(res.config.data).fileName;
            var reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onload = function (e) {
            var a = document.createElement("a");
            a.download = name;
            a.href = e.target.result;
            $("body").append(a); 
            a.click();
            $(a).remove();
          }
        }).catch(err=>{
          console.log(err);
        })
    }, 
    //el-dialog弹框
    handleClose(){

    },
  },
  created(){
      this.getbiddingInfo();
      this.getStateList();
      this.getsubList();
      this.uploadList();
  },
  mounted(){}
}
</script>
<style scoped>
.myDiv {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: auto;
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
  height: 100%;
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
.el-icon-success{
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
/* 批复文件弹框 */
.mask {
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
  z-index: 8;
}
.file_box{
  width: 900px;
  height: 416px;
  z-index: 9;
  background: #ffffff;
  position: absolute;
  left: 50%;
  top:50%;
  transform: translate(-50%,-50%);
}
.file_head{
  width: 100%;
  height: 35px;
  line-height: 35px;
  display: flex;
  justify-content: space-between;
  font-size: 18px;
  background: #0058a9 ;
  color: #ffffff;
}
.file_nav{
  width: 100%;
  display: flex;
  justify-content: flex-end;
  text-align: right;
  margin-bottom: 1px;
}
.file_nav>button{
  border: none;
  background: #0095D5;
  color: #ffffff;
  padding:8px 14px;
  font-size: 16px;
  cursor: pointer;
}
.pagination {
  width: 100%;
  margin: 30px 0;
  text-align: right;
  position: fixed;
  right: 0;
  bottom: 10px;
  margin-right: 30px;
  }
  /* 新建挑选项目弹框 */
  .mask2{
    z-index: 10;
  }
  .choose_box{
  width: 95%;
  height:690px;
  z-index: 11;
  background: #ffffff;
  position: absolute;
  left: 50%;
  top:50%;
  transform: translate(-50%,-50%);
  overflow-y: hidden;
  }
  .chooseMain{
    width: 90%;
    margin: 0 auto;
  }
  .upload:hover{
    text-decoration: underline;
    color:#f00;
    cursor: pointer;
  }
  .file_btn{
    position: absolute;
    right: 65px;
    top:35px;
    display: inline-block;
    width: 59px;
    height: 40px;
    border:none;
    outline: none;
    background-color: transparent;
    filter: alpha(opacity=0);
    -moz-opacity: 0;
    -khtml-opacity: 0;
    opacity: 0;
    background: #0095d5;
    cursor: pointer;
  }
  .pass_pro{
    margin-top:10px;
  }
  .temLi{
    cursor: pointer;
  }
  .temLi:hover{
    color: #f00;
  }
</style>