<template>
  <div class="myDiv">
    <div class="head_box">
      <span>服务计费规则：</span>   
      <el-select v-model="value" placeholder="请选择">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select> 
    </div>
    <div class="select_box">
      <div class="select_fixed">
          <el-radio v-model="guding" :label="1" @change="changeRadio()">固定价(元)</el-radio>
          <el-input v-model="fixed"></el-input>
      </div>
      <div class="select_fixed">
          <el-radio v-model="guding" :label="2"  @change="changeRadio()">比例价(%)</el-radio>
          <el-input v-model="proportion"></el-input>
      </div>
    </div>
    <div class="total" v-show="countShow">
      未分配金额：****元
    </div>
    <div  class="total" v-show="percentShow">
      未分配百分比：****%
    </div>
    <div class="main_box">
      <div class="new_nav">
          <button class="nav_co nav_save">新增计费点</button>
          <button class="nav_co nav_next">删除计费点</button>
      </div>
      <el-table :data="chargingData" style="width: 100%"  @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align='center'>
        </el-table-column>
        <el-table-column type="index" width="70" label="序号" :index="typeIndex">
        </el-table-column>
        <el-table-column prop="fileName" label="计费点"  width="180">
        </el-table-column>
        <el-table-column  prop="fileSize" label="计费金额(元)/计费比例(%)">
        </el-table-column>
      </el-table>
      <div class="total"  v-show="countShow">
        合计金额:<span>****</span>元
      </div>
      <div class="total"  v-show="percentShow">
        合计百分比:<span>****</span>%
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
      countShow:true,//未分配金额
      percentShow:false,//未分配百分比
      value:'',//计费规则
      options:[//计费规则
        {
          value:'公开招标资格预审',
          label:'公开招标资格预审',
        },
        {
          value:'公开招标资格后审',
          label:'公开招标资格后审',
        },
        {
          value:'邀请招标',
          label:'邀请招标',
        },
        {
          value:'竞争性磋商',
          label:'竞争性磋商',
        }
      ],
      fixed:'',//固定价
      proportion:'',//比例价
      guding:1,//固定比价和比例比价
      chargingData:[],//数据表格
      currentPage:1,//当前页
    }
  },
  watch:{},
  computed:{},
  methods:{
    //编号问题
    typeIndex(index) {
      return index + (this.currentPage - 1) * 8 + 1;
    },
    //判断固定价还是比例价的显示
    getMethodList(){
      if(this.guding == '1'){
        this.countShow = true;
        this.percentShow = false;
      }else{
        this.percentShow = true;
        this.countShow = false;
      }
    },
    changeRadio(){
      if(this.guding == '1'){
        this.countShow = true;
        this.percentShow = false;
      }else{
        this.percentShow = true;
        this.countShow = false;
      }
    },
    handleSelectionChange(){

    }
  },
  created(){
    this.getMethodList();
  },
  mounted(){}
}
</script>
<style scoped>
.myDiv{
  width: 100%;
  height: 100%;
  padding:3%;
}
.select_box{
  margin:15px 0;
}
.select_fixed{
  height: 35px;
  line-height: 35px;
  display: flex;
  justify-content: flex-start;
  margin-bottom: 10px;
}
.el-radio{
  line-height: 2;
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
  margin-top:10px;
}
.total{
  font-size: 16px;
  font-weight: bold;
  margin-top: 10px;
}
</style>