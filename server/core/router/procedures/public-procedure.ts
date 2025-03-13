import { asyncContextMiddleware } from '../middlewares/async-context.middleware';
import { loggingMiddleware } from '../middlewares/logging.middleware';
import { t } from '..';
import { publicRateLimiter } from '../middlewares/rate-limiter.middleware';

export const publicProcedure = t.procedure.use(
  asyncContextMiddleware
    .unstable_pipe(loggingMiddleware)
    .unstable_pipe(publicRateLimiter)
);
