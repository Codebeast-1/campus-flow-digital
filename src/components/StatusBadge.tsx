
import { RequestStatus } from '@/types';
import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  status: RequestStatus;
  className?: string;
}

const statusConfig = {
  'pending': {
    label: 'Pending',
    className: 'status-pending',
  },
  'approved': {
    label: 'Approved',
    className: 'status-approved',
  },
  'rejected': {
    label: 'Rejected',
    className: 'status-rejected',
  },
  'in-progress': {
    label: 'In Progress',
    className: 'status-in-progress',
  },
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status];
  
  return (
    <span className={cn(config.className, className)}>
      {config.label}
    </span>
  );
}
