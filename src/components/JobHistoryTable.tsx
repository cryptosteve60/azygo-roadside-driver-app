
import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface JobHistory {
  id: string;
  date: string;
  customer: string;
  service: string;
  amount: number;
  rating: number;
  status: "completed" | "cancelled";
}

const JobHistoryTable: React.FC = () => {
  const jobHistory: JobHistory[] = [
    {
      id: "JOB-001",
      date: "Jan 14, 2024",
      customer: "Sarah Wilson",
      service: "Battery Jump",
      amount: 49.00,
      rating: 5,
      status: "completed"
    },
    {
      id: "JOB-002", 
      date: "Jan 13, 2024",
      customer: "Mike Chen",
      service: "Tire Change",
      amount: 69.00,
      rating: 4,
      status: "completed"
    },
    {
      id: "JOB-003",
      date: "Jan 12, 2024",
      customer: "Lisa Rodriguez",
      service: "Lockout Service",
      amount: 59.00,
      rating: 5,
      status: "completed"
    }
  ];

  return (
    <Card className="p-4">
      <h3 className="text-lg font-bold text-center mb-4">Recent Jobs Completed</h3>
      <div className="space-y-3">
        {jobHistory.map((job) => (
          <div key={job.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
            <div>
              <p className="font-medium">{job.customer}</p>
              <p className="text-sm text-muted-foreground">{job.service} • {job.date}</p>
            </div>
            <div className="text-right">
              <p className="font-bold">${job.amount.toFixed(2)}</p>
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={i < job.rating ? "text-yellow-400" : "text-gray-300"}>
                      ⭐
                    </span>
                  ))}
                </div>
                <Badge variant={job.status === "completed" ? "default" : "destructive"}>
                  {job.status}
                </Badge>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default JobHistoryTable;
