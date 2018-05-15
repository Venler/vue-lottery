<template>
	<div>
		<lottery
			@lotteryDone = "lotteryDone"
			:lottery-angle = "0"
			:lottery-flag = "true"
			:lottery-prizenum = "prizeNum"
			:lottery-prizeno = "prizeNo"
			:lottery-bg = "lotterybg"
			:content-bg = "contentbg"
			:pointer-bg = "pointerbg"
			:lottery-width = "lotteryWidth"
            @lotteryDisable = "lotteryDisable"
            :lottery-scale = "prizeListScale"
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
			lotteryWidth: ["85%","35%"],
			lotterybg: require("./images/turnplate-bg.png"),
			contentbg: require("./images/turntable.png"),
			pointerbg: require("./images/pointer.png"),
			prizeList: [
				"200万里通积分",
				"288元万里通积分红包",
				"50万里通积分",
				"10万里通积分",
				"感谢参与",
				"88元万里通积分红包",
				"100万里通积分",
				"888元万里通积分红包"
			],
			prizeListScale: [
				1,
				1,
				1,
				1,
				1,
				1,
				1,
				1
			]
    	}
  	},
	methods: {
		lotteryDone(res){
			let rodom = 1+ parseInt(Math.random()*this.prizeNum);
			this.prizeNo = rodom;
			console.log(res);
		},
        lotteryDisable() {
              console.log("lottert-flag为false时点击回调");
        },
	}
}
</script>

<style lang="scss">

</style>
