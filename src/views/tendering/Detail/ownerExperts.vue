<template>
    <div class="myDiv">
        <!-- 上一步弹框 -->
        <div v-show="show">
            <div class="new_nav">
                <button class="nav_co nav_save" @click="saveFile()">保存</button>
                <button class="nav_co nav_next" @click="nextTo()">下一步</button>
            </div>
            <div class="main top_box">
                <el-collapse v-model="activeName" accordion>
                    <!-- 招标项目信息-->
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
                                            <span style="width:130px;">入场项目编号：</span>
                                            <span>{{totalProjectId}}</span>
                                        </div>
                                    </div>
                                </div>
                                <!-- 表格 -->
                                <div v-if="projectObj.totalProjectId.indexOf('-') > -1">
                                    <div style="padding-left:10px;font-weight:bold;">若需添加多分包，请点击<i class="el-icon-plus"  @click="addSubpack()" style="font-size:24px;cursor:pointer;"></i>按钮</div>
                                    <el-table :data="subpackgeData" stripe style="width: 100%">
                                        <el-table-column type="index" width="70" label="序号" :index="typeIndex">
                                        </el-table-column>
                                        <el-table-column prop="entrySubcontractNumber" label="入场项目(分包)编号">
                                        </el-table-column>
                                        <el-table-column prop="subcontractName" label="分包名称"  width="190">
                                        </el-table-column>
                                        <el-table-column  prop="subcontractingControlAmount"  label="分包控制金额(万元)" width="150">
                                        </el-table-column>
                                        <el-table-column prop="operation" label="查看">
                                            <template slot-scope="scope">
                                                <i class="el-icon-search" style="cursor:pointer;" @click="lookFile(scope.row)"></i>
                                            </template>
                                        </el-table-column>
                                        <el-table-column prop="operation" label="删除">
                                            <template slot-scope="scope">
                                                <i class="el-icon-close" style="cursor:pointer;"  @click="deleteTable(scope.row)"></i>
                                            </template>
                                        </el-table-column>
                                    </el-table>
                                </div>
                            </div>
                        </div>
                    </el-collapse-item>
                    <!-- 业主专家-->
                    <el-collapse-item title="业主专家" name="2">
                        <div class="new_m_b">
                            <div class="new_m_b2">
                                <div style="margin-top:10px;">
                                    <button class="nav_co nav_save" @click="addSpecialist()">新增专家</button>
                                    <button class="nav_co nav_next" @click="deleteOwner()">删除专家</button>
                                </div>  
                                <div style="margin-top:5px;">
                                    <el-table :data="ownerData" stripe style="width: 100%"   @selection-change="handlePersonChange">
                                        <el-table-column type="selection" width="55" align='center'>
                                        </el-table-column>
                                        <el-table-column  type="index"  label="序号" :index="typeIndex" width="70">
                                        </el-table-column>
                                        <el-table-column  prop="expertName"  label="姓名" >
                                        </el-table-column>
                                        <el-table-column  prop="company"  label="工作单位">
                                        </el-table-column>
                                        <el-table-column  prop="certified"  label="职称/执业资格">
                                        </el-table-column>
                                        <el-table-column  prop="specialty"  label="从事专业">
                                        </el-table-column>
                                        <el-table-column  prop="committeeJob"  label="评标委员会担任工作" width="150">
                                        </el-table-column>
                                        <el-table-column  prop="expertType"  label="专家类型" >
                                        </el-table-column>
                                        <el-table-column prop="operation" label="查看" width="70">
                                            <template slot-scope="scope">
                                                <i class="el-icon-search" style="cursor:pointer;" @click="ownerFile(scope.row)"></i>
                                            </template>
                                        </el-table-column>
                                        <el-table-column prop="operation" label="修改"  width="70">
                                            <template slot-scope="scope">
                                                <i class="el-icon-edit" style="cursor:pointer;"  @click="editOwner(scope.row)"></i>
                                            </template>
                                        </el-table-column>
                                    </el-table>
                                </div>    
                            </div>
                        </div>
                    </el-collapse-item>
                    <!-- 备注说明-->
                    <el-collapse-item title="备注说明" name="3">
                        <div class="new_m_b">
                            <div class="new_m_b2">
                                <div class="noteBox" style="margin-top:15px;">
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
        <div  v-show="nextShow">
            <div class="new_nav">
                <button class="nav_co nav_save" @click="submitFile()">提交</button>
                <button class="nav_co nav_next" @click="backTo()">上一步</button>
            </div>
            <div class="main top_box">
                <el-collapse v-model="activeName" accordion>
                    <!-- 招标项目信息-->
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
                                            <span style="width:130px;">入场项目编号：</span>
                                            <span>{{totalProjectId}}</span>
                                        </div>
                                    </div>
                                </div>
                                <!-- 表格 -->
                                <div v-if="projectObj.totalProjectId.indexOf('-') > -1">
                                    <el-table :data="subpackgeData" stripe style="width: 100%">
                                        <el-table-column type="index" width="70" label="序号" :index="typeIndex">
                                        </el-table-column>
                                        <el-table-column prop="entrySubcontractNumber" label="入场项目(分包)编号">
                                        </el-table-column>
                                        <el-table-column prop="subcontractName" label="分包名称"  width="190">
                                        </el-table-column>
                                        <el-table-column  prop="subcontractingControlAmount"  label="分包控制金额(万元)" width="150">
                                        </el-table-column>
                                        <el-table-column prop="operation" label="查看">
                                            <template slot-scope="scope">
                                                <i class="el-icon-search" style="cursor:pointer;" @click="lookFile(scope.row)"></i>
                                            </template>
                                        </el-table-column>
                                    </el-table>
                                </div>
                            </div>
                        </div>
                    </el-collapse-item>
                    <!-- 附件 -->
                    <el-collapse-item title="相关附件" name="2">
                        <div class="new_m_b">
                            <div class="new_m_b2">
                            <el-table :data="enclosureData" stripe style="width: 100%">
                                <el-table-column prop="appendixName" label="附件名称" width="150">
                                </el-table-column>
                                <el-table-column label="附件列表(点击查看)">
                                    <template slot-scope="scope">
                                        <li v-for='item in scope.row.attachlist' @click="downLoadupFile(item)" class="temLi">
                                            {{item.fileName}}
                                        </li>
                                    </template>
                                </el-table-column>
                                <el-table-column fixed="right" label="操作">
                                <template slot-scope="scope">
                                    <i class="el-icon-setting"  style="cursor: pointer;" @click="shezhi()"></i>
                                </template>
                                </el-table-column>
                            </el-table>
                            </div>
                        </div>
                    </el-collapse-item>
                    <!-- 业主专家-->
                    <el-collapse-item title="业主专家" name="3">
                        <div class="new_m_b">
                            <div class="new_m_b2">
                                <div style="margin-top:5px;">
                                    <el-table :data="ownerData" stripe style="width: 100%">
                                        <el-table-column  type="index"  label="序号" :index="typeIndex" width="70">
                                        </el-table-column>
                                        <el-table-column  prop="expertName"  label="姓名" >
                                        </el-table-column>
                                        <el-table-column  prop="company"  label="工作单位">
                                        </el-table-column>
                                        <el-table-column  prop="certified"  label="职称/执业资格">
                                        </el-table-column>
                                        <el-table-column  prop="specialty"  label="从事专业">
                                        </el-table-column>
                                        <el-table-column  prop="committeeJob"  label="评标委员会担任工作" width="150">
                                        </el-table-column>
                                        <el-table-column  prop="expertType"  label="专家类型" >
                                        </el-table-column>
                                        <el-table-column prop="operation" label="查看" width="70">
                                            <template slot-scope="scope">
                                                <i class="el-icon-search" style="cursor:pointer;" @click="ownerFile(scope.row)"></i>
                                            </template>
                                        </el-table-column>
                                    </el-table>
                                </div>    
                            </div>
                        </div>
                    </el-collapse-item>
                    <!-- 备注说明-->
                    <el-collapse-item title="备注说明" name="4">
                        <div class="new_m_b">
                            <div class="new_m_b2">
                                <div class="noteBox" style="margin-top:15px;">
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
                    <!-- 办理记录 -->
                    <el-collapse-item title="办理记录" name="6">
                        <div>
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
                        </div>
                    </el-collapse-item>
                </el-collapse>
            </div>
        </div>
        <!-- 新增业主专家弹框 -->
        <div v-show="addOwnerShow" class="fb_box">
            <div class="new_head">
                <div style="padding-left:10px;">新增业主专家</div>
                <div @click="closeSubShow()" style="font-size:28px;padding-right:10px;cursor:pointer;">×</div>
            </div>
            <div class="new_nav">
                <button class="nav_co nav_save add_file" @click="saveNotice()">保存</button>
                <button class="nav_co nav_save edit_file" @click="editNotice()">修改保存</button>
            </div>
            <div class="new_main">
                <el-collapse v-model="activeName" accordion>
                    <!-- 业主专家信息-->
                    <el-collapse-item title="业主专家信息" name="1">
                        <div class="new_m_b">
                            <div class="new_m_b2">
                                <!--专家姓名及性别  -->
                                <div class="noteBox">
                                    <div class="noteContent">
                                        <div class="noteLeft"><span style="color:#f00;">*</span>专家姓名：</div>
                                        <div style="display:flex;width:35%;">
                                            <el-input v-model="expertName"></el-input>
                                            <el-button style="margin-left:10px;" @click="selectOwner()">挑选</el-button>
                                        </div>
                                        <div style="display: inline-flex;margin-left:80px;">
                                            <span style="width:70px;">性别：</span>
                                            <el-select v-model="Sex" placeholder="请选择">
                                                <el-option v-for="item in sexData"  :key="item.value" :label="item.label" :value="item.value">
                                                </el-option>
                                            </el-select>
                                        </div>
                                    </div>
                                </div>
                                <!-- 年龄及学历 -->
                                <div class="noteBox">
                                    <div class="noteContent">
                                        <div class="noteLeft">年龄：</div>
                                        <div class="noteFlex" style="width:35%;">
                                            <el-input v-model="Age"></el-input>  
                                        </div>
                                        <div style="display: inline-flex;margin-left:30px;width:50%;">
                                            <span style="width:70px;">学历：</span>
                                            <el-select v-model="education" placeholder="请选择">
                                                <el-option v-for="item in educationData"  :key="item.value" :label="item.label" :value="item.value">
                                                </el-option>
                                            </el-select>
                                        </div>
                                    </div>
                                </div>
                                <!-- 身份证号及职务 -->
                                <div class="noteBox">
                                    <div class="noteContent">
                                        <div class="noteLeft"><span style="color:#f00;">*</span>身份证号：</div>
                                        <div class="noteFlex">
                                            <el-input v-model="idNumber" @blur="idNumberList"></el-input>
                                        </div>
                                        <div style="display: inline-flex;margin-left:30px;width:50%;">
                                            <span style="width:70px;">职务：</span>
                                            <el-input v-model="position"></el-input>
                                        </div>
                                    </div>
                                </div>
                                <!-- 业主专家来源及工作单位 -->
                                <div class="noteBox">
                                    <div class="noteContent">
                                        <div class="noteLeft">业主专家来源：</div>
                                        <div class="noteFlex">
                                            <el-select v-model="expertSource" placeholder="请选择">
                                                <el-option v-for="item in sourceData"  :key="item.value" :label="item.label" :value="item.value">
                                                </el-option>
                                            </el-select>
                                        </div>
                                        <div style="display: inline-flex;margin-left:30px;width:50%;">
                                            <span style="width:130px;">工作单位：</span>
                                            <el-input v-model="company"></el-input>
                                        </div>
                                    </div>
                                </div>
                                <!-- 专家手机及执业资格 -->
                                <div class="noteBox">
                                    <div class="noteContent">
                                        <div class="noteLeft"><span style="color:#f00;">*</span> 专家手机：</div>
                                        <div class="noteFlex">
                                            <el-input v-model="phone" @blur="blurPhone"></el-input>
                                        </div>
                                        <div style="display: inline-flex;margin-left:30px;width:50%;">
                                            <span style="width:130px;">职称/执业资格：</span>
                                            <el-select v-model="certified" placeholder="请选择">
                                                <el-option v-for="item in practisingData"  :key="item.value" :label="item.label" :value="item.value">
                                                </el-option>
                                            </el-select>
                                        </div>
                                    </div>
                                </div>
                                <!--专家类型及担任工作  -->
                                <div class="noteBox">
                                    <div class="noteContent">
                                        <div class="noteLeft">专家类型：</div>
                                        <div class="noteFlex">
                                            <el-select v-model="expertType" placeholder="请选择">
                                                <el-option v-for="item in expertTypeData"  :key="item.value" :label="item.label" :value="item.value">
                                                </el-option>
                                            </el-select>
                                        </div>
                                        <div style="display: inline-flex;margin-left:30px;width:50%;">
                                            <span style="width:130px;">评标委员会担任工作：</span>
                                            <el-select v-model="committeeJob" placeholder="请选择">
                                                <el-option v-for="item in jobData"  :key="item.value" :label="item.label" :value="item.value">
                                                </el-option>
                                            </el-select>
                                        </div>
                                    </div>
                                </div>
                                <!-- 从事专业 -->
                                <div class="noteBox">
                                    <div class="noteContent">
                                        <div class="noteLeft">从事专业：</div>
                                        <div class="noteFlex">
                                            <el-input v-model="specialty"></el-input>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </el-collapse-item>
                </el-collapse>
            </div>
        </div>
        <!-- 查看业主专家弹框 -->
        <div v-show="lookOwnerShow" class="fb_box">
            <div class="new_head">
                <div style="padding-left:10px;">查看业主专家</div>
                <div @click="closeSubShow()" style="font-size:28px;padding-right:10px;cursor:pointer;">×</div>
            </div>
            <div class="new_main">
                <el-collapse v-model="activeName" accordion>
                    <!-- 业主专家信息-->
                    <el-collapse-item title="业主专家信息" name="1">
                        <div class="new_m_b">
                            <div class="new_m_b2">
                                <!--专家姓名及性别  -->
                                <div class="noteBox">
                                    <div class="noteContent">
                                        <div class="noteLeft">专家姓名：</div>
                                        <div class="noteFlex">
                                            <span>{{expertName}}</span>
                                        </div>
                                        <div style="display: inline-flex;margin-left:30px;width:50%;">
                                            <span style="width:70px;">性别：</span>
                                            <span>{{Sex}}</span>
                                        </div>
                                    </div>
                                </div>
                                <!-- 年龄及学历 -->
                                <div class="noteBox">
                                    <div class="noteContent">
                                        <div class="noteLeft">年龄：</div>
                                        <div class="noteFlex" style="width:35%;">
                                            <span>{{Age}}</span>
                                        </div>
                                        <div style="display: inline-flex;margin-left:30px;width:50%;">
                                            <span style="width:70px;">学历：</span>
                                            <span>{{education}}</span>
                                        </div>
                                    </div>
                                </div>
                                <!-- 身份证号及职务 -->
                                <div class="noteBox">
                                    <div class="noteContent">
                                        <div class="noteLeft">身份证号：</div>
                                        <div class="noteFlex">
                                            <span>{{idNumber}}</span>
                                        </div>
                                        <div style="display: inline-flex;margin-left:30px;width:50%;">
                                            <span style="width:70px;">职务：</span>
                                            <span>{{position}}</span>
                                        </div>
                                    </div>
                                </div>
                                <!-- 业主专家来源及工作单位 -->
                                <div class="noteBox">
                                    <div class="noteContent">
                                        <div class="noteLeft">业主专家来源：</div>
                                        <div class="noteFlex">
                                            <span>{{expertSource}}</span>
                                        </div>
                                        <div style="display: inline-flex;margin-left:30px;width:50%;">
                                            <span style="width:130px;">工作单位：</span>
                                            <span>{{company}}</span>
                                        </div>
                                    </div>
                                </div>
                                <!-- 专家手机及执业资格 -->
                                <div class="noteBox">
                                    <div class="noteContent">
                                        <div class="noteLeft">专家手机：</div>
                                        <div class="noteFlex">
                                            <span>{{phone}}</span>
                                        </div>
                                        <div style="display: inline-flex;margin-left:30px;width:50%;">
                                            <span style="width:130px;">职称/执业资格：</span>
                                            <span>{{certified}}</span>
                                        </div>
                                    </div>
                                </div>
                                <!--专家类型及担任工作  -->
                                <div class="noteBox">
                                    <div class="noteContent">
                                        <div class="noteLeft">专家类型：</div>
                                        <div class="noteFlex">
                                            <span>{{expertType}}</span>
                                        </div>
                                        <div style="display: inline-flex;margin-left:30px;width:50%;">
                                            <span style="width:130px;">评标委员会担任工作：</span>
                                            <span>{{committeeJob}}</span>
                                        </div>
                                    </div>
                                </div>
                                <!-- 从事专业 -->
                                <div class="noteBox">
                                    <div class="noteContent">
                                        <div class="noteLeft">从事专业：</div>
                                        <div class="noteFlex">
                                            <span>{{specialty}}</span>
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
                <div style="padding-left:10px;">分包信息</div>
                <div @click="closeSubShow()" style="font-size:28px;padding-right:10px;cursor:pointer;">×</div>
            </div>
            <div style="margin-top:10px;">
                <el-table :data="bidSectionData" stripe style="width: 100%"   @selection-change="handleAddSubChange">
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
                <button class="btn" style="width:125px;" @click="quedingSelec()">确定选择</button>
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
                    <!-- 招标项目信息-->
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
                                            <span style="width:130px;">入场项目编号：</span>
                                            <span>{{totalProjectId}}</span>
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
                                <!--统一交易标志码  -->
                                <div class="noteBox">
                                    <div class="noteContent">
                                    <div class="noteLeft" style="color:#f00;">统一交易标志码：</div>
                                    <div class="noteFlex">
                                        <span  style="color:#f00;"></span>
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
                                    <div class="noteLeft">是否电子招投标：</div>
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
        <!-- 新增挑选业主专家信息 -->
        <div class="mask"  v-show="chooseShow"></div>
        <div class="choose_box" v-show="chooseShow">
            <div class="new_head">
                <div style="padding-left:10px;">挑选专家</div>
                <div @click="closeChooseShow()" style="font-size:28px;padding-right:10px;cursor:pointer;">×</div>
            </div>
            <div>
                <el-table :data="chooseData" stripe style="width: 100%">
                    <el-table-column type="index" width="70" label="序号" :index="typeIndex">
                    </el-table-column>
                    <el-table-column prop="expertName" label="专家名称">
                    </el-table-column>
                    <el-table-column prop="idNumber" label="身份证号">
                    </el-table-column>
                    <el-table-column prop="operation" label="选择">
                        <template slot-scope="scope">
                            <i class="el-icon-plus" style="cursor:pointer;"  @click="addChoose(scope.row)"></i>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <!-- 上传文件弹框 -->
        <div class="mask1" v-show="fileShow"></div>
        <div class="file_box" v-show="fileShow">
            <!-- 头部 -->
            <div class="file_head">
            <div class="file_title" style="padding-left:10px;">招标人评委相关证明</div>
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
    </div>
