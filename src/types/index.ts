
export type RequestStatus = 'pending' | 'approved' | 'rejected' | 'in-progress';

export type Department = 'IT' | 'Facilities' | 'Student Affairs' | 'Finance' | 'Academic Affairs';

export type RequestType = 'room_booking' | 'event_hosting' | 'equipment_request' | 'maintenance';

export type UserRole = 'admin' | 'faculty' | 'student';

export interface Approver {
  id: string;
  name: string;
  department: Department;
  role: string;
}

export interface RequestApprovalStep {
  id: string;
  department: Department;
  approver?: Approver;
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
  steps: RequestApprovalStep[];
  createdAt: Date;
  updatedAt: Date;
  status: RequestStatus;
  facultyName?: string; // For student requests that need faculty approval
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  department: string;
}

export interface AppContextType {
  requests: Request[];
  addRequest: (request: Omit<Request, 'id' | 'createdAt' | 'updatedAt' | 'status'>) => void;
  updateRequestStatus: (requestId: string, status: RequestStatus, stepIndex?: number, notes?: string) => void;
  currentUser: User | null;
  isAuthenticated: boolean;
  loginUser: (email: string, password: string, role: UserRole) => void;
  logoutUser: () => void;
  signupUser: (userData: { name: string; email: string; password: string; role: UserRole; department: string }) => void;
}
