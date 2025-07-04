import React from 'react'

export default function LegalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gradient-to-tl from-indigo-950 to-black">
      {children}
    </div>
  )
}