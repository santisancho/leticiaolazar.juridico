'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const photos = [
  {
    src: '/img/leticia-estudio.jpeg',
    alt: 'Leticia Olazar en su escritorio',
    caption: 'Despacho principal',
  },
  {
    src: '/img/cartel-del-estudio-de-leticia.jpeg',
    alt: 'Cartel del Estudio Jurídico',
    caption: 'Leticia Olazar · Estudio Jurídico',
  },
]

const values = [
  { num: '01', label: 'Atención personalizada', desc: 'Cada cliente es único. Te acompañamos en cada etapa del proceso.' },
  { num: '02', label: 'Confidencialidad total', desc: 'Tus datos e información están protegidos con absoluta discreción.' },
  { num: '03', label: 'Compromiso real', desc: 'Trabajamos con dedicación para obtener el mejor resultado posible.' },
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

export default function SobreEstudio() {
  const { ref, visible } = useInView()
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, duration: 25 })
  const [selectedIndex, setSelectedIndex] = useState(0)

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap())
    emblaApi.on('select', onSelect)
    return () => { emblaApi.off('select', onSelect) }
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    const id = setInterval(() => emblaApi.scrollNext(), 5000)
    return () => clearInterval(id)
  }, [emblaApi])

  return (
    <section
      id="estudio"
      ref={ref as React.RefObject<HTMLElement>}
      className="bg-[#0d0d0d] py-24 md:py-32 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10">

        {/* Header */}
        <div
          className={`mb-16 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <span className="font-sans text-[10px] tracking-[0.35em] uppercase text-white/30 block mb-4">
            — Sobre el estudio
          </span>
          <h2 className="font-serif text-[clamp(2.5rem,6vw,5rem)] leading-tight text-white">
            Leticia Olazar
            <br />
            <span className="text-white/20">Abogada</span>
          </h2>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* LEFT: Carousel */}
          <div
            className={`transition-all duration-900 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}
            style={{ transitionDelay: '200ms' }}
          >
            {/* Carousel container */}
            <div className="relative">
              <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex">
                  {photos.map((photo, i) => (
                    <div key={i} className="relative flex-[0_0_100%] aspect-[3/4] md:aspect-[4/5]">
                      <Image
                        src={photo.src}
                        alt={photo.alt}
                        fill
                        className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        priority={i === 0}
                      />
                      {/* Caption */}
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                        <span className="font-sans text-[10px] tracking-[0.25em] uppercase text-white/60">
                          {photo.caption}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Controls row */}
              <div className="flex items-center justify-between mt-4">
                {/* Dots */}
                <div className="flex gap-2 items-center">
                  {photos.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => emblaApi?.scrollTo(i)}
                      aria-label={`Foto ${i + 1}`}
                      className={`transition-all duration-300 rounded-full ${
                        i === selectedIndex
                          ? 'w-8 h-1.5 bg-white'
                          : 'w-1.5 h-1.5 bg-white/25 hover:bg-white/50'
                      }`}
                    />
                  ))}
                </div>
                {/* Arrows */}
                <div className="flex gap-2">
                  <button
                    onClick={scrollPrev}
                    aria-label="Foto anterior"
                    className="w-10 h-10 border border-white/20 flex items-center justify-center text-white/50 hover:text-white hover:border-white/50 transition-all duration-200"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <button
                    onClick={scrollNext}
                    aria-label="Foto siguiente"
                    className="w-10 h-10 border border-white/20 flex items-center justify-center text-white/50 hover:text-white hover:border-white/50 transition-all duration-200"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Text content */}
          <div
            className={`flex flex-col gap-10 transition-all duration-900 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}
            style={{ transitionDelay: '350ms' }}
          >
            <div className="flex flex-col gap-5">
              <p className="font-sans text-white/60 text-base leading-relaxed">
                Con más de 18 años de trayectoria profesional, fundé este estudio
                con la convicción de que cada persona merece un asesoramiento jurídico
                cercano, claro y comprometido.
              </p>
              <p className="font-sans text-white/40 text-sm leading-relaxed">
                Atiendo de forma personal cada caso, garantizando que mis clientes
                comprendan en todo momento el proceso legal y cuenten con el respaldo
                necesario para tomar las mejores decisiones.
              </p>
            </div>

            {/* Values list */}
            <ul className="flex flex-col divide-y divide-white/10">
              {values.map((v, i) => (
                <li
                  key={v.num}
                  className={`py-6 flex gap-6 group transition-all duration-700 ${
                    visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}
                  style={{ transitionDelay: `${500 + i * 120}ms` }}
                >
                  <span className="font-serif text-3xl text-white/10 group-hover:text-white/20 transition-colors duration-300 select-none leading-none mt-1">
                    {v.num}
                  </span>
                  <div>
                    <p className="font-sans text-sm font-medium text-white mb-1.5">{v.label}</p>
                    <p className="font-sans text-sm text-white/40 leading-relaxed">{v.desc}</p>
                  </div>
                </li>
              ))}
            </ul>

            {/* Jurisdicción — matrículas */}
            <div
              className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
              style={{ transitionDelay: '820ms' }}
            >
              <div className="border border-white/10 p-5 flex flex-col gap-3">
                <p className="font-sans text-[8px] tracking-[0.38em] uppercase text-white/25 flex items-center gap-2">
                  <span className="w-4 h-px bg-white/20" />
                  Jurisdicción
                </p>
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-10">
                  <div className="flex items-start gap-3">
                    <span className="mt-[5px] w-1.5 h-1.5 rounded-full bg-[#c8b89a] shrink-0" />
                    <div>
                      <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-white/70 font-medium">
                        Ciudad de Buenos Aires
                      </p>
                      <p className="font-sans text-[9px] tracking-[0.12em] text-white/30 mt-0.5">
                        Matrícula activa · 
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="mt-[5px] w-1.5 h-1.5 rounded-full bg-[#c8b89a] shrink-0" />
                    <div>
                      <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-white/70 font-medium">
                        Provincia de Buenos Aires
                      </p>
                      <p className="font-sans text-[9px] tracking-[0.12em] text-white/30 mt-0.5">
                        Matrícula activa · 
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div
              className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
              style={{ transitionDelay: '900ms' }}
            >
              <a
                href="#contacto"
                className="inline-flex items-center gap-3 font-sans text-[11px] tracking-[0.2em] uppercase text-white border border-white/20 px-8 py-4 hover:bg-white hover:text-[#0d0d0d] transition-all duration-300"
              >
                Conocé más · Contacto
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}