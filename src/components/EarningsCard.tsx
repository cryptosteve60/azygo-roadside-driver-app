
import React from "react";
import { Card } from "@/components/ui/card";
import { DollarSign, TrendingUp } from "lucide-react";

interface EarningsCardProps {
  today: number;
  week: number;
  month: number;
}

const EarningsCard: React.FC<EarningsCardProps> = ({ today, week, month }) => {
  return (
    <Card className="p-6 mb-6">
      <div className="flex items-center gap-2 mb-4">
        <DollarSign className="h-5 w-5 text-primary" />
        <h3 className="font-bold text-lg">Earnings Overview</h3>
        <TrendingUp className="h-4 w-4 text-green-600 ml-auto" />
      </div>
      
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center">
          <p className="text-2xl font-bold text-primary">${today.toFixed(2)}</p>
          <p className="text-sm text-muted-foreground">Today</p>
        </div>
        <div className="text-center border-l border-r border-border">
          <p className="text-2xl font-bold text-primary">${week.toFixed(2)}</p>
          <p className="text-sm text-muted-foreground">This Week</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-primary">${month.toFixed(2)}</p>
          <p className="text-sm text-muted-foreground">This Month</p>
        </div>
      </div>
    </Card>
  );
};

export default EarningsCard;
