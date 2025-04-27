import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import AppLayout from "./components/AppLayout";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import Requests from "./pages/Requests";
import RequestDetail from "./pages/RequestDetail";
import NewRequest from "./pages/NewRequest";
import Approvals from "./pages/Approvals";
import Notifications from "./pages/Notifications";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import Unauthorized from "./pages/Unauthorized";
import LandingPage from "./pages/LandingPage";
import LectureClassroomBooking from "./pages/LectureClassroomBooking";
import HallBooking from "./pages/HallBooking";
import EventBooking from "./pages/EventBooking";
import BookingProcess from "./pages/BookingProcess";
import ContactUs from "./pages/ContactUs";

const App = () => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AppProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Public routes - outside AppLayout */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/unauthorized" element={<Unauthorized />} />
              
              {/* Routes with AppLayout */}
              <Route element={<AppLayout />}>
                {/* Public pages that need the layout */}
                <Route path="/ltcr" element={<LectureClassroomBooking />} />
                <Route path="/halls" element={<HallBooking />} />
                <Route path="/events" element={<EventBooking />} />
                <Route path="/booking-process" element={<BookingProcess />} />
                <Route path="/contact" element={<ContactUs />} />
                
                {/* Protected routes - requiring authentication */}
                <Route element={<ProtectedRoute />}>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/requests" element={<Requests />} />
                  <Route path="/requests/:id" element={<RequestDetail />} />
                  <Route path="/new-request" element={<NewRequest />} />
                  <Route path="/notifications" element={<Notifications />} />
                  
                  {/* Admin and Faculty only routes */}
                  <Route element={<ProtectedRoute allowedRoles={["admin", "faculty"]} />}>
                    <Route path="/approvals" element={<Approvals />} />
                  </Route>
                </Route>
              </Route>
              
              {/* 404 route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </AppProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
