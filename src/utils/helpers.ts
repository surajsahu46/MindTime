export const generateId = (): string => {
  return Math.random().toString(36).substr(2, 9);
};

export const formatDuration = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  
  if (hours === 0) {
    return `${minutes}m`;
  }
  return `${hours}h ${minutes}m`;
};

export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  }).format(date);
};

export const getMoodEmoji = (mood: number): string => {
  const emojis = ['😢', '😕', '😐', '🙂', '😄'];
  return emojis[mood - 1] || '😐';
};

export const getStreakEmoji = (streak: number): string => {
  if (streak >= 30) return '🔥';
  if (streak >= 7) return '⚡';
  if (streak > 0) return '✨';
  return '▫️';
};