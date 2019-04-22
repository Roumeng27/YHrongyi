<template>
    <div class="myDiv">
         <!-- 头部 -->
        <div class="head_box">
          <div class="head_l" @click="newManage()">新增履约</div>
          <div class="head_l" @click="deletePro()">删除履约</div>
        </div>
        <div class="head_bottom">
          <span class="head_b_b">招标项目(分包)名称：<el-input v-model="value"  placeholder="请输入内容"></el-input></span>
          <span class="head_b_b">入场项目(分包)编号：<el-input v-model="value" placeholder="请输入内容"></el-input></span>
          <span class="head_b_b">分包名称：<el-input v-model="value" placeholder="请输入内容"></el-input></span>
          <span><button class="btn" @click="searchList()">搜索</button></span>
        </div>
        <!-- 主体表格 -->
        <div class="warp_main">
            <el-table :data="tableData" stripe style="width: 100%" @selection-change="handleSelectionChange">
                <el-table-column  type="selection" width="55">
                </el-table-column>
                <el-table-column type="index" width="70" label="序号" :index="typeIndex">
                </el-table-column>
                <el-table-column prop="organizationCode" label="入场项目分包编号" width="180">
                </el-table-column>
                <el-table-column prop="companyName" label="招标项目名称" width="180">
                </el-table-column>
                <el-table-column prop="registeredArea" label="分包名称">
                </el-table-column>
                <el-table-column prop="companyType" label="招标(采购)人">
                </el-table-column>
                <el-table-column prop="companyType" label="中标人">
                </el-table-column>
                <el-table-column prop="companyType" label="履约信息递交时间">
                </el-table-column>
                <el-table-column fixed="right" label="修改" width="100">
                    <template slot-scope="scope">
                        <i class="el-icon-edit"  style="cursor: pointer;" @click="modifyOpen(scope.row)"></i>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <!-- 新增履约 -->
        <div class="mask"  v-show="show"></div>
        <div class="new_pro" v-show="show">
            <div class="new_head">
                <div style="padding-left:10px;">挑选合同</div>
                <div @click="close()" style="font-size:28px;padding-right:10px;cursor:pointer;">×</div>
            </div>
            <div class="head_bottom">
                <span class="head_b_b">招标项目(分包)名称：<el-input v-model="value" placeholder="请输入内容" clearable></el-input></span>
                <span class="head_b_b">入场项目(分包)编号：<el-input v-model="value" placeholder="请输入内容" clearable></el-input></span>
                <span><button class="btn" @click="newSearch()">搜索</button></span>
            </div>
            <!-- 新增主体表格 -->
            <div class="new_table">
                <el-table :data="performanceData" stripe style="width: 100%">
                    <el-table-column  type="selection" width="55">
                    </el-table-column>
                    <el-table-column type="index" width="70" label="编号" :index="typeIndex">
                    </el-table-column>
                    <el-table-column prop="totalProjectId" label="入场项目分包编号" width="150">
                    </el-table-column>
                    <el-table-column prop="nameOfTenderProject" label="招标项目名称">
                    </el-table-column>
                    <el-table-column prop="biddingProjectNumber" label="入场项目分包名称">
                    </el-table-column>
                    <el-table-column prop="nameOfPurchaser" label="中标单位">
                    </el-table-column>
                    <el-table-column prop="operation" label="选择">
                        <template slot-scope="scope">
                            <i class="el-icon-plus" style="cursor: pointer;" @click="getDetail()"></i>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <!-- 新增查看履约记录 -->
        <div class="new_pro new_pro_box" v-show="lookShow">
            <div class="new_head_box">
                <div class="new_head">
                    <div style="padding-left:10px;">新增履约记录</div>
                    <div @click="closelookShow()" style="font-size:28px;padding-right:10px;cursor:pointer;">×</div>
                </div>
                <div class="new_nav">
                    <button class="nav_co nav_save" @click="modifySaveFile()">修改保存</button>
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
                                <!-- 招标项目编号 -->
                                <div class="noteBox">
                                    <div class="noteContent">
                                    <div class="noteLeft">招标项目编号：</div>
                                    <div class="noteFlex">
                                        <span>{{biddingProjectNumber}}</span>
                                    </div>
                                    </div>
                                </div>
                                <!-- 分包编号 -->
                                <div class="noteBox">
                                    <div class="noteContent">
                                        <div class="noteLeft">分包编号：</div>
                                        <div class="noteFlex">
                                            <span>{{totalProjectId}}</span>
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
                                <!-- 招标人 -->
                                <div class="noteBox">
                                    <div class="noteContent">
                                        <div class="noteLeft">招标人：</div>
                                        <div class="noteFlex">
                                            <span></span>
                                        </div>
                                    </div>
                                </div>
                                <!-- 中标人 -->
                                <div class="noteBox">
                                    <div class="noteContent">
                                        <div class="noteLeft">中标人：</div>
                                        <div class="noteFlex">
                                            <span></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </el-collapse-item>
                    <!-- 合同信息 -->
                    <el-collapse-item title="合同信息" name="2">
                        <div class="new_m_b">
                            <div class="new_m_b2">
                                <el-table :data="contractData" stripe style="width: 100%" >
                                    <el-table-column type="index" width="70" label="序号" :index="typeIndex">
                                    </el-table-column>
                                    <el-table-column prop="organizationCode" label="合同签署时间" width="180">
                                    </el-table-column>
                                    <el-table-column prop="companyName" label="合同期限(日历天)" width="180">
                                    </el-table-column>
                                    <el-table-column prop="registeredArea" label="合同金额(元)">
                                    </el-table-column>
                                    <el-table-column fixed="right" label="查看" width="100">
                                        <template slot-scope="scope">
                                            <i class="el-icon-search"  style="cursor: pointer;" @click="lookOpen()"></i>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </div>
                        </div>
                    </el-collapse-item>
                    <!-- 履约信息 -->
                    <el-collapse-item title="履约信息" name="3">
                        <div class="new_m_b">
                            <div class="new_m_b2">
                                <!-- 实际履约期限及递交时间 -->
                                <div class="noteBox">
                                    <div class="noteContent">
                                        <div class="noteLeft">实际履约期限(天)：</div>
                                        <div class="noteFlex">
                                            <el-input v-model="realityPerformanceDeadline"></el-input>
                                        </div>
                                        <div style="display: inline-flex;margin-left:30px;width:50%;">
                                            <span style="width:180px;">履约信息递交时间：</span>
                                            <el-date-picker v-model="performanceSubmitDate" type="datetime" placeholder="选择日期时间">
                                            </el-date-picker>
                                        </div>
                                    </div>
                                </div>
                                <!--履约变更内容  -->
                                <div class="noteBox">
                                    <div class="noteContent">
                                        <div class="noteLeft">履约变更内容：</div>
                                        <div class="noteFlex">
                                            <el-input v-model="performanceChangeContent" type="textarea"></el-input>
                                        </div>
                                    </div>
                                    <div style="display: inline-flex;">
                                        <div style="color:#f00;">(此处由招标人/招标代理记录中标人对招标人就合同的履约情况)</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </el-collapse-item>
                     <!-- 相关附件 -->
                    <el-collapse-item title="相关附件" name="4">
                        <div class="new_m_b">
                            <div class="new_m_b2">
                                <el-table :data="appendixData" stripe style="width: 100%" >
                                    <el-table-column prop="organizationCode" label="电子件名称" width="150">
                                    </el-table-column>
                                    <el-table-column prop="companyName" label="电子件列表(点击查看)" width="240">
                                    </el-table-column>
                                    <el-table-column fixed="right" label="管理"  width="120">
                                        <template slot-scope="scope">
                                            <span style="color:blue;" @click="fileElectron()">电子件管理</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="registeredArea" label="说明">
                                    </el-table-column>
                                </el-table>
                            </div>
                        </div>
                    </el-collapse-item>
                </el-collapse>
            </div>
        </div>
        <!-- 查看合同信息弹框 -->
        <div class="new_pro new_pro_box" v-show="informateShow">
            <div class="new_head_box">
                <div class="new_head">
                    <div style="padding-left:10px;">查看合同</div>
                    <div @click="closeinforShow()" style="font-size:28px;padding-right:10px;cursor:pointer;">×</div>
                </div>
                <div class="new_nav">
                    <button class="nav_co nav_save" @click="modifySaveFile()">修改保存</button>
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
                    <el-collapse-item title="附件" name="2">
                        <div class="new_m_b">
                            <div class="new_m_b2">
                            <el-table :data="relevantData" stripe style="width: 100%">
                                <el-table-column prop="appendixName" label="附件名称" width="150">
                                </el-table-column>
                                <el-table-column label="附件列表(点击查看)">
                                <template slot-scope="scope">
                                   <li></li>
                                </template>
                                </el-table-column>
                                <el-table-column fixed="right" label="操作" width="100">
                                <template slot-scope="scope">
                                    <i class="el-icon-setting"  style="cursor: pointer;" @click="shezhi(scope.row.id)"></i>
                                </template>
                                </el-table-column>
                            </el-table>
                            </div>
                        </div>
                    </el-collapse-item>
                    <!-- 中标人信息 -->
                    <el-collapse-item title="中标人信息" name="3">
                        <div class="new_m_b">
                            <div class="new_m_b2">
                                <el-table :data="winnerData" stripe style="width: 100%">
                                    <el-table-column type="index" width="70" label="序号" :index="typeIndex">
                                    </el-table-column>
                                    <el-table-column prop="organizationCode" label="中标单位名称" width="180">
                                    </el-table-column>
                                    <el-table-column prop="companyName" label="项目负责人">
                                    </el-table-column>
                                    <el-table-column prop="registeredArea" label="中标金额(万元)">
                                    </el-table-column>
                                    <el-table-column prop="registeredArea" label="中标日期(日历天)">
                                    </el-table-column>
                                    <el-table-column prop="registeredArea" label="质量等级">
                                    </el-table-column>
                                </el-table>
                            </div>
                        </div>
                    </el-collapse-item>
                    <!-- 合同信息 -->
                    <el-collapse-item title="合同信息" name="4">
                        <div class="new_m_b">
                            <div class="new_m_b2">
                                <!--是否公示  -->
                                <div class="noteBox">
                                    <div class="noteContent">
                                    <div class="noteLeft">是否公示：</div>
                                    <div class="noteFlex">
                                        <span>{{nameOfTenderProject}}</span>
                                    </div>
                                    </div>
                                </div>
                                <!-- 合同编号及名称 -->
                                <div class="noteBox">
                                    <div class="noteContent">
                                    <div class="noteLeft">合同编号：</div>
                                    <div class="noteFlex">
                                        <span>{{nameOfPurchaser}}</span>
                                    </div>
                                    <div style="display: inline-flex;margin-left:30px;width:50%;">
                                        <span style="width:130px;">合同名称：</span>
                                        <span>{{amountOfBiddingProject}}</span>
                                    </div>
                                    </div>
                                </div>
                                <!--合同金额及期限  -->
                                <div class="noteBox">
                                    <div class="noteContent">
                                    <div class="noteLeft">合同金额：</div>
                                    <div class="noteFlex">
                                        <span>{{nameOfPurchaser}}</span>
                                    </div>
                                    <div style="display: inline-flex;margin-left:30px;width:50%;">
                                        <span style="width:130px;">合同期限：</span>
                                        <span>{{amountOfBiddingProject}}</span>
                                    </div>
                                    </div>
                                </div>
                                <!--签署时间及洽谈地点  -->
                                <div class="noteBox">
                                    <div class="noteContent">
                                    <div class="noteLeft">合同签署时间：</div>
                                    <div class="noteFlex">
                                        <span>{{nameOfPurchaser}}</span>
                                    </div>
                                    <div style="display: inline-flex;margin-left:30px;width:50%;">
                                        <span style="width:130px;">合同洽谈地点：</span>
                                        <span>{{amountOfBiddingProject}}</span>
                                    </div>
                                    </div>
                                </div>
                                <!-- 质量要求 -->
                                <div class="noteBox">
                                    <div class="noteContent">
                                    <div class="noteLeft">质量要求：</div>
                                    <div class="noteFlex">
                                        <span>{{nameOfTenderProject}}</span>
                                    </div>
                                    </div>
                                </div>
                                <!--合同主要内容  -->
                                <div class="noteBox">
                                    <div class="noteContent">
                                    <div class="noteLeft">合同主要内容：</div>
                                    <div class="noteFlex">
                                        <span>{{nameOfTenderProject}}</span>
                                    </div>
                                    </div>
                                </div>
                                <!-- 备注 -->
                                <div class="noteBox">
                                    <div class="noteContent">
                                    <div class="noteLeft">备注：</div>
                                    <div class="noteFlex">
                                        <span>{{nameOfTenderProject}}</span>
                                    </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </el-collapse-item>
                    <!-- 公告内容 -->
                    <el-collapse-item title="公告内容" name="5">
                        <div class="new_m_b">
                            <div class="new_m_b2" style="width:80%;">
                                <div class="fail_box">
                                    <div>2019gongkai213-part01</div>
                                    <div>招标公告</div>
                                    <div style="font-size:14px;font-weight:normal;color:#333;">2019年02月25日</div>
                                </div>
                                <!-- 招标（采购）项目名称 -->
                                <div class="noteBox">
                                    <div class="noteContent">
                                        <div class="noteLeft" style="width:220px;">招标（采购）项目名称：</div>
                                        <div class="noteFlex">
                                            <span>测试</span>
                                        </div>
                                    </div>
                                </div>
                                <!-- 招标（采购）项目编号： -->
                                <div class="noteBox">
                                    <div class="noteContent">
                                        <div class="noteLeft" style="width:220px;">招标（采购）项目编号：</div>
                                        <div class="noteFlex">
                                            <span>测试</span>
                                        </div>
                                    </div>
                                </div>
                                <!-- 招标（采购）项目预算金额 -->
                                <div class="noteBox">
                                    <div class="noteContent">
                                        <div class="noteLeft" style="width:220px;">招标（采购）项目预算金额：</div>
                                        <div class="noteFlex">
                                            <span>测试</span>
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
                                            <span>测试</span>
                                        </div>
                                    </div>
                                </div>
                                <!--招标（采购）人地址  -->
                                <div class="noteBox">
                                    <div class="noteContent">
                                        <div class="noteLeft" style="width:220px;">招标（采购）人地址：</div>
                                        <div class="noteFlex">
                                            <span>测试</span>
                                        </div>
                                    </div>
                                </div>
                                <!--招标（采购）人联系方式  -->
                                <div class="noteBox">
                                    <div class="noteContent">
                                        <div class="noteLeft" style="width:220px;">招标（采购）人联系方式：</div>
                                        <div class="noteFlex">
                                            <span>测试</span>
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
                                <!-- 中标人（成交供应商） -->
                                <div style="font-weight:bold;">中标人（成交供应商）</div>
                                <!--中标人（成交供应商）全称  -->
                                <div class="noteBox">
                                    <div class="noteContent">
                                        <div class="noteLeft" style="width:220px;">中标人（成交供应商）全称：</div>
                                        <div class="noteFlex">
                                            <span>测试</span>
                                        </div>
                                    </div>
                                </div>
                                <!--中标人（成交供应商）地址  -->
                                <div class="noteBox">
                                    <div class="noteContent">
                                        <div class="noteLeft" style="width:220px;">中标人（成交供应商）地址：</div>
                                        <div class="noteFlex">
                                            <span>测试</span>
                                        </div>
                                    </div>
                                </div>
                                <!--中标人（成交供应商）联系方式  -->
                                <div class="noteBox">
                                    <div class="noteContent">
                                        <div class="noteLeft" style="width:220px;">中标人（成交供应商）联系方式：</div>
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
                                            <span>测试</span>
                                        </div>
                                    </div>
                                </div>
                                <!--合同名称  -->
                                <div class="noteBox">
                                    <div class="noteContent">
                                        <div class="noteLeft" style="width:220px;">合同名称：</div>
                                        <div class="noteFlex">
                                            <span>测试</span>
                                        </div>
                                    </div>
                                </div>
                                <!--合同金额  -->
                                <div class="noteBox">
                                    <div class="noteContent">
                                        <div class="noteLeft" style="width:220px;">合同金额(元)：</div>
                                        <div class="noteFlex">
                                            <span>测试</span>
                                        </div>
                                    </div>
                                </div>
                                <!--合同期限  -->
                                <div class="noteBox">
                                    <div class="noteContent">
                                        <div class="noteLeft" style="width:220px;">合同期限(日历天)：</div>
                                        <div class="noteFlex">
                                            <span>测试</span>
                                        </div>
                                    </div>
                                </div>
                                <!--合同签署时间  -->
                                <div class="noteBox">
                                    <div class="noteContent">
                                        <div class="noteLeft" style="width:220px;">合同签署时间：</div>
                                        <div class="noteFlex">
                                            <span>测试</span>
                                        </div>
                                    </div>
                                </div>
                                <!--洽谈地点  -->
                                <div class="noteBox">
                                    <div class="noteContent">
                                        <div class="noteLeft" style="width:220px;">洽谈地点：</div>
                                        <div class="noteFlex">
                                            <span>测试</span>
                                        </div>
                                    </div>
                                </div>
                                <!--质量要求  -->
                                <div class="noteBox">
                                    <div class="noteContent">
                                        <div class="noteLeft" style="width:220px;">质量要求：</div>
                                        <div class="noteFlex">
                                            <span>测试</span>
                                        </div>
                                    </div>
                                </div>
                                <!--合同主要内容  -->
                                <div class="noteBox">
                                    <div class="noteContent">
                                        <div class="noteLeft" style="width:220px;">合同主要内容：</div>
                                        <div class="noteFlex">
                                            <span>测试</span>
                                        </div>
                                    </div>
                                </div>
                                <!--备注说明  -->
                                <div class="noteBox">
                                    <div class="noteContent">
                                        <div class="noteLeft" style="width:220px;">备注说明：</div>
                                        <div class="noteFlex">
                                            <span>测试</span>
                                        </div>
                                    </div>
                                </div>
                                <!-- 项目联系人 -->
                                <div class="noteBox" style="margin-top:20px;">
                                    <div class="noteContent">
                                        <div class="noteLeft" style="width:150px;font-weight:bold;">项目联系人：</div>
                                        <div class="noteFlex">
                                            <span style="font-weight:bold;">测试</span>
                                        </div>
                                    </div>
                                </div>
                                <!-- 联系方式 -->
                                <div class="noteBox">
                                    <div class="noteContent">
                                        <div class="noteLeft" style="width:150px;font-weight:bold;">联系方式：</div>
                                        <div class="noteFlex">
                                            <span style="font-weight:bold;">测试</span>
                                        </div>
                                    </div>
                                </div>
                                <!--备注  -->
                                <div class="noteBox">
                                    <div class="noteContent">
                                        <div class="noteLeft" style="width:150px;font-weight:bold;">备注：</div>
                                        <div class="noteFlex">
                                            <span>测试</span>
                                        </div>
                                    </div>
                                </div>
                                <!--名称和日期  -->
                                <div style="font-weight:bold;text-align:right;width:100%;margin-bottom:10px;">
                                    <div>测试用户1</div>
                                    <div>2019年2月15日</div>
                                </div>
                            </div>
                        </div>
                    </el-collapse-item>
                    <!--办理记录  -->
                    <el-collapse-item title="办理记录" name="6">
                        <div class="new_m_b">
                            <div class="new_m_b2">
                                <el-table :data="recordData" stripe style="width: 100%">
                                    <el-table-column prop="organizationCode" label="步骤" width="180">
                                    </el-table-column>
                                    <el-table-column prop="companyName" label="办理人员">
                                    </el-table-column>
                                    <el-table-column prop="registeredArea" label="时间">
                                    </el-table-column>
                                    <el-table-column prop="registeredArea" label="提交">
                                    </el-table-column>
                                    <el-table-column prop="registeredArea" label="备注">
                                    </el-table-column>
                                </el-table>
                            </div>
                        </div>
                    </el-collapse-item>
                </el-collapse>
            </div>
        </div>
        <!-- 上传电子文件展示 -->
        <div class="mask1" v-show="ElectronShow"></div>
        <div class="file_box" v-show="ElectronShow">
            <!-- 头部 -->
            <div class="file_head">
                <div class="file_title" style="padding-left:10px;">履约文件</div>
                <div style="padding-right:10px;font-size:25px;cursor:pointer;" @click="closeFile()">×</div>
            </div>
            <!-- 上传删除 -->
            <div class="file_nav">
                <input type="file" @change="loadFile($event)" ref="file" name="file" class="file_btn" multiple="multiple" accept=".doc,.docx,.txt,.rar,.zip,.xls,.xlsx,.pdf,image/gif,image/png,image/bmp,image/pdf,image/jpg,image/jpeg">
                <button style="margin-right:3px;">上传</button>
                <button @click="deleteFile()">删除</button>
            </div>
            <!-- 表格 -->
            <div class="fileTableData">
                <el-table :data="fileData" style="width: 100%"  @selection-change="handleSelectionChange">
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
        <!-- 履约情况 -->
        <el-dialog
            title="系统提示"
            :visible.sync="dialogVisible"
            width="40%"
            :before-close="handleClose">
            <div class="icon">
                <i class="el-icon-warning"></i>
                <span>尚未完成合同，无法记录履约情况！</span>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
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
    </div>
