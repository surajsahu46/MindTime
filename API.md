# API Documentation

## Overview

MindTime's API is organized around REST principles. All requests should be made to endpoints beginning with `/api/v1/`.

## Authentication

```typescript
// Example authentication request
POST /api/v1/auth/login
{
  "email": "user@example.com",
  "password": "securepassword"
}
```

## Endpoints

### Habits

#### Get All Habits
```typescript
GET /api/v1/habits

Response:
{
  "habits": Habit[]
}
```

#### Create Habit
```typescript
POST /api/v1/habits
{
  "name": string,
  "description": string,
  "frequency": "daily" | "weekly" | "monthly",
  "timeOfDay": string
}
```

#### Update Habit
```typescript
PUT /api/v1/habits/:id
{
  "name": string,
  "description": string,
  "frequency": "daily" | "weekly" | "monthly",
  "timeOfDay": string
}
```

### Mood Entries

#### Get Mood Entries
```typescript
GET /api/v1/moods
Query params:
  - startDate: ISO date string
  - endDate: ISO date string

Response:
{
  "entries": MoodEntry[]
}
```

#### Create Mood Entry
```typescript
POST /api/v1/moods
{
  "mood": 1 | 2 | 3 | 4 | 5,
  "notes": string,
  "activities": string[]
}
```

### Time Tracking

#### Get Time Entries
```typescript
GET /api/v1/time
Query params:
  - startDate: ISO date string
  - endDate: ISO date string

Response:
{
  "entries": TimeEntry[]
}
```

#### Start Time Entry
```typescript
POST /api/v1/time/start
{
  "activity": string,
  "category": string
}
```

#### Stop Time Entry
```typescript
POST /api/v1/time/stop/:id
```

## Data Models

### Habit
```typescript
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
```

### MoodEntry
```typescript
interface MoodEntry {
  id: string;
  mood: 1 | 2 | 3 | 4 | 5;
  notes?: string;
  activities: string[];
  timestamp: Date;
}
```

### TimeEntry
```typescript
interface TimeEntry {
  id: string;
  activity: string;
  category: string;
  startTime: Date;
  endTime: Date;
  duration: number;
  notes?: string;
}
```

## Error Handling

The API uses conventional HTTP response codes:
- 2xx: Success
- 4xx: Client errors
- 5xx: Server errors

Error response format:
```typescript
{
  "error": {
    "code": string,
    "message": string,
    "details?: any
  }
}
```

## Rate Limiting

API requests are limited to:
- 100 requests per minute for authenticated users
- 20 requests per minute for unauthenticated users

## Versioning

The API is versioned through the URL path. Current version is v1.

## Testing

Test endpoints using the provided Postman collection:
[Download Postman Collection](https://api.mindtime.app/postman/collection.json)