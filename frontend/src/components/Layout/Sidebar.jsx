import React, { useState } from 'react';
import { Search, MessageCircle, Settings, Menu } from 'lucide-react';
import ConversationList from '../Chat/ConversationList';
import ChatArea from './ChatArea';
import { useConversations } from '../../hooks/useConversations';
import Avatar from '../UI/Avatar';

const Layout = () => {
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [selectedContactName, setSelectedContactName] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { conversations, loading, refetch } = useConversations();

  const handleConversationSelect = (waId, contactName) => {
    setSelectedConversation(waId);
    setSelectedContactName(contactName);
    // Close sidebar on mobile after selection
    if (window.innerWidth < 768) {
      setSidebarOpen(false);
    }
  };

  const filteredConversations = conversations.filter(conv =>
    conv.contactName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    conv.contactNumber.includes(searchTerm)
  );

  return (
    <div className="flex h-screen bg-white">
      {/* Mobile Menu Button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-green-600 text-white rounded-lg shadow-lg"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        <Menu size={20} />
      </button>

      {/* Sidebar */}
      <div className={`
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0 transition-transform duration-300 ease-in-out
        w-80 md:w-100 border-r border-gray-200 flex flex-col
        fixed md:relative z-40 h-full bg-white
      `}>
        {/* Header */}
        <div className="bg-green-600 p-4 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Avatar name="Business Account" />
              <div>
                <span className="font-medium block">WhatsApp Business</span>
                <span className="text-xs text-green-100">+91 832 944 6654</span>
              </div>
            </div>
            <div className="flex items-center space-x-2 gap-1">
              <button 
                className="p-2 hover:bg-green-700 rounded-full transition-colors duration-200"
                title="New chat"
              >
                <MessageCircle size={20} />
              </button>
              <button 
                className="p-2 hover:bg-green-700 rounded-full transition-colors duration-200"
                title="Settings"
                onClick={refetch}
              >
                <Settings size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="p-4 border-b border-gray-200">
          <div className="relative">
            <Search 
              size={18} 
              className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" 
            />
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full !pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-200"
            />
          </div>
        </div>

        {/* Conversations */}
        <div className="flex-1 overflow-hidden">
          <ConversationList
            conversations={filteredConversations}
            activeConversation={selectedConversation}
            onConversationSelect={handleConversationSelect}
            loading={loading}
          />
        </div>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        <ChatArea 
          selectedConversation={selectedConversation}
          contactName={selectedContactName}
        />
      </div>
    </div>
  );
};

export default Layout;