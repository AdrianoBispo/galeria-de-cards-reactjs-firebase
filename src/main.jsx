import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "@material-tailwind/react";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { App } from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
);
