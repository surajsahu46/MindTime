import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Habit } from '../types';
import { generateId } from '../utils/helpers';

interface HabitStore {
  habits: Habit[];
  addHabit: (habit: Omit<Habit, 'id' | 'createdAt' | 'streak' | 'completedDates'>) => void;
  removeHabit: (id: string) => void;
  toggleHabit: (id: string, date: Date) => void;
  getStreak: (id: string) => number;
}

export const useHabitStore = create<HabitStore>()(
  persist(
    (set, get) => ({
      habits: [],
      addHabit: (habitData) => {
        const newHabit: Habit = {
          id: generateId(),
          createdAt: new Date(),
          streak: 0,
          completedDates: [],
          ...habitData,
        };
        set((state) => ({ habits: [...state.habits, newHabit] }));
      },
      removeHabit: (id) => {
        set((state) => ({
          habits: state.habits.filter((habit) => habit.id !== id),
        }));
      },
      toggleHabit: (id, date) => {
        set((state) => ({
          habits: state.habits.map((habit) => {
            if (habit.id !== id) return habit;
            
            const dateStr = date.toISOString().split('T')[0];
            const isCompleted = habit.completedDates.some(
              (d) => d.toISOString().split('T')[0] === dateStr
            );

            const newCompletedDates = isCompleted
              ? habit.completedDates.filter(
                  (d) => d.toISOString().split('T')[0] !== dateStr
                )
              : [...habit.completedDates, date];

            return {
              ...habit,
              completedDates: newCompletedDates,
              streak: get().getStreak(id),
            };
          }),
        }));
      },
      getStreak: (id) => {
        const habit = get().habits.find((h) => h.id === id);
        if (!habit) return 0;

        const sortedDates = [...habit.completedDates].sort(
          (a, b) => b.getTime() - a.getTime()
        );
        if (sortedDates.length === 0) return 0;

        let streak = 1;
        for (let i = 1; i < sortedDates.length; i++) {
          const diff = Math.abs(
            (sortedDates[i - 1].getTime() - sortedDates[i].getTime()) /
              (1000 * 60 * 60 * 24)
          );
          if (diff === 1) streak++;
          else break;
        }
        return streak;
      },
    }),
    {
      name: 'habits-storage',
    }
  )
);