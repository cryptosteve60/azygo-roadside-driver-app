
import React from "react";
import { MapPin } from "lucide-react";

interface FloatingLocationIconProps {
  onClick: () => void;
}

const FloatingLocationIcon: React.FC<FloatingLocationIconProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="fixed right-4 top-[calc(50%+120px)] z-50 bg-gradient-to-br from-red-500 to-red-700 backdrop-blur-sm border-0 shadow-lg rounded-full p-3 hover:from-red-600 hover:to-red-800 transition-all duration-200 hover:scale-105"
    >
      <MapPin className="h-6 w-6 text-white" />
    </button>
  );
};

export default FloatingLocationIcon;
