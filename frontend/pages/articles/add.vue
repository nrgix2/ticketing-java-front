<template>
  <div>
    <h1>Add New Article</h1>
    <hr>

    <div class="row">
      <div class="col-md-6">
        <form action=""
          method="post"
          @submit.prevent="submitForm()">

          <div class="form-group">
            <label for="">Name</label>
            <input type="text" class="form-control"
              :class="{ 'is-invalid': errors && errors.name }"
              v-model="name">
            <div class="invalid-feedback" v-if="errors && errors.name">
              {{ errors.name.msg }}
            </div>
          </div>

          <div class="form-group">
            <label for="">Status</label>
            <input type="text" class="form-control"
              :class="{ 'is-invalid': errors && errors.status }"
              v-model="status">
            <div class="invalid-feedback" v-if="errors && errors.status">
              {{ errors.status.msg }}
            </div>
          </div>

          <div class="form-group">
            <label for="">Description</label>
            <textarea cols="30" rows="4" class="form-control"
              :class="{ 'is-invalid': errors && errors.description }"
              v-model="description"></textarea>
            <div class="invalid-feedback" v-if="errors && errors.description">
              {{ errors.description.msg }}
            </div>
          </div>

          <input type="submit" value="Submit" class="btn btn-primary mr-3">
          <nuxt-link to="/articles" class="btn btn-secondary mr-3">Cancel</nuxt-link>

        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  middleware: 'auth',

  data(){
    return{
      errors:null,
      name:null,
      status:null,
      description:null
    }
  },

  methods:{
    submitForm(){
      this.$axios.post( 'http://localhost:8080/tickets', {
          name: this.name,
          status: this.status,
          description: this.description,
        })
        .then((response) => {
          console.log(response)

          if(response.data._id){
            this.$router.push({ name:'tickets', params:{ created:'yes' } })
          }
        })
        .catch( (error) => {
          console.log(error)
          if(error.response.data.errors){
            this.errors = error.response.data.errors
          }
        });
    }
  }
}
</script>
