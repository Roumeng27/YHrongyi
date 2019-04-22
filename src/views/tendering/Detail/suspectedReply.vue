<template>
    <div class="pageWrap">
       <!-- 询疑答复 -->
       <el-table :data="enclosureData" stripe style="width: 100%">
            <el-table-column  prop="index"  label="序号">
            </el-table-column>
            <el-table-column  prop="number"  label="入场项目(分包)编号">
            </el-table-column>
            <el-table-column prop="name" label="招标项目名称">
            </el-table-column>
            <el-table-column prop="money" label="分包名称">
            </el-table-column>
             <el-table-column prop="money" label="提问时间">
            </el-table-column>
             <el-table-column prop="money" label="是否回复">
            </el-table-column>
             <el-table-column prop="money" label="回复">
            </el-table-column>
        </el-table>   
    </div>
</template>

<script>
    import '../../../assets/css/style.css'
    export default {
        data(){
            return {
                activeName:'1',
                enclosureData:[ //新建项目
                    {
                        name: " 项目负责人授权书",
                        list: "王小虎"
                    }
                ],
            }
        }
    }
</script>

<style scoped>

</style>