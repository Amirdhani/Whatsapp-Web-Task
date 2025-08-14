import { useState, useEffect } from 'react';
import { conversationApi } from '../services/api';

export const useConversations = () => {
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchConversations = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await conversationApi.getAll();
      setConversations(response.data);
    } catch (err) {
      console.error('Error fetching conversations:', err);
      setError(err.message || 'Failed to fetch conversations');
      setConversations([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConversations();
  }, []);

  return {
    conversations,
    loading,
    error,
    refetch: fetchConversations
  };
};