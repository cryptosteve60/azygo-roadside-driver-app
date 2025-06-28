
import React from "react";
import { Button } from "@/components/ui/button";
import { Navigation, Phone } from "lucide-react";
import { DriverJob } from "@/contexts/DriverContext";

interface JobActionButtonsProps {
  job: DriverJob;
  jobStatus: "available" | "accepted" | "enroute" | "arrived" | "inProgress" | "completed";
  onStatusUpdate: (status: "available" | "accepted" | "enroute" | "arrived" | "inProgress" | "completed") => void;
}

const JobActionButtons: React.FC<JobActionButtonsProps> = ({ job, jobStatus, onStatusUpdate }) => {
  return (
    <div className="space-y-3">
      <Button 
        size="lg" 
        className="w-full bg-blue-600 hover:bg-blue-700 flex items-center gap-2"
        onClick={() => window.open(`https://maps.google.com/?q=${job.customerLocation.lat},${job.customerLocation.lng}`, '_blank')}
      >
        <Navigation className="h-5 w-5" />
        Open in Maps
      </Button>

      <Button 
        size="lg" 
        className="w-full bg-green-600 hover:bg-green-700"
        onClick={() => window.open(`tel:${job.customerPhone}`)}
      >
        <Phone className="h-5 w-5 mr-2" />
        Call Customer
      </Button>

      {/* Status Update Buttons */}
      <div className="grid grid-cols-2 gap-3">
        {jobStatus === "accepted" && (
          <Button 
            size="lg" 
            onClick={() => onStatusUpdate("enroute")}
            className="col-span-2"
          >
            I'm On My Way
          </Button>
        )}
        
        {jobStatus === "enroute" && (
          <Button 
            size="lg" 
            onClick={() => onStatusUpdate("arrived")}
            className="col-span-2"
          >
            I've Arrived
          </Button>
        )}
        
        {jobStatus === "arrived" && (
          <Button 
            size="lg" 
            onClick={() => onStatusUpdate("inProgress")}
            className="col-span-2"
          >
            Start Job
          </Button>
        )}
        
        {jobStatus === "inProgress" && (
          <Button 
            size="lg" 
            onClick={() => onStatusUpdate("completed")}
            className="col-span-2 bg-green-600 hover:bg-green-700"
          >
            Complete Job
          </Button>
        )}
      </div>
    </div>
  );
};

export default JobActionButtons;
