import { useState } from 'react';
import { FILTER_ALL, FILTER_ACTIVE, FILTER_COMPLETED } from '../utils/constants';

export function filterTodos(todos, filter) {
  switch (filter) {
    case FILTER_ACTIVE:
      return todos.filter((t) => !t.completed);
    case FILTER_COMPLETED:
      return todos.filter((t) => t.completed);
    case FILTER_ALL:
    default:
      return todos;
  }
}

export default function useFilter() {
  const [filter, setFilter] = useState(FILTER_ALL);

  return { filter, setFilter };
}
