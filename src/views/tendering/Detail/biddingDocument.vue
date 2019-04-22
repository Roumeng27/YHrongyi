<template>
    <div class="pageWrap">
        <div  v-show="passJudgeShow"  style="height:100%;overflow-y:hidden;">
            <!-- 上一步弹框 -->
            <div v-show="show" class="backTop" style="height:100%;overflow-y:hidden;min-width:1200px;overflow-x:scroll;">
                <div class="new_nav">
                    <button class="nav_co nav_save" @click="saveFile()">保存</button>
                    <button class="nav_co nav_next" @click="nextTo()">下一步</button>
                </div>
                <div class="new_main" style="height:99%;overflow-y:scroll;">
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
                                                    <i class="el-icon-search" style="cursor:pointer;" @click="lookFile(scope.row)"></i>
                                                </template>
                                            </el-table-column>
                                        </el-table>
                                    </div>
                                </div>
                            </div>
                        </el-collapse-item>
                        <!-- 第二步 -->
                        <el-collapse-item title="文件信息" name="2">
                            <div class="new_m_b">
                                <div class="new_m_b2">
                                    <!--文件发售时间及有效期  -->
                                    <div class="noteBox" style="margin-top:10px;">
                                        <div class="noteContent">
                                            <div class="noteLeft" style="width:160px;"><span style="color:#f00;">*</span>招标文件发售时间：</div>
                                            <div style="display:flex;" >
                                                <el-date-picker value-format="timestamp" v-model="saleDate" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
                                                </el-date-picker>
                                            </div>
                                            <div style="display: inline-flex;margin-left:10px;">
                                                <span style="width:180px;"><span style="color:#f00;">*</span>投标有效期(天)：</span>
                                                <el-input v-model="bidPeriod"></el-input>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- 答疑澄清时间 -->
                                    <div class="noteBox">
                                        <div class="noteContent">
                                        <div class="noteLeft">答疑澄清时间：</div>
                                        <div class="noteFlex">
                                            <el-date-picker value-format="timestamp"  v-model="answerTime" type="datetime" placeholder="选择日期时间">
                                            </el-date-picker>
                                        </div>
                                        </div>
                                    </div>
                                    <!-- 投标文件递交方式 -->
                                    <div class="noteBox">
                                        <div class="noteContent">
                                        <div class="noteLeft"><span style="color:#f00;">*</span>投标文件递交方式：</div>
                                        <div class="noteFlex">
                                            <el-input type="textarea" v-model="biddingDocumentsMethod"></el-input>
                                        </div>
                                        </div>
                                    </div>
                                    <!-- 开标方式 -->
                                    <div class="noteBox" style="margin-top:15px;">
                                        <div class="noteContent">
                                            <div class="noteLeft"><span style="color:#f00;">*</span>开标方式：</div>
                                            <div class="noteFlex">
                                                <el-select v-model="bidOpeningMethod" clearable>
                                                    <el-option v-for="item in openMethodData" :key="item.value" :label="item.label" :value="item.value">
                                                    </el-option>
                                                </el-select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </el-collapse-item>
                        <!-- 第三步 -->
                        <el-collapse-item title="保证金信息" name="3">
                            <div class="new_m_b">
                                <div class="new_m_b2">
                                    <!--保证金  -->
                                    <div class="noteBox" style="margin-top:10px;">
                                        <div class="noteContent">
                                            <div class="noteLeft" style="width:150px;"><span style="color:#f00;">*</span>保证金：</div>
                                            <div class="noteFlex">
                                                <el-radio-group v-model="depositType" @change="changeType()">
                                                    <el-radio label="金额">金额</el-radio>
                                                    <el-radio label="费率">费率</el-radio>
                                                </el-radio-group>
                                            </div>
                                            <div style="display: inline-flex;margin-left:30px;width:50%;">
                                                <el-input v-model="depositAmount"></el-input>&emsp;
                                                <span class="yuan">元</span>
                                            </div>
                                        </div>
                                    </div>
                                <!-- 保证金接收账户 -->
                                <div class="noteBox" style="margin-top:10px;">
                                        <div class="noteContent">
                                            <div class="noteLeft" style="width:150px;"><span style="color:#f00;">*</span>保证金接收账户：</div>
                                            <div class="noteFlex">
                                                <el-input v-model="depositReceive"></el-input>
                                            </div>
                                            <div style="display: inline-flex;margin-left:30px;">
                                                <el-button>设置账户</el-button>
                                            </div>
                                        </div>
                                    </div>
                                <!--保证金递交方式  -->
                                <div class="noteBox">
                                        <div class="noteContent">
                                            <div class="noteLeft">保证金递交方式：</div>
                                            <div class="noteFlex">
                                                <el-checkbox-group v-model="methodArr">
                                                    <el-checkbox label="银行本票"></el-checkbox>
                                                    <el-checkbox label="银行汇票"></el-checkbox>
                                                    <el-checkbox label="转账支票"></el-checkbox>
                                                    <el-checkbox label="电汇"></el-checkbox>
                                                    <el-checkbox label="保函"></el-checkbox>
                                                    <el-checkbox label="在线支付"></el-checkbox>
                                                </el-checkbox-group>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </el-collapse-item>
                    </el-collapse>
                </div>
            </div>
            <!-- 招标文件下一步弹框 -->
            <div v-show="nextShow" style="height:100%;overflow-y:hidden;min-width:1200px;overflow-x:scroll;">
                <div class="new_nav">
                    <button class="nav_co nav_save" @click="submitFile()">提交</button>
                    <button class="nav_co nav_next" @click="backTo()">上一步</button>
                </div>
                <div style="height:99%;overflow-y:scroll;">
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
                                                <i class="el-icon-search" style="cursor:pointer;" @click="lookFile(scope.row)"></i>
                                            </template>
                                        </el-table-column>
                                    </el-table>
                                </div>
                            </div>
                        </div>
                    </el-collapse-item>
                    <!-- 场地预约 -->
                    <el-collapse-item title="相关附件" name="2">
                        <div class="notic">注：请上传确认函扫描件或由招标（采购）人对“招标公告”在线签章。</div>
                        <el-table :data="enclosureData" stripe style="width: 100%">
                            <el-table-column  prop="aaa"  label="附件名称" width="200px;">
                            </el-table-column>
                            <el-table-column  prop="number"  label="附件列表(点击查看)">
                            </el-table-column>
                        </el-table>
                    </el-collapse-item>
                    <!-- 文件信息 -->
                    <el-collapse-item title="文件信息" name="3">
                        <ul class="contentBox">
                            <li>
                                <p>文件编号：<span>{{projectNum}}</span></p>
                            </li>
                            <li>
                                <p>招标文件发售时间：<span>{{saleStartDate}}</span>到<span>{{saleEndDate}}</span></p>
                                <p>投标有效期：<span>{{bidPeriod}}</span> 天</p>
                            </li>
                            <li>
                                <p>答疑澄清时间：<span>{{answerTime}}</span></p>
                            </li>
                            <li>
                                <p>投标文件递交方式：<span>{{biddingDocumentsMethod}}</span></p>
                            </li>
                            <li>
                                <p>开标方式：<span>{{bidOpeningMethod}}</span></p>
                            </li>
                        </ul>
                    </el-collapse-item>
                    <!-- 保证金信息 -->
                    <el-collapse-item title="保证金信息" name="4">
                            <ul class="contentBox">
                            <li>
                                <p>保证金金额：<span>{{depositAmount}}</span>元</p>
                            </li>
                            <li>
                                <p>保证金接收账户：<span>{{depositReceive}}</span></p>
                            </li>
                            <li>
                                <p>保证金允许递交方式：<span>{{depositMethodStr}}</span></p>
                            </li>
                        </ul>
                    </el-collapse-item>
                    <!-- 办理记录 -->
                    <el-collapse-item title="办理记录" name="5">
                        <el-table :data="handleRecordData" stripe style="width: 100%">
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
                                            <span>{{subcontractContents}}</span>
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
                    <i class="el-icon-question"></i>
                    <span>保存成功！</span>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="sureSave()">确 定</el-button>
                </span>
            </el-dialog>
            <!-- 确认提交弹窗 -->
            <el-dialog
                title="执行成功"
                :visible.sync="submitBox"
                width="40%"
                :before-close="handleClose">
                <div class="icon">
                    <i class="el-icon-question"></i>
                    <span>提交成功！</span>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="submitSave()">确 定</el-button>
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
                    <span>场地尚未预约成功，无法进行招标招标文件操作!</span>
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
        data(){
            return {
                frameShow:false,
                passJudgeShow:true,
                totalProjectId:'',
                entrySubcontractNumber:'',
                electronicBidEvaluation:'',//电子化开评标
                qualificationExaminationMethod:'',//资格审查方式
                subcontractingControlAmount:'',//分包控制金额
                subcontractContents:'',//分包范围
                subcontractContents:'',//分包内容
                subcontractName:'',//分包名称
                projectObj:JSON.parse(window.localStorage.projectObj),
                saveBox:false,//保存成功弹框
                submitBox:false,//提交成功弹框
                show:true,
                nextShow:false,
                subcontractInforShow:false,//查看分包信息弹框
                activeName:['1','2','3'],
                enclosureData:[],
                currentPage:1,//当前页
                nameOfTenderProject:'',//招标名称
                nameOfPurchaser:'',//招标采购人
                amountOfBiddingProject:'',//招标项目金额
                biddingProjectNumber:'',//招标项目编号
                totalProId:'',//入场项目编号
                value6:'',
                openMethodData:[],//开标方式数据
                checkList:'',//多选框
                saleDate:[],
                saleStartDate:'',//招标发售开始时间
                saleEndDate:'',
                bidPeriod:'',//投标有效期
                answerTime:'',//答疑澄清时间
                biddingDocumentsMethod:'',
                bidOpeningMethod:'',//开标方式
                depositType:'',
                depositAmount:'',//保证金数量
                depositReceive:'',//保证金接收账户
                methodArr:[],
                depositMethod:[],//保证金递交方式
                depositMethodStr:'',//字符串保证金递交方式
                projectNum:'',//文件项目编号
                tenderInforId:'',//点击下一步返回的id
                projectEntrySubcontractNumbers:[],//分包信息表格的数组格式
                EntrySubNum:'',
                handleRecordData:[],
                zhuangtai:'',
                bidDocumentId:'',//主键id
            }
        },
        methods:{
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
            //招标文件信息查询(公共)
            getProjectList(){
                let object={}
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
                    method:'POST',
                    url:baseUrl+'/BidDocumentController/selectList',
                    data:object
                }).then(res=>{
                     res.data.data.map((item,index)=>{
                        this.zhuangtai = item.state;
                        this.bidDocumentId = item.bidDocumentId;
                    })
                    if(res.data.data.length == 0 || this.zhuangtai == null){
                        if(this.projectObj.totalProjectId.indexOf("-") != -1){
                            $('.table_box').show();
                        }else{
                            $('.table_box').hide();
                        }
                        this.show = true;
                    }else if(this.zhuangtai == '编辑中' || this.zhuangtai == '办理未通过'){
                        this.nextShow = true;
                        this.show = false;
                        res.data.data.map((item,index)=>{
                            if(this.projectObj.totalProjectId.indexOf("-") != -1){
                                this.projectNum = item.entrySubcontractNumber;
                            }else{
                                this.projectNum = item.projectCode;
                                $('.table_box').hide();
                            }
                            this.saleStartDate =  dayjs(item.saleStartDate).format('YYYY-MM-DD');
                            this.saleEndDate =  dayjs(item.saleEndDate).format('YYYY-MM-DD');
                            this.bidPeriod = item.bidPeriod;
                            this.answerTime = dayjs(item.answerTime).format('YYYY-MM-DD HH:mm:ss');
                            this.bidOpeningMethod = item.bidOpeningMethod;
                            this.depositType = item.depositType;
                            this.depositAmount =item.depositAmount;
                            this.depositReceive = item.depositReceive;
                            this.methodArr = item.depositMethod.split(',');
                        })
                        
                    }else if(this.zhuangtai == '办理通过' || this.zhuangtai == '待办理'){
                        $('.new_nav').hide();
                        this.nextShow = true;
                        this.show = false;
                        res.data.data.map((item,index)=>{
                            if(this.projectObj.totalProjectId.indexOf("-") != -1){
                                this.projectNum = item.entrySubcontractNumber;
                            }else{
                                this.projectNum = item.projectCode;
                                $('.table_box').hide();
                            }
                            this.saleStartDate =  dayjs(item.saleStartDate).format('YYYY-MM-DD');
                            this.saleEndDate =  dayjs(item.saleEndDate).format('YYYY-MM-DD');
                            this.bidPeriod = item.bidPeriod;
                            this.answerTime = dayjs(item.answerTime).format('YYYY-MM-DD HH:mm:ss');
                            this.bidOpeningMethod = item.bidOpeningMethod;
                            this.depositType = item.depositType;
                            this.depositAmount =item.depositAmount;
                            this.depositReceive = item.depositReceive;
                            this.depositMethodStr = item.depositMethod;
                        })
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
                        this.enclosureData = res.data.data
                    }else{
                        this.$layer.msg(res.data.msg);
                    }
                }).catch(err=>{
                    console.log(err)
                })
            },
            //下一步
            nextTo(){
                // if(!this.saleStartDate){
                //     this.$layer.msg('请选择招标文件发售开始时间');
                //     return false;
                // }else if(!this.saleStartDate){
                //     this.$layer.msg('请选择招标文件发售结束时间');
                //     return false;
                // }else if(!this.bidPeriod){
                //     this.$layer.msg('请输入投标有效期');
                //     return false;
                // }else if(!this.answerTime){
                //     this.$layer.msg('请选择答疑澄清时间');
                //     return false;
                // }else if(!this.biddingDocumentsMethod){
                //     this.$layer.msg('请填入投标文件递交方式');
                //     return false;
                // }else if(!this.bidOpeningMethod){
                //     this.$layer.msg('请选择开标方式');
                //     return false;
                // }else if(!this.depositType){
                //     this.$layer.msg('请选择保证金类型');
                //     return false;
                // }else if(!this.depositAmount){
                //     this.$layer.msg('请填写保证金数量');
                //     return false;
                // }else if(!this.depositReceive){
                //     this.$layer.msg('请填写保证金接收账户');
                //     return false;
                // }
                this. getRecordList();
                let objectData = {};
                // 入场项目(分包)编号
                if(this.projectObj.totalProjectId.indexOf("-") != -1){
                    // 分包
                    objectData={
                        entrySubcontractNumber:this.projectObj.totalProjectId,
                        saleStartDate:this.saleDate[0],
                        saleEndDate:this.saleDate[1],
                        bidPeriod:this.bidPeriod,
                        answerTime:this.answerTime,
                        biddingDocumentsMethod:this.biddingDocumentsMethod,
                        bidOpeningMethod:this.bidOpeningMethod,
                        depositType:this.depositType,
                        depositAmount:this.depositAmount,
                        depositReceive:this.depositReceive,
                        depositMethod:this.methodArr.join(',')
                    }
                }else{
                    // 总包
                    objectData={
                        projectCode:this.projectObj.totalProjectId,
                        saleStartDate:this.saleDate[0],
                        saleEndDate:this.saleDate[1],
                        bidPeriod:this.bidPeriod,
                        answerTime:this.answerTime,
                        biddingDocumentsMethod:this.biddingDocumentsMethod,
                        bidOpeningMethod:this.bidOpeningMethod,
                        depositType:this.depositType,
                        depositAmount:this.depositAmount,
                        depositReceive:this.depositReceive,
                        depositMethod:this.methodArr.join(',')
                    }
                }
                this.$axios({
                    method:'POST',
                    url:baseUrl+'/BidDocumentController/insert',
                    data:objectData
                }).then(res=>{
                    if(res.data.status == 200){
                        this.nextShow = true;
                        this.show = false;
                        if(this.projectObj.totalProjectId.indexOf("-") != -1){
                            this.projectNum = res.data.data.entrySubcontractNumber;
                        }else{
                            this.projectNum = res.data.data.projectCode;
                        }
                        if(res.data.data.saleStartDate == null){
                            this.saleStartDate = ""
                        }else{
                            this.saleStartDate =  dayjs(res.data.data.saleStartDate).format('YYYY-MM-DD');
                        };
                        if(res.data.data.saleEndDate == null){
                            this.saleEndDate = ""
                        }else{
                            this.saleEndDate =  dayjs(res.data.data.saleEndDate).format('YYYY-MM-DD');
                        };
                        
                        this.bidPeriod = res.data.data.bidPeriod;
                        if(res.data.data.answerTime == null){
                            this.answerTime == ""
                        }else{
                            this.answerTime = dayjs(res.data.data.answerTime).format('YYYY-MM-DD HH:mm:ss');
                        }
                        this.biddingDocumentsMethod = res.data.data.biddingDocumentsMethod;
                        this.bidOpeningMethod = res.data.data.bidOpeningMethod;
                        this.depositType = res.data.data.depositType;
                        this.depositAmount =res.data.data.depositAmount;
                        this.depositReceive = res.data.data.depositReceive;
                        this.depositMethodStr = res.data.data.depositMethod;
                        this.bidDocumentId = res.data.data.bidDocumentId;
                    }else{
                        this.$layer.msg(res.data.msg);
                    }
                }).catch(err=>{
                    console.log(err);
                })
            },
            //保存
            saveFile(){
                this.saveBox = true;
            },
            sureSave(){
                // if(!this.saleStartDate){
                //     this.$layer.msg('请选择招标文件发售开始时间');
                //     return false;
                // }else if(!this.saleStartDate){
                //     this.$layer.msg('请选择招标文件发售结束时间');
                //     return false;
                // }else if(!this.bidPeriod){
                //     this.$layer.msg('请输入投标有效期');
                //     return false;
                // }else if(!this.answerTime){
                //     this.$layer.msg('请选择答疑澄清时间');
                //     return false;
                // }else if(!this.biddingDocumentsMethod){
                //     this.$layer.msg('请填入投标文件递交方式');
                //     return false;
                // }else if(!this.bidOpeningMethod){
                //     this.$layer.msg('请选择开标方式');
                //     return false;
                // }else if(!this.depositType){
                //     this.$layer.msg('请选择保证金类型');
                //     return false;
                // }else if(!this.depositAmount){
                //     this.$layer.msg('请填写保证金数量');
                //     return false;
                // }else if(!this.depositReceive){
                //     this.$layer.msg('请填写保证金接收账户');
                //     return false;
                // }
                // this.depositMethodStr = this.depositMethod.join(',');
                let objectData = {};
                // 入场项目(分包)编号
                if(this.projectObj.totalProjectId.indexOf("-") != -1){
                    // 分包
                    objectData={
                        entrySubcontractNumber:this.projectObj.totalProjectId,
                        saleStartDate:this.saleDate[0],
                        saleEndDate:this.saleDate[1],
                        bidPeriod:this.bidPeriod,
                        answerTime:this.answerTime,
                        biddingDocumentsMethod:this.biddingDocumentsMethod,
                        bidOpeningMethod:this.bidOpeningMethod,
                        depositType:this.depositType,
                        depositAmount:this.depositAmount,
                        depositReceive:this.depositReceive,
                        depositMethod:this.methodArr.join(',')
                    }
                }else{
                    // 总包
                    objectData={
                        projectCode:this.projectObj.totalProjectId,
                        saleStartDate:this.saleDate[0],
                        saleEndDate:this.saleDate[1],
                        bidPeriod:this.bidPeriod,
                        answerTime:this.answerTime,
                        biddingDocumentsMethod:this.biddingDocumentsMethod,
                        bidOpeningMethod:this.bidOpeningMethod,
                        depositType:this.depositType,
                        depositAmount:this.depositAmount,
                        depositReceive:this.depositReceive,
                        depositMethod:this.methodArr.join(',')
                    }
                }
                this.$axios({
                    method:'POST',
                    url:baseUrl+'/BidDocumentController/insert',
                    data:objectData
                }).then(res=>{
                    if(res.data.status == 200){
                        this.show = true;
                        this.saveBox = false;
                    }else{
                        this.$layer.msg(res.data.msg);
                    }
                }).catch(err=>{
                    console.log(err);
                })
            },
            handleClose(){
                this.saveBox = false;
                this.submitBox = false;
                this.frameShow = false;
            },
            //编号问题
            typeIndex(index) {
                return index + (this.currentPage - 1) * 10 + 1;
            },
            //下拉框--》开标方式
            titleExaminationList(){
                this.$axios({
                    method:'POST',
                    url:baseUrl+'/interfaceTableController/selectByname',
                    data:{
                        dropDownBox:'开标方式'
                    }
                }).then(res=>{
                    if(res.data.data.status == 200){
                        this.openMethodData = res.data.data.data;
                    }else{
                        this.$layer.msg(res.data.data.msg)
                    }
                }).catch(err=>{
                    console.log(err)
                })
            },
            //查看分包信息
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
            },
            //上一步
            backTo(){
                this.saleDate = [];
                this.nextShow = false;
                this.show = true;
                this.answerTime = new Date(this.answerTime).getTime();
                this.saleStartDate = new Date(this.saleStartDate).getTime();
                this.saleEndDate = new Date(this.saleEndDate).getTime();
                this.saleDate.push(this.saleStartDate,this.saleEndDate);
            },
            //提交
            submitFile(){
                this.submitBox = true;
                
            },
            submitSave(){
                this.$axios({
                    method:'POST',
                    url:baseUrl+'/BidDocumentController/updateById',
                    data:{
                        state:'待办理',
                        bidDocumentId:this.bidDocumentId
                    }
                }).then(res=>{
                    if(res.data.status == 200){
                        this.submitBox = false;
                        $('.new_nav').hide();
                        this.nextShow = true;
                    }else{
                        this.$layer.msg(res.data.msg);
                    }
                }).catch(err=>{
                    console.log(err)
                })
            },
            //保证金方式的不同，后面单位不同
            changeType(){
                if(this.depositType == "金额"){
                    $('.yuan').html('元')
                }else{
                    $('.yuan').html('%')
                }
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
                            if(item.value == "场地预约" && item.state == "办理通过"){
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
                        this.$layer.msg(res.data.msg)
                    }
                }).catch(err=>{
                    console.log(err)
                })
            }
        },
        created(){
            // this.getDecideList();
            this.getbiddingInfo();
            this.titleExaminationList();
            this.getProjectList();
            this.getsubList();
            this. getRecordList();
        }
    }
</script>

<style scoped>
.pageWrap{
    width: 100%;
    height: 100%;
}
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
    
</style>