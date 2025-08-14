// backend/controllers/conversationController.js
import Message from '../models/Message.js';

export const getConversations = async (req, res) => {
  try {
    const conversations = await Message.aggregate([
      { $sort: { timestamp: 1 } }, // ensure $last is REALLY the latest per waId
      {
        $group: {
          _id: '$waId',
          lastMessage: { $last: '$text' },
          lastTimestamp: { $last: '$timestamp' },
          contactName: { $last: '$contactName' },
          contactNumber: { $last: '$contactNumber' },
          unreadCount: {
            $sum: {
              $cond: [
                {
                  $and: [
                    { $eq: ['$messageType', 'incoming'] },
                    { $ne: ['$status', 'read'] }
                  ]
                },
                1,
                0
              ]
            }
          }
        }
      },
      { $sort: { lastTimestamp: -1 } }
    ]);

    res.json(conversations);
  } catch (error) {
    console.error('Error fetching conversations:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};