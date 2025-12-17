import React, { useState } from "react";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";
import { useTranslation } from 'react-i18next';

const PortfolioSection = () => {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(1);

  const projects = [
    {
      title: t('projects.project1.title'),
      description: [
        t('projects.project1.desc1'),
        t('projects.project1.desc2'),
        t('projects.project1.desc3'),
        t('projects.project1.desc4'),
      ],
    },
    {
      title: t('projects.project2.title'),
      description: [
        t('projects.project2.desc1'),
        t('projects.project2.desc2'),
        t('projects.project2.desc3'),
        t('projects.project2.desc4'),
        t('projects.project2.desc5'),
      ],
    },
    {
      title: t('projects.project3.title'),
      description: [
        t('projects.project3.desc1'),
        t('projects.project3.desc2'),
        t('projects.project3.desc3'),
        t('projects.project3.desc4'),
        t('projects.project3.desc5'),
      ],
    },
    {
      title: t('projects.project4.title'),
      description: [
        t('projects.project4.desc1'),
        t('projects.project4.desc2'),
        t('projects.project4.desc3'),
        t('projects.project4.desc4'),
      ],
    },
    {
      title: t('projects.project5.title'),
      description: [
        t('projects.project5.desc1'),
        t('projects.project5.desc2'),
        t('projects.project5.desc3'),
        t('projects.project5.desc4'),
      ],
    },
    {
      title: t('projects.project6.title'),
      description: [
        t('projects.project6.desc1'),
        t('projects.project6.desc2'),
        t('projects.project6.desc3'),
        t('projects.project6.desc4'),
      ],
    },
    {
      title: t('projects.project7.title'),
      description: [
        t('projects.project7.desc1'),
        t('projects.project7.desc2'),
        t('projects.project7.desc3'),
        t('projects.project7.desc4'),
      ],
    },
    {
      title: t('projects.project8.title'),
      description: [
        t('projects.project8.desc1'),
        t('projects.project8.desc2'),
        t('projects.project8.desc3'),
      ],
    },
  ];

  const projectsPerPage = 6;
  const lastPage = Math.ceil(projects.length / projectsPerPage);

  // Determine which page number to use if currentPage is 'last'
  const pageNumber = currentPage === "last" ? lastPage : currentPage;

  // Slice projects for the current page
  const displayedProjects = projects.slice(
    (pageNumber - 1) * projectsPerPage,
    pageNumber * projectsPerPage
  );

  return (
    <section
      // === MAJOR CHANGE HERE ===
      // Removed: bg-gradient-to-br from-white to-[#A8CDFF] dark:from-[#1A2035] dark:to-black
      // This section will now have a transparent background, allowing the gradient from Frame.jsx to show.
      className="w-full min-h-screen text-black dark:text-white flex flex-col justify-center items-center py-12 sm:py-16 md:py-20"
    >
      <h1 className="text-[#0f52ba] dark:text-[#2563eb] text-3xl sm:text-4xl md:text-5xl font-bold mb-8 sm:mb-12">{t('projects.title')}</h1>
      <div className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 px-4 sm:px-8">
        {displayedProjects.map((project, index) => (
          <Card
            key={index}
            className="bg-[#e6f0fa] dark:bg-[#2f3647] rounded-[20px] p-4 sm:p-6 flex flex-col h-full"
          >
            <CardContent className="p-0">
              <h2 className="text-[#2563eb] dark:text-[#0f52ba] text-lg sm:text-xl md:text-2xl font-bold mb-2">
                {project.title}
              </h2>
              <ul className="text-black dark:text-[#b3c6e0] text-sm sm:text-base font-light list-disc list-inside">
                {project.description.map((line, lineIndex) => (
                  <li key={lineIndex}>{line}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
      <nav className="flex justify-center mt-8 space-x-2 sm:space-x-4">
        <Button
          onClick={() => setCurrentPage(1)}
          className={
            pageNumber === 1
              ? "bg-[#0f52ba] text-white dark:bg-[#2563eb] dark:text-white"
              : "bg-transparent text-[#0f52ba] border border-[#0f52ba] dark:text-[#2563eb] dark:border-[#2563eb]"
          }
        >
          {t('projects.page1')}
        </Button>
        <Button
          onClick={() => setCurrentPage(2)}
          className={
            pageNumber === 2
              ? "bg-[#0f52ba] text-white dark:bg-[#2563eb] dark:text-white"
              : "bg-transparent text-[#0f52ba] border border-[#0f52ba] dark:text-[#2563eb] dark:border-[#2563eb]"
          }
        >
          {t('projects.page2')}
        </Button>
        <Button
          onClick={() => setCurrentPage('last')}
          className={
            pageNumber === lastPage
              ? "bg-[#0f52ba] text-white dark:bg-[#2563eb] dark:text-white"
              : "bg-transparent text-[#0f52ba] border border-[#0f52ba] dark:text-[#2563eb] dark:border-[#2563eb]"
          }
        >
          {t('projects.last')}
        </Button>
      </nav>
    </section>
  );
};

export default PortfolioSection;