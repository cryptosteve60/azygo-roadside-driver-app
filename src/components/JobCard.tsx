
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { JobRequest, useApp } from "@/contexts/AppContext";
import { Battery, Car, Flag, Fuel, Lock, MapPin, Star } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface JobCardProps {
  job: JobRequest;
  onAccept?: () => void;
}

export default function JobCard({ job, onAccept }: JobCardProps) {
  const navigate = useNavigate();
  const { availableJobs, setAvailableJobs, myJobs, setMyJobs, activeUser } = useApp();
  
  const getIcon = () => {
    switch (job.serviceType) {
      case "battery":
        return <Battery className="h-6 w-6 text-primary" />;
      case "tire":
        return <Car className="h-6 w-6 text-primary" />;
      case "fuel":
        return <Fuel className="h-6 w-6 text-primary" />;
      case "lockout":
        return <Lock className="h-6 w-6 text-primary" />;
      case "tow":
        return <Flag className="h-6 w-6 text-primary" />;
    }
  };
  
  const getServiceName = () => {
    switch (job.serviceType) {
      case "battery":
        return "Battery Jump";
      case "tire":
        return "Tire Change";
      case "fuel":
        return "Fuel Delivery";
      case "lockout":
        return "Lockout Assistance";
      case "tow":
        return "Towing Service";
    }
  };
  
  const handleAccept = () => {
    if (!activeUser) return;
    
    // Update job status and move from available to my jobs
    const updatedJob = {
      ...job,
      status: "accepted" as const,
      acceptedBy: activeUser.id,
      acceptedAt: new Date(),
      estimatedArrival: new Date(Date.now() + 15 * 60 * 1000) // 15 minutes from now
    };
    
    // Remove from available jobs
    const updatedAvailableJobs = availableJobs.filter(j => j.id !== job.id);
    setAvailableJobs(updatedAvailableJobs);
    
    // Add to my jobs
    setMyJobs([...myJobs, updatedJob]);
    
    toast.success("Job accepted!", {
      description: `You've accepted the ${getServiceName()} request.`,
    });
    
    // Navigate to job details
    navigate(`/job/${job.id}`);
    
    // Call additional callback if provided
    if (onAccept) onAccept();
  };
  
  const handleViewDetails = () => {
    navigate(`/job/${job.id}`);
  };
  
  // Display differently based on status
  const renderActionButton = () => {
    if (job.status === "requested") {
      return (
        <Button className="app-button" onClick={handleAccept}>
          Accept Job
        </Button>
      );
    }
    
    return (
      <Button 
        className="app-button" 
        onClick={handleViewDetails}
        variant={job.status === "inProgress" ? "default" : "outline"}
      >
        View Details
      </Button>
    );
  };
  
  return (
    <Card className="app-card">
      <div className="flex items-center gap-3 mb-3">
        <div className="p-2 bg-accent rounded-md">
          {getIcon()}
        </div>
        <div>
          <h3 className="font-bold">{getServiceName()}</h3>
          <p className="text-xs text-muted-foreground">
            {formatDistanceToNow(new Date(job.createdAt), { addSuffix: true })}
          </p>
        </div>
        <div className="ml-auto font-bold text-primary">${job.price}</div>
      </div>
      
      <div className="flex items-center gap-2 mb-3 text-sm">
        <MapPin size={14} className="text-muted-foreground" />
        <span className="text-muted-foreground">{job.customerLocation.address}</span>
      </div>
      
      <p className="text-sm mb-4">{job.description}</p>
      
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-1">
          <Star size={14} className="text-yellow-500 fill-yellow-500" />
          <span className="text-xs font-medium">Customer Rating: 4.8</span>
        </div>
      </div>
      
      {renderActionButton()}
    </Card>
  );
}
