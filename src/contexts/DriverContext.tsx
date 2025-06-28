
import React, { createContext, useContext, useState, ReactNode } from "react";
import { ServiceRequest } from "./AppContext";

export interface Driver {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  rating: number;
  isOnline: boolean;
  currentLocation?: {
    lat: number;
    lng: number;
  };
  documents?: {
    license?: string;
    insurance?: string;
    backgroundCheck?: boolean;
  };
  earnings: {
    daily: number;
    weekly: number;
    monthly: number;
  };
  completedJobs: number;
  vehicleInfo?: string;
}

interface DriverContextType {
  driver: Driver | null;
  setDriver: (driver: Driver | null) => void;
  isOnline: boolean;
  setIsOnline: (online: boolean) => void;
  activeJob: ServiceRequest | null;
  setActiveJob: (job: ServiceRequest | null) => void;
  availableJobs: ServiceRequest[];
  setAvailableJobs: (jobs: ServiceRequest[]) => void;
  acceptJob: (jobId: string) => void;
  completeJob: (jobId: string) => void;
  updateJobStatus: (jobId: string, status: ServiceRequest['status']) => void;
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
    email: "mike@example.com",
    phone: "+1234567890",
    rating: 4.9,
    isOnline: false,
    currentLocation: { lat: 34.0522, lng: -118.2437 },
    documents: {
      license: "verified",
      insurance: "verified",
      backgroundCheck: true,
    },
    earnings: {
      daily: 125.50,
      weekly: 892.30,
      monthly: 3421.75,
    },
    completedJobs: 47,
    vehicleInfo: "2022 Honda Civic - Blue",
  });
  
  const [isOnline, setIsOnline] = useState(false);
  const [activeJob, setActiveJob] = useState<ServiceRequest | null>(null);
  const [availableJobs, setAvailableJobs] = useState<ServiceRequest[]>([
    {
      id: "job-001",
      customerId: "customer-456",
      customerName: "Sarah Wilson",
      customerPhone: "+1987654321",
      customerLocation: {
        lat: 34.0622,
        lng: -118.2537,
        address: "123 Main St, Los Angeles, CA 90210"
      },
      serviceType: "battery",
      description: "Car won't start, battery seems dead",
      vehicleDetails: "2019 Toyota Camry, Silver",
      status: "requested",
      createdAt: new Date(),
      price: 49,
      safetyPin: "7428"
    },
    {
      id: "job-002", 
      customerId: "customer-789",
      customerName: "John Smith",
      customerPhone: "+1555666777",
      customerLocation: {
        lat: 34.0422,
        lng: -118.2337,
        address: "456 Oak Ave, Los Angeles, CA 90015"
      },
      serviceType: "tire",
      description: "Flat tire on highway",
      vehicleDetails: "2020 Ford F-150, Black",
      status: "requested",
      createdAt: new Date(),
      price: 69,
      safetyPin: "3951"
    }
  ]);

  const acceptJob = (jobId: string) => {
    const job = availableJobs.find(j => j.id === jobId);
    if (job && driver) {
      const acceptedJob = {
        ...job,
        status: "accepted" as const,
        driverId: driver.id,
        driverName: driver.name,
        driverPhone: driver.phone,
        acceptedAt: new Date(),
      };
      setActiveJob(acceptedJob);
      setAvailableJobs(prev => prev.filter(j => j.id !== jobId));
    }
  };

  const completeJob = (jobId: string) => {
    if (activeJob && activeJob.id === jobId) {
      setActiveJob(null);
      // Update earnings
      if (driver && activeJob.price) {
        setDriver(prev => prev ? {
          ...prev,
          earnings: {
            ...prev.earnings,
            daily: prev.earnings.daily + activeJob.price,
            weekly: prev.earnings.weekly + activeJob.price,
            monthly: prev.earnings.monthly + activeJob.price,
          },
          completedJobs: prev.completedJobs + 1,
        } : null);
      }
    }
  };

  const updateJobStatus = (jobId: string, status: ServiceRequest['status']) => {
    if (activeJob && activeJob.id === jobId) {
      setActiveJob(prev => prev ? { ...prev, status } : null);
    }
  };

  return (
    <DriverContext.Provider
      value={{
        driver,
        setDriver,
        isOnline,
        setIsOnline,
        activeJob,
        setActiveJob,
        availableJobs,
        setAvailableJobs,
        acceptJob,
        completeJob,
        updateJobStatus,
      }}
    >
      {children}
    </DriverContext.Provider>
  );
};
