
import React, { useState, useEffect } from "react";
import DriverLayout from "@/components/DriverLayout";
import AyzgoToggle from "@/components/AyzgoToggle";
import QuickAccessGrid from "@/components/QuickAccessGrid";
import LocationDisplay from "@/components/LocationDisplay";
import MapView from "@/components/MapView";
import JobRequestCard from "@/components/JobRequestCard";
import InAppMessaging from "@/components/InAppMessaging";
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
        
        {/* Overlaid Components */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Top Section - Location Display and Quick Access Grid */}
          <div className="absolute top-4 left-4 right-4 pointer-events-auto space-y-3">
            <LocationDisplay city="Los Angeles" state="CA" />
            <QuickAccessGrid />
          </div>
          
          {/* Bottom Section - AYZGO Toggle */}
          <div className="absolute bottom-20 left-4 right-4 pointer-events-auto">
            <AyzgoToggle isOnline={isOnline} onToggle={handleToggleOnline} />
          </div>
          
          {/* Available Jobs - Overlay when online */}
          {isOnline && availableJobs.length > 0 && !currentJob && (
            <div className="absolute top-32 left-4 right-4 bottom-32 overflow-y-auto pointer-events-auto">
              <div className="bg-background/95 backdrop-blur-sm rounded-lg p-4 mb-4">
                <h2 className="text-xl font-bold text-center mb-4">Available Requests</h2>
                <div className="space-y-4">
                  {availableJobs.map((job) => (
                    <JobRequestCard
                      key={job.id}
                      job={job}
                      onAccept={handleAcceptJob}
                      onDecline={handleDeclineJob}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* In-App Messaging - Show when there's an active job */}
          {currentJob && showMessaging && (
            <div className="absolute top-32 left-4 right-4 bottom-32 pointer-events-auto">
              <InAppMessaging
                jobId={currentJob.id}
                customerName={currentJob.customerName}
                customerId={currentJob.customerId}
                driverId={driver.id}
              />
            </div>
          )}
          
          {/* Status Messages */}
          {isOnline && availableJobs.length === 0 && !currentJob && (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-auto">
              <div className="bg-background/95 backdrop-blur-sm rounded-lg p-6 text-center">
                <p className="text-muted-foreground">Looking for requests...</p>
                <p className="text-sm text-muted-foreground mt-1">New requests will appear here automatically.</p>
              </div>
            </div>
          )}

          {/* Active Job Indicator */}
          {currentJob && (
            <div className="absolute top-32 left-4 right-4 pointer-events-auto">
              <div className="bg-primary/95 backdrop-blur-sm rounded-lg p-4 text-primary-foreground">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold">Active Job: {currentJob.customerName}</h3>
                    <p className="text-sm opacity-90">{currentJob.serviceType} - ${currentJob.price}</p>
                  </div>
                  <button
                    onClick={() => setShowMessaging(!showMessaging)}
                    className="bg-white/20 hover:bg-white/30 px-3 py-1 rounded text-sm"
                  >
                    {showMessaging ? 'Hide Chat' : 'Show Chat'}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </DriverLayout>
  );
};

export default DriverHome;
