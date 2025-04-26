export type UserRole = 'admin' | 'faculty' | 'student';
export type RequestType = 'room_booking' | 'event_hosting' | 'equipment_request' | 'maintenance';
export type RequestStatus = 'pending' | 'approved' | 'rejected' | 'in-progress';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  department: string;
}

export interface RequestStep {
  id: string;
  department: string;
  status: RequestStatus;
  notes?: string;
  updatedAt?: Date;
}

export interface Request {
  id: string;
  title: string;
  description: string;
  type: RequestType;
  requestor: {
    id: string;
    name: string;
    email: string;
    department: string;
  };
  location?: string;
  startDate?: Date;
  endDate?: Date;
  currentStep: number;
  steps: RequestStep[];
  createdAt: Date;
  updatedAt: Date;
  status: RequestStatus;
  facultyName?: string;
}
