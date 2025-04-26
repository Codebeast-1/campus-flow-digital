
import { RequestApprovalStep } from "@/types";
import { Check, Clock, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

interface ApprovalStepsProps {
  steps: RequestApprovalStep[];
  currentStep: number;
}

export function ApprovalSteps({ steps, currentStep }: ApprovalStepsProps) {
  return (
    <div className="space-y-4 mt-4">
      <h3 className="font-medium">Approval Process</h3>
      <div>
        {steps.map((step, index) => {
          const isActive = index === currentStep;
          const isPast = index < currentStep;
          const isFuture = index > currentStep;
          const isApproved = step.status === "approved";
          const isRejected = step.status === "rejected";
          
          return (
            <div key={step.id} className="flex items-start mb-8 relative">
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div 
                  className={cn(
                    "absolute left-3.5 top-7 w-0.5 h-full -mt-3 bg-gray-200",
                    isPast && "bg-campus-success"
                  )}
                />
              )}
              
              {/* Status Icon */}
              <div 
                className={cn(
                  "relative z-10 flex items-center justify-center w-7 h-7 rounded-full border-2 mr-4",
                  isActive && "border-campus-blue text-campus-blue bg-blue-50 animate-pulse-subtle",
                  isPast && isApproved && "border-campus-success bg-campus-success text-white",
                  isPast && isRejected && "border-campus-danger bg-campus-danger text-white",
                  isFuture && "border-gray-300 text-gray-300"
                )}
              >
                {isApproved ? (
                  <Check className="w-4 h-4" />
                ) : isRejected ? (
                  <X className="w-4 h-4" />
                ) : (
                  <Clock className="w-4 h-4" />
                )}
              </div>
              
              {/* Content */}
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className={cn(
                      "font-medium",
                      isActive && "text-campus-blue",
                      isPast && isApproved && "text-campus-success",
                      isPast && isRejected && "text-campus-danger",
                      isFuture && "text-gray-500"
                    )}>
                      {step.department} Approval
                    </h4>
                    {step.approver && (
                      <p className="text-sm text-gray-600">
                        {step.approver.name} • {step.approver.role}
                      </p>
                    )}
                  </div>
                  
                  {step.status !== 'pending' && (
                    <div className={cn(
                      "text-xs px-2 py-1 rounded-full",
                      isApproved && "bg-green-100 text-green-800",
                      isRejected && "bg-red-100 text-red-800",
                      step.status === "in-progress" && "bg-blue-100 text-blue-800",
                    )}>
                      {step.status === 'approved' ? 'Approved' : 
                       step.status === 'rejected' ? 'Rejected' : 
                       'In Progress'}
                    </div>
                  )}
                </div>
                
                {step.notes && (
                  <p className="mt-1 text-sm text-gray-600">{step.notes}</p>
                )}
                
                {step.updatedAt && (
                  <p className="mt-1 text-xs text-gray-500">
                    {format(new Date(step.updatedAt), "MMM dd, yyyy • h:mm a")}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
