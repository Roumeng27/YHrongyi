<template>
    <div class="newBox">
        <!-- 评标情况 -->
        <div class="wrapper" v-show="writeFlag">
            <el-tabs v-model="activeName2" type="border-card" @tab-click="handleClick">
                <el-tab-pane label="评标消息" name="first">
                    <div class="page">
                        <!-- <div class="box">
                            <button class="btn" @click="saveInfo">保存</button>
                        </div> -->
                        <el-collapse v-model="activeName" accordion>
                            <!--招标项目信息 -->
                            <el-collapse-item title="招标项目信息" name="1">
                                <div class="edit_list">
                                    <div class="editItem">
                                        <div class="editCenter">
                                            <div class="editName">招标项目名称：</div>
                                            <div class="editContent">{{nameOfTenderProject}} </div>
                                        </div>
                                    </div>
                                    <div class="editItem">
                                        <div class="editCenter">
                                            <div class="editName">招标(采购)人：</div>
                                            <div class="editContent">{{nameOfPurchaser}}</div>
                                        </div>
                                        <div class="editCenter">
                                            <div class="editName">招标项目预算金额：</div>
                                            <div class="editContent">{{budgetAmount}}</div>
                                        </div>
                                    </div>
                                    <div class="editItem">
                                        <div class="editCenter">
                                            <div class="editName">招标项目编号：</div>
                                            <div class="editContent">{{biddingProjectNumber}}</div>
                                        </div>
                                        <div class="editCenter">
                                            <div class="editName">入场项目编号：</div>
                                            <div class="editContent">{{amountId}}</div>
                                        </div>
                                    </div>
                                </div>
                                <div v-show="breakBagFlag">   
                                    <el-table
                                            ref="multipleTable"
                                            :data="subpackageData"
                                            tooltip-effect="dark"
                                            style="width: 100%">
                                        <el-table-column
                                            label="序号">
                                            <template slot-scope="scope">{{ scope.$index+1 }}</template>
                                        </el-table-column>
                                        <el-table-column
                                            prop="entrySubcontractNumber"
                                            label="入场项目(分包)编号">
                                        </el-table-column>
                                        <el-table-column
                                            prop="subcontractName"
                                            label="分包名称">
                                        </el-table-column>
                                        <el-table-column
                                            prop="subcontractingControlAmount"
                                            label="分包控制金额(万元)">
                                        </el-table-column>
                                        <el-table-column
                                            label="查看">
                                            <template slot-scope="scope">
                                                <i class="el-icon-search"  style="cursor: pointer;" @click="lookoverItem(scope.row)"></i>
                                            </template>
                                        </el-table-column>
                                    </el-table>
                                </div>
                            </el-collapse-item>
                            <!--评标消息 -->
                            <el-collapse-item title="评标消息" name="2">
                                <div class="edit_list">
                                    <div class="editItem">
                                        <div class="editCenter">
                                            <div class="editName">评标开始时间：</div>
                                            <div class="editContent">{{startTime}} </div>
                                        </div>
                                        <div class="editCenter">
                                            <div class="editName">评标结束时间：</div>
                                            <div class="editContent">{{endTime}} </div>
                                        </div>
                                    </div>
                                    <div class="editItem">
                                        <div class="editCenter">
                                            <div class="editName">评标地点：</div>
                                            <div class="editContent">{{address}}</div>
                                        </div>
                                        <div class="editCenter">
                                            <div class="editName">评标方式：</div>
                                            <div class="editContent">{{method}}</div>
                                        </div>
                                    </div>
                                    <div class="editItem">
                                        <div class="editCenter">
                                            <div class="editName">评标情况：</div>
                                            <div class="editContent">{{situation}}</div>
                                        </div>
                                    </div>
                                </div>
                            </el-collapse-item>
                        </el-collapse>
                   </div>
                </el-tab-pane>
                <el-tab-pane label="评标结果" name="second">
                    <div class="page">
                        <!-- <div class="box">
                            <button class="btn" @click="endingInfo">评标结束</button>
                        </div> -->
                        <el-collapse v-model="activeName" accordion>
                            <!--评标结果 -->
                            <el-collapse-item title="评标结果" name="1"> 
                                <el-table
                                        ref="multipleTable"
                                        :data="validData"
                                        tooltip-effect="dark"
                                        style="width: 100%">
                                    <el-table-column
                                        label="序号">
                                        <template slot-scope="scope">{{ scope.$index+1 }}</template>
                                    </el-table-column>
                                    <el-table-column
                                        prop="companyName"
                                        label="单位名称">
                                    </el-table-column>
                                    <el-table-column
                                        prop="offer"
                                        label="投标报价(元/%)">
                                    </el-table-column>
                                    <el-table-column
                                        prop="quotation_method"
                                        label="报价方式">
                                    </el-table-column>
                                    <el-table-column
                                        prop="economic"
                                        label="经济标">
                                    </el-table-column>
                                    <el-table-column
                                        prop="technology"
                                        label="技术标">
                                    </el-table-column>
                                    <el-table-column
                                        prop="business"
                                        label="商务标">
                                    </el-table-column>
                                    <el-table-column
                                        prop="otherPoints"
                                        label="其他分">
                                    </el-table-column>
                                    <el-table-column
                                        prop="totalScore"
                                        label="汇总分">
                                    </el-table-column>
                                    <el-table-column
                                        prop="ranking"
                                        label="排名">
                                    </el-table-column>
                                    <el-table-column
                                        label="操作">
                                        <template slot-scope="scope">
                                            <i class="el-icon-search"  style="cursor: pointer;" @click="editInfo(scope.row)"></i>
                                        </template>
                                    </el-table-column>
                                </el-table>
                                <div class="edit_list">
                                    <div class="noteBox">
                                        <div class="noteItem">
                                            <div class="noteLeft">推荐排名第一单位：</div>
                                            <div class="write_item">
                                                {{recommendFirst}}
                                            </div>
                                        </div>
                                    </div>
                                    <div class="noteBox">
                                        <div class="noteItem">
                                            <div class="noteLeft">推荐排名第二单位：</div>
                                            <div class="write_item">
                                                {{recommendSecond}}
                                            </div>
                                        </div>
                                    </div>
                                    <div class="noteBox">
                                        <div class="noteItem">
                                            <div class="noteLeft">推荐排名第三单位：</div>
                                            <div class="write_item">
                                                {{recommendThird}}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </el-collapse-item>
                            <!--无效标信息 -->
                            <el-collapse-item title="无效标信息" name="2">
                                <el-table
                                        ref="multipleTable"
                                        :data="invalidData"
                                        tooltip-effect="dark"
                                        style="width: 100%">
                                    <el-table-column
                                        label="序号">
                                        <template slot-scope="scope">{{ scope.$index+1 }}</template>
                                    </el-table-column>
                                    <el-table-column
                                        prop="companyName"
                                        label="单位名称">
                                    </el-table-column>
                                    <el-table-column
                                        prop="noEffectReason"
                                        label="原因">
                                    </el-table-column>
                                    <el-table-column
                                        label="进入">
                                        <template slot-scope="scope">
                                            <i class="el-icon-search" @click="enterInto(scope.row)"></i>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </el-collapse-item>
                        </el-collapse>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>
        <!-- 分包信息详情 -->
		<div class="winWrapper" v-show="lookFlag">
            <div class="winBox">
               	<div class="win_title">
                    <p>分包信息</p>
                    <i class="el-icon-close" @click="closeLook"></i>
                </div>
				<el-collapse v-model="activeName" accordion>
					<!-- 招标项目信息 -->
					<el-collapse-item title="招标项目信息" name="1">
                        <div class="edit_list">
                            <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName">招标项目名称：</div>
                                    <div class="editContent">{{nameOfTenderProject}} </div>
                                </div>
                                <div class="editCenter">
                                    <div class="editName">招标项目编号：</div>
                                    <div class="editContent">{{biddingProjectNumber}}</div>
                                </div>
                            </div>
                            <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName">招标(采购)人：</div>
                                    <div class="editContent">{{nameOfPurchaser}}</div>
                                </div>
                            </div>
                            <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName">入场项目编号：</div>
                                    <div class="editContent">{{amountId}}</div>
                                </div>
                            </div>
                        </div>
					</el-collapse-item>
					 <!-- 分包信息-->
					<el-collapse-item title="分包信息" name="2">
                        <div class="edit_list">
                             <div class="editItem">
                                <div class="editCenter" style="color:red;">
                                    <div class="editName">标段包编号(赋码)：</div>
                                    <div class="editContent"> </div>
                                </div>
                            </div>
                            <div class="editItem">
                                <div class="editCenter" style="color:red;">
                                    <div class="editName">统一交易标志码：</div>
                                    <div class="editContent"> </div>
                                </div>
                            </div>
                            <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName">入场项目分包编号：</div>
                                    <div class="editContent">{{entrySubcontractNumber}} </div>
                                </div>
                            </div>
                            <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName">分包名称：</div>
                                    <div class="editContent">{{subcontractName}} </div>
                                </div>
                            </div>
                            <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName">分包内容：</div>
                                    <div class="editContent">{{nameOfPurchaser}} </div>
                                </div>
                            </div>
                            <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName">招标范围：</div>
                                    <div class="editContent">{{subcontractContents}} </div>
                                </div>
                            </div>
                            <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName">分包控制金额：</div>
                                    <div class="editContent">{{subcontractingControlAmount}}<b style="color:#000;">万元</b></div>
                                </div>
                                <div class="editCenter">
                                    <div class="editName">资格审查方式：</div>
                                    <div class="editContent">{{qualificationExaminationMethod}}</div>
                                </div>
                            </div>
                            <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName">是否电子招投标：</div>
                                    <div class="editContent">{{electronicBidEvaluation}} </div>
                                </div>
                            </div>
                        </div>
					</el-collapse-item>
				</el-collapse>
            </div>
        </div>
        <!-- 修改评标情况 -->
        <div class="editWrapper" v-show="editFlag">
             <div class="editBox">
               	<div class="edit_title">
                    <p>修改评标情况</p>
                    <i class="el-icon-close" @click="closeEdit"></i>
                </div>
                <!-- <div class="box">
                    <button class="btn" @click="editSave">修改保存</button>
                </div> -->
				<el-collapse v-model="activeName" accordion>
					<!-- 单位信息 -->
					<el-collapse-item title="单位信息" name="1">
                        <div class="edit_list">
                            <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName">单位名称：</div>
                                    <div class="editContent">{{companyName}} </div>
                                </div>
                            </div>
                        </div>
					</el-collapse-item>
					 <!-- 评标信息-->
					<el-collapse-item title="评标信息" name="2">
                        <div class="edit_list">
                            <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName">经济标：</div>
                                    <div class="editContent">{{economic}} </div>
                                </div>
                                <div class="editCenter">
                                    <div class="editName">技术标：</div>
                                    <div class="editContent">{{technology}} </div>
                                </div>
                                <div class="editCenter">
                                    <div class="editName">商务标：</div>
                                    <div class="editContent">{{business}} </div>
                                </div>
                            </div>
                            <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName">其他分：</div>
                                    <div class="editContent">{{otherPoints}} </div>
                                </div>
                                <div class="editCenter">
                                    <div class="editName">汇总分：</div>
                                    <div class="editContent">{{totalScore}} </div>
                                </div>
                                <div class="editCenter">
                                    <div class="editName">排名：</div>
                                    <div class="editContent">{{ranking}} </div>
                                </div>
                            </div>
                            <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName">是否判定无效：</div>
                                    <div class="editContent">{{isEffective}} </div>
                                </div>
                                <div class="editCenter">
                                    <div class="editName">是否放弃中标：</div>
                                    <div class="editContent">{{abandoningWinningBid}} </div>
                                </div>
                            </div>
                        </div>
					</el-collapse-item>
				</el-collapse>
            </div>
        </div>
        <!-- 无效标 -->
        <div class="invalidWrapper" v-show="invalidFlag">
            <div class="invalidBox">
               	<div class="invalid_title">
                    <p>无效标</p>
                    <i class="el-icon-close" @click="closeInvalid"></i>
                </div>
                <div class="main_info">
                    <div class="noteBox">
                        <div class="noteItem">
                            <div class="noteLeft_item">单位名称：</div>
                            <div class="edit_item">{{companyName}}</div>
                        </div>
                    </div>
                    <div class="noteBox">
                        <div class="noteItem">
                            <div class="noteLeft_item">投标价格：</div>
                            <div class="edit_item">{{offer}}元</div>
                        </div>
                    </div>
                    <div class="noteBox">
                        <div class="noteItem">
                            <div class="noteLeft_item">无效标节点：</div>
                            <div class="edit_item">
                                {{noEffectNode}}
                            </div>
                        </div>
                    </div>
                    <div class="noteBox">
                        <div class="noteItem">
                            <div class="noteLeft_item">无效标原因：</div>
                            <div class="textarea">
                                {{noEffectReason}}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 评标结束 -->
        <el-dialog
            title="信息确认"
            :visible.sync="endingBox"
            width="30%"
            :before-close="endingSure">
            <div class="icon">
                <i class="el-icon-question"></i>
                <span>您确认评标结束吗？</span>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancel">取 消</el-button>
                <el-button type="primary" @click="endingSure">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 评标结束 -->
        <el-dialog
            title="执行成功"
            :visible.sync="saveBox"
            width="30%"
            :before-close="saveSure">
            <div class="icon">
                <i class="el-icon-success"></i>
                <span>保存成功!</span>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="saveSure()">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import '../../../assets/css/style.css'
    import baseUrl from '../../../api/api'
    import { quillEditor } from 'vue-quill-editor' //调用编辑器
    import {formatDate,changeTime} from '../../../api/base.js'
    export default {
        data(){
            return {
                projectObj:JSON.parse(window.localStorage.projectObj),
                activeName:['1','2','3','4','5','6'],
                activeName2: 'first',
                writeFlag:true,// 总包输入 列表
                breakBagFlag:false,// 招标项目信息 下分包展示
                subpackageData:[],
                // 招标项目信息所需字段
                nameOfTenderProject:'',// 招标项目名称
                biddingProjectNumber:'',// 招标项目编号
                nameOfPurchaser:'',// 招标(采购)人
                budgetAmount:'',// 招标项目预算金额
                amountOfBiddingProject:'',//招标项目金额
                biddingProcurementMode:'',// 招标采购方式
                biddingOrganization:'',// 招标组织方式
                typesOfBiddingProjects:'',// 招标项目类型
                amountId:'',// 总包
                entrySubcontractNumber:'',// 入场项目编号 分包
                projectCode:'',//入场项目编号 总包
                // 让input框只读
                readonly: true,
                time:'',
                name:'',
                region:'',// 下拉框
                // 中标信息详情
                lookFlag:false,
                scopeOfTender:'',// 招标范围
                subcontractingControlAmount:'',// 分包控制金额
                qualificationExaminationMethod:'',// 资格审查方式	
                electronicBidEvaluation:'',// 是否电子招投标
                subcontractContents:'',// 分包内容
                subcontractName:'',// 分包名称 
                totalProjectId:'',
                // 评标结束
                endingBox:false,
                // 评标信息 
                saveBox:false,// 保存
                //评标消息所需字段
                startTime:'',// 评标开始时间
                endTime:'',// 评标结束时间
                address:'',// 评标地点
                method:'',// 评标方式
                situation:'',// 评标情况
                isEnd:'',// 是否评标结束
                recommendFirst:'',// 推荐排名第一
                recommendSecond:'',// 推荐排名第二
                recommendThird:'',// 推荐排名第三
                // 评标结果
                validData:[],// 有效标
                invalidData:[],// 无效标
                // 修改评标情况所需字段
                editFlag:false,// 弹窗
                companyName:'',//单位名称
                economic:'',// 经济标
                technology:'',// 技术标
                business:'',// 商务标
                otherPoints:'',// 其他分
                totalScore:'',// 汇总分
                ranking:'',// 排名
                isEffective:false,// 是否判定无效
                abandoningWinningBid:false,// 是否放弃中标
                invalidFlag:false,// 无效标弹窗
                noEffectReason:'',// 无效原因
                offer:'',// 报价
                noEffectNode:'',// 无效标节点
                
            }
        },
        created(){
            if(this.projectObj.totalProjectId.indexOf("-") != -1){
                // 分包
                this.entrySubcontractNumber = this.projectObj.totalProjectId;
                this.breakBagFlag = true;
                this.getItemInfo();// 根据项目入场分包编号查询
            }else{
                // 总包
                this.projectCode = this.projectObj.totalProjectId;
                this.breakBagFlag = false;
            }
            this.getbiddingInfo();// 招标项目信息
            this.getInitInfo();// 初始化查询
            this.getvalidInfo();// 评标结果 有效标
                        
        },
		methods:{
            // tab 切换
            handleClick(tab, event) {
                if(tab.name == 'second'){
                    this.getvalidInfo();// 评标结果 有效标
                    this.getselectInfo();// 下拉框数据展示
                    this.getinvalidInfo();// 评标结果 无效标
                }
            },
            // 查看分包详情
            lookoverItem(row){
                this.entrySubcontractNumber = row.entrySubcontractNumber;// 入场项目分包编号
                this.subcontractName = row.subcontractName;// 分包名称 
                this.subcontractContents = row.subcontractContents;// 分包内容
                this.scopeOfTender = row.scopeOfTender;// 招标范围
                this.subcontractingControlAmount = row.subcontractingControlAmount;// 分包控制金额	
                this.qualificationExaminationMethod = row.projectInformationVo.qualificationExaminationMethod;// 资格审查方式 
                this.electronicBidEvaluation = row.projectInformationVo.electronicBidEvaluation;// 是否电子招投标
                this.lookFlag = true;
            },
            // 关闭查看详情
            closeLook(){
                this.lookFlag = false
            },
            // 评标结束
            endingInfo(){
                // this.endingBox = true;
                let object={}
                if(this.projectObj.totalProjectId.indexOf("-") != -1 && this.projectObj.totalProjectId!=null){
                    // 入场项目分包编号
                    object={
                        entrySubcontractNumber:this.projectObj.totalProjectId,
                        recommendFirst:this.recommendFirst,
                        recommendSecond:this.recommendSecond,
                        recommendThird:this.recommendThird
                    }
                }else{
                    // 入场项目编号
                    object ={
                        projectCode:this.projectObj.totalProjectId,
                        recommendFirst:this.recommendFirst,
                        recommendSecond:this.recommendSecond,
                        recommendThird:this.recommendThird
                    }
                }
                this.$axios({
                    method: "POST",
                    url: baseUrl+"/evaluationController/save",
                    data:object
                }).then(res=>{
                    if(res.data.status == 200){
                        this.saveBox = true;
                    }else{
                        console.log(res.data.msg);
                    }
                }).catch(err=>{
                    console.log(err)
                })
            },
            cancel(){
                this.endingBox = false;
                this.isEnd = false;
            },
            // 评标结束 ---> 弹窗关闭
            endingSure(){
                this.endingBox = false;
                this.isEnd = true;
            },
            // 评标信息 ---> 保存
            saveInfo(){
                let object={}
                if(this.projectObj.totalProjectId.indexOf("-") != -1 && this.projectObj.totalProjectId!=null){
                    // 入场项目分包编号
                    object={
                        entrySubcontractNumber:this.projectObj.totalProjectId,
                        startTime:this.startTime,
                        endTime:this.endTime,
                        address:this.address,
                        method:this.method,
                        situation:this.situation,
                    }
                }else{
                    // 入场项目编号
                    object ={
                        projectCode:this.projectObj.totalProjectId,
                        startTime:this.startTime,
                        endTime:this.endTime,
                        address:this.address,
                        method:this.method,
                        situation:this.situation,
                    }
                }
                this.$axios({
                    method: "POST",
                    url: baseUrl+"/evaluationController/save",
                    data:object
                }).then(res=>{
                    if(res.data.status == 200){
                        this.saveBox = true;
                    }else{
                        console.log(res.data.msg);
                    }
                }).catch(err=>{
                    console.log(err)
                })
            },
            // 修改评标情况 
            editInfo(row){
                this.bidInforId = row.bidInforId;// 投标信息ID
                this.companyName = row.companyName;// 单位名称
                this.economic= row.economic;// 经济标
                this.technology= row.technology;// 技术标
                this.business= row.business;// 商务标
                this.otherPoints= row.otherPoints;// 其他分
                this.totalScore= row.totalScore;// 汇总分
                this.ranking= row.ranking;// 排名
                // 是否判定无效
                if(row.isEffective == true){
                    this.isEffective ='是';
                }else{
                    this.isEffective ='否';
                }
                // 是否放弃中标
                if(row.abandoningWinningBid == true){
                    this.abandoningWinningBid ='是';
                }else{
                    this.abandoningWinningBid ='否';
                }
                this.editFlag = true;
            },
            closeEdit(){
                this.editFlag = false;
            },
            // 评标信息 ---> 保存弹窗关闭
            saveSure(){
                this.saveBox = false;
            },
            // 评标情况 无效标 进入
            enterInto(row){
                this.bidInforId = row.bidInforId;// 投标信息ID
                this.noEffectReason = row.noEffectReason;
                this.companyName = row.companyName;
                this.offer = row.offer;
                this.noEffectNode = row.noEffectNode;// 无效标节点
                this.invalidFlag = true;
            },
            // 关闭无效标
            closeInvalid(){
                this.invalidFlag = false;
            },
            // 招标项目信息
            getbiddingInfo(){
                this.$axios({
                    method: "GET",
                    url: baseUrl+"/projectInformationController/selectById/"+this.projectObj.projectInformaPrimaryKeyId,
                }).then(res=>{
                    if(res.data.status == 200){
                        this.nameOfTenderProject = res.data.data.nameOfTenderProject;// 招标项目名称
                        this.biddingProjectNumber = res.data.data.biddingProjectNumber;// 招标项目编号
                        this.amountOfBiddingProject = res.data.data.amountOfBiddingProject;// 招标项目金额
                        this.biddingProcurementMode = res.data.data.biddingProcurementMode;// 招标采购方式
                        this.biddingOrganization = res.data.data.biddingOrganization;// 招标组织方式
                        this.typesOfBiddingProjects = res.data.data.typesOfBiddingProjects;// 招标项目类型
                        this.nameOfPurchaser = res.data.data.nameOfPurchaser;// 招标(采购)人
                        this.budgetAmount = res.data.data.budgetAmount;// 招标项目预算金额 
                        this.amountId = res.data.data.totalProjectId;// 总包 入场项目编号

                    }else{
                        console.log(res.data.msg);
                    }
                }).catch(err=>{
                    console.log(err)
                })
            },
            // 根据项目入场分包编号查询
            getItemInfo(){
                let arr =[];
                arr.push(this.entrySubcontractNumber)
                this.$axios({
                    method: "POST",
                    url: baseUrl+"/projectInformationController/selectByProjectEntrySubcontractNumber",
                    data:{
                        projectEntrySubcontractNumbers:arr
                    }
                }).then(res=>{
                    if(res.data.status == 200){
                        this.subpackageData = res.data.data;
                        this.subpackageData.forEach(item=>{
                            return item.entrySubcontractNumber,item.qualificationExaminationMethod
                        })
                    }else{
                        console.log(res.data.msg);
                    }
                }).catch(err=>{
                    console.log(err)
                })
            },
            // 评标结果 无效标
            getinvalidInfo(){
                let object={}
                if(this.projectObj.totalProjectId.indexOf("-") != -1 && this.projectObj.totalProjectId!=null){
                    // 入场项目分包编号
                    object={
                        entrySubcontractNumber:this.projectObj.totalProjectId,
                        isEffective:0
                    }
                }else{
                    // 入场项目编号
                    object ={
                        projectCode:this.projectObj.totalProjectId,
                        isEffective:0
                    }
                }
                this.$axios({
                    method: "POST",
                    url: baseUrl+"/bidInforController/selectList",
                    data:object
                }).then(res=>{
                    if(res.data.status == 200){
                        this.invalidData = res.data.data
                    }else{
                        console.log(res.data.msg);
                    }
                }).catch(err=>{
                    console.log(err)
                })
            },
            // 修改评标保存
            editSave(){
                if(this.isEffective == true){
                    this.isEffective='1'
                }else{
                    this.isEffective='0'
                }
                if(this.abandoningWinningBid == true){
                    this.abandoningWinningBid='1'
                }else{
                    this.abandoningWinningBid='0'
                }
                let object={}
                if(this.projectObj.totalProjectId.indexOf("-") != -1 && this.projectObj.totalProjectId!=null){
                    // 入场项目分包编号
                    object={
                        entrySubcontractNumber:this.projectObj.totalProjectId,
                        bidInforId:this.bidInforId,
                        companyName:this.companyName,
                        economic:this.economic,
                        technology:this.technology,
                        business:this.business,
                        otherPoints:this.otherPoints,
                        totalScore:this.totalScore,
                        ranking:this.ranking,
                        isEffective:this.isEffective,
                        abandoningWinningBid:this.abandoningWinningBid,
                    }
                }else{
                    // 入场项目编号
                    object ={
                        projectCode:this.projectObj.totalProjectId,
                        bidInforId:this.bidInforId,
                        companyName:this.companyName,
                        economic:this.economic,
                        technology:this.technology,
                        business:this.business,
                        otherPoints:this.otherPoints,
                        totalScore:this.totalScore,
                        ranking:this.ranking,
                        isEffective:this.isEffective,
                        abandoningWinningBid:this.abandoningWinningBid,
                    }
                }
                this.$axios({
                    method: "POST",
                    url: baseUrl+"/bidInforController/update",
                    data:object
                }).then(res=>{
                    if(res.data.status == 200){
                        this.editFlag = false;
                        this.getvalidInfo();// 有效标列表
                    }else{
                        console.log(res.data.msg);
                    }
                }).catch(err=>{
                    console.log(err)
                })
            },
            // 评标结果 有效标
            getvalidInfo(){
                let object={}
                if(this.projectObj.totalProjectId.indexOf("-") != -1 && this.projectObj.totalProjectId!=null){
                    // 入场项目分包编号
                    object={
                        entrySubcontractNumber:this.projectObj.totalProjectId,
                        isEffective:1
                    }
                }else{
                    // 入场项目编号
                    object ={
                        projectCode:this.projectObj.totalProjectId,
                        isEffective:1
                    }
                }
                this.$axios({
                    method: "POST",
                    url: baseUrl+"/bidInforController/selectList",
                    data:object
                }).then(res=>{
                    if(res.data.status == 200){
                        this.validData = res.data.data;
                    }else{
                        console.log(res.data.msg);
                    }
                }).catch(err=>{
                    console.log(err)
                })
            },
            // 下拉框数据
            getselectInfo(){
                let object={}
                if(this.projectObj.totalProjectId.indexOf("-") != -1 && this.projectObj.totalProjectId!=null){
                    // 入场项目分包编号
                    object={
                        entrySubcontractNumber:this.projectObj.totalProjectId
                    }
                }else{
                    // 入场项目编号
                    object ={
                        projectCode:this.projectObj.totalProjectId
                    }
                }
                this.$axios({
                    method: "POST",
                    url: baseUrl+"/evaluationController/selectByProjectCode",
                    data:object
                }).then(res=>{
                    if(res.data.status == 200){
                        for(let i=0;i<this.validData.length;i++){
                            if(this.validData[i].bidInforId == res.data.data.recommendFirst ){
                                this.recommendFirst = this.validData[i].companyName;
                            }else if(this.validData[i].bidInforId == res.data.data.recommendSecond){
                                this.recommendSecond =  this.validData[i].companyName;
                            }else{
                                this.recommendThird =  this.validData[i].companyName;
                            }
                        }
                        
                    }else{
                        console.log(res.data.msg);
                    }
                }).catch(err=>{
                    console.log(err)
                })
            },
            
            // 无效标确定按钮
            invalidSure(){
                this.invalidFlag = false;
            },
            // 无效标取消按钮
            invalidCancel(){
                this.invalidFlag = false;
            },
            // 初始化查询
            getInitInfo(){
                let object={}
                if(this.projectObj.totalProjectId.indexOf("-") != -1 && this.projectObj.totalProjectId!=null){
                    // 入场项目分包编号
                    object={
                        entrySubcontractNumber:this.projectObj.totalProjectId
                    }
                }else{
                    // 入场项目编号
                    object ={
                        projectCode:this.projectObj.totalProjectId
                    }
                }
                this.$axios({
                    method: "POST",
                    url: baseUrl+"/evaluationController/selectByProjectCode",
                    data:object
                }).then(res=>{
                    if(res.data.status == 200){
                        this.address = res.data.data.address;// 评标地点
                        this.startTime= formatDate(res.data.data.startTime);// 评标开始时间
                        this.endTime= formatDate(res.data.data.endTime);// 评标结束时间
                        this.method= res.data.data.method;// 评标方式
                        this.situation= res.data.data.situation;// 评标情况
                    }else{
                        console.log(res.data.msg);
                    }
                }).catch(err=>{
                    console.log(err)
                })
            }
		}
    }
