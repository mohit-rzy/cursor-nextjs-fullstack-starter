import { HydrateClient, prefetch } from '../trpc/server';
import { trpc } from '../trpc/server';
import { Suspense } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { GiftListClient } from '../components/GiftList';
import { LoadingDashboard } from '../components/LoadingDashboard';
import { ErrorBoundary } from '../components/ErrorBoundary';
import { ErrorDisplay } from '../components/ErrorDisplay';

export default async function DashboardPage() {
  // Prefetch gifts data
  prefetch(
    trpc.gifts.getAll.queryOptions({ sortBy: 'createdAt', sortOrder: 'desc' })
  );

  return (
    <ErrorBoundary
      fallback={
        <ErrorDisplay
          title="Dashboard Error"
          description="There was an error loading the dashboard. Please try refreshing the page."
        />
      }
    >
      <Suspense fallback={<LoadingDashboard />}>
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-[#3D5A80]">My Gift List</h1>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Gift List Manager</CardTitle>
              <CardDescription>
                Manage your gift ideas in one place. Add, edit, and organize
                your gifts by importance and price.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <HydrateClient>
                <ErrorBoundary>
                  <Suspense fallback={<LoadingDashboard />}>
                    <GiftListClient />
                  </Suspense>
                </ErrorBoundary>
              </HydrateClient>
            </CardContent>
          </Card>
        </div>
      </Suspense>
    </ErrorBoundary>
  );
}
