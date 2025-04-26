
export type RequestStatus = 'pending' | 'approved' | 'rejected' | 'in-progress';

export type Department = 'IT' | 'Facilities' | 'Student Affairs' | 'Finance' | 'Academic Affairs';

export type RequestType = 'room_booking' | 'event_hosting' | 'equipment_request' | 'maintenance';

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
}

export interface AppContextType {
  requests: Request[];
  addRequest: (request: Omit<Request, 'id' | 'createdAt' | 'updatedAt' | 'status'>) => void;
  updateRequestStatus: (requestId: string, status: RequestStatus, stepIndex?: number, notes?: string) => void;
  currentUser: {
    id: string;
    name: string;
    email: string;
    role: 'admin' | 'user';
    department: Department;
  } | null;
}
