
import React from "react";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ size = "md", className = "" }) => {
  const sizeClasses = {
    sm: "h-6 w-6",
    md: "h-8 w-8", 
    lg: "h-12 w-12"
  };

  return (
    <div className={`${sizeClasses[size]} flex items-center justify-center ${className}`}>
      <img 
        src="/lovable-uploads/7c42b02b-c831-4e0f-9d90-c5bea3cb1b4e.png" 
        alt="Ayzgo Logo" 
        className="h-full w-full object-contain"
        onError={(e) => {
          console.error('Logo failed to load:', e);
        }}
      />
    </div>
  );
};

export default Logo;
