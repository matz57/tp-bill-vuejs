<template>
  <div class="clients">
    <div class="row border-bottom pb-3 mb-3">
      <div class="col">
        <h1 class="h3"><i class="fa-solid fa-angle-down me-2" />Liste des clients</h1>
      </div>
      <div class="col text-end">
        <button @click="$router.push({ name: 'create-client' })" class="btn btn-outline-primary">
          <i class="fa-solid fa-plus-circle me-2" />
          Ajouter un client
        </button>
      </div>
    </div>

    <TableList>
      <ClientTableRow
        v-for="client in clients"
        :key="client.id"
        :client="client"
        @edit="$router.push({ name: 'edit-client', params: { idclient: client.id } })"
        @delete="deleteClient(client.id)"
      />
    </TableList>

    <AppDebug :datas="clients" />
  </div>
</template>

<script>
import ClientTableRow from '@/components/tables/ClientTableRow.vue'
import TableList from '@/components/tables/TableList.vue'
import { useClientStore } from '@/stores/client'
import { mapActions, mapState } from 'pinia'

export default {
  components: {
    TableList,
    ClientTableRow
  },
  computed: {
    ...mapState(useClientStore, {
      clients: 'items'
    })
  },
  methods: {
    ...mapActions(useClientStore, {
      deleteClient: 'deleteItem',
      fetchClients: 'fetchClients'
    })
  },
  created() {
    this.fetchClients();
  }
}
</script>