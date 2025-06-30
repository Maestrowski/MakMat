import React from "react";

const SkillsSection = () => {
  const categories = [
    {
      title: "Front End",
      skills: [
        { name: "HTML" },
        { name: "JavaScript" },
        { name: "TypeScript" },
        { name: "React" },
        { name: "Vue" },
        { name: "Streamlit" },
        { name: "Next.js" },
      ],
    },
    {
      title: "Styling",
      skills: [
        { name: "CSS" },
        { name: "BootStrap" },
        { name: "Tailwind CSS" },
        { name: "Figma" },
      ],
    },
    {
      title: "Back End",
      skills: [
        { name: "Java" },
        { name: "Python" },
        { name: "Spring Boot" },
        { name: "Java Swift" },
        { name: "Django" },
        { name: "SQL" },
      ],
    },
    {
      title: "Machine Learning & Data Science",
      skills: [
        { name: "TensorFlow" },
        { name: "PyTorch" },
        { name: "Apache Spark" },
        { name: "R" },
      ],
    },
    {
      title: "Miscellaneous",
      skills: [
        { name: "Git" },
        { name: "Jupyter Notebook" },
        { name: "Anaconda" },
        { name: "REST APIs" },
        { name: "GCP" },
        { name: "Selenium" },
      ],
    },
  ];

  return (
    <section className="w-full min-h-screen bg-gradient-to-br from-white to-[#A8CDFF] dark:from-black dark:to-[#1A2035] text-black dark:text-white flex flex-col justify-center items-center py-20">
      <h1 className="text-[#0f52ba] dark:text-[#2563eb] text-5xl font-bold mb-12">Skills</h1>
      <div className="w-full max-w-6xl flex flex-col gap-8">
        {categories.map((category) => (
          <div key={category.title} className="mb-2">
            <h2 className="text-black dark:text-[#2563eb] text-xl font-normal mb-2">{category.title}</h2>
            <div className="flex flex-wrap gap-4">
              {category.skills.map((skill) => (
                <span
                  key={skill.name}
                  className="bg-[#e6f0fa] dark:bg-[#2f3647] text-[#2563eb] px-4 py-2 rounded-md text-lg font-medium"
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
