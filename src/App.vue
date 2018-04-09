<template>
	<div>
		<lottery 
			@lotteryDone = "lotteryDone"
			:lottery-angle = "0"
			:lottery-flag = "true"
			:lottery-acceleration = "0.5"
			:lottery-racceleration = "0.1"
			:lottery-firsttimes = "48"
			:lottery-prizenum = "prizeNum"
			:lottery-prizeno = "prizeNo"
		>
		</lottery>
	</div>
</template>

<script>
export default {
	name: 'app',
	data () {
		return {
			prizeNo: 1,
			prizeNum: 8,
			prizeList: [
				"200万里通积分",
				"288元万里通积分红包",
				"50万里通积分",
				"10万里通积分",
				"感谢参与",
				"88元万里通积分红包",
				"100万里通积分",
				"888元万里通积分红包"
			]
    	}
  	},
	methods: {
		lotteryDone(res){
			let rodom = 1+ parseInt(Math.random()*this.prizeNum);
			this.prizeNo = rodom;
			console.log(this.prizeList[res.prizeNo-1]);
		}
	}
}
</script>

<style lang="scss">

</style>
