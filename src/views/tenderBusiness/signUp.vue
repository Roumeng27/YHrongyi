<template>
  <div class="myDiv">
    <!-- 头部 -->
    <div>
      <div class="head_box">
        <div>
          <el-radio-group v-model="bidState" @change="changeRadio">
            <el-radio label="">全部</el-radio>
            <el-radio label="报名成功">报名成功</el-radio>
            <el-radio label="审核中">审核中</el-radio>
            <el-radio label="报名失败">报名失败</el-radio>
            <el-radio label="未报名">未报名</el-radio>
          </el-radio-group>
        </div>    
      </div>
      <div class="head_bottom">
        <span class="head_b_b">招标项目名称：<el-input v-model="entryName" placeholder="请输入内容"  @keyup.enter.native="searchList"></el-input></span>
        <span class="head_b_b">入场项目(分包)编号：<el-input v-model="totalProjectId" placeholder="请输入内容"  @keyup.enter.native="searchList"></el-input></span>
        <span><button class="btn" @click="searchList()">搜索</button></span>
      </div>
    </div>
    <!-- 主体 -->
    <div class="table_content">
      <div class="main_box">
          <el-table :data="tableData" stripe style="width: 100%">
            <el-table-column type="index" width="70" label="序号" :index="typeIndex">
            </el-table-column>
            <el-table-column prop="totalProjectId" label="入场项目编号" width="170">
            </el-table-column>
            <el-table-column prop="nameOfTenderProject" label="招标项目名称">
            </el-table-column>
            <el-table-column prop="biddingProjectNumber" label="分包名称">
            </el-table-column>
            <el-table-column prop="endTime" label="报名截止时间" >
            </el-table-column>
            <el-table-column prop="biddingProcurementMode" label="分包分类">
            </el-table-column>
            <el-table-column prop="bidState" label="状态" width="100">
            </el-table-column>
            <el-table-column prop="operation" label="操作" width="70"> 
              <template slot-scope="scope">
                <i class="el-icon-search" style="cursor:pointer;" @click="lookFile(scope.row)"  v-if="scope.row.bidState == '报名成功' ||scope.row.bidState == '审核中' ||scope.row.bidState == '报名失败'"></i>
                <i class="el-icon-plus" style="cursor:pointer;" @click="addFile(scope.row)"  v-if="scope.row.bidState == '未报名' && myTime < scope.row.endTime"></i>
                <i v-if="scope.row.bidState == '未报名' && myTime >= scope.row.endTime"></i>
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
    <!-- 查看投标信息弹框 -->
    <div class="mask"  v-show="show"></div>
    <div class="new_pro" v-show="show">
      <div class="new_head_box">
        <div class="new_head">
          <div style="padding-left:10px;">完善投标信息</div>
          <div @click="close()" style="font-size:28px;padding-right:10px;cursor:pointer;">×</div>
        </div>
      </div>
      <div class="new_main">
        <el-collapse v-model="activeName" accordion>
          <!-- 第一步 -->
          <el-collapse-item title="分包信息" name="1">
            <!-- 分包名称及编号 -->
            <div class="noteBox">
              <div class="noteContent">
                <div class="noteLeft">分包名称：</div>
                <div class="noteFlex">
                  <span>{{subcontractName}}</span>
                </div>
                <div style="display: inline-flex;margin-left:30px;width:45%;">
                  <span style="width:150px;">入场项目分包编号：</span>
                  <span>{{entrySubcontractNumber}}</span>
                </div>
              </div>
            </div>
            <!--招标方式及采购人  -->
            <div class="noteBox">
              <div class="noteContent">
                <div class="noteLeft">招标方式：</div>
                <div class="noteFlex">
                  <span>{{biddingProcurementMode}}</span>
                </div>
                <div style="display: inline-flex;margin-left:30px;;width:45%;">
                  <span style="width:100px;">招标(采购)人：</span>
                  <span>{{nameOfPurchaser}}</span>
                </div>
              </div>
            </div>
            <!--项目负责人  -->
            <div class="noteBox">
              <div class="noteContent">
                <div class="noteLeft">项目负责人：</div>
                <div class="noteFlex">
                  <span>{{projectLeader}}</span>
                </div>
              </div>
            </div>
            <!-- 报名截止时间.企业资质要求 -->
            <div class="noteBox">
              <div class="noteContent">
                <div class="noteLeft">报名截止时间：</div>
                <div class="noteFlex">
                  <span>{{enrollEndTime}}</span>
                </div>
                <div style="display: inline-flex;margin-left:30px;;width:45%;">
                  <span style="width:130px;">企业资质要求：</span>
                  <span>{{companyQualifications}}</span>
                </div>
              </div>
            </div>
            <!-- 项目负责人资质要求 -->
            <div class="noteBox">
              <div class="noteContent">
                <div class="noteLeft">项目负责人资质要求：</div>
                <div class="noteFlex">
                  <span>{{managerQualifications}}</span>
                </div>
              </div>
            </div>
          </el-collapse-item>
          <!-- 第二步 -->
          <el-collapse-item title="投标报名(供应商)人信息" name="2">
            <!--企业名称  -->
            <div class="noteBox">
              <div class="noteContent">
                <div class="noteLeft">企业名称：</div>
                <div class="noteFlex">
                  <span>{{companyName}}</span>
                </div>
              </div>
            </div>
            <!-- 企业组织机构代码及企业资质编号 -->
            <div class="noteBox">
              <div class="noteContent">
                <div class="noteLeft">企业组织机构代码：</div>
                <div class="noteFlex">
                  <span>{{organizationCode}}</span>
                </div>
                <div style="display: inline-flex;margin-left:30px;width:45%;">
                  <span style="width:130px;">企业资质编号：</span>
                  <span>{{companyQualificationCode}}</span>
                </div>
              </div>
            </div>
            <!--企业资质  -->
            <div class="noteBox">
              <div class="noteContent">
                <div class="noteLeft">企业资质：</div>
                <div class="noteFlex">
                  <span>{{companyQualification}}</span>
                </div>
              </div>
            </div>
            <!--项目负责人及项目负责人专业  -->
            <div class="noteBox">
              <div class="noteContent">
                <div class="noteLeft">项目负责人：</div>
                <div class="noteFlex">
                  <span>{{projectLeader}}</span>
                </div>
                <div style="display: inline-flex;margin-left:30px;">
                  <span style="width:150px;">项目负责人专业：</span>
                  <span style="width:230px;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">{{projectLeaderMajor}}</span>
                </div>
              </div>
            </div>
            <!-- 企业负责人.投标联系人 -->
            <div class="noteBox">
              <div class="noteContent">
                <div class="noteLeft">企业负责人：</div>
                <div class="noteFlex">
                  <span>{{conpanyLeader}}</span>
                </div>
                <div style="display: inline-flex;margin-left:30px;;width:45%;">
                  <span style="width:100px;">投标联系人：</span>
                  <span>{{bidContacts}}</span>
                </div>
              </div>
            </div>
            <!-- 公司电话.手机 -->
            <div class="noteBox">
              <div class="noteContent">
                <div class="noteLeft">公司电话：</div>
                <div class="noteFlex">
                  <span>{{companyPhone}}</span>
                </div>
                <div style="display: inline-flex;margin-left:30px;;width:45%;">
                  <span style="width:100px;">联系手机：</span>
                  <span>{{telephone}}</span>
                </div>
              </div>
            </div>
            <!-- 传真.Email -->
            <div class="noteBox">
              <div class="noteContent">
                <div class="noteLeft">传真：</div>
                <div class="noteFlex">
                  <span>{{fax}}</span>
                </div>
                <div style="display: inline-flex;margin-left:30px;;width:45%;">
                  <span style="width:100px;">Email：</span>
                  <span>{{email}}</span>
                </div>
              </div>
            </div>
            <!-- 是否联合体报名 -->
            <div class="noteBox">
              <div class="noteContent">
                <div class="noteLeft">是否联合体报名：</div>
                <div class="noteFlex">
                  <span>{{isComboApply}}</span>
                </div>
              </div>
            </div>
          </el-collapse-item>
          <!-- 第三步 -->
          <el-collapse-item title="报名其他材料" name="3">
            <div class="new_m_b">
              <div class="new_m_b2">
                <el-table :data="enclosureData" stripe style="width: 100%">
                  <el-table-column prop="appendixName" label="附件名称" width="150">
                  </el-table-column>
                  <el-table-column label="附件列表(点击查看)" prop="list">
                    <template slot-scope="scope">
                      <li>
                      </li>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </div>
          </el-collapse-item>
          <!-- 第四步 -->
          <el-collapse-item title="投标保证金缴纳记录" name="4">
            <!-- 缴纳时间 -->
            <div class="noteBox">
              <div class="noteContent">
                <div class="noteLeft">缴纳时间：</div>
                <div class="noteFlex">
                  <span>{{payTenderFeeTime}}</span>
                </div>
              </div>
            </div>
            <!-- 缴纳金额 -->
            <div class="noteBox">
              <div class="noteContent">
                <div class="noteLeft">缴纳金额(元)：</div>
                <div class="noteFlex">
                  <span>{{payDepositAmount}}</span>
                </div>
              </div>
            </div>
            <!-- 备注 -->
            <div class="noteBox">
              <div class="noteContent">
                <div class="noteLeft">备注：</div>
                <div class="noteFlex">
                  <span>{{payDepositRemark}}</span>
                </div>
              </div>
            </div>
            <!-- 表格 -->
            <div class="new_m_b2">
                <el-table :data="paymentData" stripe style="width: 100%">
                  <el-table-column prop="appendixName" label="附件名称" width="150">
                  </el-table-column>
                  <el-table-column label="附件列表(点击查看)" prop="list">
                    <template slot-scope="scope">
                      <li>
                      </li>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
          </el-collapse-item>
        </el-collapse>
      </div>
    </div>
    <!-- 添加投标信息弹框 -->
    <div class="mask"  v-show="addShow"></div>
    <div class="new_pro" v-show="addShow">
      <div class="new_head_box">
        <div class="new_head">
          <div style="padding-left:10px;">完善投标信息</div>
          <div @click="close()" style="font-size:28px;padding-right:10px;cursor:pointer;">×</div>
        </div>
        <div class="new_nav">
          <button class="nav_co nav_save" @click="submitInfor()">提交</button>
        </div>
      </div>
      <div class="new_main">
        <el-collapse v-model="activeName" accordion>
          <!-- 第一步 -->
          <el-collapse-item title="分包信息" name="1">
            <!-- 分包名称及编号 -->
            <div class="noteBox">
              <div class="noteContent">
                <div class="noteLeft">分包名称：</div>
                <div class="noteFlex">
                  <span>{{subcontractName}}</span>
                </div>
                <div style="display: inline-flex;margin-left:30px;width:45%;">
                  <span style="width:150px;">入场项目分包编号：</span>
                  <span>{{entrySubcontractNumber}}</span>
                </div>
              </div>
            </div>
            <!--招标方式及采购人  -->
            <div class="noteBox">
              <div class="noteContent">
                <div class="noteLeft">招标方式：</div>
                <div class="noteFlex">
                  <span>{{biddingProcurementMode}}</span>
                </div>
                <div style="display: inline-flex;margin-left:30px;;width:45%;">
                  <span style="width:100px;">招标(采购)人：</span>
                  <span>{{nameOfPurchaser}}</span>
                </div>
              </div>
            </div>
            <!--项目负责人  -->
            <div class="noteBox">
              <div class="noteContent">
                <div class="noteLeft">项目负责人：</div>
                <div class="noteFlex">
                  <span>{{projectLeader}}</span>
                </div>
              </div>
            </div>
            <!-- 报名截止时间.企业资质要求 -->
            <div class="noteBox">
              <div class="noteContent">
                <div class="noteLeft">报名截止时间：</div>
                <div class="noteFlex">
                  <span>{{enrollEndTime}}</span>
                </div>
                <div style="display: inline-flex;margin-left:30px;;width:45%;">
                  <span style="width:130px;">企业资质要求：</span>
                  <span>{{companyQualifications}}</span>
                </div>
              </div>
            </div>
            <!-- 项目负责人资质要求 -->
            <div class="noteBox">
              <div class="noteContent">
                <div class="noteLeft">项目负责人资质要求：</div>
                <div class="noteFlex">
                  <span>{{managerQualifications}}</span>
                </div>
              </div>
            </div>
          </el-collapse-item>
          <!-- 第二步 -->
          <el-collapse-item title="投标报名(供应商)人信息" name="2">
            <!--企业名称  -->
            <div class="noteBox">
              <div class="noteContent">
                <div class="noteLeft">企业名称：</div>
                <div class="noteFlex">
                  <span>{{companyName}}</span>
                </div>
              </div>
            </div>
            <!-- 企业组织机构代码及企业资质编号 -->
            <div class="noteBox">
              <div class="noteContent">
                <div class="noteLeft">企业组织机构代码：</div>
                <div class="noteFlex">
                  <span>{{organizationCode}}</span>
                </div>
                <div style="display: inline-flex;margin-left:30px;;width:45%;">
                  <span style="width:130px;">企业资质编号：</span>
                  <span>{{companyQualificationCode}}</span>
                </div>
              </div>
            </div>
            <!--企业资质  -->
            <div class="noteBox">
              <div class="noteContent">
                <div class="noteLeft">企业资质：</div>
                <div class="noteFlex">
                  <span>{{companyQualification}}</span>
                </div>
              </div>
            </div>
            <!--项目负责人及项目负责人专业  -->
            <div class="noteBox">
              <div class="noteContent">
                <div class="noteLeft">项目负责人：</div>
                <div style="display:flex;">
                  <span style="width:300px;margin-right:20px;">{{projectLeader}}</span>
                  <el-button @click="chooseList()">选择</el-button>
                </div>
                <div style="display: inline-flex;margin-left:50px;;width:45%;">
                  <span style="width:150px;">项目负责人专业：</span>
                  <span style="width:300px;margin-right:20px;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">{{projectLeaderMajor}}</span>
                  <el-button @click="emptyList()">清空</el-button>
                </div>
              </div>
            </div>
            <!-- 企业负责人.投标联系人 -->
            <div class="noteBox">
              <div class="noteContent">
                <div class="noteLeft">企业负责人：</div>
                <div class="noteFlex">
                  <el-input v-model="conpanyLeader"></el-input>
                </div>
                <div style="display: inline-flex;margin-left:30px;;width:45%;">
                  <span style="width:130px;"><span style="color:#f00;">*</span>投标联系人：</span>
                  <el-input v-model="bidContacts"></el-input>
                </div>
              </div>
            </div>
            <!-- 公司电话.手机 -->
            <div class="noteBox">
              <div class="noteContent">
                <div class="noteLeft">公司电话：</div>
                <div class="noteFlex">
                  <el-input v-model="companyPhone"></el-input>
                </div>
                <div style="display: inline-flex;margin-left:30px;;width:45%;">
                  <span style="width:100px;"><span style="color:#f00;">*</span>联系手机：</span>
                  <el-input v-model="telephone"></el-input>
                </div>
              </div>
            </div>
            <!-- 传真.Email -->
            <div class="noteBox">
              <div class="noteContent">
                <div class="noteLeft">传真：</div>
                <div class="noteFlex">
                  <el-input v-model="fax"></el-input>
                </div>
                <div style="display: inline-flex;margin-left:30px;;width:45%;">
                  <span style="width:100px;"><span style="color:#f00;">*</span>Email：</span>
                  <el-input v-model="email"></el-input>
                </div>
              </div>
            </div>
            <!-- 是否联合体报名 -->
            <div class="noteBox">
              <div class="noteContent">
                <div class="noteLeft">是否联合体报名：</div>
                <div class="noteFlex">
                  <el-radio-group v-model="isComboApply" @change="changeApply()">
                    <el-radio label="是">是</el-radio>
                    <el-radio label="否">否</el-radio>
                  </el-radio-group>
                </div>
              </div>
            </div>
            <!-- 当为是的时候出现 -->
            <div class="noteBox" v-show="isYesShow">
              <div class="noteContent">
                <div class="noteLeft">联合体信息：</div>
                <div class="noteFlex">
                  <el-input type="textarea" v-model="comboApplyInfor"></el-input>
                </div>
              </div>
            </div>
          </el-collapse-item>
          <!-- 第三步 -->
          <el-collapse-item title="报名其他材料" name="3">
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
        </el-collapse>
      </div>
    </div>
    <!-- 选择项目负责人弹框 -->
    <div class="mask1"  v-show="chooseShow"></div>
    <div class="choose_box" v-show="chooseShow">
      <div class="new_head">
          <div style="padding-left:10px;">人员列表</div>
          <div @click="closeFile()" style="font-size:28px;padding-right:10px;cursor:pointer;">×</div>
      </div>
      <div class="head_bottom">
        <span class="head_b_b">姓名：<el-input v-model="name" placeholder="请输入内容" @keyup.enter.native="searchPeopleList"></el-input></span>
        <span><button class="btn" @click="searchPeopleList()">搜索</button></span>
      </div>
      <div>
        <el-table :data="chooseData" style="width: 100%" >
          <el-table-column type="index" width="70" label="序号" :index="typeIndex">
          </el-table-column>
          <el-table-column prop="name" label="姓名">
          </el-table-column>
          <el-table-column  prop="professionalCertificateNumber" label="专业证明及编号" width="250">
          </el-table-column>
          <el-table-column  prop="projectNum" label="在施项目">
          </el-table-column>
          <el-table-column prop="operation" label="选择">
              <template slot-scope="scope">
                <i class="el-icon-plus" style="cursor:pointer;" @click="addChooseFile(scope.row)"></i>
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
import baseUrl from '../../api/api'
import {isPoneAvailable} from '../../api/base.js'
import dayjs from "dayjs";
export default {
  components:{},
  props:{},
  data(){
    return {
      projectObj:JSON.parse(window.localStorage.projectObj),
      entryName:'',//搜索的招标项目名称
      myTime:dayjs().format('YYYY-MM-DD HH:mm:ss'),//当前的时间
      bidState:'',//头部搜索单选框按钮
      radio:'',//投标单选框按钮
      nameOfTenderProject:'',//招标项目名称
      totalProjectId:'',//入场项目分包编号
      tableData:[],//主体数据
      currentPage:1,//当前页
      pagesize:10, //每页条数
      pageTotal: 0, //总页数
      totalSize: 0, //总条数
      submitBox:false,//提交弹框
      show:false,//查看投标信息弹框
      addShow:false,//添加投标信息弹框
      chooseShow:false,//项目负责人挑选弹框
      fileShow:false,//上传文件弹框
      isYesShow:false,//当点击是的按钮的时候显示
      activeName:'2',
      endTime:'',//报名截止时间
      deadlineTime:'',//定义的截止时间
      enclosureData:[//其他报名材料
        {
          appendixName:'其他投标材料',
          attachlist:[]
        }
      ],
      paymentData:[//投标保证金缴纳凭证
        {
          appendixName:'投标保证金缴纳凭证',
          attachlist:[]
        }
      ],
      state:'',//定义的状态
      fileData:[],//上传文件数据
      companyName:'',//企业名称
      organizationCode:'',//企业机构组织代码
      companyQualificationCode:'',//企业资质编号
      companyQualification:'',//企业资质
      projectLeader:'',//项目负责人
      projectLeaderMajor:'',//项目负责人专业
      conpanyLeader:'',//企业负责人
      bidContacts:'',//投标联系人
      companyPhone:'',//公司电话
      telephone:'',//联系手机
      fax:"",//传真
      email:'',//email
      isComboApply:'',//是否联合体报名
      subcontractName:'',//分包名称
      entrySubcontractNumber:'',//入场项目分包编号
      nameOfPurchaser:'',//招标采购人
      biddingProcurementMode:'',//招标方式
      projectLeader:'',//项目负责人
      enrollEndTime:'',//报名截止时间
      companyQualifications:'',//企业资质要求
      managerQualifications:'',//项目负责人资质要求
      payTenderFeeTime:'',//缴纳时间
      payDepositAmount:'',//缴纳金额
      payDepositRemark:'',//备注
      EntrySubNum:'',//传参分包
      items:[],//投标报名资质条件返回的items
      name:'',//姓名
      chooseData:[],//挑选人员数据
      userId:'',//企业信息返回的id
      comboApplyInfor:'',//联合体信息
      bidInfor:'',//点击添加返回的id,
      totalId:'',//点击添加返回的编号
    }
  },
  watch:{},
  computed:{},
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
                
            }else{
                console.log(res.data.msg);
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
            // this.EntrySubNum = "R190301ZG0002-04";
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
              res.data.data.map((item,index)=>{
                this.subcontractName = item.subcontractName;
                this.entrySubcontractNumber = item.entrySubcontractNumber;
              })
              
            }else{
                console.log(res.data.msg);
            }
        }).catch(err=>{
            console.log(err)
        })
    },
    //投标报名资质条件
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
        method:'POST',
        url:baseUrl + '/tenderNoticeController/select',
        data:object
      }).then(res=>{
        if(res.data.status == 200){
          res.data.data.map((item,index)=>{
            this.items = item.items;
            this.projectLeader = item.projectLeader
            if(item.enrollEndTime == null){
              this.enrollEndTime = ""
            }else{
              this.enrollEndTime = dayjs(item.enrollEndTime).format('YYYY-MM-DD HH:mm:ss')
            }
          });
          this.items.map((itema,index)=>{
            if(this.projectObj.totalProjectId == itema.entrySubcontractNumber || this.projectObj.totalProjectId == itema.projectCode){
              this.companyQualifications = itema.companyQualifications;
              this.managerQualifications = itema.managerQualifications;
            }
          })
        }else{
          console.log(res.data.msg)
        }
      }).catch(err=>{
        console.log(err)
      })
    },
    //头部搜索
    changeRadio(){
      this.$axios({
        method:'POST',
        url:baseUrl + '/projectInformationController/selfTenderListForBidInfor',
        data:{
          pageSize:this.pagesize,
          pageNo:this.currentPage,
          bidState:this.bidState
        }
      }).then(res=>{
        if(res.data.status == 200){
          this.tableData = res.data.data.data;
          this.tableData.map((item,index)=>{
            this.state = item.bidState;
            if(item.endTime == null){
              item.endTime = ""
            }else{
              item.endTime = dayjs(item.endTime).format('YYYY-MM-DD HH:mm:ss');
            }
          })
        }else{
          console.log(res.data.msg)
        }
      }).catch(err=>{
        console.log(err)
      })
    },
    //搜索
    searchList(){
      this.$axios({
        method:'POST',
        url:baseUrl + '/projectInformationController/selfTenderListForBidInfor',
        data:{
          pageSize:this.pagesize,
          pageNo:this.currentPage,
          nameOfTenderProject:this.entryName,
          totalProjectId:this.totalProjectId,
        }
      }).then(res=>{
        if(res.data.status == 200){
          this.tableData = res.data.data.data;
          this.tableData.map((item,index)=>{
            this.state = item.bidState;
            if(item.endTime == null){
              item.endTime = ""
            }else{
              item.endTime = dayjs(item.endTime).format('YYYY-MM-DD HH:mm:ss');
            }
          })
        }else{
          console.log(res.data.msg)
        }
      }).catch(err=>{
        console.log(err)
      })
    },
    //获取查询数据
    getList(){
      this.$axios({
        method:'POST',
        url:baseUrl + '/projectInformationController/selfTenderListForBidInfor',
        data:{
          pageSize:this.pagesize,
          pageNo:this.currentPage
        }
      }).then(res=>{
        if(res.data.status == 200){
          this.tableData = res.data.data.data;
          this.tableData.map((item,index)=>{
            this.state = item.bidState;
            if(item.endTime == null){
              item.endTime = ""
            }else{
              item.endTime = dayjs(item.endTime).format('YYYY-MM-DD HH:mm:ss');
            }
          })
          this.totalSize = this.tableData[0].total;
        }else{
          console.log(res.data.msg)
        }
      }).catch(err=>{
        console.log(err)
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
    //获取企业信息
    getCompanyList(){
      this.$axios({
        method:'POST',
        url:baseUrl + '/userController/selectByPersonnelId',
        data:{
          personnelId:'test'
        }
      }).then(res=>{
        if(res.data.status == 200){
          this.userId = res.data.data.userId;
          this.companyName = res.data.data.companyName;
          this.organizationCode = res.data.data.organizationCode;
          this.companyQualificationCode = res.data.data.companyQualificationCode;
          this.companyQualification = res.data.data.companyQualification;
        }else{
          console.log(res.data.msg)
        }
      }).catch(err=>{
        console.log(err)
      })
    },
    //是否联合体报名点击为是的时候出现
    changeApply(){
      if(this.isComboApply == "是"){
        this.isYesShow = true;
      }else{
        this.isYesShow = false;
      }
    },
    //查看弹框
    lookFile(row){
      this.show = true;
      this.getCompanyList();
      this.getTenderInfo();
      this.uploadList();
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
              this.payDepositTime = dayjs(res.data.data.payDepositTime).format('YYYY-MM-DD HH:mm:ss');// 保证金缴纳时间
              this.payDepositRemark = res.data.data.payDepositRemark;// 保证金缴纳备注信息
          }else{
              console.log(res.data.msg);
          }
      }).catch(err=>{
          console.log(err)
      })
    },
    //添加弹框
    addFile(row){
      this.addShow = true;
      this.getCompanyList();
      this.getTenderInfo();
      this.projectLeader = "";
      this.projectLeaderMajor = "";
      this.bidInfor = row.bidInforId;
      this.totalId = row.totalProjectId;
    },
    //点击提交按钮
    submitInfor(){
      this.submitBox = true;
    },
    submitSave(){
      this.$axios({
        method:'POST',
        url:baseUrl + '/bidInforController/save',
        data:{
          bidInforId:this.bidInfor,
          projectCode:this.totalId,
          entrySubcontractNumber:this.entrySubcontractNumber,
          projectLeader:this.projectLeader,
          projectLeaderMajor:this.projectLeaderMajor,
          conpanyLeader:this.conpanyLeader,
          bidContacts:this.bidContacts,
          companyPhone:this.companyPhone,
          telephone:this.telephone,
          fax:this.fax,
          email:this.email,
          isComboApply:this.isComboApply,
          comboApplyInfor:this.comboApplyInfor
        }
      }).then(res=>{
        console.log(res.data.data)
        if(res.data.status == 200){
          this.submitBox = false;
          this.addShow = false;
        }else{
          console.log(res.data.msg)
        }
      }).catch(err=>{
        console.log(err)
      })
    },
    //选择项目负责人按钮
    chooseList(){
      this.chooseShow = true;
      this.searchPeopleList();
    },
    //清空项目负责人及专业
    emptyList(){
      this.projectLeader = '';// 项目负责人
      this.projectLeaderMajor = '';// 项目负责人专业
    },
    //选择人员弹框列表
    searchPeopleList(){
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
              this.chooseData = res.data.data.list;
          }else{
              console.log(res.data.msg);
          }
      }).catch(err=>{
          console.log(err)
      })
    },
    //点击选择加号到外面的输入框
    addChooseFile(row){
      this.chooseShow = false;
      this.projectLeaderMajor = row.professionalCertificateNumber;// 专业及证书编号
      this.projectLeader = row.name;// 姓名
      this.chooseData = [];
    },
    //上传文件
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
      formData.append("projectId", this.totalId);
      formData.append("file", this.files);
      formData.append("user", '张三');
      formData.append("fileType", '其他投标材料');
      
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
            relevanceCorrelationId:this.totalId,
            fileType:'其他投标材料'
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
    //关闭弹框
    close(){
      this.show = false;
      this.addShow = false;
      
    },
    closeFile(){
      this.fileShow = false;
      this.chooseShow = false;
    },
    handleClose(){
      this.submitBox = false;
    }
  },
  created(){
    this.getList();
    this.getbiddingInfo();
    this.getsubList();
  },
  mounted(){}
}
</script>
<style scoped>
.myDiv {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: auto;
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
.pagination {
  width: 100%;
  margin: 30px 0;
  text-align: right;
  position: fixed;
  right: 0;
  bottom: 10px;
  margin-right: 30px;
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
  z-index: 9;
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
  padding:0 40px;
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
  .choose_box{
  width: 65%;
  height:600px;
  z-index: 11;
  background: #ffffff;
  position: absolute;
  left: 50%;
  top:50%;
  transform: translate(-50%,-50%);
  overflow-y: hidden;
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
.upload:hover{
    text-decoration: underline;
    color:#f00;
    cursor: pointer;
  }
</style>