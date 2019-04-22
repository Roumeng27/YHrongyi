<template>
    <div class="myDiv">
        <div  v-show="passJudgeShow">
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
                                </div>
                            </div>
                        </el-collapse-item>
                        <!-- 第二步 -->
                        <el-collapse-item title="中标人信息" name="2">
                            <div class="new_m_b">
                                <div class="new_m_b2">
                                    <el-table :data="enclosureData" stripe style="width: 100%">
                                        <el-table-column type="index" width="70" label="序号" :index="typeIndex">
                                        </el-table-column>
                                        <el-table-column prop="nameOfWinningBidder" label="中标单位名称" width="150">
                                        </el-table-column>
                                        <el-table-column prop="projectLeader" label="项目负责人" >
                                        </el-table-column>
                                        <el-table-column prop="winningAmount" label="中标金额" >
                                        </el-table-column>
                                        <el-table-column prop="winningBidPeriod" label="工期(日历天)" >
                                        </el-table-column>
                                        <el-table-column prop="qualityGradeOfWinningBid" label="质量等级" >
                                        </el-table-column>
                                    </el-table>
                                </div>
                            </div>
                        </el-collapse-item>
                        <!-- 第三步 -->
                        <el-collapse-item title="合同信息" name="3">
                            <div class="new_m_b">
                                <div class="new_m_b2">
                                    <!-- 是否公示 -->
                                    <div class="noteBox">
                                        <div class="noteContent">
                                            <div class="noteLeft"><span style="color:#f00;">*</span>是否公示：</div>
                                            <div class="noteFlex">
                                                <el-radio-group v-model="isPublicity">
                                                    <el-radio label="是">是</el-radio>
                                                    <el-radio label="否">否</el-radio>
                                                </el-radio-group>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- 合同编号及名称 -->
                                    <div class="noteBox">
                                    <div class="noteContent">
                                        <div class="noteLeft"><span style="color:#f00;">*</span>合同编号：</div>
                                        <div class="noteFlex">
                                            <el-input v-model="contractCode"></el-input>
                                        </div>
                                        <div style="display: inline-flex;margin-left:30px;">
                                            <span style="width:230px;"><span style="color:#f00;">*</span>合同名称:</span>
                                            <el-input v-model="contractName"></el-input>
                                        </div>
                                    </div>
                                    </div>
                                    <!--  合同金额及期限-->
                                    <div class="noteBox">
                                    <div class="noteContent">
                                        <div class="noteLeft"><span style="color:#f00;">*</span>合同金额(元)：</div>
                                        <div class="noteFlex">
                                        <el-input v-model="contractAmount"></el-input>
                                        </div>
                                        <div style="display: inline-flex;margin-left:30px;">
                                        <span style="width:230px;"><span style="color:#f00;">*</span>合同期限(日历天):</span>
                                        <el-input v-model="contractDeadline"></el-input>
                                        </div>
                                    </div>
                                    </div>
                                    <!-- 合同签署时间及地点 -->
                                    <div class="noteBox">
                                    <div class="noteContent">
                                        <div class="noteLeft"><span style="color:#f00;">*</span>合同签署时间：</div>
                                        <div class="noteFlex">
                                            <el-date-picker value-format="timestamp" v-model="contractSignTime"  type="date" placeholder="选择日期">
                                            </el-date-picker>
                                        </div>
                                        <div style="display: inline-flex;margin-left:30px;">
                                            <span style="width:230px;"><span style="color:#f00;">*</span>洽谈地点:</span>
                                            <el-input v-model="discussLocation"></el-input>
                                        </div>
                                    </div>
                                    </div>
                                    <!--质量要求  -->
                                    <div class="noteBox">
                                        <div class="noteContent">
                                        <div class="noteLeft">质量要求：</div>
                                        <div class="noteFlex">
                                            <el-input v-model="qualityRequirements"></el-input>
                                        </div>
                                        </div>
                                    </div>
                                    <!-- 合同主要内容 -->
                                    <div class="noteBox">
                                        <div class="noteContent">
                                            <div class="noteLeft">合同主要内容：</div>
                                            <div class="noteFlex">
                                                <el-input type="textarea" v-model="contractContent"></el-input>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- 备注说明 -->
                                    <div class="noteBox" style="margin-top: 17px;">
                                        <div class="noteContent">
                                            <div class="noteLeft">备注说明：</div>
                                            <div class="noteFlex">
                                                <el-input type="textarea" v-model="remark"></el-input>
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
            <div class="main_box" v-show="nextShow">
                <div class="new_nav new_nav_box">
                    <button class="nav_co nav_sub" @click="submit()">提交</button>
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
                                </div>
                            </div>
                        </el-collapse-item>
                        <!-- 第二步 -->
                        <el-collapse-item title="相关附件" name="2">
                            <div class="new_m_b">
                                <div class="new_m_b2">
                                    <el-table :data="appendixData" stripe style="width: 100%">
                                        <el-table-column prop="appendixName" label="附件名称" width="150">
                                        </el-table-column>
                                        <el-table-column prop="list" label="附件列表(点击查看)">
                                        </el-table-column>
                                    </el-table>
                                </div>
                            </div>
                        </el-collapse-item>
                        <!-- 第三步 -->
                        <el-collapse-item title="中标人信息" name="3">
                            <div class="new_m_b">
                                <div class="new_m_b2">
                                    <el-table :data="enclosureData" stripe style="width: 100%">
                                        <el-table-column type="index" width="70" label="序号" :index="typeIndex">
                                        </el-table-column>
                                        <el-table-column prop="nameOfWinningBidder" label="中标单位名称" width="150">
                                        </el-table-column>
                                        <el-table-column prop="projectLeader" label="项目负责人" >
                                        </el-table-column>
                                        <el-table-column prop="winningAmount" label="中标金额" >
                                        </el-table-column>
                                        <el-table-column prop="winningBidPeriod" label="工期(日历天)" >
                                        </el-table-column>
                                        <el-table-column prop="qualityGradeOfWinningBid" label="质量等级" >
                                        </el-table-column>
                                    </el-table>
                                </div>
                            </div>
                        </el-collapse-item>
                        <!-- 第四步 -->
                        <el-collapse-item title="合同信息" name="4">
                            <div class="new_m_b">
                                <div class="new_m_b2">
                                    <!-- 是否公示 -->
                                    <div class="noteBox">
                                        <div class="noteContent">
                                            <div class="noteLeft">是否公示：</div>
                                            <div class="noteFlex">
                                                <span>{{isPublicity}}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- 合同编号及名称 -->
                                    <div class="noteBox">
                                        <div class="noteContent">
                                            <div class="noteLeft">合同编号：</div>
                                            <div class="noteFlex">
                                                <span>{{contractCode}}</span>
                                            </div>
                                            <div style="display: inline-flex;width:40%;">
                                                <span>合同名称：</span>
                                                <span>{{contractName}}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <!--  合同金额及期限-->
                                    <div class="noteBox">
                                        <div class="noteContent">
                                            <div class="noteLeft">合同金额(元)：</div>
                                            <div class="noteFlex">
                                                <span>{{contractAmount}}</span>
                                            </div>
                                            <div style="display: inline-flex;width:40%;">
                                                <span>合同期限(日历天)：</span>
                                                <span>{{contractDeadline}}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- 合同签署时间及地点 -->
                                    <div class="noteBox">
                                        <div class="noteContent">
                                            <div class="noteLeft">合同签署时间：</div>
                                            <div class="noteFlex">
                                                <span>{{contractSignTime}}</span>
                                            </div>
                                            <div style="display: inline-flex;width:40%;">
                                                <span>洽谈地点：</span>
                                                <span>{{discussLocation}}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <!--质量要求  -->
                                    <div class="noteBox">
                                        <div class="noteContent">
                                            <div class="noteLeft">质量要求：</div>
                                            <div class="noteFlex">
                                                <span>{{qualityRequirements}}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- 合同主要内容 -->
                                    <div class="noteBox">
                                        <div class="noteContent">
                                            <div class="noteLeft">合同主要内容：</div>
                                            <div class="noteFlex">
                                                <span>{{contractContent}}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- 备注说明 -->
                                    <div class="noteBox">
                                        <div class="noteContent">
                                            <div class="noteLeft">备注说明：</div>
                                            <div class="noteFlex">
                                                <span>{{remark}}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </el-collapse-item>
                        <!-- 第五步 -->
                        <el-collapse-item title="公示内容" name="5">
                            <div class="new_m_b">
                                <div class="new_m_b2" style="width:80%;">
                                    <div class="fail_box">
                                        <div>{{nameOfTenderProject}}</div>
                                        <div>合同公示</div>
                                        <div style="font-size:14px;font-weight:normal;color:#333;">{{updateTime}}</div>
                                    </div>
                                    <!-- 招标（采购）项目名称 -->
                                    <div class="noteBox">
                                        <div class="noteContent">
                                            <div class="noteLeft" style="width:220px;">招标（采购）项目名称：</div>
                                            <div class="noteFlex">
                                                <span>{{nameOfTenderProject}}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- 招标（采购）项目编号： -->
                                    <div class="noteBox">
                                        <div class="noteContent">
                                            <div class="noteLeft" style="width:220px;">招标（采购）项目编号：</div>
                                            <div class="noteFlex">
                                                <span>{{biddingProjectNumber}}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- 招标（采购）项目预算金额 -->
                                    <div class="noteBox">
                                        <div class="noteContent">
                                            <div class="noteLeft" style="width:220px;">招标（采购）项目预算金额：</div>
                                            <div class="noteFlex">
                                                <span>{{budgetAmount}}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- 招标采购人 -->
                                    <div style="font-weight:bold;">招标(采购)人</div>
                                    <!--招标（采购）人全称  -->
                                    <div class="noteBox">
                                        <div class="noteContent">
                                            <div class="noteLeft" style="width:220px;">招标（采购）人全称：</div>
                                            <div class="noteFlex">
                                                <span>{{nameOfPurchaser}}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <!--招标（采购）人地址  -->
                                    <div class="noteBox">
                                        <div class="noteContent">
                                            <div class="noteLeft" style="width:220px;">招标（采购）人地址：</div>
                                            <div class="noteFlex">
                                                <span>{{tendereeAddress}}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <!--招标（采购）人联系方式  -->
                                    <div class="noteBox">
                                        <div class="noteContent">
                                            <div class="noteLeft" style="width:220px;">招标（采购）人联系方式：</div>
                                            <div class="noteFlex">
                                                <span>{{contactInformation}}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- 招标（采购）代理机构 -->
                                    <div style="font-weight:bold;">招标（采购）代理机构</div>
                                    <!--招标（采购）代理机构全称  -->
                                    <div class="noteBox">
                                        <div class="noteContent">
                                            <div class="noteLeft" style="width:220px;">招标（采购）代理机构全称：</div>
                                            <div class="noteFlex">
                                                <span>测试</span>
                                            </div>
                                        </div>
                                    </div>
                                    <!--招标（采购）代理机构地址  -->
                                    <div class="noteBox">
                                        <div class="noteContent">
                                            <div class="noteLeft" style="width:220px;">招标（采购）代理机构地址：</div>
                                            <div class="noteFlex">
                                                <span>测试</span>
                                            </div>
                                        </div>
                                    </div>
                                    <!--招标（采购）代理机构联系方式  -->
                                    <div class="noteBox">
                                        <div class="noteContent">
                                            <div class="noteLeft" style="width:220px;">招标（采购）代理机构联系方式：</div>
                                            <div class="noteFlex">
                                                <span>测试</span>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- 合同内容 -->
                                    <div style="font-weight:bold;">合同内容</div>
                                    <!--合同编号  -->
                                    <div class="noteBox">
                                        <div class="noteContent">
                                            <div class="noteLeft" style="width:220px;">合同编号：</div>
                                            <div class="noteFlex">
                                                <span>{{contractCode}}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <!--合同名称  -->
                                    <div class="noteBox">
                                        <div class="noteContent">
                                            <div class="noteLeft" style="width:220px;">合同名称：</div>
                                            <div class="noteFlex">
                                                <span>{{contractName}}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <!--合同金额  -->
                                    <div class="noteBox">
                                        <div class="noteContent">
                                            <div class="noteLeft" style="width:220px;">合同金额：</div>
                                            <div class="noteFlex">
                                                <span>{{contractAmount}}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <!--合同期限  -->
                                    <div class="noteBox">
                                        <div class="noteContent">
                                            <div class="noteLeft" style="width:220px;">合同期限：</div>
                                            <div class="noteFlex">
                                                <span>{{contractDeadline}}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- 合同签署时间 -->
                                    <div class="noteBox">
                                        <div class="noteContent">
                                            <div class="noteLeft" style="width:220px;">合同签署时间：</div>
                                            <div class="noteFlex">
                                                <span>{{contractSignTime}}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- 洽谈地点 -->
                                    <div class="noteBox">
                                        <div class="noteContent">
                                            <div class="noteLeft" style="width:220px;">洽谈地点：</div>
                                            <div class="noteFlex">
                                                <span>{{discussLocation}}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- 质量要求 -->
                                    <div class="noteBox">
                                        <div class="noteContent">
                                            <div class="noteLeft" style="width:220px;">质量要求：</div>
                                            <div class="noteFlex">
                                                <span>{{qualityRequirements}}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- 合同主要内容 -->
                                    <div class="noteBox">
                                        <div class="noteContent">
                                            <div class="noteLeft" style="width:220px;">合同主要内容：</div>
                                            <div class="noteFlex">
                                                <span>{{contractContent}}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- 备注说明 -->
                                    <div class="noteBox">
                                        <div class="noteContent">
                                            <div class="noteLeft" style="width:220px;">备注说明：</div>
                                            <div class="noteFlex">
                                                <span>{{remark}}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- 项目联系人 -->
                                    <div class="noteBox" style="margin-top:20px;">
                                        <div class="noteContent">
                                            <div class="noteLeft" style="width:150px;font-weight:bold;">项目联系人：</div>
                                            <div class="noteFlex">
                                                <span style="font-weight:bold;">{{contacts}}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- 联系方式 -->
                                    <div class="noteBox">
                                        <div class="noteContent">
                                            <div class="noteLeft" style="width:150px;font-weight:bold;">联系方式：</div>
                                            <div class="noteFlex">
                                                <span style="font-weight:bold;">{{contactInformation}}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <!--备注  -->
                                    <div class="noteBox">
                                        <div class="noteContent">
                                            <div class="noteLeft" style="width:150px;font-weight:bold;">备注：</div>
                                            <div class="noteFlex">
                                                <span>{{remark}}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <!--名称和日期  -->
                                    <div style="font-weight:bold;text-align:right;width:100%;">
                                        <div>测试用户1</div>
                                        <div>{{updateTime}}</div>
                                    </div>
                                </div>
                            </div>
                        </el-collapse-item>
                        <!-- 第五步 -->
                        <el-collapse-item title="办理记录" name="6">
                            <div class="new_m_b">
                                <div class="new_m_b2">
                                    <el-table :data="handleRecordData" style="width: 100%">
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
                                </div>
                            </div>
                        </el-collapse-item>
                    </el-collapse>
                </div>
            </div>
            
            <!-- 点击提交 -->
            <el-dialog title="系统提示" :visible.sync="dialogShow" width="40%" :before-close="handleClose">
                <div class="icon">
                    <i class="el-icon-success"></i>
                    <span>提交成功！</span>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="submitFile()">确 定</el-button>
                </span>
            </el-dialog>
            <!-- 点击保存 -->
            <el-dialog title="系统提示" :visible.sync="saveShow" width="40%" :before-close="handleClose">
                <div class="icon">
                    <i class="el-icon-success"></i>
                    <span>保存成功！</span>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="saveFile()">确 定</el-button>
                </span>
            </el-dialog>
            <!-- 合同备案 -->
            <el-dialog
                title="系统提示"
                :visible.sync="dialogVisible"
                width="40%"
                :before-close="handleClose">
                <div class="icon">
                    <i class="el-icon-warning"></i>
                    <span>尚未完成招标文件备案，无法进行合同备案！</span>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
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
                    <span>尚未发提交通过，无法进行场地预约操作!</span>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="handleClose()">确 定</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import baseUrl from '../../../api/api'
