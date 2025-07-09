
import React, { useState } from "react";
import LocationDisplay from "./LocationDisplay";
import AyzgoToggle from "./AyzgoToggle";
import AvailableJobsOverlay from "./AvailableJobsOverlay";
import ActiveJobIndicator from "./ActiveJobIndicator";
import StatusMessages from "./StatusMessages";
import InAppMessaging from "./InAppMessaging";
import FloatingRewardsIcon from "./FloatingRewardsIcon";
import FloatingRightIcons from "./FloatingRightIcons";
import FloatingLocationIcon from "./FloatingLocationIcon";
import SupportOverlay from "./SupportOverlay";
import CommunityModal from "./CommunityModal";
import RewardsModal from "./RewardsModal";
import LocationModal from "./LocationModal";
import SafetyModal from "./SafetyModal";
import LocationOverlayDisplay from "./LocationOverlayDisplay";
import { Button } from "@/components/ui/button";
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
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [locationDisplayMode, setLocationDisplayMode] = useState<'under' | 'overlay'>('under');

  const openModal = (modalId: string) => {
    setActiveModal(modalId);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  return (
    <div className="absolute inset-0 pointer-events-none">      
      {/* Location Display Mode Selector */}
      <div className="absolute top-3 right-3 pointer-events-auto z-50 flex gap-2">
        <Button
          size="sm"
          variant={locationDisplayMode === 'under' ? 'default' : 'outline'}
          onClick={() => setLocationDisplayMode('under')}
          className="text-xs"
        >
          Under
        </Button>
        <Button
          size="sm"
          variant={locationDisplayMode === 'overlay' ? 'default' : 'outline'}
          onClick={() => setLocationDisplayMode('overlay')}
          className="text-xs"
        >
          Overlay
        </Button>
      </div>

      {/* Floating Icons */}
      <div className="pointer-events-auto">
        <FloatingRewardsIcon onClick={() => openModal('rewards')} />
        <FloatingRightIcons
          onSupportClick={() => openModal('support')}
          onCommunityClick={() => openModal('community')}
          onSafetyClick={() => openModal('safety')}
        />
        <FloatingLocationIcon onClick={() => openModal('location')} />
      </div>
      
      {/* AYZGO Toggle with Location Options */}
      <div className="pointer-events-auto">
        {locationDisplayMode === 'overlay' ? (
          <AyzgoToggle 
            isOnline={isOnline} 
            onToggle={onToggleOnline}
            showLocationOverlay={true}
            location="Los Angeles, CA"
          />
        ) : (
          <AyzgoToggle isOnline={isOnline} onToggle={onToggleOnline} />
        )}
      </div>
      
      {/* GPS Location Display - Under AYZGO Button (Option A) */}
      {locationDisplayMode === 'under' && (
        <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 pointer-events-auto">
          <LocationDisplay />
        </div>
      )}
      
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
        <div className="absolute top-24 left-3 right-3 bottom-32 pointer-events-auto">
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

      {/* Modals */}
      <SupportOverlay isOpen={activeModal === 'support'} onClose={closeModal} />
      <CommunityModal isOpen={activeModal === 'community'} onClose={closeModal} />
      <RewardsModal isOpen={activeModal === 'rewards'} onClose={closeModal} />
      <LocationModal isOpen={activeModal === 'location'} onClose={closeModal} />
      <SafetyModal isOpen={activeModal === 'safety'} onClose={closeModal} />
    </div>
  );
};

export default HomeOverlays;
