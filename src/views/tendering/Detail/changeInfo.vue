<template>
    <div class="pageWrap">
        <div  v-show="passJudgeShow" style="height:100%;overflow:hidden;">
            <!-- 变更公告 -->
            <div class="box"></div>
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
                            </div>
                        </div>
                    </el-collapse-item>
                    <!-- 相关附件 -->
                    <el-collapse-item title="相关附件" name="2">
                        <div class="btnBox">
                            <button class="nav_co nav_save" @click="addFile()">新增</button>
                            <button class="nav_co nav_next" @click="deleteCheck()">删除</button>
                        </div>
                        <div class="tab_main_box">
                            <el-table :data="tableData" stripe style="width: 100%"   @selection-change="handleSelectionChange">
                                <el-table-column type="selection" width="55">
                                </el-table-column>
                                <el-table-column type="index" width="70" label="序号" :index="typeIndex">
                                </el-table-column>
                                <el-table-column  prop="projectNum"  label="入场项目(分包)编号">
                                    <template slot-scope="scope">
                                        <span>{{projectNum}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column  prop="nameOfTenderProject"  label="招标项目名称">
                                </el-table-column>
                                <el-table-column v-if="projectObj.totalProjectId.indexOf('-') > 0"   prop="subcontractName"  label="分包名称">
                                </el-table-column>
                                <el-table-column  prop="times"  label="次数">
                                </el-table-column>
                                <el-table-column  prop="state"  label="审核状态">
                                </el-table-column>
                                <el-table-column  prop="operation"  label="操作">
                                    <template slot-scope="scope">
                                        <i class="el-icon-search" style="cursor:pointer;" @click="lookPaper(scope.row)"></i>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                    </el-collapse-item>
                </el-collapse>
            </div>
            <!-- 新增变更公告上一步弹框 -->
            <div class="mask" v-show="addShow"></div>
            <div class="new_pro" v-show="addShow">
                <div class="new_head_box">
                    <div class="new_head">
                        <div style="padding-left:10px;">新增变更公告(第<span>{{times}}</span>次变更)</div>
                        <div @click="closeAddShow()" style="font-size:28px;padding-right:10px;cursor:pointer;">×</div>
                    </div>
                    <div class="new_nav">
                        <button class="nav_co nav_save" @click="saveFile()">保存</button>
                        <button class="nav_co nav_next" @click="nextTo()">下一步</button>
                    </div>
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
                                    <!-- 招标项目编号及金额 -->
                                    <div class="noteBox">
                                        <div class="noteContent">
                                        <div class="noteLeft">招标项目编号：</div>
                                        <div class="noteFlex">
                                            <span>{{biddingProjectNumber}}</span>
                                        </div>
                                        <div style="display: inline-flex;margin-left:30px;width:50%;">
                                            <span style="width:180px;">招标项目预算金额(万元)：</span>
                                            <span>{{budgetAmount}}</span>
                                        </div>
                                        </div>
                                    </div>
                                    <!-- 表格 -->
                                    <div class="table_box" v-if="projectObj.totalProjectId.indexOf('-') > 0">
                                        <el-table :data="enclosureData" stripe style="width: 100%">
                                            <el-table-column  type="index"  label="序号" :index="typeIndex" width="70">
                                            </el-table-column>
                                            <el-table-column  prop="entrySubcontractNumber"  label="入场项目(分包)编号" width="200">
                                            </el-table-column>
                                            <el-table-column  prop="subcontractName"  label="分包名称">
                                            </el-table-column>
                                            <el-table-column  prop="subcontractingControlAmount"  label="分包控制金额(万元)">
                                            </el-table-column>
                                            <el-table-column   label="创建时间">
                                                <template slot-scope="scope">
                                                    <span>{{projectSubcontractCreationTime}}</span>
                                                </template>
                                            </el-table-column>
                                            <el-table-column prop="operation" label="查看">
                                                <template slot-scope="scope">
                                                    <i class="el-icon-search" @click="lookFile(scope.row)"></i>
                                                </template>
                                            </el-table-column>
                                        </el-table>
                                    </div>
                                    <!-- 招标采购人 -->
                                    <div class="noteBox">
                                        <div class="noteContent">
                                            <div class="noteLeft">招标(采购)人：</div>
                                            <div class="noteFlex">
                                                <span>{{nameOfPurchaser}}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- 地址 -->
                                    <div class="noteBox">
                                        <div class="noteContent">
                                            <div class="noteLeft">地址：</div>
                                            <div class="noteFlex">
                                                <span></span>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- 联系方式 -->
                                    <div class="noteBox">
                                        <div class="noteContent">
                                            <div class="noteLeft">联系方式：</div>
                                            <div class="noteFlex">
                                                <span>{{contactInformation}}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </el-collapse-item>
                        <!--公告信息 -->
                        <el-collapse-item title="公告信息" name="2">
                            <div class="new_m_b">
                                <div class="new_m_b2">
                                    <!--公告名称  -->
                                    <div class="noteBox">
                                        <div class="noteContent">
                                            <div class="noteLeft">公告名称：</div>
                                            <div class="noteFlex">
                                                <el-input v-model="subcontractNames"></el-input>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- 变更日期 -->
                                    <div class="noteBox">
                                        <div class="noteContent">
                                            <div class="noteLeft">变更日期：</div>
                                            <div class="noteFlex">
                                                <el-date-picker value-format="timestamp" v-model="changeDate" type="date" placeholder="选择日期">
                                                </el-date-picker>
                                            </div>
                                        </div>
                                    </div>
                                    <!--变更理由  -->
                                    <div class="noteBox">
                                        <div class="noteContent">
                                            <div class="noteLeft">变更理由：</div>
                                            <div class="noteFlex">
                                                <el-input v-model="changeReason"></el-input>
                                            </div>
                                        </div>
                                    </div>
                                    <!--变更事项  -->
                                    <div class="noteBox">
                                        <div class="noteContent">
                                            <div class="noteLeft"><span style="color:#f00;">*</span>变更事项：</div>
                                            <div class="noteFlex">
                                                <el-input v-model="changesAs" type="textarea"></el-input>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- 是否变更投标事宜 -->
                                    <div class="noteBox" style="margin-top:10px;">
                                        <div class="noteContent">
                                            <div class="noteLeft"><span style="color:#f00;">*</span>是否变更投标事宜：</div>
                                            <div class="noteFlex">
                                                <el-radio-group v-model="isChangeBidMatters" @change="changeFile()">
                                                    <el-radio label="是">是</el-radio>
                                                    <el-radio label="否">否</el-radio>
                                                </el-radio-group>
                                            </div>
                                        </div>
                                    </div>
                                    <!--是否变更开标事宜  -->
                                    <div class="noteBox">
                                        <div class="noteContent">
                                            <div class="noteLeft"><span style="color:#f00;">*</span>是否变更开标事宜：</div>
                                            <div class="noteFlex">
                                                <el-radio-group v-model="isChangeBidCpenMatters" @change="changeKaiBiao()">
                                                    <el-radio label="是">是</el-radio>
                                                    <el-radio label="否">否</el-radio>
                                                </el-radio-group>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- 当投标事宜为是  的时候出现 -->
                                    <div v-show="isTenderShow">
                                        <!-- 报名开始结束时间 -->
                                        <div class="noteBox">
                                            <div class="noteContent">
                                                <div class="noteLeft">报名开始时间：</div>
                                                <div class="noteFlex">
                                                    <el-date-picker v-model="enrollStartTime" type="datetime" placeholder="选择日期时间" align="right" value-format="timestamp">
                                                    </el-date-picker>
                                                </div>
                                                <div style="display: inline-flex;margin-left:30px;width:50%;">
                                                    <span style="width:130px;">报名结束时间:</span>
                                                    <el-date-picker v-model="enrollEndTime" type="datetime" placeholder="选择日期时间" align="right" value-format="timestamp">
                                                    </el-date-picker>
                                                </div>
                                            </div>
                                        </div>
                                        <!-- 招标文件发售时间 -->
                                        <div class="noteBox">
                                            <div class="noteContent">
                                                <div class="noteLeft" style="width:130px;">招标文件发售时间：</div>
                                                <div class="noteTime">
                                                    <div class="timeBox">
                                                        <el-date-picker value-format="timestamp" v-model="sellTime" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
                                                        </el-date-picker>
                                                    </div>
                                                </div>
                                                <div style="display: inline-flex;margin-left:5px;">
                                                    <span style="width:40px;">上午</span>
                                                    <div class="noteTime">
                                                        <div class="timeBox">
                                                            <el-time-select
                                                                placeholder="开始时间"
                                                                v-model="morningbegin"
                                                                :picker-options="{
                                                                    start: '08:00',
                                                                    step: '00:30',
                                                                    end: '17:30'
                                                                }">
                                                            </el-time-select>
                                                        </div>
                                                        <span>-</span>
                                                        <div class="timeBox">
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
                                                    <span style="width:40px;">下午</span>
                                                    <div class="noteTime">
                                                        <div class="timeBox">
                                                            <el-time-select
                                                                placeholder="开始时间"
                                                                v-model="afterbegin"
                                                                :picker-options="{
                                                                    start: '08:00',
                                                                    step: '00:30',
                                                                    end: '17:30'
                                                                }">
                                                            </el-time-select>
                                                        </div>
                                                        <span>-</span>
                                                        <div class="timeBox">
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
                                            </div>
                                        </div>
                                        <!--招标文件发售地点  -->
                                        <div class="noteBox">
                                            <div class="noteContent">
                                                <div class="noteLeft">招标文件发售地点：</div>
                                                <div class="noteFlex">
                                                <el-input v-model="tenderDocumentsSaleSite" clearable></el-input>
                                                </div>
                                            </div>
                                        </div>
                                        <!-- 招标文件工本费 -->
                                        <div class="noteBox">
                                            <div class="noteContent">
                                                <div class="noteLeft">招标文件工本费：</div>
                                                <div class="noteline">
                                                    <p>人民币</p>
                                                    <div class="moneyBox">
                                                        <el-input v-model="tenderDocumentsCost" clearable></el-input>
                                                    </div>
                                                    <p>元</p>
                                                </div>
                                            </div>
                                        </div>
                                        <!-- 工本费接收账户 -->
                                        <div class="noteBox">
                                            <div class="noteContent">
                                                <div class="noteLeft">工本费接收账户：</div>
                                                <div class="noteFlex">
                                                    <el-input v-model="costAcceptAccount" clearable></el-input>
                                                </div>
                                                <div style="display: inline-flex;margin-left:30px;">
                                                <el-button>设置账户</el-button>
                                                </div>
                                            </div>
                                        </div>
                                        <!-- 投标人需提交资料 -->
                                        <div class="noteBox"  style="margin-top:10px;">
                                            <div class="noteContent">
                                                <div class="noteLeft">投标人需提交资料：</div>
                                                <div class="noteFlex">
                                                <el-input type="textarea" v-model="bidderData" clearable></el-input>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- 当开标事宜为是 的时候出现 -->
                                    <div  v-show="isOpenTenderShow">
                                        <!-- 递交截止时间 -->
                                        <div class="noteBox">
                                            <div class="noteContent">
                                                <div class="noteLeft">递交截止时间：</div>
                                                <div class="noteFlex">
                                                <span>{{submitBidFileEndTime}}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <!--递交投标文件地点  -->
                                        <div class="noteBox">
                                            <div class="noteContent">
                                                <div class="noteLeft">递交投标文件地点：</div>
                                                <div class="noteFlex">
                                                <span>{{submitBidFileSite}}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <!-- 开标时间 -->
                                        <div class="noteBox">
                                            <div class="noteContent">
                                                <div class="noteLeft">开标时间：</div>
                                                <div class="noteFlex">
                                                <span>{{bidOpeningDate}}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <!-- 开标地点 -->
                                        <div class="noteBox">
                                            <div class="noteContent">
                                                <div class="noteLeft">开标地点：</div>
                                                <div class="noteFlex">
                                                <span>{{bidOpeningSite}}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <!-- 评标办法和标准 -->
                                        <div class="noteBox">
                                            <div class="noteContent">
                                                <div class="noteLeft">评标办法和标准：</div>
                                                <div class="noteFlex">
                                                    <el-input v-model="bidEvaluationStandard" clearable></el-input>
                                                </div>
                                            </div>
                                        </div>
                                        <!--负责人和联系方式  -->
                                        <div class="noteBox">
                                            <div class="noteContent">
                                                <div class="noteLeft">项目负责人：</div>
                                                <div class="noteFlex">
                                                    <el-input v-model="projectLeader" clearable></el-input>
                                                </div>
                                                <div style="display: inline-flex;margin-left:30px;width:50%;">
                                                    <span style="width:130px;">联系方式:</span>
                                                    <el-input v-model="projectLeaderPhone" clearable></el-input>
                                                </div>
                                            </div>
                                        </div>
                                        <!-- 备注 -->
                                        <div class="noteBox" style="margin-bottom:10px;">
                                            <div class="noteContent">
                                                <div class="noteLeft">备注：</div>
                                                <div class="noteFlex">
                                                    <el-input v-model="remark" clearable></el-input>
                                                </div>
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
            <div class="mask" v-show="nextShow"></div>
            <div class="new_pro" v-show="nextShow">
                <div class="new_head_box">
                    <div class="new_head">
                        <div style="padding-left:10px;">查看变更公告(第<span>{{times}}</span>次变更)</div>
                        <div @click="closeNextShow()" style="font-size:28px;padding-right:10px;cursor:pointer;">×</div>
                    </div>
                    <div class="new_nav">
                        <button class="nav_co nav_save" @click="submitFile()">提交</button>
                        <button class="nav_co nav_next" @click="backTo()">上一步</button>
                    </div>
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
                                    <!-- 招标项目编号及金额 -->
                                    <div class="noteBox">
                                        <div class="noteContent">
                                        <div class="noteLeft">招标项目编号：</div>
                                        <div class="noteFlex">
                                            <span>{{biddingProjectNumber}}</span>
                                        </div>
                                        <div style="display: inline-flex;margin-left:30px;width:50%;">
                                            <span style="width:180px;">招标项目预算金额(万元)：</span>
                                            <span>{{budgetAmount}}</span>
                                        </div>
                                        </div>
                                    </div>
                                    <!-- 表格 -->
                                    <div class="table_box" v-if="projectObj.totalProjectId.indexOf('-') > 0">
                                        <el-table :data="enclosureData" stripe style="width: 100%">
                                            <el-table-column  type="index"  label="序号" :index="typeIndex" width="70">
                                            </el-table-column>
                                            <el-table-column  prop="entrySubcontractNumber"  label="入场项目(分包)编号" width="200">
                                            </el-table-column>
                                            <el-table-column  prop="subcontractName"  label="分包名称">
                                            </el-table-column>
                                            <el-table-column  prop="subcontractingControlAmount"  label="分包控制金额(万元)">
                                            </el-table-column>
                                            <el-table-column   label="创建时间">
                                                <template slot-scope="scope">
                                                    <span>{{projectSubcontractCreationTime}}</span>
                                                </template>
                                            </el-table-column>
                                            <el-table-column prop="operation" label="查看">
                                                <template slot-scope="scope">
                                                    <i class="el-icon-search" @click="lookFile(scope.row)"></i>
                                                </template>
                                            </el-table-column>
                                        </el-table>
                                    </div>
                                    <!-- 招标采购人 -->
                                    <div class="noteBox">
                                        <div class="noteContent">
                                            <div class="noteLeft">招标(采购)人：</div>
                                            <div class="noteFlex">
                                                <span>{{nameOfPurchaser}}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- 地址 -->
                                    <div class="noteBox">
                                        <div class="noteContent">
                                            <div class="noteLeft">地址：</div>
                                            <div class="noteFlex">
                                                <span></span>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- 联系方式 -->
                                    <div class="noteBox">
                                        <div class="noteContent">
                                            <div class="noteLeft">联系方式：</div>
                                            <div class="noteFlex">
                                                <span>{{contactInformation}}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </el-collapse-item>
                        <!-- 附件 -->
                        <el-collapse-item title="附件" name="2">
                            <div class="new_m_b">
                                <div class="new_m_b2">
                                    <el-table :data="appendixData" stripe style="width: 100%">
                                        <el-table-column  prop="appendixName"  label="附件名称">
                                        </el-table-column>
                                        <el-table-column   label="附件列表(点击查看)">
                                            <template slot-scope="scope">
                                                <li v-for='item in scope.row.attachlist' @click="downLoadupFile(item)" class="temLi">
                                                    {{item.fileName}}
                                                </li>
                                            </template>
                                        </el-table-column>
                                        <el-table-column prop="operation" label="管理">
                                            <template slot-scope="scope">
                                                <i class="el-icon-setting"  style="cursor: pointer;" @click="shezhi(scope.row)"></i>
                                            </template>
                                        </el-table-column>
                                    </el-table>
                                </div>
                            </div>
                        </el-collapse-item>
                        <!-- 公告信息 -->
                        <el-collapse-item title="公告信息" name="3">
                            <div class="new_m_b">
                                <div class="new_m_b2">
                                    <!--公告名称  -->
                                    <div class="noteBox">
                                        <div class="noteContent">
                                            <div class="noteLeft">公告名称：</div>
                                            <div class="noteFlex">
                                                <span>{{subcontractNames}}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- 变更日期 -->
                                    <div class="noteBox">
                                        <div class="noteContent">
                                            <div class="noteLeft">变更日期：</div>
                                            <div class="noteFlex">
                                                <span>{{changeDate}}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <!--变更理由  -->
                                    <div class="noteBox">
                                        <div class="noteContent">
                                            <div class="noteLeft">变更理由：</div>
                                            <div class="noteFlex">
                                                <span>{{changeReason}}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <!--变更事项  -->
                                    <div class="noteBox">
                                        <div class="noteContent">
                                            <div class="noteLeft">变更事项：</div>
                                            <div class="noteFlex">
                                                <span>{{changesAs}}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- 是否变更投标事宜 -->
                                    <div class="noteBox" style="margin-top:10px;">
                                        <div class="noteContent">
                                            <div class="noteLeft">是否变更投标事宜：</div>
                                            <div class="noteFlex">
                                                <span>{{isChangeBidMatters}}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <!--是否变更开标事宜  -->
                                    <div class="noteBox">
                                        <div class="noteContent">
                                            <div class="noteLeft">是否变更开标事宜：</div>
                                            <div class="noteFlex">
                                                <span>{{isChangeBidCpenMatters}}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- 当投标事宜为是  的时候出现 -->
                                    <div v-show="isTenderShow">
                                        <!-- 报名开始结束时间 -->
                                        <div class="noteBox">
                                            <div class="noteContent">
                                                <div class="noteLeft">报名开始时间：</div>
                                                <div class="noteFlex">
                                                    <span>{{enrollStartTime}}</span>
                                                </div>
                                                <div style="display: inline-flex;margin-left:30px;width:50%;">
                                                    <span style="width:130px;">报名结束时间:</span>
                                                    <span>{{enrollEndTime}}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <!-- 招标文件发售时间 -->
                                        <div class="noteBox">
                                            <div class="noteContent">
                                                <div class="noteLeft">招标文件发售时间：</div>
                                                <div class="noteFlex">
                                                    <span>{{saleReceiveStartDate}}到{{saleReceiveEndDate}} 上午{{morningbegin}}到{{morningend}}，下午{{afterbegin}}到{{afterend}}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <!--招标文件发售地点  -->
                                        <div class="noteBox">
                                            <div class="noteContent">
                                                <div class="noteLeft">招标文件发售地点：</div>
                                                <div class="noteFlex">
                                                <span>{{tenderDocumentsSaleSite}}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <!-- 招标文件工本费 -->
                                        <div class="noteBox">
                                            <div class="noteContent">
                                                <div class="noteLeft">招标文件工本费：</div>
                                                <div class="noteline">
                                                    <p>人民币</p>
                                                    <div class="moneyBox">
                                                        <span>{{tenderDocumentsCost}}</span>
                                                        元
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <!-- 工本费接收账户 -->
                                        <div class="noteBox">
                                            <div class="noteContent">
                                                <div class="noteLeft">工本费接收账户：</div>
                                                <div class="noteFlex">
                                                    <span>{{costAcceptAccount}}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <!-- 投标人需提交资料 -->
                                        <div class="noteBox"  style="margin-top:10px;">
                                            <div class="noteContent">
                                                <div class="noteLeft">投标人需提交资料：</div>
                                                <div class="noteFlex">
                                                <span>{{bidderData}}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- 当开标事宜为是 的时候出现 -->
                                    <div  v-show="isOpenTenderShow">
                                        <!-- 递交截止时间 -->
                                        <div class="noteBox">
                                            <div class="noteContent">
                                                <div class="noteLeft">递交截止时间：</div>
                                                <div class="noteFlex">
                                                <span>{{submitBidFileEndTime}}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <!--递交投标文件地点  -->
                                        <div class="noteBox">
                                            <div class="noteContent">
                                                <div class="noteLeft">递交投标文件地点：</div>
                                                <div class="noteFlex">
                                                <span>{{submitBidFileSite}}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <!-- 开标时间 -->
                                        <div class="noteBox">
                                            <div class="noteContent">
                                                <div class="noteLeft">开标时间：</div>
                                                <div class="noteFlex">
                                                <span>{{bidOpeningDate}}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <!-- 开标地点 -->
                                        <div class="noteBox">
                                            <div class="noteContent">
                                                <div class="noteLeft">开标地点：</div>
                                                <div class="noteFlex">
                                                <span>{{bidOpeningSite}}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <!-- 评标办法和标准 -->
                                        <div class="noteBox">
                                            <div class="noteContent">
                                                <div class="noteLeft">评标办法和标准：</div>
                                                <div class="noteFlex">
                                                    <span>{{bidEvaluationStandard}}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <!--负责人和联系方式  -->
                                        <div class="noteBox">
                                            <div class="noteContent">
                                                <div class="noteLeft">项目负责人：</div>
                                                <div class="noteFlex">
                                                    <span>{{projectLeader}}</span>
                                                </div>
                                                <div style="display: inline-flex;margin-left:30px;width:50%;">
                                                    <span style="width:130px;">联系方式:</span>
                                                    <span>{{projectLeaderPhone}}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <!-- 备注 -->
                                        <div class="noteBox" style="margin-bottom:10px;">
                                            <div class="noteContent">
                                                <div class="noteLeft">备注：</div>
                                                <div class="noteFlex">
                                                    <span>{{remark}}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </el-collapse-item>
                        <!-- 公告内容 -->
                        <el-collapse-item title="公告内容" name="4">
                            <div class="new_m_b">
                                <div class="new_m_b2" style="width:80%;">
                                    <div class="fail_box">
                                        <div>{{noticeName}}</div>
                                        <div>变更公告</div>
                                        <div style="font-size:14px;font-weight:normal;color:#333;">{{myTime}}</div>
                                    </div>
                                    <!-- 招标（采购）项目名称 -->
                                    <div class="noteBox">
                                        <div class="noteContent">
                                            <div class="noteLeft" style="width:220px;">招标项目名称：</div>
                                            <div class="noteFlex">
                                                <span>{{nameOfTenderProject}}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- 招标（采购）项目编号： -->
                                    <div class="noteBox">
                                        <div class="noteContent">
                                            <div class="noteLeft" style="width:220px;">招标项目编号：</div>
                                            <div class="noteFlex">
                                                <span>{{biddingProjectNumber}}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- 招标（采购）项目预算金额 -->
                                    <div class="noteBox">
                                        <div class="noteContent">
                                            <div class="noteLeft" style="width:220px;">招标项目预算金额：</div>
                                            <div class="noteFlex">
                                                <span>{{budgetAmount}}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- 资金来源 -->
                                    <div class="noteBox">
                                        <div class="noteContent">
                                            <div class="noteLeft" style="width:220px;">资金来源：</div>
                                            <div class="noteFlex">
                                                <span>{{sourceOfFunds}}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <!--资金比例  -->
                                    <div class="noteBox">
                                        <div class="noteContent">
                                            <div class="noteLeft" style="width:220px;">资金比例：</div>
                                            <div class="noteFlex">
                                                <span class="guoyou"><span>国有资金：<span>{{stateOwnedFunds}}</span>万元,<span>{{stateOwnedFundsPercentage}}</span>%;</span></span>
                                                <span class="ziyou"><span>自有资金：<span>{{ownFunds}}</span>万元,<span>{{ownFundsPercentage}}</span>%;</span></span>
                                                <span class="waiguo"><span>外国政府及组织资金：<span>{{foreignGovernmentsAndOrganizationalFunds}}</span>万元,<span>{{foreignGovernmentsAndOrganizationalFundsPercentage}}</span>%;</span></span>
                                                <span class="jingwai"><span>境外人投资：<span>{{overseasPrivateInvestment}}</span>万元,<span>{{overseasPrivateInvestmentPercentage}}</span>%;</span></span>
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
                                    <div style="font-weight:bold;">变更历史</div>
                                    <!--首次公告日期  -->
                                    <div class="noteBox">
                                        <div class="noteContent">
                                            <div class="noteLeft" style="width:220px;">首次公告日期：</div>
                                            <div class="noteFlex">
                                                <span>{{creationTime}}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <!--首次变更日期  -->
                                    <div class="noteBox">
                                        <div class="noteContent">
                                            <div class="noteLeft" style="width:220px;">首次变更日期：</div>
                                            <div class="noteFlex">
                                                <span>{{changeDate}}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- 本次变更内容 -->
                                    <div style="font-weight:bold;">本次变更内容</div>
                                    <!--变更日期  -->
                                    <div class="noteBox">
                                        <div class="noteContent">
                                            <div class="noteLeft" style="width:220px;">变更日期：</div>
                                            <div class="noteFlex">
                                                <span>{{changeDate}}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <!--变更理由  -->
                                    <div class="noteBox">
                                        <div class="noteContent">
                                            <div class="noteLeft" style="width:220px;">变更理由：</div>
                                            <div class="noteFlex">
                                                <span>{{changeReason}}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <!--变更事项  -->
                                    <div class="noteBox">
                                        <div class="noteContent">
                                            <div class="noteLeft" style="width:220px;">变更事项：</div>
                                            <div class="noteFlex">
                                                <span>{{changesAs}}</span>
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
                                    <div style="font-weight:bold;text-align:right;width:100%;margin-bottom:10px;">
                                        <div>测试用户1</div>
                                        <div>{{myTime}}</div>
                                    </div>
                                </div>
                            </div>
                        </el-collapse-item>
                        <!-- 办理记录 -->
                        <el-collapse-item title="办理记录" name="6">
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
                        </el-collapse-item>
                    </el-collapse>
                </div>
            </div>
            <!-- 上传变更附件弹框 -->
            <div class="mask1" v-show="file"></div>
            <div class="file_box" v-show="file">
                <!-- 头部 -->
                <div class="file_head">
                    <div class="file_title" style="padding-left:10px;">变更附件</div>
                    <div style="padding-right:10px;font-size:25px;cursor:pointer;" @click="closeBGFile()">×</div>
                </div>
                <!-- 上传删除 -->
                <div class="file_nav">
                    <input type="file" @change="loadFile($event)" ref="file" name="file" class="file_btn" multiple="multiple" accept=".doc,.docx,.txt,.rar,.zip,.xls,.xlsx,.pdf,image/gif,image/png,image/bmp,image/pdf,image/jpg,image/jpeg">
                    <button style="margin-right:3px;">上传</button>
                    <button @click="deleteFile()">删除</button>
                </div>
                <!-- 表格 -->
                <div class="fileTableData">
                    <el-table :data="fileData" style="width: 100%"  @selection-change="handleChangeFile">
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
            <!-- 点击开标事宜为是的时候出现 -->
            <el-dialog
                title="信息确认"
                :visible.sync="sureSubmitBox"
                width="46%"
                :before-close="handleClose">
                <div class="icon">
                    <i class="el-icon-question"></i>
                    <span>提醒：若确定变更开标时间及地点，请点击“确定”当前页面将自动关闭。请前往“场地预约”环节重新预约场地并提交中心审核。审核通过后再操作“变更公告”。</span>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="sure()">确 定</el-button>
                    <el-button type="primary" @click="closeQx()">取 消</el-button>
                </span>
            </el-dialog>
            <!-- 确认保存弹窗 -->
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
                    <el-button type="primary" @click="sureSave()">确 定</el-button>
                </span>
            </el-dialog>
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
            <!--确认上一次是否通过变更弹窗 -->
            <el-dialog
                title="错误信息"
                :visible.sync="isPassBoxShow"
                width="40%"
                :before-close="handleClose">
                <div class="icon">
                    <i class="el-icon-error"></i>
                    <span>上一次变更公告还未审核通过！</span>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="isPssSave()">确 定</el-button>
                </span>
            </el-dialog>
            <!-- 是否删除 -->
            <el-dialog
                title="信息提示"
                :visible.sync="isdeleteBoxShow"
                width="40%"
                :before-close="handleClose">
                <div class="icon">
                    <i class="el-icon-question"></i>
                    <span>您确定删除选中的记录吗?</span>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="isdeleteSave()">确 定</el-button>
                </span>
            </el-dialog>
            <!--第一次变更审核通过，不可删除 -->
            <el-dialog
                title="系统提示"
                :visible.sync="isStateBoxShow"
                width="40%"
                :before-close="handleClose">
                <div class="icon">
                    <i class="el-icon-warning"></i>
                    <span>第<b>{{times}}</b>次变更审核通过，不可删除！</span>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="isStateSave()">确 定</el-button>
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
                    <span>招标公告尚未提交通过，无法进行变更公告操作!</span>
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
                passJudgeShow:true,
                frameShow:false,
                subcontractNames:'',//分包名称
                myTime:'',//获取公告内容的发布时间
                examineState:'',//审核状态删除需要用到的
                projectObj:JSON.parse(window.localStorage.projectObj),
                activeName:'2',
                value1:'',
                isdeleteBoxShow:false,//确定是否删除
                isStateBoxShow:false,//第一次变更审核通过，不可删除
                isPassBoxShow:false,//判断上一次变更是否通过弹框
                submitBoxShow:false,//点击提交成功弹框
                saveBox:false,//点击保存成功弹框
                sureSubmitBox:false,//点击开标事宜的弹框
                addShow:false,//新增变更公告弹框上一步
                nextShow:false,//下一步弹框
                isTenderShow:false,//当投标事宜为是的时候出现
                isOpenTenderShow:false,//当开标事宜为是的时候出现
                file:false,//上传附件弹框
                tableData:[],//进入页面的表格数据
                enclosureData:[],
                handleRecordData:[],//办理记录列表
                fileData:[],//上传数据
                appendixData:[
                    {
                        appendixName: "变更附件",
                        attachlist: []
                    },
                ],//附件名称数据
                currentPage:1,//当前页
                search:'',//单位名称搜索
                nameOfTenderProject:'',//招标项目名称
                nameOfPurchaser:'',//招标采购人
                amountOfBiddingProject:'',//招标项目金额
                biddingProjectNumber:'',//招标项目编号
                totalProId:'',//入场项目编号
                budgetAmount:'',//招标项目预算金额
                contactInformation:'',//联系方式
                contacts:'',//联系人
                projectSubcontractCreationTime:'',//创建时间
                noticeName:'',//公告名称
                changeDate:'',//变更日期
                changeReason:'',//变更理由
                changesAs:"",//变更事项
                isChangeBidMatters:'否',//是否变更投标事宜
                isChangeBidCpenMatters:'否',//是否变更开标事宜
                enrollStartTime:'',//报名开始时间
                enrollEndTime:'',//报名结束时间
                sellTime:'',//发售时间
                saleReceiveStartDate :'',//招标文件发售开始时间   
                saleReceiveEndDate:'',//招标文件发售结束时间 
                morningbegin:'',// 上午开始时间
                morningend:'',// 上午结束时间
                afterbegin:'',// 下午开始时间
                afterend:'',// 下午结束时间
                saleStartTime:'',//上午发售时间
                saleEndTime:'',//下午发售时间    
                tenderDocumentsSaleSite:'',//招标文件发售地点
                tenderDocumentsCost:'',//招标文件工本费
                costAcceptAccount:'',//工本费接收账户
                bidderData:'',//投标人所需提交资料
                submitBidFileEndTime:'',//递交文件截止时间
                submitBidFileSite:'',//递交文件投标地点
                bidOpeningDate:'',//开标时间
                bidOpeningSite:'',//开标地点
                bidEvaluationStandard:'',//评标办法和标准
                projectLeader:'',//项目负责人
                projectLeaderPhone:'',//联系方式
                remark:'',//备注
                projectNum:'',//一进入页面的入场(分包)项目编号
                tenderInforId:[],//提交主键
                tenderCarId:'',//主键字符串
                times:'1',//次数
                sourceOfFunds:'',//资金来源
                stateOwnedFunds:'',//国有资金
                stateOwnedFundsPercentage:'',//国有资金百分比
                ownFunds:'',//自有资金
                ownFundsPercentage:'',//自有资金百分比
                foreignGovernmentsAndOrganizationalFunds:'',//外国政府及组织资金
                foreignGovernmentsAndOrganizationalFundsPercentage:'',//外国政府及组织资金百分比
                overseasPrivateInvestment:'',//境外人投资
                overseasPrivateInvestmentPercentage:'',//境外人投资百分比
                tendereeAddress:'',//公告内容-->招标采购人地址
                creationTime:'',//首次公告时间--》当times=0的时候
                attachmeId:[],//上传文件id
            }
        },
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
                        this.budgetAmount = res.data.data.budgetAmount;//招标项目预算金额
                        this.contactInformation = res.data.data.contactInformation//联系方式
                        this.contacts = res.data.data.contacts//联系人
                        this.sourceOfFunds =res.data.data.sourceOfFunds//资金来源
                        if(res.data.data.stateOwnedFunds != null){//国有资金
                            this.stateOwnedFunds = res.data.data.stateOwnedFunds;
                            this.stateOwnedFundsPercentage = res.data.data.stateOwnedFundsPercentage;
                        }else{
                            $('.guoyou').hide();
                        };
                        if(res.data.data.ownFunds != null){//自有资金
                            this.ownFunds = res.data.data.ownFunds;
                            this.ownFundsPercentage = res.data.data.ownFundsPercentage;
                        }else{
                            $('.ziyou').hide();
                        };
                        if(res.data.data.foreignGovernmentsAndOrganizationalFunds != null){//外国政府及组织
                            this.foreignGovernmentsAndOrganizationalFunds = res.data.data.foreignGovernmentsAndOrganizationalFunds;
                            this.foreignGovernmentsAndOrganizationalFundsPercentage = res.data.data.foreignGovernmentsAndOrganizationalFundsPercentage;
                        }else{
                            $('.waiguo').hide();
                        };
                        if(res.data.data.overseasPrivateInvestment != null){//境外投资
                            this.overseasPrivateInvestment = res.data.data.overseasPrivateInvestment;
                            this.overseasPrivateInvestmentPercentage= res.data.data.overseasPrivateInvestmentPercentage;
                        }else{
                            $('.jingwai').hide();
                        }
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
                        this.enclosureData = res.data.data;
                        if(res.data.data[0].projectSubcontractCreationTime == null){
                            this.projectSubcontractCreationTime = "";
                        }else{
                            this.projectSubcontractCreationTime = dayjs(res.data.data[0].projectSubcontractCreationTime).format('YYYY-MM-DD HH:ss:mm');
                        }
                        this.subcontractNames = res.data.data[0].subcontractName;
                        
                    }else{
                        this.$layer.msg(res.data.msg)
                    }
                    
                }).catch(err=>{
                    console.log(err)
                })
            },
            //获取列表
            getDataList(){
                let obj={};
               if(this.projectObj.totalProjectId.indexOf("-") != -1){
                    obj={
                        entrySubcontractNumber:this.projectObj.totalProjectId
                    }
                }else{
                    obj={
                        projectCode:this.projectObj.totalProjectId
                    }
                }
                this.$axios({
                    method: "POST",
                    url: baseUrl+"/tenderInforController/selectList",
                    data:obj
                }).then(res=>{
                    if(res.data.status == 200){
                        this.tableData = res.data.data;
                        this.tableData.map((item,index)=>{
                            if(this.projectObj.totalProjectId.indexOf("-") != -1){
                                this.projectNum = item.entrySubcontractNumber;
                            }else{
                                this.projectNum = item.projectCode;
                            }
                        })
                    }else{
                        this.$layer.msg(res.data.msg)
                    }
                }).catch(err=>{
                    console.log(err);
                })
            },
           //公告内容历史时间记录查询
           getHistoryData(){
               let obj={};
               if(this.projectObj.totalProjectId.indexOf("-") != -1){
                    obj={
                        entrySubcontractNumber:this.projectObj.totalProjectId
                    }
                }else{
                    obj={
                        projectCode:this.projectObj.totalProjectId
                    }
                }
               this.$axios({
                   method:'POST',
                   url:baseUrl + '/tenderInforController/selectAll',
                   data:obj
               }).then(res=>{
                   if(res.data.status == 200){
                       if(res.data.data.times == 0){
                           if(res.data.data.creationTime == null){
                               this.creationTime = ""
                           }else{
                               this.creationTime = dayjs(res.data.data.creationTime).format('YYYY-MM-DD');
                           }
                       }else if(res.data.data.times == 1){
                           if(res.data.data.changeDate == null){
                               this.changeDate = ""
                           }else{
                               this.changeDate = dayjs(res.data.data.changeDate).format('YYYY-MM-DD');
                           }
                       }
                   }else{
                       this.$layer.msg(res.data.msg)
                   }
               }).catch(err=>{
                   console.log(err)
               })
           },
            //编号问题
            typeIndex(index) {
                return index + (this.currentPage - 1) * 10 + 1;
            },
            //点击查看详情
            lookPaper(row){
                this.times = row.times;
                this.$axios({
                    method: "POST",
                    url: baseUrl+"/tenderInforController/selectById",
                    data:{
                        tenderInforId:row.tenderInforId
                    }
                }).then(res=>{
                    if(res.data == null){
                        this.addShow = true;
                    }else if(res.data.data.state == '编辑中'){
                        this.nextShow = true;
                        this.addShow = false;
                        // 上午和下午起始时间
                        this.saleStartTime=row.saleStartTime.split(',');
                        this.morningbegin = this.saleStartTime[0];
                        this.morningend = this.saleStartTime[1];
                        this.saleEndTime=row.saleEndTime.split(',');
                        this.afterbegin = this.saleEndTime[0];
                        this.afterend = this.saleEndTime[1];

                        this.noticeName = row.noticeName;
                        if(row.changeDate != null){
                            this.changeDate= dayjs(row.changeDate).format('YYYY-MM-DD');
                        }else{
                            this.changeDate = "";
                        }
                        this.changeReason=row.changeReason;
                        this.changesAs=row.changesAs;
                        this.isChangeBidMatters=row.isChangeBidMatters;
                        this.isChangeBidCpenMatters=row.isChangeBidCpenMatters;
                        if(row.enrollStartTime == null){
                            this.enrollStartTime = ""
                        }else{
                            this.enrollStartTime= dayjs(row.enrollStartTime).format('YYYY-MM-DD');//报名开始时间
                        };
                        if(row.enrollEndTime == null){
                            this.enrollEndTime = ""
                        }else{
                            this.enrollEndTime= dayjs(row.enrollEndTime).format('YYYY-MM-DD');//报名结束时间
                        };
                        if(row.saleReceiveStartDate == null){
                            this.saleReceiveStartDate = ""
                        }else{
                            this.saleReceiveStartDate= dayjs(row.saleReceiveStartDate).format('YYYY-MM-DD');//招标文件发售开始时间
                        };
                        if(row.saleReceiveEndDate == null){
                            this.saleReceiveEndDate = ""
                        }else{
                            this.saleReceiveEndDate= dayjs(row.saleReceiveEndDate).format('YYYY-MM-DD');//招标文件发售结束时间 
                        }
                        
                        this.tenderDocumentsSaleSite=row.tenderDocumentsSaleSite;//招标文件发售地点
                        this.tenderDocumentsCost=row.tenderDocumentsCost;//招标文件工本费
                        this.costAcceptAccount=row.costAcceptAccount;//工本费接收账户
                        this.bidderData=row.bidderData;//投标人所需提交资料
                        this.bidEvaluationStandard=row.bidEvaluationStandard;//评标办法和标准
                        this.projectLeader=row.projectLeader;//项目负责人
                        this.projectLeaderPhone=row.projectLeaderPhone;//联系方式
                        this.remark=row.remark;//备注
                        this.tenderCarId = row.tenderInforId;//主键
                    }else if(res.data.data.state == '办理通过' || res.data.data.state == '待办理'){
                        this.nextShow = true;
                        this.addShow = false;
                        $('.new_nav').hide();
                        // 上午和下午起始时间
                        this.saleStartTime=row.saleStartTime.split(',');
                        this.morningbegin = this.saleStartTime[0];
                        this.morningend = this.saleStartTime[1];
                        this.saleEndTime=row.saleEndTime.split(',');
                        this.afterbegin = this.saleEndTime[0];
                        this.afterend = this.saleEndTime[1];

                        this.noticeName = row.noticeName;
                        if(row.changeDate != null){
                            this.changeDate= dayjs(row.changeDate).format('YYYY-MM-DD');
                        }else{
                            this.changeDate = "";
                        }
                        this.changeReason=row.changeReason;
                        this.changesAs=row.changesAs;
                        this.isChangeBidMatters=row.isChangeBidMatters;
                        this.isChangeBidCpenMatters=row.isChangeBidCpenMatters;
                        if(row.enrollStartTime == null){
                            this.enrollStartTime = ""
                        }else{
                            this.enrollStartTime= dayjs(row.enrollStartTime).format('YYYY-MM-DD');//报名开始时间
                        };
                        if(row.enrollEndTime == null){
                            this.enrollEndTime = ""
                        }else{
                            this.enrollEndTime= dayjs(row.enrollEndTime).format('YYYY-MM-DD');//报名结束时间
                        };
                        if(row.saleReceiveStartDate == null){
                            this.saleReceiveStartDate = ""
                        }else{
                            this.saleReceiveStartDate= dayjs(row.saleReceiveStartDate).format('YYYY-MM-DD');//招标文件发售开始时间
                        };
                        if(row.saleReceiveEndDate == null){
                            this.saleReceiveEndDate = ""
                        }else{
                            this.saleReceiveEndDate= dayjs(row.saleReceiveEndDate).format('YYYY-MM-DD');//招标文件发售结束时间 
                        }
                        this.tenderDocumentsSaleSite=row.tenderDocumentsSaleSite;//招标文件发售地点
                        this.tenderDocumentsCost=row.tenderDocumentsCost;//招标文件工本费
                        this.costAcceptAccount=row.costAcceptAccount;//工本费接收账户
                        this.bidderData=row.bidderData;//投标人所需提交资料
                        this.bidEvaluationStandard=row.bidEvaluationStandard;//评标办法和标准
                        this.projectLeader=row.projectLeader;//项目负责人
                        this.projectLeaderPhone=row.projectLeaderPhone;//联系方式
                        this.remark=row.remark;//备注
                        this.tenderCarId = row.tenderInforId;//主键
                    }
                }).catch(err=>{
                    console.log(err)
                })
            },
            //新增变更公告
            addFile(){
                this.getbiddingInfo();
                this.addShow = true;
                this.noticeName = "";
                this.changeDate = "";
                this.changeReason = "";
                this.changesAs = "";
                this.isChangeBidMatters = "否";
                this.isChangeBidCpenMatters = "否";
                //检验上一次变更是否通过
                let obj={};
                if(this.projectObj.totalProjectId.indexOf("-") != -1){
                    obj={
                        entrySubcontractNumber:this.projectObj.totalProjectId
                    }
                }else{
                    obj={
                        projectCode:this.projectObj.totalProjectId
                    }
                }
                this.$axios({
                    method: "POST",
                    url: baseUrl+"/tenderInforController/checkNoticeState",
                    data:obj
                }).then(res=>{
                    if(res.data.status == 200){
                        this.getbiddingInfo();
                        this.addShow = true;
                        this.noticeName = this.nameOfTenderProject;
                    }else{
                        this.isPassBoxShow = true;
                    }
                }).catch(err=>{
                    console.log(err)
                })
            },
            isPssSave(){
                this.isPassBoxShow = false;
            },
            closeAddShow(){
                this.addShow = false;
            },
            //删除列表
            handleSelectionChange(val){
                let deleteArr = [];
                let deleteId = [];
                for(let i in val){
                    deleteArr.push(val[i].tenderInforId);
                    deleteId.push(val[i].state);
                }
                this.tenderInforId = deleteArr;
                this.examineState = deleteId;
            },
            deleteCheck(){
                this.isdeleteBoxShow = true;
            },
            //是否删除选中的这几项
            isdeleteSave(){
                if(this.examineState.indexOf('编辑中') > -1){//包含编辑中
                    this.isStateBoxShow = true;
                    this.isdeleteBoxShow = false;
                }else{
                    this.isdeleteBoxShow = false;
                    this.$axios({
                        method: "POST",
                        url: baseUrl+"/tenderInforController/deleteById",
                        data:{
                            tenderInforId:this.tenderInforId.join(',')
                        }
                    }).then(res=>{
                        if(res.data.status == 200){
                            for(var i=0;i<this.tableData.length;i++){
                                for(var j=0;j<this.tenderInforId.length;j++){
                                    if(this.tableData[i].tenderInforId == this.tenderInforId[j]){
                                        this.tableData.splice(i,1);
                                    }
                                }
                            }
                        }else{
                           this.$layer.msg(res.data.msg)
                        }
                    }).catch(err=>{
                        console.log(err)
                    })
                }
            },
            isStateSave(){
                this.isStateBoxShow = false;
            },
            //下一步
            nextTo(){
                this.getRecordList();
                // if(!this.changesAs){
                //     this.$layer.msg('请输入变更事项');
                //     return false;
                // }else if(!this.isChangeBidMatters){
                //     this.$layer.msg('请选择投标变更事宜');
                //     return false;
                // }else if(!this.isChangeBidCpenMatters){
                //     this.$layer.msg('请选择开标变更事宜');
                //     return false;
                // }
                // 上午发售时间
                let morningArr = [];
                morningArr.push(this.morningbegin,this.morningend)
                this.saleStartTime = morningArr.toString();
                // 下午发售时间
                let afterArr = [];
                afterArr.push(this.afterbegin,this.afterend)
                this.saleEndTime = afterArr.toString();
                
                let objData={};
                if(this.projectObj.totalProjectId.indexOf("-") != -1){
                    //分包
                    objData ={
                        entrySubcontractNumber: this.projectObj.totalProjectId,
                        noticeName:this.subcontractNames,
                        changeDate:this.changeDate,
                        changeReason:this.changeReason,
                        changesAs:this.changesAs,
                        isChangeBidMatters:this.isChangeBidMatters,
                        isChangeBidCpenMatters:this.isChangeBidCpenMatters,
                        enrollStartTime:this.enrollStartTime,//报名开始时间
                        enrollEndTime:this.enrollEndTime,//报名结束时间
                        saleReceiveStartDate :this.sellTime[0],//招标文件发售开始时间   
                        saleReceiveEndDate:this.sellTime[1],//招标文件发售结束时间  
                        saleStartTime:this.saleStartTime,//上午发售时间
                        saleEndTime:this.saleEndTime,//下午发售时间    
                        tenderDocumentsSaleSite:this.tenderDocumentsSaleSite,//招标文件发售地点
                        tenderDocumentsCost:this.tenderDocumentsCost,//招标文件工本费
                        costAcceptAccount:this.costAcceptAccount,//工本费接收账户
                        bidderData:this.bidderData,//投标人所需提交资料
                        bidEvaluationStandard:this.bidEvaluationStandard,//评标办法和标准
                        projectLeader:this.projectLeader,//项目负责人
                        projectLeaderPhone:this.projectLeaderPhone,//联系方式
                        remark:this.remark,//备注
                    }
                }else{
                    objData ={
                        projectCode: this.projectObj.totalProjectId,
                        noticeName:this.subcontractNames,
                        changeDate:this.changeDate,
                        changeReason:this.changeReason,
                        changesAs:this.changesAs,
                        isChangeBidMatters:this.isChangeBidMatters,
                        isChangeBidCpenMatters:this.isChangeBidCpenMatters,
                        enrollStartTime:this.enrollStartTime,//报名开始时间
                        enrollEndTime:this.enrollEndTime,//报名结束时间
                        saleReceiveStartDate :this.sellTime[0],//招标文件发售开始时间   
                        saleReceiveEndDate:this.sellTime[1],//招标文件发售结束时间  
                        saleStartTime:this.saleStartTime,//上午发售时间
                        saleEndTime:this.saleEndTime,//下午发售时间    
                        tenderDocumentsSaleSite:this.tenderDocumentsSaleSite,//招标文件发售地点
                        tenderDocumentsCost:this.tenderDocumentsCost,//招标文件工本费
                        costAcceptAccount:this.costAcceptAccount,//工本费接收账户
                        bidderData:this.bidderData,//投标人所需提交资料
                        bidEvaluationStandard:this.bidEvaluationStandard,//评标办法和标准
                        projectLeader:this.projectLeader,//项目负责人
                        projectLeaderPhone:this.projectLeaderPhone,//联系方式
                        remark:this.remark,//备注
                    }
                }
                this.$axios({
                    method: "POST",
                    url: baseUrl+"/tenderInforController/nextStepNoticeChange",
                    data:objData
                }).then(res=>{
                    if(res.data.status == 200){
                        this.getHistoryData();
                        this.uploadList();
                        this.nextShow = true;
                        this.addShow = false;
                        // 上午和下午起始时间
                        this.saleStartTime=res.data.data.saleStartTime.split(',');
                        this.morningbegin = this.saleStartTime[0];
                        this.morningend = this.saleStartTime[1];
                        this.saleEndTime=res.data.data.saleEndTime.split(',');
                        this.afterbegin = this.saleEndTime[0];
                        this.afterend = this.saleEndTime[1];

                        this.subcontractNames = res.data.data.noticeName;
                        if(res.data.data.changeDate != null){
                            this.changeDate= dayjs(res.data.data.changeDate).format('YYYY-MM-DD');
                        }else{
                            this.changeDate = "";
                        }
                        this.changeReason=res.data.data.changeReason;
                        this.changesAs=res.data.data.changesAs;
                        this.isChangeBidMatters=res.data.data.isChangeBidMatters;
                        this.isChangeBidCpenMatters=res.data.data.isChangeBidCpenMatters;
                        if(res.data.data.enrollStartTime != null){
                            this.enrollStartTime= dayjs(res.data.data.enrollStartTime).format('YYYY-MM-DD');//报名开始时间
                        }else{
                            this.enrollStartTime = ""
                        };
                        if(res.data.data.enrollEndTime != null){
                            this.enrollEndTime= dayjs(res.data.data.enrollEndTime).format('YYYY-MM-DD');//报名结束时间
                        }else{
                            this.enrollEndTime = ""
                        };
                        if(res.data.data.saleReceiveStartDate == null){
                            this.saleReceiveStartDate = ""
                        }else{
                            this.saleReceiveStartDate= dayjs(res.data.data.saleReceiveStartDate).format('YYYY-MM-DD');//招标文件发售开始时间
                        };
                        if(res.data.data.saleReceiveEndDate == null){
                            this.saleReceiveEndDate = ""
                        }else{
                            this.saleReceiveEndDate= dayjs(res.data.data.saleReceiveEndDate).format('YYYY-MM-DD');//招标文件发售结束时间 
                        }
                        this.tenderDocumentsSaleSite=res.data.data.tenderDocumentsSaleSite;//招标文件发售地点
                        this.tenderDocumentsCost=res.data.data.tenderDocumentsCost;//招标文件工本费
                        this.costAcceptAccount=res.data.data.costAcceptAccount;//工本费接收账户
                        this.bidderData=res.data.data.bidderData;//投标人所需提交资料
                        this.bidEvaluationStandard=res.data.data.bidEvaluationStandard;//评标办法和标准
                        this.projectLeader=res.data.data.projectLeader;//项目负责人
                        this.projectLeaderPhone=res.data.data.projectLeaderPhone;//联系方式
                        this.remark=res.data.data.remark;//备注
                        this.tenderCarId = res.data.data.tenderInforId;//主键
                        if(res.data.data.creationTime == null){
                            this.myTime = ""
                        }else{
                            this.myTime = dayjs(res.data.data.creationTime).format('YYYY-MM-DD');//发布日期
                        }
                        
                    }else{
                        this.$layer.msg(res.data.msg)
                    }
                }).catch(err=>{
                    console.log(err)
                })
            },
            //保存
            saveFile(){
                this.saveBox = true;
            },
            sureSave(){
                this.saveBox = false;
                // if(!this.changesAs){
                //     this.$layer.msg('请输入变更事项');
                //     return false;
                // }else if(!this.isChangeBidMatters){
                //     this.$layer.msg('请选择投标变更事宜');
                //     return false;
                // }else if(!this.isChangeBidCpenMatters){
                //     this.$layer.msg('请选择开标变更事宜');
                //     return false;
                // }
                // 上午发售时间
                let morningArr = [];
                morningArr.push(this.morningbegin,this.morningend)
                this.saleStartTime = morningArr.toString()
                // 下午发售时间
                let afterArr = [];
                afterArr.push(this.afterbegin,this.afterend)
                this.saleEndTime = afterArr.toString()
                let objData={};
                if(this.projectObj.totalProjectId.indexOf("-") != -1){
                    //分包
                    objData ={
                        entrySubcontractNumber: this.projectObj.totalProjectId,
                        noticeName:this.subcontractNames,
                        changeDate:this.changeDate,
                        changeReason:this.changeReason,
                        changesAs:this.changesAs,
                        isChangeBidMatters:this.isChangeBidMatters,
                        isChangeBidCpenMatters:this.isChangeBidCpenMatters,
                        enrollStartTime:this.enrollStartTime,//报名开始时间
                        enrollEndTime:this.enrollEndTime,//报名结束时间
                        saleReceiveStartDate :this.sellTime[0],//招标文件发售开始时间   
                        saleReceiveEndDate:this.sellTime[1],//招标文件发售结束时间  
                        saleStartTime:this.saleStartTime,//上午发售时间
                        saleEndTime:this.saleEndTime,//下午发售时间    
                        tenderDocumentsSaleSite:this.tenderDocumentsSaleSite,//招标文件发售地点
                        tenderDocumentsCost:this.tenderDocumentsCost,//招标文件工本费
                        costAcceptAccount:this.costAcceptAccount,//工本费接收账户
                        bidderData:this.bidderData,//投标人所需提交资料
                        bidEvaluationStandard:this.bidEvaluationStandard,//评标办法和标准
                        projectLeader:this.projectLeader,//项目负责人
                        projectLeaderPhone:this.projectLeaderPhone,//联系方式
                        remark:this.remark,//备注
                    }
                }else{
                    objData ={
                        projectCode: this.projectObj.totalProjectId,
                        noticeName:this.subcontractNames,
                        changeDate:this.changeDate,
                        changeReason:this.changeReason,
                        changesAs:this.changesAs,
                        isChangeBidMatters:this.isChangeBidMatters,
                        isChangeBidCpenMatters:this.isChangeBidCpenMatters,
                        enrollStartTime:this.enrollStartTime,//报名开始时间
                        enrollEndTime:this.enrollEndTime,//报名结束时间
                        saleReceiveStartDate :this.sellTime[0],//招标文件发售开始时间   
                        saleReceiveEndDate:this.sellTime[1],//招标文件发售结束时间  
                        saleStartTime:this.saleStartTime,//上午发售时间
                        saleEndTime:this.saleEndTime,//下午发售时间    
                        tenderDocumentsSaleSite:this.tenderDocumentsSaleSite,//招标文件发售地点
                        tenderDocumentsCost:this.tenderDocumentsCost,//招标文件工本费
                        costAcceptAccount:this.costAcceptAccount,//工本费接收账户
                        bidderData:this.bidderData,//投标人所需提交资料
                        bidEvaluationStandard:this.bidEvaluationStandard,//评标办法和标准
                        projectLeader:this.projectLeader,//项目负责人
                        projectLeaderPhone:this.projectLeaderPhone,//联系方式
                        remark:this.remark,//备注
                    }
                }
                this.$axios({
                    method: "POST",
                    url: baseUrl+"/tenderInforController/nextStepNoticeChange",
                    data:objData
                }).then(res=>{
                    if(res.data.status == 200){
                        this.getDataList();
                        this.addShow = false;
                    }else{
                       this.$layer.msg(res.data.msg)
                    }
                }).catch(err=>{
                    console.log(err)
                })
            },
            //上一步
            backTo(){
                this.nextShow = false;
                this.addShow = true;
                this.changeDate = new Date(this.changeDate).getTime();
                this.enrollStartTime = new Date(this.enrollStartTime).getTime();
                this.enrollEndTime = new Date(this.enrollEndTime).getTime();
                this.sellTime = new Date(this.sellTime).getTime();

            },
            //提交
            submitFile(){
                this.submitBoxShow = true;
            },
            submitSave(){
                this.$axios({
                    method: "POST",
                    url: baseUrl+"/tenderInforController/admissionNoticeSubmission",
                    data:{
                        state:'待办理',
                        tenderInforId:this.tenderCarId
                    }
                }).then(res=>{
                    if(res.data.status == 200){
                        this.submitBoxShow = false;
                        $('.new_nav').hide();
                        this.nextShow = true;
                    }else{
                        this.$layer.msg(res.data.msg);
                    }
                }).catch(err=>{
                    console.log(err)
                })
            },
            closeNextShow(){
                this.nextShow = false;
                this.addShow = true;
            },
            //上传变更附件弹框
            manageFile(){
                this.file = true;
            },
            closeBGFile(){
                this.file = false;
            },
            //当投标事宜变为是的时候出现
            changeFile(){
                if(this.isChangeBidMatters == "是"){
                    this.isTenderShow = true;
                }else{
                    this.isTenderShow = false;
                }
            },
            //当开标事宜变为是的时候出现
            changeKaiBiao(){
                if(this.isChangeBidCpenMatters == "是"){
                    this.sureSubmitBox = true;
                }else{
                    this.isOpenTenderShow = false;
                }
            },
            sure(){
                this.addShow = false;
                this.sureSubmitBox = false;
            },
            closeQx(){
                this.sureSubmitBox = false;
                this.isOpenTenderShow = true;
            },
            handleClose() {
                this.frameShow = false;
                this.saveBox = false;
                this.submitBoxShow = false;
                this.sureSubmitBox = false;
                this.isPassBoxShow =false;
                this.isdeleteBoxShow =false;
                this.isStateBoxShow = false;
            },
            //打开上传文件弹框
            shezhi(row){
                this.file = true;
                this.uploadList();
            },
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
                formData.append("projectId", this.tenderCarId);
                formData.append("file", this.files);
                formData.append("user", '张三');
                formData.append("fileType", '变更附件');
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
                        fileType:'变更附件',
                        relevanceCorrelationId:this.tenderCarId,
                    }
                }).then(res=>{
                        if(res.data.status == 200){
                            this.fileData = res.data.data;
                            var arr = [];
                            this.fileData.map((item,index)=>{
                                item.formatTime = dayjs(item.uploadTime).format('YYYY-MM-DD HH:mm:ss')
                                arr.push(item)
                            })
                            this.appendixData[0].attachlist = arr
                        }else{
                            this.$layer.msg(res.data.msg)
                        }
                    }).catch(err=>{
                        console.log(err);
                })
            },
            downLoadupFile(item){
                this.downloadFile(item.attachmeId,item.fileName)
            },
            //删除表格checkbox
            handleChangeFile(val){
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
                        this.$layer.msg(res.data.msg)
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
                            if(item.value == "招标公告" && item.state == "办理通过"){
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
            this.getbiddingInfo();
            this.getsubList();
            this.getDataList();
            this.uploadList();
            this.getRecordList();
            // this.getDecideList();
        }
    }
</script>

<style scoped>
.box{
    width: 100%;
    height: 35px;
    background: #d3d7d4;
}
b{
    font-weight: normal;
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
.btnBox{
    width: 100%;
    display: flex;
}
.mask,.mask1,.mask2 {
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
   z-index: 2;
}
.mask1{
   z-index: 4;
}
.file_box{
    z-index: 5;
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
.noteFlex span{
    padding: 0 2px;
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
.el-icon-question,.el-icon-error{
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
  .tab_main_box{
      width: 100%;
      height: 400px;
      overflow-y: scroll;
  }
</style>