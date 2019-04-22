<template>
    <div class="newBox">
        <!-- 投标报名 -->
        <div class="wrapper" v-show="writeFlag">
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
                                <div class="editName">入场项目编号：</div>
                                <div class="editContent">{{amountId}}</div>
                            </div>
                        </div>
                        <div class="editItem">
                            <div class="editCenter">
                                <div class="editName">招标项目金额：</div>
                                <div class="editContent">{{amountOfBiddingProject}}万元</div>
                            </div>
                            <div class="editCenter">
                                <div class="editName">招标项目类型：</div>
                                <div class="editContent">{{typesOfBiddingProjects}}</div>
                            </div>
                        </div>
                        <div class="editItem">
                            <div class="editCenter">
                                <div class="editName">招标采购方式：</div>
                                <div class="editContent">{{biddingProcurementMode}}万元</div>
                            </div>
                            <div class="editCenter">
                                <div class="editName">招标组织方式：</div>
                                <div class="editContent">{{biddingOrganization}}</div>
                            </div>
                        </div>
                    </div>
                </el-collapse-item>
                <!--投标资格条件 -->
                <el-collapse-item title="投标资格条件" name="2">
                    <div class="edit_list">
                        <div class="editItem">
                            <div class="editCenter">
                                <div class="editName">申请人资格条件：</div>
                                <div class="editContent">{{applicantQualifications}} </div>
                            </div>
                        </div>
                        <div class="editItem">
                            <div class="editCenter">
                                <div class="editName">简要技术要求：</div>
                                <div class="editContent">{{technologyQualifications}}</div>
                            </div>
                        </div>
                        <div class="editItem">
                            <div class="editCenter">
                                <div class="editName">企业资质要求：</div>
                                <div class="editContent">{{companyQualifications}}</div>
                            </div>
                        </div>
                        <div class="editItem">
                            <div class="editCenter">
                                <div class="editName">项目负责人资质条件：</div>
                                <div class="editContent">{{managerQualifications}}</div>
                            </div>
                        </div>
                        <div class="editItem">
                            <div class="editCenter">
                                <div class="editName">公告截止时间：</div>
                                <div class="editContent">{{enrollEndTime}}</div>
                            </div>
                             <div class="editCenter" v-if="d==0&&h==0&&m==0&&s==0">
                                <div class="editName" >距离截止时间还有：</div>
                                <div class="editContent">已到截止时间</div>
                            </div>
                            <div class="editCenter" v-else>
                                <div class="editName" >距离截止时间还有：</div>
                                <div class="editContent"><span >{{d}}<b style="padding:0 5px;">天</b>{{h}}<b style="padding:0 5px;">时</b>{{m}}<b style="padding:0 5px;">分</b>{{s}}<b style="padding:0 5px;">秒</b></span></div>
                            </div>
                        </div>
                    </div>
                </el-collapse-item>
                <!-- 查看信息-->
                <el-collapse-item title="查看信息" name="3" >
                    <div class="show_list">
                        <!-- <div class="list_tit">
                            <p>已有 <b>少于3家</b> 单位投标。</p>
                            <p><b>0家</b> 支付招标文件工本费。 <b>0家</b> 缴纳保证金。</p>
                        </div> -->
                        <div class="owner">
                            <button class="owner_btn" @click="addWork">新增投标单位</button>
                            <button class="owner_btn" @click="deleteWork">删除投标单位</button>
                        </div>
                        <div style="margin-top:5px;">
                            <el-table
                                ref="multipleTable"
                                :data="bidsignData"
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
                                    prop="companyName"
                                    label="单位名称">
                                </el-table-column>
                                <el-table-column
                                    prop="bidContacts"
                                    label="投标联系人">
                                </el-table-column>
                                <el-table-column
                                    prop="isPayTenderFee"
                                    label="支付标书费">
                                </el-table-column>
                                <el-table-column
                                    prop="payDepositAmount"
                                    label="缴纳保证金">
                                </el-table-column>
                                <el-table-column
                                    label="修改">
                                    <template slot-scope="scope">
                                        <i class="el-icon-edit" @click="editInfo(scope.row)"></i>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                    prop="avoidReason"
                                    label="回执单">
                                </el-table-column>
                                <el-table-column
                                    label="状态">
                                    <template >
                                        <span>{{state}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                    label="查看">
                                    <template slot-scope="scope">
                                        <i class="el-icon-search" @click="lookItem(scope.row)"></i>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                    </div>
                </el-collapse-item>
            </el-collapse>
        </div>
		<!-- 查看分包详情 -->
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
        <!-- 新增投标单位 -->
        <div class="addPage"  v-show="addWorkFlag">
            <div class="addBox">
                <div class="add_title">
                    <p>录入投标单位</p>
                    <i class="el-icon-close" @click="closeAddWork"></i>
                </div>
				<div class="box">
					<button class="btn" @click="saveAddwork">新增</button>
				</div>
                <div class="mainInfo">
                    <el-collapse v-model="activeName" accordion>
                        <!-- 招标项目信息-->
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
                        <!-- 投标资格条件 -->
                        <el-collapse-item title="投标资格条件" name="2">
                            <div class="edit_list">
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">申请人资格条件：</div>
                                        <div class="editContent">{{applicantQualifications}} </div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">简要技术要求：</div>
                                        <div class="editContent">{{technologyQualifications}}</div>
                                    </div>
                                    <div class="editCenter">
                                        <div class="editName">企业资质要求：</div>
                                        <div class="editContent">{{companyQualifications}}</div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">项目负责人资质条件：</div>
                                        <div class="editContent">{{managerQualifications}}</div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">公告截止时间：</div>
                                        <div class="editContent">{{enrollEndTime}}</div>
                                    </div>
                                </div>
                            </div>
                        </el-collapse-item>
                        <!-- 填写信息 -->
                        <el-collapse-item title="填写信息" name="3">
                            <div class="edit_list">
                                <div class="noteBox">
                                    <div class="noteItem">
                                        <div class="noteLeft"><p class="star">*</p>企业名称：</div>
                                        <div class="write_input" style="width:190px;color:#6e622e;">{{companyName == ''?'请选择投标企业':companyName}}</div>
                                        <el-button plain @click="pickWork">选择</el-button>
                                    </div>
                                    <div class="noteItem">
                                        <div class="noteLeft">企业资质：</div>
                                        <div class="write_input" style="color:#6e622e;">{{professionalLevel}}</div>
                                    </div>
                                </div>
                                <div class="noteBox">
                                    <div class="noteItem">
                                        <div class="noteLeft">企业组织机构代码：</div>
                                        <div class="write_input" style="color:#6e622e;">{{organizationCode}}</div>
                                    </div>
                                    <div class="noteItem">
                                        <div class="noteLeft">企业资质编号：</div>
                                        <div class="write_input" style="color:#6e622e;">{{certificateNum}}</div>
                                    </div>
                                </div>
                                <div class="noteBox">
                                    <div class="noteItem">
                                        <div class="noteLeft">项目负责人：</div>
                                        <div class="write_input" style="width:190px;color:#6e622e;">{{projectLeader ==''?'请选择项目负责人':projectLeader}}</div>
                                        <el-button plain @click="pickPeople">选择</el-button>
                                    </div>
                                    <div class="noteItem">
                                        <div class="noteLeft">项目负责人专业：</div>
                                        <div class="write_input" style="width:190px;color:#6e622e;">{{projectLeaderMajor}}</div>
                                        <el-button plain @click="clearInfo">清空</el-button>
                                    </div>
                                </div>
                                <div class="noteBox">
                                    <div class="noteItem">
                                        <div class="noteLeft">企业负责人：</div>
                                        <div class="write_input">
                                            <el-input v-model="conpanyLeader" clearable></el-input>
                                        </div>
                                    </div>
                                    <div class="noteItem">
                                        <div class="noteLeft"><p class="star">*</p>投标联系人：</div>
                                        <div class="write_input">
                                            <el-input v-model="bidContacts" clearable></el-input>
                                        </div>
                                    </div>
                                </div>
                                <div class="noteBox">
                                    <div class="noteItem">
                                        <div class="noteLeft">公司电话：</div>
                                        <div class="write_input">
                                            <el-input v-model="companyPhone" clearable></el-input>
                                        </div>
                                    </div>
                                    <div class="noteItem">
                                        <div class="noteLeft"><p class="star">*</p>联系人手机：</div>
                                        <div class="write_input">
                                           <el-input v-model="telephone" clearable></el-input>
                                        </div>
                                    </div>
                                </div>
                                <div class="noteBox">
                                    <div class="noteItem">
                                        <div class="noteLeft">传真：</div>
                                        <div class="write_input">
                                            <el-input v-model="fax" clearable></el-input>
                                        </div>
                                    </div>
                                    <div class="noteItem">
                                        <div class="noteLeft">Email：</div>
                                        <div class="write_input">
                                           <el-input v-model="email" clearable></el-input>
                                        </div>
                                    </div>
                                </div>
                                <div class="noteBox">
                                    <div class="noteItem">
                                        <div class="noteLeft">是否联合体报名：</div>
                                        <div class="write_input">
                                            <el-radio-group v-model="isComboApply" @change="getiscomboApply">
                                                <el-radio label="是">是</el-radio>
                                                <el-radio label="否">否</el-radio>
                                            </el-radio-group>
                                        </div>
                                    </div>
                                </div>
                                <div class="noteBox" v-show="isFlag">
                                    <div class="noteItem">
                                        <div class="noteLeft">联合体信息：</div>
                                        <div class="write_textarea">
                                            <el-input v-model="comboApplyInfor" clearable type="textarea" :rows="5"></el-input>
                                        </div>
                                    </div>
                                </div>
						    </div>
                        </el-collapse-item>
                    </el-collapse>
                </div>
            </div>
        </div>
        <!-- 选择单位列表 -->
        <div class="choisePage"  v-show="WorkFlag">
            <div class="choiseBox">
                <div class="add_title">
                    <p>单位列表</p>
                    <i class="el-icon-close" @click="closeChoise"></i>
                </div>
                <div class="pick_input" >
                    <div class="noteItem">
                        <div class="noteLeft">单位名称：</div>
                        <div class="write_input" style="width:70%;">
                            <el-input v-model="companyname" clearable size="small"></el-input>
                        </div>
                    </div>
                    <div class="noteItem">
                        <div class="noteLeft" style="width:100px;">组织机构代码：</div>
                        <div class="write_input" style="width:70%;">
                            <el-input v-model="organizationCode" clearable size="small"></el-input>
                        </div>
                    </div>
                    <button class="owner_btn" @click="searchWorkData">搜索</button>
                </div>
                <div class="choise_main">
                    <el-table
                        ref="multipleTable"
                        :data="workData"
                        tooltip-effect="dark"
                        style="width: 100%">
                        <el-table-column align="center" width="55" label="" >
                            <template slot-scope="scope">
                                <el-radio :label="scope.row.ausId" v-model="templateRadio" @change.native="getWorkRow(scope.row)">&nbsp;</el-radio>
                            </template>
                        </el-table-column>
                        <el-table-column
                            label="序号">
                            <template slot-scope="scope">{{ scope.$index+1 }}</template>
                        </el-table-column>
                        <el-table-column
                            prop="companyName"
                            label="单位名称">
                        </el-table-column>
                        <el-table-column
                            prop="isStartUsing"
                            label="单位状态">
                        </el-table-column>
                        <el-table-column
                            label="选择">
                            <template slot-scope="scope">
                                <i class="el-icon-plus" @click="copyWorkItem(scope.row)"></i>
                            </template>
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
                        <button class="btn" @click="choiseWorkSure">确定选择</button>
                    </div>
                </div>
            </div>
        </div>
         <!-- 选择人员列表 -->
        <div class="choisePage"  v-show="PeopleFlag">
            <div class="choiseBox">
                <div class="add_title">
                    <p>人员列表</p>
                    <i class="el-icon-close" @click="closePeople"></i>
                </div>
                <div class="pick_input" >
                    <div class="noteItem">
                        <div class="noteLeft">姓名：</div>
                        <div class="write_input"  style="width:70%;">
                            <el-input v-model="name" clearable></el-input>
                        </div>
                    </div>
                    <button class="owner_btn" @click="searchPeopleData">搜索</button>
                </div>
                <div class="choise_main">
                    <el-table
                        ref="multipleTable"
                        :data="peopleData"
                        tooltip-effect="dark"
                        style="width: 100%">
                        <el-table-column align="center" width="55" label="" >
                            <template slot-scope="scope">
                                <el-radio :label="scope.row.employeeId" v-model="templateRadio" @change.native="getPeopleRow(scope.row)">&nbsp;</el-radio>
                            </template>
                        </el-table-column>
                        <el-table-column
                            label="序号">
                            <template slot-scope="scope">{{ scope.$index+1 }}</template>
                        </el-table-column>
                        <el-table-column
                            prop="name"
                            label="姓名">
                        </el-table-column>
                        <el-table-column
                            prop="professionalCertificateNumber"
                            label="专业及证书编号">
                        </el-table-column>
                        <el-table-column
                            prop="projectNum"
                            label="在施项目">
                        </el-table-column>
                        <el-table-column
                            label="选择">
                            <template slot-scope="scope">
                                <i class="el-icon-plus" @click="copyPeopleItem(scope.row)"></i>
                            </template>
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
                        <button class="btn" @click="choisePeopleSure">确定选择</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- 投标单位 修改 -->
        <div class="editWrapper" v-show="editFlag">
            <div class="editBox">
                <div class="edit_title">
                    <p>完善投标信息</p>
                    <i class="el-icon-close" @click="closeEditWork"></i>
                </div>
                <div class="box">
					<button class="btn" @click="saveEdit">保存</button>
				</div>
                <div class="mainInfo">
                    <el-collapse v-model="activeName" accordion>
                        <!-- 招标项目信息-->
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
                                        <div class="editContent">{{amountOfBiddingProject}}万元</div>
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
                                        prop="subcontractingControlAmount"
                                        label="创建时间">
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
                        <!-- 投标资格条件 -->
                        <el-collapse-item title="投标资格条件" name="2">
                           <div class="edit_list">
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">申请人资格条件：</div>
                                        <div class="editContent">{{applicantQualifications}} </div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">简要技术要求：</div>
                                        <div class="editContent">{{technologyQualifications}}</div>
                                    </div>
                                    <div class="editCenter">
                                        <div class="editName">企业资质要求：</div>
                                        <div class="editContent">{{companyQualifications}}</div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">项目负责人资质条件：</div>
                                        <div class="editContent">{{managerQualifications}}</div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">公告截止时间：</div>
                                        <div class="editContent">{{enrollEndTime}}</div>
                                    </div>
                                </div>
                            </div>
                        </el-collapse-item>
                        <!-- 填写信息 -->
                        <el-collapse-item title="填写信息" name="3">
                            <div class="edit_list">
                                <ul class="contentBox">
                                    <li>
                                        <p>企业名称：<span>{{companyName}}</span></p>
                                        <p>企业资质：<span>{{professionalLevel}}</span></p>
                                    </li>
                                    <li>
                                        <p>企业组织机构代码：<span>{{organizationCode}}</span></p>
                                        <p>企业资质编号：<span>{{certificateNum}}</span></p>
                                    </li>
                                    <li>
                                        <p>项目负责人：<span>{{projectLeader}}</span></p>
                                        <p>项目负责人专业：<span>{{projectLeaderMajor}}</span></p>
                                    </li>
                                    <li>
                                        <p>企业负责人：<span>{{conpanyLeader}}</span></p>
                                        <p>投标联系人：<span>{{bidContacts}}</span></p>
                                    </li>
                                    <li>
                                        <p>公司电话：<span>{{companyPhone}}</span></p>
                                        <p>联系人手机：<span>{{telephone}}</span></p>
                                    </li>
                                    <li>
                                        <p>传真：<span>{{fax}}</span></p>
                                        <p>Email：<span>{{email}}</span></p>
                                    </li>
                                    <li>
                                        <p>是否联合体报名：<span>{{isComboApply}}</span></p>
                                    </li>
                                </ul>
                            </div>
                        </el-collapse-item>
                        <!-- 标书费缴纳记录 -->
                        <el-collapse-item title="标书费缴纳记录" name="5">
                            <div class="edit_list">
                                <div class="noteBox">
                                    <div class="noteItem">
                                        <div class="noteLeft">是否已缴纳标书费：</div>
                                        <div class="write_input">
                                            <el-radio-group v-model="isPayTenderFee" @change="getisPayTenderFee">
                                                <el-radio label="是">是</el-radio>
                                                <el-radio label="否">否</el-radio>
                                            </el-radio-group>
                                        </div>
                                    </div>
                                </div>
                                <div class="noteBox">
                                    <div class="noteItem">
                                        <div class="noteLeft">标书费金额（元）：</div>
                                        <div class="write_input">{{tenderDocumentsCost}}</div>
                                    </div>
                                    <div class="noteItem">
                                        <div class="noteLeft">缴纳时间：</div>
                                        <div class="write_input">
                                            <el-date-picker
                                                v-model="payTenderFeeTime"
                                                type="datetime"
                                                placeholder="选择日期时间">
                                            </el-date-picker>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </el-collapse-item>
                        <!-- 保证金缴纳记录 -->
                        <el-collapse-item title="保证金缴纳记录" name="6">
                            <div class="edit_list">
                                <div class="noteBox">
                                    <div class="noteItem">
                                        <div class="noteLeft">缴纳时间：</div>
                                        <div class="write_input">
                                            <el-date-picker
                                                v-model="payDepositTime"
                                                type="datetime"
                                                placeholder="选择日期时间">
                                            </el-date-picker>
                                        </div>
                                    </div>
                                    <div class="noteItem">
                                        <div class="noteLeft">缴纳金额（元）：</div>
                                        <div class="write_input">
                                            <el-input v-model="payDepositAmount" clearable></el-input>
                                        </div>
                                    </div>
                                </div>
                                <div class="noteBox">
                                    <div class="noteItem">
                                        <div class="noteLeft">备注：</div>
                                        <div class="write_textarea">
                                            <el-input v-model="payDepositRemark" clearable type="textarea" :rows="5"></el-input>
                                        </div>
                                    </div>
                                </div>
                                <el-table :data="tableData" stripe style="width: 100%">
                                    <el-table-column  prop="index"  label="附件名称">
                                    </el-table-column>
                                    <el-table-column  prop="number"  label="附件列表(点击查看)">
                                    </el-table-column>
                                    <el-table-column label="管理">
                                        <template>
                                            <i class="el-icon-setting" @click="settingFile"></i>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </div>
                        </el-collapse-item>
                    </el-collapse>
                </div>
            </div>
        </div>
        <!-- 文件上传弹窗 -->
        <div class="settingWrapper" v-show="settingFlag">
            <div class="settingBox">
                <div class="setting_title">
                    <p>投标保证金缴纳凭证</p>
                    <i class="el-icon-close" @click="closeSetting"></i>
                </div>
                <div class="owner">
                    <button class="owner_btn">上传</button>
                    <button class="owner_btn">删除</button>
                </div>
                <div class="mainInfo" style="margin-top:5px;">
                    <el-table
                        ref="multipleTable"
                        :data="bidsignData"
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
                            prop="companyName"
                            label="文件名称">
                        </el-table-column>
                        <el-table-column
                            prop="bidContacts"
                            label="文件大小(KB)">
                        </el-table-column>
                        <el-table-column
                            prop="isPayTenderFee"
                            label="上传人">
                        </el-table-column>
                        <el-table-column
                            prop="payDepositAmount"
                            label="上传时间">
                        </el-table-column>
                        <el-table-column
                            label="下载">
                            <template slot-scope="scope">
                                <i class="el-icon-download"></i>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <p class="notic">★：附件上传大小限制为102400 KB；请上传后缀名为doc,docx,txt,rar,zip,jpg,jpeg,pdf,xls,xlsx,gif,bmp,png类型的文件!</p>
            </div>
        </div>
        <!-- 投标单位 查看 -->
        <div class="searchWrapper" v-show="searchFlag">
            <div class="searchBox">
                <div class="search_title">
                    <p>投标信息</p>
                    <i class="el-icon-close" @click="closeSearch"></i>
                </div>
                <div class="box">
                    <button class="btn">通过</button>
                    <button class="btn">不通过</button>
                </div>
                <div class="mainInfo">
                    <el-collapse v-model="activeName" accordion>
                        <!-- 分包信息-->
                        <el-collapse-item title="分包信息" name="1">
                            <div class="edit_list">
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">分包名称：</div>
                                        <div class="editContent">{{subcontractName}} </div>
                                    </div>
                                    <div class="editCenter">
                                        <div class="editName">入场项目分包编号：</div>
                                        <div class="editContent">{{entrySubcontractNumber}} </div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">招标方式：</div>
                                        <div class="editContent">{{projectLeader}}</div>
                                    </div>
                                    <div class="editCenter">
                                        <div class="editName">招标(采购)人：</div>
                                        <div class="editContent">{{nameOfPurchaser}}</div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">项目负责人：</div>
                                        <div class="editContent">{{projectLeader}}</div>
                                    </div>
                                    <div class="editCenter">
                                        <div class="editName">预算总价：</div>
                                        <div class="editContent">{{subcontractingControlAmount}}万元</div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">报名截止时间：</div>
                                        <div class="editContent">{{enrollEndTime}}</div>
                                    </div>
                                    <div class="editCenter">
                                        <div class="editName">企业资质要求：</div>
                                        <div class="editContent">{{companyQualifications}}</div>
                                    </div>
                                </div>
                                 <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">项目负责人资质要求：</div>
                                        <div class="editContent">{{managerQualifications}}</div>
                                    </div>
                                </div>
                            </div>
                        </el-collapse-item>
                        <!-- 投标(供应商)人信息 -->
                        <el-collapse-item title="投标(供应商)人信息" name="2">
                            <div class="edit_list">
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">企业名称：</div>
                                        <div class="editContent">{{companyName}} </div>
                                    </div>
                                    <div class="editCenter">
                                        <div class="editName">企业资质：</div>
                                        <div class="editContent">{{professionalLevel}} </div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">企业组织机构代码：</div>
                                        <div class="editContent">{{organizationCode}}</div>
                                    </div>
                                    <div class="editCenter">
                                        <div class="editName">企业资质编号：</div>
                                        <div class="editContent">{{certificateNum}}</div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">项目负责人：</div>
                                        <div class="editContent">{{projectLeader}}</div>
                                    </div>
                                    <div class="editCenter">
                                        <div class="editName">项目负责人专业：</div>
                                        <div class="editContent">{{projectLeaderMajor}}</div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">企业负责人：</div>
                                        <div class="editContent">{{conpanyLeader}}</div>
                                    </div>
                                    <div class="editCenter">
                                        <div class="editName">投标联系人：</div>
                                        <div class="editContent">{{bidContacts}}</div>
                                    </div>
                                </div>
                                 <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">公司电话：</div>
                                        <div class="editContent">{{companyPhone}}</div>
                                    </div>
                                    <div class="editCenter">
                                        <div class="editName">联系人手机：</div>
                                        <div class="editContent">{{telephone}}</div>
                                    </div>
                                </div>
                                 <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">传真：</div>
                                        <div class="editContent">{{fax}}</div>
                                    </div>
                                    <div class="editCenter">
                                        <div class="editName">Email：</div>
                                        <div class="editContent">{{email}}</div>
                                    </div>
                                </div>
                                 <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">是否联合体报名：</div>
                                        <div class="editContent">{{isComboApply}}</div>
                                    </div>
                                </div>
                            </div>
                        </el-collapse-item>
                        <!-- 报名其他材料 -->
                        <el-collapse-item title="报名其他材料" name="3">
                            <el-table :data="tableData" stripe style="width: 100%">
                                <el-table-column  prop="index"  label="附件名称">
                                </el-table-column>
                                <el-table-column  prop="number"  label="附件列表(点击查看)">
                                </el-table-column>
                            </el-table>
                        </el-collapse-item>
                        <!-- 投标保证金缴纳记录 -->
                        <el-collapse-item title="投标保证金缴纳记录" name="4">
                            <div class="edit_list">
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">缴纳时间：</div>
                                        <div class="editContent">{{payDepositTime}} </div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">缴纳金额：</div>
                                        <div class="editContent">{{payDepositAmount}}万元</div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">备注：</div>
                                        <div class="editContent">{{payDepositRemark}}</div>
                                    </div>
                                </div>
                            </div>
                             <el-table :data="tableData" stripe style="width: 100%">
                                <el-table-column  prop="index"  label="附件名称">
                                </el-table-column>
                                <el-table-column  prop="number"  label="附件列表(点击查看)">
                                </el-table-column>
                            </el-table>
                        </el-collapse-item>
                    </el-collapse>
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
                <span>新增成功！</span>
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
import {formatTime,digitUppercase, changeTime} from '../../../api/base.js'
export default {
    data(){
        return {
			projectObj:JSON.parse(window.localStorage.projectObj),
            activeName:['1','2','3','4','5','6'],
            tableData:[{
                number:'哈哈哈'
            }],
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
			scopeOfTender:'',// 招标范围
			subcontractingControlAmount:'',// 分包控制金额
			qualificationExaminationMethod:'',// 资格审查方式	
			electronicBidEvaluation:'',// 是否电子招投标
			subcontractContents:'',// 分包内容
            subcontractName:'',// 分包名称 
            totalProjectId:'',
            // 回避信息
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
            
            rowPeopleItem:{},
            unitName:'',// 单位名称
            socialCreditCode:'',// 社会信用编码
            // 删除回避单位
            deleteWorkFlag:false,
            deleteBox:false,
            // 选择回避单位
            WorkFlag:false,
            // 分页器
            currentPage:1,// 当前页
            pageSize: 10, // 每页条数
            pageTotal: 0, //总页数
            total: 0, //总条数
            candidateMenuItem:[],
            radio:'',
            bidsignData:[],// 投标报名查看信息列表

            // 保存所需字段        
            companyName:'',// 单位名称
            organizationCode:'',// 组织机构代码
            professionalLevel:'',// 企业资质
            certificateNum:'',//证书编号
            projectLeader:'',// 项目负责人
            projectLeaderMajor:'',// 项目负责人专业
            conpanyLeader:'',// 企业负责人
            bidContacts:'',// 投标联系人
            companyPhone:'',// 公司电话
            telephone:'',// 联系人手机
            fax:'',// 传真
            email:'',// 邮件
            isComboApply:'',// 是否联合体报名
            comboApplyInfor:'',// 联合体信息
            isFlag:false,// 是否展示联合体信息
            bidCompany:'',// 投标人ID
            PeopleFlag:false,
            // 挑选单位列表
            companyName:'',// 单位名称
            organizationCode:'',// 组织机构代码
            workData:[],// 单位列表
            rowWorkItem:{},// 单选框选中的item数据
            // 单位投标信息
            editFlag:false,// 修改弹窗
            isPayTenderFee:'',// 是否支付标书费
            payTenderFeeTime:'',// 支付时间
            payTenderFeeAmount:'',// 支付金额
            payDepositTime:'',// 缴纳时间
            payDepositAmount:'',// 缴纳金额
            payDepositRemark:'',// 缴纳备注信息
            settingFlag:false,// 文件上传弹窗
            searchFlag:false,// 投标单位 查看
            // 挑选人员列表
            userId:'',//企业ID
            name:'',// 姓名
            professionalCertificateNumber:'',// 专业及证书编号
            peopleData:[],
            // 倒计时
            d:0,
            h:0,
            m:0,
            s:0,
            workItem:[],// +号返回的企业资质和证书编号列表
            professionalLevelArr:[],// 企业资质
            certificateNumArr:[],//证书编号
            bidInforId:'',// 投标信息ID
            // 投标资格条件
            tenderList:[],// 列表
            itemsList:[],
            applicantQualifications:'',// 申请人资格条件
            technologyQualifications:'',// 简要技术要求
            companyQualifications:'',// 企业资质要求
            managerQualifications:'',// 项目负责人资质条件
            enrollEndTime:'',// 公告截止时间
            state:'',// 状态
            tenderDocumentsCost:'',// 支付金额
            companyname:'',// 新增投标单位选择企业名称

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
        this.getItemInfo();// 根据项目入场分包编号查询
		this.getbiddingInfo();// 招标项目信息列表
        this.getBidsignInfo();// 投标单位列表
        this.countTime();// 倒计时
        this.getTenderInfo();// 投标资格条件
    },
    methods:{
        countTime: function () {
            //获取当前时间
            let date = new Date();
            let now = date.getTime();
            //设置截止时间
            let endDate = new Date(this.enrollEndTime);
            let end = endDate.getTime();
            //时间差
            let leftTime = end - now;
            //定义变量 d,h,m,s保存倒计时的时间
            if (leftTime >= 0) {
                this.d = Math.floor(leftTime / 1000 / 60 / 60 / 24);
                this.h = Math.floor(leftTime / 1000 / 60 / 60 % 24);
                this.m = Math.floor(leftTime / 1000 / 60 % 60);
                this.s = Math.floor(leftTime / 1000 % 60);
            }
            //递归每秒调用countTime方法，显示动态时间效果
            setTimeout(this.countTime, 1000);
        },
        // 分页器
        handleSizeChange(val) {
            // 每页条数
        },
        handleCurrentChange(val) {
            // 当前页数
            this.currentPage = val;
        },
        // 挑选列表---> 单选框按钮
        handleSelectionChange(val) {
            this.multipleSelection = val;
		},
		
        //关闭挑选单位列表
        closePick(){
            this.WorkFlag = false;
		},
        
        // 关闭挑选人员列表
        closePeople(){
            this.PeopleFlag = false;
        },
        // 清空
        clearInfo(){
            this.projectLeader = '';// 项目负责人
            this.projectLeaderMajor = '';// 项目负责人专业
        },
        // 投标单位列表 修改
        editInfo(row){
            this.getLever();// 获取企业资质和企业编号
            this.editFlag = true;
            this.companyName = row.companyName;
            this.organizationCode= row.organizationCode;// 企业组织机构代码
            this.projectLeader= row.projectLeader;// 项目负责人
            this.projectLeaderMajor= row.projectLeaderMajor;// 项目负责人专业
            this.conpanyLeader= row.conpanyLeader;// 企业负责人
            this.bidContacts= row.bidContacts;// 投标联系人
            this.companyPhone= row.companyPhone;// 公司电话
            this.telephone= row.telephone;// 联系人手机
            this.fax= row.fax;// 传真
            this.email= row.email;// Email
            this.isComboApply= row.isComboApply;// 是否联合体报名
            // 标书费缴纳记录
            this.isPayTenderFee=row.isPayTenderFee;//是否支付标书费
            this.payTenderFeeTime = row.payTenderFeeTime;// 支付时间
            this.payTenderFeeAmount = row.payTenderFeeAmount;//支付金额
            // 保证金缴纳记录
            this.payDepositAmount = row.payDepositAmount;//缴纳金额
            this.payDepositTime = row.payDepositTime;//缴纳时间
            this.payDepositRemark = row.payDepositRemark;// 缴纳备注信息
            this.bidInforId = row.bidInforId;// 投标信息ID
        },
        // 投标单位列表 修改关闭
        closeEditWork(){
            this.editFlag = false;
        },
        //投标单位列表 保存
        saveEdit(){
            this.$axios({
				method: "POST",
				url: baseUrl+"/bidInforController/update",
				data:{
                    bidInforId:this.bidInforId,
                    isPayTenderFee:this.isPayTenderFee,
                    payTenderFeeTime:changeTime(this.payTenderFeeTime),
                    payDepositTime:changeTime(this.payDepositTime),
                    payDepositAmount:this.tenderDocumentsCost,
                    payDepositRemark:this.payDepositRemark
                }
			}).then(res=>{
				if(res.data.status == 200){
                    if(res.data.data == null){
                        this.editFlag = false;
                    }
				}else{
					console.log(res.data.msg);
				}
			}).catch(err=>{
				console.log(err)
			})
        },
        // 投标单位列表 查看
        lookItem(row){
            this.searchFlag=true;
            // 分包信息
            this.entrySubcontractNumber = row.entrySubcontractNumber
            this.getItemInfo();//根据项目入场分包编号查询
            this.getTenderInfo();// 投标资格条件
            this.getLever();// 获取企业资质和企业编号
            // 投标(供应商)人信息及投标保证金缴纳记录
            this.organizationCode= row.organizationCode;// 企业组织机构代码
            this.$axios({
                method: "POST",
                url: baseUrl+"/bidInforController/selectById",
                data:{
                    bidInforId:row.bidInforId
                }
            }).then(res=>{
                if(res.data.status == 200){
                    this.companyName = res.data.data.companyName;// 企业名称
                    this.projectLeader= res.data.data.projectLeader;// 项目负责人
                    this.projectLeaderMajor= res.data.data.projectLeaderMajor;// 项目负责人专业
                    this.conpanyLeader= res.data.data.conpanyLeader;// 企业负责人
                    this.bidContacts= res.data.data.bidContacts;// 投标联系人
                    this.companyPhone= res.data.data.companyPhone;// 公司电话
                    this.telephone= res.data.data.telephone;// 联系人手机
                    this.fax= res.data.data.fax;// 传真
                    this.email= res.data.data.email;// Email
                    this.isComboApply= res.data.data.isComboApply;// 是否联合体报名
                    this.payDepositAmount = res.data.data.payDepositAmount;// 保证金缴纳金额
                    this.payDepositTime = formatTime(res.data.data.payDepositTime);// 保证金缴纳时间
                    this.payDepositRemark = res.data.data.payDepositRemark;// 保证金缴纳备注信息
                }else{
                    console.log(res.data.msg);
                }
            }).catch(err=>{
                console.log(err)
            })
        },
        // 投标单位列表 查看 关闭
        closeSearch(){
            this.searchFlag=false;
        },
        // 删除专家
        deletePeople(){

        },
        // 是否联合体报名
        getiscomboApply(){
            if(this.isComboApply == '是'){
                this.isFlag = true;
            }else{
                this.isFlag =false;
            }
        },
        // 是否已缴纳标书费
        getisPayTenderFee(){
            console.log(this.isPayTenderFee)
        },
        // 附件设置
        settingFile(){
            this.settingFlag= true;
        },
        closeSetting(){
            this.settingFlag= false
        },
        // 新增回避单位
        addWork(){
            this.addWorkFlag = true;
        },
        // 新增回避单位 ---> 选择
        choisePage(){
            this.WorkFlag = true;
        },
        // 新增回避单位 ---> 选择--->关闭
        closeChoise(){
            this.WorkFlag = false;
        },
        // 新增投标单位 ---> 关闭
        closeAddWork(){
            this.addWorkFlag = false;
        },
        // 提交
        submit(){
            this.submitBox = true;
        },
        // 确认提交
        sureSubmit(){
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
            this.submitBox = false;// 提交弹窗
            this.deleteBox = false;// 删除回避信息提示
        },
        // 保存弹窗 确定
        saveBoxSure(){
            this.saveBox = false;
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
        // 根据项目入场分包编号查询
        getItemInfo(){
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
                        this.subcontractName = item.subcontractName;// 分包名称
                        this.subcontractingControlAmount = item.subcontractingControlAmount;// 分包控制金额
                    })
                }else{
                    console.log(res.data.msg);
                }
            }).catch(err=>{
                console.log(err)
            })
        },
        // 投标资格条件
        getTenderInfo(){
            let object={}
            if(this.projectObj.totalProjectId.indexOf("-") != -1 && this.projectObj.totalProjectId!=null){
                // 入场项目分包编号
                object={
                    entrySubcontractNumber:this.projectObj.totalProjectId,
                }
            }else{
                // 入场项目编号
                object ={
                    projectCode:this.projectObj.totalProjectId
                }
            }
            this.$axios({
                method: "POST",
                url: baseUrl+"/tenderNoticeController/select",
                data:object
            }).then(res=>{
                if(res.data.status == 200){
                    this.tenderList = res.data.data;
                    this.tenderList.forEach(item=>{
                        this.itemsList = item.items;
                        this.enrollEndTime = formatTime(item.enrollEndTime);
                        this.tenderDocumentsCost = item.tenderDocumentsCost;
                        // this.projectLeader = item.projectLeader;// 项目负责人
                    })
                    this.itemsList.forEach(item=>{
                        if(this.projectObj.totalProjectId == item.entrySubcontractNumber || this.projectObj.totalProjectId == item.projectCode){
                            this.applicantQualifications=item.applicantQualifications;// 申请人资格条件
                            this.technologyQualifications=item.technologyQualifications;// 简要技术要求
                            this.companyQualifications=item.companyQualifications;// 企业资质要求
                            this.managerQualifications=item.managerQualifications;// 项目负责人资质条件
                        }
                    })
                }else{
                    console.log(res.data.msg);
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
        // 新增投标单位---> 新增
        saveAddwork(){
            let object = {};
            if(this.projectObj.totalProjectId.indexOf("-") != -1){
                // 分包
                object ={
                    entrySubcontractNumber:this.entrySubcontractNumber,
                    bidCompany:this.bidCompany,
                    professionalLevel:this.professionalLevel,
                    certificateNum:this.certificateNum,
                    organizationCode:this.organizationCode,
                    projectLeader:this.projectLeader,
                    projectLeaderMajor:this.projectLeaderMajor,
                    conpanyLeader:this.conpanyLeader,
                    bidContacts:this.bidContacts,
                    companyPhone:this.companyPhone,
                    telephone:this.telephone,
                    fax:this.fax,
                    email:this.email,
                    isComboApply:this.isComboApply,
                    comboApplyInfor:this.comboApplyInfor,
                    state:'报名成功'
                }
            }else{
                // 总包
                object ={
                    projectCode:this.projectCode,
                    bidCompany:this.bidCompany,//投标人ID
                    professionalLevel:this.professionalLevel,
                    certificateNum:this.certificateNum,
                    organizationCode:this.organizationCode,// 企业组织机构代码
                    projectLeader:this.projectLeader,// 项目负责人
                    projectLeaderMajor:this.projectLeaderMajor,// 项目负责人专业
                    conpanyLeader:this.conpanyLeader,// 企业负责人
                    bidContacts:this.bidContacts,// 投标联系人
                    companyPhone:this.companyPhone,// 公司电话
                    telephone:this.telephone,// 联系人手机
                    fax:this.fax,// 传真
                    email:this.email,// Email
                    isComboApply:this.isComboApply,// 是否联合体报名
                    comboApplyInfor:this.comboApplyInfor,
                    state:'报名成功'
                }
            }
            this.$axios({
                method: "POST",
                url: baseUrl+"/bidInforController/save",
                data:object
            }).then(res=>{
                if(res.data.status == 200){
                    if(res.data.data== null){
                        this.saveBox = true;
                        this.addWorkFlag=false;
                        this.getBidsignInfo();
                    }
                }else{
                    console.log(res.data.msg);
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
                arr.push(item.bidInforId)
            })
            if(arr.length <= 0){
                this.deleteBox = true;
            }else{
                this.$axios({
                    method: "POST",
                    url: baseUrl+"/bidInforController/deleteById",
                    data:{
                        listId:arr
                    }
                }).then(res=>{
                    if(res.data.status == 200){
                        this.getBidsignInfo();
                    }else{
                        console.log(res.data.msg);
                    }
                }).catch(err=>{
                    console.log(err)
                })
            }
        },
        // 投标单位列表
        getBidsignInfo(){
            let object = {}
            if(this.projectObj.totalProjectId.indexOf("-") != -1){
                // 分包
                object = {
                   entrySubcontractNumber:this.projectObj.totalProjectId
                }
            }else{
                // 总包
                object = {
                    projectCode:this.projectObj.totalProjectId
                }
            }
            this.$axios({
				method: "POST",
				url: baseUrl+"/bidInforController/selectList",
				data:object
			}).then(res=>{
				if(res.data.status == 200){
                   this.bidsignData = res.data.data;
                   this.bidsignData.forEach(item=>{
                       if(item.state == '报名成功'){
                           this.state = '通过'
                       }
                   })
				}else{
					console.log(res.data.msg);
				}
			}).catch(err=>{
				console.log(err)
			})
        },
        // 挑选单位列表
        pickWork(){
            this.WorkFlag = true;
            this.companyName ='';
            this.organizationCode = '';
        },
        // 单位列表 搜索
        searchWorkData(){ 
            if(this.companyName == '' && this.organizationCode == ''){
                return ;
            }else{
                this.$axios({
                    method: "POST",
                    url: baseUrl+"/userController/selectList",
                    data:{
                        companyName:this.companyname,
                        organizationCode:this.organizationCode
                    }
                }).then(res=>{
                    if(res.data.status == 200){
                        this.workData = res.data.data.data;
                    }else{
                        console.log(res.data.msg);
                    }
                }).catch(err=>{
                    console.log(err)
                })
            }
            
        },
        // 单位列表 单选框选择
        getWorkRow(row){
            this.rowWorkItem = row;
        },
        // 单位列表 确定选择
        choiseWorkSure(){
            this.WorkFlag = false;
            this.companyName = this.rowWorkItem.companyName;// 企业名称
            this.bidCompany = this.rowWorkItem.userId;// 投标人ID
            this.organizationCode = this.rowWorkItem.organizationCode;// 企业组织机构代码
            this.userId = this.rowWorkItem.userId;// 企业ID
            this.workData = [];
        },
        // 单位列表 +
        copyWorkItem(row){
            this.WorkFlag = false;
            this.companyName = row.companyName;// 企业名称
            this.bidCompany = row.userId;// 投标人ID
            this.organizationCode = row.organizationCode;// 企业组织机构代码
            this.userId = row.userId;// 企业ID
            this.workData = [];
            this.getLever();// 获取企业资质和企业编号
        },
        // 获取企业资质和企业编号
        getLever(){
            this.$axios({
				method: "POST",
				url: baseUrl+"/qualificationController/selectList",
				data:{
                    userId:this.userId
                }
			}).then(res=>{
				if(res.data.status == 200){
                    this.workItem = res.data.data.data;
                    this.workItem.forEach(item=>{
                        this.professionalLevelArr.push(item.professionalLevel)
                        this.certificateNumArr.push(item.certificateNum)
                    })
                    this.professionalLevel = this.professionalLevelArr.join(',');
                    this.certificateNum = this.certificateNumArr.join(',');
				}else{
					console.log(res.data.msg);
				}
			}).catch(err=>{
				console.log(err)
			})
        },
        // 挑选人员列表
        pickPeople(){
            this.PeopleFlag = true;
            this.name ='';
            this.searchPeopleData();// 人员列表
        },
        // 人员列表 搜索
        searchPeopleData(){
            this.$axios({
                method: "POST",
                url: baseUrl+"/employeeInforController/selectList",
                data:{
                    name:this.name,
                    userId:this.userId,
                    state:'办理通过'
                }
            }).then(res=>{
                if(res.data.status == 200){
                    this.peopleData = res.data.data.list;
                }else{
                    console.log(res.data.msg);
                }
            }).catch(err=>{
                console.log(err)
            })
        },
        // 人员列表 单选框选择
        getPeopleRow(row){      
           this.rowPeopleItem = row;
        },
        // 人员列表 确定选择
        choisePeopleSure(){
            this.PeopleFlag = false;
            this.projectLeaderMajor = this.rowPeopleItem.professionalCertificateNumber;// 专业及证书编号
            this.projectLeader = this.rowPeopleItem.name;// 姓名
            this.peopleData = [];
        },
        // 人员列表 +
        copyPeopleItem(row){
            this.PeopleFlag = false;
            this.projectLeaderMajor = row.professionalCertificateNumber;// 专业及证书编号
            this.projectLeader = row.name;// 姓名
            this.peopleData = [];
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
/* 挑选页面 */
.winWrapper,.addWrapper{
    width: 100%;
    height: 100%;
    position: fixed;
    left: 185px;
    top: 0;
    background: rgba(0, 0, 0, .3);
    z-index: 99;
    padding: 50px;
}
.searchWrapper{
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    background: rgba(0, 0, 0, .3);
    z-index: 99;
    padding: 10px;
}
.searchBox{
    width: 100%;
    height: 100%;
    background: #fff;
    position: relative;
    display: flex;
    flex-direction: column;
    overflow: hidden;
}
.lookWrapper{
    width: 100%;
    height: 100%;
    position: fixed;
    left: 185px;
    top: 0;
    background: rgba(0, 0, 0, .3);
    z-index: 9999;
    padding: 50px;
}
.addPage{
    width: 100%;
    height: 100%;
    position: fixed;
    left: 185px;
    top: 0;
    background: rgba(0, 0, 0, .3);
    z-index: 999;
    padding: 10px;
}
.editWrapper{
    width: 100%;
    height: 100%;
    position: fixed;
    left: 185px;
    top: 0;
    background: rgba(0, 0, 0, .3);
    z-index: 999;
    padding: 50px 10px;
}
.pickWrapper,.choisePage,.settingWrapper{
    width: 100%;
    height: 100%;
    position: fixed;
    left: 185px;
    top: 0;
    background: rgba(0, 0, 0, .3);
    z-index: 9999;
    padding:100px 200px;
}
.pickBox,.lookBox,.winBox,.addBox,.editBox,.settingBox{
    width: 87%;
    height: 100%;
    background: #fff;
    position: relative;
    display: flex;
    flex-direction: column;
    overflow: hidden;
}
.mainInfo{
    width: 100%;
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
.pick_title,.search_title,.add_title,.edit_title,.setting_title{
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
    flex:1;
    display: flex;
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
    width: 860px !important;;
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
.edit_list{
    padding: 0 50px;
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
.list_tit{
    width: 100%;
    height: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.owner{
    width: 100%;
    display: flex;
    justify-content: flex-end;
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
    top: 460px;
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