
'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { profileData } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Chatbot } from '../chatbot';
import { ResumeGenerator } from '../resume-generator';

export default function Hero() {
  const avatarImage = PlaceHolderImages.find(
    (img) => img.id === profileData.avatar
  );
  const backgroundImage = PlaceHolderImages.find(
    (img) => img.id === 'hero-background'
  );

  return (
    <section id="about" className="relative w-full py-20 md:py-32 overflow-hidden">
      <div
        className="absolute inset-0 -z-20 h-full w-full bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImage?.imageUrl})` }}
      />
      <div className="absolute inset-0 -z-10 h-full w-full bg-background/60 backdrop-blur-sm" />
      <div className="container grid grid-cols-1 items-center gap-12 md:grid-cols-2 lg:gap-20">
        <div className="flex flex-col items-start gap-8">
            <div className="space-y-4">
                <p className="font-headline text-lg uppercase text-primary">Hello</p>
                <h1 className="font-headline text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                    I'm {profileData.name}, a
                    <br />
                    <span className="text-primary">{profileData.title}</span>
                </h1>
                <p className="max-w-2xl text-lg text-muted-foreground">
                    {profileData.bio}
                </p>
            </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button asChild size="lg" className="group" >
                <Link href="#portfolio">
                    Learn More <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
            </Button>
            <div className='flex gap-3'>
              <Chatbot />
              <ResumeGenerator />
            </div>
          </div>
        </div>
        <div className="relative flex justify-center">
            <div className="absolute -z-10 h-[350px] w-[350px] rounded-full bg-primary/20 blur-3xl lg:h-[500px] lg:w-[500px]"></div>
            <Avatar className="h-80 w-80 border-4 border-primary/20 shadow-2xl lg:h-[400px] lg:w-[400px]">
                <AvatarImage
                src={avatarImage?.imageUrl}
                alt={profileData.name}
                data-ai-hint={avatarImage?.imageHint}
                />
                <AvatarFallback>{profileData.name.charAt(0)}</AvatarFallback>
            </Avatar>
        </div>
      </div>
    </section>
  );
}
