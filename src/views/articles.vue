<template>
    <v-app>
        <v-content>
            <v-container>
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
                            </div>
                            <v-card-actions>
                                <v-row class="my-3" align="center" justify="center">
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
                    </v-col>
                </v-row>
            </v-container>
        </v-content>
    </v-app>
</template>
<script>
import axios from 'axios'
// audio.addEventListener("ended", function () {
//     audio.currentTime = 0;
// }, false);

export default {
    data(){
        return{
            article:[],
            link:'',
            show:true,
            currentTime:0,
            value:0,
            parsentValue:0,
            showValue:'00:00',
            duration:0,
            audio:''
        }
    },
    methods:{
        getUser(){
            let token =localStorage.getItem('access_token')
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
        },
        audioStart(){
            this.audio.play();
            this.show = !this.show
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
        }
    },
    mounted(){
        axios.get('http://127.0.0.1:8000/api/article?url='+this.$route.query.url).then((res) => {
            this.article= res.data
            this.audio = new Audio('https://news-voice.s3.amazonaws.com/'+res.data.s3_file_path+'.mp3')
            this.duration=this.toMs(this.audio.duration)
            this.currentTime =this.toMs(this.audio.currentTime)
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
<style scoped>
.v-progress-linear {
    display: block;
    width: 80%;
    margin: 0 auto;
}
</style>