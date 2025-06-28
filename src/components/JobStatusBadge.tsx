
import React from "react";

interface JobStatusBadgeProps {
  status: "available" | "accepted" | "enroute" | "arrived" | "inProgress" | "completed";
}

const JobStatusBadge: React.FC<JobStatusBadgeProps> = ({ status }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "accepted": return "bg-blue-100 text-blue-800 border-blue-200";
      case "enroute": return "bg-orange-100 text-orange-800 border-orange-200";
      case "arrived": return "bg-purple-100 text-purple-800 border-purple-200";
      case "inProgress": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "completed": return "bg-green-100 text-green-800 border-green-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "accepted": return "Job Accepted";
      case "enroute": return "En Route";
      case "arrived": return "Arrived";
      case "inProgress": return "In Progress";
      case "completed": return "Completed";
      default: return "Unknown";
    }
  };

  return (
    <div className={`inline-flex px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(status)}`}>
      {getStatusText(status)}
    </div>
  );
};

export default JobStatusBadge;
