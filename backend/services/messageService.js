// backend/services/messageService.js
import Message from '../models/Message.js';

/**
 * Always group a conversation by the CONTACT's wa_id (not your business number).
 * - incoming: waId = message.from
 * - outgoing: waId = contacts[0].wa_id
 */
export const processMessages = async (messages, contacts = [], metadata = {}) => {
  const contactFromList = Array.isArray(contacts) && contacts.length > 0 ? contacts[0] : null;
  const contactWaId = contactFromList?.wa_id || null;
  const businessNumber = metadata?.display_phone_number;

  for (const message of messages) {
    try {
      const isIncoming = message.from !== businessNumber;

      const waId =
        isIncoming
          ? message.from
          : (contactWaId || message.to || message.recipient_id || message.from); // fallback

      const contactName = contactFromList?.profile?.name || 'Unknown';

      const messageData = {
        messageId: message.id,
        waId,
        from: message.from,
        to: isIncoming ? businessNumber : (waId || contactWaId || message.to || ''),
        text: message.text?.body || '',
        timestamp: parseInt(message.timestamp, 10),
        messageType: isIncoming ? 'incoming' : 'outgoing',
        contactName,
        contactNumber: waId,
        status: 'sent',
      };

      await Message.findOneAndUpdate(
        { messageId: message.id },
        messageData,
        { upsert: true, new: true }
      );
    } catch (err) {
      console.error('Error processing message:', err);
    }
  }
};

export const processStatuses = async (statuses = []) => {
  for (const status of statuses) {
    try {
      const targetId = status.id || status.meta_msg_id;
      if (!targetId) continue;

      await Message.findOneAndUpdate(
        { messageId: targetId },
        {
          status: status.status, // 'sent' | 'delivered' | 'read'
          updatedAt: new Date(),
        },
        { new: true }
      );
    } catch (err) {
      console.error('Error processing status:', err);
    }
  }
};

export const processWebhookPayload = async (payload) => {
  // Support both real webhook structure and sample JSON structure
  const entryList = payload?.entry || payload?.metaData?.entry;
  if (!entryList) {
    console.warn('⚠️ No entry list found in payload');
    return;
  }

  for (const entry of entryList) {
    for (const change of entry.changes || []) {
      if (change.field !== 'messages') continue;

      const value = change.value || {};

      // Some payloads use "metadata" key, some use "metaData"
      const metadata = value.metadata || value.metaData || {};

      if (value.messages && value.messages.length > 0) {
        await processMessages(value.messages, value.contacts, metadata);
      }
      if (value.statuses && value.statuses.length > 0) {
        await processStatuses(value.statuses);
      }
    }
  }
};