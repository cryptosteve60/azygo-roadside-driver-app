
import React, { useState, useEffect } from "react";
import DriverLayout from "@/components/DriverLayout";
import { Button } from "@/components/ui/button";
import { useDriver } from "@/contexts/DriverContext";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import JobStatusBadge from "@/components/JobStatusBadge";
import CustomerInfoCard from "@/components/CustomerInfoCard";
import SafetyPinCard from "@/components/SafetyPinCard";
import JobActionButtons from "@/components/JobActionButtons";
import InAppMessaging from "@/components/InAppMessaging";
import { useRealTimeConnection } from "@/hooks/useRealTimeConnection";
import { locationService } from "@/services/locationService";
import { apiService } from "@/services/apiService";

const DriverActiveJob: React.FC = () => {
  const { currentJob, setCurrentJob, driver } = useDriver();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { updateJobStatus } = useRealTimeConnection();
  const [jobStatus, setJobStatus] = useState<"available" | "accepted" | "enroute" | "arrived" | "inProgress" | "completed">(
    currentJob?.status || "accepted"
  );
  const [showMessaging, setShowMessaging] = useState(false);

  useEffect(() => {
    if (currentJob) {
      setJobStatus(currentJob.status);
    }
  }, [currentJob]);

  if (!currentJob || !driver) {
    return (
      <DriverLayout>
        <div className="max-w-2xl mx-auto text-center py-8">
          <p className="text-muted-foreground">No active job</p>
          <Button onClick={() => navigate("/driver/home")} className="mt-4">
            Back to Home
          </Button>
        </div>
      </DriverLayout>
    );
  }

  const handleStatusUpdate = async (newStatus: "available" | "accepted" | "enroute" | "arrived" | "inProgress" | "completed") => {
    try {
      // Get current location for status update
      const location = await locationService.getCurrentLocation();
      
      // Update status on server
      const response = await updateJobStatus(currentJob.id, newStatus, {
        location: { lat: location.lat, lng: location.lng },
        estimatedArrival: newStatus === 'enroute' ? new Date(Date.now() + 15 * 60000) : undefined
      });

      if (response?.success !== false) {
        setJobStatus(newStatus);
        const updatedJob = { ...currentJob, status: newStatus };
        setCurrentJob(updatedJob);

        const statusMessages = {
          available: "Job is now available",
          accepted: "Job accepted!",
          enroute: "Customer notified: You're on your way! 🚗",
          arrived: "Customer notified: You've arrived! 📍", 
          inProgress: "Job started. Keep the customer updated! 🔧",
          completed: "Job completed successfully! 🎉"
        };

        toast({
          title: "Status Updated",
          description: statusMessages[newStatus]
        });

        // Share location with customer when en route or arrived
        if (newStatus === 'enroute' || newStatus === 'arrived') {
          try {
            await locationService.shareLocationWithCustomer(currentJob.id);
          } catch (error) {
            console.error('Failed to share location:', error);
          }
        }

        if (newStatus === "completed") {
          setTimeout(() => {
            setCurrentJob(null);
            navigate("/driver/home");
          }, 2000);
        }
      }
    } catch (error) {
      console.error('Failed to update job status:', error);
      toast({
        title: "Error",
        description: "Failed to update status. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleEmergency = async () => {
    try {
      const location = await locationService.getCurrentLocation();
      
      const response = await apiService.reportEmergency(
        driver.id,
        currentJob.id,
        'general',
        { lat: location.lat, lng: location.lng }
      );

      if (response.success) {
        toast({
          title: "Emergency Reported",
          description: "Emergency services have been notified. Stay safe!",
        });
      }
    } catch (error) {
      console.error('Failed to report emergency:', error);
      toast({
        title: "Emergency Report Failed",
        description: "Please call 911 directly if needed.",
        variant: "destructive"
      });
    }
  };

  return (
    <DriverLayout>
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold mb-2">Active Job</h1>
              <JobStatusBadge status={jobStatus} />
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setShowMessaging(!showMessaging)}
              >
                {showMessaging ? 'Hide Chat' : 'Chat'}
              </Button>
              <Button 
                variant="destructive" 
                size="sm"
                onClick={handleEmergency}
              >
                Emergency
              </Button>
            </div>
          </div>
        </div>

        <CustomerInfoCard job={currentJob} />
        <SafetyPinCard safetyPin={currentJob.safetyPin} />
        
        {showMessaging && (
          <div className="mb-6">
            <InAppMessaging
              jobId={currentJob.id}
              customerName={currentJob.customerName}
              customerId={currentJob.customerId}
              driverId={driver.id}
            />
          </div>
        )}
        
        <JobActionButtons 
          job={currentJob} 
          jobStatus={jobStatus} 
          onStatusUpdate={handleStatusUpdate} 
        />
      </div>
    </DriverLayout>
  );
};

export default DriverActiveJob;
