
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Users, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const LectureClassroomBooking = () => {
  const [loaded, setLoaded] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    setLoaded(true);
  }, []);
  
  const classrooms = [
    {
      id: "lt1",
      name: "Lecture Theatre 101",
      image: "https://images.unsplash.com/photo-1496307653780-42ee777d4833",
      capacity: 120,
      availability: "available",
      features: ["Projector", "Sound System", "Whiteboard"],
      location: "Main Building, Floor 1"
    },
    {
      id: "lt2",
      name: "Lecture Theatre 102",
      image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
      capacity: 80,
      availability: "occupied",
      features: ["Projector", "Smart Board", "AC"],
      location: "Main Building, Floor 1"
    },
    {
      id: "cr1",
      name: "Classroom A201",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
      capacity: 40,
      availability: "available",
      features: ["Whiteboard", "AC"],
      location: "Science Block, Floor 2"
    },
    {
      id: "cr2",
      name: "Classroom A202",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
      capacity: 35,
      availability: "available",
      features: ["Projector", "Whiteboard"],
      location: "Science Block, Floor 2"
    },
    {
      id: "cr3",
      name: "Computer Lab 301",
      image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
      capacity: 50,
      availability: "occupied",
      features: ["Computers", "Projector", "AC"],
      location: "Technology Block, Floor 3"
    },
    {
      id: "cr4",
      name: "Seminar Room B101",
      image: "https://images.unsplash.com/photo-1496307653780-42ee777d4833",
      capacity: 30,
      availability: "available",
      features: ["Round Table", "Projector", "AC"],
      location: "Main Building, Floor B1"
    }
  ];
  
  const handleBookNow = (id: string) => {
    navigate(`/new-request?venue=${id}&type=room_booking`);
  };
  
  return (
    <div className="container mx-auto py-6">
      <div className={`space-y-8 transition-all duration-500 ${loaded ? 'opacity-100' : 'opacity-0 translate-y-8'}`}>
        <div>
          <h1 className="text-3xl font-bold mb-2">Lecture Theatres & Classrooms</h1>
          <p className="text-muted-foreground">
            Browse and book available lecture theaters and classrooms for your academic needs
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {classrooms.map((room) => (
            <Card key={room.id} className="overflow-hidden hover:shadow-lg transition-all group">
              <div className="aspect-video relative overflow-hidden">
                <img 
                  src={room.image} 
                  alt={room.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <Badge 
                  className={`absolute top-3 right-3 ${
                    room.availability === "available" 
                      ? "bg-campus-success" 
                      : "bg-campus-warning"
                  } animate-fade-in`}
                >
                  {room.availability === "available" ? "Available" : "Occupied"}
                </Badge>
              </div>
              
              <CardHeader>
                <CardTitle className="flex justify-between items-start">
                  <span>{room.name}</span>
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    {room.capacity}
                  </Badge>
                </CardTitle>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>Available 8:00 AM - 8:00 PM</span>
                  </div>
                  
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>{room.location}</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mt-3">
                    {room.features.map(feature => (
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
                  disabled={room.availability === "occupied"}
                  onClick={() => handleBookNow(room.id)}
                >
                  {room.availability === "available" ? (
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

export default LectureClassroomBooking;
