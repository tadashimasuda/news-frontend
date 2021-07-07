<template>
    <v-container class="mt-5">
      <div class="loading mt-12">
        <v-row justify='center'>
        <v-progress-circular v-if="!loading" :size="50" color="grey lighten-2" indeterminate></v-progress-circular>
      </v-row>  
      </div>
      <v-dialog v-if="loading" v-model="dialog" width="500">
        <template v-slot:activator="{ on, attrs }">
          <div v-masonry transition-duration="0.3s" item-selector=".item" v-bind="attrs" v-on="on"  >
            <v-card v-masonry-tile class="item mx-1 mt-2" :class="addClass(index)" :key=index v-for="(article, index) in articles" @click="articleData(article,index)">
                <v-img class="white--text align-end" :src="article.img_path">
                  <v-card-title></v-card-title>
                </v-img>
                <v-card-subtitle class="pb-0">
                 {{article.source}}
                </v-card-subtitle>
                <v-card-text class="text--primary">{{article.title}}
                </v-card-text>
            </v-card>
          </div>
        </template>
      <Popup :article= article :index= index @dialogUpdate="dialog=false" />
      </v-dialog>
      <v-btn v-if="next_page" @click="loadMore()">load more...</v-btn>
    </v-container>
</template>

<script>
import Popup from '@/components/Popup.vue'
import axios from 'axios'

export default {
  name: 'Index',
  components: {
    Popup
  },
  data () {
      return {
        dialog: false,
        loading:false,
        article:[],
        articles:[],
        index:'',
        next_page_url:'',
        next_page:true
      }
  },
  methods: {
    articleData(article,index){
      this.article=article
      this.index=index
    },
    addClass: function(){
      let min = 1 ;
      let max = 3 ;
      let random = Math.floor( Math.random() * (max + 1 - min) ) + min ;
      return 'item' + random;
    },
    getUser(){
      let token =localStorage.getItem('access_token')
      axios.get('http://127.0.0.1:8000/api/user',{
        headers:{
          "Authorization":"Bearer " + token
        }
      }).then((res) => {
        localStorage.setItem('access_yn', res.data.access_token);
        this.$store.commit('setUser',{ user: res.data.user });
    }).catch((e) => {
      if (e.response.status!==401) {
        console.log(e);
      }
    });
    },
    loadMore(){
      if (this.next_page) {
        let link = this.next_page_url
         axios.get(link).then((res) => {
          this.articles.push(...res.data.data)
          this.next_page_url = res.data.next_page_url
          this.next_page = Boolean(this.next_page_url)
        }).catch((e) => {
          console.log(e);
        });
      }else{
        console.log('no');
      }
    }
  },
  mounted(){
    axios.get('http://127.0.0.1:8000/api/articles').then((res) => {
      this.articles = res.data.data
      this.next_page_url = res.data.next_page_url
      this.loading =true;
    })
    .catch((e) => {
      console.log(e);
    });
  },
  created(){
    this.getUser()
  }
}
</script>
<style scoped>
.item{
  justify-content: center;
  align-items: center;
  width:280px;
  display: block;
}
</style>