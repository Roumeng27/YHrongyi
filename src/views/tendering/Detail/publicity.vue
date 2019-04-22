<template>
    <div class="newBox">
		<!-- 中标通知书 -->
		<div class="wrapper" v-show="writeFlag">
			<div class="box">
				<button class="btn" @click="newly(1)">保存</button>
				<button class="btn" @click="newly(2)">下一步</button>
			</div>
			<div class="main_info">
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
										<i class="el-icon-search"  style="cursor: pointer;" @click="lookInfo(scope.row)"></i>
									</template>
								</el-table-column>
							</el-table>
						</div>
					</el-collapse-item>
					<!-- 中标单位信息 -->
					<el-collapse-item title="中标单位信息" name="2">
						<el-table
								ref="multipleTable"
								:data="unitsInfo"
								tooltip-effect="dark"
								style="width: 100%">
							<el-table-column
								label="序号">
								<template slot-scope="scope">{{ scope.$index+1 }}</template>
							</el-table-column>
							<el-table-column
								prop="nameOfWinningBidder"
								label="中标单位名称">
							</el-table-column>
							<el-table-column
								prop="projectLeader"
								label="项目负责人">
							</el-table-column>
							<el-table-column
								prop="winningAmount"
								label="中标价格">
							</el-table-column>
							<el-table-column
								prop="winningBidPeriod"
								label="中标工期(天)">
							</el-table-column>
							<el-table-column
								prop="qualityGradeOfWinningBid"
								label="中标质量等级">
							</el-table-column>
							<el-table-column
								label="查看">
								<template slot-scope="scope">
									<i class="el-icon-search"  style="cursor: pointer;" @click="lookoverItem(scope.row)"></i>
								</template>
							</el-table-column>
						</el-table>
					</el-collapse-item>
					<!-- 中标通知书 -->
					<el-collapse-item title="中标通知书" name="3">
						<el-table
								ref="multipleTable"
								:data="winAdvice"
								tooltip-effect="dark"
								style="width: 100%">
							<el-table-column
								label="序号">
								<template slot-scope="scope">{{ scope.$index+1 }}</template>
							</el-table-column>
							<el-table-column
								prop="companyName"
								label="单位名称">
							</el-table-column>
							<el-table-column
								prop="projectLeader"
								label="项目负责人">
							</el-table-column>
							<el-table-column
								prop="contacts"
								label="联系人">
							</el-table-column>
							<el-table-column
								label="通过原因">
								<template slot-scope="scope">
									<i class="el-icon-edit-outline"  style="cursor: pointer;" @click="passThrough(scope.row,1)"></i>
								</template>
							</el-table-column>
							<el-table-column
								label="通知书状态">
								<template slot-scope="scope">
									<i class="el-icon-message"  style="cursor: pointer;"></i>
								</template>
							</el-table-column>
							<el-table-column
								label="生成通知书">
								<template slot-scope="scope">
									<i class="el-icon-tickets"  style="cursor: pointer;" @click="createAdviceBook(scope.row,1)"></i>
								</template>
							</el-table-column>
						</el-table>
					</el-collapse-item>
					<!-- 招标结果通知书 -->
					<el-collapse-item title="招标结果通知书" name="4">
						<div class="notic" style="padding:10px;">注：对任一单位的招标结果通知书签章后，会自动对其他单位的招标结果通知书进行自动批量签章。</div>
						<el-table
								ref="multipleTable"
								:data="resultAdvice"
								tooltip-effect="dark"
								style="width: 100%">
							<el-table-column
								label="序号">
								<template slot-scope="scope">{{ scope.$index+1 }}</template>
							</el-table-column>
							<el-table-column
								prop="companyName"
								label="单位名称">
							</el-table-column>
							<el-table-column
								prop="projectLeader"
								label="项目负责人">
							</el-table-column>
							<el-table-column
								prop="contacts"
								label="联系人">
							</el-table-column>
							<el-table-column
								label="原因">
								<template slot-scope="scope">
									<i class="el-icon-edit-outline"  style="cursor: pointer;" @click="passThrough(scope.row,2)"></i>
								</template>
							</el-table-column>
							<el-table-column
								label="通知书状态">
								<template slot-scope="scope">
									<i class="el-icon-message"  style="cursor: pointer;" ></i>
								</template>
							</el-table-column>
							<el-table-column
								label="生成通知书">
								<template slot-scope="scope">
									<i class="el-icon-tickets"  style="cursor: pointer;" @click="createAdviceBook(scope.row,2)"></i>
								</template>
							</el-table-column>
						</el-table>
					</el-collapse-item>
				</el-collapse>
			</div>
		</div>
		<!-- 下一步 -->
		<div class="nextWrapper" v-show="nextFlag">
			<div class="box" v-show="headerBtn">
                <button class="btn" @click="goBack">上一步</button>
                <button class="btn" @click="submit">提交</button>
            </div>
			<div class="main_info">
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
									<div class="editName">招标(采购)人：</div>
									<div class="editContent">{{nameOfPurchaser}}</div>
								</div>
								<div class="editCenter">
									<div class="editName">招标项目预算金额：</div>
									<div class="editContent">{{budgetAmount}}万元</div>
								</div>
							</div>
							<div class="editItem">
								<div class="editCenter">
									<div class="editName">招标项目编号：</div>
									<div class="editContent">{{biddingProjectNumber}}</div>
								</div>
								<div class="editCenter">
									<div class="editName">入场项目编号：</div>
									<div class="editContent">{{amountId}}</div>
								</div>
							</div>
						</div>
					</el-collapse-item>
					<!-- 相关附件 -->
					<el-collapse-item title="相关附件" name="2">
						<el-table :data="tableData" stripe style="width: 100%">
							<el-table-column  prop="index"  label="附件名称">
							</el-table-column>
							<el-table-column  prop="number"  label="附件列表">
							</el-table-column>
							<el-table-column  label="管理">
								<i class="el-icon-setting"  style="cursor: pointer;"></i>
							</el-table-column>
						</el-table>
					</el-collapse-item>
					<!-- 中标单位信息 -->
					<el-collapse-item title="中标单位信息" name="3">
						<el-table
								ref="multipleTable"
								:data="unitsInfo"
								tooltip-effect="dark"
								style="width: 100%">
							<el-table-column
								label="序号">
								<template slot-scope="scope">{{ scope.$index+1 }}</template>
							</el-table-column>
							<el-table-column
								prop="nameOfWinningBidder"
								label="中标单位名称">
							</el-table-column>
							<el-table-column
								prop="projectLeader"
								label="项目负责人">
							</el-table-column>
							<el-table-column
								prop="winningAmount"
								label="中标价格">
							</el-table-column>
							<el-table-column
								prop="winningBidPeriod"
								label="中标工期(天)">
							</el-table-column>
							<el-table-column
								prop="qualityGradeOfWinningBid"
								label="中标质量等级">
							</el-table-column>
							<el-table-column
								label="查看">
								<template slot-scope="scope">
									<i class="el-icon-search"  style="cursor: pointer;" @click="lookoverItem(scope.row)"></i>
								</template>
							</el-table-column>
						</el-table>
					</el-collapse-item>
					<!-- 中标通知书 -->
					<el-collapse-item title="中标通知书" name="4">
						<el-table
								ref="multipleTable"
								:data="winAdvice"
								tooltip-effect="dark"
								style="width: 100%">
							<el-table-column
								label="序号">
								<template slot-scope="scope">{{ scope.$index+1 }}</template>
							</el-table-column>
							<el-table-column
								prop="companyName"
								label="单位名称">
							</el-table-column>
							<el-table-column
								prop="projectLeader"
								label="项目负责人">
							</el-table-column>
							<el-table-column
								prop="contacts"
								label="联系人">
							</el-table-column>
							<el-table-column
								label="通过原因">
								<template slot-scope="scope">
									<i class="el-icon-edit-outline"  style="cursor: pointer;" @click="passThrough(scope.row,1)"></i>
								</template>
							</el-table-column>
							<el-table-column
								label="通知书状态">
								<template slot-scope="scope">
									<i class="el-icon-message"  style="cursor: pointer;"></i>
								</template>
							</el-table-column>
							<el-table-column
								label="生成通知书">
								<template slot-scope="scope">
									<i class="el-icon-tickets"  style="cursor: pointer;" @click="createAdviceBook(scope.row,1)"></i>
								</template>
							</el-table-column>
						</el-table>
					</el-collapse-item>
					<!-- 招标结果通知书 -->
					<el-collapse-item title="招标结果通知书" name="5">
						<div class="notic" style="padding:10px;">注：对任一单位的招标结果通知书签章后，会自动对其他单位的招标结果通知书进行自动批量签章。</div>
						<el-table
								ref="multipleTable"
								:data="resultAdvice"
								tooltip-effect="dark"
								style="width: 100%">
							<el-table-column
								label="序号">
								<template slot-scope="scope">{{ scope.$index+1 }}</template>
							</el-table-column>
							<el-table-column
								prop="companyName"
								label="单位名称">
							</el-table-column>
							<el-table-column
								prop="projectLeader"
								label="项目负责人">
							</el-table-column>
							<el-table-column
								prop="contacts"
								label="联系人">
							</el-table-column>
							<el-table-column
								label="原因">
								<template slot-scope="scope">
									<i class="el-icon-edit-outline"  style="cursor: pointer;" @click="passThrough(scope.row,2)"></i>
								</template>
							</el-table-column>
							<el-table-column
								label="通知书状态">
								<template slot-scope="scope">
									<i class="el-icon-message"  style="cursor: pointer;" ></i>
								</template>
							</el-table-column>
							<el-table-column
								label="生成通知书">
								<template slot-scope="scope">
									<i class="el-icon-tickets"  style="cursor: pointer;" @click="createAdviceBook(scope.row,2)"></i>
								</template>
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
		</div>
		<!-- 分包信息 -->
		<div class="searchWrapper" v-show="lookInfoFlag">
            <div class="searchBox">
               	<div class="search_title">
                    <p>分包信息</p>
                    <i class="el-icon-close" @click="closeLookInfo"></i>
                </div>
				<div class="main_info">
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
										<div class="editContent">{{biddingProjectNumber}}</div>
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
        </div>
		<!-- 查看中标单位 -->
		<div class="searchWrapper" v-show="lookFlag">
            <div class="searchBox">
               	<div class="search_title">
                    <p>查看中标单位</p>
                    <i class="el-icon-close" @click="closeLookoverItem"></i>
                </div>
				<div class="main_info">
					<el-collapse v-model="activeName" accordion>
						<!-- 中标单位信息 -->
						<el-collapse-item title="中标单位信息" name="1">
							<div class="edit_list">
								<div class="editItem">
									<div class="editCenter">
										<div class="editName">中标单位名称：</div>
										<div class="editContent">{{nameOfWinningBidder}} </div>
									</div>
								</div>
								<div class="editItem">
									<div class="editCenter">
										<div class="editName">项目负责人：</div>
										<div class="editContent">{{projectLeader}}</div>
									</div>
								</div>
								<div class="editItem">
									<div class="editCenter">
										<div class="editName">评委会成员名单：</div>
										<div class="editContent">{{bidEvaluationCommitteeList}}</div>
									</div>
								</div>
								<div class="editItem">
									<div class="editCenter">
										<div class="editName">中标价格：</div>
										<div class="editContent">{{winningAmount}}万元</div>
									</div>
								</div>
								<div class="editItem">
									<div class="editCenter">
										<div class="editName">中标工期(日历天)：</div>
										<div class="editContent">{{winningBidPeriod}}</div>
									</div>
									<div class="editCenter">
										<div class="editName">中标质量等级：</div>
										<div class="editContent">{{qualityGradeOfWinningBid}}</div>
									</div>
								</div>
								<div class="editItem">
									<div class="editCenter">
										<div class="editName">中标说明：</div>
										<div class="editContent">{{winningBidDescription}}</div>
									</div>
								</div>
							</div>
						</el-collapse-item>
					</el-collapse>
				</div>
            </div>
        </div>
		<!-- 通过原因 -->
		<div class="passWrapper" v-show="passFlag">
			<div class="passBox">
				<div class="pass_title">
                    <p v-show="passResult">通过原因</p>
					<p v-show="noPassResult">不通过原因</p>
                    <i class="el-icon-close" @click="closePassThrough"></i>
                </div>
				<div class="box">
					<button class="btn" @click="sureSave">确定保存</button>
				</div>
				<div class="write_textarea" style="padding:5px 0;">
					<el-input
						type="textarea"
						:rows="14"
						v-model="reason">
					</el-input>
				</div>
			</div>
		</div>
		<!-- 生成通知书 -->
		<div class="createWrapper" v-show="createFlag">
			<div class="createBox">
				<div class="create_title">
					<p v-show="createAdvice">生成中标通知书</p>
					<p v-show="createResultAdvice">生成中标结果通知书</p>
                    <i class="el-icon-close" @click="closeCreateAdviceBook"></i>
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
    </div>
