<template>
  <v-card>
    <v-img class="white--text align-end" :src= article.urlToImage></v-img>
    <v-card-subtitle class="pb-0">ソース元:{{article.source.name}}</v-card-subtitle>
    <v-card-text>{{article.description}}</v-card-text>

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