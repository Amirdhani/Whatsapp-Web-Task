import Avatar from '../UI/Avatar';
import { Phone, Video, MoreVertical, Search } from 'lucide-react';

const ChatHeader = ({ contactName, contactNumber }) => {
  return (
    <div className="bg-gray-50 border-b border-gray-200 p-3 sm:p-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        
        {/* Left Section - Avatar & Contact Info */}
        <div className="flex items-center space-x-3 min-w-0">
          <Avatar name={contactName} />
          <div className="truncate">
            <h3 className="font-medium text-gray-900 truncate max-w-[150px] sm:max-w-[200px] lg:max-w-[300px]">
              {contactName}
            </h3>
            <p className="text-sm text-gray-500 truncate">
              {contactNumber ? `+${contactNumber}` : 'Online'}
            </p>
          </div>
        </div>

        {/* Right Section - Action Icons */}
        <div className="flex flex-wrap sm:flex-nowrap items-center gap-2">
          <button
            className="p-2 hover:bg-gray-200 rounded-full transition-colors duration-200"
            title="Search"
          >
            <Search size={20} className="text-gray-600" />
          </button>
          <button
            className="p-2 hover:bg-gray-200 rounded-full transition-colors duration-200"
            title="Voice call"
          >
            <Phone size={20} className="text-gray-600" />
          </button>
          <button
            className="p-2 hover:bg-gray-200 rounded-full transition-colors duration-200"
            title="Video call"
          >
            <Video size={20} className="text-gray-600" />
          </button>
          <button
            className="p-2 hover:bg-gray-200 rounded-full transition-colors duration-200"
            title="Menu"
          >
            <MoreVertical size={20} className="text-gray-600" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;