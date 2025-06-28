import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useDriver } from "@/contexts/DriverContext";
import { useToast } from "@/hooks/use-toast";
import { 
  User, 
  Phone, 
  Mail, 
  Car, 
  FileText, 
  Shield, 
  Upload,
  CheckCircle,
  AlertCircle,
  Settings
} from "lucide-react";
import DriverLayout from "@/components/DriverLayout";

const DriverProfile = () => {
  const { driver, setDriver, isOnline, setIsOnline } = useDriver();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: driver?.name || "",
    email: driver?.email || "",
    phone: driver?.phone || "",
    vehicleInfo: driver?.vehicleInfo || "",
  });

  const handleSave = () => {
    if (driver) {
      setDriver({
        ...driver,
        ...formData,
      });
      setIsEditing(false);
      toast({
        title: "Profile Updated! ✅",
        description: "Your profile information has been saved."
      });
    }
  };

  const handleCancel = () => {
    setFormData({
      name: driver?.name || "",
      email: driver?.email || "",
      phone: driver?.phone || "",
      vehicleInfo: driver?.vehicleInfo || "",
    });
    setIsEditing(false);
  };

  const handleDocumentUpload = (docType: string) => {
    // Mock document upload
    toast({
      title: "Document Upload",
      description: `${docType} upload feature would be implemented here.`
    });
  };

  return (
    <DriverLayout>
      <div className="container max-w-2xl mx-auto py-6 space-y-6">
        {/* Profile Header */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold">
                {driver?.name?.charAt(0) || "D"}
              </div>
              <div>
                <h2 className="text-xl font-bold">{driver?.name}</h2>
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">⭐ {driver?.rating}/5.0</span>
                  <Badge variant={isOnline ? "default" : "secondary"}>
                    {isOnline ? "ONLINE" : "OFFLINE"}
                  </Badge>
                </div>
              </div>
            </div>
            <Button
              variant="outline"
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? "Cancel" : "Edit Profile"}
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="text-center p-3 bg-secondary/50 rounded-lg">
              <div className="font-bold text-lg">{driver?.completedJobs}</div>
              <div className="text-muted-foreground">Jobs Completed</div>
            </div>
            <div className="text-center p-3 bg-secondary/50 rounded-lg">
              <div className="font-bold text-lg text-green-600">
                ${driver?.earnings.monthly.toFixed(2)}
              </div>
              <div className="text-muted-foreground">This Month</div>
            </div>
          </div>
        </Card>

        {/* Personal Information */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <User className="h-5 w-5" />
            <h3 className="font-semibold">Personal Information</h3>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                disabled={!isEditing}
              />
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  disabled={!isEditing}
                  className="pl-10"
                />
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              </div>
            </div>

            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <div className="relative">
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  disabled={!isEditing}
                  className="pl-10"
                />
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              </div>
            </div>

            <div>
              <Label htmlFor="vehicle">Vehicle Information</Label>
              <div className="relative">
                <Input
                  id="vehicle"
                  value={formData.vehicleInfo}
                  onChange={(e) => setFormData(prev => ({ ...prev, vehicleInfo: e.target.value }))}
                  disabled={!isEditing}
                  className="pl-10"
                  placeholder="e.g., 2022 Honda Civic - Blue"
                />
                <Car className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              </div>
            </div>

            {isEditing && (
              <div className="flex gap-2">
                <Button onClick={handleSave}>Save Changes</Button>
                <Button variant="outline" onClick={handleCancel}>Cancel</Button>
              </div>
            )}
          </div>
        </Card>

        {/* Documents & Verification */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <FileText className="h-5 w-5" />
            <h3 className="font-semibold">Documents & Verification</h3>
          </div>

          <div className="space-y-4">
            {/* Driver's License */}
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  {driver?.documents?.license ? (
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  ) : (
                    <AlertCircle className="h-5 w-5 text-yellow-600" />
                  )}
                  <span className="font-medium">Driver's License</span>
                </div>
                <Badge variant={driver?.documents?.license ? "default" : "secondary"}>
                  {driver?.documents?.license || "Pending"}
                </Badge>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleDocumentUpload("Driver's License")}
              >
                <Upload className="h-4 w-4 mr-2" />
                Upload
              </Button>
            </div>

            {/* Insurance */}
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  {driver?.documents?.insurance ? (
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  ) : (
                    <AlertCircle className="h-5 w-5 text-yellow-600" />
                  )}
                  <span className="font-medium">Insurance</span>
                </div>
                <Badge variant={driver?.documents?.insurance ? "default" : "secondary"}>
                  {driver?.documents?.insurance || "Pending"}
                </Badge>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleDocumentUpload("Insurance")}
              >
                <Upload className="h-4 w-4 mr-2" />
                Upload
              </Button>
            </div>

            {/* Background Check */}
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  {driver?.documents?.backgroundCheck ? (
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  ) : (
                    <AlertCircle className="h-5 w-5 text-yellow-600" />
                  )}
                  <span className="font-medium">Background Check</span>
                </div>
                <Badge variant={driver?.documents?.backgroundCheck ? "default" : "secondary"}>
                  {driver?.documents?.backgroundCheck ? "Verified" : "Pending"}
                </Badge>
              </div>
            </div>
          </div>
        </Card>

        {/* Availability Settings */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Settings className="h-5 w-5" />
            <h3 className="font-semibold">Availability Settings</h3>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="online-status">Currently Online</Label>
                <p className="text-sm text-muted-foreground">
                  Receive job requests when online
                </p>
              </div>
              <Switch
                id="online-status"
                checked={isOnline}
                onCheckedChange={setIsOnline}
              />
            </div>

            <Separator />

            <div>
              <Label>Working Hours Preference</Label>
              <p className="text-sm text-muted-foreground mb-2">
                Set your preferred working hours (feature coming soon)
              </p>
              <Button variant="outline" size="sm" disabled>
                Set Schedule
              </Button>
            </div>
          </div>
        </Card>

        {/* Safety Features */}
        <Card className="p-6 bg-yellow-50 border-yellow-200">
          <div className="flex items-center gap-2 mb-4">
            <Shield className="h-5 w-5 text-yellow-600" />
            <h3 className="font-semibold text-yellow-800">Safety Features</h3>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-yellow-800">Emergency Contacts</span>
              <Button variant="outline" size="sm">
                Manage
              </Button>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-yellow-800">Safety PIN Verification</span>
              <Badge variant="outline">Enabled</Badge>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-yellow-800">Live Location Sharing</span>
              <Badge variant="outline">Active</Badge>
            </div>
          </div>
        </Card>
      </div>
    </DriverLayout>
  );
};

export default DriverProfile;
