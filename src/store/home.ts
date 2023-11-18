import { defineStore } from 'pinia'
// useMain  可以是 useUser、useCart 之类的名字 
// defineStore('main',{..}) 在devtools 就使用 main 这个名
export const useMain = defineStore('main', {
    // 相当于data
    state: () => {
        return {
          // 所有这些属性都将自动推断其类型,如果推断失败可以试下 as xxx
          counter: 0,
        }
    },
    // 相当于计算属性
    getters: {
        doubleCount: (state) => {
            return state.counter * 2
        },
    }
})