<template>
    <tr>
      <td class="align-middle">{{ client.firstName }}</td>
      <td class="align-middle">{{ client.lastName }}</td>
      <td class="align-middle">{{ client.companyName }}</td>
      <td class="align-middle d-flex gap-2 justify-content-end align-items-center">
        <button @click="onDelete()" class="btn btn-outline-danger">
          <i class="fa-solid fa-trash me-2" />Supprimer
        </button>
        <button @click="onEdit()" class="btn btn-outline-info">
          <i class="fa-solid fa-pen me-2" />Editer
        </button>
      </td>
    </tr>
  </template>
  
  <script>
  export default {
    props: {
      client: {
        type: Object,
        required: true
      }
    },
    emits: ['delete', 'edit'],
    methods: {
      onDelete() {
        this.$emit('delete', this.client)
      },
      onEdit() {
        this.$emit('edit', this.client)
      }
    }
  }
  </script>  