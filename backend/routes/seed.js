// backend/routes/seed.js
import express from 'express';
import { loadSamplePayloads } from '../controllers/seedController.js';

const router = express.Router();

// POST /api/seed/sample
router.post('/sample', loadSamplePayloads);

export default router;