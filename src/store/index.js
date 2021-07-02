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
            state.user = user;
            state.userStatus = Boolean(user)
        },
        authUser(state){
            return state.userStatus;
        }
    },
    actions: {
    },
});