
// path: app/%28dashboard%29/%28routes%29/interview/_components/addNewInterviewCard.tsx
'use client'; // Ensure this is a client-side component

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2, PlusCircle } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import openai from '@/lib/openaiClient';

interface AddNewInterviewCardProps {}

const AddNewInterviewCard: React.FC<AddNewInterviewCardProps> = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [jobPosition, setJobPosition] = useState('');
  const [jobDesc, setJobDesc] = useState('');
  const [jobExperience, setJobExperience] = useState('');
  const [loading, setLoading] = useState(false);

  // const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   setLoading(true);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    if (!jobPosition || !jobDesc || !jobExperience) {
        console.error("All fields are required");
        return;
    }

    setLoading(true);

    const inputPrompt = `Job position: ${jobPosition}, Job Description: ${jobDesc}, Years of Experience: ${jobExperience}. Based on this information, please generate 5 interview questions with answers in JSON format.`;

    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                { role: "system", content: "You are an AI interviewer." },
                { role: "user", content: inputPrompt },
            ],
        });

        const content = completion.choices[0]?.message?.content;

        if (content) {
            console.log("Raw API Response:", content);

            // Attempt to extract the JSON part of the response
            const jsonStartIndex = content.indexOf('{');
            const jsonEndIndex = content.lastIndexOf('}') + 1;

            if (jsonStartIndex !== -1 && jsonEndIndex !== -1) {
                const jsonString = content.slice(jsonStartIndex, jsonEndIndex);

                try {
                    const parsedJson = JSON.parse(jsonString);
                    console.log("Parsed JSON:", parsedJson);

                    // Save to the database
                    await fetch('/api/interview', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            jsonMockResp: JSON.stringify(parsedJson),
                            jobPosition,
                            jobDesc,
                            jobExperience: parseInt(jobExperience),
                        }),
                    });

                } catch (error) {
                    console.error("Failed to parse JSON:", error);
                }
            } else {
                console.error("No JSON found in the response");
            }
        } else {
            console.warn("No content returned from OpenAI.");
        }
    } catch (error) {
        console.error("Error generating interview questions:", error);
    } finally {
        setLoading(false);
    }
  };
  return (
    <div className="bg-sky-500 rounded-lg shadow-md p-4 flex flex-col items-center justify-center">
      <div className="p-10">
        <Button
          variant="default"
          className="flex items-center hover:bg-sky-600"
          onClick={() => setOpenDialog(true)}
        >
          <PlusCircle className="h-4 w-4 mr-2" />
          Add New Interview
        </Button>
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Tell us more about the job you are interviewing</DialogTitle>
            <DialogDescription>
              <form onSubmit={onSubmit}>
                <div>
                  <p>Add details about the job position, your skills, and years of experience.</p>
                  <div className="mt-5 my-4">
                    <label>Job Role</label>
                    <Input
                      placeholder="e.g Midwifery Nurse"
                      required
                      onChange={(e) => setJobPosition(e.target.value)}
                    />
                  </div>
                  <div className="my-4">
                    <label>Job Description</label>
                    <Textarea
                      placeholder="e.g. Maternity ward supervisor"
                      required
                      onChange={(e) => setJobDesc(e.target.value)}
                    />
                  </div>
                  <div className="my-4">
                    <label>Years of experience</label>
                    <Input
                      placeholder="e.g. 10"
                      type="number"
                      onChange={(e) => setJobExperience(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex gap-5 justify-between">
                  <Button variant="ghost" onClick={() => setOpenDialog(false)}>Cancel</Button>
                  <Button variant="default" type="submit" disabled={loading}>
                    {loading ? 
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> 
                        Generating...
                      </> 
                      : 'Start Interview'
                    }
                  </Button>
                </div>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddNewInterviewCard;
