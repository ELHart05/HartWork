<template>
    <NavBar />
    <section>
        <form>
            <h1>Login Form</h1>
            <div>
                <label for="email">Email</label>
                <input type="text" id="email" v-model="email">
            </div>
            <div>
                <label for="password">Password</label>
                <input type="password" id="password" v-model="password">
            </div>
            <button @click.prevent="login">login</button>
            <p v-if="error" style="color: red;">{{ error }}</p>
        </form>
        <p>don't have an account, <router-link :to="{name: 'register'}">register</router-link></p>
    </section>
</template>

<script>
import axios from 'axios';
import NavBar from '../../components/NavBar.vue';
import { mapState } from 'vuex';
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
        async login() {
            try {
                this.$store.commit('setLoading', true);
                this.$store.commit('setError', null);
                this.$store.commit('setTotalWorkouts', []);
                const res = await axios.post('http://localhost:3000/api/users/login', {
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
            }
            catch (error) {
                this.$store.commit('setLoading', false);
                this.$store.commit('setError', error.response.data.err);
            }
        }
    },
    computed: {
        ...mapState(['error', 'userToken', 'userEmail', 'loading'])
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

        p{
            text-align: right;
        }
    }
</style>