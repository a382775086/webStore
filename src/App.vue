<template>
	<div class="a">
		<div class="content" @touchmove="touchmove" @touchstart="touchstart" @touchend="touchend"
		 :style="{left:left_val+'px',transition:needTransition?'left .3s':''}" @transitionend="transitionend">
			<div class="page page1" @touchmove="touchmoveVertical" @touchstart="touchstartVertical">
				<div class="header">
                    <h1 class="animated infinite rubberBand slow delay-1s">天天超市</h1>
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
							<li class="nav-item" @click.stop="routerToPage2"><i class="iconfont icon-shouji text-danger"></i>
								<span>手机数码</span></li>
							<li class="nav-item" @click.stop="routerToPage2"><i class="iconfont icon-dazhe text-danger"></i>
							<span>劲享折扣</span></li>
							<li class="nav-item" @click.stop="routerToPage2"><i class="iconfont icon-lipin text-danger"></i>
							<span>精美礼品</span></li>
							<li class="nav-item" @click.stop="routerToPage2"><i class="iconfont icon-jingpin text-danger"></i>
							<span>旗舰精品</span></li>
						</ul>
						<ul class="nav nav-justified">
							<li class="nav-item" @click.stop="routerToPage2"><i class="iconfont icon-jiaju text-danger"></i>
							<span>家具日用</span></li>
							<li class="nav-item" @click.stop="routerToPage2"><i class="iconfont icon-yifu text-danger"></i>
							<span>衣物鞋帽</span></li>
							<li class="nav-item" @click.stop="routerToPage2"><i class="iconfont icon-yundong text-danger"></i>
							<span>运动户外</span></li>
							<li class="nav-item" @click.stop="routerToPage2"><i class="iconfont icon-daohanghaiwaigou text-danger"></i>
							<span>海外直采</span></li>
						</ul>
					</div>
					<div class="ad">
						<img  v-for="n in 4" :src='("src/pic/ad"+(n-1)+".jpg")'/>
					</div>

				</div><!--body><-->
			</div>	
			<div class="page page2">
				<div class="search">
					<input placeholder="输入你想要的物品">
				</div>
				<div class="body">
					<ul id="collapse-p" class="col-3">
						<li v-for="(val,key,index) in this.res" >	
							<i class="iconfont icon-changtiao text-danger"></i><span data-toggle="collapse" :data-target="val.name">{{key}}</span>
							<ul class="collapse" :id="key" data-parent="#collapse-p" >
								<li class="text-center"  v-for="(x,y,z) in val.type" @click.stop="selectType(z,index,key)">{{y}}</li>
							</ul>
						</li>
					</ul>
					<ul class="item" style="top:0px;" @touchmove="touchmoveVertical" @touchstart="touchstartVertical" ref="nav">
						<li v-for="n in itemType">
							<keep-alive>
							<itemVue :key="n.id" :introduce="n.introduce" :price="n.price" :itemSrc="n.src" :itemId="n.id"
							:car='car' @reportData="reportData" />
						    </keep-alive>
						</li>
						<span class="maybemore">更多商品敬请等候</span>
					</ul>
				</div>
			</div><!--page2><-->
			<div class="page page3" @touchmove="touchmoveVertical" @touchstart="touchstartVertical">
		<header>
			<h2 class="text-center">购物车</h2>
			<hr/>
		</header>
		<ul class="body">
			<transition-group name="car">
			<li v-for="( n,itemId ) in car" :key="itemId">
					<car :introduce="n[1]" :price="n[2]" :itemSrc="n[3]" :itemId="itemId" :car="car" @reportData1="reportData1" @deleteItem="deleteItem" @itemSelect="itemSelect"/>
			</li> 
			</transition-group>
		</ul>
		<div class="jiesuan">
			<div id="all">
				<span @touchstart.stop="isAllSelect" class="iconfont" :class="[isAllSelected?'icon-radio1':'icon-radio']" ></span><span>全选</span>
			</div>
			<div class="cartotal col-8">
				<div class="col-7 flex-column zz">
					<span class="font-weight-bold">合计：￥{{countMoney}}</span>
					<div class="small d-flex flex-column">
						<span>总额：￥{{countMoney}}</span>
						<span>优惠：￥0.00</span>
					</div>
				</div>
				<div class="jiesuan-pay">
					<span>结算({{jiesuan}})</span>
				</div>
				</div>
			</div><!--jiesuan><-->
			</div><!--page3><-->
			<div class="page page4">
				<loginVue/>
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
//import itemVue from "./components/item.vue"
//import car from "./components/car.vue"
import item_jsonp from "./a.json"
export default {
	data(){
		return {
			screenH:"",
			screenW:"",
			clientx:"",
			clienty:"",
			//当前屏幕left的偏移值;
			left_val:0,
			//当前屏幕TOP的偏移值
			top_val:0,
			//实际滑动值
			offset_x:"",
			//当前触发事件页面；
			offset_y:"", 
			pageNum:0,
			res:"",
			//字面意思..
			needTransition:false,
			car:{},
			//当前在那一块type
			itemType:"",
		    //购物车全选
			isAllSelected:false,
			//foot栏gao度 无单位px;
			footHeight:0,
			//分类栏当前打开的index；
			itemNowClassList:""
		}
	},
	components:{"itemVue":()=>import("./components/item.vue"),"car":()=>import("./components/car.vue"),"loginVue":()=>import("./components/login.vue")},
	created(){
		this.screenH=parseInt(window.screen.availHeight);
		this.screenW=parseInt(window.screen.availWidth);
		this.res=item_jsonp;
		this.itemType=this.res.流行女装.type.裙子;
		this.footHeight=this.screenH*0.08
	},
	computed:{
		countMoney(){
			if(Object.keys(this.car)!=0){
				let num=0;
				for(var a of Object.values(this.car)){
					if(a[5]===true){
						num+=a[2]*a[4]
					}
				}
				return num;
			}
			else{return 0.00}
		},
		jiesuan(){
			if(Object.keys(this.car)!=0){
				let a=0;
				for(var n of Object.values(this.car)){
					if(n[5]==true){
						a+=1
					}
					
				} 
				return a
			}
			else return ""
		}
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
			this.offset_x=event.targetTouches[0].screenX-this.clientx;
         //取移动距离    负数=左滑    正数=右滑  
         if( Math.abs(this.offset_x) >40) {         	
          if(  (this.offset_x>=0 && this.pageNum===0 ) || (this.offset_x<=0 && this.pageNum===3) ){
          	//需要清零this.offset_x 否则会触发横向补充移动函数;
          	this.offset_x=0
          }
          else {this.left_val=-this.pageNum*this.screenW+this.offset_x;
          } 
      		}
		},
		touchstartVertical(){
		this.clienty=event.targetTouches[0].screenY;
		this.top_val=parseInt(event.currentTarget.style.top) || 0;
		},
		touchmoveVertical(){
			event.preventDefault();
			let e_height=event.currentTarget.clientHeight;
			//向上滑 负数  向下滑 正数
			this.offset_y=event.targetTouches[0].screenY-this.clienty;
			//下滑 遇阻
			if(e_height>this.screenH){
				if(this.offset_y>0 && this.offset_y>-this.top_val){
				this.offset_y=-this.top_val;	      
				}
				//上滑 遇阻
				else if (this.offset_y<0 && -this.offset_y>(e_height-this.screenH+this.top_val+this.footHeight)){
					this.offset_y=-(e_height-this.screenH+this.top_val+this.footHeight)			
				}
				event.currentTarget.style.top=this.top_val+this.offset_y+"px";
				//阻止水平滑动;     		        
		        this.offset_y=0;		
			}
		},
		touchend(){      
         
         if (this.offset_x)
         {
         	this.horizontalMove()

          //清除当前偏移量
         this.offset_x="";


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
        selectType(index,navIndex,typeKey){
        	let name=event.target.innerText
        	this.itemType=this.res[typeKey].type[name];
        	if(this.itemNowClassList){
        		this.itemNowClassList.remove("item-navSelecte")
        	}
        	event.target.classList.add("item-navSelecte")
        	this.itemNowClassList=event.target.classList
        	this.$refs.nav.style.top="0px"
        	
        },
        //分类栏新增物品数量
        reportData(arr,reduce){ 
             let num=arr[4];           
        	if(reduce){
        		num--
         	this.$set(this.car,arr[0],arr);
         	this.car[arr[0]].splice(4,1,num)       		
        		if(arr[4]==0){
        			this.$delete(this.car,arr[0])
        		}
        	}
        	else{num++
        	this.$set(this.car,arr[0],arr);
        	this.car[arr[0]].splice(4,1,num)
        	//在全选后如果新增新的物品;
        	if(this.isAllSelected===true){
        		this.isAllSelected=false
        	}
        	}
        },
        reportData1(itemId,reduce){
        	let num=this.car[itemId][4]

        	if (reduce){
        		num--
        	}
        	else {
        		num++
        	}
        	this.car[itemId].splice(4,1,num)
        	//只是为了让这个最后执行 懒;
        	setTimeout(()=>{if(num===0){
        		this.$delete(this.car,itemId)

        	}},0)
        },
        deleteItem(itemId){
        	//先将数量变成0 让第二页的数量按钮Hidden
        	this.car[itemId].splice(4,1,0)
        	setTimeout(()=>{
        		this.$delete(this.car,itemId)},0)
        },
        itemSelect(itemId,isSelected){
        	this.car[itemId].splice(5,1,isSelected)
        	if (isSelected===false && this.isAllSelected===true){
        		this.isAllSelected=false;
        	}
        },
        isAllSelect(){
        	if(Object.keys(this.car)!=0){
        		this.isAllSelected=!this.isAllSelected;
        		Object.values(this.car).forEach((val)=>{
        			val.splice(5,1,this.isAllSelected)})
        	}
        	else{
        		alert("购物车空空如也")
        	}
        },
        routerToPage2(){
        	this.left_val=-this.screenW;
        	this.pageNum=1
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
.content{width:400%;height:auto;position:relative;display:flex; }
.page{width:100%;position:relative;height:100%;}

.page1 {background:#FFC125;height:100%;}
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
.footer{width:100%;background:rgba(250,240,230,0.8);position:fixed;z-index:10;font-size:2rem;display:flex;justify-content: space-between;padding:0 20px;align-items: center;}
.footer i{font-size: 3rem;}
.footer i.actived{color:#ff7e00;}
.page2 .search {position:relative;z-index:1;background: #fff;}
.page2 .search input {line-height: 3rem;width:90%;padding-left:1rem;margin:0 auto;display:block;border-radius: 2rem;outline:none;border:2px solid #FFC125;padding-top:.5rem;}
.page2 .body {display: flex}
.page2  ul#collapse-p{margin:0;padding:0;}
.page2  ul#collapse-p li{height:auto;line-height:3rem;width:auto;border-top:1px solid #fff;background:#FFC125;color:#fff;}
.page2  ul#collapse-p span {display: inline-block;width:80%;font-size:1.5rem;}
.page2  .item {display: flex;flex-wrap: wrap;justify-content:flex-start;flex-direction:column;flex-grow:1;padding-bottom:5rem;position:relative;}
.page2 .item span.maybemore {font-size:2rem;font-family: shaonv simHei;padding-top:1rem;}

/* page3 style*/
.jiesuan {background:#FA8072;display: flex;justify-content: space-between;margin-top:0.5rem}
.jiesuan #all {display: flex;align-items: center;margin:0 1rem;font-size:2rem;}
.jiesuan #all span {margin:0 0.5rem;font-family: simHei;font-weight:500;}
.zz{justify-content:space-around;height:100%;font-size:1.8rem;padding:0!important;}
.cartotal{display: flex;padding:0!important;}
.jiesuan-pay{font-size: 2rem;font-weight: 600;background: yellow;display:flex;align-items: center;width:100%;justify-content: center;}
.icon-radio1,.icon-radio{color:#FFA500;font-size: 2rem;}
.car-leave-active{animation:bounceOutRight 0.8s;}
.item-navSelecte{animation:asd 2s both;}
@keyframes asd {form{background: #FFC125} to{background: #FF6347}}
</style>