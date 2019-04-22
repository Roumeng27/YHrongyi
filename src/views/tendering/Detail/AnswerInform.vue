<template>
    <div class="pageWrap">
       <!-- 答疑通知 -->
        <div class="box"></div>
        <el-collapse v-model="activeName" accordion>
                <!--招标项目信息 -->
                <el-collapse-item title="招标项目信息" name="1">
                    <ul class="contentBox">
                        <li>
                            <p>招标项目名称：<span>0213-01</span></p>
                        </li>
                        <li>
                            <p>招标(采购)人：<span>测试用户1</span></p>
                            <p>招标项目金额(万元)：<span>100</span></p>
                        </li>
                        <li>
                            <p>招标项目编号：<span>0213-01</span></p>
                            <p>入场项目编号：<span>R190201Z07G0017</span></p>
                        </li>
                    </ul>
                    <el-table :data="enclosureData" stripe style="width: 100%">
                        <el-table-column  prop="index"  label="序号">
                        </el-table-column>
                        <el-table-column  prop="number"  label="入场项目(分包)编号">
                        </el-table-column>
                        <el-table-column  prop="number"  label="分包名称">
                        </el-table-column>
                        <el-table-column  prop="number"  label="分包控制金额(万元)">
                        </el-table-column>
                        <el-table-column  prop="number"  label="查看">
                        </el-table-column>
                    </el-table>
                </el-collapse-item>
                <!-- 相关附件 -->
                <el-collapse-item title="相关附件" name="2">
                    <el-table :data="enclosureData" stripe style="width: 100%">
                        <el-table-column  prop="index"  label="附件名称">
                        </el-table-column>
                        <el-table-column  prop="number"  label="附件列表">
                        </el-table-column>
                    </el-table>
                </el-collapse-item>
                <!-- 通知内容 -->
                <el-collapse-item title="通知内容" name="3">
                    <ul class="contentBox">
                        <li>
                            <p>答疑时间：<span>2019年02月13日 18时39分</span></p>
                        </li>
                        <li>
                            <p>答疑集合地点：<span>北京</span></p>
                        </li>
                        <li>
                            <p>联系人<span></span></p>
                            <p>联系方式<span></span></p>
                        </li>
                        <li>
                            <p>其他<span></span></p>
                        </li>
                    </ul>
                </el-collapse-item>
                <!-- 通知反馈记录 -->
                <el-collapse-item title="通知反馈记录" name="4">
                     <el-table :data="enclosureData" stripe style="width: 100%">
                        <el-table-column  prop="index"  label="序号">
                        </el-table-column>
                        <el-table-column  prop="number"  label="答疑单位名称">
                        </el-table-column>
                         <el-table-column  prop="number"  label="联系人">
                        </el-table-column>
                        <el-table-column  prop="number"  label="联系方式">
                        </el-table-column>
                        <el-table-column  prop="number"  label="通知反馈时间">
                        </el-table-column>
                         <el-table-column  prop="number"  label="是否参加">
                        </el-table-column>
                    </el-table>
                </el-collapse-item>
                <!-- 记录答疑情况 -->
                <el-collapse-item title="记录答疑情况" name="5">
                    <div class="box_title">
                        <button class="btn" @click="addAnswerInform()">新增答疑情况</button>
                        <button class="btn">删除答疑情况</button>
                        <button class="btn">搜索</button>
                    </div>
                    <div class="write_box">
                        <el-input v-model="search" placeholder="请输入单位名称搜索"></el-input>
                    </div>
                    <el-table :data="enclosureData" stripe style="width: 100%">
                        <el-table-column  prop="index"  label="序号">
                        </el-table-column>
                        <el-table-column  prop="number"  label="答疑单位名称">
                        </el-table-column>
                         <el-table-column  prop="number"  label="答疑单位代表姓名">
                        </el-table-column>
                        <el-table-column  prop="number"  label="答疑时间">
                        </el-table-column>
                        <el-table-column  prop="number"  label="修改">
                        </el-table-column>
                         <el-table-column  prop="number"  label="查看">
                        </el-table-column>
                    </el-table>
                </el-collapse-item>
           </el-collapse>
    </div>
</template>

<script>
    import '../../../assets/css/style.css'
    export default {
        data(){
            return {
                activeName:'5',
                enclosureData:[ //新建项目
                    {
                        name: " 项目负责人授权书",
                        list: "王小虎"
                    }
                ],
                search:'',//单位名称搜索
            }
        },
        methods:{
            // 答疑通知 --> 新增答疑情况
            addAnswerInform(){
                this.$router.push({
                    name:'addAnswerInform'
                })
            }
        }
    }
</script>

<style scoped>
.box{
    width: 100%;
    height: 35px;
    background: #d3d7d4;
}
.el-collapse{
    width: 90%;
    margin: 10px auto;
}
.contentBox{
    display: flex;
    flex-direction: column;
    padding: 0 30px;
}
.contentBox li{
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    line-height: 30px;
}
.contentBox li p{
    color: #333;
}
.contentBox li span{
    color:#6e622e;
}
.box_title{
    padding: 10px 0;
}
.btn{
    height: 38px;
    padding:0 25px;
    background-color: #0095d5;
    border: none;
    color: #ffffff;
    font-size: 16px;
    cursor: pointer;
    margin-right: 2px;
}
.write_box{
    width: 210px;
    padding: 0 0 10px 0;
}
</style>