<template>
	<div class="a">
		<div class="content" @touchmove="touchmove" @touchstart="touchstart" @touchend="touchend"
		 :style="{left:left_val+'px',transition:needTransition?'left .3s':''}" @transitionend="transitionend">
			<div class="page page1">
				<div class="header">
                    <h1 >天天超市{{pageNum}}</h1>
					<h3 class="">正品行货尽在此</h3>	
				</div>
				<div class="body">
					<div class="carousel slide" data-ride="carousel">
						<ul class="carousel-indicators">
							<li data-target=".carousel" data-slide-to="0" class="active"></li>
						    <li data-target=".carousel" data-slide-to="1"></li>
						    <li data-target=".carousel" data-slide-to="2"></li>
						</ul>
						  <div class="carousel-inner">
						    <div class="carousel-item active">
						      <img src="src/pic/carousel-0.jpg">
						    </div>
						    <div class="carousel-item">
						      <img src="src/pic/carousel-1.jpg">
						    </div>
						    <div class="carousel-item">
						      <img src="src/pic/carousel-2.jpg">
						    </div>
						  </div>
					</div>
					<div class="nav-bar">
						<ul class="nav nav-justified">
							<li class="nav-item"><i class="iconfont icon-shouji text-danger"></i>
								<span>手机数码</span></li>
							<li class="nav-item"><i class="iconfont icon-dazhe text-danger"></i>
							<span>劲享折扣</span></li>
							<li class="nav-item"><i class="iconfont icon-lipin text-danger"></i>
							<span>精美礼品</span></li>
							<li class="nav-item"><i class="iconfont icon-jingpin text-danger"></i>
							<span>旗舰精品</span></li>
						</ul>
						<ul class="nav nav-justified">
							<li class="nav-item"><i class="iconfont icon-jiaju text-danger"></i>
							<span>家具日用</span></li>
							<li class="nav-item"><i class="iconfont icon-yifu text-danger"></i>
							<span>衣物鞋帽</span></li>
							<li class="nav-item"><i class="iconfont icon-yundong text-danger"></i>
							<span>运动户外</span></li>
							<li class="nav-item"><i class="iconfont icon-daohanghaiwaigou text-danger"></i>
							<span>海外直采</span></li>
						</ul>
					</div>
					<div class="ad">
						<img src="src/pic/ad0.jpg"/>
						<img src="src/pic/ad1.jpg"/>
						<img src="src/pic/ad2.jpg"/>
						<img src="src/pic/ad3.jpg"/>
						<img src="src/pic/ad4.jpg"/>
					</div>

				</div><!--body><-->
			</div>	
			<div class="page page2">
				<div class="search">
					<input placeholder="输入你想要的物品">
				</div>
				<div class="body">
					<ul id="collapse-p" class="col-3">
						<li v-for="val in res" data-toggle="collapse" :data-target="val.name"><i class="iconfont icon-changtiao text-warning"></i>{{val.name}}
							<ul class="collapse" :id="val.name" data-parent="#collapse-p">
								<li class="text-center"  v-for="(x,y) in val.a1">{{y}}</li>
							</ul>
						</li>
					</ul>
					<ul class="item">
						<li style="background:orange;"  >
							<itemVue @totalcount="totalcount"/>
						</li>
						<p>总额：{{total}}</p>
					</ul>
				</div>
			</div><!--page2><-->
			<div class="page page3">
				<car/>
			</div>
			<div class="page page4">
			</div>					
	</div><!--a><-->
	<div class="footer" v-countHeight="{screenH}">
		<i v-footiconchange="{pagenum:0,pageNum}" class="iconfont icon-zhuye" @touchstart="footer_touch(0)"></i>
		<i v-footiconchange="{pagenum:1,pageNum}" class="iconfont icon-fenlei" @touchstart="footer_touch(1)"></i>
		<i v-footiconchange="{pagenum:2,pageNum}" class="iconfont icon-gouwuche" @touchstart="footer_touch(2)"></i>
		<i v-footiconchange="{pagenum:3,pageNum}" class="iconfont icon-xiazai" @touchstart="footer_touch(3)"></i> 
	</div><!--footer><-->
