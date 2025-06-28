
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ServiceType } from "@/contexts/AppContext";
import { Battery, Car, Flag, Fuel, Lock, Plug } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ServiceCardProps {
  type: ServiceType;
  title: string;
  price: string;
  description: string;
}

export default function ServiceCard({ type, title, price, description }: ServiceCardProps) {
  const navigate = useNavigate();
  
  const getIcon = () => {
    switch (type) {
      case "battery":
        return <Battery className="h-8 w-8 text-primary" />;
      case "tire":
        return <Car className="h-8 w-8 text-primary" />;
      case "fuel":
        return <Fuel className="h-8 w-8 text-primary" />;
      case "lockout":
        return <Lock className="h-8 w-8 text-primary" />;
      case "tow":
        return <Flag className="h-8 w-8 text-primary" />;
      case "charging":
        return <Plug className="h-8 w-8 text-primary" />;
    }
  };
  
  const handleSelect = () => {
    navigate(`/request/${type}`);
  };
  
  return (
    <Card className="app-card flex flex-col">
      <div className="flex items-start justify-between mb-4">
        <div className="p-2 bg-accent rounded-md">
          {getIcon()}
        </div>
        <h3 className="font-bold text-lg mb-1">{title}</h3>
        <span className="text-primary font-bold">{price}</span>
      </div>
      
      <p className="text-muted-foreground text-sm mb-4 flex-grow">{description}</p>
      
      <Button 
        className="app-button" 
        onClick={handleSelect}
      >
        Select Service
      </Button>
    </Card>
  );
}
