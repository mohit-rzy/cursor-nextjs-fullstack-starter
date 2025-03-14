import { Button } from '@/components/ui/button';
import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold">Gift List Manager</h1>
        <p className="text-xl text-muted-foreground max-w-md mx-auto">
          Manage your gift lists and share them with friends and family.
        </p>

        {user ? (
          <div className="space-y-4">
            <div className="p-4 bg-green-50 text-green-800 rounded-md">
              Logged in as: {user.email}
            </div>
            <div className="flex gap-4 justify-center">
              <Link href="/dashboard">
                <Button>Go to Dashboard</Button>
              </Link>
              <form action="/auth/sign-out" method="post">
                <Button type="submit" variant="outline">
                  Sign Out
                </Button>
              </form>
            </div>
          </div>
        ) : (
          <div className="flex gap-4 justify-center">
            <Link href="/sign-in">
              <Button>Sign In with Google</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
