
import React from "react";
import { useApp } from "@/contexts/AppContext";
import CustomerHome from "@/pages/CustomerHome";

const Index: React.FC = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="flex justify-between items-center p-4 border-b">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
            A
          </div>
          <h1 className="text-lg font-bold">Ayzgo</h1>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Roadside Assistance</span>
        </div>
      </header>

      {/* Main Content - Customer Experience Only */}
      <main className="flex-1 p-4">
        <CustomerHome />
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
          <a href="/services" className="flex flex-col items-center gap-1">
            <div className="h-6 w-6 bg-secondary rounded-full flex items-center justify-center">
              <span className="text-secondary-foreground text-xs">S</span>
            </div>
            <span className="text-xs">Services</span>
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
