
import React, { useState, useEffect } from "react";
import DriverLayout from "@/components/DriverLayout";
import EazyGoToggle from "@/components/EazyGoToggle";
import LocationDisplay from "@/components/LocationDisplay";
import MapView from "@/components/MapView";
import JobRequestCard from "@/components/JobRequestCard";
import { useDriver, DriverJob } from "@/contexts/DriverContext";
import { useToast } from "@/hooks/use-toast";

const DriverHome: React.FC = () => {
  const { driver, isOnline, setIsOnline, availableJobs, setAvailableJobs, setCurrentJob } = useDriver();
  const { toast } = useToast();
  const [mockJobs, setMockJobs] = useState<DriverJob[]>([]);

  // Mock job data for demonstration
  useEffect(() => {
    if (isOnline) {
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
      setMockJobs(sampleJobs);
      setAvailableJobs(sampleJobs);
    } else {
      setMockJobs([]);
      setAvailableJobs([]);
    }
  }, [isOnline, setAvailableJobs]);

  const handleToggleOnline = (online: boolean) => {
    setIsOnline(online);
    if (online) {
      toast({
        title: "EAZY GO is ON! 🚗",
        description: "You'll start receiving job requests in your area."
      });
    } else {
      toast({
        title: "EAZY GO is OFF",
        description: "You won't receive new job requests."
      });
    }
  };

  const handleAcceptJob = (job: DriverJob) => {
    setCurrentJob(job);
    const updatedJobs = mockJobs.filter(j => j.id !== job.id);
    setMockJobs(updatedJobs);
    setAvailableJobs(updatedJobs);
    
    toast({
      title: "Job Accepted! 🎉",
      description: `Navigate to ${job.customerName}'s location`
    });
  };

  const handleDeclineJob = (jobId: string) => {
    const updatedJobs = mockJobs.filter(j => j.id !== jobId);
    setMockJobs(updatedJobs);
    setAvailableJobs(updatedJobs);
    
    toast({
      title: "Job Declined",
      description: "The job has been removed from your queue"
    });
  };

  if (!driver) {
    return <div>Loading...</div>;
  }

  return (
    <DriverLayout>
      <div className="max-w-2xl mx-auto">
        {/* Location Display */}
        <LocationDisplay city="Los Angeles" state="CA" />
        
        {/* EAZY GO Toggle */}
        <EazyGoToggle isOnline={isOnline} onToggle={handleToggleOnline} />
        
        {/* Map View */}
        <div className="mb-6">
          <MapView 
            height="h-[300px]" 
            showCurrentLocation={true}
            interactive={true}
          />
        </div>

        {/* Available Jobs Section */}
        {isOnline && mockJobs.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-4">Available Requests</h2>
            <div className="space-y-4">
              {mockJobs.map((job) => (
                <JobRequestCard
                  key={job.id}
                  job={job}
                  onAccept={handleAcceptJob}
                  onDecline={handleDeclineJob}
                />
              ))}
            </div>
          </div>
        )}

        {/* Status Messages */}
        {isOnline && mockJobs.length === 0 && (
          <div className="text-center py-8">
            <p className="text-muted-foreground">Looking for requests...</p>
            <p className="text-sm text-muted-foreground mt-1">New requests will appear here automatically.</p>
          </div>
        )}

        {!isOnline && (
          <div className="text-center py-8">
            <p className="text-muted-foreground">Tap "EAZY GO!" to start receiving requests!</p>
          </div>
        )}
      </div>
    </DriverLayout>
  );
};

export default DriverHome;
