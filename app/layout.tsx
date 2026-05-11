import type { Metadata } from 'next'
import { Plus_Jakarta_Sans, Space_Grotesk } from 'next/font/google'
import './globals.css'

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  weight: ['300', '400', '500', '600', '700', '800'],
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  weight: ['300', '400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: 'Leticia Olazar — Estudio Jurídico',
  description:
    'Asesoramiento jurídico profesional en derecho laboral, familia y sucesiones. Paraná, Entre Ríos.',
  keywords: [
    'abogada',
    'estudio jurídico',
    'derecho laboral',
    'derecho de familia',
    'sucesiones',
    'Leticia Olazar',
    'Paraná',
    'Entre Ríos',
  ],
  openGraph: {
    title: 'Leticia Olazar — Estudio Jurídico',
    description: 'Asesoramiento jurídico profesional y personalizado en Paraná.',
    type: 'website',
  },
  themeColor: '#0d0d0d',
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="es"
      className={`${jakarta.variable} ${spaceGrotesk.variable} bg-[#f5f4f1]`}
    >
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
