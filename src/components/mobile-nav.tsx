
'use client';

import { useState } from 'react';
import Link, { LinkProps } from 'next/link';
import { useRouter } from 'next/navigation';
import { Menu, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

interface MobileNavProps {
  navItems: {
    label: string;
    href: string;
  }[];
}

export function MobileNav({ navItems }: MobileNavProps) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="pr-0">
        <SheetHeader className="sr-only">
          <SheetTitle>Mobile Navigation</SheetTitle>
          <SheetDescription>A list of links to navigate the site.</SheetDescription>
        </SheetHeader>
        <MobileLink
          href="/"
          className="flex items-center"
          onOpenChange={setOpen}
        >
          <FileText className="mr-2 h-6 w-6 text-primary" />
          <span className="font-headline font-bold">ProfilePilot</span>
        </MobileLink>
        <div className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
          <div className="flex flex-col space-y-3">
            {navItems.map((item) => (
              <MobileLink
                key={item.href}
                href={item.href}
                onOpenChange={setOpen}
              >
                {item.label}
              </MobileLink>
            ))}
             <MobileLink
                href="#contact"
                onOpenChange={setOpen}
                className='mt-4'
              >
                <Button>Contact Me</Button>
              </MobileLink>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

interface MobileLinkProps extends LinkProps {
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
  className?: string;
}

function MobileLink({
  href,
  onOpenChange,
  className,
  children,
  ...props
}: MobileLinkProps) {
  const router = useRouter();
  return (
    <Link
      href={href}
      onClick={() => {
        router.push(href.toString());
        onOpenChange?.(false);
      }}
      className={cn(className)}
      {...props}
    >
      {children}
    </Link>
  );
}
