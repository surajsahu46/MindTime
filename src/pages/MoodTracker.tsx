import React, { useState } from 'react';
import { useMoodStore } from '../stores/moodStore';
import { getMoodEmoji, formatDate } from '../utils/helpers';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ACTIVITIES = [
  'Work',
  'Exercise',
  'Social',
  'Family',
  'Hobbies',
  'Rest',
  'Other',
];

function MoodTracker() {
  const { entries, addEntry, removeEntry, getMoodTrend } = useMoodStore();
  const [showAddForm, setShowAddForm] = useState(false);
  const [newEntry, setNewEntry] = useState({
    mood: 3,
    notes: '',
    activities: [] as string[],
  });

  const moodTrend = getMoodTrend(7);
  const chartData = {
    labels: moodTrend.map((entry) => entry.date),
    datasets: [
      {
        label: 'Mood Trend',
        data: moodTrend.map((entry) => entry.average),
        borderColor: 'rgb(99, 102, 241)',
        tension: 0.1,
      },
    ],
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addEntry(newEntry as any);
    setNewEntry({ mood: 3, notes: '', activities: [] });
    setShowAddForm(false);
  };

  const toggleActivity = (activity: string) => {
    setNewEntry((prev) => ({
      ...prev,
      activities: prev.activities.includes(activity)
        ? prev.activities.filter((a) => a !== activity)
        : [...prev.activities, activity],
    }));
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Mood Tracker</h1>
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          <PlusIcon className="w-5 h-5 mr-2" />
          Log Mood
        </button>
      </div>

      <div className="mb-8 bg-white p-4 rounded-lg shadow">
        <h2 className="text-lg font-medium mb-4">7-Day Mood Trend</h2>
        <Line data={chartData} />
      </div>

      {showAddForm && (
        <div className="mb-6 p-4 bg-white rounded-lg shadow">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                How are you feeling?
              </label>
              <div className="mt-2 flex justify-between">
                {[1, 2, 3, 4, 5].map((mood) => (
                  <button
                    key={mood}
                    type="button"
                    onClick={() => setNewEntry({ ...newEntry, mood })}
                    className={`p-2 rounded-full ${
                      newEntry.mood === mood
                        ? 'bg-indigo-100 text-indigo-800'
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    <span className="text-2xl">{getMoodEmoji(mood)}</span>
                  </button>
                ))}
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Activities
              </label>
              <div className="mt-2 flex flex-wrap gap-2">
                {ACTIVITIES.map((activity) => (
                  <button
                    key={activity}
                    type="button"
                    onClick={() => toggleActivity(activity)}
                    className={`px-3 py-1 rounded-full text-sm ${
                      newEntry.activities.includes(activity)
                        ? 'bg-indigo-100 text-indigo-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {activity}
                  </button>
                ))}
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Notes
              </label>
              <textarea
                value={newEntry.notes}
                onChange={(e) =>
                  setNewEntry({ ...newEntry, notes: e.target.value })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
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
        {entries
          .slice()
          .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
          .map((entry) => (
            <div
              key={entry.id}
              className="bg-white p-4 rounded-lg shadow"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="text-2xl mr-2">
                    {getMoodEmoji(entry.mood)}
                  </span>
                  <span className="text-sm text-gray-500">
                    {formatDate(entry.timestamp)}
                  </span>
                </div>
                <button
                  onClick={() => removeEntry(entry.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <TrashIcon className="w-5 h-5" />
                </button>
              </div>
              {entry.activities.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {entry.activities.map((activity) => (
                    <span
                      key={activity}
                      className="px-2 py-1 bg-gray-100 rounded-full text-sm text-gray-700"
                    >
                      {activity}
                    </span>
                  ))}
                </div>
              )}
              {entry.notes && (
                <p className="mt-2 text-sm text-gray-600">{entry.notes}</p>
              )}
            </div>
          ))}
      </div>
    </div>
  );
}

export default MoodTracker;