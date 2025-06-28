
import React from "react";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Shield, Clock } from "lucide-react";

interface OnlineStatusToggleProps {
  isOnline: boolean;
  onToggle: (online: boolean) => void;
}

const OnlineStatusToggle: React.FC<OnlineStatusToggleProps> = ({ isOnline, onToggle }) => {
  return (
    <Card className="p-6 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`p-3 rounded-full ${isOnline ? 'bg-green-100' : 'bg-gray-100'}`}>
            {isOnline ? (
              <Shield className="h-6 w-6 text-green-600" />
            ) : (
              <Clock className="h-6 w-6 text-gray-600" />
            )}
          </div>
          <div>
            <h3 className="font-bold text-lg">
              {isOnline ? "You're Online" : "You're Offline"}
            </h3>
            <p className="text-sm text-muted-foreground">
              {isOnline ? "Ready to receive job requests" : "Not receiving job requests"}
            </p>
          </div>
        </div>
        <Switch
          checked={isOnline}
          onCheckedChange={onToggle}
          className="scale-125"
        />
      </div>
      {isOnline && (
        <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
          <p className="text-sm text-green-800">
            🟢 You're visible to customers in your area. Stay safe and drive carefully!
          </p>
        </div>
      )}
    </Card>
  );
};

export default OnlineStatusToggle;
