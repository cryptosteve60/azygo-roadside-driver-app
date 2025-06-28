
import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Driver } from "@/contexts/DriverContext";

interface ProfileHeaderProps {
  driver: Driver;
  isEditing: boolean;
  onEditToggle: () => void;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ driver, isEditing, onEditToggle }) => {
  return (
    <Card className="p-6 mb-6">
      <div className="flex items-center gap-4">
        <div className="h-16 w-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold">
          {driver.name.charAt(0)}
        </div>
        <div className="flex-1">
          <h2 className="text-xl font-bold">{driver.name}</h2>
          <p className="text-muted-foreground">{driver.email}</p>
          <div className="flex items-center gap-2 mt-2">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <span key={i} className={i < Math.floor(driver.rating) ? "text-yellow-400" : "text-gray-300"}>
                  ⭐
                </span>
              ))}
            </div>
            <span className="text-sm text-muted-foreground">
              {driver.rating} ({driver.totalJobs} jobs)
            </span>
          </div>
        </div>
        <Button
          variant={isEditing ? "default" : "outline"}
          onClick={onEditToggle}
        >
          {isEditing ? "Save" : "Edit"}
        </Button>
      </div>
    </Card>
  );
};

export default ProfileHeader;
