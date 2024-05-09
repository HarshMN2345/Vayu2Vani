import Navbar from '@/components/Navbar'
import { cn } from '@/lib/utils'
import '@/styles/globals.css'
import {Inter}  from "next/font/google"

export const metadata = {
  title: 'VayuVani',
  description: 'A community-driven platform crafted with Next.js and TypeScript, offering a rich environment for engaging discussions, knowledge sharing, and problem-solving within a coding-centric community.',
}
const inter=Inter({subsets:['latin']})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en' className={cn('bg-black text-red-500 antialiased light',inter.className)}>
      <body className='min-h-screen pt-12 bg-black text-white antialiased'>
       <Navbar/>
        <div className='container max-w-7xl mx-auto h-full pt-12'>
          {children}
        </div>
      </body>
    </html>
  )
}
