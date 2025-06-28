
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ServiceType, ServiceRequest, useApp } from "@/contexts/AppContext";
import { useToast } from "@/hooks/use-toast";
import { MapPin, Camera, Car } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function RequestService() {
  const { serviceType } = useParams<{ serviceType: ServiceType }>();
  const { customer, currentLocation, setCurrentRequest } = useApp();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [location, setLocation] = useState("");
  const [vehicleDetails, setVehicleDetails] = useState("");
  const [description, setDescription] = useState("");
  const [estimatedPrice, setEstimatedPrice] = useState(0);
  
  useEffect(() => {
    if (currentLocation) {
      setLocation(`${currentLocation.lat.toFixed(4)}, ${currentLocation.lng.toFixed(4)}`);
    }
    if (serviceType) {
      setEstimatedPrice(getServicePrice(serviceType));
    }
  }, [currentLocation, serviceType]);
  
  if (!serviceType) {
    return <div>Invalid service type</div>;
  }
  
  const getServicePrice = (type: ServiceType) => {
    switch (type) {
      case "battery": return 49;
      case "tire": return 69;
      case "fuel": return 45;
      case "lockout": return 75;
      case "tow": return 99;
      case "charging": return 59;
      default: return 69;
    }
  };

  const getServiceTitle = (type: ServiceType) => {
    switch (type) {
      case "battery": return "Battery Jump";
      case "tire": return "Tire Change";
      case "fuel": return "Fuel Delivery";
      case "lockout": return "Lockout Service";
      case "tow": return "Towing Service";
      case "charging": return "EV Charging";
      default: return "Roadside Service";
    }
  };

  const handleSubmitRequest = () => {
    if (!vehicleDetails || !description || !customer) {
      toast({
        variant: "destructive",
        title: "Missing Information",
        description: "Please fill in all required fields"
      });
      return;
    }
    
    const newServiceRequest: ServiceRequest = {
      id: `req-${Date.now()}`,
      customerId: customer.id,
      customerName: customer.name,
      customerPhone: customer.phone,
      customerLocation: {
        lat: currentLocation?.lat || 0,
        lng: currentLocation?.lng || 0,
        address: location
      },
      serviceType,
      description,
      vehicleDetails,
      status: "requested",
      price: estimatedPrice,
      createdAt: new Date(),
      safetyPin: Math.floor(1000 + Math.random() * 9000).toString()
    };
    
    setCurrentRequest(newServiceRequest);
    
    toast({
      title: "Service Request Submitted! 🚗",
      description: "We're finding the best driver for you."
    });
    
    // Navigate to searching screen
    navigate('/searching', { 
      state: { serviceRequest: newServiceRequest } 
    });
  };
  
  return (
    <div className="container max-w-2xl mx-auto py-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Request {getServiceTitle(serviceType)}</h1>
        <p className="text-muted-foreground">Help is on the way! Please provide details about your situation.</p>
      </div>

      {/* Price Estimate */}
      <div className="mb-6 p-4 rounded-lg bg-primary/10 border border-primary/20">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-bold">Estimated Cost</h3>
            <p className="text-sm text-muted-foreground">Final price may vary based on your specific needs</p>
          </div>
          <div className="text-2xl font-bold text-primary">${estimatedPrice}</div>
        </div>
      </div>
      
      <div className="grid gap-6">
        {/* Location */}
        <div>
          <Label htmlFor="location">Pickup Location</Label>
          <div className="relative">
            <Input 
              id="location" 
              className="app-input peer" 
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter your current location"
            />
            <MapPin className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground peer-focus:text-primary" />
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            📍 We'll use your GPS location for accuracy
          </p>
        </div>
        
        {/* Vehicle Details */}
        <div>
          <Label htmlFor="vehicleDetails">Vehicle Information *</Label>
          <div className="relative">
            <Input 
              id="vehicleDetails" 
              className="app-input peer" 
              placeholder="e.g., 2020 Honda Civic, Blue"
              value={vehicleDetails}
              onChange={(e) => setVehicleDetails(e.target.value)}
              required
            />
            <Car className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground peer-focus:text-primary" />
          </div>
        </div>
        
        {/* Additional Information */}
        <div>
          <Label htmlFor="description">Additional Information</Label>
          <Textarea 
            id="description" 
            className="app-input min-h-[100px]" 
            placeholder="Any additional details that might help..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {/* Photo Upload (Placeholder) */}
        <div>
          <Label>Add Photos (Optional)</Label>
          <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
            <Camera className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
            <p className="text-sm text-muted-foreground mb-2">Upload photos to help us understand the issue</p>
            <Button variant="outline" size="sm" disabled>
              Choose Photos
            </Button>
          </div>
        </div>
        
        {/* Submit Button */}
        <Button className="app-button mt-4" onClick={handleSubmitRequest}>
          Request Help - ${estimatedPrice}
        </Button>

        {/* Terms */}
        <p className="text-xs text-muted-foreground text-center">
          By requesting service, you agree to our Terms of Service and Privacy Policy. 
          Standard rates apply, final price confirmed by driver.
        </p>
      </div>
    </div>
  );
}
