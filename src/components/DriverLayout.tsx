
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Truck } from "lucide-react";

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
          <div className="h-8 w-8 rounded-full bg-white flex items-center justify-center">
            <Truck className="h-5 w-5 text-primary" />
          </div>
          <h1 className="text-lg font-bold">Ayzgo Driver</h1>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-primary-foreground/80">Driver Portal</span>
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
            to="/driver" 
            className={`flex flex-col items-center gap-1 ${
              location.pathname === "/driver" ? "text-primary" : "text-muted-foreground"
            }`}
          >
            <div className={`h-6 w-6 rounded-full flex items-center justify-center ${
              location.pathname === "/driver" ? "bg-primary text-white" : "bg-secondary text-secondary-foreground"
            }`}>
              <span className="text-xs">H</span>
            </div>
            <span className="text-xs">Home</span>
          </Link>
          <Link 
            to="/driver/active-job" 
            className={`flex flex-col items-center gap-1 ${
              location.pathname === "/driver/active-job" ? "text-primary" : "text-muted-foreground"
            }`}
          >
            <div className={`h-6 w-6 rounded-full flex items-center justify-center ${
              location.pathname === "/driver/active-job" ? "bg-primary text-white" : "bg-secondary text-secondary-foreground"
            }`}>
              <span className="text-xs">J</span>
            </div>
            <span className="text-xs">Active</span>
          </Link>
          <Link 
            to="/driver/earnings" 
            className={`flex flex-col items-center gap-1 ${
              location.pathname === "/driver/earnings" ? "text-primary" : "text-muted-foreground"
            }`}
          >
            <div className={`h-6 w-6 rounded-full flex items-center justify-center ${
              location.pathname === "/driver/earnings" ? "bg-primary text-white" : "bg-secondary text-secondary-foreground"
            }`}>
              <span className="text-xs">$</span>
            </div>
            <span className="text-xs">Earnings</span>
          </Link>
          <Link 
            to="/driver/profile" 
            className={`flex flex-col items-center gap-1 ${
              location.pathname === "/driver/profile" ? "text-primary" : "text-muted-foreground"
            }`}
          >
            <div className={`h-6 w-6 rounded-full flex items-center justify-center ${
              location.pathname === "/driver/profile" ? "bg-primary text-white" : "bg-secondary text-secondary-foreground"
            }`}>
              <span className="text-xs">P</span>
            </div>
            <span className="text-xs">Profile</span>
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default DriverLayout;
