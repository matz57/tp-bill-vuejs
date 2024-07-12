import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json'
  }
})

export const getClients = () => apiClient.get('/clients')
export const createClient = (client) => apiClient.post('/clients', client)
export const updateClient = (id, client) => apiClient.put(`/clients/${id}`, client)
export const deleteClient = (id) => apiClient.delete(`/clients/${id}`)

export const getBills = () => apiClient.get('/bills')
export const createBill = (bill) => apiClient.post('/bills', bill)
export const updateBill = (id, bill) => apiClient.put(`/bills/${id}`, bill)
export const deleteBill = (id) => apiClient.delete(`/bills/${id}`)