import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Link from 'next/link';

export default async function Dashboard() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/sign-in');
  }

  const { data: userDetails } = await supabase.auth.getUser();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Dashboard</CardTitle>
          <CardDescription>Welcome to your dashboard</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium">User Information</h3>
              <p className="text-sm text-muted-foreground">
                Email: {userDetails.user?.email}
              </p>
              <p className="text-sm text-muted-foreground">
                Provider: {userDetails.user?.app_metadata?.provider || 'Email'}
              </p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Link href="/">
            <Button variant="outline">Home</Button>
          </Link>
          <form action="/auth/sign-out" method="post">
            <Button type="submit" variant="destructive">
              Sign Out
            </Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}
