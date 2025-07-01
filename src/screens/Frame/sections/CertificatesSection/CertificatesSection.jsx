import React, { useState } from "react";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";

const CertificatesSection = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const certificates = [
    { id: 1, src: "/img/Acc.png", alt: "Certificate 1" },
    { id: 2, src: "/img/Gsa.png", alt: "Certificate 2" },
    { id: 3, src: "/img/hpe_certificate.png", alt: "Certificate 3" },
    { id: 4, src: "/img/jpm.png", alt: "Certificate 4" },
    { id: 5, src: "/img/Sky.png", alt: "Certificate 5" },
    { id: 6, src: "/img/dv.png", alt: "Certificate 6" },
    { id: 7, src: "/img/iml.png", alt: "Certificate 7" },
    { id: 8, src: "/img/itdl.png", alt: "Certificate 8" },
    { id: 9, src: "/img/itml.png", alt: "Certificate 9" },
    { id: 10, src: "/img/pandas.png", alt: "Certificate 10" },
    { id: 11, src: "/img/ts.png", alt: "Certificate 11" },
  ];

  const certificatesPerPage = 6;
  const lastPage = Math.ceil(certificates.length / certificatesPerPage);

  // Convert 'last' to lastPage number
  const pageNumber = currentPage === "last" ? lastPage : currentPage;

  // Slice certificates for current page
  const displayedCertificates = certificates.slice(
    (pageNumber - 1) * certificatesPerPage,
    pageNumber * certificatesPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <section className="w-full min-h-screen bg-gradient-to-br from-white to-[#A8CDFF] dark:from-black dark:to-[#1A2035] text-black dark:text-white flex flex-col justify-center items-center py-12 sm:py-16 md:py-20">
      <h1 className="text-[#0f52ba] dark:text-[#2563eb] text-3xl sm:text-4xl md:text-5xl font-bold mb-8 sm:mb-12">Certificates</h1>
      <div className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 px-4 sm:px-8">
        {displayedCertificates.map((cert) => (
          <Card
            key={cert.id}
            className="bg-[#e6f0fa] dark:bg-[#2f3647] rounded-[20px] p-4 sm:p-6 flex flex-col h-full"
          >
            <CardContent className="p-0 flex justify-center items-center">
              <img
                src={cert.src}
                alt={cert.alt}
                className="w-full h-auto max-h-60 sm:max-h-72 md:max-h-80 rounded-lg shadow-md object-contain"
                onError={(e) => {
                  console.error("Failed to load certificate:", cert.src);
                  e.target.style.display = 'none';
                }}
              />
            </CardContent>
          </Card>
        ))}
      </div>
      <nav className="flex justify-center mt-8 space-x-2 sm:space-x-4">
        <Button
          onClick={() => handlePageChange(1)}
          className={
            pageNumber === 1
              ? "bg-[#0f52ba] text-white dark:bg-[#2563eb] dark:text-white"
              : "bg-transparent text-[#0f52ba] border border-[#0f52ba] dark:text-[#2563eb] dark:border-[#2563eb]"
          }
        >
          1
        </Button>
        <Button
          onClick={() => handlePageChange(2)}
          className={
            pageNumber === 2
              ? "bg-[#0f52ba] text-white dark:bg-[#2563eb] dark:text-white"
              : "bg-transparent text-[#0f52ba] border border-[#0f52ba] dark:text-[#2563eb] dark:border-[#2563eb]"
          }
        >
          2
        </Button>
        <Button
          onClick={() => handlePageChange('last')}
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

export default CertificatesSection;