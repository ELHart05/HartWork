<template>
    <header>
        <h1 @click="this.$router.push({name: 'home'})">HardWork</h1>
        <p v-if="userEmail">{{ userEmail }}</p>
        <nav>
            <ul>
                <li v-if="userToken">
                    <router-link :to="{name: 'home'}">Home</router-link>
                </li>
                <li v-if="userToken">
                    <router-link :to="{name: 'new'}">New Workout</router-link>
                </li>
                <li v-if="!userToken">
                    <router-link :to="{name: 'login'}">Login/Register</router-link>
                </li>
                <li v-if="userToken" @click=logOut>
                    <p>Logout</p>
                </li>
            </ul>
        </nav>
    </header>
</template>

<script>
import { mapState } from 'vuex'
    export default {
        name: "NavBar",
        computed: {
            ...mapState(['userToken', 'userEmail', 'loading'])
        },
        methods: {
            logOut() {
                this.$store.commit('setLoading', true);
                this.$store.commit('setUserToken', null);
                this.$store.commit('setUserEmail', '');
                localStorage.removeItem('user');
                this.$store.commit('setLoading', false);
            }
        }
    }
</script>

<style lang="scss" scoped>
header{
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 25px;
    background-color: yellow;

    h1{
        cursor: pointer;
    }

    nav{

        ul{
            display: flex;
            gap: 50px;

            a, p{
                color: black;
                text-decoration: none;
                font-size: 20px;
                transition: .5s;
                cursor: pointer;

                &:hover{
                    color: blue;
                }
            }
        }
    }
}
</style>