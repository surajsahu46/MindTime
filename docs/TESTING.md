# Testing Strategy Guide

## Unit Testing

### Component Tests
```typescript
// src/__tests__/components/HabitCard.test.tsx
import { render, fireEvent } from '@testing-library/react';
import HabitCard from '../../components/HabitCard';

describe('HabitCard', () => {
  const mockHabit = {
    id: '1',
    name: 'Exercise',
    streak: 5,
    frequency: 'daily',
    completedDates: []
  };

  it('renders habit information correctly', () => {
    const { getByText } = render(<HabitCard habit={mockHabit} />);
    expect(getByText('Exercise')).toBeInTheDocument();
    expect(getByText('5 day streak')).toBeInTheDocument();
  });

  it('handles completion toggle', () => {
    const onToggle = jest.fn();
    const { getByRole } = render(
      <HabitCard habit={mockHabit} onToggle={onToggle} />
    );
    
    fireEvent.click(getByRole('button', { name: /mark complete/i }));
    expect(onToggle).toHaveBeenCalledWith(mockHabit.id);
  });
});
```

### Store Tests
```typescript
// src/__tests__/stores/habitStore.test.ts
import { renderHook, act } from '@testing-library/react-hooks';
import { useHabitStore } from '../../stores/habitStore';

describe('habitStore', () => {
  it('adds a new habit', () => {
    const { result } = renderHook(() => useHabitStore());
    
    act(() => {
      result.current.addHabit({
        name: 'Meditation',
        frequency: 'daily'
      });
    });

    expect(result.current.habits).toHaveLength(1);
    expect(result.current.habits[0].name).toBe('Meditation');
  });
});
```

## Integration Tests

### API Integration
```typescript
// src/__tests__/integration/api.test.ts
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { render, waitFor } from '@testing-library/react';
import Dashboard from '../../pages/Dashboard';

const server = setupServer(
  rest.get('/api/v1/habits', (req, res, ctx) => {
    return res(
      ctx.json({
        habits: [
          { id: '1', name: 'Reading', streak: 3 }
        ]
      })
    );
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('fetches and displays habits', async () => {
  const { getByText } = render(<Dashboard />);
  
  await waitFor(() => {
    expect(getByText('Reading')).toBeInTheDocument();
  });
});
```

## E2E Tests

### Cypress Tests
```typescript
// cypress/integration/habit.spec.ts
describe('Habit Tracking', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.login(); // Custom command for authentication
  });

  it('creates and completes a habit', () => {
    cy.get('[data-testid="add-habit-button"]').click();
    cy.get('[data-testid="habit-name-input"]').type('Morning Walk');
    cy.get('[data-testid="save-habit-button"]').click();
    
    cy.contains('Morning Walk').should('be.visible');
    cy.get('[data-testid="complete-habit-button"]').click();
    cy.contains('1 day streak').should('be.visible');
  });
});
```