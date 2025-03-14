import { t } from '..';
import { TRPCError } from '@trpc/server';

export const isAuthenticatedMiddleware = t.middleware(async ({ ctx, next }) => {
  const { session } = ctx;
  const userId = session?.user.id;
  if (!userId) {
    throw new TRPCError({ code: 'UNAUTHORIZED', message: 'Unauthorized' });
  }
  return next({ ctx });
});
