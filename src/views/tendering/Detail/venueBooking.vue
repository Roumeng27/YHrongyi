<template>
    <div class="pageWrap">
        <div v-show="passJudgeShow">
            <!-- 上一步弹框 -->
            <div v-show="show">
                <div class="box">
                    <button class="btn" @click="saveFile()">保存</button>
                    <button class="btn" @click="nextTo()">下一步</button>
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
                                    <div class="table_box"  v-if="projectObj.totalProjectId.indexOf('-') > -1">
                                        <div style="font-weight:bold;">若需添加多分包，请点击<i class="el-icon-plus" style="font-size:26px;cursor:pointer;" @click="addSubpack()"></i>按钮</div>
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
                                                    <i class="el-icon-search" style="font-size:16px;cursor:pointer;" @click="lookFile(scope.row)"></i>
                                                </template>
                                            </el-table-column>
                                            <el-table-column prop="operation" label="删除">
                                                <template slot-scope="scope">
                                                    <i class="el-icon-close" style="font-size:16px;cursor:pointer;" @click="deleteFile(scope.row)"></i>
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
                                            <el-date-picker @blur="judgeTime()" value-format="timestamp" v-model="assessmentTime" type="datetime"  placeholder="选择日期时间">
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
                                                <el-radio-group v-model="appointmentEvaluationRoom" @change="changeRoom()">
                                                    <el-radio label="是">是</el-radio>
                                                    <el-radio label="否">否</el-radio>
                                                </el-radio-group>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- 配套服务 -->
                                    <div class="noteBox" v-show="peitao">
                                        <div class="noteContent">
                                            <div class="noteLeft">配套服务：</div>
                                            <div class="noteFlex">
                                                <el-checkbox-group v-model="supportingServices">
                                                    <el-checkbox v-for="workOff in offices" :label="workOff" :key="workOff">{{workOff}}</el-checkbox>
                                                </el-checkbox-group>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- 评标地点 -->
                                    <div class="noteBox" v-show="Pbaddress">
                                        <div class="noteContent">
                                            <div class="noteLeft">评标地点：</div>
                                            <div class="noteFlex">
                                                <el-input v-model="bidEvaluationSite"></el-input>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </el-collapse-item>
                        <!-- 场地使用信息 -->
                        <el-collapse-item title="场地使用信息" name="3">
                            <div style="display:flex;justify-content:space-between;margin:10px 0; padding:0 10px;">
                                <div>
                                    <el-date-picker style="width:70% !important;margin-right:10px;" v-model="time" value-format='timestamp' type="date" placeholder="选择日期">
                                    </el-date-picker>
                                    <el-button icon="el-icon-search" type="primary" @click="search()"></el-button>
                                </div>
                                <div>
                                    <el-button icon="el-icon-caret-left" type="text" @click="left()"></el-button>
                                    <span style="font-size:16px;">{{timeStr}}</span>
                                    <el-button icon="el-icon-caret-right" type="text" @click="right()"></el-button>
                                </div>
                            </div>
                            <div class="timePick">
                                <table width='100%' cellspacing="0" cellpadding="0" align="center" border="0" valign="top">
                                    <tbody>
                                    <tr style="height:50px;">
                                        <td class="GridTitle Room">房间</td>
                                        <td class="GridTitle Room">时间</td>
                                        <td class="GridTitle Room"  v-for="(item,index) in timeArrTitle" :key="index">
                                        <p>{{item.date}}</p>
                                        <p>{{item.day}}</p>
                                        </td>
                                    </tr>
                                    <tr style="height:52px;"   v-for="(item,index) in tabData" :key="index">
                                        <td class="GridContent" title="第一开标室">{{item.home}}</td>
                                        <td class="GridContent">
                                        <div class="ContentTable">
                                            <div class="ContentTr">上午</div>
                                            <div class="ContentTr">下午</div>
                                        </div>
                                        </td>
                                        <td class="GridContent"  v-for="(itemb,index) in item.data" :key="index">
                                        <div class="ContentTable">
                                            <div class="ContentTr">
                                            <div class="ContentTd" v-for="itemhose in itemb.roomAm">{{itemhose}}</div>
                                            <div class="ContentTd" v-for="itemhose in itemb.roomAm">{{itemhose}}</div>
                                            </div>
                                        </div>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                                </div>
                        </el-collapse-item>
                    </el-collapse>
                </div>
            </div>
            <!-- 下一步弹框 -->
            <div v-show="nextShow">
                <div class="box">
                    <button class="btn" @click="submitFile()">提交</button>
                    <button class="btn" @click="backTo()">上一步</button>
                </div>
                <div class="agin">
                    <button class="btn" @click="newlyOrder()">重新预约</button>
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
                                                <span>{{nameOfTenderProject}}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- 开标时间及时长 -->
                                    <div class="noteBox">
                                        <div class="noteContent">
                                        <div class="noteLeft">开标时间：</div>
                                        <div class="noteFlex">
                                            <span>{{assessmentTime}}</span>
                                        </div>
                                        <div style="display: inline-flex;margin-left:30px;width:50%;">
                                            <span style="width:130px;">开标时长：</span>
                                            <span>{{estimatedReviewDuration}}</span>
                                        </div>
                                        </div>
                                    </div>
                                    <!--开标室  -->
                                    <div class="noteBox">
                                        <div class="noteContent">
                                            <div class="noteLeft">开标室：</div>
                                            <div class="noteFlex">
                                                <span>{{openingRoom}}</span>
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
                                    <div class="noteBox" v-show="peitao">
                                        <div class="noteContent">
                                            <div class="noteLeft">配套服务：</div>
                                            <div class="noteFlex">
                                                <span>{{serviceData}}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- 评标地点 -->
                                    <div class="noteBox" v-show="Pbaddress">
                                        <div class="noteContent">
                                            <div class="noteLeft">评标地点：</div>
                                            <div class="noteFlex">
                                                <span>{{bidEvaluationSite}}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </el-collapse-item>
                        <!-- 场地使用信息 -->
                        <el-collapse-item title="场地使用信息" name="3">
                            <div style="display:flex;justify-content:space-between;margin:10px 0; padding:0 10px;">
                                <div>
                                    <el-date-picker style="width:70% !important;margin-right:10px;" v-model="time" value-format='timestamp' type="date" placeholder="选择日期">
                                    </el-date-picker>
                                    <el-button icon="el-icon-search" type="primary" @click="search()"></el-button>
                                </div>
                                <div>
                                    <el-button icon="el-icon-caret-left" type="text" @click="left()"></el-button>
                                    <span style="font-size:16px;">{{timeStr}}</span>
                                    <el-button icon="el-icon-caret-right" type="text" @click="right()"></el-button>
                                </div>
                            </div>
                            <div class="timePick">
                                <table width='100%' cellspacing="0" cellpadding="0" align="center" border="0" valign="top">
                                    <tbody>
                                    <tr style="height:50px;">
                                        <td class="GridTitle Room">房间</td>
                                        <td class="GridTitle Room">时间</td>
                                        <td class="GridTitle Room"  v-for="(item,index) in timeArrTitle" :key="index">
                                        <p>{{item.date}}</p>
                                        <p>{{item.day}}</p>
                                        </td>
                                    </tr>
                                    <tr style="height:52px;"   v-for="(item,index) in tabData" :key="index">
                                        <td class="GridContent" title="第一开标室">{{item.home}}</td>
                                        <td class="GridContent">
                                        <div class="ContentTable">
                                            <div class="ContentTr">上午</div>
                                            <div class="ContentTr">下午</div>
                                        </div>
                                        </td>
                                        <td class="GridContent"  v-for="(itemb,index) in item.data" :key="index">
                                        <div class="ContentTable">
                                            <div class="ContentTr">
                                            <div class="ContentTd" v-for="itemhose in itemb.roomAm">{{itemhose}}</div>
                                            <div class="ContentTd" v-for="itemhose in itemb.roomAm">{{itemhose}}</div>
                                            </div>
                                        </div>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
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
                        <!-- 第二步 -->
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
            <!-- 添加分包信息弹框 -->
            <div v-show="addInforShow" class="fb_box">
                <div class="new_head">
                    <div style="padding-left:10px;">标段(包)信息</div>
                    <div @click="closeSubShow()" style="font-size:28px;padding-right:10px;cursor:pointer;">×</div>
                </div>
                <!-- <div class="head_bottom">
                    <span class="head_b_b">招标项目(分包)名称：<el-input v-model="nameOfTenderProject" placeholder="请输入内容"></el-input></span>
                    <span class="head_b_b">入场项目(分包)编号：<el-input v-model="nameOfTenderProject" placeholder="请输入内容"></el-input></span>
                    <span><button class="btn">搜索</button></span>
                </div> -->
                <!-- <div style="width:90%;margin-left:18%;margin-bottom:1%;">挑选状态：
                    <el-select v-model="nameOfTenderProject" clearable placeholder="请选择">
                    <el-option v-for="item in optionState" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                    </el-select>
                </div>  -->
                <div style="margin-top:10px;">
                    <el-table :data="bidSectionData" stripe style="width: 100%"   @selection-change="handleSelectionChange">
                        <el-table-column type="selection" width="55" align='center'>
                        </el-table-column>
                        <el-table-column  type="index"  label="序号" :index="typeIndex" width="70">
                        </el-table-column>
                        <el-table-column  prop="entrySubcontractNumber"  label="入场项目(分包)编号" width="200">
                        </el-table-column>
                        <el-table-column  label="招标项目名称">
                            <template slot-scope="scope">
                                <span>{{pulicBids}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column  prop="subcontractName"  label="分包名称">
                        </el-table-column>
                        <el-table-column  prop="subcontractContents"  label="分包分类">
                        </el-table-column>
                        <el-table-column  label="招标方式">
                            <template slot-scope="scope">
                                <span>{{biddingMethod}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column  prop="subcontractingControlAmount"  label="分包控制金额(万元)">
                        </el-table-column>
                        <el-table-column prop="subcontractingState" label="分包状态">
                        </el-table-column>
                    </el-table>
                </div>
                <div class="sureSelect">
                    <button class="btn" style="width:100px;" @click="quedingSelec()">确定选择</button>
                </div>
            </div>
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
            <!-- 确认提交弹窗 -->
            <el-dialog
                title="执行成功"
                :visible.sync="submitBox"
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
            <!--校验时间弹窗 -->
            <el-dialog
                title="警告信息"
                :visible.sync="editTimeBox"
                width="40%"
                :before-close="handleClose">
                <div class="icon">
                    <i class="el-icon-warning"></i>
                    <span>开标时间不得早于投标截止时间，请修改！</span>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="editTimeSave()">确 定</el-button>
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
    import '../../../assets/css/style.css'
    import baseUrl from '../../../api/api'
    import dayjs from "dayjs"
    export default {
        data(){
            return {
                frameShow:false,
                passJudgeShow:true,
                editTimeBox:false,//校验时间弹窗
                submitBox:false,//提交弹框
                saveBox:false,//保存弹框
                value:'',
                projectObj:JSON.parse(window.localStorage.projectObj),
                activeName:'2',
                currentPage:1,//当前页
                show:true,//上一步弹框
                nextShow:false,//下一步弹框
                nameOfTenderProject:'',//招标项目名称
                nameOfPurchaser:'',//招标采购人
                amountOfBiddingProject:'',//招标项目金额
                biddingProjectNumber:'',//招标项目编号
                totalProId:'',//入场项目编号
                enclosureData:[],//分包表格数据
                handleRecordData:[],//办理记录数据
                bidSectionData:[],//添加分包信息数据
                subcontractInforShow:false,//分包表格点击查看
                addInforShow:false,//添加分包信息弹框
                entrySubcontractNumber:'',//入场项目分包编号
                subcontractName:'',//分包名称
                subcontractContents:'',//分包内容
                scopeOfTender:'',//招标范围
                subcontractingControlAmount:'',//分包控制金额
                qualificationExaminationMethod:'',//资格审查方式
                electronicBidEvaluation:'',//电子化开评标
                sectionPacketAssignment:'',//标段号编码
                unifiedTradingCode:'',//统一交易标志码
                EntrySubNum:'',//分包表格id
                //以下是场地预约信息
                time: '',
                timeStr: "465123",
                stime: "",
                etime: "",
                timeMax:true,
                dateArr:['周一','周二','周三','周四','周五','周六','周日'],
                timeArrTitle:[],
                tabData:[
                   ],
                optionState: [{//添加分包信息是否挑选查询
                    value: '未挑选',
                    label: '未挑选'
                    }, {
                    value: '已挑选',
                    label: '已挑选'
                }],
                optionRoom:[//开标室地点
                    {
                        value: '第一开标室',
                        label: '第一开标室'
                    },
                    {
                        value: '第二开标室',
                        label: '第二开标室'
                    },
                    {
                        value: '第三开标室',
                        label: '第三开标室'
                    },
                    {
                        value: '第四开标室',
                        label: '第四开标室'
                    }
                ],
                Pbaddress:false,
                peitao:false,
                assessmentTime:'',//开标时间
                estimatedReviewDuration:'',//开标时长
                openingRoom:'',//开标室
                appointmentEvaluationRoom:'',//是否预约开标室
                bidEvaluationSite:'',//评标地点
                supportingServices:[],//配套服务
                serviceData:'',//配套服务
                EntrySubNum:'',//分包编号
                subpackNum:'',//表格分包编号
                subArr:[],//表格分包编号数组
                zhuangtai:'',//查询状态
                reschedule:'',//判断是否显示重新预约
                siteReservationId:'',//下一步返回主键id
                state:'',//下一步返回状态
                bidEvaluationTime:'',//下一步返回评标时间
                biddingMethod:'',//添加分包方式
                pulicBids:'',//添加分包招标项目名称
                selectedArr:[],//勾选中的表格数组
                selectId:'',//勾选中的id
                itemArr:[],//初始化返回的items数组
                resData:[],//初始化返回的data数组
                offices:['电脑', '签字笔', '计算器', '胶带','铅笔和橡皮', '裁纸刀和剪刀', '记号笔', '投影仪','打印机', '订书器', '打包绳', '桌签和水牌','信号屏蔽器', '水杯', 'A4纸', '其他'],
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
                        this.sectionPacketAssignment = res.data.data.sectionPacketAssignment;//标段号编号
                        this.unifiedTradingCode = res.data.data.unifiedTradingCode;//统一交易标志码
                    }else{
                        this.$layer.msg(res.data.msg);
                    }
                }).catch(err=>{
                    console.log(err)
                })
            },
            //查询--判断状态
            getSearchList(){
                let object={}
                if(this.projectObj.totalProjectId.indexOf("-") != -1 && this.projectObj.totalProjectId!=null){
                    // 入场项目分包编号
                    object={
                        entrySubcontractNumber:this.projectObj.totalProjectId,
                        type:"场地预约"
                    }
                }else{
                    // 入场项目编号
                    object ={
                        projectCode:this.projectObj.totalProjectId,
                        type:"场地预约"
                    }
                }
                return this.$axios({
                    method:'POST',
                    url:baseUrl + '/siteReservationController/select',
                    data:object
                }).then(res=>{
                    this.itemArr = res.data.data[0].items;
                    this.resData = res.data.data;
                    res.data.data.map((item,index)=>{
                        this.zhuangtai = item.state
                        this.reschedule = item.reschedule
                    })
                    if(res.data.data.length == 0 || this.zhuangtai == null){
                        this.show = true;
                        this.nextShow = false;
                        $('.box').show();
                        res.data.data.map((item,index)=>{
                            this.nameOfTenderProject = item.nameOfTenderProject;
                            if(item.assessmentTime == null){
                                this.assessmentTime = ""
                            }else{
                                this.assessmentTime = dayjs(item.assessmentTime).format('YYYY-MM-DD');
                            }
                            this.estimatedReviewDuration = item.estimatedReviewDuration;
                            this.openingRoom = item.openingRoom;
                            this.appointmentEvaluationRoom = item.appointmentEvaluationRoom;
                            this.bidEvaluationSite = item.bidEvaluationSite;
                            this.supportingServices = item.supportingServices.split(',');
                        })
                        
                    }else if(this.zhuangtai == "编辑中" || this.zhuangtai == "办理未通过"){
                        this.nextShow = true;
                        this.show = false;
                        $('.box').show();
                        $('.agin').hide();
                        res.data.data.map((item,index)=>{
                            this.nameOfTenderProject = item.nameOfTenderProject;
                            if(item.assessmentTime == null){
                                this.assessmentTime = ""
                            }else{
                                this.assessmentTime = dayjs(item.assessmentTime).format('YYYY-MM-DD');
                            }
                            this.estimatedReviewDuration = item.estimatedReviewDuration;
                            this.openingRoom = item.openingRoom;
                            this.appointmentEvaluationRoom = item.appointmentEvaluationRoom;
                            this.bidEvaluationSite = item.bidEvaluationSite;
                            this.supportingServices = item.supportingServices.split(',');
                        })
                    }else if(this.zhuangtai == "办理通过"){
                        if(this.reschedule == true){
                            this.nextShow = true;
                            this.show = false;
                            $('.box').hide();
                            $('.agin').show();
                            $('.agin').removeClass("disable");
                            res.data.data.map((item,index)=>{
                                this.nameOfTenderProject = item.nameOfTenderProject;
                               if(item.assessmentTime == null){
                                this.assessmentTime = ""
                                }else{
                                    this.assessmentTime = dayjs(item.assessmentTime).format('YYYY-MM-DD');
                                }
                                this.estimatedReviewDuration = item.estimatedReviewDuration;
                                this.openingRoom = item.openingRoom;
                                this.appointmentEvaluationRoom = item.appointmentEvaluationRoom;
                                this.bidEvaluationSite = item.bidEvaluationSite;
                                this.supportingServices = item.supportingServices.split(',');
                            })
                        }else{
                            this.nextShow = true;
                            this.show = false;
                            $('.box').hide();
                            $('.agin').show();
                            $('.agin').addClass("disable");
                            res.data.data.map((item,index)=>{
                                this.nameOfTenderProject = item.nameOfTenderProject;
                                if(item.assessmentTime == null){
                                    this.assessmentTime = ""
                                }else{
                                    this.assessmentTime = dayjs(item.assessmentTime).format('YYYY-MM-DD');
                                }
                                this.estimatedReviewDuration = item.estimatedReviewDuration;
                                this.openingRoom = item.openingRoom;
                                this.appointmentEvaluationRoom = item.appointmentEvaluationRoom;
                                this.bidEvaluationSite = item.bidEvaluationSite;
                                this.supportingServices = item.supportingServices.split(',');
                            })
                        }
                    }else{
                        this.nextShow = true;
                        this.show = false;
                        $('.box').hide();
                        $('.agin').hide();
                        res.data.data.map((item,index)=>{
                            this.nameOfTenderProject = item.nameOfTenderProject;
                           if(item.assessmentTime == null){
                                this.assessmentTime = ""
                            }else{
                                this.assessmentTime = dayjs(item.assessmentTime).format('YYYY-MM-DD');
                            }
                            this.estimatedReviewDuration = item.estimatedReviewDuration;
                            this.openingRoom = item.openingRoom;
                            this.appointmentEvaluationRoom = item.appointmentEvaluationRoom;
                            this.bidEvaluationSite = item.bidEvaluationSite;
                            this.supportingServices = item.supportingServices.split(',');
                        })
                    }
                }).catch(err=>{
                    console.log(err)
                })
            },
            //招标项目信息--》表格分包
            async getsubList(){
                let lookArr = [];
                await this.getSearchList();
                if(this.projectObj.totalProjectId.indexOf("-") != -1 && this.projectObj.totalProjectId!=null){
                    if(this.resData.length == 0){
                        this.EntrySubNum = this.projectObj.totalProjectId;
                        lookArr.push(this.EntrySubNum);
                    }else{
                        this.itemArr.map((item,index)=>{
                            this.EntrySubNum = item.entrySubcontractNumber;
                            lookArr.push(this.EntrySubNum);
                        })
                    }
                }else{
                    this.EntrySubNum = this.projectObj.totalProjectId;
                    lookArr.push(this.EntrySubNum);
                }
                this.$axios({
                    method: "POST",
                    url: baseUrl+"/projectInformationController/selectByProjectEntrySubcontractNumber",
                    data:{
                        projectEntrySubcontractNumbers:lookArr
                    }
                }).then(res=>{
                    if(res.data.status == 200){
                        this.enclosureData = res.data.data;
                    }else{
                        this.$layer.msg(res.data.msg);
                    }
                }).catch(err=>{
                    console.log(err)
                })
            },
            //编号问题
            typeIndex(index) {
                return index + (this.currentPage - 1) * 10 + 1;
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
            closeSubShow(){
                this.subcontractInforShow = false;
                this.addInforShow = false;
            },
            //删除表格分包
            deleteFile(row){
                if(row.entrySubcontractNumber == this.projectObj.totalProjectId){
                    this.$layer.msg('不可删除当前项目分包编号')
                    return;
                }else{
                    for(var i=0; i<this.enclosureData.length;i++){
                        var item = this.enclosureData[i];
                        if(row.subcontractItePrimaryKeyId == item.subcontractItePrimaryKeyId){
                            this.subpackNum = this.enclosureData.splice(i,1);
                        }
                    };
                    for(var i=0; i<this.itemArr.length;i++){
                        var item = this.itemArr[i];
                        if(row.entrySubcontractNumber == item.entrySubcontractNumber){
                            this.itemArr.splice(i,1);
                        }
                    }
                }
               
            },
            //查询添加的分包
            searchSubpack(){
                let object={}
                if(this.projectObj.totalProjectId.indexOf("-") != -1 && this.projectObj.totalProjectId!=null){
                    // 入场项目分包编号
                    object={
                        entrySubcontractNumber:this.projectObj.totalProjectId,
                        type:"场地预约"
                    }
                }else{
                    // 入场项目编号
                    object ={
                        projectCode:this.projectObj.totalProjectId,
                        type:"场地预约"
                    }
                }
                this.$axios({
                    method:'POST',
                    url:baseUrl + '/siteReservationController/subcontract',
                    data:object
                }).then(res=>{
                    if(res.data.status == 200){
                        this.bidSectionData = res.data.data;
                        this.bidSectionData.map((item,index)=>{
                            this.pulicBids = item.projectInformationVo.nameOfTenderProject;
                            this.biddingMethod = item.projectInformationVo.biddingProcurementMode
                        })
                    }else{
                        this.$layer.msg(res.data.msg)
                    }
                }).catch(err=>{
                    console.log(err)
                })
            },
            //添加分包
            addSubpack(){
                this.addInforShow = true;
                this.searchSubpack();
            },
            //添加分包---表格选择
            handleSelectionChange(val){
                this.selectedArr = val;
            },
            //添加分包---表格选择---确定选择
            quedingSelec(){
                this.selectedArr.map((item,index)=>{
                     this.selectId = item.entrySubcontractNumber
                })
                var arr = [...this.enclosureData,...this.selectedArr];
                this.enclosureData = this.removeData(arr,'entrySubcontractNumber');
                this.addInforShow = false;
            },
            removeData(arr,id){
                let hash = {};
                var newarr = arr.reduce((item,next) =>{
                    hash[next[id]] ? "" : hash[next[id]] = true && item.push(next);
                    return item
                }, []);
                return newarr;
            },
            //校验时间是否资审公告的结束时间
            judgeTime(){
                let object={}
                if(this.projectObj.totalProjectId.indexOf("-") != -1 && this.projectObj.totalProjectId!=null){
                    // 入场项目分包编号
                    object={
                        entrySubcontractNumber:this.projectObj.totalProjectId,
                        noticeType:"资审公告"
                    }
                }else{
                    // 入场项目编号
                    object ={
                        projectCode:this.projectObj.totalProjectId,
                        noticeType:"资审公告"
                    }
                }
               this.$axios({
                   method:'POST',
                   url:baseUrl + '/tenderNoticeController/select',
                   data:object
               }).then(res=>{
                   if(res.data.status == 200){
                       if(res.data.data.length != 0){
                           if(res.data.data[0].enrollEndTime > this.assessmentTime){
                               this.editTimeBox = true;
                           }
                       }
                   }
               }).catch(err=>{
                   console.log(err)
               })
            },
            editTimeSave(){
                this.editTimeBox = false;
            },
            //下一步
            nextTo(){
                this.subArr = [];
                let object={};
                let arr = [];
                let items = {};
                this.enclosureData.map((item,index)=>{
                    var obj = {};
                    obj.entrySubcontractNumber = item.entrySubcontractNumber
                    this.subArr.push(obj)
                })
                if(this.projectObj.totalProjectId.indexOf("-") != -1 && this.projectObj.totalProjectId!=null){
                    // 入场项目分包编号
                    object={
                        entrySubcontractNumber:this.projectObj.totalProjectId,
                        type:"场地预约",
                        nameOfTenderProject:this.nameOfTenderProject,
                        assessmentTime:this.assessmentTime,
                        estimatedReviewDuration:this.estimatedReviewDuration,
                        appointmentEvaluationRoom:this.appointmentEvaluationRoom,
                        bidEvaluationSite:this.bidEvaluationSite,
                        supportingServices:this.supportingServices.join(','),
                        openingRoom:this.openingRoom,
                        items:this.subArr
                    }
                }else{
                    items = {
                        projectCode:this.projectObj.totalProjectId
                    }
                    arr.push(items)
                    // 入场项目编号
                    object={
                        projectCode:this.projectObj.totalProjectId,
                        type:"场地预约",
                        nameOfTenderProject:this.nameOfTenderProject,
                        assessmentTime:this.assessmentTime,
                        estimatedReviewDuration:this.estimatedReviewDuration,
                        appointmentEvaluationRoom:this.appointmentEvaluationRoom,
                        bidEvaluationSite:this.bidEvaluationSite,
                        supportingServices:this.supportingServices.join(','),
                        openingRoom:this.openingRoom,
                        items:arr
                    }
                }
                this.$axios({
                    method:'POST',
                    url:baseUrl + '/siteReservationController/saveOrUpdate',
                    data:object
                }).then(res=>{
                    if(res.data.status == 200){
                        this.show = false;
                        this.nextShow = true;
                        this.hanleIsOrder();
                        $('.agin').hide();
                        this.nameOfTenderProject = res.data.data.nameOfTenderProject;
                        if(res.data.data.assessmentTime == null){
                            this.assessmentTime = ""
                        }else{
                            this.assessmentTime = dayjs(res.data.data.assessmentTime).format('YYYY-MM-DD');
                        }
                        this.estimatedReviewDuration = res.data.data.estimatedReviewDuration;
                        this.openingRoom = res.data.data.openingRoom;
                        this.appointmentEvaluationRoom = res.data.data.appointmentEvaluationRoom;
                        this.bidEvaluationSite = res.data.data.bidEvaluationSite;
                        this.serviceData = res.data.data.supportingServices;
                        this.siteReservationId = res.data.data.siteReservationId;
                        this.state = res.data.data.state;
                    }else{
                        this.$layer.msg(res.data.msg);
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
                this.subArr = [];
                this.enclosureData.map((item,index)=>{
                    var obj = {};
                    obj.entrySubcontractNumber = item.entrySubcontractNumber
                    this.subArr.push(obj)
                })
                let object={};
                let arr = [];
                let items = {};
                if(this.projectObj.totalProjectId.indexOf("-") != -1 && this.projectObj.totalProjectId!=null){
                    
                    // 入场项目分包编号
                    object={
                        entrySubcontractNumber:this.projectObj.totalProjectId,
                        type:"场地预约",
                        nameOfTenderProject:this.nameOfTenderProject,
                        assessmentTime:this.assessmentTime,
                        estimatedReviewDuration:this.estimatedReviewDuration,
                        appointmentEvaluationRoom:this.appointmentEvaluationRoom,
                        bidEvaluationSite:this.bidEvaluationSite,
                        supportingServices:this.supportingServices.join(','),
                        openingRoom:this.openingRoom,
                        items:this.subArr
                    }
                }else{
                    items = {
                        projectCode:this.projectObj.totalProjectId
                    }
                    arr.push(items)
                    // 入场项目编号
                    object={
                        projectCode:this.projectObj.totalProjectId,
                        type:"场地预约",
                        nameOfTenderProject:this.nameOfTenderProject,
                        assessmentTime:this.assessmentTime,
                        estimatedReviewDuration:this.estimatedReviewDuration,
                        appointmentEvaluationRoom:this.appointmentEvaluationRoom,
                        bidEvaluationSite:this.bidEvaluationSite,
                        supportingServices:this.supportingServices.join(','),
                        openingRoom:this.openingRoom,
                        items:arr
                    }
                }
                this.$axios({
                    method:'POST',
                    url:baseUrl + '/siteReservationController/saveOrUpdate',
                    data:object
                }).then(res=>{
                    if(res.data.status == 200){
                        this.show = true;
                        this.nextShow = false;
                        this.saveBox = false;
                        this.hanleIsOrder();
                    }else{
                        this.$layer.msg(res.data.msg);
                    }
                }).catch(err=>{
                    console.log(err)
                })
            },
            handleClose(){
                this.saveBox = false;
                this.submitBox = false;
                this.frameShow = false;
            },
            //提交
            submitFile(){
                this.submitBox = true;
            },
            submitSave(){
                 this.$axios({
                    method:'POST',
                    url:baseUrl + '/siteReservationController/submit',
                    data:{
                        siteReservationId:this.siteReservationId,
                        state:'待办理'
                    }
                }).then(res=>{
                    if(res.data.status == 200){
                        this.show = false;
                        this.nextShow = true;
                        this.submitBox = false;
                        $('.box').hide();
                        $('.agin').hide();
                    }else{
                        this.$layer.msg(res.data.msg)
                    }
                }).catch(err=>{
                    console.log(err)
                })
            },
            //是否预约评标室
            hanleIsOrder(){
                if(this.appointmentEvaluationRoom == '是'){
                    this.peitao = true;
                    this.Pbaddress = false;
                }else if(this.appointmentEvaluationRoom == '否'){
                    this.Pbaddress = true;
                    this.peitao = false;
                }
            },
            changeRoom(){
                if(this.appointmentEvaluationRoom == '是'){
                    this.peitao = true;
                    this.Pbaddress = false;
                }else if(this.appointmentEvaluationRoom == '否'){
                    this.Pbaddress = true;
                    this.peitao = false;
                }
            },
            //重新预约
            newlyOrder(){
                this.$axios({
                    method:'POST',
                    url:baseUrl + '/siteReservationController/submit',
                    data:{
                        siteReservationId:this.siteReservationId,
                        state:'编辑中'
                    }
                }).then(res=>{
                    if(res.data.status == 200){
                        this.show = false;
                        this.nextShow = true;
                        this.submitBox = false;
                        $('.box').hide();
                        $('.agin').hide();
                    }else{
                        this.$layer.msg(res.data.msg)
                    }
                }).catch(err=>{
                    console.log(err)
                })
            },
            //上一步
            backTo(){
                this.assessmentTime = new Date(this.assessmentTime).getTime();
                let object={}
                if(this.projectObj.totalProjectId.indexOf("-") != -1 && this.projectObj.totalProjectId!=null){
                    // 入场项目分包编号
                    object={
                        entrySubcontractNumber:this.projectObj.totalProjectId,
                        type:"场地预约"
                    }
                }else{
                    // 入场项目编号
                    object ={
                        projectCode:this.projectObj.totalProjectId,
                        type:"场地预约"
                    }
                }
                this.$axios({
                    method:'POST',
                    url:baseUrl + '/siteReservationController/select',
                    data:object
                }).then(res=>{
                    if(res.data.status == 200){
                        this.show = true;
                        this.nextShow = false;
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
                        item.creationTime = dayjs(item.creationTime).format('YYYY-MM-DD')
                    })
                    }else{
                        this.$layer.msg(res.data.msg)
                    }
                }).catch(err=>{
                    console.log(err)
                })
            },
            // 场地使用信息
            resteTime(){
                this.time = '';
            },
            formateTimeStr(){
                this.timeStr = this.stime + "—" + this.etime;
                this.proArr(this.stime,this.etime)
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
            search(){
                var start = new Date(new Date().toLocaleDateString());
                var nowDate = dayjs().day()
                var time = start.setTime(start.getTime()) - (nowDate - 1) * 24 * 60 * 60 * 1000;
                var diff = dayjs(this.time).diff(dayjs(time),'day');
                var nt = new Date(dayjs().format("YYYY-MM-DD")).getTime();
                var num = dayjs(this.time).day();
                //如果大于7天说明没在最近的一周
                if(num == 0){
                    var etimeStemp = this.time - (num) * 24 * 60 * 60 * 1000;
                    var stimeStemp = this.time - (6-num) * 24 * 60 * 60 * 1000;
                    var etime = dayjs(etimeStemp).format("YYYY-MM-DD")
                    var stime = dayjs(stimeStemp).format("YYYY-MM-DD")
                    this.stime = stime;
                    this.etime = etime;
                    this.formateTimeStr()
                }else{
                    //7-num就是结束的日期,获取到结束时间的时间戳
                    var etimeStemp = this.time + (7-num) * 24 * 60 * 60 * 1000;
                    var stimeStemp = this.time - (num-1) * 24 * 60 * 60 * 1000;
                    var etime = dayjs(etimeStemp).format("YYYY-MM-DD")
                    var stime = dayjs(stimeStemp).format("YYYY-MM-DD")
                    this.stime = stime;
                    this.etime = etime;
                    this.formateTimeStr()
                }
            },
            proArr(stime,etime){
                var timeArr = []
                var num = dayjs(etime).diff(dayjs(stime),'day')+1
                for(var i=0;i<num;i++){
                    var obj = {};
                    var timestemp = new Date(stime).getTime()+i*24*60*60*1000
                    obj.date = this.dateArr[i];
                    obj.day = dayjs(timestemp).format("YYYY-MM-DD")
                    timeArr.push(obj)
                }
                this.timeArrTitle = timeArr
            },
            left() {
                var stimeVlue = new Date(this.stime).getTime() - 7 * 24 * 60 * 60 * 1000;
                var etimeVlue = stimeVlue + 6 * 24 * 60 * 60 * 1000;
                var a = dayjs(stimeVlue).format("YYYY-MM-DD");
                var b = dayjs(etimeVlue).format("YYYY-MM-DD");
                this.stime = a;
                this.etime = b;
                this.formateTimeStr()
                this.resteTime()
            },
            right() {
                var etimeVlue = new Date(this.etime).getTime() + 7 * 24 * 60 * 60 * 1000;
                var stimeVlue = etimeVlue - 6 * 24 * 60 * 60 * 1000;
                var a = dayjs(stimeVlue).format("YYYY-MM-DD");
                var b = dayjs(etimeVlue).format("YYYY-MM-DD");
                this.stime = a;
                this.etime = b;
                this.formateTimeStr()
            },
            toZhou() {
                var num = dayjs().day();
                var stime = new Date().getTime() - (num - 1) * 24 * 60 * 60 * 1000;
                var etime = stime + 6 * 24 * 60 * 60 * 1000;
                this.stime = dayjs(stime).format("YYYY-MM-DD");
                this.etime = dayjs(etime).format("YYYY-MM-DD");
                this.formateTimeStr()
            }
        },
        created(){
            // this.getDecideList();
            this.getbiddingInfo();
            this.getsubList();
            this.getRecordList();
            this.toZhou();
            this.getSearchList();
            this.hanleIsOrder();
        }
    }
</script>

<style scoped>
.pageWrap{
    width: 100%;
    height: 100%;
    margin:0 auto;
    overflow: hidden;
}
.el-collapse-item__content{
    padding-bottom: 85px !important;
}
.box,.agin{
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
h6,b{
    color:red;
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
  height:800px;
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
.head_bottom {
  width: 100%;
  text-align: center;
  margin: 1% 0;
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
/* 场地预约 */
table{
  border-collapse: collapse;
  word-break: break-all;
}
tr{
  display: table-row;
  vertical-align: inherit;
  border-color: inherit;
}
.GridTitle.Room{
  width: 11%;
}
.GridTitle{
  background-color: #009EE0;
  border: 2px solid;
  border-color: White;
  color: #FFF;
  font-size: 14px;
  font-weight: bold;
  text-align: center;
  font-family: 微软雅黑;
}
.GridContent{
  text-align: center;
  background-color: #E5F5FC;
  border: 2px solid;
  border-color: White;
}
.ContentTable{
  height: 120px;
  width: 100%;
}
.ContentTr{
  height: 60px;
  line-height: 60px;
  vertical-align: middle;
}
.ContentTd{
  width: 31%;
  border-right: 2px solid White;
  float: left;
}
.sureSelect{
    position: fixed;
    bottom: 5%;
    left:50%;
}
.table_box{
    height: 200px;
    overflow-y: scroll;
}
</style>