import type { Metadata } from 'next';

import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'Track my Map | Your personal heatmap',
  description: 'Personal heatmap and track viewer',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="border-gradient relative m-0 h-screen w-screen overflow-hidden bg-gray-50 p-0">
        {children}
      </body>
    </html>
  );
}
