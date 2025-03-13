import { asyncContextMiddleware } from '../middlewares/async-context.middleware';
import { loggingMiddleware } from '../middlewares/logging.middleware';
import { t } from '..';
import { isAuthenticatedMiddleware } from '../middlewares/is-authenticated.middleware';
import { privateRateLimiter } from '../middlewares/rate-limiter.middleware';

export const privateProcedure = t.procedure.use(
  asyncContextMiddleware
    .unstable_pipe(loggingMiddleware)
    .unstable_pipe(isAuthenticatedMiddleware)
    .unstable_pipe(privateRateLimiter)
);
