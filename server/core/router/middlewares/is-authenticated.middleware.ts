import { t } from '..';
import { TRPCError } from '@trpc/server';

export const isAuthenticatedMiddleware = t.middleware(async ({ ctx, next }) => {
  const { auth } = ctx;
  const userId = auth.userId;
  if (!userId) {
    throw new TRPCError({ code: 'UNAUTHORIZED', message: 'Unauthorized' });
  }
  return next({ ctx });
});
