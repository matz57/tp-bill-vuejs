import { readData, writeData } from '../models/bill.mjs';
import { Bill } from '../models/bill.mjs';

export const getBills = (req, res) => {
  const data = readData();
  res.json(data.bills);
};

export const createBill = (req, res) => {
  const data = readData();
  const { billnum, description, date, client, prestations, discount, paid, totalHT, tva, totalTTC } = req.body;
  const newBill = new Bill(Date.now(), billnum, description, date, client, prestations, discount, paid, totalHT, tva, totalTTC);
  data.bills.push(newBill);
  writeData(data);
  res.status(201).json(newBill);
};

export const updateBill = (req, res) => {
  const data = readData();
  const { id } = req.params;
  const { billnum, description, date, client, prestations, discount, paid, totalHT, tva, totalTTC } = req.body;
  const index = data.bills.findIndex(bill => bill.id === parseInt(id));
  if (index !== -1) {
    data.bills[index].billnum = billnum;
    data.bills[index].description = description;
    data.bills[index].date = date;
    data.bills[index].client = client;
    data.bills[index].prestations = prestations;
    data.bills[index].discount = discount;
    data.bills[index].paid = paid;
    data.bills[index].totalHT = totalHT;
    data.bills[index].tva = tva;
    data.bills[index].totalTTC = totalTTC;
    writeData(data);
    res.json(data.bills[index]);
  } else {
    res.status(404).json({ message: 'Bill not found' });
  }
};

export const deleteBill = (req, res) => {
  const data = readData();
  const { id } = req.params;
  const index = data.bills.findIndex(bill => bill.id === parseInt(id));
  if (index !== -1) {
    const deletedBill = data.bills.splice(index, 1);
    writeData(data);
    res.json(deletedBill);
  } else {
    res.status(404).json({ message: 'Bill not found' });
  }
};