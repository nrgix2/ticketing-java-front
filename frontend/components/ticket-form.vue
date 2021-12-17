<template>
  <span>
    <div class="form-group">
      <label for="edit-description">Name</label>
      <textarea class="form-control" id="edit-name" rows="3" v-model="theTicket.name"></textarea>
    </div>
    <div class="form-group">
      <label for="edit-price">Description <span class="glyphicon"></span></label>
      <input type="text" class="form-control" id="edit-description" v-model="theTicket.description"/>
    </div>
  </span>
</template>

<script>
  export default {
     name: 'TicketForm',
    props: ['theTicket']
  }
</script>
