<template>
    <div class="myDiv">
        <!-- 头部 -->
        <div class="head_box">
          <div class="head_l" @click="newManage()">新建单位</div>
          <div class="head_l" @click="deletePro()">删除单位</div>
        </div>
        <div class="head_bottom">
          <span class="head_b_b">单位名称：<el-input v-model="unitName" @keyup.enter.native="searchList()"  placeholder="请输入内容"></el-input></span>
          <span class="head_b_b">组织机构代码：<el-input v-model="orgCode"  @keyup.enter.native="searchList()"  placeholder="请输入内容"></el-input></span>
          <span>单位类型:
              <el-select v-model="roleTypeData" clearable placeholder="请选择"  @keyup.enter.native="searchList()">
                <el-option v-for="item in UnitTypeData" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
            </el-select>
          </span>   
          <span><button class="btn" @click="searchList()">搜索</button></span>
        </div>
        <!-- 主体表格 -->
        <div class="warp_main">
            <el-table :data="tableData" stripe style="width: 100%" @selection-change="handleSelectionChange">
                <el-table-column  type="selection" width="55">
                </el-table-column>
                <el-table-column type="index" width="70" label="序号" :index="typeIndex">
                </el-table-column>
                <el-table-column prop="organizationCode" label="组织机构代码" width="180">
                </el-table-column>
                <el-table-column prop="companyName" label="单位名称" width="180">
                </el-table-column>
                <el-table-column prop="registeredArea" label="注册所在地">
                </el-table-column>
                <el-table-column prop="companyType" label="单位类型">
                </el-table-column>
                <el-table-column fixed="right" label="修改" width="100">
                    <template slot-scope="scope">
                        <i class="el-icon-edit"  style="cursor: pointer;" @click="modifyOpen(scope.row)"></i>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <!-- 新增单位信息 -->
        <div class="mask" v-show="show"></div>
        <div class="new_pro" v-show="show">
            <div class="new_head_box">
                <div class="new_head">
                    <div style="padding-left:10px;">新增单位信息</div>
                    <div @click="close()" style="font-size:28px;padding-right:10px;cursor:pointer;">×</div>
                </div>
                <div class="new_nav">
                    <button class="nav_co nav_save" @click="saveData()">保存</button>
                </div>
            </div>
            <!-- z新增主体 -->
            <div class="new_main">
                <el-collapse v-model="activeName" accordion>
                    <!-- 第一步 -->
                    <el-collapse-item title="单位基本信息" name="1">
                        <div class="new_m_b">
                            <div class="new_m_b2">
                                <!--名称  -->
                                <div class="noteBox">
                                    <div class="noteContent">
                                        <div class="noteLeft"><span style="color:#f00;">*</span>单位名称：</div>
                                        <div class="noteFlex">
                                            <el-input v-model="companyName"></el-input>
                                        </div>
                                    </div>
                                </div>
                                <!--织机构代码及地区  -->
                                <div class="noteBox">
                                    <div class="noteContent">
                                        <div class="noteLeft"><span style="color:#f00;">*</span>组织机构代码：</div>
                                        <div class="noteFlex">
                                            <el-input v-model="organizationCode"></el-input>
                                        </div>
                                        <div style="display: inline-flex;margin-left:30px;width:50%;">
                                            <span style="width:130px;"><span style="color:#f00;">*</span>单位注册地区:</span>
                                            <el-cascader :options="addressData" v-model="localName" @change="handleChange" ref="addArr">
                                            </el-cascader>
                                        </div>
                                    </div>
                                </div>
                                <!-- 单位类型 -->
                                <div class="noteBox">
                                    <div class="noteContent">
                                        <div class="noteLeft"><span style="color:#f00;">*</span>单位类型：</div>
                                        <div class="noteFlex">
                                             <el-checkbox-group v-model="roleTypeB" >
                                                <el-checkbox label="招标(采购)代理"></el-checkbox>
                                                <el-checkbox label="投标(供应商)人"></el-checkbox>
                                            </el-checkbox-group>
                                        </div>
                                    </div>
                                </div>
                                <!-- 申请锁 -->
                                <div class="noteBox">
                                    <div class="noteContent">
                                        <div class="noteLeft">申请锁：</div>
                                        <div class="noteFlex">
                                            <span>主锁1个，副锁 <input class="inputk" v-model="applicationLock" /> 个</span>
                                        </div>
                                    </div>
                                </div>
                                <!-- 联系人及方式 -->
                                <div class="noteBox">
                                    <div class="noteContent">
                                        <div class="noteLeft">联系人：</div>
                                        <div class="noteFlex">
                                            <el-input v-model="contacts"></el-input>
                                        </div>
                                        <div style="display: inline-flex;margin-left:30px;width:50%;">
                                            <span style="width:100px;">联系电话:</span>
                                            <el-input v-model="contactsPhone" @blur="blurPhone()"></el-input>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </el-collapse-item>
                </el-collapse>
            </div>
        </div>
        <!-- 修改信息 -->
        <div class="mask1" v-show="modifyShow"></div>
        <div class="new_pro" v-show="modifyShow">
            <div class="new_head_box">
                <div class="new_head">
                    <div style="padding-left:10px;">修改单位信息</div>
                    <div @click="closeModify()" style="font-size:28px;padding-right:10px;cursor:pointer;">×</div>
                </div>
                <div class="new_nav">
                    <button class="nav_co nav_save" @click="editSave">保存</button>
                </div>
            </div>
            <!-- z修改主体 -->
            <div class="new_main">
                <el-collapse v-model="activeName" accordion>
                    <!-- 第一步 -->
                    <el-collapse-item title="单位基本信息" name="1">
                        <div class="new_m_b">
                            <div class="new_m_b2">
                                <!--名称  -->
                                <div class="noteBox">
                                    <div class="noteContent">
                                        <div class="noteLeft"><span style="color:#f00;">*</span>单位名称：</div>
                                        <div class="noteFlex">
                                            <el-input v-model="companyName"></el-input>
                                        </div>
                                    </div>
                                </div>
                                <!--织机构代码及地区  -->
                                <div class="noteBox">
                                    <div class="noteContent">
                                        <div class="noteLeft"><span style="color:#f00;">*</span>组织机构代码：</div>
                                        <div class="noteFlex">
                                            <el-input v-model="organizationCode"></el-input>
                                        </div>
                                        <div style="display: inline-flex;margin-left:30px;width:50%;">
                                            <span style="width:130px;"><span style="color:#f00;">*</span>单位注册地区:</span>
                                            <el-cascader v-model="localName" :options="addressData" @change="handleItemChange" ref="cascaderArr">
                                            </el-cascader>
                                        </div>
                                    </div>
                                </div>
                                <!-- 单位类型 -->
                                <div class="noteBox"  v-if="showFlag">
                                    <div class="noteContent">
                                        <div class="noteLeft"><span style="color:#f00;">*</span>单位类型：</div>
                                        <div class="noteFlex">
                                           <el-checkbox-group v-model="roleTypeB">
                                                <el-checkbox :checked="this.comRoleType == '招标(采购)代理' || this.comRoleType == '招标(采购)代理,投标(供应商)人'" label="招标(采购)代理"></el-checkbox>
                                                <el-checkbox :checked="this.comRoleType == '投标(供应商)人' || this.comRoleType == '招标(采购)代理,投标(供应商)人'" label="投标(供应商)人"></el-checkbox>
                                            </el-checkbox-group>
                                        </div>
                                    </div>
                                </div>
                                <!-- 联系人及方式 -->
                                <div class="noteBox">
                                    <div class="noteContent">
                                        <div class="noteLeft">联系人：</div>
                                        <div class="noteFlex">
                                            <el-input v-model="contacts"></el-input>
                                        </div>
                                        <div style="display: inline-flex;margin-left:30px;width:50%;">
                                            <span style="width:100px;">联系电话:</span>
                                            <el-input v-model="contactsPhone" @blur="blurPhone()"></el-input>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </el-collapse-item>
                </el-collapse>
            </div>
        </div>
        <!-- 删除弹框点击确定方可删除 -->
        <el-dialog
            title="系统提示"
            :visible.sync="flag"
            width="40%"
            :before-close="handleClose">
            <div class="icon">
                <i class="el-icon-question"></i>
                <span>您确定删除选中的主体注册吗?</span>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="deleteManage()">确 定</el-button>
                <el-button type="primary" @click="flag = false">取消</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import baseUrl from '../../../api/api'
