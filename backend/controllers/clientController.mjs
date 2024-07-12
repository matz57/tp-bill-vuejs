import { readData, writeData } from '../models/client.mjs';
import { Client } from '../models/client.mjs';

export const getClients = (req, res) => {
  const data = readData();
  res.json(data.clients);
};

export const createClient = (req, res) => {
  const data = readData();
  const { firstName, lastName, companyName } = req.body;
  const newClient = new Client(Date.now(), firstName, lastName, companyName);
  data.clients.push(newClient);
  writeData(data);
  res.status(201).json(newClient);
};

export const updateClient = (req, res) => {
  const data = readData();
  const { id } = req.params;
  const { firstName, lastName, companyName } = req.body;
  const index = data.clients.findIndex(client => client.id === parseInt(id));
  if (index !== -1) {
    data.clients[index].firstName = firstName;
    data.clients[index].lastName = lastName;
    data.clients[index].companyName = companyName;
    writeData(data);
    res.json(data.clients[index]);
  } else {
    res.status(404).json({ message: 'Client not found' });
  }
};

export const deleteClient = (req, res) => {
  const data = readData();
  const { id } = req.params;
  const index = data.clients.findIndex(client => client.id === parseInt(id));
  if (index !== -1) {
    const deletedClient = data.clients.splice(index, 1);
    writeData(data);
    res.json(deletedClient);
  } else {
    res.status(404).json({ message: 'Client not found' });
  }
};