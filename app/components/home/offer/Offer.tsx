import { ServicesRow } from "./ServicesRow";

interface OfferProps {
  setIsActive: (isActive: boolean) => void
}

export default function Offer({ setIsActive }: OfferProps) {
  return (
    <div className='col-start-2 col-span-6 grid grid-cols-6'>
        <p className='col-start-3 mb-6'>[CE ÎȚI OFERIM]</p>
        <p className='col-span-6 text-[3rem] font-hedwig indent-[33.3%] mb-24 text-justify'>Studio este împărțit în 4 zone distincte perfecte  pentru ședințe foto sau producție video disponibile. Cu o estetică pastelată și dotări moderne, unde fiecare detaliu e conceput să inspire și să sprijine.</p>
        <p className='col-start-1 mb-6 uppercase'>[Servicii Foto & Video]</p>
        <ServicesRow setIsActive={setIsActive} service1="Ședințe Foto Personalizate" service2="Fotografie & Videografie Comercială" image1="/services/service1.jpg" image2="/services/service2.jpg" className="mb-6"/>
        <ServicesRow setIsActive={setIsActive} service1="Filmări Podcasturi și Interviuri" service2="Filmări Videoclipuri Muzicale" image1="/services/service3.jpg" image2="/services/service4.jpg"/>
    </div>
  )
}
