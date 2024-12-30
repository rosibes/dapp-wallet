import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom"; // Importă BrowserRouter din react-router-dom
import App from "./App.jsx";
import "./index.css"; // Importă Tailwind CSS

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter> {/* Înconjoară App cu BrowserRouter */}
      <App />
    </BrowserRouter>
  </StrictMode>
);
