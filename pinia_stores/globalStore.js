export const useGlobalStore = defineStore('pinia_global', {
  state: () => ({ count: 3, name: 'Eduardo' }),
  getters: {
    doubleCount: (state) => state.count * 2,
  },
  actions: {
    increment() {
      this.count++
    },
  },
})