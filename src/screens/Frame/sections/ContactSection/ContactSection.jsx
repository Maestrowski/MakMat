import React from "react";

const ContactSection = () => {
  const contactSections = [
    {
      title: "Job opportunity",
      content:
        "I am open to discussion with regards to job opportunities. Being a graduate soon, I am looking for any internships or graduate schemes that would help me gain more experience and further sharpen my skills. With the skills I currently possess, I am interested to work on exciting projects where I can learn and contribute to an ambitious team.",
    },
    {
      title: "Network",
      content:
        "Networking is crucial within the tech industry. I always look forward to meeting new people with whom I could share valuable insight. Whether you are a developer, entrepreneur or just someone willing to learn about programming, I'd love to talk and learn more about you. Let's go on a call and see where the conversation takes us.",
    },
    {
      title: "Collaborate",
      content:
        "I have a passion for developing web applications that solve real-world problems.I'm also interested in projects that involve machine learning or anything that will challenge me and push me outside my comfort zone. I am always ready to work as a team and build something amazing together.",
    },
  ];

  // Links matching HomeSection URLs
  const contactLinks = [
    {
      label: "Email",
      href: "mailto:maksymilianmatusiak@gmail.com",
      alt: "Email",
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/maksymilian-matusiak-b7007a214/",
      alt: "LinkedIn",
    },
    {
      label: "Github",
      href: "https://github.com/Maestrowski",
      alt: "Github",
    },
    {
      label: "Resume",
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
      className="w-full min-h-screen bg-gradient-to-br from-white to-[#A8CDFF] dark:from-black dark:to-[#1A2035] text-black dark:text-white flex flex-col justify-start items-center py-8 sm:py-12 md:py-16 relative"
      id="contact"
    >
      <h1 className="text-[#0f52ba] dark:text-[#2563eb] text-3xl sm:text-4xl md:text-6xl font-bold mb-6 sm:mb-8">Get in Touch</h1>

      {/* Info Sections */}
      <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-4 sm:mb-6 px-4 sm:px-8">
        {contactSections.map((section, index) => (
          <div key={index} className="flex flex-col text-center">
            <h2 className="text-[#2563eb] dark:text-[#0f52ba] text-2xl sm:text-3xl md:text-4xl font-light mb-4 sm:mb-8">{section.title}</h2>
            <p className="text-black dark:text-white text-base sm:text-lg font-light">{section.content}</p>
          </div>
        ))}
      </div>

      {/* Contact Links */}
      <div className="w-full max-w-5xl flex flex-col sm:flex-row justify-evenly items-center text-black dark:text-white text-xl sm:text-2xl md:text-3xl mt-8 sm:mt-12 space-y-4 sm:space-y-0 sm:space-x-8 font-light">
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

      {/* Scroll to Top Button */}
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

      {/* Footer */}
      <footer className="w-full max-w-5xl text-black dark:text-white text-center text-xs sm:text-sm mt-24 sm:mt-44 mb-2 font-light">
        © 2025-present Maksymilian Matusiak. All Rights Reserved
      </footer>
    </section>
  );
};

export default ContactSection;
