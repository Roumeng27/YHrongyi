<template>
    <div class="newBox">
        <!-- 中标结果公告 -->
        <div class="wrapper" v-show="writeFlag">
            <div class="box" v-show="headerBtn">
                <button class="btn" @click="newly(1)">保存</button>
                <button class="btn" @click="newly(2)">下一步</button>
            </div>
            <div class="main_info">
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
                                    <div class="editName">招标项目编号：</div>
                                    <div class="editContent">{{biddingProjectNumber}}</div>
                                </div>
                                <div class="editCenter">
                                    <div class="editName">招标项目预算金额：</div>
                                    <div class="editContent">{{budgetAmount}}万元</div>
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
                                    <div class="editName">地址：</div>
                                    <div class="editContent">
                                        <el-input v-model="address" clearable></el-input>
                                    </div>
                                </div>
                                <div class="editCenter">
                                    <div class="editName">联系方式：</div>
                                    <div class="editContent">
                                        <el-input v-model="tendereeContactInformation" clearable></el-input>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </el-collapse-item>
                    <!-- 公告信息 -->
                    <el-collapse-item title="公告信息" name="2">
                        <div class="edit_list">
                            <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName">公告名称：</div>
                                    <div class="editContent">
                                        <el-input v-model="announcementName" placeholder="请输入内容" clearable></el-input>
                                    </div>
                                </div>
                                <div class="editCenter">
                                    <div class="editName">中标结果公告</div>
                                    <div class="editContent"></div>
                                </div>
                            </div>
                            <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName">招标公告日期：</div>
                                    <div class="editContent"> {{updateTime}}</div>
                                </div>
                            </div>
                            <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName">定标日期：</div>
                                    <div class="editContent">
                                        <el-date-picker
                                            placeholder="起始日期"
                                            v-model="calibrationDate"
                                        >
                                        </el-date-picker>
                                    </div>
                                </div>
                                <div class="editCenter">
                                    <div class="editName"></div>
                                    <div class="editContent"></div>
                                </div>
                            </div>
                            <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName">项目负责人：</div>
                                    <div class="editContent">
                                        <el-input v-model="projectLeader" clearable></el-input>
                                    </div>
                                </div>
                                <div class="editCenter">
                                    <div class="editName">联系方式：</div>
                                    <div class="editContent">
                                        <el-input v-model="leaderContactInformation" clearable></el-input>
                                    </div>
                                </div>
                            </div>
                            <div class="editItem">
                                <div class="editTextarea">
                                    <div class="editName">备注说明：</div>
                                    <div class="editContent">
                                        <el-input v-model="remarks" type="textarea" :rows="3"></el-input>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </el-collapse-item>
                    <!-- 中标信息 总包-->
                    <el-collapse-item title="中标信息" name="3" v-show="!diffFlag">
                        <div class="edit_list">
                            <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName">招标项目名称：</div>
                                    <div class="editContent">{{nameOfTenderProject}}</div>
                                </div>
                            </div>
                            <div class="editItem">
                                <div class="editTextarea">
                                    <div class="editName">主要中标标的：</div>
                                    <div class="editContent">
                                        <el-input v-model="mainWinningBid" type="textarea" :rows="3"></el-input>
                                    </div>
                                </div>
                            </div>
                            <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName">单价：</div>
                                    <div class="editContent">
                                        <el-input v-model="unitPrice" clearable></el-input>
                                    </div>
                                </div>
                                <div class="editCenter">
                                    <div class="editName">数量：</div>
                                    <div class="editContent">
                                        <el-input v-model="number" clearable></el-input>
                                    </div>
                                </div>
                            </div>
                            <div class="editItem">
                                <div class="editTextarea">
                                    <div class="editName">规格型号：</div>
                                    <div class="editContent">
                                        <el-input v-model="speciﬁcationType" type="textarea" :rows="1"></el-input>
                                    </div>
                                </div>
                            </div>
                            <div class="editItem">
                                <div class="editTextarea">
                                    <div class="editName"><p class="star">*</p> 合同履行期：</div>
                                    <div class="editContent">
                                        <el-date-picker
                                            placeholder="开始日期"
                                            v-model="contractPerformancePeriod"
                                        >
                                        </el-date-picker>
                                    </div>
                                    <div style="padding:0 10px;">至</div>
                                        <div class="editContent">
                                        <el-date-picker
                                            placeholder="结束时间"
                                            v-model="contractPerformanceEnd"
                                        >
                                        </el-date-picker>
                                    </div>
                                </div>
                            </div>
                            <div class="editItem">
                                <div class="editTextarea">
                                    <div class="editName"><p class="star">*</p>中标单位名称：</div>
                                    <div class="editContent">
                                        <el-input v-model="nameOfSuccessfulSupplier" readonly></el-input>
                                    </div>
                                    <el-button plain @click="pickInfo">检索</el-button>
                                </div>
                            </div>
                            <div class="editItem">
                                <div class="editTextarea">
                                    <div class="editName">中标单位地址：</div>
                                    <div class="editContent">
                                        <el-input v-model="addressOfSuccessfulSupplier" clearable></el-input>
                                    </div>
                                </div>
                            </div>
                            <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName"><p class="star">*</p>中标金额(小写)：</div>
                                    <div class="editContent">
                                        <p style="color:#6e622e;">人民币</p>
                                        <el-input v-model="winningAmountLowercase" clearable v-on:blur ='inputblur'></el-input>
                                        <p style="color:#6e622e;">万元</p>
                                    </div>
                                </div>
                                <div class="editCenter" >
                                    <div class="editName"  style="color:#6e622e;padding:0 5px;" >大写</div>
                                    <div class="editContent" style="color:#f00;">
                                        {{winningAmountCapitalization}}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </el-collapse-item>
                    <!-- 中标信息 分包-->
                    <el-collapse-item title="中标信息" name="3" v-show="diffFlag">
                        <div class="item_title">若需添加多分包，请点击 <i class="el-icon-plus" @click="searchSubpackage"></i> 按钮</div>
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
                                prop="subcontractName"
                                label="分包名称">
                            </el-table-column>
                            <el-table-column
                                prop="subcontractingControlAmount"
                                label="分包控制金额(万元)">
                            </el-table-column>
                            <el-table-column
                                prop="entrySubcontractNumber"
                                label="入场项目(分包)编号">
                            </el-table-column>
                            <el-table-column
                                label="查看">
                                <template slot-scope="scope">
                                    <i class="el-icon-search"  style="cursor: pointer;" @click="lookoverItem(scope.row)"></i>
                                </template>
                            </el-table-column>
                            <el-table-column
                                label="中标信息">
                                <template slot-scope="scope">
                                    <i class="el-icon-edit"  style="cursor: pointer;" @click="winItem(scope.row)"></i>
                                </template>
                            </el-table-column>
                            <el-table-column
                                label="删除">
                                <template slot-scope="scope">
                                    <i class="el-icon-close"  style="cursor: pointer;" @click="deleteItem(scope.row)"></i>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-collapse-item>
                </el-collapse>
            </div>
            
        </div>
        <div class="nextWrapper" v-show="showFlag">
            <div class="box" v-show="headerBtn">
                <button class="btn" @click="goBack">上一步</button>
                <button class="btn" @click="submit">提交</button>
            </div>
            <div class="main_info">
                 <el-collapse v-model="activeName" accordion>
                    <!-- 招标项目信息 -->
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
                                    <div class="editName">招标项目编号：</div>
                                    <div class="editContent">{{biddingProjectNumber}}</div>
                                </div>
                                <div class="editCenter">
                                    <div class="editName">招标项目预算金额：</div>
                                    <div class="editContent">{{budgetAmount}}万元</div>
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
                                    <div class="editName">地址：</div>
                                    <div class="editContent">{{address}}</div>
                                </div>
                                <div class="editCenter">
                                    <div class="editName">联系方式：</div>
                                    <div class="editContent">{{tendereeContactInformation}}</div>
                                </div>
                            </div>
                        </div>
                    </el-collapse-item>
                    <!-- 附件 -->
                    <el-collapse-item title="附件" name="2">
                        <div class="notic">注：请上传确认函扫描件或由招标（采购）人对“招标公告”在线签章。</div>
                        <el-table :data="tableData" stripe style="width: 100%">
                            <el-table-column  prop="index"  label="附件名称">
                            </el-table-column>
                            <el-table-column  prop="number"  label="附件列表">
                            </el-table-column>
                        </el-table>
                    </el-collapse-item>
                    <!-- 公告信息 -->
                    <el-collapse-item title="公告信息" name="3">
                        <div class="edit_list">
                            <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName">公告名称：</div>
                                    <div class="editContent">{{announcementName}} </div>
                                </div>
                            </div>
                            <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName">招标公告日期：</div>
                                    <div class="editContent">{{updateTime}}</div>
                                </div>
                            </div>
                            <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName">定标日期：</div>
                                    <div class="editContent">{{calibrationDate}}</div>
                                </div>
                            </div>
                            <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName">项目负责人：</div>
                                    <div class="editContent">{{projectLeader}}</div>
                                </div>
                                <div class="editCenter">
                                    <div class="editName">联系方式：</div>
                                    <div class="editContent">{{leaderContactInformation}}</div>
                                </div>
                            </div>
                            <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName">备注：</div>
                                    <div class="editContent">{{remarks}}</div>
                                </div>
                            </div>
                        </div>
                    </el-collapse-item>
                    <!-- 中标信息 -->
                    <el-collapse-item title="中标信息" name="4">
                        <div class="edit_list">
                            <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName">招标项目名称：</div>
                                    <div class="editContent">{{nameOfTenderProject}} </div>
                                </div>
                            </div>
                            <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName">采购数量：</div>
                                    <div class="editContent">{{purchaseAmount}}</div>
                                </div>
                                <div class="editCenter">
                                    <div class="editName">采购用途：</div>
                                    <div class="editContent">{{purchasePurposes}}</div>
                                </div>
                            </div>
                            <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName">简单技术要求：</div>
                                    <div class="editContent">{{technologyQualifications}}</div>
                                </div>
                            </div>
                            <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName">主要中标标的：</div>
                                    <div class="editContent">{{mainWinningBid}}</div>
                                </div>
                            </div>
                            <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName">单价：</div>
                                    <div class="editContent">{{unitPrice}}</div>
                                </div>
                                <div class="editCenter">
                                    <div class="editName">数量：</div>
                                    <div class="editContent">{{number}}</div>
                                </div>
                            </div>
                            <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName">规格型号：</div>
                                    <div class="editContent">{{speciﬁcationType}}</div>
                                </div>
                            </div>
                            <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName">合同履行期：</div>
                                    <div class="editContent">{{contractPerformancePeriod}}至{{contractPerformanceEnd}}</div>
                                </div>
                            </div>
                            <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName">中标单位名称：</div>
                                    <div class="editContent">{{nameOfSuccessfulSupplier}}</div>
                                </div>
                            </div>
                            <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName">中标单位地址：</div>
                                    <div class="editContent">{{addressOfSuccessfulSupplier}}</div>
                                </div>
                            </div>
                            <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName">中标金额（小写）：</div>
                                    <div class="editContent">{{winningAmountLowercase}}</div>
                                </div>
                            </div>
                        </div>
                    </el-collapse-item>
                    <!-- 公告内容 -->
                    <el-collapse-item title="公告内容" name="5">
                        <div class="edit_list">
                            <div class="infobox_title">
                                <span>test-asking</span>
                                <h1>中标候选人公示</h1>
                                <p>2019年03月15日</p>
                            </div>
                            <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName">招标项目名称：</div>
                                    <div class="editContent">{{nameOfTenderProject}}</div>
                                </div>
                            </div>
                            <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName">招标项目编号：</div>
                                    <div class="editContent">{{biddingProjectNumber}}</div>
                                </div>
                            </div>
                            <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName">招标项目预算金额：</div>
                                    <div class="editContent">{{budgetAmount}}</div>
                                </div>
                            </div>
                            <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName" style="font-weight:bold;">招标(采购)人</div>
                                </div>
                            </div>
                            <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName">招标(采购)人全称：</div>
                                    <div class="editContent">{{nameOfPurchaser}}</div>
                                </div>
                            </div>
                            <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName">招标(采购)人地址：</div>
                                    <div class="editContent">{{address}}</div>
                                </div>
                            </div>
                            <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName">招标(采购)人联系方式：</div>
                                    <div class="editContent">{{tendereeContactInformation}}</div>
                                </div>
                            </div>
                            <div class="infobox_item">
                                <h3>中标内容</h3>
                                <!-- 表格 -->
                                <table border="1" cellspacing="0" cellpadding="0" style="width:100%;">
                                    <tr>
                                        <td>招标项目名称</td>
                                        <td colspan="3">{{nameOfTenderProject}}</td>
                                    </tr>
                                    <tr>
                                        <td style="width:150px;">入场项目分包编号</td>
                                        <td style="width:150px;">{{entrySubcontractNumber}}</td>
                                        <td style="width:150px;">项目预算金额</td>
                                        <td style="width:150px;">{{budgetAmount}}万元</td>
                                    </tr>
                                    <tr>
                                        <td>用途</td>
                                        <td>{{purchasePurposes}}</td>
                                        <td>数量</td>
                                        <td>{{purchaseAmount}}</td>
                                    </tr>
                                    <tr>
                                        <td colspan="4">简要技术要求</td>
                                    </tr>
                                    <tr>
                                        <td colspan="4" height="50px">{{technologyQualifications}}</td>
                                    </tr>
                                    <tr>
                                        <td>主要中标标的</td>
                                        <td>{{mainWinningBid}}</td>
                                        <td>单价</td>
                                        <td>{{unitPrice}}万元</td>
                                    </tr>
                                    <tr>
                                        <td>数量</td>
                                        <td>{{number}}</td>
                                        <td>规格型号</td>
                                        <td>{{speciﬁcationType}}</td>
                                    </tr>
                                    <tr>
                                        <td>合同履行期</td>
                                        <td colspan="3">{{contractPerformancePeriod}}至{{contractPerformanceEnd}}</td>
                                    </tr>
                                    <tr>
                                        <td>中标单位名称</td>
                                        <td colspan="3">{{nameOfSuccessfulSupplier}}</td>
                                    </tr>
                                    <tr>
                                        <td>中标单位地址</td>
                                        <td colspan="3">{{addressOfSuccessfulSupplier}}</td>
                                    </tr>
                                    <tr>
                                        <td>中标金额</td>
                                        <td colspan="3">{{winningAmountLowercase}}</td>
                                    </tr>
                                </table>
                            </div>
                            <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName" style="font-weight:bold;">中标候选人公示期：</div>
                                    <div class="editContent">{{publicityStartTime}}至{{publicityEndTime}}</div>
                                </div>
                            </div>
                            <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName" style="font-weight:bold;">项目联系人：</div>
                                    <div class="editContent">{{projectLeader}}</div>
                                </div>
                            </div>
                            <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName" style="font-weight:bold;">联系方式：</div>
                                    <div class="editContent">{{leaderContactInformation}}</div>
                                </div>
                            </div>
                            <div class="editItem">
                                <div class="editCenter">
                                    <div class="editName" style="font-weight:bold;">备注：</div>
                                    <div class="editContent">{{remarks}}</div>
                                </div>
                            </div>
                            <div class="infobox_footer">
                                <h3>{{creatorName}}</h3>
                                <h3>{{saveTime}}</h3>
                            </div>
                        </div>
                    </el-collapse-item>
                    <!-- 办理记录 -->
                    <el-collapse-item title="办理记录" name="6">
                        <el-table :data="manageDate" stripe style="width: 100%">
                            <el-table-column  prop="step"  label="步骤">
                            </el-table-column>
                            <el-table-column  prop="handlingPersonnel"  label="办理人员">
                            </el-table-column>
                            <el-table-column  prop="creationTime"  label="时间">
                            </el-table-column>
                            <el-table-column  prop="state"  label="状态">
                            </el-table-column>
                            <el-table-column  prop="remarks"  label="备注">
                            </el-table-column>
                        </el-table>
                    </el-collapse-item>
                </el-collapse>
            </div>
        </div>
		<!-- 查看分包信息 -->
		<div class="searchWrapper" v-show="searchFlag">
			<div class="searchBox">
                <div class="search_title">
                    <p>分包信息</p>
                    <i class="el-icon-close" @click="closeSearch"></i>
                </div>
                <div class="search_input">
                    <div class="write">
                        <p>项目(分包)名称：</p>
                        <el-input v-model="name" clearable></el-input>
                    </div>
					<div class="write">
                        <p>入场项目(分包)编号：</p>
                        <el-input v-model="number1" clearable></el-input>
                    </div>
                    <button class="btn"   @click="searchData">搜索</button>
                </div>
                <div class="search_main">
					<el-table
                            ref="multipleTable"
                            :data="candidateMenu"
                            tooltip-effect="dark"
                            style="width: 100%"
                            @selection-change="handleSelectionChange">
                        <el-table-column
                            type="selection"
                            width="55">
                        </el-table-column>
                        <el-table-column
                            label="序号">
                            <template slot-scope="scope">{{ scope.$index+1 }}</template>
                        </el-table-column>
                        <el-table-column
                            prop="entrySubcontractNumber"
                            label="入场项目(分包)编号">
                        </el-table-column>
                        <el-table-column
                            label="招标项目名称">
							<template slot-scope="scope">{{ nameOfTenderProject }}</template>
                        </el-table-column>
                        <el-table-column
                            prop="subcontractName"
                            label="分包名称">
                        </el-table-column>
						<el-table-column
                            prop="subcontractContents"
                            label="分包分类">
                        </el-table-column>
						<el-table-column
                            label="招标方式">
							<template slot-scope="scope">{{ biddingProcurementMode }}</template>
                        </el-table-column>
						<el-table-column
                            prop="subcontractingControlAmount"
                            label="分包控制金额(万元)">
                        </el-table-column>
						<el-table-column
                            prop="subcontractingState"
                            label="分包状态">
                        </el-table-column>
                    </el-table>
                    
                </div>
                <div class="pick_btn">
                    <button class="btn" @click="sureChoice">确定选择</button>
                </div>
            </div>
		</div>
		
		<!-- 查看详情 -->
		<div class="lookWrapper" v-show="lookFlag">
            <div class="lookBox">
				<div class="pick_title">
                    <p>分包信息</p>
                    <i class="el-icon-close" @click="closeLook"></i>
                </div>
				<el-collapse v-model="activeName" accordion>
					<!--分包信息 -->
					<el-collapse-item title="分包信息" name="1">
                        <div class="edit_list">
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
		<!-- 中标信息详情 -->
		<div class="winWrapper" v-show="winFlag">
            <div class="winBox">
               	<div class="pick_title">
                    <p>中标信息</p>
                    <i class="el-icon-close" @click="closeWin"></i>
                </div>
				<div class="box">
					<button class="btn" @click="savePage">保存</button>
				</div>
                <div class="main_info">
                    <el-collapse v-model="activeName" accordion>
                        <!-- 招标项目信息 -->
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
                                        <div class="editName">招标项目编号：</div>
                                        <div class="editContent">{{biddingProjectNumber}}</div>
                                    </div>
                                    <div class="editCenter">
                                        <div class="editName">入场项目编号：</div>
                                        <div class="editContent">{{amountId}}</div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">招标项目金额：</div>
                                        <div class="editContent">{{amountOfBiddingProject}}万元</div>
                                    </div>
                                    <div class="editCenter">
                                        <div class="editName">招标项目类型：</div>
                                        <div class="editContent">{{typesOfBiddingProjects}}</div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">招标采购方式：</div>
                                        <div class="editContent">{{biddingProcurementMode}}</div>
                                    </div>
                                    <div class="editCenter">
                                        <div class="editName">招标组织方式：</div>
                                        <div class="editContent">{{biddingOrganization}}</div>
                                    </div>
                                </div>
                            </div>
                        </el-collapse-item>
                        <!-- 中标信息-->
                        <el-collapse-item title="中标信息" name="2">
                            <div class="edit_list">
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">分包名称：</div>
                                        <div class="editContent">{{nameOfTenderProject}} </div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">分包控制金额：</div>
                                        <div class="editContent">{{subcontractingControlAmount}} </div>
                                    </div>
                                    <div class="editCenter">
                                        <div class="editName">入场项目分包编号：</div>
                                        <div class="editContent">{{entrySubcontractNumber}} </div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">采购数量：</div>
                                        <div class="editContent">{{purchaseAmount}} </div>
                                    </div>
                                    <div class="editCenter">
                                        <div class="editName">采购用途：</div>
                                        <div class="editContent">{{purchasePurposes}} </div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">简单技术要求：</div>
                                        <div class="editContent">{{technologyQualifications}} </div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editTextarea">
                                        <div class="editName">主要中标标的：</div>
                                        <div class="editContent">
                                            <el-input v-model="mainWinningBid" type="textarea" :rows="3"></el-input>
                                        </div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">单价：</div>
                                        <div class="editContent">
                                            <el-input v-model="unitPrice" clearable></el-input>
                                        </div>
                                    </div>
                                    <div class="editCenter">
                                        <div class="editName">数量：</div>
                                        <div class="editContent">
                                            <el-input v-model="number" clearable></el-input>
                                        </div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editTextarea">
                                        <div class="editName">规格型号：</div>
                                        <div class="editContent">
                                            <el-input v-model="speciﬁcationType" type="textarea" :rows="1"></el-input>
                                        </div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editTextarea">
                                        <div class="editName"><p class="star">*</p> 合同履行期：</div>
                                        <div class="editContent">
                                            <el-date-picker
                                                placeholder="开始日期"
                                                v-model="contractPerformancePeriod"
                                            >
                                            </el-date-picker>
                                        </div>
                                        <div style="padding:0 10px;">至</div>
                                        <div class="editContent">
                                            <el-date-picker
                                                placeholder="结束时间"
                                                v-model="contractPerformanceEnd"
                                            >
                                            </el-date-picker>
                                        </div>
                                    </div>
                                </div>
                            <div class="editItem">
                                    <div class="editTextarea">
                                        <div class="editName"><p class="star">*</p>中标单位名称：</div>
                                        <div class="editContent">
                                        <el-input v-model="nameOfSuccessfulSupplier" readonly></el-input>
                                        </div>
                                        <el-button plain @click="pickInfo">检索</el-button>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editTextarea">
                                        <div class="editName">中标单位地址：</div>
                                        <div class="editContent">
                                            <el-input v-model="addressOfSuccessfulSupplier"></el-input>
                                        </div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName"><p class="star">*</p>中标金额(小写)：</div>
                                        <div class="editContent">
                                            <p style="color:#6e622e;">人民币</p>
                                            <el-input v-model="winningAmountLowercase" clearable v-on:blur ='inputblur'></el-input>
                                            <p style="color:#6e622e;">万元</p>
                                        </div>
                                    </div>
                                    <div class="editCenter" >
                                        <div class="editName" style="color:#6e622e;padding:0 5px;">大写</div>
                                        <div class="editContent" style="color:#f00;">{{winningAmountCapitalization}}</div>
                                    </div>
                                </div>
                            </div>
                        </el-collapse-item>
                    </el-collapse>
                </div>
				
            </div>
        </div>
        <!-- 检索 -->
		<div class="pickWrapper" v-show="pickFlag">
            <div class="pickBox">
                <div class="pick_title">
                    <p>选择中标单位</p>
                    <i class="el-icon-close" @click="closePick"></i>
                </div>
                <div class="pick_main">
                    <el-table
                            ref="multipleTable"
                            :data="pickData"
                            tooltip-effect="dark"
                            style="width: 100%">
                        <el-table-column align="center" width="55" label="" >
                            <template slot-scope="scope">
                                <el-radio :label="scope.row.bidCompany" v-model="templateRadio" @change.native="getTemplatePick(scope.row)">&nbsp;</el-radio>
                            </template>
                        </el-table-column>
                        <el-table-column
                            label="序号">
                            <template slot-scope="scope">{{ scope.$index+1  }}</template>
                        </el-table-column>
                        <el-table-column
                            prop="ranking"
                            label="排名">
                        </el-table-column>
                        <el-table-column
                            prop="companyName"
                            label="单位名称">
                        </el-table-column>
                        <el-table-column
                            label="选择">
                            <template slot-scope="scope">
                                <i class="el-icon-plus" @click="copyPick(scope.row)"></i>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <div class="pick_btn">
                    <button class="btn" @click="pickSure">确定选择</button>
                </div>
            </div>
        </div>
         <!-- 保存弹窗 -->
        <el-dialog
            title="执行成功"
            :visible.sync="saveBox"
            width="40%"
            :before-close="handleClose">
            <div class="icon">
                <i class="el-icon-success"></i>
                <span>保存成功！</span>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="saveBoxSure()">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 点击上一步弹窗 -->
        <el-dialog
            title="信息确认"
            :visible.sync="laststepBox"
            width="40%"
            :before-close="handleClose">
            <div class="icon">
                <i class="el-icon-question"></i>
                <span>修改信息将导致电子件列表中的 [招标公告] 重新生成，您确认要继续吗？</span>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="laststepBoxSure()">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 提交弹窗 -->
        <el-dialog
            title="请输入意见"
            :visible.sync="submitBox"
            width="50%">
            <div class="dialog_header">
                <div class="left">
                    <el-button type="primary" @click="sureSubmit">确认提交</el-button>
                    <el-button type="primary" @click="handleClose">取消</el-button>
                    <el-checkbox v-model="remind">手机短信提醒</el-checkbox>
                </div>
                <p>当前步骤: <span>中标结果公告 </span></p>
            </div>
        </el-dialog>
        <!-- 确认提交弹窗 -->
        <el-dialog
            title="执行成功"
            :visible.sync="sureSubmitBox"
            width="40%"
            :before-close="handleClose">
            <div class="icon">
                <i class="el-icon-success"></i>
                <span>提交招标公告成功！</span>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="sure()">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import '../../../assets/css/style.css'
