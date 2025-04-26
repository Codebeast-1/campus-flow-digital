
import React, { createContext, useState, useContext, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { toast } from '@/hooks/use-toast';
import { AppContextType, Request, RequestStatus, User, UserRole, RequestType } from '@/types';

const AppContext = createContext<AppContextType | null>(null);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

// Mock data for initial requests
const mockRequests: Request[] = [
  {
    id: '1',
    title: 'Main Hall Booking for Graduation Ceremony',
    description: 'Need to book the Main Hall for the upcoming graduation ceremony.',
    type: 'room_booking' as RequestType,
    requestor: {
      id: '101',
      name: 'Dr. Jane Smith',
      email: 'j.smith@campus.edu',
      department: 'Academic Affairs'
    },
    location: 'Main Hall',
    startDate: new Date('2025-05-15T10:00:00'),
    endDate: new Date('2025-05-15T16:00:00'),
    currentStep: 1,
    steps: [
      {
        id: uuidv4(),
        department: 'Facilities',
        status: 'approved',
        notes: 'Space available for the requested time.',
        updatedAt: new Date('2025-04-20T14:30:00')
      },
      {
        id: uuidv4(),
        department: 'IT',
        status: 'pending'
      },
      {
        id: uuidv4(),
        department: 'Academic Affairs',
        status: 'pending'
      }
    ],
    createdAt: new Date('2025-04-18T09:15:00'),
    updatedAt: new Date('2025-04-20T14:30:00'),
    status: 'in-progress'
  },
  {
    id: '2',
    title: 'Science Building Equipment Request',
    description: 'Request for new microscopes for the biology lab.',
    type: 'equipment_request' as RequestType,
    requestor: {
      id: '102',
      name: 'Prof. Robert Chen',
      email: 'r.chen@campus.edu',
      department: 'Science'
    },
    currentStep: 0,
    steps: [
      {
        id: uuidv4(),
        department: 'Finance',
        status: 'pending'
      },
      {
        id: uuidv4(),
        department: 'Academic Affairs',
        status: 'pending'
      }
    ],
    createdAt: new Date('2025-04-22T13:45:00'),
    updatedAt: new Date('2025-04-22T13:45:00'),
    status: 'pending'
  },
  {
    id: '3',
    title: 'Computer Lab Access Request',
    description: 'Need extended hours access to the Computer Science lab for project work',
    type: 'room_booking' as RequestType,
    requestor: {
      id: '103',
      name: 'Lisa Johnson',
      email: 'l.johnson@campus.edu',
      department: 'Student'
    },
    location: 'CS Lab Room 302',
    facultyName: 'Dr. Alan Turing',
    currentStep: 0,
    steps: [
      {
        id: uuidv4(),
        department: 'IT',
        status: 'pending'
      }
    ],
    createdAt: new Date('2025-04-23T10:15:00'),
    updatedAt: new Date('2025-04-23T10:15:00'),
    status: 'pending'
  }
];

// Mock users for demo purposes
const mockUsers: User[] = [
  {
    id: '001',
    name: 'Admin User',
    email: 'admin@campus.edu',
    role: 'admin',
    department: 'IT'
  },
  {
    id: '101',
    name: 'Dr. Jane Smith',
    email: 'faculty@campus.edu',
    role: 'faculty',
    department: 'Academic Affairs'
  },
  {
    id: '103',
    name: 'Lisa Johnson',
    email: 'student@campus.edu',
    role: 'student',
    department: 'Computer Science'
  }
];

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [requests, setRequests] = useState<Request[]>(mockRequests);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // Check for stored user credentials on load
  useEffect(() => {
    const storedUser = localStorage.getItem('campusflow_user');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const loginUser = (email: string, password: string, role: UserRole) => {
    // In a real app, this would verify against a database
    const user = mockUsers.find(u => u.email === email && u.role === role);
    
    if (user) {
      setCurrentUser(user);
      setIsAuthenticated(true);
      localStorage.setItem('campusflow_user', JSON.stringify(user));
      
      toast({
        title: "Login successful",
        description: `Welcome back, ${user.name}!`
      });
    } else {
      toast({
        title: "Login failed",
        description: "Invalid email or password",
        variant: "destructive"
      });
    }
  };

  const logoutUser = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('campusflow_user');
    
    toast({
      title: "Logged out",
      description: "You have been successfully logged out"
    });
  };

  const signupUser = (userData: { name: string; email: string; password: string; role: UserRole; department: string }) => {
    // In a real app, this would add to a database
    const newUser: User = {
      id: uuidv4(),
      name: userData.name,
      email: userData.email,
      role: userData.role,
      department: userData.department
    };
    
    // For demo purposes, we'll simulate adding to our mock users
    // In a real app, this would be a database call
    mockUsers.push(newUser);
    
    toast({
      title: "Account created",
      description: "Your account has been created successfully"
    });
  };

  const addRequest = (requestData: Omit<Request, 'id' | 'createdAt' | 'updatedAt' | 'status'>) => {
    const now = new Date();
    const newRequest: Request = {
      ...requestData,
      id: uuidv4(),
      createdAt: now,
      updatedAt: now,
      status: 'pending'
    };

    setRequests((prevRequests) => [
      ...prevRequests,
      newRequest
    ]);

    toast({
      title: "Request submitted",
      description: "Your request has been successfully submitted."
    });
  };

  const updateRequestStatus = (requestId: string, status: RequestStatus, stepIndex?: number, notes?: string) => {
    setRequests((prevRequests) =>
      prevRequests.map((request) => {
        if (request.id !== requestId) return request;
        
        // Create a new request object to avoid mutating the original
        const updatedRequest = { ...request };
        
        // If stepIndex is provided, update the specific step
        if (stepIndex !== undefined && updatedRequest.steps[stepIndex]) {
          const updatedSteps = [...updatedRequest.steps];
          updatedSteps[stepIndex] = {
            ...updatedSteps[stepIndex],
            status,
            notes: notes || updatedSteps[stepIndex].notes,
            updatedAt: new Date()
          };
          
          // If this step is approved, move to the next step
          if (status === 'approved' && stepIndex < updatedSteps.length - 1) {
            updatedRequest.currentStep = stepIndex + 1;
            updatedRequest.status = 'in-progress';
          } else if (status === 'rejected') {
            // If rejected at any step, the whole request is rejected
            updatedRequest.status = 'rejected';
          } else if (status === 'approved' && stepIndex === updatedSteps.length - 1) {
            // If the last step is approved, the whole request is approved
            updatedRequest.status = 'approved';
          }
          
          updatedRequest.steps = updatedSteps;
        } else {
          // Update the overall request status if no specific step
          updatedRequest.status = status;
        }
        
        updatedRequest.updatedAt = new Date();
        return updatedRequest;
      })
    );

    toast({
      title: "Status updated",
      description: `Request status has been updated to ${status}.`
    });
  };

  const value = {
    requests,
    addRequest,
    updateRequestStatus,
    currentUser,
    isAuthenticated,
    loginUser,
    logoutUser,
    signupUser
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
