
import React, { useState } from "react";
import DriverLayout from "@/components/DriverLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useDriver } from "@/contexts/DriverContext";
import { useToast } from "@/hooks/use-toast";
import ProfileHeader from "@/components/ProfileHeader";
import PersonalInfoTab from "@/components/PersonalInfoTab";
import VehicleInfoTab from "@/components/VehicleInfoTab";
import DocumentsTab from "@/components/DocumentsTab";
import SettingsTab from "@/components/SettingsTab";

const DriverProfile: React.FC = () => {
  const { driver, setDriver } = useDriver();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("personal");
  const [isEditing, setIsEditing] = useState(false);

  if (!driver) {
    return <div>Loading...</div>;
  }

  const handleEditToggle = () => {
    if (isEditing) {
      toast({
        title: "Profile Updated",
        description: "Your profile has been saved successfully."
      });
    }
    setIsEditing(!isEditing);
  };

  return (
    <DriverLayout>
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">Driver Profile</h1>
          <p className="text-muted-foreground">Manage your account and vehicle information</p>
        </div>

        <ProfileHeader 
          driver={driver} 
          isEditing={isEditing} 
          onEditToggle={handleEditToggle} 
        />

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="personal">Personal</TabsTrigger>
            <TabsTrigger value="vehicle">Vehicle</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="personal" className="space-y-6 mt-6">
            <PersonalInfoTab driver={driver} isEditing={isEditing} />
          </TabsContent>

          <TabsContent value="vehicle" className="space-y-6 mt-6">
            <VehicleInfoTab driver={driver} isEditing={isEditing} />
          </TabsContent>

          <TabsContent value="documents" className="space-y-6 mt-6">
            <DocumentsTab />
          </TabsContent>

          <TabsContent value="settings" className="space-y-6 mt-6">
            <SettingsTab />
          </TabsContent>
        </Tabs>
      </div>
    </DriverLayout>
  );
};

export default DriverProfile;
