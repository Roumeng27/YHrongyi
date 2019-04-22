<template>
  <div class="myDiv">
      <!-- 头部 -->
      <div>
        <div class="head_box">
          <div class="head_l" @click="newManage()">新建项目</div>
          <div>
            <el-radio-group v-model="radio" @change="changeRadio">
              <el-radio label="">全部</el-radio>
              <el-radio label="编辑中">编辑中</el-radio>
              <el-radio label="待办理">待办理</el-radio>
              <el-radio label="办理通过">办理通过</el-radio>
              <el-radio label="办理未通过">办理未通过</el-radio>
            </el-radio-group>
          </div>    
        </div>
        <div class="head_bottom">
          <span class="head_b_b">招标项目(分包)名称：<el-input v-model="nameOfTender" @keyup.enter.native="searchList()" placeholder="请输入内容"></el-input></span>
          <span class="head_b_b">入场项目(分包)编号：<el-input v-model="totalProjectId" @keyup.enter.native="searchList()" placeholder="请输入内容"></el-input></span>
          <span><button class="btn" @click="searchList()">搜索</button></span>
        </div>
      </div>
      <!-- 主体 -->
      <div class="table_content">
        <div class="main_box">
            <el-table :data="tableData" stripe style="width: 100%">
              <el-table-column type="index" width="70" label="编号" :index="typeIndex">
              </el-table-column>
              <el-table-column prop="totalProjectId" label="入场项目编号" width="180">
              </el-table-column>
              <el-table-column prop="nameOfTenderProject" label="招标项目名称" width="180">
              </el-table-column>
              <el-table-column prop="biddingProjectNumber" label="招标项目编号">
              </el-table-column>
              <el-table-column prop="nameOfPurchaser" label="招标(采购)人">
              </el-table-column>
              <el-table-column prop="biddingProcurementMode" label="招标采购方式">
              </el-table-column>
              <el-table-column prop="state" label="状态">
              </el-table-column>
              <el-table-column prop="operation" label="操作">
                <template slot-scope="scope">
                  <el-button type="text" size="small" @click="lookUp(scope.row.projectInformaPrimaryKeyId,scope.row.state)">查看</el-button>
                </template>
              </el-table-column>
          </el-table>
        </div>
        <div class="pagination">
           <template>
              <Page :total="totalSize" :current="currentPage" :page-size='10' show-elevator show-total @on-change="page"></Page>
            </template>
        </div>
      </div>
      <!-- 新建项目弹框上一步 -->
      <div class="mask"  v-show="show"></div>
      <div class="new_pro" v-show="show">
        <div class="new_head_box">
          <div class="new_head">
              <div style="padding-left:10px;">新建项目入场登记</div>
              <div @click="close()" style="font-size:28px;padding-right:10px;cursor:pointer;">×</div>
          </div>
          <div class="new_nav">
              <button class="nav_co nav_save" @click="saveData()">保存</button>
              <button class="nav_co nav_next" @click="nextTo()">下一步</button>
          </div>
        </div>
          <!-- 上一步弹框主体内容 -->
          <div class="new_main">
            <el-collapse v-model="activeName" accordion>
              <!-- 第一步 -->
              <el-collapse-item title="立项基本信息" name="1">
                  <div  class="new_m_one">
                    <div class="new_m_b">
                      <div class="new_m_b2">
                          <!-- 名称 -->
                          <div class="noteBox">
                            <div class="noteContent">
                              <div class="noteLeft"><span style="color:#f00;">*</span>批复项目名称：</div>
                              <div class="noteFlex">
                                <el-input v-model="approvalProjectName" class="input"></el-input>
                              </div>
                            </div>
                          </div>
                          <!-- 说明 -->
                          <!-- <div class="noteBox" style="margin-left:11%;">
                            <div class="noteContent">
                              <div class="noteLeft"><el-button @click="chooseList()">挑选项目</el-button></div>
                              <div class="noteFlex" style="margin-left:10px;">
                                <span  style="color:#f00;">说明：此处为挑选立项信息项目;否则,请勿点击</span>
                              </div>
                            </div>
                          </div> -->
                          <!-- 批复文号 -->
                          <div class="noteBox">
                            <div class="noteContent">
                              <div class="noteLeft"><span style="color:#f00;">*</span>批复文号：</div>
                              <div class="noteFlex">
                                <el-input v-model="approvalNumber"></el-input>
                              </div>
                              <div style="display: inline-flex;margin-left:30px;">
                                <span style="width:140px;"><span style="color:#f00;">*</span>批复核准部门:</span>
                                <el-input v-model="approvalAndApprovalDepartment" style="width：100px;"></el-input>
                              </div>
                            </div>
                          </div>
                          <!-- 监督部门 -->
                          <div class="noteBox">
                            <div class="noteContent">
                              <div class="noteLeft"><span style="color:#f00;">*</span>监督部门：</div>
                              <div class="noteFlex">
                                <el-input v-model="supervisionDepartment"></el-input>
                              </div>
                              <div style="display: inline-flex;margin-left:30px;">
                                <span style="width:100px;"><span style="color:#f00;">*</span>核准部门:</span>
                                <el-input v-model="auditDepartment" style="width：100px;"></el-input>
                              </div>
                            </div>
                          </div>
                          <!-- 项目所在地 -->
                          <div class="noteBox">
                            <div class="noteContent">
                              <div class="noteLeft"><span style="color:#f00;">*</span>项目所在地：</div>
                              <div class="noteFlex">
                                <el-cascader :options="addressData" v-model="localName" @change="handleChange">
                                </el-cascader>
                              </div>
                              <div style="display: inline-flex;margin-left:30px;">
                                <span style="width:90px;"><span style="color:#f00;">*</span>审批权限:</span>
                                <el-select  v-model="approvalJurisdiction" clearable>
                                  <el-option v-for="item in approvalData" :key="item.value" :label="item.label" :value="item.value">
                                  </el-option>
                                </el-select>
                              </div>
                            </div>
                          </div>
                          <!-- 是否涉密 -->
                          <div class="noteBox">
                            <div class="noteContent">
                              <div class="noteLeft"><span style="color:#f00;">*</span>是否涉密：</div>
                              <div class="noteFlex">
                                <el-radio-group v-model="isItConfidential">
                                  <el-radio label="是">是</el-radio>
                                  <el-radio label="否">否</el-radio>
                                </el-radio-group>
                              </div>
                            </div>
                          </div>
                          <!-- 工程性质 -->
                          <div class="noteBox">
                            <div class="noteContent">
                              <div class="noteLeft"><span style="color:#f00;">*</span>工程性质：</div>
                              <div class="noteFlex">
                                <el-select  v-model="engineeringProperties" clearable  @change="gcxz()">
                                  <el-option v-for="item in dropData" :key="item.value" :label="item.label" :value="item.value">
                                  </el-option>
                                </el-select>
                              </div>
                              <div style="display: inline-flex;margin-left:30px;">
                                <span style="width:300px;"><span style="color:#f00;">*</span>是否为政府和社会资本合作PPP类项目:</span>
                                <span style="height:40px;line-height:40px;">
                                  <el-radio-group v-model="projectType">
                                    <el-radio  label="是">是</el-radio>
                                    <el-radio  label="否">否</el-radio>
                                  </el-radio-group>
                                </span>
                              </div>
                            </div>
                          </div>
                          <!-- 资金来源 -->
                          <div class="noteBox">
                            <div class="noteContent">
                              <div class="noteLeft"><span style="color:#f00;">*</span>资金来源：</div>
                              <div class="noteFlex">
                                <el-select  v-model="sourceOfFunds" clearable>
                                  <el-option v-for="item in SourcefundsData" :key="item.value" :label="item.label" :value="item.value">
                                  </el-option>
                                </el-select>
                              </div>
                              <div style="display: inline-flex;margin-left:30px;">
                                <span style="width:200px;"><span style="color:#f00;">*</span>项目资金总额(万元):</span>
                                <el-input v-model="totalProjectFunds" style="width：100px;"></el-input>
                              </div>
                            </div>
                          </div>
                          <!-- 资金构成 -->
                          <div style="display:flex;justify-content: space-between;width:100%;">
                              <div><span style="color:#f00;">*</span>资金构成：</div>  
                              <div style="display:flex;">
                                <span style="width:70px;line-height:30px;">国有资金：</span><el-input @blur="sumAccount()" v-model="stateOwnedFunds" style="width:110px  !important;"></el-input><span style="width:33px;line-height:30px;">万元</span>
                                <el-input v-model="stateOwnedFundsPercentage" style="width:110px  !important;"></el-input><span style="margin-right:40px;line-height:30px;">%</span>
                                <span style="width:70px;line-height:30px;">自有资金：</span><el-input @blur="ownMoney()" v-model="ownFunds" style="width:110px  !important;"></el-input><span style="width:33px;line-height:30px;">万元</span>
                                <el-input v-model="ownFundsPercentage" style="width:110px !important;"></el-input><span style="line-height:30px;">%</span>
                              </div>
                          </div>
                          <div style="display:flex;justify-content: flex-end;width:100%;margin-top:10px;">
                            <div style="display:flex;">
                                <span style="width:140px;line-height:30px;">外国政府及组织资金：</span><el-input @blur="foreignMoney()" v-model="foreignGovernmentsAndOrganizationalFunds" style="width:110px  !important;"></el-input><span style="width:33px;line-height:30px;">万元</span>
                                <el-input v-model="foreignGovernmentsAndOrganizationalFundsPercentage" style="width:110px  !important;"></el-input><span style="margin-right:40px;line-height:30px;">%</span>
                                <span style="width:100px;line-height:30px;">境外私人投资：</span><el-input @blur="abroadMoney()" v-model="overseasPrivateInvestment" style="width:110px  !important;"></el-input><span style="width:33px;line-height:30px;">万元</span>
                                <el-input v-model="overseasPrivateInvestmentPercentage" style="width:110px !important;"></el-input><span style="line-height:30px;">%</span>
                              </div>
                          </div>
                      </div>
                    </div>
                </div>
              </el-collapse-item>
                
              <!-- 第二步 -->
              <el-collapse-item title="项目基本信息" name="2">
                    <div class="new_m_two">
                    <div class="new_m_b">
                        <div class="new_m_b2">
                           <!-- 审批文件名称 -->
                            <div class="noteBox">
                              <div class="noteContent">
                                <div class="noteLeft"><span style="color:#f00;">*</span>项目审批文件名称：</div>
                                <div class="noteFlex">
                                  <el-input v-model="projectApprovalDocumentsName"></el-input>
                                </div>
                                <div style="display: inline-flex;margin-left:30px;">
                                  <span style="width:230px;"><span style="color:#f00;">*</span>北京投资项目统一代码:</span>
                                  <el-input v-model="investmentProjectsUnifiedCode" style="width：100px;"></el-input>
                                </div>
                              </div>
                            </div>
                            <!-- 项目法人 -->
                            <div class="noteBox">
                              <div class="noteContent">
                                <div class="noteLeft"><span style="color:#f00;">*</span>项目法人：</div>
                                <div class="noteFlex">
                                  <el-input v-model="projectLegalPerson"></el-input>
                                </div>
                                <div style="display: inline-flex;margin-left:30px;">
                                  <span style="width:230px;"><span style="color:#f00;">*</span>项目法人代码:</span>
                                  <el-input v-model="projectLegalPersonCode" style="width：100px;"></el-input>
                                </div>
                              </div>
                            </div>
                            <!-- 项目行业分类 -->
                            <div class="noteBox">
                              <div class="noteContent">
                                <div class="noteLeft"><span style="color:#f00;">*</span>项目行业分类：</div>
                                <div class="noteFlex">
                                  <el-select  v-model="projectIndustryClassification" clearable placeholder="请选择" >
                                    <el-option v-for="item in industryData" :key="item.value" :label="item.label" :value="item.value">
                                    </el-option>
                                  </el-select>
                                </div>
                              </div>
                            </div>
                            <!--项目规模  -->
                            <div class="noteBox">
                              <div class="noteContent">
                                <div class="noteLeft"><span style="color:#f00;">*</span>项目规模：</div>
                                <div class="noteFlex">
                                  <el-input v-model="projectScale"></el-input>
                                </div>
                                <div style="display: inline-flex;margin-left:30px;">
                                  <span style="width:150px;"><span style="color:#f00;">*</span>项目建立时间:</span>
                                  <el-date-picker value-format="timestamp" v-model="projectEstablishmentTime" type="datetime" placeholder="选择日期时间">
                                  </el-date-picker>
                                </div>
                              </div>
                            </div>
                            <!-- 联系人 -->
                            <div class="noteBox">
                              <div class="noteContent">
                                <div class="noteLeft"><span style="color:#f00;">*</span>联系人：</div>
                                <div class="noteFlex">
                                  <el-input v-model="contacts"></el-input>
                                </div>
                                <div style="display: inline-flex;margin-left:30px;">
                                  <span style="width:230px;"><span style="color:#f00;">*</span>联系方式:</span>
                                  <el-input v-model="contactInformation" style="width：100px;" @blur="blurPhone()"></el-input>
                                </div>
                              </div>
                            </div>
                        </div>
                    </div>
                  </div>
              </el-collapse-item>
              
              <!-- 第三步 -->
              <el-collapse-item title="项目预算信息" name="3">
                <div class="new_m_three">
                  <div class="new_m_b">
                      <div class="new_m_b2">
                        <!-- 项目名称 -->
                        <div class="noteBox">
                          <div class="noteContent">
                            <div class="noteLeft"><span style="color:#f00;">*</span>项目名称：</div>
                            <div class="noteFlex">
                              <el-input v-model="entryName"></el-input>
                            </div>
                          </div>
                        </div>
                        <!-- 预算项目 -->
                        <div class="noteBox">
                          <div class="noteContent">
                            <div class="noteLeft"><span style="color:#f00;">*</span>预算项目批准备案文号：</div>
                            <div class="noteFlex">
                              <el-input v-model="budgetProjectApprovalRecordNumber"></el-input>
                            </div>
                            <div style="display: inline-flex;margin-left:30px;">
                              <span style="width:160px;"><span style="color:#f00;">*</span>预算受文单位:</span>
                              <el-input v-model="budgetRecipientUnit" style="width：100px;"></el-input>
                            </div>
                          </div>
                        </div>
                        <!-- 预算受文单位代码 -->
                        <div class="noteBox">
                          <div class="noteContent">
                            <div class="noteLeft"><span style="color:#f00;">*</span>预算受文单位代码：</div>
                            <div class="noteFlex">
                              <el-input v-model="budgetRecipientUnitCode"></el-input>
                            </div>
                            <div style="display: inline-flex;margin-left:30px;">
                              <span style="width:130px;"><span style="color:#f00;">*</span>预算金额:</span>
                              <el-input v-model="budgetAmount" style="width：100px;"></el-input>
                            </div>
                          </div>
                        </div>
                        <!--采购人名称  -->
                        <div class="noteBox">
                          <div class="noteContent">
                            <div class="noteLeft"><span style="color:#f00;">*</span>采购人名称：</div>
                            <div class="noteFlex">
                              <el-input v-model="nameOfPurchaser"></el-input>
                            </div>
                            <div style="display: inline-flex;margin-left:30px;">
                              <span style="width:130px;"><span style="color:#f00;">*</span>采购人代码:</span>
                              <el-input v-model="purchaserCode" style="width：100px;"></el-input>
                            </div>
                          </div>
                        </div>
                      </div>
                  </div>
                </div>
              </el-collapse-item>
              
              <!-- 第四步 -->
              <el-collapse-item title="招标项目信息" name="4">
                  <div  class="new_m_one">
                    <div class="new_m_b">
                      <div class="new_m_b2">
                          <!-- 名称 -->
                          <div class="noteBox">
                            <div class="noteContent">
                              <div class="noteLeft"><span style="color:#f00;">*</span>招标项目名称：</div>
                              <div class="noteFlex">
                                <el-input v-model="nameOfTenderProject"></el-input>
                              </div>
                            </div>
                          </div>
                          <!-- 说明 -->
                          <!-- <div class="noteBox" style="margin-left:11%;">
                            <div class="noteContent">
                              <div class="noteLeft"><el-button>挑选项目</el-button></div>
                              <div class="noteFlex" style="margin-left:10px;">
                                <span  style="color:#f00;">说明：若当前项目是由于招标异常产生的，请点击挑选项目；否则，请勿点击</span>
                              </div>
                            </div>
                          </div> -->
                          <!-- 招标项目遍号 -->
                          <div class="noteBox">
                            <div class="noteContent">
                              <div class="noteLeft"><span style="color:#f00;">*</span>招标项目编号：</div>
                              <div class="noteFlex">
                                <el-input v-model="biddingProjectNumber"></el-input>
                              </div>
                              <div style="display: inline-flex;margin-left:30px;">
                                <span style="width:140px;"><span style="color:#f00;">*</span>招标项目金额:</span>
                                <el-input v-model="amountOfBiddingProject" style="width：100px;"></el-input>
                              </div>
                            </div>
                          </div>
                          <!-- 招标采购方式 -->
                          <div class="noteBox">
                            <div class="noteContent">
                              <div class="noteLeft"><span style="color:#f00;">*</span>招标采购方式：</div>
                              <div class="noteFlex">
                                <el-select  v-model="biddingProcurementMode" clearable>
                                  <el-option v-for="item in openTenderData" :key="item.value" :label="item.label" :value="item.value">
                                  </el-option>
                                </el-select>
                              </div>
                              <div style="display: inline-flex;margin-left:30px;">
                                <span style="width:100px;"><span style="color:#f00;">*</span>招标组织方式:</span>
                                <el-select  v-model="biddingOrganization" clearable placeholder="请选择" disabled="disabled">
                                  <el-option v-for="item in organizaData" :key="item.value" :label="item.label" :value="item.value">
                                  </el-option>
                                </el-select>
                              </div>
                            </div>
                          </div>
                          <!-- 招标项目类型 -->
                          <div class="noteBox">
                            <div class="noteContent">
                              <div class="noteLeft"><span style="color:#f00;">*</span>招标项目类型：</div>
                              <div class="noteFlex">
                              <el-select  v-model="typesOfBiddingProjects" clearable placeholder="请选择" >
                                  <el-option v-for="item in bidProjectData" :key="item.value" :label="item.label" :value="item.value">
                                  </el-option>
                              </el-select>
                              </div>
                              <div style="display: inline-flex;margin-left:30px;">
                                <span style="width:100px;"><span style="color:#f00;">*</span>专业类别:</span>
                                <el-select  v-model="professionalCategory" clearable placeholder="请选择" >
                                  <el-option v-for="item in academicDirectionData" :key="item.value" :label="item.label" :value="item.value">
                                  </el-option>
                                </el-select>
                              </div>
                            </div>
                          </div>
                          <!-- 是否公布预算 -->
                          <div class="noteBox">
                            <div class="noteContent">
                              <div class="noteLeft"><span style="color:#f00;">*</span>是否涉密：</div>
                              <div class="noteFlex">
                                <el-radio-group v-model="whetherAnnounceBudget">
                                  <el-radio label="是">是</el-radio>
                                  <el-radio label="否">否</el-radio>
                                </el-radio-group>
                              </div>
                              <div style="display: inline-flex;width:340px;">
                              <span><span style="color:#f00;">*</span>是否分包：</span>
                                <el-radio-group v-model="isSubcontracting" @change="fenbaoShow()">
                                  <el-radio label="是">是</el-radio>
                                  <el-radio label="否">否</el-radio>
                                </el-radio-group>
                              </div>
                            </div>
                          </div>
                          <!-- 点击是否分包为否的时候出现 -->
                          <div v-show="fbShow">
                            <!-- 资格审查方式 -->
                            <div class="noteBox">
                              <div class="noteContent">
                                <div class="noteLeft">资格审查方式：</div>
                                <div class="noteFlex">
                                  <el-select  v-model="qualificationExaminationMethod" clearable placeholder="请选择" >
                                    <el-option v-for="item in  titleExaminationData" :key="item.value" :label="item.label" :value="item.value">
                                    </el-option>
                                  </el-select>
                                </div>
                                <div style="display: inline-flex;width:340px;">
                                <span>电子化开评标：</span>
                                  <el-radio-group v-model="electronicBidEvaluation">
                                    <el-radio label="是">是</el-radio>
                                    <el-radio label="否">否</el-radio>
                                  </el-radio-group>
                                </div>
                              </div>
                            </div>
                            <!-- 招标内容 -->
                            <div class="noteBox">
                              <div class="noteContent">
                                <div class="noteLeft">招标内容：</div>
                                <div class="noteFlex">
                                  <el-input v-model="tenderContents"></el-input>
                                </div>
                                <!-- <div style="display: inline-flex;margin-left:10px;">
                                  <el-button>挑选</el-button>
                                </div> -->
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
      <!-- 新建项目弹框下一步 -->
      <div class="mask"  v-show="nextShow"></div>
      <div class="new_pro" v-show="nextShow">
        <div class="new_head_box">
          <div class="new_head">
              <div style="padding-left:10px;">新建项目入场登记</div>
              <div @click="closeNextShow()" style="font-size:28px;padding-right:10px;cursor:pointer;">×</div>
          </div>
          <div class="new_nav">
              <button class="nav_co nav_save" @click="submitFile()">提交</button>
              <button class="nav_co nav_next" @click="backTo()">上一步</button>
          </div>
        </div>
          <!-- 下一步弹框主体内容 -->
          <div class="new_main">
            <el-collapse v-model="activeName" accordion>
              <!-- 第一步 -->
              <el-collapse-item title="立项基本信息" name="1">
                <div class="new_m_b">
                    <div class="new_m_b2">
                      <div class="noteBox">
                        <div class="noteContent">
                          <div class="noteLeft">批复项目名称：</div>
                          <div class="noteFlex">
                            <span>{{approvalProjectName}}</span>
                          </div>
                        </div>
                      </div>
                      <!-- 批复文号 -->
                      <div class="noteBox">
                        <div class="noteContent">
                          <div class="noteLeft">批复文号：</div>
                          <div class="noteFlex">
                            <span>{{approvalNumber}}</span>
                          </div>
                          <div style="display: inline-flex;margin-left:30px;width:50%;">
                            <span style="width:100px;">批复核准部门:</span>
                            <span>{{approvalAndApprovalDepartment}}</span>
                          </div>
                        </div>
                      </div>
                      <!-- 监督部门 -->
                      <div class="noteBox">
                        <div class="noteContent">
                          <div class="noteLeft">监督部门：</div>
                          <div class="noteFlex">
                            <span>{{supervisionDepartment}}</span>
                          </div>
                          <div style="display: inline-flex;margin-left:30px;width:50%;">
                            <span style="width:80px;">核准部门:</span>
                            <span>{{auditDepartment}}</span>
                          </div>
                        </div>
                      </div>
                      <!-- 项目所在地 -->
                      <div class="noteBox">
                        <div class="noteContent">
                          <div class="noteLeft">项目所在地：</div>
                          <div class="noteFlex">
                            <span>{{projectLocation}}</span>
                          </div>
                          <div style="display: inline-flex;margin-left:30px;width:50%;">
                            <span style="width:80px;">审批权限:</span>
                            <span>{{approvalJurisdiction}}</span>
                          </div>
                        </div>
                      </div>
                      <!-- 是否涉密 -->
                      <div class="noteBox">
                        <div class="noteContent">
                          <div class="noteLeft">是否涉密：</div>
                          <div class="noteFlex">
                            <span>{{isItConfidential}}</span>
                          </div>
                        </div>
                      </div>
                      <!-- 工程性质 -->
                      <div class="noteBox">
                        <div class="noteContent">
                          <div class="noteLeft">工程性质：</div>
                          <div class="noteFlex">
                            <span>{{engineeringProperties}}</span>
                          </div>
                          <div style="display: inline-flex;margin-left:30px;width:50%;">
                            <span style="width:240px;">是否为政府和社会资本合作PPP类项目:</span>
                            <span style="height:40px;line-height:40px;">
                                <span>{{projectType}}</span>
                            </span>
                          </div>
                        </div>
                      </div>
                      <!-- 资金来源 -->
                      <div class="noteBox">
                        <div class="noteContent">
                          <div class="noteLeft">资金来源：</div>
                          <div class="noteFlex">
                            <span>{{sourceOfFunds}}</span>
                          </div>
                          <div style="display: inline-flex;margin-left:30px;width:50%;">
                            <span style="width:100px;">项目资金总额:</span>
                            <span>{{totalProjectFunds}}</span>
                          </div>
                        </div>
                      </div>
                      <!-- 资金构成 -->
                      <div style="display:flex;justify-content: flex-start;width:100%;">
                          <div>资金构成：</div>  
                          <div style="display:flex;">
                            <span style="width:70px;line-height:30px;">国有资金：</span><span style="line-height:30px;">{{stateOwnedFunds}}</span><span style="width:33px;line-height:30px;">万元</span>
                            <span style="line-height:30px;">{{stateOwnedFundsPercentage}}</span><span style="margin-right:40px;line-height:30px;">%</span>
                            <span style="width:70px;line-height:30px;">自有资金：</span><span style="line-height:30px;">{{ownFunds}}</span><span style="width:33px;line-height:30px;">万元</span>
                            <span style="line-height:30px;">{{ownFundsPercentage}}</span><span style="line-height:30px;">%</span>
                          </div>
                      </div>
                      <div style="display:flex;justify-content: flex-start;width:100%;margin-top:10px;margin-left:65px;">
                        <div style="display:flex;">
                            <span style="width:140px;line-height:30px;">外国政府及组织资金：</span><span style="line-height:30px;">{{foreignGovernmentsAndOrganizationalFunds}}</span><span style="width:33px;line-height:30px;">万元</span>
                            <span style="line-height:30px;">{{foreignGovernmentsAndOrganizationalFundsPercentage}}</span><span style="margin-right:40px;line-height:30px;">%</span>
                            <span style="width:100px;line-height:30px;">境外私人投资：</span><span style="line-height:30px;">{{overseasPrivateInvestment}}</span><span style="width:33px;line-height:30px;">万元</span>
                            <span style="line-height:30px;">{{overseasPrivateInvestmentPercentage}}</span><span style="line-height:30px;">%</span>
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
                        <el-table-column prop="appendixName" label="附件名称" width="150">
                        </el-table-column>
                        <el-table-column label="附件列表(点击查看)">
                          <template slot-scope="scope">
                            <li v-for='item in scope.row.attachlist' @click="downLoadupFile(item)" class="temLi">
                              {{item.fileName}}
                            </li>
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
              <!-- 第三步 -->
              <el-collapse-item title="项目基本信息" name="3">
                <div class="new_m_b">
                    <div class="new_m_b2">
                      <!-- 审批文件名称 -->
                      <div class="noteBox">
                        <div class="noteContent">
                          <div class="noteLeft">项目审批文件名称：</div>
                          <div class="noteFlex">
                            <span>{{projectApprovalDocumentsName}}</span>
                          </div>
                          <div style="display: inline-flex;margin-left:30px;width:50%;">
                            <span style="width:150px;">北京投资项目统一代码:</span>
                            <span>{{investmentProjectsUnifiedCode}}</span>
                          </div>
                        </div>
                      </div>
                      <!-- 项目法人 -->
                      <div class="noteBox">
                        <div class="noteContent">
                          <div class="noteLeft">项目法人：</div>
                          <div class="noteFlex">
                            <span>{{projectLegalPerson}}</span>
                          </div>
                          <div style="display: inline-flex;margin-left:30px;width:50%;">
                            <span style="width:100px;">项目法人代码:</span>
                            <span>{{projectLegalPersonCode}}</span>
                          </div>
                        </div>
                      </div>
                      <!-- 项目行业分类 -->
                      <div class="noteBox">
                        <div class="noteContent">
                          <div class="noteLeft">项目行业分类：</div>
                          <div class="noteFlex">
                            <span>{{projectIndustryClassification}}</span>
                          </div>
                        </div>
                      </div>
                      <!--项目规模  -->
                      <div class="noteBox">
                        <div class="noteContent">
                          <div class="noteLeft">项目规模：</div>
                          <div class="noteFlex">
                            <span>{{projectScale}}</span>
                          </div>
                          <div style="display: inline-flex;margin-left:30px;width:50%;">
                            <span style="width:100px;">项目建立时间:</span>
                            <span>{{projectEstablishmentTime}}</span>
                          </div>
                        </div>
                      </div>
                      <!-- 联系人 -->
                      <div class="noteBox">
                        <div class="noteContent">
                          <div class="noteLeft">联系人：</div>
                          <div class="noteFlex">
                            <span>{{contacts}}</span>
                          </div>
                          <div style="display: inline-flex;margin-left:30px;width:50%;">
                            <span style="width:90px;">联系方式:</span>
                            <span>{{contactInformation}}</span>
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
                            <span>{{entryName}}</span>
                          </div>
                        </div>
                      </div>
                      <!-- 预算项目 -->
                      <div class="noteBox">
                        <div class="noteContent">
                          <div class="noteLeft">预算项目批准备案文号：</div>
                          <div class="noteFlex">
                            <span>{{budgetProjectApprovalRecordNumber}}</span>
                          </div>
                          <div style="display: inline-flex;margin-left:30px;width:50%;">
                            <span style="width:100px;">预算受文单位:</span>
                            <span>{{budgetRecipientUnit}}</span>
                          </div>
                        </div>
                      </div>
                      <!-- 预算受文单位代码 -->
                      <div class="noteBox">
                        <div class="noteContent">
                          <div class="noteLeft">预算受文单位代码：</div>
                          <div class="noteFlex">
                            <span>{{budgetRecipientUnitCode}}</span>
                          </div>
                          <div style="display: inline-flex;margin-left:30px;width:50%;">
                            <span style="width:130px;">预算金额(万元):</span>
                            <span>{{budgetAmount}}</span>
                          </div>
                        </div>
                      </div>
                      <!--采购人名称  -->
                      <div class="noteBox">
                        <div class="noteContent">
                          <div class="noteLeft">采购人名称：</div>
                          <div class="noteFlex">
                            <span>{{nameOfPurchaser}}</span>
                          </div>
                          <div style="display: inline-flex;margin-left:30px;width:50%;">
                            <span style="width:90px;">采购人代码:</span>
                            <span>{{purchaserCode}}</span>
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
                            <span>{{totalProjectId}}</span>
                          </div>
                        </div>
                      </div>
                      <!-- 招标项目名称 -->
                      <div class="noteBox">
                        <div class="noteContent">
                          <div class="noteLeft">招标项目名称：</div>
                          <div class="noteFlex">
                            <span>{{nameOfTenderProject}}</span>
                          </div>
                        </div>
                      </div>
                      <!-- 招标项目遍号 -->
                      <div class="noteBox">
                        <div class="noteContent">
                          <div class="noteLeft">招标项目编号：</div>
                          <div class="noteFlex">
                            <span>{{biddingProjectNumber}}</span>
                          </div>
                          <div style="display: inline-flex;margin-left:30px;width:50%;">
                            <span style="width:100px;">招标项目金额:</span>
                            <span>{{amountOfBiddingProject}}</span>
                          </div>
                        </div>
                      </div>
                      <!-- 招标采购方式 -->
                      <div class="noteBox">
                        <div class="noteContent">
                          <div class="noteLeft">招标采购方式：</div>
                          <div class="noteFlex">
                            <span>{{biddingProcurementMode}}</span>
                          </div>
                          <div style="display: inline-flex;margin-left:30px;width:50%;">
                            <span style="width:100px;">招标组织方式:</span>
                            <span>{{biddingOrganization}}</span>
                          </div>
                        </div>
                      </div>
                      <!-- 招标项目类型 -->
                      <div class="noteBox">
                        <div class="noteContent">
                          <div class="noteLeft">招标项目类型：</div>
                          <div class="noteFlex">
                            <span>{{typesOfBiddingProjects}}</span>
                          </div>
                          <div style="display: inline-flex;margin-left:30px;width:50%;">
                            <span style="width:80px;">专业类别:</span>
                            <span>{{professionalCategory}}</span>
                          </div>
                        </div>
                      </div>
                      <!-- 是否公布预算 -->
                      <div class="noteBox">
                        <div class="noteContent">
                          <div class="noteLeft">是否公布预算：</div>
                          <div class="noteFlex">
                            <span>{{whetherAnnounceBudget}}</span>
                          </div>
                          <div style="display: inline-flex;width:340px;width:50%;">
                          <span>是否分包：</span>
                          <span>{{isSubcontracting}}</span>
                          </div>
                        </div>
                      </div>
                      <!-- 点击是否分包为否的时候出现 -->
                      <div v-show="fbShow">
                        <!-- 资格审查方式 -->
                        <div class="noteBox">
                          <div class="noteContent">
                            <div class="noteLeft">资格审查方式：</div>
                            <div class="noteFlex">
                              <span>{{qualificationExaminationMethod}}</span>
                            </div>
                            <div style="display: inline-flex;width:340px;width:50%;">
                              <span>电子化开评标：</span>
                              <span>{{electronicBidEvaluation}}</span>
                            </div>
                          </div>
                        </div>
                        <!-- 招标内容 -->
                        <div class="noteBox">
                          <div class="noteContent">
                            <div class="noteLeft">招标内容：</div>
                            <div class="noteFlex">
                              <span>{{tenderContents}}</span>
                            </div>
                            <!-- <div style="display: inline-flex;margin-left:10px;">
                              <el-button>挑选</el-button>
                            </div> -->
                          </div>
                        </div>
                      </div>
                    </div>
                </div>
              </el-collapse-item>
              <!-- 第六步 -->
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
      <!-- 查看办理通过 -->
      <div class="mask"  v-show="passShow"></div>
      <div class="new_pro" v-show="passShow">
        <div class="new_head_box">
          <div class="new_head">
              <div style="padding-left:10px;">新建项目入场登记</div>
              <div @click="closePassShow()" style="font-size:28px;padding-right:10px;cursor:pointer;">×</div>
          </div>
        </div>
          <!-- 下一步弹框主体内容 -->
          <div class="new_main  pass_pro">
            <el-collapse v-model="activeName" accordion>
              <!-- 第一步 -->
              <el-collapse-item title="立项基本信息" name="1">
                <div class="new_m_b">
                    <div class="new_m_b2">
                      <div class="noteBox">
                        <div class="noteContent">
                          <div class="noteLeft">批复项目名称：</div>
                          <div class="noteFlex">
                            <span>{{approvalProjectName}}</span>
                          </div>
                        </div>
                      </div>
                      <!-- 批复文号 -->
                      <div class="noteBox">
                        <div class="noteContent">
                          <div class="noteLeft">批复文号：</div>
                          <div class="noteFlex">
                            <span>{{approvalNumber}}</span>
                          </div>
                          <div style="display: inline-flex;margin-left:30px;width:50%;">
                            <span style="width:100px;">批复核准部门:</span>
                            <span>{{approvalAndApprovalDepartment}}</span>
                          </div>
                        </div>
                      </div>
                      <!-- 监督部门 -->
                      <div class="noteBox">
                        <div class="noteContent">
                          <div class="noteLeft">监督部门：</div>
                          <div class="noteFlex">
                            <span>{{supervisionDepartment}}</span>
                          </div>
                          <div style="display: inline-flex;margin-left:30px;width:50%;">
                            <span style="width:80px;">核准部门:</span>
                            <span>{{auditDepartment}}</span>
                          </div>
                        </div>
                      </div>
                      <!-- 项目所在地 -->
                      <div class="noteBox">
                        <div class="noteContent">
                          <div class="noteLeft">项目所在地：</div>
                          <div class="noteFlex">
                            <span>{{projectLocation}}</span>
                          </div>
                          <div style="display: inline-flex;margin-left:30px;width:50%;">
                            <span style="width:80px;">审批权限:</span>
                            <span>{{approvalJurisdiction}}</span>
                          </div>
                        </div>
                      </div>
                      <!-- 是否涉密 -->
                      <div class="noteBox">
                        <div class="noteContent">
                          <div class="noteLeft">是否涉密：</div>
                          <div class="noteFlex">
                            <span>{{isItConfidential}}</span>
                          </div>
                        </div>
                      </div>
                      <!-- 工程性质 -->
                      <div class="noteBox">
                        <div class="noteContent">
                          <div class="noteLeft">工程性质：</div>
                          <div class="noteFlex">
                            <span>{{engineeringProperties}}</span>
                          </div>
                          <div style="display: inline-flex;margin-left:30px;width:50%;">
                            <span style="width:240px;">是否为政府和社会资本合作PPP类项目:</span>
                            <span style="height:40px;line-height:40px;">
                                <span>{{projectType}}</span>
                            </span>
                          </div>
                        </div>
                      </div>
                      <!-- 资金来源 -->
                      <div class="noteBox">
                        <div class="noteContent">
                          <div class="noteLeft">资金来源：</div>
                          <div class="noteFlex">
                            <span>{{sourceOfFunds}}</span>
                          </div>
                          <div style="display: inline-flex;margin-left:30px;width:50%;">
                            <span style="width:100px;">项目资金总额:</span>
                            <span>{{totalProjectFunds}}</span>
                          </div>
                        </div>
                      </div>
                      <!-- 资金构成 -->
                      <div style="display:flex;justify-content: flex-start;width:100%;">
                          <div>资金构成：</div>  
                          <div style="display:flex;">
                            <span style="width:70px;line-height:30px;">国有资金：</span><span style="line-height:30px;">{{stateOwnedFunds}}</span><span style="width:33px;line-height:30px;">万元</span>
                            <span style="line-height:30px;">{{stateOwnedFundsPercentage}}</span><span style="margin-right:40px;line-height:30px;">%</span>
                            <span style="width:70px;line-height:30px;">自有资金：</span><span style="line-height:30px;">{{ownFunds}}</span><span style="width:33px;line-height:30px;">万元</span>
                            <span style="line-height:30px;">{{ownFundsPercentage}}</span><span style="line-height:30px;">%</span>
                          </div>
                      </div>
                      <div style="display:flex;justify-content: flex-start;width:100%;margin-top:10px;margin-left:65px;">
                        <div style="display:flex;">
                            <span style="width:140px;line-height:30px;">外国政府及组织资金：</span><span style="line-height:30px;">{{foreignGovernmentsAndOrganizationalFunds}}</span><span style="width:33px;line-height:30px;">万元</span>
                            <span style="line-height:30px;">{{foreignGovernmentsAndOrganizationalFundsPercentage}}</span><span style="margin-right:40px;line-height:30px;">%</span>
                            <span style="width:100px;line-height:30px;">境外私人投资：</span><span style="line-height:30px;">{{overseasPrivateInvestment}}</span><span style="width:33px;line-height:30px;">万元</span>
                            <span style="line-height:30px;">{{overseasPrivateInvestmentPercentage}}</span><span style="line-height:30px;">%</span>
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
                        <el-table-column prop="appendixName" label="附件名称" width="150">
                        </el-table-column>
                        <el-table-column prop="attachlist" label="附件列表(点击查看)">
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
                            <span>{{projectApprovalDocumentsName}}</span>
                          </div>
                          <div style="display: inline-flex;margin-left:30px;width:50%;">
                            <span style="width:150px;">北京投资项目统一代码:</span>
                            <span>{{investmentProjectsUnifiedCode}}</span>
                          </div>
                        </div>
                      </div>
                      <!-- 项目法人 -->
                      <div class="noteBox">
                        <div class="noteContent">
                          <div class="noteLeft">项目法人：</div>
                          <div class="noteFlex">
                            <span>{{projectLegalPerson}}</span>
                          </div>
                          <div style="display: inline-flex;margin-left:30px;width:50%;">
                            <span style="width:100px;">项目法人代码:</span>
                            <span>{{projectLegalPersonCode}}</span>
                          </div>
                        </div>
                      </div>
                      <!-- 项目行业分类 -->
                      <div class="noteBox">
                        <div class="noteContent">
                          <div class="noteLeft">项目行业分类：</div>
                          <div class="noteFlex">
                            <span>{{projectIndustryClassification}}</span>
                          </div>
                        </div>
                      </div>
                      <!--项目规模  -->
                      <div class="noteBox">
                        <div class="noteContent">
                          <div class="noteLeft">项目规模：</div>
                          <div class="noteFlex">
                            <span>{{projectScale}}</span>
                          </div>
                          <div style="display: inline-flex;margin-left:30px;width:50%;">
                            <span style="width:100px;">项目建立时间:</span>
                            <span>{{projectEstablishmentTime}}</span>
                          </div>
                        </div>
                      </div>
                      <!-- 联系人 -->
                      <div class="noteBox">
                        <div class="noteContent">
                          <div class="noteLeft">联系人：</div>
                          <div class="noteFlex">
                            <span>{{contacts}}</span>
                          </div>
                          <div style="display: inline-flex;margin-left:30px;width:50%;">
                            <span style="width:90px;">联系方式:</span>
                            <span>{{contactInformation}}</span>
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
                            <span>{{entryName}}</span>
                          </div>
                        </div>
                      </div>
                      <!-- 预算项目 -->
                      <div class="noteBox">
                        <div class="noteContent">
                          <div class="noteLeft">预算项目批准备案文号：</div>
                          <div class="noteFlex">
                            <span>{{budgetProjectApprovalRecordNumber}}</span>
                          </div>
                          <div style="display: inline-flex;margin-left:30px;width:50%;">
                            <span style="width:100px;">预算受文单位:</span>
                            <span>{{budgetRecipientUnit}}</span>
                          </div>
                        </div>
                      </div>
                      <!-- 预算受文单位代码 -->
                      <div class="noteBox">
                        <div class="noteContent">
                          <div class="noteLeft">预算受文单位代码：</div>
                          <div class="noteFlex">
                            <span>{{budgetRecipientUnitCode}}</span>
                          </div>
                          <div style="display: inline-flex;margin-left:30px;width:50%;">
                            <span style="width:130px;">预算金额(万元):</span>
                            <span>{{budgetAmount}}</span>
                          </div>
                        </div>
                      </div>
                      <!--采购人名称  -->
                      <div class="noteBox">
                        <div class="noteContent">
                          <div class="noteLeft">采购人名称：</div>
                          <div class="noteFlex">
                            <span>{{nameOfPurchaser}}</span>
                          </div>
                          <div style="display: inline-flex;margin-left:30px;width:50%;">
                            <span style="width:90px;">采购人代码:</span>
                            <span>{{purchaserCode}}</span>
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
                            <span>{{totalProjectId}}</span>
                          </div>
                        </div>
                      </div>
                      <!-- 招标项目名称 -->
                      <div class="noteBox">
                        <div class="noteContent">
                          <div class="noteLeft">招标项目名称：</div>
                          <div class="noteFlex">
                            <span>{{nameOfTenderProject}}</span>
                          </div>
                        </div>
                      </div>
                      <!-- 招标项目遍号 -->
                      <div class="noteBox">
                        <div class="noteContent">
                          <div class="noteLeft">招标项目编号：</div>
                          <div class="noteFlex">
                            <span>{{biddingProjectNumber}}</span>
                          </div>
                          <div style="display: inline-flex;margin-left:30px;width:50%;">
                            <span style="width:100px;">招标项目金额:</span>
                            <span>{{amountOfBiddingProject}}</span>
                          </div>
                        </div>
                      </div>
                      <!-- 招标采购方式 -->
                      <div class="noteBox">
                        <div class="noteContent">
                          <div class="noteLeft">招标采购方式：</div>
                          <div class="noteFlex">
                            <span>{{biddingProcurementMode}}</span>
                          </div>
                          <div style="display: inline-flex;margin-left:30px;width:50%;">
                            <span style="width:100px;">招标组织方式:</span>
                            <span>{{biddingOrganization}}</span>
                          </div>
                        </div>
                      </div>
                      <!-- 招标项目类型 -->
                      <div class="noteBox">
                        <div class="noteContent">
                          <div class="noteLeft">招标项目类型：</div>
                          <div class="noteFlex">
                            <span>{{typesOfBiddingProjects}}</span>
                          </div>
                          <div style="display: inline-flex;margin-left:30px;width:50%;">
                            <span style="width:80px;">专业类别:</span>
                            <span>{{professionalCategory}}</span>
                          </div>
                        </div>
                      </div>
                      <!-- 是否公布预算 -->
                      <div class="noteBox">
                        <div class="noteContent">
                          <div class="noteLeft">是否公布预算：</div>
                          <div class="noteFlex">
                            <span>{{whetherAnnounceBudget}}</span>
                          </div>
                          <div style="display: inline-flex;width:340px;width:50%;">
                          <span>是否分包：</span>
                          <span>{{isSubcontracting}}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                </div>
              </el-collapse-item>
              <!-- 第六步 -->
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
      <!-- 立项批复文件弹框 -->
      <div class="mask1" v-show="file"></div>
      <div class="file_box" v-show="file">
        <!-- 头部 -->
        <div class="file_head">
          <div class="file_title" style="padding-left:10px;">立项批复文件</div>
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
      <!-- 新增挑选项目 -->
      <div class="mask2" v-show="chooseShow"></div>
      <div class="choose_box" v-show="chooseShow">
        <!-- 头部 -->
        <div class="file_head">
          <div style="padding-left:10px;">立项信息列表</div>
          <div style="padding-right:10px;font-size:25px;cursor:pointer;" @click="closeChoose()">×</div>
        </div>
        <div class="head_bottom">
          <span class="head_b_b">资金来源:
            <el-select v-model="value4" clearable placeholder="请选择">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </span>
          <span class="head_b_b">项目审批文号：<el-input v-model="input" placeholder="请输入内容"></el-input></span>
          <span class="head_b_b">北京投资项目统一代码：<el-input v-model="input" placeholder="请输入内容"></el-input></span>
          <span><button class="btn">搜索</button></span>
        </div>
        <!-- 挑选主体 -->
        <div class="chooseMain">
          <el-table :data="tableData" stripe style="width: 100%">
            <el-table-column type="index" width="70" label="编号" :index="typeIndex">
					  </el-table-column>
            <el-table-column prop="proName" label="项目名称" width="180">
            </el-table-column>
            <el-table-column prop="approvalNum" label="项目审批文号" width="180">
            </el-table-column>
            <el-table-column prop="code" label="北京投资项目统一代码">
            </el-table-column>
            <el-table-column prop="legalPerson" label="项目法人">
            </el-table-column>
            <el-table-column prop="operation" label="选择">
              <template slot-scope="scope">
                <el-button type="text" size="small">查看</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
  </div>
