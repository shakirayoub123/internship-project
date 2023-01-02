<template>
  <Header/>


  <div class="card card-primary mt-4">
    <div class="card-header">
      <h3 class="card-title">Add Todo</h3>
    </div>
    <Form @submit="addTodo">
      <div class="card-body">
        <div class="form-group">
          <Field type="number" class="form-control" placeholder="Enter id" v-model="todolist.id" name="id"/>
<!--          <ErrorMessage class="text-red" name="id" />-->
        </div>
        <div class="form-group">
          <Field type="text" class="form-control" placeholder="Enter title" v-model="todolist.title" name="title"/>
          <ErrorMessage class="text-red" name="title" />
        </div>
        <div class="form-group">
          <Field type="text" class="form-control" placeholder="Enter task" v-model="todolist.completed"
                 name="completed"/>
          <ErrorMessage class="text-red" name="completed" />
        </div>
      </div>
      <!-- /.card-body -->



    </Form>
    <div class="card-footer">
      <button type="submit" class="btn btn-primary" @click="addTodo">Add Todo</button>
    </div>
  </div >


</template>

<script>
import axios from "axios";
import Header from "@/components/Header.vue";
import { Form, Field, ErrorMessage } from "vee-validate";

export default {
  data() {
    return {
      todolist: {
        id: null,
        title: '',
        completed: '',
        loading: false
      }
    }
  },
  components: {Header, Form, Field, ErrorMessage},
  methods: {
     addTodo() {
      if (this.title === '' || this.completed === '') {
        return false
      } else {
        this.loading = true;
         axios.post('http://localhost:3000/todolist/', {
          id: this.todolist.id,
          title: this.todolist.title,
          completed: this.todolist.completed
        });
        // if (result.status == 201) {
        //   this.$router.push('/homepage')
        //
        // }
        this.$swal({
          icon: 'success',
          title: 'Success...',
          text: this.res,
          timer: 1500
        });
        this.$router.push('/homepage')
        // console.warn("result", result)

      }
    }
  }
}
</script>

<style scoped>
.card {
  width: 500px;
  margin-left: auto;
  margin-right: auto;
}

.card-body {
  width: 400px;
  margin: auto;
}



h2 {
  text-align: center;
}

button {
  height: 40px;
  width: 260px;
  margin-left: 89px;
}

</style>