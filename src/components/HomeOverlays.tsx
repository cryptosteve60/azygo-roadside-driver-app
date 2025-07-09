
import React from "react";
import LocationDisplay from "./LocationDisplay";
import QuickAccessGrid from "./QuickAccessGrid";
import AyzgoToggle from "./AyzgoToggle";
import AvailableJobsOverlay from "./AvailableJobsOverlay";
import ActiveJobIndicator from "./ActiveJobIndicator";
import StatusMessages from "./StatusMessages";
import InAppMessaging from "./InAppMessaging";
import { DriverJob, Driver } from "@/contexts/DriverContext";

interface HomeOverlaysProps {
  isOnline: boolean;
  availableJobs: DriverJob[];
  currentJob: DriverJob | null;
  driver: Driver;
  showMessaging: boolean;
  onToggleOnline: (online: boolean) => void;
  onAcceptJob: (job: DriverJob) => void;
  onDeclineJob: (jobId: string) => void;
  onToggleMessaging: () => void;
}

const HomeOverlays: React.FC<HomeOverlaysProps> = ({
  isOnline,
  availableJobs,
  currentJob,
  driver,
  showMessaging,
  onToggleOnline,
  onAcceptJob,
  onDeclineJob,
  onToggleMessaging,
}) => {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Top Section - Location Display and Quick Access Grid */}
      <div className="absolute top-4 left-4 right-4 pointer-events-auto space-y-3">
        <LocationDisplay city="Los Angeles" state="CA" />
        <QuickAccessGrid />
      </div>
      
      {/* Bottom Section - AYZGO Toggle */}
      <div className="absolute bottom-20 left-4 right-4 pointer-events-auto">
        <AyzgoToggle isOnline={isOnline} onToggle={onToggleOnline} />
      </div>
      
      {/* Available Jobs - Overlay when online */}
      {isOnline && availableJobs.length > 0 && !currentJob && (
        <AvailableJobsOverlay
          jobs={availableJobs}
          onAccept={onAcceptJob}
          onDecline={onDeclineJob}
        />
      )}

      {/* In-App Messaging - Show when there's an active job */}
      {currentJob && showMessaging && (
        <div className="absolute top-32 left-4 right-4 bottom-32 pointer-events-auto">
          <InAppMessaging
            jobId={currentJob.id}
            customerName={currentJob.customerName}
            customerId={currentJob.customerId}
            driverId={driver.id}
          />
        </div>
      )}
      
      {/* Status Messages */}
      <StatusMessages
        isOnline={isOnline}
        hasAvailableJobs={availableJobs.length > 0}
        hasCurrentJob={!!currentJob}
      />

      {/* Active Job Indicator */}
      {currentJob && (
        <ActiveJobIndicator
          job={currentJob}
          showMessaging={showMessaging}
          onToggleMessaging={onToggleMessaging}
        />
      )}
    </div>
  );
};

export default HomeOverlays;
