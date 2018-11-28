<template>
	<div class="login">
		<div class="message d-flex">
			<div class="col-5">
				<img src="src/pic/login.jpg" class="img-fluid rounded">
			</div>
			<div class="rInfo col-7 d-flex justify-content-around">
				<div class="d-flex flex-column justify-content-center align-items-center"><span class="iconfont icon-jifen1"></span><span class="name1">积分</span></div>
				<div class="d-flex flex-column justify-content-center align-items-center"><span class="iconfont icon-qianbao"></span><span class="name1">钱包</span></div>
				<div class="d-flex flex-column justify-content-center align-items-center"><span class="iconfont icon-huiyuan"></span><span class="name1">会员</span></div>
			</div>
		</div>
		<div class="order">
			<header>我的订单</header>
			<div class="order1 d-flex justify-content-around col-12">
				<div class="d-flex flex-column justify-content-center align-items-center"><span class="iconfont icon-zititubiao"></span><span class="name2">待付款</span></div>
				<div class="d-flex flex-column justify-content-center align-items-center"><span class="iconfont icon-deliver_fill"></span><span class="name2">待发货</span></div>
				<div class="d-flex flex-column justify-content-center align-items-center"><span class="iconfont icon-fukuan"></span><span class="name2">待收货</span></div>
				<div class="d-flex flex-column justify-content-center align-items-center"><span class="iconfont icon-commentfill"></span><span class="name2">评价</span></div>
				<div class="d-flex flex-column justify-content-center align-items-center"><span class="iconfont icon-rechargefill"></span><span class="name2">退款/售后</span></div>
			</div>
		</div>
		<div class="others col-12">
			<header>更多工具</header>
			<div class="name4 d-flex flex-wrap">
				<div class="col-3 d-flex flex-column align-items-center">
					<span class="iconfont icon-fapiao"></span>
					<span class="name3">我的发票</span>
				</div>
				<div class="col-3 d-flex flex-column align-items-center">
					<span class="iconfont icon-zhuti"></span>
					<span class="name3">主题换肤</span>
				</div>
				<div class="col-3 d-flex flex-column align-items-center">
					<span class="iconfont icon-erweima"></span>
					<span class="name3">会员码</span>
				</div>
				<div class="col-3 d-flex flex-column align-items-center">
					<span class="iconfont icon-yuyue"></span>
					<span class="name3">预约商品</span>
				</div>
				<div class="col-3 d-flex flex-column align-items-center">
					<span class="iconfont icon-daqia"></span>
					<span class="name3">每日打卡</span>
				</div>
				<div class="col-3 d-flex flex-column align-items-center">
					<span class="iconfont icon-hongbaoqiaquan"></span>
					<span class="name3">红包卡券</span>
				</div>
				<div class="col-3 d-flex flex-column align-items-center">
					<span class="iconfont icon-paimai"></span>
					<span class="name3">拍卖</span>
				</div>
				<div class="col-3 d-flex flex-column align-items-center">
					<span class="iconfont icon-tongxin"></span>
					<span class="name3">我的通信</span>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
export default {

}
</script>
<style>
.login .message{padding-top:2rem;padding-bottom:2rem;background:linear-gradient(#FFA54F,#FF4040);}
.login .rInfo .iconfont{font-size:3rem;}
.login .rInfo .name1{font-family:SimHei;font-size:1.5rem; }
.login .order  header,.login .others header {font-size:2rem;font-weight:800;padding:1.5rem}
.login .order  .order1 div {width:20%;}
.login .order  .order1 span.iconfont{font-size:4rem;color:#FA8072}
.login .order  .order1 span.name2{font-size:1.5rem;}
.login .others{margin-top:2rem;margin-bottom:2rem;}
.login .others span.iconfont{font-size: 4rem;font-weight: 800;color:#FA8072}
</style>