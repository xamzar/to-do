/**
 * Date utilities for task due dates
 */

export function formatDate(date) {
  if (!date) return null;
  const d = new Date(date);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export function isToday(date) {
  if (!date) return false;
  const today = new Date();
  const d = new Date(date);
  return d.toDateString() === today.toDateString();
}

export function isOverdue(date, completed) {
  if (!date || completed) return false;
  return new Date(date) < new Date();
}

export function getDueDateStatus(date, completed) {
  if (!date) return 'none';
  if (completed) return 'completed';
  if (isOverdue(date, completed)) return 'overdue';
  if (isToday(date)) return 'today';
  return 'upcoming';
}

export function getDueDateColor(status) {
  switch (status) {
    case 'overdue':
      return 'text-red-600 bg-red-50';
    case 'today':
      return 'text-blue-600 bg-blue-50';
    case 'upcoming':
      return 'text-gray-600 bg-gray-50';
    default:
      return '';
  }
}
