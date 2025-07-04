import React from 'react'
import { Card } from "@/components/ui/card"

interface CustomAlertProps {
  title: string
  children: React.ReactNode
  variant?: 'default' | 'warning' | 'info'
}

const CustomAlert = ({ title, children, variant = 'default' }: CustomAlertProps) => {
  const getBgColor = () => {
    switch (variant) {
      case 'warning':
        return 'bg-yellow-50 border-yellow-200'
      case 'info':
        return 'bg-blue-50 border-blue-200'
      default:
        return 'bg-gray-50 border-gray-200'
    }
  }

  return (
    <Card className={`p-4 my-4 border-2 ${getBgColor()}`}>
      <h4 className="font-semibold mb-2">{title}</h4>
      <div className="text-sm">{children}</div>
    </Card>
  )
}

export default CustomAlert