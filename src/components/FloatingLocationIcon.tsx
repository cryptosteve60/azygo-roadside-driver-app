
import React from "react";
import { MapPin } from "lucide-react";

interface FloatingLocationIconProps {
  onClick: () => void;
}

const FloatingLocationIcon: React.FC<FloatingLocationIconProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-32 left-1/2 transform -translate-x-1/2 z-50 bg-background/95 backdrop-blur-sm border-0 shadow-lg rounded-full p-3 hover:bg-muted/50 transition-colors"
    >
      <MapPin className="h-6 w-6 text-red-600" />
    </button>
  );
};

export default FloatingLocationIcon;
