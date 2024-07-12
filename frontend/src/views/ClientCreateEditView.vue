<template>
  <div class="client" v-if="!loading && client">
    <div class="row border-bottom pb-3 mb-3">
      <div class="col">
        <h1 v-if="isNewClient" class="h3">
          <i class="fa-solid fa-angle-down me-2" />Créer un client
        </h1>
        <h1 v-else class="h3"><i class="fa-solid fa-angle-down me-2" />Editer un client</h1>
      </div>
      <div v-if="!isNewClient" class="col text-end">
        <button @click="onDeleteClient" class="btn btn-outline-danger">
          <i class="fa-solid fa-trash me-2" />
          Supprimer le client
        </button>
      </div>
    </div>

    <div class="alert alert-danger my-3" v-if="error">Un champ requiert votre attention</div>

    <div class="row">
      <div class="col-md-6">
        <div class="form-floating mb-3">
          <input
            type="text"
            name="firstName"
            id="firstName"
            v-model="client.firstName"
            class="form-control"
            placeholder="Prénom"
            :class="{ 'is-invalid': !client.firstName }"
          />
          <label for="firstName" class="form-label">Prénom</label>
        </div>
        <div class="form-floating mb-3">
          <input
            type="text"
            name="lastName"
            id="lastName"
            v-model="client.lastName"
            class="form-control"
            placeholder="Nom"
            :class="{ 'is-invalid': !client.lastName }"
          />
          <label for="lastName" class="form-label">Nom</label>
        </div>
        <div class="form-floating mb-3">
          <input
            type="text"
            name="companyName"
            id="companyName"
            v-model="client.companyName"
            class="form-control"
            placeholder="Nom de la société"
            :class="{ 'is-invalid': !client.companyName }"
          />
          <label for="companyName" class="form-label">Nom de la société</label>
        </div>
      </div>
    </div>

    <p class="text-end">
      <button @click="onSave" :disabled="formInvalid" class="btn btn-outline-primary btn-lg px-5">
        <i class="fa-solid fa-save me-2" />Enregistrer
      </button>
    </p>

    <!-- Assumed component for debugging purposes -->
    <!-- <AppDebug :datas="client" /> -->
  </div>
</template>

<script>
import { useClientStore } from '@/stores/client';
import { mapActions, mapState } from 'pinia';

export default {
  props: {
    idclient: {
      type: String,
      default: 'new',
    },
  },
  data() {
    return {
      error: false,
    };
  },
  beforeMount() {
    this.setItem(this.idclient);
  },
  computed: {
    ...mapState(useClientStore, {
      client: (state) => state.item,
      loading: (state) => state.loading,
    }),
    isNewClient() {
      return this.idclient === 'new';
    },
    formInvalid() {
      const c = this.client;
      return !c || !c.firstName || !c.lastName || !c.companyName;
    },
  },
  methods: {
    ...mapActions(useClientStore, ['setItem', 'createItem', 'updateItem', 'deleteItem']),

    async onDeleteClient() {
      if (this.client && this.client.id) {
        await this.deleteItem(this.client.id);
        this.$router.push({ name: 'clients' });
      }
    },

    async onSave() {
      if (this.formInvalid) {
        this.error = true;
      } else {
        this.error = false;
        if (this.isNewClient) {
          await this.createItem(this.client);
        } else {
          await this.updateItem(this.client);
        }
        this.$router.push({ name: 'clients' });
      }
    },
  },
};
</script>