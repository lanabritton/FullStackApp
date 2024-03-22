import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";

const rootElement = document.getElementById("root");

// Check if the root container already has a _reactRootContainer property
if (!rootElement._reactRootContainer) {
    // Create the root only if it doesn't already exist
    createRoot(rootElement).render(
        <React.StrictMode>
            <App />
        </React.StrictMode>
    );
}


