import React, { useState } from "react";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";

const PortfolioSection = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const projects = [
    {
      title: "GRU Stock Market Predictor",
      description: [
        "Data gathered from YahooFinance",
        "Displayed on Streamlit web friendly application",
        "Engineered in TensorFlow",
        "Achieved <5% MAPE across multiple test windows",
      ],
    },
    {
      title: "Full-Stack Hobby Matching App",
      description: [
        "Made in Django and Vue",
        "Hobby-based user matching",
        "Friend request functionality",
        "Implemented REST APIs and AJAX based filtering",
        "Frontend made in Typescript",
      ],
    },
    {
      title: "FDM Business Expense Application",
      description: [
        "React-based web application",
        "Real-life project made for a real client",
        "Secure login and multi device support",
        "Visual dashboard for real-time expenses",
        "Available in 4 languages",
      ],
    },
    {
      title: "Weather forecaster",
      description: [
        "React-based web application",
        "OpenWeather API for hourly/daily forecast",
        "Geolocation to include local weather",
        "Positive User Experience",
      ],
    },
    {
      title: "CNN CIFAR-10 Image Classifier",
      description: [
        "Engineered in PyTorch",
        ">90% Test accuracy",
        "Batch Normalization improving model generalization on 60,000 images",
        "Reduced GPU usage and training time by 40%",
      ],
    },
    {
      title: "Calorie Calculator",
      description: [
        "Developed in Java Swift",
        "User inputs personal details",
        "User decides their goals",
        "Based on calculations algorithm tells the user how many caloreis they should consume",
      ],
    },
    {
      title: "Ping Pong",
      description: [
        "Developed in Java Swift",
        "Created an algorithm that moves opposition pallet based on ball location",
        "Physics implemented",
        "Score-based game",
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
    <section className="w-full min-h-screen bg-gradient-to-br from-white to-[#A8CDFF] dark:from-black dark:to-[#1A2035] text-black dark:text-white flex flex-col justify-center items-center py-12 sm:py-16 md:py-20">
      <h1 className="text-[#0f52ba] dark:text-[#2563eb] text-3xl sm:text-4xl md:text-5xl font-bold mb-8 sm:mb-12">Projects</h1>
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
          1
        </Button>
        <Button
          onClick={() => setCurrentPage(2)}
          className={
            pageNumber === 2
              ? "bg-[#0f52ba] text-white dark:bg-[#2563eb] dark:text-white"
              : "bg-transparent text-[#0f52ba] border border-[#0f52ba] dark:text-[#2563eb] dark:border-[#2563eb]"
          }
        >
          2
        </Button>
        <Button
          onClick={() => setCurrentPage('last')}
          className={
            pageNumber === lastPage
              ? "bg-[#0f52ba] text-white dark:bg-[#2563eb] dark:text-white"
              : "bg-transparent text-[#0f52ba] border border-[#0f52ba] dark:text-[#2563eb] dark:border-[#2563eb]"
          }
        >
          Last
        </Button>
      </nav>
    </section>
  );
};

export default PortfolioSection;
