
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Users, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const HallBooking = () => {
  const [loaded, setLoaded] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    setLoaded(true);
  }, []);
  
  const halls = [
    {
      id: "hall1",
      name: "Main Auditorium",
      image: "https://images.unsplash.com/photo-1473177104440-ffee2f376098",
      capacity: 500,
      availability: "available",
      features: ["Stage", "Sound System", "Lighting", "AC"],
      location: "Central Campus"
    },
    {
      id: "hall2",
      name: "Conference Hall",
      image: "https://images.unsplash.com/photo-1496307653780-42ee777d4833",
      capacity: 200,
      availability: "occupied",
      features: ["Projector", "Sound System", "Video Conferencing", "AC"],
      location: "Admin Block, Floor 2"
    },
    {
      id: "hall3",
      name: "Exhibition Hall",
      image: "https://images.unsplash.com/photo-1500673922987-e212871fec22",
      capacity: 250,
      availability: "available",
      features: ["Open Space", "Lighting", "Power Points"],
      location: "Arts Block"
    },
    {
      id: "hall4",
      name: "Seminar Hall",
      image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625",
      capacity: 120,
      availability: "available",
      features: ["Projector", "Sound System", "Podium", "AC"],
      location: "Library Building, Floor 1"
    }
  ];
  
  const handleBookNow = (id: string) => {
    navigate(`/new-request?venue=${id}&type=event_hosting`);
  };
  
  return (
    <div className="container mx-auto py-6">
      <div className={`space-y-8 transition-all duration-500 ${loaded ? 'opacity-100' : 'opacity-0 translate-y-8'}`}>
        <div>
          <h1 className="text-3xl font-bold mb-2">Event Halls</h1>
          <p className="text-muted-foreground">
            Browse and book halls for events, conferences, and functions
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {halls.map((hall) => (
            <Card key={hall.id} className="overflow-hidden hover:shadow-lg transition-all group">
              <div className="aspect-video relative overflow-hidden">
                <img 
                  src={hall.image} 
                  alt={hall.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <Badge 
                  className={`absolute top-3 right-3 ${
                    hall.availability === "available" 
                      ? "bg-campus-success" 
                      : "bg-campus-warning"
                  } animate-fade-in`}
                >
                  {hall.availability === "available" ? "Available" : "Occupied"}
                </Badge>
              </div>
              
              <CardHeader>
                <CardTitle className="flex justify-between items-start">
                  <span>{hall.name}</span>
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    {hall.capacity}
                  </Badge>
                </CardTitle>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>Available 8:00 AM - 10:00 PM</span>
                  </div>
                  
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>{hall.location}</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mt-3">
                    {hall.features.map(feature => (
                      <Badge key={feature} variant="secondary" className="bg-muted/60">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
              
              <CardFooter>
                <Button 
                  className="w-full group-hover:bg-campus-blue transition-colors"
                  disabled={hall.availability === "occupied"}
                  onClick={() => handleBookNow(hall.id)}
                >
                  {hall.availability === "available" ? (
                    <span className="flex items-center">
                      Book Now
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  ) : "Currently Occupied"}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HallBooking;
