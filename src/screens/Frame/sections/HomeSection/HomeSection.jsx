import React, { useEffect, useRef, useState } from "react";
import { Button } from "../../../../components/ui/button";

const companies = [
  "Goldman Sachs",
  "J.P. Morgan",
  "Accenture",
  "Skyscanner",
  "Hewlett Packard Enterprise"
];

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About Me" },
  { href: "#skills", label: "Skills" },
  { href: "#portfolio", label: "Portfolio" },
  { href: "#certificates", label: "Certificates" },
  { href: "#contact", label: "Contact" },
];

const HomeSection = ({ isDark, toggleMode }) => {
  const sectionRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);

  // Close menu on navigation
  const handleNavClick = () => setMenuOpen(false);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full bg-gradient-to-br from-white to-[#A8CDFF] text-black dark:from-black dark:to-[#1A2035] dark:text-white overflow-hidden flex flex-col"
    >
      {/* Navigation Bar */}
      <nav className="flex items-center justify-between px-4 sm:px-8 md:px-12 pt-4 sm:pt-6 z-20 w-full">
        {/* Logo */}
        <img
          src="/img/logo-no-background.png"
          alt="Logo"
          className="h-10 sm:h-12 w-auto"
          onError={(e) => {
            console.error("Failed to load logo:", e.target.src);
            e.target.style.display = 'none';
          }}
        />
        {/* Desktop Links */}
        <ul className="hidden lg:flex space-x-4 xl:space-x-10 text-base md:text-lg font-medium">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-[#0f52ba] hover:text-[#2563eb] transition-colors"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        {/* Social Icons & Dark/Light Mode */}
        <div className="hidden lg:flex items-center space-x-2 md:space-x-4">
          <a href="mailto:maksymilianmatusiak@gmail.com" title="Email me">
            <img
              src="/img/Email.png"
              alt="Email"
              className="h-5 w-5 md:h-6 md:w-6"
              onError={(e) => {
                console.error("Failed to load Email icon:", e.target.src);
                e.target.style.display = 'none';
              }}
            />
          </a>
          <a href="https://www.linkedin.com/in/maksymilian-matusiak-b7007a214/" target="_blank" rel="noopener noreferrer" title="LinkedIn">
            <img
              src="/img/LinkedIn.png"
              alt="LinkedIn"
              className="h-5 w-5 md:h-6 md:w-6"
              onError={(e) => {
                console.error("Failed to load LinkedIn icon:", e.target.src);
                e.target.style.display = 'none';
              }}
            />
          </a>
          <a href="https://github.com/Maestrowski" target="_blank" rel="noopener noreferrer" title="GitHub">
            <img
              src="/img/GitHub.png"
              alt="GitHub"
              className="h-5 w-5 md:h-6 md:w-6"
              onError={(e) => {
                console.error("Failed to load GitHub icon:", e.target.src);
                e.target.style.display = 'none';
              }}
            />
          </a>
          <button onClick={toggleMode} className="text-xl md:text-2xl ml-2 focus:outline-none">
            {isDark ? "\ud83c\udf19" : "\u2600\ufe0f"}
          </button>
        </div>
        {/* Hamburger for mobile */}
        <button
          className="lg:hidden flex flex-col justify-center items-center w-10 h-10 focus:outline-none z-30"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-0.5 bg-[#0f52ba] mb-1 transition-all ${menuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
          <span className={`block w-6 h-0.5 bg-[#0f52ba] mb-1 transition-all ${menuOpen ? 'opacity-0' : ''}`}></span>
          <span className={`block w-6 h-0.5 bg-[#0f52ba] transition-all ${menuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
        </button>
        {/* Mobile Menu */}
        {menuOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-60 z-20 flex flex-col items-center justify-center lg:hidden">
            <ul className="flex flex-col space-y-8 text-2xl font-semibold">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-[#0f52ba] hover:text-[#2563eb] transition-colors"
                    onClick={handleNavClick}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="flex items-center space-x-6 mt-8">
              <a href="mailto:maksymilianmatusiak@gmail.com" title="Email me">
                <img src="/img/Email.png" alt="Email" className="h-7 w-7" />
              </a>
              <a href="https://www.linkedin.com/in/maksymilian-matusiak-b7007a214/" target="_blank" rel="noopener noreferrer" title="LinkedIn">
                <img src="/img/LinkedIn.png" alt="LinkedIn" className="h-7 w-7" />
              </a>
              <a href="https://github.com/Maestrowski" target="_blank" rel="noopener noreferrer" title="GitHub">
                <img src="/img/GitHub.png" alt="GitHub" className="h-7 w-7" />
              </a>
              <button onClick={toggleMode} className="text-3xl ml-2 focus:outline-none">
                {isDark ? "\ud83c\udf19" : "\u2600\ufe0f"}
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <div className="flex flex-col-reverse lg:flex-row items-center justify-center flex-1 mt-8 sm:mt-16 md:mt-24 px-4 sm:px-8 md:px-16 w-full gap-8 lg:gap-0">
        {/* Left: Text Content */}
        <div className="flex-1 w-full max-w-xl text-center lg:text-left">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-2">Maks Matusiak</h1>
          <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-[#2563eb] mb-4">
            Software Developer | UI/UX Designer<br />Web Developer | Data Scientist
          </h2>
          <p className="mb-8 text-base sm:text-lg font-light">
            I am a passionate tech enthusiast based in London, currently studying Computer Science and Mathematics. Beyond my studies I've actively developed a range of projects, both independently and in collaboration with other developers or clients. My personal mission is to integrate AI within web development in order to provide smarter, more efficient solutions. I am looking forward to explore new career opportunities to keep learning and developing my skills
          </p>
          <a
            href="/img/My_CV.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button className="border-2 border-[#2563eb] text-[#2563eb] bg-transparent hover:bg-[#2563eb] hover:text-white font-medium px-6 py-2 mb-8">
              View resume
            </Button>
          </a>
          <div className="mb-2 text-[#0f52ba]">Worked with</div>
        </div>
        {/* Right: Avatar */}
        <div className="flex-1 flex justify-center w-full mb-8 lg:mb-0">
          <div className="rounded-full w-40 h-40 sm:w-60 sm:h-60 md:w-72 md:h-72 lg:w-80 lg:h-80 flex items-center justify-center shadow-lg overflow-hidden">
            <img
              src="/img/MaksCartoon.png"
              alt="Avatar"
              className="rounded-full w-full h-full object-cover"
              onError={(e) => {
                console.error("Failed to load avatar:", e.target.src);
                e.target.style.display = 'none';
              }}
            />
          </div>
        </div>
      </div>

      {/* Horizontal line above logos */}
      <hr className="hidden sm:block border-t-2 border-[#000] w-full absolute left-0 dark:border-[#fff] border-[#000]" style={{ top: "calc(90% + 2px)" }} />
      {/* Company Names Marquee Animation */}
      <div className="relative w-full overflow-hidden bg-[#FFFFFF] dark:bg-[#181e2a] py-2 sm:py-4 mt-4">
        <div className="flex animate-marquee whitespace-nowrap min-w-max">
          {[...companies, ...companies].map((name, i) => (
            <span key={i} className="mx-4 sm:mx-8 text-lg sm:text-2xl md:text-3xl font-semibold tracking-wide">{name}</span>
          ))}
        </div>
      </div>
      {/* Horizontal line below logos */}
      <hr className="hidden sm:block border-t-2 border-[#000] w-full absolute left-0 dark:border-[#fff] border-[#000]" style={{ top: "calc(90% + 71px)" }} />
    </section>
  );
};

export default HomeSection;
