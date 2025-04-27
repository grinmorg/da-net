import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import './globals.css'
import Nav from '@/components/nav'
import { ViewTransitions } from 'next-view-transitions'
import { ThemeProvider } from '@/components/theme-provider'

const montserrat = Montserrat({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Da/net - сделай свой выбор',
  description:
    'Не можете принять решение? Мы поможем! На нашем сайте собраны лучшие инструменты для рандомного выбора: монетка (орёл/решка), колесо фортуны с настраиваемыми вариантами, виртуальный кубик, генератор случайных чисел и кинорулетка. Просто, весело, без ответственности!',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ViewTransitions>
      <html suppressHydrationWarning lang="ru">
        <body className={montserrat.className}>
          <ThemeProvider attribute="class" disableTransitionOnChange>
            <Nav />
            <main className="text-foreground mx-auto max-w-[1280px] px-5 pt-28 pb-10">
              {children}
            </main>
          </ThemeProvider>
        </body>
      </html>
    </ViewTransitions>
  )
}