</template>

<script>
import '../../../assets/css/style.css'
import baseUrl from '../../../api/api'
import {isPoneAvailable,getIdcard} from '../../../api/base.js'
import dayjs from "dayjs"
export default {
  components:{},
  props:{},
  data(){
    return {
        value:'',
        projectObj:JSON.parse(window.localStorage.projectObj),
        saveBox:false,//保存弹框
        submitBox:false,//提交弹框
        show:true,//上一步弹框
        nextShow:false,//下一步弹框
        addOwnerShow:false,//新增业主专家弹框
        addInforShow:false,//添加分包信息弹框
        subcontractInforShow:false,//查看分包信息弹框
        chooseShow:false,//挑选业主专家信息
        fileShow:false,//上传文件弹框
        lookOwnerShow:false,//查看业主专家弹框
        fileData:[],//上传文件数据
        activeName:'1',
        expertName:'',//专家姓名
        Sex:'',//性别
        Age:'',//年龄
        education:'',//学历
        idNumber:'',//身份证号
        position:'',//职务
        expertSource:'',//业主专家来源
        company:'',//工作单位
        phone:'',//手机号
        certified:'',//执业资格
        expertType:'',//专家类型
        committeeJob:'',//担任工作
        specialty:'',//从事专业
        nameOfTenderProject:'',//招标项目名称
        nameOfPurchaser:'',//招标采购人
        amountOfBiddingProject:'',//招标项目金额
        biddingProjectNumber:'',//招标项目编号
        totalProjectId:'',//入场项目编号
        subpackgeData:[],//分包表格
        currentPage:1,
        EntrySubNum:"",//表格id
        zhuangtai:'',//返回的状态
        ownerData:[
            {
                index:1
            }
        ],//业主专家数据
        sexData:[
            {
                value:'男',
                label:'男'
            },
            {
                value:'女',
                label:'女'
            },
        ],
        educationData:[],//学历
        sourceData:[//业主专家来源
            {
                value:'外聘',
                label:'外聘'
            },
            {
                value:'本单位',
                label:'本单位'
            },
        ],
        practisingData:[],//执业资格
        expertTypeData:[//专家类型
            {
                value:'甲方评委',
                label:'甲方评委'
            },
            {
                value:'邀请评委',
                label:'邀请评委'
            },
        ],
        jobData:[//担任工作
            {
                value:'技术标评委',
                label:'技术标评委'
            },
            {
                value:'经济标评委',
                label:'经济标评委'
            },
            {
                value:'经济技术标评委',
                label:'经济技术标评委'
            }
        ],
        enclosureData:[//相关附件
             {
                appendixName: "招标人评委相关证明",
                attachlist: []
            }
        ],
        bidSectionData:[],//添加分包数据
        pulicBids:'',//添加分包--招标项目名称
        biddingMethod:'',//添加分包--招标方式
        entrySubcontractNumber:'',//入场项目分包编号
        subcontractName:'',//分包名称
        subcontractContents:'',//分包内容
        scopeOfTender:'',//招标范围
        subcontractingControlAmount:'',//分包控制金额
        qualificationExaminationMethod:'',//资格审查方式
        electronicBidEvaluation:'',//是否电子招投标
        chooseData:[],//挑选业主专家信息数据
        handleRecordData:[],//办理记录
        expertsMainId:'',//初始化查询返回的id
        selectSubArr:[],//分包选择数据
        deletepersonId:[],//将id传参给删除的业主专家
        expertsId:'',//修改业主专家主键id
        remark:'',//备注说明
        flag:false,//async
        keyId:'',//添加分包信息id编号
    }
  },
  watch:{},
  computed:{},
  created(){
      this.getbiddingInfo();//招标项目信息
      this.getSearchList();//查询--判断
      this.getAddSubList();
      this.getOwnerSpecialist();//业主专家
      this.getRecordList();//办理记录
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
                    this.subcontractingControlAmount = res.data.data.subcontractingControlAmount//分包控制金额
                    this.biddingOrganization = res.data.data.biddingOrganization,//招标组织方式
                    this.biddingProcurementMode = res.data.data.biddingProcurementMode,//招标采购方式
                    this.typesOfBiddingProjects = res.data.data.typesOfBiddingProjects,//招标项目类型
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
        //查询已添加的分包信息
        getAddSubList(){
            let object={};
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
                url:baseUrl + '/ownerExpertsController/selectList',
                data:object
            }).then(res=>{
                if(res.data.status == 200){
                    this.subpackgeData = res.data.data;
                }else{
                    this.$layer.msg(res.data.msg)
                }
            }).catch(err=>{
                console.log(err)
            })
        },
        
        //查询--判断
        getSearchList(){
            let object={};
            if(this.projectObj.totalProjectId.indexOf("-") != -1 && this.projectObj.totalProjectId!=null){
                // 入场项目分包编号
                object={
                    entrySubcontractNumber:this.projectObj.totalProjectId,
                    type:'业主专家'
                }
            }else{
                // 入场项目编号
                object ={
                    projectCode:this.projectObj.totalProjectId,
                    type:'业主专家'
                }
            }
            return this.$axios({
                method:'POST',
                url:baseUrl + '/ownerExpertsController/queryState',
                data:object
            }).then(res=>{
                this.expertsMainId = res.data.data.expertsMainId;
                this.zhuangtai = res.data.data.state;
                if(res.data.status == 200){
                    if(res.data.data == null || this.zhuangtai == null){
                        this.show = true;
                        this.nextShow = false;
                    }else if(this.zhuangtai == "编辑中" || this.zhuangtai == "办理未通过"){
                        this.show = false;
                        this.nextShow = true;
                    }else if(this.zhuangtai == "待办理" || this.zhuangtai == "办理通过"){
                        this.show = false;
                        this.nextShow = true;
                        $('.new_nav').hide()
                    }
                }else{
                    this.$layer.msg(res.data.msg)
                }
            }).catch(err=>{
                console.log(err)
            })
        },
        //查询业主专家
        getOwnerSpecialist(){
            this.$axios({
                method:'POST',
                url:baseUrl + '/ownerExpertsController/selectExpertsList',
                data:{
                    ExpertsMainId:this.ExpertsMainId,
                    deleteControl:'1'
                }
            }).then(res=>{
                if(res.data.status == 200){
                    this.ownerData = res.data.data;
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
        //添加分包信息
        addSubpack(){
            this.$axios({
                method:'POST',
                url:baseUrl + '/ownerExpertsController/selectSubcontract',
                data:{
                    entrySubcontractNumber:this.projectObj.totalProjectId,
                    expertsMainId:this.expertsMainId
                }
            }).then(res=>{
                if(res.data.status == 200){
                    this.bidSectionData = res.data.data;
                    this.addInforShow = true;
                }else{
                    this.$layer.msg(res.data.msg)
                }
            }).catch(err=>{
                console.log(err)
            })
        },
        //添加分包--
        handleAddSubChange(val){
            this.selectSubArr = [];
            val.map((item,index)=>{
                this.selectSubArr.push(item.entrySubcontractNumber);
            })
        },
        //点击分包信息--确定选择按钮
        quedingSelec(){
            this.$axios({
                method:'POST',
                url:baseUrl + '/ownerExpertsController/addEntry',
                data:{
                    expertsMainId:this.expertsMainId,
                    listEntryCode:this.selectSubArr
                }
            }).then(res=>{
                if(res.data.status == 200){
                    this.getAddSubList();
                    this.addInforShow = false;
                    this.show = true;
                }else{
                    this.$layer.msg(res.data.msg)
                }
            }).catch(err=>{
                console.log(err)
            })
        },
        
        //删除分包
        deleteTable(row){
            if(row.entrySubcontractNumber == this.projectObj.totalProjectId){
                this.$layer.msg('不可删除当前项目分包编号')
                return;
            }else{
                this.$axios({
                    method:'POST',
                    url:baseUrl + '/ownerExpertsController/deleteEntry',
                    data:{
                        entrySubcontractNumber:row.entrySubcontractNumber
                    }
                }).then(res=>{
                    if(res.data.status == 200){
                        this.getAddSubList();
                    }else{
                        this.$layer.msg(res.data.msg)
                    }
                }).catch(err=>{
                    console.log(err)
                })
            }
            
        },
        //新增专家
        addSpecialist(){
            this.addOwnerShow = true;
            $('.add_file').show();
            $('.edit_file').hide();
            this.Sex = this.sexData[0].label;
            this.expertSource = this.sourceData[0].label;
            this.expertType = this.expertTypeData[0].label;
            this.committeeJob = this.jobData[0].label;
            this.expertName = '';
            this.Age = '';
            this.idNumber = '';
            this.position = '';
            this.company ='';
            this.phone = '';
            this.certified = '';
            this.specialty = '';
        },
        
        //挑选按钮
        selectOwner(){
            this.$axios({
                method:'POST',
                url:baseUrl + '/ownerExpertsController/selectExpertsList',
                data:{
                    ExpertsMainId:this.ExpertsMainId,
                }
            }).then(res=>{
                if(res.data.status == 200){
                    this.chooseData = res.data.data;
                    this.chooseShow = true;
                }else{
                    this.$layer.msg(res.data.msg)
                }
            }).catch(err=>{
                console.log(err)
            })
        },
        //点击加号
        addChoose(row){
            this.chooseShow = false;
            this.expertName = row.expertName;
            this.sex = row.sex;
            this.Age = row.age;
            this.education = row.education;
            this.idNumber = row.idNumber;
            this.position = row.position;
            this.expertSource = row.expertSource;
            this.company = row.company;
            this.phone = row.phone;
            this.certified = row.certified;
            this.expertType = row.expertType;
            this.committeeJob = row.committeeJob;
            this.specialty = row.specialty;
        },
        //点击新增专家--保存按钮
        saveNotice(){
            if(!getIdcard(this.idNumber)){
                this.$layer.msg('请输入正确的身份证号');
                return false;
            }else if(!isPoneAvailable(this.phone)){
                this.$layer.msg('请输入正确的联系方式');
                return false;
            }
            let object={};
            if(this.projectObj.totalProjectId.indexOf("-") != -1 && this.projectObj.totalProjectId!=null){
                // 入场项目分包编号
                object={
                    entrySubcontractNumber:this.projectObj.totalProjectId,
                    expertsMainId:this.expertsMainId,
                    deleteControl:'1',
                    type:'业主专家',
                    expertName:this.expertName,
                    Sex:this.Sex,
                    Age:this.Age,
                    education:this.education,
                    idNumber:this.idNumber,
                    position:this.position,
                    expertSource:this.expertSource,
                    company:this.company,
                    phone:this.phone,
                    certified:this.certified,
                    expertType:this.expertType,
                    committeeJob:this.committeeJob,
                    specialty:this.specialty
                }
            }else{
                // 入场项目编号
                object ={
                    projectCode:this.projectObj.totalProjectId,
                    expertsMainId:this.expertsMainId,
                    deleteControl:'1',
                    type:'业主专家',
                    expertName:this.expertName,
                    Sex:this.Sex,
                    Age:this.Age,
                    education:this.education,
                    idNumber:this.idNumber,
                    position:this.position,
                    expertSource:this.expertSource,
                    company:this.company,
                    phone:this.phone,
                    certified:this.certified,
                    expertType:this.expertType,
                    committeeJob:this.committeeJob,
                    specialty:this.specialty
                }
            }
            this.$axios({
                method:'POST',
                url:baseUrl + '/ownerExpertsController/saveExperts',
                data:object
            }).then(res=>{
                if(res.data.status == 200){
                    this.addOwnerShow = false;
                    this.show = true;
                    this.getOwnerSpecialist();
                }else{
                    this.$layer.msg(res.data.msg)
                }
            }).catch(err=>{
                console.log(err)
            })
        },
        //业主专家选择
        handlePersonChange(val){
            let arr = ''
            val.map((item,index)=>{
                arr = item.expertsId
            })
            this.deletepersonId.push(arr)
        },
        //删除专家
        deleteOwner(){
            this.$axios({
                method:'POST',
                url:baseUrl + '/ownerExpertsController/deleteExperts',
                data:{
                    listExpertsId:this.deletepersonId,
                }
            }).then(res=>{
                if(res.data.status == 200){
                    this.getOwnerSpecialist();
                }else{
                    this.$layer.msg(res.data.msg)
                }
            }).catch(err=>{
                console.log(er)
            })
        },
        //查看业主专家
        ownerFile(row){
            this.lookOwnerShow = true;
            this.expertName = row.expertName;
            this.sex = row.sex;
            this.Age = row.age;
            this.education = row.education;
            this.idNumber = row.idNumber;
            this.position = row.position;
            this.expertSource = row.expertSource;
            this.company = row.company;
            this.phone = row.phone;
            this.certified = row.certified;
            this.expertType = row.expertType;
            this.committeeJob = row.committeeJob;
            this.specialty = row.specialty;
        },
        //修改业主专家
        editOwner(row){
            $('.add_file').hide();
            $('.edit_file').show();
            this.addOwnerShow = true;
            this.expertsId = row.expertsId;
            this.expertName = row.expertName;
            this.sex = row.sex;
            this.Age = row.age;
            this.education = row.education;
            this.idNumber = row.idNumber;
            this.position = row.position;
            this.expertSource = row.expertSource;
            this.company = row.company;
            this.phone = row.phone;
            this.certified = row.certified;
            this.expertType = row.expertType;
            this.committeeJob = row.committeeJob;
            this.specialty = row.specialty;
        },
        //修改业主专家---保存
        editNotice(){
            this.$axios({
                method:'POST',
                url:baseUrl + '/ownerExpertsController/update',
                data:{
                    expertsId:this.expertsId,
                    expertsMainId:this.expertsMainId,
                    expertName:this.expertName,
                    Sex:this.Sex,
                    Age:this.Age,
                    education:this.education,
                    idNumber:this.idNumber,
                    position:this.position,
                    expertSource:this.expertSource,
                    company:this.company,
                    phone:this.phone,
                    certified:this.certified,
                    expertType:this.expertType,
                    committeeJob:this.committeeJob,
                    specialty:this.specialty
                }
            }).then(res=>{
                if(res.data.status == 200){
                    this.addOwnerShow = false;
                    this.getOwnerSpecialist();
                }else{
                    this.$layer.msg(res.data.msg)
                }
            }).catch(err=>{
                console.log(err)
            })
        },
        //下一步
        nextTo(){
            this.$axios({
                method:'POST',
                url:baseUrl + '/ownerExpertsController/saveOrNextStep',
                data:{
                    expertsMainId:this.expertsMainId,
                    remark:this.remark
                }
            }).then(res=>{
                if(res.data.status == 200){
                    this.nextShow = true;
                    this.show = false;
                }else{
                    this.$layer.msg(res.data.msg)
                }
            }).catch(err=>{
                console.log(err)
            })
        },
        //保存按钮
        saveFile(){
            this.saveBox = true;
        },
        sureSave(){
            this.$axios({
                method:'POST',
                url:baseUrl + '/ownerExpertsController/saveOrNextStep',
                data:{
                    expertsMainId:this.expertsMainId,
                    remark:this.remark
                }
            }).then(res=>{
                if(res.data.status == 200){
                    this.nextShow = false;
                    this.show = true;
                    this.saveBox = false;
                    this.remark = res.data.data.remark;
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
            this.show = true;
        },
        //提交按钮
        submitFile(){
            this.submitBox = true;
        },
        submitSave(){
            this.$axios({
                method:'POST',
                url:baseUrl + '/ownerExpertsController/submit',
                data:{
                    expertsMainId:this.expertsMainId
                }
            }).then(res=>{
                if(res.data.status == 200){
                    this.nextShow = true;
                    this.show = false;
                    this.submitBox = false;
                    $('.new_nav').hide();
                    this.remark = res.data.data.remark;
                }else{
                    this.$layer.msg(res.data.msg)
                }
            }).catch(err=>{
                console.log(err)
            })
        },
        //打开上传文件弹框
        shezhi(row){
            this.fileShow = true;
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
            formData.append("projectId", this.projectObj.totalProjectId);
            formData.append("file", this.files);
            formData.append("user", '张三');
            formData.append("fileType", '招标人评委相关证明');
            
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
            this.$axios({//this.projectNums
                method: 'POST',
                url: baseUrl + '/attachmeController/queryAttachme',
                data:{
                    relevanceCorrelationId:this.projectNums,
                    fileType:'招标人评委相关证明'
                }
            }).then(res=>{
                if(res.data.status == 200){
                    // this.filenames = '';
                    this.fileData = res.data.data;
                    var arr = [];
                    this.fileData.map((item,index)=>{
                        item.formatTime = dayjs(item.uploadTime).format('YYYY-MM-DD HH:mm:ss')
                        arr.push(item)
                    })
                    this.enclosureData[0].attachlist = arr
                }else{
                    console.log(res.data.msg)
                }
            }).catch(err=>{
                console.log(err);
            })
        },
        downLoadupFile(item){
            this.downloadFile(item.attachmeId,item.fileName)
        },
        handleSelectionChange(val){
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
                    console.log(res.data.msg)
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
        //办理记录列表
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
                console.log(res.data.msg)
                }
            }).catch(err=>{
                console.log(err)
            })
        },
        //关闭弹框
        closeSubShow(){
            this.addOwnerShow = false;
            this.addInforShow = false;
            this.subcontractInforShow = false;
            this.lookOwnerShow = false;
        },
        closeChooseShow(){
            this.chooseShow = false;
        },
        closeFile(){
            this.fileShow = false;
        },
        handleClose(){
            this.saveBox = false;
            this.submitBox = false;
        },
        //下拉框--学历
        educationList(){
            this.$axios({
                method:'POST',
                url:baseUrl+'/interfaceTableController/selectByname',
                data:{
                dropDownBox:'学历'
                }
            }).then(res=>{
                if(res.data.data.status == 200){
                    this.educationData = res.data.data.data;
                }else{
                console.log(res.data.data.msg)
                }
            }).catch(err=>{
                console.log(err)
            })
        },
        //下拉框--执业资格
        practisingList(){
            this.$axios({
                method:'POST',
                url:baseUrl+'/interfaceTableController/selectByname',
                data:{
                    dropDownBox:'执业资格'
                }
            }).then(res=>{
                if(res.data.data.status == 200){
                    this.practisingData = res.data.data.data;
                }else{
                console.log(res.data.data.msg)
                }
            }).catch(err=>{
                console.log(err)
            })
        },
        //校验手机号联系方式
        blurPhone(){
            if(!isPoneAvailable(this.phone)){
                this.$layer.msg('请输入正确的联系方式');
                return false;
            }
        },
        //检验身份证
        idNumberList(){
            if(!getIdcard(this.idNumber)){
                this.$layer.msg('请输入正确的身份证号');
                return false;
            }
        }
  },
  mounted(){}
}
</script>
<style scoped>
.myDiv{
    width: 100%;
    height: 100%;
    overflow: hidden;
}
.box{
    width: 100%;
    height: 35px;
    background: #d3d7d4;
}
.el-collapse{
    width: 96%;
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
.top_box{
    width: 1200px;
    height: 900px;
    margin: 0 auto;
    overflow: scroll;
}
.mask,.mask1 {
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
  z-index: 7;
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
.el-date-editor--timerange.el-input__inner,.el-date-editor--daterange.el-input__inner{
    width: 225px !important;
}
.el-date-editor .el-range-separator{
    width: 10% !important;
}
.mask1{
    z-index: 8;
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
.sureSelect{
    position: fixed;
    bottom: 5%;
    left:50%;
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
.choose_box{
    z-index: 10;
    width: 900px;
    height: 600px;
    position: absolute;
    top:50%;
    left:60%;
    transform: translate(-60%,-50%);
    background:#f0f4f6;
    overflow: hidden;
}
</style>