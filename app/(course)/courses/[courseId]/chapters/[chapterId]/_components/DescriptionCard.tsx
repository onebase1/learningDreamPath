import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

interface DescriptionCardProps {
  title: string;
  description: string;
}

const DescriptionCard: React.FC<DescriptionCardProps> = ({ title, description }) => (
  <Card className="bg-gray-100 p-4 rounded mb-4">
    <CardHeader>
      <CardTitle className="font-bold mb-2">{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <CardDescription>{description}</CardDescription>
    </CardContent>
  </Card>
);

export default DescriptionCard;