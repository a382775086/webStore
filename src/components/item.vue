<template>
	<ul >
		<li class="itemVue">
			<div class="col-4">
				<img src="src/pic/shopping/logo.png" class="img-fluid thumbnail"/>								
			</div>
			<div class="introduce">
				<span class='text-center'>123123123</span>
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
		</li>
	</ul>

</template>
<script>
export default {
	data(){
		return {
			num:0,
			price:50,
			show:false
		}
	},
	methods:{
        add(){
        	 if(this.num==0){
        	 	this.show=true}
        	this.num++
        	this.$emit("totalcount",this.price)

        },
        reduce(){
        	if(this.num){
             this.num--
	         this.$emit("totalcount",-this.price);
	         if(this.num==0){
             this.show=false
	         }

        	}
	        
        }
	}
}
</script>
<style>
.itemVue{display:flex;justify-content: space-between;}
 .introduce {height:auto;flex-grow: 1;display: flex;justify-content: space-between;flex-direction: column;}
 .introduce-bottom {display: flex;justify-content: space-between;align-items: flex-end
 }
  .introduce-bottom .count {display: flex;justify-content: space-between;position: relative;}
    .introduce-bottom .price {font-size:2rem;font-family: shaonv}
 .introduce-bottom .num{margin:0 1rem;}
#showhide {position: relative;z-index:1;}
 .showhide-enter-active,.showhide-leave-active{transition:all .5s;}
 .showhide-enter{left:2rem;}
 .showhide-enter-to{left:0;}
 .showhide-leave-to{opacity:0;}
</style>