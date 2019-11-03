<template>
	<div id="cinema">
		<mt-header fixed title="影院">
			
	    	<mt-button @click="go()" icon="back" slot="left"></mt-button>
	  		
		</mt-header>
		<div class="m-title">
       	 	<h3>{{$route.query.title}}<em>{{$route.query.rank}}分</em></h3>
   		</div>
   		<div class="container">
			<div class="scene-item" v-for="(i,index) in obj" :key="index">
				<!--<span class="c-time">{{i.time+"/n"+i.date1}}</span>-->
				<span class="c-time"> <em>{{i.date1}}</em></br>{{i.time}}</span>
				<span class="c-type">{{i.type}}<em>{{i.address}}</em></span>
				<span class="c-price">￥{{i.price}}</span>
				<router-link :to="{path:'/seat',query:{id:i._id}}" class="c-btn"><button>选择购票</button></router-link>
			</div>
	   </div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				obj:[],
			}
		},
		created(){
			this.$http.get("/cinema?title="+this.$route.query.title).then(reg=>{
				this.obj=reg.data
				this.obj.forEach((i)=>{
					let date1=new Date(i.time)
					i.time=date1.toLocaleTimeString().substr(0,6)
					i.date1=date1.toLocaleDateString()
				})
				
				
				console.log(this.obj)
			},err=>{
				this.$toast("网络错误")	
				window
			})
		},
		methods:{
			go(){
				history.go(-1)
			}
		}
		
	}
</script>

<style lang="less" scoped>
.m-title{
	max-width: 750px;
    min-width: 320px;	
    height: 40px;
    line-height: 40px;
    background-color: #fff;
    border-bottom: 1px solid #d8e7ef;
    text-align: center;
    color: #076fa2;
	position: fixed;
	width: 100%;
    top: 40px;
    z-index: 2;
}
.m-title h3 em{
	color: #f90;
	font-size: 12px;
	padding-left: 3px;
}
.container{
	margin-top: 80px;
}
.scene-item{
	padding: 20px 10px;
	margin: auto -10px;
	border-bottom: 1px solid #f1f1f1;
}
.scene-item:first-child{
	margin-top: 10px;
	border-top: 1px solid #efefef;
}
.scene-item:nth-child(odd){
	background-color:#fff;
}
.scene-item span{
	display: inline-block;
	text-align: center;
}
.c-time{
	width:20%;
}
.c-type{
	width: 30%;
	font-size: 12px;
}
.c-price{
	width: 20%;
}
.c-type em{
	display: block;
	font-size: 12px;
	color: #666;
}
.c-btn{
	text-align: right;
	width: 23%;
	float: right;
	margin-top: 4px;
	margin-right: .2rem;
}
.c-btn button{
	border-radius: 3px;
	padding: 5px 6px;
	border: 1px solid #076FA2;
	color: #076FA2;
}
</style>