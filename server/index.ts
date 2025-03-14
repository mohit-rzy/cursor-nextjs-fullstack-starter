import { router } from './core/router';
import { cookies } from 'next/headers';
import { randomUUID } from 'crypto';
import { PUBLIC_SESSION_COOKIE_NAME } from './core/constants';
import { publicProcedure } from './core/router/procedures/public-procedure';
import { sleep } from './core/utils/sleep';
import { TRPCError } from '@trpc/server';
import { giftsRouter } from './modules/gifts/gifts.router';
import { getServerSession } from '@/lib/auth';

export const appRouter = router({
  health: publicProcedure.query(async ({ ctx }) => {
    await sleep(3000);
    if (ctx.req) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Something went wrong',
      });
    }
    return {
      status: Math.round(Math.random() * 1000),
    };
  }),
  init: publicProcedure.mutation(async () => {
    const cookieStore = await cookies();
    if (!cookieStore.get(PUBLIC_SESSION_COOKIE_NAME)) {
      cookieStore.set(PUBLIC_SESSION_COOKIE_NAME, randomUUID(), {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 30,
        sameSite: 'strict',
        path: '/',
      });
    }
    return;
  }),
  gifts: giftsRouter,
});

export const createCaller = async () =>
  appRouter.createCaller({
    session: await getServerSession(),
    req: undefined,
    res: undefined,
    requestId: randomUUID(),
  });

export type AppRouter = typeof appRouter;
