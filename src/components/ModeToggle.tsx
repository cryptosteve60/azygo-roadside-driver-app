
import { useApp } from "@/contexts/AppContext";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { toast } from "sonner";
import { Car, User } from "lucide-react";

export default function ModeToggle() {
  const { userRole, setUserRole } = useApp();
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  const handleToggleRole = () => {
    setIsTransitioning(true);
    
    // Small delay to show the transition
    setTimeout(() => {
      const newRole = userRole === "customer" ? "worker" : "customer";
      setUserRole(newRole);
      toast(`Switched to ${newRole} mode`, {
        description: newRole === "customer" ? "Now you can request assistance" : "Now you can view and accept jobs",
        icon: newRole === "customer" ? <User size={16} /> : <Car size={16} />,
      });
      setIsTransitioning(false);
    }, 300);
  };
  
  return (
    <div className="flex items-center gap-2 p-2 rounded-lg bg-secondary">
      <span className={`text-sm font-medium transition-colors ${userRole === "customer" ? "text-foreground" : "text-muted-foreground"}`}>
        Customer
      </span>
      
      <Switch
        checked={userRole === "worker"}
        onCheckedChange={handleToggleRole}
        disabled={isTransitioning}
        className="data-[state=checked]:bg-primary"
      />
      
      <span className={`text-sm font-medium transition-colors ${userRole === "worker" ? "text-foreground" : "text-muted-foreground"}`}>
        Worker
      </span>
    </div>
  );
}
