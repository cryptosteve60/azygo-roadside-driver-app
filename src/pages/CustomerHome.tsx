
import React from "react";
import { useApp } from "@/contexts/AppContext";
import ServiceCard from "@/components/ServiceCard";
import MapView from "@/components/MapView";
import { Badge } from "@/components/ui/badge";

const CustomerHome: React.FC = () => {
  const { currentLocation, currentJob } = useApp();
  
  return (
    <div className="flex flex-col gap-5">
      {/* Welcome Section */}
      <section className="text-center">
        <h1 className="text-2xl font-bold mb-2">Ready to roll?</h1>
        <p className="text-muted-foreground">What roadside assistance do you need today?</p>
      </section>
      
      {/* Map Section */}
      <section>
        <div className="relative">
          <MapView height="h-[180px]" />
          <Badge className="absolute top-3 left-3 bg-white text-foreground">Current Location</Badge>
        </div>
      </section>
      
      {/* Services Section */}
      <section>
        <h2 className="text-lg font-bold mb-3">Our Services</h2>
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          <ServiceCard 
            type="battery" 
            title="Battery Jump" 
            price="$45"
            description="Dead battery? We'll bring the jumper cables and get you back on the road."
          />
          <ServiceCard 
            type="tire" 
            title="Tire Change" 
            price="$60"
            description="Flat tire? We'll swap it with your spare or patch it if possible."
          />
          <ServiceCard 
            type="fuel" 
            title="Fuel Delivery" 
            price="$40"
            description="Out of gas? We'll bring fuel right to your location."
          />
          <ServiceCard 
            type="lockout" 
            title="Lockout Service" 
            price="$70"
            description="Locked your keys inside? We'll help you get back in."
          />
          <ServiceCard 
            type="tow" 
            title="Towing Service" 
            price="$95"
            description="Need a tow? We'll get your vehicle to a safe location."
          />
          <ServiceCard 
            type="charging" 
            title="EV Charging" 
            price="$55"
            description="Electric vehicle out of power? We'll bring mobile charging to you."
          />
        </div>
      </section>
      
      {/* Emergency Section */}
      <section className="mt-4">
        <div className="p-4 rounded-lg bg-red-50 border border-red-100 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-red-800">Emergency Assistance</h3>
            <p className="text-sm text-red-700">Need immediate help? Call our emergency line</p>
          </div>
          <button className="px-4 py-2 bg-red-600 text-white rounded-lg">
            Call Now
          </button>
        </div>
      </section>
    </div>
  );
};

export default CustomerHome;
