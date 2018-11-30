<template>
    <div class="wraper">
        <lottery
            @lotteryClick="lotteryClick"
            @lotteryDone="lotteryDone"
            :lottery-start="lotteryStart"
            :lottery-prizenum="prizeNum"
            :lottery-prizeno="prizeNo"
            lottery-bg="./static/turnplate-bg.png"
            content-bg="./static/turntable.png"
            pointer-bg="./static/pointer.png"
            :lottery-width="['85%','35%']"
        />
    </div>
</template>

<script>
export default {
    name: 'Index',
    data () {
        return {
            lotteryStart: 0,
            prizeNo: 1,
            prizeNum: 8,
            prizeList: ['200万里通积分', '288元万里通积分红包', '50万里通积分', '10万里通积分', '感谢参与', '88元万里通积分红包', '100万里通积分', '888元万里通积分红包']
        }
    },
    methods: {
        lotteryClick () {
            this.lotteryStart = 1
            let randomNum = 1 + parseInt(Math.random() * this.prizeNum)
            this.prizeNo = randomNum
        },
        lotteryDone (res) {
            this.lotteryStart = 0
            let index = res.prizeNo - 1
            console.log(this.prizeList[index])
        }
    }
}

</script>

<style scoped>
.wraper{
    width: 80%;
    margin: 0 auto;
}
</style>
