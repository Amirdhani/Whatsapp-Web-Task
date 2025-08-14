import ConversationItem from './ConversationItem';
import LoadingSpinner from '../UI/LoadingSpinner';

const ConversationList = ({ 
  conversations, 
  activeConversation, 
  onConversationSelect, 
  loading 
}) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner />
      </div>
    );
  }

  if (conversations.length === 0) {
    return (
      <div className="text-center text-gray-500 mt-8 px-4">
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-medium mb-2">No conversations yet</h3>
          <p className="text-sm">
            Process some webhook payloads to see chats here.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-y-auto h-full">
      {conversations.map((conversation) => (
        <ConversationItem
          key={conversation._id}
          conversation={conversation}
          isActive={activeConversation === conversation._id}
          onClick={() => onConversationSelect(conversation._id, conversation.contactName)}
        />
      ))}
    </div>
  );
};

export default ConversationList;