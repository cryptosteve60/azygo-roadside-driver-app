
import React, { useState } from "react";
import Layout from "@/components/Layout";
import DriverLayout from "@/components/DriverLayout";
import CustomerHome from "@/pages/CustomerHome";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Truck, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index: React.FC = () => {
  const [userType, setUserType] = useState<"customer" | "driver" | null>(null);
  const navigate = useNavigate();

  if (userType === null) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <div className="h-16 w-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-4">
              <Truck className="h-8 w-8" />
            </div>
            <h1 className="text-3xl font-bold mb-2">Welcome to Ayzgo</h1>
            <p className="text-muted-foreground">Choose how you'd like to use our platform</p>
          </div>

          <div className="space-y-4">
            <Card className="p-6 cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setUserType("customer")}>
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <User className="h-6 w-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg">I need roadside assistance</h3>
                  <p className="text-sm text-muted-foreground">Get help with battery, tires, fuel, lockouts, and more</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setUserType("driver")}>
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-orange-100 flex items-center justify-center">
                  <Truck className="h-6 w-6 text-orange-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg">I want to provide roadside services</h3>
                  <p className="text-sm text-muted-foreground">Earn money helping drivers in your area</p>
                </div>
              </div>
            </Card>
          </div>

          <div className="text-center mt-6">
            <Button variant="ghost" onClick={() => navigate("/login")}>
              Already have an account? Sign in
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (userType === "customer") {
    return (
      <Layout>
        <CustomerHome />
      </Layout>
    );
  }

  if (userType === "driver") {
    return (
      <DriverLayout>
        <div className="max-w-2xl mx-auto text-center py-8">
          <h1 className="text-2xl font-bold mb-4">Welcome to the Driver Portal</h1>
          <p className="text-muted-foreground mb-6">
            You're now in the driver interface. Use the navigation below to get started.
          </p>
          <Button onClick={() => navigate("/driver/home")}>
            Go to Driver Dashboard
          </Button>
        </div>
      </DriverLayout>
    );
  }

  return null;
};

export default Index;
