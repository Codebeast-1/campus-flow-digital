
import { useAppContext } from "@/context/AppContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RequestCard } from "@/components/RequestCard";
import { StatCard } from "@/components/StatCard";
import { RecentActivity } from "@/components/RecentActivity";
import { useNavigate } from "react-router-dom";
import { Calendar, FileText, CheckCircle, Clock, PlusCircle, Search } from "lucide-react";

export default function Dashboard() {
  const { requests } = useAppContext();
  const navigate = useNavigate();
  
  const stats = {
    pending: requests.filter(r => r.status === 'pending').length,
    approved: requests.filter(r => r.status === 'approved').length,
    inProgress: requests.filter(r => r.status === 'in-progress').length,
    total: requests.length
  };
  
  // Get the most recent requests (up to 3)
  const recentRequests = [...requests]
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 3);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <div className="flex items-center gap-2">
          <div className="relative w-full md:w-60">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              type="search"
              placeholder="Search requests..."
              className="w-full pl-9 rounded-lg"
            />
          </div>
          <Button onClick={() => navigate('/new-request')}>
            <PlusCircle className="h-4 w-4 mr-2" />
            New Request
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Requests"
          value={stats.total}
          description="All-time submissions"
          icon={<FileText className="h-4 w-4 text-gray-500" />}
        />
        <StatCard
          title="Pending"
          value={stats.pending}
          description="Awaiting submission"
          icon={<Clock className="h-4 w-4 text-campus-pending" />}
        />
        <StatCard
          title="In Progress"
          value={stats.inProgress}
          description="Under review"
          icon={<Calendar className="h-4 w-4 text-campus-blue" />}
        />
        <StatCard
          title="Approved"
          value={stats.approved}
          description="Successfully completed"
          icon={<CheckCircle className="h-4 w-4 text-campus-success" />}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-7">
        <div className="md:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Recent Requests</h2>
            <Button 
              variant="ghost" 
              className="text-sm" 
              onClick={() => navigate('/requests')}
            >
              View all
            </Button>
          </div>
          <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-3">
            {recentRequests.map((request) => (
              <RequestCard 
                key={request.id} 
                request={request} 
                onClick={() => navigate(`/requests/${request.id}`)}
              />
            ))}
            {recentRequests.length === 0 && (
              <div className="lg:col-span-3 p-8 text-center border rounded-lg">
                <h3 className="text-lg font-medium">No requests yet</h3>
                <p className="text-sm text-gray-500 mt-1">
                  Create your first request to get started
                </p>
                <Button 
                  className="mt-4" 
                  onClick={() => navigate('/new-request')}
                >
                  <PlusCircle className="h-4 w-4 mr-2" />
                  New Request
                </Button>
              </div>
            )}
          </div>
        </div>
        <div className="md:col-span-2">
          <RecentActivity requests={requests} />
        </div>
      </div>
    </div>
  );
}
