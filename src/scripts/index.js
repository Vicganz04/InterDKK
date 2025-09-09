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
  const loader = document.querySelector('.bg-loader');
  if (loader) loader.style.display = 'none';

  // Floating Chatbot logic
  const chatbotBtn = document.getElementById('chatbotBtn');
  const chatbotRoot = document.getElementById('floating-chatbot-root');
  let chatbotVisible = false;
  let chatbotInstance = null;

  async function showChatbot() {
    if (!chatbotVisible) {
      chatbotRoot.style.display = 'block';
      chatbotRoot.innerHTML = `<div style="position:relative;animation: chatbotPopIn 0.25s cubic-bezier(.4,1.5,.5,1);">
        <div id="chatbotContent"></div>
      </div>`;
      chatbotInstance = new ChatbotPage();
      document.getElementById('chatbotContent').innerHTML = await chatbotInstance.render();
      if (chatbotInstance.afterRender) chatbotInstance.afterRender();
      // Tambahkan tombol panah kebawah di pojok kanan header
      const header = chatbotRoot.querySelector('.chat-header');
      if (header) {
        const downBtn = document.createElement('button');
        downBtn.className = 'chatbot-down-btn';
        downBtn.title = 'Tutup Chatbot';
        downBtn.innerHTML = '<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 9L11 14L16 9" stroke="white" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
        downBtn.onclick = hideChatbot;
        header.appendChild(downBtn);
      }
      chatbotVisible = true;
    }
  }
  function hideChatbot() {
    chatbotRoot.style.animation = 'chatbotPopOut 0.18s cubic-bezier(.4,1.5,.5,1)';
    setTimeout(() => {
      chatbotRoot.style.display = 'none';
      chatbotRoot.innerHTML = '';
      chatbotRoot.style.animation = '';
      chatbotVisible = false;
    }, 160);
  }
  if (chatbotBtn) {
    chatbotBtn.addEventListener('click', () => {
      if (chatbotVisible) {
        hideChatbot();
      } else {
        showChatbot();
      }
    });
  }

  window.addEventListener("hashchange", async () => {
    await app.renderPage();
  });
});
