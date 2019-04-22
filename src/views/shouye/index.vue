<template>
  <div class="shouye">
      <div style="width:900px;max-height:500px;margin:0 auto;">
          <!--主体上部分 -->
          <div class="main_top">
              <div class="main_t_l">
                  <div class="main_l_head">招标项目列表</div>
                  <ul class="ul_t">
                      <li>[R190201Z07G0018]2112</li>
                      <li>[R190201Z07G0017]0213-01</li>
                      <li>[]000</li>
                      <li>[R190201Z07G0017]0213-01gongkai</li>
                      <li>[R190201Z07G0017]test</li>
                      <li>[R190201Z07G0012]公开招标预审流程测试_地铁</li>
                  </ul>
              </div>
              <div class="main_t_r">
                  <div class="main_l_head">最新消息</div>
              </div>
          </div>
          <!-- 主体下部分 -->
          <div class="main_bottom">
              <div class="main_b_l">
                  <div class="main_l_head">软交所入场项目交易报告</div>
                  <ul class="ul_t">
                      <li>2015年5月软交所入场开评标项目交易统计分析</li>
                      <li>2015年5月软交所入场开评标项目交易统计分析</li>
                      <li>2015年5月软交所入场开评标项目交易统计分析</li>
                  </ul>
              </div>
              <div class="main_b_b">
                  <div class="main_b_m">
                        <div class="main_l_head">开标提醒</div>
                        <ul class="ul_t">
                            <li>离开标还有<span class="big">6</span>天 &emsp;<span class="corlo">第一开标室 09:00-09:15</span></li>
                            <li>2019测试-竞争性谈判招标项目100</li>
                        </ul>
                        <ul class="ul_t">
                            <li>离开标还有<span class="big">6</span>天 &emsp;<span class="corlo">第一开标室 09:00-09:15</span></li>
                            <li>2019测试-竞争性谈判招标项目100</li>
                        </ul>
                  </div>
                  <div class="main_b_r">
                        <div class="main_l_head">数据统计</div>
                        <div style="font-size:12px;">月度信息&emsp;<span style="color:#ccc;">年度信息</span></div>
                        <ul style="font-size:12px;"  class="ul_t">
                            <li>招标项目<span class="big">10</span>个</li>
                            <li>分包<span class="big">10</span>个</li>
                            <li>招标预算<span class="big">29000</span>万元</li>
                        </ul>
                  </div>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
export default {
	name:'Shouye',
    data(){
		return {
			
		}
	},
	created(){
	   
    },
    mounted(){
		
	},
    methods:{
		
	},
    
}
</script>
<style scoped>
.shouye{
  margin-top: 2%;
}
.main_top,
.main_bottom {
  height: 220px;
  display: flex;
  flex: 1;
  justify-content: space-between;
}
.main_t_l,
.main_t_r {
  background-color: #fff;
  width: 48%;
  height: 100%;
  border-top: 3px solid rgb(53, 155, 237);
  padding-left: 1%;
  padding-top: 1%;
  overflow-y: scroll;
}
.ul_t > li {
  padding-top: 10px;
  padding-left: 10px;
}

.main_l_head {
  font-size: 20px;
  color: #359bed;
}
/* 下部分 */
.main_bottom {
  margin-top: 5%;
}
.main_b_l {
  width: 48%;
  height: 100%;
  background-color: #fff;
  border-top: 3px solid rgb(53, 155, 237);
  padding-left: 1%;
  padding-top: 1%;
}
.main_b_b {
  width: 49%;
  height: 100%;
}
.main_b_m,
.main_b_r {
  height: 100%;
  background-color: #fff;
  border-top: 3px solid rgb(53, 155, 237);
  padding-left: 1%;
  padding-top: 1%;
}
.main_b_m {
  float: left;
  width: 64%;
  margin-right: 10px;
}
.main_b_r {
  display: inline-block;
  width: 30%;
}
.big {
  font-size: 26px;
  color: rgb(29, 113, 174);
}
.corlo {
  color: rgb(29, 113, 174);
}
</style>