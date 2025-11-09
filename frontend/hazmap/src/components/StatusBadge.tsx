import { Badge } from './ui/badge';

export type Status = 'requested' | 'matched' | 'in-transit' | 'completed';

interface StatusBadgeProps {
  status: Status;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const config = {
    requested: {
      label: 'Requested',
      className: 'bg-blue-100 text-blue-800 hover:bg-blue-100',
    },
    matched: {
      label: 'Matched',
      className: 'bg-purple-100 text-purple-800 hover:bg-purple-100',
    },
    'in-transit': {
      label: 'In Transit',
      className: 'bg-orange-100 text-orange-800 hover:bg-orange-100',
    },
    completed: {
      label: 'Completed',
      className: 'bg-[#10B981] text-white hover:bg-[#10B981]',
    },
  };

  const { label, className } = config[status];

  return (
    <Badge variant="outline" className={className}>
      {label}
    </Badge>
  );
}
