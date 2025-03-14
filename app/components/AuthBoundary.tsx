import { FC } from 'react';
import { getServerSession } from '@/lib/auth';
import { redirect } from 'next/navigation';

export const AuthBoundary: FC<{ children: React.ReactNode }> = async ({
  children,
}) => {
  const session = await getServerSession();
  if (!session) {
    return redirect('/auth/signin');
  }
  return <>{children}</>;
};
