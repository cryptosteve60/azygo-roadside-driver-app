
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MapPin } from "lucide-react";

interface LocationInputProps {
  location: string;
  setLocation: (location: string) => void;
  isLoadingAddress: boolean;
}

export default function LocationInput({ location, setLocation, isLoadingAddress }: LocationInputProps) {
  return (
    <div>
      <Label htmlFor="location">Pickup Location</Label>
      <div className="relative">
        <Input 
          id="location" 
          className="app-input peer" 
          value={isLoadingAddress ? "Loading address..." : location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Enter your current location"
          disabled={isLoadingAddress}
        />
        <MapPin className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground peer-focus:text-primary" />
      </div>
      <p className="text-sm text-muted-foreground mt-1">
        📍 Using your GPS location for accuracy
      </p>
    </div>
  );
}
