
import React, { useState } from "react";
import DriverLayout from "@/components/DriverLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Clock, MapPin, DollarSign, Car, Battery, Fuel, Lock, Flag, Plug } from "lucide-react";

const DriverJobs: React.FC = () => {
  const [activeTab, setActiveTab] = useState("history");

  // Mock job history data
  const completedJobs = [
    {
      id: "job-001",
      date: "2024-01-15",
      time: "2:30 PM",
      customerName: "Alice Johnson",
      serviceType: "battery",
      location: "Downtown LA",
      earnings: 49.00,
      duration: "25 min",
      rating: 5
    },
    {
      id: "job-002", 
      date: "2024-01-15",
      time: "11:45 AM",
      customerName: "Bob Wilson",
      serviceType: "tire",
      location: "Hollywood",
      earnings: 69.00,
      duration: "35 min",
      rating: 5
    },
    {
      id: "job-003",
      date: "2024-01-14",
      time: "4:15 PM", 
      customerName: "Carol Davis",
      serviceType: "fuel",
      location: "Santa Monica",
      earnings: 45.00,
      duration: "20 min",
      rating: 4
    }
  ];

  const getServiceIcon = (serviceType: string) => {
    switch (serviceType) {
      case "battery": return <Battery className="h-4 w-4 text-primary" />;
      case "tire": return <Car className="h-4 w-4 text-primary" />;
      case "fuel": return <Fuel className="h-4 w-4 text-primary" />;
      case "lockout": return <Lock className="h-4 w-4 text-primary" />;
      case "tow": return <Flag className="h-4 w-4 text-primary" />;
      case "charging": return <Plug className="h-4 w-4 text-primary" />;
      default: return <Car className="h-4 w-4 text-primary" />;
    }
  };

  const getServiceTitle = (serviceType: string) => {
    switch (serviceType) {
      case "battery": return "Battery Jump";
      case "tire": return "Tire Change";
      case "fuel": return "Fuel Delivery";
      case "lockout": return "Lockout Service";
      case "tow": return "Towing Service";
      case "charging": return "EV Charging";
      default: return "Roadside Service";
    }
  };

  return (
    <DriverLayout>
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">Job Management</h1>
          <p className="text-muted-foreground">Track your completed jobs and earnings history</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="history">Job History</TabsTrigger>
            <TabsTrigger value="stats">Statistics</TabsTrigger>
          </TabsList>

          <TabsContent value="history" className="space-y-4 mt-6">
            {completedJobs.map((job) => (
              <Card key={job.id} className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    {getServiceIcon(job.serviceType)}
                    <div>
                      <h4 className="font-bold">{getServiceTitle(job.serviceType)}</h4>
                      <p className="text-sm text-muted-foreground">{job.customerName}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-primary">${job.earnings.toFixed(2)}</p>
                    <div className="flex gap-1">
                      {[...Array(job.rating)].map((_, i) => (
                        <span key={i} className="text-yellow-400">⭐</span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{job.date} at {job.time}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{job.duration}</span>
                  </div>
                </div>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="stats" className="space-y-6 mt-6">
            <div className="grid grid-cols-2 gap-4">
              <Card className="p-4 text-center">
                <div className="text-2xl font-bold text-primary">24</div>
                <div className="text-sm text-muted-foreground">Jobs This Week</div>
              </Card>
              <Card className="p-4 text-center">
                <div className="text-2xl font-bold text-primary">4.9</div>
                <div className="text-sm text-muted-foreground">Average Rating</div>
              </Card>
              <Card className="p-4 text-center">
                <div className="text-2xl font-bold text-primary">847</div>
                <div className="text-sm text-muted-foreground">Total Jobs</div>
              </Card>
              <Card className="p-4 text-center">
                <div className="text-2xl font-bold text-primary">98%</div>
                <div className="text-sm text-muted-foreground">Completion Rate</div>
              </Card>
            </div>

            <Card className="p-6">
              <h3 className="font-bold mb-4">Service Breakdown</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Battery className="h-4 w-4 text-primary" />
                    <span>Battery Jump</span>
                  </div>
                  <Badge variant="secondary">35%</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Car className="h-4 w-4 text-primary" />
                    <span>Tire Change</span>
                  </div>
                  <Badge variant="secondary">28%</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Fuel className="h-4 w-4 text-primary" />
                    <span>Fuel Delivery</span>
                  </div>
                  <Badge variant="secondary">20%</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Flag className="h-4 w-4 text-primary" />
                    <span>Towing</span>
                  </div>
                  <Badge variant="secondary">17%</Badge>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DriverLayout>
  );
};

export default DriverJobs;
