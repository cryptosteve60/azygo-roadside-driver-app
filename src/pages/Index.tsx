
import React from "react";
import { useApp } from "@/contexts/AppContext";
import ModeToggle from "@/components/ModeToggle";
import CustomerHome from "@/pages/CustomerHome";
import WorkerHome from "@/pages/WorkerHome";
import { Card } from "@/components/ui/card";

const Index: React.FC = () => {
  const { userRole } = useApp();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="flex justify-between items-center p-4 border-b">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
            T
          </div>
          <h1 className="text-lg font-bold">Tap & Tow Go</h1>
        </div>
        <ModeToggle />
      </header>

      {/* Dynamic content based on user role */}
      <main className="flex-1 p-4">
        {userRole === "customer" ? (
          <CustomerHome />
        ) : (
          <WorkerHome />
        )}
      </main>
      
      {/* Footer Navigation */}
      <nav className="border-t p-4">
        <div className="flex justify-around items-center">
          <a href="/" className="flex flex-col items-center gap-1">
            <div className="h-6 w-6 bg-primary rounded-full flex items-center justify-center">
              <span className="text-white text-xs">H</span>
            </div>
            <span className="text-xs">Home</span>
          </a>
          <a href="/jobs" className="flex flex-col items-center gap-1">
            <div className="h-6 w-6 bg-secondary rounded-full flex items-center justify-center">
              <span className="text-secondary-foreground text-xs">J</span>
            </div>
            <span className="text-xs">Jobs</span>
          </a>
          <a href="/profile" className="flex flex-col items-center gap-1">
            <div className="h-6 w-6 bg-secondary rounded-full flex items-center justify-center">
              <span className="text-secondary-foreground text-xs">P</span>
            </div>
            <span className="text-xs">Profile</span>
          </a>
        </div>
      </nav>
    </div>
  );
};

export default Index;
