<template>
	<div id="home">
		<mt-header fixed title="小莱电影"></mt-header>
		<div class="ying">
			<p>影片</p>
		</div>
		<div class="body">
			<div class="movie-list" v-for="(i,key) in list" :key="key">
	    		<router-link :to="{path:'/details',query:{id:i._id}}">
	    			<div class="movie-img"><img v-bind="{src:pic+i.photo}"/></div>
	    			<div class="movie-info">
	    				<div class="hd">
	    					<h2>{{i.title}}</h2>
	    					<div class="movie-type"><span>2D</span><span>IMAX</span></div>
	    				</div>
	    				<p>剧情：{{i.category.join("、")}}</p>
	    				<p>主演：{{i.actor.join("、")}}</p>
	    			</div>
	    			<div class="grade">
	    				{{i.rank}}分
	    			</div>
	    			<mt-button class="buy"  type="primary" size="small"><a href="#">购票</a></mt-button>
	    		</router-link>
	    	</div>
		</div>
		<shuai-footer :info="footer"  active="one"></shuai-footer>
	</div>
</template>

<script>
	export default {
		data(){
			return{
				list:[],
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
		async created(){
			await this.$http.get("/movie").then(res=>{
					this.list=res.data
					console.log(this.list)
					
				},err=>{
					//console.log(err)
					this.$toast("网络错误")
				})
		}
	}
</script>

<style lang="less" scoped>
	#home{
		.ying{
			position: fixed;
			top:40px;
			z-index: 10;
			background:#fff;
			width: 100%;
			p{
				line-height: .5rem;
				color: #076FA2;
				text-align: center;
			}
		}
		.body{
			margin-top:1.1rem ;
			margin-bottom:1.1rem ;
			padding:.1rem;
		}
		.movie-list{
			padding: 10px 0;
			overflow: hidden;
			border-bottom: 1px solid #ddd;
			position: relative;
		}
		.movie-list > a{
			display: block;
			width: 100%;
			height: 100%;
			overflow: hidden;
		}
		.movie-img{
			float: left;
			width: 30%;
			margin-right: 10px;
			img{
				width: 100%;
			}
		}
		.movie-info p{
			line-height: 1.5;
			width: 45%;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
			float: left;
		}
		.hd{
			float: left;
			width: 60%;
		}
		.hd h2{
			font-size: .16rem;
		}
		.movie-type{
			margin: 5px 0;
			font-size: 12px;
		}
		.movie-type span{
			display: inline-block;
		}
		.movie-type span:nth-child(1){
			background-color:#076FA2;
			padding: 1px 4px;
			border-bottom-left-radius: 2px;
			border-top-left-radius: 2px;
			color:#fff
		}
		.movie-type span:nth-child(2){
			background-color:#fff;
			padding: 0px 4px;
			border-bottom-right-radius: 2px;
			border-top-right-radius: 2px;
			border: 1px solid #076FA2;
			color:#076FA2
		}
		.grade{
			position: absolute;
			right:10px;
			top: 35px;
			font-weight: bold;
			color: #f90;
			font-size: 16px;
		}
		.buy{
			width: 20%;
			padding: 8px 15px;
			background-color: #076fa2;
			position: absolute;
			text-align: center;
			right: 0;
			bottom: 10px;
			border-radius: 3px;
		}
		.buy a{
			display: block;
			width: 100%;
			height: 100%;
			color: #fff;
		}
	}
</style>