
import React, { useState } from "react";
import DriverLayout from "@/components/DriverLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useDriver } from "@/contexts/DriverContext";
import { useToast } from "@/hooks/use-toast";
import { User, Car, FileText, Shield, Settings, Upload } from "lucide-react";

const DriverProfile: React.FC = () => {
  const { driver, setDriver } = useDriver();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("personal");
  const [isEditing, setIsEditing] = useState(false);

  if (!driver) {
    return <div>Loading...</div>;
  }

  const handleSaveProfile = () => {
    setIsEditing(false);
    toast({
      title: "Profile Updated",
      description: "Your profile has been saved successfully."
    });
  };

  return (
    <DriverLayout>
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">Driver Profile</h1>
          <p className="text-muted-foreground">Manage your account and vehicle information</p>
        </div>

        {/* Profile Header */}
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
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? "Save" : "Edit"}
            </Button>
          </div>
        </Card>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="personal">Personal</TabsTrigger>
            <TabsTrigger value="vehicle">Vehicle</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="personal" className="space-y-6 mt-6">
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
          </TabsContent>

          <TabsContent value="vehicle" className="space-y-6 mt-6">
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
          </TabsContent>

          <TabsContent value="documents" className="space-y-6 mt-6">
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <FileText className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-bold">Required Documents</h3>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Shield className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="font-medium">Driver's License</p>
                      <p className="text-sm text-muted-foreground">Expires: Dec 2025</p>
                    </div>
                  </div>
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    Verified
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Shield className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="font-medium">Insurance Certificate</p>
                      <p className="text-sm text-muted-foreground">Expires: Mar 2024</p>
                    </div>
                  </div>
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    Verified
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Shield className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="font-medium">Background Check</p>
                      <p className="text-sm text-muted-foreground">Completed: Jan 2024</p>
                    </div>
                  </div>
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    Passed
                  </Badge>
                </div>
              </div>
              
              <Button className="w-full mt-4" variant="outline">
                <Upload className="h-4 w-4 mr-2" />
                Upload New Document
              </Button>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6 mt-6">
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
          </TabsContent>
        </Tabs>
      </div>
    </DriverLayout>
  );
};

export default DriverProfile;
