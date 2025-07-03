import React, { useState, useEffect } from "react";
import AboutMeSection from "./sections/AboutMeSection/AboutMeSection";
import SkillsSection from "./sections/SkillsSection/SkillsSection";
import PortfolioSection from "./sections/PortfolioSection/PortfolioSection";
import CertificatesSection from "./sections/CertificatesSection/CertificatesSection";
import ContactSection from "./sections/ContactSection/ContactSection";
import HomeSection from "./sections/HomeSection/HomeSection";

export const Frame = () => {
  // Dark mode state, persisted in localStorage
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("theme");
      if (stored) return stored === "dark";
      // Default: match system
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return false;
  });

  // Set <html> class and persist to localStorage
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  const toggleMode = () => setIsDark((prev) => !prev);

  return (
    <div className="min-h-screen w-full scroll-smooth font-sans"> {/* Added font-sans for consistency */}
      {/* This is the core change: Apply the seamless gradient background to a fixed element.
        It covers the entire viewport and sits behind all your content (z-index: 0).
      */}
      <div className="fixed inset-0 z-0 bg-gradient-to-br from-white to-[#A8CDFF] dark:from-black dark:to-[#1A2035]"></div>

      {/* This div wraps all your sections. It needs to be relative and have a z-index
        higher than the fixed background so your content is visible on top of the gradient.
      */}
      <div className="relative z-10 w-full flex flex-col">
        <section id="home"><HomeSection isDark={isDark} toggleMode={toggleMode} /></section>
        <section id="about"><AboutMeSection /></section>
        <section id="skills"><SkillsSection /></section>
        <section id="portfolio"><PortfolioSection /></section>
        <section id="certificates"><CertificatesSection /></section>
        <section id="contact"><ContactSection /></section>
      </div>
    </div>
  );
};