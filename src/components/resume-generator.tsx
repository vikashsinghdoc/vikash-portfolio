'use client';

import { useState, useRef } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { generateResumeAction } from '@/app/actions';
import { Loader2, FileText, Download, FileType } from 'lucide-react';
import { profileData, workExperienceData, educationData, skillsData } from '@/lib/data';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export function ResumeGenerator() {
  const [jobDescription, setJobDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [generatedResume, setGeneratedResume] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isResultOpen, setIsResultOpen] = useState(false);
  const { toast } = useToast();
  const resumeContentRef = useRef<HTMLDivElement>(null);

  const handleGenerate = async () => {
    if (!jobDescription.trim()) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Please paste a job description.',
      });
      return;
    }

    setIsLoading(true);
    setGeneratedResume('');

    const input = {
      ...profileData,
      linkedin: profileData.social.linkedin,
      github: profileData.social.github,
      workExperience: workExperienceData,
      education: educationData,
      skills: skillsData.map(s => s.name),
      jobDescription,
    };

    const result = await generateResumeAction(input);
    setIsLoading(false);

    if (result.success && result.data) {
      setGeneratedResume(result.data);
      setIsDialogOpen(false); // Close the input dialog
      setIsResultOpen(true); // Open the result dialog
    } else {
      toast({
        variant: 'destructive',
        title: 'Error Generating Resume',
        description: result.error || 'An unknown error occurred.',
      });
    }
  };

  const handleDownloadHTML = () => {
    const blob = new Blob([generatedResume], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'resume.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  
  const handleDownloadPDF = async () => {
    if (!resumeContentRef.current) return;
    toast({ title: 'Generating PDF...', description: 'Please wait a moment.' });
    
    const canvas = await html2canvas(resumeContentRef.current, {
        scale: 2, 
        useCORS: true,
        logging: false,
    });
    
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
        orientation: 'p',
        unit: 'px',
        format: [canvas.width, canvas.height]
    });

    pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
    pdf.save('resume.pdf');
  };

  const handleOpenChange = (isOpen: boolean) => {
    setIsDialogOpen(isOpen);
    if (!isOpen) {
      setJobDescription('');
      setIsLoading(false);
    }
  };

  const handleResultOpenChange = (isOpen: boolean) => {
    setIsResultOpen(isOpen);
    if (!isOpen) {
      setGeneratedResume('');
    }
  };

  return (
    <>
      <Dialog open={isDialogOpen} onOpenChange={handleOpenChange}>
        <DialogTrigger asChild>
           <Button variant="outline" size="lg" className="w-full sm:w-auto">
            <FileText className="mr-2 h-4 w-4" />
            Create Resume
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle>Generate Tailored Resume</DialogTitle>
            <DialogDescription>
              Paste a job description below, and the AI will generate a resume tailored specifically for that role.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Textarea
              placeholder="Paste the job description here..."
              rows={12}
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              disabled={isLoading}
            />
          </div>
          <DialogFooter>
            <Button onClick={handleGenerate} disabled={isLoading || !jobDescription.trim()}>
              {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              {isLoading ? 'Generating...' : 'Generate'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isResultOpen} onOpenChange={handleResultOpenChange}>
          <DialogContent className="max-w-4xl h-[90vh] flex flex-col">
              <DialogHeader>
                  <DialogTitle>Generated Resume</DialogTitle>
                  <DialogDescription>
                      Here is the AI-generated resume. You can download it as an HTML or PDF file.
                  </DialogDescription>
              </DialogHeader>
              <div className="flex-1 overflow-auto border rounded-md p-4 bg-white text-black" id="resume-content-wrapper">
                <div ref={resumeContentRef} dangerouslySetInnerHTML={{ __html: generatedResume }} />
              </div>
              <DialogFooter className="mt-4">
                  <Button variant="outline" onClick={handleDownloadHTML}><Download className="mr-2" /> Download HTML</Button>
                  <Button onClick={handleDownloadPDF}><FileType className="mr-2" /> Download PDF</Button>
                  <DialogClose asChild>
                    <Button variant="secondary">Close</Button>
                  </DialogClose>
              </DialogFooter>
          </DialogContent>
      </Dialog>
    </>
  );
}
