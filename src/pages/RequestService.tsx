
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useApp } from "@/contexts/AppContext";
import MapView from "@/components/MapView";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { ArrowLeft, Battery, Car, Flag, Fuel, Lock, MapPin } from "lucide-react";

const RequestService: React.FC = () => {
  const { serviceType } = useParams<{ serviceType: string }>();
  const navigate = useNavigate();
  const { currentLocation, setMyJobs, activeUser } = useApp();
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const getServiceName = () => {
    switch (serviceType) {
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
      default:
        return "Service";
    }
  };
  
  const getIcon = () => {
    switch (serviceType) {
      case "battery":
        return <Battery className="h-6 w-6" />;
      case "tire":
        return <Car className="h-6 w-6" />;
      case "fuel":
        return <Fuel className="h-6 w-6" />;
      case "lockout":
        return <Lock className="h-6 w-6" />;
      case "tow":
        return <Flag className="h-6 w-6" />;
      default:
        return <Car className="h-6 w-6" />;
    }
  };
  
  const getPriceEstimate = () => {
    switch (serviceType) {
      case "battery":
        return "$45";
      case "tire":
        return "$60";
      case "fuel":
        return "$40";
      case "lockout":
        return "$70";
      case "tow":
        return "$95";
      default:
        return "$50";
    }
  };
  
  const getServiceDescription = () => {
    switch (serviceType) {
      case "battery":
        return "We'll bring jumper cables and get your battery charged up.";
      case "tire":
        return "We'll replace your flat tire with your spare or patch it if possible.";
      case "fuel":
        return "We'll deliver fuel directly to your location to get you going.";
      case "lockout":
        return "We'll help you regain access to your locked vehicle.";
      case "tow":
        return "We'll tow your vehicle to a location of your choice.";
      default:
        return "We'll provide the assistance you need.";
    }
  };
  
  const handleSubmit = () => {
    if (!currentLocation || !activeUser) return;
    
    setIsSubmitting(true);
    
    // Generate a new job request
    const newJob = {
      id: `job-${Math.random().toString(36).substr(2, 9)}`,
      customerId: activeUser.id,
      customerName: activeUser.name,
      customerLocation: {
        lat: currentLocation.lat,
        lng: currentLocation.lng,
        address: "123 Current Location St, Los Angeles, CA"
      },
      serviceType: serviceType as any,
      description: description || "No additional details provided.",
      status: "requested" as const,
      createdAt: new Date(),
      price: Number(getPriceEstimate().replace('$', '')),
    };
    
    // Simulate API call with timeout
    setTimeout(() => {
      setMyJobs((prevJobs) => [...prevJobs, newJob]);
      
      toast.success("Service requested successfully!", {
        description: "Help is on the way! We're connecting you with a service provider.",
      });
      
      navigate("/request-confirmation", { state: { job: newJob } });
      setIsSubmitting(false);
    }, 1500);
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
        <h1 className="text-lg font-bold">Request {getServiceName()}</h1>
      </header>
      
      <main className="flex-1 p-4 flex flex-col gap-5">
        {/* Service Info */}
        <Card className="p-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-accent rounded-md text-primary">
              {getIcon()}
            </div>
            <div className="flex-1">
              <h2 className="font-bold text-lg">{getServiceName()}</h2>
              <p className="text-muted-foreground text-sm">{getServiceDescription()}</p>
            </div>
            <div className="font-bold text-primary">{getPriceEstimate()}</div>
          </div>
          
          <div className="p-3 bg-secondary/50 rounded-md flex items-center gap-2">
            <MapPin className="text-muted-foreground" size={16} />
            <span className="text-sm">Using your current location</span>
          </div>
        </Card>
        
        {/* Location Map */}
        <div>
          <h2 className="font-bold mb-2">Confirm your location</h2>
          <MapView height="h-[200px]" />
        </div>
        
        {/* Additional Details */}
        <div>
          <h2 className="font-bold mb-2">Additional details (optional)</h2>
          <Textarea 
            placeholder="Describe your situation or add specific instructions..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="resize-none"
            rows={4}
          />
        </div>
        
        {/* Price and Request Button */}
        <div className="mt-auto">
          <div className="flex justify-between items-center mb-3">
            <span className="text-muted-foreground">Estimated Price</span>
            <span className="font-bold text-xl">{getPriceEstimate()}</span>
          </div>
          
          <Button 
            className="app-button"
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Requesting..." : "Request Service Now"}
          </Button>
          <p className="text-xs text-center mt-2 text-muted-foreground">
            By proceeding, you agree to our terms and conditions
          </p>
        </div>
      </main>
    </div>
  );
};

export default RequestService;
