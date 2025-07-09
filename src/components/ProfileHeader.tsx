
import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera, Star } from "lucide-react";
import { Driver } from "@/contexts/DriverContext";

interface ProfileHeaderProps {
  driver: Driver;
  isEditing: boolean;
  onEditToggle: () => void;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ driver, isEditing, onEditToggle }) => {
  return (
    <Card className="p-4 mb-6">
      <div className="flex items-center gap-4">
        <div className="relative">
          <Avatar className="h-16 w-16">
            <AvatarImage src="" alt={driver.name} />
            <AvatarFallback className="text-2xl font-bold bg-primary text-primary-foreground">
              {driver.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <button className="absolute -bottom-1 -right-1 p-1 bg-primary rounded-full text-primary-foreground">
            <Camera className="h-3 w-3" />
          </button>
        </div>
        <div className="flex-1">
          <h2 className="text-xl font-bold text-center">{driver.name}</h2>
          <p className="text-muted-foreground text-center">{driver.email}</p>
          <div className="flex items-center justify-center gap-2 mt-2">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`h-4 w-4 ${i < Math.floor(driver.rating) ? "text-yellow-400 fill-current" : "text-gray-300"}`} />
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
