<template>
    <header>
      <v-app-bar app white>
         <v-app-bar-nav-icon app @click="drawer = !drawer"></v-app-bar-nav-icon>
       <v-toolbar-title>News</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn icon>
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
        <v-btn v-if="!$store.state.UserStatus" depressed color="white" href="/oauth/twitter/redirect">ログイン</v-btn>
        <v-btn v-if="$store.state.UserStatus" depressed color="white">ログアウト</v-btn>
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
                <v-card-item-title class="text-h5">
                  {{$store.state.user.name}}
                </v-card-item-title>
              </div>
            </v-list-item>
            <v-list-item class="mt-5">
              <v-list-item-title class="text-h6 py-3">後で見る</v-list-item-title>
            </v-list-item>
            <v-list-item class="mt-5">
              <v-list-item-title class="text-h6 py-3">ログアウト</v-list-item-title>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>
    </header>
</template>
<script>
export default {
  data() {
    return {
      drawer: false,
    };
  }
};
</script>
