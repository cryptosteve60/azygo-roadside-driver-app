
import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface EazyGoToggleProps {
  isOnline: boolean;
  onToggle: (online: boolean) => void;
}

const EazyGoToggle: React.FC<EazyGoToggleProps> = ({ isOnline, onToggle }) => {
  return (
    <Card className="p-4 mb-4">
      <div className="text-center">
        <Button
          onClick={() => onToggle(!isOnline)}
          className={`w-full h-16 text-xl font-bold rounded-xl transition-all ${
            isOnline 
              ? 'bg-red-500 hover:bg-red-600 text-white' 
              : 'bg-blue-500 hover:bg-blue-600 text-white'
          }`}
        >
          {isOnline ? 'STOP EAZY GO!' : 'EAZY GO!'}
        </Button>
        <p className="text-sm text-muted-foreground mt-2">
          {isOnline ? 'You\'re online and ready for requests' : 'Tap to start receiving requests'}
        </p>
      </div>
    </Card>
  );
};

export default EazyGoToggle;
