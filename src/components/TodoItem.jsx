import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Calendar, Edit2, Trash2 } from 'lucide-react';
import { formatDate, getDueDateStatus, getDueDateColor } from '../utils/dateUtils';

export default function TodoItem({ todo, onDelete, onToggle, onEdit, onSetDueDate, onSetPriority }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleSave = () => {
    if (editText.trim()) {
      onEdit(editText.trim());
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditText(todo.text);
    setIsEditing(false);
  };

  const dueDateStatus = getDueDateStatus(todo.dueDate, todo.completed);
  const dueDateColor = getDueDateColor(dueDateStatus);

  const priorityColor = {
    low: 'bg-green-100 text-green-800',
    medium: 'bg-yellow-100 text-yellow-800',
    high: 'bg-red-100 text-red-800',
  }[todo.priority] || 'bg-gray-100 text-gray-800';

  if (isEditing) {
    return (
      <li className="flex gap-2 p-3 bg-gray-50 rounded-lg">
        <input
          autoFocus
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onBlur={handleSave}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSave();
            if (e.key === 'Escape') handleCancel();
          }}
          className="flex-1 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </li>
    );
  }

  return (
    <li className={`p-3 rounded-lg items-start transition ${todo.completed ? 'bg-gray-100' : 'bg-gray-50 hover:bg-gray-100'}`}>
      <div className="flex gap-3 items-start">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={onToggle}
          className="w-5 h-5 text-blue-500 rounded cursor-pointer mt-1"
        />
        
        <div className="flex-1 min-w-0">
          <span
            className={`block ${
              todo.completed
                ? 'line-through text-gray-400'
                : 'text-gray-800'
            }`}
          >
            {todo.text}
          </span>
          
          {/* Due Date & Priority */}
          <div className="flex gap-2 mt-2 flex-wrap">
            {todo.dueDate && (
              <span className={`text-xs px-2 py-1 rounded ${dueDateColor}`}>
                <Calendar size={12} className="inline mr-1" />
                {formatDate(todo.dueDate)}
              </span>
            )}
            
            <span className={`text-xs px-2 py-1 rounded ${priorityColor}`}>
              {todo.priority}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-1 flex-shrink-0">
          <button
            onClick={() => setShowDatePicker(!showDatePicker)}
            className="text-sm text-gray-500 hover:text-gray-700 p-1"
            title="Set due date"
          >
            <Calendar size={16} />
          </button>
          
          <button
            onClick={() => setIsEditing(true)}
            className="text-sm text-blue-500 hover:text-blue-700 p-1"
          >
            <Edit2 size={16} />
          </button>
          
          <button
            onClick={onDelete}
            className="text-sm text-red-500 hover:text-red-700 p-1"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      {/* Date Picker Popup */}
      {showDatePicker && (
        <div className="mt-3 p-3 bg-white border border-gray-300 rounded-lg">
          <DatePicker
            selected={todo.dueDate ? new Date(todo.dueDate) : null}
            onChange={(date) => {
              onSetDueDate(date);
              setShowDatePicker(false);
            }}
            inline
            minDate={new Date()}
          />
        </div>
      )}
    </li>
  );
}

