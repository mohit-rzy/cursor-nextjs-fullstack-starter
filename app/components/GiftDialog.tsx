'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTRPC } from '../trpc/react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { toast } from 'sonner';
import { useQueryClient } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';

// Form schema
const giftFormSchema = z.object({
  productName: z.string().min(1, 'Product name is required'),
  description: z.string().optional(),
  price: z.string().optional(),
  importanceLevel: z.enum(['HIGH', 'MEDIUM', 'LOW']).default('MEDIUM'),
});

type GiftFormValues = z.infer<typeof giftFormSchema>;

// Gift type
type Gift = {
  id: number;
  productName: string;
  description?: string | null;
  price?: string | null;
  importanceLevel: 'HIGH' | 'MEDIUM' | 'LOW';
  createdAt: string | Date;
  updatedAt?: string | Date;
  userId?: string;
};

type GiftDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: 'create' | 'edit';
  gift?: Gift;
};

export function GiftDialog({
  open,
  onOpenChange,
  mode,
  gift,
}: GiftDialogProps) {
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize form with default values
  const form = useForm<GiftFormValues>({
    resolver: zodResolver(giftFormSchema),
    defaultValues: {
      productName: '',
      description: '',
      price: '',
      importanceLevel: 'MEDIUM',
    },
  });

  // Update form values when editing a gift
  useEffect(() => {
    if (mode === 'edit' && gift) {
      form.reset({
        productName: gift.productName,
        description: gift.description || '',
        price: gift.price || '',
        importanceLevel: gift.importanceLevel,
      });
    }
  }, [form, gift, mode]);

  // Create mutation
  const createMutation = useMutation({
    ...trpc.gifts.create.mutationOptions(),
    onSuccess: () => {
      toast.success('Gift added successfully');
      queryClient.invalidateQueries({ queryKey: [['gifts', 'getAll']] });
      onOpenChange(false);
      form.reset();
    },
    onError: (error) => {
      toast.error(error.message);
      console.error(error);
    },
  });

  // Update mutation
  const updateMutation = useMutation({
    ...trpc.gifts.update.mutationOptions(),
    onSuccess: () => {
      toast.success('Gift updated successfully');
      queryClient.invalidateQueries({ queryKey: [['gifts', 'getAll']] });
      queryClient.invalidateQueries({ queryKey: [['gifts', 'search']] });
      onOpenChange(false);
      form.reset();
    },
    onError: (error) => {
      toast.error(error.message);
      console.error(error);
    },
  });

  // Handle form submission
  const onSubmit = async (data: GiftFormValues) => {
    setIsSubmitting(true);
    try {
      if (mode === 'create') {
        // Create new gift
        createMutation.mutate(data);
      } else if (mode === 'edit' && gift) {
        // Update existing gift
        updateMutation.mutate({
          id: gift.id,
          ...data,
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {mode === 'create' ? 'Add New Gift' : 'Edit Gift'}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="productName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter product name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter description (optional)"
                      {...field}
                      value={field.value || ''}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter price (optional)"
                      {...field}
                      value={field.value || ''}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="importanceLevel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Importance Level</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select importance level" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="HIGH">High</SelectItem>
                      <SelectItem value="MEDIUM">Medium</SelectItem>
                      <SelectItem value="LOW">Low</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={
                  isSubmitting ||
                  createMutation.isPending ||
                  updateMutation.isPending
                }
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-[#3D5A80] hover:bg-[#2A4A70]"
                disabled={
                  isSubmitting ||
                  createMutation.isPending ||
                  updateMutation.isPending
                }
              >
                {isSubmitting ||
                createMutation.isPending ||
                updateMutation.isPending
                  ? 'Saving...'
                  : mode === 'create'
                    ? 'Add Gift'
                    : 'Update Gift'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
