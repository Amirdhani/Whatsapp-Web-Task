import { processWebhookPayload } from '../services/messageService.js';

export const processWebhook = async (req, res) => {
  try {
    const payload = req.body;

    if (!payload?.metaData?.entry) {
      return res.status(400).json({ error: 'Invalid payload structure' });
    }

    await processWebhookPayload(payload);
    res.status(200).json({ success: true, message: 'Webhook processed successfully' });
  } catch (error) {
    console.error('Webhook processing error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
