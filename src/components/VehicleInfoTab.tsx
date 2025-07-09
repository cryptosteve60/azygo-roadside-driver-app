
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Car, Calendar, Palette, Hash } from "lucide-react";
import { Driver, useDriver } from "@/contexts/DriverContext";
import { useToast } from "@/hooks/use-toast";

interface VehicleInfoTabProps {
  driver: Driver;
  isEditing: boolean;
}

const VehicleInfoTab: React.FC<VehicleInfoTabProps> = ({ driver, isEditing }) => {
  const { setDriver } = useDriver();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    make: driver.vehicleInfo?.make || '',
    model: driver.vehicleInfo?.model || '',
    year: driver.vehicleInfo?.year || '',
    color: driver.vehicleInfo?.color || '',
    licensePlate: driver.vehicleInfo?.licensePlate || '',
    vehicleType: driver.vehicleInfo?.type || 'sedan'
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    setDriver({
      ...driver,
      vehicleInfo: {
        make: formData.make,
        model: formData.model,
        year: formData.year,
        color: formData.color,
        licensePlate: formData.licensePlate,
        type: formData.vehicleType
      }
    });
    
    toast({
      title: "Vehicle Info Updated",
      description: "Your vehicle information has been saved successfully."
    });
  };

  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-4">
        <Car className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-bold">Vehicle Information</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="make">Make</Label>
          <Input
            id="make"
            value={formData.make}
            onChange={(e) => handleInputChange('make', e.target.value)}
            disabled={!isEditing}
            placeholder="e.g., Toyota, Ford, Honda"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="model">Model</Label>
          <Input
            id="model"
            value={formData.model}
            onChange={(e) => handleInputChange('model', e.target.value)}
            disabled={!isEditing}
            placeholder="e.g., Camry, F-150, Civic"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="year">Year</Label>
          <div className="relative">
            <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              id="year"
              value={formData.year}
              onChange={(e) => handleInputChange('year', e.target.value)}
              disabled={!isEditing}
              className="pl-10"
              placeholder="e.g., 2020"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="color">Color</Label>
          <div className="relative">
            <Palette className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              id="color"
              value={formData.color}
              onChange={(e) => handleInputChange('color', e.target.value)}
              disabled={!isEditing}
              className="pl-10"
              placeholder="e.g., White, Black, Silver"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="licensePlate">License Plate</Label>
          <div className="relative">
            <Hash className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              id="licensePlate"
              value={formData.licensePlate}
              onChange={(e) => handleInputChange('licensePlate', e.target.value)}
              disabled={!isEditing}
              className="pl-10"
              placeholder="Enter license plate number"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="vehicleType">Vehicle Type</Label>
          <Select
            value={formData.vehicleType}
            onValueChange={(value) => handleInputChange('vehicleType', value)}
            disabled={!isEditing}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select vehicle type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sedan">Sedan</SelectItem>
              <SelectItem value="suv">SUV</SelectItem>
              <SelectItem value="truck">Truck</SelectItem>
              <SelectItem value="van">Van</SelectItem>
              <SelectItem value="coupe">Coupe</SelectItem>
              <SelectItem value="convertible">Convertible</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {isEditing && (
        <div className="mt-6 flex justify-end">
          <Button onClick={handleSave} className="bg-primary hover:bg-primary/90">
            Save Changes
          </Button>
        </div>
      )}
    </Card>
  );
};

export default VehicleInfoTab;
