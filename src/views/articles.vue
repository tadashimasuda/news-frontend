<template>
    <p>{{article.text}}</p>
    
</template>
<script>
import axios from 'axios'

export default {
    data(){
        return{
            article:[]
        }
    },
    mounted(){
        axios.get('http://127.0.0.1:8000/api/article?url='+this.$route.query.url).then((res) => {
            this.article= res.data
          })
          .catch((e) => {
            console.log(e);
          });
    }
}
</script>