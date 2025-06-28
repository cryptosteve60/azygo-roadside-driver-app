
import React from "react";
import { useApp } from "@/contexts/AppContext";
import ServiceCard from "@/components/ServiceCard";
import MapView from "@/components/MapView";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Shield, Phone } from "lucide-react";

const CustomerHome: React.FC = () => {
  const { currentLocation, currentRequest, customer } = useApp();
  
  return (
    <div className="flex flex-col gap-5">
      {/* Welcome Section */}
      <section className="text-center">
        <h1 className="text-2xl font-bold mb-2">
          {customer ? `Hey ${customer.name.split(' ')[0]}!` : 'Welcome to Ayzgo'}
        </h1>
        <p className="text-muted-foreground">Need roadside assistance? We've got your back! 🚗⚡</p>
      </section>
      
      {/* Current Service Status */}
      {currentRequest && (
        <section className="p-4 rounded-lg bg-primary/10 border border-primary/20">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-primary">Service in Progress</h3>
              <p className="text-sm text-muted-foreground">
                {currentRequest.serviceType} - {currentRequest.status}
              </p>
            </div>
            <Button variant="outline" size="sm">
              Track Driver
            </Button>
          </div>
        </section>
      )}
      
      {/* Map Section */}
      <section>
        <div className="relative">
          <MapView height="h-[200px]" />
          <Badge className="absolute top-3 left-3 bg-white text-foreground">
            📍 Your Location
          </Badge>
          {currentLocation && (
            <div className="absolute bottom-3 left-3 right-3 bg-background/90 backdrop-blur-sm p-2 rounded-lg border">
              <p className="text-xs text-muted-foreground">
                Current location: {currentLocation.lat.toFixed(4)}, {currentLocation.lng.toFixed(4)}
              </p>
            </div>
          )}
        </div>
      </section>
      
      {/* Quick Actions */}
      <section>
        <div className="grid grid-cols-2 gap-3">
          <Button className="app-button h-auto py-4 flex-col" variant="outline">
            <Shield className="h-6 w-6 mb-1" />
            <span className="text-sm">Safety Center</span>
          </Button>
          <Button className="app-button h-auto py-4 flex-col bg-red-600 hover:bg-red-700 text-white">
            <Phone className="h-6 w-6 mb-1" />
            <span className="text-sm">Emergency SOS</span>
          </Button>
        </div>
      </section>
      
      {/* Services Section */}
      <section>
        <h2 className="text-lg font-bold mb-3 text-center">Our Services</h2>
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          <ServiceCard 
            type="battery" 
            title="Battery Jump" 
            price="$49"
            description="Dead battery? We'll get you back on the road fast."
          />
          <ServiceCard 
            type="tire" 
            title="Tire Change" 
            price="$69"
            description="Flat tire? We'll swap it with your spare quickly."
          />
          <ServiceCard 
            type="fuel" 
            title="Fuel Delivery" 
            price="$45"
            description="Out of gas? We'll bring fuel right to you."
          />
          <ServiceCard 
            type="lockout" 
            title="Lockout Service" 
            price="$75"
            description="Locked out? We'll help you get back in safely."
          />
          <ServiceCard 
            type="tow" 
            title="Towing Service" 
            price="$99"
            description="Need a tow? We'll get your vehicle to safety."
          />
          <ServiceCard 
            type="charging" 
            title="EV Charging" 
            price="$59"
            description="Electric vehicle out of power? Mobile charging available."
          />
        </div>
      </section>
    </div>
  );
};

export default CustomerHome;
