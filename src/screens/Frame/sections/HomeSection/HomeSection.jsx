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

  return (
    <section ref={sectionRef} className="relative min-h-screen w-full bg-gradient-to-br from-white to-[#A8CDFF] text-black dark:from-black dark:to-[#1A2035] dark:text-white overflow-hidden flex flex-col">
      {/* Navigation Bar */}
      <nav className="flex items-center justify-between px-12 pt-6 z-10">
        {/* Logo */}
        <img 
          src="/img/logo-no-background.png" 
          alt="Logo" 
          className="h-12"
          onError={(e) => {
            console.error("Failed to load logo:", e.target.src);
            e.target.style.display = 'none';
          }}
        />
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
            <img 
              src="/img/Email.png" 
              alt="Email" 
              className="h-6 w-6"
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
              className="h-6 w-6"
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
              className="h-6 w-6"
              onError={(e) => {
                console.error("Failed to load GitHub icon:", e.target.src);
                e.target.style.display = 'none';
              }}
            />
          </a>
          <button onClick={toggleMode} className="text-2xl ml-2 focus:outline-none">
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
        <div className="flex-1 flex justify-center">
          <div className="rounded-full w-[425px] h-[100px] flex items-center justify-center shadow-lg">
            <img 
              src="/img/MaksCartoon.png" 
              alt="Avatar" 
              className="rounded-full w-300 h-300 object-cover"
              onError={(e) => {
                console.error("Failed to load avatar:", e.target.src);
                e.target.style.display = 'none';
              }}
            />
          </div>
        </div>
      </div>

      {/* Horizontal line above logos */}
      <hr className="border-t-2 border-[#000] w-full absolute left-0 dark:border-[#fff] border-[#000]" style={{ top: "calc(90% + 2px)" }} />
      {/* Company Names Marquee Animation */}
      <div className="relative w-full overflow-hidden bg-[#FFFFFF] dark:bg-[#181e2a] py-4">
        <div className="flex animate-marquee whitespace-nowrap min-w-max">
          {[...companies, ...companies].map((name, i) => (
            <span key={i} className="mx-8 text-3xl font-semibold tracking-wide">{name}</span>
          ))}
        </div>
      </div>
      {/* Horizontal line below logos */}
      <hr className="border-t-2 border-[#000] w-full absolute left-0 dark:border-[#fff] border-[#000]" style={{ top: "calc(90% + 71px)" }} />
    </section>
  );
};

export default HomeSection;
