<template>
    <v-app>
        <v-content>
            <v-container>
                <v-row justify="center" align-content="center">
                    <v-col md="10">
                        <v-card>
                            <div ></div>
                            <v-img
                            max-height="350"
                            contain
                            :src= article.img_path
                            class="grey darken-4"
                            ></v-img>
                            <v-card-title class="text-h5">
                                {{article.title}}
                            </v-card-title>
                            <v-card-title class="text-body-1">
                                {{article.text}}
                            </v-card-title>
                            <v-card-actions>
                                <v-btn
                                    text
                                    color="gray accent-4"
                                    @click="reveal = true"
                                    :href= link
                                >
                                外部ページで見る
                            </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>
        </v-content>
    </v-app>
</template>
<script>
import axios from 'axios'

export default {
    data(){
        return{
            article:[],
            link:''
        }
    },
    methods:{
        getUser(){
            let token =localStorage.getItem('access_yn')
            axios.get('http://127.0.0.1:8000/api/user',{
                headers:{
                "Authorization":"Bearer " + token
                }
            }).then((res) => {
                localStorage.setItem('access_token', res.data.access_token);
                this.$store.commit('setUser',{ user: res.data.user });
            }).catch((e) => {
                console.log(e);
            });
        }
    },
    mounted(){
        axios.get('http://127.0.0.1:8000/api/article?url='+this.$route.query.url).then((res) => {
            this.article= res.data
          })
          .catch((e) => {
            console.log(e);
          });
    },
    created(){
        this.link=this.$route.query.url
        this.getUser()

    }
}
</script>