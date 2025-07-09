
import React from "react";
import { Award } from "lucide-react";

interface FloatingRewardsIconProps {
  onClick: () => void;
}

const FloatingRewardsIcon: React.FC<FloatingRewardsIconProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="fixed left-4 top-1/2 transform -translate-y-1/2 z-50 bg-background/95 backdrop-blur-sm border-0 shadow-lg rounded-full p-3 hover:bg-muted/50 transition-colors"
    >
      <Award className="h-6 w-6 text-yellow-600" />
    </button>
  );
};

export default FloatingRewardsIcon;
