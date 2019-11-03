<template>
	<div id="details">
		<mt-header fixed :title="obj.title">
			<router-link to="/" slot="left">
	    		<mt-button icon="back"></mt-button>
	  		</router-link>
		</mt-header>
		 <div class="container detail-container">
	    	<div class="banner">
	    		<div class="filter-box"></div>
	    		<div class="thumbnail" v-if="obj">
	    			<img  v-bind="{src:pic+obj.photo}"/> 
	    		</div>
	    		<div class="movie-intr">
	    			<h1>{{obj.title}}</h1>
	    			<div class="star-level">
	    				<div id="star_con" class="star-vote">
	    					<div class="add-star" :style="{width:star}"></div>
						</div>
	    				<div class="point">
	    					{{obj.rank}}
	    				</div>
	    			</div>
	    			<p>剧情:{{obj.category}}</p>
	    			<p>主演:{{obj.actor}}</p>
	    			<p>上映时间：{{obj.time}}大陆</p>
	    		</div>
	    	</div>
	    	<div class="movie-recommend">
				<p>{{obj.description}}</p>
	    	</div>
	   </div>
	   	<router-link :to="{path:'/cinema',query:{title:obj.title,rank:obj.rank}}"><mt-button type="primary" size="large">立即订购</mt-button></router-link>
   	</div>
</template>

<script>
	export default{
		data(){
			return{
				obj:"",
				star:0
			}
		},
		async created(){
			
			await this.$http.get("/movie?id="+this.$route.query.id).then((reg)=>{
				this.obj=reg.data
				this.obj.category=this.obj.category.join("、")
				this.obj.actor=this.obj.actor.join("、")
				this.star=this.obj.rank*10+"%"
				console.log(this.obj)
			},(err)=>{
					this.$toast("网络错误")
				
			})
		}
	}
</script>

<style lang="less" scoped>

.container{
		margin-top: 30px;
		padding: 10px;
	}
	
.banner{
	margin: 0 -10px;
	background: url(../assets/img/bg.jpg);
	width:calc( 100% + 20px);
	overflow: hidden;
	position: relative;
	background-size: contain;
	z-index: 0;
}
.banner::before{
	display: block;
	content: "";
	background:inherit;
	width: 100%;
	height:calc( 100% + 20px);
	position: absolute;
	top: -10px;
	left: 0;
	right: 0;
	z-index: -1;
	-webkit-filter: blur(5px);
    filter: blur(5px);   
    filter: progid:DXImageTransform.Microsoft.Blur(PixelRadius=4, MakeShadow=false);   
}
.thumbnail{
	width: 30%;
	border: 1px solid #ccc;
	float: left;
	margin: 10px;
	img{
		width: 100%;
	}
}
.movie-intr{
	width:calc(70% - 20px);
	float: left;
	margin: 10px 0;
	color: #EFEFEF;
}
.movie-intr h1{
	color: #fff;
	font-size: .24rem;
}
.star-level{
	margin: .1rem 0;
	position: relative;
	width: 1rem;
	overflow: hidden;
}

.star-vote{
	width:1rem;
    height:.2rem;
    background-image:url(../assets/img/2.png) ;
    background-repeat: no-repeat;
    background-size: 1rem;
    .add-star{
    background-image:url(../assets/img/1.png) ;
    background-size: 1rem;
    background-repeat: no-repeat;
    height:.2rem;
    }
}

.point{
	margin-top: .2rem;
}
.movie-recommend{
	line-height: 1.7;
	padding: .3px 0;
	text-indent: 2em;
}
</style>