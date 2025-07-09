
import React from "react";
import DriverLayout from "@/components/DriverLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Package, Wrench, Battery, Car } from "lucide-react";

const DriverProducts: React.FC = () => {
  const products = [
    {
      id: 1,
      name: "Emergency Kit",
      description: "Complete roadside emergency kit for drivers",
      price: "$49.99",
      icon: Package,
      available: true
    },
    {
      id: 2,
      name: "Professional Tools",
      description: "High-quality tools for roadside assistance",
      price: "$129.99",
      icon: Wrench,
      available: true
    },
    {
      id: 3,
      name: "Jump Starter",
      description: "Portable battery jump starter",
      price: "$89.99",
      icon: Battery,
      available: false
    },
    {
      id: 4,
      name: "Vehicle Supplies",
      description: "Essential supplies for vehicle maintenance",
      price: "$39.99",
      icon: Car,
      available: true
    }
  ];

  return (
    <DriverLayout>
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-center mb-2">Driver Products</h1>
          <p className="text-muted-foreground text-center">Essential tools and supplies for professional drivers</p>
        </div>

        <div className="space-y-4">
          {products.map((product) => {
            const IconComponent = product.icon;
            return (
              <Card key={product.id} className="p-4">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-full bg-primary/10">
                    <IconComponent className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold">{product.name}</h3>
                    <p className="text-sm text-muted-foreground">{product.description}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg">{product.price}</p>
                    <Button 
                      size="sm" 
                      disabled={!product.available}
                      className="mt-1"
                    >
                      {product.available ? "Order" : "Out of Stock"}
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </DriverLayout>
  );
};

export default DriverProducts;
