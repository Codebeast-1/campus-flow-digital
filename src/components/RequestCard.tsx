import { Request } from '@/types';
import { StatusBadge } from './StatusBadge';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Clock } from 'lucide-react';
import { format } from 'date-fns';

interface RequestCardProps {
  request: Request;
  onClick?: () => void;
  className?: string;  // Added optional className prop
}

export function RequestCard({ request, onClick, className }: RequestCardProps) {
  const formatDate = (date: Date) => {
    return format(new Date(date), 'MMM dd, yyyy');
  };
  
  const requestTypeLabels = {
    'room_booking': 'Room Booking',
    'event_hosting': 'Event Hosting',
    'equipment_request': 'Equipment Request',
    'maintenance': 'Maintenance',
  };

  return (
    <Card 
      className={`hover:shadow-md transition-shadow cursor-pointer ${className}`} 
      onClick={onClick}
    >
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-xs text-muted-foreground">
              {requestTypeLabels[request.type]}
            </p>
            <h3 className="font-semibold text-lg">{request.title}</h3>
          </div>
          <StatusBadge status={request.status} />
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <p className="text-sm line-clamp-2 text-gray-600">{request.description}</p>
        
        {request.location && (
          <p className="text-sm mt-2">
            <span className="font-medium">Location:</span> {request.location}
          </p>
        )}
        
        {request.startDate && (
          <p className="text-sm">
            <span className="font-medium">Date:</span> {formatDate(request.startDate)}
            {request.endDate && request.endDate.toDateString() !== request.startDate.toDateString() && 
              ` - ${formatDate(request.endDate)}`}
          </p>
        )}
      </CardContent>
      <CardFooter className="pt-2 text-xs text-muted-foreground flex justify-between">
        <div>
          By {request.requestor.name} • {request.requestor.department}
        </div>
        <div className="flex items-center gap-1">
          <Clock className="h-3 w-3" /> 
          {formatDate(request.updatedAt)}
        </div>
      </CardFooter>
    </Card>
  );
}
