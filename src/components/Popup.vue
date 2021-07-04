<template>
  <v-card>
    <v-img class="white--text align-end" :src= article.img_path>
      <v-card-title></v-card-title>
    </v-img>
    <v-card-subtitle class="pb-0">ソース元：{{article.source}}</v-card-subtitle>
    <v-card-text>
      {{article.description}}
    </v-card-text>

    <v-divider></v-divider>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="primary" text @click="stackArticle(article.id)">後で見る<v-icon>mdi-plus-box-multiple</v-icon></v-btn>
      <router-link :to="{name:'articles',query:{url:article.url}}" class="ml-5">詳細へ</router-link>
      <v-btn color="primary" text @click="dialogUpdate()" class="ml-5"> 閉じる </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
import axios from 'axios'

export default {
    name:'Popup',
    props:["article","index"],
    methods:{
      dialogUpdate:function(){
          this.$emit("dialogUpdate");
      },
      stackArticle:function(id){
        let token =localStorage.getItem('access_token')
        axios.defaults.headers.common['Authorization'] = "Bearer " + token;
        axios.post('http://127.0.0.1:8000/api/article/'+ id +'/stack').then((res) => {
          console.log(res);
        }).catch((e) => {
            console.log(e);
        });
      }
    }
}
</script>