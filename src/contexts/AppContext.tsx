import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { googleMapsService } from "@/services/googleMapsService";

// Define the service types our app will offer
export type ServiceType = 
  | "battery" 
  | "tire" 
  | "fuel" 
  | "lockout" 
  | "tow"
  | "charging";

// Define the job status for customer requests
export type JobStatus = 
  | "requested" 
  | "searching"
  | "driver_assigned"
  | "driver_enroute" 
  | "driver_arrived"
  | "in_progress"
  | "completed"
  | "cancelled"
  | "accepted"
  | "enroute"
  | "arrived"
  | "inProgress";

// Define the job data structure for customer requests
export interface ServiceRequest {
  id: string;
  customerId: string;
  customerName: string;
  customerPhone?: string;
  customerLocation: {
    lat: number;
    lng: number;
    address?: string;
  };
  serviceType: ServiceType;
  description: string;
  vehicleDetails?: string;
  status: JobStatus;
  createdAt: Date;
  driverId?: string;
  driverName?: string;
  driverPhone?: string;
  driverLocation?: {
    lat: number;
    lng: number;
  };
  estimatedArrival?: Date;
  price?: number;
  safetyPin?: string;
  acceptedBy?: string;
  acceptedAt?: Date;
  completedAt?: Date;
}

// Create type alias for backward compatibility
export type JobRequest = ServiceRequest;

// Define customer user data
export interface Customer {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  rating: number;
  emergencyContacts?: {
    name: string;
    phone: string;
    relationship: string;
  }[];
  paymentMethods?: string[];
}

interface AppContextType {
  // Customer data
  customer: Customer | null;
  setCustomer: (customer: Customer | null) => void;
  
  // Service requests
  currentRequest: ServiceRequest | null;
  setCurrentRequest: (request: ServiceRequest | null) => void;
  requestHistory: ServiceRequest[];
  setRequestHistory: (history: ServiceRequest[]) => void;
  
  // Location
  currentLocation: { lat: number; lng: number } | null;
  setCurrentLocation: (location: { lat: number; lng: number } | null) => void;
  locationError: string | null;
  isLocationLoading: boolean;
  
  // App state
  isAuthenticated: boolean;
  setIsAuthenticated: (auth: boolean) => void;
  
  // Google Maps
  updateLocationAddress: (lat: number, lng: number) => Promise<string>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [customer, setCustomer] = useState<Customer | null>({
    id: "customer-123",
    name: "John Doe",
    email: "john@example.com",
    phone: "+1234567890",
    rating: 4.8,
    emergencyContacts: [
      { name: "Jane Doe", phone: "+1234567891", relationship: "Spouse" }
    ],
  });
  
  const [currentRequest, setCurrentRequest] = useState<ServiceRequest | null>(null);
  const [requestHistory, setRequestHistory] = useState<ServiceRequest[]>([]);
  const [currentLocation, setCurrentLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [isLocationLoading, setIsLocationLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);

  // Get user's current location using Google Maps service
  useEffect(() => {
    const getCurrentLocation = async () => {
      setIsLocationLoading(true);
      setLocationError(null);
      
      try {
        // Load Google Maps API first
        await googleMapsService.loadGoogleMaps();
        
        // Get current location
        const location = await googleMapsService.getCurrentLocation();
        setCurrentLocation(location);
      } catch (error) {
        console.error('Error getting location:', error);
        setLocationError(error instanceof Error ? error.message : 'Location access failed');
        // Fallback to LA
        setCurrentLocation({ lat: 34.0522, lng: -118.2437 });
      } finally {
        setIsLocationLoading(false);
      }
    };

    getCurrentLocation();
  }, []);

  const updateLocationAddress = async (lat: number, lng: number): Promise<string> => {
    try {
      return await googleMapsService.reverseGeocode(lat, lng);
    } catch (error) {
      console.error('Error getting address:', error);
      return `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
    }
  };

  return (
    <AppContext.Provider
      value={{
        customer,
        setCustomer,
        currentRequest,
        setCurrentRequest,
        requestHistory,
        setRequestHistory,
        currentLocation,
        setCurrentLocation,
        locationError,
        isLocationLoading,
        isAuthenticated,
        setIsAuthenticated,
        updateLocationAddress,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
