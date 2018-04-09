import lottery from './lottery.vue'

export default{
    install: function(Vue){
        Vue.mixin({
            components:{
                lottery
            }
        })
    }
}