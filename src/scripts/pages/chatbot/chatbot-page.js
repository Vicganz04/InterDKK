export default class ChatbotPage {
  async render() {
    return `
      <div class="chat-container">
        <!-- Chatbot Header -->
        <div class="chat-header">
          <div class="chat-header-info">
            <div class="chat-avatar-header">
              <i class="fas fa-seedling"></i>
              <span class="status-dot"></span>
            </div>
            <div class="chat-header-text">
              <h2 class="chat-title">HealBot</h2>
              <span class="chat-status-text">Asisten Edukasi & Gizi Online</span>
            </div>
          </div>
          <div class="chat-header-actions">
            <button id="clear-chat-btn" class="chat-action-btn" title="Bersihkan Percakapan" type="button">
              <i class="fas fa-trash-can"></i>
            </button>
          </div>
        </div>

        <!-- Quick Suggestions Chips Bar -->
        <div class="chat-suggestions-container">
          <div class="chat-suggestions" id="chat-suggestions">
            <button type="button" class="suggestion-chip" data-prompt="Apa itu stunting?">
              Apa itu stunting?
            </button>
            <button type="button" class="suggestion-chip" data-prompt="Bagaimana cara mencegah stunting?">
              Pencegahan stunting
            </button>
            <button type="button" class="suggestion-chip" data-prompt="Apa saja gejala anemia?">
              Gejala anemia
            </button>
            <button type="button" class="suggestion-chip" data-prompt="Bagaimana cara menghitung IMT ideal?">
              Hitung IMT ideal
            </button>
            <button type="button" class="suggestion-chip" data-prompt="Berapa kebutuhan kalori harian rata-rata?">
              Kebutuhan kalori
            </button>
          </div>
        </div>

        <!-- Chat Messages Area -->
        <div id="chat-box" class="chat-box"></div>

        <!-- Chat Input Footer -->
        <div class="chat-footer">
          <form class="chat-input-form" id="chat-form" onsubmit="return false;">
            <input 
              type="text" 
              id="user-input" 
              placeholder="Tulis pertanyaanmu seputar gizi..." 
              autocomplete="off"
            />
            <button id="send-btn" type="submit" aria-label="Kirim Pesan" title="Kirim">
              <i class="fas fa-paper-plane"></i>
            </button>
          </form>
        </div>
      </div>
    `;
  }

  async afterRender() {
    const sendBtn = document.getElementById("send-btn");
    const userInput = document.getElementById("user-input");
    const chatBox = document.getElementById("chat-box");
    const chatForm = document.getElementById("chat-form");
    const clearBtn = document.getElementById("clear-chat-btn");
    const suggestionChips = document.querySelectorAll(".suggestion-chip");

    // Format waktu sekarang (HH:MM)
    function getCurrentTime() {
      const now = new Date();
      return now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    }

    // Helper format markdown & HTML (p, bold, list, bullet, newline)
    function formatMessageText(text) {
      if (!text) return "";
      let formatted = text
        .replace(/\r\n/g, "\n")
        .replace(/\r/g, "\n")
        // Hapus newline di sekitar tag HTML blok (seperti </p>\n<p>)
        .replace(/\n*(<\/?(p|ul|ol|li|div|h[1-6]|br)\b[^>]*>)\n*/gi, "$1")
        // Bold **text**
        .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
        // Italic *text*
        .replace(/\*(.*?)\*/g, "<em>$1</em>")
        // Numbered list: 1. Item
        .replace(/^\s*(\d+)\.\s+(.*)$/gm, "<li>$2</li>")
        // Bullet list: - Item or * Item
        .replace(/^\s*[\-\*]\s+(.*)$/gm, "<li>$1</li>");

      // Wrap consecutive <li> into <ul>
      formatted = formatted.replace(/(<li>.*?<\/li>)+/g, (match) => {
        return `<ul class="chat-list">${match}</ul>`;
      });

      // Konversi heading besar h1, h2, h3 menjadi h4 agar proporsional di chat bubble
      formatted = formatted.replace(/<h[1-3]\b[^>]*>(.*?)<\/h[1-3]>/gi, "<h4>$1</h4>");

      // Hilangkan spasi baris berlebih & konversi sisa newline
      formatted = formatted
        .replace(/\n+/g, "<br>")
        .replace(/(<br\s*\/?>\s*){2,}/gi, "<br>")
        .replace(/<\/ul>\s*<br\s*\/?>/gi, "</ul>")
        .replace(/<br\s*\/?>\s*<ul/gi, "<ul");

      return formatted;
    }

    // Append message dengan avatar dan bubble yang rapi
    function appendMessage(sender, message) {
      const msgRow = document.createElement("div");
      msgRow.classList.add("chat-message-row", sender);

      const timeStr = getCurrentTime();
      const isBot = sender === "bot";
      const formattedContent = isBot ? formatMessageText(message) : escapeHtml(message);

      const avatarHtml = isBot
        ? `<div class="chat-avatar bot" title="HealBot"><i class="fas fa-seedling"></i></div>`
        : `<div class="chat-avatar user" title="Anda"><i class="fas fa-user"></i></div>`;

      msgRow.innerHTML = `
        ${avatarHtml}
        <div class="chat-bubble-wrapper">
          <div class="chat-bubble ${sender}">
            <div class="chat-text">${formattedContent}</div>
            <div class="chat-timestamp">${timeStr}</div>
          </div>
        </div>
      `;

      chatBox.appendChild(msgRow);
      chatBox.scrollTop = chatBox.scrollHeight;
    }

    function escapeHtml(text) {
      const div = document.createElement("div");
      div.innerText = text;
      return div.innerHTML;
    }

    // Tampilkan animasi typing loading
    function showTypingIndicator() {
      const typingDiv = document.createElement("div");
      typingDiv.id = "chat-typing-indicator";
      typingDiv.classList.add("chat-message-row", "bot");
      typingDiv.innerHTML = `
        <div class="chat-avatar bot"><i class="fas fa-seedling"></i></div>
        <div class="chat-bubble-wrapper">
          <div class="chat-bubble bot typing">
            <div class="typing-indicator">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      `;
      chatBox.appendChild(typingDiv);
      chatBox.scrollTop = chatBox.scrollHeight;
    }

    function removeTypingIndicator() {
      const indicator = document.getElementById("chat-typing-indicator");
      if (indicator) indicator.remove();
    }

    // Inisialisasi Pesan Awal
    function initWelcomeMessages() {
      chatBox.innerHTML = "";
      appendMessage(
        "bot",
        "Halo! Saya **HealBot** 🌱. Asisten kesehatan cerdas Anda.<br>Saya siap membantu menjawab pertanyaan seputar gizi, stunting, penyakit, IMT, dan pola hidup sehat."
      );
      appendMessage(
        "bot",
        "Ketik pertanyaan Anda di bawah atau klik salah satu topik saran cepat di atas untuk memulai! 👇"
      );
    }

    initWelcomeMessages();

    // Event kirim form
    chatForm.addEventListener("submit", (e) => {
      e.preventDefault();
      sendMessage();
    });

    sendBtn.addEventListener("click", (e) => {
      e.preventDefault();
      sendMessage();
    });

    userInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
      }
    });

    // Clear chat button
    if (clearBtn) {
      clearBtn.addEventListener("click", () => {
        initWelcomeMessages();
        userInput.focus();
      });
    }

    // Quick suggestion chips handler
    suggestionChips.forEach((chip) => {
      chip.addEventListener("click", () => {
        const prompt = chip.getAttribute("data-prompt");
        if (prompt) {
          userInput.value = prompt;
          sendMessage();
        }
      });
    });

    // Mengirim pesan ke backend
    async function sendMessage() {
      const message = userInput.value.trim();
      if (message === "") return;

      // Disable input saat mengirim
      userInput.disabled = true;
      sendBtn.disabled = true;

      appendMessage("user", message);
      userInput.value = "";

      showTypingIndicator();

      try {
        const response = await fetch("https://chatbot-flask-backend-r1dd.onrender.com/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt: message }),
        });

        const data = await response.json();
        removeTypingIndicator();

        if (data && data.answer) {
          appendMessage("bot", data.answer);
        } else {
          appendMessage("bot", "Maaf, saya tidak dapat menemukan jawaban untuk pertanyaan tersebut.");
        }
      } catch (err) {
        removeTypingIndicator();
        appendMessage(
          "bot",
          "⚠️ *Maaf, terjadi kendala saat menghubungkan ke server chatbot.* Pastikan server backend AI sudah aktif di port 5000."
        );
        console.error(err);
      } finally {
        userInput.disabled = false;
        sendBtn.disabled = false;
        userInput.focus();
      }
    }

    // Auto-focus input
    setTimeout(() => {
      if (userInput) userInput.focus();
    }, 150);
  }
}

