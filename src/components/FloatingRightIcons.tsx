
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
        className="bg-background/95 backdrop-blur-sm border-0 shadow-lg rounded-full p-3 hover:bg-muted/50 transition-colors"
      >
        <MessageCircleQuestion className="h-6 w-6 text-blue-600" />
      </button>
      <button
        onClick={onCommunityClick}
        className="bg-background/95 backdrop-blur-sm border-0 shadow-lg rounded-full p-3 hover:bg-muted/50 transition-colors"
      >
        <Users className="h-6 w-6 text-green-600" />
      </button>
      <button
        onClick={onSafetyClick}
        className="bg-background/95 backdrop-blur-sm border-0 shadow-lg rounded-full p-3 hover:bg-muted/50 transition-colors"
      >
        <Shield className="h-6 w-6 text-purple-600" />
      </button>
    </div>
  );
};

export default FloatingRightIcons;
