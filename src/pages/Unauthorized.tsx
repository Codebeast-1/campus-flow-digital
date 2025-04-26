
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Shield } from "lucide-react";

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-4 animate-fade-in">
      <div className="max-w-md">
        <div className="flex justify-center mb-6">
          <div className="rounded-full bg-campus-danger/10 p-4">
            <Shield className="h-14 w-14 text-campus-danger" />
          </div>
        </div>
        <h1 className="text-3xl font-bold mb-4">Access Denied</h1>
        <p className="text-gray-600 mb-8">
          You don't have permission to access this page. Please contact your administrator if you believe this is an error.
        </p>
        <Button 
          onClick={() => navigate("/")} 
          className="hover:translate-y-[-2px] transition-all"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Return to Dashboard
        </Button>
      </div>
    </div>
  );
};

export default Unauthorized;
