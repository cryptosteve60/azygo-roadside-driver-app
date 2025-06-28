
import React from "react";
import { Card } from "@/components/ui/card";
import { MapPin } from "lucide-react";

interface LocationDisplayProps {
  city: string;
  state: string;
}

const LocationDisplay: React.FC<LocationDisplayProps> = ({ city, state }) => {
  return (
    <Card className="p-4 mb-4">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-full bg-blue-100">
          <MapPin className="h-5 w-5 text-blue-600" />
        </div>
        <div>
          <h3 className="font-semibold">Current Location</h3>
          <p className="text-sm text-muted-foreground">{city}, {state}</p>
        </div>
      </div>
    </Card>
  );
};

export default LocationDisplay;
