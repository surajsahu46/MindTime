import React, { useState, useEffect } from 'react';
import { useTimeStore } from '../stores/timeStore';
import { formatDuration } from '../utils/helpers';
import { PlayIcon, StopIcon, TrashIcon } from '@heroicons/react/24/outline';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const CATEGORIES = [
  'Work',
  'Study',
  'Exercise',
  'Entertainment',
  'Social',
  'Other',
];

const COLORS = [
  'rgb(99, 102, 241)',
  'rgb(16, 185, 129)',
  'rgb(245, 158, 11)',
  'rgb(239, 68, 68)',
  'rgb(139, 92, 246)',
  'rgb(107, 114, 128)',
];

function TimeTracker() {
  const {
    entries,
    activeEntry,
    addEntry,
    removeEntry,
    startTracking,
    stopTracking,
    getCategoryBreakdown,
  } = useTimeStore();
  
  const [newActivity, setNewActivity] = useState({
    activity: '',
    category: CATEGORIES[0],
  });

  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    let interval: number;
    if (activeEntry) {
      interval = window.setInterval(() => {
        const elapsed = Math.floor(
          (new Date().getTime() - activeEntry.startTime.getTime()) / 1000
        );
        setElapsedTime(elapsed);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [activeEntry]);

  const breakdown = getCategoryBreakdown(7);
  const chartData = {
    labels: breakdown.map((item) => item.category),
    datasets: [
      {
        data: breakdown.map((item) => item.duration),
        backgroundColor: COLORS,
      },
    ],
  };

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault();
    startTracking(newActivity.activity, newActivity.category);
    setNewActivity({ activity: '', category: CATEGORIES[0] });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Time Tracker</h1>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-medium mb-4">Current Activity</h2>
          {activeEntry ? (
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-medium">{activeEntry.activity}</h3>
                  <p className="text-sm text-gray-500">
                    {activeEntry.category}
                  </p>
                </div>
                <div className="text-2xl font-mono">
                  {formatDuration(elapsedTime)}
                </div>
              </div>
              <button
                onClick={stopTracking}
                className="w-full flex items-center justify-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                <StopIcon className="w-5 h-5 mr-2" />
                Stop
              </button>
            </div>
          ) : (
            <form onSubmit={handleStart}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Activity
                </label>
                <input
                  type="text"
                  value={newActivity.activity}
                  onChange={(e) =>
                    setNewActivity({ ...newActivity, activity: e.target.value })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Category
                </label>
                <select
                  value={newActivity.category}
                  onChange={(e) =>
                    setNewActivity({ ...newActivity, category: e.target.value })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                >
                  {CATEGORIES.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              <button
                type="submit"
                className="w-full flex items-center justify-center px center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                <PlayIcon className="w-5 h-5 mr-2" />
                Start Tracking
              </button>
            </form>
          )}
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-medium mb-4">7-Day Breakdown</h2>
          <Pie data={chartData} />
        </div>
      </div>

      <div className="space-y-4">
        {entries
          .slice()
          .sort((a, b) => b.startTime.getTime() - a.startTime.getTime())
          .map((entry) => (
            <div
              key={entry.id}
              className="bg-white p-4 rounded-lg shadow flex items-center justify-between"
            >
              <div>
                <h3 className="font-medium">{entry.activity}</h3>
                <p className="text-sm text-gray-500">
                  {entry.category} • {formatDuration(entry.duration)}
                </p>
              </div>
              <button
                onClick={() => removeEntry(entry.id)}
                className="text-red-600 hover:text-red-800"
              >
                <TrashIcon className="w-5 h-5" />
              </button>
            </div>
          ))}
      </div>
    </div>
  );
}

export default TimeTracker;