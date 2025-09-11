export default class ChatbotPage {
  async render() {
    return `
      <div class="chat-container">
        <div class="chat-header">
          <h2>HEALBOT</h2>
        </div>
        <div id="chat-box" class="chat-box"></div>
        <div class="chat-input">
          <input type="text" id="user-input" placeholder="Tulis pertanyaanmu..." />
          <button id="send-btn">Kirim</button>
        </div>
      </div>
    `;
  }

  async afterRender() {
    const sendBtn = document.getElementById("send-btn");
    const userInput = document.getElementById("user-input");
    const chatBox = document.getElementById("chat-box");

    // Append message dengan scroll otomatis
    function appendMessage(sender, message) {
      const msgDiv = document.createElement("div");
      msgDiv.classList.add("chat-message", sender);
      msgDiv.innerHTML = message;
      chatBox.appendChild(msgDiv);
      chatBox.scrollTop = chatBox.scrollHeight;
    }

    // Pesan awal chatbot
    appendMessage(
      "bot",
      "Halo! Saya HealBot 🌱. Saya bisa membantu menjawab pertanyaan tentang gizi, stunting, IMT, dan kebutuhan kalori."
    );
    appendMessage(
      "bot",
      `
      Contoh pertanyaan:<br>
      - Apa itu stunting?<br>
      - Bagaimana cara mencegah stunting?<br>
      - Kebutuhan kalori harian
    `
    );

    // Event listener
    sendBtn.addEventListener("click", sendMessage);
    userInput.addEventListener("keypress", function (e) {
      if (e.key === "Enter") sendMessage();
    });

    // Mengirim pesan ke backend
    async function sendMessage() {
      const message = userInput.value.trim();
      if (message === "") return;

      appendMessage("user", message);
      userInput.value = "";

      appendMessage("bot", "Bot sedang mencari jawaban ...");

      try {
        const response = await fetch("http://127.0.0.1:5000/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt: message }),
        });

        const data = await response.json();

        chatBox.lastChild.remove(); // hapus loading

        appendMessage("bot", data.answer);
      } catch (err) {
        chatBox.lastChild.remove();
        appendMessage("bot", "Terjadi kesalahan. Silakan coba lagi.");
        console.error(err);
      }
    }
  }
}
