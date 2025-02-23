import { Inter } from 'next/font/google'
import { ThemeProvider } from 'next-themes'
import './globals.css'

import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { ReduxProvider } from '@/redux/provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'TrainTime',
  description: 'TrainTime',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ReduxProvider>
          <ThemeProvider attribute="class">
            <Navbar />
            <div>{children}</div>
            <Footer />
          </ThemeProvider>
        </ReduxProvider>
      </body>
    </html>
  )
}
