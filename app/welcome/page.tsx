'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { authClient } from '@/lib/auth-client';

// Define a basic user type
type User = {
  id: string;
  name?: string;
  email?: string;
  image?: string | null;
};

export default function WelcomePage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const sessionData = await authClient.getSession();
        if (sessionData && sessionData.data) {
          // Access the user from the session data structure
          setUser(sessionData.data.user);
        } else {
          // If no session, redirect to sign in
          router.push('/auth/signin');
        }
      } catch (error) {
        console.error('Error fetching user:', error);
        router.push('/auth/signin');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [router]);

  const handleContinue = () => {
    router.push('/dashboard');
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-6">
            <Image
              src="/logo.svg"
              alt="Logo"
              width={64}
              height={64}
              className="h-16 w-auto"
              priority
            />
          </div>
          <CardTitle className="text-2xl font-bold text-center">
            Welcome to the App!
          </CardTitle>
          <CardDescription className="text-center">
            {user?.name
              ? `Hi ${user.name}, we're glad you're here!`
              : "We're glad you're here!"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Your account has been successfully created. You can now access all
              the features of our application.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-medium">What you can do next:</h3>
            <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
              <li>Complete your profile information</li>
              <li>Explore the dashboard</li>
              <li>Check out our getting started guide</li>
              <li>Connect with other users</li>
            </ul>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleContinue} className="w-full">
            Continue to Dashboard
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