import dayjs from "dayjs"
  export default {
    props:{
        projectInformaPrimaryKeyId:'',
        // totalProjectId:''
    },
    data() {
      return {
        frameShow:false,
        passJudgeShow:true,
        projectObj:JSON.parse(window.localStorage.projectObj),
        saveShow:false,
        dialogVisible: false,
        dialogShow:false,
        activeName:'1',
        enclosureData:[],//中标人信息表格
        show:true,//上一步弹框
        nextShow:false,//下一步弹框
        appendixData:[
            {
                appendixName:'合同签署',
                list:''
            }
        ],//相关附件弹框
        currentPage:1,//当前页
        handleRecordData:[],//办理记录数据
        nameOfTenderProject:'',//招标项目名称
        nameOfPurchaser:'',//招标采购人
        amountOfBiddingProject:'',//招标项目金额
        biddingProjectNumber:'',//招标项目编号
        totalProId:'',//入场项目编号
        budgetAmount:'',//预算金额
        tendereeAddress:'',//招标人地址
        contacts:'',//联系人
        contactInformation:"",//联系方式
        isPublicity:'',//是否公示
        contractCode:'',//合同编号
        contractName:'',//合同名称
        contractAmount:'',//合同金额
        contractDeadline:'',//合同期限
        contractSignTime:'',//合同签署时间
        discussLocation:'',//洽谈地点
        qualityRequirements:'',//质量要求
        contractContent:'',//合同主要内容
        remark:'',//备注说明
        contractId:'',//合同备案id
        updateTime:'',//点击下一步返回的时间
      };
    },
    methods: {
        // 招标项目信息
        getbiddingInfo(){
            this.$axios({
                method: "GET",
                url: baseUrl+"/projectInformationController/selectById/"+this.projectInformaPrimaryKeyId,
            }).then(res=>{
                if(res.data.status == 200){
                    this.nameOfTenderProject = res.data.data.nameOfTenderProject;// 招标项目名称
                    this.biddingProjectNumber = res.data.data.biddingProjectNumber;// 招标项目编号
                    this.totalProId = res.data.data.totalProjectId;//入场项目编号
                    this.amountOfBiddingProject = res.data.data.amountOfBiddingProject;// 招标项目金额 
                    this.nameOfPurchaser = res.data.data.nameOfPurchaser;// 招标(采购)人
                    this.tenderContents = res.data.data.tenderContents;// 招标内容
                    this.budgetAmount = res.data.data.budgetAmount;//预算金额
                    this.contactInformation = res.data.data.contactInformation//联系方式
                    this.contacts = res.data.data.contacts//联系人

                }else{
                    this.$layer.msg(res.data.msg);
                }
            }).catch(err=>{
                console.log(err)
            })
        },
        //中标信息
        getWiningInforList(){
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
                url:baseUrl + '/winnNoticeController/select',
                data:object
            }).then(res=>{
                if(res.data.status == 200){
                    this.enclosureData = res.data.data;
                }else{
                    this.$layer.msg(res.data.msg)
                }
            }).catch(err=>{
                console.log(err)
            })
        },
        //查询--判断
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
                url:baseUrl+'/contractController/queryContract',
                data:object
            }).then(res=>{
                this.contractCode = res.data.data.contractCode;
                this.contractId = res.data.data.contractId;
                if(res.data.data == null){
                    this.show = true;
                    this.nextShow = false;
                }else if(res.data.data.state == '编辑中'){
                    this.show = false;
                    this.nextShow = true;
                    this.isPublicity = res.data.data.isPublicity;
                    this.contractCode = res.data.data.contractCode;
                    this.contractName = res.data.data.contractName;
                    this.contractAmount = res.data.data.contractAmount;
                    this.contractDeadline = res.data.data.contractDeadline;
                    this.discussLocation = res.data.data.discussLocation;
                    this.qualityRequirements = res.data.data.qualityRequirements;
                    this.contractSignTime = dayjs(res.data.data.contractSignTime).format('YYYY-MM-DD');
                    this.contractId = res.data.data.contractId;
                }else if(res.data.data.state == '办理通过' || res.data.data.state == '待办理'){
                    this.show = false;
                    this.nextShow = true;
                    $('new_nav_box').hide();
                    this.isPublicity = res.data.data.isPublicity;
                    this.contractCode = res.data.data.contractCode;
                    this.contractName = res.data.data.contractName;
                    this.contractAmount = res.data.data.contractAmount;
                    this.contractDeadline = res.data.data.contractDeadline;
                    this.discussLocation = res.data.data.discussLocation;
                    this.qualityRequirements = res.data.data.qualityRequirements;
                    this.contractSignTime = dayjs(res.data.data.contractSignTime).format('YYYY-MM-DD');
                    this.contractId = res.data.data.contractId;
                }
            }).catch(err=>{
                console.log(err)
            })
        },
        //下一步
        nextTo(){
            this.getRecordList();
            if(!this.isPublicity){
                this.$layer.msg('请选择是否公示');
                return false;
            }else if(!this.contractCode){
                this.$layer.msg('请填写合同编号');
                return false;
            }else if(!this.contractName){
                this.$layer.msg('请填写合同名称');
                return false;
            }else if(!this.contractAmount){
                this.$layer.msg('请填写合同金额');
                return false;
            }else if(!this.contractDeadline){
                this.$layer.msg('请填写合同期限');
                return false;
            }else if(!this.contractSignTime){
                this.$layer.msg('请填写合同签署时间');
                return false;
            }else if(!this.discussLocation){
                this.$layer.msg('请填写洽谈地点');
                return false;
            }
            let objectData = {};
            if(this.projectObj.totalProjectId.indexOf("-") != -1){
                // 分包
                objectData={
                    entrySubcontractNumber:this.projectObj.totalProjectId,
                    isPublicity:this.isPublicity,
                    contractCode:this.contractCode,
                    contractName:this.contractName,
                    contractAmount:this.contractAmount,
                    contractDeadline:this.contractDeadline,
                    contractSignTime:this.contractSignTime,
                    discussLocation:this.discussLocation,
                    qualityRequirements:this.qualityRequirements,
                    remark:this.remark,
                    contractId:this.contractId,
                }
            }else{
                // 总包
                objectData={
                    projectCode:this.projectObj.totalProjectId,
                    isPublicity:this.isPublicity,
                    contractCode:this.contractCode,
                    contractName:this.contractName,
                    contractAmount:this.contractAmount,
                    contractDeadline:this.contractDeadline,
                    contractSignTime:this.contractSignTime,
                    discussLocation:this.discussLocation,
                    qualityRequirements:this.qualityRequirements,
                    remark:this.remark,
                    contractId:this.contractId,
                }
            }
            this.$axios({
                method: "POST",
                url: baseUrl+"/contractController/saveOrNextStep",
                data:objectData
            }).then(res=>{
                if(res.data.status == 200){
                    this.show = false;
                    this.nextShow = true;
                    this.isPublicity = res.data.data.isPublicity;
                    this.contractCode = res.data.data.contractCode;
                    this.contractName = res.data.data.contractName;
                    this.contractAmount = res.data.data.contractAmount;
                    this.contractDeadline = res.data.data.contractDeadline;
                    this.discussLocation = res.data.data.discussLocation;
                    this.qualityRequirements = res.data.data.qualityRequirements;
                    this.contractSignTime = dayjs(res.data.data.contractSignTime).format('YYYY-MM-DD');
                    this.contractId = res.data.data.contractId;
                    this.updateTime = dayjs(res.data.data.updateTime).format('YYYY-MM-DD');
                }else{
                    this.$layer.msg(res.data.msg)
                }
            }).catch(err=>{
                console.log(err);
            })
        },
        //保存
        saveFile(){
            this.saveShow = true;
        },
        saveFile(){
            if(!this.isPublicity){
                this.$layer.msg('请选择是否公示');
                return false;
            }else if(!this.contractCode){
                this.$layer.msg('请填写合同编号');
                return false;
            }else if(!this.contractName){
                this.$layer.msg('请填写合同名称');
                return false;
            }else if(!this.contractAmount){
                this.$layer.msg('请填写合同金额');
                return false;
            }else if(!this.contractDeadline){
                this.$layer.msg('请填写合同期限');
                return false;
            }else if(!this.contractSignTime){
                this.$layer.msg('请填写合同签署时间');
                return false;
            }else if(!this.discussLocation){
                this.$layer.msg('请填写洽谈地点');
                return false;
            }
            let objectData = {};
            if(this.projectObj.totalProjectId.indexOf("-") != -1){
                // 分包
                objectData={
                    entrySubcontractNumber:this.projectObj.totalProjectId,
                    isPublicity:this.isPublicity,
                    contractCode:this.contractCode,
                    contractName:this.contractName,
                    contractAmount:this.contractAmount,
                    contractDeadline:this.contractDeadline,
                    contractSignTime:this.contractSignTime,
                    discussLocation:this.discussLocation,
                    qualityRequirements:this.qualityRequirements,
                    remark:this.remark,
                    contractId:this.contractId,
                }
            }else{
                // 总包
                objectData={
                    projectCode:this.projectObj.totalProjectId,
                    isPublicity:this.isPublicity,
                    contractCode:this.contractCode,
                    contractName:this.contractName,
                    contractAmount:this.contractAmount,
                    contractDeadline:this.contractDeadline,
                    contractSignTime:this.contractSignTime,
                    discussLocation:this.discussLocation,
                    qualityRequirements:this.qualityRequirements,
                    remark:this.remark,
                    contractId:this.contractId,
                }
            }
            this.$axios({
                method: "POST",
                url: baseUrl+"/contractController/saveOrNextStep",
                data:objectData
            }).then(res=>{
                if(res.data.status == 200){
                    this.show = true;
                    this.nextShow = false;
                    this.saveShow = false;
                    this.isPublicity = res.data.data.isPublicity;
                    this.contractCode = res.data.data.contractCode;
                    this.contractName = res.data.data.contractName;
                    this.contractAmount = res.data.data.contractAmount;
                    this.contractDeadline = res.data.data.contractDeadline;
                    this.discussLocation = res.data.data.discussLocation;
                    this.qualityRequirements = res.data.data.qualityRequirements;
                    this.contractSignTime = dayjs(res.data.data.contractSignTime).format('YYYY-MM-DD');
                     
                }else{
                    this.$layer.msg(res.data.msg)
                }
            }).catch(err=>{
                console.log(err);
            })
        },
        //提交
        submit(){
            this.dialogShow = true;
        },
        submitFile(){
            this.$axios({
                method: "POST",
                url: baseUrl+"/contractController/submit",
                data:{
                    contractId:this.contractId
                }
            }).then(res=>{
                if(res.data.status == 200){
                    this.dialogShow = false;
                    if(res.data.data.state == "待办理"){
                        this.nextShow = true;
                        $('.new_nav_box').hide();
                    }else{
                        this.nextShow = true;
                    }
                }else{
                    this.$layer.msg(res.data.msg)
                }
            }).catch(err=>{
                console.log(err);
            })
        },
        //编号问题
        typeIndex(index) {
             return index + (this.currentPage - 1) * 10 + 1;
        },
        //上一步
        backTo(){
            this.show = true;
            this.nextShow = false;
            this.contractSignTime = new Date(this.contractSignTime).getTime();
        },
        handleClose(done) {
            this.frameShow = false;
            this.dialogShow = false;
            this.saveShow = false;
            this.dialogVisible = false;
            // this.$confirm('确认关闭？')
            // .then(_ => {
            //     done();
            // })
            // .catch(_ => {});
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
                        if(item.value == "项目分包" && item.state == "办理通过"){
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
        this. getbiddingInfo();
        this.getProjectList();
        this.getRecordList();
        this.getWiningInforList();
    }
  };
</script>

<style scoped>
.myDiv {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
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
.main_box{
    height: 100%;
    overflow: hidden;
}
.new_main {
  width: 1000px;
  height: 100%;
  margin: 0 auto;
  overflow-y: scroll;
  overflow-x: scroll;
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
.el-icon-warning,.el-icon-success{
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
</style>

