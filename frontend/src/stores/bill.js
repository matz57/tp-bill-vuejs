import { defineStore } from 'pinia'
import { getBills, createBill, updateBill, deleteBill } from '@/services/api'

export const useBillStore = defineStore('bill', {
  state: () => ({
    items: [],
    item: {
      prestations: []
    },
    loading: false
  }),
  getters: {},
  actions: {
    async fetchBills() {
      this.loading = true
      try {
        const response = await getBills()
        this.items = response.data
      } catch (error) {
        console.error(error)
      } finally {
        this.loading = false
      }
    },
    async setItem(idbill) {
      this.loading = true
      if (idbill === 'new') {
        this.item = {
          id: Date.now(),
          date: '',
          amount: 0,
          clientId: '',
          prestations: [],
          isNew: true
        }
      } else {
        const bill = this.items.find((item) => item.id == idbill)
        this.item = {
          ...bill,
          prestations: bill.prestations || [],
          isNew: false
        }
      }
      this.loading = false
    },
    async saveItem(form) {
      this.loading = true
      try {
        if (form.isNew) {
          await createBill(form)
        } else {
          await updateBill(form.id, form)
        }
        await this.fetchBills()
      } catch (error) {
        console.error(error)
      } finally {
        this.loading = false
      }
    },
    async deleteItem(idbill) {
      this.loading = true
      try {
        await deleteBill(idbill)
        await this.fetchBills()
      } catch (error) {
        console.error(error)
      } finally {
        this.loading = false
      }
    }
  }
})
