import { useTranslations } from "next-intl";
import { ServicesRow } from "./ServicesRow";

interface OfferProps {
  setIsActive: (isActive: boolean) => void
}

export default function Offer({ setIsActive }: OfferProps) {
  const t = useTranslations("index.service");
  return (
    <div className='col-start-1 lg:col-start-2 col-span-3 lg:col-span-6 grid lg:grid-cols-6 grid-cols-3 lg:pt-48' id="servicii">
        <p className='col-start-2 lg:col-start-3 mb-4 lg:mb-6 text-sm lg:text-base'>{`[${t("subtitle1")}]`}</p>
        <p className='col-span-6 text-2xl lg:leading-tight lg:text-[3rem] font-hedwig indent-[33.3%] mb-12 lg:mb-24 text-justify'>{t('content')}</p>
        <p className='col-start-1 col-span-2 mb-6 uppercase text-sm lg:text-base'>{`[${t("subtitle2")}]`}</p>
        <ServicesRow setIsActive={setIsActive} service1={t("card.title1")} service2={t('card.title2')} image1="/services/service1.jpg" image2="/services/service2.jpg" className="mb-6"/>
        <ServicesRow setIsActive={setIsActive} service1={t('card.title3')} service2={t('card.title4')} image1="/services/service3.jpg" image2="/services/service4.jpg"/>
    </div>
  )
}
