<template>
	<div class="wraper">
		<div class="lotterybg">
			<img :src="lotterybg">
		</div>
		<div class="lotteryContent" :style="{width:lotterywidth[0]}">
			<img v-bind:style="{ transform: 'rotate3d(0,0,1,'+angle+'deg)'}" id="turntable" :src="contentBg">
		</div>
		<div class="pointer" :style="{width:lotterywidth[1]}" @click="clickLottery">
			<img :src="pointerbg">
		</div>
	</div>
</template>

<script>
export default {
	data(){
		return {
			angle: this.lotteryAngle,//初始度数
			flag: this.lotteryFlag,//转盘开关
			acceleration: 0.5,//加速的加速度0.5
			r_acceleration: 0.1,//减速的加速度0.1
			firstTimes: 48,//48次
			prizeNum: this.lotteryPrizenum,
			lotterybg: this.lotteryBg,//外圈背景
			contentbg: this.contentBg,//内容背景
			pointerbg: this.pointerBg,//指针背景
			lotterywidth: this.lotteryWidth,
            lotteryScaleCenter: []//各奖品转盘中心点位置计算
		}
	},
	props: {
		lotteryAngle: {
			type: Number,
			default: 0
		},
		lotteryFlag: {
			type: Boolean,
			default: true
		},
		lotteryPrizenum: {
			type: Number,
			required: true
		},
		lotteryPrizeno: {
			type: Number,
			required: true
		},
		lotteryBg: {
			type: String
		},
		contentBg: {
			type: String,
			required: true
		},
		pointerBg: {
			type: String,
			required: true
		},
		lotteryWidth: {
			type: Array,
			default: function(){
				return ["85%","35%"];
			}
		},
        lotteryScale: {
            type: Array,
            default: function(){
                return [];
            }
		}
	},
	computed:{
		difference(){
      /**
       * 计算中奖中间值
       */
			return this.lotteryScaleCenter[this.prizeNo - 1];
		},
		prizeNo(){
			return this.lotteryPrizeno
		}
	},
	mounted(){
      /**
       * 根据几率计算所有中奖项目的中间值
       */
      debugger
      if (this.lotteryScale.length === 0) {
        //没传概率，平均分
        for(let i = 1; i <= this.prizeNum; i++) {
          this.lotteryScaleCenter.push((i / this.prizeNum) * 360 - 360 / this.prizeNum / 2);
        }
      } else if (this.lotteryScale.length !== this.prizeNum) {
        //传入概率与奖品个数不符合
        throw "传入概率与奖品个数不符合,请检查!"
      } else {
        //算出总概率
        const globalScale = eval(this.lotteryScale.join("+"));

        this.lotteryScale.forEach((gift, index) => {

          // 計算角度(全部資料機率 / 單片機率 * 360)
          const deg = (gift / globalScale) * 360;

          const from= index === 0 ? 0 : this.lotteryScaleCenter[index - 1] + ((this.lotteryScale[index - 1] / globalScale) * 360  / 2);
          const to= index === 0 ? deg : this.lotteryScaleCenter[index - 1] + deg + ((this.lotteryScale[index - 1] / globalScale) * 360  / 2);

          this.lotteryScaleCenter.push((from+to)/2);

        });

      }
	},
	methods:{
		clickLottery(){
			if(!this.flag){
			  this.$emit("lotteryDisable");
			  return false;
			}
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
		max-width: 500px;
		position: relative;
		img{
			width: 100%;
		}
		.lotteryContent{
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%,-50%);
			-webkit-transform: translate(-50%,-50%);
		}
		.pointer{
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%,-50%);
			-webkit-transform: translate(-50%,-50%);
		}
	}
</style>


