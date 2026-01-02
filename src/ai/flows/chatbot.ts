'use server';
/**
 * @fileOverview A chatbot flow that answers questions about Vikash Kumar Singh.
 *
 * - askChatbot - A function that takes a question and returns an answer.
 * - ChatbotInput - The input type for the askChatbot function.
 * - ChatbotOutput - The return type for the askChatbot function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { profileData, workExperienceData, educationData, skillsData, projectsData } from '@/lib/data';

const MessageSchema = z.object({
  role: z.enum(['user', 'assistant']),
  content: z.string(),
});
export type Message = z.infer<typeof MessageSchema>;

const ChatbotInputSchema = z.object({
    messages: z.array(MessageSchema),
});
export type ChatbotInput = z.infer<typeof ChatbotInputSchema>;

const ChatbotOutputSchema = z.object({
  answer: z.string().describe('The answer to the question based on the provided context.'),
});
export type ChatbotOutput = z.infer<typeof ChatbotOutputSchema>;

export async function askChatbot(input: ChatbotInput): Promise<ChatbotOutput> {
  return chatbotFlow(input);
}

const profileContext = `
  Name: ${profileData.name}
  Title: ${profileData.title}
  Bio: ${profileData.bio}
  Email: ${profileData.email}
  Phone: ${profileData.phone}
  LinkedIn: ${profileData.social.linkedin}
  GitHub: ${profileData.social.github}
`;

const experienceContext = workExperienceData.map(exp => 
  `- ${exp.title} at ${exp.company} (${exp.startDate} - ${exp.endDate || 'Present'}): ${exp.description}`
).join('\n');

const educationContext = educationData.map(edu => 
  `- ${edu.degree} from ${edu.institution} (${edu.startDate} - ${edu.endDate})`
).join('\n');

const skillsContext = skillsData.map(skill => skill.name).join(', ');

const projectsContext = projectsData.map(proj => 
  `- ${proj.title}: ${proj.description}`
).join('\n');

const chatbotPrompt = ai.definePrompt({
  name: 'chatbotPrompt',
  input: { schema: ChatbotInputSchema },
  output: { schema: ChatbotOutputSchema },
  prompt: `You are a friendly and engaging AI assistant for Vikash Kumar Singh. Your primary goal is to answer questions about his professional background in a helpful and welcoming manner, based ONLY on the conversation history and context provided below.

**Your Persona:**
- **Welcoming:** Start your answers in a warm, conversational tone.
- **Helpful:** Directly answer the user's question using the provided context. If the user asks for information in a specific format (like a table), use Markdown to format your response accordingly.
- **Context-Aware:** Use the provided conversation history to understand follow-up questions and maintain context. The user's latest message is the last one in the 'messages' array.
- **Engaging:** After answering, always end by encouraging the user to ask more questions. For example: "Is there anything else you'd like to know?" or "What other questions do you have about his experience?".
- **Concise:** Keep your answers clear and to the point.
- **Polite:** If the answer is not in the context, politely state that you don't have that information and ask if there is another way you can help.

**CONTEXT:**

**Profile:**
${profileContext}

**Work Experience:**
${experienceContext}

**Key Projects & Initiatives:**
${projectsContext}

**Education:**
${educationContext}

**Technical Skills:**
${skillsContext}

---

**CONVERSATION HISTORY:**
{{#each messages}}
  **{{role}}:** {{{content}}}
{{/each}}

---

Based on your persona, the conversation history, and the context, provide a helpful and engaging answer to the user's latest question. Use Markdown for formatting if it enhances the clarity of the response (e.g., for tables, lists).`,
});


const chatbotFlow = ai.defineFlow(
  {
    name: 'chatbotFlow',
    inputSchema: ChatbotInputSchema,
    outputSchema: ChatbotOutputSchema,
  },
  async (input) => {
    const { output } = await chatbotPrompt(input);
    
    if (!output?.answer) {
      console.error("AI failed to generate a valid answer. Raw output:", output);
      return { answer: "I'm sorry, I encountered an unexpected issue while generating a response. Could you please try asking in a different way or try again shortly?" };
    }

    return output;
  }
);
