<template>
    <div class="newBox">
        <!-- 组建评标委员会 -->
        <div class="wrapper" v-show="writeFlag">
            <div class="box" v-show="headerBtn">
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
                        <div class="show_list">
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
                    <!-- 业主专家 -->
                    <el-collapse-item title="业主专家" name="2">
                        <div class="show_list">
                            <div class="owner_title">
                                <button class="owner_btn" @click="addPeople">新增专家</button>
                                <button class="owner_btn" @click="deletePeople">删除专家</button>
                            </div>
                            <div style="margin-top:5px;">
                                <el-table
                                    ref="multipleTable"
                                    :data="ownerList"
                                    tooltip-effect="dark"
                                    style="width: 100%"
                                    @selection-change="handelOwnerInfo">
                                    <el-table-column
                                    type="selection"
                                    width="55">
                                    </el-table-column>
                                    <el-table-column
                                    label="序号">
                                        <template slot-scope="scope">{{ scope.$index+1 }}</template>
                                    </el-table-column>
                                    <el-table-column
                                        prop="expertName"
                                        label="姓名">
                                    </el-table-column>
                                    <el-table-column
                                        prop="company"
                                        label="工作单位">
                                    </el-table-column>
                                    <el-table-column
                                        prop="certified"
                                        label="职称/执业资格">
                                    </el-table-column>
                                    <el-table-column
                                        prop="specialty"
                                        label="从事专业">
                                    </el-table-column>
                                    <el-table-column
                                        prop="committeeJob"
                                        label="评标委员会担任工作">
                                    </el-table-column>
                                    <el-table-column
                                        prop="expertType"
                                        label="专家类型">
                                    </el-table-column>
                                    <el-table-column
                                        label="查看">
                                        <template slot-scope="scope">
                                            <i class="el-icon-search"  style="cursor: pointer;" @click="viewInfo(scope.row)"></i>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        label="修改">
                                        <template slot-scope="scope">
                                            <i class="el-icon-edit"  style="cursor: pointer;" @click="editOwner(scope.row)"></i>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </div>
                        </div>
                    </el-collapse-item>
                    <!-- 回避信息-->
                    <el-collapse-item title="回避信息" name="3" >
                        <div class="show_list">
                            <div class="owner_title">
                                <button class="owner_btn" @click="addWork">添加回避单位</button>
                                <button class="owner_btn" @click="deleteWork">删除回避单位</button>
                            </div>
                            <div style="margin-top:5px;">
                                <el-table
                                    ref="multipleTable"
                                    :data="avoidData"
                                    tooltip-effect="dark"
                                    style="width: 100%"
                                    @selection-change="handleAvoidInfo">
                                    <el-table-column
                                    type="selection"
                                    width="55">
                                    </el-table-column>
                                    <el-table-column
                                    label="序号">
                                        <template slot-scope="scope">{{ scope.$index+1 }}</template>
                                    </el-table-column>
                                    <el-table-column
                                        prop="avoidCompanyName"
                                        label="回避单位名称">
                                    </el-table-column>
                                    <el-table-column
                                        prop="avoidCompanyInstitutionCode"
                                        label="回避单位机构代码">
                                    </el-table-column>
                                    <el-table-column
                                        prop="avoidReason"
                                        label="回避原因">
                                    </el-table-column>
                                </el-table>
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
                    <!-- 相关附件 -->
                    <el-collapse-item title="相关附件" name="2">
                        <div class="notic">注：请上传确认函扫描件或由招标（采购）人对“招标公告”在线签章。</div>
                        <el-table :data="tableData" stripe style="width: 100%">
                            <el-table-column  prop="index"  label="附件名称">
                            </el-table-column>
                            <el-table-column  prop="number"  label="附件列表(点击查看)">
                            </el-table-column>
                            <el-table-column  prop="number"  label="管理">
                            </el-table-column>
                        </el-table>
                    </el-collapse-item>
                    <!-- 业主专家 -->
                    <el-collapse-item title="业主专家" name="3">
                        <div class="show_list">
                            <div style="margin-top:5px;">
                                <el-table
                                    ref="multipleTable"
                                    :data="ownerList"
                                    tooltip-effect="dark"
                                    style="width: 100%"
                                    @selection-change="handelOwnerInfo">
                                    <el-table-column
                                    type="selection"
                                    width="55">
                                    </el-table-column>
                                    <el-table-column
                                    label="序号">
                                        <template slot-scope="scope">{{ scope.$index+1 }}</template>
                                    </el-table-column>
                                    <el-table-column
                                        prop="expertName"
                                        label="姓名">
                                    </el-table-column>
                                    <el-table-column
                                        prop="company"
                                        label="工作单位">
                                    </el-table-column>
                                    <el-table-column
                                        prop="certified"
                                        label="职称/执业资格">
                                    </el-table-column>
                                    <el-table-column
                                        prop="specialty"
                                        label="从事专业">
                                    </el-table-column>
                                    <el-table-column
                                        prop="committeeJob"
                                        label="评标委员会担任工作">
                                    </el-table-column>
                                    <el-table-column
                                        prop="expertType"
                                        label="专家类型">
                                    </el-table-column>
                                    <el-table-column
                                        label="查看">
                                        <template slot-scope="scope">
                                            <i class="el-icon-search"  style="cursor: pointer;" @click="viewInfo(scope.row)"></i>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </div>
                        </div>
                    </el-collapse-item>
                    <el-collapse-item title="回避信息" name="4">
                        <div class="show_list">
                            <el-table
                                    ref="multipleTable"
                                    :data="avoidData"
                                    tooltip-effect="dark"
                                    style="width: 100%"
                                    @selection-change="handleAvoidInfo">
                                    <el-table-column
                                    type="selection"
                                    width="55">
                                    </el-table-column>
                                    <el-table-column
                                    label="序号">
                                        <template slot-scope="scope">{{ scope.$index+1 }}</template>
                                    </el-table-column>
                                    <el-table-column
                                        prop="avoidCompanyName"
                                        label="回避单位名称">
                                    </el-table-column>
                                    <el-table-column
                                        prop="avoidCompanyInstitutionCode"
                                        label="回避单位机构代码">
                                    </el-table-column>
                                    <el-table-column
                                        prop="avoidReason"
                                        label="回避原因">
                                    </el-table-column>
                                </el-table>
                        </div>
                    </el-collapse-item>
                    <!-- 备注说明 -->
                    <el-collapse-item title="备注说明" name="5">
                    
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
		<!-- 挑选 -->
		<div class="pickWrapper" v-show="pickFlag">
            <div class="pickBox">
                <div class="pick_title">
                    <p>挑选专家</p>
                    <i class="el-icon-close" @click="closePick"></i>
                </div>
                <div class="pick_input" >
                    <div class="noteItem">
                        <div class="noteLeft">身份证号：</div>
                        <div class="write_input" >
                            <el-input v-model="idNumber" clearable></el-input>
                        </div>
                    </div>
                    <button class="owner_btn" @click="searckPickData">搜索</button>
                </div>
                <div class="pick_main">
                    <el-table
                        ref="multipleTable"
                        :data="pickData"
                        tooltip-effect="dark"
                        style="width: 100%">
                        <el-table-column align="center" width="55" label="" >
                            <template slot-scope="scope">
                                <el-radio :label="scope.row.expertsId" v-model="templateRadio" @change.native="getTemplatePick(scope.row)">&nbsp;</el-radio>
                            </template>
                        </el-table-column>
                        <el-table-column
                            label="序号">
                            <template slot-scope="scope">{{ scope.$index+1  }}</template>
                        </el-table-column>
                        <el-table-column
                            prop="expertName"
                            label="专家名称">
                        </el-table-column>
                        <el-table-column
                            prop="idNumber"
                            label="身份证号">
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
					<!--分包信息 -->
					<el-collapse-item title="分包信息" name="1">
                        <div class="edit_list">
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
        <!-- 查看业主专家 -->
        <div class="lookWrapper" v-show="viewFlag">
            <div class="lookBox">
				<div class="pick_title">
                    <p>查看业主专家</p>
                    <i class="el-icon-close" @click="closeView"></i>
                </div>
				<el-collapse v-model="activeName" accordion>
					<!--业主专家信息 -->
					<el-collapse-item title="业主专家信息" name="1">
						<div class="edit_list">
							<div class="editItem">
                                <div class="editCenter">
                                    <div class="editName">专家姓名：</div>
                                    <div class="editContent">{{expertName}} </div>
                                </div>
                                <div class="editCenter">
                                    <div class="editName">性别：</div>
                                    <div class="editContent">{{sex}} </div>
                                </div>
                            </div>
                            <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName">年龄：</div>
                                    <div class="editContent">{{age}}</div>
                                </div>
                                <div class="editCenter">
                                    <div class="editName">学历：</div>
                                    <div class="editContent">{{education}}</div>
                                </div>
                            </div>
                            <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName">身份证号：</div>
                                    <div class="editContent">{{idNumber}}</div>
                                </div>
                                <div class="editCenter">
                                    <div class="editName">职务：</div>
                                    <div class="editContent">{{position}}</div>
                                </div>
                            </div>
                            <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName">业主专家来源：</div>
                                    <div class="editContent">{{expertSource}}</div>
                                </div>
                                <div class="editCenter">
                                    <div class="editName">工作单位：</div>
                                    <div class="editContent">{{company}}</div>
                                </div>
                            </div>
                            <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName">专家手机：</div>
                                    <div class="editContent">{{phone}}</div>
                                </div>
                                <div class="editCenter">
                                    <div class="editName">职称/执业资格：</div>
                                    <div class="editContent">{{certified}}</div>
                                </div>
                            </div>
                            <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName">专家类型：</div>
                                    <div class="editContent">{{expertType}}</div>
                                </div>
                                <div class="editCenter">
                                    <div class="editName">评标委员会担任工作：</div>
                                    <div class="editContent">{{committeeJob}}</div>
                                </div>
                            </div>
                            <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName">从事专业：</div>
                                    <div class="editContent">{{specialty}}</div>
                                </div>
                            </div>
						</div>
					</el-collapse-item>
				</el-collapse>
            </div>
        </div>
        <!-- 新增及修改业主专家 -->
        <div class="addWrapper" v-show="addPeopleFlag">
            <div class="addBox">
                <div class="add_title" >
                    <p>{{ownerTitle}}</p>
                    <i class="el-icon-close" @click="closeAddPeople"></i>
                </div>
                <div class="box">
                    <button class="btn" @click="newSave">保存</button>
                </div>
                <el-collapse v-model="activeName" accordion>
					 <!-- 业主专家信息-->
					<el-collapse-item title="业主专家信息" name="1">
						<div class="edit_list">
							<div class="noteBox">
								<div class="noteItem">
									<div class="noteLeft"><p class="star">*</p>专家姓名：</div>
									<div class="write_input" style="width:190px;">
										<el-input v-model="expertName" clearable></el-input>
									</div>
									<el-button plain @click="pickInfo">挑选</el-button>
								</div>
                                <div class="noteItem">
									<div class="noteLeft">性别：</div>
									<div class="write_input">
										<el-select v-model="sex">
                                            <el-option label="男" value="男"></el-option>
                                            <el-option label="女" value="女"></el-option>
                                        </el-select>
									</div>
								</div>
							</div>
							<div class="noteBox">
								<div class="noteItem">
									<div class="noteLeft">年龄：</div>
									<div class="write_input">
										<el-input v-model="age" clearable></el-input>
									</div>
								</div>
								<div class="noteItem">
									<div class="noteLeft">学历：</div>
									<div class="write_input">
										<el-select v-model="education">
                                            <el-option v-for="item in educationList" :key="item.value" :label="item.label" :value="item.value">
                                            </el-option>
                                        </el-select>
									</div>
								</div>
							</div>
							<div class="noteBox">
								<div class="noteItem">
									<div class="noteLeft"><p class="star">*</p>身份证号：</div>
									<div class="write_input">
										<el-input v-model="idNumber" clearable></el-input>
									</div>
								</div>
								<div class="noteItem">
									<div class="noteLeft">职务：</div>
									<div class="write_input">
										<el-input v-model="position" clearable></el-input>
									</div>
								</div>
							</div>
                            <div class="noteBox">
								<div class="noteItem">
									<div class="noteLeft">业主专家来源：</div>
									<div class="write_input">
										<el-select v-model="expertSource">
                                            <el-option v-for="item in expertSourceList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                        </el-select>
									</div>
								</div>
								<div class="noteItem">
									<div class="noteLeft">工作单位：</div>
									<div class="write_input">
										<el-input v-model="company" clearable></el-input>
									</div>
								</div>
							</div>
                             <div class="noteBox">
                                <div class="noteItem">
									<div class="noteLeft"><p class="star">*</p>专家手机：</div>
									<div class="write_input">
										<el-input v-model="phone" clearable></el-input>
									</div>
								</div>
								<div class="noteItem">
									<div class="noteLeft">职称/执业资格：</div>
									<div class="write_input">
										<el-select v-model="certified" >
                                            <el-option v-for="item in certifiedList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                        </el-select>
									</div>
								</div>
							</div>
                            <div class="noteBox">
								<div class="noteItem">
									<div class="noteLeft">专家类型：</div>
									<div class="write_input">
										<el-select v-model="expertType">
                                            <el-option v-for="item in expertTypeList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                        </el-select>
									</div>
								</div>
                                <div class="noteItem">
									<div class="noteLeft">评标委员会担任工作：</div>
									<div class="write_input">
										<el-select v-model="committeeJob">
                                            <el-option v-for="item in committeeJobList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                        </el-select>
									</div>
								</div>
							</div>
							<div class="noteBox">
								<div class="noteItem">
									<div class="noteLeft">从事专业：</div>
									<div class="write_item" >
										<el-input v-model="specialty"></el-input>
									</div>
								</div>
							</div>
					
						</div>
					</el-collapse-item>
				</el-collapse>
            </div>
        </div>
        <!-- 新增回避单位 -->
        <div class="addPage"  v-show="addWorkFlag">
            <div class="addBox">
                <div class="add_title">
                    <p>新增回避单位</p>
                    <i class="el-icon-close" @click="closeAddWork"></i>
                </div>
				<div class="box">
					<button class="btn" @click="saveAddwork">修改保存</button>
				</div>
                <el-collapse v-model="activeName" accordion>
					 <!-- 回避单位信息-->
					<el-collapse-item title="回避单位信息" name="1">
						<div class="edit_list">
							<div class="noteBox">
								<div class="noteItem">
									<div class="noteLeft"><p class="star">*</p>回避单位名称：</div>
									<div class="write_input" style="width:190px;">
										<el-input v-model="avoidCompanyName" clearable></el-input>
									</div>
									<el-button plain @click="choisePage">选择</el-button>
								</div>
                                <div class="noteItem">
									<div class="noteLeft">回避单位机构代码：</div>
									<div class="write_input">
										<el-input v-model="avoidCompanyInstitutionCode" clearable></el-input>
									</div>
								</div>
							</div>
							<div class="noteBox">
								<div class="noteItem">
									<div class="noteLeft">回避原因：</div>
									<div class="write_input">
										<el-select v-model="avoidReason">
                                            <el-option label="招标人" value="招标人"></el-option>
                                            <el-option label="投标人" value="投标人"></el-option>
                                            <el-option label="招标代理机构" value="招标代理机构"></el-option>
                                            <el-option label="行业主管部门" value="行业主管部门"></el-option>
                                            <el-option label="其他" value="其他"></el-option>
                                        </el-select>
									</div>
								</div>
							</div>
						</div>
					</el-collapse-item>
				</el-collapse>
            </div>
        </div>
        <!-- 选择回避单位 -->
        <div class="choisePage"  v-show="choiseFlag">
            <div class="choiseBox">
                <div class="add_title">
                    <p>选择回避单位</p>
                    <i class="el-icon-close" @click="closeChoise"></i>
                </div>
                <div class="pick_input" >
                    <div class="noteItem">
                        <div class="noteLeft">单位名称：</div>
                        <div class="write_input" >
                            <el-input v-model="unitName" clearable></el-input>
                        </div>
                    </div>
                    <div class="noteItem">
                        <div class="noteLeft" style="width:200px;">机构代码/统一社会信用代码：</div>
                        <div class="write_input" >
                            <el-input v-model="socialCreditCode" clearable></el-input>
                        </div>
                    </div>
                    <button class="owner_btn" @click="searchAvoidData">搜索</button>
                </div>
                <div class="choise_main">
                    <el-table
                        ref="multipleTable"
                        :data="choiseData"
                        tooltip-effect="dark"
                        style="width: 100%">
                        <el-table-column align="center" width="55" label="" >
                            <template slot-scope="scope">
                                <el-radio :label="scope.row.ausId" v-model="templateRadio" @change.native="getTemplateRow(scope.row)">&nbsp;</el-radio>
                            </template>
                        </el-table-column>
                        <el-table-column
                            label="序号">
                            <template slot-scope="scope">{{ scope.$index+1 }}</template>
                        </el-table-column>
                        <el-table-column
                            prop="unitName"
                            label="单位名称">
                        </el-table-column>
                        <el-table-column
                            prop="organizationCode"
                            label="机构代码">
                        </el-table-column>
                        <el-table-column
                            prop="socialCreditCode"
                            label="社会信用编码">
                        </el-table-column>
                    </el-table>
                </div>
                <div class="choise_footer">
                    <div class="pagination" >
                        <el-pagination
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page.sync="currentPage"
                            :page-size="pageSize"
                            layout="total, prev, pager, next, jumper"
                            :total="total">
                        </el-pagination>
                    </div>
                    <div class="sure_btn">
                        <button class="btn" @click="choiseSure">确定选择</button>
                    </div>
                </div>
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
                <p>当前步骤: <span>组建评标委员会 </span></p>
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
         <!-- 删除回避信息提示 -->
        <el-dialog
            title="系统提示"
            :visible.sync="deleteBox"
            width="40%"
            :before-close="handleClose">
            <div class="icon">
                <i class="el-icon-warning"></i>
                <span>请选择需要删除的回避单位！</span>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="deleteSure()">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import '../../../assets/css/style.css'
