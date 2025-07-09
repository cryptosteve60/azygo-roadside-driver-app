
import React from "react";
import DriverLayout from "@/components/DriverLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Store, Star, MapPin } from "lucide-react";

const DriverProducts: React.FC = () => {
  const products = [
    {
      id: 1,
      name: "Emergency Road Kit",
      description: "Complete 42-piece emergency kit for roadside assistance",
      price: "$49.99",
      image: "/lovable-uploads/31a17932-b209-4630-b793-9d4be48f2a09.png",
      store: "AutoPro Supply",
      rating: 4.8,
      location: "2.3 mi away",
      available: true
    },
    {
      id: 2,
      name: "Professional Tool Set",
      description: "High-quality mechanic tools for professional drivers",
      price: "$129.99",
      image: "/lovable-uploads/5a09ec48-4e4e-4a1a-9d54-33b5ac30e372.png",
      store: "ToolMaster Pro",
      rating: 4.9,
      location: "1.8 mi away",
      available: true
    },
    {
      id: 3,
      name: "Portable Jump Starter",
      description: "12V 1000A peak portable battery jump starter with USB",
      price: "$89.99",
      image: "/lovable-uploads/618a4bbf-a6b7-46d9-9d64-cedea4c79f8d.png",
      store: "BatteryWorld",
      rating: 4.7,
      location: "3.1 mi away",
      available: false
    },
    {
      id: 4,
      name: "Vehicle Care Package",
      description: "Complete car cleaning and maintenance supplies",
      price: "$39.99",
      image: "/lovable-uploads/bbaf05ba-486d-460a-a768-dfed796d6487.png",
      store: "CleanCar Solutions",
      rating: 4.6,
      location: "0.9 mi away",
      available: true
    },
    {
      id: 5,
      name: "Safety Vest & Gear",
      description: "High-visibility safety vest with reflective strips",
      price: "$24.99",
      image: "/lovable-uploads/31a17932-b209-4630-b793-9d4be48f2a09.png",
      store: "SafetyFirst Co",
      rating: 4.8,
      location: "1.5 mi away",
      available: true
    },
    {
      id: 6,
      name: "Tire Repair Kit",
      description: "Professional tire plugging and repair tools",
      price: "$34.99",
      image: "/lovable-uploads/5a09ec48-4e4e-4a1a-9d54-33b5ac30e372.png",
      store: "TireFixPro",
      rating: 4.5,
      location: "2.7 mi away",
      available: true
    }
  ];

  return (
    <DriverLayout>
      <div className="max-w-4xl mx-auto">
        <div className="mb-4">
          <h1 className="text-xl font-bold text-center mb-1">Driver Marketplace</h1>
          <p className="text-muted-foreground text-center text-sm">Essential tools and supplies from local stores</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {products.map((product) => (
            <Card key={product.id} className="overflow-hidden">
              <div className="aspect-video bg-muted overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-3">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-bold text-sm leading-tight">{product.name}</h3>
                  <span className="font-bold text-primary text-sm">{product.price}</span>
                </div>
                
                <p className="text-xs text-muted-foreground mb-2 line-clamp-2">{product.description}</p>
                
                <div className="flex items-center gap-2 mb-2">
                  <Store className="h-3 w-3 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">{product.store}</span>
                </div>
                
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 text-yellow-500 fill-current" />
                    <span className="text-xs">{product.rating}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3 w-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">{product.location}</span>
                  </div>
                </div>
                
                <Button 
                  size="sm" 
                  disabled={!product.available}
                  className="w-full h-8 text-xs"
                >
                  {product.available ? "View Details" : "Out of Stock"}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </DriverLayout>
  );
};

export default DriverProducts;
