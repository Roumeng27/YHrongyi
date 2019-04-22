<template>
  <div class="myDiv">
      <div class="div_box">
          <div class="type_head">
            请选择主体类型登录&ensp;<span style="color:#53AEE0;font-size:14px;cursor: pointer;" @click="tuichu()">[退回登录]</span>
          </div>
         <div>
             <div class="type_main_t">
                <div class="type_m_l" @click="comeIn()">招标(采购)人登录</div>
                <div  class="type_m_r" @click="comeIn()">招标(采购)代理登录</div>
             </div>
            <div class="type_main_t2">
                <div class="type_m_b" @click="enter()">投标(供应商)人登录</div>    
            </div>
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
    }
  },
  watch:{},
  computed:{},
  methods:{
      comeIn(){
          this.$router.push({
              path:'/projectType'
          })
      },
      enter(){
          this.$router.push({
              path:"/home"
          })
      },
      //退出登录
    tuichu(){
        this.$router.push({
            path:"/login"
        })
    }
  },
  created(){},
  mounted(){}
}
</script>
<style scoped>
.myDiv{
    width: 100%;
    height: 100%;
    background-color: #fff;
}
.div_box{
    width: 80%;
    margin: 0 auto;
}
/* 头部 */
.type_head{
    height: 60px;
    line-height: 60px;
    border-bottom: 1px solid #53aee0;
    font-size: 18px;
    margin-bottom: 3%;
}
/*主体 */
.type_main_t{
    height: 245px;
    line-height: 245px;
    color: #fff;
    font-size: 32px;
    font-family: "微软雅黑";
    text-align: center;
}
.type_m_l,.type_m_r{
    width: 49%;
     cursor: pointer;
}
.type_m_l{
    float: left;
    background: #fcb100;
}
.type_m_r{
    float: right;
    background: #38a3db;
}
.type_main_t2{
    height: 245px;
    line-height: 245px;
    color: #fff;
    font-size: 32px;
    font-family: "微软雅黑";
    text-align: center;
    margin-top:2%;
}
.type_m_b{
    width: 49%;
    background: #0066b7;
     cursor: pointer;
}
</style>