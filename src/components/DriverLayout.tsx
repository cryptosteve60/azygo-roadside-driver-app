
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Briefcase, DollarSign, User } from "lucide-react";
import Logo from "./Logo";

interface DriverLayoutProps {
  children: React.ReactNode;
}

const DriverLayout: React.FC<DriverLayoutProps> = ({ children }) => {
  const location = useLocation();
  
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="flex justify-between items-center p-4 border-b bg-primary text-primary-foreground">
        <div className="flex items-center gap-2">
          <Logo size="md" />
          <h1 className="text-lg font-bold">Ayzgo Driver</h1>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-primary-foreground/80">Professional Dashboard</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-4">
        {children}
      </main>
      
      {/* Footer Navigation - Sticky */}
      <nav className="border-t p-4 bg-background sticky bottom-0">
        <div className="flex justify-around items-center">
          <Link 
            to="/driver/home" 
            className={`flex flex-col items-center gap-1 ${
              location.pathname === "/driver/home" ? "text-primary" : "text-muted-foreground"
            }`}
          >
            <Home className="h-5 w-5" />
            <span className="text-xs">Home</span>
          </Link>
          <Link 
            to="/driver/jobs" 
            className={`flex flex-col items-center gap-1 ${
              location.pathname === "/driver/jobs" ? "text-primary" : "text-muted-foreground"
            }`}
          >
            <Briefcase className="h-5 w-5" />
            <span className="text-xs">Jobs</span>
          </Link>
          <Link 
            to="/driver/earnings" 
            className={`flex flex-col items-center gap-1 ${
              location.pathname === "/driver/earnings" ? "text-primary" : "text-muted-foreground"
            }`}
          >
            <DollarSign className="h-5 w-5" />
            <span className="text-xs">Earnings</span>
          </Link>
          <Link 
            to="/driver/profile" 
            className={`flex flex-col items-center gap-1 ${
              location.pathname === "/driver/profile" ? "text-primary" : "text-muted-foreground"
            }`}
          >
            <User className="h-5 w-5" />
            <span className="text-xs">Profile</span>
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default DriverLayout;
