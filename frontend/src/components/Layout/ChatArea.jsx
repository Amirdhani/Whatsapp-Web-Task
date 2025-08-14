import ChatHeader from '../Chat/ChatHeader';
import MessageList from '../Chat/MessageList';
import MessageInput from '../Chat/MessageInput';
import { useMessages } from '../../hooks/useMessages';

const ChatArea = ({ selectedConversation, contactName }) => {
  const { messages, loading, sendMessage } = useMessages(selectedConversation);

  const handleSendMessage = async (text) => {
    try {
      await sendMessage(text, contactName);
    } catch (error) {
      console.error('Failed to send message:', error);
      // You could add a toast notification here
    }
  };

  if (!selectedConversation) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50">
        <div className="text-center text-gray-500 max-w-md">
          <div className="mb-8">
            <div className="w-32 h-32 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
              <svg 
                viewBox="0 0 24 24" 
                width="64" 
                height="64" 
                className="text-green-500"
                fill="currentColor"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
            </div>
          </div>
          <h2 className="text-2xl font-medium mb-4 text-gray-800">
            WhatsApp Web Clone
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Keep your phone connected to use WhatsApp on your computer.
            <br />
            Select a conversation from the sidebar to start messaging.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col">
      <ChatHeader 
        contactName={contactName} 
        contactNumber={selectedConversation}
      />
      <MessageList messages={messages} loading={loading} />
      <MessageInput 
        onSendMessage={handleSendMessage}
        disabled={loading}
      />
    </div>
  );
};

export default ChatArea;