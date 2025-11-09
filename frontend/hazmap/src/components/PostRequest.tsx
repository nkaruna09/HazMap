import { useState } from 'react';
import { MapPin, AlertCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Checkbox } from './ui/checkbox';
import { UrgencyBadge, type UrgencyLevel } from './UrgencyBadge';
import { toast } from 'sonner@2.0.3';
import type { Page } from '../App';

interface PostRequestProps {
  onNavigate: (page: Page) => void;
}

const itemCategories = [
  { value: 'water', label: 'Water' },
  { value: 'food', label: 'Food' },
  { value: 'medical', label: 'Medical Supplies' },
  { value: 'shelter', label: 'Shelter Materials' },
  { value: 'power', label: 'Power/Batteries' },
  { value: 'baby', label: 'Baby Supplies' },
  { value: 'hygiene', label: 'Hygiene Products' },
  { value: 'clothing', label: 'Clothing' },
  { value: 'other', label: 'Other' },
];

const urgencyLevels: { value: UrgencyLevel; label: string }[] = [
  { value: 'critical', label: 'Critical - Life threatening' },
  { value: 'high', label: 'High - Needed within 24 hours' },
  { value: 'medium', label: 'Medium - Needed within 3 days' },
  { value: 'low', label: 'Low - Needed when available' },
];

