<template>
	<div class="a">
		<div class="content" @touchmove="touchmove" @touchstart="touchstart" @touchend="touchend">
			<div class="page page1">
				<div class="header">
                    <h1 >天天超市</h1>
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
			</div>
			<div class="page page3">
			</div>
			<div class="page page4">
			</div>					
	</div><!--a><-->
	<div class="footer" >
		<i class="iconfont icon-zhuye actived" @touchstart="footer_touch" data-value="1"></i>
		<i class="iconfont icon-fenlei" @touchstart="footer_touch"></i>
		<i class="iconfont icon-gouwuche" @touchstart="footer_touch"></i>
		<i class="iconfont icon-xiazai" @touchstart="footer_touch"></i> 
	</div><!--footer><-->
</div>
</template>
<script>
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
			pageNum:0

		}
	},
	created(){
		this.screenH=parseInt(window.screen.availHeight);
		this.screenW=parseInt(window.screen.availWidth);

	},
	mounted(){
         
              this.countHeight()
	},
	computed:{
		
		
	},
	methods:{

		aa(){
           axios.get("src/a.json").then(function(res){
           	console.log(res);
           })
		},

		touchstart(){
			   //获取点X坐标；
               this.clientx=event.targetTouches[0].screenX;

               this.left_val=parseInt($(".content").css("left"));
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
        //每次移动后需要重新跟新left_val；
          this.left_val=parseInt($(".content").css("left"));
        //判断是否自动前进or后退
         this.horizontalMove()

         //清除当前偏移量
         this.offset_x="";
        console.log(this.pageNum)
		},

		horizontalSlide(){
			//设置边线不可动；
			// fuck 这一行死了我多少脑细胞
          if(  (this.offset_x>0 && this.left_val==0 ) || (this.offset_x<0 && this.left_val==-this.screenW*3) ){
          	//需要清零this.offset_x 否则会触发横向补充移动函数;
          	this.offset_x=0
          }
          else{ $(".content").css("left",this.left_val+this.offset_x+"px")  }  

		},

        //.content横向补充移动函数；
        horizontalMove(){
         //滑动结束时判断在当前页+1;




         //通过this.offset_x 正负判断前进还是后退；
         
         //左滑; 
         if(this.offset_x<0){         	
           if(this.offset_x<-this.screenW/4){
           	//滑倒下一页
          	 $(".content").stop().animate({left:-this.screenW*(this.pageNum+1)+"px"},100);
          	 this.pageNum+=1;

          	 //footer图标改变；
          	 $(".footer .iconfont").removeClass("actived").eq(this.pageNum).addClass("actived")
          }
          else{
          	//回到当前页面；
          	$(".content").stop().animate({left:-this.screenW*this.pageNum+"px"},100)
          }

         }
         //右滑 同理；
         else if(this.offset_x>0)
         {
         	if(this.offset_x>this.screenW/4){
         		 $(".content").stop().animate({left:-this.screenW*(this.pageNum-1)+"px"},100)
         		 this.pageNum-=1
         		 //footer图标改变；
          	 $(".footer .iconfont").removeClass("actived").eq(this.pageNum).addClass("actived")
         	}
         	else{
         		 $(".content").stop().animate({left:-this.screenW*this.pageNum+"px"},100)
         	}
         }
        },
        footer_touch(e){
           console.log(e.target.getAttribute("data-value"))
        },
		//计算底部栏top距离and height
		countHeight(){
         
         $(".footer").css({top:this.screenH*0.92+"px",height:this.screenH*0.08+"px"});

		}
	}
}
</script>
<style>


@font-face{
    font-family: shaonv;
    src:url("./ttf/shaonv.ttf");
}
html{font-size:10px;}
.a{font-family:Microsoft YaHei;}
.content{width:400%;height:900px;position:relative;display:flex;}
.page{width:100%;height:900px;}

.page1 {background: rgba(135,206,235,0.8)}
.page1 .header {display: flex;justify-content: space-between;}
.page1 .header h1{font-family: shaonv;}
.page1 .header h3{margin-top: 10px;}
.carousel-item img{width:100%;height:auto;}
.page1 .body .nav-bar{background-image: url("/src/pic/bg.jpg");background-repeat:no-repeat; background-size:100% 100%;}
.page1 .body .nav li{display:flex;flex-direction:column;align-items:center;margin-left:10px;}
.page1 .body .nav li i {font-size:6.4rem;color:#000;}
.page1 .body .carousel-indicators li{background: #000;}
.page1 .body .carousel-indicators li.active{background:#fff }
.page1 .body .ad img{width:100%;}
.page2{background: rgba(100,0,0,0.5)}
.page3{background: rgba(200,150,0,0.5)}
.page4{background: rgba(0,50,100,0.5)}
.footer{width:100%;background:rgba(255,255,255,0.8);position:fixed;z-index:10;font-size:2rem;display:flex;justify-content: space-between;padding:0 20px;align-items: center;}
.footer i{font-size: 3rem;}
.footer i.actived{color:#ff7e00;}
</style>