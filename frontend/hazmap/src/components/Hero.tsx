import { Heart, MapPin, Users, ArrowRight, Package, Truck, MessageSquare } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import type { Page } from '../App';

interface HeroProps {
  onNavigate: (page: Page) => void;
}

export function Hero({ onNavigate }: HeroProps) {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-red-600 via-orange-600 to-amber-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                <Heart className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-white">HazMap</h1>
            </div>
            <p className="text-white/90 mb-8 max-w-3xl mx-auto">
              Connecting communities in times of crisis. HazMap is a peer-to-peer disaster relief platform that instantly matches people who need supplies with those who have them, and volunteers who can help deliver.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => onNavigate('dashboard')}
                size="lg"
                className="bg-white text-orange-600 hover:bg-gray-100 min-h-[48px]"
              >
                Get Started
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button 
                onClick={() => onNavigate('post-request')}
                size="lg"
                variant="outline"
                className="bg-transparent border-2 border-white text-white hover:bg-white/10 min-h-[48px]"
              >
                Request Help Now
              </Button>
            </div>
          </div>

          {/* Feature Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center border border-white/20">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div className="text-white mb-2">1,247+</div>
              <p className="text-white/90">People Helped Today</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center border border-white/20">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Package className="w-6 h-6 text-white" />
              </div>
              <div className="text-white mb-2">3,842+</div>
              <p className="text-white/90">Items Matched</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center border border-white/20">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="w-6 h-6 text-white" />
              </div>
              <div className="text-white mb-2">428+</div>
              <p className="text-white/90">Active Volunteers</p>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="bg-white/80 backdrop-blur-sm py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-gray-900 mb-4">How HazMap Works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our platform makes disaster relief simple, fast, and effective by connecting those in need directly with helpers in their community.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <Card className="border-2 border-orange-200 bg-gradient-to-br from-orange-50 to-red-50">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-orange-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                  <MapPin className="w-8 h-8 text-white" />
                </div>
                <div className="mb-2 text-gray-900">1. Post Your Need</div>
                <p className="text-gray-600 mb-4">
                  Quickly post what supplies you need or what you can offer. Our smart system uses your location to find the best matches nearby.
                </p>
                <Button 
                  onClick={() => onNavigate('post-request')}
                  variant="outline"
                  className="w-full border-orange-300 text-orange-700 hover:bg-orange-50"
                >
                  Post Request
                </Button>
              </CardContent>
            </Card>

            {/* Step 2 */}
            <Card className="border-2 border-amber-200 bg-gradient-to-br from-amber-50 to-yellow-50">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-yellow-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <div className="mb-2 text-gray-900">2. Get Matched</div>
                <p className="text-gray-600 mb-4">
                  Our platform instantly matches you with suppliers or people who need what you're offering. Review matches and connect in seconds.
                </p>
                <Button 
                  onClick={() => onNavigate('dashboard')}
                  variant="outline"
                  className="w-full border-amber-300 text-amber-700 hover:bg-amber-50"
                >
                  View Dashboard
                </Button>
              </CardContent>
            </Card>

            {/* Step 3 */}
            <Card className="border-2 border-orange-200 bg-gradient-to-br from-orange-50 to-red-50">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                  <MessageSquare className="w-8 h-8 text-white" />
                </div>
                <div className="mb-2 text-gray-900">3. Coordinate & Help</div>
                <p className="text-gray-600 mb-4">
                  Chat with matches to coordinate pickup or delivery. Volunteers can help deliver supplies to those who need them most.
                </p>
                <Button 
                  onClick={() => onNavigate('matches')}
                  variant="outline"
                  className="w-full border-orange-300 text-orange-700 hover:bg-orange-50"
                >
                  My Matches
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gradient-to-br from-orange-50 to-amber-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-gray-900 mb-4">Built for Crisis Situations</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              HazMap is designed with accessibility, speed, and trust at its core to help communities respond quickly during disasters.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-orange-200">
              <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-orange-500 rounded-lg flex items-center justify-center mb-4">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-gray-900 mb-2">Location-Based Matching</h3>
              <p className="text-gray-600">Find help nearby with real-time distance tracking and interactive maps.</p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-amber-200">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-yellow-500 rounded-lg flex items-center justify-center mb-4">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-gray-900 mb-2">Urgency Indicators</h3>
              <p className="text-gray-600">Color-coded priority levels help you identify critical needs at a glance.</p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-orange-200">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center mb-4">
                <MessageSquare className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-gray-900 mb-2">Real-Time Chat</h3>
              <p className="text-gray-600">Coordinate details quickly with built-in messaging between matches.</p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-red-200">
              <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-pink-500 rounded-lg flex items-center justify-center mb-4">
                <Truck className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-gray-900 mb-2">Volunteer Network</h3>
              <p className="text-gray-600">Drivers can help deliver supplies with optimized route planning.</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-red-600 via-orange-600 to-amber-600 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-white mb-4">Ready to Make a Difference?</h2>
          <p className="text-white/90 mb-8 text-lg">
            Join thousands of community members helping each other during times of crisis.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => onNavigate('offer-supply')}
              size="lg"
              className="bg-white text-orange-600 hover:bg-gray-100 min-h-[48px]"
            >
              Offer Supplies
            </Button>
            <Button 
              onClick={() => onNavigate('post-request')}
              size="lg"
              variant="outline"
              className="bg-transparent border-2 border-white text-white hover:bg-white/10 min-h-[48px]"
            >
              Request Help
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
