import './i18n';
import "../tailwind.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Frame } from "./screens/Frame/Frame";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MaksAISection from './screens/MaksAISection/MaksAISection';

createRoot(document.getElementById("app")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Frame />} />
        <Route path="/maksai" element={<MaksAISection />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
