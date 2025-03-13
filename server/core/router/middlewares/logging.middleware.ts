import { t } from '..'; // Import t from server.ts
import { logger } from '../../services/logger.service';

export const loggingMiddleware = t.middleware(
  async ({ ctx, next, path, type }) => {
    const start = Date.now();
    const { req, res } = ctx;
    try {
      const result = await next({ ctx });

      const ms = Date.now() - start;
      if (res && req) {
        const path = req.url;
        const method = req.method;
        const status = res.status;
        // If it is a request, print req & res details
        logger.http(`${method} ${path} ${status} ${ms}ms`);
      } else {
        // If it is a direct call, just print the type and path
        logger.http(`[Caller]${type} ${path} ${ms}ms`);
      }
      return result;
    } catch (error) {
      const ms = Date.now() - start;
      if (res && req) {
        const path = req.url;
        const method = req.method;
        const status = res.status;
        // If it is a request, print req & res details
        logger.http(`${method} ${path} ${status || 500} ${ms}ms`);
      } else {
        logger.http(`[Caller]${type} ${path} ${ms}ms`);
      }
      throw error;
    }
  }
);
