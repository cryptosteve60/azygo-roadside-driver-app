
import React from "react";
import { Card } from "@/components/ui/card";
import { Shield } from "lucide-react";

interface SafetyPinCardProps {
  safetyPin: string;
}

const SafetyPinCard: React.FC<SafetyPinCardProps> = ({ safetyPin }) => {
  return (
    <Card className="p-6 mb-6 border-l-4 border-l-primary">
      <div className="flex items-center gap-3">
        <Shield className="h-6 w-6 text-primary" />
        <div>
          <p className="font-bold">Safety PIN: {safetyPin}</p>
          <p className="text-sm text-muted-foreground">Verify with customer before starting work</p>
        </div>
      </div>
    </Card>
  );
};

export default SafetyPinCard;
