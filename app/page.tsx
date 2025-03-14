'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Check, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { AnimatedTestimonials } from '@/components/ui/animated-testimonials';

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <Badge className="inline-flex">New Release</Badge>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-[#3D5A80]">
                  Gift List Manager
                </h1>
                <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                  A streamlined web application that allows you to effortlessly
                  create and manage your Christmas gift lists.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link
                  href="/sign-in"
                  className="inline-flex h-10 items-center justify-center rounded-md bg-[#3D5A80] px-8 text-sm font-medium text-white shadow transition-colors hover:bg-[#2A4A70] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                >
                  Sign In
                </Link>
                <Link
                  href="/sign-in"
                  className="inline-flex h-10 items-center justify-center rounded-md border border-[#3D5A80] bg-background px-8 text-sm font-medium text-[#3D5A80] shadow-sm transition-colors hover:bg-[#F8F9FA] hover:text-[#3D5A80] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                >
                  Sign Up
                </Link>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative h-[350px] w-[350px] md:h-[450px] md:w-[450px]">
                <Image
                  src="/gift-illustration.svg"
                  alt="Gift List Manager"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-[#3D5A80]">
                Features that make gift planning easier
              </h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Our platform provides everything you need to organize your gift
                ideas in one place.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 lg:gap-12 mt-12">
            <div className="flex flex-col items-start space-y-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#3D5A80] text-white">
                <Check className="h-5 w-5" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-[#3D5A80]">
                  Digital Organization
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Keep all your gift ideas in one secure place, accessible from
                  anywhere.
                </p>
              </div>
            </div>
            <div className="flex flex-col items-start space-y-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#3D5A80] text-white">
                <Check className="h-5 w-5" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-[#3D5A80]">
                  Prioritize Gifts
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Assign importance levels to help with budgeting and planning.
                </p>
              </div>
            </div>
            <div className="flex flex-col items-start space-y-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#3D5A80] text-white">
                <Check className="h-5 w-5" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-[#3D5A80]">
                  Track Details
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Store product names, descriptions, and prices for each gift
                  idea.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-[#3D5A80]">
                What our users say
              </h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Hear from people who have transformed their gift planning
                experience.
              </p>
            </div>
          </div>
          <div className="mx-auto max-w-4xl mt-12">
            <AnimatedTestimonials
              testimonials={[
                {
                  quote:
                    'This app has completely changed how I plan for holidays. No more forgotten gifts or last-minute shopping stress!',
                  name: 'Sarah Chen',
                  designation: 'Busy Parent',
                  src: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                },
                {
                  quote:
                    "I love how easy it is to keep track of gift ideas throughout the year. When birthdays or holidays come around, I'm always prepared.",
                  name: 'Michael Rodriguez',
                  designation: 'Gift Enthusiast',
                  src: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=3560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                },
                {
                  quote:
                    "The ability to organize gifts by person and occasion has made my life so much easier. I can't imagine going back to my old system.",
                  name: 'Emily Watson',
                  designation: 'Organized Planner',
                  src: 'https://images.unsplash.com/photo-1623582854588-d60de57fa33f?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                },
                {
                  quote:
                    "This platform has saved me so much time and stress. I can easily track what I've bought and what I still need to get.",
                  name: 'James Kim',
                  designation: 'Holiday Planner',
                  src: 'https://images.unsplash.com/photo-1636041293178-808a6762ab39?q=80&w=3464&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                },
                {
                  quote:
                    "The price tracking feature has helped me stay within budget for every occasion. It's a game-changer for financial planning.",
                  name: 'Lisa Thompson',
                  designation: 'Budget-Conscious Shopper',
                  src: 'https://images.unsplash.com/photo-1624561172888-ac93c696e10c?q=80&w=2592&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                },
              ]}
              autoplay={true}
            />
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-[#3D5A80] text-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Ready to simplify your gift planning?
              </h2>
              <p className="max-w-[600px] text-gray-200 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Join thousands of users who have transformed their gift-giving
                experience.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link
                href="/sign-in"
                className="inline-flex h-10 items-center justify-center rounded-md bg-white px-8 text-sm font-medium text-[#3D5A80] shadow transition-colors hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
              >
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link
                href="/about"
                className="inline-flex h-10 items-center justify-center rounded-md border border-white bg-transparent px-8 text-sm font-medium text-white shadow-sm transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
