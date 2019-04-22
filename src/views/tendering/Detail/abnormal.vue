<template>
    <div class="newBox">
        <!-- 招标异常 -->
        <div class="wrapper" v-show="writeFlag">
            <div class="box">
                <button class="btn" @click="newly(1)">保存</button>
                <button class="btn" @click="newly(2)">下一步</button>
            </div>
            <el-collapse v-model="activeName" accordion>
                <!--招标项目信息 -->
                <el-collapse-item title="招标项目信息" name="1">
                    <div class="edit_list">
                        <div class="editItem">
                            <div class="editCenter">
                                <div class="editName">招标项目名称：</div>
                                <div class="editContent">{{nameOfTenderProject}} </div>
                            </div>
                        </div>
                        <div class="editItem">
                            <div class="editCenter">
                                <div class="editName">招标项目编号：</div>
                                <div class="editContent">{{biddingProjectNumber}}</div>
                            </div>
                            <div class="editCenter">
                                <div class="editName">招标项目预算金额：</div>
                                <div class="editContent">{{budgetAmount}}万元</div>
                            </div>
                        </div>
                        <div class="editItem">
                            <div class="editCenter">
                                <div class="editName">招标(采购)人：</div>
                                <div class="editContent">{{nameOfPurchaser}}</div>
                            </div>
                            <div class="editCenter">
                                <div class="editName">入场项目编号：</div>
                                <div class="editContent">{{amountId}}</div>
                            </div>
                        </div>
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
                <!-- 异常处理 -->
                <el-collapse-item title="异常处理" name="2">
					<div class="edit_list">
                        <div class="noteBox">
                            <div class="noteItem">
                                <div class="noteLeft">异常情况描述：</div>
                                <div class="write_textarea">
                                    <el-input v-model="exceptionDescription" type="textarea"></el-input>
                                </div>
                            </div>
                        </div>
                        <div class="noteBox">
                            <div class="noteItem">
                                <div class="noteLeft">审批或核准结果：</div>
                                <div class="write_textarea">
                                    <el-input v-model="approvedResult" type="textarea"></el-input>
                                </div>
                            </div>
                        </div>
						<div class="noteBox">
                            <div class="noteItem">
                                <div class="noteLeft"> 审批或核准时间：</div>
                                <div class="write_input">
                                    <el-date-picker
                                        v-model="approvedTime"
                                    >
                                    </el-date-picker>
                                </div>
                            </div>
                        </div>
						<div class="noteBox">
                            <div class="noteItem">
                                <div class="noteLeft">异常类型：</div>
                                <div class="write_radio">
                                    <el-radio v-model="exceptionTypes" label="终止招标">终止招标</el-radio>
                                    <el-radio v-model="exceptionTypes" label="重新招标">重新招标</el-radio>
                                    <el-radio v-model="exceptionTypes" label="变更采购方式">变更采购方式</el-radio>
                                </div>
                            </div>
                        </div>
                        <div class="noteBox">
                            <div class="noteItem">
                                <div class="noteLeft">是否发布公告：</div>
                                <div class="write_input">
                                   <el-checkbox v-model="isNotice" @change="getisNoticeInfo">是</el-checkbox>
                                </div>
                            </div>
                        </div>
                        <div v-show="showEditFlag">
                            <div class="noteBox">
                                <div class="noteItem">
                                    <div class="noteLeft"><p class="star">*</p>网站显示公告标题：</div>
                                    <div class="write_textarea">
                                        <el-input v-model="noticeTitle"></el-input>
                                    </div>
                                </div>
                            </div>
                            <div class="noteBox">
                                <div class="noteItem">
                                    <div class="noteLeft">公告开始时间：</div>
                                    <div class="write_input">
                                        <el-date-picker
                                            v-model="noticeStartTime"
                                            >
                                        </el-date-picker>
                                    </div>
                                </div>
                                <div class="noteItem">
                                    <div class="noteLeft"> 公告结束时间：</div>
                                    <div class="write_input">
                                        <el-date-picker
                                            v-model="noticeEndTime">
                                        </el-date-picker>
                                    </div>
                                </div>
                            </div>
                        </div>
					</div>
                </el-collapse-item>
                <!-- 公告内容 -->
                <el-collapse-item title="公告内容" name="3" v-show="showEditFlag">
                    <div class="editor-container" style="padding:10px 0;">
                        <quill-editor v-model="noticeContent"
                            ref="myQuillEditor"
                            class="editer"
                            :options="editorOption">
                        </quill-editor>
                    </div>
                </el-collapse-item>
				<!-- 已发布公告情况-->
                <el-collapse-item title="已发布公告情况" name="3">
					<el-table
                            ref="multipleTable"
                            :data="tableData"
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
                            label="发布状态">
                        </el-table-column>
                        <el-table-column
                            label="公告开始时间">
                            <template slot-scope="scope">
								
							</template>
                        </el-table-column>
                        <el-table-column
                            label="公告截止时间">
                            <template slot-scope="scope">
								
							</template>
                        </el-table-column>
                    </el-table>
                </el-collapse-item>
                 <!-- 历史记录 -->
                <el-collapse-item title="历史记录" name="4">
                   <el-table
                        ref="multipleTable"
                        :data="tableData"
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
                        label="招标项目名称">
                    </el-table-column>
                    <el-table-column
                        prop="subcontractingControlAmount"
                        label="分包名称">
                    </el-table-column>
                    <el-table-column
                        label="处理结果">
                        <template slot-scope="scope">
                            
                        </template>
                    </el-table-column>
                </el-table>
                </el-collapse-item>
            </el-collapse>
        </div>
        <div class="nextWrapper" v-show="showFlag">
            <div class="box" v-show="headerBtn">
                <button class="btn" @click="goBack">上一步</button>
                <button class="btn" @click="submit">提交</button>
            </div>
            <el-collapse v-model="activeName" accordion>
                <!-- 招标项目信息 -->
                <el-collapse-item title="招标项目信息" name="1">
                   <div class="edit_list">
                        <div class="editItem">
                            <div class="editCenter">
                                <div class="editName">招标项目名称：</div>
                                <div class="editContent">{{nameOfTenderProject}} </div>
                            </div>
                        </div>
                        <div class="editItem">
                            <div class="editCenter">
                                <div class="editName">招标项目编号：</div>
                                <div class="editContent">{{biddingProjectNumber}}</div>
                            </div>
                            <div class="editCenter">
                                <div class="editName">招标项目预算金额：</div>
                                <div class="editContent">{{budgetAmount}}万元</div>
                            </div>
                        </div>
                        <div class="editItem">
                            <div class="editCenter">
                                <div class="editName">招标(采购)人：</div>
                                <div class="editContent">{{nameOfPurchaser}}</div>
                            </div>
                            <div class="editCenter">
                                <div class="editName">入场项目编号：</div>
                                <div class="editContent">{{amountId}}</div>
                            </div>
                        </div>
                    </div>
                </el-collapse-item>
                <!-- 附件 -->
                <el-collapse-item title="附件" name="2">
                    <div class="notic">注：请上传确认函扫描件或由招标（采购）人对“招标公告”在线签章。</div>
                    <el-table :data="tableData" stripe style="width: 100%">
                        <el-table-column  prop="index"  label="附件名称">
                        </el-table-column>
                        <el-table-column  prop="number"  label="附件列表">
                        </el-table-column>
                    </el-table>
                </el-collapse-item>
                <!-- 异常处理 -->
                <el-collapse-item title="异常处理" name="3">
                    <div class="edit_list">
                        <div class="editItem">
                            <div class="editCenter">
                                <div class="editName">异常情况描述：</div>
                                <div class="editContent">{{exceptionDescription}} </div>
                            </div>
                        </div>
                        <div class="editItem">
                            <div class="editCenter">
                                <div class="editName">审批或核准结果：</div>
                                <div class="editContent">{{approvedResult}}</div>
                            </div>
                        </div>
                        <div class="editItem">
                            <div class="editCenter">
                                <div class="editName">审批或核准时间：</div>
                                <div class="editContent">{{approvedTime}}</div>
                            </div>
                        </div>
                        <div class="editItem">
                            <div class="editCenter">
                                <div class="editName">异常类型：</div>
                                <div class="editContent">{{exceptionTypes}}</div>
                            </div>
                        </div>
                        <div class="editItem">
                            <div class="editCenter">
                                <div class="editName">是否发布公告：</div>
                                <div class="editContent">{{isNotice == true ?'是':'否'}}</div>
                            </div>
                        </div>
                        <div v-show="showEditFlag">
                            <div class="noteBox">
                                <div class="noteItem">
                                    <div class="noteLeft">网站显示公告标题：</div>
                                    <div class="editContent">
                                        {{noticeTitle}}
                                    </div>
                                </div>
                            </div>
                            <div class="noteBox">
                                <div class="noteItem">
                                    <div class="noteLeft">公告开始时间：</div>
                                    <div class="editContent">
                                        {{noticeStartTime}}
                                    </div>
                                </div>
                                <div class="noteItem">
                                    <div class="noteLeft"> 公告结束时间：</div>
                                    <div class="editContent">
                                        {{noticeEndTime}}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </el-collapse-item>
				 <!-- 已发布公告情况 -->
                <el-collapse-item title="已发布公告情况" name="4">
                    <el-table
                            ref="multipleTable"
                            :data="tableData"
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
                            label="发布状态">
                        </el-table-column>
                        <el-table-column
                            label="公告开始时间">
                            <template slot-scope="scope">
								
							</template>
                        </el-table-column>
                        <el-table-column
                            label="公告截止时间">
                            <template slot-scope="scope">
								
							</template>
                        </el-table-column>
                    </el-table>
                </el-collapse-item>
                <!-- 历史记录 -->
                <el-collapse-item title="历史记录" name="5">
                    <el-table
                            ref="multipleTable"
                            :data="tableData"
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
                            label="招标项目名称">
                        </el-table-column>
                        <el-table-column
                            prop="subcontractingControlAmount"
                            label="分包名称">
                        </el-table-column>
                        <el-table-column
                            label="处理结果">
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
               	<div class="pick_title">
                    <p>分包信息</p>
                    <i class="el-icon-close" @click="closeLook"></i>
                </div>
				<el-collapse v-model="activeName" accordion>
					<!-- 招标项目信息 -->
					<el-collapse-item title="招标项目信息" name="1">
                        <div class="edit_list">
                            <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName">招标项目名称：</div>
                                    <div class="editContent">{{nameOfTenderProject}} </div>
                                </div>
                                <div class="editCenter">
                                    <div class="editName">招标项目编号：</div>
                                    <div class="editContent">{{biddingProjectNumber}} </div>
                                </div>
                            </div>
                            <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName">招标(采购)人：</div>
                                    <div class="editContent">{{nameOfPurchaser}}</div>
                                </div>
                            </div>
                            <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName">入场项目编号：</div>
                                    <div class="editContent">{{amountId}}</div>
                                </div>
                            </div>
                        </div>
					</el-collapse-item>
					 <!-- 分包信息-->
					<el-collapse-item title="分包信息" name="2">
                        <div class="edit_list">
                            <div class="editItem">
                                <div class="editCenter" style="color:red;">
                                    <div class="editName">标段包编号(赋码)：</div>
                                    <div class="editContent"> </div>
                                </div>
                            </div>
                            <div class="editItem">
                                <div class="editCenter" style="color:red;">
                                    <div class="editName">统一交易标志码：</div>
                                    <div class="editContent"> </div>
                                </div>
                            </div>
                            <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName">入场项目分包编号：</div>
                                    <div class="editContent">{{entrySubcontractNumber}} </div>
                                </div>
                            </div>
                            <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName">分包名称：</div>
                                    <div class="editContent">{{subcontractName}} </div>
                                </div>
                            </div>
                            <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName">分包内容：</div>
                                    <div class="editContent">{{nameOfPurchaser}} </div>
                                </div>
                            </div>
                            <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName">招标范围：</div>
                                    <div class="editContent">{{subcontractContents}} </div>
                                </div>
                            </div>
                            <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName">分包控制金额：</div>
                                    <div class="editContent">{{subcontractingControlAmount}}<b style="color:#000;">万元</b></div>
                                </div>
                                <div class="editCenter">
                                    <div class="editName">资格审查方式：</div>
                                    <div class="editContent">{{qualificationExaminationMethod}}</div>
                                </div>
                            </div>
                            <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName">是否电子招投标：</div>
                                    <div class="editContent">{{electronicBidEvaluation}} </div>
                                </div>
                            </div>
                        </div>
					</el-collapse-item>
				</el-collapse>
            </div>
        </div>
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
        <!-- 点击上一步弹窗 -->
        <el-dialog
            title="信息确认"
            :visible.sync="laststepBox"
            width="40%"
            :before-close="handleClose">
            <div class="icon">
                <i class="el-icon-question"></i>
                <span>修改信息将导致电子件列表中的 [招标公告] 重新生成，您确认要继续吗？</span>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="laststepBoxSure()">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 提交弹窗 -->
        <el-dialog
            title="请输入意见"
            :visible.sync="submitBox"
            width="50%">
            <div class="dialog_header">
                <div class="left">
                    <el-button type="primary" @click="sureSubmit">确认提交</el-button>
                    <el-button type="primary" @click="handleClose">取消</el-button>
                    <el-checkbox v-model="remind">手机短信提醒</el-checkbox>
                </div>
                <p>当前步骤: <span>中标候选人公示提交 </span></p>
            </div>
        </el-dialog>
        <!-- 确认提交弹窗 -->
        <el-dialog
            title="执行成功"
            :visible.sync="sureSubmitBox"
            width="40%"
            :before-close="handleClose">
            <div class="icon">
                <i class="el-icon-success"></i>
                <span>提交招标公告成功！</span>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="sure()">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import '../../../assets/css/style.css'
