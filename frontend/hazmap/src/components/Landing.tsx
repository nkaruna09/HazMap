import { useState } from 'react';
import { Users, Package, TrendingUp } from 'lucide-react';
import { MapView } from './MapView';
import { SupplyCard, type SupplyItem } from './SupplyCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ScrollArea } from './ui/scroll-area';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from './ui/alert-dialog';
import type { Page } from '../App';

const mockRequests: SupplyItem[] = [
  {
    id: '1',
    name: 'Bottled Water',
    category: 'water',
    quantity: '50 bottles',
    distance: '0.8 mi',
    urgency: 'critical',
    location: 'Downtown Shelter',
  },
  {
    id: '2',
    name: 'Baby Formula',
    category: 'baby',
    quantity: '5 cans',
    distance: '1.2 mi',
    urgency: 'high',
    location: 'Riverside Community',
  },
  {
    id: '3',
    name: 'First Aid Supplies',
    category: 'medical',
    quantity: '1 kit',
    distance: '2.1 mi',
    urgency: 'high',
    location: 'East Side',
  },
  {
    id: '4',
    name: 'Non-perishable Food',
    category: 'food',
    quantity: '20 meals',
    distance: '3.5 mi',
    urgency: 'medium',
    location: 'Northbrook',
  },
  {
    id: '5',
    name: 'Portable Generator',
    category: 'power',
    quantity: '1 unit',
    distance: '4.2 mi',
    urgency: 'medium',
    location: 'West Valley',
  },
];

const mockSupplies: SupplyItem[] = [
  {
    id: '6',
    name: 'Blankets',
    category: 'shelter',
    quantity: '15 pieces',
    distance: '1.5 mi',
    urgency: 'low',
    location: 'Central District',
    requester: 'Sarah M.',
  },
  {
    id: '7',
    name: 'Canned Food',
    category: 'food',
    quantity: '30 cans',
    distance: '2.3 mi',
    urgency: 'low',
    location: 'Maple Street',
    requester: 'John D.',
  },
  {
    id: '8',
    name: 'Flashlights & Batteries',
    category: 'power',
    quantity: '10 sets',
    distance: '0.9 mi',
    urgency: 'low',
    location: 'Oak Avenue',
    requester: 'Maria G.',
  },
  {
    id: '9',
    name: 'Hygiene Kits',
    category: 'medical',
    quantity: '25 kits',
    distance: '3.1 mi',
    urgency: 'low',
    location: 'Pine Hill',
    requester: 'Community Center',
  },
];

const mockMapPins = [
  { id: '1', type: 'request' as const, lat: 0, lng: 0, label: 'Water Request' },
  { id: '2', type: 'request' as const, lat: 0, lng: 0, label: 'Baby Formula' },
  { id: '3', type: 'supply' as const, lat: 0, lng: 0, label: 'Blankets' },
  { id: '4', type: 'supply' as const, lat: 0, lng: 0, label: 'Food' },
  { id: '5', type: 'volunteer' as const, lat: 0, lng: 0, label: 'Driver' },
  { id: '6', type: 'volunteer' as const, lat: 0, lng: 0, label: 'Driver' },
  { id: '7', type: 'shelter' as const, lat: 0, lng: 0, label: 'Shelter' },
  { id: '8', type: 'shelter' as const, lat: 0, lng: 0, label: 'Donation Center' },
];

export function Landing({ onNavigate }: { onNavigate: (page: Page) => void }) {
  const [activeTab, setActiveTab] = useState('requests');
  const [confirmDialog, setConfirmDialog] = useState<{
    open: boolean;
    type: 'help' | 'need';
    item: SupplyItem | null;
  }>({
    open: false,
    type: 'help',
    item: null,
  });

  const handleHelp = (id: string) => {
    const item = mockRequests.find(req => req.id === id);
    if (item) {
      setConfirmDialog({ open: true, type: 'help', item });
    }
  };

  const handleNeed = (id: string) => {
    const item = mockSupplies.find(sup => sup.id === id);
    if (item) {
      setConfirmDialog({ open: true, type: 'need', item });
    }
  };

  const handleConfirm = () => {
    setConfirmDialog({ open: false, type: 'help', item: null });
    onNavigate('matches');
  };

  const handleCancel = () => {
    setConfirmDialog({ open: false, type: 'help', item: null });
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section with Map */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-orange-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Map - Takes up 2 columns on large screens */}
            <div className="lg:col-span-2">
              <MapView pins={mockMapPins} className="h-[500px]" />
            </div>

            {/* Sidebar - Takes up 1 column */}
            <div className="lg:col-span-1">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="requests">Urgent Requests</TabsTrigger>
                  <TabsTrigger value="supplies">Available Supplies</TabsTrigger>
                </TabsList>

                <TabsContent value="requests" className="flex-1 mt-4">
                  <ScrollArea className="h-[440px] pr-4">
                    <div className="space-y-3">
                      {mockRequests.map((item) => (
                        <SupplyCard
                          key={item.id}
                          item={item}
                          type="request"
                          onHelp={handleHelp}
                        />
                      ))}
                    </div>
                  </ScrollArea>
                </TabsContent>

                <TabsContent value="supplies" className="flex-1 mt-4">
                  <ScrollArea className="h-[440px] pr-4">
                    <div className="space-y-3">
                      {mockSupplies.map((item) => (
                        <SupplyCard
                          key={item.id}
                          item={item}
                          type="offer"
                          onNeed={handleNeed}
                        />
                      ))}
                    </div>
                  </ScrollArea>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-orange-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center gap-4 p-4 bg-gradient-to-br from-red-50 to-orange-50 rounded-lg border border-orange-200">
              <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-gray-600">People Helped Today</p>
                <p className="text-gray-900">1,247</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-gradient-to-br from-amber-50 to-yellow-50 rounded-lg border border-amber-200">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-yellow-500 rounded-full flex items-center justify-center shadow-lg">
                <Package className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-gray-600">Items Matched</p>
                <p className="text-gray-900">3,842</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-gradient-to-br from-orange-50 to-red-50 rounded-lg border border-orange-200">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center shadow-lg">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-gray-600">Active Volunteers</p>
                <p className="text-gray-900">428</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Dialog */}
      <AlertDialog open={confirmDialog.open} onOpenChange={(open) => {
        if (!open) handleCancel();
      }}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {confirmDialog.type === 'help' ? 'Confirm Help' : 'Confirm Need'}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {confirmDialog.type === 'help' ? (
                <>
                  You are about to help with <strong>{confirmDialog.item?.name}</strong> at{' '}
                  <strong>{confirmDialog.item?.location}</strong>. This will create a match and you'll be able to coordinate details in your My Matches page.
                </>
              ) : (
                <>
                  You are requesting <strong>{confirmDialog.item?.name}</strong> from{' '}
                  <strong>{confirmDialog.item?.requester}</strong> at{' '}
                  <strong>{confirmDialog.item?.location}</strong>. This will create a match and you'll be able to coordinate details in your My Matches page.
                </>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleCancel}>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleConfirm}
              className="bg-[#F97316] hover:bg-[#F97316]/90"
            >
              Confirm & Go to Matches
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}