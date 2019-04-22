<template>
    <div class="newBox">
        <div class="wrapper" v-show="writeFlag">
            <!-- 中标候选人公示 -->
            <div class="box"  v-show="headerBtn">
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
                            </div>
                            <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName">地址：</div>
                                    <div class="editContent">
                                        <el-input v-model="address" clearable></el-input>
                                    </div>
                                </div>
                                <div class="editCenter">
                                    <div class="editName">联系方式：</div>
                                    <div class="editContent">
                                        <el-input v-model="contactInformation" clearable></el-input>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </el-collapse-item>
                    <el-collapse-item title="分包信息" name="2" v-show="diffFlag">
                        <el-table
                                ref="multipleTable"
                                :data="subpackageData"
                                tooltip-effect="dark"
                                style="width: 100%"
                                @selection-change="handleSelectionChange">
                                <el-table-column
                                    type="selection"
                                    width="55">
                                </el-table-column>
                                <el-table-column
                                    label="序号">
                                    <template slot-scope="scope">{{ scope.$index+1 }}</template>
                                </el-table-column>
                                <el-table-column
                                    prop="entrySubcontractNumber"
                                    label="分包编号">
                                </el-table-column>
                                <el-table-column
                                    prop="subcontractName"
                                    label="分包名称">
                                </el-table-column>
                                <el-table-column
                                    label="招标方式">
                                    <template slot-scope="scope">{{biddingProcurementMode}}</template>
                                </el-table-column>
                                <el-table-column
                                    prop="subcontractingControlAmount"
                                    label="分包控制金额(万元)">
                                </el-table-column>
                                <el-table-column
                                    label="查看分包">
                                    <template slot-scope="scope">
                                        <i class="el-icon-search"  style="cursor: pointer;" @click="lookoverItem(scope.row)"></i>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                    label="操作">
                                    <template slot-scope="scope">
                                        <i class="el-icon-edit"  style="cursor: pointer;" @click="editItem(scope.row)"></i>
                                    </template>
                                </el-table-column>
                            </el-table>
                    </el-collapse-item>
                    <!-- 中标候选人列表及专家名单 -->
                    <el-collapse-item title="中标候选人列表及专家名单" name="2" v-show="!diffFlag">
                        <div class="edit_list">
                            <div class="clear">
                                <el-button plain @click="clearInfo">清空信息</el-button>
                            </div>
                            <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName"><p class="star">*</p>推荐排名第一单位：</div>
                                    <div class="editContent">
                                        <el-input v-model="recommendedOneUnit" readonly></el-input>
                                    </div>
                                    <el-button plain @click="pickInfo">检索</el-button>
                                </div>
                            </div>
                           
                            <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName">拟中标金额：</div>
                                    <div class="editContent">
                                        <el-input v-model="winningAmountOne" clearable></el-input>
                                    </div>
                                </div>
                                <div class="editCenter">
                                    <div class="editName">
                                            <el-select v-model="amountUnitOne">
                                            <el-option label="元" value="元"></el-option>
                                            <el-option label="万元" value="万元"></el-option>
                                            <el-option label="%(费率)" value="%(费率)"></el-option>
                                        </el-select>
                                    </div>
                                </div>
                            </div>
                            <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName">推荐排名第二单位：</div>
                                    <div class="editContent">
                                        <el-input v-model="recommendedSecondUnit" clearable></el-input>
                                    </div>
                                        <el-button plain @click="pickInfo">检索</el-button>
                                </div>
                            </div>
                            <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName">拟中标金额：</div>
                                    <div class="editContent">
                                        <el-input v-model="winningAmountTwo" clearable></el-input>
                                    </div>
                                </div>
                                <div class="editCenter">
                                    <div class="editName">
                                            <el-select v-model="amountUnitTwo">
                                            <el-option label="元" value="元"></el-option>
                                            <el-option label="万元" value="万元"></el-option>
                                            <el-option label="%(费率)" value="%(费率)"></el-option>
                                        </el-select>
                                    </div>
                                </div>
                            </div>
                            <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName">推荐排名第三单位：</div>
                                    <div class="editContent">
                                        <el-input v-model="recommendedSecondThree" clearable></el-input>
                                    </div>
                                        <el-button plain @click="pickInfo">检索</el-button>
                                </div>
                            </div>
                            <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName">拟中标金额：</div>
                                    <div class="editContent">
                                        <el-input v-model="winningAmountThree" clearable></el-input>
                                    </div>
                                </div>
                                <div class="editCenter">
                                    <div class="editName">
                                            <el-select v-model="amountUnitThree">
                                            <el-option label="元" value="元"></el-option>
                                            <el-option label="万元" value="万元"></el-option>
                                            <el-option label="%(费率)" value="%(费率)"></el-option>
                                        </el-select>
                                    </div>
                                </div>
                            </div>
                            <div class="editItem">
                                <div class="editTextarea">
                                    <div class="editName">评标委员会成员名单：</div>
                                    <div class="editContent">
                                        <el-input v-model="bidEvaluationCommitteeList"  type="textarea" :rows="3"></el-input>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </el-collapse-item>
                    <!-- 其他信息 -->
                    <el-collapse-item title="其他信息" name="3">
                        <div class="edit_list">
                            <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName"><p class="star">*</p>公示名称：</div>
                                    <div class="editContent">
                                        <el-input v-model="publicityName" clearable></el-input>
                                    </div>
                                </div>
                                <div class="editCenter">
                                    <div class="editName">中标候选人公示</div>
                                    <div class="editContent"></div>
                                </div>
                            </div>
                            <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName"><p class="star">*</p> 公示开始时间：</div>
                                    <div class="editContent">
                                        <el-date-picker
                                            placeholder="起始日期"
                                            v-model="publicityStartTime"
                                        >
                                        </el-date-picker>
                                    </div>
                                </div>
                                <div class="editCenter">
                                    <div class="editName"><p class="star">*</p>公示结束时间：</div>
                                    <div class="editContent">
                                        <el-date-picker
                                            placeholder="公示结束时间"
                                            v-model="publicityEndTime"
                                        >
                                        </el-date-picker>
                                    </div>
                                </div>
                            </div>
                            <div class="editItem">
                                <div class="editTextarea">
                                    <div class="editName">备注说明：</div>
                                    <div class="editContent">
                                        <el-input v-model="remarks" clearable type="textarea" :rows="3"></el-input>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </el-collapse-item>
                </el-collapse>
            </div>
        </div>
        <div class="nextWrapper" v-show="showFlag">
            <div class="box" v-show="headerBtn">
                <button class="btn" @click="goBack">上一步</button>
                <button class="btn" @click="submit">提交</button>
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
                            </div>
                            <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName">地址：</div>
                                    <div class="editContent">{{address}}</div>
                                </div>
                            </div>
                            <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName">联系方式：</div>
                                    <div class="editContent">{{contactInformation}}</div>
                                </div>
                            </div>
                        </div>
                    </el-collapse-item>
                    <!-- 中标候选人列表及专家名单 -->
                    <el-collapse-item title="中标候选人列表及专家名单" name="2">
                        <div class="edit_list">
                            <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName">推荐排名第一单位：</div>
                                    <div class="editContent">{{recommendedOneUnit}} </div>
                                </div>
                            </div>
                            <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName">拟中标金额：</div>
                                    <div class="editContent">{{winningAmountOne}}</div>
                                </div>
                            </div>
                            <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName">推荐排名第二单位：</div>
                                    <div class="editContent">{{recommendedSecondUnit}}</div>
                                </div>
                            </div>
                            <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName">拟中标金额：</div>
                                    <div class="editContent">{{winningAmountTwo}}</div>
                                </div>
                            </div>
                            <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName">推荐排名第三单位：</div>
                                    <div class="editContent">{{recommendedSecondThree}}</div>
                                </div>
                            </div>
                            <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName">拟中标金额：</div>
                                    <div class="editContent">{{winningAmountThree}}</div>
                                </div>
                            </div>
                            <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName">评标委员会成员名单：</div>
                                    <div class="editContent">{{bidEvaluationCommitteeList}}</div>
                                </div>
                            </div>
                        </div>
                    </el-collapse-item>
                    <!-- 其他信息 -->
                    <el-collapse-item title="其他信息" name="3">
                        <div class="edit_list">
                            <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName">公示名称：</div>
                                    <div class="editContent">{{publicityName}} </div>
                                </div>
                            </div>
                            <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName">公示开始时间：</div>
                                    <div class="editContent">{{publicityStartTime}} </div>
                                </div>
                                <div class="editCenter">
                                    <div class="editName">公示结束时间：</div>
                                    <div class="editContent">{{publicityEndTime}} </div>
                                </div>
                            </div>
                            <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName">备注说明：</div>
                                    <div class="editContent">{{remarks}} </div>
                                </div>
                            </div>
                        </div>
                    </el-collapse-item>
                    <!-- 中标候选人公示信息 -->
                    <el-collapse-item title="中标候选人公示信息" name="4">
                        <div class="edit_list">
                            <div class="infobox_title">
                                <span>test-asking</span>
                                <h1>中标候选人公示</h1>
                                <p>2019年03月15日</p>
                            </div>
                            <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName">招标项目名称：</div>
                                    <div class="editContent">{{nameOfTenderProject}} </div>
                                </div>
                            </div>
                            <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName">招标项目编号：</div>
                                    <div class="editContent">{{biddingProjectNumber}} </div>
                                </div>
                            </div>
                            <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName">招标项目预算金额：</div>
                                    <div class="editContent">{{budgetAmount}} </div>
                                </div>
                            </div>
                            <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName">招标项目预算金额：</div>
                                    <div class="editContent">{{budgetAmount}} </div>
                                </div>
                            </div>
                            <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName" style="font-weight:bold;">招标(采购)人</div>
                                </div>
                            </div>
                            <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName">招标(采购)人全称：</div>
                                    <div class="editContent">{{nameOfPurchaser}} </div>
                                </div>
                            </div>
                            <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName">招标(采购)人地址：</div>
                                    <div class="editContent">{{address}} </div>
                                </div>
                            </div>
                            <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName">招标(采购)人联系方式：</div>
                                    <div class="editContent">{{contactInformation}} </div>
                                </div>
                            </div>
                            <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName" style="font-weight:bold;">中标候选人公示</div>
                                </div>
                            </div>
                            <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName">第一中标候选人：</div>
                                    <div class="editContent">{{recommendedOneUnit}} </div>
                                </div>
                            </div>
                            <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName">第二中标候选人：</div>
                                    <div class="editContent">{{recommendedSecondUnit}} </div>
                                </div>
                            </div>
                            <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName">第三中标候选人：</div>
                                    <div class="editContent">{{recommendedSecondThree}} </div>
                                </div>
                            </div>
                            <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName" style="font-weight:bold;">中标候选人公示期</div>
                                    <div class="editContent">{{publicityStartTime}} 至 {{publicityEndTime}}</div>
                                </div>
                            </div>
                            <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName" style="font-weight:bold;">项目联系人：</div>
                                    <div class="editContent">{{projectLeader}}</div>
                                </div>
                            </div>
                            <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName" style="font-weight:bold;">联系方式：</div>
                                    <div class="editContent">{{projectLeaderPhone}}</div>
                                </div>
                            </div>
                            <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName" style="font-weight:bold;">备注：</div>
                                    <div class="editContent">{{remark}}</div>
                                </div>
                            </div>
                            <div class="infobox_footer">
                                <h3>{{creatorName}}</h3>
                                <h3>{{saveTime}}</h3>
                            </div>
                        </div>
                    </el-collapse-item>
                    <!-- 相关附件 -->
                    <el-collapse-item title="相关附件" name="5">
                        <el-table :data="tableData" stripe style="width: 100%">
                            <el-table-column  prop="index"  label="附件名称">
                            </el-table-column>
                            <el-table-column  prop="number"  label="附件列表(点击查看)">
                            </el-table-column>
                            <el-table-column  prop="number"  label="管理">
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
        <div class="pickWrapper" v-show="pickFlag">
            <div class="pickBox">
                <div class="pick_title">
                    <p>选择中标单位</p>
                    <i class="el-icon-close" @click="closePick"></i>
                </div>
                <div class="pick_main">
                     <el-table
                            ref="multipleTable"
                            :data="pickData"
                            tooltip-effect="dark"
                            style="width: 100%">
                        <el-table-column align="center" width="55" label="" >
                            <template slot-scope="scope">
                                <el-radio :label="scope.row.bidCompany" v-model="templateRadio" @change.native="getTemplatePick(scope.row)">&nbsp;</el-radio>
                            </template>
                        </el-table-column>
                        <el-table-column
                            label="序号">
                            <template slot-scope="scope">{{ scope.$index+1  }}</template>
                        </el-table-column>
                        <el-table-column
                            prop="ranking"
                            label="排名">
                        </el-table-column>
                        <el-table-column
                            prop="companyName"
                            label="单位名称">
                        </el-table-column>
                        <el-table-column
                            label="选择">
                            <template slot-scope="scope">
                                <i class="el-icon-plus" @click="copyPick(scope.row)"></i>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <div class="pick_btn">
                    <button class="btn" @click="pickSure">确定选择</button>
                </div>
            </div>
        </div>
        <!-- 查看详情 -->
		<div class="lookWrapper" v-show="lookFlag">
            <div class="lookBox">
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
                                    <div class="editContent">{{nameOfPurchaser}} </div>
                                </div>
                            </div>
                             <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName">入场项目编号：</div>
                                    <div class="editContent">{{amountId}} </div>
                                </div>
                            </div>
                        </div>
                    </el-collapse-item>
					<!--分包信息 -->
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
                                    <div class="editContent">{{subcontractingControlAmount}}万元</div>
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
        <!-- 操作详情 -->
        <div class="lookWrapper" v-show="editFlag">
            <div class="lookBox">
				<div class="pick_title">
                    <p>新增分包中标候选人</p>
                    <i class="el-icon-close" @click="closeEdit"></i>
                </div>
                <div class="box">
                    <button class="btn" @click="savePage">保存</button>
                </div>
				<el-collapse v-model="activeName" accordion>
                    <!-- 中标候选人列表及专家名单 -->
                    <el-collapse-item title="中标候选人列表及专家名单" name="1">
                        <div class="edit_list">
                            <div class="clear">
                                <el-button plain  @click="clearInfo">清空信息</el-button>
                            </div>
                           <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName"><p class="star">*</p>推荐排名第一单位：</div>
                                    <div class="editContent">
                                        <el-input v-model="recommendedOneUnit" readonly></el-input>
                                    </div>
                                     <el-button plain @click="pickInfo">检索</el-button>
                                </div>
                            </div>
                            <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName">拟中标金额：</div>
                                    <div class="editContent">
                                        <el-input v-model="winningAmountOne" clearable></el-input>
                                    </div>
                                </div>
                                <div class="editCenter">
                                    <div class="editName">
                                         <el-select v-model="amountUnitOne">
                                            <el-option label="元" value="元"></el-option>
                                            <el-option label="万元" value="万元"></el-option>
                                            <el-option label="%(费率)" value="%(费率)"></el-option>
                                        </el-select>
                                    </div>
                                </div>
                            </div>
                            <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName">推荐排名第二单位：</div>
                                    <div class="editContent">
                                        <el-input v-model="recommendedSecondUnit" clearable></el-input>
                                    </div>
                                     <el-button plain @click="pickInfo">检索</el-button>
                                </div>
                            </div>
                            <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName">拟中标金额：</div>
                                    <div class="editContent">
                                        <el-input v-model="winningAmountTwo" clearable></el-input>
                                    </div>
                                </div>
                                <div class="editCenter">
                                    <div class="editName">
                                         <el-select v-model="amountUnitTwo">
                                            <el-option label="元" value="元"></el-option>
                                            <el-option label="万元" value="万元"></el-option>
                                            <el-option label="%(费率)" value="%(费率)"></el-option>
                                        </el-select>
                                    </div>
                                </div>
                            </div>
                            <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName">推荐排名第三单位：</div>
                                    <div class="editContent">
                                        <el-input v-model="recommendedSecondThree" clearable></el-input>
                                    </div>
                                     <el-button plain @click="pickInfo">检索</el-button>
                                </div>
                            </div>
                            <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName">拟中标金额：</div>
                                    <div class="editContent">
                                        <el-input v-model="winningAmountThree" clearable></el-input>
                                    </div>
                                </div>
                                <div class="editCenter">
                                    <div class="editName">
                                         <el-select v-model="amountUnitThree">
                                            <el-option label="元" value="元"></el-option>
                                            <el-option label="万元" value="万元"></el-option>
                                            <el-option label="%(费率)" value="%(费率)"></el-option>
                                        </el-select>
                                    </div>
                                </div>
                            </div>
                            <div class="editItem">
                                <div class="editTextarea">
                                    <div class="editName">评标委员会成员名单：</div>
                                    <div class="editContent">
                                        <el-input v-model="bidEvaluationCommitteeList"  type="textarea" :rows="3"></el-input>
                                    </div>
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
import {formatDate,changeTime} from '../../../api/base.js'
export default {
    data(){
        return {
            projectObj:JSON.parse(window.localStorage.projectObj),
            activeName:['1','2','3','4','5','6'],
            tableData:[],
            diffFlag:false,
            multipleSelection:[],//多选框
            idcard:'',
            writeFlag:true,// 总包输入 列表
            //检索所需字段
            pickFlag:false,// 弹窗
            templateRadio:'',// 单选按钮
            pickData:[],// 检索列表
            pickItem:{},// 点击的item
            readonly: true,// input只可读不可编辑
            // 保存所需字段
            recommendedOneUnit:'',// 推荐排名第一单位
            winningAmountOne:'',// 拟中标金额1
            amountUnitOne:'',//֖金额单位1
            recommendedSecondUnit:'',//֖推荐排名第二单位
            winningAmountTwo:'',// 拟中标金额2
            amountUnitTwo:'',//֖金额单位2
            recommendedSecondThree:'',//֖推荐排名第三单位
            winningAmountThree:'',//  拟中标金额3
            amountUnitThree:'',//֖金额单位3
            bidEvaluationCommitteeList:'',//评标委员会成员名单
            publicityName:'',//公示名称
            publicityStartTime:'',// 公示开始时间
            publicityEndTime:'',// 公示结束时间
            remarks:'',//备注说明
            signatureOrNot:'',//是否签章
            address:'',//地址
            contactInformation:'',//联系方式
            entrySubcontractNumber:'',// 入场项目编号 分包
            projectCode:'',//入场项目编号 总包
            saveBox:false,//保存弹窗
            winnCandidaId:'',// 中标候选人
            // 下一步页面
            showFlag:false,
            projectLeader:'',// 项目联系人
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
            infoList:[],
            // 办理记录
            manageDate:[],
            creationTime:'',// 时间
            // 分包信息
            subpackageData:[],
            lookFlag:false,
             // 招标项目信息所需字段
            nameOfTenderProject:'',// 招标项目名称
            biddingProjectNumber:'',// 招标项目编号
            nameOfPurchaser:'',// 招标(采购)人
            budgetAmount:'',// 招标项目预算金额
            biddingProcurementMode:'',// 招标方式
            scopeOfTender:'',// 招标范围
			subcontractingControlAmount:'',// 分包控制金额
			qualificationExaminationMethod:'',// 资格审查方式	
			electronicBidEvaluation:'',// 是否电子招投标
			subcontractContents:'',// 分包内容
			subcontractName:'',// 分包名称 
            amountId:'',// 总包
            // 操作
            editFlag:false,
            creatorName:'',// 创建人名字
            saveTime:'',// 保存时间
        }
    },
    created(){
        if(this.projectObj.totalProjectId.indexOf("-") != -1){
            // 分包
            this.diffFlag = true;
            this.entrySubcontractNumber = this.totalProjectId;
        }else{
            // 总包
            this.diffFlag = false;
            this.projectCode = this.totalProjectId;
        }
        this.getInitInfo();// 初始化查询
        this.getbiddingInfo();// 招标项目信息
        this.getmanageInfo();// 办理记录
        this.getsubpackageInfo();// 初始化分包信息
    },
    methods:{
        // 复选框的列表
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        // 保存和下一步公用方法
        newly(num){
            if(num == 1){
                // 保存
                this.savecandidateInfo(num);
            }else{
                // 下一步
                this.writeFlag = false;// 输入框的页面
                this.showFlag = true;// 下一步页面
                this.savecandidateInfo(num);
                this.getinformation();// 公告信息
                this.getmanageInfo();// 办理记录
            }
        },
        // 上一步
        goBack(){
            this.laststepBox = true;// 上一步弹窗 确定
            this.writeFlag = true;// 输入框的页面
            this.showFlag = false;// 下一步页面
            this.getBackTemp();// 上一步的查询
        },
        // 提交
        submit(){
            this.submitBox = true;
        },
        // 确认提交
        sureSubmit(){
            this.$axios({
                method: "POST",
                url: baseUrl+"/winnCandidaController/submit",
                data:{
                    state:'待办理',
                    winnCandidaId:this.winnCandidaId,// 工本费接收账户id 
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
        },
        // 保存
        savecandidateInfo(num){
            let object = {}
            if(this.projectObj.totalProjectId.indexOf("-") != -1){
                // 分包
                object = {
                    entrySubcontractNumber:this.projectObj.totalProjectId,
                    recommendedOneUnit:this.recommendedOneUnit,
                    winningAmountOne:this.winningAmountOne,
                    amountUnitOne:this.amountUnitOne,
                    recommendedSecondUnit:this.recommendedSecondUnit,
                    winningAmountTwo:this.winningAmountTwo,
                    amountUnitTwo:this.amountUnitTwo,
                    recommendedSecondThree:this.recommendedSecondThree,
                    winningAmountThree:this.winningAmountThree,
                    amountUnitThree:this.amountUnitThree,
                    bidEvaluationCommitteeList:this.bidEvaluationCommitteeList,
                    publicityName:this.publicityName,
                    publicityStartTime:changeTime(this.publicityStartTime),
                    publicityEndTime:changeTime(this.publicityEndTime),
                    remarks:this.remarks,
                    address:this.address,
                    contactInformation:this.contactInformation
                }
            }else{
                // 总包
                object = {
                    projectCode:this.projectObj.totalProjectId,
                    recommendedOneUnit:this.recommendedOneUnit,
                    winningAmountOne:this.winningAmountOne,
                    amountUnitOne:this.amountUnitOne,
                    recommendedSecondUnit:this.recommendedSecondUnit,
                    winningAmountTwo:this.winningAmountTwo,
                    amountUnitTwo:this.amountUnitTwo,
                    recommendedSecondThree:this.recommendedSecondThree,
                    winningAmountThree:this.winningAmountThree,
                    amountUnitThree:this.amountUnitThree,
                    bidEvaluationCommitteeList:this.bidEvaluationCommitteeList,
                    publicityName:this.publicityName,
                    publicityStartTime:changeTime(this.publicityStartTime),
                    publicityEndTime:changeTime(this.publicityEndTime),
                    remarks:this.remarks,
                    address:this.address,
                    contactInformation:this.contactInformation
                }
            }
            this.$axios({
                method:'POST',
                url:baseUrl + '/winnCandidaController/saveOrUpdate',
                data:object
            }).then(res=>{
                if(res.data.status == 200){
                    if(num == 1){
                        this.saveBox = true;
                    }else{
                        this.saveBox = false;
                        
                    }
                    this.publicityStartTime=formatDate(res.data.data.publicityStartTime);
                    this.publicityEndTime=formatDate(res.data.data.publicityEndTime);
                    this.winnCandidaId = res.data.data.winnCandidaId;
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
        // 公告信息
        getinformation(){
            let object={}
            if(this.projectObj.totalProjectId.indexOf("-") != -1 && this.projectObj.totalProjectId!=null){
                // 入场项目分包编号
                object={
                    entrySubcontractNumber:this.totalProjectId
                }
            }else{
                // 入场项目编号
                object ={
                    projectCode:this.totalProjectId
                }
            }
            this.$axios({
                method: "POST",
                url: baseUrl+"/tenderInforController/selectByProjectCode",
                data:object
            }).then(res=>{
                if(res.data.status == 200){
                    this.projectLeader=res.data.data.projectLeader// 项目负责人
                    this.projectLeaderPhone=res.data.data.projectLeaderPhone// 联系方式
                    this.remark=res.data.data.remark// 备注
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
                method:'POST',
                url:baseUrl + '/winnCandidaController/select',
                data:object
            }).then(res=>{
                if(res.data.status == 200){
                    this.infoList = res.data.data;
                    if(res.data.data == null ||  this.infoList.length <=0){
                        this.writeFlag = true;
                        this.showFlag = false;
                    }else {
                        this.infoList.forEach(item => {
                            if(item.state == '编辑中' || item.state == '办理未通过'){
                                this.writeFlag = false;
                                this.showFlag = true;
                                
                            }else{
                                this.writeFlag = true;
                                this.headerBtn = false;// 有上一步和提交的按钮
                                this.showFlag = false;
                            }
                            this.recommendedOneUnit=item.recommendedOneUnit;
                            this.winningAmountOne=item.winningAmountOne;
                            this.amountUnitOne=item.amountUnitOne;
                            this.recommendedSecondUnit=item.recommendedSecondUnit;
                            this.winningAmountTwo=item.winningAmountTwo;
                            this.amountUnitTwo=item.amountUnitTwo;
                            this.recommendedSecondThree=item.recommendedSecondThree;
                            this.winningAmountThree=item.winningAmountThree;
                            this.amountUnitThree=item.amountUnitThree;
                            this.bidEvaluationCommitteeList=item.bidEvaluationCommitteeList;
                            this.publicityName=item.publicityName;
                            this.publicityStartTime=formatDate(item.publicityStartTime);
                            this.publicityEndTime=formatDate(item.publicityEndTime);
                            this.remarks=item.remarks;
                            this.address=item.address;
                            this.contactInformation=item.contactInformation;
                            this.saveTime = formatDate(item.saveTime);// 保存时间
                            this.creatorName = item.creatorName;// 创建人名字
                        });
                    }
                    
                }else{
                    this.$layer.msg(res.data.msg);
                }
            }).catch(err=>{
                console.log(err);
            })
        },
        // 上一步的查询
        getBackTemp(){
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
                url:baseUrl + '/winnCandidaController/select',
                data:object
            }).then(res=>{
                if(res.data.status == 200){
                    this.infoList = res.data.data;
                    this.infoList.forEach(item => {
                        this.recommendedOneUnit=item.recommendedOneUnit;
                        this.winningAmountOne=item.winningAmountOne;
                        this.amountUnitOne=item.amountUnitOne;
                        this.recommendedSecondUnit=item.recommendedSecondUnit;
                        this.winningAmountTwo=item.winningAmountTwo;
                        this.amountUnitTwo=item.amountUnitTwo;
                        this.recommendedSecondThree=item.recommendedSecondThree;
                        this.winningAmountThree=item.winningAmountThree;
                        this.amountUnitThree=item.amountUnitThree;
                        this.bidEvaluationCommitteeList=item.bidEvaluationCommitteeList;
                        this.publicityName=item.publicityName;
                        this.publicityStartTime=formatDate(item.publicityStartTime);
                        this.publicityEndTime=formatDate(item.publicityEndTime);
                        this.remarks=item.remarks;
                        this.address=item.address;
                        this.contactInformation=item.contactInformation;
                    });
                    
                }else{
                    this.$layer.msg(res.data.msg);
                }
            }).catch(err=>{
                console.log(err);
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
        // 初始化分包信息
        getsubpackageInfo(){
            let arr =[];
            arr.push(this.projectObj.totalProjectId)
            this.$axios({
                method: "POST",
                url: baseUrl+"/projectInformationController/selectByProjectEntrySubcontractNumber",
                data:{
                    projectEntrySubcontractNumbers:arr
                }
            }).then(res=>{
                if(res.data.status == 200){
                    this.subpackageData = res.data.data;
                    this.subpackageData.forEach(item=>{
                        this.biddingProcurementMode = item.projectInformationVo.biddingProcurementMode;
                    })
                }else{
                     this.$layer.msg(res.data.msg);
                }
            }).catch(err=>{
                console.log(err)
            })
        },
        // 查看分包信息
        lookoverItem(row){
            this.lookFlag = true;
            this.entrySubcontractNumber = row.entrySubcontractNumber;// 入场项目分包编号
			this.subcontractName = row.subcontractName;// 分包名称 
			this.subcontractContents = row.subcontractContents;// 分包内容
			this.scopeOfTender = row.scopeOfTender;// 招标范围
			this.subcontractingControlAmount = row.subcontractingControlAmount;// 分包控制金额	
			this.qualificationExaminationMethod = row.projectInformationVo.qualificationExaminationMethod;// 资格审查方式 
			this.electronicBidEvaluation = row.projectInformationVo.electronicBidEvaluation;// 是否电子招投标
        },
        // 关闭查看分包信息
        closeLook(){
            this.lookFlag = false;
        },
        // 操作详情
        editItem(row){
            this.editFlag = true;
        },
        // 关闭操作信息
        closeEdit(){
            this.editFlag = false;
        },
        savePage(){
            this.editFlag = false;
        },
        // 清空信息
        clearInfo(){
            this.recommendedOneUnit='';//推荐排名第一单位
            this.winningAmountOne='';//拟中标金额
            this.amountUnitOne='';//元
            this.recommendedSecondUnit='';//推荐排名第二单位
            this.winningAmountTwo='';//拟中标金额
            this.amountUnitTwo='';//元
            this.recommendedSecondThree='';;//推荐排名第三单位
            this.winningAmountThree='';//拟中标金额
            this.amountUnitThree='';//元
            this.bidEvaluationCommitteeList='';//评标委员会成员名单
        },
        // 检索
        pickInfo(){
            this.pickFlag = true;
            this.getPickInfo();// 检索列表
        },
        //关闭检索
        closePick(){
            this.pickFlag = false;
        },
        // 检索列表
        getPickInfo(){
            let object={}
            if(this.projectObj.totalProjectId.indexOf("-") != -1 && this.projectObj.totalProjectId!=null){
                // 入场项目分包编号
                object={
                    entrySubcontractNumber:this.projectObj.totalProjectId,
                    isEffective:"1",       
                }
            }else{
                // 入场项目编号
                object ={
                    projectCode:this.projectObj.totalProjectId,
                    isEffective:"1",  
                }
            }
            this.$axios({
                method: "POST",
                url: baseUrl+"/bidInforController/selectList",
                data:object
            }).then(res=>{
                if(res.data.status == 200){
                    this.pickData = res.data.data;
                }else{
                     this.$layer.msg(res.data.msg);
                }
            }).catch(err=>{
                console.log(err)
            })
        },
        // 中标信息 ---> 挑选---> 列表 ---> 单选框
        getTemplatePick(row){
            this.pickItem = row;
        },
        // 检索列表+
        copyPick(row){
            this.recommendedOneUnit = row.companyName;
            this.pickFlag = false;
        },
        // 挑选 ---> 确定选择
        pickSure(){
            this.pickFlag =false;
            this.recommendedOneUnit = this.pickItem.companyName;
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
    display: flex;
    flex-direction: column;
}
.box{
    width: 100%;
    height: 40px;
    background: #e2e2e2;
    display: flex;
    justify-content: flex-start;
    align-items: center;
}
.main_info {
    flex: 1;
    overflow: hidden;
    overflow-y: scroll;
}
.lookWrapper{
    width: 100%;
    height: 100%;
    position: fixed;
    left: 185px;
    top: 0;
    background: rgba(0, 0, 0, .3);
    z-index: 99;
    padding:50px 20px;
}
/* 检索页面 */
.pickWrapper{
    width: 100%;
    height: 100%;
    position: fixed;
    left: 185px;
    top: 0;
    background: rgba(0, 0, 0, .3);
    z-index: 999;
    padding: 100px;
}
.pickBox,.lookBox{
    width: 87%;
    height: 100%;
    background: #fff;
    position: relative;
}
.pick_title,.look_title{
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
.pick_input{
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
    width: 100px;
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



.el-collapse{
    width: 80%;
    margin: 10px auto;
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
.star{
    color: red;
    padding-right: 5px;
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
.el-icon-success,.el-icon-question{
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
/* 列表展示 */
.edit_list{
    padding: 15px 20px;
}
.editItem{
    width: 100%;
    display: flex;
    align-items: center;
}
.editCenter{
    flex: 1;
    display: flex;
    padding: 5px 0;
}
.editName{
    width: 145px;
    display: flex;
    justify-content: flex-end;
}
.editContent{
    flex: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
    color: #6e622e;
}
.editContent>p{
    width: 25%;
}
/* 文本框的样式 */
.editTextarea{
    width: 100%;
    padding: 5px 0;
    display: flex;
}
</style>