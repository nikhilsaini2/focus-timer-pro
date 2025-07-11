import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import type React from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CustomCursor } from "@/components/CustomCursor"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "FocusTimer - Boost Your Productivity with Pomodoro Technique",
  description: "Simple, effective Pomodoro timer app to enhance your focus and productivity",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-black text-white antialiased min-h-screen flex flex-col`}>
        <CustomCursor />
        <Header />
        <main className="flex-1 pt-20 pb-20">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
