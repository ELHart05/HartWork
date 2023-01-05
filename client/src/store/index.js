import { createStore } from 'vuex'

export default createStore({
  state: {
    totalWorkouts: [],
    userToken: null,
    userEmail: '',
    loading: true,
    error: null
  },
  getters: {
  },
  mutations: {
    setTotalWorkouts(state, payload){
      state.totalWorkouts = payload;
    },
    newWorkout(state, payload){
      state.totalWorkouts.unshift(payload);
    },
    setLoading(state, payload){
      state.loading = payload;
    },
    setUserToken(state, payload) {
      state.userToken = payload;
    },
    setUserEmail(state, payload) {
      state.userEmail = payload;
    },
    setError(state, payload) {
      state.error = payload;
    }
  },
  actions: {
  },
  modules: {
  }
})
