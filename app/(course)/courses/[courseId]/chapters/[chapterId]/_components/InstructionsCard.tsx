import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

interface InstructionsCardProps {
  title: string;
  instructions: string;
}

const InstructionsCard: React.FC<InstructionsCardProps> = ({ title, instructions }) => (
  <Card className="bg-gray-100 p-4 rounded mb-4">
    {/* <CardHeader>
      <CardTitle className="font-bold mb-2">{title}</CardTitle>
    </CardHeader> */}
    <CardContent>
      <CardDescription>{instructions}</CardDescription>
    </CardContent>
  </Card>
);

export default InstructionsCard;