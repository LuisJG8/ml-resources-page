import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App.tsx";
import "./styles.css";
import "./responsive.css";
import "./quiet-current.css";

const root = document.getElementById("root");
if (!root) throw new Error("Missing application root element");

createRoot(root).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
