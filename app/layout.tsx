import "../styles/globals.css"
import type { Metadata } from "next"
import { IBM_Plex_Mono, IBM_Plex_Sans, Syne } from "next/font/google"
import Script from "next/script"
import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar"
import Providers from "@/components/Providers"

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700", "800"],
})

const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
})

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500", "600"],
})

export const metadata: Metadata = {
  title: "Yashwant Jankay",
  description: "Senior Data Scientist + AI/ML Engineer portfolio",
  icons: {
    icon: "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>👋</text></svg>",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${syne.variable} ${plexSans.variable} ${plexMono.variable} bg-surface text-ink antialiased`}
      >
        <Providers>
          <div className="relative min-h-screen overflow-x-clip">
            <Navbar />
            {children}
            <Footer />
          </div>
        </Providers>

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
