<template>
  <v-card>
    <v-img class="white--text align-end" src="https://i.imgur.com/kwxMKGr.jpg">
      <v-card-title>Top 10 Australian beaches</v-card-title>
    </v-img>
    <v-card-subtitle class="pb-0"> Number {{article.num}}</v-card-subtitle>
    <v-card-text>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
      velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
      cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
      est laborum.
    </v-card-text>

    <v-divider></v-divider>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="primary" text @click="dialogUpdate()"> 閉じる </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
    name:'Popup',
    props:["article"],
    methods:{
        dialogUpdate:function(){
            this.$emit("dialogUpdate");
        }
    }
}
</script>