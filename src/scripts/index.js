// CSS imports
import "../styles/styles.css";
import "../scripts/pages/styles-page.css";
// Bootstrap imports
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import App from "./pages/app";

import ChatbotPage from "./pages/chatbot/chatbot-page.js";

document.addEventListener("DOMContentLoaded", async () => {
  const app = new App({
    content: document.querySelector("#main-content"),
  });

  await app.renderPage();

  // Hide loader
  const loader = document.querySelector(".bg-loader");
  if (loader) loader.style.display = "none";

  window.addEventListener("hashchange", async () => {
    await app.renderPage();
  });
});
