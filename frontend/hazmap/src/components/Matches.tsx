import { useState } from 'react';
import { Search, Check, AlertTriangle, Send, UserX } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { ScrollArea } from './ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
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
import { StatusBadge, type Status } from './StatusBadge';
import { toast } from 'sonner@2.0.3';

interface Match {
  id: string;
  name: string;
  avatar?: string;
  item: string;
  status: Status;
  matchScore: number;
  distance: string;
  lastMessage: string;
  timestamp: string;
  messages: Message[];
}

interface Message {
  id: string;
  sender: 'me' | 'them';
  text: string;
  timestamp: string;
}

const mockMatches: Match[] = [
  {
    id: '1',
    name: 'Sarah Martinez',
    item: 'Bottled Water (24 pack)',
    status: 'matched',
    matchScore: 98,
    distance: '0.8 mi',
    lastMessage: 'I can drop it off this afternoon!',
    timestamp: '5 min ago',
    messages: [
      { id: '1', sender: 'them', text: 'Hi! I saw you need water. I have 24 bottles available.', timestamp: '10:30 AM' },
      { id: '2', sender: 'me', text: 'That would be amazing! When can you deliver?', timestamp: '10:32 AM' },
      { id: '3', sender: 'them', text: 'I can drop it off this afternoon!', timestamp: '10:35 AM' },
    ],
  },
  {
    id: '2',
    name: 'John Davis',
    item: 'Blankets (5 pieces)',
    status: 'in-transit',
    matchScore: 95,
    distance: '1.2 mi',
    lastMessage: 'On my way now!',
    timestamp: '15 min ago',
    messages: [
      { id: '1', sender: 'them', text: 'I have 5 warm blankets in good condition.', timestamp: '9:00 AM' },
      { id: '2', sender: 'me', text: 'Perfect! We really need those.', timestamp: '9:05 AM' },
      { id: '3', sender: 'them', text: 'On my way now!', timestamp: '11:45 AM' },
    ],
  },
  {
    id: '3',
    name: 'Community Center',
    item: 'Non-perishable Food',
    status: 'completed',
    matchScore: 92,
    distance: '2.3 mi',
    lastMessage: 'Delivery completed. Stay safe!',
    timestamp: '2 hours ago',
    messages: [
      { id: '1', sender: 'them', text: 'We have extra canned goods to share.', timestamp: 'Yesterday' },
      { id: '2', sender: 'me', text: 'Thank you so much!', timestamp: 'Yesterday' },
      { id: '3', sender: 'them', text: 'Delivery completed. Stay safe!', timestamp: '10:00 AM' },
    ],
  },
  {
    id: '4',
    name: 'Maria Garcia',
    item: 'First Aid Kit',
    status: 'matched',
    matchScore: 88,
    distance: '3.1 mi',
    lastMessage: 'Is pickup okay?',
    timestamp: '1 hour ago',
    messages: [
      { id: '1', sender: 'them', text: 'I have a first aid kit available.', timestamp: '11:00 AM' },
      { id: '2', sender: 'me', text: 'That would be great!', timestamp: '11:10 AM' },
      { id: '3', sender: 'them', text: 'Is pickup okay?', timestamp: '11:15 AM' },
    ],
  },
];

