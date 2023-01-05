<template>
  <NavBar />
  <section v-if="!userToken">
    <h1>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minima, repellendus ipsa. Corporis facilis similique
      sint repellat excepturi laboriosam eius architecto! Asperiores placeat ut esse sit delectus provident dolorem
      repellat ipsa quaerat velit, molestiae id cumque fugit doloremque. Deserunt molestiae, eligendi blanditiis nostrum
      illum labore explicabo architecto maxime eum incidunt necessitatibus, voluptates asperiores voluptate fuga
      veritatis itaque quo libero eos iusto placeat accusamus. Nihil et consequatur minima mollitia, facilis
      perspiciatis voluptatum quidem porro aspernatur autem sint fugit dignissimos provident repellat laudantium,
      maxime, deserunt sit iste dolor! Quae aliquam quod alias, quis iste dolores dolorum impedit, odit culpa fugiat
      sapiente deleniti numquam?</h1>
  </section>
  <section v-else>
    <p v-if="!totalWorkouts.length">No Workouts Available for the moment!</p>
    <div class="main" v-else>
      <div v-for="workout in totalWorkouts" :class="workout._id" class="workout-div" :key="workout._id">
        <h4>{{ workout.title }}</h4>
        <p>for <span>{{ workout.load }}(kg)</span> load and <span>{{ workout.reps }}</span> reps</p>
        <span><b>Created:</b> {{ dateFormat(workout.createdAt) }}</span>
        <div>
          <button @click="deleteWorkout(workout)">delete</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import moment from 'moment'
  import NavBar from '../components/NavBar.vue';
  import axios from 'axios'
  import {
    mapState
  } from 'vuex';
  export default {
    name: "HomeView",
    components: {
      NavBar
    },
    methods: {
      deleteWorkout(workout) {
        axios.delete(`http://localhost:3000/api/workouts/${workout._id}`, {
            headers: {
              'Authorization': `Bearer ${this.userToken}`
            }
          })
          .then((res) => {
            const newTotalWorks = this.totalWorkouts.filter((wo) => {
              return wo._id != workout._id;
            })
            this.$store.commit('setTotalWorkouts', newTotalWorks);
          })
      },
      dateFormat(time) {
        return moment(time).format('MMMM Do YYYY, h:mm:ss a');
      }
    },
    computed: {
      ...mapState(['totalWorkouts', 'loading', 'userToken'])
    }
  }
</script>

<style lang="scss" scoped>
  div {


    section {
      padding: 40px 10px;

      p {
        text-align: center;
      }

      .main {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
        gap: 10px;

        .workout-div {
          min-width: 100px;
          display: flex;
          justify-content: center;
          align-items: flex-start;
          flex-direction: column;
          border: 1px solid black;
          padding: 15px 10px;
          border-radius: 10px;
          gap: 10px;
          background-color: red;

          h4 {
            width: 100%;
            background-color: white;
            padding: 5px;
            border: 1px solid black;
          }

          div {

            button {
              display: block;
              padding: 10px 15px;
              outline: none;
              border: 1px solid black;
              transition: .5s;
              cursor: pointer;

              &:hover {
                background-color: green;
              }
            }
          }
        }
      }
    }
  }
</style>