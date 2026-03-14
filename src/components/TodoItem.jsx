import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Calendar, Edit2, Trash2, Tag, FileText } from 'lucide-react';
import { formatDate, getDueDateStatus, getDueDateColor } from '../utils/dateUtils';
import { getCategoryColor } from '../utils/categoryUtils';

export default function TodoItem({
  todo,
  isSelected,
  onSelect,
  onDelete,
  onToggle,
  onEdit,
  onSetDueDate,
  onSetPriority,
  onSetCategory,
  onSetDescription,
  categories,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showCategorySelect, setShowCategorySelect] = useState(false);
  const [showDescription, setShowDescription] = useState(false);
  const [descriptionEdit, setDescriptionEdit] = useState(todo.description);
  const [isEditingDescription, setIsEditingDescription] = useState(false);

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

  const handleSaveDescription = () => {
    onSetDescription(descriptionEdit);
    setIsEditingDescription(false);
  };

  const dueDateStatus = getDueDateStatus(todo.dueDate, todo.completed);
  const dueDateColor = getDueDateColor(dueDateStatus);

  const priorityColor = {
    low: 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200',
    medium: 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200',
    high: 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200',
  }[todo.priority] || 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200';

  if (isEditing) {
    return (
      <li className="flex gap-2 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
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
          className="flex-1 px-2 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-600 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </li>
    );
  }

  return (
    <li className={`rounded-lg transition ${isSelected ? 'bg-blue-100 dark:bg-blue-900' : todo.completed ? 'bg-gray-100 dark:bg-gray-700' : 'bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600'}`}>
      <div className="p-3">
        <div className="flex gap-3 items-start">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={onSelect}
            className="w-5 h-5 text-blue-500 rounded cursor-pointer mt-1 dark:accent-blue-500"
            title="Select for bulk actions"
          />
          
          <div className="flex-1 min-w-0">
            <span
              className={`block ${
                todo.completed
                  ? 'line-through text-gray-400 dark:text-gray-500'
                  : 'text-gray-800 dark:text-gray-100'
              }`}
            >
              {todo.text}
            </span>
            
            {/* Metadata */}
            <div className="flex gap-2 mt-2 flex-wrap">
              {todo.category && (
                <span className={`text-xs px-2 py-1 rounded ${getCategoryColor(todo.category)}`}>
                  <Tag size={12} className="inline mr-1" />
                  {todo.category}
                </span>
              )}

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
              onClick={() => setShowDescription(!showDescription)}
              className={`text-sm p-1 transition ${
                todo.description
                  ? 'text-orange-500 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
              title="View/edit description"
            >
              <FileText size={16} />
            </button>

            <button
              onClick={() => setShowCategorySelect(!showCategorySelect)}
              className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 p-1"
              title="Set category"
            >
              <Tag size={16} />
            </button>

            <button
              onClick={() => setShowDatePicker(!showDatePicker)}
              className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 p-1"
              title="Set due date"
            >
              <Calendar size={16} />
            </button>
            
            <button
              onClick={() => setIsEditing(true)}
              className="text-sm text-blue-500 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 p-1"
            >
              <Edit2 size={16} />
            </button>
            
            <button
              onClick={onDelete}
              className="text-sm text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 p-1"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>

        {/* Description Section */}
        {showDescription && (
          <div className="mt-3 p-3 bg-orange-50 dark:bg-orange-950 border border-orange-200 dark:border-orange-800 rounded-lg">
            {isEditingDescription ? (
              <textarea
                autoFocus
                value={descriptionEdit}
                onChange={(e) => setDescriptionEdit(e.target.value)}
                onBlur={handleSaveDescription}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && e.ctrlKey) handleSaveDescription();
                  if (e.key === 'Escape') {
                    setDescriptionEdit(todo.description);
                    setIsEditingDescription(false);
                  }
                }}
                placeholder="Add description..."
                className="w-full px-2 py-1 border border-orange-300 dark:border-orange-700 rounded bg-white dark:bg-orange-900 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
                rows="3"
              />
            ) : (
              <div
                onClick={() => setIsEditingDescription(true)}
                className="cursor-pointer text-gray-800 dark:text-gray-200 whitespace-pre-wrap break-words min-h-[3rem] flex items-center"
              >
                {descriptionEdit || <span className="text-gray-400 dark:text-gray-500 italic">Click to add description...</span>}
              </div>
            )}
          </div>
        )}

        {/* Category Select Popup */}
        {showCategorySelect && (
          <div className="mt-3 p-3 bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded-lg">
            <select
              value={todo.category || ''}
              onChange={(e) => {
                onSetCategory(e.target.value || null);
                setShowCategorySelect(false);
              }}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-500 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">No category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Date Picker Popup */}
        {showDatePicker && (
          <div className="mt-3 p-3 bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded-lg">
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
      </div>
    </li>
  );
}

  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showCategorySelect, setShowCategorySelect] = useState(false);
  const [showDescription, setShowDescription] = useState(false);
  const [descriptionEdit, setDescriptionEdit] = useState(todo.description);
  const [isEditingDescription, setIsEditingDescription] = useState(false);

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

  const handleSaveDescription = () => {
    onSetDescription(descriptionEdit);
    setIsEditingDescription(false);
  };

  const dueDateStatus = getDueDateStatus(todo.dueDate, todo.completed);
  const dueDateColor = getDueDateColor(dueDateStatus);

  const priorityColor = {
    low: 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200',
    medium: 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200',
    high: 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200',
  }[todo.priority] || 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200';

  if (isEditing) {
    return (
      <li className="flex gap-2 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
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
          className="flex-1 px-2 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-600 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </li>
    );
  }

  return (
    <li className={`rounded-lg transition ${todo.completed ? 'bg-gray-100 dark:bg-gray-700' : 'bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600'}`}>
      <div className="p-3">
        <div className="flex gap-3 items-start">
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={onToggle}
            className="w-5 h-5 text-blue-500 rounded cursor-pointer mt-1 dark:accent-blue-500"
          />
          
          <div className="flex-1 min-w-0">
            <span
              className={`block ${
                todo.completed
                  ? 'line-through text-gray-400 dark:text-gray-500'
                  : 'text-gray-800 dark:text-gray-100'
              }`}
            >
              {todo.text}
            </span>
            
            {/* Metadata */}
            <div className="flex gap-2 mt-2 flex-wrap">
              {todo.category && (
                <span className={`text-xs px-2 py-1 rounded ${getCategoryColor(todo.category)}`}>
                  <Tag size={12} className="inline mr-1" />
                  {todo.category}
                </span>
              )}

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
              onClick={() => setShowDescription(!showDescription)}
              className={`text-sm p-1 transition ${
                todo.description
                  ? 'text-orange-500 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
              title="View/edit description"
            >
              <FileText size={16} />
            </button>

            <button
              onClick={() => setShowCategorySelect(!showCategorySelect)}
              className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 p-1"
              title="Set category"
            >
              <Tag size={16} />
            </button>

            <button
              onClick={() => setShowDatePicker(!showDatePicker)}
              className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 p-1"
              title="Set due date"
            >
              <Calendar size={16} />
            </button>
            
            <button
              onClick={() => setIsEditing(true)}
              className="text-sm text-blue-500 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 p-1"
            >
              <Edit2 size={16} />
            </button>
            
            <button
              onClick={onDelete}
              className="text-sm text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 p-1"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>

        {/* Description Section */}
        {showDescription && (
          <div className="mt-3 p-3 bg-orange-50 dark:bg-orange-950 border border-orange-200 dark:border-orange-800 rounded-lg">
            {isEditingDescription ? (
              <textarea
                autoFocus
                value={descriptionEdit}
                onChange={(e) => setDescriptionEdit(e.target.value)}
                onBlur={handleSaveDescription}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && e.ctrlKey) handleSaveDescription();
                  if (e.key === 'Escape') {
                    setDescriptionEdit(todo.description);
                    setIsEditingDescription(false);
                  }
                }}
                placeholder="Add description..."
                className="w-full px-2 py-1 border border-orange-300 dark:border-orange-700 rounded bg-white dark:bg-orange-900 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
                rows="3"
              />
            ) : (
              <div
                onClick={() => setIsEditingDescription(true)}
                className="cursor-pointer text-gray-800 dark:text-gray-200 whitespace-pre-wrap break-words min-h-[3rem] flex items-center"
              >
                {descriptionEdit || <span className="text-gray-400 dark:text-gray-500 italic">Click to add description...</span>}
              </div>
            )}
          </div>
        )}

        {/* Category Select Popup */}
        {showCategorySelect && (
          <div className="mt-3 p-3 bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded-lg">
            <select
              value={todo.category || ''}
              onChange={(e) => {
                onSetCategory(e.target.value || null);
                setShowCategorySelect(false);
              }}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-500 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">No category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Date Picker Popup */}
        {showDatePicker && (
          <div className="mt-3 p-3 bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded-lg">
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
      </div>
    </li>
  );
}

