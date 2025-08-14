// backend/utils/process-payloads.js
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { processWebhookPayload } from '../services/messageService.js';

dotenv.config();

console.log('MONGO_URI in payloadProcessor.js:', process.env.MONGO_URI);


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/whatsapp';
const SAMPLE_DIR = path.join(__dirname, '../sample-payloads');

(async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`✅ Connected to MongoDB at ${MONGO_URI}`);

    const files = fs.readdirSync(SAMPLE_DIR).filter(f => f.endsWith('.json'));

    for (const file of files) {
      const rawData = fs.readFileSync(path.join(SAMPLE_DIR, file), 'utf8');
      const payload = JSON.parse(rawData);
      await processWebhookPayload(payload);
      console.log(`Processed: ${file}`);
    }

    console.log('✅ All sample payloads processed.');
    process.exit(0);
  } catch (err) {
    console.error('❌ Error processing payloads:', err);
    process.exit(1);
  }
})();
