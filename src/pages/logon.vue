<template>
	<main class="login-main">
		<div class="login-logo"><img src="@/assets/img/LOGO.png"/></div>
		<div class="login-from">
			<label>
				<input type="text" v-model="user.name" placeholder="请输入用户名"/>
			</label>
			<label>
				<input type="password" v-model="user.pwd" placeholder="请输入密码"/>
			</label>
		</div>
		
		<div class="login-btn">
			
	  		<mt-button @click="submit()" type="primary" size="large">登录</mt-button>
	 		
		</div>
		<div class="link-reg">
			<router-link to="/reg">还没账号？ </router-link>
		</div>
		<div class="link-home">
			<router-link to="/">暂不登录 </router-link>
		</div>
	</main>
</template>

<script>
	export default{
		data(){
			return{
				user:{
					name:"",
					pwd:""
				}
			}
		},
		methods:{
			submit(){
				if (this.user.name==""&&this.user.pwd=="") {
						this.$toast("用户名或密码不能为空")		
						return false
				}
				this.$http.post("/login",this.user).then(res=>{
					console.log(res)
					if (res.data=='defeated') {
						this.$toast("账号或密码错误")
					} else if(res.data=="succeed"){
						sessionStorage.setItem("user",this.user.name)
						if(sessionStorage.getItem("page")){
							this.$router.push({path:'/seat',query:{id:sessionStorage.getItem("page")}})
						}else{
							this.$router.push("/")
						}
						
								
					}
				},err=>{
					//console.log(err)
					this.$toast("网络错误")
				})
			}
		}
	}
</script>

<style lang="less" scoped>
.login-main{
	padding-top: 20%;
}
.login-logo{
	width: 30%;
	margin: 0 auto;
	img{
		width: 100%;
	}
}
.login-from{
	text-align: center;
	width: 100%;
	margin: 30px auto;
}
.login-from label{
	display: block;
	margin: 10px 0;
	border-bottom: 1px solid #EFEFEF;
}
.login-from input{
	border: none;
	width: 99%;
	text-align: center;
	padding: 10px 0;
	border-radius: 0;
	font: 16px "微软雅黑";
	color: #333;
	background: transparent;
}

.link-reg,.link-home{
	padding: 5px;
	width: 30%;
	float: left;
}
.link-reg a,.link-home a{
	font-size: 12px;
	color: #888;
	display: block;
	padding: 5px 0;
}
.link-home{
	float: right;
	text-align: right
}
</style>