'use client'

import { useEffect, useRef, useState } from 'react'

function useReveal() {
  const ref = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80)
    return () => clearTimeout(t)
  }, [])
  return { ref, visible }
}

export default function Hero() {
  const { ref, visible } = useReveal()
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const move = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 12,
        y: (e.clientY / window.innerHeight - 0.5) * 8,
      })
    }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [])

  return (
    <section
      id="inicio"
      ref={ref}
      className="relative min-h-screen bg-[#0d0d0d] flex flex-col justify-end overflow-hidden"
    >
      {/* Background photo with parallax */}
      <div
        className="absolute inset-0 opacity-25 transition-transform duration-700 ease-out"
        style={{
          backgroundImage: `url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/leticia%20estudio-QM7KyJ6LNq6oeqiEl8BFKBnE5acOHr.jpeg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center 20%',
          transform: `translate(${mousePos.x * 0.3}px, ${mousePos.y * 0.3}px) scale(1.06)`,
        }}
      />
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-[#0d0d0d]/70 to-[#0d0d0d]/20" />

      {/* Thin horizontal rule top */}
      <div
        className={`absolute top-[68px] left-0 right-0 h-px bg-white/10 transition-all duration-1000 ${visible ? 'opacity-100' : 'opacity-0'}`}
      />

      {/* Vertical line decorations */}
      <div
        className={`absolute top-0 right-[12%] w-px h-full bg-white/5 transition-all duration-1000 ${visible ? 'opacity-100' : 'opacity-0'}`}
      />

      {/* Main content — bottom aligned editorial style */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 pb-16 md:pb-24 w-full">

        {/* Eyebrow tag */}
        <div
          className={`flex items-center gap-3 mb-8 transition-all duration-700 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
          style={{ transitionDelay: '200ms' }}
        >
          <span className="w-6 h-px bg-white/40" />
          <span className="font-sans text-[10px] tracking-[0.35em] uppercase text-white/50">
            Campana · Buenos Aires
          </span>
        </div>

        {/* Giant headline — 2 lines, editorial weight */}
        <div className="overflow-hidden mb-2">
          <h1
            className={`font-serif text-[clamp(3rem,9vw,8.5rem)] leading-[0.92] text-white font-normal transition-all duration-1000 ${
              visible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
            }`}
            style={{ transitionDelay: '350ms' }}
          >
            Asesoramiento
          </h1>
        </div>
        <div className="overflow-hidden mb-6">
          <h1
            className={`font-serif text-[clamp(3rem,9vw,8.5rem)] leading-[0.92] text-white/20 font-normal transition-all duration-1000 ${
              visible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
            }`}
            style={{ transitionDelay: '480ms' }}
          >
            Jurídico
          </h1>
        </div>

        {/* Horizontal divider */}
        <div
          className={`h-px bg-white/15 mb-8 transition-all duration-1000 origin-left ${
            visible ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0'
          }`}
          style={{ transitionDelay: '600ms' }}
        />

        {/* Bottom row: description + stats + CTA */}
        <div className="flex flex-col md:flex-row md:items-end gap-8 md:gap-0 justify-between">
          {/* Left: description */}
          <div
            className={`max-w-sm transition-all duration-700 ${
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
            style={{ transitionDelay: '700ms' }}
          >
            <p className="font-sans text-sm text-white/50 leading-relaxed mb-6">
              Atención personalizada en derecho laboral,
              familia y sucesiones. Tu caso, mi compromiso.
            </p>
            <div className="flex gap-4">
              <a
                href="https://wa.me/5493434000000"
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans text-[11px] tracking-[0.15em] uppercase bg-white text-[#0d0d0d] px-6 py-3 hover:bg-white/90 transition-all duration-300 hover:-translate-y-0.5"
              >
                Consultar
              </a>
              <a
                href="#areas"
                className="font-sans text-[11px] tracking-[0.15em] uppercase border border-white/25 text-white/70 px-6 py-3 hover:border-white/60 hover:text-white transition-all duration-300"
              >
                Ver áreas
              </a>
            </div>
          </div>

          {/* Right: stats */}
          <div
            className={`flex gap-10 md:gap-12 transition-all duration-700 ${
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
            style={{ transitionDelay: '850ms' }}
          >
            {[
              { num: '+18', label: 'Años de\nexperiencia' },
              { num: '+800', label: 'Casos\nresueltos' },
              { num: '3', label: 'Áreas de\nespecialidad' },
            ].map((s) => (
              <div key={s.label} className="flex flex-col gap-1">
                <span className="font-serif text-[clamp(2rem,5vw,3.5rem)] leading-none text-white/90">
                  {s.num}
                </span>
                <span className="font-sans text-[9px] tracking-[0.2em] uppercase text-white/35 whitespace-pre-line leading-relaxed">
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 transition-all duration-700 ${
          visible ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ transitionDelay: '1100ms' }}
      >
        <div className="w-px h-12 bg-white/20 relative overflow-hidden">
          <div className="absolute top-0 w-full bg-white/60 animate-[scroll-line_1.8s_ease-in-out_infinite]" style={{ height: '40%' }} />
        </div>
      </div>

      <style>{`
        @keyframes scroll-line {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(300%); }
        }
      `}</style>
    </section>
  )
}
