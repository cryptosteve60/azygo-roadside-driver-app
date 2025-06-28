import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useDriver } from "@/contexts/DriverContext";
import { DollarSign, TrendingUp, Clock, CheckCircle } from "lucide-react";
import DriverLayout from "@/components/DriverLayout";

const DriverEarnings = () => {
  const { driver } = useDriver();
  const [selectedPeriod, setSelectedPeriod] = useState("daily");

  // Mock recent jobs data
  const recentJobs = [
    {
      id: "job-101",
      customerName: "Alice Johnson",
      serviceType: "battery",
      amount: 49,
      completedAt: new Date("2025-01-15T14:30:00"),
      location: "Downtown LA"
    },
    {
      id: "job-102", 
      customerName: "Bob Wilson",
      serviceType: "tire",
      amount: 69,
      completedAt: new Date("2025-01-15T12:15:00"),
      location: "Hollywood"
    },
    {
      id: "job-103",
      customerName: "Carol Smith", 
      serviceType: "fuel",
      amount: 45,
      completedAt: new Date("2025-01-15T10:45:00"),
      location: "Santa Monica"
    }
  ];

  const getEarningsForPeriod = () => {
    switch (selectedPeriod) {
      case "daily":
        return driver?.earnings.daily || 0;
      case "weekly":
        return driver?.earnings.weekly || 0;
      case "monthly":
        return driver?.earnings.monthly || 0;
      default:
        return 0;
    }
  };

  const getPeriodLabel = () => {
    switch (selectedPeriod) {
      case "daily":
        return "Today";
      case "weekly":
        return "This Week";
      case "monthly":
        return "This Month";
      default:
        return "Today";
    }
  };

  return (
    <DriverLayout>
      <div className="container max-w-2xl mx-auto py-6 space-y-6">
        {/* Earnings Overview */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <DollarSign className="h-6 w-6 text-green-600" />
            <h2 className="text-xl font-bold">Earnings Overview</h2>
          </div>

          <Tabs value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <TabsList className="grid w-full grid-cols-3 mb-4">
              <TabsTrigger value="daily">Daily</TabsTrigger>
              <TabsTrigger value="weekly">Weekly</TabsTrigger>
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
            </TabsList>

            <TabsContent value={selectedPeriod} className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">
                  ${getEarningsForPeriod().toFixed(2)}
                </div>
                <p className="text-muted-foreground">{getPeriodLabel()}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-secondary/50 rounded-lg">
                  <div className="font-bold text-lg">{driver?.completedJobs}</div>
                  <div className="text-sm text-muted-foreground">Jobs Completed</div>
                </div>
                <div className="text-center p-4 bg-secondary/50 rounded-lg">
                  <div className="font-bold text-lg">
                    ${driver ? (getEarningsForPeriod() / Math.max(driver.completedJobs, 1)).toFixed(2) : '0.00'}
                  </div>
                  <div className="text-sm text-muted-foreground">Avg per Job</div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </Card>

        {/* Earnings Breakdown */}
        <Card className="p-6">
          <h3 className="font-semibold mb-4">Earnings Breakdown</h3>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
              <span className="font-medium">Daily Earnings</span>
              <span className="font-bold text-green-600">
                ${driver?.earnings.daily.toFixed(2)}
              </span>
            </div>
            
            <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
              <span className="font-medium">Weekly Earnings</span>
              <span className="font-bold text-blue-600">
                ${driver?.earnings.weekly.toFixed(2)}
              </span>
            </div>
            
            <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
              <span className="font-medium">Monthly Earnings</span>
              <span className="font-bold text-purple-600">
                ${driver?.earnings.monthly.toFixed(2)}
              </span>
            </div>
          </div>
        </Card>

        {/* Recent Jobs */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Recent Jobs</h3>
            <Badge variant="outline">{recentJobs.length} today</Badge>
          </div>

          <div className="space-y-3">
            {recentJobs.map((job) => (
              <div key={job.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <div>
                    <div className="font-medium">{job.customerName}</div>
                    <div className="text-sm text-muted-foreground flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        {job.serviceType}
                      </Badge>
                      <span>{job.location}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-green-600">+${job.amount}</div>
                  <div className="text-xs text-muted-foreground">
                    <Clock className="h-3 w-3 inline mr-1" />
                    {job.completedAt.toLocaleTimeString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Performance Stats */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp className="h-5 w-5 text-blue-600" />
            <h3 className="font-semibold">Performance</h3>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold">⭐ {driver?.rating}</div>
              <div className="text-sm text-muted-foreground">Rating</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold">{driver?.completedJobs}</div>
              <div className="text-sm text-muted-foreground">Total Jobs</div>
            </div>
          </div>
        </Card>

        {/* Payout Information */}
        <Card className="p-6 bg-blue-50 border-blue-200">
          <h3 className="font-semibold mb-2 text-blue-800">Next Payout</h3>
          <p className="text-sm text-blue-700 mb-3">
            Your earnings will be deposited to your account every Friday.
          </p>
          <Button variant="outline" size="sm">
            View Payout Schedule
          </Button>
        </Card>
      </div>
    </DriverLayout>
  );
};

export default DriverEarnings;
