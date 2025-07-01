
interface LocationData {
  lat: number;
  lng: number;
  accuracy: number;
  timestamp: Date;
  heading?: number;
  speed?: number;
}

class LocationService {
  private watchId: number | null = null;
  private lastKnownPosition: LocationData | null = null;
  private listeners: Function[] = [];

  async getCurrentLocation(): Promise<LocationData> {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation not supported'));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const locationData: LocationData = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            accuracy: position.coords.accuracy,
            timestamp: new Date(),
            heading: position.coords.heading || undefined,
            speed: position.coords.speed || undefined
          };
          
          this.lastKnownPosition = locationData;
          resolve(locationData);
        },
        (error) => {
          console.error('Error getting location:', error);
          reject(error);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 60000
        }
      );
    });
  }

  startLocationTracking() {
    if (!navigator.geolocation) {
      console.error('Geolocation not supported');
      return;
    }

    this.watchId = navigator.geolocation.watchPosition(
      (position) => {
        const locationData: LocationData = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          accuracy: position.coords.accuracy,
          timestamp: new Date(),
          heading: position.coords.heading || undefined,
          speed: position.coords.speed || undefined
        };

        this.lastKnownPosition = locationData;
        this.notifyListeners(locationData);
      },
      (error) => {
        console.error('Error tracking location:', error);
      },
      {
        enableHighAccuracy: true,
        timeout: 30000,
        maximumAge: 5000
      }
    );

    console.log('Location tracking started');
  }

  stopLocationTracking() {
    if (this.watchId !== null) {
      navigator.geolocation.clearWatch(this.watchId);
      this.watchId = null;
      console.log('Location tracking stopped');
    }
  }

  onLocationUpdate(callback: (location: LocationData) => void) {
    this.listeners.push(callback);
  }

  offLocationUpdate(callback: (location: LocationData) => void) {
    const index = this.listeners.indexOf(callback);
    if (index > -1) {
      this.listeners.splice(index, 1);
    }
  }

  private notifyListeners(location: LocationData) {
    this.listeners.forEach(callback => callback(location));
  }

  getLastKnownPosition(): LocationData | null {
    return this.lastKnownPosition;
  }

  async shareLocationWithCustomer(jobId: string) {
    try {
      const location = await this.getCurrentLocation();
      // This would send location to your backend API
      console.log(`Sharing location for job ${jobId}:`, location);
      
      // Integration with WebSocket to send real-time location
      return location;
    } catch (error) {
      console.error('Failed to share location:', error);
      throw error;
    }
  }
}

export const locationService = new LocationService();
