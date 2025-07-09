
import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Navigation, Settings, X } from "lucide-react";

interface LocationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LocationModal: React.FC<LocationModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-6 bg-background">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-center flex-1">Location Settings</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="space-y-4">
          <div className="text-center p-4 bg-muted rounded-lg">
            <MapPin className="h-8 w-8 text-red-500 mx-auto mb-2" />
            <p className="font-bold">Current Location</p>
            <p className="text-sm text-muted-foreground">Los Angeles, CA</p>
          </div>
          
          <Button className="w-full justify-start" variant="outline">
            <Navigation className="h-4 w-4 mr-2" />
            Update Location
          </Button>
          
          <Button className="w-full justify-start" variant="outline">
            <Settings className="h-4 w-4 mr-2" />
            Location Preferences
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default LocationModal;
