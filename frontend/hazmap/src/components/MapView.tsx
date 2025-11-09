import { MapPin, Package, Truck, Home } from 'lucide-react';

interface MapPin {
  id: string;
  type: 'request' | 'supply' | 'volunteer' | 'shelter';
  lat: number;
  lng: number;
  label: string;
}

interface MapViewProps {
  pins?: MapPin[];
  className?: string;
}

export function MapView({ pins = [], className = '' }: MapViewProps) {
  const getPinColor = (type: MapPin['type']) => {
    switch (type) {
      case 'request':
        return 'bg-[#EF4444]';
      case 'supply':
        return 'bg-[#2563EB]';
      case 'volunteer':
        return 'bg-[#10B981]';
      case 'shelter':
        return 'bg-purple-600';
      default:
        return 'bg-gray-600';
    }
  };

  const getPinIcon = (type: MapPin['type']) => {
    switch (type) {
      case 'request':
        return <MapPin className="w-4 h-4 text-white" />;
      case 'supply':
        return <Package className="w-4 h-4 text-white" />;
      case 'volunteer':
        return <Truck className="w-4 h-4 text-white" />;
      case 'shelter':
        return <Home className="w-4 h-4 text-white" />;
    }
  };

  return (
    <div className={`bg-gray-200 rounded-lg overflow-hidden relative ${className}`}>
      {/* Map Placeholder */}
      <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-300 relative">
        {/* Grid pattern to simulate map */}
        <div className="absolute inset-0 opacity-20">
          <svg width="100%" height="100%">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="gray" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Street patterns */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-0 right-0 h-1 bg-gray-400 opacity-30" />
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-400 opacity-30" />
          <div className="absolute top-3/4 left-0 right-0 h-1 bg-gray-400 opacity-30" />
          <div className="absolute left-1/4 top-0 bottom-0 w-1 bg-gray-400 opacity-30" />
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gray-400 opacity-30" />
          <div className="absolute left-3/4 top-0 bottom-0 w-1 bg-gray-400 opacity-30" />
        </div>

        {/* Map Pins */}
        {pins.map((pin, index) => (
          <div
            key={pin.id}
            className="absolute transform -translate-x-1/2 -translate-y-full"
            style={{
              left: `${25 + (index * 12) % 50}%`,
              top: `${20 + (index * 15) % 60}%`,
            }}
          >
            <div className={`${getPinColor(pin.type)} rounded-full p-2 shadow-lg border-2 border-white`}>
              {getPinIcon(pin.type)}
            </div>
          </div>
        ))}

        {/* Map Controls */}
        <div className="absolute bottom-4 right-4 flex flex-col gap-2">
          <button className="bg-white rounded-lg shadow-md p-2 hover:bg-gray-50">
            <span className="text-gray-700">+</span>
          </button>
          <button className="bg-white rounded-lg shadow-md p-2 hover:bg-gray-50">
            <span className="text-gray-700">−</span>
          </button>
        </div>

        {/* Mapbox Attribution (placeholder) */}
        <div className="absolute bottom-2 left-2 bg-white bg-opacity-80 px-2 py-1 rounded text-gray-600">
          Map View
        </div>
      </div>

      {/* Legend */}
      <div className="absolute top-4 left-4 bg-white rounded-lg shadow-md p-3 space-y-2">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-[#EF4444] rounded-full" />
          <span className="text-gray-700">Requests</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-[#2563EB] rounded-full" />
          <span className="text-gray-700">Supplies</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-[#10B981] rounded-full" />
          <span className="text-gray-700">Volunteers</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-purple-600 rounded-full" />
          <span className="text-gray-700">Shelters</span>
        </div>
      </div>
    </div>
  );
}
