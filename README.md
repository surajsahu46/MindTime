# MindTime - Personal Habit, Mood, and Time Tracker

MindTime is a comprehensive web application that helps users track their habits, monitor their moods, and manage their time effectively. Built with React and TypeScript, it provides an intuitive interface for personal development and well-being monitoring.

## Features

### 🎯 Habit Tracking
- Create and manage custom habits with flexible frequencies (daily, weekly, monthly)
- Track daily completion status with visual indicators
- Monitor streak counts with achievement badges
- View habit performance statistics and completion rates
- Smart reminders based on habit schedules

### 😊 Mood Monitoring
- Log mood entries with a 5-point emoji rating system
- Add context with customizable activities and detailed notes
- Visualize mood trends over time with interactive charts
- Track emotional patterns and correlations with activities
- Daily mood summaries and weekly insights

### ⏱️ Time Management
- Real-time activity tracking with one-click start/stop
- Categorize time entries with customizable labels
- Detailed time distribution analytics
- Visual breakdowns of time allocation
- Export time tracking data for external analysis

### 📊 Comprehensive Reports
- Cross-feature analytics showing habit-mood-time correlations
- Customizable date ranges for trend analysis
- Interactive charts and visualizations using Chart.js
- Performance metrics and actionable insights
- Exportable reports in multiple formats

## Tech Stack

### Frontend
- **Core**: React 18 with TypeScript
- **State Management**: Zustand with persist middleware
- **Routing**: React Router v6
- **Styling**: Tailwind CSS with custom configuration
- **Charts**: Chart.js with react-chartjs-2
- **Icons**: Heroicons
- **Forms**: React Hook Form
- **Date Handling**: date-fns
- **Build Tool**: Vite

### Data Management
- **State Management**: Zustand stores with TypeScript
- **Persistence**: LocalStorage with Zustand persist
- **Data Validation**: TypeScript interfaces
- **API Integration**: Axios (prepared for backend integration)

## Project Structure

\`\`\`
src/
├── components/          # Reusable UI components
│   ├── Layout/         # Layout components
│   ├── Charts/         # Chart components
│   └── common/         # Shared components
├── pages/              # Main application pages
├── stores/             # Zustand state management
│   ├── habitStore.ts
│   ├── moodStore.ts
│   └── timeStore.ts
├── types/              # TypeScript interfaces
├── utils/              # Helper functions
│   ├── helpers.ts      # General utilities
│   └── constants.ts    # App constants
└── App.tsx             # Main application component
\`\`\`

## Detailed Component Architecture

### Store Design
Each store follows a consistent pattern:
\`\`\`typescript
interface Store {
  data: DataType[];
  actions: {
    add: (item: DataType) => void;
    remove: (id: string) => void;
    update: (id: string, data: Partial<DataType>) => void;
  };
  selectors: {
    getStats: () => Stats;
    getFiltered: (criteria: FilterCriteria) => DataType[];
  };
}
\`\`\`

### Data Models
Comprehensive TypeScript interfaces for all data types:
\`\`\`typescript
interface Habit {
  id: string;
  name: string;
  description?: string;
  frequency: 'daily' | 'weekly' | 'monthly';
  timeOfDay?: string;
  createdAt: Date;
  streak: number;
  completedDates: Date[];
}

interface MoodEntry {
  id: string;
  mood: 1 | 2 | 3 | 4 | 5;
  notes?: string;
  activities: string[];
  timestamp: Date;
}

interface TimeEntry {
  id: string;
  activity: string;
  category: string;
  startTime: Date;
  endTime: Date;
  duration: number;
  notes?: string;
}
\`\`\`

## Getting Started

### Prerequisites
- Node.js 16.x or higher
- npm 7.x or higher

### Installation
1. Clone the repository:
   \`\`\`bash
   git clone [https://github.com/yourusername/mindtime.git](https://github.com/surajsahu46/MindTime/)
   cd mindtime
   \`\`\`

2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

3. Start the development server:
   \`\`\`bash
   npm run dev
   \`\`\`

### Available Scripts
- \`npm run dev\` - Start development server
- \`npm run build\` - Build for production
- \`npm run preview\` - Preview production build
- \`npm run lint\` - Run ESLint
- \`npm run test\` - Run Vitest tests

## Development Guidelines

### Code Style
- Follow TypeScript best practices
- Use functional components with hooks
- Implement proper error handling
- Write meaningful component and function names
- Add JSDoc comments for complex functions

### State Management
- Use Zustand for global state
- Implement proper TypeScript types
- Use selectors for derived state
- Maintain atomic updates
- Implement proper error handling

### Testing
- Write unit tests for utilities
- Test complex components
- Mock external dependencies
- Test error scenarios
- Maintain good test coverage

## Performance Optimization

### Implemented Optimizations
- Lazy loading of routes
- Memoization of expensive calculations
- Efficient re-rendering with React.memo
- Optimized chart rendering
- Proper key usage in lists

### Future Optimizations
- Implement virtual scrolling for long lists
- Add service worker for offline support
- Optimize bundle size
- Add data caching
- Implement request debouncing

## Contributing

1. Fork the repository
2. Create a feature branch (\`git checkout -b feature/AmazingFeature\`)
3. Commit your changes (\`git commit -m 'Add some AmazingFeature'\`)
4. Push to the branch (\`git push origin feature/AmazingFeature\`)
5. Open a Pull Request

### Contribution Guidelines
- Follow the existing code style
- Add proper documentation
- Write meaningful commit messages
- Add tests for new features
- Update README if needed

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Acknowledgments

- React team for the amazing framework
- Tailwind CSS team for the styling framework
- Chart.js team for the visualization library
- All other open-source contributors

## Support

For support, email support@mindtime.app or open an issue in the repository.
