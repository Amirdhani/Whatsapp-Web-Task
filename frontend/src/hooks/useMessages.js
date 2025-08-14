import { useState, useEffect } from 'react';
import { messageApi } from '../services/api';

export const useMessages = (waId) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMessages = async () => {
    if (!waId) {
      setMessages([]);
      return;
    }
    
    try {
      setLoading(true);
      setError(null);
      const response = await messageApi.getByWaId(waId);
      setMessages(response.data);
    } catch (err) {
      console.error('Error fetching messages:', err);
      setError(err.message || 'Failed to fetch messages');
      setMessages([]);
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async (text, contactName) => {
    if (!waId || !text.trim()) {
      throw new Error('Invalid message data');
    }

    try {
      const response = await messageApi.send({
        waId,
        text: text.trim(),
        contactName: contactName || 'Unknown'
      });
      
      // Add the new message to the current messages
      setMessages(prev => [...prev, response.data]);
      return response.data;
    } catch (err) {
      console.error('Error sending message:', err);
      setError(err.message || 'Failed to send message');
      throw err;
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [waId]);

  return {
    messages,
    loading,
    error,
    sendMessage,
    refetch: fetchMessages
  };
};