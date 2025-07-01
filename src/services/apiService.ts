
interface APIResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

interface JobUpdatePayload {
  jobId: string;
  status: string;
  location?: { lat: number; lng: number };
  estimatedArrival?: Date;
  notes?: string;
}

class APIService {
  private baseURL = process.env.NODE_ENV === 'production' 
    ? 'https://api.ayzgo.com' 
    : 'http://localhost:3001';

  private async request<T>(
    endpoint: string, 
    options: RequestInit = {}
  ): Promise<APIResponse<T>> {
    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.getAuthToken()}`,
          ...options.headers,
        },
        ...options,
      });

      const data = await response.json();
      
      if (!response.ok) {
        return {
          success: false,
          error: data.message || 'Request failed'
        };
      }

      return {
        success: true,
        data
      };
    } catch (error) {
      console.error('API request failed:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Network error'
      };
    }
  }

  private getAuthToken(): string {
    // This would get the actual auth token from your auth service
    return localStorage.getItem('driver_token') || '';
  }

  // Driver Authentication
  async loginDriver(email: string, password: string) {
    return this.request('/auth/driver/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    });
  }

  async refreshToken() {
    return this.request('/auth/refresh', {
      method: 'POST'
    });
  }

  // Job Management
  async updateJobStatus(payload: JobUpdatePayload) {
    return this.request(`/jobs/${payload.jobId}/status`, {
      method: 'PUT',
      body: JSON.stringify(payload)
    });
  }

  async acceptJob(jobId: string, driverId: string) {
    return this.request(`/jobs/${jobId}/accept`, {
      method: 'POST',
      body: JSON.stringify({ driverId })
    });
  }

  async declineJob(jobId: string, driverId: string, reason?: string) {
    return this.request(`/jobs/${jobId}/decline`, {
      method: 'POST',
      body: JSON.stringify({ driverId, reason })
    });
  }

  async getAvailableJobs(driverId: string, location: { lat: number; lng: number }) {
    return this.request(`/jobs/available?driverId=${driverId}&lat=${location.lat}&lng=${location.lng}`);
  }

  async completeJob(jobId: string, completionData: any) {
    return this.request(`/jobs/${jobId}/complete`, {
      method: 'POST',
      body: JSON.stringify(completionData)
    });
  }

  // Location Services
  async updateDriverLocation(driverId: string, location: { lat: number; lng: number }) {
    return this.request(`/drivers/${driverId}/location`, {
      method: 'PUT',
      body: JSON.stringify(location)
    });
  }

  async shareLocationWithCustomer(jobId: string, location: { lat: number; lng: number }) {
    return this.request(`/jobs/${jobId}/location`, {
      method: 'POST',
      body: JSON.stringify(location)
    });
  }

  // Messaging
  async sendMessage(jobId: string, recipientId: string, message: string, type: string = 'text') {
    return this.request(`/jobs/${jobId}/messages`, {
      method: 'POST',
      body: JSON.stringify({ recipientId, message, type })
    });
  }

  async getJobMessages(jobId: string) {
    return this.request(`/jobs/${jobId}/messages`);
  }

  // Driver Status
  async updateDriverStatus(driverId: string, isOnline: boolean) {
    return this.request(`/drivers/${driverId}/status`, {
      method: 'PUT',
      body: JSON.stringify({ isOnline })
    });
  }

  async getDriverProfile(driverId: string) {
    return this.request(`/drivers/${driverId}`);
  }

  async updateDriverProfile(driverId: string, profileData: any) {
    return this.request(`/drivers/${driverId}`, {
      method: 'PUT',
      body: JSON.stringify(profileData)
    });
  }

  // Analytics & Reporting
  async getDriverEarnings(driverId: string, period: 'today' | 'week' | 'month') {
    return this.request(`/drivers/${driverId}/earnings?period=${period}`);
  }

  async getJobHistory(driverId: string, page: number = 1, limit: number = 20) {
    return this.request(`/drivers/${driverId}/jobs?page=${page}&limit=${limit}`);
  }

  async submitJobFeedback(jobId: string, rating: number, feedback?: string) {
    return this.request(`/jobs/${jobId}/feedback`, {
      method: 'POST',
      body: JSON.stringify({ rating, feedback })
    });
  }

  // Emergency & Safety
  async reportEmergency(driverId: string, jobId: string, emergencyType: string, location: { lat: number; lng: number }) {
    return this.request(`/emergency/report`, {
      method: 'POST',
      body: JSON.stringify({ driverId, jobId, emergencyType, location })
    });
  }

  async reportIncident(jobId: string, incidentData: any) {
    return this.request(`/incidents/report`, {
      method: 'POST',
      body: JSON.stringify({ jobId, ...incidentData })
    });
  }
}

export const apiService = new APIService();
