# vue-lottery

在线演示地址: [https://venler.github.io/demo/vue-lottery/index.html](https://venler.github.io/demo/vue-lottery/index.html)

## How To Use

> ES6

```js
npm install vue-lottery --save
```

```
import lottery from "vue-lottery"
Vue.use("lottery")
```

## 调用示例

```
<lottery 
    @lotteryDone = "lotteryDone"
    :lottery-flag = "true"
    :lottery-prizenum = "8"
    :lottery-prizeno = "1"
    :lottery-bg = "https://venler.github.io/demo/vue-lottery/dist/turnplate-bg.png"
    :content-bg = "https://venler.github.io/demo/vue-lottery/dist/turntable.png"
    :pointer-bg = "https://venler.github.io/demo/vue-lottery/dist/pointer.png"
    :lottery-width = "[85%,35%]"
    @lotteryDisable = "lotteryDisable"
>
</lottery>
```

### props说明

| 参数名 | 参数类型 | 解释 | 是否必传 |
| :--- | :--- | :--- | :--- |
| lottery-prizenum | Number | 奖品总数量 | 是 |
| lottery-prizeno | Number | 从起点开始逆时针算，中奖的是第几个 | 是 |
| lottery-bg | String | 背景图 | 否 |
| content-bg | String | 内容区域背景图 | 是 |
| pointer-bg | String | 指针背景图 | 是 |
| lottery-flag | Boolean | 禁止点击 | 否 |
| lotteryDone | Function | 旋转完成后的回调函数 | 否 |
| lotteryDisable | Function | 禁用状态时点击后的回调函数 | 否 |



