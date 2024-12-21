// eventBus.ts
type Listener = (data: any) => void;

class CustomEvent {
  private events: Map<string, Listener[]>;

  constructor() {
    this.events = new Map();
  }

  // Emit an event
  emit(eventId: string, data?: any) {
    const listeners = this.events.get(eventId);
    if (listeners) {
      listeners.forEach((listener:Listener) => listener(data));
    }
  }

  // Subscribe to an event
  on(eventId: string, callback: Listener) {
    if (!this.events.has(eventId)) {
      this.events.set(eventId, []);
    }
    this.events.get(eventId)!.push(callback);
    return () => this.off(eventId, callback); // Return an unsubscribe function
  }

  // Unsubscribe from an event
  off(eventId: string, callback: Listener) {
    const listeners = this.events.get(eventId);
    if (listeners) {
      this.events.set(
        eventId,
        listeners.filter((listener) => listener !== callback)
      );
    }
  }
}

export const customEvent = new CustomEvent();