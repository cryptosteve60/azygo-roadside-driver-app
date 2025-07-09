
import React from "react";
import { DriverJob } from "@/contexts/DriverContext";

interface ActiveJobIndicatorProps {
  job: DriverJob;
  showMessaging: boolean;
  onToggleMessaging: () => void;
}

const ActiveJobIndicator: React.FC<ActiveJobIndicatorProps> = ({
  job,
  showMessaging,
  onToggleMessaging,
}) => {
  return (
    <div className="absolute top-32 left-4 right-4 pointer-events-auto">
      <div className="bg-primary/95 backdrop-blur-sm rounded-lg p-4 text-primary-foreground">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold">Active Job: {job.customerName}</h3>
            <p className="text-sm opacity-90">{job.serviceType} - ${job.price}</p>
          </div>
          <button
            onClick={onToggleMessaging}
            className="bg-white/20 hover:bg-white/30 px-3 py-1 rounded text-sm"
          >
            {showMessaging ? 'Hide Chat' : 'Show Chat'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ActiveJobIndicator;
