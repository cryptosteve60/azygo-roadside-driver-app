
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { JobRequest, JobStatus, useApp } from "@/contexts/AppContext";
import MapView from "@/components/MapView";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  ArrowLeft, 
  Battery, 
  Car, 
  CircleCheckIcon, 
  Clock, 
  Flag, 
  Fuel, 
  Lock,
  MapPin, 
  Phone, 
  Star, 
  User
} from "lucide-react";
import { toast } from "sonner";

const JobDetails: React.FC = () => {
  const navigate = useNavigate();
  const { jobId } = useParams<{ jobId: string }>();
  const { myJobs, setMyJobs, userRole } = useApp();
  const [isUpdating, setIsUpdating] = useState(false);
  
  // Find the job in the user's jobs
  const job = myJobs.find((j) => j.id === jobId);
  
  if (!job) {
    return (
      <div className="p-4 text-center">
        <h1 className="text-xl font-bold mb-4">Job Not Found</h1>
        <Button onClick={() => navigate("/")}>Return Home</Button>
      </div>
    );
  }
  
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
  
  const updateJobStatus = (newStatus: JobStatus) => {
    setIsUpdating(true);
    
    // Simulate API call
    setTimeout(() => {
      // Update job in state
      const updatedJobs = myJobs.map((j) => {
        if (j.id === job.id) {
          return {
            ...j,
            status: newStatus,
            ...(newStatus === "completed" ? { completedAt: new Date() } : {})
          };
        }
        return j;
      });
      
      setMyJobs(updatedJobs);
      
      // Notify user
      toast.success(`Job status updated to ${newStatus}`);
      
      setIsUpdating(false);
      
      // If completed, navigate back after a delay
      if (newStatus === "completed") {
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    }, 1000);
  };
  
  const getNextActionButton = () => {
    if (userRole === "worker") {
      switch (job.status) {
        case "accepted":
          return (
            <Button className="app-button" onClick={() => updateJobStatus("enroute")} disabled={isUpdating}>
              Start Navigation
            </Button>
          );
        case "enroute":
          return (
            <Button className="app-button" onClick={() => updateJobStatus("arrived")} disabled={isUpdating}>
              Mark as Arrived
            </Button>
          );
        case "arrived":
          return (
            <Button className="app-button" onClick={() => updateJobStatus("inProgress")} disabled={isUpdating}>
              Start Work
            </Button>
          );
        case "inProgress":
          return (
            <Button className="app-button" onClick={() => updateJobStatus("completed")} disabled={isUpdating}>
              Complete Job
            </Button>
          );
        case "completed":
          return (
            <Button className="app-button" variant="outline" onClick={() => navigate("/")} disabled={isUpdating}>
              Back to Dashboard
            </Button>
          );
        default:
          return null;
      }
    }
    
    // Customer buttons
    return (
      <Button className="app-button" onClick={() => {}} disabled={isUpdating}>
        Contact Helper
      </Button>
    );
  };
  
  const getStatusText = () => {
    switch (job.status) {
      case "requested":
        return "Waiting for acceptance";
      case "accepted":
        return "Helper has accepted your request";
      case "enroute":
        return "Helper is on the way";
      case "arrived":
        return "Helper has arrived";
      case "inProgress":
        return "Work in progress";
      case "completed":
        return "Job completed";
      case "cancelled":
        return "Job cancelled";
      default:
        return "Unknown status";
    }
  };
  
  const getStatusColor = () => {
    switch (job.status) {
      case "requested":
        return "bg-yellow-500";
      case "accepted":
        return "bg-blue-500";
      case "enroute":
        return "bg-blue-600";
      case "arrived":
        return "bg-indigo-500";
      case "inProgress":
        return "bg-purple-500";
      case "completed":
        return "bg-green-500";
      case "cancelled":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };
  
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="flex items-center gap-3 p-4 border-b">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => navigate(-1)}
        >
          <ArrowLeft />
        </Button>
        <h1 className="text-lg font-bold">Job Details</h1>
      </header>
      
      <main className="flex-1 p-4 flex flex-col gap-5">
        {/* Status Card */}
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className={`h-3 w-3 rounded-full ${getStatusColor()}`}></div>
            <span className="font-medium">{getStatusText()}</span>
          </div>
        </Card>
        
        {/* Map */}
        <MapView height="h-[200px]" showJobLocation={true} />
        
        {/* Service Details */}
        <div>
          <h2 className="font-bold mb-2">Service Details</h2>
          <Card className="p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-accent rounded-md">
                {getIcon()}
              </div>
              <div className="flex-1">
                <h3 className="font-bold">{getServiceName()}</h3>
              </div>
              <div className="font-bold text-primary">${job.price}</div>
            </div>
            
            <div className="flex items-center gap-2 mb-3 text-sm">
              <MapPin size={14} className="text-muted-foreground" />
              <span className="text-muted-foreground">
                {job.customerLocation.address || "Location Address"}
              </span>
            </div>
            
            <div className="flex items-center gap-2 mb-3 text-sm">
              <Clock size={14} className="text-muted-foreground" />
              <span className="text-muted-foreground">
                {job.estimatedArrival 
                  ? `ETA: ${new Date(job.estimatedArrival).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`
                  : "Arrival time to be determined"}
              </span>
            </div>
            
            <div className="p-3 bg-secondary/50 rounded-md">
              <p className="text-sm">{job.description}</p>
            </div>
          </Card>
        </div>
        
        {/* User Details */}
        <div>
          <h2 className="font-bold mb-2">
            {userRole === "worker" ? "Customer Details" : "Helper Details"}
          </h2>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-secondary flex items-center justify-center">
                <User className="h-6 w-6" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold">{userRole === "worker" ? job.customerName : "Mike Johnson"}</h3>
                <div className="flex items-center gap-1">
                  <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                  <span className="text-xs">4.9</span>
                </div>
              </div>
              <Button variant="outline" size="icon">
                <Phone size={16} />
              </Button>
            </div>
          </Card>
        </div>
        
        {/* Status Progress */}
        {job.status !== "cancelled" && (
          <div>
            <h2 className="font-bold mb-2">Progress</h2>
            <div className="relative pl-6 border-l-2 border-dashed border-muted space-y-4">
              {/* Requested */}
              <div className="relative">
                <div className="absolute -left-[1.65rem] h-6 w-6 rounded-full bg-green-500 flex items-center justify-center">
                  <CircleCheckIcon className="h-4 w-4 text-white" />
                </div>
                <p className="font-medium">Service Requested</p>
                <p className="text-xs text-muted-foreground">
                  {new Date(job.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </p>
              </div>
              
              {/* Accepted */}
              <div className="relative">
                <div className={`absolute -left-[1.65rem] h-6 w-6 rounded-full flex items-center justify-center ${
                  job.status !== "requested" 
                    ? "bg-green-500" 
                    : "bg-secondary border border-muted"
                }`}>
                  {job.status !== "requested" && (
                    <CircleCheckIcon className="h-4 w-4 text-white" />
                  )}
                </div>
                <p className={`font-medium ${job.status === "requested" ? "text-muted-foreground" : ""}`}>
                  Request Accepted
                </p>
                {job.acceptedAt && (
                  <p className="text-xs text-muted-foreground">
                    {new Date(job.acceptedAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                  </p>
                )}
              </div>
              
              {/* EnRoute */}
              <div className="relative">
                <div className={`absolute -left-[1.65rem] h-6 w-6 rounded-full flex items-center justify-center ${
                  ["enroute", "arrived", "inProgress", "completed"].includes(job.status) 
                    ? "bg-green-500" 
                    : "bg-secondary border border-muted"
                }`}>
                  {["enroute", "arrived", "inProgress", "completed"].includes(job.status) && (
                    <CircleCheckIcon className="h-4 w-4 text-white" />
                  )}
                </div>
                <p className={`font-medium ${!["enroute", "arrived", "inProgress", "completed"].includes(job.status) ? "text-muted-foreground" : ""}`}>
                  Helper En Route
                </p>
              </div>
              
              {/* Arrived */}
              <div className="relative">
                <div className={`absolute -left-[1.65rem] h-6 w-6 rounded-full flex items-center justify-center ${
                  ["arrived", "inProgress", "completed"].includes(job.status) 
                    ? "bg-green-500" 
                    : "bg-secondary border border-muted"
                }`}>
                  {["arrived", "inProgress", "completed"].includes(job.status) && (
                    <CircleCheckIcon className="h-4 w-4 text-white" />
                  )}
                </div>
                <p className={`font-medium ${!["arrived", "inProgress", "completed"].includes(job.status) ? "text-muted-foreground" : ""}`}>
                  Helper Arrived
                </p>
              </div>
              
              {/* Completed */}
              <div className="relative">
                <div className={`absolute -left-[1.65rem] h-6 w-6 rounded-full flex items-center justify-center ${
                  job.status === "completed" 
                    ? "bg-green-500" 
                    : "bg-secondary border border-muted"
                }`}>
                  {job.status === "completed" && (
                    <CircleCheckIcon className="h-4 w-4 text-white" />
                  )}
                </div>
                <p className={`font-medium ${job.status !== "completed" ? "text-muted-foreground" : ""}`}>
                  Service Completed
                </p>
                {job.completedAt && (
                  <p className="text-xs text-muted-foreground">
                    {new Date(job.completedAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
        
        {/* Actions */}
        <div className="mt-auto space-y-2">
          {getNextActionButton()}
          
          {job.status !== "completed" && job.status !== "cancelled" && (
            <Button variant="outline" className="w-full" onClick={() => {}}>
              Cancel {userRole === "worker" ? "Job" : "Request"}
            </Button>
          )}
        </div>
      </main>
    </div>
  );
};

export default JobDetails;
