import './globals.css';

import type { Metadata } from 'next';
import { Toaster } from 'react-hot-toast';

export const metadata: Metadata = {
  title: {
    template: '%s - Friends',
    default: 'Friends',
  },
  description: 'Friends | Social Media Platform',
  icons: {
    icon: '/icon___.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Toaster
          toastOptions={{
            success: {
              duration: 1500,
            },
          }}
        />

        {children}
      </body>
    </html>
  );
}
