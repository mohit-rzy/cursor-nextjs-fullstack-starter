import { AsyncLocalStorage } from 'async_hooks';
import { t } from '..'; // Import t from server.ts
import { Context } from '../context';

export const asyncLocalStorage = new AsyncLocalStorage<Context>();

export const asyncContextMiddleware = t.middleware(async ({ ctx, next }) => {
  return asyncLocalStorage.run(ctx, async () => {
    return next({ ctx });
  });
});
