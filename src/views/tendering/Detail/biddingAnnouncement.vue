<template>
    <div class="newBox">
        <!-- 招标公告 -->
        <div class="wrapper" v-show="failShow">
            <div class="box">
                <button class="btn" @click="save(1)">保存</button>
                <button class="btn" @click="save(2)">下一步</button>
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
                        </div>
                        <div class="editItem">
                            <div class="editTextarea">
                                <div class="editName">地址：</div>
                                <div class="editContent">
                                    <el-input v-model="tendereeAddress" clearable></el-input>
                                </div>
                            </div>
                        </div>
                        <div class="editItem">
                            <div class="editTextarea">
                                <div class="editName">联系方式：</div>
                                <div class="editContent">
                                    <el-input v-model="tendereePhone" clearable></el-input>
                                </div>
                            </div>
                        </div>
                    </div>
                </el-collapse-item>
                <!-- 总包信息 -->
                <el-collapse-item title="分包信息" name="2" v-show="diffFlag">
                    <div class="edit_list">
                        <div class="editItem">
                            <div class="editCenter">
                                <div class="editName">招标内容：</div>
                                <div class="editContent">{{tenderContents}}</div>
                            </div>
                        </div>
                        <div class="editItem">
                            <div class="editCenter">
                                <div class="editName">采购数量：</div>
                                <div class="editContent">
                                    <el-input v-model="purchaseAmount" clearable></el-input>
                                </div>
                            </div>
                            <div class="editCenter">
                                <div class="editName">采购用途：</div>
                                <div class="editContent">
                                    <el-input v-model="purchasePurposes" clearable></el-input>
                                </div>
                            </div>
                        </div>
                        <div class="editItem">
                            <div class="editTextarea">
                                <div class="editName">简要技术要求：</div>
                                <div class="editContent">
                                    <el-input v-model="technologyQualifications"  type="textarea" :rows="3"></el-input>
                                </div>
                            </div>
                        </div>
                        <div class="editItem">
                            <div class="editTextarea">
                                <div class="editName">投标人资格条件：</div>
                                <div class="editContent">
                                    <el-input v-model="applicantQualifications"  type="textarea" :rows="3"></el-input>
                                </div>
                            </div>
                        </div>
                        <div class="noteLast">
                            <div class="noteLeft"> 设置报名要求：</div>
                            <div class="noteMain">
                                <div class="noteItem">
                                    <p>企业资质要求</p>
                                    <div class="newBtn">
                                        <el-button>新增资质</el-button>
                                    </div>
                                </div>
                                <div class="noteItem">
                                    <p>项目负责人资质要求</p>
                                    <div class="newBtn">
                                        <el-button>新增资质</el-button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </el-collapse-item>
                <!-- 分包信息-->
                <el-collapse-item title="分包信息" name="2" v-show="!diffFlag">
                    <div class="item_title">若需添加多分包，请点击 <i class="el-icon-plus" @click="searchSubpackage"></i> 按钮</div>
                    <div class="table_box">
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
                                prop="subcontractName"
                                label="分包名称">
                            </el-table-column>
                            <el-table-column
                                prop="subcontractingControlAmount"
                                label="分包控制金额(万元)">
                            </el-table-column>
                            <el-table-column
                                prop="entrySubcontractNumber"
                                label="入场项目(分包)编号">
                            </el-table-column>
                            <el-table-column
                                label="查看">
                                <template slot-scope="scope">
                                    <i class="el-icon-search"  style="cursor: pointer;" @click="lookoverItem(scope.row)"></i>
                                </template>
                            </el-table-column>
                            <el-table-column
                                label="招标内容">
                                <template slot-scope="scope">
                                    <i class="el-icon-edit"  style="cursor: pointer;" @click="winItem(scope.row)"></i>
                                </template>
                            </el-table-column>
                            <el-table-column
                                label="删除">
                                <template slot-scope="scope">
                                    <i class="el-icon-close"  style="cursor: pointer;"  @click="deleteItem(scope.row)"></i>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </el-collapse-item>
                <!-- 公告信息 -->
                <el-collapse-item title="公告信息" name="3">
                    <div class="edit_list">
                        <div class="editItem">
                            <div class="editTextarea">
                                <div class="editName"><p class="star">*</p>公告名称：</div>
                                <div class="editContent">
                                    <el-input v-model="noticeName" clearable></el-input>
                                </div>
                            </div>
                        </div>
                        <div class="editItem">
                            <div class="editCenter">
                                <div class="editName"><p class="star">*</p>报名开始时间：</div>
                                <div class="editContent">
                                    <el-date-picker 
                                        v-model="enrollStartTime" 
                                        type="datetime" 
                                        placeholder="选择日期时间" 
                                        align="right"  
                                    >
                                    </el-date-picker>
                                </div>
                            </div>
                            <div class="editCenter">
                                <div class="editName"><p class="star">*</p>报名结束时间：</div>
                                <div class="editContent">
                                    <el-date-picker 
                                        v-model="enrollEndTime" 
                                        type="datetime" 
                                        placeholder="选择日期时间" 
                                        align="right"  
                                    >
                                    </el-date-picker>
                                </div>
                            </div>
                        </div>
                        <div class="editItem">
                            <div class="editCenter">
                                <div class="editTit"><p class="star">*</p>招标文件发售时间：</div>
                                <div class="editContent">
                                    <el-date-picker
                                        placeholder="起始日期"
                                        v-model="saleReceiveStartDate"
                                    >
                                    </el-date-picker>
                                    <p>至</p>
                                    <el-date-picker
                                        placeholder="结束日期"
                                        v-model="saleReceiveEndDate"
                                    >
                                    </el-date-picker>
                                </div>
                            </div>
                            <div class="editCenter">
                                <div class="editTit">上午：</div>
                                <div class="editContent">
                                    <el-time-select
                                        placeholder="开始时间"
                                        v-model="morningbegin"
                                        :picker-options="{
                                            start: '08:00',
                                            step: '00:30',
                                            end: '17:30'
                                        }">
                                    </el-time-select>
                                    <span>-</span>
                                     <el-time-select
                                        placeholder="结束时间"
                                        v-model="morningend"
                                        :picker-options="{
                                            start: '08:00',
                                            step: '00:30',
                                            end: '17:30'
                                        }">
                                    </el-time-select>
                                </div>
                            </div>
                            <div class="editCenter">
                                <div class="editTit">下午：</div>
                                <div class="editContent">
                                    <el-time-select
                                        placeholder="开始时间"
                                        v-model="afterbegin"
                                        :picker-options="{
                                            start: '08:00',
                                            step: '00:30',
                                            end: '17:30'
                                        }">
                                    </el-time-select>
                                    <span>-</span>
                                     <el-time-select
                                        placeholder="结束时间"
                                        v-model="afterend"
                                        :picker-options="{
                                            start: '08:00',
                                            step: '00:30',
                                            end: '17:30'
                                        }">
                                    </el-time-select>
                                </div>
                            </div>
                        </div>
                        <div class="editItem">
                            <div class="editCenter">
                                <div class="editName"><p class="star">*</p>报名结束时间：</div>
                                <div class="editContent">
                                    <el-date-picker 
                                        v-model="enrollEndTime" 
                                        type="datetime" 
                                        placeholder="选择日期时间" 
                                        align="right"  
                                    >
                                    </el-date-picker>
                                </div>
                            </div>
                        </div>
                         <div class="editItem">
                            <div class="editCenter">
                                <div class="editName">招标文件工本费：</div>
                                <div class="editContent">
                                    <p>人民币</p>
                                    <el-input v-model="tenderDocumentsCost" clearable></el-input>
                                    <p>元</p>
                                </div>
                            </div>
                            <div class="editCenter">
                                <div class="editName"></div>
                                <div class="editContent"></div>
                            </div>
                        </div>
                        <div class="editItem">
                            <div class="editTextarea">
                                <div class="editName">工本费接收账户：</div>
                                <div class="editContent">
                                    <el-input v-model="costAcceptAccount" clearable></el-input>
                                </div>
                                <el-button plain>设置账户</el-button>
                            </div>
                        </div>
                        <div class="editItem">
                            <div class="editTextarea">
                                <div class="editName"><p class="star">*</p>投标人需提交资料：</div>
                                <div class="editContent">
                                    <el-input v-model="bidderData" clearable></el-input>
                                </div>
                            </div>
                        </div>
                        <div class="editItem">
                            <div class="editCenter">
                                <div class="editName">递交截止时间：</div>
                                <div class="editContent">{{submitTime}}</div>
                            </div>
                        </div>
                        <div class="editItem">
                            <div class="editTextarea">
                                <div class="editName">递交投标文件地点：</div>
                                <div class="editContent">软交所招标采购交易中心（北京市海淀区中关村大街32号和盛嘉业大厦（中发智造）五层）</div>
                            </div>
                        </div>
                        <div class="editItem">
                            <div class="editCenter">
                                <div class="editName">开标时间：</div>
                                <div class="editContent">{{assessmentTime}}</div>
                            </div>
                        </div>
                        <div class="editItem">
                            <div class="editTextarea">
                                <div class="editName">开标地点：</div>
                                <div class="editContent">软交所招标采购交易中心（北京市海淀区中关村大街32号和盛嘉业大厦（中发智造）五层）</div>
                            </div>
                        </div>
                        <div class="editItem">
                            <div class="editTextarea">
                                <div class="editName">评标办法和标准：</div>
                                <div class="editContent">
                                    <el-input v-model="bidEvaluationStandard" clearable></el-input>
                                </div>
                            </div>
                        </div>
                        <div class="editItem">
                            <div class="editCenter">
                                <div class="editName">项目负责人：</div>
                                <div class="editContent">
                                    <el-input v-model="projectLeader" clearable></el-input>
                                </div>
                            </div>
                            <div class="editCenter">
                                <div class="editName">联系方式：</div>
                                <div class="editContent">
                                    <el-input v-model="projectLeaderPhone" clearable></el-input>
                                </div>
                            </div>
                        </div>
                        <div class="editItem">
                            <div class="editTextarea">
                                <div class="editName">备注：</div>
                                <div class="editContent">
                                    <el-input v-model="remark" clearable type="textarea" :rows="3"></el-input>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </el-collapse-item>
            </el-collapse>
        </div>
        <div class="nextWrapper" v-show="showFlag">
            <div class="box"  v-show="headerBtn">
                <button class="btn" @click="laststep">上一步</button>
                <button class="btn" @click="submit">提交</button>
            </div>
            <el-collapse v-model="activeName" accordion>
                <!--招标项目信息 -->
                <el-collapse-item title="招标项目信息" name="1">
                    <div class="edit_list">
                        <div class="editItem">
                            <div class="editCenter">
                                <div class="editName">招标项目名称：</div>
                                <div class="editContent">{{nameOfTenderProject}}</div>
                            </div>
                        </div>
                        <div class="editItem">
                            <div class="editCenter">
                                <div class="editName">招标项目编号：</div>
                                <div class="editContent">{{biddingProjectNumber}}</div>
                            </div>
                            <div class="editCenter">
                                <div class="editName">招标项目预算金额：</div>
                                <div class="editContent">{{budgetAmount}}元</div>
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
                                <div class="editContent">{{tendereeAddress}}</div>
                            </div>
                        </div>
                        <div class="editItem">
                            <div class="editCenter">
                                <div class="editName">联系方式：</div>
                                <div class="editContent">{{tendereePhone}}</div>
                            </div>
                        </div>
                    </div>
                </el-collapse-item>
                <!-- 场地预约 -->
                <el-collapse-item title="场地预约" name="2" v-show="order">
                    <div class="notic">注：请上传确认函扫描件或由招标（采购）人对“招标公告”在线签章。</div>
                    <el-table :data="enclosureData" stripe style="width: 100%">
                        <el-table-column  prop="index"  label="附件名称">
                        </el-table-column>
                        <el-table-column  prop="number"  label="附件列表">
                        </el-table-column>
                    </el-table>
                </el-collapse-item>
                <!-- 附件 -->
                <el-collapse-item title="附件" name="2" v-show="accessory">
                    <div class="notic">注：请上传确认函扫描件或由招标（采购）人对“招标公告”在线签章。</div>
                    <el-table :data="enclosureData" stripe style="width: 100%">
                        <el-table-column  prop="index"  label="附件名称">
                        </el-table-column>
                        <el-table-column  prop="number"  label="附件列表">
                        </el-table-column>
                    </el-table>
                </el-collapse-item>
                <!-- 分包信息 -->
                <el-collapse-item title="分包信息" name="3" v-show="!diffFlag">
                    <div class="table_box">
                        <el-table :data="subpackageData" stripe style="width: 100%">
                            <el-table-column  prop="index"  label="序号">
                                <template slot-scope="scope">
                                    <span>{{scope.$index+1}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column  prop="subcontractName"  label="分包名称">
                            </el-table-column>
                            <el-table-column prop="subcontractingControlAmount" label="分包控制金额(万元)">
                            </el-table-column>
                            <el-table-column prop="entrySubcontractNumber" label="入场项目(分包)编号">
                            </el-table-column>
                            <el-table-column label="查看">
                                <template slot-scope="scope">
                                    <i class="el-icon-search"  style="cursor: pointer;" @click="lookoverItem(scope.row)"></i>
                                </template>
                            </el-table-column>
                            <el-table-column label="招标内容">
                                <template slot-scope="scope">
                                    <i class="el-icon-search"  style="cursor: pointer;" @click="bidDetail(scope.row)"></i>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </el-collapse-item>
                <!-- 招标内容 -->
                <el-collapse-item title="招标内容" name="3" v-show="diffFlag">
                    <div class="edit_list">
                        <div class="editItem">
                            <div class="editCenter">
                                <div class="editName">招标内容：</div>
                                <div class="editContent">{{tenderContents}} </div>
                            </div>
                        </div>
                        <div class="editItem">
                            <div class="editCenter">
                                <div class="editName">采购数量：</div>
                                <div class="editContent">{{purchaseAmount}}</div>
                            </div>
                            <div class="editCenter">
                                <div class="editName">采购用途：</div>
                                <div class="editContent">{{purchasePurposes}}</div>
                            </div>
                        </div>
                        <div class="editItem">
                            <div class="editCenter">
                                <div class="editName">简要技术要求：</div>
                                <div class="editContent">{{technologyQualifications}} </div>
                            </div>
                        </div>
                        <div class="editItem">
                            <div class="editCenter">
                                <div class="editName">投标人资格条件：</div>
                                <div class="editContent">{{applicantQualifications}}</div>
                            </div>
                        </div>
                        <div class="editItem">
                            <div class="editCenter">
                                <div class="editName">企业资质要求：</div>
                                <div class="editContent">{{companyQualiﬁcations}} </div>
                            </div>
                        </div>
                        <div class="editItem">
                            <div class="editCenter">
                                <div class="editName">项目负责人资质要求：</div>
                                <div class="editContent">{{managerQualiﬁcations}} </div>
                            </div>
                        </div>
                    </div>
                </el-collapse-item>
                <!-- 公告信息 -->
                <el-collapse-item title="公告信息" name="4">
                    <div class="edit_list">
                        <div class="editItem">
                            <div class="editCenter">
                                <div class="editName">公告名称：</div>
                                <div class="editContent">{{noticeName}} </div>
                            </div>
                        </div>
                        <div class="editItem">
                            <div class="editCenter">
                                <div class="editName">报名开始时间：</div>
                                <div class="editContent">{{enrollStartTime}} </div>
                            </div>
                            <div class="editCenter">
                                <div class="editName">报名结束时间：</div>
                                <div class="editContent">{{enrollEndTime}} </div>
                            </div>
                        </div>
                        <div class="editItem">
                            <div class="editCenter">
                                <div class="editName">招标文件领取时间：</div>
                                <div class="editContent">{{}} </div>
                            </div>
                        </div>
                        <div class="editItem">
                            <div class="editCenter">
                                <div class="editName">招标文件发售地点：</div>
                                <div class="editContent">{{tenderDocumentsSaleSite}} </div>
                            </div>
                        </div>
                        <div class="editItem">
                            <div class="editCenter">
                                <div class="editName">招标文件工本费：</div>
                                <div class="editContent">人民币{{tenderDocumentsCost}}元 </div>
                            </div>
                        </div>
                        <div class="editItem">
                            <div class="editCenter">
                                <div class="editName">工本费接收账户：</div>
                                <div class="editContent">{{costAcceptAccount}}元 </div>
                            </div>
                        </div>
                        <div class="editItem">
                            <div class="editCenter">
                                <div class="editName">投标人需提交资料：</div>
                                <div class="editContent">{{bidderData}} </div>
                            </div>
                        </div>
                        <div class="editItem">
                            <div class="editCenter">
                                <div class="editName">递交截止时间：</div>
                                <div class="editContent">{{submitTime}} </div>
                            </div>
                        </div>
                        <div class="editItem">
                            <div class="editCenter">
                                <div class="editName">递交投标文件地点：</div>
                                <div class="editContent">{{submitPlace}} </div>
                            </div>
                        </div>
                        <div class="editItem">
                            <div class="editCenter">
                                <div class="editName">开标时间：</div>
                                <div class="editContent">{{openingTime}} </div>
                            </div>
                        </div>
                        <div class="editItem">
                            <div class="editCenter">
                                <div class="editName">开标地点：</div>
                                <div class="editContent">软交所招标采购交易中心（北京市海淀区中关村大街32号和盛嘉业大厦（中发智造）五层）</div>
                            </div>
                        </div>
                        <div class="editItem">
                            <div class="editCenter">
                                <div class="editName">评标办法和标准：</div>
                                <div class="editContent">{{bidEvaluationStandard}}</div>
                            </div>
                        </div>
                        <div class="editItem">
                            <div class="editCenter">
                                <div class="editName">项目负责人：</div>
                                <div class="editContent">{{projectLeader}}</div>
                            </div>
                            <div class="editCenter">
                                <div class="editName">联系方式：</div>
                                <div class="editContent">{{projectLeaderPhone}}</div>
                            </div>
                        </div>
                        <div class="editItem">
                            <div class="editCenter">
                                <div class="editName">备注：</div>
                                <div class="editContent">{{remark}}</div>
                            </div>
                        </div>
                    </div>
                </el-collapse-item>
                <el-collapse-item title="公告内容" name="5">
                    <div class="edit_list">
                        <div class="fail_box">
                            <div>2019gongkai213-part01</div>
                            <div>招标公告</div>
                            <div style="font-size:14px;font-weight:normal;color:#333;">2019年02月25日</div>
                        </div>
                        <div class="editItem">
                            <div class="editCenter">
                                <div class="editName">招标项目名称：</div>
                                <div class="editContent">{{nameOfTenderProject}}</div>
                            </div>
                        </div>
                        <div class="editItem">
                            <div class="editCenter">
                                <div class="editName">招标项目编号：</div>
                                <div class="editContent">{{biddingProjectNumber}}</div>
                            </div>
                        </div>
                        <div class="editItem">
                            <div class="editCenter">
                                <div class="editName">招标项目预算金额：</div>
                                <div class="editContent">{{budgetAmount}}</div>
                            </div>
                        </div>
                        <div class="editItem">
                            <div class="editCenter">
                                <div class="editName">资金来源：</div>
                                <div class="editContent">{{sourceOfFunds}}</div>
                            </div>
                        </div>
                        <div class="editItem">
                            <div class="editTextarea">
                                <div class="editName">资金构成：</div>
                                <div class="editContent">
                                    <span v-if="stateOwnedFunds != null">国有资金{{stateOwnedFunds}}万元{{stateOwnedFundsPercentage}}%</span>
                                    <span v-if="ownFunds != null">自有资金{{ownFunds}}万元{{ownFundsPercentage}}%</span>
                                    <span v-if="foreignGovernmentsAndOrganizationalFunds != null">外国政府及组织资金{{foreignGovernmentsAndOrganizationalFunds}}万元{{foreignGovernmentsAndOrganizationalFundsPercentage}}%</span>
                                    <span v-if="overseasPrivateInvestment != null">境外私人投资{{overseasPrivateInvestment}}万元{{overseasPrivateInvestmentPercentage}}%</span>
                                </div>
                            </div>
                        </div>
                        <div class="editItem">
                            <div class="editCenter">
                                <div class="editName" style="font-weight:bold;">招标(采购)人</div>
                                <div class="editContent"></div>
                            </div>
                        </div>
                         <div class="editItem">
                            <div class="editCenter">
                                <div class="editName">招标(采购)人全称</div>
                                <div class="editContent">{{nameOfPurchaser}}</div>
                            </div>
                        </div>
                         <div class="editItem">
                            <div class="editCenter">
                                <div class="editName">招标(采购)人地址</div>
                                <div class="editContent">{{tendereeAddress}}</div>
                            </div>
                        </div>
                        <div class="editItem">
                            <div class="editCenter">
                                <div class="editName">招标(采购)人联系方式</div>
                                <div class="editContent">{{tendereePhone}}</div>
                            </div>
                        </div>
                        <div class="editItem">
                            <div class="editCenter">
                                <div class="editName" style="font-weight:bold;">招标内容</div>
                                <div class="editContent"></div>
                            </div>
                        </div>
                        <div class="infobox_item">
                             <table border="1"  cellspacing="0" cellpadding="0" style="width:99%;">
                                <tr>
                                    <td>分包名称</td>
                                    <td colspan="3">{{subcontractName}}</td>
                                </tr>
                                <tr>
                                    <td>入场项目分包编号</td>
                                    <td>{{entrySubcontractNumber}}</td>
                                    <td>分包控制金额</td>
                                    <td>{{subcontractingControlAmount}}万元</td>
                                </tr>
                                <tr>
                                    <td>用途</td>
                                    <td>{{purchasePurposes}}</td>
                                    <td>数量</td>
                                    <td>{{purchaseAmount}}</td>
                                </tr>
                                <tr>
                                    <td colspan="4">投标人资格条件</td>
                                </tr>
                                <tr>
                                    <td colspan="4" height="50px">{{applicantQualifications}}</td>
                                </tr>
                                <tr>
                                    <td colspan="4">简要技术要求</td>
                                </tr>
                                <tr>
                                    <td colspan="4" height="50px">{{technologyQualifications}}</td>
                                </tr>
                            </table>
                        </div>
                        <div class="editItem">
                            <div class="editCenter">
                                <div class="editName" style="font-weight:bold;">招标文件领取</div>
                                <div class="editContent"></div>
                            </div>
                        </div>
                        <div class="editItem">
                            <div class="editCenter">
                                <div class="editName" style="font-weight:bold;">招标文件发售时间</div>
                                <div class="editContent">
                                    <span>{{saleReceiveStartDate}}日到{{saleReceiveEndDate}} 上午{{morningbegin}}-{{morningend}} 到下午{{afterbegin}}-{{afterend}}</span>
                                </div>
                            </div>
                        </div>
                        <div class="editItem">
                            <div class="editCenter">
                                <div class="editName">招标文件发售地点：</div>
                                <div class="editContent">{{tenderDocumentsSaleSite}}</div>
                            </div>
                        </div>
                        <div class="editItem">
                            <div class="editCenter">
                                <div class="editName">招标文件工本费：</div>
                                <div class="editContent">{{tenderDocumentsCost}}</div>
                            </div>
                        </div>
                        <div class="editItem">
                            <div class="editCenter">
                                <div class="editName" >工本费接收账户：</div>
                                <div class="editContent">{{costAcceptAccount}}</div>
                            </div>
                        </div>
                        <div class="editItem">
                            <div class="editCenter">
                                <div class="editName">投标人需提交资料：</div>
                                <div class="editContent">{{bidderData}}</div>
                            </div>
                        </div>
                        <div class="editItem">
                            <div class="editCenter">
                                <div class="editName" style="font-weight:bold;">投标文件递交</div>
                                <div class="editContent"></div>
                            </div>
                        </div>
                        <div class="editItem">
                            <div class="editCenter">
                                <div class="editName">递交投标文件截止时间：</div>
                                <div class="editContent">{{submitTime}}</div>
                            </div>
                        </div>
                        <div class="editItem">
                            <div class="editCenter">
                                <div class="editName">递交投标文件地点：</div>
                                <div class="editContent">{{submitPlace}}</div>
                            </div>
                        </div>
                        <div class="editItem">
                            <div class="editCenter">
                                <div class="editName">开标时间：</div>
                                <div class="editContent">{{openingTime}}</div>
                            </div>
                        </div>
                        <div class="editItem">
                            <div class="editCenter">
                                <div class="editName">开标地点：</div>
                                <div class="editContent">软交所招标采购交易中心（北京市海淀区中关村大街32号和盛嘉业大厦（中发智造）五层）</div>
                            </div>
                        </div>
                        <div class="editItem">
                            <div class="editCenter">
                                <div class="editName">评标办法和标准：</div>
                                <div class="editContent">{{bidEvaluationStandard}}</div>
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
                        <div style="font-weight:bold;text-align:right;width:100%;">
                            <div>测试用户1</div>
                            <div>2019年2月15日</div>
                        </div>
                    </div>
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
            width="40%">
            <div class="dialog_header">
                <div class="left">
                    <el-button type="primary" @click="sureSubmit">确认提交</el-button>
                    <el-button type="primary" @click="handleClose">取消</el-button>
                    <el-checkbox v-model="remind">手机短信提醒</el-checkbox>
                </div>
                <p>当前步骤: <span>招标公告提交</span></p>
            </div>
        </el-dialog>
        <!-- 确认提交弹窗 -->
        <el-dialog
            title="执行成功"
            :visible.sync="sureSubmitBox"
            width="40%"
            :before-close="handleClose">
            <div class="icon">
                <i class="el-icon-question"></i>
                <span>提交招标公告成功！</span>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="sure()">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 查看分包信息详情 -->
		<div class="lookWrapper" v-show="lookFlag">
            <div class="lookBox">
				<div class="look_title">
                    <p>分包信息</p>
                    <i class="el-icon-close" @click="closeLook"></i>
                </div>
				<el-collapse v-model="activeName" accordion>
					<!--分包信息 -->
					<el-collapse-item title="分包信息" name="1">
                        <div class="edit_list">
                            <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName" style="color:red;">统一交易标志码：</div>
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
                                    <div class="editContent">{{subcontractName}}</div>
                                </div>
                            </div>
                            <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName">分包内容：</div>
                                    <div class="editContent">{{nameOfPurchaser}}</div>
                                </div>
                            </div>
                            <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName">招标范围：</div>
                                    <div class="editContent">{{subcontractContents}}</div>
                                </div>
                            </div>
                            <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName">分包控制金额：</div>
                                    <div class="editContent">{{subcontractingControlAmount}} <b style="color:#000;">万元</b> </div>
                                </div>
                                <div class="editCenter">
                                    <div class="editName">资格审查方式：</div>
                                    <div class="editContent">{{qualificationExaminationMethod}}</div>
                                </div>
                            </div>
                            <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName">是否电子招投标：</div>
                                    <div class="editContent">{{electronicBidEvaluation}}</div>
                                </div>
                            </div>
                        </div>
					</el-collapse-item>
				</el-collapse>
            </div>
        </div>
        <!-- 上一步招标内容详情 -->
		<div class="winWrapper" v-show="winFlag">
            <div class="winBox">
               	<div class="win_title">
                    <p>招标内容</p>
                    <i class="el-icon-close" @click="closeWin"></i>
                </div>
				<div class="box">
					<button class="btn" @click="savePage">保存</button>
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
                                    <div class="editContent">{{biddingProcurementMode}}</div>
                                </div>
                                <div class="editCenter">
                                    <div class="editName">招标组织方式：</div>
                                    <div class="editContent">{{biddingOrganization}}</div>
                                </div>
                            </div>
                        </div>
					</el-collapse-item>
					 <!-- 招标内容-->
					<el-collapse-item title="招标内容" name="2">
						<div class="edit_list">
							<div class="editItem">
                                <div class="editCenter">
                                    <div class="editName">分包名称：</div>
                                    <div class="editContent">{{subcontractName}} </div>
                                </div>
                            </div>
                            <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName">分包控制金额：</div>
                                    <div class="editContent">{{subcontractingControlAmount}}万元</div>
                                </div>
                                <div class="editCenter">
                                    <div class="editName">入场项目分包编号：</div>
                                    <div class="editContent">{{entrySubcontractNumber}} </div>
                                </div>
                            </div>
                            <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName">采购数量：</div>
                                    <div class="editContent">
                                        <el-input v-model="purchaseAmount" clearable></el-input>
                                    </div>
                                </div>
                                <div class="editCenter">
                                    <div class="editName">采购用途：</div>
                                    <div class="editContent">
                                        <el-input v-model="purchasePurposes" clearable></el-input>
                                    </div>
                                </div>
                            </div>
                            <div class="editItem">
                                <div class="editTextarea">
                                    <div class="editName">简要技术要求：</div>
                                    <div class="editContent">
                                        <el-input v-model="technologyQualifications" type="textarea" :rows="3"></el-input>
                                    </div>
                                </div>
                            </div>
                            <div class="editItem">
                                <div class="editTextarea">
                                    <div class="editName">投标人资格条件：</div>
                                    <div class="editContent">
                                        <el-input v-model="applicantQualifications" type="textarea" :rows="3"></el-input>
                                    </div>
                                </div>
                            </div>
                            <div class="noteLast">
                                <div class="editName"> 设置报名要求：</div>
                                <div class="noteMain">
                                    <div class="noteItem">
                                        <p>企业资质要求</p>
                                        <div class="newBtn">
                                            <el-button>新增资质</el-button>
                                        </div>
                                    </div>
                                    <div class="noteItem">
                                        <p>项目负责人资质要求</p>
                                        <div class="newBtn">
                                            <el-button>新增资质</el-button>
                                        </div>
                                    </div>
                                </div>
                            </div>
						</div>
					</el-collapse-item>
				</el-collapse>
            </div>
        </div>
        <!-- 下一步招标内容详情 -->
		<div class="winWrapper" v-show="detailFlag">
            <div class="winBox">
               	<div class="win_title">
                    <p>招标内容</p>
                    <i class="el-icon-close" @click="closebidDetail"></i>
                </div>
				<div class="box">
					<button class="btn" @click="savePage">保存</button>
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
                                    <div class="editContent">{{biddingProcurementMode}}</div>
                                </div>
                                <div class="editCenter">
                                    <div class="editName">招标组织方式：</div>
                                    <div class="editContent">{{biddingOrganization}}</div>
                                </div>
                            </div>
                        </div>
					</el-collapse-item>
					 <!-- 招标内容-->
					<el-collapse-item title="招标内容" name="2">
						<div class="edit_list">
							<div class="editItem">
                                <div class="editCenter">
                                    <div class="editName">分包名称：</div>
                                    <div class="editContent">{{subcontractName}} </div>
                                </div>
                            </div>
                            <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName">分包控制金额：</div>
                                    <div class="editContent">{{subcontractingControlAmount}}万元</div>
                                </div>
                                <div class="editCenter">
                                    <div class="editName">入场项目分包编号：</div>
                                    <div class="editContent">{{entrySubcontractNumber}} </div>
                                </div>
                            </div>
                            <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName">采购数量：</div>
                                    <div class="editContent">{{purchaseAmount}}</div>
                                </div>
                                <div class="editCenter">
                                    <div class="editName">采购用途：</div>
                                    <div class="editContent">{{purchasePurposes}}</div>
                                </div>
                            </div>
                            <div class="editItem">
                                <div class="editTextarea">
                                    <div class="editName">简要技术要求：</div>
                                    <div class="editContent">{{technologyQualifications}} </div>
                                </div>
                            </div>
                            <div class="editItem">
                                <div class="editTextarea">
                                    <div class="editName">投标人资格条件：</div>
                                    <div class="editContent">{{applicantQualifications}}</div>
                                </div>
                            </div>
                            <div class="editItem">
                                <div class="editTextarea">
                                    <div class="editName">企业资质要求：</div>
                                    <div class="editContent">{{companyQualiﬁcations}} </div>
                                </div>
                            </div>
                            <div class="editItem">
                                <div class="editTextarea">
                                    <div class="editName">项目负责人资质要求：</div>
                                    <div class="editContent">{{managerQualiﬁcations}} </div>
                                </div>
                            </div>
						</div>
					</el-collapse-item>
				</el-collapse>
            </div>
        </div>
        <!-- +分包信息 -->
		<div class="searchWrapper" v-show="searchFlag">
			<div class="searchBox">
                <div class="search_title">
                    <p>分包信息</p>
                    <i class="el-icon-close" @click="closeSearch"></i>
                </div>
                <!-- <div class="search_input">
                    <div class="write">
                        <p>项目(分包)名称：</p>
                        <el-input v-model="name" clearable></el-input>
                    </div>
					<div class="write">
                        <p>入场项目(分包)编号：</p>
                        <el-input v-model="number" clearable></el-input>
                    </div>
                    <button class="btn" @click="searchData">搜索</button>
                </div> -->
                <div class="search_main" style="padding:10px 0;">
					<el-table
                            ref="multipleTable"
                            :data="markData"
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
                            label="入场项目(分包)编号">
                        </el-table-column>
                        <el-table-column
                            label="招标项目名称">
							<template slot-scope="scope">{{ nameOfTenderProject }}</template>
                        </el-table-column>
                        <el-table-column
                            prop="subcontractName"
                            label="分包名称">
                        </el-table-column>
						<el-table-column
                            prop="subcontractContents"
                            label="分包分类">
                        </el-table-column>
						<el-table-column
                            label="招标方式">
							<template slot-scope="scope">{{ biddingProcurementMode }}</template>
                        </el-table-column>
						<el-table-column
                            prop="subcontractingControlAmount"
                            label="分包控制金额(万元)">
                        </el-table-column>
						<el-table-column
                            prop="subcontractingState"
                            label="分包状态">
                        </el-table-column>
                    </el-table>
                    
                </div>
                <div class="pick_btn">
                    <button class="btn" @click="sureChoice">确定选择</button>
                </div>
            </div>
		</div>
    </div>
</template>

<script>
    import '../../../assets/css/style.css'
    import baseUrl from '../../../api/api'
    import {formatDate,formatTime,isEmpty,changeTime} from '../../../api/base.js'
    export default {
        data(){
            return {
                tenderNoticeId:'',//查询或者下一步返回的Id
                projectObj:JSON.parse(window.localStorage.projectObj),
                activeName:['1','2','3','4','5'],
                enclosureData:[ //新建项目
                    {
                        name: " 项目负责人授权书",
                        list: "王小虎"
                    }
                ],
                showFlag:false,// 只是展示数据页面
                headerBtn:true,// 头部按钮
                failShow:true,
                order:true,// 场地预约
                accessory:false,// 附件
                input:'',
                // 招标项目信息所需字段
                nameOfTenderProject:'',// 招标项目名称
                biddingProjectNumber:'',// 招标项目编号
                nameOfPurchaser:'',// 招标(采购)人
                tendereeAddress:'',// 招标人地址
                tendereePhone:'',// 招标人联系方式
                budgetAmount:'',// 招标项目预算金额
                tenderContents:'',// 招标内容
                sourceOfFunds:'',// 资金来源
                // 资金构成
                stateOwnedFunds:'',//国有资金  
                stateOwnedFundsPercentage:'',// 国有资金百分比
                ownFunds:'',//自有资金
                ownFundsPercentage:'',// 自有资金百分比
                foreignGovernmentsAndOrganizationalFunds:'',//外国政府及组织资金
                foreignGovernmentsAndOrganizationalFundsPercentage:'',//外国政府及组织资金百分比
                overseasPrivateInvestment:'',//境外私人投资
                overseasPrivateInvestmentPercentage:'',//境外私人投资百分比
                moneytype:'',// 资金类型
                // 分包信息所需字段
                purchaseAmount:'',// 采购数量
                purchasePurposes:'',// 采购用途
                technologyQualifications:'',// 简要技术要求
                applicantQualifications:'',// 投标人资格条件
                // 公告信息所需字段
                noticeName:'',// 公告名称
                enrollStartTime:'',// 报名开始时间
                enrollEndTime:'',// 报名结束时间
                saleReceiveStartDate:'',// 招标文件发售时间开始时间
                saleReceiveEndDate:'',// 招标文件发售时间结束时间
                morningbegin:'',// 上午开始时间
                morningend:'',// 上午结束时间
                afterbegin:'',// 下午开始时间
                afterend:'',// 下午结束时间

                saleStartTime:'',// 上午发售时间
                saleEndTime:'',// 下午发售时间
                tenderDocumentsSaleSite:'',// 招标文件发售地点
                tenderDocumentsCost:'',// 招标文件工本费
                costAcceptAccount:'',// 工本费接收账户
                bidderData:'',// 投标人需提交资料
                bidEvaluationStandard:'',// 评标办法和标准
                projectLeader:'',//	项目负责人
                projectLeaderPhone:'',// 项目负责人联系方式
                remark:'',// 备注
                entrySubcontractNumber:'',// 分包项目编号
                projectCode:'',// 总包项目编号
                // 修改所需字段
                tenderInforId:'',// 主键ID
                // 保存弹窗所需字段
                saveBox:false,// 保存弹窗
                // 下一步公告内容所需字段
                submitTime:'',// 递交投标文件截止时间
                submitPlace:'',// 递交投标文件地点
                bidOpeningDate:'',//开标时间
                bidOpeningSite:'',//开标地点
                // 上一步弹窗
                laststepBox:false,
                // 分包信息所需字段
                subpackageData:[],// 分包列表
                subcontractName:'',//分包名称
                subcontractingControlAmount:'',// 分包控制金额
                // 提交弹窗
                submitBox:false,
                remind:'',//手机短信提醒
                // 确定提交
                sureSubmitBox:false,
                // 办理记录
                manageDate:[],
                creationTime:'',// 时间
                initList:[],// 初始化返回的数据
                makeList:[],// 场地预约返回的数据
                assessmentTime:'',// 保存和下一步的时候 场地预约开标时间
                openingTime:'',// 开标时间
                itemsList:[],// 返回的items
                diffFlag:false,// 
                // 分包信息
                scopeOfTender:'',// 招标范围
                qualificationExaminationMethod:'',// 资格审查方式	
                electronicBidEvaluation:'',// 是否电子招投标
                subcontractContents:'',// 分包内容
                totalProjectId:'',
                // 查看分包信息所需字段
                lookFlag:false,
                // 招标内容所需字段
                winFlag:false, 
                unitPrice:'',
                number:'',
                // 招标项目信息所需字段
                nameOfTenderProject:'',// 招标项目名称
                biddingProjectNumber:'',// 招标项目编号
                nameOfPurchaser:'',// 招标(采购)人
                budgetAmount:'',// 招标项目预算金额
                amountOfBiddingProject:'',//招标项目金额
                biddingProcurementMode:'',// 招标采购方式
                biddingOrganization:'',// 招标组织方式
                typesOfBiddingProjects:'',// 招标项目类型
                amountId:'',
                // + 分包信息
                searchFlag:false,
                multipleSelection:[],//多选框
                name:'',
                markData:[],
                areaList:[],// 保存传的items
                detailFlag:false,// 下一步招标内容详情弹窗
                companyQualiﬁcations:'',// 企业资质要求
                managerQualiﬁcations:'',// 项目负责人资质条件
                itemTemp:{},
                resData:[],//查询返回的data值
            }
        },
        created(){
            this.getInitInfo();// 初始化查询
            this.getmanageInfo();// 办理记录
            this.getOpenTime();// 开标时间
            this.getsubpackageInfo();// 分包信息
            if(this.projectObj.totalProjectId.indexOf("-") != -1){
                // 分包
                this.diffFlag = false;
                this.getsubInfo();// 分包信息列表数据
            }else{
                // 总包
                this.diffFlag = true;
            }
        },
        mounted(){
            this.getbiddingInfo();// 招标项目信息
        },
        methods:{
            // 查看
            searchSubpackage(){
                this.searchFlag = true;
                this.getsubInfo();// 分包信息弹窗列表数据
            },
            // 分包信息查看
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
            // 下一步招标内容详情
            bidDetail(row){
                this.detailFlag = true;
                this.areaList.forEach(item=>{
                    if(item.entrySubcontractNumber == row.entrySubcontractNumber ){
                        this.technologyQualifications = item.technologyQualifications;// 简要技术要求
                        this.purchaseAmount = item.purchaseAmount;// 采购数量
                        this.purchasePurposes = item.purchasePurposes;// 采购用途
                        this.applicantQualifications = item.applicantQualifications;// 投资人资格条件
                        this.companyQualiﬁcations= item.companyQualiﬁcations;// 企业资质要求
                        this.managerQualiﬁcations= item.managerQualiﬁcations;// 项目负责人资质条件
                    }
                    this.itemTemp = item;
                })
            },
            // 下一步招标内容详情 关闭
            closebidDetail(){
                this.detailFlag = false;
            },
            // 招标内容
            winItem(row){
                this.subcontractName = row.subcontractName;
                this.subcontractingControlAmount = row.subcontractingControlAmount;
                this.entrySubcontractNumber = row.entrySubcontractNumber;
                this.areaList.forEach(item=>{
                    if(item.entrySubcontractNumber == row.entrySubcontractNumber ){
                        this.technologyQualifications = item.technologyQualifications;// 简要技术要求
                        this.purchaseAmount = item.purchaseAmount;// 采购数量
                        this.purchasePurposes = item.purchasePurposes;// 采购用途
                        this.applicantQualifications = item.applicantQualifications;// 投资人资格条件
                        this.companyQualiﬁcations= item.companyQualiﬁcations;// 企业资质要求
                        this.managerQualiﬁcations= item.managerQualiﬁcations;// 项目负责人资质条件
                    }
                    this.itemTemp = item;
                })
                this.winFlag = true;
            },
            // 招标内容 保存
            savePage(){
                this.itemTemp.purchaseAmount=this.purchaseAmount;
                this.itemTemp.purchasePurposes=this.purchasePurposes;
                this.itemTemp.technologyQualifications=this.technologyQualifications;
                this.itemTemp.applicantQualifications=this.applicantQualifications;
                this.itemTemp.companyQualiﬁcations=this.companyQualiﬁcations;
                this.itemTemp.managerQualiﬁcations=this.managerQualiﬁcations;
                this.winFlag = false;
            },
            // 关闭招标内容
            closeWin(){
                this.winFlag = false;
            },
            // 多选框
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            // 关闭搜索
            closeSearch(){
                this.searchFlag = false;
            },
            // 分包列表  确定选择
            sureChoice(){
                let arr =[...this.subpackageData,...this.multipleSelection];
                this.subpackageData = this.removeData(arr,'entrySubcontractNumber');
                this.multipleSelection.map((item,index)=>{
                    var obj = {};
                    obj.entrySubcontractNumber = item.entrySubcontractNumber;
                    this.areaList.push(obj)
                })
                this.searchFlag = false;
            },
            // 删除一样值的方法
            removeData(arr,id){
                let hash = {};
                let newArr = arr.reduce((item,next)=>{
                    hash[next[id]]?'':hash[next[id]] = true && item.push(next);
                    return item;
                },[]);
                return newArr;
            },  
            // 删除
            deleteItem(row){
                if(row.entrySubcontractNumber == this.projectObj.totalProjectId){
                    this.$layer.msg('不可删除当前项目分包编号')
                    return;
                }else{
                    for (let i = 0; i < this.subpackageData.length; i++) {
                        let item = this.subpackageData[i];
                        if(row.subcontractItePrimaryKeyId == item.subcontractItePrimaryKeyId){
                            this.subpackageData.splice(i,1);
                        }
                    }
                    for(var i=0; i<this.areaList.length;i++){
                        var item = this.areaList[i];
                        if(row.entrySubcontractNumber == item.entrySubcontractNumber){
                            this.areaList.splice(i,1);
                        }
                    }
                }
                
            },  
            save(num){
                // 保存
                if(num == 1){
                    this.savebidding(num)
                }else{
                    // 下一步
                    //  报名起始时间
                    this.enrollStartTime = changeTime(this.enrollStartTime);
                    this.enrollEndTime = changeTime(this.enrollEndTime);
                    // 招标文件发售时间
                    this.saleReceiveStartDate=changeTime(this.saleReceiveStartDate);
                    this.saleReceiveEndDate=changeTime(this.saleReceiveEndDate);
                    // 上午发售时间
                    let morningArr = [];
                    morningArr.push(this.morningbegin,this.morningend)
                    this.saleStartTime = morningArr.toString()
                    // 下午发售时间
                    let afterArr = [];
                    afterArr.push(this.afterbegin,this.afterend)
                    this.saleEndTime = afterArr.toString()
                    this.failShow = !this.failShow;
                    this.showFlag = true;
                    this.savebidding(num);// 保存
                    this.getmanageInfo();// 办理记录
                }
            },
            // 上一步按钮/
            laststep(){
                let object={}
                if(this.projectObj.totalProjectId.indexOf("-") != -1 && this.projectObj.totalProjectId!=null){
                    // 入场项目分包编号
                    object={
                        entrySubcontractNumber:this.projectObj.totalProjectId,
                        noticeType:"招标公告",
                    }
                }else{
                    // 入场项目编号
                    object ={
                        projectCode:this.projectObj.totalProjectId,
                        noticeType:"招标公告",
                    }
                }
                this.$axios({
                    method: "POST",
                    url: baseUrl+"/tenderNoticeController/select",
                    data:object
                }).then(res=>{
                    if(res.data.status == 200){
                        this.showFlag = false;
                        this.failShow = !this.failShow;
                        this.laststepBox = true;
                    }else{
                        this.$layer.msg(res.data.msg)
                    }
                }).catch(err=>{
                    console.log(err)
                })
            },
            // 上一步弹窗 确定
            laststepBoxSure(){
                this.laststepBox = false;
            },
            // 提交按钮
            submit(){
                this.$axios({
                    method: "POST",
                    url: baseUrl+"/tenderNoticeController/submit",
                    data:{
                        state:'待办理',
                        tenderNoticeId:this.tenderNoticeId,// 工本费接收账户id 
                    }
                }).then(res=>{
                    if(res.data.status == 200){
                        this.submitBox = true;
                    }else{
                        this.$layer.msg(res.data.msg);
                    }
                }).catch(err=>{
                    console.log(err)
                })
            },
            // 确认提交
            sureSubmit(){
                this.submitBox = false;
                this.sureSubmitBox = true;// 确定提交弹窗
            },
            // 确认提交 ---> 确定
            sure(){
                this.sureSubmitBox = false;// 确定提交弹窗
                this.showFlag = true;
                this.headerBtn = false;// 头部按钮
                this.order=false;// 场地预约
                this.accessory=true;// 附件
            },
            // 保存
            savebidding(num){
                // 上午发售时间
                let morningArr = [];
                morningArr.push(this.morningbegin,this.morningend)
                this.saleStartTime = morningArr.toString()
                // 下午发售时间
                let afterArr = [];
                afterArr.push(this.afterbegin,this.afterend)
                this.saleEndTime = afterArr.toString()
                let objectData = {}
                // 入场项目(分包)编号
                if(this.projectObj.totalProjectId.indexOf("-") != -1){  
                    // 分包
                    objectData={
                        noticeType:'招标公告',
                        tendereeAddress:this.tendereeAddress,tendereePhone:this.tendereePhone,purchaseAmount:this.purchaseAmount,purchasePurposes:this.purchasePurposes,technologyQualifications:this.technologyQualifications,applicantQualifications:this.applicantQualifications,noticeName:this.noticeName,enrollStartTime:changeTime(this.enrollStartTime),enrollEndTime:changeTime(this.enrollEndTime),saleReceiveStartDate:changeTime(this.saleReceiveStartDate),saleReceiveEndDate:changeTime(this.saleReceiveEndDate),saleStartTime:this.saleStartTime,saleEndTime:this.saleEndTime,tenderDocumentsSaleSite:this.tenderDocumentsSaleSite,tenderDocumentsCost:this.tenderDocumentsCost,costAcceptAccount:this.costAcceptAccount,bidderData:this.bidderData,bidEvaluationStandard:this.bidEvaluationStandard,projectLeader:this.projectLeader,projectLeaderPhone:this.projectLeaderPhone,remark:this.remark,tenderInforId:this.tenderInforId,entrySubcontractNumber:this.projectObj.totalProjectId,
                        items:this.areaList
                    }
                }else{
                    // 总包
                    objectData={
                        noticeType:'招标公告',
                        tendereeAddress:this.tendereeAddress,tendereePhone:this.tendereePhone,purchaseAmount:this.purchaseAmount,purchasePurposes:this.purchasePurposes,technologyQualifications:this.technologyQualifications,applicantQualifications:this.applicantQualifications,noticeName:this.noticeName,enrollStartTime:changeTime(this.enrollStartTime),enrollEndTime:changeTime(this.enrollEndTime),saleReceiveStartDate:changeTime(this.saleReceiveStartDate),saleReceiveEndDate:changeTime(this.saleReceiveEndDate),saleStartTime:this.saleStartTime,saleEndTime:this.saleEndTime,tenderDocumentsSaleSite:this.tenderDocumentsSaleSite,tenderDocumentsCost:this.tenderDocumentsCost,costAcceptAccount:this.costAcceptAccount,bidderData:this.bidderData,bidEvaluationStandard:this.bidEvaluationStandard,projectLeader:this.projectLeader,projectLeaderPhone:this.projectLeaderPhone,remark:this.remark,tenderInforId:this.tenderInforId,projectCode:this.projectObj.totalProjectId,
                        items:[{
                            projectCode:this.projectObj.totalProjectId,
                            purchaseAmount:this.purchaseAmount,
                            purchasePurposes:this.purchasePurposes,
                            technologyQualifications:this.technologyQualifications,
                            applicantQualifications:this.applicantQualifications,
                        }]
                    }
                }
                this.$axios({
				    method: "POST",
                    url: baseUrl+'/tenderNoticeController/saveOrUpdate',
                    data:objectData
                }).then(res=>{
                    if(res.data.status == 200){
                        // 保存弹窗
                        if(num ==1){
                            this.saveBox = true;
                        }else{
                            this.saveBox = false;
                        }
                        // 所需字段
                        this.tendereeAddress=res.data.data.tendereeAddress;
                        this.tendereePhone=res.data.data.tendereePhone;
                        this.purchaseAmount=res.data.data.purchaseAmount;
                        this.purchasePurposes=res.data.data.purchasePurposes;
                        this.technologyQualifications=res.data.data.technologyQualifications;
                        this.applicantQualifications=res.data.data.applicantQualifications;
                        this.noticeName=res.data.data.noticeName;
                        //  报名起始时间
                        this.enrollStartTime=formatTime(res.data.data.enrollStartTime);
                        this.enrollEndTime=formatTime(res.data.data.enrollEndTime);
                        // 招标文件发售时间
                        this.saleReceiveStartDate=formatDate(res.data.data.saleReceiveStartDate);
                        this.saleReceiveEndDate=formatDate(res.data.data.saleReceiveEndDate);
                        // 上午和下午起始时间
                        this.saleStartTime=res.data.data.saleStartTime.split(',');
                        this.morningbegin = this.saleStartTime[0];
                        this.morningend = this.saleStartTime[1];
                        this.saleEndTime=res.data.data.saleEndTime.split(',');
                        this.afterbegin = this.saleEndTime[0];
                        this.afterend = this.saleEndTime[1];


                        this.tenderDocumentsSaleSite=res.data.data.tenderDocumentsSaleSite;
                        this.tenderDocumentsCost=res.data.data.tenderDocumentsCost;
                        this.costAcceptAccount=res.data.data.costAcceptAccount;
                        this.bidderData=res.data.data.bidderData;
                        this.bidEvaluationStandard=res.data.data.bidEvaluationStandard;
                        this.projectLeader=res.data.data.projectLeader;
                        this.projectLeaderPhone=res.data.data.projectLeaderPhone;
                        this.remark=res.data.data.remark;
                        this.tenderInforId = res.data.data.tenderInforId;// 修改需要传的ID
                        this.tenderNoticeId = res.data.data.tenderNoticeId;
                        
                    }

                }).catch(err=>{
                    console.log(err)
                })
            },
            // 分包信息列表数据
            async getsubpackageInfo(){
                await this.getInitInfo();
                let lookArr = [];
                if(this.projectObj.totalProjectId.indexOf("-") != -1 && this.projectObj.totalProjectId!=null){
                    if(this.resData.length == 0){
                        this.EntrySubNum = this.projectObj.totalProjectId;
                        lookArr.push(this.EntrySubNum);
                    }else{
                        this.areaList.map((item,index)=>{
                            this.entrySubcontractNumber = item.entrySubcontractNumber;
                            lookArr.push(this.entrySubcontractNumber);
                        })
                    }
                    
                }
                this.$axios({
                    method: "POST",
                    url: baseUrl+"/projectInformationController/selectByProjectEntrySubcontractNumber",
                    data:{
                        projectEntrySubcontractNumbers:lookArr
                    }
                }).then(res=>{
                    if(res.data.status == 200){
                        this.subpackageData = res.data.data;// 项目分包列表
                        this.subpackageData.forEach((item,index) => {
                            this.tenderContents = item.projectInformationVo.tenderContents;// 招标内容
                            this.subcontractName = item.subcontractName;// 分包名称
                            this.entrySubcontractNumber = item.entrySubcontractNumber;// 入场项目分包编号
                            this.subcontractingControlAmount = item.subcontractingControlAmount;// 分包控制金额
                            this.companyQualiﬁcations = item.companyQualiﬁcations;//企业资质要求
                            this.managerQualiﬁcations = item.managerQualiﬁcations;// 项目负责人资质条件
                        });
                    }else{
                        console.log(res.data.msg);
                    }
                }).catch(err=>{
                    console.log(err)
                })  
                                                           
            },
            // +分包信息
            getsubInfo(){
                this.$axios({
                    method: "POST",
                    url: baseUrl+"/tenderNoticeController/subcontract",
                    data:{
                        entrySubcontractNumber:this.projectObj.totalProjectId,
                        qualificationExaminationMethod:'资格后审',
                        noticeType:'招标公告'
                    }
                }).then(res=>{
                    if(res.data.status == 200){  
                        this.markData = res.data.data;
                    }else{
                        this.$layer.msg(res.data.msg);
                    }
                }).catch(err=>{
                    console.log(err)
                })   
            },
            // 保存弹窗X按钮
            handleClose(){
                this.saveBox = false;// 保存弹窗
                this.laststepBox = false;// 上一步弹窗
                this.submitBox = false;// 提交弹窗
            },
            // 保存弹窗确定按钮
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
                        this.budgetAmount = res.data.data.budgetAmount;// 招标项目预算金额 
                        this.nameOfPurchaser = res.data.data.nameOfPurchaser;// 招标(采购)人
                        this.tenderContents = res.data.data.tenderContents;// 招标内容
                        this.sourceOfFunds = res.data.data.sourceOfFunds;// 资金来源
                        // 资金构成
                        this.stateOwnedFunds = res.data.data.stateOwnedFunds;//国有资金
                        this.stateOwnedFundsPercentage =  res.data.data.stateOwnedFundsPercentage;// 国有资金百分比
                        this.ownFunds = res.data.data.ownFunds;// 自有资金
                        this.ownFundsPercentage =  res.data.data.ownFundsPercentage;// 自有资金百分比
                        // 外国政府及组织资金
                        this.foreignGovernmentsAndOrganizationalFunds = res.data.data.foreignGovernmentsAndOrganizationalFunds;
                        // 外国政府及组织资金百分比
                        this.foreignGovernmentsAndOrganizationalFundsPercentage =  res.data.data.foreignGovernmentsAndOrganizationalFundsPercentage;
                        this.overseasPrivateInvestment = res.data.data.overseasPrivateInvestment;// 境外私人投资
                        // 境外私人投资百分比
                        this.overseasPrivateInvestmentPercentage =  res.data.data.overseasPrivateInvestmentPercentage;
                        
                        this.amountOfBiddingProject = res.data.data.amountOfBiddingProject;// 招标项目金额
                        this.biddingProcurementMode = res.data.data.biddingProcurementMode;// 招标采购方式
                        this.biddingOrganization = res.data.data.biddingOrganization;// 招标组织方式
                        this.typesOfBiddingProjects = res.data.data.typesOfBiddingProjects;// 招标项目类型
                        
                        this.budgetAmount = res.data.data.budgetAmount;// 招标项目预算金额 
                        this.amountId = res.data.data.totalProjectId;// 总包 入场项目编号
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
            // 初始化 查询
            getInitInfo(){
                let object={}
                if(this.projectObj.totalProjectId.indexOf("-") != -1 && this.projectObj.totalProjectId!=null){
                    // 入场项目分包编号
                    object={
                        entrySubcontractNumber:this.projectObj.totalProjectId,
                        noticeType:"招标公告",
                    }
                }else{
                    // 入场项目编号
                    object ={
                        projectCode:this.projectObj.totalProjectId,
                        noticeType:"招标公告",
                    }
                }
                return this.$axios({
                    method: "POST",
                    url: baseUrl+"/tenderNoticeController/select",
                    data:object
                }).then(res=>{
                    this.tenderNoticeId = res.data.data[0].tenderNoticeId;
                    if(res.data.status == 200){
                        this.resData = res.data.data;
                        this.areaList = res.data.data[0].items;
                        this.initList = res.data.data;
                        if(this.initList.length<=0 || res.data.data == null){
                            this.failShow = true;// 有保存和下一步的按钮
                            this.getOpenTime();// 如果有保存和下一步 开标时间为这个接口返回
                        }else {
                            this.initList.forEach(item=>{
                                if(item.state == '编辑中' || item.state == '办理未通过'){
                                    this.failShow = false;// 有保存和下一步的按钮
                                    this.showFlag = true;// 有上一步和提交的按钮
                                    this.tendereeAddress = item.tendereeAddress;// 招标人地址
                                    this.tendereePhone = item.tendereePhone;// 招标人联系方式
                                    this.noticeName = item.noticeName;// 公告名称
                                    this.enrollStartTime = formatTime(item.enrollStartTime);// 报名开始时间
                                    this.enrollEndTime = formatTime(item.enrollEndTime);// 报名结束时间
                                    this.tenderDocumentsSaleSite = item.tenderDocumentsSaleSite;// 招标文件发售地点
                                    this.tenderDocumentsCost = item.tenderDocumentsCost;// 招标文件工本费
                                    this.costAcceptAccount = item.costAcceptAccount;// 工本费接收账户
                                    this.bidderData = item.bidderData;// 投标人需提交资料
                                    this.submitTime = formatTime(item.submitTime);// 递交截止时间
                                    this.submitPlace = item.submitPlace;// 递交投标文件地点
                                    this.bidEvaluationStandard = item.bidEvaluationStandard;// 评标办法和标准
                                    this.projectLeader = item.projectLeader;// 项目负责人
                                    this.projectLeaderPhone = item.projectLeaderPhone;// 联系方式
                                    this.remark = item.remark;// 备注
                                    this.openingTime = formatTime(item.openingTime);// 开标时间


                                    this.saleReceiveStartDate = formatDate(item.saleReceiveStartDate);// 招标文件发售开始时间
                                    this.saleReceiveEndDate = formatDate(item.saleReceiveEndDate);// 招标文件发售结束时间
                                    
                                    // 上午发售时间
                                    this.saleStartTime = item.saleStartTime.split(',');
                                    this.morningbegin = this.saleStartTime[0];
                                    this.morningend = this.saleStartTime[1];
                                    // 下午发售时间
                                    this.saleEndTime = item.saleEndTime.split(',');
                                    this.afterbegin = this.saleEndTime[0];
                                    this.afterend = this.saleEndTime[1];
                                }else if(item.state == '待办理' || item.state == '办理通过') {
                                    this.failShow = false;// 有保存和下一步的按钮
                                    this.showFlag = true;// 有上一步和提交的按钮
                                    $('.box').hide();
                                }
                            })
                        }
                       
                    }else{
                        console.log(res.data.msg);
                    }
                }).catch(err=>{
                    console.log(err)
                })
            },
            // 开标时间
            getOpenTime(){
                let object={}
                if(this.projectObj.totalProjectId.indexOf("-") != -1 && this.projectObj.totalProjectId!=null){
                    // 入场项目分包编号
                    object={
                        entrySubcontractNumber:this.projectObj.totalProjectId,
                        type:"场地预约",
                    }
                }else{
                    // 入场项目编号
                    object ={
                        projectCode:this.projectObj.totalProjectId,
                        type:"场地预约",
                    }
                }
                this.$axios({
                    method: "POST",
                    url: baseUrl+"/siteReservationController/select",
                    data:object
                }).then(res=>{
                    this.makeList = res.data.data;
                    this.makeList.forEach(item=>{
                        this.assessmentTime = formatTime(item.assessmentTime);
                    })
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
    /* 弹窗页面样式 */
    .lookWrapper,.winWrapper,.searchWrapper{
        width: 100%;
        height: 100%;
        position: fixed;
        left: 185px;
        top: 0;
        background: rgba(0, 0, 0, .3);
        z-index: 99;
        padding: 50px;
    }
    .lookBox,.winBox,.searchBox{
        width: 87%;
        height: 100%;
        background: #fff;
        position: relative;
        overflow: hidden;
        overflow-y: scroll;
    }
    .look_title,.win_title,.search_title{
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
    
    /* 按钮样式 */
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
    .money{
        flex: 1;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .notic,h6,b{
        color:red;
    }
    .noteBox .noteContent {
        display: flex;
        width: 100%;
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
        color:#6e622e;
    }
    .noteTime{
        display: flex;
        width: 300px;
    }
    .noteline{
        display: flex;
    }
    .moneyBox{
        width: 200px;
    }
    .fail_box{
        width:100%;
        margin:0 auto;
        font-size: 24px;
        font-weight: bold;
        text-align: center;
        border-bottom: 1px dashed #333;
    }
    .newbox{
         width: 100%;
         height: 650px;
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
    .noteLast{
        width: 100%;
        display: flex;
        align-items: center;
    }
    .noteMain{
        display: flex;
        flex: 1;
    }
    .noteItem{
        display: flex;
        justify-content: space-between;
        flex: 1;
        background: #E1E1E1;
        align-items: center;
        padding: 0 10px;
        margin-left: 10px;
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
        flex: 1;
        display: flex;
        align-items: center;
        padding: 5px 0;
    }
    .editName{
        width: 145px;
        display: flex;
        justify-content: flex-end;
    }
    .star{
        color: #f00;
    }
    .editContent{
        flex: 1;
        display: flex;
        align-items: center;
        padding: 0 10px;
        color: #6e622e;
    }
    .editContent>p{
        width: 30%;
    }
    /* 文本框的样式 */
    .editTextarea{
        width: 100%;
        padding: 5px 0;
        display: flex;
    }
    .editTit{
        display: flex;
    }
    /* +分包信息 */
    .search_input{
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
        width: 120px;
        height: 40px;
    }
    .table_box{
        height: 200px;
        overflow-y: scroll;
    }
    /* 表格 */
    .infobox_item{
        padding: 10px 0 10px 0;
    }
    .infobox_item>table>tr{
        text-align: center;
    }
</style>