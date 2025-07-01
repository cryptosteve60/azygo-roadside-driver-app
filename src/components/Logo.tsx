
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
    <div className={`${sizeClasses[size]} rounded-full bg-white flex items-center justify-center ${className}`}>
      <img 
        src="/lovable-uploads/logo-square.png" 
        alt="Ayzgo Logo" 
        className="h-full w-full object-contain rounded-full"
      />
    </div>
  );
};

export default Logo;
