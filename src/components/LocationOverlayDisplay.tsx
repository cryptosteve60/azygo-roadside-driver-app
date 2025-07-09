
import React, { useState, useEffect } from "react";
import { locationService } from "@/services/locationService";

const LocationOverlayDisplay: React.FC = () => {
  const [location, setLocation] = useState<string>("Getting location...");

  useEffect(() => {
    const getCurrentLocationAddress = async () => {
      try {
        const position = await locationService.getCurrentLocation();
        
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${position.lat}&lon=${position.lng}`
        );
        const data = await response.json();
        
        if (data.address) {
          const city = data.address.city || data.address.town || data.address.village || "Unknown";
          const state = data.address.state || "CA";
          setLocation(`${city}, ${state}`);
        } else {
          setLocation("Los Angeles, CA");
        }
      } catch (error) {
        console.error('Failed to get location:', error);
        setLocation("Los Angeles, CA");
      }
    };

    getCurrentLocationAddress();
  }, []);

  return location;
};

export default LocationOverlayDisplay;
