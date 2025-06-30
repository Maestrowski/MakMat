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
    console.log("[FRAME DEBUG] isDark changed to:", isDark);
    console.log("[FRAME DEBUG] Current <html> class before change:", document.documentElement.className);
    
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      console.log("[FRAME DEBUG] Added 'dark' class to <html>");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      console.log("[FRAME DEBUG] Removed 'dark' class from <html>");
    }
    
    console.log("[FRAME DEBUG] Final <html> class:", document.documentElement.className);
    console.log("[FRAME DEBUG] localStorage theme:", localStorage.getItem("theme"));
  }, [isDark]);

  const toggleMode = () => {
    console.log("[FRAME DEBUG] toggleMode called, current isDark:", isDark);
    setIsDark((prev) => !prev);
  };

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
