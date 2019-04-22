<template>
    <div class="myDiv">
        <div class="head_bottom">
            <span class="head_b_b">招标项目名称：<el-input v-model="entryName" placeholder="请输入内容"  @keyup.enter.native="searchList"></el-input></span>
            <span class="head_b_b">入场项目(分包)编号：<el-input v-model="totalProjectId" placeholder="请输入内容"  @keyup.enter.native="searchList"></el-input></span>
            <span><button class="btn" @click="searchList()">搜索</button></span>
        </div>
        <!-- 主体 -->
        <div class="table_content">
            <div class="main_box">
                <el-table :data="tableData" stripe style="width: 100%">
                    <el-table-column type="index" width="70" label="序号" :index="typeIndex">
                    </el-table-column>
                    <el-table-column prop="entrySubcontractNumber" label="入场项目(分包)编号" width="170">
                    </el-table-column>
                    <el-table-column prop="nameOfTenderProject" label="招标项目名称">
                    </el-table-column>
                    <el-table-column prop="biddingProjectNumber" label="分包名称">
                    </el-table-column>
                    <el-table-column prop="auditResults" label="资审结果" >
                    </el-table-column>
                    <el-table-column prop="join" label="状态" width="100">
                    </el-table-column>
                    <el-table-column prop="operation" label="操作" width="70"> 
                    <template slot-scope="scope">
                        <i class="el-icon-setting" style="cursor:pointer;" @click="lookFile(scope.row)"></i>
                    </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="pagination">
                <template>
                    <Page :total="totalSize" :current="currentPage" :page-size='8' show-elevator show-total @on-change="page"></Page>
                </template>
            </div>
        </div>
        <!-- 资审结果确认 -->
        <div class="mask" v-show="confirmShow"></div>
        <div  v-show="confirmShow" class="new_pro">
            <div class="new_head_box">
                <div class="new_head">
                    <div style="padding-left:10px;">资审结果确认</div>
                    <div @click="close()" style="font-size:28px;padding-right:10px;cursor:pointer;">×</div>
                </div>
                <div class="new_nav">
                    <button class="nav_co nav_save">确认参加</button>
                    <button class="nav_co nav_save">确认不参加</button>
                </div>
            </div>
            <div class="new_main">
                <el-collapse v-model="activeName" accordion>
                    <!-- 第一步 -->
                    <el-collapse-item title="分包信息" name="1">
                        <div class="noteBox">
                            <div class="noteContent">
                                <div class="noteLeft">分包编号：</div>
                                <div class="noteFlex">
                                    <span>{{entrySubcontractNumber}}</span>
                                </div>
                            </div>
                        </div>
                        <!--招标项目名称  -->
                        <div class="noteBox">
                            <div class="noteContent">
                                <div class="noteLeft">招标项目名称：</div>
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
                                    <span>{{entrySubcontractNumber}}</span>
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
import baseUrl from '../../api/api'
import {isPoneAvailable} from '../../api/base.js'
import dayjs from "dayjs";
export default {
  components:{},
  props:{},
  data(){
    return {
        entrySubcontractNumber:'',
        entryName:'',//搜索入场项目名称
        totalProjectId:'',//搜索入场项目分包编号
        tableData:[],//列表数据
        currentPage:1,//当前页
        pagesize:8, //每页条数
        pageTotal: 0, //总页数
        totalSize: 0, //总条数
        confirmShow:false,
        activeName:'1',
    }
  },
  watch:{},
  computed:{},
  methods:{
    //获取列表
    getList(){
        this.$axios({
            method:'POST',
            url:baseUrl + '/CapitalNotController/myNotice',
            data:{
                pageSize:this.pagesize,
                pageNo:this.currentPage
            }
      }).then(res=>{
          if(res.data.status == 200){
              this.tableData = res.data.data.list;
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
    lookFile(row){
        this.confirmShow = true;
    },
    close(){
        this.confirmShow = false;
    }
  },
  created(){
      this.getList();
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
  .mask {
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
   z-index: 5;
}
.new_pro {
  z-index: 6;
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
</style>