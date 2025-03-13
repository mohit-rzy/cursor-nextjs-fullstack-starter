'server-only';

import { initTRPC, TRPCError } from '@trpc/server';
import { Context } from './context';
import superjson from 'superjson';

// Create tRPC router
export const t = initTRPC.context<Context>().create({
  transformer: superjson,
  errorFormatter({ shape, error, path, type }) {
    // If it's already a TRPC error, use it as is
    if (error.cause instanceof TRPCError) {
      return shape;
    }

    // For non-TRPC errors, convert to INTERNAL_SERVER_ERROR
    if (
      !(error.cause instanceof TRPCError) &&
      error.code === 'INTERNAL_SERVER_ERROR'
    ) {
      // Create a more descriptive error message
      const message = `Failed to ${type} ${path}`;

      return {
        ...shape,
        message,
      };
    }

    return shape;
  },
});

export const router = t.router;
