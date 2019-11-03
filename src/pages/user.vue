<template>
	<div id="user">
		<mt-header fixed title="我的"></mt-header>
		<div class="user-main">
	    	<div class="user-item">
	    		<a href="#">
	    			<em>我的订单</em><span class="left_gray"></span>
	    		</a>
	    	</div>
	    	<div class="user-item">
	    		<a href="#">
	    			<em>优惠卷</em><span class="left_gray"></span>
	    		</a>
	    	</div>
	    	<div class="user-item">
	    		<a href="#">
	    			<em>影院会员卡</em><span class="left_gray"></span>
	    		</a>
	    	</div>
	    	<div class="user-item">
	    		<a href="#">
	    			<em>想看的电影</em><span class="left_gray"></span>
	    		</a>
	    	</div>
	    	<div class="user-item">
	    		<a href="#">
	    			<em>看过的电影</em><span class="left_gray"></span>
	    		</a>
	    	</div>
	    	<div class="login-btn user-btn">
	    		
	    		
				<a href="#"><mt-button  type="primary" size="large" @click="a()">点击退出</mt-button></a>
			</div>
			<div class="user-footer">
				<div class="user-logo"><img src="../assets/img/LOGO_gray.png"/></div>
				<p>客服电话：027-87229009</p>
			</div>
	   </div>
		<shuai-footer :info="footer"  active="there"></shuai-footer>
	</div>

</template>

<script>
	export default{
		data(){
			return{
				footer:[
				{
					linkurl:"/",
					name:"电影"
				},
				{
					linkurl:"/order",
					name:"订单"
				},
				{
					linkurl:"/user",
					name:"我的"
				}]
			}
		},
			methods:{
				a(){
					sessionStorage.removeItem("user")
					sessionStorage.removeItem("page")
					this.$toast("用户退出成功")
					
				}
			}
	}
</script>

<style lang="less" >
em{
	font-style: normal
}
.user-main{
	padding: 45px 0 50px;
}
.user-item{
	background-color: #fff;
	border-bottom: 1px solid #eee;
}
.user-item a{
	display: block;
	padding: 15px 10px;
	height: 100%;
}
.user-item span{
	float: right;
	width: 10px;
	height: 15px;
	background: url(../assets/img/left_gray.png) no-repeat;
	background-size: 60%;
	margin-top: 5px;
}
.user-item:first-child,.user-item:nth-child(4){
	margin-top: 10px;
}

.user-footer{
	width: 50%;
	margin: 0 auto;
	margin-top: 40px;
	text-align: center;
	img{
		width: 100%;
	}
}
.user-footer p{
	color: #999;
	margin-top: 10px;
}
</style>