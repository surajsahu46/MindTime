type EventType = 'habit_created' | 'habit_completed' | 'mood_logged' | 'time_tracked';

interface AnalyticsEvent {
  type: EventType;
  data: Record<string, any>;
  timestamp: Date;
}

class Analytics {
  private events: AnalyticsEvent[] = [];
  private readonly MAX_EVENTS = 1000;

  trackEvent(type: EventType, data: Record<string, any>) {
    const event: AnalyticsEvent = {
      type,
      data,
      timestamp: new Date()
    };

    this.events.push(event);

    if (this.events.length > this.MAX_EVENTS) {
      this.events = this.events.slice(-this.MAX_EVENTS);
    }

    // In a real implementation, you would send this to your analytics service
    console.log('Analytics event:', event);
  }

  getEventsByType(type: EventType): AnalyticsEvent[] {
    return this.events.filter(event => event.type === type);
  }

  getEventsByDateRange(startDate: Date, endDate: Date): AnalyticsEvent[] {
    return this.events.filter(event => 
      event.timestamp >= startDate && event.timestamp <= endDate
    );
  }

  clearEvents() {
    this.events = [];
  }
}

export const analytics = new Analytics();