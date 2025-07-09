
import React from "react";
import { Truck } from "lucide-react";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const Logo: React.FC<LogoProps> = ({
  size = "md",
  className = ""
}) => {
  const sizeClasses = {
    sm: "h-5 w-5",
    md: "h-6 w-6",
    lg: "h-8 w-8"
  };

  return (
    <div className={`${sizeClasses[size]} flex items-center justify-center ${className}`}>
      <Truck className="h-full w-full text-primary" />
    </div>
  );
};

export default Logo;
