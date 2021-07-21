<template>
    <v-card>
        <v-toolbar
            flat
            color="grey"
            dark
        >
        <v-toolbar-title>コメント投稿</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
            <v-textarea
                filled
                label="投稿内容"
                class="mt-4"
                v-model="inputComment"
                required
            ></v-textarea>
        <v-btn text v-if="alertText" color="error">コメントを記入してください。</v-btn>
        </v-card-text>
        <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
            color="success"
            v-if="!postLoading"
            @click="postComment()"
        >
            投稿
        </v-btn>
        <v-icon v-if="postSuccess">dense</v-icon>
        </v-card-actions>
    </v-card>
</template>
<script>
import axios from 'axios'

export default {
    data(){
        return{
            postSuccess:false,
            postLoading:false,
            inputComment:'',
            alertText:false
        }
    },
    props:["articleId","dialog"],
    methods:{
        postComment(){
            if (!this.inputComment) {
                this.alertText = true
            }else{
                this.postLoading = true
                let token =localStorage.getItem('access_token')
                axios.defaults.headers.common['Authorization'] = "Bearer " + token;
                axios.post('/articles/'+ this.articleId +'/comments',{body:this.inputComment}).then(() => {
                    this.postSuccess = true
                    setTimeout(
                        this.$emit("dialogUpdate",false)
                    ,2000)
                }).catch((e) => {
                    console.log(e);
                });
            }
        },
        // getUser(){
        //     let token =localStorage.getItem('access_token')
        //     axios.get('/user',{
        //         headers:{
        //         "Authorization":"Bearer " + token
        //         }
        //     }).then((res) => {
        //         localStorage.setItem('access_yn', res.data.access_token);
        //         this.$store.commit('setUser',{ user: res.data.user });
        //     }).catch((e) => {
        //     if (e.response.status!==401) {
        //         console.log(e);
        //     }
        // });
        // },
    },
    created(){
    // this.getUser()
  }
}
</script>
