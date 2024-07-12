import { defineStore } from 'pinia';
import { getClients, createClient, updateClient, deleteClient } from '@/services/api';

export const useClientStore = defineStore('client', {
  state: () => ({
    items: [],
    item: null,
    loading: false,
  }),
  actions: {
    async fetchClients() {
      this.loading = true;
      try {
        const response = await getClients();
        this.items = response.data.map(item => ({ ...item, id: parseInt(item.id) }));
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
    async fetchClientById(idclient) {
      this.loading = true;
      try {
        const response = await getClients(idclient);
        this.item = response.data;
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
    async setItem(idclient) {
      this.loading = true;
      if (idclient === 'new') {
        this.item = { id: Date.now(), firstName: '', lastName: '', companyName: '' };
      } else {
        const client = this.items.find((item) => item.id === parseInt(idclient));
        this.item = client || null;
      }
      this.loading = false;
    },
    async createItem(clientData) {
      this.loading = true;
      try {
        await createClient(clientData);
        await this.fetchClients();
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
    async updateItem(clientData) {
      this.loading = true;
      try {
        await updateClient(parseInt(clientData.id), clientData);
        await this.fetchClients();
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
    async deleteItem(idclient) {
      this.loading = true;
      try {
        await deleteClient(parseInt(idclient));
        await this.fetchClients();
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
  },
});