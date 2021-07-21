<template>
  <v-card>
    <v-img class="white--text align-end" :src= article.img_path>
      <v-btn fab class="float-right mr-2 mb-1">
        <router-link :to="'/articles/' + article.id" style="text-decoration:none">
        <v-icon color="black">mdi-play</v-icon>
        </router-link>
      </v-btn>
    </v-img>
    <v-card-subtitle class="pb-0">ソース元：{{article.source}}</v-card-subtitle>
    <v-card-text>
      {{article.description}}
    </v-card-text>

    <v-divider></v-divider>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="primary" v-if="isLogin" text @click="stackArticle(article.id)">あとで見る<v-icon>mdi-plus-box-multiple</v-icon></v-btn>
      <v-btn text v-if="!isLogin" @click="alertLogin">あとで見る<v-icon>mdi-plus-box-multiple</v-icon></v-btn>
      <router-link :to="'/articles/' + article.id" class="ml-5">詳細へ</router-link>
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
        axios.post('/articles/'+ id +'/stack').then((res) => {
          console.log(res);
        }).catch((e) => {
            console.log(e);
        });
      },
      alertLogin:function(){
        alert('ログイン後にご利用いただけます。')
      }
    },
    computed:{
      isLogin(){
        return this.$store.getters['authenticated']
      },
      user(){
        return this.$store.getters['user']
      }
    }
}
</script>