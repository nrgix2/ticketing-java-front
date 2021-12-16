<template>
  <section>
    <div class="actions">
      <nuxt-link class="btn btn-default" :to="{ path: '/add-ticket' }">
        <span class="glyphicon glyphicon-plus"></span>
        Add ticket
      </nuxt-link>
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
          <td>
            <div
              class="btn btn-warning btn-xs"
              @click="updateTicketById(ticket)"
            >
              <i class="far fa-edit"></i>Edit
            </div>
            <div
              @click="deleteTicket(ticket.id)"
              class="btn delete btn-danger btn-xs"
            >
              X<i class="far fa-trash-alt"></i>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script>
// import { log } from "console";
import axios from "axios";

export default {
  async fetch() {
    this.tickets = await fetch(
      "http://localhost:8080/tickets/all"
    ).then((res) => res.json());
    console.log(this.tickets);
  },
  created() {
    // POST request using axios with error handling
  },
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
      // console.log("delete " + this.ticket.name);
      if (foundIndex !== -1) this.tickets.splice(foundIndex, 1);
      fetch("http://localhost:8080/tickets/?id=", id)
        .then((response) => (this.ticket = response.ticket))
        .catch((error) => {
          this.errorMessage = error.message;
          console.error("There was an error!", error);
        });
      // Simple DELETE request with fetch
      // const element = document.querySelector("#delete-request .status");
      // fetch("https://reqres.in/api/posts/1", { method: "DELETE" }).then(
      //   () => (element.innerHTML = "Delete successful")
      // );
    },
    deleteTicket(id) {
       let foundIndex = this.tickets.findIndex((p) => p.id === id);
      axios
        .delete("http://localhost:8080/ticket/?id=" + id)
        .then((response) => {
          this.tickets.splice(foundIndex, 1)
          console.log(this.tickets);
        });
    },
    updateTicketById(ticket) {
      let foundIndex = this.tickets.findIndex((p) => p.id === this.tickets.id);
      console.log("update " + foundIndex + this.tickets.name);
      //
    },
    // async getAllUsers({ $axios, $config }) {
    //   const users = await $axios.$get(`/users/all`);
    //   return { users };
    // },
    // async getAllTickets({ $axios, $config }) {
    //   const tickets = await $axios.$get(`/tickets/all`);
    //   console.log(tickets);
    //   return { tickets };
    // },
    // async getAllTickets() {
    //   const res = await this.$axios.$get("users/all");
    //   this.res = res;
    //   console.log(res);
    // },
    // mounted() {
    //   getAllTickets();
    // },
  },
  components: {},
};
</script>

<style>
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
