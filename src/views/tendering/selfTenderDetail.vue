<template>
    <div class="wrappper">
        <div class="myWrap">
            <!-- 头部 -->
            <div class="title">
                <p>分包名称:{{projectObj.subcontractName}}</p>
                <i class="el-icon-close" @click="goBack()"></i>
            </div>
            <div class="content">
                <div class="aside">
                    <div class="part">
                        <i class="el-icon-arrow-up"></i>
                        <h5>业务环节</h5>
                    </div>
                    <div class="asideList">
                        <el-menu :unique-opened='true' :router='true' :default-active="activeUrl" background-color="#FBFBFB" text-color="#333333" active-text-color="#4D7CFE" class="el-menu-vertical-demo">
                            <template v-for="(item,index) in routeList" >
                                <el-menu-item :index="item.url">
                                    <template slot="title">
                                        <i :class="item.icon"></i>
                                        <span slot="title">{{item.value}}</span>
                                    </template>
                                </el-menu-item>
                            </template>
                        </el-menu>
                    </div>
                    <div class="part">
                        <i class="el-icon-arrow-down"></i>
                    </div>
                </div>
                <div class="main">
                    <router-view :projectInformaPrimaryKeyId="projectObj.projectInformaPrimaryKeyId" :totalProjectId="projectObj.totalProjectId"></router-view>
                </div>
            </div>
        </div>  
    </div>
</template>

<script>
    import baseUrl from '../../api/api.js'
    export default {
        data(){
            return{
                projectObj:{},
                routeList:[],// 导航列表
                activeUrl:'',//刷新页面依然等于当前path值
                projectInformaPrimaryKeyId:'',
                totalProjectId:'',// 入场项目(分包)编号
                subcontractName:''// 分包名称
            }
            
        },
        computed:{
        
        },
        created(){
            this.projectObj = JSON.parse(window.localStorage.projectObj)
        },
        mounted(){
            this.activeUrl = this.$route.path;
            this.getrouteList();//导航栏数据
        },
        watch: {
            $route: "myroute"
        },
        methods:{
            // 返回之前页面
            goBack(){
                this.$router.push({
                    name:'SelfTender'
                })
            },
            // 导航栏数据
            getrouteList() {
                this.$axios({
                    method: "POST",
                    url: baseUrl+'/interfaceTableController/selfTendering',
                    data:{
                        dropDownBox:'自行招标',
                        projectEntrySubcontractNumbers:this.projectObj.totalProjectId
                    }
                }).then(res=>{
                    this.routeList = res.data.data.data;
                }).catch(err=>{
                    console.log(err)
                }) 
            },
            myroute() {
                this.activeUrl = this.$route.path;
            },
        }
    }
</script>

<style scoped>
    .wrappper{
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, .3);
        padding: 10px;
    }
    .myWrap{
        width: 100%;
        height: 100%;
        background: #fff;
        display: flex;
        flex-direction: column;
    }
    .title{
        width: 100%;
        height: 35px;
        padding: 0 20px;
        background: #0058a9;
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: #fff;
        font-size: 18px;
    }
    .el-icon-close{
        font-size: 24px; 
        cursor: pointer;
    }
    .content{
        width: 100%;
        flex: 1;
        display: flex;
        justify-content: space-between;
        background: #000;
    }
    /* 侧边栏 */
    .aside{
        width: 180px;
        height: 100%;
        background: #fff;
        display: flex;
        flex-direction: column;
       
    }
    .asideList{
        width: 100%;
        overflow: hidden;
        overflow-y: scroll;
    }
    .el-menu-item{
        text-align: center;
        border-bottom: 1px solid #F0F5F6;
    }
    .part{
        width: 175px;
        height: 80px;
        background: #d1d1d1;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 18px;
        color: #333;
        font-weight: normal;
    }
    .el-icon-arrow-up{
        font-size: 28px;
        padding-right: 20px;
    }
    .el-icon-arrow-down{
        font-size: 28px;
        padding-right: 20px;
    }
    .main{
        flex: 1;
        background: #f5f7fa;;
        overflow-y:scroll
    }
</style>