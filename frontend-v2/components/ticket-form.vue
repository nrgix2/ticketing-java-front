<template>
  <span>
    <div class="form-group">
      <label for="edit-name">Name</label>
      <textarea
        class="form-control"
        id="edit-name"
        rows="3"
        v-model="theTicket.name"
      ></textarea>
    </div>
    <div class="form-group">
      <label for="edit-status">Status <span class="glyphicon"></span></label>
      <input
        list="status"
        class="form-control"
        id="edit-status"
        v-model="theTicket.status"
      />
       <datalist id="status">
        <option value="Ouvert"> </option>
        <option value="Fermée"> </option>
        <option value="En cours"> </option>
        <option value="En attente"> </option>
      </datalist>
    </div>
    <div class="form-group">
      <label for="edit-description"
        >Description <span class="glyphicon"></span
      ></label>
      <input
        type="text"
        class="form-control"
        id="edit-description"
        v-model="theTicket.description"
      />


    </div>
  </span>
</template>

<script>
export default {
  name: "TicketForm",
  props: ["theTicket"],
};
</script>
<style>
section{
      padding: 5rem 3.5rem;

}
</style>
