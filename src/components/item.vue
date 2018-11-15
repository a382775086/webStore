<template>
	<div class="itemVue">

			<div class="item-right col-5">
				<img :src="itemSrc" class="img-fluid thumbnail"/>								
			</div>
			<div class="introduce">
				<span class='text-center'>{{introduce}}</span>
				<div class="introduce-bottom">
					<span class="price">{{price}}</span>
					<div class="count">
						<transition name="showhide">
							<div v-show="show" id="showhide">
								<span class="iconfont icon-jian1 btn btn-warning" @touchend.stop="reduce"></span>
								<span class="num">{{car[itemId]?car[itemId][0][3]:0}}</span>
							</div>
						</transition>
						<span class="iconfont icon-jia1 btn btn-warning" @touchend.stop="add"></span>
					</div>
					</div>
			</div>
	</div>

</template>
<script>
export default {
	props:["introduce","price","itemSrc","car","itemId"],

	data(){
		return {
			show:false,
			itemData:[]
		}
	},
	methods:{
        add(){
        	 if(!this.car[this.itemId]){
        	 this.itemData.push(this.introduce,this.price,this.itemSrc,0)
        	 	this.show=true
        	 }
        	 	this.$emit("reportData",this.itemData)

        },
        reduce(){
               this.$emit("reportData",this.itemData,"reduce") 
	        if (this.car[this.itemId][0][3]==0){
	        	this.show=false
	        };

        }
	}
}
</script>
<style>
.itemVue{display:flex;justify-content: space-between;margin:1.5rem auto;}
 .introduce {height:auto;flex-grow: 1;display: flex;justify-content: space-between;flex-direction: column;}
 .introduce-bottom {display: flex;justify-content: space-between;align-items: flex-end
 }
  .introduce-bottom .count {display: flex;justify-content: space-between;position: relative;}
    .introduce-bottom .price {font-size:2rem;font-family: shaonv}
 .introduce-bottom .num{margin:0 1rem;line-height: 2rem;font-size:1.7rem;}
#showhide {position: relative;z-index:1;display: flex;}
 .showhide-enter-active,.showhide-leave-active{transition:all .5s;}
 .showhide-enter{left:2rem;}
 .showhide-enter-to{left:0;}
 .showhide-leave-to{opacity:0;}
 .item-right{padding:0!important;}
</style>