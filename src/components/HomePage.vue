<!--<template>-->
<!--  <Header/>-->
<!--  <table class="table mt-4">-->

<!--    <tr class="table-primary font-weight-bold">-->
<!--      <td>Id</td>-->
<!--      <td>Title</td>-->
<!--      <td>Completed</td>-->
<!--      <td>Actions</td>-->
<!--      <td>Delete</td>-->
<!--    </tr>-->
<!--    <tr v-for="todo in  allTodos" :key="todo.id"-->
<!--        :class="{ completed: todo.completed }">-->
<!--      <td>{{ todo.id }}</td>-->
<!--      <td><input type="checkbox" v-model="todo.completed">-->
<!--        {{ todo.title }}-->
<!--      </td>-->
<!--      <td>{{ todo.completed }}</td>-->
<!--      <td id="update">-->
<!--        <router-link :to="'/updateTodo/'+todo.id">Edit</router-link>-->
<!--      </td>-->
<!--      <button class="btn btn-danger mt-2" @click="deleteTodo(todo.id)">Delete</button>-->
<!--    </tr>-->
<!--  </table>-->
<!--&lt;!&ndash;    pagination&ndash;&gt;-->
<!--  <div class="pagination">-->
<!--    <button class="btn btn-outline-primary" @click="prevPage" :disabled="currentPage === 1">Prev</button>-->
<!--    <button class="btn btn-outline-primary ml-1" @click="nextPage" :disabled="currentPage === totalPages">Next</button>-->
<!--  </div>-->


<!--</template>-->

<!--<script>-->
<!--import axios from "axios";-->
<!--import Header from "@/components/Header.vue";-->
<!--import {mapGetters, mapActions} from "vuex";-->

<!--export default {-->
<!--  name: 'HomePage',-->

<!--  data() {-->
<!--    return {-->
<!--      items: [],-->
<!--      currentPage: 1,-->
<!--      perPage: 5,-->
<!--      totalPages: 0,-->
<!--      search: '',-->
<!--    }-->
<!--  },-->
<!--  components: {-->
<!--    Header,-->
<!--  },-->
<!--  methods: {-->
<!--    ...mapActions(['fetchTodos', "deleteTodo"]),-->
<!--    prevPage() {-->
<!--      if (this.currentPage > 1) this.currentPage&#45;&#45;-->
<!--    },-->
<!--    nextPage() {-->
<!--      if (this.currentPage < this.totalPages) this.currentPage++-->
<!--    },-->
<!--  },-->

<!--  computed: mapGetters(['allTodos']),-->
<!--  paginatedItems() {-->
<!--    //   pagination-->
<!--    this.totalPages = Math.ceil(this.items.length / this.perPage)-->
<!--    return this.items.slice((this.currentPage - 1) * this.perPage, this.currentPage * this.perPage)-->

<!--},-->
<!--  created() {-->
<!--    this.$store.dispatch('fetchTodos')-->
<!--  },-->
<!--}-->
<!--</script>-->

<!--<style scoped>-->

<!--#update a {-->
<!--  text-decoration: none;-->
<!--  color: orangered;-->
<!--}-->

<!--.completed {-->
<!--  /*text-decoration: line-through;*/-->
<!--  font-weight: bold;-->
<!--  background-color: antiquewhite;-->
<!--  /*border-color: #ddd;*/-->
<!--}-->

<!--#update :hover {-->
<!--  background-color: dodgerblue;-->
<!--  color: white;-->
<!--}-->
<!--</style>-->

<!--new code trying-->
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
    <tr v-for="todo in  displayedPosts" :key="todo.id"
        :class="{ completed: todo.completed }">
      <td>{{ todo.id }}</td>
      <td><input type="checkbox"  v-model="todo.completed">
        {{todo.title}}
      </td>
      <td>{{ todo.completed }}</td>
      <td id="update">
        <router-link :to="'/updateTodo/'+todo.id">Edit</router-link>
      </td>
      <button class="btn btn-danger mt-2" @click="deleteTodo(todo.id)">Delete</button>
    </tr>
  </table>
  <!--  pagination-->
  <div class="pagination">

    <button  class="btn btn-outline-primary"  v-if="page != 1" @click="page--"> Prev</button>
    <button  @click="page++" v-if="page < pages.length" class="btn btn-outline-primary ml-2"> Next </button>

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
      items: [],
      currentPage: 1,
      perPage: 5,
      totalPages: 0,
      search: '',
      page: 1,
      pages: [],
    }
  },
  components: {
    Header,
  },
  methods:{
  ...mapActions(['fetchTodos',"deleteTodo"]),

    setPages() {

      let numberOfPages = Math.ceil(this.todos.length / this.perPage);

      for (let index = 1; index <= numberOfPages; index++) {

        this.pages.push(index);
      }
    },
    paginate() {
      let page = this.page;

      let perPage = this.perPage;

      let from = (page * perPage) - perPage;

      let to = (page * perPage);

      return this.todos.slice(from, to);
    },
  },

  computed: {
    displayedPosts() {
      return this.paginate();
    },
    todos() {
      return this.$store.state['todos']
    },
  },
  watch: {
    todos() {
      this.setPages();
    },
  },

  created() {
    // this.$store.dispatch('fetchTodos');
    this.fetchTodos()
  },
}
</script>

<style scoped>

#update a {
  text-decoration: none;
  color: orangered;
}
.completed {
     /*text-decoration: line-through;*/
     font-weight: bold;
     background-color: antiquewhite;
    border-color: #ddd;
    }

#update :hover {
  background-color: dodgerblue;
  color: white;
}
</style>