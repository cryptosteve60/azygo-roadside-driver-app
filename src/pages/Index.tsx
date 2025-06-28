
import React, { useState } from "react";
import Layout from "@/components/Layout";
import DriverLayout from "@/components/DriverLayout";
import CustomerHome from "@/pages/CustomerHome";
import DriverHome from "@/pages/DriverHome";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { User, Truck } from "lucide-react";

const Index: React.FC = () => {
  const [userType, setUserType] = useState<"customer" | "driver" | null>(null);

  if (userType === null) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md p-6">
          <div className="text-center mb-6">
            <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-xl mx-auto mb-4">
              A
            </div>
            <h1 className="text-2xl font-bold">Welcome to Ayzgo</h1>
            <p className="text-muted-foreground">Choose how you'd like to continue</p>
          </div>

          <div className="space-y-4">
            <Button 
              className="w-full h-16 flex items-center gap-4" 
              onClick={() => setUserType("customer")}
              variant="outline"
            >
              <User className="h-6 w-6" />
              <div className="text-left">
                <div className="font-semibold">I need roadside assistance</div>
                <div className="text-sm text-muted-foreground">Request help for your vehicle</div>
              </div>
            </Button>

            <Button 
              className="w-full h-16 flex items-center gap-4" 
              onClick={() => setUserType("driver")}
              variant="outline"
            >
              <Truck className="h-6 w-6" />
              <div className="text-left">
                <div className="font-semibold">I'm a service provider</div>
                <div className="text-sm text-muted-foreground">Help customers with roadside assistance</div>
              </div>
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  if (userType === "driver") {
    return <DriverHome />;
  }

  return (
    <Layout>
      <CustomerHome />
    </Layout>
  );
};

export default Index;
