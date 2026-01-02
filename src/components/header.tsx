import Link from 'next/link';
import { FileText, Github, Linkedin } from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';
import { MobileNav } from './mobile-nav';
import { Button } from './ui/button';
import { profileData } from '@/lib/data';

const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Education', href: '#education' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#portfolio' },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center">
        <Link href="/" className="mr-6 flex items-center gap-2">
          <FileText className="h-6 w-6 text-primary" />
          <span className="font-headline text-lg font-bold">ProfilePilot</span>
        </Link>
        <nav className="hidden flex-1 items-center gap-6 text-sm font-medium md:flex">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-foreground/80 transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex flex-1 items-center justify-end gap-2">
          <Button variant="ghost" size="icon" asChild>
            <a href={profileData.social.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <Github className="h-5 w-5" />
            </a>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <a href={profileData.social.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <Linkedin className="h-5 w-5" />
            </a>
          </Button>
          <ThemeToggle />
          <Button asChild className="hidden sm:inline-flex">
            <Link href="#contact">Contact Me</Link>
          </Button>
          <MobileNav navItems={navItems} />
        </div>
      </div>
    </header>
  );
}
