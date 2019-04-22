<template>
    <div class="pageWrap">
       <!-- 答疑文件 -->
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
                </el-collapse-item>
                <!-- 相关附件 -->
                <el-collapse-item title="相关附件" name="2">
                    <div class="btnBox">
                        <el-button type="primary">新增</el-button>
                        <el-button type="primary">删除</el-button>
                    </div>
                     <el-table :data="enclosureData" stripe style="width: 100%">
                        <el-table-column  prop="index"  label="序号">
                        </el-table-column>
                        <el-table-column  prop="number"  label="入场项目(分包)编号">
                        </el-table-column>
                        <el-table-column  prop="number"  label="招标项目名称">
                        </el-table-column>
                        <el-table-column  prop="number"  label="分包名称">
                        </el-table-column>
                        <el-table-column  prop="number"  label="次数">
                        </el-table-column>
                        <el-table-column  prop="number"  label="状态">
                        </el-table-column>
                        <el-table-column  prop="number"  label="操作">
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
.btnBox{
    width: 100%;
    display: flex;
}
</style>