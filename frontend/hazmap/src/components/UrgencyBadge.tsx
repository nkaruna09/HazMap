import { Badge } from './ui/badge';

export type UrgencyLevel = 'critical' | 'high' | 'medium' | 'low';

interface UrgencyBadgeProps {
  level: UrgencyLevel;
}

export function UrgencyBadge({ level }: UrgencyBadgeProps) {
  const config = {
    critical: {
      label: 'CRITICAL',
      className: 'bg-[#EF4444] text-white hover:bg-[#EF4444] animate-pulse',
    },
    high: {
      label: 'HIGH',
      className: 'bg-[#F97316] text-white hover:bg-[#F97316]',
    },
    medium: {
      label: 'MEDIUM',
      className: 'bg-yellow-500 text-white hover:bg-yellow-500',
    },
    low: {
      label: 'LOW',
      className: 'bg-gray-400 text-white hover:bg-gray-400',
    },
  };

  const { label, className } = config[level];

  return (
    <Badge className={className}>
      {label}
    </Badge>
  );
}