import baseUrl from '../../../api/api'
import { quillEditor } from 'vue-quill-editor' //调用编辑器
import {formatDate,changeTime} from '../../../api/base.js'
export default {
    components: {
        //使用编辑器
        quillEditor
    },
    data(){
        return {
			projectObj:JSON.parse(window.localStorage.projectObj),
            activeName:['1','2','3','4','5','6'],
            tableData:[],
            multipleSelection:[],//多选框
			writeFlag:true,// 总包输入 列表
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
            // 下一步页面
            showFlag:false,
            projectLeaderPhone:'',//联系方式
            remark:'',// 备注
            // 上一步所需字段
            laststepBox:false,
            // 提交弹窗
            submitBox:false,
            remind:'',//手机短信提醒
            // 确定提交
            sureSubmitBox:false,
            headerBtn:true,
			candidateMenu:[],// 分包列表
			nameOfTenderProject:'',// 招标项目名称
			biddingProcurementMode:'',// 招标方式
			name:'',// 分包项目名称
			number:'',// 入场项目分包编号 (分包列表)
			subpackageData:[],// 确定选择的列表
            // 办理记录
            manageDate:[],
            creationTime:'',// 时间
            // 输入所需字段
            exceptionDescription:'',//异常情况描述 
            approvedResult:'',// 审核或核准结果 
            approvedTime:'',//审核或批准时间 
            exceptionTypes:'终止招标',// 异常类型
            isNotice:false,// 是否发布公告 
            noticeContent:'',// 公告内容
            noticeTitle:'',// 网站显示公告标 题 
            noticeStartTime:'',// 公告开始时间 
            noticeEndTime:'',// 公告结束时间 
            id:'',// 招标异常id
            // 富文本编辑所需字段
            showEditFlag:false,
            editorOption: {},
            // 招标信息 下边的分包信息(总包不显示 分包显示)
            breakBagFlag:false,
            // 中标信息详情
			lookFlag:false,
			scopeOfTender:'',// 招标范围
			subcontractingControlAmount:'',// 分包控制金额
			qualificationExaminationMethod:'',// 资格审查方式	
			electronicBidEvaluation:'',// 是否电子招投标
			subcontractContents:'',// 分包内容
			subcontractName:'',// 分包名称 
            totalProjectId:'',
        }
    },
    computed: {
      editor() {
        return this.$refs.myQuillEditor.quill
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
        this.getmanageInfo();// 办理记录
        this.getInitInfo();// 招标异常数据

        // 审核或批准时间
    },
    methods:{
        // 复选框的列表
        handleSelectionChange(val) {
			this.multipleSelection = val;
        },
        // 判断富文本编辑器是否展示
        getisNoticeInfo(){
            if(this.isNotice == true){
                this.showEditFlag = true;
            }else{
                this.showEditFlag = false;
            }
        },
        // 保存和下一步公用方法
        newly(num){
            if(num == 1 || num == 3){
                // 保存
                this.savecandidateInfo(num)
            }else{
                // 下一步
                this.writeFlag = false;// 输入框的页面
                this.showFlag = true;// 下一步页面
                this.approvedTime = changeTime(this.approvedTime);//审核或批准时间 
                this.noticeStartTime = changeTime(this.noticeStartTime);//公告开始时间
                this.noticeEndTime = changeTime(this.noticeEndTime);//公告结束时间
				this.savecandidateInfo(num)
                this.getmanageInfo();// 办理记录
                if(this.isNotice == true){
                   this.showEditFlag = true;
                }else{
                    this.showEditFlag = false;
                }
            }
        },
        // 上一步
        goBack(){
            this.laststepBox = true;// 上一步弹窗 确定
            this.writeFlag = true;// 输入框的页面
            this.showFlag = false;// 下一步页面
        },
        // 提交
        submit(){
            this.submitBox = true;
        },
        // 确认提交
        sureSubmit(){
            this.$axios({
                method: "POST",
                url: baseUrl+"/tenderExceptionController/submit",
                data:{
                    id:this.id,// 工本费接收账户id 
                }
            }).then(res=>{
                if(res.data.status == 200){
                    this.submitBox = false;
                }else{
                    this.$layer.msg(res.data.msg);
                }
            }).catch(err=>{
                console.log(err)
            })
            this.submitBox = false;
            this.sureSubmitBox = true;// 确定提交弹窗
        },
        // 确认提交 ---> 确定
        sure(){
            this.sureSubmitBox = false;// 确定提交弹窗
            this.headerBtn = false;
            this.showFlag = true;
        },
        handleClose(){
            this.saveBox = false;// 保存弹窗 确定
            this.laststepBox = false;// 上一步弹窗 确定
            this.submitBox = false;// 提交弹窗
        },
        // 保存弹窗 确定
        saveBoxSure(){
            this.saveBox = false;
        },
        // 上一步弹窗 确定
        laststepBoxSure(){
            this.laststepBox = false;
            this.getLastTempInfo();// 上一步的查询
        },
        // 查看
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
        // 保存
        savecandidateInfo(num){
            let checked = ''
            if(this.isNotice == true){
               checked = '是'
            }else{
                checked = '否'
            }
            // 去除所有的标签
            let reg=/<\/?.+?\/?>/g;
            let object = {}
            if(this.projectObj.totalProjectId.indexOf("-") != -1){
                // 分包
                object = {
                    entrySubcontractNumber:this.entrySubcontractNumber,
                    exceptionDescription:this.exceptionDescription,
                    approvedResult:this.approvedResult,
                    approvedTime:changeTime(this.approvedTime),
                    exceptionTypes:this.exceptionTypes,
                    isNotice:checked,
                    noticeContent:this.noticeContent.replace(reg,''),
                    noticeTitle:this.noticeTitle,
                    noticeStartTime:changeTime(this.noticeStartTime),
                    noticeEndTime:changeTime(this.noticeEndTime),
                    id:this.id
                }
            }else{
                // 总包
                object = {
                    projectCode:this.projectCode,
                    entrySubcontractNumber:this.entrySubcontractNumber,
                    exceptionDescription:this.exceptionDescription,
                    approvedResult:this.approvedResult,
                    approvedTime:changeTime(this.approvedTime),
                    exceptionTypes:this.exceptionTypes,
                    isNotice:checked,
                    noticeContent:this.noticeContent.replace(reg,''),
                    noticeTitle:this.noticeTitle,
                    noticeStartTime:changeTime(this.noticeStartTime),
                    noticeEndTime:changeTime(this.noticeEndTime),
                    id:this.id
                }
            }
            this.$axios({
                method:'POST',
                url:baseUrl + '/tenderExceptionController/saveOrNextStep',
                data:object
            }).then(res=>{
                if(res.data.status == 200){
                    if(num == 1){
                        // 保存
                        this.saveBox = true;
                        this.isNotice= res.data.data.isNotice;
                    }else{
                        // 下一步
                        this.saveBox = false;
                    }
                    this.exceptionDescription= res.data.data.exceptionDescription;
                    this.approvedResult= res.data.data.approvedResult;
                    this.approvedTime= formatDate(res.data.data.approvedTime);
                    this.exceptionTypes= res.data.data.exceptionTypes;

                    this.isNotice= res.data.data.isNotice;
                    if(this.isNotice == '是'){
                        this.isNotice = true;
                        this.showEditFlag = true;
                    }else{
                        this.isNotice = false;
                        this.showEditFlag = false;
                    }
                    this.noticeContent= res.data.data.noticeContent;
                    this.noticeTitle= res.data.data.noticeTitle;
                    this.noticeStartTime= formatDate(res.data.data.noticeStartTime);
                    this.noticeEndTime= formatDate(res.data.data.noticeEndTime);
                    this.id= res.data.data.id;// 招标异常 ID
                    
                }else{
                    this.$layer.msg(res.data.msg);
                }
            }).catch(err=>{
                console.log(err);
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
                    this.$layer.msg(res.data.msg);
                }
            }).catch(err=>{
                console.log(err)
            })
        },
		// 根据入场项目编号查询分包列表
		getTotalInfo(){
			this.$axios({
                method: "POST",
                url: baseUrl+"/subcontractItemController/selectListByTotalProjectId",
                data:{
					totalProjectId:this.amountId,
					subcontractingState:'办理通过'
				}
            }).then(res=>{
                if(res.data.status == 200){
					this.candidateMenu = res.data.data.list;
					for(let i=0;i<this.candidateMenu.length;i++){
						this.nameOfTenderProject = this.candidateMenu[i].projectInformationVo.nameOfTenderProject;
						this.biddingProcurementMode = this.candidateMenu[i].projectInformationVo.biddingProcurementMode;
					}
                }else{
                    this.$layer.msg(res.data.msg);
                }
            }).catch(err=>{
                console.log(err)
            })
		},
		// 分包列表 搜索
		searchData(){
			this.$axios({
				method: "POST",
				url: baseUrl+"/subcontractItemController/selectListByTotalProjectId",
				data:{
					entrySubcontractNumber:this.number,
					subcontractName:this.name,
					totalProjectId:this.amountId,
					subcontractingState:'办理通过'
				}
			}).then(res=>{
				if(res.data.status == 200){
					this.candidateMenu = res.data.data.list;
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
                    this.$layer.msg(res.data.msg);
                }
            }).catch(err=>{
                console.log(err)
            })
        },
        // 初始化查询
        getInitInfo(){
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
                method: "POST",
                url: baseUrl+"/tenderExceptionController/queryTenderException",
                data:object
            }).then(res=>{
                if(res.data.status == 200){
                    if(res.data.data.state == '编辑中'){
                        this.writeFlag = true;
                    }else{
                        this.writeFlag = false;
                        this.showFlag = true;
                        this.headerBtn = false;
                    }
                    this.exceptionDescription= res.data.data.exceptionDescription;
                    this.approvedResult= res.data.data.approvedResult;
                    this.approvedTime= formatDate(res.data.data.approvedTime);
                    
                    this.exceptionTypes= res.data.data.exceptionTypes;
                    this.isNotice= res.data.data.isNotice;
                    this.noticeContent= res.data.data.noticeContent;
                    this.noticeTitle= res.data.data.noticeTitle;
                    this.noticeStartTime= formatDate(res.data.data.noticeStartTime);
                    this.noticeEndTime= formatDate(res.data.data.noticeEndTime);
                    if(this.isNotice == '是'){
                        this.isNotice = true;
                        this.showEditFlag = true;
                    }else{
                        this.isNotice = false;
                        this.showEditFlag = false;
                    }
                    this.id = res.data.data.id;
                }else{
                    this.$layer.msg(res.data.msg);
                }
            }).catch(err=>{
                console.log(err)
            })
        },
        // 上一步的查询
        getLastTempInfo(){
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
                method: "POST",
                url: baseUrl+"/tenderExceptionController/queryTenderException",
                data:object
            }).then(res=>{
                if(res.data.status == 200){
                  
                    this.exceptionDescription= res.data.data.exceptionDescription;
                    this.approvedResult= res.data.data.approvedResult;
                    this.approvedTime= formatDate(res.data.data.approvedTime);
                    
                    this.exceptionTypes= res.data.data.exceptionTypes;
                    this.isNotice= res.data.data.isNotice;
                    this.noticeContent= res.data.data.noticeContent;
                    this.noticeTitle= res.data.data.noticeTitle;
                    this.noticeStartTime= formatDate(res.data.data.noticeStartTime);
                    this.noticeEndTime= formatDate(res.data.data.noticeEndTime);
                    if(this.isNotice == '是'){
                        this.isNotice = true;
                        this.showEditFlag = true;
                    }else{
                        this.isNotice = false;
                        this.showEditFlag = false;
                    }
                }else{
                    this.$layer.msg(res.data.msg);
                }
            }).catch(err=>{
                console.log(err)
            })
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
    width: 87%;
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
    width: 135px;
    display: flex;
    justify-content: center;
    text-align: center;
}
.star{
    color: red;
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
.write_radio{
    display: flex;
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
.item_title{
	line-height: 30px;
	font-weight: bold;
	padding: 0 10px;
}
.el-icon-plus{
	font-size: 26px;
}
/* 列表展示 */
.edit_list{
    padding: 15px 20px;
}
.editItem{
    width: 100%;
    display: flex;
}
.editCenter{
    width: 50%;
    display: flex;
    padding: 5px 0;
}
.editName{
    width: 145px;
    text-align:right;
}
.editContent{
    flex: 1;
    padding: 0 10px;
    color: #6e622e;
}
</style>