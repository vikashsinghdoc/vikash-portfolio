'use server';

/**
 * @fileOverview Resume generation flow from profile data.
 *
 * - generateResumeFromProfile - A function that generates a resume from profile data.
 * - GenerateResumeFromProfileInput - The input type for the generateResumeFromProfile function.
 * - GenerateResumeFromProfileOutput - The return type for the generateResumeFromProfile function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateResumeFromProfileInputSchema = z.object({
  name: z.string().describe('The full name of the person.'),
  title: z.string().describe('The job title of the person.'),
  email: z.string().email().describe('The email address of the person.'),
  phone: z.string().describe('The phone number of the person.'),
  linkedin: z.string().url().optional().describe('The LinkedIn profile URL of the person.'),
  github: z.string().url().optional().describe('The GitHub profile URL of the person.'),
  workExperience: z
    .array(
      z.object({
        title: z.string().describe('The job title.'),
        company: z.string().describe('The company name.'),
        startDate: z.string().describe('The start date of the job.'),
        endDate: z.string().optional().describe('The end date of the job. If the job is current, leave blank'),
        description: z.string().describe('The description of the job.'),
      })
    )
    .describe('The work experience of the person.'),
  education: z
    .array(
      z.object({
        institution: z.string().describe('The name of the institution.'),
        degree: z.string().describe('The degree obtained.'),
        startDate: z.string().describe('The start date of the education.'),
        endDate: z.string().optional().describe('The end date of the education. If the education is current, leave blank'),
        description: z.string().optional().describe('The description of the education.'),
      })
    )
    .describe('The education of the person.'),
  skills: z.array(z.string()).describe('The skills of the person.'),
  bio: z.string().describe('A professional summary or bio.'),
  jobDescription: z.string().describe('The description of the job the resume is being tailored for.'),
});
export type GenerateResumeFromProfileInput = z.infer<typeof GenerateResumeFromProfileInputSchema>;

const GenerateResumeFromProfileOutputSchema = z.object({
  resume: z.string().describe('The generated resume as a single block of clean, semantic HTML. It must not contain any markdown or plain text.'),
});
export type GenerateResumeFromProfileOutput = z.infer<typeof GenerateResumeFromProfileOutputSchema>;

export async function generateResumeFromProfile(input: GenerateResumeFromProfileInput): Promise<GenerateResumeFromProfileOutput> {
  return generateResumeFromProfileFlow(input);
}

const resumePrompt = ai.definePrompt({
  name: 'resumePrompt',
  input: {schema: GenerateResumeFromProfileInputSchema},
  output: {schema: GenerateResumeFromProfileOutputSchema},
  prompt: `You are a world-class resume writer and UI designer. Your task is to generate a visually appealing, professional resume as a single block of clean, semantic HTML. The design should be modern and inspired by the provided LaTeX template structure, but adapted for HTML.

**CRITICAL INSTRUCTIONS:**
1.  **Output Format:** The entire output MUST be a single string of HTML. Do not include markdown, backticks, or any non-HTML text.
2.  **Styling:** Use inline CSS for all styling (e.g., \`<div style="font-family: Arial, sans-serif; color: #333;">\`). Do not use \`<style>\` tags or external stylesheets.
3.  **Layout:**
    *   Use a single-column layout.
    *   Use \`<div>\`s for structure.
    *   Use \`<h1>\`, \`<h2>\`, \`<h3>\`, \`<h4>\`, \`<p>\`, and \`<ul>/<li>\` for semantic content.
    *   Create clear visual separation between sections using horizontal rules (\`<hr style="border-top: 1px solid #ccc;">\`) or margins.
4.  **Content Generation:**
    *   Analyze the provided job description and the user's profile data.
    *   Rewrite and tailor the user's experience and summary to be a perfect match for the target role.
    *   Quantify achievements with metrics wherever possible (e.g., "improved performance by 30%").
    *   Ensure the tone is professional and confident.

**DESIGN GUIDELINES (Inspired by LaTeX template):**
*   **Header:**
    *   Full name in a large, bold font (\`<h1>\`).
    *   Job title directly below the name.
    *   Contact info (email, phone, LinkedIn) in a smaller font, separated by pipe characters (|).
*   **Sections:**
    *   Use bold, uppercase headings for sections like "Profile Summary", "Work Experience", etc. (\`<h3 style="text-transform: uppercase; border-bottom: 1px solid #000; padding-bottom: 4px;">\`).
*   **Work Experience:**
    *   For each job, display the Company and Dates on the same line, with dates right-aligned. Use flexbox for this (\`<div style="display: flex; justify-content: space-between;">\`).
    *   Job title should be on the next line in italics.
    *   Responsibilities and achievements should be in an unordered list (\`<ul>\`) with bullet points.
*   **Skills:**
    *   Group skills by category (e.g., Languages, Automation, Tools) using bold labels.

**PROFILE DATA:**
Name: {{{name}}}
Title: {{{title}}}
Email: {{{email}}}
Phone: {{{phone}}}
LinkedIn: {{{linkedin}}}
GitHub: {{{github}}}
Bio: {{{bio}}}

Work Experience:
{{#each workExperience}}
  - Company: {{{company}}}, Title: {{{title}}}, Dates: {{{startDate}}} - {{{endDate}}}, Description: {{{description}}}
{{/each}}

Education:
{{#each education}}
  - Institution: {{{institution}}}, Degree: {{{degree}}}, Dates: {{{startDate}}} - {{{endDate}}}, Description: {{{description}}}
{{/each}}

Skills: {{#each skills}}{{{this}}}{{/each}}

**TARGET JOB DESCRIPTION:**
{{{jobDescription}}}

Now, generate the complete, single-string HTML resume based on these instructions.`,
});

const generateResumeFromProfileFlow = ai.defineFlow(
  {
    name: 'generateResumeFromProfileFlow',
    inputSchema: GenerateResumeFromProfileInputSchema,
    outputSchema: GenerateResumeFromProfileOutputSchema,
  },
  async input => {
    const {output} = await resumePrompt(input);
    return output!;
  }
);
