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
        console.log(this.$route.query);
        axios.get('http://localhost:8000/api/oauth/twitter/callback',{ params: this.$route.query }).then((res) => {
            //localstrageに入れる
            localStorage.setItem('access_token', res.data.access_token)
        }).catch((e) => {
            console.log(e);
        });
    }
}
</script>