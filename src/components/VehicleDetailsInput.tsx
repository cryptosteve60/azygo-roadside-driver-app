
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Car } from "lucide-react";

interface VehicleDetailsInputProps {
  vehicleDetails: string;
  setVehicleDetails: (details: string) => void;
}

export default function VehicleDetailsInput({ vehicleDetails, setVehicleDetails }: VehicleDetailsInputProps) {
  return (
    <div>
      <Label htmlFor="vehicleDetails">Vehicle Information *</Label>
      <div className="relative">
        <Input 
          id="vehicleDetails" 
          className="app-input peer" 
          placeholder="e.g., 2020 Honda Civic, Blue"
          value={vehicleDetails}
          onChange={(e) => setVehicleDetails(e.target.value)}
          required
        />
        <Car className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground peer-focus:text-primary" />
      </div>
    </div>
  );
}
