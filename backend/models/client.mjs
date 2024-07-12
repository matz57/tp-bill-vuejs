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

// Client model
export class Client {
  constructor(id, firstName, lastName, companyName) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.companyName = companyName;
  }
}