</script>

<style scoped>
.newBox{
    width: 100%;
    height: 100%;
    background: #fff;
    position: relative;
}
.wrapper{
    width: 100%;
    height: 100%;
    overflow: hidden;
}
.winWrapper,.editWrapper{
    width: 100%;
    height: 100%;
    position: fixed;
    left: 185px;
    top: 0;
    background: rgba(0, 0, 0, .3);
    z-index: 99;
    padding: 50px;
}
.invalidWrapper{
     width: 100%;
    height: 100%;
    position: fixed;
    left: 185px;
    top: 0;
    background: rgba(0, 0, 0, .3);
    z-index: 99;
    padding:200px;
}
.winBox,.editBox{
    width: 87%;
    height: 100%;
    background: #fff;
    position: relative;
	overflow: hidden;
	overflow-y: scroll;
}
.invalidBox{
    width:  87%;
    height: 100%;
    background: #fff;
    position: relative;
	overflow: hidden;
}
.win_title,.edit_title,.invalid_title{
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
}
.box{
    width: 100%;
    height: 40px;
    background: #e2e2e2;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 0 30px 0 2px;
}
.btn{
    height: 40px;
    padding:0 25px;
    background-color: #0095d5;
    border: none;
    color: #ffffff;
    font-size: 16px;
    cursor: pointer;
    margin-right: 2px;
}
.el-collapse{
    width: 80%;
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
.notic,h6,b{
    color:red;
}
/* 输入框 */
.noteBox{
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items:center;
    padding: 4px 0;
}
.noteItem{
    display: flex;
    align-items: center;
}
.noteItem p{
    padding:  0 5px;
}
.noteLeft{
    width: 130px;
    padding-right: 5px;
    color: #333;
    height: 100%;
    text-align: right;
}
.write_input{
    width: 250px;
}
.write_textarea{
    width: 860px !important;
}
.textarea{
    width: 600px !important;
}
.write_item>.el-select{
    width: 810px !important;
}
.edit_list{
    padding: 0 50px;
}
.noteItem_item{
    width: 400px;
    display: flex;
}
.noteLeft_item{
    width: 100px;
    padding-right: 5px;
    color: #333;
    height: 100%;
    text-align: right;
}
.edit_item{
    width: 150px;
}
/* 弹窗 */
.icon{
    width: 100%;
    padding: 0 10px;
    display: flex;
    align-items: center;
    z-index: 9999;
}
.el-icon-success{
    font-size: 100px;
    color: #0a5e9d;
}
.el-icon-question{
    font-size: 100px;
    color: #0a5e9d;
}
.icon span{
    padding: 0 10px;
    font-size: 20px;
}
.dialog_header{
    width: 100%;
    height: 40px;
    display: flex;
    justify-content: space-between;
    align-items:center;
}
.dialog_header p span{
    color: red;
}
.item_title{
	line-height: 30px;
	font-weight: bold;
	padding: 0 10px;
}
.el-icon-plus{
	font-size: 26px;
}
.main_info{
    width: 80%;
    height: 100%;
    margin: 0 auto;
}
/* 列表展示 */
.edit_list{
    padding: 15px 20px;
}
.editItem{
    width: 100%;
    display: flex;
}
.editCenter{
    width: 50%;
    display: flex;
    padding: 5px 0;
}
.editName{
    width: 145px;
    text-align:right;
}
.editContent{
    flex: 1;
    padding: 0 10px;
    color: #6e622e;
}
</style>