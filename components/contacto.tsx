'use client'

import { useEffect, useRef, useState } from 'react'
import { Phone, Mail, MapPin } from 'lucide-react'

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

function WhatsAppIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

const contactItems = [
  { icon: Phone, label: 'Teléfono', value: '+54 9 3489 48-4345', href: 'tel:+5493489484345' },
  { icon: Mail, label: 'Email', value: 'leticiaolazar@yahoo.com', href: 'mailto:leticiaolazar@yahoo.com' },
  {
    icon: MapPin,
    label: 'Ubicación',
    value: 'Av. Rocca 189, Piso 9A · CABA',
    href: 'https://www.google.com/maps/search/?api=1&query=Av+Rocca+189+Buenos+Aires',
  },
]

const mapSrc = 'https://www.google.com/maps?q=Av%20Rocca%20189%20Buenos%20Aires&output=embed'

export default function Contacto() {
  const { ref, visible } = useInView()
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [sent, setSent] = useState(false)
  const [focused, setFocused] = useState<string | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const msg = encodeURIComponent(
      `Hola Leticia, mi nombre es ${form.name}.\n\n${form.message}\n\nTel: ${form.phone || 'no indicado'}`
    )
    window.open(`https://wa.me/5493489484345?text=${msg}`, '_blank')
    setSent(true)
  }

  const inputClass = (name: string) =>
    `w-full bg-transparent border-b-2 py-3 font-sans text-sm text-[#0d0d0d] placeholder-[#a8a6a1] outline-none transition-all duration-300 ${
      focused === name ? 'border-[#0d0d0d]' : 'border-[#d4d2cd]'
    }`

  return (
    <section
      id="contacto"
      ref={ref as React.RefObject<HTMLElement>}
      className="bg-[#0d0d0d] py-24 md:py-32"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Header */}
        <div
          className={`mb-16 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <span className="font-sans text-[10px] tracking-[0.35em] uppercase text-white/30 block mb-4">
            — Escribime
          </span>
          <h2 className="font-serif text-[clamp(2.5rem,6vw,5rem)] leading-tight text-white">
            Hablemos
            <br />
            <span className="text-white/20">de tu caso</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 lg:gap-24">
          {/* LEFT: info */}
          <div
            className={`lg:col-span-2 flex flex-col gap-10 transition-all duration-700 delay-150 ${
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <p className="font-sans text-sm text-white/50 leading-relaxed">
              Estoy disponible para escucharte. Contame tu situación y te
              responderé a la brevedad con total discreción y confidencialidad.
            </p>

            <ul className="flex flex-col gap-7">
              {contactItems.map((item) => {
                const Icon = item.icon
                return (
                  <li key={item.label} className="flex items-start gap-4 group">
                    <div className="w-8 h-8 border border-white/15 flex items-center justify-center shrink-0 group-hover:border-white/30 transition-colors duration-200">
                      <Icon size={14} className="text-white/40 group-hover:text-white/60 transition-colors duration-200" strokeWidth={1.5} />
                    </div>
                    <div>
                      <p className="font-sans text-[9px] tracking-[0.3em] uppercase text-white/25 mb-1">
                        {item.label}
                      </p>
                      <a
                        href={item.href}
                        target={item.label === 'Ubicación' ? '_blank' : undefined}
                        rel={item.label === 'Ubicación' ? 'noopener noreferrer' : undefined}
                        className="font-sans text-sm text-white/60 hover:text-white transition-colors duration-200"
                      >
                        {item.value}
                      </a>
                    </div>
                  </li>
                )
              })}
            </ul>

            <div className="overflow-hidden border border-white/10">
              <iframe
                src={mapSrc}
                title="Mapa del estudio jurídico en Campana"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-36 w-full grayscale invert-[0.88] opacity-80"
              />
            </div>

            {/* WhatsApp button */}
            <a
              href="https://wa.me/5493489484345"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 font-sans text-[11px] tracking-[0.15em] uppercase bg-[#25D366] text-white px-6 py-4 hover:bg-[#20bc5a] transition-all duration-300 w-fit"
            >
              <WhatsAppIcon />
              Consultar por WhatsApp
            </a>
          </div>

          {/* RIGHT: form */}
          <div
            className={`lg:col-span-3 transition-all duration-700 delay-300 ${
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {sent ? (
              <div className="h-full min-h-[400px] flex flex-col items-center justify-center gap-6 border border-white/10 p-12 text-center">
                <span className="font-serif text-5xl text-white">
                  ¡Gracias!
                </span>
                <p className="font-sans text-sm text-white/40 max-w-xs leading-relaxed">
                  Tu consulta fue enviada. Te redirigimos a WhatsApp para continuar la conversación.
                </p>
                <button
                  onClick={() => { setSent(false); setForm({ name: '', email: '', phone: '', message: '' }) }}
                  className="font-sans text-[10px] tracking-[0.2em] uppercase text-white/30 hover:text-white/60 transition-colors duration-200 underline"
                >
                  Enviar otra consulta
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div>
                    <label htmlFor="name" className="font-sans text-[9px] tracking-[0.3em] uppercase text-white/30 block mb-3">
                      Nombre *
                    </label>
                    <input
                      id="name"
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      onFocus={() => setFocused('name')}
                      onBlur={() => setFocused(null)}
                      className={inputClass('name') + ' bg-transparent border-b-2 py-3 font-sans text-sm text-white placeholder-white/20 outline-none transition-all duration-300 ' + (focused === 'name' ? 'border-white' : 'border-white/15')}
                      placeholder="Tu nombre completo"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="font-sans text-[9px] tracking-[0.3em] uppercase text-white/30 block mb-3">
                      Email *
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      onFocus={() => setFocused('email')}
                      onBlur={() => setFocused(null)}
                      className={`w-full bg-transparent border-b-2 py-3 font-sans text-sm text-white placeholder-white/20 outline-none transition-all duration-300 ${focused === 'email' ? 'border-white' : 'border-white/15'}`}
                      placeholder="tu@email.com"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="phone" className="font-sans text-[9px] tracking-[0.3em] uppercase text-white/30 block mb-3">
                    Teléfono
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    onFocus={() => setFocused('phone')}
                    onBlur={() => setFocused(null)}
                    className={`w-full bg-transparent border-b-2 py-3 font-sans text-sm text-white placeholder-white/20 outline-none transition-all duration-300 ${focused === 'phone' ? 'border-white' : 'border-white/15'}`}
                    placeholder="+54 9 3489 ···"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="font-sans text-[9px] tracking-[0.3em] uppercase text-white/30 block mb-3">
                    Consulta *
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    onFocus={() => setFocused('message')}
                    onBlur={() => setFocused(null)}
                    className={`w-full bg-transparent border-b-2 py-3 font-sans text-sm text-white placeholder-white/20 outline-none transition-all duration-300 resize-none ${focused === 'message' ? 'border-white' : 'border-white/15'}`}
                    placeholder="Describí brevemente tu situación..."
                  />
                </div>
                <div className="flex items-center justify-between">
                  <p className="font-sans text-[10px] text-white/20">
                    * Campos requeridos
                  </p>
                  <button
                    type="submit"
                    className="font-sans text-[11px] tracking-[0.15em] uppercase bg-white text-[#0d0d0d] px-8 py-4 hover:bg-white/90 transition-all duration-300 hover:-translate-y-0.5"
                  >
                    Enviar consulta
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
