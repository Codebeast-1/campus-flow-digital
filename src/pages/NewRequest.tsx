
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { RequestForm } from "@/components/RequestForm";
import { ArrowLeft } from "lucide-react";

export default function NewRequest() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-2xl font-bold tracking-tight">New Request</h1>
      </div>
      
      <div className="max-w-2xl mx-auto">
        <RequestForm />
      </div>
    </div>
  );
}
