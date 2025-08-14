import { Check, CheckCheck } from 'lucide-react';
import { MESSAGE_STATUS } from '../../utils/constants';

const StatusIcon = ({ status }) => {
  switch (status) {
    case MESSAGE_STATUS.SENT:
      return <Check size={16} className="text-gray-400" />;
    case MESSAGE_STATUS.DELIVERED:
      return <CheckCheck size={16} className="text-gray-400" />;
    case MESSAGE_STATUS.READ:
      return <CheckCheck size={16} className="text-blue-500" />;
    default:
      return null;
  }
};

export default StatusIcon;