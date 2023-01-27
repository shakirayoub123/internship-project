<template>
  <Header/>
  <div class="card card-primary mt-4">
    <div class="card-header">
      <h3 class="card-title">Add Todo</h3>
    </div>
      <div class="card-body">
    <form @submit="onSubmit">
      <input type="text" class="form-control " placeholder="Enter todo" v-model="title" data-test="todo" required/>
      <input type="submit" data-test="todo" class="btn btn-primary mt-3" value="Add Todo">
      <input type="submit" data-test="todo" @click= "cancelFunc" class="btn btn-secondary mt-3 float-right" value="Cancel">
    </form>
      </div>
  </div >
</template>

<script>
// import axios from "axios";
import Header from "@/components/Header.vue";
import { Form, Field, ErrorMessage } from "vee-validate";
import {mapActions} from "vuex";

export default {
  data() {
    return {
      title: '',
      loading: false
    }
  },
  components: {Header, Form, Field, ErrorMessage},
  methods: {
    cancelFunc(){
      this.$router.push('/homepage')
    },
    ...mapActions(["addTodo"]),
    onSubmit(event) {
      event.preventDefault();
      this.addTodo(this.title);
      this.title = ''
      this.$swal({
        icon: 'success',
        title: 'Todo Added',
        text: this.res,
        timer: 2500
      });
      this.$router.push('/homepage')
      // console.warn("result", result)
    }
},
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