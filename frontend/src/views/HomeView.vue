<template>
  <div class="home-view">
    <div class="columns">
      <div class="column-left">
        <div class="chart-container">
          <canvas id="statsChart"></canvas>
          <div class="stats">
            <div>Total encaissée TTC: {{ totalEncaisseTTC }} €</div>
            <div>Total Facturé TTC: {{ totalFactureTTC }} €</div>
            <div>Dû à plus d'un mois TTC: {{ duePlusDunMoisTTC }} €</div>
          </div>
        </div>
      </div>
      <div class="column-right">
        <BillsView />
        <ClientsView />
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, watch } from 'vue';
import { useBillStore } from '../stores/bill.js';
import Chart from 'chart.js/auto';
import BillsView from './BillsView.vue';
import ClientsView from './ClientsView.vue';
import router from '../router';

export default {
  components: {
    BillsView,
    ClientsView
  },
  setup() {
    const totalEncaisseTTC = ref(0);
    const totalFactureTTC = ref(0);
    const duePlusDunMoisTTC = ref(0);

    const billStore = useBillStore();

    const calculateStatistics = () => {
      const now = new Date();
      totalEncaisseTTC.value = billStore.items.reduce((sum, bill) => sum + bill.paid, 0);
      totalFactureTTC.value = billStore.items.reduce((sum, bill) => sum + bill.totalTTC, 0);
      duePlusDunMoisTTC.value = billStore.items
        .filter(bill => (now - new Date(bill.date)) > 30 * 24 * 60 * 60 * 1000)
        .reduce((sum, bill) => sum + (bill.totalTTC - bill.paid), 0);
    };

    onMounted(() => {
      billStore.fetchBills().then(() => {
        calculateStatistics();
        const ctx = document.getElementById('statsChart').getContext('2d');
        new Chart(ctx, {
          type: 'doughnut',
          data: {
            labels: ['Total encaissée TTC', 'Total Facturé TTC', 'Dû à plus d\'un mois TTC'],
            datasets: [{
              data: [totalEncaisseTTC.value, totalFactureTTC.value, duePlusDunMoisTTC.value],
              backgroundColor: ['#36A2EB', '#FFCE56', '#FF6384']
            }]
          },
          options: {
            responsive: true,
            plugins: {
              legend: {
                position: 'top'
              }
            }
          }
        });
      });
    });

    watch(
      () => billStore.items,
      (newVal, oldVal) => {
        if (newVal.length !== oldVal.length) {
          calculateStatistics();
        }
      }
    );

    const addBill = () => {
      router.push({ name: 'create-bill' });
    };

    const addClient = () => {
      router.push({ name: 'create-client' });
    };

    return {
      totalEncaisseTTC,
      totalFactureTTC,
      duePlusDunMoisTTC,
      addBill,
      addClient
    };
  }
};
</script>

<style scoped>
.home-view {
  display: flex;
  justify-content: space-between;
  padding: 20px;
}

.columns {
  display: flex;
  width: 100%;
}

.column-left, .column-right {
  flex: 1;
  margin: 10px;
}

.chart-container {
  position: relative;
  width: 100%;
  max-width: 500px;
  margin: auto;
}

.stats {
  margin-top: 20px;
  text-align: center;
}

.actions {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

button {
  padding: 10px 20px;
  background-color: #007BFF;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>