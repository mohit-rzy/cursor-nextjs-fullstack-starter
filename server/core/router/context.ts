'server-only';

import { getServerSession } from '@/lib/auth';
import { FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch';
import { randomUUID } from 'crypto';

export const createApiContext = async (opts: {
  req?: Request;
  res?: Response;
  info: FetchCreateContextFnOptions['info'];
}) => {
  const requestId = randomUUID() as string;
  opts.res?.headers?.set('X-Request-ID', requestId);
  return {
    session: await getServerSession(),
    res: opts.res,
    req: opts.req,
    requestId,
  };
};

export type Context = Awaited<ReturnType<typeof createApiContext>>;
