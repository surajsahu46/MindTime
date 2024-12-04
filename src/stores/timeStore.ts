import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { TimeEntry } from '../types';
import { generateId } from '../utils/helpers';

interface TimeStore {
  entries: TimeEntry[];
  activeEntry: TimeEntry | null;
  addEntry: (entry: Omit<TimeEntry, 'id' | 'duration'>) => void;
  removeEntry: (id: string) => void;
  startTracking: (activity: string, category: string) => void;
  stopTracking: () => void;
  getDailyTotal: (date: Date) => number;
  getCategoryBreakdown: (days: number) => { category: string; duration: number }[];
}

export const useTimeStore = create<TimeStore>()(
  persist(
    (set, get) => ({
      entries: [],
      activeEntry: null,
      addEntry: (entryData) => {
        const duration = 
          (entryData.endTime.getTime() - entryData.startTime.getTime()) / 1000;
        
        const newEntry: TimeEntry = {
          id: generateId(),
          duration,
          ...entryData,
        };
        set((state) => ({ entries: [...state.entries, newEntry] }));
      },
      removeEntry: (id) => {
        set((state) => ({
          entries: state.entries.filter((entry) => entry.id !== id),
        }));
      },
      startTracking: (activity, category) => {
        if (get().activeEntry) return;
        
        const newEntry: TimeEntry = {
          id: generateId(),
          activity,
          category,
          startTime: new Date(),
          endTime: new Date(),
          duration: 0,
        };
        set({ activeEntry: newEntry });
      },
      stopTracking: () => {
        const activeEntry = get().activeEntry;
        if (!activeEntry) return;

        const endTime = new Date();
        const duration = 
          (endTime.getTime() - activeEntry.startTime.getTime()) / 1000;

        const completedEntry: TimeEntry = {
          ...activeEntry,
          endTime,
          duration,
        };

        set((state) => ({
          entries: [...state.entries, completedEntry],
          activeEntry: null,
        }));
      },
      getDailyTotal: (date) => {
        const dateStr = date.toISOString().split('T')[0];
        return get().entries
          .filter(
            (entry) => 
              entry.startTime.toISOString().split('T')[0] === dateStr
          )
          .reduce((total, entry) => total + entry.duration, 0);
      },
      getCategoryBreakdown: (days) => {
        const entries = get().entries;
        const cutoff = new Date();
        cutoff.setDate(cutoff.getDate() - days);

        const categoryTotals: { [key: string]: number } = {};
        
        entries
          .filter((entry) => entry.startTime > cutoff)
          .forEach((entry) => {
            if (!categoryTotals[entry.category]) {
              categoryTotals[entry.category] = 0;
            }
            categoryTotals[entry.category] += entry.duration;
          });

        return Object.entries(categoryTotals).map(([category, duration]) => ({
          category,
          duration,
        }));
      },
    }),
    {
      name: 'time-storage',
    }
  )
);