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

// Renamed to match the ApprovalSteps component expectations
export interface RequestApprovalStep {
  id: string;
  department: string;
  status: RequestStatus;
  notes?: string;
  updatedAt?: Date;
  approver?: {
    name: string;
    role: string;
  };
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

export interface AppContextType {
  requests: Request[];
  addRequest: (requestData: Omit<Request, 'id' | 'createdAt' | 'updatedAt' | 'status'>) => void;
  updateRequestStatus: (requestId: string, status: RequestStatus, stepIndex?: number, notes?: string) => void;
  currentUser: User | null;
  isAuthenticated: boolean;
  loginUser: (email: string, password: string, role: UserRole) => void;
  logoutUser: () => void;
  signupUser: (userData: { name: string; email: string; password: string; role: UserRole; department: string }) => void;
  redirectPath: string | null;
  setRedirectPath: React.Dispatch<React.SetStateAction<string | null>>;
}
