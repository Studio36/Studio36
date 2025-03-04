import { useTranslations } from "next-intl";
import ParallaxImage from "../../ParallaxImage";

export default function MobileHero() {
    const t = useTranslations("index.hero.carousel");

  return (
    <div className='col-start-1 col-span-3 layout-grid mt-12 mb-[7.75rem]'>
        <StageSection texts={[t("first.title"), t("first.description"), t("first.usage")]} img="/hero-stages/stage1.jpg" number="1"/>
        <StageSection texts={[t("second.title"), t("second.description"), t("second.usage")]} img="/hero-stages/stage2.jpg" number="2"/>
        <StageSection texts={[t("third.title"), t("third.description"), t("third.usage")]} img="/hero-stages/stage3.jpg" number="3"/>
        <StageSection texts={[t("fourth.title"), t("fourth.description"), t("fourth.usage")]} img="/hero-stages/stage4.jpg" number="4"/>
    </div>
  )
}

interface StageSectionProps {
    texts: string[],
    img: string,
    number: string        
} 

const StageSection = ({texts, img, number}: StageSectionProps) => {
    return (
        <div className='col-start-1 col-span-3 layout-grid mb-6'>
            <div className="col-span-3 layout-grid relative">
                <ParallaxImage src={img} alt='stage-1' className="col-span-3 rounded-lg h-[15rem] w-full object-cover"/> 
                <div className="col-span-1 relative h-6 mt-4 mb-12">
                    <h2 className="font-hedwig text-xl absolute left-0 top-0 whitespace-nowrap">{texts[0]}</h2>
                </div>
                <div className="col-span-2 relative">
                    <div className="absolute w-1/2 overflow-hidden flex justify-end -translate-y-1/2">
                        <span className="font-hedwig text-[12rem] leading-none -mr-7">0</span>
                    </div>
                    <div className="absolute w-1/2 right-0 overflow-hidden flex justify-end -translate-y-1/2">
                        <span className={`font-hedwig text-[12rem] leading-none ${number == "1" ? "-mr-5" : "-mr-9"}`}>{number}</span>
                    </div>
                </div>
                <p className="col-start-1 col-span-1 text-sm mb-4">[DESCRIERE]</p>
                <p className="col-start-2 col-span-2 font-hedwig text-sm text-justify mb-4">{texts[1]}</p>
                <p className="col-start-1 col-span-1 text-sm">[UTILIZĂRI]</p>
                <p className="col-start-2 col-span-2 font-hedwig text-sm text-justify">{texts[2]}</p>
            </div>
        </div>
    )
}