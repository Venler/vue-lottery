<template>
	<div class="wraper">
		<div class="lotterybg">
			<img src="./images/turnplate-bg.png">
		</div>
		<div class="lotteryContent">
			<img v-bind:style="{ transform: 'rotate3d(0,0,1,'+angle+'deg)'}" id="turntable" src="./images/turntable.png">
		</div>
		<div class="pointer" @click="clickLottery">
			<img src="./images/pointer.png">
		</div>
	</div>
</template>

<script>
export default {
	data(){
		return {
			angle: this.lotteryAngle,//初始度数
			flag: this.lotteryFlag,//转盘开关
			acceleration: this.lotteryAcceleration,//加速的加速度0.5
			r_acceleration: this.lotteryRacceleration,//减速的加速度0.1
			firstTimes: this.lotteryFirsttimes,//48次
			prizeNum: this.lotteryPrizenum,
		}
	},
	props: ['lotteryAngle',
			'lotteryFlag',
			'lotteryAcceleration',
			'lotteryRacceleration',
			'lotteryFirsttimes',
			'lotteryPrizenum',
			'lotteryPrizeno'
		],
	computed:{
		difference(){
			return (this.prizeNo / this.prizeNum) * 360 - 360 / this.prizeNum / 2;
		},
		prizeNo(){
			return this.lotteryPrizeno
		}
	},
	mounted(){
		
	},
	methods:{
		clickLottery(){
			if(!this.flag){ return false; };
			this.flag = false;
			this.startRotate();
		},
		startRotate(){
			var self = this;
			var difference = this.difference;
			var speed = 0,
				acceleration = self.acceleration,//加速的加速度
				r_acceleration = self.r_acceleration,//减速的加速度
				firstTimes = self.firstTimes,//执行48次 加速到highSpeed
				highSpeed = firstTimes * acceleration,//最高速度
				oneAngel = self.angle + firstTimes * (firstTimes - 1) / 2*acceleration + highSpeed,//第一阶段的旋转度数
				secondTimes = 10,//速度为highSpeed 继续执行10次
				twoAngel = oneAngel + secondTimes * firstTimes * acceleration,//第二阶段的旋转度数
				three = highSpeed / r_acceleration,//执行three次 速度从highSpeed减速到0
				add = 360 - (twoAngel + three*(three - 1) / 2 * r_acceleration) % 360 + difference,//使最后刚好转到起点位置
				twoAngelEnd = twoAngel + add,//第三阶段开始
				threeAngel = twoAngelEnd + three * (three - 1) / 2 * r_acceleration;//最后的旋转度数
			function cicle(){
				if(self.angle < oneAngel) {
					speed += acceleration;
					self.angle += speed;
				}
				else if(self.angle >= oneAngel && self.angle < twoAngel){
					self.angle += speed;
				}
				else if(self.angle.toFixed(2) == twoAngel.toFixed(2)){
					self.angle += add; 
				}
				else if(self.angle > twoAngel && self.angle <= threeAngel){
					speed -= r_acceleration;
					if(speed <=0){
						speed = 0;
						self.angle = threeAngel%360;
						self.flag = true;
						self.$emit("lotteryDone",{
							prizeNo: self.prizeNo,
							prizeNum: self.prizeNum
						})
						return false;
					}
					self.angle += speed;
				}
				requestAnimationFrame(cicle);
			}
			cicle();
		}
	}
}
</script>

<style lang="scss" scoped>
	.wraper{
		width: 300px;
		position: relative;
		img{
			width: 100%;
		}
		.lotteryContent{
			width: 85%;
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%,-50%);
			-webkit-transform: translate(-50%,-50%);
		}
		.pointer{
			width: 35%;
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%,-50%);
			-webkit-transform: translate(-50%,-50%);
		}
	}
</style>


