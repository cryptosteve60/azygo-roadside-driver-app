
import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface EazyGoToggleProps {
  isOnline: boolean;
  onToggle: (online: boolean) => void;
}

const EazyGoToggle: React.FC<EazyGoToggleProps> = ({ isOnline, onToggle }) => {
  return (
    <Card className="p-4 bg-background/95 backdrop-blur-sm border-0 shadow-lg">
      <div className="text-center">
        <p className="text-sm font-medium mb-3">
          {isOnline ? "You're online and available" : "Not busy right now"}
        </p>
        <Button
          onClick={() => onToggle(!isOnline)}
          className={`w-full h-14 text-lg font-bold rounded-full transition-all ${
            isOnline 
              ? 'bg-red-500 hover:bg-red-600 text-white' 
              : 'bg-red-500 hover:bg-red-600 text-white'
          }`}
        >
          {isOnline ? 'STOP EAZY GO!' : 'EAZY GO!'}
        </Button>
      </div>
    </Card>
  );
};

export default EazyGoToggle;
