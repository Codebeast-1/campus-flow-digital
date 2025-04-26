
import { useState } from "react";
import { useAppContext } from "@/context/AppContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RequestCard } from "@/components/RequestCard";
import { Search } from "lucide-react";

export default function Approvals() {
  const { requests, currentUser } = useAppContext();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  
  // Filter requests where the current user's department is required for approval
  // and the relevant step is the current step (active)
  const pendingApprovals = requests.filter(request => {
    const isCurrentStepValid = 
      request.currentStep >= 0 && 
      request.currentStep < request.steps.length;
    
    if (!isCurrentStepValid || !currentUser) return false;
    
    const currentStep = request.steps[request.currentStep];
    return (
      currentStep.department === currentUser.department && 
      currentStep.status === 'pending' &&
      request.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-2xl font-bold tracking-tight">Pending Approvals</h1>
        
        <div className="relative w-full md:w-60">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            type="search"
            placeholder="Search requests..."
            className="w-full pl-9 rounded-lg"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {pendingApprovals.length > 0 ? (
          pendingApprovals.map((request) => (
            <RequestCard 
              key={request.id} 
              request={request} 
              onClick={() => navigate(`/requests/${request.id}`)}
            />
          ))
        ) : (
          <div className="col-span-full p-8 text-center border rounded-lg">
            <h3 className="text-lg font-medium">No pending approvals</h3>
            <p className="text-sm text-gray-500 mt-1">
              {searchQuery
                ? "No matching requests found. Try a different search term."
                : `You don't have any pending requests that require ${currentUser?.department} approval.`}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
