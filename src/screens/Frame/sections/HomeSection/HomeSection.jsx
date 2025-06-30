import React, { useEffect, useRef } from "react";
import { Button } from "../../../../components/ui/button";

const companies = [
  "Goldman Sachs",
  "J.P. Morgan",
  "Accenture",
  "Skyscanner",
  "Hewlett Packard Enterprise"
];

const HomeSection = ({ isDark, toggleMode }) => {
  const sectionRef = useRef(null);

  useEffect(() => {
    // Comprehensive debugging
    const htmlClass = document.documentElement.className;
    const htmlElement = document.documentElement;
    
    // Check CSS variables
    const bgFrom = getComputedStyle(htmlElement).getPropertyValue('--background');
    const fgFrom = getComputedStyle(htmlElement).getPropertyValue('--foreground');
    
    let bg = null, color = null, computedStyles = null;
    if (sectionRef.current) {
      computedStyles = window.getComputedStyle(sectionRef.current);
      bg = computedStyles.backgroundImage || computedStyles.backgroundColor;
      color = computedStyles.color;
    }
    
    console.log("=== COMPREHENSIVE DEBUG ===");
    console.log("[DEBUG] isDark prop:", isDark);
    console.log("[DEBUG] <html> class:", htmlClass);
    console.log("[DEBUG] <html> has 'dark' class:", htmlElement.classList.contains('dark'));
    console.log("[DEBUG] CSS var --background:", bgFrom);
    console.log("[DEBUG] CSS var --foreground:", fgFrom);
    console.log("[DEBUG] Section computed background:", bg);
    console.log("[DEBUG] Section computed text color:", color);
    console.log("[DEBUG] Section element classes:", sectionRef.current?.className);
    
    // Check if Tailwind dark mode classes are being applied
    if (sectionRef.current) {
      const hasDarkFrom = sectionRef.current.classList.contains('dark:from-black');
      const hasDarkTo = sectionRef.current.classList.contains('dark:to-[#1A2035]');
      const hasDarkText = sectionRef.current.classList.contains('dark:text-white');
      console.log("[DEBUG] Has dark:from-black class:", hasDarkFrom);
      console.log("[DEBUG] Has dark:to-[#1A2035] class:", hasDarkTo);
      console.log("[DEBUG] Has dark:text-white class:", hasDarkText);
      
      // Log all classes on the section element
      const allClasses = Array.from(sectionRef.current.classList);
      console.log("[DEBUG] All classes on section element:", allClasses);
      
      // Check if any dark: classes exist
      const darkClasses = allClasses.filter(cls => cls.startsWith('dark:'));
      console.log("[DEBUG] Dark mode classes found:", darkClasses);
    }
    console.log("=== END DEBUG ===");
  }, [isDark]);

  return (
    <section ref={sectionRef} className="relative min-h-screen w-full bg-gradient-to-br from-white to-[#A8CDFF] text-black dark:from-black dark:to-[#1A2035] dark:text-white overflow-hidden flex flex-col">
      {/* Navigation Bar */}
      <nav className="flex items-center justify-between px-12 pt-6 z-10">
        {/* Logo */}
        <img src="static/img/logo-no-background.png" alt="Logo" className="h-12" />
        {/* Links */}
        <ul className="flex space-x-10 text-lg font-medium">
          <li><a href="#home" className="text-[#0f52ba] hover:text-[#0f52ba]">Home</a></li>
          <li><a href="#about" className="text-[#0f52ba] hover:text-[#0f52ba]">About Me</a></li>
          <li><a href="#skills" className="text-[#0f52ba] hover:text-[#0f52ba]">Skills</a></li>
          <li><a href="#portfolio" className="text-[#0f52ba] hover:text-[#0f52ba]">Portfolio</a></li>
          <li><a href="#certificates" className="text-[#0f52ba] hover:text-[#0f52ba]">Certificates</a></li>
          <li><a href="#contact" className="text-[#0f52ba] hover:text-[#0f52ba]">Contact</a></li>
        </ul>
        {/* Social Icons & Dark/Light Mode */}
        <div className="flex items-center space-x-4">
          <a href="mailto:maksymilianmatusiak@gmail.com" title="Email me">
            <img src="static/img/email.png" alt="Email" className="h-6 w-6" />
          </a>
          <a href="https://www.linkedin.com/in/maksymilian-matusiak-b7007a214/" target="_blank" rel="noopener noreferrer" title="LinkedIn">
            <img src="static/img/linkedin.png" alt="LinkedIn" className="h-6 w-6" />
          </a>
          <a href="https://github.com/Maestrowski" target="_blank" rel="noopener noreferrer" title="GitHub">
            <img src="static/img/github.png" alt="GitHub" className="h-6 w-6" />
          </a>
          <button onClick={() => {
            console.log("[DEBUG] Toggle button clicked, current isDark:", isDark);
            toggleMode();
            setTimeout(() => {
              const htmlClass = document.documentElement.className;
              const htmlElement = document.documentElement;
              const bgFrom = getComputedStyle(htmlElement).getPropertyValue('--background');
              const fgFrom = getComputedStyle(htmlElement).getPropertyValue('--foreground');
              
              let bg = null, color = null;
              if (sectionRef.current) {
                const computed = window.getComputedStyle(sectionRef.current);
                bg = computed.backgroundImage || computed.backgroundColor;
                color = computed.color;
              }
              
              console.log("=== AFTER TOGGLE DEBUG ===");
              console.log("[DEBUG] (after toggle) isDark prop:", !isDark);
              console.log("[DEBUG] (after toggle) <html> class:", htmlClass);
              console.log("[DEBUG] (after toggle) <html> has 'dark' class:", htmlElement.classList.contains('dark'));
              console.log("[DEBUG] (after toggle) CSS var --background:", bgFrom);
              console.log("[DEBUG] (after toggle) CSS var --foreground:", fgFrom);
              console.log("[DEBUG] (after toggle) Section bg:", bg);
              console.log("[DEBUG] (after toggle) Section text color:", color);
              console.log("=== END AFTER TOGGLE DEBUG ===");
            }, 100);
          }} className="text-2xl ml-2 focus:outline-none">
            {isDark ? "🌙" : "☀️"}
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex flex-row items-center justify-center flex-1 mt-24 px-16 w-full">
        {/* Left: Text Content */}
        <div className="flex-1 max-w-xl">
          <h1 className="text-5xl font-extrabold mb-2">Maks Matusiak</h1>
          <h2 className="text-2xl font-semibold text-[#2563eb] mb-4">
            Software Developer | UI/UX Designer<br />Web Developer | Data Scientist
          </h2>
          <p className="mb-8 text-lg font-light">
            I am a passionate tech enthusiast based in London, currently studying Computer Science and Mathematics. Beyond my studies I've actively developed a range of projects, both independently and in collaboration with other developers or clients. My personal mission is to integrate AI within web development in order to provide smarter, more efficient solutions. I am looking forward to explore new career opportunities to keep learning and developing my skills
          </p>
          <a
            href="/static/img/My_CV.pdf"
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
        <div className="flex-1 flex justify-center">
          <div className="rounded-full w-[425px] h-[100px] flex items-center justify-center shadow-lg">
            <img src="/img/MaksCartoon.png" alt="Avatar" className="rounded-full w-300 h-300 object-cover" />
          </div>
        </div>
      </div>

      {/* Horizontal line above logos */}
      <hr className="border-t-2 border-[#000] w-full absolute left-0 dark:border-[#fff] border-[#000]" style={{ top: "calc(90% + 3px)" }} />
      {/* Company Names Marquee Animation */}
      <div className="relative w-full overflow-hidden bg-[#FFFFFF] dark:bg-[#181e2a] py-4">
        <div className="flex animate-marquee whitespace-nowrap min-w-max">
          {[...companies, ...companies].map((name, i) => (
            <span key={i} className="mx-8 text-3xl font-semibold tracking-wide">{name}</span>
          ))}
        </div>
      </div>
      {/* Horizontal line below logos */}
      <hr className="border-t-2 border-[#000] w-full absolute left-0 dark:border-[#fff] border-[#000]" style={{ top: "calc(90% + 70px)" }} />
    </section>
  );
};

export default HomeSection;
