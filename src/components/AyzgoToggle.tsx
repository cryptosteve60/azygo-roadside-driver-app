
import React from "react";
import { Button } from "@/components/ui/button";

interface AyzgoToggleProps {
  isOnline: boolean;
  onToggle: (online: boolean) => void;
  showLocationOverlay?: boolean;
  location?: string;
}

const AyzgoToggle: React.FC<AyzgoToggleProps> = ({ 
  isOnline, 
  onToggle, 
  showLocationOverlay = false, 
  location = "Getting location..." 
}) => {
  return (
    <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 z-50">
      <Button
        onClick={() => onToggle(!isOnline)}
        className={`h-20 w-20 text-lg font-bold rounded-full transition-all duration-300 shadow-xl relative flex flex-col items-center justify-center ${
          isOnline 
            ? 'bg-gradient-to-br from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white animate-pulse' 
            : 'bg-gradient-to-br from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-primary-foreground hover:scale-105'
        }`}
      >
        <span className={showLocationOverlay ? 'text-sm' : 'text-lg'}>
          {isOnline ? 'STOP' : 'AYZGO'}
        </span>
        {showLocationOverlay && (
          <span className="text-xs opacity-80 mt-1 leading-tight text-center">
            {location}
          </span>
        )}
      </Button>
    </div>
  );
};

export default AyzgoToggle;
