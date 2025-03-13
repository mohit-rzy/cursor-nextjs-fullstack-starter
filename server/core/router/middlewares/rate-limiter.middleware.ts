import {
  createTrpcRedisLimiter,
  defaultFingerPrint,
} from '@trpc-limiter/redis';
import { t } from '..';
import { redisClient } from '../../services/redis.service';
import { TRPCError } from '@trpc/server';
import { Context } from '../context';
import { PUBLIC_SESSION_COOKIE_NAME } from '../../constants';
import { cookies } from 'next/headers';

const clerkFingerPrint = (ctx: Context) => {
  if (ctx.auth.sessionId) {
    return ctx.auth.sessionId;
  } else {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'Unauthorized',
    });
  }
};

const publicFingerPrint = async (ctx: Context) => {
  if (ctx.req) {
    return defaultFingerPrint(ctx.req);
  } else {
    const cookieStore = await cookies();
    return cookieStore.get(PUBLIC_SESSION_COOKIE_NAME)?.value || ctx.requestId;
  }
};

export const privateRateLimiter = createTrpcRedisLimiter<typeof t>({
  fingerprint: clerkFingerPrint,
  message: (hitInfo) => `Too many requests, please try again later. ${hitInfo}`,
  max: 50,
  windowMs: 10000,
  redisClient: redisClient,
});

export const publicRateLimiter = createTrpcRedisLimiter<typeof t>({
  fingerprint: publicFingerPrint,
  message: (hitInfo) => `Too many requests, please try again later. ${hitInfo}`,
  max: 100,
  windowMs: 10000,
  redisClient: redisClient,
});
