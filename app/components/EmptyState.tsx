'use client';

import { useState } from 'react';
import { Gift as GiftIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTRPC } from '../trpc/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

interface EmptyStateProps {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

// Define the type for sample gifts to match the expected input type
type SampleGift = {
  productName: string;
  description: string;
  price: string;
  importanceLevel: 'HIGH' | 'MEDIUM' | 'LOW';
};

// Sample gift data
const sampleGifts: SampleGift[] = [
  {
    productName: 'Wireless Headphones',
    description: 'Noise-cancelling Bluetooth headphones',
    price: '199.99',
    importanceLevel: 'HIGH',
  },
  {
    productName: 'Smart Watch',
    description: 'Fitness and health tracking watch',
    price: '249.99',
    importanceLevel: 'MEDIUM',
  },
  {
    productName: 'Portable Bluetooth Speaker',
    description: 'Waterproof speaker with 20-hour battery life',
    price: '79.99',
    importanceLevel: 'LOW',
  },
  {
    productName: 'E-reader',
    description: 'Paperwhite e-reader with adjustable light',
    price: '129.99',
    importanceLevel: 'MEDIUM',
  },
  {
    productName: 'Coffee Maker',
    description: 'Programmable coffee maker with thermal carafe',
    price: '89.99',
    importanceLevel: 'HIGH',
  },
  {
    productName: 'Yoga Mat',
    description: 'Non-slip exercise mat for yoga and fitness',
    price: '29.99',
    importanceLevel: 'LOW',
  },
  {
    productName: 'Digital Camera',
    description: 'Mirrorless camera with 4K video capability',
    price: '699.99',
    importanceLevel: 'HIGH',
  },
  {
    productName: 'Board Game',
    description: 'Strategic board game for 2-4 players',
    price: '39.99',
    importanceLevel: 'LOW',
  },
  {
    productName: 'Kitchen Knife Set',
    description: 'Professional chef knife set with block',
    price: '149.99',
    importanceLevel: 'MEDIUM',
  },
  {
    productName: 'Wireless Charging Pad',
    description: 'Fast-charging wireless charger for phones',
    price: '24.99',
    importanceLevel: 'LOW',
  },
  {
    productName: 'Tablet',
    description: '10-inch tablet with high-resolution display',
    price: '349.99',
    importanceLevel: 'MEDIUM',
  },
  {
    productName: 'Hiking Backpack',
    description: 'Waterproof backpack with multiple compartments',
    price: '79.99',
    importanceLevel: 'LOW',
  },
  {
    productName: 'Smart Home Speaker',
    description: 'Voice-controlled speaker with assistant',
    price: '99.99',
    importanceLevel: 'MEDIUM',
  },
  {
    productName: 'Fitness Tracker',
    description: 'Waterproof activity tracker with heart rate monitor',
    price: '59.99',
    importanceLevel: 'LOW',
  },
  {
    productName: 'Gaming Console',
    description: 'Latest generation gaming system with controller',
    price: '499.99',
    importanceLevel: 'HIGH',
  },
];

export function EmptyState({
  title,
  description,
  actionLabel,
  onAction,
}: EmptyStateProps) {
  const [showSampleOption, setShowSampleOption] = useState(
    title === 'No gifts yet'
  );
  const [isAddingSamples, setIsAddingSamples] = useState(false);
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  // Create mutation for adding gifts
  const createMutation = useMutation({
    ...trpc.gifts.create.mutationOptions(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [['gifts', 'getAll']] });
    },
    onError: (error) => {
      toast.error(error.message);
      console.error(error);
    },
  });

  // Function to add sample gifts
  const addSampleGifts = async () => {
    setIsAddingSamples(true);
    setShowSampleOption(false);

    let successCount = 0;

    try {
      // Add each sample gift sequentially
      for (const gift of sampleGifts) {
        await createMutation.mutateAsync(gift);
        successCount++;
      }

      toast.success(`Added ${successCount} sample gifts to your list!`);
    } catch (error) {
      console.error('Error adding sample gifts:', error);
      if (successCount > 0) {
        toast.success(`Added ${successCount} sample gifts to your list!`);
      }
      toast.error('Failed to add all sample gifts. Please try again.');
    } finally {
      setIsAddingSamples(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-12 text-center border rounded-md bg-gray-50">
      <div className="rounded-full bg-gray-100 p-4 mb-4">
        <GiftIcon className="h-10 w-10 text-[#3D5A80]" />
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-1">{title}</h3>
      <p className="text-sm text-gray-500 max-w-md mb-6">{description}</p>
      <div className="flex flex-col gap-3">
        {actionLabel && onAction && (
          <Button
            onClick={onAction}
            className="bg-[#3D5A80] hover:bg-[#2A4A70]"
          >
            {actionLabel}
          </Button>
        )}

        {showSampleOption && (
          <div className="mt-4 flex flex-col items-center">
            <p className="text-sm text-gray-500 mb-2">
              Would you like to add some sample gifts to get started?
            </p>
            <div className="flex gap-2">
              <Button
                onClick={addSampleGifts}
                disabled={isAddingSamples}
                className="bg-[#3D5A80] hover:bg-[#2A4A70]"
              >
                {isAddingSamples ? 'Adding Samples...' : 'Yes, Add Samples'}
              </Button>
              <Button
                onClick={() => setShowSampleOption(false)}
                variant="outline"
                className="border-[#3D5A80] text-[#3D5A80]"
              >
                No, Thanks
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
