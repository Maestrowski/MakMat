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
    // Removed fixed dark background here
    <div className="min-h-screen w-full scroll-smooth">
      <div className="w-full flex flex-col">
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
