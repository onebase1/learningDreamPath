//path: app/%28dashboard%29/%28routes%29/teacher/analytics/_components/data-card.tsx
import { 
  Card, 
  CardContent, 
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { formatPrice } from "@/lib/format";

interface DataCardProps {
  value: number;
  label: string;
  shouldFormat?: boolean;
  subtitle?: string; // Add subtitle prop
}

export const DataCard = ({
  value,
  label,
  shouldFormat,
  subtitle, // Add subtitle prop
}: DataCardProps) => {
  return (
   <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">
        {label}
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">
        {shouldFormat ? formatPrice(value) : value}
      </div>
      {subtitle && <div className="text-sm text-gray-500">{subtitle}</div>} {/* Add subtitle */}
    </CardContent>
   </Card>
  )
}