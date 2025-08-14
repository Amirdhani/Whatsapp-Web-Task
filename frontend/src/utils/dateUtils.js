import { format, isToday, isYesterday, isThisWeek, isThisYear } from 'date-fns';

export const formatMessageTime = (timestamp) => {
  const date = new Date(timestamp * 1000);
  
  if (isToday(date)) {
    return format(date, 'HH:mm');
  } else if (isYesterday(date)) {
    return 'Yesterday';
  } else if (isThisWeek(date)) {
    return format(date, 'EEEE');
  } else if (isThisYear(date)) {
    return format(date, 'dd/MM');
  } else {
    return format(date, 'dd/MM/yyyy');
  }
};

export const formatChatTime = (timestamp) => {
  const date = new Date(timestamp * 1000);
  return format(date, 'HH:mm');
};

export const formatFullDate = (timestamp) => {
  const date = new Date(timestamp * 1000);
  return format(date, 'PPpp'); // e.g., "Apr 29, 2023 at 1:45 PM"
};