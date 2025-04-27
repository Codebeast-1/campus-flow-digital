
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Users, ArrowRight, Bookmark, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

const EventBooking = () => {
  const [loaded, setLoaded] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    setLoaded(true);
  }, []);
  
  const eventTypes = [
    {
      id: "conference",
      name: "Conference",
      icon: "🎙️",
      description: "Organize academic or professional conferences",
      venues: ["Main Auditorium", "Conference Hall"],
      approvals: 5
    },
    {
      id: "cultural",
      name: "Cultural Event",
      icon: "🎭",
      description: "Host cultural programs, performances and competitions",
      venues: ["Main Auditorium", "Open Air Theater"],
      approvals: 6
    },
    {
      id: "workshop",
      name: "Workshop",
      icon: "🛠️",
      description: "Conduct educational or skill development workshops",
      venues: ["Seminar Hall", "Conference Hall"],
      approvals: 4
    },
    {
      id: "seminar",
      name: "Seminar",
      icon: "📊",
      description: "Organize academic seminars and guest lectures",
      venues: ["Seminar Hall", "Conference Hall"],
      approvals: 4
    },
    {
      id: "exhibition",
      name: "Exhibition",
      icon: "🎨",
      description: "Set up exhibits, posters or project displays",
      venues: ["Exhibition Hall", "Main Foyer"],
      approvals: 5
    },
    {
      id: "sports",
      name: "Sports Event",
      icon: "🏆",
      description: "Conduct sports competitions or tournaments",
      venues: ["Sports Complex", "Open Ground"],
      approvals: 5
    }
  ];
  
  const handleCreateEvent = (eventType: string) => {
    navigate(`/new-request?type=event_hosting&eventType=${eventType}`);
  };
  
  return (
    <div className="container mx-auto py-6">
      <div className={`space-y-8 transition-all duration-500 ${loaded ? 'opacity-100' : 'opacity-0 translate-y-8'}`}>
        <div>
          <h1 className="text-3xl font-bold mb-2">Event Booking</h1>
          <p className="text-muted-foreground">
            Choose the type of event you want to organize
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {eventTypes.map((event) => (
            <Card 
              key={event.id} 
              className="overflow-hidden hover:shadow-lg transition-all hover:-translate-y-1 duration-300 border-t-4 border-t-campus-blue"
            >
              <CardHeader>
                <div className="text-3xl mb-2">{event.icon}</div>
                <CardTitle>{event.name}</CardTitle>
                <CardDescription>{event.description}</CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Bookmark className="h-4 w-4 text-muted-foreground" />
                    <span>Suitable venues:</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {event.venues.map(venue => (
                      <Badge key={venue} variant="secondary" className="bg-muted/60">
                        {venue}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm mt-4">
                    <Star className="h-4 w-4 text-muted-foreground" />
                    <span>Required approvals: {event.approvals}</span>
                  </div>
                </div>
              </CardContent>
              
              <CardFooter>
                <Button 
                  className="w-full group-hover:bg-campus-blue transition-colors hover:bg-campus-blue/90"
                  onClick={() => handleCreateEvent(event.id)}
                >
                  <span className="flex items-center">
                    Create Request
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        <div className="bg-muted/30 rounded-lg p-6 border border-dashed">
          <h3 className="text-lg font-medium mb-2">Important Information</h3>
          <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
            <li>Event bookings must be made at least 7 days in advance</li>
            <li>All required approvals must be obtained before event confirmation</li>
            <li>For events with external participants, additional security clearance is required</li>
            <li>Technical requirements must be specified in the booking request</li>
            <li>For financial support, include budget details in your request</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default EventBooking;
