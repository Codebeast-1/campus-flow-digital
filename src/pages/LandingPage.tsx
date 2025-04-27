
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";
import { useAppContext } from "@/context/AppContext";

const LandingPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAppContext();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Animation trigger after component mount
    setLoaded(true);
  }, []);

  if (isAuthenticated) {
    navigate('/dashboard');
    return null;
  }

  return (
    <div className="min-h-[calc(100vh-3.5rem)] flex flex-col lg:flex-row">
      {/* Left Section */}
      <div 
        className={`flex-1 flex flex-col justify-center px-6 lg:px-16 py-10 lg:py-20 transition-all duration-700 ${loaded ? 'opacity-100' : 'opacity-0 translate-y-10'}`}
      >
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-campus-blue mb-6">
          Streamline College <span className="text-campus-teal">Approvals</span>
        </h1>
        
        <p className="text-lg text-gray-700 max-w-lg mb-8">
          Digital Permission Management System (DPMS) simplifies venue booking, event planning, and resource management for your campus.
        </p>
        
        <div className="space-y-4 mb-10">
          <div className="flex items-center gap-3">
            <div className="h-6 w-6 rounded-full bg-campus-teal flex items-center justify-center">
              <Check className="h-3 w-3 text-white" />
            </div>
            <span className="text-gray-700">Book lecture theaters and classrooms</span>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="h-6 w-6 rounded-full bg-campus-teal flex items-center justify-center">
              <Check className="h-3 w-3 text-white" />
            </div>
            <span className="text-gray-700">Reserve halls for events</span>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="h-6 w-6 rounded-full bg-campus-teal flex items-center justify-center">
              <Check className="h-3 w-3 text-white" />
            </div>
            <span className="text-gray-700">Track approval status in real-time</span>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <Button 
            size="lg" 
            className="group hover:scale-105 transition-all"
            onClick={() => navigate('/auth')}
          >
            Login to your account
            <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
          
          <Button 
            variant="outline" 
            size="lg" 
            className="hover:scale-105 transition-all"
            onClick={() => navigate('/auth?signup=true')}
          >
            Create an account
          </Button>
        </div>
      </div>
      
      {/* Right Section */}
      <div 
        className={`flex-1 bg-gray-100 flex items-center justify-center overflow-hidden transition-all duration-700 delay-300 ${loaded ? 'opacity-100' : 'opacity-0'}`}
      >
        <div className="relative w-full h-full min-h-[400px]">
          <img 
            src="https://images.unsplash.com/photo-1487958449943-2429e8be8625" 
            alt="University Building" 
            className="w-full h-full object-cover transition-all duration-500 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex flex-col justify-end p-8">
            <span className="text-white text-xl font-semibold">
              Your Campus. Your Space.
            </span>
            <p className="text-white/80 text-sm mt-2">
              Manage campus resources efficiently with DPMS
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
