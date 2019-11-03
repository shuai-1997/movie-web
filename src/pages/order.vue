<template>
	<div id="order">
		<mt-header fixed title="我的订单"></mt-header>
		
		<div id="no" v-if="!user">
				<p>您还未登录，是否<router-link to="/logon">立即登录?</router-link> </p>
		</div>
		<div class="container" v-else>
	    	<div class="order-item" v-for="(i,index) in obj" :key="index">
	    		<dl>
	    			<dt><img src="../assets/img/movie.jpg"/></dt>
	    			<dd><em>芳华 {{i.checked.length}}张</em></dd>
	    			<dd>{{i.time}}</dd>
	    			<dd>
	    				3号厅
	    				<span v-for="(j,x) in i.checked" :key="x">{{j[0]}}排{{j[1]}}座</span>
	    				
	    			</dd>
	    		</dl>
	    		<div class="status">
	    			<em>总价：{{i.total}}元</em><span>已完成</span>
	    		</div>
	    	</div>
   		</div>
   	
   		<shuai-footer :info="footer"  active="two"></shuai-footer>
	</div>
		
	    		
	  		
		
</template>

<script>
	export default{
		data(){
			return{
				user:"",
				obj:"",
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
				}
				]
			}
		},
		created(){
			this.user=sessionStorage.getItem("user")
			console.log(this.user)
			this.$http.get("/order?user="+this.user).then(reg=>{
				console.log(reg)
			this.obj=reg.data
			console.log(this.obj)
			},err=>{
				this.$toast("网络错误")	
			})
		}
	}
</script>

<style scoped lang="less">
#no{
	margin-top:70px ;
	p{
		text-align: center;
		a{
			color: #009CDC;
		}
	}
}
em{
	font-style: normal;
}
.container{
	margin-top: 70px;
	padding: .2rem;
}
.order-item{
	margin: 10px -10px;
	background: #fff;
}
.order-item:first-child{
	margin-top: -35px
}
.order-item dl{
	overflow: hidden;
	padding:10px;
}
.order-item dt{
	float: left;
	width: 18%;
	margin-right: 5px;
	img{
		width: 100%;
	}
}
.order-item dd em{
	font-weight: bold;
	display: inline-block;
	margin-bottom: 10px;
}
.order-item dd{
	line-height: 2;
	float: left;
	width: calc(82% - 5px);
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}
.status{
	border-top: 1px solid #eee;
	height: 34px;
	line-height: 34px;
	width: 100%;
	padding: 0 10px;
}
.status span{
	float: right;
}
</style>