</div>
</template>
<script>
import itemVue from "./components/item.vue"
import car from "./components/car.vue"
import axios from "axios"
export default {
	data(){
		return {
			screenH:"",
			screenW:"",
			clientx:"",
			//当前屏幕left的值;
			left_val:0,
			//实际滑动值
			offset_x:"",
			//当前触发事件页面； 
			pageNum:0,
			//json数据
			res:"",
			//字面意思..
			needTransition:false,
			total:0,
			car:[]

		}
	},
	components:{itemVue,car},
	created(){
		this.screenH=parseInt(window.screen.availHeight);
		this.screenW=parseInt(window.screen.availWidth);
              axios.get("src/a.json").then((res)=>{
           	this.res=res.data
           	console.log(sessionStorage)
           })
	},
	methods:{
		touchstart(){
			   //获取点X坐标；
               this.clientx=event.targetTouches[0].screenX;
               this.pageNum=Math.floor((-this.left_val)/this.screenW);

		},
		touchmove(){
			//重新定义touchmove	
			event.preventDefault();
         //取移动距离    《0 left    》0 right    
         this.offset_x=event.targetTouches[0].screenX-this.clientx;
         
           this.horizontalSlide()
		},
		touchend(){      
         

         if (this.offset_x)
         {
         	this.horizontalMove()

          //清除当前偏移量
         this.offset_x="";


         }
                   console.log("主程序")
		},
		horizontalSlide(){
			//设置边线不可动；
          if(  (this.offset_x>0 && this.left_val==0 ) || (this.offset_x<0 && this.left_val==-this.screenW*3) ){
          	//需要清零this.offset_x 否则会触发横向补充移动函数;
          	this.offset_x=0
          }
          else{this.left_val=-this.pageNum*this.screenW+this.offset_x;
          }  
		},
        //.content横向补充移动函数；
        horizontalMove(){
         //通过this.offset_x 正负判断前进还是后退；        
         //左滑; 
         if(this.offset_x<0){         	
           if(this.offset_x<-this.screenW/4){

          	 this.pageNum+=1;
          }
         }
         //右滑 同理；
         else if(this.offset_x>0)
         {
         	if(this.offset_x>this.screenW/4){

         		 this.pageNum-=1;
         	}
         }
            this.needTransition=true
            //自动滑动结束后重新赋值left;
          	this.left_val=-this.pageNum*this.screenW   
        },
        transitionend(){
        	this.needTransition=false
        },

        footer_touch(num){         
           this.pageNum=num                            
           this.left_val=-this.pageNum*this.screenW

        },
        totalcount(val){
        	this.total+=val
        }
	},//methods
	directives:{
		footiconchange(el,binding){
				if (binding.value.pageNum==binding.value.pagenum){
					el.classList.add("actived")
				}
				else {

					el.classList.remove("actived")
				}

		},
		countHeight(el,binding){
			el.style.top=binding.value.screenH*0.92+"px";
			el.style.height=binding.value.screenH*0.08+"px"
		}
	}//direvtives
}
</script>
<style>

ul{list-style: none;margin:0;padding:0;}

@font-face{
    font-family: shaonv;
    src:url("./ttf/shaonv.ttf");
}
html{font-size:10px;}
.a{font-family:Microsoft YaHei;}
.content{width:400%;height:900px;position:relative;display:flex; }
.page{width:100%;height:900px;}

.page1 {background: rgba(135,206,235,0.8)}
.page1 .header {display: flex;justify-content: space-between;}
.page1 .header h1{font-family: shaonv;text-shadow: 5px 5px 2px #888;}
.page1 .header h3{margin-top: 10px;}
.carousel-item img{width:100%;height:auto;}
.page1  .nav-bar{background-image: url("/src/pic/bg.jpg");background-repeat:no-repeat; background-size:100% 100%;}
.page1  .nav li{display:flex;flex-direction:column;align-items:center;margin-left:10px;}
.page1  .nav li i {font-size:6.4rem;color:#000;}
.page1  .carousel-indicators li{background: #000;}
.page1 .carousel-indicators li.active{background:#fff }
.page1 .ad img{width:100%;}
.page4{background: rgba(0,50,100,0.5)}
.footer{width:100%;background:rgba(255,255,255,0.8);position:fixed;z-index:10;font-size:2rem;display:flex;justify-content: space-between;padding:0 20px;align-items: center;}
.footer i{font-size: 3rem;}
.footer i.actived{color:#ff7e00;}
.page2{background: rgba(100,0,0,0.5)}
.page2 .search input {line-height: 3rem;width:90%;padding-left:1rem;margin:0 auto;display:block;border-radius: 2rem;outline:none;}
.page2 .body {display: flex}
.page2  ul#collapse-p{margin:0;padding:0;}
.page2  ul#collapse-p li{height:auto;line-height:3rem;width:auto;border-top:1px solid #FFC125;background: #fff;}
.page2  .item {display: flex;flex-wrap: wrap;justify-content:flex-start;flex-direction:column;flex-grow:1;}
</style>