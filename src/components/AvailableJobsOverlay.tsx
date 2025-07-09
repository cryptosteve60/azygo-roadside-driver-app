
import React from "react";
import JobRequestCard from "./JobRequestCard";
import { DriverJob } from "@/contexts/DriverContext";

interface AvailableJobsOverlayProps {
  jobs: DriverJob[];
  onAccept: (job: DriverJob) => void;
  onDecline: (jobId: string) => void;
}

const AvailableJobsOverlay: React.FC<AvailableJobsOverlayProps> = ({
  jobs,
  onAccept,
  onDecline,
}) => {
  if (jobs.length === 0) return null;

  return (
    <div className="absolute top-32 left-4 right-4 bottom-32 overflow-y-auto pointer-events-auto">
      <div className="bg-background/95 backdrop-blur-sm rounded-lg p-4 mb-4">
        <h2 className="text-xl font-bold text-center mb-4">Available Requests</h2>
        <div className="space-y-4">
          {jobs.map((job) => (
            <JobRequestCard
              key={job.id}
              job={job}
              onAccept={onAccept}
              onDecline={onDecline}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AvailableJobsOverlay;
