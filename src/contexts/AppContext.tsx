
import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the service types our app will offer
export type ServiceType = 
  | "battery" 
  | "tire" 
  | "fuel" 
  | "lockout" 
  | "tow";

// Define the user role
export type UserRole = "customer" | "worker";

// Define the job status
export type JobStatus = 
  | "requested" 
  | "accepted"
  | "enroute" 
  | "arrived"
  | "inProgress"
  | "completed"
  | "cancelled";

// Define the job data structure
export interface JobRequest {
  id: string;
  customerId: string;
  customerName: string;
  customerLocation: {
    lat: number;
    lng: number;
    address?: string;
  };
  serviceType: ServiceType;
  description: string;
  status: JobStatus;
  createdAt: Date;
  acceptedBy?: string;
  acceptedAt?: Date;
  completedAt?: Date;
  estimatedArrival?: Date;
  price?: number;
}

// Define mock user data
export interface User {
  id: string;
  name: string;
  role: UserRole;
  rating: number;
  jobsCompleted: number;
  image?: string;
}

interface AppContextType {
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  activeUser: User | null;
  setActiveUser: (user: User | null) => void;
  availableJobs: JobRequest[];
  setAvailableJobs: (jobs: JobRequest[]) => void;
  myJobs: JobRequest[];
  setMyJobs: (jobs: JobRequest[]) => void;
  currentJob: JobRequest | null;
  setCurrentJob: (job: JobRequest | null) => void;
  currentLocation: { lat: number; lng: number } | null;
  setCurrentLocation: (location: { lat: number; lng: number } | null) => void;
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
  const [userRole, setUserRole] = useState<UserRole>("customer");
  const [activeUser, setActiveUser] = useState<User | null>({
    id: "user-123",
    name: "John Doe",
    role: "customer",
    rating: 4.8,
    jobsCompleted: 0,
  });
  const [availableJobs, setAvailableJobs] = useState<JobRequest[]>([]);
  const [myJobs, setMyJobs] = useState<JobRequest[]>([]);
  const [currentJob, setCurrentJob] = useState<JobRequest | null>(null);
  const [currentLocation, setCurrentLocation] = useState<{ lat: number; lng: number } | null>(null);

  // Mock the current location if GPS isn't available in the development environment
  React.useEffect(() => {
    // Mock location - downtown area
    setCurrentLocation({ lat: 34.0522, lng: -118.2437 });
    
    // Mock available jobs for workers
    if (userRole === "worker") {
      const mockJobs: JobRequest[] = [
        {
          id: "job-1",
          customerId: "cust-123",
          customerName: "Alex Johnson",
          customerLocation: {
            lat: 34.0535,
            lng: -118.2430,
            address: "123 Downtown St, Los Angeles"
          },
          serviceType: "battery",
          description: "My car won't start, need a jump!",
          status: "requested",
          createdAt: new Date(),
          price: 45,
        },
        {
          id: "job-2",
          customerId: "cust-456",
          customerName: "Sam Smith",
          customerLocation: {
            lat: 34.0510,
            lng: -118.2450,
            address: "456 Main Ave, Los Angeles"
          },
          serviceType: "tire",
          description: "Flat tire needs changing",
          status: "requested",
          createdAt: new Date(),
          price: 60,
        },
      ];
      setAvailableJobs(mockJobs);
    }
  }, [userRole]);

  return (
    <AppContext.Provider
      value={{
        userRole,
        setUserRole,
        activeUser,
        setActiveUser,
        availableJobs,
        setAvailableJobs,
        myJobs,
        setMyJobs,
        currentJob,
        setCurrentJob,
        currentLocation,
        setCurrentLocation,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
