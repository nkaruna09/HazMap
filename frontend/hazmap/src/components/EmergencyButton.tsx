import { Phone } from 'lucide-react';
import { Button } from './ui/button';
import { toast } from 'sonner@2.0.3';

export function EmergencyButton() {
  const handleEmergencyClick = () => {
    toast.error('Emergency Services', {
      description: 'Call 911 for immediate emergency assistance',
      duration: 10000,
    });
  };

  return (
    <Button
      onClick={handleEmergencyClick}
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#EF4444] hover:bg-[#EF4444]/90 shadow-lg"
      size="icon"
    >
      <Phone className="w-6 h-6 text-white" />
      <span className="sr-only">Emergency Contact</span>
    </Button>
  );
}
