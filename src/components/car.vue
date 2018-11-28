<template>
	<div>
		<div class="itemVue">
			<div class="selectRadio">
				<span @click.stop="itemSelect" class="iconfont" :class="[isSelected?'icon-radio1':'icon-radio']"></span>
			</div> 
			<div class="col-4">
				<img :src="itemSrc" class="img-fluid thumbnail"/>								
		</div>
		<div class="introduce">
			<span class="text-right">{{introduce}}</span>
			<div class="introduce-bottom">
				<span class="price">{{price}}</span>
				<div class="count">
						<div id="showhide">
							<span class="iconfont icon-jian1 btn btn-light" @click="reduce"></span>
							<span class="num">{{car[itemId]?car[itemId][4]:0}}</span>
						</div>
					<span class="iconfont icon-jia1 btn btn-light" @click="add"></span>
					<span class="iconfont icon-shanchu btn btn-light" @click.stop="deleteItem"></span>
				</div>
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
			isSelected:false,
			itemData:[]
		}
	},
	updated(){
		if (this.car[this.itemId]){
			this.isSelected=this.car[this.itemId][5]
		}
	},
	methods:{
        add(){
        	 	this.$emit("reportData1",this.itemId)
        },
        reduce(){     	
          this.$emit("reportData1",this.itemId,"reduce")	        	        
        },
        deleteItem(){
        	this.$emit("deleteItem",this.itemId);
        },
        itemSelect(){
        	this.isSelected=!this.isSelected;
        	this.$emit("itemSelect",this.itemId,this.isSelected)
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
.page3 .modal-content{margin-top:10rem;border-radius: 5%;border:2px solid #FFC125;}
.page3 .modal-content .modal-header span{font-size:2rem;display: block;margin:0 auto;}
.page3 .modal-content .modal-header .close span{font-size: 2rem}
.page3 .modal-content .modal-body .btn {width:40%;}
.page3 .modal-content .modal-body  span{display: inline-block;font-size:2rem;}
.page .icon-shanchu {margin-left:1rem;color:#fff;background: #f00}
</style>