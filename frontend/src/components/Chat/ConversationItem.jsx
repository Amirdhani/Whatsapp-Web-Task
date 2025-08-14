import Avatar from '../UI/Avatar';
import { formatMessageTime } from '../../utils/dateUtils';

const ConversationItem = ({ conversation, isActive, onClick }) => {
  const { contactName, lastMessage, lastTimestamp, unreadCount } = conversation;

  return (
    <div
      className={`
        p-3 cursor-pointer hover:bg-gray-100 border-b border-gray-200 transition-colors duration-200
        ${isActive ? 'bg-green-50 border-l-4 border-l-green-500' : ''}
      `}
      onClick={onClick}
    >
      <div className="flex items-center gap-3">
        {/* Avatar */}
        <Avatar name={contactName} />

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          
          {/* Top Row - Name & Time */}
          <div className="flex justify-between items-center min-w-0">
            <h3 className="font-medium text-gray-900 truncate max-w-[70%]">
              {contactName}
            </h3>
            <span className="text-xs text-gray-500 whitespace-nowrap ml-2">
              {formatMessageTime(lastTimestamp)}
            </span>
          </div>

          {/* Bottom Row - Last Message & Badge */}
          <div className="flex items-center justify-between mt-1 min-w-0">
            <p className="text-sm text-gray-600 truncate flex-1 min-w-0">
              {lastMessage}
            </p>
            {unreadCount > 0 && (
              <span className="ml-3 flex-shrink-0 bg-green-500 text-white text-xs rounded-full px-2 py-0.5 min-w-[20px] text-center">
                {unreadCount}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConversationItem;