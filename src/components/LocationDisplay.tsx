
import React, { useState, useEffect } from "react";
import { MapPin } from "lucide-react";
import { locationService } from "@/services/locationService";

const LocationDisplay: React.FC = () => {
  const [location, setLocation] = useState<string>("Getting location...");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getCurrentLocationAddress = async () => {
      try {
        setIsLoading(true);
        const position = await locationService.getCurrentLocation();
        
        // Use reverse geocoding to get address (simplified for demo)
        // In production, you'd use Google Maps Geocoding API
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${position.lat}&lon=${position.lng}`
        );
        const data = await response.json();
        
        if (data.address) {
          const city = data.address.city || data.address.town || data.address.village || "Unknown City";
          const state = data.address.state || "CA";
          setLocation(`${city}, ${state}`);
        } else {
          setLocation("Los Angeles, CA");
        }
      } catch (error) {
        console.error('Failed to get location:', error);
        setLocation("Los Angeles, CA");
      } finally {
        setIsLoading(false);
      }
    };

    getCurrentLocationAddress();
  }, []);

  return (
    <div className="bg-background/95 backdrop-blur-sm rounded-lg p-2 shadow-lg border-0 flex items-center gap-2">
      <MapPin className="h-4 w-4 text-primary" />
      <div className="text-center">
        <p className="text-sm font-medium">
          {isLoading ? "Getting location..." : location}
        </p>
      </div>
    </div>
  );
};

export default LocationDisplay;
