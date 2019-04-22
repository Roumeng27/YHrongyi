<template>
  <div class="myDiv">
    <!-- 头部 -->
    <div class="head_box">
      <el-radio v-model="radio" label="1">全部</el-radio>
      <el-radio v-model="radio" label="2">公告中</el-radio>
      <el-radio v-model="radio" label="3">公告截止</el-radio>
    </div>
    <div class="head_bottom">
      <span class="head_b_b">招标项目(分包)名称：<el-input v-model="nameOfTenderProject" placeholder="请输入内容"></el-input></span>
      <span class="head_b_b">入场项目(分包)编号：<el-input v-model="totalProjectId" placeholder="请输入内容"></el-input></span>
      <span><button class="btn" @click="searchList()">搜索</button></span>
    </div>
    <!-- 主体 -->
    <div class="main_box">
        <el-table :data="tableData" stripe style="width: 100%">
          <el-table-column type="index" width="70" label="编号" :index="typeIndex">
          </el-table-column>
          <el-table-column prop="totalProjectId" label="入场(分包)编号" width="150">
          </el-table-column>
          <el-table-column prop="nameOfTenderProject" label="招标项目名称" width="120">
          </el-table-column>
          <el-table-column prop="biddingProjectNumber" label="分包名称">
          </el-table-column>
          <el-table-column prop="nameOfPurchaser" label="分包类型">
          </el-table-column>
          <el-table-column prop="biddingProcurementMode" label="公告截止时间">
          </el-table-column>
          <el-table-column prop="operation" label="操作">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="look()">查看</el-button>
            </template>
          </el-table-column>
      </el-table>
    </div>
    <div class="pagination">
      <template>
        <Page :total="totalSize" :current="PageNum" :page-size='20' show-elevator @on-change="page" v-if="pageTotal>1"></Page>
      </template>
    </div>
    <!-- 查看弹框 -->
    <div class="mask"  v-show="show"></div>
    <div class="new_pro" v-show="show">
      <div class="new_head">
          <div style="padding-left:10px;">投标报名</div>
          <div @click="closeInvitaShow()" style="font-size:28px;padding-right:10px;cursor:pointer;">×</div>
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
                    <!--采购人和项目金额  -->
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
                    <!-- 招标项目编号及入场 -->
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
                </div>
            </div>
          </el-collapse-item>
          <!-- 第二步 -->
          <el-collapse-item title="投标资格条件" name="2">
             <div class="new_m_b">
                <div class="new_m_b2">
                  <!--申请人资格条件  -->
                  <div class="noteBox">
                      <div class="noteContent">
                          <div class="noteLeft">申请人资格条件：</div>
                          <div class="noteFlex">
                              <span>测试</span>
                          </div>
                      </div>
                  </div>
                  <!-- 简要技术要求 -->
                  <div class="noteBox">
                      <div class="noteContent">
                          <div class="noteLeft">简要技术要求：</div>
                          <div class="noteFlex">
                              <span>测试</span>
                          </div>
                      </div>
                  </div>
                  <!--企业资质要求  -->
                  <div class="noteBox">
                      <div class="noteContent">
                          <div class="noteLeft">企业资质要求：</div>
                          <div class="noteFlex">
                              <span>测试</span>
                          </div>
                      </div>
                  </div>
                  <!-- 项目负责人资质条件 -->
                  <div class="noteBox">
                      <div class="noteContent">
                          <div class="noteLeft">企业资质要求：</div>
                          <div class="noteFlex">
                              <span>测试</span>
                          </div>
                      </div>
                  </div>
                  <!-- 公告截止时间及剩几天 -->
                  <div class="noteBox">
                        <div class="noteContent">
                            <div class="noteLeft">公告截止时间：</div>
                            <div class="noteFlex">
                                <span>131</span>
                            </div>
                            <div style="display: inline-flex;margin-left:30px;width:50%;">
                                <span style="width:130px;">距离截止时间还有:</span>
                                <span style="color:#f00;">部门</span>
                            </div>
                        </div>
                    </div>
                </div>
             </div>
          </el-collapse-item>
          <!-- 第三步 -->
          <el-collapse-item title="查看信息" name="3">
             <div class="new_m_b">
                <div class="new_m_b2">
                  <div style="display: flex;justify-content: space-between;">
                    <div>已有<span style="color:#f00;">0</span>家单位投标</div>
                    <div><span style="color:#f00;">0</span>支付招标文件工本费。&emsp;<span style="color:#f00;">0</span>缴纳保证金</div>
                  </div>
                  <div style="display: flex;justify-content: flex-end;">
                    <button class="nav_co nav_save" style="cursor: pointer;">新增投标单位</button>
                    <button class="nav_co nav_save" style="cursor: pointer;">删除投标单位</button>
                  </div>
                  <div class="new_table">
                      <el-table :data="tableData" stripe style="width: 100%">
                        <el-table-column type="selection" width="55" align='center'>
                        </el-table-column>
                        <el-table-column type="index" width="70" label="序号" :index="typeIndex">
                        </el-table-column>
                        <el-table-column prop="admissionNum" label="单位名称" width="100">
                        </el-table-column>
                        <el-table-column prop="name" label="投标联系人">
                        </el-table-column>
                        <el-table-column prop="tendNum" label="支付标书费">
                        </el-table-column>
                        <el-table-column prop="purchaser" label="缴纳保证金">
                        </el-table-column>
                        <el-table-column prop="operation" label="修改">
                          <template slot-scope="scope">
                            <el-button type="text" size="small" @click="modify()">修改</el-button>
                          </template>
                        </el-table-column>
                        <el-table-column prop="operation" label="回执单">
                          <template slot-scope="scope">
                            <el-button type="text" size="small">回执单</el-button>
                          </template>
                        </el-table-column>
                        <el-table-column prop="mode" label="状态">
                        </el-table-column>
                        <el-table-column prop="operation" label="修改">
                          <template slot-scope="scope">
                            <el-button type="text" size="small" @click="lookDetail()">查看</el-button>
                          </template>
                        </el-table-column>
                    </el-table>
                  </div>
                </div>
             </div>
          </el-collapse-item>
        </el-collapse>
      </div>
    </div>
    <!-- 修改弹框 -->
    <div class="mask1"  v-show="modifyShow"></div>
    <div class="new_pro new_pro1" v-show="modifyShow">
      <div class="new_head">
          <div style="padding-left:10px;">完善投标信息</div>
          <div @click="closeModifyShow()" style="font-size:28px;padding-right:10px;cursor:pointer;">×</div>
      </div>
      <div class="new_nav">
          <button class="nav_co nav_save">保存</button>
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
                    <!--采购人和项目金额  -->
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
                    <!-- 招标项目编号及入场 -->
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
                </div>
            </div>
          </el-collapse-item>
          <!-- 第二步 -->
          <el-collapse-item title="投标资格条件" name="2">
             <div class="new_m_b">
                <div class="new_m_b2">
                  <!-- 投标人资格条件 -->
                  <div class="noteBox">
                      <div class="noteContent">
                          <div class="noteLeft">投标人资格条件：</div>
                          <div class="noteFlex">
                              <span>测试</span>
                          </div>
                      </div>
                  </div>
                  <!--简要技术要求  -->
                  <div class="noteBox">
                      <div class="noteContent">
                          <div class="noteLeft">简要技术要求：</div>
                          <div class="noteFlex">
                              <span>测试</span>
                          </div>
                      </div>
                  </div>
                  <!--企业资质要求  -->
                  <div class="noteBox">
                      <div class="noteContent">
                          <div class="noteLeft">企业资质要求：</div>
                          <div class="noteFlex">
                              <span>测试</span>
                          </div>
                      </div>
                  </div>
                  <!--项目负责人资质条件  -->
                  <div class="noteBox">
                      <div class="noteContent">
                          <div class="noteLeft">项目负责人资质条件：</div>
                          <div class="noteFlex">
                              <span>测试</span>
                          </div>
                      </div>
                  </div>
                  <!-- 公告截止时间 -->
                  <div class="noteBox">
                      <div class="noteContent">
                          <div class="noteLeft">公告截止时间：</div>
                          <div class="noteFlex">
                              <span>测试</span>
                          </div>
                      </div>
                  </div>
                </div>
             </div>
          </el-collapse-item>
          <!-- 第三步 -->
          <el-collapse-item title="填写信息" name="3">
             <div class="new_m_b">
                <div class="new_m_b2">
                  <!-- 企业名称和资质 -->
                  <div class="noteBox">
                      <div class="noteContent">
                          <div class="noteLeft">企业名称：</div>
                          <div class="noteFlex">
                              <span>131</span>
                          </div>
                          <div style="display: inline-flex;margin-left:30px;width:50%;">
                              <span style="width:100px;">企业资质:</span>
                              <span>部门</span>
                          </div>
                      </div>
                  </div>
                  <!--组织机构代码及编号  -->
                  <div class="noteBox">
                      <div class="noteContent">
                          <div class="noteLeft">企业组织机构代码：</div>
                          <div class="noteFlex">
                              <span>131</span>
                          </div>
                          <div style="display: inline-flex;margin-left:30px;width:50%;">
                              <span style="width:100px;">企业资质编号:</span>
                              <span>部门</span>
                          </div>
                      </div>
                  </div>
                  <!--项目负责人及专业  -->
                  <div class="noteBox">
                      <div class="noteContent">
                          <div class="noteLeft">项目负责人：</div>
                          <div class="noteFlex">
                              <span>131</span>
                          </div>
                          <div style="display: inline-flex;margin-left:30px;width:50%;">
                              <span style="width:100px;">项目负责人专业:</span>
                              <span>部门</span>
                          </div>
                      </div>
                  </div>
                  <!-- 企业负责人及联系人 -->
                  <div class="noteBox">
                      <div class="noteContent">
                          <div class="noteLeft">企业负责人：</div>
                          <div class="noteFlex">
                              <span>131</span>
                          </div>
                          <div style="display: inline-flex;margin-left:30px;width:50%;">
                              <span style="width:100px;">投标联系人:</span>
                              <span>部门</span>
                          </div>
                      </div>
                  </div>
                  <!--电话及手机  -->
                  <div class="noteBox">
                      <div class="noteContent">
                          <div class="noteLeft">公司电话：</div>
                          <div class="noteFlex">
                              <span>131</span>
                          </div>
                          <div style="display: inline-flex;margin-left:30px;width:50%;">
                              <span style="width:100px;">联系人手机:</span>
                              <span>部门</span>
                          </div>
                      </div>
                  </div>
                  <!--传真及email  -->
                  <div class="noteBox">
                      <div class="noteContent">
                          <div class="noteLeft">传真：</div>
                          <div class="noteFlex">
                              <span>131</span>
                          </div>
                          <div style="display: inline-flex;margin-left:30px;width:50%;">
                              <span style="width:100px;">Email:</span>
                              <span>部门</span>
                          </div>
                      </div>
                  </div>
                  <!--是否联合体报名  -->
                  <div class="noteBox">
                      <div class="noteContent">
                          <div class="noteLeft">是否联合体报名：</div>
                          <div class="noteFlex">
                              <span>测试</span>
                          </div>
                      </div>
                  </div>
                </div>
             </div>
          </el-collapse-item>
          <!-- 第四步 -->
          <el-collapse-item title="标书费缴纳记录" name="4">
             <div class="new_m_b">
                <div class="new_m_b2">
                  <!--是否已缴纳标书费  -->
                  <div class="noteBox">
                      <div class="noteContent">
                          <div class="noteLeft">是否已缴纳标书费：</div>
                          <div class="noteFlex">
                              <el-radio v-model="radio" label="1">是</el-radio>
                              <el-radio v-model="radio" label="2">否</el-radio>
                          </div>
                      </div>
                  </div>
                  <!--标书费金额及缴纳时间  -->
                  <div class="noteBox">
                      <div class="noteContent">
                          <div class="noteLeft">标书费金额：</div>
                          <div class="noteFlex">
                              <span>131</span>
                          </div>
                          <div style="display: inline-flex;margin-left:30px;width:50%;">
                              <span style="width:100px;">缴纳时间:</span>
                              <el-date-picker v-model="value1" type="datetime" placeholder="选择日期时间">
                              </el-date-picker>
                          </div>
                      </div>
                  </div>
                </div>
             </div>
          </el-collapse-item>
          <!-- 第五步 -->
          <el-collapse-item title="保证金缴纳记录" name="5">
             <div class="new_m_b">
                <div class="new_m_b2">
                  <!--标书费金额及缴纳时间  -->
                  <div class="noteBox">
                      <div class="noteContent">
                          <div class="noteLeft">缴纳时间：</div>
                          <div class="noteFlex">
                              <el-date-picker v-model="value1" type="datetime" placeholder="选择日期时间">
                              </el-date-picker>
                          </div>
                          <div style="display: inline-flex;margin-left:30px;width:50%;">
                              <span style="width:100px;">缴纳金额:</span>
                              <el-input v-model="input"></el-input>
                          </div>
                      </div>
                  </div>
                  <!--备注  -->
                  <div class="noteBox">
                      <div class="noteContent">
                          <div class="noteLeft">备注：</div>
                          <div class="noteFlex">
                             <el-input v-model="input"></el-input>
                          </div>
                      </div>
                  </div>
                  <!-- 表格 -->
                  <div>
                    <el-table :data="enclosureData" stripe style="width: 100%">
                        <el-table-column  prop="name"  label="附件名称" width="200">
                        </el-table-column>
                        <el-table-column prop="list" label="附件列表(点击查看)">
                        </el-table-column>
                        <el-table-column fixed="right" label="管理" width="100">
                        <template slot-scope="scope">
                            <i class="el-icon-setting"  style="cursor: pointer;" ></i>
                        </template>
                        </el-table-column>
                    </el-table>
                  </div>
                </div>
             </div>
          </el-collapse-item>
        </el-collapse>
      </div>
    </div>
    <!-- 查看中的查看投标信息已通过弹框 -->
    <div class="mask2"  v-show="passShow"></div>
    <div class="new_pro new_pro1" v-show="passShow">
      <div class="new_head">
          <div style="padding-left:10px;">投标信息</div>
          <div @click="closePassShow()" style="font-size:28px;padding-right:10px;cursor:pointer;">×</div>
      </div>
      <div class="new_main">
        <el-collapse v-model="activeName" accordion>
          <!-- 第一步 -->
          <el-collapse-item title="招标项目信息" name="1">
             <div class="new_m_b">
                <div class="new_m_b2">
                    <!--分包名称及入场编号 -->
                    <div class="noteBox">
                        <div class="noteContent">
                            <div class="noteLeft">分包名称：</div>
                            <div class="noteFlex">
                                <span>131</span>
                            </div>
                            <div style="display: inline-flex;margin-left:30px;width:50%;">
                                <span style="width:130px;">入场项目分包编号:</span>
                                <span>部门</span>
                            </div>
                        </div>
                    </div>
                    <!--采购人和招标方式  -->
                    <div class="noteBox">
                        <div class="noteContent">
                            <div class="noteLeft">招标方式：</div>
                            <div class="noteFlex">
                                <span>131</span>
                            </div>
                            <div style="display: inline-flex;margin-left:30px;width:50%;">
                                <span style="width:130px;">招标(采购)人:</span>
                                <span>部门</span>
                            </div>
                        </div>
                    </div>
                    <!-- 项目负责人及总价 -->
                    <div class="noteBox">
                        <div class="noteContent">
                            <div class="noteLeft">项目负责人：</div>
                            <div class="noteFlex">
                              <span>131</span>
                            </div>
                            <div style="display: inline-flex;margin-left:30px;width:50%;">
                              <span style="width:130px;">预算总价:</span>
                              <span>部门</span>
                            </div>
                        </div>
                    </div>
                    <!--截止时间及要求  -->
                    <div class="noteBox">
                        <div class="noteContent">
                            <div class="noteLeft">报名截止时间：</div>
                            <div class="noteFlex">
                              <span>131</span>
                            </div>
                            <div style="display: inline-flex;margin-left:30px;width:50%;">
                              <span style="width:130px;">企业资质要求:</span>
                              <span>部门</span>
                            </div>
                        </div>
                    </div>
                    <!--项目负责人资质要求  -->
                    <div class="noteBox">
                        <div class="noteContent">
                            <div class="noteLeft">项目负责人资质要求：</div>
                            <div class="noteFlex">
                                <span>测试</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
          </el-collapse-item>
          <!-- 第二步 -->
          <el-collapse-item title="投标(供应商)人信息" name="2">
             <div class="new_m_b">
                <div class="new_m_b2">
                  <!-- 企业名称和资质 -->
                  <div class="noteBox">
                      <div class="noteContent">
                          <div class="noteLeft">企业名称：</div>
                          <div class="noteFlex">
                              <span>131</span>
                          </div>
                          <div style="display: inline-flex;margin-left:30px;width:50%;">
                              <span style="width:100px;">企业资质:</span>
                              <span>部门</span>
                          </div>
                      </div>
                  </div>
                  <!--组织机构代码及编号  -->
                  <div class="noteBox">
                      <div class="noteContent">
                          <div class="noteLeft">企业组织机构代码：</div>
                          <div class="noteFlex">
                              <span>131</span>
                          </div>
                          <div style="display: inline-flex;margin-left:30px;width:50%;">
                              <span style="width:100px;">企业资质编号:</span>
                              <span>部门</span>
                          </div>
                      </div>
                  </div>
                  <!--项目负责人及专业  -->
                  <div class="noteBox">
                      <div class="noteContent">
                          <div class="noteLeft">项目负责人：</div>
                          <div class="noteFlex">
                              <span>131</span>
                          </div>
                          <div style="display: inline-flex;margin-left:30px;width:50%;">
                              <span style="width:100px;">项目负责人专业:</span>
                              <span>部门</span>
                          </div>
                      </div>
                  </div>
                  <!-- 企业负责人及联系人 -->
                  <div class="noteBox">
                      <div class="noteContent">
                          <div class="noteLeft">企业负责人：</div>
                          <div class="noteFlex">
                              <span>131</span>
                          </div>
                          <div style="display: inline-flex;margin-left:30px;width:50%;">
                              <span style="width:100px;">投标联系人:</span>
                              <span>部门</span>
                          </div>
                      </div>
                  </div>
                  <!--电话及手机  -->
                  <div class="noteBox">
                      <div class="noteContent">
                          <div class="noteLeft">公司电话：</div>
                          <div class="noteFlex">
                              <span>131</span>
                          </div>
                          <div style="display: inline-flex;margin-left:30px;width:50%;">
                              <span style="width:100px;">联系人手机:</span>
                              <span>部门</span>
                          </div>
                      </div>
                  </div>
                  <!--传真及email  -->
                  <div class="noteBox">
                      <div class="noteContent">
                          <div class="noteLeft">传真：</div>
                          <div class="noteFlex">
                              <span>131</span>
                          </div>
                          <div style="display: inline-flex;margin-left:30px;width:50%;">
                              <span style="width:100px;">Email:</span>
                              <span>部门</span>
                          </div>
                      </div>
                  </div>
                  <!--是否联合体报名  -->
                  <div class="noteBox">
                      <div class="noteContent">
                          <div class="noteLeft">是否联合体报名：</div>
                          <div class="noteFlex">
                              <span>测试</span>
                          </div>
                      </div>
                  </div>
                </div>
             </div>
          </el-collapse-item>
          <!-- 第三步 -->
          <el-collapse-item title="报名其他材料" name="3">
            <div>
              <el-table :data="enclosureData" stripe style="width: 100%">
                  <el-table-column  prop="name"  label="附件名称" width="200">
                  </el-table-column>
                  <el-table-column prop="list" label="附件列表(点击查看)">
                  </el-table-column>
                  <el-table-column fixed="right" label="管理" width="100">
                  <template slot-scope="scope">
                      <i class="el-icon-setting"  style="cursor: pointer;" ></i>
                  </template>
                  </el-table-column>
              </el-table>
            </div>
          </el-collapse-item>
          <!-- 第四步 -->
          <el-collapse-item title="投标保证金缴纳记录" name="4">
             <div class="new_m_b">
                <div class="new_m_b2">
                  <!--缴纳时间  -->
                  <div class="noteBox">
                      <div class="noteContent">
                          <div class="noteLeft">缴纳时间：</div>
                          <div class="noteFlex">
                             <span></span>
                          </div>
                      </div>
                  </div>
                  <!-- 缴纳金额 -->
                  <div class="noteBox">
                      <div class="noteContent">
                          <div class="noteLeft">缴纳金额(元)：</div>
                          <div class="noteFlex">
                             <span></span>
                          </div>
                      </div>
                  </div>
                  <!--备注  -->
                  <div class="noteBox">
                      <div class="noteContent">
                          <div class="noteLeft">备注：</div>
                          <div class="noteFlex">
                             <span></span>
                          </div>
                      </div>
                  </div>
                  <!-- 表格 -->
                  <div>
                    <el-table :data="enclosureData" stripe style="width: 100%">
                        <el-table-column  prop="name"  label="附件名称" width="200">
                        </el-table-column>
                        <el-table-column prop="list" label="附件列表(点击查看)">
                        </el-table-column>
                        <el-table-column fixed="right" label="管理" width="100">
                        <template slot-scope="scope">
                            <i class="el-icon-setting"  style="cursor: pointer;" ></i>
                        </template>
                        </el-table-column>
                    </el-table>
                  </div>
                </div>
             </div>
          </el-collapse-item>
        </el-collapse>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components:{},
  props:{},
  data(){
    return {
      totalId:"",//搜索编号
      nameProject:"",//搜索分包名称
      totalProjectId:"",//入场项目编号
      nameOfTenderProject:"",//招标项目名称
      biddingProjectNumber:"",//招标项目编号
      nameOfPurchaser:"",//招标采购人
      biddingProcurementMode:"",//招标采购方式
      state:"",//状态
      radio: "1", //头部单选框
      input: "", //头部输入框
      activeName: '1',//弹框折叠效果
      PageNum:1,//当前页
      PageSize: 20, //每页条数
      pageTotal: 0, //总页数
      totalSize: 0, //总条数
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
      enclosureData:[],
      show:false,//查看弹框
      modifyShow:false,//修改弹框
      passShow:false,//查看中的查看已通过弹框
      value1:'',//修改弹框时间
    }
  },
  watch:{},
  computed:{},
  methods:{
     //编号问题
    typeIndex(index) {
      return index + (this.PageNum - 1) * 20 + 1;
    },
    //分页
    page(val) {
      this.PageNum = val;
    },
    //查看弹框
    look(){
      this.show = !this.show;
    },
    closeInvitaShow(){
      this.show = !this.show;
    },
    //修改弹框
    modify(){
      this.modifyShow = !this.modifyShow;
    },
    closeModifyShow(){
      this.modifyShow = !this.modifyShow;
    },
    //查看中的查看弹框
    lookDetail(){
      this.passShow = !this.passShow;
    },
    closePassShow(){
      this.passShow = !this.passShow;
    }
  },
  created(){},
  mounted(){}
}
</script>
<style scoped>
.myDiv {
  width: 100%;
  height: 100%;
}
.head_box {
  width: 100%;
  height: 35px;
  line-height: 35px;
  display: flex;
  justify-content: flex-end;
  background: #ffffff;
  padding: 0 3px;
}
.el-radio{
  line-height: 2.5 !important;
}
.head_l {
  padding: 2px 6px;
  background-color: #0095d5;
  color: #ffffff;
  cursor: pointer;
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
.mask,.mask1,.mask2{
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
.mask1,.mask2{
  z-index: 4;
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
.new_pro1{
  z-index: 5;
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
  margin-top: 10px;
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
</style>