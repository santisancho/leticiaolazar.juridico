'use client'

import { useState, useRef, useEffect } from 'react'
import { Users, Briefcase, Scale } from 'lucide-react'

const areas = [
  {
    id: 'familia',
    index: '01',
    icon: Users,
    title: 'Derecho de\nFamilia',
    tagline: 'Protejo lo que más importa',
    description:
      'Acompaño en los momentos más sensibles con discreción, empatía y sólida experiencia jurídica.',
    items: [
      { name: 'Alimentos'},
      { name: 'Derecho de comunicación'},
      { name: 'Divorcios'}
    ],
  },
  {
    id: 'laboral',
    index: '02',
    icon: Briefcase,
    title: 'Derecho\nLaboral',
    tagline: 'Defiendo tus derechos',
    description:
      'Defensa de los derechos del trabajador con atención personalizada y acompañamiento legal en cada etapa.',
    items: [
      { name: 'Despidos'},
      { name: 'Trabajo no registrado'},
      { name: 'Accidentes de trabajo'},
      { name: 'Enfermedades profesionales'},
    ],
  },
  {
    id: 'civil',
    index: '03',
    icon: Scale,
    title: 'Derecho\nCivil',
    tagline: 'Claridad en cada proceso',
    description:
      'Asesoramiento integral en sucesiones, garantizando la correcta transmisión del patrimonio.',
    items: [
      { name: 'Sucesiones'},
      { name: 'Testamentos'},
      { name: 'Herencias'},
    ],
  },
]

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, visible }
}

function AreaCard({ area, delay, sectionVisible }: {
  area: typeof areas[0]
  delay: number
  sectionVisible: boolean
}) {
  const [flipped, setFlipped] = useState(false)
  const Icon = area.icon

  return (
    <div
      className={`flip-card h-[480px] md:h-[520px] cursor-pointer transition-all duration-700 ${
        sectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      } ${flipped ? 'flipped' : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
      onClick={() => setFlipped((f) => !f)}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && setFlipped((f) => !f)}
      aria-label={`Ver detalles de ${area.title.replace('\n', ' ')}`}
    >
      <div className="flip-card-inner">
        {/* ── FRONT ── */}
        <div className="flip-card-front bg-[#f5f4f1] flex flex-col justify-between p-8 border border-[#d4d2cd]/60">
          {/* Index */}
          <div className="flex items-start justify-between">
            <span className="font-serif text-[80px] leading-none text-[#d4d2cd] select-none">
              {area.index}
            </span>
            <Icon size={20} strokeWidth={1.5} className="text-[#6b6b6b] mt-3" />
          </div>

          {/* Title */}
          <div>
            <h3 className="font-serif text-[clamp(1.8rem,3.5vw,2.5rem)] leading-tight text-[#0d0d0d] whitespace-pre-line mb-4">
              {area.title}
            </h3>
            <p className="font-sans text-sm text-[#6b6b6b] leading-relaxed">
              {area.description}
            </p>
          </div>

          {/* Hint */}
          <div className="flex items-center gap-2 border-t border-[#d4d2cd]/60 pt-5">
            <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-[#a8a6a1]">
              Ver servicios
            </span>
            <div className="flex-1 h-px bg-[#d4d2cd]/60" />
            <span className="text-[#a8a6a1] text-xs">→</span>
          </div>
        </div>

        {/* ── BACK ── */}
        <div className="flip-card-back bg-[#0d0d0d] flex flex-col p-8">
          <div className="mb-6">
            <span className="font-sans text-[9px] tracking-[0.3em] uppercase text-white/30 block mb-1">
              {area.index} / {area.tagline}
            </span>
            <h3 className="font-serif text-2xl text-white leading-tight whitespace-pre-line">
              {area.title}
            </h3>
          </div>

          <ul className="flex flex-col flex-1 divide-y divide-white/10">
            {area.items.map((item) => (
              <li key={item.name} className="py-4 first:pt-0 last:pb-0">
                <p className="font-sans text-sm font-medium text-white mb-1">{item.name}</p>
                <p className="font-sans text-xs text-white/40 leading-relaxed">{item.desc}</p>
              </li>
            ))}
          </ul>

          <a
            href="https://wa.me/5493489484345"
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="mt-6 w-full flex items-center justify-center font-sans text-[11px] tracking-[0.15em] uppercase text-white border border-white/20 py-3 hover:bg-white hover:text-[#0d0d0d] transition-all duration-300"
          >
            Consultar ahora
          </a>
        </div>
      </div>
    </div>
  )
}

export default function AreasPractica() {
  const { ref, visible } = useInView()

  return (
    <section
      id="areas"
      ref={ref as React.RefObject<HTMLElement>}
      className="py-24 md:py-32 bg-[#f5f4f1]"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div
            className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            <span className="font-sans text-[10px] tracking-[0.35em] uppercase text-[#a8a6a1] block mb-4">
              — Especialidades
            </span>
            <h2 className="font-serif text-[clamp(2.5rem,6vw,5rem)] leading-tight text-[#0d0d0d]">
              Áreas de
              <br />
              <span className="text-[#d4d2cd]">práctica</span>
            </h2>
          </div>
          <p
            className={`font-sans text-sm text-[#6b6b6b] max-w-xs leading-relaxed transition-all duration-700 delay-200 ${
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {areas.map((area, i) => (
            <AreaCard
              key={area.id}
              area={area}
              delay={i * 100 + 200}
              sectionVisible={visible}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
