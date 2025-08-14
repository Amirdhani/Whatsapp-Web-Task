// backend/models/Message.js
import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  messageId: { type: String, required: true, unique: true },
  waId: { type: String, required: true },          // conversation key = contact's wa_id
  from: { type: String, required: true },
  to: { type: String, required: true },
  text: { type: String, required: true },
  timestamp: { type: Number, required: true },     // unix seconds
  status: {
    type: String,
    enum: ['sent', 'delivered', 'read', 'pending'],
    default: 'pending'
  },
  messageType: {
    type: String,
    enum: ['incoming', 'outgoing'],
    required: true
  },
  contactName: { type: String, required: true },
  contactNumber: { type: String, required: true },
}, {
  timestamps: true // <-- auto manages createdAt & updatedAt
});

messageSchema.index({ waId: 1, timestamp: 1 });
messageSchema.index({ messageId: 1 });

export default mongoose.model('Message', messageSchema);
