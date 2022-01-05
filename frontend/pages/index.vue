<template>
  <section>
    <div class="actions">
      <nuxt-link class="btn btn-default" :to="{ path: '/product/create' }">
        <span class="glyphicon glyphicon-plus"></span>
        Add ticket
      </nuxt-link>
      <div class="btn btn-info" @click="fetch">Charger les données</div>
    </div>
    <div class="filters row">
      <div class="form-group col-sm-3">
        <label for="search-element">ticket name</label>
        <input
          v-model="searchKey"
          class="form-control"
          id="search-element"
          requred
        />
      </div>
    </div>
    <table class="table">
      <thead>
        <tr>
          <th>Ticket Title</th>
          <th>Description</th>
          <th class="col-sm-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="ticket in tickets" :key="ticket.id">
          <td>
            <div>{{ ticket.id + " - " + ticket.name }}</div>
          </td>
          <td>{{ ticket.status }}</td>
          <td class="btn-control">
            <nuxt-link class="btn btn-warning btn-xs btn-edit" :to="{ path: '/product/edit' }">
              <span class="glyphicon glyphicon-edit"></span>
              Edit
            </nuxt-link>
            <nuxt-link class="btn btn-danger btn-xs" :to="{ path: '/product/delete' }">
              <span class="glyphicon glyphicon-remove"></span>
              Delete
            </nuxt-link>
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script>
import Axios from "Axios";

export default {
  created() {},
  layout: "vue-crud",
  data() {
    return { searchKey: "", tickets: {} };
  },
  computed: {
    filteredtickets() {
      return this.tickets.filter(
        (ticket) =>
          ticket.description
            .toLowerCase()
            .indexOf(this.searchKey.toLowerCase()) !== -1
      );
    },
  },
  methods: {
    deleteTicketById(id) {
      let foundIndex = this.tickets.findIndex((p) => p.id === id);
      Axios.delete("http://localhost:8080/ticket/?id=" + id).then(
        (response) => {
          this.tickets.splice(foundIndex, 1);
          console.log(this.tickets);
        }
      );
    },
    updateTicket(ticket) {
      let foundIndex = this.tickets.findIndex((p) => p.id === this.tickets.id);
      console.log("update " + foundIndex + this.tickets.name);
      //
    },
    async fetch() {
      // Fetche data from API local
      this.tickets = await fetch(
        "http://localhost:8080/tickets/all"
      ).then((res) => res.json());
      console.log(this.tickets);
    },
  },

  components: {},
};
</script>

<style>
.btn-control{
  display: flex;
}
.btn-edit{
  margin-right: 15px;
}

.form-group {
  max-width: 500px;
}

.actions {
  padding: 10px 0;
}

.glyphicon-euro {
  font-size: 12px;
}
</style>
