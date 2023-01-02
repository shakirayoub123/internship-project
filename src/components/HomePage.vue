<template>
  <Header/>
  <table class="table mt-4">
    <tr class="table-primary font-weight-bold">
      <td>Id</td>
      <td>Title</td>
      <td>Completed</td>
      <td>Actions</td>
      <td>Delete</td>
    </tr>
    <tr v-for="item in todolist" :key="item.id">
      <td>{{ item.id }}</td>
      <td>{{ item.title }}</td>
      <td>{{ item.completed }}</td>
      <td id="update">
        <router-link :to="'/updateTodo/'+item.id">Edit</router-link>
      </td>
      <button class="btn btn-danger mt-2" @click="deleteTodo(item.id)">Delete</button>
    </tr>
  </table>
</template>

<script>
import axios from "axios";
import Header from "@/components/Header.vue";

export default {
  name: 'HomePage',

  data() {
    return {
      todolist: [],
    }
  },
  components: {
    Header
  },
  methods:{
    async deleteTodo(id){

      console.warn(id)
      let result= await axios.delete("http://localhost:3000/todolist/"+ id)
      if (result.status===200)
      {
        this.loadData()
        // alert("Deleted Successfully")

      }
    },
    async loadData(){
      let result = await axios.get("http://localhost:3000/todolist")
      console.log("result", result)
      this.todolist = result.data
    }

  },
  mounted(){
    this.loadData()
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