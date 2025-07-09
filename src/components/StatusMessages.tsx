
import React from "react";

interface StatusMessagesProps {
  isOnline: boolean;
  hasAvailableJobs: boolean;
  hasCurrentJob: boolean;
}

const StatusMessages: React.FC<StatusMessagesProps> = ({
  isOnline,
  hasAvailableJobs,
  hasCurrentJob,
}) => {
  if (!isOnline || hasAvailableJobs || hasCurrentJob) return null;

  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-auto">
      <div className="bg-background/95 backdrop-blur-sm rounded-lg p-6 text-center">
        <p className="text-muted-foreground">Looking for requests...</p>
        <p className="text-sm text-muted-foreground mt-1">New requests will appear here automatically.</p>
      </div>
    </div>
  );
};

export default StatusMessages;
