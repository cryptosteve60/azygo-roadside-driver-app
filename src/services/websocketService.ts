
interface WebSocketMessage {
  type: 'JOB_UPDATE' | 'NEW_JOB' | 'MESSAGE' | 'LOCATION_UPDATE' | 'STATUS_CHANGE';
  payload: any;
  timestamp: Date;
}

class WebSocketService {
  private ws: WebSocket | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectDelay = 1000;
  private listeners: Map<string, Function[]> = new Map();

  connect(driverId: string) {
    try {
      // Skip connection in development or when WebSocket server is not available
      if (import.meta.env.DEV) {
        console.log('WebSocket connection skipped in development mode');
        return;
      }
      
      // In production, this would be your WebSocket server URL
      const wsUrl = `wss://api.ayzgo.com/ws/driver/${driverId}`;
      
      this.ws = new WebSocket(wsUrl);
      
      this.ws.onopen = () => {
        console.log('WebSocket connected');
        this.reconnectAttempts = 0;
        this.emit('connected', null);
      };

      this.ws.onmessage = (event) => {
        try {
          const message: WebSocketMessage = JSON.parse(event.data);
          this.handleMessage(message);
        } catch (error) {
          console.error('Error parsing WebSocket message:', error);
        }
      };

      this.ws.onclose = () => {
        console.log('WebSocket disconnected');
        this.emit('disconnected', null);
        this.attemptReconnect(driverId);
      };

      this.ws.onerror = (error) => {
        console.error('WebSocket error:', error);
        this.emit('error', error);
      };
    } catch (error) {
      console.error('Failed to connect to WebSocket:', error);
    }
  }

  private handleMessage(message: WebSocketMessage) {
    console.log('Received WebSocket message:', message);
    this.emit(message.type, message.payload);
  }

  private attemptReconnect(driverId: string) {
    // Skip reconnection in development
    if (import.meta.env.DEV) {
      return;
    }
    
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      console.log(`Attempting to reconnect (${this.reconnectAttempts}/${this.maxReconnectAttempts})`);
      
      // Exponential backoff with maximum delay
      const delay = Math.min(this.reconnectDelay * Math.pow(2, this.reconnectAttempts - 1), 30000);
      
      setTimeout(() => {
        this.connect(driverId);
      }, delay);
    } else {
      console.log('Max reconnection attempts reached. Stopping reconnection.');
    }
  }

  send(type: string, payload: any) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      const message: WebSocketMessage = {
        type: type as any,
        payload,
        timestamp: new Date()
      };
      this.ws.send(JSON.stringify(message));
    } else {
      console.warn('WebSocket not connected, cannot send message');
    }
  }

  on(event: string, callback: Function) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    this.listeners.get(event)!.push(callback);
  }

  off(event: string, callback: Function) {
    const eventListeners = this.listeners.get(event);
    if (eventListeners) {
      const index = eventListeners.indexOf(callback);
      if (index > -1) {
        eventListeners.splice(index, 1);
      }
    }
  }

  private emit(event: string, data: any) {
    const eventListeners = this.listeners.get(event);
    if (eventListeners) {
      eventListeners.forEach(callback => callback(data));
    }
  }

  disconnect() {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
    this.listeners.clear();
  }
}

export const websocketService = new WebSocketService();
