
import React from "react";
import { Award } from "lucide-react";

interface FloatingRewardsIconProps {
  onClick: () => void;
}

const FloatingRewardsIcon: React.FC<FloatingRewardsIconProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="fixed left-4 top-20 z-50 bg-gradient-to-br from-yellow-400 to-yellow-600 backdrop-blur-sm border-0 shadow-lg rounded-full p-3 hover:from-yellow-500 hover:to-yellow-700 transition-all duration-200 hover:scale-105"
    >
      <Award className="h-6 w-6 text-white" />
    </button>
  );
};

export default FloatingRewardsIcon;