import baseUrl from '../../../api/api'
import {formatDate,digitUppercase,changeTime, formatTime} from '../../../api/base.js'
export default {
    data(){
        return {
			projectObj:JSON.parse(window.localStorage.projectObj),
            activeName:['1','2','3','4','5','6'],
            tableData:[],
            diffFlag:false,
            multipleSelection:[],//多选框
            idcard:'',
			writeFlag:true,// 总包输入 列表
			//检索所需字段
            pickFlag:false,// 弹窗
            readonly: true,// input只可读不可编辑
            pickData:[],
            pickItem:{},// 点击的item
            templateRadio:'',// 检索列表单选框按钮
			// 查看分包信息所需字段
			searchFlag:false,//弹窗
            // 招标项目信息所需字段
            nameOfTenderProject:'',// 招标项目名称
            biddingProjectNumber:'',// 招标项目编号
            nameOfPurchaser:'',// 招标(采购)人
			budgetAmount:'',// 招标项目预算金额
			amountOfBiddingProject:'',//招标项目金额
			biddingProcurementMode:'',// 招标采购方式
			biddingOrganization:'',// 招标组织方式
			typesOfBiddingProjects:'',// 招标项目类型
            // 保存所需字段
            address:'',// 招标人地址
            tendereeContactInformation:'',// 招标人联系方式
            announcementName:'',//֖ 公告名称
            calibrationDate:'',//֖定标日期
            projectLeader:'',// 项目负责人
            leaderContactInformation:'',//֖项目负责人联系方式
            remarks:'',//֖备注
            mainWinningBid:'',// 主要中标标的
            unitPrice:'',//֖单价
            number:'',//数量
            speciﬁcationType:'',//规格型号
            contractPerformancePeriod:'',// 合同履行期开始
            contractPerformanceEnd:'',// 合同履行期结束
            idOfSuccessfulSupplier:'',//中标供应商ID
            nameOfSuccessfulSupplier:'',//中标供应商
            addressOfSuccessfulSupplier:'',//中标供应商地址
            winningAmountLowercase:'',//中标金额 小写
            winningAmountCapitalization:'',//中标金额 大写
            entrySubcontractNumber:'',// 入场项目编号 分包
            projectCode:'',//入场项目编号 总包
			saveBox:false,//保存弹窗
			winnResultId:'',// 中标结果记录ID
			//中标候选人
			technologyQualifications:'',// 简要技术要求
			purchaseAmount:'',// 采购数量
			purchasePurposes:'',//采购用途
            // 下一步页面
            showFlag:false,
            projectLeader:'',// 项目联系人
            projectLeaderPhone:'',//联系方式
            remark:'',// 备注
            // 上一步所需字段
            laststepBox:false,
            // 提交弹窗
            submitBox:false,
            remind:'',//手机短信提醒
            // 确定提交
            sureSubmitBox:false,
            headerBtn:true,
			infoList:[],
			// 公告内容
			publicityStartTime:'',// 中标候选人公示期开始
			publicityEndTime:'',// 中标候选人公示期结束
			CandidateList:[],//中标候选人数据
			amountId:'',// 总包
			candidateMenu:[],// 分包列表
			nameOfTenderProject:'',// 招标项目名称
			biddingProcurementMode:'',// 招标方式
			name:'',// 分包项目名称
			number:'',// 入场项目分包编号 (分包列表)
            subpackageData:[],// 确定选择的列表
            updateTime:'',// 招标公告日期
			// 查看详情
			lookFlag:false,
			// 中标信息详情
			winFlag:false,
			scopeOfTender:'',// 招标范围
			subcontractingControlAmount:'',// 分包控制金额
			qualificationExaminationMethod:'',// 资格审查方式	
			electronicBidEvaluation:'',// 是否电子招投标
			subcontractContents:'',// 分包内容
			subcontractName:'',// 分包名称 
            totalProjectId:'',
            // 办理记录
            manageDate:[],
            creationTime:'',// 时间
            candidateMenuItem:[],
            areaList:[],
            flag:false,// async控制一直请求接口
            itemTemp:{},
            number1:'',
            itemsList:[],// 中标结果公告 返回的items
            creatorName:'',// 创建人名字
            saveTime:'',// 保存时间
        }
    },
    created(){
        if(this.projectObj.totalProjectId.indexOf("-") != -1){
            // 分包
            this.diffFlag = true;
            this.entrySubcontractNumber = this.projectObj.totalProjectId;
        }else{
            // 总包
            this.diffFlag = false;
            this.projectCode = this.projectObj.totalProjectId;
        }
        this.getInitInfo();// 初始化查询
		this.getbiddingInfo();// 招标项目信息
        this.getCandidateInfo();// 获取中标候选人记录数据
        this.getmanageInfo();// 办理记录
        this.getsubpackageInfo();// 分包信息查询
        this.getinformation();// 中标结果公告信息
    },
    methods:{
        // 复选框的列表
        handleSelectionChange(val) {
			this.multipleSelection = val;
		},
		// 检索
        pickInfo(){
            this.pickFlag = true;
            this.getPickInfo();// 检索列表数据
        },
        //关闭检索
        closePick(){
            this.pickFlag = false;
		},
		// 查看
		searchSubpackage(){
			this.searchFlag =true;
			this.getsubInfo(); // +分包信息
		},
		// 关闭搜索
		closeSearch(){
			this.searchFlag = false;
		},
		// 大写
		inputblur(){
			this.winningAmountCapitalization = digitUppercase(this.winningAmountLowercase)
		},
        // 保存和下一步公用方法
        newly(num){
            if(num == 1){
                // 保存
                this.savecandidateInfo(num)
            }else{
                // 下一步
                this.writeFlag = false;// 输入框的页面
				this.showFlag = true;// 下一步页面
				this.savecandidateInfo(num)
				this.getinformation();// 中标结果公告信息
                this.getCandidateInfo();// 获取中标候选人记录数据
                this.getmanageInfo();// 办理记录
            }
        },
        // 上一步
        goBack(){
            this.laststepBox = true;// 上一步弹窗 确定
            this.writeFlag = true;// 输入框的页面
            this.showFlag = false;// 下一步页面
        },
        // 提交
        submit(){
            this.submitBox = true;
        },
        // 确认提交
        sureSubmit(){
            this.$axios({
                method: "POST",
                url: baseUrl+"/winnResultController/submit",
                data:{
                    state:'待办理',
                    winnResultId:this.winnResultId,// 工本费接收账户id 
                }
            }).then(res=>{
                if(res.data.status == 200){
                    this.submitBox = false;
                }else{
                    this.$layer.msg(res.data.msg);
                }
            }).catch(err=>{
                console.log(err)
            })
            this.sureSubmitBox = true;// 确定提交弹窗
        },
        // 确认提交 ---> 确定
        sure(){
            this.sureSubmitBox = false;// 确定提交弹窗
            this.submitBox = false;// 
            this.headerBtn = false;
            this.showFlag = true;
        },
        handleClose(){
            this.saveBox = false;// 保存弹窗 确定
            this.laststepBox = false;// 上一步弹窗 确定
            this.submitBox = false;// 提交弹窗
        },
        // 保存弹窗 确定
        saveBoxSure(){
            this.saveBox = false;
        },
        // 上一步弹窗 确定
        laststepBoxSure(){
            this.laststepBox = false;
        },
        
        // 中标信息
		winItem(row){
            // item 数据
            if(this.infoList.length != 0){
               this.areaList.forEach(item=>{
                if(item.entrySubcontractNumber == row.entrySubcontractNumber){
                        this.mainWinningBid=item.mainWinningBid;
                        this.unitPrice=item.unitPrice;
                        this.number=item.number;
                        this.speciﬁcationType=item.speciﬁcationType;
                        this.contractPerformancePeriod=changeTime(item.contractPerformancePeriod);
                        this.contractPerformanceEnd=changeTime(item.contractPerformanceEnd); 
                        this.nameOfSuccessfulSupplier=item.nameOfSuccessfulSupplier; 
                        this.addressOfSuccessfulSupplier=item.addressOfSuccessfulSupplier;
                        this.winningAmountLowercase=item.winningAmountLowercase;
                        this.winningAmountCapitalization=item.winningAmountCapitalization; 
                    }
                    this.itemTemp = item;
                })     
            }else{
                let obj = {
                    entrySubcontractNumber:this.entrySubcontractNumber,
                    mainWinningBid:this.mainWinningBid,
                    unitPrice:this.unitPrice,
                    number:this.number,
                    speciﬁcationType:this.speciﬁcationType,
                    contractPerformancePeriod:changeTime(this.contractPerformancePeriod),
                    contractPerformanceEnd:changeTime(this.contractPerformanceEnd), 
                    nameOfSuccessfulSupplier:this.nameOfSuccessfulSupplier, 
                    addressOfSuccessfulSupplier:this.addressOfSuccessfulSupplier, 
                    winningAmountLowercase:this.winningAmountLowercase, 
                    winningAmountCapitalization:this.winningAmountCapitalization,
                };
                this.areaList.push(obj);
            }
            
			this.subcontractName = row.subcontractName;
			this.subcontractingControlAmount = row.subcontractingControlAmount;
            this.entrySubcontractNumber = row.entrySubcontractNumber;
			this.winFlag = true;
			this.getbiddingInfo();// 招标项目信息
            this.getinformation();// 招标公告
        },
        // 中标信息详情 保存
        savePage(){
            if(this.infoList.length != 0){
                this.itemTemp.mainWinningBid=this.mainWinningBid;
                this.itemTemp.unitPrice=this.unitPrice;
                this.itemTemp.number=this.number;
                this.itemTemp.speciﬁcationType=this.speciﬁcationType;
                this.itemTemp.contractPerformancePeriod=this.contractPerformancePeriod;
                this.itemTemp.contractPerformanceEnd=this.contractPerformanceEnd;
                this.itemTemp.nameOfSuccessfulSupplier=this.nameOfSuccessfulSupplier;
                this.itemTemp.addressOfSuccessfulSupplier=this.addressOfSuccessfulSupplier;
                this.itemTemp.winningAmountLowercase=this.winningAmountLowercase;
                this.itemTemp.winningAmountCapitalization=this.winningAmountCapitalization;
            }else{
                console.log(111111111111111)
            }
            this.winFlag = false;
        },
        // 保存
        savecandidateInfo(num){
            let object = {}
            if(this.projectObj.totalProjectId.indexOf("-") != -1){
                // 分包
                object = {
                    address:this.address,
                    tendereeContactInformation:this.tendereeContactInformation,
                    announcementName:this.announcementName,
                    calibrationDate:changeTime(this.calibrationDate),
                    projectLeader:this.projectLeader,
                    leaderContactInformation:this.leaderContactInformation,
                    remarks:this.remarks,
                    items:this.areaList
                }
            }else{
                // 总包
                object = {
                    address:this.address,
                    tendereeContactInformation:this.tendereeContactInformation,
                    announcementName:this.announcementName,
                    calibrationDate:changeTime(this.calibrationDate),
                    projectLeader:this.projectLeader,
                    leaderContactInformation:this.leaderContactInformation,
                    remarks:this.remarks,
                    items:[{
                        projectCode:this.projectCode,
                        mainWinningBid:this.mainWinningBid,
                        unitPrice:this.unitPrice,
                        number:this.number,
                        speciﬁcationType:this.speciﬁcationType,
                        contractPerformancePeriod:changeTime(this.contractPerformancePeriod),
                        contractPerformanceEnd:changeTime(this.contractPerformanceEnd),
                        nameOfSuccessfulSupplier:this.nameOfSuccessfulSupplier,
                        addressOfSuccessfulSupplier:this.addressOfSuccessfulSupplier,
                        winningAmountLowercase:this.winningAmountLowercase,
                        winningAmountCapitalization:this.winningAmountCapitalization
                    }]
                }
            }
            this.$axios({
                method:'POST',
                url:baseUrl + '/winnResultController/saveOrUpdate',
                data:object
            }).then(res=>{
                if(res.data.status == 200){
                    if(num == 1){
                        this.saveBox = true;
                    }else{
                        this.saveBox = false;
                        
                    }
                    this.contractPerformancePeriod=formatDate(res.data.data.contractPerformancePeriod);
					this.contractPerformanceEnd=formatDate(res.data.data.contractPerformanceEnd);
					this.calibrationDate = formatDate(res.data.data.calibrationDate);
                    this.winnResultId = res.data.data.winnResultId;
                    this.areaList = res.data.data.items;
                    this.areaList.forEach(item=>{
                        if(this.entrySubcontractNumber == item.entrySubcontractNumber){
                            this.mainWinningBid=item.mainWinningBid;// 主要中标标的
                            this.unitPrice=item.unitPrice;// 单价
                            this.number=item.number;// 数量
                            this.speciﬁcationType=item.speciﬁcationType;// 规格型号
                            this.contractPerformancePeriod=formatDate(item.contractPerformancePeriod);// 合同履行期开始
                            this.contractPerformanceEnd=formatDate(item.contractPerformanceEnd);// 合同履行期结束
                            this.nameOfSuccessfulSupplier=item.nameOfSuccessfulSupplier;// 中标供应商名称
                            this.addressOfSuccessfulSupplier=item.addressOfSuccessfulSupplier;//中标供应商地址
                            this.winningAmountLowercase=item.winningAmountLowercase;// 中标金额小写
                            this.winningAmountCapitalization=item.winningAmountCapitalization;// 中标金额大写
                        }
                    })
                }else{
                    this.$layer.msg(res.data.msg);
                }
            }).catch(err=>{
                console.log(err);
            })
        },
        
        // 中标结果公告信息
        getinformation(){
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
                url: baseUrl+"/tenderNoticeController/select",
                data:object
            }).then(res=>{
                if(res.data.status == 200){
                    this.itemsList = res.data.data[0].items;
                    this.itemsList.forEach(item=>{
                        if(item.entrySubcontractNumber == this.entrySubcontractNumber){
                            this.technologyQualifications=item.technologyQualifications// 简要技术要求
                            this.purchaseAmount=item.purchaseAmount// 采购数量
                            this.purchasePurposes=item.purchasePurposes// 采购用途
                        }
                    })
                    
                }else{
                    this.$layer.msg(res.data.msg);
                }
            }).catch(err=>{
                console.log(err)
            })
        },
       
		// 获取中标候选人记录数据
		getCandidateInfo(){
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
                url: baseUrl+"/winnCandidaController/select",
                data:object
            }).then(res=>{
                if(res.data.status == 200){
                    this.CandidateList = res.data.data;
					this.CandidateList.forEach(item => {
                        this.publicityStartTime = formatDate(item.publicityStartTime);// 公示开始日期
						this.publicityEndTime = formatDate(item.publicityEndTime);// 公示结束日期
                    });
                }else{
                    this.$layer.msg(res.data.msg);
                }
            }).catch(err=>{
                console.log(err)
            })
		},
		
		// 分包列表 搜索
		searchData(){
			this.$axios({
				method: "POST",
				url: baseUrl+"/subcontractItemController/selectListByTotalProjectId",
				data:{
					entrySubcontractNumber:this.number,
					subcontractName:this.name,
					totalProjectId:this.amountId,
					subcontractingState:'办理通过'
				}
			}).then(res=>{
				if(res.data.status == 200){
					this.candidateMenu = res.data.data.list;
				}else{
					this.$layer.msg(res.data.msg);
				}
			}).catch(err=>{
				console.log(err)
			})
		},
		// 分包列表  确定选择
		sureChoice(){
             let arr =[...this.subpackageData,...this.multipleSelection];
                this.subpackageData = this.removeData(arr,'entrySubcontractNumber');
                this.multipleSelection.map((item,index)=>{
                    var obj = {};
                    obj.entrySubcontractNumber = item.entrySubcontractNumber;
                    this.areaList.push(obj);
                })
                this.searchFlag = false;
        },
        // 删除一样值的方法
        removeData(arr,id){
            let hash = {};
            let newArr = arr.reduce((item,next)=>{
                hash[next[id]]?'':hash[next[id]] = true && item.push(next);
                return item;
            },[]);
            return newArr;
        },
        // 删除分包信息
        deleteItem(row){
            for (let i = 0; i < this.subpackageData.length; i++) {
                let item = this.subpackageData[i];
                if(row.subcontractItePrimaryKeyId == item.subcontractItePrimaryKeyId){
                    this.subpackageData.splice(i,1);
                }
            }
        },
		// 查看
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
		//关闭查看详情
		closeLook(){
			this.lookFlag = false;
		},
		closeWin(){
			this.winFlag = false;
		},
        // 办理记录
        getmanageInfo(){
            this.$axios({
                method: "POST",
                url: baseUrl+"/subcontractItemController/selectHistory",
                data:{
                    entrySubcontractNumber:this.projectObj.totalProjectId
                }
            }).then(res=>{
                if(res.data.status == 200){
                    this.manageDate = res.data.data;
                    this.manageDate.forEach(item => {
                        item.creationTime = formatDate(item.creationTime)
                    });
                }else{
                    this.$layer.msg(res.data.msg);
                }
            }).catch(err=>{
                console.log(err)
            })
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
                    this.$layer.msg(res.data.msg);
                }
            }).catch(err=>{
                console.log(err)
            })
        },
        // +分包信息
		getsubInfo(){
			this.$axios({
                method: "POST",
                url: baseUrl+"/winnResultController/subcontract",
                data:{
					entrySubcontractNumber:this.entrySubcontractNumber
				}
            }).then(res=>{
                if(res.data.status == 200){
                    this.candidateMenu = res.data.data;
                }else{
                    this.$layer.msg(res.data.msg);
                }
            }).catch(err=>{
                console.log(err)
            })
        },
         // 初始化分包查询
        async getsubpackageInfo(flag){
            if(flag){
                await this.getInitInfo(true);
            }
            let lookArr = [];
            if(this.projectObj.totalProjectId.indexOf("-") != -1 && this.projectObj.totalProjectId!=null){
                if(this.infoList.length == 0){
                    this.EntrySubNum = this.projectObj.totalProjectId;
                    lookArr.push(this.EntrySubNum);
                }else{
                    this.areaList.map((item,index)=>{
                        this.entrySubcontractNumber = item.entrySubcontractNumber;
                        lookArr.push(this.entrySubcontractNumber);
                    })
                }
            }
            this.$axios({
                method: "POST",
                url: baseUrl+"/projectInformationController/selectByProjectEntrySubcontractNumber",
                data:{
                    projectEntrySubcontractNumbers:lookArr
                }
            }).then(res=>{
                if(res.data.status == 200){
                    this.subpackageData = res.data.data;
                }else{
                    this.$layer.msg(res.data.msg);
                }
            }).catch(err=>{
                console.log(err)
            })
        },
         // 获取中标结果公示记录数据
        getInitInfo(){
            let object = {};
            if(this.projectObj.totalProjectId.indexOf("-") != -1){
                // 分包
                object ={
                    entrySubcontractNumber:this.entrySubcontractNumber
                }
            }else{
                // 总包
                object ={
                    projectCode:this.projectCode
                }
            }
            return  this.$axios({
                method:'POST',
                url:baseUrl + '/winnResultController/select',
                data:object
            }).then(res=>{
                console.log(res,'初始化查詢')
                if(res.data.status == 200){
                    this.areaList = res.data.data[0].items;// 后端返回的items
                    this.infoList = res.data.data;
                    if (res.data.data == null ||  res.data.data.length<=0){
                        this.writeFlag = true; // 有保存和下一步的按钮
                    }else{
                        this.infoList.forEach(item => {
                            if(item.state == '编辑中' || item.state == '办理未通过'){
                                this.writeFlag = false;// 有保存和下一步的按钮
                                this.showFlag = true;// 有上一步和提交的页面
                            }else{
                                this.writeFlag = false;
                                this.headerBtn = false;// 有上一步和提交的按钮
                                this.showFlag = true;
                            }
                            
                            this.address= item.address;
                            this.tendereeContactInformation= item.tendereeContactInformation;
                            this.announcementName= item.announcementName;
                            this.calibrationDate= formatDate(item.calibrationDate);
                            this.projectLeader= item.projectLeader;
                            this.leaderContactInformation= item.leaderContactInformation;
                            this.remarks= item.remarks;
                            this.updateTime = formatDate(item.updateTime);// 招标公告日期
                            this.winnResultId = item.winnResultId;
                            this.saveTime = formatDate(item.saveTime);// 保存时间
                            this.creatorName = item.creatorName;// 创建人名字
                            this.areaList.forEach(item=>{
                                if(this.entrySubcontractNumber == item.entrySubcontractNumber){
                                    this.mainWinningBid=item.mainWinningBid;// 主要中标标的
                                    this.unitPrice=item.unitPrice;// 单价
                                    this.number=item.number;// 数量
                                    this.speciﬁcationType=item.speciﬁcationType;// 规格型号
                                    this.contractPerformancePeriod=formatDate(item.contractPerformancePeriod);// 合同履行期开始
                                    this.contractPerformanceEnd=formatDate(item.contractPerformanceEnd);// 合同履行期结束
                                    this.nameOfSuccessfulSupplier=item.nameOfSuccessfulSupplier;// 中标供应商名称
                                    this.addressOfSuccessfulSupplier=item.addressOfSuccessfulSupplier;//中标供应商地址
                                    this.winningAmountLowercase=item.winningAmountLowercase;// 中标金额小写
                                    this.winningAmountCapitalization=item.winningAmountCapitalization;// 中标金额大写
                                }
                            })
                        });
                    }
                   
                }else{
                    this.$layer.msg(res.data.msg);
                }
            }).catch(err=>{
                console.log(err);
            })
        },
        // 检索列表数据
        getPickInfo(){
            let object = {};
            if(this.projectObj.totalProjectId.indexOf("-") != -1){
                // 分包
                object ={
                    isEffective:"1", 
                    entrySubcontractNumber:this.entrySubcontractNumber
                }
            }else{
                // 总包
                object ={
                    isEffective:"1", 
                    projectCode:this.projectCode
                }
            }
            this.$axios({
                method: "POST",
                url: baseUrl+"/bidInforController/selectList",
                data:object
            }).then(res=>{
                if(res.data.status == 200){
                    this.pickData = res.data.data;
                }else{
                    this.$layer.msg(res.data.msg);
                }
            }).catch(err=>{
                console.log(err)
            })
        },
        // 检索列表+
        copyPick(row){
            this.nameOfSuccessfulSupplier = row.companyName;
            this.pickFlag = false;
        },
        // 中标信息 ---> 挑选---> 列表 ---> 单选框
        getTemplatePick(row){
            this.pickItem = row;
        },
        // 挑选 ---> 确定选择
        pickSure(){
            this.pickFlag =false;
            this.nameOfSuccessfulSupplier = this.pickItem.companyName;
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
.wrapper,.nextWrapper{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
}
/* 检索页面 */
.searchWrapper,.lookWrapper,.winWrapper{
    width: 100%;
    height: 100%;
    position: fixed;
    left: 185px;
    top: 0;
    background: rgba(0, 0, 0, .3);
    z-index: 99;
    padding:50px 20px;
    display: flex;
    flex-direction: column;
}
.box{
    width: 100%;
    height: 40px;
    background: #e2e2e2;
    display: flex;
    justify-content: flex-start;
    align-items: center;
}
.main_info{
    flex: 1;
    overflow: hidden;
    overflow-y: scroll;
}
.pickWrapper{
    width: 100%;
    height: 100%;
    position: fixed;
    left: 185px;
    top: 0;
    background: rgba(0, 0, 0, .3);
    z-index: 999;
    padding: 100px;
}
.pickBox{
    width: 87%;
    height: 100%;
    background: #fff;
    position: relative;
	overflow: hidden;
	overflow-y: scroll;
}
.searchBox,.lookBox,.winBox{
    width: 87%;
    height: 100%;
    background: #fff;
    position: relative;
	overflow: hidden;
	overflow-y: scroll;
}
.pick_title,.search_title{
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
.search_input{
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 10px 50px;
}
.write{
    display: flex;
    align-items: center;
}
.write p{
    width: 220px;
}
.pick_btn {
    position: absolute;
    left: 0;
    top: 500px;
    bottom: 0;
    right: 0;
    margin: auto;
    width: 100px;
    height: 40px;
}
.btn{
    height: 100%;
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
.btn{
    padding: 10px;
}
.notic,h6,b{
    color:red;
}
/* 清空信息 */
.clear{
    display: flex;
    justify-content: flex-end;
    margin-bottom: 5px;
}
.star{
    color: red;
    padding-right: 5px;
}
.infobox{
    width: 100%;
    padding: 0 40px;
}
.infobox_title{
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    line-height: 50px;
    border-bottom: 1px dotted #7F7F7F;
}
.infobox_title span{
    font-size: 20px;
}
.infobox_title h1{
    font-size: 22px;
    font-weight: normal;
}
.infobox_title p{
    font-size: 12px;
}
.infobox_item{
    padding: 10px 0 10px 0;
}
.infobox_item>table>tr{
    text-align: center;
}
.infobox_footer{
    width: 100%;
    text-align: end;
}
/* 弹窗 */
.icon{
    width: 100%;
    padding: 0 10px;
    display: flex;
    align-items: center;
    z-index: 9999;
}
.el-icon-success,.el-icon-question{
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
/* 列表展示 */
.edit_list{
    padding: 15px 20px;
}
.editItem{
    width: 100%;
    display: flex;
    align-items: center;
}
.editCenter{
    flex: 1;
    display: flex;
    padding: 5px 0;
}
.editName{
    width: 145px;
    display: flex;
    justify-content: flex-end;
}
.editContent{
    flex: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
    color: #6e622e;
}
.editContent>p{
    width: 25%;
}
/* 文本框的样式 */
.editTextarea{
    width: 100%;
    padding: 5px 0;
    display: flex;
}
/* 确定选择搜索 */
.pick_input{
    width: 100%;
    padding: 0 30px;
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>