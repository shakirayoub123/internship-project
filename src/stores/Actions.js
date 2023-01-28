import axios from "axios"
export default {
    async addTodo({commit}, title) {
        const result = await axios.post(`http://localhost:3000/todolist/`,
            {title:title, completed: false})
        commit('addTodo', result.data)
    },
}
