import React from "react";

const AboutMeSection = () => {
  return (
    <section
      // === MAJOR CHANGE HERE ===
      // Removed: bg-gradient-to-br from-white to-[#A8CDFF] dark:from-[#1A2035] dark:to-black
      // Now, this section will have a transparent background, allowing the gradient from Frame.jsx to show.
      className="w-full min-h-screen text-black dark:text-white flex flex-col items-center py-12 sm:py-16 md:py-20"
    >
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 sm:mb-12 md:mb-16 text-center text-[#0f52ba] dark:text-[#2563eb]">
        About Me
      </h1>
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 px-4 sm:px-8">
        <div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-2 sm:mb-4 text-center text-[#0f52ba] dark:text-[#2563eb]">
            Past
          </h2>
          <p className="text-sm sm:text-base font-light text-center">
            My interest for programming developed when I was in college. At first I was interested in web development having seen all the possibilities and ways I could have an impact on the world. Over the years, I have developed several websites and continued to develop my skills. My development comes at around the same time as the rise of artificial intelligence which particularly excites me because with AI there are even more possibilities. Lately I developed a AI stock market predictor which is presented in a web application and that is only the beginning.
          </p>
        </div>
        <div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-2 sm:mb-4 text-center text-[#0f52ba] dark:text-[#2563eb]">
            Present
          </h2>
          <p className="text-sm sm:text-base font-light text-center">
            Currently I have graduated top of my class with first class honours from Queen Mary University of London with a BSc in Computer Science. Alongside my studies, I am currently a co-founder of LearnTeach.io, a token-based skill sharing platform during the development stage. I am also offering freelance web development services.
          </p>
        </div>
        <div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-2 sm:mb-4 text-center text-[#0f52ba] dark:text-[#2563eb]">
            Future
          </h2>
          <p className="text-sm sm:text-base font-light text-center">
            My personal mission is to integrate AI within web development in order to provide smarter, more efficient solutions. I am looking forward to explore new career opportunities to keep learning and developing my skills.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutMeSection;