<template>
  <!--  <input type="text" class="form-control mt-4" v-model="search" placeholder="search here..">-->
  <!--  <select v-on:change="filterTodos($event)">-->
  <!--    <option>select</option>-->
  <!--    <option value="5">5</option>-->
  <!--    <option value="10">10</option>-->
  <!--    <option value="20">20</option>-->
  <!--    <option value="50">50</option>-->
  <!--    <option value="100">100</option>-->
  <!--    <option value="200">200</option>-->
  <!--  </select>-->
  <!--    pagination-->
<!--  <div v-on:change="filterTodos($event)">-->
<!--    <button value="1">prev</button>-->
<!--    <button value="2">next</button>-->
<!--  </div>-->
<!--  <div class="pagination">-->
<!--    <button class="btn btn-outline-primary" @click="prevPage" :disabled="currentPage === 1">Prev</button>-->
<!--    <button class="btn btn-outline-primary ml-1" @click="nextPage" :disabled="currentPage === totalPages">Next</button>-->
<!--  </div>-->
</template>

<script>
import {mapActions} from "vuex";

export default {
  name: 'FilterTodos',
  data(){
    return{
      items: [],
      currentPage: 1,
      perPage: 5,
      totalPages: 0,
      search: '',
    }
  },
  methods: {
    ...mapActions(['filterTodos']),
    // prevPage() {
    //   if (this.currentPage > 1) this.currentPage--
    // },
    // nextPage() {
    //   if (this.currentPage < this.totalPages) this.currentPage++
    // },
    // Pagination() {
    //   //   pagination
    //   this.totalPages = Math.ceil(this.items.length / this.perPage)
    //   return this.items.slice((this.currentPage - 1) * this.perPage, this.currentPage * this.perPage)
    //
    // },

  }


}
</script>

<style scoped>
select {
  margin-bottom: 10px;

}

</style>