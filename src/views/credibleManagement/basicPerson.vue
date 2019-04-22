<template>
  	<div class="newBox">
		<!-- 从业人员 -->
		<div class="wrapper">
			<div class="box">
				<button class="btn" @click="newEmployees()">新增从业人员</button>
				<el-radio-group v-model="radio" @change="getRadio">
					<el-radio label="">全部</el-radio>
					<el-radio label="编辑中">编辑中</el-radio>
					<el-radio label="待办理">待办理</el-radio>
					<el-radio label="办理通过">办理通过</el-radio>
					<el-radio label="办理未通过">办理未通过</el-radio>
				</el-radio-group>
			</div>
			<!-- 搜索的输入框 -->
			<div class="pick_input" >
				<div class="noteItem">
					<div class="noteLeft">性别：</div>
					<div class="write_input" >
						<el-select v-model="gender" clearable placeholder="请选择" >
							<el-option v-for="item in genderData" :key="item.label" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</div>
				</div>
				<div class="noteItem">
					<div class="noteLeft" style="width:200px;">从业人员姓名：</div>
					<div class="write_input" >
						<el-input v-model="workname" clearable></el-input>
					</div>
				</div>
				<button class="owner_btn" @click="searchList">搜索</button>
			</div>
			<!-- 表格主体部分 -->
			<div class="main_box">
				<el-table 
					ref="multipleTable"
					:data="peoplelist" 
					tooltip-effect="dark"
					style="width: 100%"
					@selection-change="handelPeopleList">
					<el-table-column
						type="selection"
						width="55">
					</el-table-column>
					<el-table-column
						label="序号">
						<template slot-scope="scope">{{ scope.$index+1 }}</template>
					</el-table-column>
					<el-table-column prop="name" label="姓名">
					</el-table-column>
					<el-table-column prop="sex" label="性别">
					</el-table-column>
					<el-table-column prop="idNumber" label="身份证号码" width="180">
					</el-table-column>
					<el-table-column prop="professionalCertificateNumber" label="证号">
					</el-table-column>
					<el-table-column prop="professionalLevel" label="专业等级">
					</el-table-column>
					<el-table-column prop="projectNum" label="在施项目个数">
					</el-table-column>
					<el-table-column prop="state" label="验证情况">
					</el-table-column>
					<el-table-column label="操作" >
						<template slot-scope="scope">
							<i :class="scope.row.state=='编辑中'? 'el-icon-edit' :'el-icon-search'"  @click="editInfo(scope.row)"></i>
						</template>
					</el-table-column>
				</el-table>
			</div>	
			<!-- 分页器 -->
			<div class="pagination" v-if="pageTotal>1">
				<el-pagination
					@size-change="handleSizeChange"
					@current-change="handleCurrentChange"
					:current-page.sync="currentPage"
					:page-size="pageSize"
					layout="total, prev, pager, next, jumper"
					:total="total">
				</el-pagination>
			</div>
		</div>

		<!-- 新增从业人员 -->
		<div class="addWrapper" v-show="addFlag">
			<div class="addBox">
				<div class="add_title">
                    <p>{{title}}</p>
                    <i class="el-icon-close" @click="closeAdd"></i>
                </div>
				<div class="boxTitle">
					<button class="btn" @click="adjunct">附件</button>
					<button class="btn" @click="savePeople">保存</button>
					<button class="btn" @click="nextStep">下一步</button>
				</div>
				<div class="main_info">
					<el-collapse v-model="activeName" accordion>
						<!-- 基本信息 -->
						<el-collapse-item title="基本信息" name="1">
							<div class="edit_list">
								<div class="editItem">
									<div class="editCenter">
										<div class="editName"><p class="star">*</p>姓名：</div>
										<div class="editContent">
											<el-input v-model="name"></el-input>
										</div>
									</div>
									<div class="editCenter">
										<div class="editName">性别：</div>
										<div class="editContent">
											<el-input v-model="sex"></el-input>
										</div>
									</div>
									<div class="editCenter">
										<div class="editName">出生年月：</div>
										<div class="editContent">
											<el-input v-model="birthday"></el-input>
										</div>
									</div>
								</div>
								<div class="editItem">
									<div class="editCenter">
										<div class="editName"><p class="star">*</p>身份证号：</div>
										<div class="editContent">
											<el-input v-model="idNumber"></el-input>
										</div>
									</div>
									<div class="editCenter">
										<div class="editName">所在行政区域：</div>
										<div class="editContent">
											<el-input v-model="administrativeDivision"></el-input>
										</div>
									</div>
									<div class="editCenter">
										<div class="editName">从业年限：</div>
										<div class="editContent">
											<el-input v-model="employeeYear"></el-input>
											<p>年</p>
										</div>
									</div>
								</div>
								<div class="editItem">
									<div class="editCenter">
										<div class="editName">职称：</div>
										<div class="editContent">
											<el-input v-model="academicTitle"></el-input>
										</div>
									</div>
									<div class="editCenter">
										<div class="editName">职务：</div>
										<div class="editContent">
											<el-input v-model="duties"></el-input>
										</div>
									</div>
									<div class="editCenter">
										<div class="editName">学历：</div>
										<div class="editContent">
											<el-input v-model="education"></el-input>
										</div>
									</div>
								</div>
								<div class="editItem">
									<div class="editCenter">
										<div class="editName">电话号码：</div>
										<div class="editContent">
											<el-input v-model="telephoneNumber"></el-input>
										</div>
									</div>
									<div class="editCenter">
										<div class="editName"><p class="star">*</p>手机：</div>
										<div class="editContent">
											<el-input v-model="phone"></el-input>
										</div>
									</div>
									<div class="editCenter">
										<div class="editName">所学专业：</div>
										<div class="editContent">
											<el-input v-model="major"></el-input>
										</div>
									</div>
								</div>
								<div class="editItem" style="margin-top:20px;">
									<div class="editTextarea">
										<div class="editName">从业经历：</div>
										<div class="editContent">
											<el-input v-model="careerExperience" type="textarea" :rows="3"></el-input>
										</div>
									</div>
								</div>
							</div>
						</el-collapse-item>
						<!-- 注册证书 -->
						<el-collapse-item title="注册证书" name="2">
							<div class="mainTitle">
								<button class="btn" @click="addBook">新增</button>
								<button class="btn" @click="deleteBookData">删除</button>
							</div>
							<div class="main_box">
								<el-table ref="multipleTable"
									:data="personalData" 
									tooltip-effect="dark"
									style="width: 100%"
									@selection-change="handelBookList">
									<el-table-column
										type="selection"
										width="55">
									</el-table-column>
									<el-table-column
										label="序号">
										<template slot-scope="scope">{{ scope.$index+1 }}</template>
									</el-table-column>
									<el-table-column prop="qualificationCertificateNum" label="证书编号">
									</el-table-column>
									<el-table-column prop="professionalLevel" label="专业等级">
									</el-table-column>
									<el-table-column prop="certificationDate" label="发证日期" width="180">
									</el-table-column>
									<el-table-column prop="periodValidity" label="有效期">
									</el-table-column>
									<el-table-column label="修改">
										<template slot-scope="scope">
										<i class="el-icon-edit" @click="editBook(scope.row,1)"></i>
										</template>
									</el-table-column>
								</el-table>
							</div>
						</el-collapse-item>
						<!-- 其他证书 -->
						<el-collapse-item title="其他证书" name="2">
							<div class="mainTitle">
								<button class="btn" @click="otherBook">新增</button>
								<button class="btn" @click="deleteOtherData">删除</button>
							</div>
							<div class="main_box">
								<el-table ref="multipleTable"
									:data="otherData" 
									tooltip-effect="dark"
									style="width: 100%"
									@selection-change="handelotherList">
									<el-table-column
										type="selection"
										width="55">
									</el-table-column>
									<el-table-column
										label="序号">
										<template slot-scope="scope">{{ scope.$index+1 }}</template>
									</el-table-column>
									<el-table-column prop="certificateNum" label="证书编号">
									</el-table-column>
									<el-table-column prop="professionalLevel" label="专业等级">
									</el-table-column>
									<el-table-column prop="certificationDate" label="发证日期" width="180">
									</el-table-column>
									<el-table-column prop="periodValidity" label="有效期">
									</el-table-column>
									<el-table-column label="修改">
										<template slot-scope="scope">
										<i class="el-icon-edit" @click="editBook(scope.row,2)"></i>
										</template>
									</el-table-column>
								</el-table>
							</div>
						</el-collapse-item>
					</el-collapse>
				</div>
			</div>
		</div>

		<!-- 查看从业人员明细 -->
		<div class="editWrapper" v-show="editFlag">
			<div class="editBox">
				<div class="edit_title">
                    <p>查看从业人员明细</p>
                    <i class="el-icon-close" @click="closeEdit"></i>
                </div>
				<div class="boxTitle" v-show="diffFlag">
					<button class="btn" >附件</button>
					<button class="btn" @click="correctInfo">修改</button>
				</div>
				<div class="boxTitle" v-show="!diffFlag">
					<button class="btn" @click="goBack">上一步</button>
					<button class="btn" @click="submitInfo">提交</button>
				</div>
				<div class="main_info">
					<el-collapse v-model="activeName" accordion>
						<!-- 基本信息 -->
						<el-collapse-item title="基本信息" name="1">
							<div class="edit_list">
								<div class="editItem">
									<div class="editCenter">
										<div class="editName"><p class="star">*</p>姓名：</div>
										<div class="editContent">{{name}}</div>
									</div>
									<div class="editCenter">
										<div class="editName">性别：</div>
										<div class="editContent">{{sex}}</div>
									</div>
									<div class="editCenter">
										<div class="editName">出生年月：</div>
										<div class="editContent">{{birthday}}</div>
									</div>
								</div>
								<div class="editItem">
									<div class="editCenter">
										<div class="editName"><p class="star">*</p>身份证号：</div>
										<div class="editContent">{{idNumber}}</div>
									</div>
									<div class="editCenter">
										<div class="editName">所在行政区域：</div>
										<div class="editContent">{{administrativeDivision}}</div>
									</div>
									<div class="editCenter">
										<div class="editName">从业年限：</div>
										<div class="editContent">{{employeeYear}}<p>年</p></div>
									</div>
								</div>
								<div class="editItem">
									<div class="editCenter">
										<div class="editName">职称：</div>
										<div class="editContent">{{academicTitle}}</div>
									</div>
									<div class="editCenter">
										<div class="editName">职务：</div>
										<div class="editContent">{{duties}}</div>
									</div>
									<div class="editCenter">
										<div class="editName">学历：</div>
										<div class="editContent">{{education}}</div>
									</div>
								</div>
								<div class="editItem">
									<div class="editCenter">
										<div class="editName">电话号码：</div>
										<div class="editContent">{{telephoneNumber}}</div>
									</div>
									<div class="editCenter">
										<div class="editName"><p class="star">*</p>手机：</div>
										<div class="editContent">{{phone}}</div>
									</div>
									<div class="editCenter">
										<div class="editName">所学专业：</div>
										<div class="editContent">{{major}}</div>
									</div>
								</div>
								<div class="editItem" style="margin-top:20px;">
									<div class="editTextarea">
										<div class="editName">从业经历：</div>
										<div class="editContent">{{careerExperience}}</div>
									</div>
								</div>
								<div class="editItem" style="margin-top:20px;">
									<div class="editTextarea">
										<div class="editName">验证状态：</div>
										<div class="editContent">{{state}}</div>
									</div>
								</div>
							</div>
						</el-collapse-item>
						<!-- 注册证书 -->
						<el-collapse-item title="注册证书" name="2">
							<div class="title">
								<p>注册证书</p>
							</div>
							<div class="main_box">
								<el-table :data="personalData" stripe style="width: 100%">
									<el-table-column
										label="序号">
										<template slot-scope="scope">{{ scope.$index+1 }}</template>
									</el-table-column>
									<el-table-column prop="qualificationCertificateNum" label="证书编号">
									</el-table-column>
									<el-table-column prop="professionalLevel" label="专业等级">
									</el-table-column>
									<el-table-column prop="certificationDate" label="发证日期" width="180">
									</el-table-column>
									<el-table-column prop="periodValidity" label="有效期">
									</el-table-column>
									<el-table-column label="查看">
										<template slot-scope="scope">
											<i class="el-icon-search" @click="lookItem(scope.row,1)"></i>
										</template>
									</el-table-column>
								</el-table>
							</div>
							<div class="title">
								<p>其他证书</p>
							</div>
							<div class="main_box">
								<el-table :data="otherData" stripe style="width: 100%">
									<el-table-column
										label="序号">
										<template slot-scope="scope">{{ scope.$index+1 }}</template>
									</el-table-column>
									<el-table-column prop="qualificationCertificateNum" label="证书编号">
									</el-table-column>
									<el-table-column prop="professionalLevel" label="专业等级">
									</el-table-column>
									<el-table-column prop="certificationDate" label="发证日期" width="180">
									</el-table-column>
									<el-table-column prop="periodValidity" label="有效期">
									</el-table-column>
									<el-table-column label="查看">
										<template slot-scope="scope">
											<i class="el-icon-search" @click="lookItem(scope.row,2)"></i>
										</template>
									</el-table-column>
								</el-table>
							</div>
						</el-collapse-item>
						<!-- 验证历史 -->
						<el-collapse-item title="验证历史" name="3">
							<div class="main_box">
								<el-table :data="tableData" stripe style="width: 100%">
									<el-table-column prop="totalProjectId" label="步骤">
									</el-table-column>
									<el-table-column prop="nameOfTenderProject" label="办理人员">
									</el-table-column>
									<el-table-column prop="biddingProjectNumber" label="时间">
									</el-table-column>
									<el-table-column prop="nameOfPurchaser" label="状态">
									</el-table-column>
									<el-table-column prop="state" label="备注">
									</el-table-column>
								</el-table>
							</div>
						</el-collapse-item>
					</el-collapse>
				</div>
			</div>
		</div>
		
		<!-- 新增证书 -->
		<div class="bookWrapper" v-show="newBookFlag">
			<div class="bookBox">
				<div class="book_title">
					<p>{{booktitle}}</p>
					<i class="el-icon-close" @click="closeNewBook"></i>
				</div>
				<div class="boxTitle">
					<button class="btn" @click="saveBook">保存</button>
				</div>
				<div class="main_info">
					<el-collapse v-model="activeName" accordion>
						<!-- 证书信息 -->
						<el-collapse-item title="证书信息" name="1">
							<div class="edit_list">
								<div class="editItem" v-show="isFlag">
									<div class="editCenter">
										<div class="editName">资格证书编号：</div>
										<div class="editContent">
											<el-input v-model="qualificationCertificateNum"></el-input>
										</div>
									</div>
									<div class="editCenter">
										<div class="editName">注册编号：</div>
										<div class="editContent">
											<el-input v-model="registrationNum"></el-input>
										</div>
									</div>
								</div>
								<div class="editItem">
									<div class="editCenter">
										<div class="editName"><p class="star">*</p>证书编号：</div>
										<div class="editContent">
											<el-input v-model="certificateNum"></el-input>
										</div>
									</div>
									<div class="editCenter">
										<div class="editName">职业资格序列：</div>
										<div class="editContent">
											<el-input v-model="professionalQualificationSeq"></el-input>
										</div>
									</div>
								</div>
								<div class="editItem">
									<div class="editCenter">
										<div class="editName"><p class="star">*</p>专业等级：</div>
										<div class="editContent">
											<el-input v-model="professionalLevel"></el-input>
										</div>
									</div>
									<div class="editCenter">
										<div class="editName">发证日期：</div>
										<div class="editContent">
											<el-date-picker
												v-model="certificationDate"
												type="date"
												placeholder="选择日期"
											>
											</el-date-picker>
											<p style="color:#f00;width:250px;">	</p>
										</div>
									</div>
								</div>
								<div class="editItem">
									<div class="editCenter">
										<div class="editName">有效期：</div>
										<div class="editContent">
											<el-date-picker
												v-model="periodValidity"
												type="date"
												placeholder="选择日期"
											>
											</el-date-picker>
											<p style="color:#f00;width:250px;">注:无有效期,可不填写	</p>
										</div>
									</div>
									<div class="editCenter">
										<div class="editName">发证机关：</div>
										<div class="editContent">
											<el-input v-model="certificationAuthority"></el-input>
										</div>
									</div>
								</div>
							</div>
						</el-collapse-item>
					</el-collapse>
				</div>
			</div>
		</div>

		<!-- 查看证书 -->
		<div class="bookWrapper" v-show="lookBookFlag">
			<div class="bookBox">
				<div class="book_title">
					<p>证书信息</p>
					<i class="el-icon-close" @click="closeLookBook"></i>
				</div>
				<div class="main_info">
					<el-collapse v-model="activeName" accordion>
						<!-- 证书信息 -->
						<el-collapse-item title="证书信息" name="1">
							<div class="edit_list">
								<div class="editItem" v-show="isFlag">
									<div class="editCenter">
										<div class="editName">资格证书编号：</div>
										<div class="editContent">
											{{qualificationCertificateNum}}
										</div>
									</div>
									<div class="editCenter">
										<div class="editName">注册编号：</div>
										<div class="editContent">
											{{registrationNum}}
										</div>
									</div>
								</div>
								<div class="editItem">
									<div class="editCenter">
										<div class="editName"><p class="star">*</p>证书编号：</div>
										<div class="editContent">
											{{certificateNum}}
										</div>
									</div>
									<div class="editCenter">
										<div class="editName">职业资格序列：</div>
										<div class="editContent">
											{{professionalQualificationSeq}}
										</div>
									</div>
								</div>
								<div class="editItem">
									<div class="editCenter">
										<div class="editName"><p class="star">*</p>专业等级：</div>
										<div class="editContent">
											{{professionalLevel}}
										</div>
									</div>
									<div class="editCenter">
										<div class="editName">发证日期：</div>
										<div class="editContent">
											{{certificationDate}}
										</div>
									</div>
								</div>
								<div class="editItem">
									<div class="editCenter">
										<div class="editName">有效期：</div>
										<div class="editContent">
											{{periodValidity}}
										</div>
									</div>
									<div class="editCenter">
										<div class="editName">发证机关：</div>
										<div class="editContent">
											{{certificationAuthority}}
										</div>
									</div>
								</div>
							</div>
						</el-collapse-item>
					</el-collapse>
				</div>
			</div>
		</div>

		<!-- 附件 -->
		<div class="adjunctWrapper" v-show="adjunctFlag">
			<div class="adjunctBox">
				<div class="adjunct_title">
					<p>扫描件列表</p>
					<i class="el-icon-close" @click="closeAdjunct"></i>
				</div>
				<div class="main_box">
					<el-table :data="tableData" stripe style="width: 100%">
						<el-table-column
							label="序号">
							<template slot-scope="scope">{{ scope.$index+1 }}</template>
						</el-table-column>
						<el-table-column prop="totalProjectId" label="附件名称">
						</el-table-column>
						<el-table-column prop="nameOfTenderProject" label="附件列表(点击查看)">
						</el-table-column>
						<el-table-column label="管理">
							<template slot-scope="scope">
								<i class="el-icon-setting" @click="settingInfo"></i>
							</template>
						</el-table-column>
					</el-table>
				</div>
			</div>
		</div>
		<!-- 附件管理 -->
		<div class="adjunctWrapper" v-show="settingFlag">
			<div class="adjunctBox">
				<div class="adjunct_title">
					<p>附件管理-招标采购人从业人员扫描件</p>
					<i class="el-icon-close" @click="closeSetting"></i>
				</div>
				<div class="box" style="margin:5px 0;">
					<div style="height:40px;">
						<button class="btn">作废</button>
						<button class="btn">删除</button>
					</div>
					<button class="btn">上传</button>
				</div>
				<div class="character">
					<h1>招标采购人从业人员扫描件</h1>
				</div>
				<div class="main_box">
					<el-table :data="tableData" stripe style="width: 100%">
						<el-table-column
							label="序号">
							<template slot-scope="scope">{{ scope.$index+1 }}</template>
						</el-table-column>
						<el-table-column prop="totalProjectId" label="文件名称">
						</el-table-column>
						<el-table-column prop="nameOfTenderProject" label="验证状态">
						</el-table-column>
						<el-table-column prop="nameOfTenderProject" label="作废原因">
						</el-table-column>
						<el-table-column prop="nameOfTenderProject" label="文件大小">
						</el-table-column>
						<el-table-column prop="nameOfTenderProject" label="上传人">
						</el-table-column>
						<el-table-column label="上传时间">
						</el-table-column>
					</el-table>
					<div class="font">
						<p>★：附件名称只能由中文，英文字母和数字组成，附件上传大小限制为1024 KB；请上传后缀名为jpg,jpeg,bmp,gif,pdf,png类型的文件! </p>
						<p>★：当出现上传附件错误，而且验证状态为编辑中的话，可点击[删除]按钮删除错误的附件。 </p>
						<p>★：当需要变更验证状态为待验证、验证通过、验证不通过的附件时，请点击[作废]按钮作废该附件。</p>
					</div>
				</div>
			</div>
		</div>
		<!-- 保存成功弹窗 -->
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
		 <!-- 删除回避信息提示 -->
        <el-dialog
            title="系统提示"
            :visible.sync="deleteBox"
            width="40%"
            :before-close="handleClose">
            <div class="icon">
                <i class="el-icon-warning"></i>
                <span>请选择需要删除的回避单位！</span>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="deleteSure()">确 定</el-button>
            </span>
        </el-dialog>
		<!-- 提交弹窗 -->
        <el-dialog
            title="请输入意见"
            :visible.sync="submitBox"
            width="50%">
            <div class="dialog_header">
                <div class="left">
                    <el-button type="primary" @click="sureSubmit">确认</el-button>
                    <el-button type="primary" @click="handleClose">取消</el-button>
                </div>
                <p>当前步骤: <span>诚信库提交 </span></p>
            </div>
			<div class="dialog_main">
				<p style="text-align:center;color:#f00;">备注</p>
				<el-input type="textarea" v-model="desc" :rows="3"></el-input>
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
                <span>信息提交成功！</span>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="sure()">确 定</el-button>
            </span>
        </el-dialog>
  	</div>
