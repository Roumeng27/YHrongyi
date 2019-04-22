<template>
	<div class="myDiv">
		 <div class="newBox">
			<!-- 上一步弹框 -->
			<div class="editWrapper" v-show="editFlag">
				<div class="edit_title">
					<button class="btn" @click="saveFile()">保存</button>
					<button class="btn" @click="nextTo()">下一步</button>
				</div>
				<div class="newly_main">
					<el-collapse v-model="activeName" accordion>
						<el-collapse-item title="基本情况" name="1">
							<div class="edit_list">
								<!-- 单位全称 -->
								<div class="noteBox">
									<div class="noteItem">
										<div class="noteLeft"><p class="star">*</p> 单位全称：</div>
										<div class="write_textarea">
											<el-input v-model="companyName" type="textarea"></el-input>
										</div>
									</div>
								</div>
								<!--  单位性质 经济类型-->
								<div class="noteBox">
									<div class="noteItem">
										<div class="noteLeft"><p class="star">*</p> 单位性质：</div>
										<div class="write_input">
											<el-select v-model="companyProperty" placeholder="请选择" clearable>
												<el-option v-for="item in propertyData" :key="item.value" :label="item.label" :value="item.value">
												</el-option>
											</el-select>
										</div>
									</div>
									<div class="noteItem">
										<div class="noteLeft"> <p class="star">*</p>经济类型：</div>
										<div class="write_input">
											<el-select v-model="economicType" placeholder="请选择" clearable>
												<el-option v-for="item in economicData" :key="item.value" :label="item.label" :value="item.value">
												</el-option>
											</el-select>
										</div>
									</div>
								</div>
								<!--  单位注册地区 单位网址-->
								<div class="noteBox">
									<div class="noteItem">
										<div class="noteLeft"><p class="star">*</p> 单位注册地区：</div>
										<div class="write_input">
											<el-cascader :options="addressList"	v-model="registePlace" ref="addArr"	@change="handleChange">
											</el-cascader>
										</div>
									</div>
									<div class="noteItem">
										<div class="noteLeft"> 单位网址：</div>
										<div class="write_input">
											<el-input v-model="companyWebsite" clearable></el-input>
										</div>
									</div>
								</div>
								<!-- 单位注册地址 单位注册邮编 -->
								<div class="noteBox">
									<div class="noteItem">
										<div class="noteLeft">单位注册地址：</div>
										<div class="write_input">
											<el-input v-model="companyRegisterAddress" placeholder="请输入内容" clearable></el-input>
										</div>
									</div>
									<div class="noteItem">
										<div class="noteLeft">单位注册邮编：</div>
										<div class="write_input">
											<el-input v-model="registerAddressZipCode" placeholder="请输入内容" clearable></el-input>
										</div>
									</div>
								</div>
								<!-- 单位营业地址 营业地址邮编-->
								<div class="noteBox">
									<div class="noteItem">
										<div class="noteLeft"><p class="star">*</p>单位营业地址：</div>
										<div class="write_input">
											<el-input v-model="companyBusinessAddress" placeholder="请输入内容" clearable></el-input>
										</div>
									</div>
									<div class="noteItem">
										<div class="noteLeft"><p class="star">*</p>营业地址邮编：</div>
										<div class="write_input">
											<el-input v-model="businessAddressZipCode" placeholder="请输入内容" clearable></el-input>
										</div>
									</div>
								</div>
								<!-- 基本开户行 基本账户号-->
								<div class="noteBox">
									<div class="noteItem">
										<div class="noteLeft">基本开户行：</div>
										<div class="write_input">
											<el-input v-model="bankDeposit" placeholder="请输入内容" clearable></el-input>
										</div>
									</div>
									<div class="noteItem">
										<div class="noteLeft">基本账户号：</div>
										<div class="write_input">
											<el-input v-model="accountNumber" placeholder="请输入内容" clearable></el-input>
										</div>
									</div>
								</div>
								<!-- 税务登记证号 统一社会信用代码-->
								<div class="noteBox">
									<div class="noteItem">
										<div class="noteLeft"><p class="star">*</p>税务登记证号：</div>
										<div class="write_input">
											<el-input v-model="taxRegistrationCertificateNum" placeholder="请输入内容" clearable></el-input>
										</div>
									</div>
									<div class="noteItem">
										<div class="noteLeft">统一社会信用代码：</div>
										<div class="write_input">
											<el-input v-model="socialCreditCode" placeholder="请输入内容" clearable></el-input>
										</div>
									</div>
								</div>
								<!-- 单位负责人 负责人联系方式-->
								<div class="noteBox">
									<div class="noteItem">
										<div class="noteLeft"><p class="star">*</p>单位类型：</div>
										<div class="write_input">
											<el-checkbox-group v-model="companyTypeArr">
												<div class="write_checked">
													<el-checkbox label="招标(采购)人"></el-checkbox>
													<el-checkbox label="招标(采购)代理"></el-checkbox>
													<el-checkbox label="投标(供应商)人"></el-checkbox>
													<el-checkbox label="出让代理"></el-checkbox>
												</div>
												<div>
													<el-checkbox label="出让人"></el-checkbox>
													<el-checkbox label="竞买人"></el-checkbox>
													<el-checkbox label="竞买个人"></el-checkbox>
												</div>
											</el-checkbox-group>
										</div>
									</div>
								</div>
								<!-- 单位负责人 负责人联系方式-->
								<div class="noteBox">
									<div class="noteItem">
										<div class="noteLeft"><p class="star">*</p>单位负责人：</div>
										<div class="write_input">
											<el-input v-model="contacts" placeholder="请输入内容" clearable></el-input>
										</div>
									</div>
									<div class="noteItem">
										<div class="noteLeft"><p class="star">*</p>负责人联系方式：</div>
										<div class="write_input">
											<el-input v-model="contactsPhone" placeholder="请输入内容" clearable @blur="blurPhone()"></el-input>
										</div>
									</div>
								</div>
							</div>
						</el-collapse-item>
						<el-collapse-item title="组织机构代码" name="2">
							<div class="edit_list">
								<!-- 组织机构代码 机构类型 -->
								<div class="noteBox">
									<div class="noteItem">
										<div class="noteLeft"><p class="star">*</p> 组织机构代码：</div>
										<div class="write_input">
											<el-input v-model="organizationCode"></el-input>
										</div>
									</div>
									<div class="noteItem">
										<div class="noteLeft">机构类型：</div>
										<div class="write_input">
											<el-select v-model="organizationType" placeholder="请选择" clearable>
												<el-option v-for="item in mechanismData" :key="item.value" :label="item.label" :value="item.value">
												</el-option>
											</el-select>
										</div>
									</div>
								</div>
								<!-- 颁发单位 登记号 -->
								<div class="noteBox">
									<div class="noteItem">
										<div class="noteLeft"> 颁发单位：</div>
										<div class="write_input">
											<el-input v-model="issueCompany" placeholder="请输入内容" clearable></el-input>
										</div>
									</div>
									<div class="noteItem">
										<div class="noteLeft">登记号：</div>
										<div class="write_input">
											<el-input v-model="registrationNumber" placeholder="请输入内容" clearable></el-input>
										</div>
									</div>
								</div>
								<!-- 有效期始 有效期至 -->
								<div class="noteBox">
									<div class="noteItem">
										<div class="noteLeft"> 有效期：</div>
										<div class="write_input">
											<el-date-picker v-model="validity" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
    										</el-date-picker>
										</div>
									</div>
								</div>
							</div>
						</el-collapse-item>
						<el-collapse-item title="营业执照" name="3">
							<div class="edit_list">
								<!-- 注册号 企业类型-->
								<div class="noteBox">
									<div class="noteItem">
										<div class="noteLeft"><p class="star">*</p>注册号：</div>
										<div class="write_input">
											<el-input v-model="registrationNum" placeholder="请输入内容" clearable></el-input>
										</div>
									</div>
									<div class="noteItem">
										<div class="noteLeft"><p class="star">*</p>企业类型：</div>
										<div class="write_input">
											<el-select v-model="enterprisesType" placeholder="请选择活动区域" clearable>
												<el-option v-for="item in enterprisesData" :key="item.value" :label="item.label" :value="item.value">
												</el-option>
											</el-select>
										</div>
									</div>
								</div>
								<!-- 法定代表人 法定代表人身份证号-->
								<div class="noteBox">
									<div class="noteItem">
										<div class="noteLeft"><p class="star">*</p>法定代表人：</div>
										<div class="write_input">
											<el-input v-model="legalRepresentative" placeholder="请输入内容" clearable></el-input>
										</div>
									</div>
									<div class="noteItem">
										<div class="noteLeft"><p class="star">*</p>法定代表人身份证号：</div>
										<div class="write_input">
											<el-input v-model="legalIdNumber" placeholder="请输入内容" clearable @blur="getIdNumber()"></el-input>
										</div>
									</div>
								</div>
								<!-- 注册资金 币种-->
								<div class="noteBox">
									<div class="noteItem">
										<div class="noteLeft"><p class="star">*</p>注册资金：</div>
										<div class="write_money">
											<div class="money">
												<el-input v-model="registeredCapital" clearable></el-input>
											</div>
											<p>万元</p>
										</div>
									</div>
									<div class="noteItem">
										<div class="noteLeft"><p class="star">*</p>币种：</div>
										<div class="write_input">
											<el-select v-model="currency" placeholder="请选择" clearable>
												<el-option v-for="item in currencyData" :key="item.value" :label="item.label" :value="item.value">
												</el-option>
											</el-select>
										</div>
									</div>
								</div>
								<!-- 年检有效期 是否长期有效-->
								<div class="noteBox">
									<div class="noteItem">
										<div class="noteLeft">年检有效期：</div>
										<div class="write_input">
											<el-date-picker	placeholder=""	v-model="yearlyInspectionPeriod"	value-format="timestamp">
											</el-date-picker>
										</div>
									</div>
									<div class="noteItem">
										<div class="noteLeft">是否长期有效：</div>
										<div class="write_input">
											<el-radio-group v-model="isLongTerm" @change="changeLongTime()">
												<el-radio  label="是">是</el-radio>
												<el-radio  label="否">否</el-radio>
											</el-radio-group>
											
										</div>
									</div>
								</div>
								<!-- 营业期限始 营业期限至-->
								<div class="noteBox" v-show="NolongTimeShow">
									<div class="noteItem">
										<div class="noteLeft"><p class="star">*</p>营业期限：</div>
										<div class="write_input">
											<el-date-picker  v-model="businessPeriod" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
    										</el-date-picker>
										</div>
									</div>
								</div>
								<!-- 是长期有效 -->
								<div class="noteBox" v-show="longShow">
									<div class="noteItem">
										<div class="noteLeft"><p class="star">*</p>营业期限始：</div>
										<div class="write_input">
											<el-date-picker  v-model="businessTermStart" type="date" placeholder="选择日期">
    										</el-date-picker>
										</div>
									</div>
								</div>
							</div>
						</el-collapse-item>
						<el-collapse-item title="资质证书" name="4">
							<div class="edit_title">
								<button class="btn" @click="newlyInfo()">新增</button>
								<button class="btn" @click="deleteData()">删除</button>
							</div>
							<el-table
								ref="multipleTable"
								:data="certificationData"
								tooltip-effect="dark"
								style="width: 100%"
								@selection-change="handleSelectionChange">
								<el-table-column
									type="selection"
									width="55">
								</el-table-column>
								<el-table-column type="index" width="70" label="序号" :index="typeIndex">
            					</el-table-column>
								<el-table-column
									prop="certificateNum"
									label="证书编号">
								</el-table-column>
								<el-table-column
									prop="certificationAuthority"
									label="发证机关">
								</el-table-column>
								<el-table-column
									prop="professionalLevel"
									label="资质等级">
								</el-table-column>
								<el-table-column	prop="formatTime"	label="有效期至">
								</el-table-column>
								<el-table-column prop="operation" label="操作">
									<template slot-scope="scope">
										<i class="el-icon-edit" style="cursor:pointer;" @click="modifyData(scope.row)"></i>
									</template>
								</el-table-column>
  							</el-table>
						</el-collapse-item>
					</el-collapse>
				</div>
			</div>
			<!-- 下一步弹框 -->
            <div class="wrapper" v-show="basicInfoFlag">
				<!-- 头部 -->
				<div class="edit_title" v-show="!editShow">
					<button class="btn" @click="submitFile()">提交</button>
					<button class="btn" @click="backTo()">上一步</button>
				</div>
				<div class="title" v-show="editShow">
					<button class="btn" @click="editFile()">修改</button>
					<!-- <button class="lookbtn" @click="viewChanges"><i class="el-icon-tickets"></i></button> -->
				</div>
				<!-- 主体内容 -->
				<div class="main">
					<el-collapse v-model="activeName" accordion>
						<!-- 基本情况 -->
						<el-collapse-item title="基本情况" name="1">
							<div class="edit_list">
								<!-- 单位全称 -->
								<div class="noteBox">
									<div class="noteItem">
										<div class="noteLeft"> 单位全称：</div>
										<div class="write_textarea">
											<span>{{companyName}}</span>
										</div>
									</div>
								</div>
								<!--  单位性质 经济类型-->
								<div class="noteBox">
									<div class="noteItem">
										<div class="noteLeft"> 单位性质：</div>
										<div class="write_input">
											<span>{{companyProperty}}</span>
										</div>
									</div>
									<div class="noteItem">
										<div class="noteLeft">经济类型：</div>
										<div class="write_input">
											<span>{{economicType}}</span>
										</div>
									</div>
								</div>
								<!--  单位注册地区 单位网址-->
								<div class="noteBox">
									<div class="noteItem">
										<div class="noteLeft">单位注册地区：</div>
										<div class="write_input">
											<span>{{localName}}</span>
										</div>
									</div>
									<div class="noteItem">
										<div class="noteLeft"> 单位网址：</div>
										<div class="write_input">
											<span>{{companyWebsite}}</span>
										</div>
									</div>
								</div>
								<!-- 单位注册地址 单位注册邮编 -->
								<div class="noteBox">
									<div class="noteItem">
										<div class="noteLeft">单位注册地址：</div>
										<div class="write_input">
											<span>{{companyRegisterAddress}}</span>
										</div>
									</div>
									<div class="noteItem">
										<div class="noteLeft">单位注册邮编：</div>
										<div class="write_input">
											<span>{{registerAddressZipCode}}</span>
										</div>
									</div>
								</div>
								<!-- 单位营业地址 营业地址邮编-->
								<div class="noteBox">
									<div class="noteItem">
										<div class="noteLeft">单位营业地址：</div>
										<div class="write_input">
											<span>{{companyBusinessAddress}}</span>
										</div>
									</div>
									<div class="noteItem">
										<div class="noteLeft">营业地址邮编：</div>
										<div class="write_input">
											<span>{{businessAddressZipCode}}</span>
										</div>
									</div>
								</div>
								<!-- 基本开户行 基本账户号-->
								<div class="noteBox">
									<div class="noteItem">
										<div class="noteLeft">基本开户行：</div>
										<div class="write_input">
											<span>{{bankDeposit}}</span>
										</div>
									</div>
									<div class="noteItem">
										<div class="noteLeft">基本账户号：</div>
										<div class="write_input">
											<span>{{accountNumber}}</span>
										</div>
									</div>
								</div>
								<!-- 税务登记证号 统一社会信用代码-->
								<div class="noteBox">
									<div class="noteItem">
										<div class="noteLeft">税务登记证号：</div>
										<div class="write_input">
											<span>{{taxRegistrationCertificateNum}}</span>
										</div>
									</div>
									<div class="noteItem">
										<div class="noteLeft">统一社会信用代码：</div>
										<div class="write_input">
											<span>{{socialCreditCode}}</span>
										</div>
									</div>
								</div>
								<!-- 单位类型-->
								<div class="noteBox">
									<div class="noteItem">
										<div class="noteLeft">单位类型：</div>
										<div class="write_input">
											<span>{{companyType}}</span>
										</div>
									</div>
								</div>
								<!-- 单位负责人 负责人联系方式-->
								<div class="noteBox">
									<div class="noteItem">
										<div class="noteLeft">单位负责人：</div>
										<div class="write_input">
											<span>{{contacts}}</span>
										</div>
									</div>
									<div class="noteItem">
										<div class="noteLeft">负责人联系方式：</div>
										<div class="write_input">
											<span>{{contactsPhone}}</span>
										</div>
									</div>
								</div>
							</div>
						</el-collapse-item>
						<!-- 组织机构代码 -->
						<el-collapse-item title="组织机构代码" name="2">
							<div class="edit_list">
								<!-- 组织机构代码 机构类型 -->
								<div class="noteBox">
									<div class="noteItem">
										<div class="noteLeft">组织机构代码：</div>
										<div class="write_input">
											<span>{{organizationCode}}</span>
										</div>
									</div>
									<div class="noteItem">
										<div class="noteLeft">机构类型：</div>
										<div class="write_input">
											<span>{{organizationType}}</span>
										</div>
									</div>
								</div>
								<!-- 颁发单位 登记号 -->
								<div class="noteBox">
									<div class="noteItem">
										<div class="noteLeft"> 颁发单位：</div>
										<div class="write_input">
											<span>{{issueCompany}}</span>
										</div>
									</div>
									<div class="noteItem">
										<div class="noteLeft">登记号：</div>
										<div class="write_input">
											<span>{{registrationNumber}}</span>
										</div>
									</div>
								</div>
								<!-- 有效期始 有效期至 -->
								<div class="noteBox">
									<div class="noteItem">
										<div class="noteLeft"> 有效期始：</div>
										<div class="write_input">
											<span>{{termValidityStart}}</span>
										</div>
									</div>
									<div class="noteItem">
										<div class="noteLeft">有效期至：</div>
										<div class="write_input">
											<span>{{termValidityEnd}}</span>
										</div>
									</div>
								</div>
							</div>
						</el-collapse-item>
						<!-- 营业执照 -->
						<el-collapse-item title="营业执照" name="3">
							<div class="edit_list">
								<!-- 注册号 企业类型-->
								<div class="noteBox">
									<div class="noteItem">
										<div class="noteLeft">注册号：</div>
										<div class="write_input">
											<span>{{registrationNum}}</span>
										</div>
									</div>
									<div class="noteItem">
										<div class="noteLeft">企业类型：</div>
										<div class="write_input">
											<span>{{enterprisesType}}</span>
										</div>
									</div>
								</div>
								<!-- 法定代表人 法定代表人身份证号-->
								<div class="noteBox">
									<div class="noteItem">
										<div class="noteLeft">法定代表人：</div>
										<div class="write_input">
											<span>{{legalRepresentative}}</span>
										</div>
									</div>
									<div class="noteItem">
										<div class="noteLeft">法定代表人身份证号：</div>
										<div class="write_input">
											<span>{{legalIdNumber}}</span>
										</div>
									</div>
								</div>
								<!-- 注册资金 币种-->
								<div class="noteBox">
									<div class="noteItem">
										<div class="noteLeft">注册资金(万元)：</div>
											<div class="write_input">
												<span>{{registeredCapital}}</span>
											</div>
									</div>
									<div class="noteItem">
										<div class="noteLeft">币种：</div>
										<div class="write_input">
											<span>{{currency}}</span>
										</div>
									</div>
								</div>
								<!-- 年检有效期 是否长期有效-->
								<div class="noteBox">
									<div class="noteItem">
										<div class="noteLeft">年检有效期：</div>
										<div class="write_input">
											<span>{{yearlyInspectionPeriod}}</span>
										</div>
									</div>
									<div class="noteItem">
										<div class="noteLeft">是否长期有效：</div>
										<div class="write_input">
											<span>{{isLongTerm}}</span>
										</div>
									</div>
								</div>
								<!-- 营业期限始 营业期限至-->
								<div class="noteBox"  v-show="NolongTimeShow">
									<div class="noteItem">
										<div class="noteLeft">营业期限始：</div>
										<div class="write_input">
											<span>{{businessTermStart}}</span>
										</div>
									</div>
									<div class="noteItem">
										<div class="noteLeft">营业期限至：</div>
										<div class="write_input">
											<span>{{businessTermEnd}}</span>
										</div>
									</div>
								</div>
								<!-- 是长期有效 -->
								<div class="noteBox" v-show="longShow">
									<div class="noteItem">
										<div class="noteLeft">营业期限始：</div>
										<div class="write_input">
											<span>{{businessTermStart}}</span>
										</div>
									</div>
								</div>
							</div>
						</el-collapse-item>
						<!-- 资质证书 -->
						<el-collapse-item title="资质证书" name="4">
							<el-table	ref="multipleTable"	:data="certificationData"	tooltip-effect="dark"	style="width: 100%">
								<el-table-column type="index" width="70" label="序号" :index="typeIndex">
            					</el-table-column>
								<el-table-column	prop="certificateNum"	label="证书编号">
								</el-table-column>
								<el-table-column	prop="certificationAuthority"	label="发证机关">
								</el-table-column>
								<el-table-column	prop="professionalLevel"	label="资质等级">
								</el-table-column>
								<el-table-column	prop="formatTime"	label="有效期至">
								</el-table-column>
								<el-table-column prop="operation" label="操作">
									<template slot-scope="scope">
										<i class="el-icon-search" style="cursor:pointer;" @click="checkData(scope.row)"></i>
									</template>
								</el-table-column>
  							</el-table>
						</el-collapse-item>
						<!-- 附件 -->
						<el-collapse-item title="附件" name="5">
							<el-table :data="tableData" stripe style="width: 100%">
								<el-table-column  label="序号"></el-table-column>
								<el-table-column  prop="subcontractName"  label="附件名称">
								</el-table-column>
								<el-table-column prop="subcontractingControlAmount" label="附件列表(点击查看)">
								</el-table-column>
							</el-table>
							<!-- <button @click="upload">666</button> -->
						</el-collapse-item>
						<!-- 办理记录 -->
						<el-collapse-item title="办理记录" name="6">
							<el-table :data="handleRecordData" style="width: 100%">
								<el-table-column prop="step" label="步骤"  width="180">
								</el-table-column>
								<el-table-column  prop="handlingPersonnel" label="办理人员" width="180">
								</el-table-column>
								<el-table-column prop="creationTime" label="时间">
								</el-table-column>
								<el-table-column prop="state" label="状态">
								</el-table-column>
								<el-table-column prop="remarks" label="备注">
								</el-table-column>
							</el-table>
						</el-collapse-item>
					</el-collapse>
				</div>
			</div>
			<!-- 查看变更内容 -->
			<div class="searchWrapper" v-show="viewChangesFlag">
				<div class="searchBox">
					<div class="search_title">
						<p>查看变更内容</p>
						<i class="el-icon-close"  style="cursor:pointer;" @click="closeViewChanges"></i>
					</div>
					<div class="search_btn">
						<el-radio v-model="radio" label="所有">所有</el-radio>
  						<el-radio v-model="radio" label="基本信息">基本信息</el-radio>
					</div>
					<div class="search_write">
						<p class="writeInput">变更内容：<el-input v-model="radio" placeholder="请输入内容" clearable></el-input></p>
						<div class="noteContent">
							<div class="noteLeft"><p class="star">*</p>招标文件发售时间：</div>
							<div class="noteTime">
								<div class="timeBox">
									<el-date-picker
										placeholder="起始日期"
										v-model="radio"
										value-format="timestamp"
									>
									</el-date-picker>
								</div>
								<p>至</p>
								<div class="timeBox">
									<el-date-picker
										placeholder="结束日期"
										v-model="radio"
										value-format="timestamp"
									>
									</el-date-picker>
								</div>
							</div>
							<div style="margin-left:10px;">
								<el-button type="primary" icon="el-icon-search">搜索</el-button>
							</div>
						</div>
					</div>
					<div class="search_main">
						<el-table :data="tableData" stripe style="width: 100%">
							<el-table-column  label="序号"></el-table-column>
							<el-table-column  prop="subcontractName"  label="变更内容">
							</el-table-column>
							<el-table-column prop="subcontractingControlAmount" label="变更前的信息">
							</el-table-column>
							<el-table-column prop="entrySubcontractNumber" label="变更后的信息">
							</el-table-column>
							<el-table-column label="变更人"></el-table-column>
							<el-table-column label="变更日期"></el-table-column>
						</el-table>
					</div>
				</div>
			</div>
			<!-- 上传 -->
			<div class="uploadWrapper" v-show="uploadFlag">
				<div class="uploadBox">
					<div class="upload_title">
						<p>附件管理-组织机构代码证</p>
						<i class="el-icon-close" @click="closeUpload"></i>
					</div>
					<div class="upload_btn">
						<div>
							<button class="btn">作废</button>
							<button class="btn">删除</button>
						</div>
						<div>
							<button class="btn">上传</button>
						</div>
					</div>
					<div class="upload_main">
						<h1>组织机构代码证</h1>
						<el-table
							ref="multipleTable"
							:data="tableData"
							tooltip-effect="dark"
							style="width: 100%"
							@selection-change="handleSelectionChange">
							<el-table-column
								type="selection"
								width="55">
							</el-table-column>
							<el-table-column
								label="序号"
								width="120"
							>
								<template slot-scope="scope">{{ scope.row.date }}</template>
							</el-table-column>
							<el-table-column
								prop="name"
								label="文件名称">
							</el-table-column>
							<el-table-column
								prop="address"
								label="验证状态">
							</el-table-column>
							<el-table-column
								prop="address"
								label="作废原因">
							</el-table-column>
							<el-table-column
								prop="address"
								label="文件大小">
							</el-table-column>
							<el-table-column
								prop="address"
								label="上传人">
							</el-table-column>
							<el-table-column
								prop="address"
								label="操作">
							</el-table-column>
						</el-table>
						<div class="upload_reminder">
							<p>★：附件名称只能由中文，英文字母和数字组成，附件上传大小限制为1024 KB；请上传后缀名为jpg,jpeg,bmp,gif,pdf,png类型的文件!</p> 
							<p>★：当出现上传附件错误，而且验证状态为编辑中的话，可点击[删除]按钮删除错误的附件。 </p>
							<p>★：当需要变更验证状态为待验证、验证通过、验证不通过的附件时，请点击[作废]按钮作废该附件。</p>
						</div>
					</div>
				</div>
			</div>
			
			<!-- 新增 -->
			<div class="newlyWrapper" v-show="newlyFlag">
				<div class="newlyBox">
					<div class="newly_title">
						<p>新增资质</p>
						<i class="el-icon-close"  style="cursor:pointer;" @click="closeNewly()"></i>
					</div>
					<div class="newly_btn">
						<button class="btn" @click="saveAdd()">保存</button>
						<button class="btn" @click="closeNewly()">关闭</button>
					</div>
					<div class="newly_main">
						<el-collapse v-model="activeName" accordion>
							<el-collapse-item title="资质信息" name="1">
								<div class="edit_list">
									<!-- 证书编号 发证机关-->
									<div class="noteBox">
										<div class="noteItem">
											<div class="noteLeft"><p class="star">*</p>证书编号：</div>
											<div class="write_input">
												<el-input v-model="certificateNum" placeholder="请输入内容" clearable></el-input>
											</div>
										</div>
										<div class="noteItem">
											<div class="noteLeft"><p class="star">*</p>发证机关：</div>
											<div class="write_input">
												<el-input v-model="certificationAuthority" placeholder="请输入内容" clearable></el-input>
											</div>
										</div>
									</div>
									<!-- 资质等级 -->
									<div class="noteBox">
										<div class="noteItem">
											<div class="noteLeft"><p class="star">*</p>资质等级：</div>
											<div class="write_input">
												<el-input v-model="professionalLevel" placeholder="请输入内容" clearable></el-input>
											</div>
										</div>
									</div>
									<!-- 是否主项 有效期至-->
									<div class="noteBox">
										<div class="noteItem">
											<div class="noteLeft">是否主项：</div>
											<div class="write_input">
												<el-radio-group v-model="isSubject">
													<el-radio  label="主项">主项</el-radio>
													<el-radio  label="增项">增项</el-radio>
												</el-radio-group>
											</div>
										</div>
										<div class="noteItem">
											<div class="noteLeft">有效期至：</div>
											<div class="write_input">
												<el-date-picker
													placeholder="起始日期"
													v-model="periodValidity"
													value-format="timestamp"
												>
												</el-date-picker>
											</div>
										</div>
									</div>
									<!-- 可承担业务 -->
									<div class="noteBox">
										<div class="noteItem">
											<div class="noteLeft">可承担业务：</div>
											<div class="write_textarea">
												<el-input v-model="business" type="textarea"></el-input>
											</div>
										</div>
									</div>
								</div>
							</el-collapse-item>
						</el-collapse>	
					</div>
				</div>
			</div>
			<!-- 修改资质证书弹框 -->
			<div  class="newlyWrapper" v-show="modifyShow">
				<div class="newlyBox">
					<div class="newly_title">
						<p>修改资质</p>
						<i class="el-icon-close"  style="cursor:pointer;" @click="closeNewly()"></i>
					</div>
					<div class="newly_btn">
						<button class="btn" @click="submitAdd()">保存</button>
						<button class="btn" @click="closeNewly()">关闭</button>
					</div>
					<div class="newly_main">
						<el-collapse v-model="activeName" accordion>
							<el-collapse-item title="资质信息" name="1">
								<div class="edit_list">
									<!-- 证书编号 发证机关-->
									<div class="noteBox">
										<div class="noteItem">
											<div class="noteLeft"><p class="star">*</p>证书编号：</div>
											<div class="write_input">
												<el-input v-model="certificateNum" placeholder="请输入内容" clearable></el-input>
											</div>
										</div>
										<div class="noteItem">
											<div class="noteLeft"><p class="star">*</p>发证机关：</div>
											<div class="write_input">
												<el-input v-model="certificationAuthority" placeholder="请输入内容" clearable></el-input>
											</div>
										</div>
									</div>
									<!-- 资质等级 -->
									<div class="noteBox">
										<div class="noteItem">
											<div class="noteLeft"><p class="star">*</p>资质等级：</div>
											<div class="write_input">
												<el-input v-model="professionalLevel" placeholder="请输入内容" clearable></el-input>
											</div>
										</div>
									</div>
									<!-- 是否主项 有效期至-->
									<div class="noteBox">
										<div class="noteItem">
											<div class="noteLeft">是否主项：</div>
											<div class="write_input">
												<el-radio-group v-model="isSubject">
													<el-radio  label="主项">主项</el-radio>
													<el-radio  label="增项">增项</el-radio>
												</el-radio-group>
											</div>
										</div>
										<div class="noteItem">
											<div class="noteLeft">有效期至：</div>
											<div class="write_input">
												<el-date-picker
													placeholder="起始日期"
													v-model="periodValidity"
													value-format="timestamp"
												>
												</el-date-picker>
											</div>
										</div>
									</div>
									<!-- 可承担业务 -->
									<div class="noteBox">
										<div class="noteItem">
											<div class="noteLeft">可承担业务：</div>
											<div class="write_textarea">
												<el-input v-model="business" type="textarea"></el-input>
											</div>
										</div>
									</div>
								</div>
							</el-collapse-item>
						</el-collapse>	
					</div>
				</div>
			</div>
			<!-- 查看资质证书 -->
			<div class="newlyWrapper" v-show="checkShow">
				<div class="newlyBox">
					<div class="newly_title">
						<p>查看资质信息</p>
						<i class="el-icon-close" style="cursor:pointer;" @click="closeNewly()"></i>
					</div>
					<div class="newly_main">
						<el-collapse v-model="activeName" accordion>
							<el-collapse-item title="资质信息" name="1">
								<div class="edit_list">
									<!-- 证书编号 发证机关-->
									<div class="noteBox">
										<div class="noteItem">
											<div class="noteLeft">证书编号：</div>
											<div class="write_input">
												<span>{{certificateNum}}</span>
											</div>
										</div>
										<div class="noteItem">
											<div class="noteLeft">发证机关：</div>
											<div class="write_input">
												<span>{{certificationAuthority}}</span>
											</div>
										</div>
									</div>
									<!-- 资质等级 -->
									<div class="noteBox">
										<div class="noteItem">
											<div class="noteLeft">资质等级：</div>
											<div class="write_input">
												<span>{{professionalLevel}}</span>
											</div>
										</div>
									</div>
									<!-- 是否主项 有效期至-->
									<div class="noteBox">
										<div class="noteItem">
											<div class="noteLeft">是否主项：</div>
											<div class="write_input">
												<span>{{isSubject}}</span>
											</div>
										</div>
										<div class="noteItem">
											<div class="noteLeft">有效期至：</div>
											<div class="write_input">
												<span>{{periodValidity}}</span>
											</div>
										</div>
									</div>
									<!-- 可承担业务 -->
									<div class="noteBox">
										<div class="noteItem">
											<div class="noteLeft">可承担业务：</div>
											<div class="write_textarea">
												<span>{{business}}</span>
											</div>
										</div>
									</div>
								</div>
							</el-collapse-item>
						</el-collapse>	
					</div>
				</div>
			</div>
        </div>
		<!-- 确认保存弹窗 -->
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
				<el-button type="primary" @click="sureSave()">确 定</el-button>
			</span>
		</el-dialog>
		<!-- 确认提交弹窗 -->
		<el-dialog
			title="执行成功"
			:visible.sync="submitBox"
			width="40%"
			:before-close="handleClose">
			<div class="icon">
				<i class="el-icon-success"></i>
				<span>提交成功！</span>
			</div>
			<span slot="footer" class="dialog-footer">
				<el-button type="primary" @click="submitSave()">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
	import '../../assets/css/style.css'
	import baseUrl from '../../api/api'
	import {isPoneAvailable,getIdcard} from '../../api/base.js'
	import dayjs from "dayjs"
	export default {
		components:{},
		props:{},
		data(){
			return {
				checkShow:false,//查看弹框
				submitBox:false,//提交弹框
				saveBox:false,//保存弹框
				NolongTimeShow:false,//长期有效
				longShow:false,//不是长期有效
				handleRecordData:[],//办理记录
				activeName:['1','2','3','4','5'],// 手风琴弹窗
				tableData:[],
				// 基本信息首页所需字段
				basicInfoFlag:true,
				// 查看变更内容所需字段
				editShow:true,//修改字段
				viewChangesFlag:false,// 页面展示
				addressList: [],// 三级菜单->地址
				radio:'',// 单选框
				// 上传所需字段
				uploadFlag:false,
				// 修改所需字段
				editFlag:false,// 弹窗
				multipleSelection:[],//多选框
				checkList:[],//多选框列表
				// 新增所需字段
				newlyFlag:false,// 弹窗
				selectedOptions:[],
				certificationData:[],//资质证书表格数据
				certificateNum:'',//证书编号
				certificationAuthority:'',//发证机关
				professionalLevel:'',//资质等级
				isSubject:'',//是否主项
				periodValidity:'',//有效期至
				business:'',//可承担业务
				currentPage:1,//当前页
				carId:'',//资质证书主键
				modifyShow:false,//修改资质证书弹框
				id:[],//删除id数组
				companyName:'',//单位名称
				organizationCode:'',//组织机构代码
				companyProperty:'',//单位性质
				propertyData:[],//单位性质
				economicData:[],//经济类型数据
				economicType:'',//经济类型model
				registeredArea:[],//单位注册地区
				registePlace:[],//单位注册地区Str
				localName:'',//单位注册地区
				companyWebsite:'',//单位网址
				companyRegisterAddress:'',//单位注册地址
				registerAddressZipCode:'',//注册地址邮编
				companyBusinessAddress:'',//营业地址
				businessAddressZipCode:'',//营业地址邮编
				bankDeposit:'',//基本开户行
				accountNumber:'',//基本户账户号
				taxRegistrationCertificateNum:'',//税务登记账号
				socialCreditCode:'',//统一社会信用代码
				companyTypeArr:[],//单位类型数组
				companyType:'',//单位类型传参
				contacts:'',//单位负责人
				contactsPhone:'',//联系电话
				organizationType:'',//机构类型
				mechanismData:[],//机构类型数据
				issueCompany:'',//颁发单位
				registrationNumber:'',//登记号
				validity:'',//有效期
				termValidityStart:'',//有效期开始
				termValidityEnd:'',//有效期结束
				registrationNum:'',//注册号
				enterprisesData:[],//企业类型数据
				enterprisesType:'',//企业类型
				legalRepresentative:'',//法定代表人
				legalIdNumber:'',//法人身份证号
				registeredCapital:'',//注册资金
				currency:'',//币种
				currencyData:[
					{
						value:'人民币',
						label:'人民币'
					},
					{
						value:'美元',
						label:'美元'
					},
					{
						value:'欧元',
						label:'欧元'
					},
					{
						value:'韩元',
						label:'韩元'
					},
					{
						value:'英镑',
						label:'英镑'
					},
				],
				yearlyInspectionPeriod:'',//年检有效期
				isLongTerm:'否',//是否长期有效
				businessPeriod:'',//营业期限
				businessTermStart:'',//营业期开始
				businessTermEnd:'',//营业期结束
				userId:'',//下一步返回的id
				
			}
		},
		watch:{},
		computed:{},
		
		created(){
			this.getCerfitaData();
			this.getselectList();
			this.geteconomicList();
			this.getAddressList();
			this.getmechanismList();
			this.getEnterprisesList();
			this.getRecordList();
			this.getLongTime();
			this.getStartList();
		},
		mounted(){},
		methods:{
			//初始化数据
			getStartList(){
				this.$axios({
					method:'POST',
					url:baseUrl + '/userController/selectByPersonnelId',
					data:{
						personnelId:'test'
					}
				}).then(res=>{
					if(res.data.status == 200){
						this.companyName = res.data.data.companyName;
						this.companyProperty = res.data.data.companyProperty;
						this.economicType = res.data.data.economicType;
						this.registeredArea = res.data.data.registeredArea;
						this.companyWebsite = res.data.data.companyWebsite;
						this.companyRegisterAddress = res.data.data.companyRegisterAddress;
						this.registerAddressZipCode = res.data.data.registerAddressZipCode;
						this.companyBusinessAddress = res.data.data.companyBusinessAddress;
						this.businessAddressZipCode = res.data.data.businessAddressZipCode;
						this.bankDeposit = res.data.data.bankDeposit;
						this.accountNumber = res.data.data.accountNumber;
						this.taxRegistrationCertificateNum = res.data.data.taxRegistrationCertificateNum;
						this.socialCreditCode = res.data.data.socialCreditCode;
						this.companyType = res.data.data.companyType;
						this.contacts = res.data.data.contacts;
						this.contactsPhone = res.data.data.contactsPhone;
						this.organizationCode = res.data.data.organizationCode;
						this.organizationType = res.data.data.organizationType;
						this.issueCompany = res.data.data.issueCompany;
						this.registrationNumber = res.data.data.registrationNumber;
						if(res.data.data.termValidityStart == null){
							this.termValidityStart = ""
						}else{
							this.termValidityStart = dayjs(res.data.data.termValidityStart).format('YYYY-MM-DD');
						};
						if(res.data.data.termValidityEnd == null){
							this.termValidityEnd = ""
						}else{
							this.termValidityEnd = dayjs(res.data.data.termValidityEnd).format('YYYY-MM-DD');
						};
						this.registrationNum = res.data.data.registrationNum;
						this.enterprisesType = res.data.data.enterprisesType;
						this.legalRepresentative = res.data.data.legalRepresentative;
						this.legalIdNumber = res.data.data.legalIdNumber;
						this.registeredCapital = res.data.data.registeredCapital;
						this.currency = res.data.data.currency;
						if(res.datad.data.yearlyInspectionPeriod == null){
							this.yearlyInspectionPeriod = ""
						}else{
							this.yearlyInspectionPeriod = dayjs(res.datad.data.yearlyInspectionPeriod).format('YYYY-MM-DD');
						};
						this.isLongTerm = res.data.data.isLongTerm;
						if(res.data.data.businessTermStart == null){
							this.businessTermStart = ""
						}else{
							this.businessTermStart = dayjs(res.data.data.businessTermStart).format('YYYY-MM-DD');
						};
						if(res.data.data.businessTermEnd == null){
							this.businessTermEnd = ""
						}else{
							this.businessTermEnd = dayjs(res.data.data.businessTermEnd).format('YYYY-MM-DD');
						}
					}else{
						this.$layer.msg(res.data.msg)
					}
				}).catch(err=>{
					console.log(err)
				})
			},
			//下一步弹框
			nextTo(){
				if(!isPoneAvailable(this.contactInformation)){
					this.$layer.msg('请输入正确的联系方式');
					return false;
				}
				if(!getIdcard(this.legalIdNumber)){
					this.$layer.msg('请输入正确的身份证号码');
					return false;
				}
				let startTime="";
				if(this.isLongTerm == "是"){
					startTime = this.businessTermStart//营业期开始
				}else if(this.isLongTerm == "否"){
					startTime = this.businessPeriod[0]//营业期开始
				}
				this.$axios({
					method:'POST',
					url:baseUrl + '/userController/addUser',
					data:{
						companyName:this.companyName,
						organizationCode:this.organizationCode,//组织机构代码
						companyProperty:this.companyProperty,//单位性质
						economicType:this.economicType,//经济类型model
						registeredArea:this.registeredArea.join(','),//单位注册地区
						companyWebsite:this.companyWebsite,//单位网址
						companyRegisterAddress:this.companyRegisterAddress,//单位注册地址
						registerAddressZipCode:this.registerAddressZipCode,//注册地址邮编
						companyBusinessAddress:this.companyBusinessAddress,//营业地址
						businessAddressZipCode:this.businessAddressZipCode,//营业地址邮编
						bankDeposit:this.bankDeposit,//基本开户行
						accountNumber:this.accountNumber,//基本户账户号
						taxRegistrationCertificateNum:this.taxRegistrationCertificateNum,//税务登记账号
						socialCreditCode:this.socialCreditCode,//统一社会信用代码
						companyType:this.companyTypeArr.join(','),//单位类型传参
						contacts:this.contacts,//单位负责人
						contactsPhone:this.contactsPhone,//联系电话
						organizationType:this.organizationType,//机构类型
						issueCompany:this.issueCompany,//颁发单位
						registrationNumber:this.registrationNumber,//登记号
						termValidityStart:this.validity[0],//有效期开始
						termValidityEnd:this.validity[1],//有效期结束
						registrationNum:this.registrationNum,//注册号
						enterprisesType:this.enterprisesType,//企业类型
						legalRepresentative:this.legalRepresentative,//法定代表人
						legalIdNumber:this.legalIdNumber,//法人身份证号
						registeredCapital:this.registeredCapital,//注册资金
						currency:this.currency,//币种
						yearlyInspectionPeriod:this.yearlyInspectionPeriod,//年检有效期
						isLongTerm:this.isLongTerm,//是否长期有效
						businessTermStart:startTime,//营业期开始
						businessTermEnd:this.businessPeriod[1],//营业期结束
					}
				}).then(res=>{
					if(res.data.status == 200){
						this.getLongTime();
						this.basicInfoFlag = true;
						this.editFlag = false;
						$('.title').hide();
						$('.edit_title').show();
						this.localName = res.data.data.registeredArea;
						this.companyType = res.data.data.companyType;
						if(res.data.data.termValidityStart == null){
							this.termValidityStart = ""
						}else{
							this.termValidityStart = dayjs(res.data.data.termValidityStart).format('YYYY-MM-DD');
						};
						if(res.data.data.termValidityEnd == null){
							this.termValidityEnd = ""
						}else{
							this.termValidityEnd = dayjs(res.data.data.termValidityEnd).format('YYYY-MM-DD');
						};
						if(res.data.data.yearlyInspectionPeriod == null){
							this.yearlyInspectionPeriod = ""
						}else{
							this.yearlyInspectionPeriod = dayjs(res.data.data.yearlyInspectionPeriod).format('YYYY-MM-DD');
						};
						if(res.data.data.businessTermStart == null){
							this.businessTermStart = ""
						}else{
							this.businessTermStart = dayjs(res.data.data.businessTermStart).format('YYYY-MM-DD');
						};
						if(res.data.data.businessTermEnd == null){
							this.businessTermEnd = ""
						}else{
							this.businessTermEnd = dayjs(res.data.data.businessTermEnd).format('YYYY-MM-DD');
						};
						this.userId = res.data.data.userId;
					}else{
						this.$layer.msg(res.data.msg)
					}
				}).catch(err=>{
					console.log(err)
				})
			},
			//保存
			saveFile(){
				this.saveBox = true;
			},
			sureSave(){
				let startTime="";
				if(this.isLongTerm == "是"){
					startTime = this.businessTermStart//营业期开始
				}else if(this.isLongTerm == "否"){
					startTime = this.businessPeriod[0]//营业期开始
				}
				this.$axios({
					method:'POST',
					url:baseUrl + '/userController/addUser',
					data:{
						companyName:this.companyName,
						organizationCode:this.organizationCode,//组织机构代码
						companyProperty:this.companyProperty,//单位性质
						economicType:this.economicType,//经济类型model
						registeredArea:this.registeredArea.join(','),//单位注册地区
						companyWebsite:this.companyWebsite,//单位网址
						companyRegisterAddress:this.companyRegisterAddress,//单位注册地址
						registerAddressZipCode:this.registerAddressZipCode,//注册地址邮编
						companyBusinessAddress:this.companyBusinessAddress,//营业地址
						businessAddressZipCode:this.businessAddressZipCode,//营业地址邮编
						bankDeposit:this.bankDeposit,//基本开户行
						accountNumber:this.accountNumber,//基本户账户号
						taxRegistrationCertificateNum:this.taxRegistrationCertificateNum,//税务登记账号
						socialCreditCode:this.socialCreditCode,//统一社会信用代码
						companyType:this.companyTypeArr.join(','),//单位类型传参
						contacts:this.contacts,//单位负责人
						contactsPhone:this.contactsPhone,//联系电话
						organizationType:this.organizationType,//机构类型
						issueCompany:this.issueCompany,//颁发单位
						registrationNumber:this.registrationNumber,//登记号
						termValidityStart:this.validity[0],//有效期开始
						termValidityEnd:this.validity[1],//有效期结束
						registrationNum:this.registrationNum,//注册号
						enterprisesType:this.enterprisesType,//企业类型
						legalRepresentative:this.legalRepresentative,//法定代表人
						legalIdNumber:this.legalIdNumber,//法人身份证号
						registeredCapital:this.registeredCapital,//注册资金
						currency:this.currency,//币种
						yearlyInspectionPeriod:this.yearlyInspectionPeriod,//年检有效期
						isLongTerm:this.isLongTerm,//是否长期有效
						businessTermStart:startTime,//营业期开始
						businessTermEnd:this.businessPeriod[1],//营业期结束
					}
				}).then(res=>{
					if(res.data.status == 200){
						this.saveBox = false;
						this.getLongTime();
						this.basicInfoFlag = false;
						this.editFlag = true;
					}else{
						this.$layer.msg(res.data.msg)
					}
				}).catch(err=>{
					console.log(err)
				})
			},
			//上一步弹框
			backTo(){
				this.editFlag = true;
				this.basicInfoFlag = false;
			},
			//提交
			submitFile(){
				this.submitBox = true;
			},
			submitSave(){
				this.$axios({
					method:'POST',
					url:baseUrl + '/userController/updateUser',
					data:{
						userId:this.userId,
						state:'待办理'
					}
				}).then(res=>{
					if(res.data.status == 200){
						this.basicInfoFlag = true;
						this.editFlag = false;
						this.submitBox = false;
						$('.title').show();
						$('.edit_title').hide();
					}else{
						this.$layer.msg(res.data.msg)
					}
				}).catch(err=>{
					console.log(err)
				})
			},
			//判断是否长期有效
			changeLongTime(){
				if(this.isLongTerm == "是"){
					this.longShow = true;
					this.NolongTimeShow = false;
				}else{
					this.longShow = false;
					this.NolongTimeShow = true;
				}
			},
			getLongTime(){
				if(this.isLongTerm == "是"){
					this.longShow = true;
					this.NolongTimeShow = false;
				}else{
					this.longShow = false;
					this.NolongTimeShow = true;
				}
			},
			//编号问题
			typeIndex(index) {
				return index + (this.currentPage - 1) * 10 + 1;
			},
			// 查看变更内容
			// viewChanges(){
			// 	this.viewChangesFlag = !this.viewChangesFlag;//查看变更内容 弹窗
			// },
			// 关闭变更内容
			closeViewChanges(){
				this.viewChangesFlag = false;//查看变更内容 弹窗
			},
			// 修改
			editFile(){
				this.basicInfoFlag = false;// 基本信息首页 弹窗
				this.editFlag = true;// 修改弹窗
				this.termValidityStart = new Date(this.termValidityStart).getTime();
				this.termValidityEnd = new Date(this.termValidityEnd).getTime();
				this.yearlyInspectionPeriod = new Date(this.yearlyInspectionPeriod).getTime();
				this.businessTermStart = new Date(this.businessTermStart).getTime();
				this.businessTermEnd = new Date(this.businessTermEnd).getTime();
				this.getAddressList();// 三级菜单
				this.getselectList();
				this.getLongTime();
				this.getRecordList();
				this.getEnterprisesList();//企业类型
				this.getmechanismList();//机构类型
				this.geteconomicList();//经济类型
			},
			// 多选框
			toggleSelection(rows) {
				if (rows) {
					rows.forEach(row => {
						this.$refs.multipleTable.toggleRowSelection(row);
					});
				} else {
					this.$refs.multipleTable.clearSelection();
				}
			},
			//删除资质证书列表
			handleSelectionChange(val) {
				this.multipleSelection = val;
				let deleteArr = [];
				for(let i in val){
					deleteArr.push(val[i].id);
				}
				this.id = deleteArr;
			},
			deleteData(){
				this.$axios({
					method:'POST',
					url:baseUrl + '/qualificationController/deleteById',
					data:{
						id:this.id
					}
				}).then(res=>{
					if(res.data.status == 200){
						this.getCerfitaData();
						for(var i=0;i<this.certificationData.length;i++){
							for(var j=0;j<this.id.length;j++){
								if(this.certificationData[i].id == this.id[j]){
								this.certificationData.splice(i,1);
								}
							}
						}
					}else{
						this.$layer.msg(res.data.msg);
					}
				}).catch(err=>{
					console.log(err)
				})
			},
			//获取资质证书列表
			getCerfitaData(){
				this.$axios({
					method:'POST',
					url:baseUrl + '/qualificationController/selectList',
					data:{
						certificateNum:'',
						certificationAuthority:'',
						professionalLevel : '',
						isSubject:'',
						periodValidity:'',
						business:''
					}
				}).then(res=>{
					if(res.data.status == 200){
						this.certificationData = res.data.data.data;
						this.certificationData.map((item,index)=>{
							if(item.periodValidity == null){
								item.formatTime = ""
							}else{
								item.formatTime = dayjs(item.periodValidity).format('YYYY-MM-DD');
							}
						})
					}else{
						this.$layer.msg(res.data.msg)
					}
				}).catch(err=>{
					console.log(err)
				})
			},
			//修改
			modifyData(row){
				this.modifyShow = true;
				this.editFlag = false;
				this.certificateNum = row.certificateNum;
				this.certificationAuthority = row.certificationAuthority;
				this.professionalLevel = row.professionalLevel;
				this.isSubject = row.isSubject;
				this.periodValidity = row.periodValidity;
				this.business = row.business;
				this.carId = row.id;
			},
			//修改后的保存
			submitAdd(){
				this.$axios({
					method:'POST',
					url:baseUrl + '/qualificationController/update',
					data:{
						id:this.carId,
						certificateNum:this.certificateNum,
						certificationAuthority:this.certificationAuthority,
						professionalLevel : this.professionalLevel,
						isSubject:this.isSubject,
						periodValidity:this.periodValidity,
						business:this.business
					}
				}).then(res=>{
					if(res.data.status == 200){
						this.getCerfitaData();
						this.modifyShow = false;
						this.editFlag = true;
					}else{
						this.$layer.msg(res.data.msg);
					}
				}).catch(err=>{
					console.log(err)
				})
			},
			// 新增
			newlyInfo(){
				this.newlyFlag = true;
				this.certificateNum = "";
				this.certificationAuthority = "";
				this.professionalLevel = "";
				this.isSubject = "";
				this.periodValidity = "";
				this.business = "";
			},
			//保存
			saveAdd(){
				this.$axios({
					method:'POST',
					url:baseUrl + '/qualificationController/insert',
					data:{
						certificateNum:this.certificateNum,
						certificationAuthority:this.certificationAuthority,
						professionalLevel : this.professionalLevel,
						isSubject:this.isSubject,
						periodValidity:this.periodValidity,
						business:this.business
					}
				}).then(res=>{
					if(res.data.status == 200){
						this.getCerfitaData();
						this.newlyFlag = false;
						this.editFlag = true;
					}else{
						this.$layer.msg(res.data.msg)
					}
				}).catch(err=>{
					console.log(err)
				})
			},
			//查看资质证书
			checkData(row){
				this.checkShow = true;
				this.certificateNum = row.certificateNum;
				this.certificationAuthority = row.certificationAuthority;
				this.professionalLevel = row.professionalLevel;
				this.isSubject = row.isSubject;
				if(row.periodValidity == null){
					this.periodValidity = "";
				}else{
					this.periodValidity = dayjs(row.periodValidity).format('YYYY-MM-DD');
				}
				this.business = row.business;
			},
			// 关闭新增
			closeNewly(){
				this.newlyFlag = false;
				this.modifyShow = false;
				this.checkShow = false;
			},
			// 上传
			upload(){
				this.uploadFlag = true;// 上传
			},
			closeUpload(){
				this.uploadFlag = false;// 上传
			},
			// 三级单位注册地区
			handleChange() {
				this.registeredArea = this.$refs['addArr'].currentLabels;
				
			},
			// 三级菜单 地址
			getAddressList(){
				this.$axios({
					method: "GET",
					url: baseUrl+"/adderssController/selectAdderssList"
				}).then(res=>{
					if(res.data.status == 200){
						this.addressList = res.data.data
					}else{
						this.$layer.msg(res.data.msg);
					}
				}).catch(err=>{
					console.log(err)
				})
			},
			// 下拉框 单位性质
			getselectList(){
				this.$axios({
                    method: "POST",
                    url: baseUrl+"/interfaceTableController/selectByname",
                    data:{
                        dropDownBox:'单位性质'
                    }
                }).then(res=>{
                    if(res.data.status == 200){
                        this.propertyData = res.data.data
                    }else{
                        this.$layer.msg(res.data.msg);
                    }
                }).catch(err=>{
                    console.log(err)
                })
			},
			// 下拉框 经济类型
			geteconomicList(){
				this.$axios({
                    method: "POST",
                    url: baseUrl+"/interfaceTableController/selectByname",
                    data:{
                        dropDownBox:'经济类型'
                    }
                }).then(res=>{
                    if(res.data.status == 200){
                        this.economicData = res.data.data
                    }else{
                        this.$layer.msg(res.data.msg);
                    }
                }).catch(err=>{
                    console.log(err)
                })
			},
			//下拉框 机构类型
			getmechanismList(){
				this.$axios({
                    method: "POST",
                    url: baseUrl+"/interfaceTableController/selectByname",
                    data:{
                        dropDownBox:'机构类型'
                    }
                }).then(res=>{
                    if(res.data.status == 200){
                        this.mechanismData = res.data.data
                    }else{
                        this.$layer.msg(res.data.msg);
                    }
                }).catch(err=>{
                    console.log(err)
                })
			},
			//enterprises下拉框 企业类型
			getEnterprisesList(){
				this.$axios({
                    method: "POST",
                    url: baseUrl+"/interfaceTableController/selectByname",
                    data:{
                        dropDownBox:'企业类型'
                    }
                }).then(res=>{
                    if(res.data.status == 200){
                        this.enterprisesData = res.data.data
                    }else{
                        this.$layer.msg(res.data.msg);
                    }
                }).catch(err=>{
                    console.log(err)
                })
			},
			//办理记录列表
			getRecordList(){
				this.$axios({
					method:'POST',
					url:baseUrl + '/subcontractItemController/selectHistory',
					data:{
						entrySubcontractNumber:this.userId
					}
				}).then(res=>{
					if(res.data.status == 200){
						this.handleRecordData = res.data.data
						this.handleRecordData.map((item,index)=>{
							item.creationTime = dayjs(item.creationTime.format('YYYY-MM-DD'))
						})
					}else{
						this.$layer.msg(res.data.msg)
					}
				}).catch(err=>{
					console.log(err)
				})
			},
			//校验手机号联系方式
			blurPhone(){
				if(!isPoneAvailable(this.contactInformation)){
					this.$layer.msg('请输入正确的联系方式');
				}
			},
			//校验身份证号码
			getIdNumber(){
				if(!getIdcard(this.legalIdNumber)){
					this.$layer.msg('请输入正确的身份证号码');
					return false;
				}
			},
			//关闭弹框
			handleClose(){
				this.saveBox = false;
				this.submitBox = false;
			}
		}
	}
