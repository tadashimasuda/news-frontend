<template>
    <p>redirect</p>
</template>
<script>
import axios from 'axios'

export default {
    mounted(){
        axios.get('/oauth/google/redirect').then((res) => {
            console.log(res.data.redirect_url);
            //遷移させる
            window.location.href = res.data.redirect_url
        })
        .catch((e) => {
            console.log(e);
        });
    }
}
</script>