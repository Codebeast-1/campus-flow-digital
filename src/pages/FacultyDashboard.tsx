
import { useState } from "react";
import { useAppContext } from "@/context/AppContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RequestCard } from "@/components/RequestCard";
import { StatCard } from "@/components/StatCard";
import { useNavigate } from "react-router-dom";
import { 
  FileText, Calendar, CheckCircle, Clock, PlusCircle, 
  Search, GraduationCap, Bell, CheckCheck 
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Request } from "@/types";

export default function FacultyDashboard() {
  const { requests, currentUser, updateRequestStatus } = useAppContext();
  const navigate = useNavigate();
  
  // Filter requests relevant to faculty (directed to their department or mentioning them)
  const facultyRequests = requests.filter(r => 
    r.facultyName === currentUser?.name || 
    r.steps.some(step => step.department === currentUser?.department)
  );
  
  // Get student requests specifically mentioning this faculty member
  const studentDirectRequests = requests.filter(r => 
    r.facultyName === currentUser?.name && 
    r.status === 'pending'
  );
  
  const stats = {
    pending: facultyRequests.filter(r => r.status === 'pending').length,
    approved: facultyRequests.filter(r => r.status === 'approved').length,
    inProgress: facultyRequests.filter(r => r.status === 'in-progress').length,
    total: facultyRequests.length
  };
  
  // Get the most recent faculty requests (up to 3)
  const recentRequests = [...facultyRequests]
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 3);
    
  const [searchQuery, setSearchQuery] = useState("");
  
  const handleApproveRequest = (request: Request) => {
    updateRequestStatus(request.id, 'approved', 0, `Approved by ${currentUser?.name}`);
  };
  
  const handleRejectRequest = (request: Request) => {
    updateRequestStatus(request.id, 'rejected', 0, `Rejected by ${currentUser?.name}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-2xl font-bold tracking-tight">Faculty Dashboard</h1>
        <div className="flex items-center gap-2">
          <div className="relative w-full md:w-60">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              type="search"
              placeholder="Search requests..."
              className="w-full pl-9 rounded-lg"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
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
          description="All-time submissions"
          icon={<FileText className="h-4 w-4 text-gray-500" />}
          className="hover:shadow-md transition-all"
        />
        <StatCard
          title="Pending"
          value={stats.pending}
          description="Awaiting your action"
          icon={<Clock className="h-4 w-4 text-campus-pending" />}
          className="hover:shadow-md transition-all"
        />
        <StatCard
          title="In Progress"
          value={stats.inProgress}
          description="Under review"
          icon={<Calendar className="h-4 w-4 text-campus-blue" />}
          className="hover:shadow-md transition-all"
        />
        <StatCard
          title="Approved"
          value={stats.approved}
          description="Successfully completed"
          icon={<CheckCircle className="h-4 w-4 text-campus-success" />}
          className="hover:shadow-md transition-all"
        />
      </div>

      {/* Student direct requests section */}
      {studentDirectRequests.length > 0 && (
        <Card className="border-campus-teal/30 animate-fade-in">
          <CardHeader className="bg-campus-teal/10">
            <CardTitle className="flex items-center gap-2 text-campus-teal">
              <GraduationCap className="h-5 w-5" />
              Student Requests Pending Your Approval
            </CardTitle>
            <CardDescription>
              These requests require your direct approval as the named faculty member
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              {studentDirectRequests.map((request) => (
                <div 
                  key={request.id} 
                  className="border rounded-lg p-4 hover:shadow-md transition-all flex flex-col md:flex-row md:items-center gap-4 justify-between"
                >
                  <div className="flex-1">
                    <div className="flex items-start gap-3">
                      <div className="rounded-full bg-campus-blue/10 p-2">
                        <FileText className="h-5 w-5 text-campus-blue" />
                      </div>
                      <div>
                        <h3 className="font-medium">{request.title}</h3>
                        <p className="text-sm text-gray-500">
                          From: {request.requestor.name} ({request.requestor.email})
                        </p>
                        <p className="text-sm text-gray-500">
                          Submitted: {new Date(request.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <p className="mt-2 text-sm">{request.description}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      className="hover:scale-105 transition-transform bg-campus-success hover:bg-campus-success/90"
                      onClick={() => handleApproveRequest(request)}
                    >
                      <CheckCheck className="mr-1 h-4 w-4" />
                      Approve
                    </Button>
                    <Button 
                      variant="outline" 
                      className="hover:scale-105 transition-transform text-campus-danger hover:text-white hover:bg-campus-danger"
                      onClick={() => handleRejectRequest(request)}
                    >
                      <Bell className="mr-1 h-4 w-4" />
                      Reject
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-6 md:grid-cols-7">
        <div className="md:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Recent Requests</h2>
            <Button 
              variant="ghost" 
              className="text-sm hover:scale-105 transition-transform" 
              onClick={() => navigate('/requests')}
            >
              View all
              <ArrowRight className="ml-1 h-4 w-4" />
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
