<template>
    <v-app>
        <v-main v-if="article.text">
                <v-row justify="center" align-content="center">
                    <v-col md="10">
                        <v-card>
                            <v-img
                            max-height="350"
                            contain
                            :src= article.img_path
                            class="grey darken-4"
                            ></v-img>
                            <v-card-title class="text-h5">
                                {{article.title}}
                            </v-card-title>
                            <v-card-actions class="liner">
                                <v-progress-linear
                                    v-model="value"
                                    @change="time()"
                                    color="black"
                                ></v-progress-linear>
                            </v-card-actions>
                            <div id="audio_time" style="width:80%; margin:0 auto;">
                                <v-row>
                                <v-col>
                                    <v-card-text
                                    class="pa-2"
                                    outlined
                                    tile
                                    >
                                    {{showValue}}
                                    </v-card-text>
                                </v-col>

                                <v-spacer></v-spacer>

                                <v-col>
                                    <v-card-text
                                    class="pa-2 text-end"
                                    outlined
                                    tile
                                    >
                                    {{duration}}
                                    </v-card-text>
                                </v-col>
                                </v-row>
                                <audio ref="audio" :src="`https://news-voice.s3.amazonaws.com/` + article.s3_file_path + '.mp3'"></audio>
                            </div>
                            <v-card-actions v-if="article.s3_file_path">
                                <v-row class="my-3" align="center" justify="center" >
                                    <v-btn class="mx-2"
                                        fab
                                        outlined
                                        color="dark"
                                        @click.prevent="skip5sBackward()"
                                    >
                                        <v-icon dark>
                                            mdi-skip-backward
                                        </v-icon>
                                    </v-btn>
                                    <v-btn class="mx-2"
                                        fab
                                        outlined
                                        color="dark"
                                        large
                                        v-show="show" @click.prevent="audioStart()"
                                    >
                                        <v-icon dark>
                                            mdi-play
                                        </v-icon>
                                    </v-btn>
                                    <v-btn class="mx-2"
                                        fab
                                        outlined
                                        color="dark"
                                        large
                                        v-show="!show" @click.prevent="audioStop()"
                                    >
                                        <v-icon dark>
                                            mdi-stop
                                        </v-icon>
                                    </v-btn>
                                    <v-btn class="mx-2"
                                        fab
                                        outlined
                                        color="dark"
                                        @click.prevent="skip5sForward()"
                                    >
                                        <v-icon dark>
                                            mdi-skip-forward
                                        </v-icon>
                                    </v-btn> 
                                </v-row>
                            </v-card-actions>
                            <v-card-actions v-else>
                                <v-row class="mb-3" align="center" justify="center" >
                                    <v-btn v-if="!loading" fab @click="reloadBtnClick()">
                                        <v-icon dark>
                                            mdi-reload
                                        </v-icon>
                                    </v-btn>
                                    <v-progress-circular v-if="loading" :size="50" color="grey lighten-2" indeterminate></v-progress-circular>
                                </v-row>
                            </v-card-actions>
                            <p class="text-center" v-if="!article.s3_file_path">音声を取得できませんでした。音声を再取得する。</p>
                            <v-card-title v-text="article.text" class="text-body-1"></v-card-title>
                            <v-card-actions class="liner">
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
                        <v-card class="mt-5">
                            <v-row justify="space-around">
                                <v-col cols="left">
                                    <h3 class="h3 ml-3">コメント</h3>
                                </v-col>
                                <v-col cols="auto">
                                    <v-dialog
                                    v-model="commentDialog"
                                    width="500"
                                    >
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-btn v-bind="attrs" v-on="on" class="mt-1 mr-2">
                                            <v-icon small class="mr-1">mdi-pencil</v-icon>
                                            コメントする
                                        </v-btn>
                                    </template>
                                     <CommentPost :articleId = article.id @dialogUpdate="commentDialog=false" />
                                    </v-dialog>
                                </v-col>
                            </v-row>
                            <v-list>
                                <v-list-item two-line v-for="comment in comments" :key="comment.id" >
                                    <v-list-item-content two-line>
                                        <v-list-item>
                                            <v-avatar size="30" color="gray" class="mr-2"> 
                                                <v-img class="rounded-circle justify-center my-5" :src= comment.user.img_path ></v-img>
                                            </v-avatar>
                                            <v-list-item-title>{{comment.user.name}}</v-list-item-title>
                                        </v-list-item>
                                        <p class="ml-14">
                                            <v-row>
                                                <v-col md='8'>{{comment.body}}</v-col>
                                                <v-col md='2'>
                                                    <template v-if="user.id == comment.user.id" class="text-end">
                                                        <v-btn text @click="deleteComments(comment.id)">
                                                            <v-icon>mdi-delete</v-icon>
                                                        </v-btn>
                                                    </template>
                                                </v-col>
                                            </v-row>
                                        </p>
                                    </v-list-item-content>
                                </v-list-item>
                            </v-list>
                        </v-card>
                    </v-col>
                </v-row>
            </v-main>

            <v-main v-else>
                <v-row class="mt-16" justify="center" align-content="center">
                    <v-progress-circular v-if="!loadingArticle" :size="50" color="grey lighten-2" indeterminate></v-progress-circular>
                </v-row>
                <p v-if="!loadingText" class="text-center mt-12">現在読み込み中です</p>
                <p v-else class="text-center mt-12">データの取得に失敗しました。</p>
            </v-main>
    </v-app>
