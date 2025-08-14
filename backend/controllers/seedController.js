import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { processWebhookPayload } from '../services/messageService.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const loadSamplePayloads = async (req, res) => {
  try {
    const payloadsDir = path.resolve(__dirname, '../sample-payloads');

    if (!fs.existsSync(payloadsDir)) {
      return res.status(404).json({ error: 'sample-payloads directory not found' });
    }

    const files = fs.readdirSync(payloadsDir)
      .filter(f => f.endsWith('.json'))
      .sort();

    let processed = 0;
    for (const file of files) {
      const full = path.join(payloadsDir, file);
      const raw = fs.readFileSync(full, 'utf8');
      const payload = JSON.parse(raw);
      await processWebhookPayload(payload);
      processed += 1;
    }

    res.json({ success: true, processed, message: 'All sample payloads processed' });
  } catch (err) {
    console.error('Seed error:', err);
    res.status(500).json({ error: 'Failed to load sample payloads' });
  }
};