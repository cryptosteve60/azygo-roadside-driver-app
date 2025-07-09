
import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Edit, Save, Star, MapPin, Phone, Mail } from "lucide-react";
import { Driver } from "@/contexts/DriverContext";

interface ProfileHeaderProps {
  driver: Driver;
  isEditing: boolean;
  onEditToggle: () => void;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ driver, isEditing, onEditToggle }) => {
  const getStatusBadge = (status: string) => {
    const variants = {
      active: "bg-green-100 text-green-800",
      inactive: "bg-gray-100 text-gray-800",
      suspended: "bg-red-100 text-red-800",
      pending: "bg-yellow-100 text-yellow-800"
    };
    
    return (
      <Badge variant="secondary" className={variants[status as keyof typeof variants] || variants.active}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  return (
    <Card className="p-6 mb-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <Avatar className="h-20 w-20">
          <AvatarImage src={driver.profileImage} alt={driver.fullName} />
          <AvatarFallback className="text-lg">
            {driver.fullName.split(' ').map(n => n[0]).join('')}
          </AvatarFallback>
        </Avatar>
        
        <div className="flex-1 space-y-2">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            <h2 className="text-2xl font-bold">{driver.fullName}</h2>
            {getStatusBadge(driver.status)}
          </div>
          
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Mail className="h-4 w-4" />
              <span>{driver.email}</span>
            </div>
            <div className="flex items-center gap-1">
              <Phone className="h-4 w-4" />
              <span>{driver.phone}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 text-yellow-500" />
              <span className="font-medium">{driver.rating || '4.8'}</span>
              <span className="text-muted-foreground">({driver.totalJobs || '127'} jobs)</span>
            </div>
            {driver.city && driver.state && (
              <div className="flex items-center gap-1 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>{driver.city}, {driver.state}</span>
              </div>
            )}
          </div>
        </div>
        
        <Button
          onClick={onEditToggle}
          variant={isEditing ? "default" : "outline"}
          className="shrink-0"
        >
          {isEditing ? (
            <>
              <Save className="h-4 w-4 mr-2" />
              Save Profile
            </>
          ) : (
            <>
              <Edit className="h-4 w-4 mr-2" />
              Edit Profile
            </>
          )}
        </Button>
      </div>
    </Card>
  );
};

export default ProfileHeader;
