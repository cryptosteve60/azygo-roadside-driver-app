
import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, Car, Battery, Fuel, Lock, Flag, Plug } from "lucide-react";
import { DriverJob } from "@/contexts/DriverContext";

interface JobRequestCardProps {
  job: DriverJob;
  onAccept: (job: DriverJob) => void;
  onDecline: (jobId: string) => void;
}

const JobRequestCard: React.FC<JobRequestCardProps> = ({ job, onAccept, onDecline }) => {
  const getServiceIcon = (serviceType: string) => {
    switch (serviceType) {
      case "battery": return <Battery className="h-5 w-5 text-primary" />;
      case "tire": return <Car className="h-5 w-5 text-primary" />;
      case "fuel": return <Fuel className="h-5 w-5 text-primary" />;
      case "lockout": return <Lock className="h-5 w-5 text-primary" />;
      case "tow": return <Flag className="h-5 w-5 text-primary" />;
      case "charging": return <Plug className="h-5 w-5 text-primary" />;
      default: return <Car className="h-5 w-5 text-primary" />;
    }
  };

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
    <Card className="p-4 mb-4 border-l-4 border-l-primary">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          {getServiceIcon(job.serviceType)}
          <div>
            <h4 className="font-bold">{getServiceTitle(job.serviceType)}</h4>
            <p className="text-sm text-muted-foreground">{job.customerName}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xl font-bold text-primary">${job.price}</p>
          <p className="text-xs text-muted-foreground">Estimated</p>
        </div>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2 text-sm">
          <MapPin className="h-4 w-4 text-muted-foreground" />
          <span>{job.customerLocation.address}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Clock className="h-4 w-4 text-muted-foreground" />
          <span>{job.estimatedDuration} min estimated</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Car className="h-4 w-4 text-muted-foreground" />
          <span>{job.vehicleDetails}</span>
        </div>
      </div>

      {job.description && (
        <div className="mb-4 p-3 bg-muted rounded-lg">
          <p className="text-sm">{job.description}</p>
        </div>
      )}

      <div className="flex gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => onDecline(job.id)}
          className="flex-1"
        >
          Decline
        </Button>
        <Button 
          size="sm" 
          onClick={() => onAccept(job)}
          className="flex-1 bg-primary hover:bg-primary/90"
        >
          Accept Job
        </Button>
      </div>
    </Card>
  );
};

export default JobRequestCard;
