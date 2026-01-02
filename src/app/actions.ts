'use server';

import { askChatbot, type Message } from '@/ai/flows/chatbot';
import { generateResumeFromProfile, type GenerateResumeFromProfileInput } from '@/ai/flows/resume-from-profile';
import { ContactEmail } from '@/components/emails/contact-email';
import { Resend } from 'resend';
import { z } from 'zod';

const resend = new Resend(process.env.RESEND_API_KEY);

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.'),
  email: z.string().email('Invalid email address.'),
  message: z.string().min(10, 'Message must be at least 10 characters.'),
});

export async function askChatbotAction(messages: Message[]) {
  try {
    const result = await askChatbot({ messages });
    return { success: true, data: result.answer };
  } catch (error) {
    console.error('Error getting chatbot answer:', error);
    return { success: false, error: 'Failed to get answer. Please try again.' };
  }
}

export async function sendContactEmailAction(prevState: any, formData: FormData) {
  const parsed = contactSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    message: formData.get('message'),
  });

  if (!parsed.success) {
    return { 
      success: false, 
      error: 'Invalid form data.',
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  const { name, email, message } = parsed.data;

  if (!process.env.RESEND_RECIPIENT_EMAIL) {
    console.error('Resend recipient email is not configured.');
    return { success: false, error: 'Server is not configured to send emails.' };
  }

  try {
    const { data, error } = await resend.emails.send({
      from: `Portfolio Contact <onboarding@resend.dev>`,
      to: [process.env.RESEND_RECIPIENT_EMAIL],
      reply_to: email,
      subject: `New message from ${name} via your portfolio`,
      react: ContactEmail({ name, email, message }),
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
    });

    if (error) {
      console.error('Resend error:', error);
      return { success: false, error: 'Failed to send email. Please try again later.' };
    }

    return { success: true, data: 'Message sent successfully!' };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error: 'An unexpected error occurred. Please try again.' };
  }
}

export async function generateResumeAction(input: GenerateResumeFromProfileInput) {
  try {
    const result = await generateResumeFromProfile(input);
    return { success: true, data: result.resume };
  } catch (error: any) {
    console.error('Error generating resume:', error);
    const errorMessage = error.message || 'An unexpected error occurred while generating the resume.';
    return { success: false, error: errorMessage };
  }
}
