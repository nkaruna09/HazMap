import { Award, Package, Users, Clock, Star, MapPin, Phone, Mail, Bell, Shield, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { Separator } from './ui/separator';
import { Badge } from './ui/badge';

const achievements = [
  {
    id: '1',
    name: 'First Match',
    description: 'Completed your first supply match',
    icon: Star,
    earned: true,
    color: 'text-yellow-600',
  },
  {
    id: '2',
    name: 'Community Hero',
    description: 'Helped 10+ people',
    icon: Users,
    earned: true,
    color: 'text-blue-600',
  },
  {
    id: '3',
    name: '10+ Deliveries',
    description: 'Completed 10 volunteer deliveries',
    icon: Package,
    earned: true,
    color: 'text-green-600',
  },
  {
    id: '4',
    name: 'Quick Responder',
    description: 'Responded to critical request within 1 hour',
    icon: Clock,
    earned: false,
    color: 'text-orange-600',
  },
  {
    id: '5',
    name: 'Trusted Helper',
    description: 'Achieved 5-star rating',
    icon: Shield,
    earned: false,
    color: 'text-purple-600',
  },
];

export function Profile() {
  return (
    <div className="min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h1 className="text-gray-900 mb-2">Profile & Settings</h1>
          <p className="text-gray-600">Manage your account and view your community impact.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Info - 1 column */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <Avatar className="w-24 h-24 mb-4">
                    <AvatarImage src="" />
                    <AvatarFallback className="bg-[#2563EB] text-white">JD</AvatarFallback>
                  </Avatar>
                  <h2 className="text-gray-900 mb-1">Jane Doe</h2>
                  <p className="text-gray-600 mb-1">Age: 32</p>
                  <p className="text-gray-600 mb-4">Member since Nov 2024</p>
                  
                  {/* Trust Score */}
                  <div className="w-full p-4 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg mb-4">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                      <span className="text-gray-900">Trust Score</span>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-gray-900">4.9</span>
                      <div className="flex gap-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      </div>
                    </div>
                    <p className="text-gray-600 mt-2">Based on 23 reviews</p>
                  </div>

                  <Button variant="outline" className="w-full">
                    Edit Profile
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Stats */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Your Impact</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Package className="w-5 h-5 text-[#2563EB]" />
                      <span className="text-gray-600">Items Donated</span>
                    </div>
                    <span className="text-gray-900">18</span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Users className="w-5 h-5 text-[#10B981]" />
                      <span className="text-gray-600">People Helped</span>
                    </div>
                    <span className="text-gray-900">27</span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Clock className="w-5 h-5 text-[#F97316]" />
                      <span className="text-gray-600">Volunteer Hours</span>
                    </div>
                    <span className="text-gray-900">42</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content - 2 columns */}
          <div className="lg:col-span-2 space-y-6">
            {/* Achievements */}
            <Card>
              <CardHeader>
                <CardTitle>Achievements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {achievements.map((achievement) => {
                    const Icon = achievement.icon;
                    return (
                      <div
                        key={achievement.id}
                        className={`p-4 rounded-lg border-2 ${
                          achievement.earned
                            ? 'border-green-200 bg-green-50'
                            : 'border-gray-200 bg-gray-50 opacity-60'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className={`w-12 h-12 rounded-full flex items-center justify-center ${
                              achievement.earned ? 'bg-white' : 'bg-gray-100'
                            }`}
                          >
                            <Icon className={`w-6 h-6 ${achievement.color}`} />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="text-gray-900">{achievement.name}</h3>
                              {achievement.earned && (
                                <Badge className="bg-[#10B981] hover:bg-[#10B981]">
                                  Earned
                                </Badge>
                              )}
                            </div>
                            <p className="text-gray-600">{achievement.description}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Personal Information */}
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="dob">Date of Birth</Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        id="dob"
                        type="date"
                        defaultValue="1992-06-15"
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        id="location"
                        placeholder="City, State"
                        defaultValue="San Francisco, CA"
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input
                          id="phone"
                          placeholder="(555) 123-4567"
                          defaultValue="(555) 123-4567"
                          className="pl-10"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="email@example.com"
                          defaultValue="jane.doe@email.com"
                          className="pl-10"
                        />
                      </div>
                    </div>
                  </div>
                  <Button className="bg-[#2563EB] hover:bg-[#2563EB]/90">
                    Save Changes
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Notification Settings */}
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Bell className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-gray-900">New Match Notifications</p>
                        <p className="text-gray-500">Get notified when someone matches your request</p>
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Bell className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-gray-900">Critical Requests Nearby</p>
                        <p className="text-gray-500">Alert for urgent requests in your area</p>
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Bell className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-gray-900">Delivery Updates</p>
                        <p className="text-gray-500">Track delivery status in real-time</p>
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Bell className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-gray-900">Weekly Summary</p>
                        <p className="text-gray-500">Receive weekly impact reports</p>
                      </div>
                    </div>
                    <Switch />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}