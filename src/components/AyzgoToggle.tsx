
import React from "react";
import { Button } from "@/components/ui/button";

interface AyzgoToggleProps {
  isOnline: boolean;
  onToggle: (online: boolean) => void;
}

const AyzgoToggle: React.FC<AyzgoToggleProps> = ({ isOnline, onToggle }) => {
  return (
    <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 z-50">
      <Button
        onClick={() => onToggle(!isOnline)}
        className={`h-16 w-16 text-sm font-bold rounded-full transition-all shadow-lg ${
          isOnline 
            ? 'bg-red-500 hover:bg-red-600 text-white' 
            : 'bg-primary hover:bg-primary/90 text-primary-foreground'
        }`}
      >
        {isOnline ? 'STOP' : 'AYZGO'}
      </Button>
    </div>
  );
};

export default AyzgoToggle;