</template>
<script>
import axios from 'axios'
import CommentPost from '@/components/CommentPost.vue'

export default {
    data(){
        return{
            article:[],
            comments:'',
            link:'',
            show:true,
            currentTime:0,
            value:0,
            parsentValue:0,
            showValue:'00:00',
            duration:0,
            audio:'',
            loading:false,
            loadingArticle:false,
            loadingText:false,
            commentDialog:false
        }
    },
    components:{
        CommentPost 
    },
    methods:{
        checkArticle(){
            if (!this.loadingArticle) {
                this.loadingText=true
                this.loadingArticle=true
            }
        },
        async getArticle(){
            await axios.get('/articles/'+this.$route.params.id).then((res) => {
                this.article= res.data
                this.audio = new Audio('https://news-voice.s3.amazonaws.com/'+res.data.s3_file_path+'.mp3')
                this.duration=this.toMs(this.audio.duration)
                this.currentTime =this.toMs(this.audio.currentTime)
                this.loadingArticle=true
            }).catch((e) => {
                console.log(e);
            });
        },
        async getComment(){
            await axios.get('/articles/'+this.$route.params.id+'/comments').then((res) => {
                this.comments= res.data.data
            }).catch((e) => {
                console.log(e);
            });
        },
        async deleteComments(id){
            let result = confirm('本当に削除してよろしいですか？');
 
            if(result) {
                let token = localStorage.getItem('access_token')
                axios.defaults.headers.common['Authorization'] = "Bearer " + token;
                await axios.delete('/articles/'+this.$route.params.id+'/comments/'+id).then(() => {
                    this.getComment()
                }).catch((e) => {
                    console.log(e);
                });
            } 
        },
        audioStart(){
            this.audio.play();
            this.show = !this.show
            this.duration = this.toMs(this.audio.duration)
            setInterval(() => {
                this.value= (this.audio.currentTime/this.audio.duration)*100;
                this.showValue=this.toMs(this.audio.currentTime)
            }, 100)
        },
        audioStop(){
            this.audio.pause();
            this.show = !this.show
        },
        skip5sForward(){
            this.audio.currentTime+=5
        },
        skip5sBackward(){
            this.audio.currentTime-=5
        },
        time(){
            this.audio.currentTime=(this.value * this.audio.duration)/100
        },
        toMs(time){
            let m = Math.floor(time % 3600 / 60 | 0)
            let s = Math.floor(time % 60)
            return ( '00' + m ).slice( -2 )+ ':' + ( '00' + s ).slice( -2 )
        },
        persentValue(){
            return (this.audio.currentTime/this.audio.duration) *100
        },
        reloadBtnClick(){
            this.loading = !this.loading
            setTimeout(function () {
                window.location.reload()
            },3000)
        },
    },
    mounted(){
        setTimeout(this.checkArticle,30000)
        this.getArticle(),
        this.getComment(),
        this.audio = this.$refs.audio
    },
    created(){
        this.link=this.$route.query.url
        if (!this.isLogin) {
            this.$store.dispatch('getUser')
        }
    },
    watch:{
        commentDialog:function () {
            this.getComment()
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
}
</script>
<style scoped>
.v-progress-linear {
    display: block;
    width: 80%;
    margin: 0 auto;
}
</style>