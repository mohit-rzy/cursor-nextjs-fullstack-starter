import { type Metadata } from 'next';
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs';
import { Inter } from 'next/font/google';
import './globals.css';
import { TRPCReactProvider } from './trpc/react';
import Link from 'next/link';
import { Toaster } from '@/components/ui/sonner';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Gift List Manager',
  description: 'Manage your gift lists with ease',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <TRPCReactProvider>
        <html lang="en">
          <body
            className={`${inter.variable} font-sans antialiased bg-white text-[#212529]`}
          >
            <div className="min-h-screen flex flex-col">
              {/* Header */}
              <header className="bg-white border-b border-gray-100 h-16 flex items-center px-4 sm:px-6">
                <div className="container mx-auto flex justify-between items-center">
                  <div className="flex items-center gap-6">
                    <Link
                      href="/"
                      className="text-xl font-medium text-[#3D5A80]"
                    >
                      Gift List Manager
                    </Link>
                    <Link
                      href="/about"
                      className="text-sm font-medium text-gray-600 hover:text-gray-900"
                    >
                      About
                    </Link>
                  </div>
                  <div className="flex items-center gap-4">
                    <SignedOut>
                      <SignInButton mode="modal">
                        <button className="text-sm font-medium text-gray-600 hover:text-gray-900">
                          Sign In
                        </button>
                      </SignInButton>
                      <SignUpButton mode="modal">
                        <button className="bg-[#3D5A80] text-white text-sm font-medium px-4 py-2 rounded-full hover:bg-[#2A4A70] transition-colors">
                          Sign Up
                        </button>
                      </SignUpButton>
                    </SignedOut>
                    <SignedIn>
                      <Link
                        href="/dashboard"
                        className="text-sm font-medium text-gray-600 hover:text-gray-900 mr-4"
                      >
                        Dashboard
                      </Link>
                      <UserButton />
                    </SignedIn>
                  </div>
                </div>
              </header>

              {/* Main content */}
              <main className="flex-grow container mx-auto px-4 sm:px-6 py-8">
                {children}
              </main>

              {/* Footer */}
              <footer className="bg-[#F8F9FA] py-6 border-t border-gray-100">
                <div className="container mx-auto px-4 sm:px-6 text-center text-sm text-gray-500">
                  <p>
                    © {new Date().getFullYear()} Gift List Manager. All rights
                    reserved.
                  </p>
                </div>
              </footer>
            </div>
            <Toaster />
          </body>
        </html>
      </TRPCReactProvider>
    </ClerkProvider>
  );
}
