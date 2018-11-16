<template>
	<div>
		<div class="itemVue">
			<div class="selectRadio">
				<span class="iconfont" :class="[isSelected?'icon-radio1':'icon-radio']"></span>
			</div> 
			<div class="col-4">
				<img :src="itemSrc" class="img-fluid thumbnail"/>								
		</div>
		<div class="introduce">
			<span class="text-right">{{introduce}}</span>
			<div class="introduce-bottom">
				<span class="price">{{price}}</span>
				<div class="count">
					<transition name="showhide">
						<div id="showhide">
							<span class="iconfont icon-jian1 btn btn-light" @touchstart="reduce"></span>
							<span class="num">{{car[itemId]?car[itemId][0][3]:0}}</span>
						</div>
					</transition>
					<span class="iconfont icon-jia1 btn btn-light" @touchstart="add"></span>
				</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	components:{"hh":()=>import("./hh.vue")},
		props:["introduce","price","itemSrc","car","itemId"],
		
	data(){
		return {
			isSelected:false,
			itemData:[]
		}
	},
	methods:{
        add(){
        	 	this.$emit("reportData1",this.itemId)
        },
        reduce(){     	
          this.$emit("reportData1",this.itemId,"reduce") 
	        	        
        }
	}
}
</script>
<style>
.icon-radio1,.icon-radio{color:#FFA500;font-size: 2rem;}
.page3 .itemVue {display: flex;margin-left: 1rem;}
.page3 .selectRadio{display: flex;align-items: center;}
.page3 .text-right{font-size:1.5rem;}
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