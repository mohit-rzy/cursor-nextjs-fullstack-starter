'use client';

import { useState } from 'react';
import { useTRPC } from '../trpc/react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { PlusIcon, SearchIcon } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { GiftDialog } from './GiftDialog';
import { EmptyState } from './EmptyState';
import { GiftListSkeleton } from './GiftListSkeleton';
import { ErrorDisplay } from './ErrorDisplay';
import { toast } from 'sonner';
import { useQueryClient } from '@tanstack/react-query';
import { useDebounce } from '../hooks/useDebounce';

// Type for a gift item
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

export function GiftListClient() {
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentGift, setCurrentGift] = useState<Gift | null>(null);
  const [sortBy, setSortBy] = useState<string>('createdAt');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 1000); // 500ms delay

  // Query for gifts with sorting
  const {
    data: gifts = [],
    isLoading,
    isError: isGiftsError,
    refetch: refetchGifts,
  } = useQuery(
    trpc.gifts.getAll.queryOptions({
      sortBy: sortBy as any,
      sortOrder,
    })
  );

  // Query for searching gifts
  const {
    data: searchResults = [],
    isLoading: isSearching,
    isError: isSearchError,
    refetch: refetchSearch,
  } = useQuery({
    ...trpc.gifts.search.queryOptions({ searchTerm: debouncedSearchTerm }),
    enabled: debouncedSearchTerm.length > 0,
  });

  // Delete a gift
  const deleteMutation = useMutation({
    ...trpc.gifts.delete.mutationOptions(),
    onSuccess: () => {
      toast.success('Gift deleted successfully');
      queryClient.invalidateQueries({ queryKey: [['gifts', 'getAll']] });
      queryClient.invalidateQueries({ queryKey: [['gifts', 'search']] });
    },
    onError: (error) => {
      toast.error(error.message);
      console.error(error);
    },
  });

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this gift?')) {
      deleteMutation.mutate({ id });
    }
  };

  // Open edit dialog with gift data
  const handleEdit = (gift: Gift) => {
    setCurrentGift(gift);
    setIsEditDialogOpen(true);
  };

  // Get importance level badge color
  const getImportanceBadgeColor = (level: string) => {
    switch (level) {
      case 'HIGH':
        return 'bg-[#2A9D8F] hover:bg-[#2A9D8F]/90';
      case 'MEDIUM':
        return 'bg-[#E9C46A] hover:bg-[#E9C46A]/90';
      case 'LOW':
        return 'bg-[#E76F51] hover:bg-[#E76F51]/90';
      default:
        return 'bg-gray-500 hover:bg-gray-500/90';
    }
  };

  // Toggle sort order
  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };

  // Display data based on search or regular list
  const displayData = debouncedSearchTerm.length > 0 ? searchResults : gifts;
  const isError = debouncedSearchTerm.length > 0 ? isSearchError : isGiftsError;
  const refetch = debouncedSearchTerm.length > 0 ? refetchSearch : refetchGifts;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="relative w-64">
          <SearchIcon className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search gifts..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm !== debouncedSearchTerm && searchTerm.length > 0 && (
            <div className="absolute right-2 top-2.5 h-4 w-4">
              <div className="animate-spin h-4 w-4 border-2 border-gray-500 rounded-full border-t-transparent"></div>
            </div>
          )}
        </div>

        <Button
          onClick={() => setIsCreateDialogOpen(true)}
          className="bg-[#3D5A80] hover:bg-[#2A4A70]"
        >
          <PlusIcon className="mr-2 h-4 w-4" />
          Add Gift
        </Button>
      </div>

      {isError ? (
        <ErrorDisplay
          title="Failed to load gifts"
          description={
            debouncedSearchTerm.length > 0
              ? 'There was an error searching for gifts. Please try again.'
              : 'There was an error loading your gifts. Please try again.'
          }
          retry={() => refetch()}
        />
      ) : isLoading || isSearching ? (
        <GiftListSkeleton />
      ) : displayData && displayData.length > 0 ? (
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead
                  className="cursor-pointer"
                  onClick={() => handleSort('productName')}
                >
                  Product Name{' '}
                  {sortBy === 'productName' &&
                    (sortOrder === 'asc' ? '↑' : '↓')}
                </TableHead>
                <TableHead>Description</TableHead>
                <TableHead
                  className="cursor-pointer"
                  onClick={() => handleSort('price')}
                >
                  Price{' '}
                  {sortBy === 'price' && (sortOrder === 'asc' ? '↑' : '↓')}
                </TableHead>
                <TableHead
                  className="cursor-pointer"
                  onClick={() => handleSort('importanceLevel')}
                >
                  Importance{' '}
                  {sortBy === 'importanceLevel' &&
                    (sortOrder === 'asc' ? '↑' : '↓')}
                </TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {displayData.map((gift: Gift) => (
                <TableRow key={gift.id}>
                  <TableCell className="font-medium">
                    {gift.productName}
                  </TableCell>
                  <TableCell>{gift.description || '-'}</TableCell>
                  <TableCell>{gift.price || '-'}</TableCell>
                  <TableCell>
                    <Badge
                      className={getImportanceBadgeColor(gift.importanceLevel)}
                    >
                      {gift.importanceLevel}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(gift)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-500 hover:text-red-700"
                        onClick={() => handleDelete(gift.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : debouncedSearchTerm.length > 0 ? (
        <EmptyState
          title="No gifts found"
          description="We couldn't find any gifts matching your search. Try a different search term or clear the search."
        />
      ) : (
        <EmptyState
          title="No gifts yet"
          description="You haven't added any gifts to your list yet. Start by adding your first gift!"
          actionLabel="Add Your First Gift"
          onAction={() => setIsCreateDialogOpen(true)}
        />
      )}

      {/* Create Gift Dialog */}
      <GiftDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        mode="create"
      />

      {/* Edit Gift Dialog */}
      {currentGift && (
        <GiftDialog
          open={isEditDialogOpen}
          onOpenChange={setIsEditDialogOpen}
          mode="edit"
          gift={currentGift}
        />
      )}
    </div>
  );
}
