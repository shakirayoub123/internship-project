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
    <tr v-for="item in newtodolist" :key="item.id">
      <td>{{ item.id }}</td>
      <td>{{ item.title }}</td>
      <td>{{ item.completed }}</td>
      <td id="update">
        <router-link :to="'/updateTodo/'+item.id">Edit</router-link>
      </td>
      <button class="btn btn-danger mt-2" @click="deleteTodo(item.id)">Delete</button>
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


export default {
  name: 'HomePage',

  data() {
    return {
      todolist: [],
      currentPage: 1,
      perPage: 5,
      totalPages: 0,
      // items: [],
      search: '',
    }
  },
  components: {
    Header,
  },
  methods: {
    prevPage() {
      if (this.currentPage > 1) this.currentPage--
    },
    nextPage() {
      if (this.currentPage < this.totalPages) this.currentPage++
    },
    async deleteTodo(id) {
      let result = await axios.delete("http://localhost:3000/todolist/" + id)
      if (result.status === 200) {
        this.loadData()

      }
      this.$swal({
        title: "Are you sure ?",
        text: "You will not be able to recover this environment !",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Yes, delete it !",
        cancelButtonText: "No, cancel !",
        closeOnConfirm: false,
        closeOnCancel: false
      });
    },
    async loadData() {
      let result = await axios.get("http://localhost:3000/todolist")
      console.log("result", result)

      this.todolist = result.data
      // this.$swal("Cancelled", "Your environment has not been deleted !", "error")
    }
  },

  computed: {
    users() {
      return this.$store.state['users'];
    },
    newtodolist() {
      //   pagination
      this.totalPages = Math.ceil(this.todolist.length / this.perPage)
      return this.todolist.slice((this.currentPage - 1) * this.perPage, this.currentPage * this.perPage)

    },
  //   newtodolist(){
  //     // return this.todolist.filter((item) => {
  //     //   return item.title.match(this.search)
  //     // })
  //
  //   }
  },
  mounted() {
    this.loadData()
    this.$store.dispatch('fetchUsers');
  }
}
</script>

<style scoped>

#update a {
  text-decoration: none;
  color: orangered;
}

#update :hover {
  background-color: dodgerblue;
  color: white;
}
</style>