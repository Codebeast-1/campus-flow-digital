
import { useParams, useNavigate } from "react-router-dom";
import { useAppContext } from "@/context/AppContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "@/components/StatusBadge";
import { ApprovalSteps } from "@/components/ApprovalSteps";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Calendar, Clock, MapPin, User } from "lucide-react";
import { format } from "date-fns";
import { useState } from "react";

export default function RequestDetail() {
  const { id } = useParams<{ id: string }>();
  const { requests, updateRequestStatus, currentUser } = useAppContext();
  const navigate = useNavigate();
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const request = requests.find(r => r.id === id);
  
  if (!request) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <h2 className="text-2xl font-bold mb-4">Request Not Found</h2>
        <p className="text-gray-500 mb-6">The request you're looking for doesn't exist or has been removed.</p>
        <Button onClick={() => navigate('/requests')}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Requests
        </Button>
      </div>
    );
  }

  const requestTypeLabels: Record<string, string> = {
    'room_booking': 'Room Booking',
    'event_hosting': 'Event Hosting',
    'equipment_request': 'Equipment Request',
    'maintenance': 'Maintenance',
  };
  
  const formatDate = (date: Date) => {
    return format(new Date(date), "MMM dd, yyyy");
  };

  const canApproveOrReject = () => {
    if (!currentUser || request.currentStep >= request.steps.length) return false;
    
    const currentStepData = request.steps[request.currentStep];
    return currentStepData.department === currentUser.department && 
           currentStepData.status === 'pending';
  };
  
  const handleStatusUpdate = async (status: 'approved' | 'rejected') => {
    if (!canApproveOrReject()) return;
    
    setIsSubmitting(true);
    try {
      updateRequestStatus(request.id, status, request.currentStep, notes);
      setNotes("");
    } catch (error) {
      console.error("Error updating status:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight">{request.title}</h1>
            <StatusBadge status={request.status} />
          </div>
          <p className="text-sm text-muted-foreground">
            {requestTypeLabels[request.type]} • Submitted on {formatDate(request.createdAt)}
          </p>
        </div>
      </div>
      
      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Request Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-medium mb-1">Description</h3>
                <p className="text-gray-700">{request.description}</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {request.location && (
                  <div className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 text-gray-500 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-sm">Location</h4>
                      <p className="text-gray-700">{request.location}</p>
                    </div>
                  </div>
                )}
                
                <div className="flex items-start gap-2">
                  <User className="h-4 w-4 text-gray-500 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-sm">Requested by</h4>
                    <p className="text-gray-700">{request.requestor.name}</p>
                    <p className="text-xs text-gray-500">{request.requestor.department}</p>
                  </div>
                </div>
                
                {request.startDate && (
                  <div className="flex items-start gap-2">
                    <Calendar className="h-4 w-4 text-gray-500 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-sm">Date</h4>
                      <p className="text-gray-700">
                        {formatDate(request.startDate)}
                        {request.endDate && 
                         request.endDate.toDateString() !== request.startDate.toDateString() && 
                         ` - ${formatDate(request.endDate)}`}
                      </p>
                    </div>
                  </div>
                )}
                
                <div className="flex items-start gap-2">
                  <Clock className="h-4 w-4 text-gray-500 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-sm">Last updated</h4>
                    <p className="text-gray-700">
                      {format(new Date(request.updatedAt), "MMM dd, yyyy - h:mm a")}
                    </p>
                  </div>
                </div>
              </div>
              
              <ApprovalSteps 
                steps={request.steps} 
                currentStep={request.currentStep} 
              />
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-6">
          {canApproveOrReject() && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Take Action</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea
                    id="notes"
                    placeholder="Add any comments or feedback..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <Button 
                    variant="outline" 
                    className="w-full text-campus-danger hover:text-campus-danger"
                    disabled={isSubmitting}
                    onClick={() => handleStatusUpdate('rejected')}
                  >
                    Reject
                  </Button>
                  <Button 
                    className="w-full bg-campus-success hover:bg-campus-success/90"
                    disabled={isSubmitting}
                    onClick={() => handleStatusUpdate('approved')}
                  >
                    Approve
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Request Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex gap-2">
                  <div className="h-2 w-2 rounded-full bg-campus-blue mt-1.5" />
                  <div>
                    <p className="text-sm">Request submitted</p>
                    <p className="text-xs text-gray-500">
                      {format(new Date(request.createdAt), "MMM dd, yyyy - h:mm a")}
                    </p>
                  </div>
                </div>
                
                {request.steps.map((step, index) => {
                  if (step.status !== 'pending' && step.updatedAt) {
                    const statusText = step.status === 'approved' 
                      ? `${step.department} approved the request` 
                      : `${step.department} rejected the request`;
                    
                    const statusColor = step.status === 'approved' 
                      ? 'bg-campus-success' 
                      : 'bg-campus-danger';
                  
                    return (
                      <div key={step.id} className="flex gap-2">
                        <div className={`h-2 w-2 rounded-full ${statusColor} mt-1.5`} />
                        <div>
                          <p className="text-sm">{statusText}</p>
                          {step.notes && (
                            <p className="text-sm text-gray-600">{step.notes}</p>
                          )}
                          <p className="text-xs text-gray-500">
                            {format(new Date(step.updatedAt), "MMM dd, yyyy - h:mm a")}
                          </p>
                        </div>
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
