
import React, { useState } from "react";
import DriverLayout from "@/components/DriverLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useDriver } from "@/contexts/DriverContext";
import { useToast } from "@/hooks/use-toast";
import { MapPin, Phone, Navigation, Shield, Clock, Car } from "lucide-react";
import { useNavigate } from "react-router-dom";

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

  const getServiceTitle = (serviceType: string) => {
    switch (serviceType) {
      case "battery": return "Battery Jump";
      case "tire": return "Tire Change";
      case "fuel": return "Fuel Delivery";
      case "lockout": return "Lockout Service";
      case "tow": return "Towing Service";
      case "charging": return "EV Charging";
      default: return "Roadside Service";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "accepted": return "bg-blue-100 text-blue-800 border-blue-200";
      case "enroute": return "bg-orange-100 text-orange-800 border-orange-200";
      case "arrived": return "bg-purple-100 text-purple-800 border-purple-200";
      case "inProgress": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "completed": return "bg-green-100 text-green-800 border-green-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <DriverLayout>
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">Active Job</h1>
          <div className={`inline-flex px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(jobStatus)}`}>
            {jobStatus === "accepted" && "Job Accepted"}
            {jobStatus === "enroute" && "En Route"}
            {jobStatus === "arrived" && "Arrived"}
            {jobStatus === "inProgress" && "In Progress"}
            {jobStatus === "completed" && "Completed"}
          </div>
        </div>

        {/* Customer Info Card */}
        <Card className="p-6 mb-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-xl font-bold">{getServiceTitle(currentJob.serviceType)}</h3>
              <p className="text-muted-foreground">for {currentJob.customerName}</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-primary">${currentJob.price}</p>
              <p className="text-sm text-muted-foreground">Service Fee</p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-medium">Customer Location</p>
                <p className="text-sm text-muted-foreground">{currentJob.customerLocation.address}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Phone className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-medium">Contact</p>
                <p className="text-sm text-muted-foreground">{currentJob.customerPhone}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Car className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-medium">Vehicle</p>
                <p className="text-sm text-muted-foreground">{currentJob.vehicleDetails}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Clock className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-medium">Estimated Duration</p>
                <p className="text-sm text-muted-foreground">{currentJob.estimatedDuration} minutes</p>
              </div>
            </div>
          </div>

          {currentJob.description && (
            <div className="mt-4 p-3 bg-muted rounded-lg">
              <p className="font-medium mb-1">Additional Details:</p>
              <p className="text-sm">{currentJob.description}</p>
            </div>
          )}
        </Card>

        {/* Safety PIN Card */}
        <Card className="p-6 mb-6 border-l-4 border-l-primary">
          <div className="flex items-center gap-3">
            <Shield className="h-6 w-6 text-primary" />
            <div>
              <p className="font-bold">Safety PIN: {currentJob.safetyPin}</p>
              <p className="text-sm text-muted-foreground">Verify with customer before starting work</p>
            </div>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button 
            size="lg" 
            className="w-full bg-blue-600 hover:bg-blue-700 flex items-center gap-2"
            onClick={() => window.open(`https://maps.google.com/?q=${currentJob.customerLocation.lat},${currentJob.customerLocation.lng}`, '_blank')}
          >
            <Navigation className="h-5 w-5" />
            Open in Maps
          </Button>

          <Button 
            size="lg" 
            className="w-full bg-green-600 hover:bg-green-700"
            onClick={() => window.open(`tel:${currentJob.customerPhone}`)}
          >
            <Phone className="h-5 w-5 mr-2" />
            Call Customer
          </Button>

          {/* Status Update Buttons */}
          <div className="grid grid-cols-2 gap-3">
            {jobStatus === "accepted" && (
              <Button 
                size="lg" 
                onClick={() => handleStatusUpdate("enroute")}
                className="col-span-2"
              >
                I'm On My Way
              </Button>
            )}
            
            {jobStatus === "enroute" && (
              <Button 
                size="lg" 
                onClick={() => handleStatusUpdate("arrived")}
                className="col-span-2"
              >
                I've Arrived
              </Button>
            )}
            
            {jobStatus === "arrived" && (
              <Button 
                size="lg" 
                onClick={() => handleStatusUpdate("inProgress")}
                className="col-span-2"
              >
                Start Job
              </Button>
            )}
            
            {jobStatus === "inProgress" && (
              <Button 
                size="lg" 
                onClick={() => handleStatusUpdate("completed")}
                className="col-span-2 bg-green-600 hover:bg-green-700"
              >
                Complete Job
              </Button>
            )}
          </div>
        </div>
      </div>
    </DriverLayout>
  );
};

export default DriverActiveJob;
