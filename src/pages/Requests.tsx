
import { useState } from "react";
import { useAppContext } from "@/context/AppContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RequestCard } from "@/components/RequestCard";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { PlusCircle, Search } from "lucide-react";
import { RequestStatus } from "@/types";

export default function Requests() {
  const { requests } = useAppContext();
  const navigate = useNavigate();
  
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<RequestStatus | "all">("all");
  
  const filteredRequests = requests.filter(request => {
    const matchesSearch = 
      request.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.description.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesStatus = statusFilter === "all" || request.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-2xl font-bold tracking-tight">My Requests</h1>
        <Button onClick={() => navigate('/new-request')}>
          <PlusCircle className="h-4 w-4 mr-2" />
          New Request
        </Button>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            type="search"
            placeholder="Search requests..."
            className="pl-9 w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select
          value={statusFilter}
          onValueChange={(value) => setStatusFilter(value as RequestStatus | "all")}
        >
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="in-progress">In Progress</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredRequests.length > 0 ? (
          filteredRequests.map((request) => (
            <RequestCard 
              key={request.id} 
              request={request} 
              onClick={() => navigate(`/requests/${request.id}`)}
            />
          ))
        ) : (
          <div className="col-span-full p-8 text-center border rounded-lg">
            <h3 className="text-lg font-medium">No matching requests</h3>
            <p className="text-sm text-gray-500 mt-1">
              {statusFilter !== "all" || searchQuery
                ? "Try changing your search or filter settings"
                : "Create your first request to get started"}
            </p>
            {!searchQuery && statusFilter === "all" && (
              <Button 
                className="mt-4" 
                onClick={() => navigate('/new-request')}
              >
                <PlusCircle className="h-4 w-4 mr-2" />
                New Request
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
