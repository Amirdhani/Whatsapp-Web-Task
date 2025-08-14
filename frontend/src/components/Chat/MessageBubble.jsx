import StatusIcon from '../UI/StatusIcon';
import { formatChatTime } from '../../utils/dateUtils';
import { MESSAGE_TYPE } from '../../utils/constants';

const MessageBubble = ({ message }) => {
  const isOutgoing = message.messageType === MESSAGE_TYPE.OUTGOING;

  return (
    <div className={`flex ${isOutgoing ? 'justify-end' : 'justify-start'} mb-4`}>
      <div 
        className={`
          max-w-xs lg:max-w-md px-4 py-2 rounded-lg shadow-sm
          ${isOutgoing 
            ? 'bg-green-700 text-white rounded-br-none' 
            : 'bg-white border border-gray-200 text-gray-900 rounded-bl-none'
          }
        `}
      >
        <p className="text-sm leading-relaxed whitespace-pre-wrap">
          {message.text}
        </p>
        <div 
          className={`
            flex items-center justify-end mt-2 space-x-1
            ${isOutgoing ? 'text-green-100' : 'text-gray-500'}
          `}
        >
          <span className="text-xs">
            {formatChatTime(message.timestamp)}
          </span>
          {isOutgoing && (
            <div className="ml-1">
              <StatusIcon status={message.status} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;