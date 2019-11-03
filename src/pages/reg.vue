<template>
	<div id="reg">
	<mt-header title="用户注册">
	  <router-link to="/" slot="left">
	    <mt-button icon="back"></mt-button>
	  </router-link>
	  <router-link to="/logon"  slot="right">
	  	<mt-button >登录</mt-button>
	  </router-link>
	</mt-header>
	<div class="reg-main">
    	<div class="reg-from">
    		<label><input type="text" v-model="user.name" @input="input()" placeholder="请输入用户名"></label>
    		<label><input type="password" v-model="user.pwd" @input="verifypwd()" placeholder="请输入密码（只能包含数字与字符且6-12位）"></label>
    		<label><input type="password" v-model="pwds" placeholder="请确认密码"></label>
   		 </div>
	</div>
	<div class="treaty">
    		<input type="checkbox" id="treaty" checked="checked">
    		<label for="treaty">我已阅读并同意《格莱科技用户协议》</label>
    </div>
    <mt-button type="primary" size="large" @click="submit()">立即注册</mt-button>
    <div id="login" v-if="login">
    	<router-link to="/logon">注册成功,点击返回登录（{{miao}}秒后自动退出页面）</router-link>
    </div>
	<div class="contact" @click="login1()">
			<span>© 格莱科技 027-87229009</span>
	</div>
	</div>
	
</template>

<script>
	export default {
		data(){
			return{
				user:{
					name:"",
					pwd:""
				},
				pwds:"",
				time:"",
				time2:"",
				flag:true,
				login:false,
				miao:5,
				time3:""
			}
		},
		methods:{
			login1(){
				clearInterval(this.time3)
				this.$router.push("/logon")
			},
			submit(){
				if(!this.user.name || !this.user.pwd || !this.pwds)return false;
				console.log(1)
				if(this.user.pwd != this.pwds)return false;
				console.log(2)
				if(this.flag==false)return false
				console.log(3)
				this.$http.post("/reg",this.user).then(res=>{
					console.log(res)
					 if(res.data=="succeed"){
					 	this.login=true
						this.time3=setInterval(()=>{
							this.miao--
							if (this.miao==0) {
								clearInterval(this.time3)
								this.$router.push("/logon")
							}
						},1000)
					}
				},err=>{
					this.$toast("网络错误")
				})
			},
			input(){
				clearTimeout(this.time)
				this.time=setTimeout(()=>{
					this.$http.post("/verify",this.user).then(res=>{
						if (res.data=='nameRepeat') {
							this.$toast("用户名已存在")
						}
					},err=>{
						this.$toast("网络错误")
					})
				},1000)
			},
			verifypwd(){
				clearTimeout(this.time2)
				this.time2=setTimeout(()=>{
					let reg= /^[\w]{6,12}$/
					if (!reg.test(this.user.pwd)) {
						this.flag=false;
						this.$toast("密码格式错误")
					}else{
						this.flag=true;
					}
				},1000)
			}
		}
		
	}
</script>

<style lang="less" scoped>
	#reg{
		#login{
			text-align: center;
			margin:.5rem 0 ;
			font-size: .24rem;
			a{
				color: green;
			}
		}
		.reg-from {
			input {
				display: block;
				width: 100%;
				height: 0.7rem;
				margin: 0.1rem 0;
				border: none;
				padding-left: 0.1rem;
			}
			input::-webkit-input-placeholder{
				
			}
			input::-ms-input-placeholder{
				
				
			}
			input::-moz-placeholder {
				
				
			}
		}
		.treaty{
			margin: .1rem;
		}
		.contact{
			text-align: center;
		}
	}
</style>