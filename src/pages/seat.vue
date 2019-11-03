<template>
	<div id="seat">
		<mt-header fixed title="影院">
	    		<mt-button slot="left" icon="back" @click="go()"></mt-button>
	  		
		</mt-header>
		 <div class="seat-title">
	        <h2>{{obj.title}}</h2>
	        <h4>{{obj.time}} {{obj.type}}</h4>
	        <div class="lobby">
	        	<span>{{obj.address}}银幕</span>
	        </div>
   		 </div>
   		 <div class="container seat">
			<div class="seating">
				<ul id="ul">
					<li v-for="(i,index) in seats" :class="i[2]==2&&active_selled" @click="select(i,index)" :key="index" ></li>
				</ul>
			</div>
			<div class="tips-seat">
				<span class="selecting">可选</span><span class="selected">已选</span><span class="selled">已售</span>
			</div>
			<div class="ticket">
				<h5>已选座位</h5>
				<div class="ticket-item" v-for="(i,index) in selected" :key="index">
					<router-link to="#">
						{{i[0]}}排{{i[1]}}座<em>￥{{obj.price}}</em>
					</router-link>
					
				</div>
			</div>
	  	</div>
	   	<div class="seat-bar" @click="submit()">

	   		<span>￥{{total}}确认选座</span>
	   	</div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				obj:{},
				seats:[],
				active_selled:"active-selled",
				active:"active",
				total:0,
				selected:[],
				seat:[],
				id:this.$route.query.id
			}
		},
		created(){
			this.$http.get("/cinema?id="+this.id).then(res=>{
				this.obj=res.data
				this.obj.selected=this.obj.selected.join("|").split("|")
				let date1=new Date(this.obj.time)
				this.obj.time=date1.toLocaleDateString()+" "+date1.toLocaleTimeString().substr(0,6)
				
				for(let i=1 ;i<=this.obj.seat;i++){
					if(this.obj.selected.includes(Math.ceil(i/12)+","+(i%12?i%12:12))){
						this.seats.push([Math.ceil(i/12),i%12?i%12:12,2])
					}else{
						this.seats.push([Math.ceil(i/12),i%12?i%12:12,0])
					}
					
				}
				console.log(this.seats.length)
			},err=>{
				this.$toast("网络错误")	
			})
		},
		methods:{
			select(a,index){
				
				if(a[2]!=2){
					var el=document.getElementById("ul")
					if(a[2]==0) {
						if(this.selected.length>2){
							this.$toast("一位用户最多购买三张影票")		
							return false
						}
						a[2]=1
						el.children[index].classList.add("active"); 
					}else if(a[2]==1){
						a[2]=0
						el.children[index].classList.remove("active"); 
					}
					this.selected=this.seats.filter(i=>i[2]==1)
					this.total=this.selected.length*this.obj.price
					
					let copy_seats=JSON.parse(JSON.stringify(this.seats)) 
					let data=copy_seats.filter(i=>i[2]!=0)
					data.forEach(i=>i.pop())
					this.seat=data
				}
			},
			submit(){
				if (this.selected.length==0) {
					this.$toast("请选择你的座次")		
					return false
				}
				if (!sessionStorage.getItem("user")) {
					this.$router.push("/logon")
					sessionStorage.setItem("page",this.id)
					return false
				}
				let data={
					title:this.obj.title,
					address:this.obj.address,
					time:this.obj.time,
					checked:this.selected,
					total:this.total,
					user:sessionStorage.getItem("user")
				}
				console.log(data)
				this.$http.post("/seats",{id:this.obj._id,seat:this.seat,data}).then(reg=>{
					this.$router.push("/order")
				},err=>{
					this.$toast("网络错误")		
				})
			},
			go(){
				history.go(-1)
			},
			
			
			
		}
		
		
	}
</script>

<style>
.seat{
	margin-top: 130px;
	padding-bottom:120px;
}
.seat-title{
	
	width: 100%;
	background: #fff;
	padding: 10px;
	border-bottom: 1px solid #d8e7ef;
	position: fixed;
	top: 40px;
	z-index: 10
}
.seat-title h2{
	font-size: 16px;
	margin-bottom: 5px;
	color: #076FA2;
}
.seat-title h4{
	font-size: 12px;
	color: #888
}
.lobby{
	position:absolute;
	width: 176px;
	height: 25px;
	margin: auto;
	left: 0;
	right: 0;
	bottom: -23px;
	background: url(../assets/img/screen.png) no-repeat center center;
	background-size: 80%;
	z-index: 100;
	text-align: center;
	font-size: 12px;
}
.lobby span{
	display:inline-block;
	margin-top: 4px;
	color: #D8E7EF;
}
.seating{
	/*margin: 0 -10px;*/
	/*margin-top: 90px;*/
	
	text-align: center;
}
.seating ul{
	width: 100%;
	margin: 0 auto;
}
.seating li{
	width:10%;
	height: 20px;
	display: inline-block;
	background: url(../assets/img/e_seat.png) no-repeat center center;
	background-size: 23px 20px;
	margin: 5px 0;
}
.seating .active{
	background: url(../assets/img/sed_seat.png) no-repeat center center;
	background-size: 23px 20px;
}
.seating .active-selled{
	background: url(../assets/img/sell_seat.png) no-repeat center center;
	background-size: 23px 20px;
}
.tips-seat{
	background-color: #fff;
	/*margin: 0 -10px;*/
	padding: 10px 0;
	padding-left: 10%;
	border-bottom: 1px solid #F1F1F1;
}
.tips-seat span{
		display: inline-block;
		background-size: 23px 20px;
		text-indent: 55px;
}
.selecting{
	background: url(../assets/img/e_seat.png) no-repeat center center;
}
.selected{
	background: url(../assets/img/sed_seat.png) no-repeat center center;
}
.selled{
	background: url(../assets/img/sell_seat.png) no-repeat center center;
}
.ticket{
	background: #fff;
	/*margin: 0 -10px;*/
	padding: 10px 5px;
	overflow: hidden;
	min-height: 70px;
}
.ticket h5{
	font-weight: normal;
	margin: 5px 0;
}
.ticket-item{
	background: url(../assets/img/seat_item.png) no-repeat center center;
	width: 80px;
	height: 34px;
	float: left;
	background-size: 80px 34px;
	font-size: 12px;
	margin: 5px;
	text-align: center;
	position: relative;
}
.ticket-item:after{
	display: block;
	content: "×";
	width: 6px;
	height: 5px;
	position: absolute;
	right: 10px;
	top: 7px;
	color: #ccc
}
.ticket-item em{
	color: #f90;
	display: block;
}
.ticket-item a{
	display: block;
	height: 100%;
}
.seat-bar{
	background: #009cdc;
	height: 50px;
	position: fixed;
	max-width: 750px;
   	min-width: 320px;
    overflow: hidden;
    margin: 0 auto;
    bottom: 0;
    left: 0;
    right: 0;
	text-align: center;
}
.seat-bar span{
	line-height: 50px;
	color: #fff;
	font-size: 16px;
	font-weight: bold;
	display: block;
	height: 100%;
}
</style>