<template>
  <div class="wrapper">
    <div>
      <el-date-picker v-model="time" value-format='timestamp' type="date" placeholder="选择日期">
      </el-date-picker>
      <el-button icon="el-icon-search" type="primary" @click="search()"></el-button>
      <el-button icon="el-icon-caret-left" type="text" @click="left()"></el-button>
      <span>{{timeStr}}</span>
      <el-button icon="el-icon-caret-right" type="text" @click="right()"></el-button>
    </div>
    <div class="timePick">
      <table width='100%' cellspacing="0" cellpadding="0" align="center" border="0" valign="top">
        <tbody>
          <tr style="height:50px;">
            <td class="GridTitle Room">房间</td>
            <td class="GridTitle Room">时间</td>
            <td class="GridTitle Room"  v-for="(item,index) in timeArrTitle" :key="index">
              <p>{{item.date}}</p>
              <p>{{item.day}}</p>
            </td>
          </tr>
          <tr style="height:52px;"   v-for="(item,index) in tabData" :key="index">
            <td class="GridContent" title="第一开标室">{{item.home}}</td>
            <td class="GridContent">
              <div class="ContentTable">
                <div class="ContentTr">上午</div>
                <div class="ContentTr">下午</div>
              </div>
            </td>
            <td class="GridContent"  v-for="(itemb,index) in item.data" :key="index">
              <div class="ContentTable">
                <div class="ContentTr">
                  <div class="ContentTd" v-for="itemhose in itemb.roomAm">{{itemhose}}</div>
                  <div class="ContentTd" v-for="itemhose in itemb.roomAm">{{itemhose}}</div>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";
