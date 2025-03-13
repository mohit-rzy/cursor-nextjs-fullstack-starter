import { asyncLocalStorage } from '../router/middlewares/async-context.middleware';

export function getContext() {
  const context = asyncLocalStorage.getStore();
  if (!context) {
    throw new Error(
      'No request context found. Ensure asyncContextMiddleware is properly configured.'
    );
  }
  return context;
}

/**
 * Retrieves the IP address of the current request.
 * @returns {string} The IP address of the request.
 */
export function getIp(): string {
  const ctx = getContext();
  return ctx.req?.headers.get('x-forwarded-for') || '';
}

/**
 * Retrieves the headers of the current request.
 * @returns {Record<string, string | string[] | undefined>} The headers of the request.
 */
export function getHeaders() {
  const ctx = getContext();
  return ctx.req?.headers;
}

/**
 * Retrieves the request ID from the async local storage.
 * @throws Will throw an error if no request context is found.
 * @returns {string} The request ID.
 */
export function getRequestId(): string {
  const context = asyncLocalStorage.getStore();
  if (!context) {
    throw new Error(
      'No request context found. Ensure asyncContextMiddleware is properly configured.'
    );
  }
  return context.requestId;
}

/**
 * Retrieves metadata about the current request.
 * @returns {object} An object containing the request ID, method, path, and IP address.
 */
export function getRequestMetadata(): {
  requestId: string;
  method: string;
  path: string;
  ip: string;
} {
  const ctx = getContext();
  return {
    requestId: getRequestId(),
    method: ctx.req?.method || 'NONE',
    path: ctx.req?.url || 'NONE',
    ip: getIp(),
  };
}