import '../../../assets/css/style.css'
import {isPoneAvailable} from '../../../api/base.js'
export default {
    data(){
        return {
            showFlag:true,//单位类型
            companyName:'',//单位名称
            organizationCode:'',//组织机构代码
            registeredArea:[],//注册所在地
            roleType:'',//单位类型
            UnitTypeData:[],//单位类型数组
            roleTypeData:'',//查询中的v-model单位类型
            orgCode:'',//查询中的v-model单位组织机构
            unitName:'',//查询中的v-model单位名称
            currentPage:'1',//第一页
            tableData: [],
            show:false, //新增
            modifyShow:false, //修改
            flag:false,//删除弹框
            activeName:'1',
            addressData:[],//单位注册地区
            localName:[],//项目所在地v-model
            contacts:'',//联系人
            applicationLock:'',//单位锁
            contactsPhone:'',//联系电话
            roleTypeB:[],//数组单位类型新增
            userId:'',//keyId
            typeDatas:[],//新增单位类型data值
            companyType:'',
            checkedList:[],
            checkedArr:[],
            comRoleType:'',//修改中的chekced
        }
    },
    created () {
        this.getDataList();
        this.UnitTypeList();
    },
    methods: {
        //获取列表数据
        getDataList(){
            this.$axios({
                method: "POST",
                url: baseUrl+"/userController/selectList",
                data:{
                    companyName:'',
                    organizationCode:'',
                    companyType:''
                }
            }).then(res=>{
                if(res.data.data.status == 200){
                    this.tableData = res.data.data.data;
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
        // 修改
        handleItemChange(){
            this.registeredArea = this.$refs['cascaderArr'].currentLabels;
        },
        // 新增
        handleChange(){
            this.registeredArea = this.$refs['addArr'].currentLabels;
        },
        //获取单位类型接口
        UnitTypeList(){
            this.$axios({
                method:'POST',
                url:baseUrl+'/interfaceTableController/selectByname',
                data:{
                    dropDownBox:'单位类型'
                }
            }).then(res=>{
                if(res.data.data.status == 200){
                    this.organizaData = res.data.data.data;
                    this.biddingOrganization = res.data.data.data[1].value;
                }else{
                    this.$layer.msg(res.data.msg);
                }
            }).catch(err=>{
                console.log(err)
            })
        },
        //搜索
        searchList(){
            this.$axios({
                method: "POST",
                url: baseUrl+"/userController/selectList",
                data:{
                    companyName:this.unitName,
                    organizationCode:this.orgCode,
                    companyType:this.roleTypeData
                }
            }).then(res=>{
                if(res.data.data.status == 200){
                    this.tableData = res.data.data.data
                }else{
                    this.$layer.msg(res.data.msg);
                }
            }).catch(err=>{
                console.log(err)
            })
        },
        //新增项目
        newManage(){
            this.show = !this.show;
            this.addressList();
            this.companyName = "";
            this.organizationCode = "";
            this.registeredArea = [];
            this.roleTypeB = [];
            this.applicationLock = "";
            this.contacts = "";
            this.contactsPhone = "";
            this.localName = [];
        },
        close(){
             this.show = !this.show;
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
        //新增中的保存数据
        saveData(){
            // if(!this.companyName){
            //     this.$layer.msg('请输入单位名称');
            //     return false;
            // }else if(!this.organizationCode){
            //     this.$layer.msg('请输入组织机构代码');
            //     return false;
            // }else if(!this.localName){
            //     this.$layer.msg('请选择单位注册地区');
            //     return false;
            // }else if(!this.roleTypeB){
            //     this.$layer.msg('请选择单位类型');
            //     return false;
            // }
            this.$axios({
                method:'POST',
                url:baseUrl + '/userController/addUser',
                data:{
                    companyName:this.companyName,
                    organizationCode:this.organizationCode,
                    registeredArea:this.registeredArea.toString(),
                    contacts:this.contacts,
                    contactsPhone:this.contactsPhone,
                    applicationLock:this.applicationLock,
                    companyType:this.roleTypeB.join(',')
                }
            }).then(res=>{
                if(res.data.status){
                    this.show = false;
                    this.getDataList();
                }else{
                    this.$layer.msg(res.data.msg);
                }
            }).catch(err=>{
                console.log(err);
            })
        },
        //校验手机号联系方式
        blurPhone(){
            if(!isPoneAvailable(this.contactsPhone)){
                this.$layer.msg('请输入正确的联系方式');
            }
        },
       
        handleSelectionChange(val){
            let deleteArr = [];
            for(let i in val){
                deleteArr.push(val[i].userId);
            }
            this.userId = deleteArr;
        },
        handleClose(done) {
            console.log(done)
        },
        //点击删除出现确定弹框
        deletePro(){
            if(this.userId.length <= 0){
                this.$layer.msg('请选择您要删除的项目')
            }else{
                this.flag = true;
            }
        },
        //删除项目
        deleteManage(){
            this.$axios({
                method:'POST',
                url:baseUrl + '/userController/deleteById',
                data:{
                    userId:this.userId
                }
            }).then(res=>{
                if(res.data.status){
                    this.flag = false;
                    for (let i=0; i<this.tableData.length; i++) {  
                        for (let j=0; j<this.userId.length; j++) {
                            if (this.tableData[i].userId == this.userId[j]) {  
                                this.tableData.splice(i, 1);    
                            }  
                        } 
                    }  
                    this.getDataList();
                }else{
                   this.$layer.msg(res.data.msg);
                }
            }).catch(err=>{
                console.log(err);
            })
        },
        //修改信息弹框
        modifyOpen(row){
            this.addressList();
            this.modifyShow = true;
            this.showFlag = true;
            this.companyName=row.companyName,
            this.organizationCode = row.organizationCode,
            this.localName = row.registeredArea.split(','),
            this.contacts = row.contacts,
            this.contactsPhone = row.contactsPhone,
            this.roleTypeB = row.companyType.split(','),
            this.comRoleType = this.roleTypeB,
            this.userId = row.userId;
            this.getcheckedList()// 单位类型
        },
        //单位类型
        getcheckedList(){
            this.$axios({
                method:'POST',
                url:baseUrl + '/roleController/selectByRoleType',
                data:{
                    roleType:'单位类型'
                }
            }).then(res=>{
                if(res.data.status){
                    this.checkedList = res.data.data.data
                }else{
                    this.$layer.msg(res.data.msg);
                }
            }).catch(err=>{
                console.log(err);
            })
        },
        // 修改保存
        editSave(){
            this.$axios({
                method:'POST',
                url:baseUrl + '/userController/updateUser',
                data:{
                    userId:this.userId,
                    companyName:this.companyName,
                    organizationCode:this.organizationCode,
                    registeredArea:this.registeredArea.toString(),
                    contacts:this.contacts,
                    contactsPhone:this.contactsPhone,
                    companyType:this.roleTypeB.join(',')
                }
            }).then(res=>{
                if(res.data.status == 200){
                    this.modifyShow = false;
                    this.showFlag = false;
                    this.getDataList();
                }else{
                   this.$layer.msg(res.data.msg);
                }
            }).catch(err=>{
                console.log(err);
            })
        },
        closeModify(){
            this.modifyShow = !this.modifyShow;
        }
    }
}
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
.mask,.mask1{
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
.el-icon-success{
    font-size: 100px;
    color: #0a5e9d;
}
.el-icon-question{
    font-size: 100px;
    color: #0a5e9d;
}
.icon span{
    margin-left: 20px;
    font-size:18px;
}
</style>