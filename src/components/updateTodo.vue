<template>
  <Header />
  <div class="card card-primary mt-4">
    <div class="card-header">
      <h3 class="card-title">Update Todo</h3>
    </div>
    <form>
      <div class="card-body">
        <div class="form-group">
          <input type="number" class="form-control" placeholder="Enter id" v-model="todolist.id" name="id">
        </div>
        <div class="form-group">
          <input type="text" class="form-control" placeholder="Enter title" v-model="todolist.title" name="title">
        </div>
        <div class="form-group">
          <input type="text" class="form-control" placeholder="Enter task" v-model="todolist.completed"
                 name="completed">
        </div>
      </div>
      <!-- /.card-body -->

      <div class="card-footer">
        <button type="submit" class="btn btn-primary" @click.prevent="updateTodo">Update Todo</button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import Header from "@/components/Header.vue";


export default {
  components: {Header},
  data(){
    return{
      todolist: {
        id: '',
        title: '',
        completed: '',
        url : 'http://localhost:3000/todolist',
      }
    }
  },
  methods: {
    async updateTodo() {
        const result=await axios.put('http://localhost:3000/todolist/' + this.$route.params.id,{
          id:this.todolist.id,
          title:this.todolist.title,
          completed: this.todolist.completed
        });
        console.log(result)
        // if(result.status==201)
        // {
        //   this.$router.push('/homepage')
        // }

      this.$swal({
        icon: 'success',
        title: 'Todo Updated',
        text: this.res,
        timer: 1500
      });
      this.$router.push('/homepage')
        console.warn('updated data', this.todolist)
      }

    },
    async mounted() {
      const result = await axios.get('http://localhost:3000/todolist/' + this.$route.params.id)
      // console.warn(this.$route.params.id)
      //console.warn(result.data);
      this.todolist = result.data
    }
  }

</script>

<style  scoped>
.card {
  width: 500px;
  margin-left: auto;
  margin-right: auto;
}

.card-body {
  width: 400px;
  margin: auto;
}
h2{
  text-align: center;
}
button{
  height:40px;
  width:260px;
  margin-left: 89px;
}
</style>