<template>
    <v-container class="mt-5">
      <v-list-item row style="overflow-x:scroll">
        <v-list-item >
          <v-btn>
          <span>tag</span>
        </v-btn>
        </v-list-item>
        <v-list-item>
          <v-btn>
          <span>tag</span>
        </v-btn>
        </v-list-item>
        <v-list-item>
          <v-btn>
          <span>tag</span>
          </v-btn>
        </v-list-item>
        <v-list-item>
          <v-btn>
          <span>tag</span>
          </v-btn>
        </v-list-item>
        <v-list-item>
          <v-btn>
          <span>tag</span>
        </v-btn>
        </v-list-item>
        <v-list-item>
          <v-btn>
          <span>tag</span>
        </v-btn>
        </v-list-item>
        <v-list-item>
          <v-btn>
          <span>tag</span>
        </v-btn>
        </v-list-item>
      </v-list-item>
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
        index:''
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
      console.log(e);
    });
    }
  },
  mounted(){
    axios.get('http://127.0.0.1:8000/api/articles').then((res) => {
      this.articles= res.data
      this.loading =true;
      console.log(this.articles);
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