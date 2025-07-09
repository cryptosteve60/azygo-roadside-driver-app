
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { MessageCircleQuestion, Users, Award, MapPin, Shield } from "lucide-react";
import SupportOverlay from "./SupportOverlay";
import CommunityModal from "./CommunityModal";
import RewardsModal from "./RewardsModal";
import LocationModal from "./LocationModal";
import SafetyModal from "./SafetyModal";

const QuickAccessGrid: React.FC = () => {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const quickAccessItems = [
    { id: 'support', icon: MessageCircleQuestion, label: 'Support', color: 'text-blue-600' },
    { id: 'community', icon: Users, label: 'Community', color: 'text-green-600' },
    { id: 'rewards', icon: Award, label: 'Rewards', color: 'text-yellow-600' },
    { id: 'location', icon: MapPin, label: 'Location', color: 'text-red-600' },
    { id: 'safety', icon: Shield, label: 'Safety', color: 'text-purple-600' }
  ];

  const openModal = (modalId: string) => {
    setActiveModal(modalId);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  return (
    <>
      <Card className="p-3 bg-background/95 backdrop-blur-sm border-0 shadow-lg">
        <div className="grid grid-cols-5 gap-3">
          {quickAccessItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => openModal(item.id)}
                className="flex flex-col items-center gap-1 p-3 rounded-lg hover:bg-muted/50 transition-colors min-h-[44px] justify-center"
              >
                <IconComponent className={`h-5 w-5 ${item.color}`} />
                <span className="text-xs font-medium text-muted-foreground">{item.label}</span>
              </button>
            );
          })}
        </div>
      </Card>

      {/* Modals */}
      <SupportOverlay isOpen={activeModal === 'support'} onClose={closeModal} />
      <CommunityModal isOpen={activeModal === 'community'} onClose={closeModal} />
      <RewardsModal isOpen={activeModal === 'rewards'} onClose={closeModal} />
      <LocationModal isOpen={activeModal === 'location'} onClose={closeModal} />
      <SafetyModal isOpen={activeModal === 'safety'} onClose={closeModal} />
    </>
  );
};

export default QuickAccessGrid;
