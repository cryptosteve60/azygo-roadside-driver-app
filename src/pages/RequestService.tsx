
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ServiceType, ServiceRequest, useApp } from "@/contexts/AppContext";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getServicePrice, getServiceTitle } from "@/utils/serviceUtils";
import LocationInput from "@/components/LocationInput";
import VehicleDetailsInput from "@/components/VehicleDetailsInput";
import PhotoUpload from "@/components/PhotoUpload";
import PriceEstimate from "@/components/PriceEstimate";

export default function RequestService() {
  const { serviceType } = useParams<{ serviceType: ServiceType }>();
  const { customer, currentLocation, setCurrentRequest, updateLocationAddress } = useApp();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [location, setLocation] = useState("");
  const [vehicleDetails, setVehicleDetails] = useState("");
  const [description, setDescription] = useState("");
  const [estimatedPrice, setEstimatedPrice] = useState(0);
  const [isLoadingAddress, setIsLoadingAddress] = useState(false);
  
  useEffect(() => {
    const loadLocationAddress = async () => {
      if (currentLocation) {
        setIsLoadingAddress(true);
        try {
          const address = await updateLocationAddress(currentLocation.lat, currentLocation.lng);
          setLocation(address);
        } catch (error) {
          console.error('Error loading address:', error);
          setLocation(`${currentLocation.lat.toFixed(4)}, ${currentLocation.lng.toFixed(4)}`);
        }
        setIsLoadingAddress(false);
      }
    };

    loadLocationAddress();
    
    if (serviceType) {
      setEstimatedPrice(getServicePrice(serviceType));
    }
  }, [currentLocation, serviceType, updateLocationAddress]);
  
  if (!serviceType) {
    return <div>Invalid service type</div>;
  }

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
    
    navigate('/request-confirmation', { 
      state: { job: newServiceRequest } 
    });
  };
  
  return (
    <div className="container max-w-2xl mx-auto py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Request {getServiceTitle(serviceType)}</h1>
        <p className="text-muted-foreground">Help is on the way! Please provide details about your situation.</p>
      </div>

      <PriceEstimate estimatedPrice={estimatedPrice} />
      
      <div className="grid gap-6">
        <LocationInput 
          location={location} 
          setLocation={setLocation} 
          isLoadingAddress={isLoadingAddress} 
        />
        
        <VehicleDetailsInput 
          vehicleDetails={vehicleDetails} 
          setVehicleDetails={setVehicleDetails} 
        />
        
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

        <PhotoUpload />
        
        <Button className="app-button mt-4" onClick={handleSubmitRequest}>
          Request Help - ${estimatedPrice}
        </Button>

        <p className="text-xs text-muted-foreground text-center">
          By requesting service, you agree to our Terms of Service and Privacy Policy. 
          Standard rates apply, final price confirmed by driver.
        </p>
      </div>
    </div>
  );
}
