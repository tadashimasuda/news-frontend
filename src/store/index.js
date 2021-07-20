import Vue from 'vue';
import Vuex from 'vuex';

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
    },
});