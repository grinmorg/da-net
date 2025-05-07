import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import './globals.css'
import Nav from '@/components/nav'
import { ViewTransitions } from 'next-view-transitions'
import { ThemeProvider } from '@/components/theme-provider'
import Script from 'next/script'
import { getSiteTitle } from '@/lib/utils'

const montserrat = Montserrat({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: getSiteTitle('сделай свой выбор'),
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
          {/* Analytics */}
          <Script id="metrika-counter" strategy="afterInteractive">
            {`(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
            m[i].l=1*new Date();
            for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
            k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
            (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
        
            ym(101430517, "init", {
                  clickmap:true,
                  trackLinks:true,
                  accurateTrackBounce:true,
                  webvisor:true
            });`}
          </Script>

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
