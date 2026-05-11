import Header from '@/components/header'
import Hero from '@/components/hero'
import AreasPractica from '@/components/areas-practica'
import SobreEstudio from '@/components/sobre-estudio'
import ProcesoAtencion from '@/components/proceso-atencion'
import Contacto from '@/components/contacto'
import Footer from '@/components/footer'
import WhatsAppFab from '@/components/whatsapp-fab'

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <AreasPractica />
      <SobreEstudio />
      <ProcesoAtencion />
      <Contacto />
      <Footer />
      <WhatsAppFab />
    </main>
  )
}
