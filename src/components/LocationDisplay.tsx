
import React from "react";

interface LocationDisplayProps {
  city: string;
  state: string;
}

const LocationDisplay: React.FC<LocationDisplayProps> = ({ city, state }) => {
  return (
    <div className="bg-background/95 backdrop-blur-sm rounded-lg p-2 shadow-lg border-0">
      <div className="text-center">
        <p className="text-sm font-medium">{city}, {state}</p>
      </div>
    </div>
  );
};

export default LocationDisplay;