</template>

<script>
    import baseUrl from '../../../api/api'
    import dayjs from "dayjs"
  export default {
    data() {
      return {
        projectObj:JSON.parse(window.localStorage.projectObj),
        value:'',
        id:[],//履约情况id
        activeName:'2',
        isdeleteBoxShow:false,//是否删除
        dialogVisible: false,//履约情况
        show:false,//新增履约
        lookShow:true,//新增查看履约记录
        ElectronShow:false,//上传电子文件展示
        informateShow:false,//查看合同信息弹框
        tableData:[],//列表数据
        performanceData:[],//新增履约数据
        contractData:[],//合同信息数据
        appendixData:[],//相关附件数据
        relevantData:[],//合同信息--》相关附件
        recordData:[],//合同信息--》办理记录
        winnerData:[],//合同信息点击查看--》中标人信息
        fileData:[],//上传电子文件列表数据
        currentPage:1,//当前页
        nameOfTenderProject:'',//招标项目名称
        biddingProjectNumber:'',//招标项目编号
        totalProjectId:'',//分包编号
        subcontractName:'',//分包名称
        nameOfPurchaser:'',//招标采购人
        amountOfBiddingProject:'',//招标金额
        totalProId:'',//入场项目编号
        realityPerformanceDeadline:'',//实际履约期限
        performanceSubmitDate:'',//履约递交时间
        performanceChangeContent:'',//履约变更内容
      };
    },
    methods: {
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
                }else{
                    console.log(res.data.msg);
                }
            }).catch(err=>{
                console.log(err)
            })
        },
        //获取列表详情
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
                method:'POST',
                url:baseUrl + '/tenderPerformanceController/queryTenderPerformance',
                data:obj
            }).then(res=>{
                if(res.data.status == 200){
                    this.tableData = res.data.data
                }else{
                    console.log(res.data.msg)
                }
            }).catch(err=>{
                console.log(err)
            })
        },
        //新增履约
        newManage(){
            this.show = true;
        },
        close(){
            this.show = false;
        },
        //选中列表选框
        handleSelectionChange(val){
            let deleteArr = [];
            for(let i in val){
                deleteArr.push(val[i].id);
            }
            this.id = deleteArr;
        },
        //删除履约情况
        deletePro(){
            this.isdeleteBoxShow = true;
        },
        isdeleteSave(){
            this.isdeleteBoxShow = false;
            this.$axios({
                method: "GET",
                url: baseUrl+"/tenderPerformanceController/delete",
                data:this.id.join(',')
            }).then(res=>{
                if(res.data.status == 200){
                    for(var i=0;i<this.tableData.length;i++){
                        for(var j=0;j<this.id.length;j++){
                            if(this.tableData[i].id == this.id[j]){
                                this.tableData.splice(i,1);
                            }
                        }
                    }
                }else{
                    console.log(res.data.msg)
                }
            }).catch(err=>{
                console.log(err);
            })
        },
        //修改履约记录
        modifyOpen(row){
            
        },
        //新增履约记录
        getDetail(){
            this.lookShow = true;
        },
        closelookShow(){
            this.lookShow = false;
        },
        //新增履约记录--》点击修改保存
        modifySaveFile(){
             let obj={};
            if(this.projectObj.totalProjectId.indexOf("-") != -1){
                obj={
                    entrySubcontractNumber:this.projectObj.totalProjectId,
                    realityPerformanceDeadline:this.realityPerformanceDeadline,//实际履约期限
                    performanceSubmitDate:this.performanceSubmitDate,//履约递交时间
                    performanceChangeContent:this.performanceChangeContent,//履约变更内容
                }
            }else{
                obj={
                    projectCode:this.projectObj.totalProjectId,
                    realityPerformanceDeadline:this.realityPerformanceDeadline,//实际履约期限
                    performanceSubmitDate:this.performanceSubmitDate,//履约递交时间
                    performanceChangeContent:this.performanceChangeContent,//履约变更内容
                }
            }
            this.$axios({
                method:'POST',
                url:baseUrl + '/tenderPerformanceController/saveTenderPerformance',
                data:obj
            }).then(res=>{
                if(res.data.status == 200){
                    this.lookShow = false;
                    this.getDataList();
                }else{
                    console.log(res.data.msg);
                }
            }).catch(err=>{
                console.log(err)
            })
        },
        //编号问题
        typeIndex(index) {
            return index + (this.currentPage - 1) * 10 + 1;
        },
        
        //查看合同信息弹框
        lookOpen(){
            this.informateShow = true;
        },
        closeinforShow(){
            this.informateShow = false;
        },
        //电子文件展示
        fileElectron(){
            this.ElectronShow = true;
        },
        closeFile(){
            this.ElectronShow = false;
        },
        handleClose(done) {
            this.dialogVisible = false;
        }
    },
    created(){
        this.getDataList();
        this.getbiddingInfo();
    }
  };
</script>

<style scoped>
.myDiv {
  width: 100%;
  height: 100%;
  overflow-y: hidden;
  padding-bottom: 5%;
}
.head_box {
  width: 100%;
  height: 35px;
  line-height: 35px;
  display: flex;
  justify-content: flex-start;
  background: #ffffff;
  padding: 0 3px;
}
.head_l {
  padding: 2px 6px;
  background-color: #0095d5;
  color: #ffffff;
  cursor: pointer;
  margin-right: 3px;
}
.head_bottom {
  width: 100%;
  text-align: center;
  margin: 2% 0;
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
.box{
    width: 100%;
    height: 35px;
    background: #d3d7d4;
}
.wrap_tit{
    width: 100%;
    padding: 10px 10px;
}
.warp_main{
    margin: 0;
    padding: 0;
    width: 100%;
    height: 80%;
    overflow-y: scroll;
}
.mask,.mask1{
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
    z-index: 8;
}
.new_pro_box{
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
.inputk{
    height: 25px;
    width: 80px;
    border: 1px solid #ccc;
    border-radius: 3px;
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
  /* 上传电子展示 */
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
</style>