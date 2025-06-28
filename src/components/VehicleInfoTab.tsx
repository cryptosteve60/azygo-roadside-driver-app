
import React from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Car } from "lucide-react";
import { Driver } from "@/contexts/DriverContext";

interface VehicleInfoTabProps {
  driver: Driver;
  isEditing: boolean;
}

const VehicleInfoTab: React.FC<VehicleInfoTabProps> = ({ driver, isEditing }) => {
  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-4">
        <Car className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-bold">Vehicle Information</h3>
      </div>
      
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="make">Make</Label>
            <Input
              id="make"
              value={driver.vehicle.make}
              disabled={!isEditing}
              className={!isEditing ? "bg-muted" : ""}
            />
          </div>
          <div>
            <Label htmlFor="model">Model</Label>
            <Input
              id="model"
              value={driver.vehicle.model}
              disabled={!isEditing}
              className={!isEditing ? "bg-muted" : ""}
            />
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="year">Year</Label>
            <Input
              id="year"
              value={driver.vehicle.year}
              disabled={!isEditing}
              className={!isEditing ? "bg-muted" : ""}
            />
          </div>
          <div>
            <Label htmlFor="license">License Plate</Label>
            <Input
              id="license"
              value={driver.vehicle.licensePlate}
              disabled={!isEditing}
              className={!isEditing ? "bg-muted" : ""}
            />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default VehicleInfoTab;
