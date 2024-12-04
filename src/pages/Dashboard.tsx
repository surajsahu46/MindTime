import React from 'react';
import { useHabitStore } from '../stores/habitStore';
import { useMoodStore } from '../stores/moodStore';
import { useTimeStore } from '../stores/timeStore';
import { getMoodEmoji, formatDuration } from '../utils/helpers';
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

function Dashboard() {
  const { habits } = useHabitStore();
  const { getAverageMood, getMoodTrend } = useMoodStore();
  const { getDailyTotal, getCategoryBreakdown } = useTimeStore();

  const averageMood = getAverageMood(7);
  const moodTrend = getMoodTrend(7);
  const todayTotal = getDailyTotal(new Date());
  const categoryBreakdown = getCategoryBreakdown(7);

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

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h1>

      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-sm font-medium text-gray-500 mb-2">
            Active Habits
          </h2>
          <p className="text-3xl font-bold text-gray-900">{habits.length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-sm font-medium text-gray-500 mb-2">
            7-Day Mood Average
          </h2>
          <div className="flex items-center">
            <span className="text-3xl font-bold text-gray-900 mr-2">
              {averageMood.toFixed(1)}
            </span>
            <span className="text-2xl">{getMoodEmoji(Math.round(averageMood))}</span>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-sm font-medium text-gray-500 mb-2">
            Today's Tracked Time
          </h2>
          <p className="text-3xl font-bold text-gray-900">
            {formatDuration(todayTotal)}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-medium mb-4">Mood Trend</h2>
          <Line data={moodChartData} />
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-medium mb-4">Active Habits</h2>
          <div className="space-y-4">
            {habits.slice(0, 5).map((habit) => (
              <div
                key={habit.id}
                className="flex items-center justify-between"
              >
                <div>
                  <h3 className="font-medium">{habit.name}</h3>
                  <p className="text-sm text-gray-500">
                    {habit.streak} day streak
                  </p>
                </div>
                <div className="text-2xl">
                  {habit.streak >= 30
                    ? '🔥'
                    : habit.streak >= 7
                    ? '⚡'
                    : '✨'}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;