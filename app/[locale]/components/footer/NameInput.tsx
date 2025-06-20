"use client"

import { useLenis } from "lenis/react";
import { motion, useAnimationControls, Variants } from "motion/react";
import { useLocale, useTranslations } from "next-intl";
import BracketButton from "../buttons/BracketButton";

interface Props { 
    textVariants: Variants;
    slide: number;
    name: string;
    setName: React.Dispatch<React.SetStateAction<string>>;
    loading: boolean;
}

const NameInput = ({textVariants, slide, name, setName, loading} : Props) => {

  const lenis = useLenis();
  const t = useTranslations("footer");
  const locale = useLocale();
  const inputControls = useAnimationControls();

  return (
    <div className="mt-[8.6rem] lg:mt-[14.875rem] lg:col-start-3 col-span-3 lg:col-span-5 lg:mb-32 mb-12">
          <p className="text-white dark:text-black  mb-2 lg:mb-6 text-sm lg:text-base">{`${t(
            "subtitle1"
          )}`}</p>
          <motion.p
            className="text-2xl lg:leading-tight lg:text-[3.5rem] text-white dark:text-black  font-hedwig mb-6 lg:mb-12 w-2/3 lg:w-full"
            variants={textVariants}
          >
            {t(`lines.${slide}.line1`)}
          </motion.p>
          <motion.div
            variants={textVariants}
            className="flex items-end gap-4 w-2/3 lg:w-full relative"
          >
            {t(`lines.${slide}.line2`) !== "" && (
              <p className="text-2xl lg:leading-tight lg:text-[3.5rem] text-white dark:text-black font-hedwig">
                {t(`lines.${slide}.line2`)}
              </p>
            )}

            <div
              className={`lg:flex-1 bottom-0 ${
                slide === 0
                  ? locale === "en"
                    ? "left-[5.5rem]"
                    : "left-20"
                  : locale === "en"
                  ? "left-[6.4rem]"
                  : "left-[5.5rem]"
              } lg:left-auto lg:bottom-auto absolute lg:relative`}
            >
              <div className="relative">
                <input
                  size={0}
                  className={`bg-transparent text-white dark:text-black p-0 m-0 h-fit w-full peer focus:outline-none font-hedwig text-2xl lg:leading-tight lg:text-[3.5rem] placeholder:opacity-25 ${
                    slide === 3 ? "hidden" : ""
                  }`}
                  type="text"
                  value={name}
                  onChange={(e) => {
                    inputControls.set("initial");
                    setName(e.currentTarget.value);
                  }}
                />
                <motion.div
                  animate={inputControls}
                  variants={{
                    initial: { color: "#f1f1f1" },
                    wrong: { color: "#F42A2A", x: [-7, 7, -7, 7, 0] },
                  }}
                  transition={{ duration: 0.3 }}
                  className={`left-0 top-0 h-full absolute text-2xl lg:leading-tight lg:text-[3.5rem] font-hedwig text-white opacity-25 pointer-events-none ${
                    (slide === 0 && name !== "")
                      ? "hidden"
                      : ""
                  }`}
                >
                  {t(`lines.${slide}.placeholder`)}
                </motion.div>
              </div>
              <motion.div
                className={`left-0 top-0 h-full w-[1px] bg-white absolute peer-focus:hidden ${
                  (slide === 0 && name !== "") 
                    ? "hidden"
                    : ""
                }`}
                animate={{
                  opacity: 0,
                  transition: {
                    repeat: Infinity,
                    repeatType: "reverse",
                    repeatDelay: 0.6,
                    duration: 0.01,
                  },
                }}
              ></motion.div>
            </div>
          </motion.div>
          <div
            className={`flex ${
              slide === 3 ? "justify-end" : "justify-between"
            } mt-24`}
          >
            <BracketButton
              text={t("backButton")}
              disabled={slide === 0 || loading}
              className={`${slide === 3 ? "hidden" : ""}`}
              onClick={previousSlide}
            />
            <SwitchBracketButton
              className={
                slide === 3
                  ? locale === "en"
                    ? "w-[7.6rem] lg:w-[9.2rem]"
                    : "w-[7rem] lg:w-[8.1rem]"
                  : locale === "en"
                  ? "w-[3.2rem] lg:w-[3.8rem]"
                  : "w-[8.2rem] lg:w-[9.9rem]"
              }
              disabled={loading}
              isSwitchTime={slide === 3}
              onClick={
                slide === 3
                  ? () => {
                      lenis?.scrollTo("top");
                    }
                  : nextSlide
              }
              texts={[t("nextButton1"), t("nextButton2")]}
            />
          </div>
        </div>
  )
}

export default NameInput