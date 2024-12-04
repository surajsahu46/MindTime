import React, { useState } from 'react';
import { useHabitStore } from '../stores/habitStore';
import { getStreakEmoji, formatDate } from '../utils/helpers';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline';

function HabitTracker() {
  const { habits, addHabit, removeHabit, toggleHabit } = useHabitStore();
  const [showAddForm, setShowAddForm] = useState(false);
  const [newHabit, setNewHabit] = useState({
    name: '',
    description: '',
    frequency: 'daily',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addHabit(newHabit as any);
    setNewHabit({ name: '', description: '', frequency: 'daily' });
    setShowAddForm(false);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Habit Tracker</h1>
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          <PlusIcon className="w-5 h-5 mr-2" />
          Add Habit
        </button>
      </div>

      {showAddForm && (
        <div className="mb-6 p-4 bg-white rounded-lg shadow">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Habit Name
              </label>
              <input
                type="text"
                value={newHabit.name}
                onChange={(e) =>
                  setNewHabit({ ...newHabit, name: e.target.value })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                value={newHabit.description}
                onChange={(e) =>
                  setNewHabit({ ...newHabit, description: e.target.value })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Frequency
              </label>
              <select
                value={newHabit.frequency}
                onChange={(e) =>
                  setNewHabit({ ...newHabit, frequency: e.target.value })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="space-y-4">
        {habits.map((habit) => (
          <div
            key={habit.id}
            className="bg-white p-4 rounded-lg shadow flex items-center justify-between"
          >
            <div className="flex-1">
              <div className="flex items-center">
                <h3 className="text-lg font-medium text-gray-900">
                  {habit.name}
                </h3>
                <span className="ml-2 text-sm text-gray-500">
                  {getStreakEmoji(habit.streak)} {habit.streak} day streak
                </span>
              </div>
              {habit.description && (
                <p className="mt-1 text-sm text-gray-500">{habit.description}</p>
              )}
              <p className="text-sm text-gray-500">
                Frequency: {habit.frequency}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => toggleHabit(habit.id, new Date())}
                className={`px-4 py-2 rounded-md ${
                  habit.completedDates.some(
                    (date) =>
                      date.toISOString().split('T')[0] ===
                      new Date().toISOString().split('T')[0]
                  )
                    ? 'bg-green-100 text-green-800'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                {habit.completedDates.some(
                  (date) =>
                    date.toISOString().split('T')[0] ===
                    new Date().toISOString().split('T')[0]
                )
                  ? 'Completed'
                  : 'Mark Complete'}
              </button>
              <button
                onClick={() => removeHabit(habit.id)}
                className="text-red-600 hover:text-red-800"
              >
                <TrashIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HabitTracker;