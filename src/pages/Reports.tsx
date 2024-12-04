import React, { useState } from 'react';
import { useHabitStore } from '../stores/habitStore';
import { useMoodStore } from '../stores/moodStore';
import { useTimeStore } from '../stores/timeStore';
import { formatDuration } from '../utils/helpers';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function Reports() {
  const [timeRange, setTimeRange] = useState(7);
  const { habits } = useHabitStore();
  const { getMoodTrend } = useMoodStore();
  const { getCategoryBreakdown } = useTimeStore();

  const moodTrend = getMoodTrend(timeRange);
  const timeBreakdown = getCategoryBreakdown(timeRange);

  const moodChartData = {
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

  const timeChartData = {
    labels: timeBreakdown.map((item) => item.category),
    datasets: [
      {
        label: 'Time Spent (hours)',
        data: timeBreakdown.map((item) => item.duration / 3600),
        backgroundColor: 'rgba(99, 102, 241, 0.5)',
      },
    ],
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Reports</h1>
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(Number(e.target.value))}
          className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          <option value={7}>Last 7 Days</option>
          <option value={30}>Last 30 Days</option>
          <option value={90}>Last 90 Days</option>
        </select>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-medium mb-4">Mood Trend</h2>
          <Line data={moodChartData} />
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-medium mb-4">Time Distribution</h2>
          <Bar data={timeChartData} />
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-lg font-medium mb-4">Habit Performance</h2>
        <div className="grid grid-cols-3 gap-4">
          {habits.map((habit) => (
            <div
              key={habit.id}
              className="p-4 border rounded-lg"
            >
              <h3 className="font-medium">{habit.name}</h3>
              <div className="mt-2">
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Current Streak</span>
                  <span>{habit.streak} days</span>
                </div>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Completion Rate</span>
                  <span>
                    {Math.round(
                      (habit.completedDates.length /
                        Math.ceil(
                          (new Date().getTime() -
                            habit.createdAt.getTime()) /
                            (1000 * 60 * 60 * 24)
                        )) *
                        100
                    )}%
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Reports;