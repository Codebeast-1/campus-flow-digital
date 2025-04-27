
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CheckCircle2, ArrowRight, Clock } from "lucide-react";

const BookingProcess = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <div className="container mx-auto py-6">
      <div className={`space-y-10 transition-all duration-500 ${loaded ? 'opacity-100' : 'opacity-0 translate-y-8'}`}>
        <div>
          <h1 className="text-3xl font-bold mb-2">Booking Process</h1>
          <p className="text-muted-foreground">
            Understand the approval flow for different booking types
          </p>
        </div>

        {/* LT/CR and Hall Booking Flow */}
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle>Hall/LT/CR Booking Flow</CardTitle>
            <CardDescription>
              Standard process for booking lecture theaters, classrooms, and halls
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <div className="absolute left-6 top-0 h-full w-0.5 bg-muted"></div>
              
              <div className="space-y-8">
                {/* Step 1 */}
                <div className="relative flex items-start gap-6">
                  <div className="absolute -left-2 flex h-16 items-center justify-center">
                    <div className="h-12 w-12 rounded-full border bg-background flex items-center justify-center z-10 hover:scale-110 transition-transform">
                      <span className="font-semibold text-campus-blue">1</span>
                    </div>
                  </div>
                  
                  <div className="ml-16 space-y-2">
                    <div className="font-medium">Request Raised</div>
                    <div className="text-sm text-muted-foreground">
                      User submits a booking request through the system with all required details
                    </div>
                  </div>
                </div>
                
                {/* Step 2 */}
                <div className="relative flex items-start gap-6">
                  <div className="absolute -left-2 flex h-16 items-center justify-center">
                    <div className="h-12 w-12 rounded-full border bg-background flex items-center justify-center z-10 hover:scale-110 transition-transform">
                      <span className="font-semibold text-campus-blue">2</span>
                    </div>
                  </div>
                  
                  <div className="ml-16 space-y-2">
                    <div className="font-medium">Faculty/Head Approval</div>
                    <div className="text-sm text-muted-foreground">
                      Department faculty or head reviews and approves the booking request
                    </div>
                  </div>
                </div>
                
                {/* Step 3 */}
                <div className="relative flex items-start gap-6">
                  <div className="absolute -left-2 flex h-16 items-center justify-center">
                    <div className="h-12 w-12 rounded-full border bg-background flex items-center justify-center z-10 hover:scale-110 transition-transform">
                      <span className="font-semibold text-campus-blue">3</span>
                    </div>
                  </div>
                  
                  <div className="ml-16 space-y-2">
                    <div className="font-medium">Admin/Incharge Approval</div>
                    <div className="text-sm text-muted-foreground">
                      Final approval by venue administrator or person in charge
                    </div>
                  </div>
                </div>
                
                {/* Final Step */}
                <div className="relative flex items-start gap-6">
                  <div className="absolute -left-2 flex h-16 items-center justify-center">
                    <div className="h-12 w-12 rounded-full bg-campus-success text-white flex items-center justify-center z-10 hover:scale-110 transition-transform">
                      <CheckCircle2 className="h-6 w-6" />
                    </div>
                  </div>
                  
                  <div className="ml-16 space-y-2">
                    <div className="font-medium text-campus-success">Booking Confirmed</div>
                    <div className="text-sm text-muted-foreground">
                      Booking is confirmed and added to the calendar
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Event Booking Flow */}
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle>Event Booking Flow</CardTitle>
            <CardDescription>
              Comprehensive process for booking and organizing campus events
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col lg:flex-row gap-4 overflow-auto pb-4">
              {/* Step 1 */}
              <div className="min-w-[200px] lg:min-w-0 flex-1 bg-muted/20 rounded-lg p-4 border hover:shadow-md transition-all hover:-translate-y-1">
                <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center mb-3">
                  <span className="text-primary font-medium">1</span>
                </div>
                <h3 className="font-medium">Request Raised</h3>
                <p className="text-sm text-muted-foreground mt-1">User submits event details and requirements</p>
              </div>
              
              <div className="hidden lg:flex items-center text-muted">
                <ArrowRight className="h-4 w-4" />
              </div>
              
              {/* Step 2 */}
              <div className="min-w-[200px] lg:min-w-0 flex-1 bg-muted/20 rounded-lg p-4 border hover:shadow-md transition-all hover:-translate-y-1">
                <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center mb-3">
                  <span className="text-primary font-medium">2</span>
                </div>
                <h3 className="font-medium">Department Approval</h3>
                <p className="text-sm text-muted-foreground mt-1">Department head reviews request viability</p>
              </div>
              
              <div className="hidden lg:flex items-center text-muted">
                <ArrowRight className="h-4 w-4" />
              </div>
              
              {/* Step 3 */}
              <div className="min-w-[200px] lg:min-w-0 flex-1 bg-muted/20 rounded-lg p-4 border hover:shadow-md transition-all hover:-translate-y-1">
                <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center mb-3">
                  <span className="text-primary font-medium">3</span>
                </div>
                <h3 className="font-medium">Main Head Approval</h3>
                <p className="text-sm text-muted-foreground mt-1">Institution head approves event proposal</p>
              </div>
              
              <div className="hidden lg:flex items-center text-muted">
                <ArrowRight className="h-4 w-4" />
              </div>
              
              {/* Step 4 */}
              <div className="min-w-[200px] lg:min-w-0 flex-1 bg-muted/20 rounded-lg p-4 border hover:shadow-md transition-all hover:-translate-y-1">
                <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center mb-3">
                  <span className="text-primary font-medium">4</span>
                </div>
                <h3 className="font-medium">Hall Allotment</h3>
                <p className="text-sm text-muted-foreground mt-1">Venue assigned based on event requirements</p>
              </div>
              
              <div className="hidden lg:flex items-center text-muted">
                <ArrowRight className="h-4 w-4" />
              </div>
              
              {/* Step 5 */}
              <div className="min-w-[200px] lg:min-w-0 flex-1 bg-muted/20 rounded-lg p-4 border hover:shadow-md transition-all hover:-translate-y-1">
                <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center mb-3">
                  <span className="text-primary font-medium">5</span>
                </div>
                <h3 className="font-medium">Finance Approval</h3>
                <p className="text-sm text-muted-foreground mt-1">Budget approval and resource allocation</p>
              </div>
              
              <div className="hidden lg:flex items-center text-muted">
                <ArrowRight className="h-4 w-4" />
              </div>
              
              {/* Step 6 */}
              <div className="min-w-[200px] lg:min-w-0 flex-1 bg-campus-success/20 rounded-lg p-4 border border-campus-success hover:shadow-md transition-all hover:-translate-y-1">
                <div className="h-10 w-10 rounded-full bg-campus-success flex items-center justify-center mb-3 text-white">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <h3 className="font-medium text-campus-success">Event Confirmed</h3>
                <p className="text-sm text-muted-foreground mt-1">All approvals complete, event confirmed</p>
              </div>
            </div>
          </CardContent>
          
          <CardFooter className="bg-muted/20 flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>Average approval time: 2-3 working days</span>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default BookingProcess;
