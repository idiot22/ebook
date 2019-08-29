const book = {
    state: {
      test: 10
    },
    mutations: {
      'SET_TEST': (state, newval) => {
        state.test = newval
      }
    },
    actions: {
      setTest: ({ commit, state }, newval) => {
        return commit('SET_TEST', newval)
      }
    }
  }
  export default book;