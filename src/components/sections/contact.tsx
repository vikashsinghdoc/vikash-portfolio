'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { sendContactEmailAction } from '@/app/actions';
import { useActionState, useEffect, useRef } from 'react';
import { useFormStatus } from 'react-dom';

const initialState = {
  success: false,
  error: null,
  fieldErrors: null,
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? 'Sending...' : 'Send Message'}
    </Button>
  );
}

export default function Contact() {
  const { toast } = useToast();
  const [state, formAction] = useActionState(sendContactEmailAction, initialState as any);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.success) {
      toast({
        title: 'Message Sent!',
        description: 'Thanks for reaching out! I will get back to you shortly.',
      });
      formRef.current?.reset();
    } else if (state.error) {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: state.error,
      });
    }
  }, [state, toast]);

  return (
    <section id="contact" className="w-full bg-card py-20 md:py-32">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">
            Get in Touch
          </h2>
          <p className="mt-4 text-muted-foreground">
            Have a question, a project idea, or just want to say hi? Send me a
            message!
          </p>
        </div>
        <div className="mx-auto mt-12 max-w-xl">
          <form ref={formRef} action={formAction} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" placeholder="Your Name" required />
              {state?.fieldErrors?.name && <p className="text-sm text-destructive">{state.fieldErrors.name.join(', ')}</p>}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="your@email.com"
                required
              />
              {state?.fieldErrors?.email && <p className="text-sm text-destructive">{state.fieldErrors.email.join(', ')}</p>}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                name="message"
                placeholder="Your message here..."
                required
                rows={5}
              />
              {state?.fieldErrors?.message && <p className="text-sm text-destructive">{state.fieldErrors.message.join(', ')}</p>}
            </div>
            <SubmitButton />
          </form>
        </div>
      </div>
    </section>
  );
}
