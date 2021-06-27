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
      <v-dialog v-model="dialog" width="500">
        <template v-slot:activator="{ on, attrs }">
          <div v-masonry transition-duration="0.3s" item-selector=".item" v-bind="attrs" v-on="on"  >
            <v-card v-masonry-tile class="item mx-1 mt-2" :class="addClass(index)" :key=index v-for="(article, index) in articles" @click="articleData(article)">
                <v-img class="white--text align-end" :src="article.urlToImage">
                  <v-card-title></v-card-title>
                </v-img>
                <v-card-subtitle class="pb-0">
                 {{article.source.name}}
                </v-card-subtitle>
                <v-card-text class="text--primary">{{article.title}}
                </v-card-text>
            </v-card>
          </div>
        </template>
      <Popup :article=article @dialogUpdate="dialog=false" />
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
        article:[],
        articles:[]
      }
  },
  methods: {
    articleData(article){
      this.article=article
    },
    addClass: function(){
      let min = 1 ;
      let max = 3 ;
      let random = Math.floor( Math.random() * (max + 1 - min) ) + min ;
      return 'item' + random;
    }
  },
  mounted(){
    axios.get('http://127.0.0.1:8000/api/articles').then((res) => {
            this.articles= res.data
            console.log(this.articles);
          })
          .catch((e) => {
            console.log(e);
          });
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