<template>
    <div class="myDiv">
        <div style="height:100%;">
            <div class="handle_main">
                <el-table :data="handleListData" stripe style="width: 100%"  @selection-change="handleSelectionChange">
                    <el-table-column type="selection" width="55" align='center'>
                    </el-table-column>
                    <el-table-column type="index" width="70" label="序号" :index="typeIndex">
                    </el-table-column>
                    <el-table-column  label="主题" width="500">
                        <template slot-scope="scope">
                            <span class="corlor_un" @click="judge(scope.row)">{{scope.row.theme}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="submitter" label="提交人">
                    </el-table-column>
                    <el-table-column prop="sendingTime" label="发送时间">
                    </el-table-column>
                    <el-table-column prop="operation" label="操作" width="110">
                        <template slot-scope="scope">
                            <el-button class="el_btn" size="small" @click="agree(scope.row)">同意</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column prop="operation" label="操作"  width="110">
                        <template slot-scope="scope">
                            <el-button size="small" @click="disAgree(scope.row)">不同意</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <!-- 分页 -->
            <div class="pagination">
            <template>
                <Page :total="totalSize" :current="currentPage" :page-size='10' show-elevator show-total @on-change="page"></Page>
                </template>
            </div>
        </div>
        <!-- 场地预约 -->
        <div class="mask" v-show="siteOrderShow"></div>
        <div class="new_pro" v-show="siteOrderShow">
            <div class="new_head">
                <div style="padding-left:10px;">查看开评标场地预约</div>
                <div @click="closejudgeShow()" style="font-size:28px;padding-right:10px;cursor:pointer;">×</div>
            </div>
            <div class="new_nav" v-if="this.titleTheme == '交易中心办理资审场地预约' ||this.titleTheme == '交易中心办理场地预约' ">
                <button class="nav_co nav_save">同意</button>
                <button class="nav_co nav_save">不同意</button>
            </div>
            <div  class="new_nav" v-if="this.titleTheme != '交易中心办理资审场地预约' ||this.titleTheme != '交易中心办理场地预约' ">
                <button class="nav_co nav_save" @click="sureBidRoom()">确定评标室</button>
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
                                <div class="table_box" >
                                    <el-table :data="subPackData" stripe style="width: 100%">
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
                                                <i class="el-icon-search" style="font-size:16px;cursor:pointer;" @click="lookFile(scope.row)"></i>
                                            </template>
                                        </el-table-column>
                                    </el-table>
                                </div>
                            </div>
                        </div>
                    </el-collapse-item>
                    <!-- 场地预约 -->
                    <el-collapse-item title="场地预约" name="2">
                            <div class="new_m_b">
                            <div class="new_m_b2">
                                <!--名称  -->
                                <div class="noteBox">
                                    <div class="noteContent">
                                        <div class="noteLeft">招标项目名称：</div>
                                        <div class="noteFlex">
                                            <el-input v-model="nameOfTenderProject"></el-input>
                                        </div>
                                    </div>
                                </div>
                                <!-- 开标时间及时长 -->
                                <div class="noteBox">
                                    <div class="noteContent">
                                    <div class="noteLeft"><span style="color:#f00;">*</span>开标时间：</div>
                                    <div class="noteFlex">
                                        <el-date-picker value-format="timestamp" v-model="assessmentTime" type="datetime"  placeholder="选择日期时间">
                                        </el-date-picker>
                                    </div>
                                    <div style="display: inline-flex;margin-left:30px;width:50%;">
                                        <span style="width:130px;">开标时长：</span>
                                        <el-select v-model="estimatedReviewDuration" placeholder="请选择">
                                            <el-option :value="0.25" :label="0.25">0.25</el-option>
                                            <el-option :value="0.5" :label="0.5">0.5</el-option>
                                            <el-option :value="1" :label="1">1</el-option>
                                        </el-select>
                                    </div>
                                    </div>
                                </div>
                                <!--开标室  -->
                                <div class="noteBox">
                                    <div class="noteContent">
                                        <div class="noteLeft"><span style="color:#f00;">*</span>开标室(请选择)：</div>
                                        <div class="noteFlex">
                                            <el-select v-model="openingRoom" placeholder="请选择">
                                                <el-option v-for="item in optionRoom" :key="item.value" :label="item.label" :value="item.value">
                                                </el-option>
                                            </el-select>
                                        </div>
                                    </div>
                                </div>
                                <div>注：实际开评标场地以交易中心现场大屏幕显示为准</div>
                                <!-- 是否预约评标室 -->
                                <div class="noteBox">
                                    <div class="noteContent">
                                        <div class="noteLeft">是否预约评标室：</div>
                                        <div class="noteFlex">
                                            <span>{{appointmentEvaluationRoom}}</span>
                                        </div>
                                    </div>
                                </div>
                                <!-- 配套服务 -->
                                <div class="noteBox">
                                    <div class="noteContent">
                                        <div class="noteLeft">配套服务：</div>
                                        <div class="noteFlex">
                                            <span>{{supportingServices}}</span>
                                        </div>
                                    </div>
                                </div>
                                <!-- 评标时间及时长 -->
                                <div class="noteBox">
                                    <div class="noteContent">
                                    <div class="noteLeft"><span style="color:#f00;">*</span>评标时间：</div>
                                    <div class="noteFlex">
                                        <el-date-picker value-format="timestamp" v-model="bidEvaluationTime" type="datetime"  placeholder="选择日期时间">
                                        </el-date-picker>
                                    </div>
                                    <div style="display: inline-flex;margin-left:30px;width:50%;">
                                        <span style="width:130px;">评标时长：</span>
                                        <el-select v-model="lengthOfTenderEvaluation" placeholder="请选择">
                                            <el-option :value="0.5" :label="0.5">0.5</el-option>
                                            <el-option :value="1" :label="1">1</el-option>
                                            <el-option :value="2" :label="2">2</el-option>
                                            <el-option :value="3" :label="3">3</el-option>
                                            <el-option :value="4" :label="4">4</el-option>
                                            <el-option :value="5" :label="5">5</el-option>
                                            <el-option :value="6" :label="6">6</el-option>
                                        </el-select>
                                    </div>
                                    </div>
                                </div>
                                <!-- 评标室选择 -->
                                <div class="noteBox">
                                    <div class="noteContent">
                                        <div class="noteLeft"><span style="color:#f00;">*</span>评标室(请选择)：</div>
                                        <div class="noteFlex">
                                            <el-select v-model="bidEvaluationRoom" placeholder="请选择">
                                                <el-option v-for="item in bidRoom" :key="item.value" :label="item.label" :value="item.value">
                                                </el-option>
                                            </el-select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            </div>
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
                    <!-- 第三步 -->
                    <el-collapse-item title="分包信息" name="2">
                        <div class="new_m_b">
                            <div class="new_m_b2">
                                <!-- 标段包编号(赋码) -->
                                <div class="noteBox">
                                    <div class="noteContent">
                                    <div class="noteLeft" style="color:#f00;">标段包编号(赋码)：</div>
                                    <div class="noteFlex">
                                        <span  style="color:#f00;">{{sectionPacketAssignment}}</span>
                                    </div>
                                    </div>
                                </div>
                                <!--统一交易标志码  -->
                                <div class="noteBox">
                                    <div class="noteContent">
                                    <div class="noteLeft" style="color:#f00;">统一交易标志码：</div>
                                    <div class="noteFlex">
                                        <span  style="color:#f00;">{{unifiedTradingCode}}</span>
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
        <!-- 评委抽取申请弹框 -->
        <div class="mask" v-show="judgeShow"></div>
        <div class="new_pro" v-show="judgeShow">
            <div class="new_head">
                <div style="padding-left:10px;">查看项目信息</div>
                <div @click="closejudgeShow()" style="font-size:28px;padding-right:10px;cursor:pointer;">×</div>
            </div>
            <div class="new_nav">
            <button class="nav_co nav_save">同意</button>
            <button class="nav_co nav_next">不同意</button>
            </div>
            <div class="new_main">
                <el-collapse v-model="activeName" accordion>
                    <!-- 第一步 -->
                    <el-collapse-item title="项目通知信息" name="1">
                        <div class="new_m_b">
                            <div class="new_m_b2">
                                <!--编号  -->
                                <div class="noteBox">
                                    <div class="noteContent">
                                        <div class="noteLeft">抽取编号：</div>
                                        <div class="noteFlex">
                                            <span>测试</span>
                                        </div>
                                    </div>
                                </div>
                                <!--项目名称  -->
                                <div class="noteBox">
                                    <div class="noteContent">
                                        <div class="noteLeft">项目名称：</div>
                                        <div class="noteFlex">
                                            <span>测试</span>
                                        </div>
                                    </div>
                                </div>
                                <!--项目编号  -->
                                <div class="noteBox">
                                    <div class="noteContent">
                                        <div class="noteLeft">项目编号：</div>
                                        <div class="noteFlex">
                                            <span>测试</span>
                                        </div>
                                    </div>
                                </div>
                                <!--招标项目编号  -->
                                <div class="noteBox">
                                    <div class="noteContent">
                                        <div class="noteLeft">招标项目编号(赋码)：</div>
                                        <div class="noteFlex">
                                            <span>测试</span>
                                        </div>
                                    </div>
                                </div>
                                <!-- 投资项目批复文号 -->
                                <div class="noteBox">
                                    <div class="noteContent">
                                        <div class="noteLeft">投资项目批复文号：</div>
                                        <div class="noteFlex">
                                            <span>测试</span>
                                        </div>
                                    </div>
                                </div>
                                <!--招标（采购）人  -->
                                <div class="noteBox">
                                    <div class="noteContent">
                                        <div class="noteLeft">招标（采购）人：</div>
                                        <div class="noteFlex">
                                            <span>测试</span>
                                        </div>
                                    </div>
                                </div>
                                <!--组织机构代码  -->
                                <div class="noteBox">
                                    <div class="noteContent">
                                        <div class="noteLeft">招标（采购）人组织机构代码：</div>
                                        <div class="noteFlex">
                                            <span>测试</span>
                                        </div>
                                    </div>
                                </div>
                                <!--采购方式及组织形式  -->
                                <div class="noteBox">
                                    <div class="noteContent">
                                        <div class="noteLeft">招标(采购)方式：</div>
                                        <div class="noteFlex">
                                            <span>131</span>
                                        </div>
                                        <div style="display: inline-flex;margin-left:30px;width:50%;">
                                            <span style="width:130px;">招标(采购)组织形式:</span>
                                            <span>部门</span>
                                        </div>
                                    </div>
                                </div>
                                <!-- 金额及类型 -->
                                <div class="noteBox">
                                    <div class="noteContent">
                                        <div class="noteLeft">投资金额：</div>
                                        <div class="noteFlex">
                                            <span>131</span>
                                        </div>
                                        <div style="display: inline-flex;margin-left:30px;width:50%;">
                                            <span style="width:130px;">招标类型:</span>
                                            <span>部门</span>
                                        </div>
                                    </div>
                                </div>
                                <!--项目及信息  -->
                                <div class="noteBox">
                                    <div class="noteContent">
                                        <div class="noteLeft">是否应急补抽项目：</div>
                                        <div class="noteFlex">
                                            <span>131</span>
                                        </div>
                                        <div style="display: inline-flex;margin-left:30px;width:50%;">
                                            <span style="width:130px;">是否更新抽取信息:</span>
                                            <span>部门</span>
                                        </div>
                                    </div>
                                </div>
                                <!--开标开始及结束时间  -->
                                <div class="noteBox">
                                    <div class="noteContent">
                                        <div class="noteLeft">开标开始时间：</div>
                                        <div class="noteFlex">
                                            <span>131</span>
                                        </div>
                                        <div style="display: inline-flex;margin-left:30px;width:50%;">
                                            <span style="width:130px;">开标结束时间:</span>
                                            <span>部门</span>
                                        </div>
                                    </div>
                                </div>
                                <!-- 评标开始及结束时间 -->
                                <div class="noteBox">
                                    <div class="noteContent">
                                        <div class="noteLeft">评标开始时间：</div>
                                        <div class="noteFlex">
                                            <span>131</span>
                                        </div>
                                        <div style="display: inline-flex;margin-left:30px;width:50%;">
                                            <span style="width:130px;">评标结束时间:</span>
                                            <span>部门</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </el-collapse-item>
                    <!-- 第二步 -->
                    <el-collapse-item title="抽取信息" name="2">
                        <div class="new_m_b">
                            <div class="new_m_b2">
                                <!-- 姓名及身份证 -->
                                <div class="noteBox">
                                    <div class="noteContent">
                                        <div class="noteLeft">经办人姓名：</div>
                                        <div class="noteFlex">
                                            <span>131</span>
                                        </div>
                                        <div style="display: inline-flex;margin-left:30px;width:50%;">
                                            <span style="width:130px;">经办人身份证号码:</span>
                                            <span>部门</span>
                                        </div>
                                    </div>
                                </div>
                                <!--联系电话  -->
                                <div class="noteBox">
                                    <div class="noteContent">
                                        <div class="noteLeft">联系电话：</div>
                                        <div class="noteFlex">
                                            <span>测试</span>
                                        </div>
                                    </div>
                                </div>
                                <!--评审及行业类型  -->
                                <div class="noteBox">
                                    <div class="noteContent">
                                        <div class="noteLeft">评审类型：</div>
                                        <div class="noteFlex">
                                            <span>131</span>
                                        </div>
                                        <div style="display: inline-flex;margin-left:30px;width:50%;">
                                            <span style="width:130px;">行业类型:</span>
                                            <span>部门</span>
                                        </div>
                                    </div>
                                </div>
                                <!--评标地点  -->
                                <div class="noteBox">
                                    <div class="noteContent">
                                        <div class="noteLeft">评标地点：</div>
                                        <div class="noteFlex">
                                            <span>测试</span>
                                        </div>
                                    </div>
                                </div>
                                <!--拟抽人数  -->
                                <div class="noteBox">
                                    <div class="noteContent">
                                        <div class="noteLeft">拟抽人数：</div>
                                        <div class="noteFlex">
                                            <span>测试</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </el-collapse-item>
                    <!-- 第三步 -->
                    <el-collapse-item title="回避信息" name="3">
                        <div>
                            <el-table :data="tableData" stripe style="width: 100%">
                                <el-table-column type="index" width="70" label="编号" :index="typeIndex">
                                </el-table-column>
                                <el-table-column prop="totalProjectId" label="回避单位名称" width="150">
                                </el-table-column>
                                <el-table-column prop="nameOfTenderProject" label="回避单位机构代码" width="170">
                                </el-table-column>
                                <el-table-column prop="biddingProjectNumber" label="回避原因">
                                </el-table-column>
                            </el-table>
                        </div>
                    </el-collapse-item>
                    <!-- 第四步 -->
                    <el-collapse-item title="专业信息" name="4">
                        <div>
                            <el-table :data="tableData" stripe style="width: 100%">
                                <el-table-column type="index" width="70" label="序号" :index="typeIndex">
                                </el-table-column>
                                <el-table-column prop="totalProjectId" label="专业名称" width="150">
                                </el-table-column>
                                <el-table-column prop="nameOfTenderProject" label="替补专业名称" width="170">
                                </el-table-column>
                                <el-table-column prop="biddingProjectNumber" label="专业等级">
                                </el-table-column>
                                <el-table-column prop="biddingProjectNumber" label="执业资格">
                                </el-table-column>
                                <el-table-column prop="biddingProjectNumber" label="是否具有电子评标能力">
                                </el-table-column>
                                <el-table-column prop="biddingProjectNumber" label="抽取人数">
                                </el-table-column>
                            </el-table>
                        </div>
                    </el-collapse-item>
                    <!-- 第五步 -->
                    <el-collapse-item title="专家信息" name="5">
                        <div>
                            <el-table :data="tableData" stripe style="width: 100%">
                                <el-table-column type="index" width="70" label="序号" :index="typeIndex">
                                </el-table-column>
                                <el-table-column prop="totalProjectId" label="专家证书编号" width="150">
                                </el-table-column>
                                <el-table-column prop="nameOfTenderProject" label="专家身份证号码" width="170">
                                </el-table-column>
                                <el-table-column prop="biddingProjectNumber" label="专家姓名">
                                </el-table-column>
                                <el-table-column prop="biddingProjectNumber" label="当前工作单位">
                                </el-table-column>
                                <el-table-column prop="biddingProjectNumber" label="手机号码">
                                </el-table-column>
                            </el-table>
                        </div>
                    </el-collapse-item>
                    <!-- 第六步 -->
                    <el-collapse-item title="附件信息" name="6">
                        <div>
                            <el-table :data="tableData" stripe style="width: 100%">
                                <el-table-column type="index" width="70" label="序号" :index="typeIndex">
                                </el-table-column>
                                <el-table-column prop="totalProjectId" label="电子名称" width="150">
                                </el-table-column>
                                <el-table-column prop="nameOfTenderProject" label="电子件列表(点击查看)" width="170">
                                </el-table-column>
                                <el-table-column prop="biddingProjectNumber" label="管理">
                                </el-table-column>
                                <el-table-column prop="biddingProjectNumber" label="说明">
                                </el-table-column>
                            </el-table>
                        </div>
                    </el-collapse-item>
                    <!-- 第七步 -->
                    <el-collapse-item title="处理历史" name="7">
                        <div>
                            <el-table :data="tableData" stripe style="width: 100%">
                                <el-table-column type="index" width="70" label="序号" :index="typeIndex">
                                </el-table-column>
                                <el-table-column prop="totalProjectId" label="步骤" width="150">
                                </el-table-column>
                                <el-table-column prop="nameOfTenderProject" label="办理人员" width="140">
                                </el-table-column>
                                <el-table-column prop="biddingProjectNumber" label="操作">
                                </el-table-column>
                                <el-table-column prop="biddingProjectNumber" label="收到时间">
                                </el-table-column>
                                <el-table-column prop="biddingProjectNumber" label="处理时间">
                                </el-table-column>
                                <el-table-column prop="biddingProjectNumber" label="处理意见">
                                </el-table-column>
                            </el-table>
                        </div>
                    </el-collapse-item>
                </el-collapse>
            </div>
        </div>
        <!-- 答疑文件备案弹框 -->
        <div class="mask" v-show="answerShow"></div>
        <div class="new_pro" v-show="answerShow">
            <div class="new_head">
                <div style="padding-left:10px;">查看答疑澄清文件(第1次答疑)</div>
                <div @click="closeAnswerShow()" style="font-size:28px;padding-right:10px;cursor:pointer;">×</div>
            </div>
            <div class="new_nav">
            <button class="nav_co nav_save">同意</button>
            <button class="nav_co nav_next">不同意</button>
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
                                            <span>测试</span>
                                        </div>
                                    </div>
                                </div>
                                <!--采购人及金额  -->
                                <div class="noteBox">
                                    <div class="noteContent">
                                        <div class="noteLeft">招标(采购)人：</div>
                                        <div class="noteFlex">
                                            <span>131</span>
                                        </div>
                                        <div style="display: inline-flex;margin-left:30px;width:50%;">
                                            <span style="width:130px;">招标项目金额(万元):</span>
                                            <span>部门</span>
                                        </div>
                                    </div>
                                </div>
                                <!--招标及入场编号  -->
                                <div class="noteBox">
                                    <div class="noteContent">
                                        <div class="noteLeft">招标项目编号：</div>
                                        <div class="noteFlex">
                                            <span>131</span>
                                        </div>
                                        <div style="display: inline-flex;margin-left:30px;width:50%;">
                                            <span style="width:130px;">入场项目编号:</span>
                                            <span>部门</span>
                                        </div>
                                    </div>
                                </div>
                                <!-- 表格 -->
                                <div>
                                    <el-table :data="tableData" stripe style="width: 100%">
                                        <el-table-column type="index" width="70" label="编号" :index="typeIndex">
                                        </el-table-column>
                                        <el-table-column prop="totalProjectId" label="入场(分包)编号" width="150">
                                        </el-table-column>
                                        <el-table-column prop="nameOfTenderProject" label="分包名称" width="170">
                                        </el-table-column>
                                        <el-table-column prop="biddingProjectNumber" label="分包控制金额(万元)">
                                        </el-table-column>
                                        <el-table-column prop="operation" label="操作">
                                            <template slot-scope="scope">
                                            <el-button type="text" size="small">查看</el-button>
                                            </template>
                                        </el-table-column>
                                    </el-table>
                                </div>
                            </div>
                        </div>
                    </el-collapse-item>
                    <!-- 第二步 -->
                    <el-collapse-item title="答疑信息" name="2">
                        <div class="new_m_b">
                            <div class="new_m_b2">
                                <!-- 开标时间及地点 -->
                                <div class="noteBox">
                                    <div class="noteContent">
                                        <div class="noteLeft">当前开标时间：</div>
                                        <div class="noteFlex">
                                            <span>131</span>
                                        </div>
                                        <div style="display: inline-flex;margin-left:30px;width:50%;">
                                            <span style="width:130px;">开标地点:</span>
                                            <span>部门</span>
                                        </div>
                                    </div>
                                </div>
                                <!-- 答疑类型 -->
                                <div class="noteBox">
                                    <div class="noteContent">
                                        <div class="noteLeft">答疑类型：</div>
                                        <div class="noteFlex">
                                            <span>测试</span>
                                        </div>
                                    </div>
                                </div>
                                <!--主要修改内容  -->
                                <div class="noteBox">
                                    <div class="noteContent">
                                        <div class="noteLeft">答疑类型：</div>
                                        <div class="noteFlex">
                                            <span>测试</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </el-collapse-item>
                    <!-- 第三步 -->
                    <el-collapse-item title="相关附件" name="3">
                        <div>
                            <el-table :data="tableData" stripe style="width: 100%">
                                <el-table-column type="index" width="70" label="序号" :index="typeIndex">
                                </el-table-column>
                                <el-table-column prop="totalProjectId" label="附件名称" width="150">
                                </el-table-column>
                                <el-table-column prop="nameOfTenderProject" label="附件列表(点击查看)">
                                </el-table-column>
                            </el-table>
                        </div>
                    </el-collapse-item>
                    <!-- 第四步 -->
                    <el-collapse-item title="澄清与修改历史" name="4">
                        <div style="color:#ccc;padding-top:10px;">
                            暂无澄清与修改历史！
                        </div>
                    </el-collapse-item>
                    <!-- 第五步 -->
                    <el-collapse-item title="办理记录" name="5">
                        <div>
                            <el-table :data="tableData" stripe style="width: 100%">
                                <el-table-column type="index" width="70" label="序号" :index="typeIndex">
                                </el-table-column>
                                <el-table-column prop="totalProjectId" label="步骤" width="150">
                                </el-table-column>
                                <el-table-column prop="nameOfTenderProject" label="办理人员" width="140">
                                </el-table-column>
                                <el-table-column prop="biddingProjectNumber" label="时间">
                                </el-table-column>
                                <el-table-column prop="biddingProjectNumber" label="状态">
                                </el-table-column>
                                <el-table-column prop="biddingProjectNumber" label="备注">
                                </el-table-column>
                            </el-table>
                        </div>
                    </el-collapse-item>
                </el-collapse>
            </div>
        </div>
        <!-- 项目分包弹框 -->
        <div class="mask" v-show="subcontractShow"></div>
        <div class="new_pro" v-show="subcontractShow">
                <div class="new_head">
                    <div style="padding-left:10px;">查看项目分包</div>
                    <div @click="closeSubcontractShow()" style="font-size:28px;padding-right:10px;cursor:pointer;">×</div>
                </div>
                <div class="new_nav">
                    <button class="nav_co nav_save">同意</button>
                    <button class="nav_co nav_next">不同意</button>
                </div>
                <div  class="new_main">
                    <el-collapse v-model="activeName" accordion>
                        <!-- 第一步 -->
                        <el-collapse-item title="招标项目信息" name="1">
                            <div class="new_m_b">
                                <div class="new_m_b2">
                                    <!--项目编号(赋码)  -->
                                    <div class="noteBox">
                                        <div class="noteContent">
                                            <div class="noteLeft" style="color: #f00;">项目编号(赋码)：</div>
                                            <div class="noteFlex">
                                                <span  style="color: #f00;">测试</span>
                                            </div>
                                        </div>
                                    </div>
                                    <!--招标项目编号(赋码)  -->
                                    <div class="noteBox">
                                        <div class="noteContent">
                                            <div class="noteLeft" style="color: #f00;">招标项目编号(赋码)：</div>
                                            <div class="noteFlex">
                                                <span  style="color: #f00;">测试</span>
                                            </div>
                                        </div>
                                    </div>
                                    <!--名称  -->
                                    <div class="noteBox">
                                        <div class="noteContent">
                                            <div class="noteLeft">招标项目名称：</div>
                                            <div class="noteFlex">
                                                <span>测试</span>
                                            </div>
                                        </div>
                                    </div>
                                    <!--招标及入场编号  -->
                                    <div class="noteBox">
                                        <div class="noteContent">
                                            <div class="noteLeft">招标项目编号：</div>
                                            <div class="noteFlex">
                                                <span>131</span>
                                            </div>
                                            <div style="display: inline-flex;margin-left:30px;width:50%;">
                                                <span style="width:130px;">入场项目编号:</span>
                                                <span>部门</span>
                                            </div>
                                        </div>
                                    </div>
                                    <!--采购类型及金额  -->
                                    <div class="noteBox">
                                        <div class="noteContent">
                                            <div class="noteLeft">招标项目金额：</div>
                                            <div class="noteFlex">
                                                <span>131</span>
                                            </div>
                                            <div style="display: inline-flex;margin-left:30px;width:50%;">
                                                <span style="width:130px;">招标项目类型:</span>
                                                <span>部门</span>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- 采购方式及组织方式 -->
                                    <div class="noteBox">
                                        <div class="noteContent">
                                            <div class="noteLeft">招标采购方式：</div>
                                            <div class="noteFlex">
                                                <span>131</span>
                                            </div>
                                            <div style="display: inline-flex;margin-left:30px;width:50%;">
                                                <span style="width:130px;">招标组织方式:</span>
                                                <span>部门</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </el-collapse-item>
                        <!-- 第二步 -->
                        <el-collapse-item title="附件" name="2">
                            <div>
                                <el-table :data="tableData" stripe style="width: 100%">
                                    <el-table-column type="index" width="70" label="序号" :index="typeIndex">
                                    </el-table-column>
                                    <el-table-column prop="totalProjectId" label="附件名称" width="150">
                                    </el-table-column>
                                    <el-table-column prop="nameOfTenderProject" label="附件列表(点击查看)">
                                    </el-table-column>
                                </el-table>
                            </div>
                        </el-collapse-item>
                        <!-- 第三步 -->
                        <el-collapse-item title="分包信息" name="3">
                            <div>
                                <el-table :data="tableData" stripe style="width: 100%">
                                    <el-table-column type="index" width="70" label="序号" :index="typeIndex">
                                    </el-table-column>
                                    <el-table-column prop="totalProjectId" label="入场项目(分包)编号" width="150">
                                    </el-table-column>
                                    <el-table-column prop="nameOfTenderProject" label="分包名称">
                                    </el-table-column>
                                    <el-table-column prop="nameOfTenderProject" label="分包控制金额(万元)">
                                    </el-table-column>
                                    <el-table-column prop="nameOfTenderProject" label="创建时间">
                                    </el-table-column>
                                    <el-table-column prop="operation" label="查看">
                                        <template slot-scope="scope">
                                        <el-button type="text" size="small" @click="look()">查看</el-button>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </div>
                        </el-collapse-item>
                        <!-- 第四步 -->
                        <el-collapse-item title="相关分包信息" name="4">
                            <div>
                                <el-table :data="tableData" stripe style="width: 100%">
                                    <el-table-column type="index" width="70" label="序号" :index="typeIndex">
                                    </el-table-column>
                                    <el-table-column prop="totalProjectId" label="入场项目(分包)编号" width="150">
                                    </el-table-column>
                                    <el-table-column prop="nameOfTenderProject" label="分包名称">
                                    </el-table-column>
                                    <el-table-column prop="nameOfTenderProject" label="分包控制金额(万元)">
                                    </el-table-column>
                                    <el-table-column prop="nameOfTenderProject" label="创建时间">
                                    </el-table-column>
                                    <el-table-column prop="operation" label="查看">
                                        <template slot-scope="scope">
                                        <el-button type="text" size="small" @click="look()">查看</el-button>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </div>
                        </el-collapse-item>
                        <!-- 第五步 -->
                        <el-collapse-item title="办理记录" name="5">
                            <div>
                                <el-table :data="tableData" stripe style="width: 100%">
                                    <el-table-column type="index" width="70" label="序号" :index="typeIndex">
                                    </el-table-column>
                                    <el-table-column prop="totalProjectId" label="步骤" width="150">
                                    </el-table-column>
                                    <el-table-column prop="nameOfTenderProject" label="办理人员" width="140">
                                    </el-table-column>
                                    <el-table-column prop="biddingProjectNumber" label="时间">
                                    </el-table-column>
                                    <el-table-column prop="biddingProjectNumber" label="状态">
                                    </el-table-column>
                                    <el-table-column prop="biddingProjectNumber" label="备注">
                                    </el-table-column>
                                </el-table>
                            </div>
                        </el-collapse-item>
                    </el-collapse>
                </div>
        </div>
        <!-- 项目注册弹框 -->
        <div class="mask" v-show="registerShow"></div>
        <div class="new_pro" v-show="registerShow">
                <div class="new_head">
                    <div style="padding-left:10px;">查看项目入场登记信息</div>
                    <div @click="closeRegisterShow()" style="font-size:28px;padding-right:10px;cursor:pointer;">×</div>
                </div>
                <div class="new_nav">
                    <button class="nav_co nav_save">同意</button>
                    <button class="nav_co nav_next">不同意</button>
                    <button class="nav_co nav_next">存为PDF</button>
                </div>
                <div class="new_main">
                    <el-collapse v-model="activeName" accordion>
                        <!-- 第一步 -->
                        <el-collapse-item title="立项基本信息" name="1">
                            <div class="new_m_b">
                                <div class="new_m_b2">
                                    <!-- 批复名称 -->
                                    <div class="noteBox">
                                        <div class="noteContent">
                                            <div class="noteLeft">批复项目名称：</div>
                                            <div class="noteFlex">
                                                <span>测试</span>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- 批复文号和部门 -->
                                    <div class="noteBox">
                                        <div class="noteContent">
                                            <div class="noteLeft">批复文号：</div>
                                            <div class="noteFlex">
                                                <span>131</span>
                                            </div>
                                            <div style="display: inline-flex;margin-left:30px;width:50%;">
                                                <span style="width:130px;">批复核准部门:</span>
                                                <span>部门</span>
                                            </div>
                                        </div>
                                    </div>
                                    <!--监督部门和审核部门  -->
                                    <div class="noteBox">
                                        <div class="noteContent">
                                            <div class="noteLeft">监督部门：</div>
                                            <div class="noteFlex">
                                                <span>131</span>
                                            </div>
                                            <div style="display: inline-flex;margin-left:30px;width:50%;">
                                                <span style="width:130px;">审核部门:</span>
                                                <span>部门</span>
                                            </div>
                                        </div>
                                    </div>
                                    <!--项目所在地及审批权限  -->
                                    <div class="noteBox">
                                        <div class="noteContent">
                                            <div class="noteLeft">项目所在地：</div>
                                            <div class="noteFlex">
                                                <span>131</span>
                                            </div>
                                            <div style="display: inline-flex;margin-left:30px;width:50%;">
                                                <span style="width:130px;">审核权限:</span>
                                                <span>部门</span>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- 是否涉密  -->
                                    <div class="noteBox">
                                        <div class="noteContent">
                                            <div class="noteLeft">是否涉密：</div>
                                            <div class="noteFlex">
                                                <span>是</span>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- 工程性质 -->
                                    <div class="noteBox">
                                        <div class="noteContent">
                                            <div class="noteLeft">工程性质：</div>
                                            <div class="noteFlex">
                                                <span>工程</span>
                                            </div>
                                            <div style="display: inline-flex;margin-left:30px;width:50%;">
                                                <span style="width:240px;">是否为政府和社会资本合作PPP类项目:</span>
                                                <span style="height:40px;line-height:40px;">
                                                    <span>否</span>
                                            </span>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- 资金来源 -->
                                    <div class="noteBox">
                                        <div class="noteContent">
                                            <div class="noteLeft">资金来源：</div>
                                                <div class="noteFlex">
                                                    <span>固定资产投资</span>
                                                </div>
                                            <div style="display: inline-flex;margin-left:30px;width:50%;">
                                                <span style="width:100px;">项目资金总额:</span>
                                                <span>10万元</span>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- 资金构成 -->
                                    <div style="display:flex;justify-content: flex-start;width:100%;">
                                        <div>资金构成：</div>  
                                        <div style="display:flex;">
                                            <span style="width:70px;line-height:30px;">国有资金：</span><span style="line-height:30px;">2</span><span style="width:33px;line-height:30px;">万元</span>
                                            <span style="line-height:30px;">10</span><span style="margin-right:40px;line-height:30px;">%</span>
                                            <span style="width:70px;line-height:30px;">自有资金：</span><span style="line-height:30px;">60</span><span style="width:33px;line-height:30px;">万元</span>
                                            <span style="line-height:30px;">10</span><span style="line-height:30px;">%</span>
                                        </div>
                                    </div>
                                    <div style="display:flex;justify-content: flex-start;width:100%;margin-top:10px;margin-left:65px;">
                                        <div style="display:flex;">
                                            <span style="width:140px;line-height:30px;">外国政府及组织资金：</span><span style="line-height:30px;">20</span><span style="width:33px;line-height:30px;">万元</span>
                                            <span style="line-height:30px;">10</span><span style="margin-right:40px;line-height:30px;">%</span>
                                            <span style="width:100px;line-height:30px;">境外私人投资：</span><span style="line-height:30px;">30</span><span style="width:33px;line-height:30px;">万元</span>
                                            <span style="line-height:30px;">10</span><span style="line-height:30px;">%</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </el-collapse-item>
                        <!-- 第二步 -->
                        <el-collapse-item title="附件" name="2">
                            <div class="new_m_b">
                                <div class="new_m_b2">
                                    <el-table :data="enclosureData" stripe style="width: 100%">
                                        <el-table-column  prop="name"  label="附件名称" width="200">
                                        </el-table-column>
                                        <el-table-column prop="list" label="附件列表(点击查看)">
                                        </el-table-column>
                                        <el-table-column fixed="right" label="操作" width="100">
                                            <template slot-scope="scope">
                                                <i class="el-icon-setting"  style="cursor: pointer;" @click="shezhi()"></i>
                                            </template>
                                        </el-table-column>
                                    </el-table>
                                </div>
                            </div>
                        </el-collapse-item>
                        <!-- 第三步 -->
                        <el-collapse-item title="项目基本信息" name="3">
                            <div class="new_m_b">
                                <div class="new_m_b2">
                                    <!-- 审批文件名称 -->
                                    <div class="noteBox">
                                        <div class="noteContent">
                                            <div class="noteLeft">项目审批文件名称：</div>
                                            <div class="noteFlex">
                                                <span>名称</span>
                                            </div>
                                            <div style="display: inline-flex;margin-left:30px;width:50%;">
                                                <span style="width:150px;">北京投资项目统一代码:</span>
                                                <span>354135415</span>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- 项目法人 -->
                                    <div class="noteBox">
                                        <div class="noteContent">
                                            <div class="noteLeft">项目法人：</div>
                                            <div class="noteFlex">
                                                <span>法人</span>
                                            </div>
                                            <div style="display: inline-flex;margin-left:30px;width:50%;">
                                                <span style="width:100px;">项目法人代码:</span>
                                                <span>545311</span>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- 项目行业分类 -->
                                    <div class="noteBox">
                                        <div class="noteContent">
                                            <div class="noteLeft">项目行业分类：</div>
                                            <div class="noteFlex">
                                                <span>农业</span>
                                            </div>
                                        </div>
                                    </div>
                                    <!--项目规模  -->
                                    <div class="noteBox">
                                        <div class="noteContent">
                                            <div class="noteLeft">项目规模：</div>
                                            <div class="noteFlex">
                                                <span>大</span>
                                            </div>
                                            <div style="display: inline-flex;margin-left:30px;width:50%;">
                                                <span style="width:100px;">项目建立时间:</span>
                                                <span>2018年03月10日 12时50分</span>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- 联系人 -->
                                    <div class="noteBox">
                                        <div class="noteContent">
                                            <div class="noteLeft">联系人：</div>
                                            <div class="noteFlex">
                                                <span>联系</span>
                                            </div>
                                            <div style="display: inline-flex;margin-left:30px;width:50%;">
                                                <span style="width:90px;">联系方式:</span>
                                                <span>13546135461</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </el-collapse-item>
                        <!-- 第四步 -->
                        <el-collapse-item title="项目预算信息" name="4">
                            <div class="new_m_b">
                                <div class="new_m_b2">
                                    <!-- 项目名称 -->
                                    <div class="noteBox">
                                        <div class="noteContent">
                                            <div class="noteLeft">项目名称：</div>
                                            <div class="noteFlex">
                                                <span>项目</span>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- 预算项目 -->
                                    <div class="noteBox">
                                        <div class="noteContent">
                                            <div class="noteLeft">预算项目批准备案文号：</div>
                                            <div class="noteFlex">
                                                <span>3351</span>
                                            </div>
                                            <div style="display: inline-flex;margin-left:30px;width:50%;">
                                                <span style="width:100px;">预算受文单位:</span>
                                                <span>单位</span>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- 预算受文单位代码 -->
                                    <div class="noteBox">
                                        <div class="noteContent">
                                            <div class="noteLeft">预算受文单位代码：</div>
                                            <div class="noteFlex">
                                                <span>644141</span>
                                            </div>
                                            <div style="display: inline-flex;margin-left:30px;width:50%;">
                                                <span style="width:90px;">预算金额:</span>
                                                <span>54万元</span>
                                            </div>
                                        </div>
                                    </div>
                                    <!--采购人名称  -->
                                    <div class="noteBox">
                                        <div class="noteContent">
                                            <div class="noteLeft">采购人名称：</div>
                                            <div class="noteFlex">
                                                <span>校长</span>
                                            </div>
                                            <div style="display: inline-flex;margin-left:30px;width:50%;">
                                                <span style="width:90px;">采购人代码:</span>
                                                <span>2121</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </el-collapse-item>
                        <!--第五步 -->
                        <el-collapse-item title="招标项目信息" name="5">
                            <div class="new_m_b">
                                <div class="new_m_b2">
                                    <!-- 入场项目编号 -->
                                    <div class="noteBox">
                                        <div class="noteContent">
                                            <div class="noteLeft">入场项目编号：</div>
                                            <div class="noteFlex">
                                                <span>01</span>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- 招标项目名称 -->
                                    <div class="noteBox">
                                        <div class="noteContent">
                                            <div class="noteLeft">招标项目名称：</div>
                                            <div class="noteFlex">
                                                <span>名称</span>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- 招标项目遍号 -->
                                    <div class="noteBox">
                                        <div class="noteContent">
                                            <div class="noteLeft">招标项目编号：</div>
                                            <div class="noteFlex">
                                                <span>323</span>
                                            </div>
                                            <div style="display: inline-flex;margin-left:30px;width:50%;">
                                                <span style="width:100px;">招标项目金额:</span>
                                                <span>10万元</span>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- 招标采购方式 -->
                                    <div class="noteBox">
                                        <div class="noteContent">
                                            <div class="noteLeft">招标采购方式：</div>
                                            <div class="noteFlex">
                                                <span>自行采购</span>
                                            </div>
                                            <div style="display: inline-flex;margin-left:30px;width:50%;">
                                                <span style="width:100px;">招标组织方式:</span>
                                                <span>组织</span>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- 招标项目类型 -->
                                    <div class="noteBox">
                                        <div class="noteContent">
                                            <div class="noteLeft">招标项目类型：</div>
                                            <div class="noteFlex">
                                                <span>类型</span>
                                            </div>
                                            <div style="display: inline-flex;margin-left:30px;width:50%;">
                                                <span style="width:80px;">专业类别:</span>
                                                <span>类别</span>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- 是否公布预算 -->
                                    <div class="noteBox">
                                        <div class="noteContent">
                                            <div class="noteLeft">是否涉密：</div>
                                            <div class="noteFlex">
                                                <span>否</span>
                                            </div>
                                            <div style="display: inline-flex;width:340px;width:50%;">
                                                <span>是否分包：</span>
                                                <span>否</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </el-collapse-item>
                        <!--第六步 -->
                        <el-collapse-item title="委托代理协议" name="6">
                            <div class="new_m_b">
                                <div class="new_m_b2">
                                    <!-- 委托代理协议名称 -->
                                    <div class="noteBox">
                                        <div class="noteContent">
                                            <div class="noteLeft">委托代理协议名称：</div>
                                            <div class="noteFlex">
                                                <span>01</span>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- 招标（采购）人 -->
                                    <div class="noteBox">
                                        <div class="noteContent">
                                            <div class="noteLeft">招标（采购）人：</div>
                                            <div class="noteFlex">
                                                <span>01</span>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- 联系人及方式 -->
                                    <div class="noteBox">
                                        <div class="noteContent">
                                            <div class="noteLeft">项目联系人：</div>
                                            <div class="noteFlex">
                                                <span>自行采购</span>
                                            </div>
                                            <div style="display: inline-flex;margin-left:30px;width:50%;">
                                                <span style="width:100px;">联系方式:</span>
                                                <span>组织</span>
                                            </div>
                                        </div>
                                    </div>
                                    <!--招标(采购)代理机构  -->
                                    <div class="noteBox">
                                        <div class="noteContent">
                                            <div class="noteLeft">招标(采购)代理机构：</div>
                                            <div class="noteFlex">
                                                <span>01</span>
                                            </div>
                                        </div>
                                    </div>
                                    <!--项目负责人及电话  -->
                                    <div class="noteBox">
                                        <div class="noteContent">
                                            <div class="noteLeft">项目负责人：</div>
                                            <div class="noteFlex">
                                                <span>自行采购</span>
                                            </div>
                                            <div style="display: inline-flex;margin-left:30px;width:50%;">
                                                <span style="width:100px;">负责人联系电话:</span>
                                                <span>组织</span>
                                            </div>
                                        </div>
                                    </div>
                                    <!--委托代理服务期限  -->
                                    <div class="noteBox">
                                        <div class="noteContent">
                                            <div class="noteLeft">委托代理服务期限：</div>
                                            <div class="noteFlex">
                                                <span>01</span>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- 委托代理金额及收费金额 -->
                                    <div class="noteBox">
                                        <div class="noteContent">
                                            <div class="noteLeft">委托代理金额：</div>
                                            <div class="noteFlex">
                                                <span>自行采购</span>
                                            </div>
                                            <div style="display: inline-flex;margin-left:30px;width:50%;">
                                                <span style="width:100px;">委托代理服务收费金额:</span>
                                                <span>组织</span>
                                            </div>
                                        </div>
                                    </div>
                                    <!--委托代理协议权限  -->
                                    <div class="noteBox">
                                        <div class="noteContent">
                                            <div class="noteLeft">委托代理协议权限：</div>
                                            <div class="noteFlex">
                                                <span>01</span>
                                            </div>
                                        </div>
                                    </div>
                                    <!--其他  -->
                                    <div class="noteBox">
                                        <div class="noteContent">
                                            <div class="noteLeft">其他：</div>
                                            <div class="noteFlex">
                                                <span>01</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </el-collapse-item>
                        <!-- 第七步 -->
                        <el-collapse-item title="办理记录" name="7">
                            <div class="new_m_b">
                                <div class="new_m_b2">
                                    <el-table :data="tableData" style="width: 100%">
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
        <!-- 审核通过弹窗 -->
        <el-dialog title="请输入意见" :visible.sync="saveBox" width="40%" :before-close="handleClose">
            <div class="icon">
                <el-input type="textarea" v-model="remarks"></el-input>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="sureSave()">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 审核不通过弹窗 -->
        <el-dialog title="请输入不同意原因" :visible.sync="failBox"  width="40%" :before-close="handleClose">
            <div class="icon">
                <el-input type="textarea" v-model="remarks"></el-input>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="failSave()">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import baseUrl from '../../api/api'
import dayjs from "dayjs"
export default {
  components:{},
  props:{},
  data(){
    return {
        lengthOfTenderEvaluation:'',//评标时长
        bidEvaluationTime:'',//评标时间
        bidEvaluationRoom:'',//评标室
        titleTheme:'',//获取主题名称
        remarks:'',//意见
        failBox:false,//审核不通过弹框
        saveBox:false,//通过弹框
        searchTime:'',//查询时间
        topital:'',//查询主题
        theme:'',//主题
        projectInformaPrimaryKeyId:"",//点击返回id
        handleListData:[],//代办事项列表
        sendingTime:'',//待办事项时间
        toDoListId:'',//查询代办事项返回的id,代办记录Id
        referenceId:'',//业务环节的id字段
        nameOfTenderProject:'',//招标项目名称
        nameOfPurchaser:'',//招标采购人
        amountOfBiddingProject:'',//招标项目金额
        biddingProjectNumber:'',//招标项目编号
        totalProId:'',//入场项目编号
        sectionPacketAssignment:'',//标段号编号
        unifiedTradingCode:'',//统一交易标志码
        entrySubcontractNumber:'',//入场项目分包编号
        subcontractingControlAmount:'',//分包控制金额
        qualificationExaminationMethod:'',//资格审查方式
        electronicBidEvaluation:'',//电子化开评标
        subcontractName:'',//分包名称
        subcontractContents:'',//分包内容
        scopeOfTender:'',//招标范围
        assessmentTime:'',//开标时间
        estimatedReviewDuration:'',//开标时长
        openingRoom:"",//开标室选择
        optionRoom:[],//开标室数据
        appointmentEvaluationRoom:'',//是否预约评标室
        supportingServices:'',//配套服务
        handleRecordData:[],//办理记录
        subPackData:[],//分包数据
        siteOrderShow:false,//场地预约弹框
        subcontractInforShow:false,//分包信息弹框
        judgeShow:false,//评委抽取申请弹框
        answerShow:false,//答疑文件备案弹框
        subcontractShow:false,//项目分包弹框
        registerShow:false,//项目注册弹框
        activeName:'1',//折叠
        tableData:[
        {
            totalProjectId: '2016-05-02',
            nameOfTenderProject: '王小虎',
            biddingProjectNumber: '上海市普陀',
            nameOfPurchaser:'分类',
            state:'未通过',
            biddingProcurementMode:'未发布',
            biddingProcurementMode:'2019年3月1日'
          }
      ],//列表数据
      currentPage:1,//当前页
      pagesize: 10, //每页条数
      pageTotal: 0, //总页数
      totalSize: 0, //总条数
      enclosureData:[],//附件数据
      entryNum:'',//获取项目编号
      axiosUrl:'',//url
      params:{},
      bidRoom:[//评标室
          {
              value:'第一开标室',
              label:'第一开标室'
          },
          {
              value:'第二开标室',
              label:'第二开标室'
          },
          {
              value:'第三开标室',
              label:'第三开标室'
          },
          {
              value:'第四开标室',
              label:'第四开标室'
          },
          {
              value:'第一评标室',
              label:'第一评标室'
          },
          {
              value:'第二评标室',
              label:'第二评标室'
          },
          {
              value:'第三评标室',
              label:'第三评标室'
          },
          {
              value:'第四评标室',
              label:'第四评标室'
          },
      ]
    //   typeArr:{
    //       '中标结果公告':{
    //           url:'/ownerExpertsController/approval',
    //           params:{
    //               expertsMainId:'123465',
    //               answer:'同意'
    //           }
    //       }
    //   },
      
    }
  },
  watch:{},
  computed:{},
  methods:{
    //查询代办理事项列表
    getHandleList(){
        this.$axios({
            method:'POST',
            url:baseUrl + '/toDoListController/select',
            data:{
                pageNo: this.currentPage,
                pageSize: this.pagesize,
                state: "待办理"
            }
        }).then(res=>{
            if(res.data.status == 200){
                this.handleListData = res.data.data.list;
                this.handleListData.map((item,index)=>{
                    item.sendingTime = dayjs(item.sendingTime).format('YYYY-MM-DD HH:mm:ss');
                })
                this.totalSize = res.data.data.total;
            }else{
                this.$layer.msg(res.data.msg)
            }
        }).catch(err=>{
            console.log(err)
        })
    },
    //分页
    page(val) {
      this.currentPage = val;
      this.getHandleList();
    },
    //编号问题
    typeIndex(index) {
      return index + (this.currentPage - 1) * 10 + 1;
    },
    //评委抽取申请弹框
    judge(row){
        this.referenceId = row.referenceId;
        if(row.businessLinks == "资审场地预约" || row.businessLinks == "场地预约"){
            this.toDoListId = row.toDoListId;
            let str = '';
            this.axiosUrl = '/siteReservationController/submit',
            str = row.theme.replace(/\【|】/g,'')
            this.titleTheme = str.split('：')[0];
            if(this.titleTheme == "交易中心办理资审场地预约" || this.titleTheme == "交易中心办理场地预约"){
                this.params = {
                    siteReservationId: row.referenceId,
                    state: "场地预约待办理",
                }
            }else if(this.titleTheme == "交易中心评审室办理资审场地预约"){
                this.params = {
                    siteReservationId: row.referenceId,
                    state: "办理通过",
                    bidEvaluationRoom: this.bidEvaluationRoom
                }
            }else if(this.titleTheme == "交易中心评标室办理场地预约"){
                this.params = {
                    siteReservationId: row.referenceId,
                    state: "办理通过",
                    bidEvaluationRoom: this.bidEvaluationRoom,
                    bidEvaluationTime:this.bidEvaluationTime,
                    lengthOfTenderEvaluation:this.lengthOfTenderEvaluation
                }
            }
            this.$axios({
                method:'GET',
                url:baseUrl + '/siteReservationController/select/' + row.referenceId
            }).then(res=>{
                if(res.data.status == 200){
                    this.siteOrderShow = !this.siteOrderShow;
                    this.nameOfTenderProject = res.data.data.nameOfTenderProject;
                    this.assessmentTime = res.data.data.assessmentTime;
                    this.estimatedReviewDuration = res.data.data.estimatedReviewDuration;
                    this.openingRoom = res.data.data.openingRoom;
                    this.appointmentEvaluationRoom = res.data.data.appointmentEvaluationRoom;
                    this.supportingServices = res.data.data.supportingServices;
                    let lookArr = [];
                    res.data.data.items.map((item,index)=>{
                        this.entryNum = item.entrySubcontractNumber;
                        lookArr.push(this.entryNum);
                    })
                    this.$axios({
                        method: "POST",
                        url: baseUrl+"/projectInformationController/selectByProjectEntrySubcontractNumber",
                        data:{
                            projectEntrySubcontractNumbers:lookArr
                        }
                    }).then(res=>{
                        if(res.data.status == 200){
                            this.subPackData = res.data.data;
                            this.nameOfPurchaser = res.data.data[0].nameOfPurchaser;
                            this.amountOfBiddingProject = res.data.data[0].amountOfBiddingProject;
                            this.biddingProjectNumber = res.data.data[0].biddingProjectNumber;
                            this.totalProId = res.data.data[0].totalProId;
                        }else{
                            this.$layer.msg(res.data.msg);
                        }
                    }).catch(err=>{
                        console.log(err)
                    })
                }else{
                    this.$layer.msg(res.data.msg);
                }
            }).catch(err=>{
                console.log(err)
            })
        }
        
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
    handleSelectionChange(){

    },
    //点击同意
    agree(row){
        this.toDoListId = row.toDoListId;
        this.referenceId = row.referenceId;
        if(row.businessLinks == "资格预审文件"){
            this.axiosUrl = '/prequalificaController/approval',
            this.params = {
                prequalificaId:row.referenceId,
                answer:'同意'
            }
        }else if(row.businessLinks == "资审场地预约"){
            this.axiosUrl = '/siteReservationController/submit';
            let str = '';
            str = row.theme.replace(/\【|】/g,'')
            this.titleTheme = str.split('：')[0];
            if(this.titleTheme == "交易中心办理资审场地预约"){
                this.params = {
                    siteReservationId: row.referenceId,
                    state: "场地预约待办理",
                }
            }else{
                this.params = {
                    siteReservationId: row.referenceId,
                    state: "办理通过",
                    bidEvaluationRoom: this.bidEvaluationRoom
                }
            }
            
        }else if(row.businessLinks == "场地预约"){
            this.axiosUrl = '/siteReservationController/submit';
            let str = '';
            str = row.theme.replace(/\【|】/g,'')
            this.titleTheme = str.split('：')[0];
            if(this.titleTheme == "交易中心办理场地预约"){
                this.params = {
                    siteReservationId: row.referenceId,
                    state: "场地预约待办理",
                }
            }else{
                this.params = {
                    siteReservationId: row.referenceId,
                    state: "办理通过",
                    bidEvaluationRoom: this.bidEvaluationRoom
                }
            }
            
        }else if(row.businessLinks == "中标结果公告"){
            this.axiosUrl = '/winnResultController/submit',
            this.params = {
                winnResultId:row.referenceId,
                state:'办理通过'
            }
        }else if(row.businessLinks == "中标候选人公示"){
            this.axiosUrl = '/winnCandidaController/submit',
            this.params = {
                winnCandidaId:row.referenceId,
                state:'办理通过'
            }
        }else if(row.businessLinks == "中标通知书"){
            this.axiosUrl = '/winnNoticeController/submit',
            this.params = {
                winnNoticeId:row.referenceId,
                state:'办理通过'
            }
        }else if(row.businessLinks == "招标公告" || row.businessLinks == "资审公告"){
            this.axiosUrl = '/tenderNoticeController/submit',
            this.params = {
                tenderNoticeId:row.referenceId,
                state:'办理通过'
            }
        }else if(row.businessLinks == "招标异常"){
            this.axiosUrl = '/tenderExceptionController/approval',
            this.params = {
                id:row.referenceId,
                answer:'同意'
            }
        }else if(row.businessLinks == "合同备案"){
            this.axiosUrl = '/contractController/approval',
            this.params = {
                contractId:row.referenceId,
                answer:'同意'
            }
        }else if(row.businessLinks == "资审申请结果"){
            this.axiosUrl = '/auditApplyController/approval',
            this.params = {
                applyAssociatedProjectId:row.referenceId,
                answer:'同意'
            }
        }else if(row.businessLinks == "招标文件"){
            this.axiosUrl = '/BidDocumentController/updateById',
            this.params = {
                bidDocumentId:row.referenceId,
                state:'办理通过'
            }
        }
        this.saveBox = true;
        this.remarks = "";
    },
    sureBidRoom(){
        this.remarks = "";
        this.saveBox = true;
    },
    sureSave(){
        if(this.titleTheme == "交易中心评审室办理资审场地预约"){
            this.axiosUrl = '/siteReservationController/submit';
            this.params = {
                siteReservationId: this.referenceId,
                state: "办理通过",
                bidEvaluationRoom: this.bidEvaluationRoom
            }
        }else if(this.titleTheme == "交易中心评标室办理场地预约"){
            this.axiosUrl = '/siteReservationController/submit';
            this.params = {
                siteReservationId: this.referenceId,
                state: "办理通过",
                bidEvaluationRoom: this.bidEvaluationRoom,
                bidEvaluationTime:this.bidEvaluationTime,
                lengthOfTenderEvaluation:this.lengthOfTenderEvaluation
            }
        }
        this.$axios({
            method:'POST',
            url:baseUrl + this.axiosUrl,
            data:this.params
        }).then(res=>{
            if(res.data.status == 200){
                this.$axios({
                    method:'POST',
                    url:baseUrl + '/toDoListController/update',
                    data:{
                        toDoListId: this.toDoListId,
                        auditStatus: "办理通过",
                        remarks: this.remarks,
                        state: "已办理"
                    }
                }).then(res=>{
                    if(res.data.status == 200){
                        this.saveBox = false;
                        this.getHandleList();
                    }else{
                        this.$layer.msg(res.data.msg);
                        this.saveBox = false;
                    }
                }).catch(err=>{
                    console.log(err)
                })
            }else{
                this.$layer.msg(res.data.msg);
            }
        }).catch(err=>{
            console.log(err)
        })
    },
    //点击不同意
    disAgree(row){
        this.remarks = "";
        this.failBox = true;
        this.toDoListId = row.toDoListId;
        if(row.businessLinks == "资格预审文件"){
            this.axiosUrl = '/prequalificaController/approval',
            this.params = {
                prequalificaId:row.referenceId,
                answer:'不同意'
            }
        }else if(row.businessLinks == "资审场地预约"){
            this.axiosUrl = '/siteReservationController/submit';
            this.params = {
                siteReservationId: row.referenceId,
                state: "场地预约待办理",
            }
        }else if(row.businessLinks == "场地预约"){
            this.axiosUrl = '/siteReservationController/submit';
            this.params = {
                siteReservationId: row.referenceId,
                state: "场地预约待办理",
            }
        }else if(row.businessLinks == "中标结果公告"){
            this.axiosUrl = '/winnResultController/submit',
            this.params = {
                winnResultId:row.referenceId,
                state:'办理未通过'
            }
        }else if(row.businessLinks == "中标候选人公示"){
            this.axiosUrl = '/winnCandidaController/submit',
            this.params = {
                winnCandidaId:row.referenceId,
                state:'办理未通过'
            }
        }else if(row.businessLinks == "中标通知书"){
            this.axiosUrl = '/winnNoticeController/submit',
            this.params = {
                winnNoticeId:row.referenceId,
                state:'办理未通过'
            }
        }else if(row.businessLinks == "招标公告" || row.businessLinks == "资审公告"){
            this.axiosUrl = '/tenderNoticeController/submit',
            this.params = {
                tenderNoticeId:row.referenceId,
                state:'办理未通过'
            }
        }else if(row.businessLinks == "招标异常"){
            this.axiosUrl = '/tenderExceptionController/approval',
            this.params = {
                id:row.referenceId,
                answer:'不同意'
            }
        }else if(row.businessLinks == "合同备案"){
            this.axiosUrl = '/contractController/approval',
            this.params = {
                contractId:row.referenceId,
                answer:'不同意'
            }
        }else if(row.businessLinks == "资审申请结果"){
            this.axiosUrl = '/auditApplyController/approval',
            this.params = {
                applyAssociatedProjectId:row.referenceId,
                answer:'不同意'
            }
        }else if(row.businessLinks == "招标文件"){
            this.axiosUrl = '/BidDocumentController/updateById',
            this.params = {
                bidDocumentId:row.referenceId,
                state:'办理未通过'
            }
        }
        
    },
    failSave(){
        this.$axios({
            method:'POST',
            url:baseUrl + this.axiosUrl,
            data:this.params
        }).then(res=>{
            if(res.data.status == 200){
                this.$axios({
                    method:'POST',
                    url:baseUrl + '/toDoListController/update',
                    data:{
                        toDoListId: this.toDoListId,
                        auditStatus: "办理不通过",
                        remarks: this.remarks,
                        state: "已办理"
                    }
                }).then(res=>{
                    if(res.data.status == 200){
                        this.failBox = false;
                        this.getHandleList();
                    }else{
                        this.$layer.msg(res.data.msg);
                        this.failBox = false;
                    }
                }).catch(err=>{
                    console.log(err)
                })
            }else{
                this.$layer.msg(res.data.msg);
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
                entrySubcontractNumber:this.totalProjectId
            }
        }).then(res=>{
            if(res.data.status == 200){
            this.handleRecordData = res.data.data
            this.handleRecordData.map((item,index)=>{
                item.creationTime = dayjs(item.creationTime).format('YYYY-MM-DD')
            })
            }else{
                this.$layer.msg(res.data.msg)
            }
        }).catch(err=>{
            console.log(err)
        })
    },
    closejudgeShow(){
        this.judgeShow = false;//关闭评委申请抽取弹框
        this.siteOrderShow = false;//关闭场地预约
    },
    closeAnswerShow(){//关闭答疑文件备案弹框
        this.answerShow = false;
    },
    closeSubcontractShow(){//关闭项目分包弹框
        this.subcontractShow = false;
    },
    closeRegisterShow(){//关闭项目注册弹框
        this.registerShow = false;
    },
    closeSubShow(){
        this.subcontractInforShow = false;//关闭分包信息弹框
    },
    handleClose(){
        this.saveBox = false;
        this.failBox = false;
    }
  },
  created(){
      this.getHandleList();//查询代办事项
      this.getRecordList();//办理记录查询
  },
  mounted(){}
}
</script>
<style scoped>
.myDiv{
    width:100%;
    height: 100%;
    background: #ffffff;
}
.header_box{
    width: 95%;
    margin:0 auto;
    height: 25px;
    line-height: 25px;
    border-bottom: 1px dashed #D03D3A;
    padding-bottom: 3%;
    padding-top: 1%;
    font-size: 18px;
    font-weight: bold;
    color:#D03D3A;
}
.head_bottom {
  width: 100%;
  text-align: center;
  margin-bottom: 20px;
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
.handle_main{
    width: 95%;
    height: 98%;
    margin:0 auto;
    overflow-y: scroll;
    margin-top:1%;
}
.handle_main>li{
    display: flex;
    justify-content:space-between;
    padding-right: 5%;
    line-height:30px;
    padding-bottom: 1%;
}
.handle_main>li>a{
    color: #333;
}
.li_a{
    width: 450px;
}
.corlor_un:hover{
    color:#f00;
    cursor: pointer;
    text-decoration:underline;
}
/* 点击查看弹框 */
.mask,.mask1,.mask2,.mask3{
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
.mask,.mask1,.mask2,.mask3{
   z-index: 2;
}
/* 新建项目 */
.new_pro {
  z-index: 3;
  background: #f0f4f6;
  width: 100%;
  height: 98%;
  position: absolute;
  left: 10%;
  top: 10%;
  transform: translate(-10%, -10%);
  overflow-y: hidden;
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
.nav_co {
  padding: 8px 20px;
  background-color: #0095d5;
  border: none;
  color: #ffffff;
  font-size: 16px;
  margin-bottom: 10px;
  cursor: pointer;
}
/* 查看 */
.new_main {
  width: 1000px;
  height: 100%;
  margin: 0 auto;
  overflow-y: scroll;
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
.fail_box{
  width:100%;
  margin:0 auto;
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  border-bottom: 1px dashed #333;
}
.fb_box{
    z-index: 10;
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
.pagination {
  margin: 30px 0;
  background-color: #f5f7fa;
  text-align: right;
  position: fixed;
  right: 0;
  bottom: 5px;
  margin-right: 30px;
  }
</style>