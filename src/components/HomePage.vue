<template>
  <Header/>
  <input type="text" class="form-control mt-4" v-model="search" placeholder="search here..">
  <table class="table mt-4">

    <tr class="table-primary font-weight-bold">
      <td>Id</td>
      <td>Title</td>
      <td>Completed</td>
      <td>Actions</td>
      <td>Delete</td>
    </tr>
    <tr v-for="todo in allTodos"
        :key="todo.id"
        @dblclick="onDblClick(todo)"
        class="todo"
        v-bind:class="{'is-completed':todo.completed}"
    >
      <td>{{ todo.id }}</td>
      <td>{{ todo.title }}</td>
      <td>{{ todo.completed }}</td>
      <td id="update">
        <router-link :to="'/updateTodo/'+todo.id">Edit</router-link>
      </td>
      <button class="btn btn-danger mt-2" @click="deleteTodo(todo.id)">Delete</button>
    </tr>
  </table>
  <!--  pagination-->
  <div class="pagination">
    <button class="btn btn-outline-primary" @click="prevPage" :disabled="currentPage === 1">Prev</button>
    <button class="btn btn-outline-primary ml-1" @click="nextPage" :disabled="currentPage === totalPages">Next</button>
  </div>

</template>

<script>
import axios from "axios";
import Header from "@/components/Header.vue";
import {mapGetters, mapActions} from "vuex";

export default {
  name: 'HomePage',

  data() {
    return {

      currentPage: 1,
      perPage: 5,
      totalPages: 0,
      search: '',
    }
  },
  components: {
    Header,
  },
  methods: {
    ...mapActions(['fetchTodos', "deleteTodo", "updateTodo"]),
    onDblClick(todo){
      const updatedTodo={
        id:todo.id,
        title:todo.title,
        computed: !todo.completed
      }
      this.updateTodo(updatedTodo)
    },
    prevPage() {
      if (this.currentPage > 1) this.currentPage--
    },
    nextPage() {
      if (this.currentPage < this.totalPages) this.currentPage++
    },
  },

  computed: mapGetters(['allTodos']),

  created() {
    this.fetchTodos()
  },
  newtodolist() {
    //   pagination
    this.totalPages = Math.ceil(this.todolist.length / this.perPage)
    return this.todolist.slice((this.currentPage - 1) * this.perPage, this.currentPage * this.perPage)


  },
}
</script>

<style scoped>

#update a {
  text-decoration: none;
  color: orangered;
}
.completed{
  text-decoration: line-through;
}

#update :hover {
  background-color: dodgerblue;
  color: white;
}
</style>