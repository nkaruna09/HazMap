import { MapPin, Package, Droplet, Utensils, Heart, BatteryCharging, Baby, Home } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { UrgencyBadge, type UrgencyLevel } from './UrgencyBadge';

export interface SupplyItem {
  id: string;
  name: string;
  category: 'water' | 'food' | 'medical' | 'shelter' | 'power' | 'baby' | 'other';
  quantity: string;
  distance: string;
  urgency: UrgencyLevel;
  location: string;
  requester?: string;
}

interface SupplyCardProps {
  item: SupplyItem;
  type: 'request' | 'offer';
  onHelp?: (id: string) => void;
  onNeed?: (id: string) => void;
}

const categoryIcons = {
  water: Droplet,
  food: Utensils,
  medical: Heart,
  shelter: Home,
  power: BatteryCharging,
  baby: Baby,
  other: Package,
};

const categoryColors = {
  water: 'text-blue-600',
  food: 'text-green-600',
  medical: 'text-red-600',
  shelter: 'text-purple-600',
  power: 'text-yellow-600',
  baby: 'text-pink-600',
  other: 'text-gray-600',
};

export function SupplyCard({ item, type, onHelp, onNeed }: SupplyCardProps) {
  const Icon = categoryIcons[item.category];
  const iconColor = categoryColors[item.category];

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3 flex-1">
            <div className={`w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0 ${iconColor}`}>
              <Icon className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <h3 className="text-gray-900">{item.name}</h3>
                {type === 'request' && <UrgencyBadge level={item.urgency} />}
              </div>
              <p className="text-gray-600">Quantity: {item.quantity}</p>
              <div className="flex items-center gap-1 text-gray-500 mt-1">
                <MapPin className="w-4 h-4" />
                <span>{item.distance} away</span>
              </div>
              {item.requester && (
                <p className="text-gray-500 mt-1">By {item.requester}</p>
              )}
            </div>
          </div>
          {onHelp && (
            <Button
              onClick={() => onHelp(item.id)}
              className="bg-[#F97316] hover:bg-[#F97316]/90 flex-shrink-0"
              size="sm"
            >
              Help
            </Button>
          )}
          {onNeed && (
            <Button
              onClick={() => onNeed(item.id)}
              className="bg-[#F97316] hover:bg-[#F97316]/90 flex-shrink-0"
              size="sm"
            >
              Need
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}