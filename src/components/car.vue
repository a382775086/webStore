<template>
	<div class="page3">
		<header>
			<h2 class="text-center">购物车</h2>
			<hr/>
		</header>
		<ul class="body">
			<li>
				<div class="itemVue">
					<span class="iconfont" :class="[isSelected?'icon-radio1':'icon-radio']"></span> 
					<div class="col-4">
						<img src="src/pic/shopping/logo.png" class="img-fluid thumbnail"/>								
					</div>
					<div class="introduce">
						<span class="text-right">123123123</span>
						<div class="introduce-bottom">
							<span class="price">{{price}}</span>
							<div class="count">
								<transition name="showhide">
									<div v-show="show" id="showhide">
										<span class="iconfont icon-jian1 btn btn-light" @touchend.stop="reduce"></span>
										<span class="num">{{num}}</span>
									</div>
								</transition>
								<span class="iconfont icon-jia1 btn btn-light" @touchend.stop="add"></span>
							</div>
							</div>
						</div>
				</div>
		   </li> 
		</ul>
		<div class="jiesuan">
			<div id="all">
				<span class="iconfont icon-radio1"></span><span>全选</span>
			</div>
			<div class="cartotal col-8">
				<div class="col-7 flex-column zz">
					<span class="font-weight-bold">合计：￥</span>
					<div class="small">
						<span>总额：</span>
						<span>优惠：</span>
					</div>
				</div>
				<div class="jiesuan-pay">
					<span>结算()</span>
				</div>
				</div>
			</div>

		</div>

	</div>
</template>
<script>
export default {
	data(){
		return {
			num:0,
			price:50,
			show:false,
			isSelected:false
		}
	},
	methods:{
        add(){
        	 if(this.num==0){
        	 	this.show=true}
        	this.num++
        },
        reduce(){
        	if(this.num){
             this.num--
	         if(this.num==0){
             this.show=false
	         }

        	}
	        
        }
	}
}
</script>
<style>
.icon-radio1,.icon-radio{color:#FFA500;font-size: 2rem;}
.page3 .itemVue {display: flex;align-items: center;margin-left: 1rem;}
.page3{background: #E0EEEE}
.page3 header{padding:0.5rem 0;}
.page3 .itemVue{border-bottom: 2px dashed #FF8C69  }
.jiesuan {background:#FA8072;display: flex;justify-content: space-between;margin-top:0.5rem}
.jiesuan #all {display: flex;align-items: center;margin:0 1rem;font-size:2rem;}
.jiesuan #all span {margin:0 0.5rem;font-family: simHei;font-weight:500;}
.zz{justify-content:space-around;height:100%;font-size:1.8rem;padding:0!important;}
.cartotal{display: flex;padding:0!important;}
.jiesuan-pay{font-size: 2rem;font-weight: 600;background: yellow;display:flex;align-items: center;width:100%;justify-content: center;}
</style>