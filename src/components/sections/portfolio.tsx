'use client';

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { projectsData } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';

export default function Portfolio() {
  return (
    <section id="portfolio" className="w-full bg-card py-20 md:py-32">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">
            Key Initiatives & Projects
          </h2>
          <p className="mt-4 text-muted-foreground">
            A selection of high-impact projects that demonstrate my skills and
            passion for quality engineering.
          </p>
        </div>
        <div className="mt-12">
          <Carousel
            opts={{
              loop: true,
            }}
            plugins={[
              Autoplay({
                delay: 5000,
                stopOnInteraction: true,
              }),
            ]}
            className="w-full"
          >
            <CarouselContent>
              {projectsData.map((project) => {
                const projectImage = PlaceHolderImages.find(
                  (img) => img.id === project.id
                );
                return (
                  <CarouselItem key={project.id}>
                    <div className="p-1">
                      <Card className="group flex flex-col overflow-hidden transform-gpu bg-background/50 transition-all duration-300 hover:shadow-xl md:flex-row">
                        <div className="relative w-full md:w-1/2 h-64 md:h-auto">
                          <Image
                            src={projectImage?.imageUrl ?? ''}
                            alt={project.title}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                            data-ai-hint={projectImage?.imageHint}
                          />
                           <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent md:bg-gradient-to-r" />
                        </div>
                        <div className="flex w-full flex-col justify-center p-6 md:w-1/2">
                          <CardHeader>
                            <CardTitle className="font-headline text-2xl text-primary">
                              {project.title}
                            </CardTitle>
                            <CardDescription className="mt-4 text-base text-muted-foreground">
                              {project.description}
                            </CardDescription>
                          </CardHeader>
                        </div>
                      </Card>
                    </div>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            <CarouselPrevious className="hidden sm:flex" />
            <CarouselNext className="hidden sm:flex" />
          </Carousel>
        </div>
      </div>
    </section>
  );
}
