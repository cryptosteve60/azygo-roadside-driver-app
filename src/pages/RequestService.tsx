import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { JobRequest, ServiceType, useApp } from "@/contexts/AppContext";
import { useToast } from "@/hooks/use-toast";
import { MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function RequestService() {
  const { serviceType } = useParams<{ serviceType: ServiceType }>();
  const { activeUser, currentLocation, availableJobs, setAvailableJobs } = useApp();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [location, setLocation] = useState("");
  const [vehicleDetails, setVehicleDetails] = useState("");
  const [description, setDescription] = useState("");
  
  useEffect(() => {
    if (currentLocation) {
      setLocation(`${currentLocation.lat.toFixed(4)}, ${currentLocation.lng.toFixed(4)}`);
    }
  }, [currentLocation]);
  
  if (!serviceType) {
    return <div>Invalid service type</div>;
  }
  
  const getServicePrice = (type: ServiceType) => {
    switch (type) {
      case "battery":
        return 49;
      case "tire":
        return 79;
      case "fuel":
        return 59;
      case "lockout":
        return 39;
      case "tow":
        return 99;
      default:
        return 69;
    }
  };

  const handleSubmitRequest = () => {
    if (!vehicleDetails || !description || !activeUser) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    const newJobRequest: JobRequest = {
      id: `job-${Date.now()}`,
      customerName: activeUser.name,
      customerId: activeUser.id,
      customerLocation: {
        lat: currentLocation?.lat || 0,
        lng: currentLocation?.lng || 0,
        address: location
      },
      serviceType,
      status: "requested",
      price: getServicePrice(serviceType),
      description,
      vehicleDetails,
      createdAt: new Date()
    };
    
    // Fix TypeScript error by updating availableJobs directly rather than using setAvailableJobs with a callback
    const updatedJobs = [...availableJobs, newJobRequest];
    setAvailableJobs(updatedJobs);
    
    toast.success("Service request submitted!", {
      description: "We're finding a helper nearby."
    });
    
    // Navigate to the confirmation page with job details
    navigate('/request-confirmation', { 
      state: { jobRequest: newJobRequest } 
    });
  };
  
  return (
    <div className="container max-w-2xl mx-auto py-10">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Request a {serviceType} Service</h1>
        <p className="text-muted-foreground">Please provide the following details to submit your request.</p>
      </div>
      
      <div className="grid gap-4">
        <div>
          <Label htmlFor="location">Location</Label>
          <div className="relative">
            <Input 
              id="location" 
              className="app-input peer" 
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
            <MapPin className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground peer-focus:text-primary" />
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            Current location: {location}
          </p>
        </div>
        
        <div>
          <Label htmlFor="vehicleDetails">Vehicle Details</Label>
          <Input 
            id="vehicleDetails" 
            className="app-input" 
            placeholder="Year, Make, Model"
            value={vehicleDetails}
            onChange={(e) => setVehicleDetails(e.target.value)}
          />
        </div>
        
        <div>
          <Label htmlFor="description">Description of Issue</Label>
          <Textarea 
            id="description" 
            className="app-input" 
            placeholder="Describe the issue you're experiencing"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        
        <Button className="app-button" onClick={handleSubmitRequest}>
          Submit Request
        </Button>
      </div>
    </div>
  );
}
