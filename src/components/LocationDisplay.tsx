
import React from "react";
import { Card } from "@/components/ui/card";
import { MapPin } from "lucide-react";

interface LocationDisplayProps {
  city: string;
  state: string;
}

const LocationDisplay: React.FC<LocationDisplayProps> = ({ city, state }) => {
  return (
    <Card className="p-3 bg-background/95 backdrop-blur-sm border-0 shadow-lg">
      <div className="flex items-center gap-2">
        <MapPin className="h-4 w-4 text-primary" />
        <div>
          <p className="text-sm font-medium">{state}: {city}</p>
          <p className="text-xs text-muted-foreground">Current service area</p>
        </div>
      </div>
    </Card>
  );
};

export default LocationDisplay;
