'use client';

import { Button } from '@/components/ui/button'
import { Download } from 'lucide-react'
import { useState } from 'react'

interface DownloadPDFProps {
  documentType: 'privacy' | 'terms' | 'guidelines'
  variant?: 'default' | 'outline'
  size?: 'default' | 'sm' | 'lg'
}

export default function DownloadPDF({ 
  documentType, 
  variant = 'outline',
  size = 'sm'
}: DownloadPDFProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleDownload = async () => {
    try {
      setIsLoading(true)
      // Replace with your actual S3 URL or API endpoint
      const response = await fetch(`/api/legal/download/${documentType}`)
      const blob = await response.blob()
      
      // Create a download link
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.style.display = 'none'
      a.href = url
      a.download = `dreampath-${documentType}.pdf`
      
      document.body.appendChild(a)
      a.click()
      
      // Cleanup
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (error) {
      console.error('Error downloading PDF:', error)
      // You might want to add toast notification here
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleDownload}
      disabled={isLoading}
      className="flex items-center gap-2"
    >
      <Download className="w-4 h-4" />
      {isLoading ? 'Downloading...' : 'Download PDF'}
    </Button>
  )
}