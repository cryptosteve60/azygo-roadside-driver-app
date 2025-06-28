
import React from "react";
import { Card } from "@/components/ui/card";
import { MapPin, Phone, Car, Clock } from "lucide-react";
import { DriverJob } from "@/contexts/DriverContext";

interface CustomerInfoCardProps {
  job: DriverJob;
}

const CustomerInfoCard: React.FC<CustomerInfoCardProps> = ({ job }) => {
  const getServiceTitle = (serviceType: string) => {
    switch (serviceType) {
      case "battery": return "Battery Jump";
      case "tire": return "Tire Change";
      case "fuel": return "Fuel Delivery";
      case "lockout": return "Lockout Service";
      case "tow": return "Towing Service";
      case "charging": return "EV Charging";
      default: return "Roadside Service";
    }
  };

  return (
    <Card className="p-6 mb-6">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-xl font-bold">{getServiceTitle(job.serviceType)}</h3>
          <p className="text-muted-foreground">for {job.customerName}</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-primary">${job.price}</p>
          <p className="text-sm text-muted-foreground">Service Fee</p>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <MapPin className="h-5 w-5 text-muted-foreground" />
          <div>
            <p className="font-medium">Customer Location</p>
            <p className="text-sm text-muted-foreground">{job.customerLocation.address}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <Phone className="h-5 w-5 text-muted-foreground" />
          <div>
            <p className="font-medium">Contact</p>
            <p className="text-sm text-muted-foreground">{job.customerPhone}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Car className="h-5 w-5 text-muted-foreground" />
          <div>
            <p className="font-medium">Vehicle</p>
            <p className="text-sm text-muted-foreground">{job.vehicleDetails}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Clock className="h-5 w-5 text-muted-foreground" />
          <div>
            <p className="font-medium">Estimated Duration</p>
            <p className="text-sm text-muted-foreground">{job.estimatedDuration} minutes</p>
          </div>
        </div>
      </div>

      {job.description && (
        <div className="mt-4 p-3 bg-muted rounded-lg">
          <p className="font-medium mb-1">Additional Details:</p>
          <p className="text-sm">{job.description}</p>
        </div>
      )}
    </Card>
  );
};

export default CustomerInfoCard;
