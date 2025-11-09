import { useState } from 'react';
import { MapPin, Upload, AlertCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { toast } from 'sonner';
import type { Page } from '../App';

interface OfferSupplyProps {
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

const conditionOptions = [
  { value: 'new', label: 'New' },
  { value: 'like-new', label: 'Like New' },
  { value: 'good', label: 'Good' },
  { value: 'fair', label: 'Fair' },
];

export function OfferSupply({ onNavigate }: OfferSupplyProps) {
  const [itemType, setItemType] = useState('');
  const [itemName, setItemName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [condition, setCondition] = useState('');
  const [description, setDescription] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [city, setCity] = useState('');
  const [province, setProvince] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [availableUntil, setAvailableUntil] = useState('');
  const [deliveryOption, setDeliveryOption] = useState('pickup');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
        itemType,
        itemName,
        quantity,
        condition,
        description,
        streetAddress,
        city,
        province,
        postalCode,
        availableUntil,
        deliveryOption,
    };

    try {
        const response = await fetch('http://localhost:5000/api/data', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
        });

        if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
        }

        toast.success('Supply Offer Posted!', {
        description: 'Your offer is now visible to those in need.',
        });

        setTimeout(() => {
        onNavigate('dashboard');
        }, 1500);
    } catch (error) {
        console.error('Failed to post supply offer:', error);
        toast.error('Failed to post offer. Please try again.');
    }
    };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h1 className="text-gray-900 mb-2">Offer Supplies</h1>
          <p className="text-gray-600">Share what you can spare to help those in need during this crisis.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Form - 2 columns */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Supply Details</CardTitle>
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
                      placeholder="e.g., Bottled water, Blankets, Flashlights"
                      value={itemName}
                      onChange={(e) => setItemName(e.target.value)}
                      className="h-12"
                      required
                    />
                  </div>

                  {/* Quantity */}
                  <div className="space-y-2">
                    <Label htmlFor="quantity">Quantity Available *</Label>
                    <Input
                      id="quantity"
                      placeholder="e.g., 24 bottles, 5 blankets, 10 batteries"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      className="h-12"
                      required
                    />
                  </div>

                  {/* Condition */}
                  <div className="space-y-2">
                    <Label htmlFor="condition">Condition *</Label>
                    <Select value={condition} onValueChange={setCondition} required>
                      <SelectTrigger id="condition" className="h-12">
                        <SelectValue placeholder="Select condition..." />
                      </SelectTrigger>
                      <SelectContent>
                        {conditionOptions.map((opt) => (
                          <SelectItem key={opt.value} value={opt.value}>
                            {opt.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Description */}
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Provide any additional details about the items..."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      rows={4}
                    />
                  </div>

                  {/* Available Until */}
                  <div className="space-y-2">
                    <Label htmlFor="availableUntil">Available Until</Label>
                    <Input
                      id="availableUntil"
                      type="date"
                      value={availableUntil}
                      onChange={(e) => setAvailableUntil(e.target.value)}
                      className="h-12"
                    />
                  </div>

                  {/* Delivery Option */}
                  <div className="space-y-2">
                    <Label>Delivery Option *</Label>
                    <div className="flex gap-4">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="delivery"
                          value="pickup"
                          checked={deliveryOption === 'pickup'}
                          onChange={(e) => setDeliveryOption(e.target.value)}
                          className="w-4 h-4"
                        />
                        <span>Pickup Only</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="delivery"
                          value="delivery"
                          checked={deliveryOption === 'delivery'}
                          onChange={(e) => setDeliveryOption(e.target.value)}
                          className="w-4 h-4"
                        />
                        <span>Can Deliver</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="delivery"
                          value="both"
                          checked={deliveryOption === 'both'}
                          onChange={(e) => setDeliveryOption(e.target.value)}
                          className="w-4 h-4"
                        />
                        <span>Either</span>
                      </label>
                    </div>
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

                  {/* Photo Upload */}
                  <div className="space-y-2">
                    <Label htmlFor="photos">Photos (Optional)</Label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors cursor-pointer">
                      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-600 mb-1">
                        Drag and drop photos here, or click to browse
                      </p>
                      <p className="text-gray-400">
                        PNG, JPG up to 10MB
                      </p>
                      <input
                        id="photos"
                        type="file"
                        multiple
                        accept="image/*"
                        className="hidden"
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4">
                    <Button
                      type="submit"
                      className="w-full h-12 bg-[#10B981] hover:bg-[#10B981]/90"
                    >
                      Post Offer
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
                    <div className="mb-3">
                      <h3 className="text-gray-900 mb-1">
                        {itemName || 'Your Item Name'}
                      </h3>
                      {condition && (
                        <span className="inline-block px-2 py-1 bg-green-100 text-green-800 rounded">
                          {conditionOptions.find((c) => c.value === condition)?.label}
                        </span>
                      )}
                    </div>
                    <div className="space-y-2 text-gray-600">
                      <p>
                        <strong>Quantity:</strong> {quantity || 'Not specified'}
                      </p>
                      <p>
                        <strong>Category:</strong>{' '}
                        {itemCategories.find((c) => c.value === itemType)?.label || 'Not selected'}
                      </p>
                      <p>
                        <strong>Delivery:</strong>{' '}
                        {deliveryOption === 'pickup'
                          ? 'Pickup Only'
                          : deliveryOption === 'delivery'
                          ? 'Can Deliver'
                          : deliveryOption === 'both'
                          ? 'Pickup or Delivery'
                          : 'Not specified'}
                      </p>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span>
                          {streetAddress && city && province && postalCode
                            ? `${streetAddress}, ${city}, ${province} ${postalCode}`
                            : 'Location not set'}
                        </span>
                      </div>
                      {availableUntil && (
                        <p>
                          <strong>Available Until:</strong> {new Date(availableUntil).toLocaleDateString()}
                        </p>
                      )}
                      {description && (
                        <p className="pt-2 border-t border-gray-200">{description}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-start gap-2 p-3 bg-green-50 rounded-lg border border-green-200">
                    <AlertCircle className="w-5 h-5 text-[#10B981] flex-shrink-0 mt-0.5" />
                    <p className="text-[#10B981]">
                      Thank you for helping! Your offer will be matched with those in need.
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