import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_PATH = path.join(__dirname, '../data/data.json');

export const readData = () => {
  const data = fs.readFileSync(DATA_PATH);
  return JSON.parse(data);
};

export const writeData = (data) => {
  fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2));
};

// Bill model
export class Bill {
  constructor(id, billnum, description, date, client, prestations, discount, paid, totalHT, tva, totalTTC) {
    this.id = id;
    this.billnum = billnum;
    this.description = description;
    this.date = date;
    this.client = client;
    this.prestations = prestations;
    this.discount = discount;
    this.paid = paid;
    this.totalHT = totalHT;
    this.tva = tva;
    this.totalTTC = totalTTC;
  }
}