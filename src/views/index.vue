<template>
  <v-app>
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
      <div v-masonry transition-duration="0.3s" item-selector=".item">
        <v-card v-masonry-tile class="item mx-1 mt-2" :class="addClass(index)" :key=index v-for="(item, index) in Number(10)">
            <v-img class="white--text align-end" src="https://i.imgur.com/kwxMKGr.jpg">
              <v-card-title>Top 10 Australian beaches</v-card-title>
            </v-img>
            <v-card-subtitle class="pb-0">
              Number 10
            </v-card-subtitle>
            <v-card-text class="text--primary">
            </v-card-text>
        </v-card>
      </div>
    </v-container>
  </v-app>
</template>

<script>
export default {
  name: 'Index',
  components: {
  },
  methods: {
    addClass: function(){
      let min = 1 ;
      let max = 3 ;
      let random = Math.floor( Math.random() * (max + 1 - min) ) + min ;
      return 'item' + random;
    }
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

.item1 {
  height: 250px;
}
.item1 > v-img{
  height:100px;
}
.item2 {
  height: 300px;
}
.item2 > v-img{
  height:130px;
}
.item3 {
  height: 350px;
}
.item3 > v-img{
  height:1
  200px;
}
</style>