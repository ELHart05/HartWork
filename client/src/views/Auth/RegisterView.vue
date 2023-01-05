<template>
    <NavBar />
    <section>
        <form>
            <h1>Register Form</h1>
            <div>
                <label for="email">Email</label>
                <input type="text" id="email" v-model="email">
            </div>
            <div>
                <label for="password">Password</label>
                <input type="password" id="password" v-model="password">
            </div>
            <p style="color: red;" v-if="error">{{ error }}</p>
            <div>
                <button @click.prevent="register">register</button>
            </div>
        </form>
        <p>already have an account, <router-link :to="{name: 'login'}">login</router-link>
        </p>
    </section>
</template>

<script>
    import axios from 'axios';
    import NavBar from '../../components/NavBar.vue';
    import {
        mapState
    } from 'vuex';
    export default {
        name: 'Login',
        components: {
            NavBar
        },
        data() {
            return {
                email: '',
                password: ''
            }
        },
        methods: {
            async register() {
                try {
                    this.$store.commit('setLoading', true);
                    this.$store.commit('setError', null);
                    this.$store.commit('setTotalWorkouts', []);
                    const res = await axios.post('http://localhost:3000/api/users/signin', {
                        email: this.email,
                        password: this.password
                    });
                    this.$store.commit('setUserToken', res.data.token);
                    this.$store.commit('setUserEmail', res.data.email);
                    localStorage.setItem('user', JSON.stringify(res.data));
                    this.$store.commit('setLoading', false);
                    this.$router.push({
                        name: 'home'
                    })
                } catch (error) {
                    this.$store.commit('setLoading', false);
                    this.$store.commit('setError', error.response.data.err);
                }
            }
        },
        computed: {
            ...mapState(['userToken', 'error'])
        }
    }
</script>

<style lang="scss" scoped>
    section {
        display: flex;
        flex-direction: column;
        gap: 10px;
        height: 70vh;
        padding: 300px;
        align-items: center;
        justify-content: center;

        form {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: center;
            gap: 10px;
        }
    }
</style>