</template>

<script>
import '../../assets/css/style.css'
import baseUrl from '../../api/api'
import {isPoneAvailable,formatDate,changeTime} from '../../api/base.js'
export default {
	data(){
		return {
			activeName:['1','2','3','4'],
			radio:'',// 单选框状态
			// 性别下拉框
			genderData:[
				{
					value: '',
					label: '所有选项'
				},{
					value: '女',
					label: '女'
				}, {
					value: '男',
					label: '男'
				}
			],
			// 从业人员所需字段
			userId:'',// 企业ID
			peoplelist:[],// 从业人员列表
			gender:'',// 搜索性别
			workname:'',// 姓名
			sex:'',// 性别
			name:'',// 从业人员姓名
			birthday:'',// 出生年月
			idNumber:'',// 身份证号码
			administrativeDivision:'',// 所在行政区域
			employeeYear:'',// 从业年限
			academicTitle:'',// 职称
			duties:'',// 职务
			education:'',// 学历
			telephoneNumber:'',// 电话号码
			phone:'',// 手机
			major:'',// 所学专业
			careerExperience:'',// 从业经历
			state:'',// 审核状态
			projectNum:'',// 在施项目个数
			professionalLevel:'',// 专业等级
			certificateNum:'',// 证号
			// 新增从业人员
			addFlag:false,
			// 修改
			editFlag:false,
			title:'新增从业人员',// 弹窗头部
			// 下一步
			diffFlag:true,
			// 新增证书
			newBookFlag:false,
			isFlag:true,
			booktitle:'',
			lookBookFlag:false,// 查看
			// 附件
			adjunctFlag:false,
			settingFlag:false,
			// 证书
			employeeId:'',// 从业人员id
			registerId:'',// 证书ID
			qualificationCertificateNum:'',// 资格证书编号
			registrationNum:'',// 注册编号
			certificateNum:'',// 证书编号
			professionalQualificationSeq:'',// 职业资格序列
			professionalLevel:'',// 专业等级
			certificationDate:'',// 发证日期
			periodValidity:'',// 有效期
			certificationAuthority:'',// 发证机关
			multibookData:[],// 注册证书多选框
			multiotherData:[],// 其他证书多选框
			// 保存
			saveBox:false,
			deleteBox:false,
			// 分页器
			currentPage:1,// 当前页
            pageSize: 10, // 每页条数
            pageTotal: 0, //总页数
            total: 0, //总条数
			// 新增从业人员
			addFlag:false,
			personalData:[],// 注册证书
			otherData:[],// 其他证书
			tableData:[],
			// 提交
			submitBox:false,
			desc:'',// 备注
			sureSubmitBox:false,// 确定

		}
	},
	created(){
		this.getUserId();// 获得企业ID
		this.getPeopleList();// 获得从业人员列表
		this.getselectList();//职称下拉框
	},
  	methods:{
	  	// 分页器
		handleSizeChange(val) {
			// 每页条数
		},
		handleCurrentChange(val) {
            // 当前页数
            this.currentPage = val;
            this.getPeopleList();// 获得从业人员列表
		},
		// 单选钮
		getRadio(){
			this.getPeopleList();// 获得从业人员列表
		},
		// 从业人员列表的多选框
		handelPeopleList(val){
			// console.log(val)
		},
		// 注册证书的多选框
		handelBookList(val){
			this.multibookData = val;
		},
		handelotherList(val){
			this.multiotherData = val;
		},
		// 弹窗
		// 关闭
		handleClose(){
			this.saveBox = false;// 保存
			this.deleteBox = false;// 删除
			this.submitBox = false;// 提交
			this.sureSubmitBox = false;// 确定提交
		},
		// 保存提示确定
		saveBoxSure(){
			this.saveBox = false;
			// this.addFlag = false;
		},
		// 删除提示确定
		deleteSure(){
            this.deleteBox = false;
        },
		//新增从业人员
		newEmployees(){
			this.addFlag = true;
			this.title = '新增从业人员'
			this.name='';// 姓名
			this.sex='';//性别
			this.birthday='';//出生年月
			this.idNumber='';//身份证号码
			this.administrativeDivision='';//所在行政区域
			this.employeeYear='';//从业年限
			this.academicTitle='';//职称
			this.duties='';//职务
			this.education='';//学历
			this.telephoneNumber='';//电话号码
			this.phone='';//手机
			this.major='';//所学专业
			this.careerExperience='';// 从业经历
			// 证书为空
			this.personalData = [];
			this.otherData = [];
		},
		// 修改从业人员的保存
		savePeople(){
			let object = {
				employeeId:this.employeeId,
				userId:this.userId,
				name:this.name,// 姓名
				sex:this.sex,//性别
				birthday:this.birthday,//出生年月
				idNumber:this.idNumber,//身份证号码
				administrativeDivision:this.administrativeDivision,//所在行政区域
				employeeYear:this.employeeYear,//从业年限
				academicTitle:this.academicTitle,//职称
				duties:this.duties,//职务
				education:this.education,//学历
				telephoneNumber:this.telephoneNumber,//电话号码
				phone:this.phone,//手机
				major:this.major,//所学专业
				careerExperience:this.careerExperience,// 从业经历
			};
			this.$axios({
				method: "POST",
				url: baseUrl+"/employeeInforController/nextStep",
				data:object
			}).then(res=>{
				if(res.data.status == 200){
					this.employeeId = res.data.data.employeeId;
					this.saveBox = true;
					this.getPeopleList();// 获得从业人员列表
				}else{
					this.$layer.msg(res.data.msg)
				}
			}).catch(err=>{
				console.log(err)
			})
		},
		closeAdd(){
			this.addFlag = false;
		},
		// 查看从业人员
		editInfo(row){
			this.editFlag = true;
			this.diffFlag =true;
			this.employeeId = row.employeeId;
			this.name=row.name;// 从业人员姓名
			this.sex = row.sex;// 性别
			this.birthday=row.birthday;// 出生年月
			this.idNumber=row.idNumber;// 身份证号码
			this.administrativeDivision=row.administrativeDivision;// 所在行政区域
			this.employeeYear=row.employeeYear;// 从业年限
			this.academicTitle=row.academicTitle;// 职称
			this.duties=row.duties;// 职务
			this.education=row.education;// 学历
			this.telephoneNumber=row.telephoneNumber;// 电话号码
			this.phone=row.phone;// 手机
			this.major=row.major;// 所学专业
			this.careerExperience=row.careerExperience;// 从业经历
			this.state=row.state;// 审核状态
			this.getPersonalInfo();// 人员资质注册证书
			this.getOtherInfo();// 人员资质其他证书
		},
		closeEdit(){
			this.editFlag = false;
		},
		// 修改
		correctInfo(){
			this.editFlag = false;// 查看从业人员
			this.addFlag = true;//新增从业人员
			this.title = '修改从业人员'
			this.diffFlag =true;
			this.getPersonalInfo();// 人员资质注册证书
			this.getOtherInfo();// 人员资质其他证书
		},
		//下一步
		nextStep(){
			this.editFlag = true;
			this.diffFlag =false;
		},
		// 上一步
		goBack(){
			this.addFlag = true;
			this.editFlag = false;
		},
		// 确认提交
		sureSubmit(){
			this.$axios({
				method: "POST",
				url: baseUrl+"/employeeInforController/admissionEmployeeSubmission",
				data:{
					employeeId:this.employeeId,
					state:'待办理'
				}
			}).then(res=>{
				if(res.data.status == 200){
					this.submitBox = false;
					this.sureSubmitBox = true;
					
				}else{
					this.$layer.msg(res.data.msg)
				}
			}).catch(err=>{
				console.log(err)
			})
		},
		// 确认提交的确定按钮
		sure(){
			this.addFlag = false;// 新增从业人员弹窗
			this.editFlag = false;// 从业人员明细弹窗
			this.getPeopleList();// 获得从业人员列表
			this.sureSubmitBox =false;
		},
		// 提交
		submitInfo(){
			this.submitBox = true;// 提交弹窗
		},
		// 搜索
		searchList(){
			this.getPeopleList();// 获得从业人员列表
		},
		// 新增证书
		addBook(){
			if(this.name =='' || this.idNumber =='' || this.phone ==''){
				this.name = '姓名必填';
				this.idNumber = '身份证号必填';
				this.phone = '手机必填';
				return ;
			}else{
				this.newBookFlag = true;
				this.booktitle = '新增证书';
				this.qualificationCertificateNum = '';// 资格证书编号
				this.registrationNum='';//注册编号
				this.certificateNum='';//证书编号
				this.professionalQualificationSeq='';//职业资格序列
				this.professionalLevel='';//专业等级
				this.certificationDate='';//发证日期
				this.periodValidity='';//有效期
				this.certificationAuthority='';//发证机关
			}
		},
		closeNewBook(){
			this.newBookFlag = false;
		},
		// 删除证书
		deleteBookData(){
			let arr =[];
            this.multibookData.forEach(item=>{
                arr.push(item.registerId)
            })
            if(arr.length <= 0){
                this.deleteBox = true;
            }else{
                this.$axios({
                    method: "POST",
                    url: baseUrl+"/registerInforController/deleteById",
                    data:{
                        listId:arr
                    }
                }).then(res=>{
                    if(res.data.status == 200){
                        this.getPersonalInfo();// 人员资质注册证书
                    }else{
                        this.$layer.msg(res.data.msg);
                    }
                }).catch(err=>{
                    console.log(err)
                })
            }
		},
		// 其他证书
		otherBook(){
			this.newBookFlag = true;
			this.isFlag = false;
			this.booktitle = '新增证书';
			this.certificateNum='';//证书编号
			this.professionalQualificationSeq='';//职业资格序列
			this.professionalLevel='';//专业等级
			this.certificationDate='';//发证日期
			this.periodValidity='';//有效期
			this.certificationAuthority='';//发证机关
		},
		// 修改证书
		editBook(row,num){
			this.newBookFlag = true;
			this.booktitle = '修改证书';
			if(num == 1){
				this.employeeId = row.employeeId;
				this.registerId = row.registerId;
				this.isFlag = true;
				// 注册证书
				this.qualificationCertificateNum = row.qualificationCertificateNum;// 资格证书编号
				this.registrationNum=row.registrationNum;//注册编号
				this.certificateNum=row.certificateNum;//证书编号
				this.professionalQualificationSeq=row.professionalQualificationSeq;//职业资格序列
				this.professionalLevel=row.professionalLevel;//专业等级
				this.certificationDate=row.certificationDate;//发证日期
				this.periodValidity=row.periodValidity;//有效期
				this.certificationAuthority=row.certificationAuthority;//发证机关
			}else{
				// 其他证书
				this.employeeId = row.employeeId;
				this.registerId = row.registerId;
				this.isFlag = false;
				this.certificateNum=row.certificateNum;//证书编号
				this.professionalQualificationSeq=row.professionalQualificationSeq;//职业资格序列
				this.professionalLevel=row.professionalLevel;//专业等级
				this.certificationDate=row.certificationDate;//发证日期
				this.periodValidity=row.periodValidity;//有效期
				this.certificationAuthority=row.certificationAuthority;//发证机关
			}
		},
		// 查看证书
		lookItem(row,num){
			this.lookBookFlag = true;
			if(num == 1){
				this.isFlag = true;
				// 注册证书
				this.qualificationCertificateNum = row.qualificationCertificateNum;// 资格证书编号
				this.registrationNum=row.registrationNum;//注册编号
				this.certificateNum=row.certificateNum;//证书编号
				this.professionalQualificationSeq=row.professionalQualificationSeq;//职业资格序列
				this.professionalLevel=row.professionalLevel;//专业等级
				this.certificationDate=row.certificationDate;//发证日期
				this.periodValidity=row.periodValidity;//有效期
				this.certificationAuthority=row.certificationAuthority;//发证机关
			}else{
				// 其他证书
				this.isFlag = false;
				this.certificateNum=row.certificateNum;//证书编号
				this.professionalQualificationSeq=row.professionalQualificationSeq;//职业资格序列
				this.professionalLevel=row.professionalLevel;//专业等级
				this.certificationDate=row.certificationDate;//发证日期
				this.periodValidity=row.periodValidity;//有效期
				this.certificationAuthority=row.certificationAuthority;//发证机关
			}
		},
		closeLookBook(){
			this.lookBookFlag = false;
		},
		// 删除其他证书
		deleteOtherData(){
			let arr =[];
            this.multiotherData.forEach(item=>{
                arr.push(item.registerId)
            })
            if(arr.length <= 0){
                this.deleteBox = true;
            }else{
                this.$axios({
                    method: "POST",
                    url: baseUrl+"/registerInforController/deleteById",
                    data:{
                        listId:arr
                    }
                }).then(res=>{
                    if(res.data.status == 200){
                        this.getOtherInfo();// 人员资质其他证书
                    }else{
                        this.$layer.msg(res.data.msg);
                    }
                }).catch(err=>{
                    console.log(err)
                })
            }
		},
		// 新增证书保存
		saveBook(){
			let object = {};
			if(this.isFlag == true){
				// 注册证书
				object = {
					registerId:this.registerId,
					employeeId:this.employeeId,
					qualificationCertificateNum:this.qualificationCertificateNum,
					registrationNum:this.registrationNum,//注册编号
					certificateNum:this.certificateNum,//证书编号
					professionalQualificationSeq:this.professionalQualificationSeq,//职业资格序列
					professionalLevel:this.professionalLevel,//专业等级
					certificationDate:changeTime(this.certificationDate),//发证日期
					periodValidity:changeTime(this.periodValidity),//有效期
					certificationAuthority:this.certificationAuthority,//发证机关
					type:1
				}
			}else{
				// 其他证书
				object ={
					registerId:this.registerId,
					employeeId:this.employeeId,
					qualificationCertificateNum:this.qualificationCertificateNum,
					registrationNum:this.registrationNum,//注册编号
					certificateNum:this.certificateNum,//证书编号
					professionalQualificationSeq:this.professionalQualificationSeq,//职业资格序列
					professionalLevel:this.professionalLevel,//专业等级
					certificationDate:changeTime(this.certificationDate),//发证日期
					periodValidity:changeTime(this.periodValidity),//有效期
					certificationAuthority:this.certificationAuthority,//发证机关
					type:0
				}
			}
			this.$axios({
				method: "POST",
				url: baseUrl+"/registerInforController/save",
				data:object
			}).then(res=>{
				if(res.data.status == 200){
					this.newBookFlag = false;
					this.getPersonalInfo();// 人员资质注册证书
					this.getOtherInfo();// 人员资质其他证书
				}else{
					this.$layer.msg(res.data.msg);
				}
			}).catch(err=>{
				console.log(err)
			})
		},
		// 附件
		adjunct(){
			this.adjunctFlag = true;
		},
		closeAdjunct(){
			this.adjunctFlag = false;
		},
		// 附件管理
		settingInfo(){
			this.settingFlag =true;
		},
		closeSetting(){
			this.settingFlag =false;
		},
		// 获得企业ID
		 getUserId(){
			return this.$axios({
				method: "POST",
				url: baseUrl+"/userController/selectByPersonnelId",
				data:{
					personnelId:'test'
				}
			}).then(res=>{
				if(res.data.status == 200){
					this.userId = res.data.data.userId;
				}else{
					this.$layer.msg(res.data.msg);
				}
			}).catch(err=>{
				console.log(err)
			})
		},
		// 获得从业人员列表
		async getPeopleList(){
			await this.getUserId();
			this.$axios({
				method: "POST",
				url: baseUrl+"/employeeInforController/selectList",  
				data:{
					userId:this.userId,
					state:this.radio,
					sex:this.gender,
					name:this.workname
				}
			}).then(res=>{
				if(res.data.status == 200){
					this.peoplelist = res.data.data.list;
					this.peoplelist.forEach(item=>{
						item.state = item.state;
					})
				}else{
					this.$layer.msg(res.data.msg);
				}
			}).catch(err=>{
				console.log(err)
			})
		},
		// 人员资质注册证书
		getPersonalInfo(){
			this.$axios({
				method: "POST",
				url: baseUrl+"/registerInforController/selectList",
				data:{
					employeeId:this.employeeId,
					type:1
				}
			}).then(res=>{
				if(res.data.status == 200){
					this.personalData = res.data.data;
					this.personalData.forEach(item=>{
						item.certificationDate = formatDate(item.certificationDate);// 发证日期
						item.periodValidity = formatDate(item.periodValidity);// 有效期
					})
				}else{
					this.$layer.msg(res.data.msg);
				}
			}).catch(err=>{
				console.log(err)
			})
		},
		// 人员资质其他证书
		getOtherInfo(){
			this.$axios({
				method: "POST",
				url: baseUrl+"/registerInforController/selectList",
				data:{
					employeeId:this.employeeId,
					type:0
				}
			}).then(res=>{
				if(res.data.status == 200){
					this.otherData = res.data.data;
					this.otherData.forEach(item=>{
						item.certificationDate = formatDate(item.certificationDate);// 发证日期
						item.periodValidity = formatDate(item.periodValidity);// 有效期
					})
				}else{
					this.$layer.msg(res.data.msg);
				}
			}).catch(err=>{
				console.log(err)
			})
		},
		// 下拉框 职称
		getselectList(){
			this.$axios({
				method: "POST",
				url: baseUrl+"/interfaceTableController/selectByname",
				data:{
					dropDownBox:'职称'
				}
			}).then(res=>{
				if(res.data.status == 200){
					this.academicData = res.data.data
				}else{
					this.$layer.msg(res.data.msg);
				}
			}).catch(err=>{
				console.log(err)
			})
		},
		// 下拉框 学历
		getEducation(){
			this.$axios({
				method: "POST",
				url: baseUrl+"/interfaceTableController/selectByname",
				data:{
					dropDownBox:'学历'
				}
			}).then(res=>{
				if(res.data.status == 200){
					this.educationData = res.data.data
				}else{
					this.$layer.msg(res.data.msg);
				}
			}).catch(err=>{
				console.log(err)
			})
		}
  	},
}
</script>
<style scoped>
	.newBox {
		width: 100%;
		height: 100%;
		background: #fff;
		position: relative;
	}
	/* 主页面 */
	.wrapper{
		width: 100%;
	}
	.box{
		width: 100%;
		height: 40px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 20px 0 0;
		background: #e2e2e2;
	}
	.btn {
		height: 100%;
		padding:0 25px;
		background-color: #0095d5;
		border: none;
		color: #ffffff;
		font-size: 16px;
		cursor: pointer;
		margin-right: 2px;
	}
	.pick_input{
		width: 100%;
		padding: 0 30px;
		height: 50px;
		display: flex;
		justify-content: space-between;
		align-items: center;
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
		display: flex;
		justify-content: flex-end;
	}
	.write_input{
		width: 250px;
	}
	.write_input>.el-select{
		width: 250px;
	}
	.owner_btn{
		height: 35px;
		padding:0 25px;
		background-color: #0095d5;
		border: none;
		color: #ffffff;
		font-size: 16px;
		cursor: pointer;
		margin-right: 2px;
	}
	/* 新增从业人员 */
	.addWrapper,.editWrapper{
		width: 100%;
		height: 100%;
		position: fixed;
		left: 0;
		top: 0;
		background: rgba(0, 0, 0, .3);
		z-index: 99;
		padding: 10px;
	}
	.adjunctWrapper{
		width: 100%;
		height: 100%;
		position: fixed;
		left: 0;
		top: 0;
		background: rgba(0, 0, 0, .3);
		z-index: 99;
		padding: 10px;
	}
	.addBox,.editBox,.adjunctBox{
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		background: #fff;
	}
	.add_title,.edit_title,.adjunct_title{
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
	.boxTitle{
		width: 100%;
		height: 40px;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		padding: 0 20px 0 0;
		background: #e2e2e2;
	}
	.main_info{
		width: 100%;
		flex: 1;
		overflow: hidden;
		overflow-y: scroll;
	}
	.el-collapse{
		width: 80%;
		margin: 10px auto;
	}
	 /* 列表展示 */
    .edit_list{
        padding: 15px 20px;
    }
    .editItem{
        width: 100%;
		height: 40px;
        display: flex;
    }
    .editCenter{
        flex: 1;
		height: 100%;
        display: flex;
		justify-content: flex-start;
		align-items: center;
    }
    .editName{
        width: 145px;
		display: flex;
		justify-content: flex-end;
		align-items: center;
    }
	.star{
		color: #f00;
		line-height: 40px;
		padding: 0 5px;
	}
    .editContent{
        flex: 1;
		display: flex;
		align-items: center;
        padding: 0 10px;
        color: #6e622e;
    }
	.editContent p{
		padding:  0 2px;
	}
	/* 文本框的样式 */
    .editTextarea{
        width: 100%;
        display: flex;
        padding: 0 5px;
    }
	.mainTitle{
		width: 100%;
		height: 40px;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		padding: 0 20px 0 0;
		margin: 5px 0;
	}
	.title>p{
		line-height: 20px;
	}

	/* 新增证书 */
	.bookWrapper{
		width: 100%;
		height: 100%;
		position: fixed;
		left: 0;
		top: 0;
		background: rgba(0, 0, 0, .3);
		z-index: 999;
		padding:50px ;
	}
	.bookBox{
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		background: #fff;
	}
	.book_title{
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
	.main_box{
		flex: 1;
	}
	.character h1{
		text-align: center;
		font-size: 30px;
	}
	.font{
		color: #f00;
	}
	/* 弹窗 */
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
	.icon{
		width: 100%;
		padding: 0 10px;
		display: flex;
		align-items: center;
		z-index: 9999;
	}
	.el-icon-success,.el-icon-warning{
		font-size: 100px;
		color: #0a5e9d;
	}
	.icon span{
		padding: 0 10px;
		font-size: 20px;
	}
</style>