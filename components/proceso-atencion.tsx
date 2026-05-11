'use client'

import { useEffect, useRef, useState } from 'react'

const steps = [
  {
    num: '01',
    title: 'Contacto\ninicial',
    desc: 'Me comunico para escuchar tu situación y evaluar cómo puedo ayudarte de la mejor manera.',
  },
  {
    num: '02',
    title: 'Evaluación\ndel caso',
    desc: 'Analizo en detalle tu situación, identifico las mejores estrategias y te explico todas las opciones.',
  },
  {
    num: '03',
    title: 'Asesoramiento\nlegal',
    desc: 'Actuo estratégicamente y con transparencia, manteniéndote informado en cada etapa del proceso.',
  },
  {
    num: '04',
    title: 'Seguimiento\npersonalizado',
    desc: 'Acompaño el proceso hasta su resolución, con atención continua y dedicación real a tu caso.',
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

export default function ProcesoAtencion() {
  const { ref, visible } = useInView()

  return (
    <section
      id="proceso"
      ref={ref as React.RefObject<HTMLElement>}
      className="bg-[#f5f4f1] py-24 md:py-32"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Header */}
        <div
          className={`mb-16 md:mb-24 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <span className="font-sans text-[10px] tracking-[0.35em] uppercase text-[#a8a6a1] block mb-4">
            — Cómo trabajo
          </span>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <h2 className="font-serif text-[clamp(2.5rem,6vw,5rem)] leading-tight text-[#0d0d0d]">
              Proceso de
              <br />
              <span className="text-[#d4d2cd]">atención</span>
            </h2>
            <p className="font-sans text-sm text-[#6b6b6b] max-w-xs leading-relaxed">
              Un proceso claro, transparente y diseñado para acompañarte en cada momento.
            </p>
          </div>
        </div>

        {/* Steps — horizontal list with big numbers */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0">
          {steps.map((step, i) => (
            <div
              key={step.num}
              className={`relative border-t-2 border-[#d4d2cd] pt-8 pr-8 pb-8 transition-all duration-700 group hover:border-[#0d0d0d] ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${i * 120 + 200}ms` }}
            >
              {/* Big number */}
              <span className="font-serif text-[clamp(4rem,8vw,7rem)] leading-none text-[#e8e6e1] group-hover:text-[#d4d2cd] transition-colors duration-300 select-none block mb-6">
                {step.num}
              </span>

              {/* Content */}
              <h3 className="font-serif text-xl md:text-2xl text-[#0d0d0d] whitespace-pre-line leading-tight mb-4">
                {step.title}
              </h3>
              <p className="font-sans text-sm text-[#6b6b6b] leading-relaxed">
                {step.desc}
              </p>

              {/* Arrow connector — hidden on last */}
              {i < steps.length - 1 && (
                <span className="hidden lg:block absolute top-8 right-0 translate-x-1/2 font-sans text-xs text-[#d4d2cd]">
                  →
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Bottom CTA strip */}
        <div
          className={`mt-16 pt-10 border-t border-[#d4d2cd] flex flex-col md:flex-row items-start md:items-center justify-between gap-6 transition-all duration-700 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
          style={{ transitionDelay: '700ms' }}
        >
          <p className="font-sans text-sm text-[#6b6b6b] max-w-md leading-relaxed">
            ¿Tenés una consulta? Contactame y comenzamos el proceso de inmediato.
          </p>
          <a
            href="https://wa.me/5493489484345"
            target="_blank"
            rel="noopener noreferrer"
            className="font-sans text-[11px] tracking-[0.15em] uppercase bg-[#0d0d0d] text-white px-8 py-4 hover:bg-[#1a1a1a] transition-all duration-300 shrink-0"
          >
            Iniciar consulta
          </a>
        </div>
      </div>
    </section>
  )
}
