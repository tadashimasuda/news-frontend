<template>
    <header>
      <v-app-bar app white>
         <v-app-bar-nav-icon app @click="drawer = !drawer"></v-app-bar-nav-icon>
       <v-toolbar-title class="font-weight-bold h3">
         News hear
       </v-toolbar-title>

        <v-spacer></v-spacer>

        <template v-if="!isLogin">
          <v-btn depressed color="white" href="/oauth/google/redirect">ログイン</v-btn>
        </template>
        <template v-else>
          <v-menu
            bottom
            min-width="200px"
            rounded
            offset-y
          >
            <template v-slot:activator="{ on }">
              <v-btn
                icon
                x-large
                v-on="on"
              >
                <v-avatar
                  color="brown"
                  size="43"
                >
                  <v-img
                  height="100%"
                  :src = user.img_path
                  size="100"
                  mx-auto
                  class="rounded-circle justify-center my-5"
                >
                </v-img>
                </v-avatar>
              </v-btn>
            </template>
            <v-card>
              <v-list-item-content class="justify-center">
                <div class="mx-auto text-center">
                  <v-avatar>
                    <v-img
                      height="100%"
                      :src = user.img_path
                      size="100"
                      mx-auto
                      class="rounded-circle justify-center my-5"
                    >
                    </v-img>
                  </v-avatar>
                  <h4 class="mt-2">{{user.name}}</h4>
                  <v-divider class="my-3"></v-divider>
                  <v-btn
                    depressed
                    rounded
                    text
                    @click.prevent="logout()"
                  >
                    ログアウト
                  </v-btn>
                </div>
              </v-list-item-content>
            </v-card>
          </v-menu>
        </template>
      </v-app-bar>
      <v-navigation-drawer v-model="drawer" fixed temporary>
        <v-list nav dense>
          <v-list-item-group class="text-center">
            <v-list-item>
              <div class="mx-auto">
                <v-img
                  height="100%"
                  :src = user.img_path
                  size="100"
                  mx-auto
                  class="rounded-circle justify-center my-5"
                >
                </v-img>
                <p class="text-h5">
                  {{user.name}}
                </p>
              </div>
            </v-list-item>
            
            <v-list-item class="mt-5">
              <v-dialog v-model="dialog">
                <template  v-slot:activator="{ on, attrs }">
                  <v-list-item-title v-if="isLogin" @click.prevent="getStacks()" class="text-h6 py-3" v-bind="attrs" v-on="on">
                    後で見る
                  </v-list-item-title>
                  <v-list-item-title v-if="!isLogin" class="text-h6 py-3 grey lighten-4" v-bind="attrs" v-on="on">
                    後で見る
                  </v-list-item-title>
                </template>
                <v-card v-if="isLogin">
                  <v-list>
                    <v-list-item-group>
                      <v-list-item v-for="(stack,index) in stacks" :key="index" class="mb-2">
                        <v-list-item-content>
                          <v-avatar
                            class="ma-3"
                            size="125"
                            tile
                          >
                            <v-img :src= stack.article.img_path></v-img>
                          </v-avatar>
                          <v-list-item-title v-text="stack.article.title"></v-list-item-title>
                          <v-icon class="mt-3" @click.prevent="deleteArticle(stack.id)">mdi-delete</v-icon>
                        </v-list-item-content>
                      </v-list-item>
                    </v-list-item-group>
                  </v-list>
                </v-card>
                <v-card v-if="!isLogin">
                  ログイン後にご利用いただけます。
                </v-card>
              </v-dialog>
            </v-list-item>
            <v-list-item class="mt-5">
              <v-list-item-title v-if="!isLogin" class="text-h6 py-3" @click.prevent="logout()">
                Googleでログイン
              </v-list-item-title>
              <v-list-item-title v-if="isLogin" class="text-h6 py-3">
                ログアウト
              </v-list-item-title>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>
    </header>
</template>
<script>
import axios from 'axios'

export default {
  data() {
    return {
      drawer: false,
      dialog: false,
      stacks:[]
    };
  },
  methods:{
    logout(){
      let token =localStorage.getItem('access_token')
        axios.get('/logout',{
            headers:{
            "Authorization":"Bearer " + token
            }
        }).then((res) => {
            this.$store.commit('clearUser');
            window.location.reload();
            return res;
        }).catch((e) => {
            console.log(e);
        });
    },
    getStacks(){
        let token =localStorage.getItem('access_token')
        axios.get('/stacks',{
            headers:{
            "Authorization":"Bearer " + token
            }
        }).then((res) => {
          this.stacks = res.data.data
        }).catch((e) => {
            console.log(e);
        });
    },
    deleteArticle(id){
      let token =localStorage.getItem('access_token')
        axios.delete('/articles/stacks/'+id,{
            headers:{
            "Authorization":"Bearer " + token
            }
        }).then((res) => {
          this.stacks = this.stacks.filter((stack) => {
            return (stack.id != id)
          })
          return res;
        }).catch((e) => {
            console.log(e);
        });
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
};
</script>
