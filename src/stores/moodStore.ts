import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { MoodEntry } from '../types';
import { generateId } from '../utils/helpers';

interface MoodStore {
  entries: MoodEntry[];
  addEntry: (entry: Omit<MoodEntry, 'id' | 'timestamp'>) => void;
  removeEntry: (id: string) => void;
  getAverageMood: (days: number) => number;
  getMoodTrend: (days: number) => { date: string; average: number }[];
}

export const useMoodStore = create<MoodStore>()(
  persist(
    (set, get) => ({
      entries: [],
      addEntry: (entryData) => {
        const newEntry: MoodEntry = {
          id: generateId(),
          timestamp: new Date(),
          ...entryData,
        };
        set((state) => ({ entries: [...state.entries, newEntry] }));
      },
      removeEntry: (id) => {
        set((state) => ({
          entries: state.entries.filter((entry) => entry.id !== id),
        }));
      },
      getAverageMood: (days) => {
        const entries = get().entries;
        const cutoff = new Date();
        cutoff.setDate(cutoff.getDate() - days);

        const recentEntries = entries.filter(
          (entry) => entry.timestamp > cutoff
        );

        if (recentEntries.length === 0) return 0;

        const sum = recentEntries.reduce((acc, entry) => acc + entry.mood, 0);
        return sum / recentEntries.length;
      },
      getMoodTrend: (days) => {
        const entries = get().entries;
        const trend: { [key: string]: number[] } = {};
        
        const cutoff = new Date();
        cutoff.setDate(cutoff.getDate() - days);

        entries
          .filter((entry) => entry.timestamp > cutoff)
          .forEach((entry) => {
            const dateStr = entry.timestamp.toISOString().split('T')[0];
            if (!trend[dateStr]) trend[dateStr] = [];
            trend[dateStr].push(entry.mood);
          });

        return Object.entries(trend).map(([date, moods]) => ({
          date,
          average: moods.reduce((a, b) => a + b, 0) / moods.length,
        }));
      },
    }),
    {
      name: 'mood-storage',
    }
  )
);