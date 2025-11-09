import { useState } from 'react';
import { MapPin, Navigation, Filter, Clock, Package } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';
import { MapView } from './MapView';
import { UrgencyBadge, type UrgencyLevel } from './UrgencyBadge';
import { toast } from 'sonner';

interface DeliveryRequest {
  id: string;
  item: string;
  pickup: string;
  dropoff: string;
  distance: string;
  urgency: UrgencyLevel;
  estimatedTime: string;
  recipient: string;
}

const mockDeliveries: DeliveryRequest[] = [
  {
    id: '1',
    item: 'Bottled Water (24 pack)',
    pickup: '123 Oak St',
    dropoff: '456 Maple Ave',
    distance: '2.3 mi',
    urgency: 'critical',
    estimatedTime: '15 min',
    recipient: 'Sarah M.',
  },
  {
    id: '2',
    item: 'Baby Formula (3 cans)',
    pickup: '789 Pine Rd',
    dropoff: '321 Elm St',
    distance: '3.1 mi',
    urgency: 'high',
    estimatedTime: '20 min',
    recipient: 'John D.',
  },
  {
    id: '3',
    item: 'First Aid Kit',
    pickup: '555 Cedar Ln',
    dropoff: '888 Birch Way',
    distance: '1.8 mi',
    urgency: 'high',
    estimatedTime: '12 min',
    recipient: 'Maria G.',
  },
  {
    id: '4',
    item: 'Non-perishable Food',
    pickup: '222 Spruce Ave',
    dropoff: '999 Willow Dr',
    distance: '4.5 mi',
    urgency: 'medium',
    estimatedTime: '25 min',
    recipient: 'Community Center',
  },
  {
    id: '5',
    item: 'Blankets (5 pieces)',
    pickup: '111 Ash St',
    dropoff: '777 Oak Pl',
    distance: '2.9 mi',
    urgency: 'medium',
    estimatedTime: '18 min',
    recipient: 'Shelter',
  },
];

export function VolunteerDashboard() {
  const [selectedDeliveries, setSelectedDeliveries] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  const toggleDelivery = (id: string) => {
    setSelectedDeliveries((prev) =>
      prev.includes(id) ? prev.filter((d) => d !== id) : [...prev, id]
    );
  };

  const handleStartRoute = () => {
    if (selectedDeliveries.length === 0) {
      toast.error('No deliveries selected', {
        description: 'Please select at least one delivery to start a route.',
      });
      return;
    }
    toast.success('Route started!', {
      description: `Optimized route for ${selectedDeliveries.length} deliveries.`,
    });
  };

  const totalDistance = selectedDeliveries
    .map((id) => mockDeliveries.find((d) => d.id === id))
    .filter(Boolean)
    .reduce((sum, delivery) => sum + parseFloat(delivery!.distance), 0)
    .toFixed(1);

  const totalTime = selectedDeliveries
    .map((id) => mockDeliveries.find((d) => d.id === id))
    .filter(Boolean)
    .reduce((sum, delivery) => sum + parseInt(delivery!.estimatedTime), 0);

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h1 className="text-gray-900 mb-2">Volunteer Driver Dashboard</h1>
          <p className="text-gray-600">Select deliveries to create an optimized route and help those in need.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Map - 2 columns */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Delivery Locations</CardTitle>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowFilters(!showFilters)}
                  >
                    <Filter className="w-4 h-4 mr-2" />
                    Filters
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {showFilters && (
                  <div className="mb-4 p-4 bg-gray-50 rounded-lg space-y-3">
                    <h3 className="text-gray-900">Filter by:</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <Checkbox />
                          <span>Within 5 miles</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <Checkbox />
                          <span>Critical urgency only</span>
                        </label>
                      </div>
                      <div className="space-y-2">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <Checkbox />
                          <span>Food items</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <Checkbox />
                          <span>Medical supplies</span>
                        </label>
                      </div>
                    </div>
                  </div>
                )}
                <MapView className="h-[500px]" />
              </CardContent>
            </Card>

            {/* Route Summary */}
            {selectedDeliveries.length > 0 && (
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Route Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <Package className="w-6 h-6 text-[#2563EB] mx-auto mb-2" />
                      <p className="text-gray-600">Deliveries</p>
                      <p className="text-gray-900">{selectedDeliveries.length}</p>
                    </div>
                    <div className="text-center p-4 bg-orange-50 rounded-lg">
                      <MapPin className="w-6 h-6 text-[#F97316] mx-auto mb-2" />
                      <p className="text-gray-600">Total Distance</p>
                      <p className="text-gray-900">{totalDistance} mi</p>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <Clock className="w-6 h-6 text-[#10B981] mx-auto mb-2" />
                      <p className="text-gray-600">Est. Time</p>
                      <p className="text-gray-900">{totalTime} min</p>
                    </div>
                  </div>
                  <Button
                    onClick={handleStartRoute}
                    className="w-full h-12 bg-[#10B981] hover:bg-[#10B981]/90"
                  >
                    <Navigation className="w-5 h-5 mr-2" />
                    Start Optimized Route
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Delivery List - 1 column */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Available Deliveries</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockDeliveries.map((delivery) => (
                    <div
                      key={delivery.id}
                      className={`p-4 border-2 rounded-lg transition-all cursor-pointer ${
                        selectedDeliveries.includes(delivery.id)
                          ? 'border-[#2563EB] bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => toggleDelivery(delivery.id)}
                    >
                      <div className="flex items-start gap-3">
                        <Checkbox
                          checked={selectedDeliveries.includes(delivery.id)}
                          onCheckedChange={() => toggleDelivery(delivery.id)}
                          className="mt-1"
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-gray-900">{delivery.item}</h3>
                            <UrgencyBadge level={delivery.urgency} />
                          </div>
                          <div className="space-y-1 text-gray-600">
                            <div className="flex items-start gap-1">
                              <Package className="w-4 h-4 mt-0.5 flex-shrink-0" />
                              <span>Pickup: {delivery.pickup}</span>
                            </div>
                            <div className="flex items-start gap-1">
                              <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                              <span>Dropoff: {delivery.dropoff}</span>
                            </div>
                            <div className="flex items-center gap-3 mt-2">
                              <span className="text-[#2563EB]">{delivery.distance}</span>
                              <span>•</span>
                              <span>{delivery.estimatedTime}</span>
                            </div>
                            <p className="text-gray-500 mt-1">
                              For: {delivery.recipient}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}