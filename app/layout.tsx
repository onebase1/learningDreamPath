import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
import { ToastProvider } from '@/components/providers/toaster-provider';
import { ConfettiProvider } from '@/components/providers/confetti-provider';
import { DisplayDebug } from '@/components/DisplayDebug';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Dreampath',
  description: 'Learning | Platform',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider waitlistUrl="/beta">
      <html lang="en">
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
        </head>
        <body className={inter.className}>
          {process.env.NODE_ENV === 'development' && <DisplayDebug />}
          <ConfettiProvider />
          <ToastProvider />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}