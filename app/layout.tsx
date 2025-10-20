import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'ExpoAfrica - Connect Talent with Opportunities',
  description: 'A premium platform connecting international exhibitions and conferences with skilled local professionals across Africa.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-gray-50">
        {children}
      </body>
    </html>
  )
}
