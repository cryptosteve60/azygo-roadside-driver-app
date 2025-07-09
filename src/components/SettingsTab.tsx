
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Settings, Bell, Shield, Globe, Smartphone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const SettingsTab: React.FC = () => {
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    pushNotifications: true,
    emailNotifications: true,
    smsNotifications: false,
    locationTracking: true,
    jobAlerts: true,
    marketingEmails: false,
    language: 'en',
    theme: 'system',
    autoAcceptJobs: false,
    soundAlerts: true
  });

  const handleSettingChange = (key: string, value: boolean | string) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSaveSettings = () => {
    toast({
      title: "Settings Saved",
      description: "Your preferences have been updated successfully."
    });
  };

  const handleResetSettings = () => {
    setSettings({
      pushNotifications: true,
      emailNotifications: true,
      smsNotifications: false,
      locationTracking: true,
      jobAlerts: true,
      marketingEmails: false,
      language: 'en',
      theme: 'system',
      autoAcceptJobs: false,
      soundAlerts: true
    });
    
    toast({
      title: "Settings Reset",
      description: "All settings have been reset to default values."
    });
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Bell className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-bold">Notification Settings</h3>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="push-notifications" className="font-medium">
              Push Notifications
            </Label>
            <Switch
              id="push-notifications"
              checked={settings.pushNotifications}
              onCheckedChange={(checked) => handleSettingChange('pushNotifications', checked)}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <Label htmlFor="email-notifications" className="font-medium">
              Email Notifications
            </Label>
            <Switch
              id="email-notifications"
              checked={settings.emailNotifications}
              onCheckedChange={(checked) => handleSettingChange('emailNotifications', checked)}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <Label htmlFor="sms-notifications" className="font-medium">
              SMS Notifications
            </Label>
            <Switch
              id="sms-notifications"
              checked={settings.smsNotifications}
              onCheckedChange={(checked) => handleSettingChange('smsNotifications', checked)}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <Label htmlFor="job-alerts" className="font-medium">
              Job Alerts
            </Label>
            <Switch
              id="job-alerts"
              checked={settings.jobAlerts}
              onCheckedChange={(checked) => handleSettingChange('jobAlerts', checked)}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <Label htmlFor="sound-alerts" className="font-medium">
              Sound Alerts
            </Label>
            <Switch
              id="sound-alerts"
              checked={settings.soundAlerts}
              onCheckedChange={(checked) => handleSettingChange('soundAlerts', checked)}
            />
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Shield className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-bold">Privacy & Security</h3>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="location-tracking" className="font-medium">
              Location Tracking
            </Label>
            <Switch
              id="location-tracking"
              checked={settings.locationTracking}
              onCheckedChange={(checked) => handleSettingChange('locationTracking', checked)}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <Label htmlFor="auto-accept" className="font-medium">
              Auto-Accept Jobs
            </Label>
            <Switch
              id="auto-accept"
              checked={settings.autoAcceptJobs}
              onCheckedChange={(checked) => handleSettingChange('autoAcceptJobs', checked)}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <Label htmlFor="marketing-emails" className="font-medium">
              Marketing Emails
            </Label>
            <Switch
              id="marketing-emails"
              checked={settings.marketingEmails}
              onCheckedChange={(checked) => handleSettingChange('marketingEmails', checked)}
            />
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Settings className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-bold">App Preferences</h3>
        </div>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="language">Language</Label>
            <Select
              value={settings.language}
              onValueChange={(value) => handleSettingChange('language', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="es">Español</SelectItem>
                <SelectItem value="fr">Français</SelectItem>
                <SelectItem value="de">Deutsch</SelectItem>
                <SelectItem value="it">Italiano</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="theme">Theme</Label>
            <Select
              value={settings.theme}
              onValueChange={(value) => handleSettingChange('theme', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select theme" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      <div className="flex gap-3">
        <Button onClick={handleSaveSettings} className="flex-1">
          Save Settings
        </Button>
        <Button onClick={handleResetSettings} variant="outline" className="flex-1">
          Reset to Default
        </Button>
      </div>
    </div>
  );
};

export default SettingsTab;
