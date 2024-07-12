<template>
  <div class="bills">
    <div class="row border-bottom pb-3 mb-3">
      <div class="col">
        <h1 class="h3"><i class="fa-solid fa-angle-down me-2" />Liste des factures</h1>
      </div>
      <div class="col text-end">
        <button @click="$router.push({ name: 'create-bill' })" class="btn btn-outline-primary">
          <i class="fa-solid fa-plus-circle me-2" />
          Ajouter une facture
        </button>
      </div>
    </div>

    <TableList>
      <BillTableRow
        v-for="bill in bills"
        :key="bill.id"
        :bill="bill"
        @edit="$router.push({ name: 'edit-bill', params: { id: bill.id } })"
        @delete="deleteBill(bill.id)"
      />
    </TableList>

    <AppDebug :datas="bills" />
  </div>
</template>

<script>
import BillTableRow from '@/components/tables/BillTableRow.vue'
import TableList from '@/components/tables/TableList.vue'
import { useBillStore } from '@/stores/bill'
import { mapActions, mapState } from 'pinia'

export default {
  components: {
    TableList,
    BillTableRow
  },
  computed: {
    ...mapState(useBillStore, {
      bills: 'items'
    })
  },
  methods: {
    ...mapActions(useBillStore, {
      deleteBill: 'deleteItem',
      fetchBills: 'fetchBills'
    })
  },
  created() {
    this.fetchBills();
  }
}
</script>