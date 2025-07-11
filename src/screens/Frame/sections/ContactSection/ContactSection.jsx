import React from "react";
import { useTranslation } from 'react-i18next';

const ContactSection = () => {
  const { t } = useTranslation();
  const contactSections = [
    {
      title: t('contact.section1.title'),
      content: t('contact.section1.content'),
    },
    {
      title: t('contact.section2.title'),
      content: t('contact.section2.content'),
    },
    {
      title: t('contact.section3.title'),
      content: t('contact.section3.content'),
    },
  ];

  // Links matching HomeSection URLs
  const contactLinks = [
    {
      label: t('contact.email'),
      href: "mailto:maksymilianmatusiak@gmail.com",
      alt: "Email",
    },
    {
      label: t('contact.linkedin'),
      href: "https://www.linkedin.com/in/maksymilian-matusiak-b7007a214/",
      alt: "LinkedIn",
    },
    {
      label: t('contact.github'),
      href: "https://github.com/Maestrowski",
      alt: "Github",
    },
    {
      label: t('contact.resume'),
      href: "/img/My_CV.pdf",
      alt: "Resume",
      isDownload: true,
    },
  ];

  // Scroll to top function with smooth behavior
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <section
      // Changed justify-start to justify-between to distribute space
      // Reduced py- to give more room for content to be distributed
      className="w-full min-h-screen text-black dark:text-white flex flex-col justify-between items-center py-4 sm:py-8 md:py-12 relative"
      id="contact"
    >
      {/* Moved mb- to the info sections div below, keeping h1 itself snug */}
      <h1 className="text-[#0f52ba] dark:text-[#2563eb] text-3xl sm:text-4xl md:text-6xl font-bold">{t('contact.title')}</h1>

      {/* NO flexible spacer here anymore, justify-between handles main spacing */}
      {/* Removed the mb from here as we'll adjust spacing below with mt on links */}
      {/* Info Sections - Added mt to position it relative to the top */}
      <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 px-4 sm:px-8 mt-12 sm:mt-24">
        {contactSections.map((section, index) => (
          <div key={index} className="flex flex-col text-center">
            <h2 className="text-[#2563eb] dark:text-[#0f52ba] text-2xl sm:text-3xl md:text-4xl font-light mb-4 sm:mb-8">{section.title}</h2>
            <p className="text-black dark:text-white text-base sm:text-lg font-light">{section.content}</p>
          </div>
        ))}
      </div>

      {/* Contact Links - Adjusted mt for desired spacing from info sections, added mb for footer spacing */}
      <div className="w-full max-w-5xl flex flex-col sm:flex-row justify-evenly items-center text-black dark:text-white text-xl sm:text-2xl md:text-3xl mt-24 sm:mt-32 space-y-4 sm:space-y-0 sm:space-x-8 font-light mb-16 sm:mb-24">
        {contactLinks.map(({ label, href, alt, isDownload }, idx) => (
          <a
            key={idx}
            href={href}
            target={label !== "Email" ? "_blank" : undefined}
            rel={label !== "Email" ? "noopener noreferrer" : undefined}
            download={isDownload ? true : undefined}
            className="flex flex-col items-center hover:text-[#0f52ba] dark:hover:text-[#2563eb] transition-colors"
            title={label}
          >
            <span>{label}</span>
          </a>
        ))}
      </div>

      {/* Scroll to Top Button (no changes) */}
      <button
        onClick={scrollToTop}
        aria-label="Scroll to top"
        className="absolute bottom-4 right-4 sm:bottom-8 sm:right-8 bg-[#0f52ba] hover:bg-[#2563eb] text-white rounded-full p-3 sm:p-4 shadow-lg transition-colors"
        title="Back to top"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 sm:h-6 sm:w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
        </svg>
      </button>

      {/* Footer - mt-auto not needed with justify-between, removed as mb from links handles its space */}
      <footer className="w-full max-w-5xl text-black dark:text-white text-center text-xs sm:text-sm font-light">
        {t('contact.footer')}
      </footer>
    </section>
  );
};

export default ContactSection;