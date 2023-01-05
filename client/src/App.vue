<template>
  <Loading v-if="loading" />
  <router-view v-else />
</template>

<script>
  import Loading from './components/Loading.vue'
  import axios from 'axios'
  import {
    mapState
  } from 'vuex';
  export default {
    components: {
      Loading
    },
    data() {
      return {
        user: localStorage.getItem('user')
      }
    },
    async mounted() {
        if (this.user) {
          this.$store.commit('setUserToken', JSON.parse(this.user).token);
          this.$store.commit('setUserEmail', JSON.parse(this.user).email);
          const res = await axios.get('http://localhost:3000/api/workouts/', {
            headers: {
              'Authorization': `Bearer ${this.userToken}`
            }
          });
          this.$store.commit('setTotalWorkouts', res.data);
        }
        this.$store.commit('setLoading', false);
    },
    watch: {
      async userToken() {
        if (this.userToken) {
          const res = await axios.get('http://localhost:3000/api/workouts/', {
            headers: {
              'Authorization': `Bearer ${this.userToken}`
            }
          });
          this.$store.commit('setTotalWorkouts', res.data);
        }
        this.$store.commit('setLoading', false);
      }
    },
    computed: {
      ...mapState(['loading', 'userToken'])
    },
  }
</script>

<style>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    min-height: 100vh;
    font-family: tahoma;
  }
</style>