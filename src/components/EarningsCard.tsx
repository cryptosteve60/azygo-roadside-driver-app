
import React from "react";
import { Card } from "@/components/ui/card";
import { DollarSign, TrendingUp } from "lucide-react";

interface EarningsCardProps {
  today: number;
  week: number;
  month: number;
}

const EarningsCard: React.FC<EarningsCardProps> = ({
  today,
  week,
  month
}) => {
  return (
    <Card className="p-6 mb-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-3 rounded-full bg-green-100">
          <DollarSign className="h-6 w-6 text-green-600" />
        </div>
        <div>
          <h3 className="font-bold text-lg">Today's Earnings</h3>
          <p className="text-sm text-muted-foreground">Keep up the great work!</p>
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center">
          <p className="text-2xl font-bold text-green-600">${today.toFixed(2)}</p>
          <p className="text-xs text-muted-foreground">Today</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold">${week.toFixed(2)}</p>
          <p className="text-xs text-muted-foreground">This Week</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold">${month.toFixed(2)}</p>
          <p className="text-xs text-muted-foreground">This Month</p>
        </div>
      </div>
      
      <div className="mt-4 flex items-center justify-center gap-1 text-sm text-green-600">
        <TrendingUp className="h-4 w-4" />
        <span>+12% from last week</span>
      </div>
    </Card>
  );
};

export default EarningsCard;
