
import React, { useState, useEffect } from "react";
import DriverLayout from "@/components/DriverLayout";
import MapView from "@/components/MapView";
import HomeOverlays from "@/components/HomeOverlays";
import { useDriver, DriverJob } from "@/contexts/DriverContext";
import { useToast } from "@/hooks/use-toast";
import { useRealTimeConnection } from "@/hooks/useRealTimeConnection";
import { locationService } from "@/services/locationService";
import { apiService } from "@/services/apiService";

const DriverHome: React.FC = () => {
  const { driver, isOnline, setIsOnline, availableJobs, setAvailableJobs, currentJob, setCurrentJob } = useDriver();
  const { toast } = useToast();
  const { updateJobStatus } = useRealTimeConnection();
  const [currentLocation, setCurrentLocation] = useState<{lat: number, lng: number} | null>(null);
  const [showMessaging, setShowMessaging] = useState(false);

  useEffect(() => {
    // Get current location
    locationService.getCurrentLocation()
      .then(location => {
        setCurrentLocation({ lat: location.lat, lng: location.lng });
      })
      .catch(error => {
        console.error('Failed to get location:', error);
      });
  }, []);

  // Mock job data for demonstration - in production this comes from WebSocket
  useEffect(() => {
    if (isOnline && !currentJob) {
      const sampleJobs: DriverJob[] = [
        {
          id: "job-1",
          customerId: "customer-123",
          customerName: "Sarah Wilson",
          customerPhone: "+1234567890",
          customerLocation: {
            lat: 34.0522,
            lng: -118.2437,
            address: "1234 Sunset Blvd, Los Angeles, CA"
          },
          serviceType: "battery",
          description: "Car won't start after leaving it parked overnight",
          vehicleDetails: "2019 Honda Civic, Blue",
          status: "available",
          price: 49,
          createdAt: new Date(),
          safetyPin: "1234",
          estimatedDuration: 25
        },
        {
          id: "job-2", 
          customerId: "customer-456",
          customerName: "Mike Chen",
          customerPhone: "+1234567891",
          customerLocation: {
            lat: 34.0622,
            lng: -118.2537,
            address: "5678 Hollywood Blvd, Los Angeles, CA"
          },
          serviceType: "tire",
          description: "Flat tire on the front left wheel",
          vehicleDetails: "2021 Toyota Camry, Silver",
          status: "available",
          price: 69,
          createdAt: new Date(),
          safetyPin: "5678",
          estimatedDuration: 30
        }
      ];
      setAvailableJobs(sampleJobs);
    } else if (!isOnline) {
      setAvailableJobs([]);
    }
  }, [isOnline, currentJob, setAvailableJobs]);

  const handleToggleOnline = async (online: boolean) => {
    if (!driver) return;

    try {
      // Update status on server
      const response = await apiService.updateDriverStatus(driver.id, online);
      
      if (response.success) {
        setIsOnline(online);
        
        if (online) {
          toast({
            title: "AYZGO is ON! 🚗",
            description: "You'll start receiving job requests in your area."
          });
        } else {
          toast({
            title: "AYZGO is OFF",
            description: "You won't receive new job requests."
          });
        }
      } else {
        toast({
          title: "Error",
          description: "Failed to update status. Please try again.",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Failed to update driver status:', error);
      toast({
        title: "Connection Error",
        description: "Please check your internet connection.",
        variant: "destructive"
      });
    }
  };

  const handleAcceptJob = async (job: DriverJob) => {
    if (!driver) return;

    try {
      const response = await apiService.acceptJob(job.id, driver.id);
      
      if (response.success) {
        setCurrentJob(job);
        const updatedJobs = availableJobs.filter(j => j.id !== job.id);
        setAvailableJobs(updatedJobs);
        
        // Update job status to accepted
        await updateJobStatus(job.id, 'accepted');
        
        toast({
          title: "Job Accepted! 🎉",
          description: `Navigate to ${job.customerName}'s location`
        });
      } else {
        toast({
          title: "Failed to Accept Job",
          description: response.error || "Please try again",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Failed to accept job:', error);
      toast({
        title: "Error",
        description: "Failed to accept job. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleDeclineJob = async (jobId: string) => {
    if (!driver) return;

    try {
      const response = await apiService.declineJob(jobId, driver.id);
      
      if (response.success) {
        const updatedJobs = availableJobs.filter(j => j.id !== jobId);
        setAvailableJobs(updatedJobs);
        
        toast({
          title: "Job Declined",
          description: "The job has been removed from your queue"
        });
      }
    } catch (error) {
      console.error('Failed to decline job:', error);
    }
  };

  const handleToggleMessaging = () => {
    setShowMessaging(!showMessaging);
  };

  if (!driver) {
    return <div>Loading...</div>;
  }

  return (
    <DriverLayout>
      <div className="relative h-full -m-4">
        {/* Full-screen Map */}
        <MapView 
          height="h-full" 
          showCurrentLocation={true}
          interactive={true}
        />
        
        {/* All Overlaid Components */}
        <HomeOverlays
          isOnline={isOnline}
          availableJobs={availableJobs}
          currentJob={currentJob}
          driver={driver}
          showMessaging={showMessaging}
          onToggleOnline={handleToggleOnline}
          onAcceptJob={handleAcceptJob}
          onDeclineJob={handleDeclineJob}
          onToggleMessaging={handleToggleMessaging}
        />
      </div>
    </DriverLayout>
  );
};

export default DriverHome;
