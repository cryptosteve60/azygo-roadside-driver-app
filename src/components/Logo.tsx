import React from "react";
interface LogoProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}
const Logo: React.FC<LogoProps> = ({
  size = "md",
  className = ""
}) => {
  const sizeClasses = {
    sm: "h-6 w-6",
    md: "h-8 w-8",
    lg: "h-12 w-12"
  };
  return <div className={`${sizeClasses[size]} flex items-center justify-center ${className}`}>
      <img alt="Ayzgo Logo" className="h-full w-full object-contain" onError={e => {
      console.error('Logo failed to load:', e);
    }} src="/lovable-uploads/db0740d5-b977-478c-b944-dca235a69821.png" />
    </div>;
};
export default Logo;