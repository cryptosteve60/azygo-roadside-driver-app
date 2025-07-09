
import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageCircle, Phone, Mail, X } from "lucide-react";

interface SupportOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const SupportOverlay: React.FC<SupportOverlayProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-6 bg-background">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-center flex-1">Support Center</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="space-y-4">
          <Button className="w-full justify-start" variant="outline">
            <MessageCircle className="h-4 w-4 mr-2" />
            Live Chat Support
          </Button>
          
          <Button className="w-full justify-start" variant="outline">
            <Phone className="h-4 w-4 mr-2" />
            Call Support: 1-800-AYZGO
          </Button>
          
          <Button className="w-full justify-start" variant="outline">
            <Mail className="h-4 w-4 mr-2" />
            Email Support
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default SupportOverlay;
