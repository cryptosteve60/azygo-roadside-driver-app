import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useDriver } from "@/contexts/DriverContext";
import { useToast } from "@/hooks/use-toast";
import { MapPin, Phone, Clock, Car, Shield, Navigation } from "lucide-react";
import MapView from "@/components/MapView";
import DriverLayout from "@/components/DriverLayout";

const DriverActiveJob = () => {
  const { activeJob, updateJobStatus, completeJob, driver } = useDriver();
  const { toast } = useToast();
  const [hasArrived, setHasArrived] = useState(false);

  if (!activeJob) {
    return (
      <DriverLayout>
        <div className="container max-w-2xl mx-auto py-6">
          <Card className="p-6 text-center">
            <h2 className="text-xl font-bold mb-2">No Active Job</h2>
            <p className="text-muted-foreground">You don't have any active jobs right now.</p>
          </Card>
        </div>
      </DriverLayout>
    );
  }

  const handleArrived = () => {
    setHasArrived(true);
    updateJobStatus(activeJob.id, "arrived");
    toast({
      title: "Arrival Confirmed! 📍",
      description: "Customer has been notified of your arrival"
    });
  };

  const handleJobCompleted = () => {
    completeJob(activeJob.id);
    toast({
      title: "Job Completed! 🎉",
      description: `You earned $${activeJob.price}. Great work!`
    });
  };

  const handleCallCustomer = () => {
    if (activeJob.customerPhone) {
      window.open(`tel:${activeJob.customerPhone}`);
    }
  };

  const handleNavigate = () => {
    const { lat, lng } = activeJob.customerLocation;
    const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&travelmode=driving`;
    window.open(url, '_blank');
  };

  return (
    <DriverLayout>
      <div className="container max-w-2xl mx-auto py-6 space-y-6">
        {/* Job Status Header */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold">Active Job</h2>
              <p className="text-muted-foreground">
                {hasArrived ? "At customer location" : "En route to customer"}
              </p>
            </div>
            <Badge variant={hasArrived ? "default" : "secondary"}>
              {hasArrived ? "ARRIVED" : "EN ROUTE"}
            </Badge>
          </div>
          
          <div className="flex items-center gap-2 text-sm">
            <Clock className="h-4 w-4" />
            <span>Started: {new Date(activeJob.acceptedAt || activeJob.createdAt).toLocaleTimeString()}</span>
          </div>
        </Card>

        {/* Map Navigation */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Navigation</h3>
            <Button variant="outline" size="sm" onClick={handleNavigate}>
              <Navigation className="h-4 w-4 mr-2" />
              Open in Maps
            </Button>
          </div>
          
          <MapView
            height="h-[200px]"
            showCurrentLocation={true}
            showJobLocation={true}
            jobLocation={activeJob.customerLocation}
            interactive={false}
          />
          
          <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>{activeJob.customerLocation.address}</span>
          </div>
        </Card>

        {/* Customer Information */}
        <Card className="p-6">
          <h3 className="font-semibold mb-4">Customer Information</h3>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-medium">{activeJob.customerName}</span>
              </div>
              <Button variant="outline" size="sm" onClick={handleCallCustomer}>
                <Phone className="h-4 w-4 mr-2" />
                Call
              </Button>
            </div>

            <div className="flex items-center gap-2 text-sm">
              <Phone className="h-4 w-4" />
              <span>{activeJob.customerPhone}</span>
            </div>

            <div className="flex items-center gap-2 text-sm">
              <Car className="h-4 w-4" />
              <span>{activeJob.vehicleDetails}</span>
            </div>
          </div>
        </Card>

        {/* Job Details */}
        <Card className="p-6">
          <h3 className="font-semibold mb-4">Service Details</h3>
          
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Badge>{activeJob.serviceType}</Badge>
              <span className="text-lg font-bold text-green-600">
                ${activeJob.price}
              </span>
            </div>

            <div>
              <h4 className="font-medium mb-2">Issue Description:</h4>
              <p className="text-sm text-muted-foreground">
                {activeJob.description}
              </p>
            </div>
          </div>
        </Card>

        {/* Safety PIN */}
        <Card className="p-6 bg-yellow-50 border-yellow-200">
          <div className="flex items-center gap-2 mb-2">
            <Shield className="h-5 w-5 text-yellow-600" />
            <h3 className="font-semibold text-yellow-800">Safety Verification</h3>
          </div>
          <div className="bg-yellow-100 p-3 rounded-lg">
            <p className="text-lg font-bold text-yellow-800">
              PIN: {activeJob.safetyPin}
            </p>
            <p className="text-sm text-yellow-700 mt-1">
              Verify this PIN with the customer before starting service
            </p>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="space-y-3">
          {!hasArrived ? (
            <Button 
              className="w-full" 
              size="lg" 
              onClick={handleArrived}
            >
              I've Arrived
            </Button>
          ) : (
            <Button 
              className="w-full" 
              size="lg" 
              onClick={handleJobCompleted}
            >
              Job Completed
            </Button>
          )}
          
          <Button 
            variant="outline" 
            className="w-full" 
            onClick={handleCallCustomer}
          >
            <Phone className="h-4 w-4 mr-2" />
            Call Customer
          </Button>
        </div>
      </div>
    </DriverLayout>
  );
};

export default DriverActiveJob;
