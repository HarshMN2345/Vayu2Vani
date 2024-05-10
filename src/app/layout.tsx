import Navbar from '@/components/Navbar'
import { Toaster } from '@/components/ui/toaster'
import { cn } from '@/lib/utils'
import '@/styles/globals.css'
import {Inter}  from "next/font/google"

export const metadata = {
  title: 'VayuVani',
  description: 'A community-driven platform crafted with Next.js and TypeScript, offering a rich environment for engaging discussions, knowledge sharing, and problem-solving within a coding-centric community.',
}
const inter=Inter({subsets:['latin']})

export default function RootLayout({
  children,authModal
}: {
  children: React.ReactNode
  authModal:React.ReactNode

}) {
  return (
    <html lang='en' className={cn('bg-white text-black antialiased light',inter.className)}>
      <body className='min-h-screen pt-12 bg-white text-black antialiased'>
        {/* @ts-expect-error Server Component */}
       <Navbar/>
       {authModal}
        <div className='container max-w-7xl mx-auto h-full pt-12'>
          {children}
        </div>
        <Toaster/>
      </body>
    </html>
  )
}
