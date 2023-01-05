<template>
    <NavBar />
    <section>
        <form>
            <div class="input-div">
                <label for="title">Enter the title.</label>
                <input ref="title" id="title" type="text" v-model="title">
            </div>
            <div class="input-div">
                <label for="reps">Enter Total Reps.</label>
                <input id="reps" type="number" v-model="reps">
            </div>
            <div class="input-div">
                <label for="load">Enter Total Load (kg).</label>
                <input id="load" type="number" v-model="load">
            </div>
            <div>
                <button @click.prevent="addNewWorkout">Submit</button>
            </div>
        </form>
        <p v-if="err">{{ errMessage }}</p>
    </section>
</template>

<script>
    import axios from 'axios';
    import NavBar from '../components/NavBar.vue';
    import {
        mapState
    } from 'vuex';
    export default {
        name: "NewView",
        components: {
            NavBar
        },
        mounted() {
            this.$refs.title.focus();
        },
        data() {
            return {
                title: "",
                reps: 0,
                load: 0,
                err: false,
                errMessage: ""
            }
        },
        methods: {
            addNewWorkout() {
                if (!this.title || !this.reps || !this.load) {
                    this.err = true
                    this.errMessage = 'please fill in all the fields'
                    return;
                }
                axios.post("http://localhost:3000/api/workouts/", {
                        title: this.title,
                        reps: this.reps,
                        load: this.load
                    }, {
                        headers: {
                            'Authorization': `Bearer ${this.userToken}`
                        }
                    })
                    .then((res) => {
                        if (res.status != 200) {
                            this.err = true
                            this.errMessage = err.message
                            return;
                        }
                        this.$store.commit('newWorkout', res.data); //to change any value we need a mutation
                        this.$router.push({
                            name: 'home'
                        })
                    })
                    .catch((err) => {
                        this.err = true
                        this.errMessage = err.message
                    })
            }
        },
        computed: {
            ...mapState(['totalWorkouts', 'userToken'])
        }
    }
</script>

<style lang="scss" scoped>
    section {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        padding: 80px;

        form {
            display: flex;
            flex-direction: column;
            padding: 40px 120px;
            border: 1px solid black;
            gap: 10px;

            .input-div {
                display: flex;
                flex-direction: column;

                input {
                    outline: none;
                    padding: 10px;
                    border-radius: 5px;
                    border: 1px solid black;
                }
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

        p {
            margin-top: 5px;
            color: red;
        }
    }
</style>