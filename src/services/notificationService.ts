
interface NotificationPayload {
  title: string;
  body: string;
  icon?: string;
  badge?: string;
  data?: any;
  actions?: Array<{
    action: string;
    title: string;
    icon?: string;
  }>;
}

class NotificationService {
  private permission: NotificationPermission = 'default';

  async initialize() {
    if ('Notification' in window) {
      this.permission = await Notification.requestPermission();
      console.log('Notification permission:', this.permission);
    }

    // Register service worker for background notifications
    if ('serviceWorker' in navigator) {
      try {
        const registration = await navigator.serviceWorker.register('/sw.js');
        console.log('Service Worker registered:', registration);
      } catch (error) {
        console.error('Service Worker registration failed:', error);
      }
    }
  }

  async showNotification(payload: NotificationPayload) {
    if (this.permission !== 'granted') {
      console.warn('Notification permission not granted');
      return;
    }

    try {
      if ('serviceWorker' in navigator) {
        const registration = await navigator.serviceWorker.ready;
        await registration.showNotification(payload.title, {
          body: payload.body,
          icon: payload.icon || '/lovable-uploads/7c42b02b-c831-4e0f-9d90-c5bea3cb1b4e.png',
          badge: payload.badge || '/lovable-uploads/7c42b02b-c831-4e0f-9d90-c5bea3cb1b4e.png',
          data: payload.data,
          actions: payload.actions,
          requireInteraction: true,
          tag: 'ayzgo-driver'
        });
      } else {
        // Fallback to basic notification - only use supported properties
        new Notification(payload.title, {
          body: payload.body,
          icon: payload.icon || '/lovable-uploads/7c42b02b-c831-4e0f-9d90-c5bea3cb1b4e.png',
          data: payload.data
        });
      }
    } catch (error) {
      console.error('Failed to show notification:', error);
    }
  }

  async showJobNotification(job: any) {
    await this.showNotification({
      title: 'New Job Request!',
      body: `${job.serviceType} service needed - $${job.price}`,
      data: { jobId: job.id, type: 'NEW_JOB' },
      actions: [
        { action: 'accept', title: 'Accept Job' },
        { action: 'view', title: 'View Details' }
      ]
    });
  }

  async showStatusUpdateNotification(message: string) {
    await this.showNotification({
      title: 'Status Updated',
      body: message,
      data: { type: 'STATUS_UPDATE' }
    });
  }

  async showMessageNotification(customerName: string, message: string) {
    await this.showNotification({
      title: `Message from ${customerName}`,
      body: message,
      data: { type: 'MESSAGE' },
      actions: [
        { action: 'reply', title: 'Reply' },
        { action: 'view', title: 'View Chat' }
      ]
    });
  }
}

export const notificationService = new NotificationService();