</template>

<script>
import baseUrl from '../../api/api'
import {isPoneAvailable} from '../../api/base.js'
import dayjs from "dayjs";
export default {
  components: {},
  props: {},
  data() {
    return {
      totalId:"",//搜索编号
      nameOfTender:"",//搜索分包名称
      totalProjectId:"",//入场项目编号
      projectInformaPrimaryKeyId:'',//主键id
      condition:'',//点击下一步返回的装填
      nameOfTenderProject:"",//招标项目名称
      biddingProjectNumber:"",//招标项目编号
      nameOfPurchaser:"",//招标采购人
      biddingProcurementMode:"",//招标采购方式
      state:"",//状态
      radio: "", //头部单选框
      input: "", //头部输入框
      activeName: '1',//弹框折叠效果
      currentPage:1,//当前页
      pagesize: 10, //每页条数
      pageTotal: 0, //总页数
      totalSize: 0, //总条数
      tableData: [ ],//列表数据
      recordData:[],//办理记录弹框
      approvalProjectName:'',//批复项目名称
      approvalNumber:'',//批复文号
      approvalAndApprovalDepartment:'',//批复核准部门
      supervisionDepartment:'',//监督部门
      auditDepartment:'',//核准部门
      projectLocation:'',//项目所在地
      localName:[],//项目所在地数组
      approvalJurisdiction:'',//审批权限
      isItConfidential:'是',//是否涉密
      engineeringProperties:'',//工程性质
      projectType:'是',//项目类型
      sourceOfFunds:'',//资金来源
      totalProjectFunds:'',//项目资金总额
      stateOwnedFunds:'',//国有资金
      stateOwnedFundsPercentage:'',//国有资金百分比
      ownFunds:'',//自有资金
      ownFundsPercentage:'',//自有资金百分比
      foreignGovernmentsAndOrganizationalFunds:'',//外国政府资金
      foreignGovernmentsAndOrganizationalFundsPercentage:'',//外国政府资金百分比
      overseasPrivateInvestment:'',//境外人投资
      overseasPrivateInvestmentPercentage:'',//境外人投资百分比
      projectApprovalDocumentsName:'',//项目审批名称
      investmentProjectsUnifiedCode:'',//北京投资项目统一代码
      projectLegalPerson:'',//项目法人
      projectLegalPersonCode:'',//项目法人代码
      projectIndustryClassification:'',//项目行业分类
      projectScale:'',//项目规模
      projectEstablishmentTime:'',//项目建立时间
      contacts:'',//联系人
      contactInformation:'',//联系方式
      entryName:'',//项目名称
      budgetProjectApprovalRecordNumber:'',//项目批准备案文号
      budgetRecipientUnit:'',//预算受文单位
      budgetRecipientUnitCode:'',//预算受文单位代码
      budgetAmount:'',//预算金额
      nameOfPurchaser:'',//采购人名称
      purchaserCode:'',//采购人代码
      nameOfTenderProject:'',//招标项目名称
      biddingProjectNumber:'',//招标项目编号
      amountOfBiddingProject:'',//招标项目金额
      biddingProcurementMode:'',//招标采购方式
      biddingOrganization:'',//招标组织方式
      typesOfBiddingProjects:'',//招标项目类型
      professionalCategory:'',//专业类别
      whetherAnnounceBudget:'是',//是否公布预算
      isSubcontracting:'',//是否分包
      qualificationExaminationMethod:'',//资格审查方式
      electronicBidEvaluation:'是',//电子化开评标
      tenderContents:'',//招标内容
      show: false, //新建项目弹框上一步
      nextShow:false,//新建项目弹框下一步
      file:false,//批复文件弹框
      chooseShow:false,//新增挑选项目弹框
      fbShow:false,//点击分包出现下两个必填选项
      passShow:false,//查看办理通过弹框
      appendixName:'',//附件名称
      attachmentlist:'',//附件列表
      enclosureData:[ //新建项目
          {
            id:1,
            appendixName: "*立项批复文件",
            attachlist: []
          },
          {
            id:2,
            appendixName: "项目负责人授权书",
            attachlist: []
          }
       ],
       files:{},//文件
       fileName:'',//上传文件名称
       fileSize:'',//上传文件大小
       uploadingPeople:'',//上传人
       uploadTime:'',//上传时间
       fileData:[],//上传文件表格
       options: [{ //select选项
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        value4: '',//select的v-model值
        addressData:[],//项目所在地data值
        dropWork:'工程性质',//下拉框
        dropData:'',//工程性质
        handleRecordData:[],//办理记录
        approvalData:[],//审批权限下拉框
        SourcefundsData:[],//资金来源下拉框
        industryData:[],//项目行业分类
        openTenderData:[],//招标采购方式
        organizaData:[],//招标组织方式
        bidProjectData:[],//招标项目类型
        academicDirectionData:[],//专业类别
        titleExaminationData:[],//资格审查方式
        projectNums:'',//获取上传列表入场项目编号
        attachmeId:[],//删除文件id
        uploadTimes:'',//时间戳转成时间格式
        filenames:'',
        num:''//记录点的是谁
    };
  },
  watch: {},
  computed: {},
  methods: {
    // 获取项目入场登记列表
    getList(){
      this.$axios({
        method: "POST",
        url: baseUrl+"/projectInformationController/selectList",
        data:{
          pageSize:this.pagesize,
          pageNo:this.currentPage
        }
      }).then(res=>{
        if(res.data.status == 200){
          this.tableData = res.data.data.list;
          this.totalSize = res.data.data.total;
        }else{
          this.$layer.msg(res.data.msg);
        }
      }).catch(err=>{
        console.log(err)
      })
    },
    //搜索列表
    searchList(){
      this.$axios({
        method: "POST",
        url: baseUrl+"/projectInformationController/selectList",
        data:{
          totalProjectId:this.totalProjectId,
          nameOfTenderProject:this.nameOfTender,
          biddingProjectNumber:this.biddingProjectNumber,
          nameOfPurchaser:this.nameOfPurchaser,
          biddingProcurementMode:this.biddingProcurementMode,
          state:this.state,
          pageSize:this.pagesize,
          pageNo:this.currentPage
        }
      }).then(res=>{
        if(res.data.status == 200){
          this.tableData = res.data.data.list;
          this.totalSize = res.data.data.total;
        }else{
          this.$layer.msg(res.data.msg);
        }
      }).catch(err=>{
        console.log(err);
      })
    },
    //头部单选框的搜索
    changeRadio(){
      this.$axios({
        method: "POST",
        url: baseUrl+"/projectInformationController/selectList",
        data:{
          state:this.radio,
          pageSize:this.pagesize,
          pageNo:this.currentPage
        }
      }).then(res=>{
        if(res.data.status == 200){
          this.tableData = res.data.data.list;
          this.totalSize = res.data.data.total;
        }else{
          this.$layer.msg(res.data.msg);
        }
      }).catch(err=>{
        console.log(err);
      })
    },
    //编号问题
    typeIndex(index) {
      return index + (this.currentPage - 1) * 8 + 1;
    },
    //分页
    page(val) {
      this.currentPage = val;
      this.getList();
    },
    //查看
    lookUp(keyId,state){
      this.uploadList();
      this.$axios({
         method:'GET',
        // params:{
        //   id:keyId
        // },
        url:baseUrl + '/projectInformationController/selectById/'+keyId,
      }).then(res=>{
        if(res.data.status == 200){
          if(state == "编辑中"){
            this.nextShow = true;
          }else{
            this.passShow = true;
          }
        }else{
          this.$layer.msg(res.data.msg);
        }

      }).catch(err=>{
        console.log(err)
      })
    },
    //新建项目打开
    newManage() {
      this.projectLocation = this.localName.join('');
      this.addressList();
      this.dropDown();
      this.approval();
      this.Sourcefunds();
      this.industryList();
      this.openTenderList();
      this.organizaList();
      this.bidProjectList();
      this.academicDirectionList();
      this.titleExaminationList();
      this.show = !this.show;
      this.approvalProjectName="";
      this.approvalNumber="";
      this.approvalAndApprovalDepartment="";
      this.supervisionDepartment="";
      this.auditDepartment="";
      this.projectLocation='';
      this.approvalJurisdiction="";
      this.isItConfidential="是";
      this.engineeringProperties="";
      this.projectType="是";
      this.sourceOfFunds="";
      this.totalProjectFunds="";
      this.stateOwnedFunds="";
      this.stateOwnedFundsPercentage="";
      this.ownFunds="";
      this.ownFundsPercentage="";
      this.foreignGovernmentsAndOrganizationalFunds="";
      this.foreignGovernmentsAndOrganizationalFundsPercentage="";
      this.overseasPrivateInvestment="";
      this.overseasPrivateInvestmentPercentage="";
      this.projectApprovalDocumentsName="";
      this.investmentProjectsUnifiedCode="";
      this.projectLegalPerson="";
      this.projectLegalPersonCode="";
      this.projectIndustryClassification="";
      this.projectScale="";
      this.projectEstablishmentTime="";
      this.contacts="";
      this.contactInformation="";
      this.entryName="";
      this.budgetProjectApprovalRecordNumber="";
      this.budgetRecipientUnit="";
      this.budgetRecipientUnitCode="";
      this.budgetAmount="";
      this.nameOfPurchaser="";
      this.purchaserCode="";
      this.nameOfTenderProject="";
      this.biddingProjectNumber="";
      this.amountOfBiddingProject="";
      this.biddingProcurementMode="";
      this.biddingOrganization="";
      this.typesOfBiddingProjects="";
      this.professionalCategory="";
      this.whetherAnnounceBudget="是";
      this.isSubcontracting="是";
      this.attachlist=[];
    },
    //新建项目关闭
    close() {
      this.show = !this.show;
    },
    closeNextShow(){
      this.nextShow = !this.nextShow;
    },
    closePassShow(){
      this.passShow = !this.passShow;
    },
    //分包按钮点击否出现下两个必填选项
    fenbaoShow(){
      if(this.isSubcontracting == '否'){
        this.fbShow = true;
      }else{
        this.fbShow = false;
      }
    },
    //新建项目入场登记项目金额计算
    sumAccount(){
      this.stateOwnedFundsPercentage = (this.stateOwnedFunds/this.totalProjectFunds*100).toFixed(2);
    },
    ownMoney(){
      this.ownFundsPercentage = (this.ownFunds/this.totalProjectFunds*100).toFixed(2);
    },
    foreignMoney(){
      this.foreignGovernmentsAndOrganizationalFundsPercentage = (this.foreignGovernmentsAndOrganizationalFunds/this.totalProjectFunds*100).toFixed(2);
    },
    abroadMoney(){
      this.overseasPrivateInvestmentPercentage = (this.overseasPrivateInvestment/this.totalProjectFunds*100).toFixed(2);
    },
    //下一步变换
    nextTo(){
      this.projectLocation = this.localName.join('');
      // if(!this.approvalProjectName) {
      //   this.$layer.msg("请输入批复项目名称");
      //   return false;
      // }else if(!this.approvalNumber){
      //   this.$layer.msg("请输入批复文号");
      //   return false;
      // }else if(!this.approvalAndApprovalDepartment){
      //   this.$layer.msg("请输入核准部门");
      //   return false;
      // }else if(!this.supervisionDepartment){
      //   this.$layer.msg("请输入监督部门");
      //   return false;
      // }else if(!this.auditDepartment){
      //   this.$layer.msg("请输入核准部门");
      //   return false;
      // }else if(!this.projectLocation){
      //   this.$layer.msg("请选择项目所在地");
      //   return false;
      // }else if(!this.approvalJurisdiction){
      //   this.$layer.msg("请输入审批权限");
      //   return false;
      // }else if(!this.isItConfidential){
      //   this.$layer.msg("请选择是否涉密");
      //   return false;
      // }else if(!this.engineeringProperties){
      //   this.$layer.msg("请选择工程性质");
      //   return false;
      // }else if(!this.projectType){
      //   this.$layer.msg("请选择项目类型");
      //   return false;
      // }else if(!this.sourceOfFunds){
      //   this.$layer.msg("请填写资金来源");
      //   return false;
      // }else if(!this.totalProjectFunds){
      //   this.$layer.msg("请填写项目资金总额");
      //   return false;
      // }else if(!this.projectApprovalDocumentsName){
      //   this.$layer.msg("请填写项目审批名称");
      //   return false;
      // }else if(!this.investmentProjectsUnifiedCode){
      //   this.$layer.msg("请填写北京投资项目统一代码");
      //   return false;
      // }else if(!this.projectLegalPerson){
      //   this.$layer.msg("请填写项目法人");
      //   return false;
      // }else if(!this.projectLegalPersonCode){
      //   this.$layer.msg("请填写项目法人代码");
      //   return false;
      // }else if(!this.projectIndustryClassification){
      //   this.$layer.msg("请选择项目行业分类");
      //   return false;
      // }else if(!this.projectScale){
      //   this.$layer.msg("请填写项目规模");
      //   return false;
      // }else if(!this.projectEstablishmentTime){
      //   this.$layer.msg("请填写项目建立时间");
      //   return false;
      // }else if(!this.contacts){
      //   this.$layer.msg("请填写联系人");
      //   return false;
      // }else if(!this.contactInformation){
      //   this.$layer.msg("请填写联系方式");
      //   return false;
      // }else if(!this.entryName){
      //   this.$layer.msg("请填写项目名称");
      //   return false;
      // }else if(!this.budgetProjectApprovalRecordNumber){
      //   this.$layer.msg("请填写项目批准备案文号");
      //   return false;
      // }else if(!this.budgetRecipientUnit){
      //   this.$layer.msg("请填写预算受文单位");
      //   return false;
      // }else if(!this.budgetRecipientUnitCode){
      //   this.$layer.msg("请填写预算受文单位代码");
      //   return false;
      // }else if(!this.budgetAmount){
      //   this.$layer.msg("请填写预算金额");
      //   return false;
      // }else if(!this.nameOfPurchaser){
      //   this.$layer.msg("请填写采购人名称");
      //   return false;
      // }else if(!this.purchaserCode){
      //   this.$layer.msg("请填写采购人代码");
      //   return false;
      // }else if(!this.nameOfTenderProject){
      //   this.$layer.msg("请填写招标项目名称");
      //   return false;
      // }else if(!this.biddingProjectNumber){
      //   this.$layer.msg("请填写招标项目编号");
      //   return false;
      // }else if(!this.amountOfBiddingProject){
      //   this.$layer.msg("请填写招标项目金额");
      //   return false;
      // }else if(!this.biddingProcurementMode){
      //   this.$layer.msg("请填写招标采购方式");
      //   return false;
      // }else if(!this.biddingOrganization){
      //   this.$layer.msg("请填写招标组织方式");
      //   return false;
      // }else if(!this.typesOfBiddingProjects){
      //   this.$layer.msg("请填写招标项目类型");
      //   return false;
      // }else if(!this.professionalCategory){
      //   this.$layer.msg("请选择专业类别");
      //   return false;
      // }else if(!this.whetherAnnounceBudget){
      //   this.$layer.msg("请选择是否公布预算");
      //   return false;
      // }else if(!this.isSubcontracting){
      //   this.$layer.msg("请选择是否分包");
      //   return false;
      // }else if(this.stateOwnedFunds + this.ownFunds + this.foreignGovernmentsAndOrganizationalFunds + this.overseasPrivateInvestment != this.totalProjectFunds){
      //   this.$layer.msg("请查看资金构成是否等于项目资金总额");
      //   return false;
      // }else if(this.amountOfBiddingProject > this.totalProjectFunds){
          //this.$layer.msg("招标项目金额不能大项目资金总额");
      //    return false;
        //}
      if(this.isSubcontracting == "否"){
        if(!this.qualificationExaminationMethod){
          this.$layer.msg("请选择资格审查方式");
          return false;
        }else if(!this.electronicBidEvaluation){
          this.$layer.msg("请选择电子化开评标");
          return false;
        }else if(!this.tenderContents){
          this.$layer.msg("请填写招标内容");
          return false;
        }
      }
      this.$axios({
        method: "POST",
        url: baseUrl+"/projectInformationController/nextStep",
        data:{
          approvalProjectName:this.approvalProjectName,//批复项目名称
          approvalNumber:this.approvalNumber,//批复文号
          approvalAndApprovalDepartment:this.approvalAndApprovalDepartment,//核准部门
          supervisionDepartment:this.supervisionDepartment,//监督部门
          auditDepartment:this.auditDepartment,//核准部门
          projectLocation:this.projectLocation,//项目所在地
          approvalJurisdiction:this.approvalJurisdiction,//审批权限
          isItConfidential:this.isItConfidential,//是否涉密
          engineeringProperties:this.engineeringProperties,//工程性质
          projectType:this.projectType,//项目类型
          sourceOfFunds:this.sourceOfFunds,//资金来源
          totalProjectFunds:this.totalProjectFunds,//项目资金总额
          stateOwnedFunds:this.stateOwnedFunds,//国有资金
          stateOwnedFundsPercentage:this.stateOwnedFundsPercentage,//国有资金百分比
          ownFunds:this.ownFunds,//自有资金
          ownFundsPercentage:this.ownFundsPercentage,//自有资金百分比
          foreignGovernmentsAndOrganizationalFunds:this.foreignGovernmentsAndOrganizationalFunds,//外国政府
          foreignGovernmentsAndOrganizationalFundsPercentage:this.foreignGovernmentsAndOrganizationalFundsPercentage,//外国政府百分比
          overseasPrivateInvestment:this.overseasPrivateInvestment,//境外人投资
          overseasPrivateInvestmentPercentage:this.overseasPrivateInvestmentPercentage,//境外人投资百分比
          projectApprovalDocumentsName:this.projectApprovalDocumentsName,//项目审批名称
          investmentProjectsUnifiedCode:this.investmentProjectsUnifiedCode,//北京投资项目统一代码
          projectLegalPerson:this.projectLegalPerson,//项目法人
          projectLegalPersonCode:this.projectLegalPersonCode,//项目法人代码
          projectIndustryClassification:this.projectIndustryClassification,//项目行业分类
          projectScale:this.projectScale,//项目规模
          projectEstablishmentTime:this.projectEstablishmentTime,//项目建立时间
          contacts:this.contacts,//联系人
          contactInformation:this.contactInformation,//联系方式
          entryName:this.entryName,//项目名称
          budgetProjectApprovalRecordNumber:this.budgetProjectApprovalRecordNumber,//项目批准备案文号
          budgetRecipientUnit:this.budgetRecipientUnit,//预算受文单位
          budgetRecipientUnitCode:this.budgetRecipientUnitCode,//预算受文单位代码
          budgetAmount:this.budgetAmount,//预算金额
          nameOfPurchaser:this.nameOfPurchaser,//采购人名称
          purchaserCode:this.purchaserCode,//采购人代码
          nameOfTenderProject:this.nameOfTenderProject,//招标项目名称
          biddingProjectNumber:this.biddingProjectNumber,//招标项目编号
          amountOfBiddingProject:this.amountOfBiddingProject,//招标项目金额
          biddingProcurementMode:this.biddingProcurementMode,//招标采购方式
          biddingOrganization:this.biddingOrganization,//招标组织方式
          typesOfBiddingProjects:this.typesOfBiddingProjects,//招标项目类型
          professionalCategory:this.professionalCategory,//专业类别
          whetherAnnounceBudget:this.whetherAnnounceBudget,//是否公布预算
          isSubcontracting:this.isSubcontracting,//是否分包
          qualificationExaminationMethod:this.qualificationExaminationMethod,//资格审查方式
          electronicBidEvaluation:this.electronicBidEvaluation,//电子化开评标
          tenderContents:this.tenderContents//招标内容
        }
      }).then(res=>{
        if(res.data.status == 200){
          this.nextShow = true;
          this.show = false;
          this.projectInformaPrimaryKeyId = res.data.data.projectInformaPrimaryKeyId;
          this.condition = res.data.data.state;
          this.projectNums = res.data.data.totalProjectId;
          this.uploadList();
          this.getRecordList();
        }else{
          this.$layer.msg(res.data.msg);
        }
      }).catch(err=>{
        console.log(err)
      })
    },
    //点击保存按钮
    saveData(){
      this.projectLocation = this.localName.join('');
      // if(!this.approvalProjectName) {
      //   this.$layer.msg("请输入批复项目名称");
      //   return false;
      // }else if(!this.approvalNumber){
      //   this.$layer.msg("请输入批复文号");
      //   return false;
      // }else if(!this.approvalAndApprovalDepartment){
      //   this.$layer.msg("请输入核准部门");
      //   return false;
      // }else if(!this.supervisionDepartment){
      //   this.$layer.msg("请输入监督部门");
      //   return false;
      // }else if(!this.auditDepartment){
      //   this.$layer.msg("请输入核准部门");
      //   return false;
      // }else if(!this.projectLocation){
      //   this.$layer.msg("请选择项目所在地");
      //   return false;
      // }else if(!this.approvalJurisdiction){
      //   this.$layer.msg("请输入审批权限");
      //   return false;
      // }else if(!this.isItConfidential){
      //   this.$layer.msg("请选择是否涉密");
      //   return false;
      // }else if(!this.engineeringProperties){
      //   this.$layer.msg("请选择工程性质");
      //   return false;
      // }else if(!this.projectType){
      //   this.$layer.msg("请选择项目类型");
      //   return false;
      // }else if(!this.sourceOfFunds){
      //   this.$layer.msg("请填写资金来源");
      //   return false;
      // }else if(!this.totalProjectFunds){
      //   this.$layer.msg("请填写项目资金总额");
      //   return false;
      // }else if(!this.stateOwnedFunds){
      //   this.$layer.msg("请填写国有资金");
      //   return false;
      // }else if(!this.stateOwnedFundsPercentage){
      //   this.$layer.msg("请填写国有资金所占百分比");
      //   return false;
      // }else if(!this.ownFunds){
      //   this.$layer.msg("请填写自有资金");
      //   return false;
      // }else if(!this.ownFundsPercentage){
      //   this.$layer.msg("请填写自有资金所占百分比");
      //   return false;
      // }else if(!this.foreignGovernmentsAndOrganizationalFunds){
      //   this.$layer.msg("请填写外国政府资金");
      //   return false;
      // }else if(!this.foreignGovernmentsAndOrganizationalFundsPercentage){
      //   this.$layer.msg("请填写外国政府资金所占百分比");
      //   return false;
      // }else if(!this.overseasPrivateInvestment){
      //   this.$layer.msg("请填写境外投资");
      //   return false;
      // }else if(!this.overseasPrivateInvestmentPercentage){
      //   this.$layer.msg("请填写境外投资所占百分比");
      //   return false;
      // }else if(!this.projectApprovalDocumentsName){
      //   this.$layer.msg("请填写项目审批名称");
      //   return false;
      // }else if(!this.investmentProjectsUnifiedCode){
      //   this.$layer.msg("请填写北京投资项目统一代码");
      //   return false;
      // }else if(!this.projectLegalPerson){
      //   this.$layer.msg("请填写项目法人");
      //   return false;
      // }else if(!this.projectLegalPersonCode){
      //   this.$layer.msg("请填写项目法人代码");
      //   return false;
      // }else if(!this.projectIndustryClassification){
      //   this.$layer.msg("请选择项目行业分类");
      //   return false;
      // }else if(!this.projectScale){
      //   this.$layer.msg("请填写项目规模");
      //   return false;
      // }else if(!this.projectEstablishmentTime){
      //   this.$layer.msg("请填写项目建立时间");
      //   return false;
      // }else if(!this.contacts){
      //   this.$layer.msg("请填写联系人");
      //   return false;
      // }else if(!this.contactInformation){
      //   this.$layer.msg("请填写联系方式");
      //   return false;
      // }else if(!this.entryName){
      //   this.$layer.msg("请填写项目名称");
      //   return false;
      // }else if(!this.budgetProjectApprovalRecordNumber){
      //   this.$layer.msg("请填写项目批准备案文号");
      //   return false;
      // }else if(!this.budgetRecipientUnit){
      //   this.$layer.msg("请填写预算受文单位");
      //   return false;
      // }else if(!this.budgetRecipientUnitCode){
      //   this.$layer.msg("请填写预算受文单位代码");
      //   return false;
      // }else if(!this.budgetAmount){
      //   this.$layer.msg("请填写预算金额");
      //   return false;
      // }else if(!this.nameOfPurchaser){
      //   this.$layer.msg("请填写采购人名称");
      //   return false;
      // }else if(!this.purchaserCode){
      //   this.$layer.msg("请填写采购人代码");
      //   return false;
      // }else if(!this.nameOfTenderProject){
      //   this.$layer.msg("请填写招标项目名称");
      //   return false;
      // }else if(!this.biddingProjectNumber){
      //   this.$layer.msg("请填写招标项目编号");
      //   return false;
      // }else if(!this.amountOfBiddingProject){
      //   this.$layer.msg("请填写招标项目金额");
      //   return false;
      // }else if(!this.biddingProcurementMode){
      //   this.$layer.msg("请填写招标采购方式");
      //   return false;
      // }else if(!this.biddingOrganization){
      //   this.$layer.msg("请填写招标组织方式");
      //   return false;
      // }else if(!this.typesOfBiddingProjects){
      //   this.$layer.msg("请填写招标项目类型");
      //   return false;
      // }else if(!this.professionalCategory){
      //   this.$layer.msg("请选择专业类别");
      //   return false;
      // }else if(!this.whetherAnnounceBudget){
      //   this.$layer.msg("请选择是否公布预算");
      //   return false;
      // }else if(!this.isSubcontracting){
      //   this.$layer.msg("请选择是否分包");
      //   return false;
      // }
      this.$axios({
        method: "POST",
        url: baseUrl+"/projectInformationController/save",
        data:{
          approvalProjectName:this.approvalProjectName,//批复项目名称
          approvalNumber:this.approvalNumber,//批复文号
          approvalAndApprovalDepartment:this.approvalAndApprovalDepartment,//核准部门
          supervisionDepartment:this.supervisionDepartment,//监督部门
          auditDepartment:this.auditDepartment,//核准部门
          projectLocation:this.projectLocation,//项目所在地
          approvalJurisdiction:this.approvalJurisdiction,//审批权限
          isItConfidential:this.isItConfidential,//是否涉密
          engineeringProperties:this.engineeringProperties,//工程性质
          projectType:this.projectType,//项目类型
          sourceOfFunds:this.sourceOfFunds,//资金来源
          totalProjectFunds:this.totalProjectFunds,//项目资金总额
          stateOwnedFunds:this.stateOwnedFunds,//国有资金
          stateOwnedFundsPercentage:this.stateOwnedFundsPercentage,//国有资金百分比
          ownFunds:this.ownFunds,//自有资金
          ownFundsPercentage:this.ownFundsPercentage,//自有资金百分比
          foreignGovernmentsAndOrganizationalFunds:this.foreignGovernmentsAndOrganizationalFunds,//外国政府
          foreignGovernmentsAndOrganizationalFundsPercentage:this.foreignGovernmentsAndOrganizationalFundsPercentage,//外国政府百分比
          overseasPrivateInvestment:this.overseasPrivateInvestment,//境外人投资
          overseasPrivateInvestmentPercentage:this.overseasPrivateInvestmentPercentage,//境外人投资百分比
          projectApprovalDocumentsName:this.projectApprovalDocumentsName,//项目审批名称
          investmentProjectsUnifiedCode:this.investmentProjectsUnifiedCode,//北京投资项目统一代码
          projectLegalPerson:this.projectLegalPerson,//项目法人
          projectLegalPersonCode:this.projectLegalPersonCode,//项目法人代码
          projectIndustryClassification:this.projectIndustryClassification,//项目行业分类
          projectScale:this.projectScale,//项目规模
          projectEstablishmentTime:this.projectEstablishmentTime,//项目建立时间
          contacts:this.contacts,//联系人
          contactInformation:this.contactInformation,//联系方式
          entryName:this.entryName,//项目名称
          budgetProjectApprovalRecordNumber:this.budgetProjectApprovalRecordNumber,//项目批准备案文号
          budgetRecipientUnit:this.budgetRecipientUnit,//预算受文单位
          budgetRecipientUnitCode:this.budgetRecipientUnitCode,//预算受文单位代码
          budgetAmount:this.budgetAmount,//预算金额
          nameOfPurchaser:this.nameOfPurchaser,//采购人名称
          purchaserCode:this.purchaserCode,//采购人代码
          nameOfTenderProject:this.nameOfTenderProject,//招标项目名称
          biddingProjectNumber:this.biddingProjectNumber,//招标项目编号
          amountOfBiddingProject:this.amountOfBiddingProject,//招标项目金额
          biddingProcurementMode:this.biddingProcurementMode,//招标采购方式
          biddingOrganization:this.biddingOrganization,//招标组织方式
          typesOfBiddingProjects:this.typesOfBiddingProjects,//招标项目类型
          professionalCategory:this.professionalCategory,//专业类别
          whetherAnnounceBudget:this.whetherAnnounceBudget,//是否公布预算
          isSubcontracting:this.isSubcontracting,//是否分包
          qualificationExaminationMethod:this.qualificationExaminationMethod,//资格审查方式
          electronicBidEvaluation:this.electronicBidEvaluation,//电子化开评标
          tenderContents:this.tenderContents//招标内容
        }
      }).then(res=>{
        if(res.data.status == 200){
          this.show = false;
          this.getList();
        }else{
          this.$layer.msg(res.data.msg);
        }

      }).catch(err=>{
        console.log(err)
      })
    },
    //点击提交按钮
    submitFile(){
      // if(!this.attachlist){
      //   this.$layer.msg("立项批复文件属于必须上传的电子件，请上传！");
      //   return false;
      // }
      this.$axios({
        method: "POST",
        url: baseUrl+"/projectInformationController/admissionProjectSubmission",
        data:{
          id:this.projectInformaPrimaryKeyId,
          state:this.condition
        }
      }).then(res=>{
        if(res.data.status == 200){
          this.nextShow = false;
          this.getList();
        }else{
          this.$layer.msg(res.data.msg);
        }
      }).catch(err=>{
        console.log(err);
      })
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
      formData.append("projectId", this.projectNums);
      formData.append("file", this.files);
      formData.append("user", '张三');
      if(this.num == 1){
        formData.append("fileType", '立项批复文件');
      }else{
        formData.append("fileType", '项目负责人授权书');
      }
      
      this.$axios({
					method: 'POST',
					url: baseUrl + '/attachmeController/multifileUpload',
          data:formData
				}).then(res=>{
          if(res.data.status == 200){
            this.uploadList();
          }else{
            this.$layer.msg(res.data.msg);
          }
        }).catch(err=>{
          console.log(err);
        })

      // $.ajax({//this.projectInformaPrimaryKeyId
      //   type:'POST',
      //   url:baseUrl + '/attachmeController/multifileUpload',
      //   processData:false,
      //   contentType:false,
      //   async:false,
      //   data:formData,
      //   success:res=>{
      //     console.log(res);
      //   }
      // })
      
    },
    //上传列表
    uploadList(){
      var obj = {}
      if(this.num == 1){
        obj={
          relevanceCorrelationId:this.projectNums,
          fileType:'立项批复文件'
        }
      }else{
        obj={
          relevanceCorrelationId:this.projectNums,
          fileType:'项目负责人授权书'
        }
      }
      this.$axios({//this.projectNums
					method: 'POST',
					url: baseUrl + '/attachmeController/queryAttachme',
          data:obj
				}).then(res=>{
          if(res.data.status == 200){
            // this.filenames = '';
            this.fileData = res.data.data;
            var arr = [];
            this.fileData.map((item,index)=>{
              item.formatTime = dayjs(item.uploadTime).format('YYYY-MM-DD HH:mm:ss')
              arr.push(item)
            })
            if(this.num == 1){
              this.enclosureData[0].attachlist = arr
            }else{
              this.enclosureData[1].attachlist = arr
            }
          }else{
            this.$layer.msg(res.data.msg);
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
            this.$layer.msg(res.data.msg);
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
    //上一步
    backTo(){
      this.nextShow = false;
      this.show = true;
      this.projectEstablishmentTime = new Date(this.projectEstablishmentTime).getTime();
    },
    //新建弹框下一步中的点击附件
    shezhi(num){
      this.num = num;
      this.file = !this.file;
      if(this.num ==1){
        $('.file_title').html('立项批复文件')
      }else{
         $('.file_title').html('项目负责人授权书')
      }
      this.uploadList();
    },
    closeFile(){
      this.file = !this.file;
    },
    //新增挑选项目
    chooseList(){
      this.chooseShow = !this.chooseShow;
    },
    closeChoose(){
      this.chooseShow = !this.chooseShow;
    },
    //项目所在地
    addressList(){
      this.$axios({
        method:'GET',
        url:baseUrl + '/adderssController/selectAdderssList'
      }).then(res=>{
        if(res.data.status == 200){
          this.addressData = res.data.data
        }else{
          this.$layer.msg(res.data.msg);
        }
      }).catch(err=>{
        console.log(err);
      })
    },
    handleChange(value) {
       
    },
    //所有下拉框--->工程性质
    dropDown(){
      this.$axios({
        method:'POST',
        url:baseUrl+'/interfaceTableController/selectByname',
        data:{
          dropDownBox:this.dropWork
        }
      }).then(res=>{
        if(res.data.data.status == 200){
          this.dropData = res.data.data.data;
          this.engineeringProperties =res.data.data.data[0].value;
        }else{
          this.$layer.msg(res.data.data.msg)
        }
      }).catch(err=>{
        console.log(err)
      })
    },
    gcxz(){
      
    },
    //下拉框-->审批权限
    approval(){
      this.$axios({
        method:'POST',
        url:baseUrl+'/interfaceTableController/selectByname',
        data:{
          dropDownBox:'审批权限'
        }
      }).then(res=>{
        if(res.data.data.status == 200){
          this.approvalData = res.data.data.data;
          this.approvalJurisdiction =res.data.data.data[0].value;
        }else{
          this.$layer.msg(res.data.data.msg)
        }
      }).catch(err=>{
        console.log(err)
      })
    },
    //下拉框-->资金来源
    Sourcefunds(){
      this.$axios({
        method:'POST',
        url:baseUrl+'/interfaceTableController/selectByname',
        data:{
          dropDownBox:'资金来源'
        }
      }).then(res=>{
        if(res.data.data.status == 200){
          this.SourcefundsData = res.data.data.data;
          this.sourceOfFunds =res.data.data.data[0].value;
        }else{
          this.$layer.msg(res.data.data.msg)
        }
      }).catch(err=>{
        console.log(err)
      })
    },
    //下拉框-->项目行业分类
    industryList(){
      this.$axios({
        method:'POST',
        url:baseUrl+'/interfaceTableController/selectByname',
        data:{
          dropDownBox:'资金来源'
        }
      }).then(res=>{
        if(res.data.data.status == 200){
          this.industryData = res.data.data.data;
          this.projectIndustryClassification =res.data.data.data[0].value;
        }else{
          this.$layer.msg(res.data.data.msg)
        }
      }).catch(err=>{
        console.log(err)
      })
    },
    //下拉框-->招标采购方式
    openTenderList(){
      this.$axios({
        method:'POST',
        url:baseUrl+'/interfaceTableController/selectByname',
        data:{
          dropDownBox:'招标采购方式'
        }
      }).then(res=>{
        if(res.data.data.status == 200){
          this.openTenderData = res.data.data.data;
          this.biddingProcurementMode =res.data.data.data[0].value;
        }else{
          this.$layer.msg(res.data.data.msg)
        }
      }).catch(err=>{
        console.log(err)
      })
    },
    //下拉框--->招标组织方式
    organizaList(){
      this.$axios({
        method:'POST',
        url:baseUrl+'/interfaceTableController/selectByname',
        data:{
          dropDownBox:'招标组织方式'
        }
      }).then(res=>{
        if(res.data.data.status == 200){
          this.organizaData = res.data.data.data;
          this.biddingOrganization = res.data.data.data[0].value;
        }else{
          this.$layer.msg(res.data.data.msg)
        }
      }).catch(err=>{
        console.log(err)
      })
    },
    //下拉框-->招标项目类型
    bidProjectList(){
      this.$axios({
        method:'POST',
        url:baseUrl+'/interfaceTableController/selectByname',
        data:{
          dropDownBox:'招标项目类型'
        }
      }).then(res=>{
        if(res.data.data.status == 200){
          this.bidProjectData = res.data.data.data;
          this.typesOfBiddingProjects =res.data.data.data[0].value;
        }else{
          this.$layer.msg(res.data.data.msg)
        }
      }).catch(err=>{
        console.log(err)
      })
    },
    //下拉框-->专业类别
    academicDirectionList(){
      this.$axios({
        method:'POST',
        url:baseUrl+'/interfaceTableController/selectByname',
        data:{
          dropDownBox:'专业类别'
        }
      }).then(res=>{
        if(res.data.data.status == 200){
          this.academicDirectionData = res.data.data.data;
          this.professionalCategory =res.data.data.data[0].value;
        }else{
          this.$layer.msg(res.data.data.msg)
        }
      }).catch(err=>{
        console.log(err)
      })
    },
    //下拉框-->资格审查方式
    titleExaminationList(){//
      this.$axios({
        method:'POST',
        url:baseUrl+'/interfaceTableController/selectByname',
        data:{
          dropDownBox:'资格审查方式'
        }
      }).then(res=>{
        if(res.data.data.status == 200){
          this.titleExaminationData = res.data.data.data;
          this.qualificationExaminationMethod =res.data.data.data[0].value;
        }else{
          this.$layer.msg(res.data.data.msg)
        }
      }).catch(err=>{
        console.log(err)
      })
    },
    //校验手机号联系方式
    blurPhone(){
      if(!isPoneAvailable(this.contactInformation)){
        this.$layer.msg('请输入正确的联系方式');
      }
    },
    //办理记录列表
    getRecordList(){
      this.$axios({
        method:'POST',
        url:baseUrl + '/subcontractItemController/selectHistory',
        data:{
          entrySubcontractNumber:this.projectNums
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
    }
  },
  created() {
    this.getList();
  },
  mounted() {}
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
.head_box {
  width: 100%;
  height: 35px;
  line-height: 35px;
  display: flex;
  justify-content: space-between;
  background: #ffffff;
  padding: 0 3px;
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
/* 主体 */

.main_box{
  height: 400px;
  overflow-y: scroll;
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
.el-radio{
  height: 30px !important;
  line-height: 30px !important;
}
.el-radio:last-child{
  height: 30px !important;
  line-height: 30px !important;
}
/* 批复文件弹框 */
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
  margin: 30px 0;
  background-color: #f5f7fa;
  text-align: right;
  position: fixed;
  right: 0;
  bottom: 5px;
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
</style>