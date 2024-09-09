"use client"
import "../styles/globals.css"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { ThemeProvider } from "next-themes"
import Script from 'next/script'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head>
        <Script
          src="https://beamanalytics.b-cdn.net/beam.min.js"
          data-token="712ffbe5-3e6e-46bf-b828-a5c7f652dac4"
          strategy="afterInteractive"
          async
        />
      </head>
      <body className="dark:bg-stone-900">
        <ThemeProvider enableSystem={true} attribute="class">
          <Navbar />
          {children}
          <Footer />
        </ThemeProvider>
        <Script
          src="https://beamanalytics.b-cdn.net/beam.min.js"
          data-token="712ffbe5-3e6e-46bf-b828-a5c7f652dac4"
          strategy="afterInteractive"
          async
        />
      </body>
    </html>
  )
}
