<template>
  <div class="container py-4">
    <AppHeader />
    <main class="border p-4 rounded-bottom shadow bg-white">
      <RouterView v-slot="{ Component, route }">
        <transition name="slide-fade">
          <component :is="Component" :key="route.path" />
        </transition>
      </RouterView>
    </main>
  </div>
</template>

<script>
import AppHeader from '@/components/AppHeader.vue'
import { RouterView } from 'vue-router'
import { useClientStore } from '@/stores/client'
import { useBillStore } from '@/stores/bill'

export default {
  components: {
    RouterView,
    AppHeader
  },
  setup() {
    const clientStore = useClientStore()
    const billStore = useBillStore()

    clientStore.fetchClients()
    billStore.fetchBills()
  }
}
</script>

<style>
  .container {
    max-width: 1320px;
  }
</style>