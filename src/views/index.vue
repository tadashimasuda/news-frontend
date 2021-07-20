<template>
    <v-container class="mt-5">
      <div class="loading mt-12">
        <v-row justify='center'>
        <v-progress-circular v-if="!loading" :size="50" color="grey lighten-2" indeterminate></v-progress-circular>
      </v-row>  
      </div>
      <v-dialog v-if="loading" v-model="dialog" width="500">
        <template v-slot:activator="{ on, attrs }">
          <div class="grid" v-bind="attrs" v-on="on">
            <v-card class="content flow" :key= index v-for="(article, index) in articles" @click="articleData(article,index)">
                <v-img class="white--text align-end" :src="article.img_path">
                  <v-btn fab small class="float-right mr-2 mb-1">
                    <v-icon>mdi-play</v-icon>
                  </v-btn>
                </v-img>
                <v-card-subtitle class="pb-0">
                 {{article.source}}
                </v-card-subtitle>
                <v-card-text class="text--primary">
                  {{article.title}}
                </v-card-text>
            </v-card>
          </div>
        </template>
      <Popup :article= article :index= index @dialogUpdate="dialog=false" />
      </v-dialog>
      <v-row justify='center' class="mt-5">
        <v-btn color="white" justify='center' v-if="next_page&loading"  @click="loadMore()">もっと見る</v-btn>
      </v-row>
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
    getUser(){
      let token =localStorage.getItem('access_token')
      axios.get('/user',{
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
    },
  },
  mounted(){
    axios.get('/articles').then((res) => {
      this.articles = res.data.data
      this.next_page_url = res.data.next_page_url
      this.loading =true;
    }).catch((e) => {
      console.log(e);
    });
  },
  created(){
    this.getUser()
  }
}
</script>
<style scoped>
.grid {
  --gap: 1em;
  --columns: 4;
  margin: 0 auto;
  display: column;
  columns: var(--columns);
  gap: var(--gap);
}

.grid > * {
  break-inside: avoid;
  margin-bottom: var(--gap);
}

@supports (grid-template-rows: masonry) {
  .grid {
    display: grid;
    grid-template-columns: repeat(var(--columns), 1fr);
    grid-template-rows: masonry;
    grid-auto-flow: dense;
    /* align-tracks: stretch; */
  }

  .grid > * {
    margin-bottom: 0em;
  }
}

:root {
  --ff-primary: basic-sans, sans-serif;
  --clr-primary: #ee6352;
  --clr-body: #333;
  --clr-bg: #ddd;
  --spacer: 1rem;
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

.flow > * + * {
  margin-top: var(--flow-space, var(--spacer));
}
@media screen and (max-width: 784px){
  .grid {
  --columns: 3;
  }
}

@media screen and (max-width: 480px){
  .grid {
  --columns: 1;
  }
}

</style>