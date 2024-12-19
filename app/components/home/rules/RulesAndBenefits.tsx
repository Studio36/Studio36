import ParallaxImage from "../../ParallaxImage";

export default function RulesAndBenefits() {

  return (
    <div className='col-span-8 mt-48 relative layout-grid'>
        <div className='sticky col-span-4 h-screen top-0 left-0'>
            <ParallaxImage src='/rules/rules.jpg' alt='parallax-image-1' className='absolute left-0 top-0 w-full h-screen object-cover -z-10 rounded-lg' />
        </div>
        <div className="grid grid-cols-3 col-start-5 col-end-8 pl-4">
                <p className="col-span-1 font-medium">[REGULILE CASEI]</p>
                <ol className="col-span-2 list-decimal ml-11">
                    <li className="font-hedwig text-2xl font-normal">Timpul minim de rezervare: 4 ore pentru ședințe foto, 6 ore pentru filmări.</li> <br/>
                    <li className="font-hedwig text-2xl font-normal">Program de lucru: Luni-Vineri, 09:00-21:00. Rezervările în weekend presupun o taxă suplimentară de 80 EUR/zi.</li> <br/>
                    <li className="font-hedwig text-2xl font-normal">Înregistrarea sunetului: Nu putem garanta sunet pur din cauza posibilului ecou.</li> <br/>
                    <li className="font-hedwig text-2xl font-normal">Consumul de alimente și băuturi: Este interzis în studioul complet alb.</li> <br/>
                    <li className="font-hedwig text-2xl font-normal">Utilizarea vaselor: Vasele folosite trebuie spălate, altfel se aplică o taxă de 30 EUR.</li> <br/>
                    <li className="font-hedwig text-2xl font-normal">Durata rezervării: Include pregătirea și curățenia, terminând cu 10 minute înainte de sfârșitul rezervării.</li> <br/>
                    <li className="font-hedwig text-2xl font-normal">Ore suplimentare: Între 23:00 și 09:00 se aplică o taxă de 30 EUR/oră.</li> <br/>
                    <li className="font-hedwig text-2xl font-normal">Curățenie suplimentară: Pentru utilizarea decorurilor care lasă multă murdărie, se percepe o taxă de 50 EUR.</li> <br/>
                    <li className="font-hedwig text-2xl font-normal">Acces în studioul alb: Obligatoriu șoșoni de protecție sau încălțăminte albă curată.</li> <br/>
                    <li className="font-hedwig text-2xl font-normal">Gunoi în exces: Peste un container de 240l se percepe o taxă de 25 EUR.</li> <br/>
                    <li className="font-hedwig text-2xl font-normal">Deteriorări: Responsabilitatea financiară revine chiriașului, iar echipamentele vor fi verificate de administrator la finalul rezervării.</li> <br/>
                </ol>
                <p className="col-span-1 font-medium mt-12">[BENEFICII]</p>
                <ol className="col-span-2 ml-11 mt-12 [&>li]:before:content-['+'] [&>li]:before:-left-11 [&>li]:before:absolute">
                    <li className="relative font-hedwig text-2xl font-normal">Internet Gigabit WiFi6.</li> <br/>
                    <li className="relative font-hedwig text-2xl font-normal">Cafea Nespresso gratuită.</li> <br/>
                    <li className="relative font-hedwig text-2xl font-normal">Sistem audio Bang & Olufsen cu AirPlay.</li> <br/>
                    <li className="relative font-hedwig text-2xl font-normal">Aer condiționat sau încălzire.</li> <br/>
                    <li className="relative font-hedwig text-2xl font-normal">Standuri, masă de machiaj personalizată, suport pentru haine, oglindă mare, aburitor.</li> <br/>
                    <li className="relative font-hedwig text-2xl font-normal">Suport tehnic din partea echipei noastre pentru orice nevoie, de la instalarea echipamentului la post-producție.</li> <br/>
                </ol>
        </div>
    </div>
  )
}
