import Message from '../models/Message.js';

export const getMessages = async (req, res) => {
  try {
    const { waId } = req.params;
    
    const messages = await Message.find({ waId })
      .sort({ timestamp: 1 });
    
    res.json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { waId, text, contactName } = req.body;
    
    if (!waId || !text) {
      return res.status(400).json({ error: 'waId and text are required' });
    }

    const messageData = {
      messageId: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      waId,
      from: '918329446654', // Your business number
      to: waId,
      text,
      timestamp: Math.floor(Date.now() / 1000),
      messageType: 'outgoing',
      contactName: contactName || 'Unknown',
      contactNumber: waId,
      status: 'sent'
    };

    const message = new Message(messageData);
    await message.save();
    
    res.status(201).json(message);
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};