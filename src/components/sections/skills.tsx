import { Badge } from '@/components/ui/badge';
import { skillsData } from '@/lib/data';

export default function Skills() {
  return (
    <section id="skills" className="w-full bg-card py-20 md:py-32">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">
            Technical Skills
          </h2>
          <p className="mt-4 text-muted-foreground">
            The tools and technologies I use to build modern web applications.
          </p>
        </div>
        <div className="mt-12 flex flex-wrap justify-center gap-4">
          {skillsData.map((skill) => (
            <Badge
              key={skill.name}
              variant="skill"
              className="flex transform cursor-default items-center gap-2 rounded-lg px-4 py-2 text-base transition-transform hover:scale-105"
            >
              {skill.icon && <skill.icon className="h-5 w-5" style={{ color: skill.color }} />}
              <span className='text-foreground'>{skill.name}</span>
            </Badge>
          ))}
        </div>
      </div>
    </section>
  );
}
