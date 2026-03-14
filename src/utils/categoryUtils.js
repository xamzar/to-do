/**
 * Category utilities for todo items
 */

const CATEGORY_COLORS = {
  Work: 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200',
  Personal: 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200',
  Shopping: 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200',
  Health: 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200',
};

export function getCategoryColor(category) {
  if (!category) return '';
  return CATEGORY_COLORS[category] || 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200';
}

export function getCategoryBgColor(category) {
  if (!category) return 'bg-white dark:bg-gray-800';
  const colorMap = {
    Work: 'bg-blue-50 dark:bg-blue-950',
    Personal: 'bg-purple-50 dark:bg-purple-950',
    Shopping: 'bg-green-50 dark:bg-green-950',
    Health: 'bg-red-50 dark:bg-red-950',
  };
  return colorMap[category] || 'bg-gray-50 dark:bg-gray-800';
}
