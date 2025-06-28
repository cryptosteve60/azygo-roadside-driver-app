
import React from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User } from "lucide-react";
import { Driver } from "@/contexts/DriverContext";

interface PersonalInfoTabProps {
  driver: Driver;
  isEditing: boolean;
}

const PersonalInfoTab: React.FC<PersonalInfoTabProps> = ({ driver, isEditing }) => {
  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-4">
        <User className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-bold">Personal Information</h3>
      </div>
      
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              value={driver.name.split(" ")[0]}
              disabled={!isEditing}
              className={!isEditing ? "bg-muted" : ""}
            />
          </div>
          <div>
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              value={driver.name.split(" ")[1] || ""}
              disabled={!isEditing}
              className={!isEditing ? "bg-muted" : ""}
            />
          </div>
        </div>
        
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={driver.email}
            disabled={!isEditing}
            className={!isEditing ? "bg-muted" : ""}
          />
        </div>
        
        <div>
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            value={driver.phone}
            disabled={!isEditing}
            className={!isEditing ? "bg-muted" : ""}
          />
        </div>
      </div>
    </Card>
  );
};

export default PersonalInfoTab;
