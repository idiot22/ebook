const bookStore = {
  state: {
    hotOffsetY: 0
  },
  mutations: {
    SET_HOTOFFSETY(state, val) {
      state.hotOffsetY = val
    }
  }
}
export default bookStore
