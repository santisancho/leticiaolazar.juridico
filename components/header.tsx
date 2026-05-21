'use client'

import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { Cormorant_Garamond } from 'next/font/google'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
})

const navLinks = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Áreas', href: '#areas' },
  { label: 'Estudio', href: '#estudio' },
  { label: 'Proceso', href: '#proceso' },
  { label: 'Contacto', href: '#contacto' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('inicio')

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)

    window.addEventListener('scroll', handleScroll, {
      passive: true,
    })

    return () =>
      window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setActiveSection(e.target.id)
          }
        })
      },
      { threshold: 0.3 }
    )

    document
      .querySelectorAll('section[id]')
      .forEach((s) => observer.observe(s))

    return () => observer.disconnect()
  }, [])

  const onHeroSection =
    activeSection === 'inicio' && !scrolled

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-[#f8f7f4]/95 backdrop-blur-md border-b border-black/5'
            : 'bg-transparent'
        } ${cormorant.className}`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 h-[72px] flex items-center justify-between">
          
          {/* Minimal Brand */}
          <a
            href="#inicio"
            aria-label="Leticia Olazar Estudio Jurídico"
            className="group flex flex-col justify-center leading-none"
          >
            <span
              className={`text-[1.45rem] md:text-[1.65rem] tracking-[0.18em] uppercase transition-all duration-500 ${
                onHeroSection
                  ? 'text-white'
                  : 'text-black'
              }`}
              style={{
                fontWeight: 500,
              }}
            >
              Leticia Olazar
            </span>

            <span
              className={`mt-[4px] text-[8px] tracking-[0.38em] uppercase transition-all duration-500 ${
                onHeroSection
                  ? 'text-white/45'
                  : 'text-black/35'
              }`}
            >
              Estudio Jurídico
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`font-sans text-[11px] tracking-[0.16em] uppercase transition-all duration-300 relative ${
                  onHeroSection
                    ? 'text-white/70 hover:text-white'
                    : 'text-black/60 hover:text-black'
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <a
              href="https://wa.me/5493489484345"
              target="_blank"
              rel="noopener noreferrer"
              className={`hidden md:inline-flex items-center font-sans text-[10px] tracking-[0.14em] uppercase px-5 py-2.5 border transition-all duration-300 ${
                onHeroSection
                  ? 'border-white/30 text-white hover:bg-white hover:text-black'
                  : 'border-black/10 text-black hover:bg-black hover:text-white'
              }`}
            >
              WhatsApp
            </a>

            <button
              onClick={() => setMenuOpen(true)}
              className={`md:hidden p-1 transition-colors duration-300 ${
                onHeroSection
                  ? 'text-white'
                  : 'text-black'
              }`}
              aria-label="Abrir menú"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-[100] bg-[#0d0d0d] transition-all duration-500 flex flex-col ${
          menuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Top */}
        <div className="flex items-center justify-between px-6 h-[72px] border-b border-white/10">
          <div className="flex flex-col">
            <span className="text-white text-[1.3rem] tracking-[0.16em] uppercase">
              Leticia Olazar
            </span>

            <span className="mt-[4px] text-[8px] tracking-[0.34em] uppercase text-white/40">
              Estudio Jurídico
            </span>
          </div>

          <button
            onClick={() => setMenuOpen(false)}
            className="text-white/50 hover:text-white transition-colors"
            aria-label="Cerrar menú"
          >
            <X size={20} />
          </button>
        </div>

        {/* Links */}
        <nav className="flex flex-col px-6 pt-10 flex-1">
          {navLinks.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`text-[clamp(2.2rem,9vw,4rem)] uppercase tracking-[0.08em] py-4 border-b border-white/10 transition-all duration-500 ${
                menuOpen
                  ? 'translate-x-0 opacity-100 text-white'
                  : '-translate-x-6 opacity-0 text-white'
              }`}
              style={{
                transitionDelay: menuOpen
                  ? `${i * 70 + 100}ms`
                  : '0ms',
              }}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Bottom */}
        <div className="px-6 pb-12">
          <a
            href="https://wa.me/5493489484345"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center border border-white/20 px-6 py-3 text-[10px] tracking-[0.14em] uppercase text-white hover:bg-white hover:text-black transition-all duration-300"
          >
            Consultar por WhatsApp
          </a>
        </div>
      </div>
    </>
  )
}