export function PostRequest({ onNavigate }: PostRequestProps) {
  const [itemType, setItemType] = useState('');
  const [itemName, setItemName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [urgency, setUrgency] = useState<UrgencyLevel>('medium');
  const [description, setDescription] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [city, setCity] = useState('');
  const [province, setProvince] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [contactMethod, setContactMethod] = useState('phone');
  const [specialNeeds, setSpecialNeeds] = useState({
    elderly: false,
    children: false,
    medical: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Request Posted!', {
      description: 'Your request is now visible to helpers in your area.',
    });
    setTimeout(() => {
      onNavigate('dashboard');
    }, 1500);
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h1 className="text-gray-900 mb-2">Post a Supply Request</h1>
          <p className="text-gray-600">Fill out the form below to request supplies. Your request will be visible to nearby helpers.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Form - 2 columns */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Request Details</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Item Category */}
                  <div className="space-y-2">
                    <Label htmlFor="category">Item Category *</Label>
                    <Select value={itemType} onValueChange={setItemType} required>
                      <SelectTrigger id="category" className="h-12">
                        <SelectValue placeholder="Select category..." />
                      </SelectTrigger>
                      <SelectContent>
                        {itemCategories.map((cat) => (
                          <SelectItem key={cat.value} value={cat.value}>
                            {cat.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Item Name */}
                  <div className="space-y-2">
                    <Label htmlFor="itemName">Specific Item Name *</Label>
                    <Input
                      id="itemName"
                      placeholder="e.g., Bottled water, Canned beans, First aid kit"
                      value={itemName}
                      onChange={(e) => setItemName(e.target.value)}
                      className="h-12"
                      required
                    />
                  </div>

                  {/* Quantity */}
                  <div className="space-y-2">
                    <Label htmlFor="quantity">Quantity Needed *</Label>
                    <Input
                      id="quantity"
                      placeholder="e.g., 24 bottles, 10 cans, 1 kit"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      className="h-12"
                      required
                    />
                  </div>

                  {/* Urgency Level */}
                  <div className="space-y-2">
                    <Label htmlFor="urgency">Urgency Level *</Label>
                    <Select value={urgency} onValueChange={(val) => setUrgency(val as UrgencyLevel)} required>
                      <SelectTrigger id="urgency" className="h-12">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {urgencyLevels.map((level) => (
                          <SelectItem key={level.value} value={level.value}>
                            {level.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Description */}
                  <div className="space-y-2">
                    <Label htmlFor="description">Additional Details</Label>
                    <Textarea
                      id="description"
                      placeholder="Any additional information that might be helpful..."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      rows={4}
                    />
                  </div>

                  {/* Location */}
                  <div className="space-y-2">
                    <Label>Location *</Label>
                    <div className="space-y-3">
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <Input
                          id="streetAddress"
                          placeholder="Street Address"
                          value={streetAddress}
                          onChange={(e) => setStreetAddress(e.target.value)}
                          className="h-12 pl-10"
                          required
                        />
                      </div>
                      <Input
                        id="city"
                        placeholder="City"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="h-12"
                        required
                      />
                      <div className="grid grid-cols-2 gap-3">
                        <Input
                          id="province"
                          placeholder="Province"
                          value={province}
                          onChange={(e) => setProvince(e.target.value)}
                          className="h-12"
                          required
                        />
                        <Input
                          id="postalCode"
                          placeholder="Postal Code"
                          value={postalCode}
                          onChange={(e) => setPostalCode(e.target.value)}
                          className="h-12"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Contact Method */}
                  <div className="space-y-2">
                    <Label>Preferred Contact Method *</Label>
                    <div className="flex gap-4">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="contact"
                          value="phone"
                          checked={contactMethod === 'phone'}
                          onChange={(e) => setContactMethod(e.target.value)}
                          className="w-4 h-4"
                        />
                        <span>Phone</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="contact"
                          value="email"
                          checked={contactMethod === 'email'}
                          onChange={(e) => setContactMethod(e.target.value)}
                          className="w-4 h-4"
                        />
                        <span>Email</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="contact"
                          value="app"
                          checked={contactMethod === 'app'}
                          onChange={(e) => setContactMethod(e.target.value)}
                          className="w-4 h-4"
                        />
                        <span>In-App Message</span>
                      </label>
                    </div>
                  </div>

                  {/* Special Needs */}
                  <div className="space-y-3">
                    <Label>Special Considerations</Label>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Checkbox
                          id="elderly"
                          checked={specialNeeds.elderly}
                          onCheckedChange={(checked) =>
                            setSpecialNeeds({ ...specialNeeds, elderly: checked as boolean })
                          }
                        />
                        <label htmlFor="elderly" className="cursor-pointer">
                          Elderly person in household
                        </label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Checkbox
                          id="children"
                          checked={specialNeeds.children}
                          onCheckedChange={(checked) =>
                            setSpecialNeeds({ ...specialNeeds, children: checked as boolean })
                          }
                        />
                        <label htmlFor="children" className="cursor-pointer">
                          Children in household
                        </label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Checkbox
                          id="medical"
                          checked={specialNeeds.medical}
                          onCheckedChange={(checked) =>
                            setSpecialNeeds({ ...specialNeeds, medical: checked as boolean })
                          }
                        />
                        <label htmlFor="medical" className="cursor-pointer">
                          Medical conditions or disabilities
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4">
                    <Button
                      type="submit"
                      className="w-full h-12 bg-[#2563EB] hover:bg-[#2563EB]/90"
                    >
                      Submit Request
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Preview - 1 column */}
          <div className="lg:col-span-1">
            <Card className="sticky top-20">
              <CardHeader>
                <CardTitle>Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-gray-900 mb-1">
                          {itemName || 'Your Item Name'}
                        </h3>
                        <UrgencyBadge level={urgency} />
                      </div>
                    </div>
                    <div className="space-y-2 text-gray-600">
                      <p>
                        <strong>Quantity:</strong> {quantity || 'Not specified'}
                      </p>
                      <p>
                        <strong>Category:</strong>{' '}
                        {itemCategories.find((c) => c.value === itemType)?.label || 'Not selected'}
                      </p>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span>
                          {streetAddress || city || province || postalCode
                            ? `${streetAddress}${city ? `, ${city}` : ''}${province ? `, ${province}` : ''}${postalCode ? ` ${postalCode}` : ''}`
                            : 'Location not set'}
                        </span>
                      </div>
                      {description && (
                        <p className="pt-2 border-t border-gray-200">{description}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-start gap-2 p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <AlertCircle className="w-5 h-5 text-[#2563EB] flex-shrink-0 mt-0.5" />
                    <p className="text-[#2563EB]">
                      Your request will be visible to volunteers and suppliers in your area.
                    </p>
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