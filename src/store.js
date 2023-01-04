import {createStore} from "vuex";
import axios from "axios";

const store = createStore({
    state(){
        return{
            users:[],
            id:null,
        }
    },
    /* ?_limit=5*/
    actions:{
        async fetchUsers({ commit }) {
            try {
                const data = await axios.get('http://localhost:3000/todolist/');
                commit("SET_USERS", data.data);
            } catch (error) {
                alert(error);
                console.log(error);
            }
        },
    },
    mutations:{
        SET_USERS(state, users) {
            state.users = users;
        },
    },
    getters:{
        getUsers(state){
            return state.users;
        }
    }

})
export default store