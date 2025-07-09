
import React from "react";
import { MessageCircleQuestion, Users, Shield } from "lucide-react";

interface FloatingRightIconsProps {
  onSupportClick: () => void;
  onCommunityClick: () => void;
  onSafetyClick: () => void;
}

const FloatingRightIcons: React.FC<FloatingRightIconsProps> = ({
  onSupportClick,
  onCommunityClick,
  onSafetyClick,
}) => {
  return (
    <div className="fixed right-4 top-1/2 transform -translate-y-1/2 z-50 flex flex-col gap-3">
      <button
        onClick={onSupportClick}
        className="bg-gradient-to-br from-blue-500 to-blue-700 backdrop-blur-sm border-0 shadow-lg rounded-full p-3 hover:from-blue-600 hover:to-blue-800 transition-all duration-200 hover:scale-105"
      >
        <MessageCircleQuestion className="h-6 w-6 text-white" />
      </button>
      <button
        onClick={onCommunityClick}
        className="bg-gradient-to-br from-green-500 to-green-700 backdrop-blur-sm border-0 shadow-lg rounded-full p-3 hover:from-green-600 hover:to-green-800 transition-all duration-200 hover:scale-105"
      >
        <Users className="h-6 w-6 text-white" />
      </button>
      <button
        onClick={onSafetyClick}
        className="bg-gradient-to-br from-purple-500 to-purple-700 backdrop-blur-sm border-0 shadow-lg rounded-full p-3 hover:from-purple-600 hover:to-purple-800 transition-all duration-200 hover:scale-105"
      >
        <Shield className="h-6 w-6 text-white" />
      </button>
    </div>
  );
};

export default FloatingRightIcons;
