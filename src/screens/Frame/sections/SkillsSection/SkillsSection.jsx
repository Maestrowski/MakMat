import React from "react";
import { useTranslation } from 'react-i18next';

const SkillsSection = () => {
  const { t } = useTranslation();
  const categories = [
    {
      title: t('skills.frontend'),
      skills: [
        { name: 'HTML' },
        { name: 'JavaScript' },
        { name: 'TypeScript' },
        { name: 'React' },
        { name: 'Vue' },
        { name: 'Streamlit' },
        { name: 'Next.js' },
      ],
    },
    {
      title: t('skills.styling'),
      skills: [
        { name: 'CSS' },
        { name: 'BootStrap' },
        { name: 'Tailwind CSS' },
        { name: 'Figma' },
      ],
    },
    {
      title: t('skills.backend'),
      skills: [
        { name: 'Java' },
        { name: 'Python' },
        { name: 'Spring Boot' },
        { name: 'Java Swift' },
        { name: 'Django' },
        { name: 'SQL' },
      ],
    },
    {
      title: t('skills.ml'),
      skills: [
        { name: 'TensorFlow' },
        { name: 'PyTorch' },
        { name: 'Apache Spark' },
        { name: 'R' },
      ],
    },
    {
      title: t('skills.misc'),
      skills: [
        { name: 'Git' },
        { name: 'Jupyter Notebook' },
        { name: 'Anaconda' },
        { name: 'REST APIs' },
        { name: 'GCP' },
        { name: 'Selenium' },
      ],
    },
  ];

  return (
    <section
      // === MAJOR CHANGE HERE ===
      // Removed: bg-gradient-to-br from-white to-[#A8CDFF] dark:from-black dark:to-[#1A2035]
      // This section will now have a transparent background, allowing the gradient from Frame.jsx to show.
      className="w-full min-h-screen text-black dark:text-white flex flex-col justify-center items-center py-12 sm:py-16 md:py-20"
    >
      <h1 className="text-[#0f52ba] dark:text-[#2563eb] text-3xl sm:text-4xl md:text-5xl font-bold mb-8 sm:mb-12">{t('skills.title')}</h1>
      <div className="w-full max-w-6xl flex flex-col gap-6 sm:gap-8 px-4 sm:px-8">
        {categories.map((category) => (
          <div key={category.title} className="mb-2">
            <h2 className="text-black dark:text-[#2563eb] text-lg sm:text-xl md:text-2xl font-normal mb-2">{category.title}</h2>
            <div className="flex flex-wrap gap-2 sm:gap-4">
              {category.skills.map((skill) => (
                <span
                  key={skill.name}
                  className="bg-[#e6f0fa] dark:bg-[#2f3647] text-[#000000] dark:text-[#ffffff] px-3 sm:px-4 py-1 sm:py-2 rounded-md text-base sm:text-lg font-medium"
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SkillsSection;