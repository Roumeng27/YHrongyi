<template>
    <div class="pageWrap" @click="getFocus">
        <div class="box"></div>
        <!-- 控制价文件 -->
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
                        <el-table-column  prop="number"  label="参看">
                        </el-table-column>
                    </el-table>
                </el-collapse-item>
                <!-- 相关附件 -->
                <el-collapse-item title="相关附件" name="2">
                    <el-form ref="form" :model="form" label-width="120px">
                        <el-form-item label="招标控制价">
                            <div class="showPrice">
                                <div class="price">
                                    <el-input v-model="_price" ref="content" @blur="getFocus"></el-input>
                                </div>
                                <p>{{total}}</p>
                            </div>
                        </el-form-item>
                        <el-form-item label="备注说明">
                            <el-input type="textarea" v-model="form.desc"></el-input>
                        </el-form-item>
                    </el-form>
                </el-collapse-item>
           </el-collapse>
    </div>
</template>

<script>
    import '../../../assets/css/style.css'
    import {digitUppercase} from '../../../api/base.js'
    export default {
        data(){
            return {
                activeName:'2',
                enclosureData:[ //新建项目
                    {
                        name: " 项目负责人授权书",
                        list: "王小虎"
                    }
                ],
                search:'',//单位名称搜索
                form:{
                    desc:'',//备注说明
                },
                price:'',//招标控制价
                total:'',//总数
            }
        },
        computed:{
            // 输入框只能输入数字
            _price: {
                set: function(value) {
                    this.price = value;
                },
                get: function() {
                    return this.price.replace(/[^0-9]+/g,'')
                }
            }
        },
        methods:{
            // 失去焦点 得到大写
            getFocus(){
                this.total = digitUppercase(this.price)
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
.showPrice{
    display: flex;
}
.price{
    width: 200px;
}
.showPrice p{
    color: red;
    margin-left: 20px;
}
</style>