</script>
<style scoped>
.myDiv{
	width: 100%;
	height: 100%;
	overflow: hidden;
}
.top_box{
	z-index: 100;
}
.newBox{
	width: 100%;
	height: 100%;
	background: #fff;
	position: relative;
}
/* 基本信息首页 , 修改 */
.wrapper,.editWrapper{
	width: 100%;
	height: 100%;
	z-index: 10;
	overflow: hidden;
	/* overflow-y: scroll; */
}
/* 头部 */
.title{
	width: 100%;
	height: 40px;
	background: #e2e2e2;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0 30px 0 2px;
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
.upload_btn{
	width: 100%;
	height: 40px;
	background: #e2e2e2;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0 2px;
	margin-bottom: 10px;
}
.upload_btn>div{
	height: 100%;
}
.upload_main{
	width: 100%;
}
.upload_main>h1{
	text-align: center;
	line-height: 40px;
}
.upload_reminder{
	padding: 0 5px;
	color: red;
	line-height: 24px;
}
.lookbtn{
	width: 30px;
	height: 30px;
	cursor: pointer;
}
.el-icon-tickets{
	font-size: 20px; 
}
.el-icon-close{
	font-size: 24px; 
}
.el-collapse{
	width: 90%;
	margin: 10px auto;
}
.main{
	width: 100%;
	height: 100%;
	overflow-y: scroll;
	flex: 1;
}
/* 字列表 */
.contentBox{
	display: flex;
	flex-direction: column;
	padding: 10px 30px;
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
.contentBox li h3,b{
	font-weight: normal;
	color:red;
}
/* 查看变更内容 , 新增*/
.searchWrapper,.newlyWrapper{
	width: 96%;
	height: 100%;
	position: fixed;
	left: 220px;
	top: 115px;
	background: rgba(0, 0, 0, .3);
	z-index: 99;
	padding: 10px;
}
.uploadWrapper{
	width: 96%;
	height: 100%;
	position: fixed;
	left: 0;
	top: 0;
	background: rgba(0, 0, 0, .3);
	z-index: 99;
	padding: 10px;
}
.uploadBox{
	width: 100%;
	height: 100%;
	background: #fff;
}
.searchBox{
	width: 86%;
	height: 100%;
	background: #fff;
}
.newlyBox{
	width: 86%;
	height: 100%;
	background: #fff;
}
.search_title,.newly_title,.upload_title{
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
.search_btn{
	width: 100%;
	height: 40px;
	background: #e2e2e2;
	display: flex;
	justify-content: flex-end;
	align-items: center;
	padding: 0 30px 0 2px;
}


.search_write{
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding:10px 60px 10px 100px;
}
.writeInput > .el-input {
	width: 60% !important;
	height: 35px !important;
}
.noteContent{
	display: flex;
	align-items: center;
}
.noteTime{
	display: flex;
	align-items: center;
	width: 320px;
}
.noteTime p{
	margin: 0 5px;
}
/* 修改 */
.edit_title,.newly_btn{
	width: 100%;
	height: 40px;
	background: #e2e2e2;
	display: flex;
	justify-content: flex-start;
	align-items: center;
	padding: 0 30px 0 2px;
	margin-bottom: 10px;
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
.noteLeft{
	width: 150px;
	display: flex;
	justify-content: center;
	text-align: center;
}
.star{
	color: red;
	padding-right: 5px;
}
.write_input{
	width: 350px;
}
.write_textarea{
	width: 970px !important;;
}
.write_input > .el-select{
	width: 100% !important;
}
.write_input>.el-cascader{
	width: 100% !important;
}
.write_checked{
	display: flex;
}
.write_money{
	display: flex;
	width: 200px;
	align-items: center;
}
.money{
	width: 160px;
	margin-right: 10px;
}
.edit_list{
	padding: 0 50px;
}
.newly_main{
	height: 100%;
	overflow-y: scroll;
}
/* 弹窗 */
.icon{
    width: 100%;
    padding: 0 10px;
    display: flex;
    align-items: center;
}
.el-icon-warning,.el-icon-success{
    font-size: 100px;
    color: #0a5e9d;
}
.icon span{
    margin-left: 20px;
    font-size:18px;
}
.fail_box{
  width:100%;
  margin:0 auto;
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  border-bottom: 1px dashed #333;
}
</style>