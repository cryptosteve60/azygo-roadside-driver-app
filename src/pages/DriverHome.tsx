import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { useDriver } from "@/contexts/DriverContext";
import { useToast } from "@/hooks/use-toast";
import { MapPin, Clock, DollarSign, User, Phone, Car } from "lucide-react";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import DriverLayout from "@/components/DriverLayout";

const DriverHome = () => {
  const { 
    driver, 
    isOnline, 
    setIsOnline, 
    availableJobs, 
    acceptJob,
    activeJob 
  } = useDriver();
  const { toast } = useToast();
  const [selectedJob, setSelectedJob] = useState<typeof availableJobs[0] | null>(null);
  const [showJobDialog, setShowJobDialog] = useState(false);

  const handleOnlineToggle = () => {
    setIsOnline(!isOnline);
    toast({
      title: isOnline ? "You're now offline" : "You're now online! 🚗",
      description: isOnline 
        ? "You won't receive new job requests" 
        : "Ready to receive job requests"
    });
  };

  const handleJobClick = (job: typeof availableJobs[0]) => {
    setSelectedJob(job);
    setShowJobDialog(true);
  };

  const handleAcceptJob = () => {
    if (selectedJob) {
      acceptJob(selectedJob.id);
      setShowJobDialog(false);
      toast({
        title: "Job Accepted! 🎉",
        description: "Navigate to customer location to begin service"
      });
    }
  };

  const handleDeclineJob = () => {
    setShowJobDialog(false);
    toast({
      title: "Job Declined",
      description: "Job will be offered to other drivers"
    });
  };

  if (activeJob) {
    // Redirect to active job screen would happen here
    // For now, show a message
    return (
      <DriverLayout>
        <div className="container max-w-2xl mx-auto py-6">
          <Card className="p-6 text-center">
            <h2 className="text-xl font-bold mb-2">You have an active job!</h2>
            <p className="text-muted-foreground">Navigate to Active Job screen to continue.</p>
          </Card>
        </div>
      </DriverLayout>
    );
  }

  return (
    <DriverLayout>
      <div className="container max-w-2xl mx-auto py-6 space-y-6">
        {/* Driver Status Card */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold">Welcome back, {driver?.name}!</h2>
              <p className="text-muted-foreground">Rating: ⭐ {driver?.rating}/5.0</p>
            </div>
            <Badge variant={isOnline ? "default" : "secondary"} className="text-sm">
              {isOnline ? "ONLINE" : "OFFLINE"}
            </Badge>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">
                {isOnline ? "Available for jobs" : "Not accepting jobs"}
              </span>
            </div>
            <Switch
              checked={isOnline}
              onCheckedChange={handleOnlineToggle}
            />
          </div>
        </Card>

        {/* Today's Earnings */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-2">
            <DollarSign className="h-5 w-5 text-green-600" />
            <h3 className="font-semibold">Today's Earnings</h3>
          </div>
          <div className="text-2xl font-bold text-green-600">
            ${driver?.earnings.daily.toFixed(2)}
          </div>
          <p className="text-sm text-muted-foreground">
            {driver?.completedJobs} jobs completed
          </p>
        </Card>

        {/* Available Jobs */}
        {isOnline && (
          <div>
            <h3 className="text-lg font-semibold mb-4">
              Available Jobs ({availableJobs.length})
            </h3>
            
            {availableJobs.length === 0 ? (
              <Card className="p-6 text-center">
                <p className="text-muted-foreground">
                  No jobs available right now. Check back soon!
                </p>
              </Card>
            ) : (
              <div className="space-y-3">
                {availableJobs.map((job) => (
                  <Card 
                    key={job.id} 
                    className="p-4 hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => handleJobClick(job)}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant="outline">{job.serviceType}</Badge>
                          <span className="text-sm text-muted-foreground">
                            <Clock className="h-3 w-3 inline mr-1" />
                            {new Date(job.createdAt).toLocaleTimeString()}
                          </span>
                        </div>
                        <h4 className="font-semibold">{job.customerName}</h4>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-green-600">
                          ${job.price}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                      <MapPin className="h-4 w-4" />
                      <span>{job.customerLocation.address}</span>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Car className="h-4 w-4" />
                      <span>{job.vehicleDetails}</span>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}

        {!isOnline && (
          <Card className="p-6 text-center">
            <h3 className="font-semibold mb-2">You're currently offline</h3>
            <p className="text-muted-foreground mb-4">
              Turn on availability to start receiving job requests.
            </p>
            <Button onClick={handleOnlineToggle}>
              Go Online
            </Button>
          </Card>
        )}

        {/* Job Details Dialog */}
        <Dialog open={showJobDialog} onOpenChange={setShowJobDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Job Request Details</DialogTitle>
              <DialogDescription>
                Review the job details before accepting
              </DialogDescription>
            </DialogHeader>
            
            {selectedJob && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Badge>{selectedJob.serviceType}</Badge>
                  <span className="text-xl font-bold text-green-600">
                    ${selectedJob.price}
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span className="font-medium">{selectedJob.customerName}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    <span>{selectedJob.customerPhone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span>{selectedJob.customerLocation.address}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Car className="h-4 w-4" />
                    <span>{selectedJob.vehicleDetails}</span>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Issue Description:</h4>
                  <p className="text-sm text-muted-foreground">
                    {selectedJob.description}
                  </p>
                </div>

                <div className="bg-yellow-50 p-3 rounded-lg">
                  <p className="text-sm">
                    <strong>Safety PIN:</strong> {selectedJob.safetyPin}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Verify this PIN with the customer before starting service
                  </p>
                </div>
              </div>
            )}

            <DialogFooter className="gap-2">
              <Button variant="outline" onClick={handleDeclineJob}>
                Decline
              </Button>
              <Button onClick={handleAcceptJob}>
                Accept Job
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DriverLayout>
  );
};

export default DriverHome;