import baseUrl from '../../../api/api'
import {formatDate,digitUppercase} from '../../../api/base.js'
export default {
    data(){
        return {
			projectObj:JSON.parse(window.localStorage.projectObj),
            activeName:['1','2','3','4','5','6'],
            tableData:[],
            breakBagFlag:false,
            multipleSelection:[],//多选框
            idcard:'',
			writeFlag:true,// 总包输入 列表
			//挑选所需字段
			pickFlag:false,// 弹窗
            // 招标项目信息所需字段
            nameOfTenderProject:'',// 招标项目名称
            biddingProjectNumber:'',// 招标项目编号
            nameOfPurchaser:'',// 招标(采购)人
			budgetAmount:'',// 招标项目预算金额
			amountOfBiddingProject:'',//招标项目金额
			biddingProcurementMode:'',// 招标采购方式
			biddingOrganization:'',// 招标组织方式
			typesOfBiddingProjects:'',// 招标项目类型
            // 保存所需字段
            address:'',// 招标人地址
            remarks:'',//֖备注
            name:'',//中标供应商地址
            number:'',
            entrySubcontractNumber:'',// 入场项目编号 分包
            projectCode:'',//入场项目编号 总包
			saveBox:false,//保存弹窗
            // 下一步页面
            showFlag:false,
            remark:'',// 备注
            // 提交弹窗
            submitBox:false,
            remind:'',//手机短信提醒
            // 确定提交
            sureSubmitBox:false,
            headerBtn:true,
			infoList:[],
			// 公告内容
			amountId:'',// 总包
			name:'',// 分包项目名称
			subpackageData:[],// 确定选择的列表
			// 查看详情
			lookFlag:false,
			// 分包信息详情
			winFlag:false,
			scopeOfTender:'',// 招标范围
			subcontractingControlAmount:'',// 分包控制金额
			qualificationExaminationMethod:'',// 资格审查方式	
			electronicBidEvaluation:'',// 是否电子招投标
			subcontractContents:'',// 分包内容
			subcontractName:'',// 分包名称 
            totalProjectId:'',
            // 办理记录
            manageDate:[],
            creationTime:'',// 时间
            // 新增专家
            addPeopleFlag:false,
            // 删除专家
            deletePeopleFlag:false,
            // 回避信息
            avoidData:[],// 列表
            multipleAvoidData:[],// 复选框选中
            deleteId:[],// 被删除的ID
            // 新增回避单位
            addWorkFlag:false,
            avoidCompanyName:'',// 回避单位名称
            avoidReason:'招标人',// 回避原因
            avoidCompanyInstitutionCode:'',// 回避单位机构代码
            // 新增回避单位 ->回避单位
            choiseData:[],// 回避单位列表
            templateRadio:'',// 单选框按钮
            rowItem:{},// 单选框选中的item数据
            unitName:'',// 单位名称
            socialCreditCode:'',// 社会信用编码
            // 删除回避单位
            deleteWorkFlag:false,
            deleteBox:false,
            // 选择回避单位
            choiseFlag:false,
            // 分页器
            currentPage:1,// 当前页
            pageSize: 10, // 每页条数
            pageTotal: 0, //总页数
            total: 0, //总条数
            candidateMenuItem:[],
            // 查看业主专家所需字段
            viewFlag:false,// 弹窗
            expertName:'',// 专家姓名
            sex:'',// 性别
            age:'',// 年龄
            education:'',// 学历
            idNumber:'',// 身份证号码
            position:'',// 职务
            expertSource:'',// 业主专家来源
            company:'',// 工作单位
            phone:'',// 专家手机
            certified:'',// 职称/执业资格
            expertType:'',// 专家类型
            committeeJob:'',// 评标委员会担任工作
            specialty:'',// 从事专业
            expertsId:'',// 业主专家ID
            // 业主专家
            ownerList:[],// 列表
            multipleOwnerData:[],// 复选框选中
            ownerTitle:'',// 标题
            // 下拉框
            expertSourceList:[],// 业主专家来源
            expertTypeList:[],//专家类型
            certifiedList:[],// 职称/执业资格
            committeeJobList:[],// 评标委员会担任工作
            educationList:[],// 学历
            // 挑选
            pickData:[],
            pickItem:{},
            expertsMainId:'',// 
            flag:false,// async控制一直请求接口
        }
    },
    created(){
        if(this.projectObj.totalProjectId.indexOf("-") != -1){
            this.entrySubcontractNumber = this.projectObj.totalProjectId;
            this.breakBagFlag = true;
        }else{
            this.projectCode = this.projectObj.totalProjectId;
            this.breakBagFlag = false;
        }
        this.getInitInfo();// 初始化查询
        this.getItemInfo();// 根据项目入场分包编号查询
		this.getbiddingInfo();// 招标项目信息列表
        this.getmanageInfo();// 办理记录列表
        this.getAvoidinfo();// 回避信息列表
        setTimeout(()=>{
           this.getownerInfo();// 业主专家查询
        },100)
        // 下拉框F
        this.getexpertSource();// 业主专家来源
        this.geteducation();// 学历
        this.getexpertType();// 专家类型
        this.getcertified();// 职称/执业资格
        this.getcommitteeJob();//评标委员会担任工作
    },
    methods:{
        // 分页器
        handleSizeChange(val) {
            // 每页条数
        },
        handleCurrentChange(val) {
            // 当前页数
            this.currentPage = val;
            this.getChoiseList()
        },
		// 挑选
        pickInfo(){
            this.pickFlag = true;
            this.$axios({
                method:'POST',
                url:baseUrl + '/ownerExpertsController/selectExpertsList',
                data:{
                    
                }
            }).then(res=>{
                if(res.data.status == 200){
                   this.pickData = res.data.data;
                }else{
                    this.$layer.msg(res.data.msg);
                }
            }).catch(err=>{
                console.log(err);
            })
        },
        //关闭挑选
        closePick(){
            this.pickFlag = false;
		},
        // 新增回避单位
        addWork(){
            this.addWorkFlag = true;
        },
        // 新增回避单位 ---> 选择
        choisePage(){
            this.choiseFlag = true;
            this.getChoiseList();
        },
        // 新增回避单位 ---> 选择--->关闭
        closeChoise(){
            this.choiseFlag = false;
        },
        closeAddWork(){
            this.addWorkFlag = false;
        },
        // 新增回避单位 ---> 选择---> 列表 ---> 单选框
        getTemplateRow(row){      
           this.rowItem = row;
        },
        // 保存和下一步公用方法
        newly(num){
            if(num == 1){
                // 保存
                this.savecandidateInfo(num)
            }else{
                // 下一步
                this.writeFlag = false;// 输入框的页面
                this.headerBtn=true;
				this.showFlag = true;// 下一步页面
				this.savecandidateInfo(num)
                this.getmanageInfo();// 办理记录
            }
        },
        // 上一步
        goBack(){
            this.writeFlag = true;// 输入框的页面
            this.showFlag = false;// 下一步页面
        },
        // 提交
        submit(){
            this.submitBox = true;
        },
        // 确认提交
        sureSubmit(){
            this.sureSubmitBox = true;// 确定提交弹窗
            this.$axios({
                method:'POST',
                url:baseUrl + '/ownerExpertsController/submit',
                data:{
                    expertsMainId:this.expertsMainId
                }
            }).then(res=>{
                if(res.data.status == 200){
                    this.submitBox = true;
                    this.getInitInfo();// 初始化查询
                }else{
                    this.$layer.msg(res.data.msg);
                }
            }).catch(err=>{
                console.log(err);
            })
        },
        // 确认提交 ---> 确定
        sure(){
            this.sureSubmitBox = false;// 确定提交弹窗
            this.submitBox = false;
            this.headerBtn = false;
            this.showFlag = true;
        },
        handleClose(){
            this.saveBox = false;// 保存弹窗 确定
            this.submitBox = false;// 提交弹窗
            this.deleteBox = false;// 删除回避信息提示
        },
        // 保存弹窗 确定
        saveBoxSure(){
            this.saveBox = false;
        },
        // 保存
        savecandidateInfo(num){
            this.$axios({
                method:'POST',
                url:baseUrl + '/ownerExpertsController/saveOrNextStep',
                data:{
                    expertsMainId:this.expertsMainId
                }
            }).then(res=>{
                if(res.data.status == 200){
                    if(num == 1){
                        this.saveBox = true;
                    }else{
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
		//关闭查看详情
		closeLook(){
			this.lookFlag = false;
		},
		closeWin(){
			this.winFlag = false;
        },
        // 新增业主专家 ---> 挑选---> 列表 ---> 单选框
        getTemplatePick(row){
            this.pickItem = row;
        },
        // 挑选 ---> 确定选择
        pickSure(){
            this.pickFlag =false;
            this.expertName=this.pickItem.expertName;// 专家姓名
            this.sex=this.pickItem.sex;// 性别
            this.age=this.pickItem.age;// 年龄
            this.education=this.pickItem.education;// 学历
            this.idNumber=this.pickItem.idNumber;// 身份证号码
            this.position=this.pickItem.position;// 职务
            this.expertSource=this.pickItem.expertSource;// 业主专家来源
            this.company=this.pickItem.company;// 工作单位
            this.phone=this.pickItem.phone;// 专家手机
            this.certified=this.pickItem.certified;// 职称/执业资格
            this.expertType=this.pickItem.expertType;// 专家类型
            this.committeeJob=this.pickItem.committeeJob;// 评标委员会担任工作
            this.specialty=this.pickItem.specialty;// 从事专业
        },
        // 新增业主专家 ---> 挑选---> 列表 ---> +
        copyPick(row){
            this.pickFlag =false;
            this.expertName=row.expertName;// 专家姓名
            this.sex=row.sex;// 性别
            this.age=row.age;// 年龄
            this.education=row.education;// 学历
            this.idNumber=row.idNumber;// 身份证号码
            this.position=row.position;// 职务
            this.expertSource=row.expertSource;// 业主专家来源
            this.company=row.company;// 工作单位
            this.phone=row.phone;// 专家手机
            this.certified=row.certified;// 职称/执业资格
            this.expertType=row.expertType;// 专家类型
            this.committeeJob=row.committeeJob;// 评标委员会担任工作
            this.specialty=row.specialty;// 从事专业
        },
        // 新增业主专家 ---> 挑选---> 列表 ---> 搜索
        searckPickData(){
            this.$axios({
                method:'POST',
                url:baseUrl + '/ownerExpertsController/selectExpertsList',
                data:{
                    idNumber:this.idNumber 
                }
            }).then(res=>{
                if(res.data.status == 200){
                   this.pickData = res.data.data;
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
        // 回避信息 ---> 信息查询
        getAvoidinfo(){
            this.$axios({
                method: "POST",
                url: baseUrl+"/AvoidInforController/selectList",
                data:{}
            }).then(res=>{
                if(res.data.status == 200){
                   this.avoidData = res.data.data.data;
                }else{
                    this.$layer.msg(res.data.msg);
                }
            }).catch(err=>{
                console.log(err)
            })
        },
        // 新增回避信息 ---> 修改保存
        saveAddwork(){
            let object = {};
            if(this.projectObj.totalProjectId.indexOf("-") != -1){
                // 分包
                object ={
                    entrySubcontractNumber:this.entrySubcontractNumber,
                    avoidCompanyName:this.avoidCompanyName,
                    avoidReason:this.avoidReason,
                    avoidCompanyInstitutionCode:this.avoidCompanyInstitutionCode
                }
            }else{
                // 总包
                object ={
                    projectCode:this.projectCode,
                    avoidCompanyName:this.avoidCompanyName,
                    avoidReason:this.avoidReason,
                    avoidCompanyInstitutionCode:this.avoidCompanyInstitutionCode
                }
            }
            this.$axios({
                method: "POST",
                url: baseUrl+"/AvoidInforController/insert",
                data:object
            }).then(res=>{
                if(res.data.status == 200){
                    this.addWorkFlag = false;
                    this.getAvoidinfo();// 回避信息 ---> 信息查询
                }else{
                    this.$layer.msg(res.data.msg);
                }
            }).catch(err=>{
                console.log(err)
            })
        },
        // 回避信息 ---> 多选框
        handleAvoidInfo(val){
            this.multipleAvoidData = val;
        },
        // 删除回避单位 -->提示弹窗
        deleteSure(){
            this.deleteBox = false;
        },
        // 删除回避单位
        deleteWork(){
            let arr =[];
            this.multipleAvoidData.forEach(item=>{
                arr.push(item.id)
            })
            if(arr.length <= 0){
                this.deleteBox = true;
            }else{
                this.$axios({
                    method: "POST",
                    url: baseUrl+"/AvoidInforController/deleteById",
                    data:{
                        id:arr
                    }
                }).then(res=>{
                    if(res.data.status == 200){
                        this.getAvoidinfo();
                    }else{
                        this.$layer.msg(res.data.msg);
                    }
                }).catch(err=>{
                    console.log(err)
                })
            }
        },
        // 新增回避信息 ---> 回避单位列表
        getChoiseList(){
            this.$axios({
				method: "POST",
				url: baseUrl+"/AusController/selectList",
				data:{
					pageNo:this.currentPage,
					pageSize:this.pageSize
				}
			}).then(res=>{
				if(res.data.status == 200){
					this.choiseData = res.data.data.list;// 新增回避信息 ---> 回避单位列表
                    this.total = res.data.data.total;// 总条数
				}else{
					this.$layer.msg(res.data.msg);
				}
			}).catch(err=>{
				console.log(err)
			})
        },
        // 回避单位列表 ---> 搜索
        searchAvoidData(){
            this.$axios({
				method: "POST",
				url: baseUrl+"/AusController/selectList",
				data:{
                    pageNo:this.currentPage,
					pageSize:this.pageSize,
                    unitName:this.unitName,
                    socialCreditCode:this.socialCreditCode
				}
			}).then(res=>{
				if(res.data.status == 200){
                   this.choiseData = res.data.data.list;// 新增回避信息 ---> 回避单位列表
				}else{
					this.$layer.msg(res.data.msg);
				}
			}).catch(err=>{
				console.log(err)
			})
        },
        // 回避单位列表 ---> 确定选择
        choiseSure(){
            this.choiseFlag = false;
            // 回避单位信息
            this.avoidCompanyName = this.rowItem.unitName;//回避单位名称
            this.avoidReason = this.avoidReason;// 回避原因
            this.avoidCompanyInstitutionCode = this.rowItem.organizationCode;// 回避单位机构代码
        },
        // 业主专家查看
        viewInfo(row){
            this.viewFlag =true;
            this.expertName=row.expertName;// 专家姓名
            this.sex=row.sex;// 性别
            this.age=row.age;// 年龄
            this.education=row.education;// 学历
            this.idNumber=row.idNumber;// 身份证号码
            this.position=row.position;// 职务
            this.expertSource=row.expertSource;// 业主专家来源
            this.company=row.company;// 工作单位
            this.phone=row.phone;// 专家手机
            this.certified=row.certified;// 职称/执业资格
            this.expertType=row.expertType;// 专家类型
            this.committeeJob=row.committeeJob;// 评标委员会担任工作
            this.specialty=row.specialty;// 从事专业
        },
        // 业主专家修改
        editOwner(row){
            console.log(row.expertsId,'修改的当前ID')
            this.addPeopleFlag = true;
            this.ownerTitle = '修改业主专家'
            this.expertsId = row.expertsId;// 业主专家ID
            this.expertName=row.expertName;// 专家姓名
            this.sex=row.sex;// 性别
            this.age=row.age;// 年龄
            this.education=row.education;// 学历
            this.idNumber=row.idNumber;// 身份证号码
            this.position=row.position;// 职务
            this.expertSource=row.expertSource;// 业主专家来源
            this.company=row.company;// 工作单位
            this.phone=row.phone;// 专家手机
            this.certified=row.certified;// 职称/执业资格
            this.expertType=row.expertType;// 专家类型
            this.committeeJob=row.committeeJob;// 评标委员会担任工作
            this.specialty=row.specialty;// 从事专业
            
        },

        // 业主专家查看关闭
        closeView(){
            this.viewFlag =false;
        },
        // 新增业主专家保存
        newSave(){
            if(this.ownerTitle == '新增业主专家'){
                let object = {
                    expertsMainId:this.expertsMainId,
                    expertName:this.expertName,// 专家姓名
                    sex:this.sex,// 性别
                    age:this.age,// 年龄
                    education:this.education,// 学历
                    idNumber:this.idNumber,// 身份证号码
                    position:this.position,// 职务
                    expertSource:this.expertSource,// 业主专家来源
                    company:this.company,// 工作单位
                    phone:this.phone,// 专家手机
                    certified:this.certified,// 职称/执业资格
                    expertType:this.expertType,// 专家类型
                    committeeJob:this.committeeJob,// 评标委员会担任工作
                    specialty:this.specialty,// 从事专业
                    expertsType:'组建评标委员会',
                    deleteControl:'1'
                }
                this.$axios({
                    method: "POST",
                    url: baseUrl+"/ownerExpertsController/saveExperts",
                    data:object
                }).then(res=>{
                    if(res.data.status == 200){
                    this.addPeopleFlag = false;
                    this.getownerInfo();// 查询业主专家
                    }else{
                        this.$layer.msg(res.data.msg);
                    }
                }).catch(err=>{
                    console.log(err)
                })
            }else{
                 // 修改业主专家
                let object = {
                    expertsId:this.expertsId,
                    expertName:this.expertName,// 专家姓名
                    sex:this.sex,// 性别
                    age:this.age,// 年龄
                    education:this.education,// 学历
                    idNumber:this.idNumber,// 身份证号码
                    position:this.position,// 职务
                    expertSource:this.expertSource,// 业主专家来源
                    company:this.company,// 工作单位
                    phone:this.phone,// 专家手机
                    certified:this.certified,// 职称/执业资格
                    expertType:this.expertType,// 专家类型
                    committeeJob:this.committeeJob,// 评标委员会担任工作
                    specialty:this.specialty,// 从事专业
                    expertsType:'组建评标委员会',
                    deleteControl:'1'
                }
                this.$axios({
                    method: "POST",
                    url: baseUrl+"/ownerExpertsController/update",
                    data:object
                }).then(res=>{
                    if(res.data.status == 200){
                    this.addPeopleFlag = false;
                    this.getownerInfo();// 查询业主专家
                    }else{
                        this.$layer.msg(res.data.msg);
                    }
                }).catch(err=>{
                    console.log(err)
                })
            }
            
        },
        // 新增业主专家
        addPeople(){
            this.addPeopleFlag = true;
            this.ownerTitle = '新增业主专家'
            this.expertName='';// 专家姓名
            this.sex='';// 性别
            this.age='';// 年龄
            this.education='';// 学历
            this.idNumber='';// 身份证号码
            this.position='';// 职务
            this.expertSource='';// 业主专家来源
            this.company='';// 工作单位
            this.phone='';// 专家手机
            this.certified='';// 职称/执业资格
            this.expertType='';// 专家类型
            this.committeeJob='';// 评标委员会担任工作
            this.specialty='';// 从事专业
            
        },
        // 新增业主专家  ---> 关闭
        closeAddPeople(){
            this.addPeopleFlag = false;
        },
        // 业主专家 ---> 多选框
        handelOwnerInfo(val) {
            this.multipleOwnerData = val;
        },
        // 删除业主专家
        deletePeople(){
            let arr =[];
            this.multipleOwnerData.forEach(item=>{
                arr.push(item.expertsId)
            })
            if(arr.length <= 0){
                this.deleteBox = true;
            }else{
                this.$axios({
                    method: "POST",
                    url: baseUrl+"/ownerExpertsController/deleteExperts",
                    data:{
                        listExpertsId:arr
                    }
                }).then(res=>{
                    if(res.data.status == 200){
                        this.getownerInfo();// 查询业主专家
                    }else{
                        this.$layer.msg(res.data.msg);
                    }
                }).catch(err=>{
                    console.log(err)
                })
            }
        },
        // 初始化查询
        async getInitInfo(flag){
            if(flag){
                await this.getownerInfo(true);
            }
             let object={}
            if(this.projectObj.totalProjectId.indexOf("-") != -1 && this.projectObj.totalProjectId!=null){
                // 入场项目分包编号
                object={
                    entrySubcontractNumber:this.projectObj.totalProjectId,
                    type:'组建评标委员会'
                }
            }else{
                // 入场项目编号
                object ={
                    projectCode:this.projectObj.totalProjectId,
                    type:'组建评标委员会'
                }
            }
            return this.$axios({
				method: "POST",
				url: baseUrl+"/ownerExpertsController/selectCommitteeState",
				data:object
			}).then(res=>{
				if(res.data.status == 200){
                    if(res.data.data == null || res.data.data.state == null){
                        this.writeFlag = true;
                    }else if (res.data.data.state == '编辑中' || res.data.data.state == '办理未通过'){
                        this.writeFlag =false;
                        this.showFlag = true;
                    }else{
                        this.writeFlag =true;
                        this.headerBtn =false;
                    }
                    this.expertsMainId = res.data.data.expertsMainId;
                    console.log(this.expertsMainId,'初始化查询')
				}else{
					this.$layer.msg(res.data.msg);
				}
			}).catch(err=>{
				console.log(err)
			})
        },
        // 业主专家查询
         getownerInfo(){
            console.log(this.expertsMainId,'业主专家查询')
            return this.$axios({
				method: "POST",
				url: baseUrl+"/ownerExpertsController/selectExpertsList",
				data:{
                    expertsMainId:this.expertsMainId,
                    deleteControl:'1'
				}
			}).then(res=>{
				if(res.data.status == 200){
                   this.ownerList = res.data.data;
				}else{
					this.$layer.msg(res.data.msg);
				}
			}).catch(err=>{
				console.log(err)
			})
        },
        // 下拉框所有的接口
        // 业主专家来源
        getexpertSource(){
            this.$axios({
				method: "POST",
				url: baseUrl+"/interfaceTableController/selectByname",
				data:{
                    dropDownBox:'业主专家来源'
				}
			}).then(res=>{
				if(res.data.status == 200){
                   this.expertSourceList = res.data.data.data;
				}else{
					this.$layer.msg(res.data.msg);
				}
			}).catch(err=>{
				console.log(err)
			})
        },
        // 学历
        geteducation(){
            this.$axios({
				method: "POST",
				url: baseUrl+"/interfaceTableController/selectByname",
				data:{
                    dropDownBox:'学历'
				}
			}).then(res=>{
				if(res.data.status == 200){
                   this.educationList = res.data.data.data;
				}else{
					this.$layer.msg(res.data.msg);
				}
			}).catch(err=>{
				console.log(err)
			})
        },
        // 专家类型
        getexpertType(){
            this.$axios({
				method: "POST",
				url: baseUrl+"/interfaceTableController/selectByname",
				data:{
                    dropDownBox:'专家类型'
				}
			}).then(res=>{
				if(res.data.status == 200){
                   this.expertTypeList = res.data.data.data;
				}else{
					this.$layer.msg(res.data.msg);
				}
			}).catch(err=>{
				console.log(err)
			})
        },
        // 职称/执业资格
        getcertified(){
            this.$axios({
				method: "POST",
				url: baseUrl+"/interfaceTableController/selectByname",
				data:{
                    dropDownBox:'职称/执业资格'
				}
			}).then(res=>{
				if(res.data.status == 200){
                   this.certifiedList = res.data.data.data;
				}else{
					this.$layer.msg(res.data.msg);
				}
			}).catch(err=>{
				console.log(err)
			})
        },
        //评标委员会担任工作
        getcommitteeJob(){
            this.$axios({
				method: "POST",
				url: baseUrl+"/interfaceTableController/selectByname",
				data:{
                    dropDownBox:'评标委员会担任工作'
				}
			}).then(res=>{
				if(res.data.status == 200){
                   this.committeeJobList = res.data.data.data;
				}else{
					this.$layer.msg(res.data.msg);
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
    display: flex;
    flex-direction: column;
}
/* 挑选页面 */
.searchWrapper,.lookWrapper,.winWrapper,.addWrapper,.addPage{
    width: 100%;
    height: 100%;
    position: fixed;
    left: 185px;
    top: 0;
    background: rgba(0, 0, 0, .3);
    z-index: 99;
    padding: 50px;
	
}
.pickWrapper,.choisePage{
    width: 100%;
    height: 100%;
    position: fixed;
    left: 185px;
    top: 0;
    background: rgba(0, 0, 0, .3);
    z-index: 999;
    padding:80px 200px;
    display: flex;
    flex-direction: column;
}
.pick_main{
    width: 100%;
    height: 390px;
    overflow: hidden;
    overflow-y: scroll;
}
.pickBox,.searchBox,.lookBox,.winBox,.addBox{
    width: 87%;
    height: 100%;
    background: #fff;
    display: flex;
    flex-direction: column;
}
.main_info{
    flex: 1;
    overflow: hidden;
    overflow-y: scroll;
}
.choiseBox{
    width: 87%;
    height: 100%;
    background: #fff;
    position: relative;
    display: flex;
    flex-direction: column; 
}
.choise_main{
    width: 100%;
    flex:1;
    overflow: hidden;
    overflow-y: scroll;
}
.choise_footer{
    width: 100%;
    height: 100px;
    padding:10px 20px;
    background-color: #eaeaea;
}
.pick_title,.search_title,.add_title{
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
    justify-content: flex-end;
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
.write_input>.el-select{
    width: 250px;
}
.write_item{
    width: 810px !important;;
}
.write_info {
    width: 550px;
}
.show_list{
    padding: 3px 20px;
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
.el-icon-success,.el-icon-question,.el-icon-warning{
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
/* 业主专家 */
.owner_title{
    width: 100%;
    display: flex;
}
.owner_btn{
    height: 35px;
    padding:0 25px;
    background-color: #0095d5;
    border: none;
    color: #ffffff;
    font-size: 16px;
    cursor: pointer;
    margin-right: 2px;
}
.pick_input{
    width: 100%;
    padding: 0 30px;
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.sure_btn{
    position: absolute;
    left: 0;
    top: 530px;
    bottom: 0;
    right: 0;
    margin: auto;
    width: 100px;
    height: 40px;
}
.pagination{
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
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