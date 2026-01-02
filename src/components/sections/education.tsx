import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { educationData } from '@/lib/data';
import { GraduationCap } from 'lucide-react';

export default function Education() {
  return (
    <section id="education" className="w-full py-20 md:py-32">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">
            Education
          </h2>
          <p className="mt-4 text-muted-foreground">
            My academic background and commitment to continuous learning.
          </p>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {educationData.map((edu) => (
            <Card
              key={edu.institution + edu.degree}
              className="transform-gpu transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg font-semibold">
                      {edu.institution}
                    </CardTitle>
                    <CardDescription className="mt-1 text-primary">
                      {edu.degree}
                    </CardDescription>
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <GraduationCap className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <p className="pt-4 text-sm text-muted-foreground">
                  {edu.startDate} - {edu.endDate || 'Present'}
                </p>
                {edu.description && (
                  <p className="pt-2 text-sm">{edu.description}</p>
                )}
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
