import { useEffect, useCallback } from 'react';
import { websocketService } from '@/services/websocketService';
import { notificationService } from '@/services/notificationService';
import { locationService } from '@/services/locationService';
import { apiService } from '@/services/apiService';
import { useDriver, DriverJob } from '@/contexts/DriverContext';
import { useToast } from '@/hooks/use-toast';

export const useRealTimeConnection = () => {
  const { driver, setAvailableJobs, setCurrentJob, isOnline, availableJobs } = useDriver();
  const { toast } = useToast();

  // Initialize services
  useEffect(() => {
    const initializeServices = async () => {
      if (!driver) return;

      // Initialize notifications
      await notificationService.initialize();

      // Connect WebSocket
      websocketService.connect(driver.id);

      // Set up WebSocket listeners
      websocketService.on('NEW_JOB', handleNewJob);
      websocketService.on('JOB_UPDATE', handleJobUpdate);
      websocketService.on('MESSAGE', handleNewMessage);
      websocketService.on('STATUS_CHANGE', handleStatusChange);

      // Start location tracking if online
      if (isOnline) {
        locationService.startLocationTracking();
        locationService.onLocationUpdate(handleLocationUpdate);
      }
    };

    initializeServices();

    return () => {
      websocketService.disconnect();
      locationService.stopLocationTracking();
    };
  }, [driver?.id, isOnline]);

  const handleNewJob = useCallback(async (jobData: any) => {
    console.log('New job received:', jobData);
    
    // Update available jobs - use direct array update instead of function
    setAvailableJobs([...availableJobs, jobData as DriverJob]);
    
    // Show notification
    await notificationService.showJobNotification(jobData);
    
    // Show in-app toast
    toast({
      title: "New Job Available! 🚗",
      description: `${jobData.serviceType} service - $${jobData.price}`,
    });
  }, [setAvailableJobs, availableJobs, toast]);

  const handleJobUpdate = useCallback((updateData: any) => {
    console.log('Job update received:', updateData);
    
    if (updateData.type === 'ACCEPTED' && updateData.jobId) {
      // Update current job
      setCurrentJob(updateData.job);
      
      toast({
        title: "Job Status Updated",
        description: updateData.message || "Job has been updated"
      });
    }
  }, [setCurrentJob, toast]);

  const handleNewMessage = useCallback(async (messageData: any) => {
    console.log('New message received:', messageData);
    
    if (messageData.senderType === 'customer') {
      await notificationService.showMessageNotification(
        messageData.customerName,
        messageData.message
      );
    }
  }, []);

  const handleStatusChange = useCallback((statusData: any) => {
    console.log('Status change received:', statusData);
    
    toast({
      title: "Status Updated",
      description: statusData.message
    });
  }, [toast]);

  const handleLocationUpdate = useCallback(async (location: any) => {
    if (!driver || !isOnline) return;

    try {
      // Update location on server
      await apiService.updateDriverLocation(driver.id, {
        lat: location.lat,
        lng: location.lng
      });

      // Send real-time location update via WebSocket
      websocketService.send('LOCATION_UPDATE', {
        driverId: driver.id,
        location: {
          lat: location.lat,
          lng: location.lng,
          timestamp: location.timestamp
        }
      });
    } catch (error) {
      console.error('Failed to update location:', error);
    }
  }, [driver?.id, isOnline]);

  const updateJobStatus = useCallback(async (jobId: string, status: string, additionalData?: any) => {
    try {
      const location = locationService.getLastKnownPosition();
      
      const response = await apiService.updateJobStatus({
        jobId,
        status,
        location: location ? { lat: location.lat, lng: location.lng } : undefined,
        ...additionalData
      });

      if (response.success) {
        // Send real-time update
        websocketService.send('STATUS_CHANGE', {
          jobId,
          status,
          timestamp: new Date()
        });

        await notificationService.showStatusUpdateNotification(
          `Job status updated to: ${status}`
        );
      }

      return response;
    } catch (error) {
      console.error('Failed to update job status:', error);
      throw error;
    }
  }, []);

  const sendMessage = useCallback(async (jobId: string, recipientId: string, message: string) => {
    try {
      const response = await apiService.sendMessage(jobId, recipientId, message);
      
      if (response.success) {
        // Send via WebSocket for real-time delivery
        websocketService.send('MESSAGE', {
          jobId,
          recipientId,
          message,
          senderType: 'driver',
          timestamp: new Date()
        });
      }

      return response;
    } catch (error) {
      console.error('Failed to send message:', error);
      throw error;
    }
  }, []);

  return {
    updateJobStatus,
    sendMessage,
    isConnected: websocketService !== null
  };
};
