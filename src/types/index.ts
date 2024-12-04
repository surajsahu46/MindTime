export interface Habit {
  id: string;
  name: string;
  description?: string;
  frequency: 'daily' | 'weekly' | 'monthly';
  timeOfDay?: string;
  createdAt: Date;
  streak: number;
  completedDates: Date[];
}

export interface MoodEntry {
  id: string;
  mood: 1 | 2 | 3 | 4 | 5;
  notes?: string;
  activities: string[];
  timestamp: Date;
}

export interface TimeEntry {
  id: string;
  activity: string;
  category: string;
  startTime: Date;
  endTime: Date;
  duration: number;
  notes?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  preferences: {
    theme: 'light' | 'dark';
    reminderTime?: string;
    weekStartsOn: 0 | 1; // 0 for Sunday, 1 for Monday
  };
}