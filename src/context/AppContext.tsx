
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Request, RequestStatus, AppContextType, Department, RequestType } from '../types';
import { v4 as uuidv4 } from 'uuid';
import { toast } from '@/components/ui/use-toast';

const AppContext = createContext<AppContextType | null>(null);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

interface AppProviderProps {
  children: ReactNode;
}

// Mock data for initial requests
const mockRequests: Request[] = [
  {
    id: '1',
    title: 'Main Hall Booking for Graduation Ceremony',
    description: 'Need to book the Main Hall for the upcoming graduation ceremony.',
    type: 'room_booking',
    requestor: {
      id: '101',
      name: 'Dr. Jane Smith',
      email: 'j.smith@campus.edu',
      department: 'Academic Affairs',
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
        updatedAt: new Date('2025-04-20T14:30:00'),
      },
      {
        id: uuidv4(),
        department: 'IT',
        status: 'pending',
      },
      {
        id: uuidv4(),
        department: 'Academic Affairs',
        status: 'pending',
      },
    ],
    createdAt: new Date('2025-04-18T09:15:00'),
    updatedAt: new Date('2025-04-20T14:30:00'),
    status: 'in-progress',
  },
  {
    id: '2',
    title: 'Science Building Equipment Request',
    description: 'Request for new microscopes for the biology lab.',
    type: 'equipment_request',
    requestor: {
      id: '102',
      name: 'Prof. Robert Chen',
      email: 'r.chen@campus.edu',
      department: 'Science',
    },
    currentStep: 0,
    steps: [
      {
        id: uuidv4(),
        department: 'Finance',
        status: 'pending',
      },
      {
        id: uuidv4(),
        department: 'Academic Affairs',
        status: 'pending',
      },
    ],
    createdAt: new Date('2025-04-22T13:45:00'),
    updatedAt: new Date('2025-04-22T13:45:00'),
    status: 'pending',
  },
];

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [requests, setRequests] = useState<Request[]>(mockRequests);
  
  // Mock current user (would be from auth in a real app)
  const [currentUser] = useState({
    id: '001',
    name: 'Admin User',
    email: 'admin@campus.edu',
    role: 'admin' as const,
    department: 'IT' as Department,
  });

  const addRequest = (
    requestData: Omit<Request, 'id' | 'createdAt' | 'updatedAt' | 'status'>
  ) => {
    const now = new Date();
    const newRequest: Request = {
      ...requestData,
      id: uuidv4(),
      createdAt: now,
      updatedAt: now,
      status: 'pending',
    };

    setRequests((prevRequests) => [...prevRequests, newRequest]);
    toast({
      title: "Request submitted",
      description: "Your request has been successfully submitted.",
    });
  };

  const updateRequestStatus = (
    requestId: string,
    status: RequestStatus,
    stepIndex?: number,
    notes?: string
  ) => {
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
            updatedAt: new Date(),
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
      description: `Request status has been updated to ${status}.`,
    });
  };

  const value = {
    requests,
    addRequest,
    updateRequestStatus,
    currentUser,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
