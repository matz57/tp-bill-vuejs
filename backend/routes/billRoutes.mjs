import express from 'express';
import {
  getBills,
  createBill,
  updateBill,
  deleteBill
} from '../controllers/billController.mjs';

const router = express.Router();

router.get('/', getBills);
router.post('/', createBill);
router.put('/:id', updateBill);
router.delete('/:id', deleteBill);

export default router;