<template>
  	<div class="myDiv">
		<div class="login_box">
				<div class="login_bg">
						<h1>招标采购交易系统</h1>
						<div class="noteBox">
							<div class="noteContent">
							<div class="noteLeft">账号：</div>
							<div class="noteFlex">
								<el-input v-model="userName" placeholder="请输入内容" class="inpu"></el-input>
							</div>
							</div>
						</div>
						<div class="noteBox">
							<div class="noteContent">
							<div class="noteLeft">密码：</div>
							<div class="noteFlex">
								<el-input type="password" v-model="password" placeholder="请输入密码" class="inpu"></el-input>
							</div>
							</div>
						</div>
						<div class="noteBox">
							<div class="noteContent">
								<div class="noteLeft">验证码：</div>
								<div class="noteFlex">
									<el-input v-model="verificationCode" @keyup.enter.native ="submit()"></el-input>
								</div>
								<div style="display: inline-flex;margin-left:30px;width:40%;">
									<span class="yzm">{{authCode}}</span>
								</div>
							</div>
						</div>
						<div class="log_sub" @click="submit">
							<el-button type="primary">登录</el-button>
						</div>
				</div>
		</div>
  </div>
</template>

<script>
import baseUrl from '../api/api'
export default {
	components: {},
	props: {},
	data() {
		return {
			user:{},
			userName:'',// 账号
			password:'',// 密码
			checked:'',// 记住密码单选框
			verificationCode:'',// 验证码
			authCode:'',// 后台获取的验证码
			keyData:'',// 后端返回的key值
		}
  	},
	created() {
		this.getIdetifyData();
	},
	methods: {
		// 登录
		submit(){
			if(this.verificationCode!=this.authCode){
				this.$message.error('验证码输入错误,请重新输入!');
			}else{
				this.$axios({
					method: "POST",
					url:baseUrl + '/personnelController/login',
					data:{
						userName:this.userName,
						password:this.password,
						verificationCode:this.verificationCode
					}
				}).then(res=>{
					if(res.data.status == 200){
						this.keyData = res.data.data;
						this.$router.push({
							name: 'home', 
							params: {
								key: this.keyData
							}
						})    
						window.localStorage.setItem('login',this.keyData); 
					}else{
						this.open(res.data.msg)
					}
				}).catch(err=>{
					console.log(err)
				})
			}
		},
		//获取验证码
		getIdetifyData(){
			this.$axios({
				method:'GET',
				url:baseUrl + '/personnelController/generatingVerificationCode'
			}).then(res=>{
				if(res.data.status == 200){
					this.authCode = res.data.data;
				}else{
					this.open(res.data.msg)
				}
			}).catch(err=>{
				console.log(err)
			})
		},
		//弹框
		open(msg) {
			this.$alert(msg, '提示', {
				confirmButtonText: '确定'
			});
		},
	}
};
</script>
<style scoped>
.myDiv {
  position: relative;
  left: 0;
  top:0;
  width:100%;
  height: 100%;
  background: url('../assets/imgs/login_bg.jpg') no-repeat center center;
  background-size: 100% 100%;
}

.login_bg{
	width: 40%;
	position: absolute;
	left:50%;
	top:50%;
	transform: translate(-50%,-50%);
  background: #fff;
  border-radius: 4px;
}
h1{
  text-align: center;
  margin-top:5%;
}
.log_acc,.log_psd,.log_re,.noteBox{
  width:80%;
  margin: 5% auto;
  font-size: 14px;
}

.log_sub{
  width:80%;
  margin: 5% auto;
}

.el-col-lg-offset-9{
  width: 37% !important;
}
/* 验证码 */
.noteBox {
  height: 40px;
  line-height: 40px;
  color: #333;
}
.noteBox .noteContent {
		display: flex;
		width: 100%;
}
	
.noteContent .noteLeft {
  display: inline-block;
}

.noteContent .noteFlex {
  flex: 1;
  flex-direction: column;
  display: inline-block;
}
.yzm{
  display: inline-block;
  width: 100px;
  background-color: #C0C0C0;
  text-align: center;
  font-size: 20px;
  font-weight: bold;
}
</style>