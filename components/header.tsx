'use client'

import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'

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
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveSection(e.target.id)
        })
      },
      { threshold: 0.3 }
    )
    document.querySelectorAll('section[id]').forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  const onHeroSection = activeSection === 'inicio' && !scrolled

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-[#f5f4f1]/96 backdrop-blur-md border-b border-[#d4d2cd]/60'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 h-[68px] flex items-center justify-between">
          {/* Logo */}
          <a href="#inicio" className="group flex flex-col leading-none select-none">
            <span
              className={`font-serif text-[13px] font-semibold tracking-[0.2em] uppercase transition-colors duration-500 ${
                onHeroSection ? 'text-white' : 'text-[#0d0d0d]'
              }`}
            >
              Leticia Olazar
            </span>
            <span
              className={`font-sans text-[8px] tracking-[0.35em] uppercase transition-colors duration-500 ${
                onHeroSection ? 'text-white/50' : 'text-[#a8a6a1]'
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
                className={`nav-link ${onHeroSection ? 'nav-link-white' : ''} font-sans text-[11px] tracking-[0.15em] uppercase transition-colors duration-300 ${
                  onHeroSection
                    ? 'text-white/70 hover:text-white'
                    : 'text-[#6b6b6b] hover:text-[#0d0d0d]'
                } ${activeSection === link.href.slice(1) ? 'active' : ''}`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <a
              href="https://wa.me/5493434000000"
              target="_blank"
              rel="noopener noreferrer"
              className={`hidden md:inline-flex items-center font-sans text-[11px] tracking-[0.12em] uppercase px-5 py-2.5 transition-all duration-300 ${
                onHeroSection
                  ? 'border border-white/40 text-white hover:bg-white hover:text-[#0d0d0d]'
                  : 'bg-[#0d0d0d] text-white hover:bg-[#1a1a1a]'
              }`}
            >
              WhatsApp
            </a>
            <button
              onClick={() => setMenuOpen(true)}
              className={`md:hidden p-1 transition-colors duration-300 ${
                onHeroSection ? 'text-white' : 'text-[#0d0d0d]'
              }`}
              aria-label="Abrir menú"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen mobile overlay */}
      <div
        className={`fixed inset-0 z-[100] bg-[#0d0d0d] flex flex-col transition-all duration-600 ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex items-center justify-between px-6 h-[68px] border-b border-white/10">
          <span className="font-serif text-[13px] tracking-[0.2em] uppercase text-white">
            Leticia Olazar
          </span>
          <button
            onClick={() => setMenuOpen(false)}
            className="text-white/50 hover:text-white transition-colors"
            aria-label="Cerrar menú"
          >
            <X size={20} />
          </button>
        </div>
        <nav className="flex flex-col px-6 pt-10 flex-1">
          {navLinks.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`font-serif text-[clamp(2.5rem,10vw,4rem)] leading-none py-4 border-b border-white/10 transition-all duration-500 text-white/20 hover:text-white ${
                menuOpen ? 'translate-x-0 opacity-100' : '-translate-x-6 opacity-0'
              }`}
              style={{ transitionDelay: menuOpen ? `${i * 70 + 100}ms` : '0ms' }}
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div className="px-6 pb-12">
          <a
            href="https://wa.me/5493434000000"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center font-sans text-[11px] tracking-[0.15em] uppercase text-white border border-white/30 px-6 py-3 hover:bg-white hover:text-[#0d0d0d] transition-all duration-300"
          >
            Consultar por WhatsApp
          </a>
        </div>
      </div>
    </>
  )
}
