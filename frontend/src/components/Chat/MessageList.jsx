import React, { useEffect, useRef } from 'react';
import MessageBubble from './MessageBubble';
import LoadingSpinner from '../UI/LoadingSpinner';

const MessageList = ({ messages, loading }) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div 
      className="flex-1 overflow-y-auto p-4 bg-gray-50"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3e%3cg fill='none' fill-rule='evenodd'%3e%3cg fill='%23f3f4f6' fill-opacity='0.1' fill-rule='nonzero'%3e%3ccircle cx='30' cy='30' r='2'/%3e%3c/g%3e%3c/g%3e%3c/svg%3e")`,
      }}
    >
      {messages.length === 0 ? (
        <div className="text-center text-gray-500 mt-8">
          <div className="bg-white rounded-lg p-6 shadow-sm max-w-md mx-auto">
            <h3 className="text-lg font-medium mb-2">No messages yet</h3>
            <p className="text-sm">Start a conversation by typing a message below!</p>
          </div>
        </div>
      ) : (
        <>
          {messages.map((message) => (
            <MessageBubble 
              key={message.messageId || message._id} 
              message={message} 
            />
          ))}
        </>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;