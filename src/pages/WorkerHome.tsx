
import React, { useState } from "react";
import { useApp } from "@/contexts/AppContext";
import JobCard from "@/components/JobCard";
import MapView from "@/components/MapView";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

const WorkerHome: React.FC = () => {
  const { availableJobs, myJobs, currentLocation } = useApp();
  const [isOnline, setIsOnline] = useState(true);
  
  const handleToggleOnline = (checked: boolean) => {
    setIsOnline(checked);
    if (checked) {
      toast.success("You're now online", { 
        description: "You can now receive job requests"
      });
    } else {
      toast.info("You're now offline", { 
        description: "You won't receive new job requests"
      });
    }
  };
  
  return (
    <div className="flex flex-col gap-5">
      {/* Status Section */}
      <section className="flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold">Worker Dashboard</h1>
          <p className="text-sm text-muted-foreground">Find nearby jobs</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm">Offline</span>
          <Switch checked={isOnline} onCheckedChange={handleToggleOnline} />
          <span className="text-sm">Online</span>
        </div>
      </section>
      
      {/* Map Section */}
      <section>
        <div className="relative">
          <MapView height="h-[200px]" />
          <Badge className="absolute top-3 left-3 bg-white text-foreground">Your Location</Badge>
          
          <div className="absolute bottom-3 left-3 right-3 bg-background/80 backdrop-blur-sm p-3 rounded-lg border">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium">Current Area</h3>
                <p className="text-xs text-muted-foreground">Downtown Los Angeles</p>
              </div>
              <Badge variant={isOnline ? "default" : "outline"} className={isOnline ? "bg-green-500" : ""}>
                {isOnline ? "Active" : "Inactive"}
              </Badge>
            </div>
          </div>
        </div>
      </section>
      
      {/* Available Jobs */}
      <section>
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-bold">Available Jobs</h2>
          <Badge variant="outline">{availableJobs.length} nearby</Badge>
        </div>
        
        {isOnline ? (
          availableJobs.length > 0 ? (
            <div className="space-y-4">
              {availableJobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          ) : (
            <div className="text-center py-8 bg-secondary/30 rounded-lg">
              <p className="text-muted-foreground">No available jobs nearby</p>
              <p className="text-sm">Jobs will appear here as they come in</p>
            </div>
          )
        ) : (
          <div className="text-center py-8 bg-secondary/30 rounded-lg">
            <p className="text-muted-foreground">You're currently offline</p>
            <p className="text-sm">Go online to view available jobs</p>
          </div>
        )}
      </section>
      
      {/* My Jobs */}
      {myJobs.length > 0 && (
        <section>
          <h2 className="text-lg font-bold mb-3">My Jobs</h2>
          <div className="space-y-4">
            {myJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default WorkerHome;
