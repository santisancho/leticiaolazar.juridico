import Image from 'next/image'
import { Instagram } from 'lucide-react'

const navLinks = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Áreas de práctica', href: '#areas' },
  { label: 'Sobre el estudio', href: '#estudio' },
  { label: 'Proceso', href: '#proceso' },
  { label: 'Contacto', href: '#contacto' },
]

const areas = ['Derecho de Familia', 'Derecho Laboral', 'Derecho Civil']

export default function Footer() {
  return (
    <footer className="bg-[#f5f4f1] border-t border-[#d4d2cd]">
      {/* Top marquee strip */}
      <div className="border-b border-[#d4d2cd] py-3 overflow-hidden">
        <div className="marquee-wrapper">
          <div className="animate-marquee inline-flex gap-12 whitespace-nowrap">
            {Array.from({ length: 8 }).map((_, i) => (
              <span key={i} className="font-serif text-[#d4d2cd] text-sm tracking-widest uppercase">
                Leticia Olazar · Estudio Jurídico · Campana · Buenos Aires ·
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-10 pt-16 pb-10">
        {/* Main grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 pb-14 border-b border-[#d4d2cd]">
          {/* Brand block */}
          <div className="col-span-2">
            <div className="mb-5">
              <Image
                src="/img/logoleti.jpeg"
                alt="Leticia Olazar Estudio Juridico"
                width={1064}
                height={710}
                className="h-auto w-48 md:w-56"
              />
            </div>
            <p className="font-sans text-sm text-[#6b6b6b] leading-relaxed max-w-xs mb-6">
              Asesoramiento jurídico profesional en derecho laboral,
              familia y sucesiones. Campana, Buenos Aires.
            </p>
            <a
              href="https://www.instagram.com/olazarleticia.estudiojuridico/?hl=es/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-sans text-xs text-[#6b6b6b] hover:text-[#0d0d0d] transition-colors duration-200 group"
              aria-label="Instagram del estudio"
            >
              <Instagram size={14} className="group-hover:scale-110 transition-transform duration-200" />
              @olazarleticia.estudiojuridico
            </a>
          </div>

          {/* Nav */}
          <div>
            <p className="font-sans text-[9px] tracking-[0.3em] uppercase text-[#a8a6a1] mb-5">
              Secciones
            </p>
            <ul className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="font-sans text-sm text-[#6b6b6b] hover:text-[#0d0d0d] transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Areas */}
          <div>
            <p className="font-sans text-[9px] tracking-[0.3em] uppercase text-[#a8a6a1] mb-5">
              Áreas
            </p>
            <ul className="flex flex-col gap-3">
              {areas.map((area) => (
                <li key={area}>
                  <a
                    href="#areas"
                    className="font-sans text-sm text-[#6b6b6b] hover:text-[#0d0d0d] transition-colors duration-200"
                  >
                    {area}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-sans text-xs text-[#a8a6a1]">
            &copy; {new Date().getFullYear()} Leticia Olazar — Estudio Jurídico. Todos los derechos reservados.
          </p>
          <p className="font-sans text-xs text-[#d4d2cd]">
            
          </p>
        </div>
      </div>
    </footer>
  )
}
