const billPrestationInterface = {
  id: Date.now() + 1,
  description: 'Exemple de prestation',
  qty: 1,
  price: 450.0
}

const billInterface = {
  id: Date.now(),
  billnum: '',
  description: '',
  date: new Date().toISOString().slice(0, 10),
  client: {
    idclient: '',
    firstName: '',
    lastName: '',
    companyName: ''
  },
  prestations: [{ ...billPrestationInterface }],
  discount: 0.0,
  paid: 0.0,
  totalHT: 450,
  tva: 20,
  totalTTC: 540
}

export { billInterface, billPrestationInterface }