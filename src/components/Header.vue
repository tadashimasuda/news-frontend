<template>
    <header>
      <v-app-bar app white>
         <v-app-bar-nav-icon app @click="drawer = !drawer"></v-app-bar-nav-icon>
       <v-toolbar-title>News</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn icon>
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
        <template v-if="!$store.state.userStatus">
          <v-btn depressed color="white" href="/oauth/twitter/redirect">ログイン</v-btn>
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
                  :src = $store.state.user.img_path
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
                      :src = $store.state.user.img_path
                      size="100"
                      mx-auto
                      class="rounded-circle justify-center my-5"
                    >
                    </v-img>
                  </v-avatar>
                  <h4 class="mt-2">{{$store.state.user.name}}</h4>
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
                  :src = $store.state.user.img_path
                  size="100"
                  mx-auto
                  class="rounded-circle justify-center my-5"
                >
                </v-img>
                <p class="text-h5">
                  {{$store.state.user.name}}
                </p>
              </div>
            </v-list-item>
            <v-list-item class="mt-5">
              <v-dialog v-model="dialog">
                <template v-slot:activator="{ on, attrs }">
                  <v-list-item-title class="text-h6 py-3" v-bind="attrs" v-on="on">
                    後で見る
                  </v-list-item-title>
                </template>
                <v-card>
                  <v-title>stacklist</v-title>
                </v-card>
              </v-dialog>
            </v-list-item>
            <v-list-item class="mt-5">
              <v-list-item-title class="text-h6 py-3" @click.prevent="logout()">
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
    };
  },
  methods:{
    logout(){
      let token =localStorage.getItem('access_token')
        axios.get('http://127.0.0.1:8000/api/logout',{
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
    }
  }
};
</script>
