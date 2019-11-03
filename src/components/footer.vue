<template>
	<footer id="footer">
		<ul>
			<router-link  :to="info[0].linkurl">
				<li@click="activeBackups='one'" :class="activeBackups=='one'?li1_active:li1"><span>{{info[0].name}}</span></li>
			</router-link>
			<router-link  :to="info[1].linkurl">
				<li @click="activeBackups='two'"  :class="activeBackups=='two'?li2_active:li2"><span>{{info[1].name}}</span></li> 
			</router-link>
			<router-link  :to="info[2].linkurl">
				<li @click="activeBackups='there'"  :class="activeBackups=='there'?li3_active:li3"> {{info[2].name}} </li>
			</router-link>
		</ul>
	</footer>
</template>

<script>
	export default{
		props:["active","info" ],
		data(){
			return{
				li1:"li1",
				li2:"li2",
				li3:"li3",
				li1_active:"li1-active",
				li2_active:"li2-active",
				li3_active:"li3-active",
				activeBackups:this.active
			}
		}
	}
</script>

<style lang="less" scoped>
*{
	margin: 0;
	padding: 0;
}
a{
	display: block;
	width: 100%;
	color: #fff;
}
	#footer{
		position: fixed;
		bottom: 0;
		width: 100%;
		background: #076FA2;
		padding:.1rem ;
		ul{
			width: 100%;
			display: flex;
			justify-content:  space-around;
			list-style: none;
			.li1{
				background: url(../../../小莱电影-static/img/movie_icon2.png) no-repeat center top;
				background-size: 15%;
			}
			.li2{
				background: url(../../../小莱电影-static/img/order.png) no-repeat center top;
				background-size: 15%;
			}
			.li3{
				background: url(../../../小莱电影-static/img/uder.png) no-repeat center top;
				background-size: 15%;
			}
			.li1-active{
				background: url(../../../小莱电影-static/img/movie_icon.png) no-repeat center top;
				background-size: 15%;
				color: #FCBF02;
			}
			.li2-active{
				background: url(../../../小莱电影-static/img/order_icon.png) no-repeat center top;
				color: #FCBF02;
				background-size: 15%;
			}
			.li3-active{
				background: url(../../../小莱电影-static/img/uder_icon.png) no-repeat center top;
				color: #FCBF02;
				background-size: 15%;
			}
			li{
				width: 100%;
				padding-top:.4rem ;
				text-align: center;
			}
		}
		
	}
</style>