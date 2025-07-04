import React from "react";
import { Card, CardFooter, CardDescription } from "@/components/ui/card";

interface FooterCardProps {
  footer: string;
}

const FooterCard: React.FC<FooterCardProps> = ({ footer }) => (
  <Card className="bg-gray-100 p-4 rounded mb-4">
    <CardFooter>
      <CardDescription>{footer}</CardDescription>
    </CardFooter>
  </Card>
);

export default FooterCard;