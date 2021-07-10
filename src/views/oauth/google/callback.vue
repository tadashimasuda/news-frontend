<template>
    <p>callback {{data.access_token}}</p>
</template>
<script>
import axios from 'axios'

export default {
    data(){
        return{
            data:''
        }
    },
    mounted(){
        axios.get('http://localhost:8000/api/oauth/google/callback',{ params: this.$route.query }).then((res) => {
            //localstrageに入れる
            localStorage.setItem('access_token', res.data.access_token);
            this.$store.commit('setUser',{ user: res.data.user });
            this.$router.push('/')
        }).catch((e) => {
            console.log(e);
        });
    }
}
</script>