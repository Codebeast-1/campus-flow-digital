
import { Request } from "@/types";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

interface RecentActivityProps {
  requests: Request[];
  className?: string;
}

export function RecentActivity({ requests, className }: RecentActivityProps) {
  // Sort requests by updatedAt date (newest first)
  const sortedRequests = [...requests].sort((a, b) => 
    new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  ).slice(0, 5); // Take only the 5 most recent

  const getActivityText = (request: Request) => {
    switch (request.status) {
      case 'approved':
        return `${request.title} was approved`;
      case 'rejected':
        return `${request.title} was rejected`;
      case 'in-progress':
        const currentStep = request.steps[request.currentStep];
        const prevStep = request.currentStep > 0 ? request.steps[request.currentStep - 1] : null;
        
        if (prevStep && prevStep.status === 'approved') {
          return `${prevStep.department} approved ${request.title}`;
        }
        return `${request.title} is waiting for ${currentStep.department} approval`;
      case 'pending':
        return `${request.title} was submitted by ${request.requestor.name}`;
      default:
        return `${request.title} was updated`;
    }
  };

  const getActivityColor = (request: Request) => {
    switch (request.status) {
      case 'approved':
        return 'text-campus-success';
      case 'rejected':
        return 'text-campus-danger';
      case 'in-progress':
        return 'text-campus-blue';
      default:
        return 'text-gray-800';
    }
  };

  return (
    <div className={cn("space-y-4", className)}>
      <h2 className="text-lg font-semibold">Recent Activity</h2>
      <div className="space-y-4">
        {sortedRequests.length > 0 ? (
          sortedRequests.map((request) => (
            <div key={request.id} className="flex items-start gap-3">
              <div className={cn(
                "w-3 h-3 rounded-full mt-1",
                request.status === 'approved' ? "bg-campus-success" :
                request.status === 'rejected' ? "bg-campus-danger" :
                request.status === 'in-progress' ? "bg-campus-blue" :
                "bg-campus-pending"
              )} />
              <div className="flex-1">
                <p className={cn(
                  "font-medium text-sm",
                  getActivityColor(request)
                )}>
                  {getActivityText(request)}
                </p>
                <p className="text-xs text-gray-500">
                  {format(new Date(request.updatedAt), "MMM dd, h:mm a")}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-500">No recent activity</p>
        )}
      </div>
    </div>
  );
}
