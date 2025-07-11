import React from "react";
import { useTranslation } from 'react-i18next';

const AboutMeSection = () => {
  const { t } = useTranslation();

  return (
    <section
      // === MAJOR CHANGE HERE ===
      // Removed: bg-gradient-to-br from-white to-[#A8CDFF] dark:from-[#1A2035] dark:to-black
      // Now, this section will have a transparent background, allowing the gradient from Frame.jsx to show.
      className="w-full min-h-screen text-black dark:text-white flex flex-col items-center py-12 sm:py-16 md:py-20"
    >
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 sm:mb-12 md:mb-16 text-center text-[#0f52ba] dark:text-[#2563eb]">
        {t('aboutMe.title')}
      </h1>
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 px-4 sm:px-8">
        <div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-2 sm:mb-4 text-center text-[#0f52ba] dark:text-[#2563eb]">
            {t('aboutMe.past.title')}
          </h2>
          <p className="text-sm sm:text-base font-light text-center">
            {t('aboutMe.past.description')}
          </p>
        </div>
        <div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-2 sm:mb-4 text-center text-[#0f52ba] dark:text-[#2563eb]">
            {t('aboutMe.present.title')}
          </h2>
          <p className="text-sm sm:text-base font-light text-center">
            {t('aboutMe.present.description')}
          </p>
        </div>
        <div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-2 sm:mb-4 text-center text-[#0f52ba] dark:text-[#2563eb]">
            {t('aboutMe.future.title')}
          </h2>
          <p className="text-sm sm:text-base font-light text-center">
            {t('aboutMe.future.description')}
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutMeSection;