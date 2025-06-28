
import React from "react";
import DriverLayout from "@/components/DriverLayout";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Index: React.FC = () => {
  const navigate = useNavigate();

  return (
    <DriverLayout>
      <div className="max-w-2xl mx-auto text-center py-8">
        <h1 className="text-2xl font-bold mb-4">Welcome to Ayzgo Driver</h1>
        <p className="text-muted-foreground mb-6">
          Your professional roadside assistance platform. Get started by going to your dashboard.
        </p>
        <Button onClick={() => navigate("/driver/home")}>
          Go to Driver Dashboard
        </Button>
      </div>
    </DriverLayout>
  );
};

export default Index;
