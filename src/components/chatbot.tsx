'use client';

import { useState, useRef, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { askChatbotAction } from '@/app/actions';
import { Loader2, Bot, User, CornerDownLeft } from 'lucide-react';
import { ScrollArea } from './ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { profileData } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import type { Message } from '@/ai/flows/chatbot';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const avatarImage = PlaceHolderImages.find(img => img.id === profileData.avatar);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async () => {
    const question = input.trim();
    if (!question) return;

    const userMessage: Message = { role: 'user', content: question };
    const newMessages: Message[] = [...messages, userMessage];
    
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    const result = await askChatbotAction(newMessages);
    setIsLoading(false);

    if (result.success && result.data) {
      const assistantMessage: Message = { role: 'assistant', content: result.data };
      setMessages((prev) => [...prev, assistantMessage]);
    } else {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: result.error || 'An unknown error occurred.',
      });
      // remove the user message if the call fails
       setMessages((prev) => prev.slice(0, prev.length - 1));
    }
  };

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) {
      setMessages([]);
      setInput('');
      setIsLoading(false);
    } else {
        setMessages([{ role: 'assistant', content: "Hello! I'm Vikash's AI assistant. Feel free to ask me anything about his professional experience."}])
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline" size="lg" className="w-full sm:w-auto">
          <Bot className="mr-2 h-4 w-4" />
          Ask AI
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl h-[70vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="font-headline flex items-center gap-2">
            <Bot className="h-6 w-6 text-primary" />
            AI Assistant
          </DialogTitle>
          <DialogDescription>
            Ask me any questions about Vikash's skills, experience, or projects.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="flex-1 -mx-6 px-6">
            <div className="space-y-6 pr-4">
            {messages.map((message, index) => (
                <div key={index} className={`flex items-start gap-4 ${message.role === 'user' ? 'justify-end' : ''}`}>
                {message.role === 'assistant' && (
                    <Avatar className="h-8 w-8 border-2 border-primary/40">
                        <AvatarImage src={avatarImage?.imageUrl} alt="Vikash Kumar Singh" />
                        <AvatarFallback>{profileData.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                )}
                <div className={`rounded-lg p-3 max-w-[80%] text-sm ${message.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                  <article className="prose prose-sm dark:prose-invert max-w-none">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {message.content}
                    </ReactMarkdown>
                  </article>
                </div>
                 {message.role === 'user' && (
                    <Avatar className="h-8 w-8">
                         <AvatarFallback><User className='h-5 w-5'/></AvatarFallback>
                    </Avatar>
                )}
                </div>
            ))}
            {isLoading && (
                <div className="flex items-start gap-4">
                    <Avatar className="h-8 w-8 border-2 border-primary/40">
                        <AvatarImage src={avatarImage?.imageUrl} alt="Vikash Kumar Singh" />
                        <AvatarFallback>{profileData.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="rounded-lg p-3 max-w-[80%] bg-muted">
                        <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                    </div>
                </div>
            )}
             <div ref={messagesEndRef} />
            </div>
        </ScrollArea>
        <DialogFooter>
          <div className="relative w-full">
            <Input
              placeholder="e.g., 'What are his top skills?'"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
              disabled={isLoading}
              className="pr-12"
            />
            <Button 
                size="icon" 
                className="absolute right-2 top-1/2 -translate-y-1/2 h-7 w-7"
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
            >
                <CornerDownLeft className="h-4 w-4" />
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
