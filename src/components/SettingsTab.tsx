
import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";

const SettingsTab: React.FC = () => {
  return (
    <>
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Settings className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-bold">Account Settings</h3>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Push Notifications</p>
              <p className="text-sm text-muted-foreground">Receive job alerts and updates</p>
            </div>
            <Button variant="outline" size="sm">Configure</Button>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Availability Hours</p>
              <p className="text-sm text-muted-foreground">Set your preferred working hours</p>
            </div>
            <Button variant="outline" size="sm">Set Hours</Button>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Service Radius</p>
              <p className="text-sm text-muted-foreground">Maximum distance for job requests</p>
            </div>
            <Button variant="outline" size="sm">Adjust</Button>
          </div>
        </div>
      </Card>
      
      <Card className="p-6">
        <h3 className="text-lg font-bold mb-4 text-red-600">Danger Zone</h3>
        <div className="space-y-4">
          <Button variant="outline" className="w-full text-red-600 border-red-200 hover:bg-red-50">
            Deactivate Account
          </Button>
          <Button variant="outline" className="w-full text-red-600 border-red-200 hover:bg-red-50">
            Delete Account
          </Button>
        </div>
      </Card>
    </>
  );
};

export default SettingsTab;
