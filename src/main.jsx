import React, { Suspense, lazy } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const App = lazy(() => import("./App.jsx"));

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Suspense fallback={<div className="fixed inset-0 bg-[#080808]" />}>
      <App />
    </Suspense>
  </React.StrictMode>,
);
