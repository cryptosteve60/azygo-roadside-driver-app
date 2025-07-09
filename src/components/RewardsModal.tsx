
import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Award, Gift, Star, X } from "lucide-react";

interface RewardsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const RewardsModal: React.FC<RewardsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-6 bg-background">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-center flex-1">Rewards Program</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="space-y-4">
          <div className="text-center p-4 bg-muted rounded-lg">
            <Star className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
            <p className="font-bold">Current Points: 1,247</p>
          </div>
          
          <Button className="w-full justify-start" variant="outline">
            <Award className="h-4 w-4 mr-2" />
            View Achievements
          </Button>
          
          <Button className="w-full justify-start" variant="outline">
            <Gift className="h-4 w-4 mr-2" />
            Redeem Rewards
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default RewardsModal;
