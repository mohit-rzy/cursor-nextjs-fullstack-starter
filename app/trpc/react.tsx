'use client';

import type { QueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { createTRPCClient, unstable_httpBatchStreamLink } from '@trpc/client';
import { createTRPCContext } from '@trpc/tanstack-react-query';
import SuperJSON from 'superjson';
import { createQueryClient } from './query-client';
import type { AppRouter } from '@/server';

let clientQueryClientSingleton: QueryClient | undefined = undefined;
const getQueryClient = () => {
  if (typeof window === 'undefined') {
    // Server: always make a new query client
    return createQueryClient();
  } else {
    // Browser: use singleton pattern to keep the same query client
    return (clientQueryClientSingleton ??= createQueryClient());
  }
};

export const { useTRPC, TRPCProvider } = createTRPCContext<AppRouter>();

export function TRPCReactProvider(props: { children: React.ReactNode }) {
  const queryClient = getQueryClient();

  const [trpcClient] = useState(() =>
    createTRPCClient<AppRouter>({
      links: [
        // loggerLink({
        //   enabled: (op) =>
        //     process.env.NODE_ENV === 'development' ||
        //     (op.direction === 'down' && op.result instanceof Error),
        // }),
        unstable_httpBatchStreamLink({
          transformer: SuperJSON,
          url: getBaseUrl() + '/api',
          headers() {
            const headers = new Headers();
            headers.set('x-trpc-source', 'nextjs-react');
            return headers;
          },
        }),
      ],
    })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <TRPCProvider trpcClient={trpcClient} queryClient={queryClient}>
        {props.children}
      </TRPCProvider>
    </QueryClientProvider>
  );
}

const getBaseUrl = () => {
  if (typeof window !== 'undefined') return window.location.origin;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;

  return `http://localhost:${process.env.PORT ?? 3000}`;
};
