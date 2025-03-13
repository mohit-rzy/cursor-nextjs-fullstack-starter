'use client';

import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Cat, Trophy, Rocket, Moon, Users } from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="flex flex-col gap-16">
      {/* Hero Section */}
      <section className="py-12 md:py-24">
        <div className="container text-center">
          <div className="mx-auto flex max-w-screen-lg flex-col gap-6">
            <Badge className="mx-auto" variant="outline">
              Est. 1888
            </Badge>
            <h1 className="text-3xl font-extrabold lg:text-6xl">
              About Gift List Manager
            </h1>
            <p className="text-balance text-muted-foreground lg:text-lg">
              The world&apos;s most exclusive gift management platform, created
              by a legendary figure with a passion for perfect presents.
            </p>
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-12 bg-muted/30">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="flex flex-col gap-6">
              <h2 className="text-2xl md:text-4xl font-bold tracking-tight">
                Meet Our Founder
              </h2>
              <p className="text-muted-foreground">
                Sir Giftington Presentworth III, born in 1888, is not your
                average entrepreneur. With a lifetime dedicated to the art of
                gifting, he has revolutionized how people exchange presents
                worldwide.
              </p>
              <div className="flex flex-col gap-4 mt-4">
                <div className="flex items-center gap-3">
                  <Trophy className="h-5 w-5 text-yellow-500" />
                  <span>Owner of Uanchester Mnited and Meal Radrid</span>
                </div>
                <div className="flex items-center gap-3">
                  <Moon className="h-5 w-5 text-blue-500" />
                  <span>Sole proprietor of the Moon (purchased in 1972)</span>
                </div>
                <div className="flex items-center gap-3">
                  <Cat className="h-5 w-5 text-orange-500" />
                  <span>Proud parent to exactly 666 cats</span>
                </div>
                <div className="flex items-center gap-3">
                  <Rocket className="h-5 w-5 text-purple-500" />
                  <span>First person to gift-wrap a space shuttle</span>
                </div>
              </div>
              <div className="mt-4">
                <Button asChild>
                  <Link href="/dashboard">Start Making Gift Lists</Link>
                </Button>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full bg-gradient-to-br from-[#3D5A80] to-[#98C1D9] flex items-center justify-center">
                <Avatar className="w-56 h-56 md:w-72 md:h-72 border-4 border-white">
                  <AvatarImage
                    src="https://images.unsplash.com/photo-1513245543132-31f507417b26?q=80&w=2070&auto=format&fit=crop"
                    alt="Sir Giftington Presentworth III"
                  />
                </Avatar>
                <div className="absolute -bottom-4 bg-white rounded-full px-6 py-2 shadow-lg">
                  <span className="text-sm font-medium">Since 1888</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12">
        <div className="container">
          <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-center mb-12">
            Legendary Achievements
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex flex-col gap-2 p-6 border rounded-lg hover:shadow-md transition-shadow">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 text-blue-600 mb-4">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="text-3xl font-bold">134</h3>
              <p className="text-muted-foreground">Years of Experience</p>
            </div>

            <div className="flex flex-col gap-2 p-6 border rounded-lg hover:shadow-md transition-shadow">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-100 text-green-600 mb-4">
                <Trophy className="h-6 w-6" />
              </div>
              <h3 className="text-3xl font-bold">2</h3>
              <p className="text-muted-foreground">Football Teams Owned</p>
            </div>

            <div className="flex flex-col gap-2 p-6 border rounded-lg hover:shadow-md transition-shadow">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-purple-100 text-purple-600 mb-4">
                <Moon className="h-6 w-6" />
              </div>
              <h3 className="text-3xl font-bold">1</h3>
              <p className="text-muted-foreground">Moon Owned</p>
            </div>

            <div className="flex flex-col gap-2 p-6 border rounded-lg hover:shadow-md transition-shadow">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-orange-100 text-orange-600 mb-4">
                <Cat className="h-6 w-6" />
              </div>
              <h3 className="text-3xl font-bold">666</h3>
              <p className="text-muted-foreground">Cats Owned</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-12 bg-muted/30">
        <div className="container">
          <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-center mb-8">
            What People Say
          </h2>
          <div className="max-w-3xl mx-auto">
            <blockquote className="relative p-8 border rounded-lg bg-white">
              <div className="text-2xl text-gray-400 absolute top-4 left-4">
                &quot;
              </div>
              <p className="text-lg italic text-muted-foreground mb-4 mt-4 ml-4">
                Sir Giftington helped me find the perfect gift for my pet rock.
                His wisdom transcends time, space, and common sense. I&apos;ve
                never met anyone who understands the art of gift-giving quite
                like him.
              </p>
              <footer className="flex items-center gap-4 mt-6">
                <Avatar className="h-12 w-12">
                  <AvatarImage
                    src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=2787&auto=format&fit=crop"
                    alt="John Doe"
                  />
                </Avatar>
                <div>
                  <p className="font-medium">John Doe</p>
                  <p className="text-sm text-muted-foreground">
                    CEO, Moon Real Estate
                  </p>
                </div>
              </footer>
            </blockquote>
          </div>
        </div>
      </section>
    </div>
  );
}
