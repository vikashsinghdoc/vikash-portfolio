import { workExperienceData } from '@/lib/data';
import { Briefcase } from 'lucide-react';

export default function Experience() {
  return (
    <section id="experience" className="w-full bg-card py-20 md:py-32">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">
            Work Experience
          </h2>
          <p className="mt-4 text-muted-foreground">
            A journey of growth, challenges, and achievements in the tech industry.
          </p>
        </div>
        <div className="relative mt-12 max-w-4xl mx-auto">
          {/* Vertical line */}
          <div className="absolute left-6 top-0 h-full w-0.5 bg-border -translate-x-1/2"></div>
          
          <div className="space-y-12">
            {workExperienceData.map((job, index) => (
              <div key={`${job.company}-${job.title}`} className="relative pl-12">
                {/* Circle on the timeline */}
                <div className="absolute left-6 top-1 h-4 w-4 rounded-full bg-primary border-4 border-card -translate-x-1/2"></div>

                <div className="transform-gpu transition-all duration-300 hover:-translate-y-1">
                  <p className="text-sm text-muted-foreground">
                    {job.startDate} - {job.endDate || 'Present'}
                  </p>
                  <h3 className="mt-2 text-xl font-bold text-primary">{job.title}</h3>
                  <p className="mt-1 text-lg font-semibold">{job.company}</p>
                  <ul className="mt-4 list-disc space-y-2 pl-5 text-muted-foreground">
                    {job.description
                      .split('•')
                      .filter((d) => d.trim() !== '')
                      .map((desc, i) => (
                        <li key={i}>{desc.trim()}</li>
                      ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
