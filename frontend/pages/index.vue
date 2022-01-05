<template>
  <section>
    <div class="actions">
      <nuxt-link class="btn btn-default" @click="fetch" :to="{ path: '/index_users' }">
        Go to users
      </nuxt-link>
      <nuxt-link class="btn btn-default" :to="{ path: '/create' }">
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
          <th>Status</th>
          <th>Admin Name</th>
          <th>User Name</th>
          <th class="col-sm-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="ticket in tickets" :key="ticket.id">
          <td>
            <div>{{ ticket.id + " - " + ticket.name }}</div>
          </td>
          <td>{{ ticket.description }}</td>
          <td>{{ ticket.status }}</td>
          <td>{{ ticket.admin.firstname + ' ' + ticket.admin.lastname}}</td>
          <td>{{ ticket.user.firstname + ' ' + ticket.user.lastname}}</td>
          <td>
            <div
              class="btn btn-warning btn-xs"
              @click="updateTicket(ticket)"
            >
              <i class="far fa-edit"></i>Edit
            </div>
            <div
                class="btn btn-warning btn-xs"
                @click="sendMail(ticket)"
            >
              <i class="far fa-edit"></i>Send Email
            </div>
            <div
              @click="deleteTicketById(ticket.id)"
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
import Axios from "Axios";

export default {
  async fetch() {
    // Fetche data from API local 
    this.tickets = await fetch(
      "http://localhost:8080/tickets/all"
    ).then((res) => res.json());
    console.log(this.tickets);
  },
  created() {
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

    sendMail(ticket) {
      let foundIndex = this.tickets.findIndex((p) => p.id === ticket.id);
      Axios.put("http://localhost:8080/sendMail/?email=" + ticket.user.email +"&status=" + ticket.status).then(
          (response) => {
            this.tickets.splice(foundIndex, 1);
            console.log(this.tickets);
          }
      );
    },
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
