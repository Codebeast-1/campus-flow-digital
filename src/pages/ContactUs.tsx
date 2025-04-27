
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, Phone, MapPin, Send, Star } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const ContactUs = () => {
  const [loaded, setLoaded] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  
  useEffect(() => {
    setLoaded(true);
  }, []);
  
  const handleSubmitContact = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message sent",
      description: "Thank you for contacting us. We will get back to you soon.",
    });
    
    // Clear form
    (e.target as HTMLFormElement).reset();
  };
  
  const handleSubmitFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (rating === 0) {
      toast({
        title: "Please select a rating",
        description: "Your rating helps us improve our service",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Feedback submitted",
      description: "Thank you for your valuable feedback!",
    });
    
    // Clear form
    (e.target as HTMLFormElement).reset();
    setRating(0);
  };
  
  return (
    <div className="container mx-auto py-6">
      <div className={`space-y-10 transition-all duration-500 ${loaded ? 'opacity-100' : 'opacity-0 translate-y-8'}`}>
        <div>
          <h1 className="text-3xl font-bold mb-2">Contact Us</h1>
          <p className="text-muted-foreground">
            Get in touch with us or provide your valuable feedback
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* About & Contact Info */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>About DPMS</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  The Digital Permission Management System (DPMS) is designed to streamline the process of booking venues, 
                  organizing events, and managing resources across campus. Our platform simplifies the approval workflow, 
                  provides real-time status updates, and ensures efficient utilization of campus facilities.
                </p>
                
                <div className="mt-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Email</p>
                      <p className="text-sm text-muted-foreground">support@campus-dpms.edu</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Phone className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Phone</p>
                      <p className="text-sm text-muted-foreground">+1 (555) 123-4567</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Location</p>
                      <p className="text-sm text-muted-foreground">Admin Block, Floor 2, Campus Main Building</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="bg-muted/30 rounded-lg p-6">
              <h3 className="font-medium mb-2">Working Hours</h3>
              <div className="space-y-1 text-sm text-muted-foreground">
                <p>Monday - Friday: 9:00 AM - 5:00 PM</p>
                <p>Saturday: 10:00 AM - 2:00 PM</p>
                <p>Sunday: Closed</p>
              </div>
            </div>
          </div>
          
          {/* Forms */}
          <div className="lg:col-span-3 space-y-8">
            {/* Contact Form */}
            <Card className="hover:shadow-md transition-all">
              <CardHeader>
                <CardTitle>Send us a message</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmitContact} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" required placeholder="Your name" className="hover:border-primary focus-visible:ring-primary transition-colors" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" required placeholder="Your email" className="hover:border-primary focus-visible:ring-primary transition-colors" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input id="subject" required placeholder="Message subject" className="hover:border-primary focus-visible:ring-primary transition-colors" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea 
                      id="message" 
                      required 
                      placeholder="Type your message here" 
                      rows={5}
                      className="hover:border-primary focus-visible:ring-primary transition-colors"
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full hover:scale-105 transition-transform"
                  >
                    <Send className="mr-2 h-4 w-4" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
            
            {/* Feedback Form */}
            <Card className="hover:shadow-md transition-all">
              <CardHeader>
                <CardTitle>Provide Feedback</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmitFeedback} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="rating">Rating</Label>
                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setRating(star)}
                          onMouseEnter={() => setHoveredRating(star)}
                          onMouseLeave={() => setHoveredRating(0)}
                          className="p-1 hover:scale-110 transition-transform"
                        >
                          <Star 
                            className={`h-8 w-8 ${
                              star <= (hoveredRating || rating) 
                                ? "fill-yellow-400 text-yellow-400" 
                                : "text-gray-300"
                            }`} 
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="feedback">Feedback</Label>
                    <Textarea 
                      id="feedback" 
                      required 
                      placeholder="Share your experience with our platform" 
                      rows={4}
                      className="hover:border-primary focus-visible:ring-primary transition-colors"
                    />
                  </div>
                  
                  <Button 
                    type="submit"
                    variant="outline"
                    className="w-full hover:bg-muted transition-colors"
                  >
                    Submit Feedback
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
