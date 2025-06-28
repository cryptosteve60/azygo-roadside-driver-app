
import { Button } from "@/components/ui/button";
import { Truck } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ServicesHeader() {
  const navigate = useNavigate();

  return (
    <header className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-40">
      <div className="container max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
              <Truck className="h-5 w-5" />
            </div>
            <h1 className="text-lg font-bold">Ayzgo Services</h1>
          </div>
          <Button variant="outline" onClick={() => navigate("/")}>
            Back to Home
          </Button>
        </div>
      </div>
    </header>
  );
}