export default {
  components: {},
  props: {},
  data() {
    return {
      time: '',
      timeStr: "465123",
      stime: "",
      etime: "",
      timeMax:true,
      dateArr:['周一','周二','周三','周四','周五','周六','周日'],
      timeArrTitle:[],
      tabData:[
        {
          home: "第一开标室",
          data: [
            {
              roomAm: [1, 2, 3],
              roomPm: [1, 2]
            },
            {
              roomAm: [1, 2, 3],
              roomPm: [1, 2]
            },
            {
              roomAm: [1, 2],
              roomPm: [1, 2, 3]
            },
            {
              roomAm: [1, 3],
              roomPm: [1, 2, 3]
            },
            {
              roomAm: [1, 2, 3],
              roomPm: [1, 3]
            },
            {
              roomAm: [2, 3],
              roomPm: [1, 2, 3]
            },
            {
              roomAm: [1, 2, 3],
              roomPm: [2, 3]
            }
          ]
        },
        {
          home: "第二开标室",
          data: [
            {
              roomAm: [1, 2, 3],
              roomPm: [1, 2]
            },
            {
              roomAm: [1, 2, 3],
              roomPm: [1, 2]
            },
            {
              roomAm: [1, 2],
              roomPm: [1, 2, 3]
            },
            {
              roomAm: [1, 3],
              roomPm: [1, 2, 3]
            },
            {
              roomAm: [1, 2, 3],
              roomPm: [1, 3]
            },
            {
              roomAm: [2, 3],
              roomPm: [1, 2, 3]
            },
            {
              roomAm: [1, 2, 3],
              roomPm: [2, 3]
            }
          ]
        },
        {
          home: "第三开标室",
          data: [
            {
              roomAm: [1, 2, 3],
              roomPm: [1, 2]
            },
            {
              roomAm: [1, 2, 3],
              roomPm: [1, 2]
            },
            {
              roomAm: [1, 2],
              roomPm: [1, 2, 3]
            },
            {
              roomAm: [1, 3],
              roomPm: [1, 2, 3]
            },
            {
              roomAm: [1, 2, 3],
              roomPm: [1, 3]
            },
            {
              roomAm: [2, 3],
              roomPm: [1, 2, 3]
            },
            {
              roomAm: [1, 2, 3],
              roomPm: [2, 3]
            }
          ]
        }
      ],
    };
  },
  watch: {
    
  },
  computed: {},
  methods: {
    resteTime(){
      this.time = '';
    },
    formateTimeStr(){
      this.timeStr = this.stime + "—" + this.etime;
      this.proArr(this.stime,this.etime)
    },

    search(){
      var start = new Date(new Date().toLocaleDateString());
      //获取当前时刻是星期几
      var nowDate = dayjs().day()
      //取到当前周周一的时间戳
      var time = start.setTime(start.getTime()) - (nowDate - 1) * 24 * 60 * 60 * 1000;
      //获取选中时间与现在时间的时间差几天
      var diff = dayjs(this.time).diff(dayjs(time),'day')
      //现在时刻的时间戳
      var nt = new Date(dayjs().format("YYYY-MM-DD")).getTime()
      //获取到选中日期是星期几
      var num = dayjs(this.time).day();
      //如果大于7天说明没在最近的一周
        //原来星期日是0 不是7
        if(num == 0){
          var etimeStemp = this.time - (num) * 24 * 60 * 60 * 1000;
          var stimeStemp = this.time - (6-num) * 24 * 60 * 60 * 1000;
          var etime = dayjs(etimeStemp).format("YYYY-MM-DD")
          var stime = dayjs(stimeStemp).format("YYYY-MM-DD")
          this.stime = stime;
          this.etime = etime;
          this.formateTimeStr()
        }else{
          //7-num就是结束的日期,获取到结束时间的时间戳
          var etimeStemp = this.time + (7-num) * 24 * 60 * 60 * 1000;
          var stimeStemp = this.time - (num-1) * 24 * 60 * 60 * 1000;
          var etime = dayjs(etimeStemp).format("YYYY-MM-DD")
          var stime = dayjs(stimeStemp).format("YYYY-MM-DD")
          this.stime = stime;
          this.etime = etime;
          this.formateTimeStr()
        }
    },
    proArr(stime,etime){
      //创建一个数组
      var timeArr = []
      var num = dayjs(etime).diff(dayjs(stime),'day')+1
      for(var i=0;i<num;i++){
        var obj = {};
        var timestemp = new Date(stime).getTime()+i*24*60*60*1000
        obj.date = this.dateArr[i];
        obj.day = dayjs(timestemp).format("YYYY-MM-DD")
        timeArr.push(obj)
      }
      this.timeArrTitle = timeArr
    },
    left() {
      var stimeVlue = new Date(this.stime).getTime() - 7 * 24 * 60 * 60 * 1000;
      var etimeVlue = stimeVlue + 6 * 24 * 60 * 60 * 1000;
      var a = dayjs(stimeVlue).format("YYYY-MM-DD");
      var b = dayjs(etimeVlue).format("YYYY-MM-DD");
      this.stime = a;
      this.etime = b;
      this.formateTimeStr()
      this.resteTime()
    },
    right() {
        var etimeVlue = new Date(this.etime).getTime() + 7 * 24 * 60 * 60 * 1000;
        var stimeVlue = etimeVlue - 6 * 24 * 60 * 60 * 1000;
        var a = dayjs(stimeVlue).format("YYYY-MM-DD");
        var b = dayjs(etimeVlue).format("YYYY-MM-DD");
        this.stime = a;
        this.etime = b;
        this.formateTimeStr()
    },
    toZhou() {
      var num = dayjs().day();
      var stime = new Date().getTime() - (num - 1) * 24 * 60 * 60 * 1000;
      var etime = stime + 6 * 24 * 60 * 60 * 1000;
      this.stime = dayjs(stime).format("YYYY-MM-DD");
      this.etime = dayjs(etime).format("YYYY-MM-DD");
      this.formateTimeStr()
    }

  },
  created() {
    this.toZhou();
  },
  mounted() {
  }
};
</script>
<style scoped>
table{
  border-collapse: collapse;
  word-break: break-all;
}
tr{
  display: table-row;
  vertical-align: inherit;
  border-color: inherit;
}
.GridTitle.Room{
  width: 11%;
}
.GridTitle{
  background-color: #009EE0;
  border: 2px solid;
  border-color: White;
  color: #FFF;
  font-size: 14px;
  font-weight: bold;
  text-align: center;
  font-family: 微软雅黑;
}
.GridContent{
  text-align: center;
  background-color: #E5F5FC;
  border: 2px solid;
  border-color: White;
}
.ContentTable{
  height: 120px;
  width: 100%;
}
.ContentTr{
  height: 60px;
  line-height: 60px;
  vertical-align: middle;
}
.ContentTd{
  width: 31%;
  border-right: 2px solid White;
  float: left;
}
</style>