<template>
  <div class="myDiv">
      <div class="div_box">
          <div class="type_head">
            请选择项目类型
          </div>
          <div class="type_main">
              <div class="type_m_l" @click="enter()">招标投标项目</div>
              <div class="type_m_r" @click="enter()">政府采购项目</div>
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
      enter(){
          this.$router.push({
              path:'/home'
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
/* 主体 */
.type_main{
    color: #fff;
    font-size: 26px;
    font-weight: bolder;
    font-family: "微软雅黑";
    text-align: center;
    /* display: flex;
    flex: 1;
    justify-content: space-around; */
    margin-top: 20%;
}
.type_m_l,.type_m_r{
    display: inline-block;
     height: 150px;
    line-height: 150px;
    width: 25%;
    background: #0095D5;
    cursor: pointer;
}
.type_m_l{
   margin-right: 5%;
}
</style>