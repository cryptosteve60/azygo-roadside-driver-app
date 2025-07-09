
import React, { createContext, useContext, useState, ReactNode } from "react";

export interface Driver {
  id: string;
  name: string;
  fullName: string;
  email: string;
  phone: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  profileImage?: string;
  status: string;
  isOnline: boolean;
  currentLocation: { lat: number; lng: number };
  rating: number;
  totalJobs: number;
  documents: {
    license: string;
    insurance: string;
    backgroundCheck: boolean;
  };
  vehicle: {
    make: string;
    model: string;
    year: number;
    licensePlate: string;
  };
  vehicleInfo: {
    make: string;
    model: string;
    year: string;
    color: string;
    licensePlate: string;
    type: string;
  };
  earnings: {
    today: number;
    week: number;
    month: number;
  };
}

export interface DriverJob {
  id: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  customerLocation: {
    lat: number;
    lng: number;
    address: string;
  };
  serviceType: string;
  description: string;
  vehicleDetails: string;
  status: "available" | "accepted" | "enroute" | "arrived" | "inProgress" | "completed";
  price: number;
  createdAt: Date;
  safetyPin: string;
  estimatedDuration: number;
}

interface DriverContextType {
  driver: Driver | null;
  setDriver: (driver: Driver | null) => void;
  currentJob: DriverJob | null;
  setCurrentJob: (job: DriverJob | null) => void;
  availableJobs: DriverJob[];
  setAvailableJobs: (jobs: DriverJob[]) => void;
  jobHistory: DriverJob[];
  setJobHistory: (jobs: DriverJob[]) => void;
  isOnline: boolean;
  setIsOnline: (online: boolean) => void;
}

const DriverContext = createContext<DriverContextType | undefined>(undefined);

export const useDriver = () => {
  const context = useContext(DriverContext);
  if (!context) {
    throw new Error("useDriver must be used within a DriverProvider");
  }
  return context;
};

export const DriverProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [driver, setDriver] = useState<Driver | null>({
    id: "driver-123",
    name: "Mike Johnson",
    fullName: "Mike Johnson",
    email: "mike@example.com",
    phone: "+1234567890",
    address: "123 Main St",
    city: "Los Angeles",
    state: "CA",
    zipCode: "90210",
    profileImage: "",
    status: "active",
    isOnline: false,
    currentLocation: { lat: 34.0522, lng: -118.2437 },
    rating: 4.9,
    totalJobs: 847,
    documents: {
      license: "verified",
      insurance: "verified",
      backgroundCheck: true,
    },
    vehicle: {
      make: "Ford",
      model: "Transit",
      year: 2022,
      licensePlate: "ABC123",
    },
    vehicleInfo: {
      make: "Ford",
      model: "Transit",
      year: "2022",
      color: "White",
      licensePlate: "ABC123",
      type: "van",
    },
    earnings: {
      today: 127.50,
      week: 892.30,
      month: 3247.80,
    },
  });

  const [currentJob, setCurrentJob] = useState<DriverJob | null>(null);
  const [availableJobs, setAvailableJobs] = useState<DriverJob[]>([]);
  const [jobHistory, setJobHistory] = useState<DriverJob[]>([]);
  const [isOnline, setIsOnline] = useState(false);

  return (
    <DriverContext.Provider
      value={{
        driver,
        setDriver,
        currentJob,
        setCurrentJob,
        availableJobs,
        setAvailableJobs,
        jobHistory,
        setJobHistory,
        isOnline,
        setIsOnline,
      }}
    >
      {children}
    </DriverContext.Provider>
  );
};