export function Matches() {
  const [matches, setMatches] = useState<Match[]>(mockMatches);
  const [selectedMatch, setSelectedMatch] = useState<Match>(mockMatches[0]);
  const [newMessage, setNewMessage] = useState('');
  const [unmatchDialogOpen, setUnmatchDialogOpen] = useState(false);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    toast.success('Message sent!');
    setNewMessage('');
  };

  const handleConfirmPickup = () => {
    toast.success('Pickup confirmed!', {
      description: 'The supplier has been notified.',
    });
  };

  const handleMarkComplete = () => {
    toast.success('Marked as complete!', {
      description: 'Thank you for helping your community.',
    });
  };

  const handleReportIssue = () => {
    toast.error('Issue reported', {
      description: 'Our team will review this match.',
    });
  };

  const handleOpenUnmatchDialog = () => {
    setUnmatchDialogOpen(true);
  };

  const handleConfirmUnmatch = () => {
    // Remove the selected match from the list
    const updatedMatches = matches.filter(m => m.id !== selectedMatch.id);
    setMatches(updatedMatches);
    
    // Select the first remaining match, if any
    if (updatedMatches.length > 0) {
      setSelectedMatch(updatedMatches[0]);
    }
    
    setUnmatchDialogOpen(false);
    
    toast.success('Match ended', {
      description: `You have unmatched with ${selectedMatch.name}.`,
    });
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h1 className="text-gray-900 mb-2">My Matches</h1>
          <p className="text-gray-600">Coordinate with helpers and recipients to complete supply deliveries.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Matches List - 1 column */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-0">
                <div className="p-4 border-b border-gray-200">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      placeholder="Search matches..."
                      className="pl-10"
                    />
                  </div>
                </div>
                <ScrollArea className="h-[600px]">
                  {matches.map((match) => (
                    <button
                      key={match.id}
                      onClick={() => setSelectedMatch(match)}
                      className={`w-full p-4 border-b border-gray-200 hover:bg-gray-50 text-left transition-colors ${
                        selectedMatch.id === match.id ? 'bg-blue-50 hover:bg-blue-50' : ''
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={match.avatar} />
                          <AvatarFallback>{match.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h3 className="text-gray-900 truncate">{match.name}</h3>
                            <span className="text-gray-400 flex-shrink-0 ml-2">
                              {match.timestamp}
                            </span>
                          </div>
                          <p className="text-gray-600 mb-1">{match.item}</p>
                          <div className="flex items-center gap-2 mb-2">
                            <StatusBadge status={match.status} />
                            <span className="text-gray-500">{match.distance}</span>
                          </div>
                          <p className="text-gray-500 truncate">{match.lastMessage}</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </ScrollArea>
              </CardContent>
            </Card>
          </div>

          {/* Chat Interface - 2 columns */}
          <div className="lg:col-span-2">
            <Card className="h-[694px] flex flex-col">
              {/* Chat Header */}
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={selectedMatch.avatar} />
                      <AvatarFallback>{selectedMatch.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h2 className="text-gray-900">{selectedMatch.name}</h2>
                      <p className="text-gray-600">{selectedMatch.item}</p>
                      <div className="flex items-center gap-3 mt-2">
                        <StatusBadge status={selectedMatch.status} />
                        <span className="text-gray-500">{selectedMatch.distance} away</span>
                        <span className="text-[#10B981]">
                          {selectedMatch.matchScore}% match
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      onClick={handleConfirmPickup}
                      className="bg-[#10B981] hover:bg-[#10B981]/90"
                      size="sm"
                    >
                      <Check className="w-4 h-4 mr-2" />
                      Confirm Pickup
                    </Button>
                    <Button
                      onClick={handleMarkComplete}
                      className="bg-[#2563EB] hover:bg-[#2563EB]/90"
                      size="sm"
                    >
                      <Check className="w-4 h-4 mr-2" />
                      Mark Complete
                    </Button>
                    <Button
                      onClick={handleReportIssue}
                      variant="outline"
                      size="sm"
                    >
                      <AlertTriangle className="w-4 h-4 mr-2" />
                      Report Issue
                    </Button>
                    <Button
                      onClick={handleOpenUnmatchDialog}
                      variant="outline"
                      size="sm"
                    >
                      <UserX className="w-4 h-4 mr-2" />
                      End Match
                    </Button>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {selectedMatch.messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[70%] rounded-lg p-3 ${
                          message.sender === 'me'
                            ? 'bg-[#2563EB] text-white'
                            : 'bg-gray-100 text-gray-900'
                        }`}
                      >
                        <p>{message.text}</p>
                        <p
                          className={`mt-1 ${
                            message.sender === 'me' ? 'text-blue-100' : 'text-gray-500'
                          }`}
                        >
                          {message.timestamp}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              {/* Quick Actions */}
              <div className="p-4 border-t border-gray-200 bg-gray-50">
                {/* Message Input */}
                <div className="flex gap-2">
                  <Textarea
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="resize-none"
                    rows={2}
                  />
                  <Button
                    onClick={handleSendMessage}
                    className="bg-[#2563EB] hover:bg-[#2563EB]/90"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Unmatch Confirmation Dialog */}
      <AlertDialog open={unmatchDialogOpen} onOpenChange={setUnmatchDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>End Match</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to end your match with {selectedMatch.name}? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmUnmatch}>
              End Match
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}