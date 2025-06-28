
import React, { useState } from "react";
import DriverLayout from "@/components/DriverLayout";
import { Button } from "@/components/ui/button";
import { useDriver } from "@/contexts/DriverContext";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import JobStatusBadge from "@/components/JobStatusBadge";
import CustomerInfoCard from "@/components/CustomerInfoCard";
import SafetyPinCard from "@/components/SafetyPinCard";
import JobActionButtons from "@/components/JobActionButtons";

const DriverActiveJob: React.FC = () => {
  const { currentJob, setCurrentJob } = useDriver();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [jobStatus, setJobStatus] = useState<"available" | "accepted" | "enroute" | "arrived" | "inProgress" | "completed">(
    currentJob?.status || "accepted"
  );

  if (!currentJob) {
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

  const handleStatusUpdate = (newStatus: "available" | "accepted" | "enroute" | "arrived" | "inProgress" | "completed") => {
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

    if (newStatus === "completed") {
      setTimeout(() => {
        setCurrentJob(null);
        navigate("/driver/home");
      }, 2000);
    }
  };

  return (
    <DriverLayout>
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">Active Job</h1>
          <JobStatusBadge status={jobStatus} />
        </div>

        <CustomerInfoCard job={currentJob} />
        <SafetyPinCard safetyPin={currentJob.safetyPin} />
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
