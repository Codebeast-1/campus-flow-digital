
import { useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarProvider,
  SidebarTrigger,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
} from "@/components/ui/sidebar";
import { 
  Bell, 
  Calendar, 
  Home, 
  User, 
  FileText, 
  Settings, 
  LogOut, 
  GraduationCap, 
  Building,
  BookOpen,
  LayoutGrid,
  Mail,
  ArrowRight
} from "lucide-react";
import { useAppContext } from "@/context/AppContext";

export default function AppLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, logoutUser } = useAppContext();
  const [notifications] = useState(2); // Mock notification count

  const handleLogout = () => {
    logoutUser();
    navigate("/auth");
  };

  const getRoleIcon = () => {
    switch (currentUser?.role) {
      case "admin":
        return <Building className="h-5 w-5 text-white" />;
      case "faculty":
        return <User className="h-5 w-5 text-white" />;
      case "student":
        return <GraduationCap className="h-5 w-5 text-white" />;
      default:
        return <User className="h-5 w-5 text-white" />;
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <Sidebar>
          <SidebarHeader className="py-6">
            <Link to="/" className="flex items-center px-2">
              <div className="flex items-center space-x-2">
                <div className="bg-campus-blue rounded-md p-1.5">
                  <FileText className="h-6 w-6 text-white" />
                </div>
                <span className="text-xl font-bold">DPMS</span>
              </div>
            </Link>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link
                      to="/"
                      className={`hover:scale-105 transition-all ${location.pathname === "/" ? "text-campus-blue font-medium" : ""}`}
                    >
                      <Home className="h-5 w-5" />
                      <span>Dashboard</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link
                      to="/ltcr"
                      className={`hover:scale-105 transition-all ${location.pathname === "/ltcr" ? "text-campus-blue font-medium" : ""}`}
                    >
                      <LayoutGrid className="h-5 w-5" />
                      <span>LT/CR Booking</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link
                      to="/halls"
                      className={`hover:scale-105 transition-all ${location.pathname === "/halls" ? "text-campus-blue font-medium" : ""}`}
                    >
                      <Building className="h-5 w-5" />
                      <span>Hall Booking</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link
                      to="/events"
                      className={`hover:scale-105 transition-all ${location.pathname === "/events" ? "text-campus-blue font-medium" : ""}`}
                    >
                      <Calendar className="h-5 w-5" />
                      <span>Event Booking</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link
                      to="/booking-process"
                      className={`hover:scale-105 transition-all ${location.pathname === "/booking-process" ? "text-campus-blue font-medium" : ""}`}
                    >
                      <BookOpen className="h-5 w-5" />
                      <span>Booking Process</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link
                      to="/contact"
                      className={`hover:scale-105 transition-all ${location.pathname === "/contact" ? "text-campus-blue font-medium" : ""}`}
                    >
                      <Mail className="h-5 w-5" />
                      <span>Contact Us</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link
                      to="/requests"
                      className={`hover:scale-105 transition-all ${location.pathname === "/requests" ? "text-campus-blue font-medium" : ""}`}
                    >
                      <FileText className="h-5 w-5" />
                      <span>My Requests</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                
                {/* Only show for admin and faculty */}
                {(currentUser?.role === "admin" || currentUser?.role === "faculty") && (
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link
                        to="/approvals"
                        className={`hover:scale-105 transition-all ${location.pathname === "/approvals" ? "text-campus-blue font-medium" : ""}`}
                      >
                        <Calendar className="h-5 w-5" />
                        <span>Pending Approvals</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )}
                
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link
                      to="/notifications"
                      className={`hover:scale-105 transition-all ${location.pathname === "/notifications" ? "text-campus-blue font-medium" : ""}`}
                    >
                      <div className="relative">
                        <Bell className="h-5 w-5" />
                        {notifications > 0 && (
                          <span className="absolute -top-1 -right-1 bg-campus-teal text-white text-xs rounded-full h-4 w-4 flex items-center justify-center animate-pulse">
                            {notifications}
                          </span>
                        )}
                      </div>
                      <span>Notifications</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter className="border-t border-border">
            <div className="p-4">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-full bg-campus-blue-light flex items-center justify-center">
                  {getRoleIcon()}
                </div>
                <div className="flex-1 overflow-hidden">
                  <p className="text-sm font-medium leading-none truncate">
                    {currentUser?.name || "User"}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    {currentUser?.role.charAt(0).toUpperCase() + currentUser?.role.slice(1)} · {currentUser?.department || "Department"}
                  </p>
                </div>
                <Button variant="ghost" size="icon" asChild>
                  <Link to="/settings">
                    <Settings className="h-4 w-4" />
                  </Link>
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-campus-danger hover:text-white hover:bg-campus-danger transition-colors"
                  onClick={handleLogout}
                >
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </SidebarFooter>
        </Sidebar>
        <div className="flex-1">
          <div className="flex items-center h-14 border-b px-4 lg:px-6">
            <SidebarTrigger />
            <div className="ml-auto flex items-center space-x-4">
              {!currentUser && (
                <div className="flex gap-2">
                  <Button 
                    variant="outline"
                    className="hover:scale-105 transition-transform"
                    onClick={() => navigate('/auth')}
                  >
                    Login
                  </Button>
                  <Button 
                    className="hover:scale-105 transition-transform"
                    onClick={() => navigate('/auth?signup=true')}
                  >
                    Sign Up
                  </Button>
                </div>
              )}
            </div>
          </div>
          <main className="flex-1 p-4 lg:p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
