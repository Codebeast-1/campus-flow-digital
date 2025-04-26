
import { useAppContext } from "@/context/AppContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RequestCard } from "@/components/RequestCard";
import { StatCard } from "@/components/StatCard";
import { useNavigate } from "react-router-dom";
import { FileText, Clock, CheckCircle, CalendarDays, PlusCircle, Search } from "lucide-react";

export default function StudentDashboard() {
  const { requests, currentUser } = useAppContext();
  const navigate = useNavigate();
  
  // Filter requests submitted by this student
  const studentRequests = requests.filter(r => r.requestor.id === currentUser?.id);
  
  const stats = {
    pending: studentRequests.filter(r => r.status === 'pending').length,
    approved: studentRequests.filter(r => r.status === 'approved').length,
    rejected: studentRequests.filter(r => r.status === 'rejected').length,
    total: studentRequests.length
  };
  
  // Get the most recent student requests (up to 3)
  const recentRequests = [...studentRequests]
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 3);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-2xl font-bold tracking-tight">Student Dashboard</h1>
        <div className="flex items-center gap-2">
          <div className="relative w-full md:w-60">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              type="search"
              placeholder="Search requests..."
              className="w-full pl-9 rounded-lg"
            />
          </div>
          <Button 
            onClick={() => navigate('/new-request')}
            className="hover:translate-y-[-2px] transition-all"
          >
            <PlusCircle className="h-4 w-4 mr-2" />
            New Request
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Requests"
          value={stats.total}
          description="All your submissions"
          icon={<FileText className="h-4 w-4 text-gray-500" />}
          className="hover:shadow-md transition-all"
        />
        <StatCard
          title="Pending"
          value={stats.pending}
          description="Awaiting approval"
          icon={<Clock className="h-4 w-4 text-campus-pending" />}
          className="hover:shadow-md transition-all"
        />
        <StatCard
          title="Approved"
          value={stats.approved}
          description="Successfully completed"
          icon={<CheckCircle className="h-4 w-4 text-campus-success" />}
          className="hover:shadow-md transition-all"
        />
        <StatCard
          title="Rejected"
          value={stats.rejected}
          description="Not approved"
          icon={<CalendarDays className="h-4 w-4 text-campus-danger" />}
          className="hover:shadow-md transition-all"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-1">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Your Recent Requests</h2>
            <Button 
              variant="ghost" 
              className="text-sm hover:scale-105 transition-transform" 
              onClick={() => navigate('/requests')}
            >
              View all
            </Button>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {recentRequests.map((request) => (
              <RequestCard 
                key={request.id} 
                request={request} 
                onClick={() => navigate(`/requests/${request.id}`)}
                className="hover:scale-[1.02] transition-all"
              />
            ))}
            {recentRequests.length === 0 && (
              <div className="lg:col-span-3 p-8 text-center border rounded-lg">
                <h3 className="text-lg font-medium">No requests yet</h3>
                <p className="text-sm text-gray-500 mt-1">
                  Create your first request to get started
                </p>
                <Button 
                  className="mt-4 hover:scale-105 transition-transform" 
                  onClick={() => navigate('/new-request')}
                >
                  <PlusCircle className="h-4 w-4 mr-2" />
                  New Request
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
