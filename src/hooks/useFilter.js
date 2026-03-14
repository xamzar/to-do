import { useState } from 'react';
import { FILTER_ALL, FILTER_ACTIVE, FILTER_COMPLETED } from '../utils/constants';

export function filterTodos(todos, filter, searchText = '') {
  let result = todos;

  // Apply filter
  switch (filter) {
    case FILTER_ACTIVE:
      result = result.filter((t) => !t.completed);
      break;
    case FILTER_COMPLETED:
      result = result.filter((t) => t.completed);
      break;
    case FILTER_ALL:
    default:
      break;
  }

  // Apply search
  if (searchText.trim()) {
    const search = searchText.toLowerCase();
    result = result.filter((t) => t.text.toLowerCase().includes(search));
  }

  return result;
}

export default function useFilter() {
  const [filter, setFilter] = useState(FILTER_ALL);
  const [searchText, setSearchText] = useState('');

  return { filter, setFilter, searchText, setSearchText };
}