</template>

<script>
import '../../../assets/css/style.css'
import baseUrl from '../../../api/api'
  export default {
    data() {
		return {
			writeFlag:true,// 首页
			projectObj:JSON.parse(window.localStorage.projectObj),// localstroge 获取的ID
			activeName:['1','2','3','4','5','6'],
			tableData:[
				{
					entrySubcontractNumber:'11'
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
			// 分包信息
			breakBagFlag:false,// 列表
			subpackageData:[],
			lookInfoFlag:false,// 查看弹窗
			scopeOfTender:'',// 招标范围
			subcontractingControlAmount:'',// 分包控制金额
			qualificationExaminationMethod:'',// 资格审查方式	
			electronicBidEvaluation:'',// 是否电子招投标
			subcontractContents:'',// 分包内容
			subcontractName:'',// 分包名称 
			// 中标单位信息
			lookFlag:false,
			nameOfWinningBidder:'',// 中标单位名称
			projectLeader:'',// 项目负责人
			bidEvaluationCommitteeList:'',// 评委会成员名单
			winningAmount:'',// 中标价格
			winningBidPeriod:'',// 中标工期(日历天)
			qualityGradeOfWinningBid:'',// 中标质量等级
			winningBidDescription:'',// 中标说明
			winnNoticeId:'',// 中标通知书ID
			// 通过原因
			passFlag:false,
			passResult:false,// 通过标题
			noPassResult:false,// 不通过标题
			reason:'',// 原因 
			// 生成通知书
			createFlag:false,
			createAdvice:false,// 生成中标通知书
			createResultAdvice:false,// 生成招标结果通知书
			// 下一步
			headerBtn:true,// 提交和上一步的按钮
			nextFlag:false,// 下一步
			// 办理记录
            manageDate:[],
			creationTime:'',// 时间
			// 列表
			unitsInfo:[],
			adviceInfo:[],// 返回的中标通知书及中标通知书总数据
			winAdvice:[],// 中标通知书
			resultAdvice:[],// 招标结果通知书
			// 提交弹窗
			submitBox:false,
			// 保存
			winnNoticeItemId:'',// 中标通知书条目ID
			saveBox:false,// 保存弹窗
			// 上一步
			laststepBox:false,
		};
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
		this.getInitInfo();// 初始化查询
	},
    methods: {
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
			this.laststepBox = true;// 点击上一步弹窗
		},
		// 保存弹窗 ---> 确定	
		saveBoxSure(){
			this.saveBox = false;
		},
		// 点击上一步弹窗
		laststepBoxSure(){
			this.laststepBox =false;
		},
		// 提交
		submit(){
			this.submitBox = true;
		},
		// 弹窗 ---> 关闭
		handleClose(){
			this.submitBox = false;
			this.saveBox = false;
			this.laststepBox = false;
		},
		// 确定
		submitSure(){
			this.$axios({
                method: "POST",
                url: baseUrl+"/winnNoticeController/submit",
                data:{
					"state":'待办理',
					"winnNoticeId":this.winnNoticeId
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
		},
		// 分包信息 ---> 查看
		lookInfo(row){
			// 分包信息所需字段
			this.entrySubcontractNumber = row.entrySubcontractNumber;// 入场项目分包编号
			this.subcontractName = row.subcontractName;// 分包名称 
			this.subcontractContents = row.subcontractContents;// 分包内容
			this.scopeOfTender = row.scopeOfTender;// 招标范围
			this.subcontractingControlAmount = row.subcontractingControlAmount;// 分包控制金额	
			this.qualificationExaminationMethod = row.projectInformationVo.qualificationExaminationMethod;// 资格审查方式 
			this.electronicBidEvaluation = row.projectInformationVo.electronicBidEvaluation;// 是否电子招投标

			this.lookInfoFlag = true;
		},
		// 分包信息 ---> 关闭
		closeLookInfo(){
			this.lookInfoFlag = false;
		},
		// 中标单位信息 ---> 查看
		lookoverItem(row){
			this.nameOfWinningBidder = row.nameOfWinningBidder;// 中标单位名称
			this.projectLeader = row.projectLeader;// 项目负责人
			this.bidEvaluationCommitteeList = row.bidEvaluationCommitteeList;// 评委会成员名单
			this.winningAmount = row.winningAmount;// 中标价格
			this.winningBidPeriod = row.winningBidPeriod;// 中标工期(日历天)
			this.qualityGradeOfWinningBid = row.qualityGradeOfWinningBid;// 中标质量等级
			this.winningBidDescription = row.winningBidDescription;// 中标说明
			this.lookFlag = true;
		},
		// 中标单位信息 ---> 关闭
		closeLookoverItem(){
			this.lookFlag = false;
		},
		// 通过原因 ---> 查看
		passThrough(row,num){
			this.winnNoticeItemId = row.winnNoticeItemId;// 中标通知书条目ID
			if(num == 1){
				// 通过原因
				this.passResult = true;
				this.noPassResult = false;
			}else{
				// 不通过原因
				this.passResult = false;
				this.noPassResult = true;
			}
			this.passFlag = true;
		},
		// 通过原因 ---> 关闭
		closePassThrough(){
			this.passFlag = false;
		},
		// 通过原因 ---> 确定保存
		sureSave(){
			this.passFlag = false;
			this.adviceInfo.forEach(item=>{
				if(item.winnNoticeItemId == this.winnNoticeItemId){
					item.reason = this.reason
				}
			})
		},
		// 生成中标通知书 ---> 查看
		createAdviceBook(row,num){
			if(num == 1){
				// 生成中标通知书
				this.createAdvice = true;
				this.createResultAdvice = false;
			}else{
				// 生成招标结果通知书
				this.createAdvice = false;
				this.createResultAdvice = true;
			}
			this.createFlag = true;
		},
		// 生成中标通知书 ---> 关闭
		closeCreateAdviceBook(){
			this.createFlag = false;
		},
		// 保存
		saveInfo(num){
			this.unitsInfo.forEach(item=>{
				this.nameOfWinningBidder = item.nameOfWinningBidder;// 中标单位名称
				this.projectLeader = item.projectLeader;// 项目负责人
				this.bidEvaluationCommitteeList = item.bidEvaluationCommitteeList;// 评委会成员名单
				this.winningAmount = item.winningAmount;// 中标价格
				this.winningBidPeriod = item.winningBidPeriod;// 中标工期(日历天)
				this.qualityGradeOfWinningBid = item.qualityGradeOfWinningBid;// 中标质量等级
				this.winningBidDescription = item.winningBidDescription;// 中标说明
			})
			let object={}
            if(this.projectObj.totalProjectId.indexOf("-") != -1 && this.projectObj.totalProjectId!=null){
                // 入场项目分包编号
                object={
                    entrySubcontractNumber:this.projectObj.totalProjectId,
					bidEvaluationCommitteeList:this.bidEvaluationCommitteeList,
					items:this.adviceInfo,
					nameOfWinningBidder: this.nameOfWinningBidder,
					projectLeader: this.projectLeader,
					qualityGradeOfWinningBid: this.qualityGradeOfWinningBid,
					winningAmount: this.winningAmount,
					winningBidDescription: this.winningBidDescription,
					winningBidPeriod: this.winningBidPeriod
                }
            }else{
                // 入场项目编号
                object ={
					projectCode:this.projectObj.totalProjectId,
					bidEvaluationCommitteeList:this.bidEvaluationCommitteeList,
					items:this.adviceInfo,
					nameOfWinningBidder: this.nameOfWinningBidder,
					projectLeader: this.projectLeader,
					qualityGradeOfWinningBid: this.qualityGradeOfWinningBid,
					winnNoticeId: "d503c114e88e46e18d1d31fbca479378",
					winningAmount: this.winningAmount,
					winningBidDescription: this.winningBidDescription,
					winningBidPeriod: this.winningBidPeriod
                }
			}
			this.$axios({
                method:'POST',
                url:baseUrl + '/winnNoticeController/saveOrUpdate',
                data:object
            }).then(res=>{
                if(res.data.status == 200){
                    if(num == 1){
                        // 保存
                        this.saveBox = true;
                    }else{
                        // 下一步
                        this.saveBox = false;
                    }
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
                url: baseUrl+"/winnNoticeController/select",
                data:object
            }).then(res=>{
				// console.log(res,'---->')
                if(res.data.status == 200){
					this.unitsInfo.forEach(item=>{
						this.adviceInfo = item.items;
						this.winnNoticeId = item.winnNoticeId;
					})
					this.adviceInfo.forEach(item=>{
						if(item.type == '中标单位'){
							this.winAdvice.push(item);
						}else{
							this.resultAdvice.push(item);
						}
					})
                }else{
                    this.$layer.msg(res.data.msg);
                }
            }).catch(err=>{
                console.log(err)
            })
		},
    }
  };
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
	display:flex;
	flex-direction: column;
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
.notic,h6,b{
    color:red;
}
/* 子弹窗 */
.searchWrapper,.createWrapper{
    width: 100%;
    height: 100%;
    position: fixed;
    left: 185px;
    top: 0;
    background: rgba(0, 0, 0, .3);
    z-index: 99;
    padding: 50px;
	display:flex;
	flex-direction: column;
}
.passWrapper{
    width: 100%;
    height: 100%;
    position: fixed;
    left: 185px;
    top: 0;
    background: rgba(0, 0, 0, .3);
    z-index: 99;
    padding: 200px;
	display:flex;
	flex-direction: column;
	
}
.searchBox,.createBox{
    width: 87%;
    height: 100%;
    background: #fff;
    position: relative;
	overflow: hidden;
	overflow-y: scroll;
}
.main_info{
	flex: 1;
	overflow: hidden;
	overflow-y: scroll;
}
.passBox{
	width: 60%;
	height: 100%;
    background: #fff;
    position: relative;
	overflow: hidden;
	overflow-y: scroll;
	margin-left: 150px;
}
.search_title,.pass_title,.create_title{
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
/* 弹窗 */
.icon{
	width: 100%;
	padding: 0 10px;
	display: flex;
	align-items: center;
}
.el-icon-warning,.el-icon-question,.el-icon-success{
	font-size: 100px;
	color: #0a5e9d;
}
.icon span{
	margin-left: 20px;
	font-size:18px;
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