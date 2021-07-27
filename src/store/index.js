import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        user: {},
        userStatus:false
    },
    mutations: {
        setUser(state, user) {
            state.user = user.user;
            state.userStatus = Boolean(user)
        },
        clearUser(state){
            state.user = ''
            state.userStatus = false
        },
        authUser(state){
            return state.userStatus;
        }
    },
    getters: {
        authenticated(state) {
            return state.userStatus;
        },
        user(state) {
            return state.user;
        }
    },
    actions: {
        async getUser({commit}){
            await axios.get('/user',{
                headers:{
                    "Authorization":"Bearer " + localStorage.getItem('access_token')
                }
            }).then((res) => {
                commit('setUser',{ user: res.data.user });
            }).catch((e) => {
                if (e.response.status != 401) {
                    console.log(e);
                }
            });
        }
    },
});