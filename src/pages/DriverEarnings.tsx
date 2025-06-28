
import React, { useState } from "react";
import DriverLayout from "@/components/DriverLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DollarSign, TrendingUp, Calendar, CreditCard } from "lucide-react";

const DriverEarnings: React.FC = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const earningsData = {
    today: 127.50,
    week: 892.30,
    month: 3247.80,
    total: 28450.00,
    pending: 127.50,
    available: 3120.30
  };

  const recentPayouts = [
    { date: "Jan 14, 2024", amount: 450.00, status: "Completed" },
    { date: "Jan 7, 2024", amount: 380.50, status: "Completed" },
    { date: "Dec 31, 2023", amount: 420.75, status: "Completed" },
  ];

  return (
    <DriverLayout>
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">Earnings Dashboard</h1>
          <p className="text-muted-foreground">Track your income and manage payouts</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="payouts">Payouts</TabsTrigger>
            <TabsTrigger value="details">Details</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6 mt-6">
            {/* Main Earnings Card */}
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <DollarSign className="h-6 w-6 text-primary" />
                <h3 className="text-xl font-bold">Current Earnings</h3>
                <TrendingUp className="h-5 w-5 text-green-600 ml-auto" />
              </div>
              
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center">
                  <p className="text-3xl font-bold text-primary">${earningsData.today.toFixed(2)}</p>
                  <p className="text-sm text-muted-foreground">Today</p>
                </div>
                <div className="text-center border-l border-r border-border">
                  <p className="text-3xl font-bold text-primary">${earningsData.week.toFixed(2)}</p>
                  <p className="text-sm text-muted-foreground">This Week</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-primary">${earningsData.month.toFixed(2)}</p>
                  <p className="text-sm text-muted-foreground">This Month</p>
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Total Lifetime Earnings</span>
                  <span className="text-xl font-bold">${earningsData.total.toFixed(2)}</span>
                </div>
              </div>
            </Card>

            {/* Balance Card */}
            <Card className="p-6">
              <h3 className="text-lg font-bold mb-4">Account Balance</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <div className="text-2xl font-bold text-yellow-800">${earningsData.pending.toFixed(2)}</div>
                  <div className="text-sm text-yellow-700">Pending</div>
                  <div className="text-xs text-yellow-600 mt-1">Processing (1-2 days)</div>
                </div>
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="text-2xl font-bold text-green-800">${earningsData.available.toFixed(2)}</div>
                  <div className="text-sm text-green-700">Available</div>
                  <div className="text-xs text-green-600 mt-1">Ready for payout</div>
                </div>
              </div>
              <Button className="w-full mt-4" disabled={earningsData.available === 0}>
                <CreditCard className="h-4 w-4 mr-2" />
                Request Payout
              </Button>
            </Card>
          </TabsContent>

          <TabsContent value="payouts" className="space-y-4 mt-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold">Payout History</h3>
              <Button variant="outline" size="sm">
                <Calendar className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>

            {recentPayouts.map((payout, index) => (
              <Card key={index} className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">${payout.amount.toFixed(2)}</p>
                    <p className="text-sm text-muted-foreground">{payout.date}</p>
                  </div>
                  <div className="text-right">
                    <div className="inline-flex px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {payout.status}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="details" className="space-y-6 mt-6">
            <Card className="p-6">
              <h3 className="text-lg font-bold mb-4">Weekly Breakdown</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Monday</span>
                  <span className="font-medium">$142.50</span>
                </div>
                <div className="flex justify-between">
                  <span>Tuesday</span>
                  <span className="font-medium">$98.75</span>
                </div>
                <div className="flex justify-between">
                  <span>Wednesday</span>
                  <span className="font-medium">$165.20</span>
                </div>
                <div className="flex justify-between">
                  <span>Thursday</span>
                  <span className="font-medium">$201.85</span>
                </div>
                <div className="flex justify-between">
                  <span>Friday</span>
                  <span className="font-medium">$156.00</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday</span>
                  <span className="font-medium">$127.50</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span className="font-medium">$0.00</span>
                </div>
                <div className="border-t pt-2 flex justify-between font-bold">
                  <span>Total</span>
                  <span>${earningsData.week.toFixed(2)}</span>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-bold mb-4">Performance Metrics</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-muted rounded-lg">
                  <div className="text-lg font-bold">$37.20</div>
                  <div className="text-sm text-muted-foreground">Avg per Job</div>
                </div>
                <div className="text-center p-3 bg-muted rounded-lg">
                  <div className="text-lg font-bold">24</div>
                  <div className="text-sm text-muted-foreground">Jobs This Week</div>
                </div>
                <div className="text-center p-3 bg-muted rounded-lg">
                  <div className="text-lg font-bold">6.2</div>
                  <div className="text-sm text-muted-foreground">Hours Online</div>
                </div>
                <div className="text-center p-3 bg-muted rounded-lg">
                  <div className="text-lg font-bold">$143.87</div>
                  <div className="text-sm text-muted-foreground">Per Hour</div>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DriverLayout>
  );
};

export default DriverEarnings;
