// ==========================================================
// PromptForge AI
// UI Controller
// ==========================================================

"use strict";

// ==========================================================
// DOM ELEMENTS
// ==========================================================

const body = document.body;

const chatArea = document.getElementById("chatArea");

const userInput = document.getElementById("userInput");

const themeBtn = document.getElementById("themeBtn");

const voiceBtn = document.getElementById("voiceBtn");

const downloadBtn = document.getElementById("downloadBtn");

const clearBtn = document.getElementById("clearBtn");

const copyBtn = document.getElementById("copyBtn");

const toast = document.getElementById("toast");

const messageCounter = document.getElementById("messageCount");

const statusText = document.getElementById("statusText");


// ==========================================================
// APPLICATION STATE
// ==========================================================

let currentTheme = localStorage.getItem("theme") || "dark";


// ==========================================================
// INITIALIZE APPLICATION
// ==========================================================

document.addEventListener("DOMContentLoaded", () => {

    initializeTheme();

    loadChat();

    initializeAutoResize();

    observeChatChanges();

    updateMessageCounter();

});


// ==========================================================
// THEME
// ==========================================================

function initializeTheme() {

    applyTheme(currentTheme);

    if (themeBtn) {

        themeBtn.addEventListener("click", toggleTheme);

    }

}

function toggleTheme() {

    currentTheme = currentTheme === "dark"
        ? "light"
        : "dark";

    applyTheme(currentTheme);

    localStorage.setItem("theme", currentTheme);

    showToast(

        currentTheme === "dark"

            ? "🌙 Dark Mode Enabled"

            : "☀ Light Mode Enabled"

    );

}

function applyTheme(theme) {

    if (theme === "light") {

        body.classList.add("light");

        if (themeBtn) {

            themeBtn.innerHTML =
                '<i class="fa-solid fa-sun"></i>';

        }

    }

    else {

        body.classList.remove("light");

        if (themeBtn) {

            themeBtn.innerHTML =
                '<i class="fa-solid fa-moon"></i>';

        }

    }

}


// ==========================================================
// CHAT STORAGE
// ==========================================================

function saveChat() {

    if (!chatArea) return;

    localStorage.setItem(

        "promptforge_chat",

        chatArea.innerHTML

    );

}

function loadChat() {

    const history = localStorage.getItem("promptforge_chat");

    if (history && chatArea) {

        chatArea.innerHTML = history;

    }

}

function observeChatChanges() {

    if (!chatArea) return;

    const observer = new MutationObserver(() => {

        saveChat();

        updateMessageCounter();

    });

    observer.observe(chatArea, {

        childList: true,

        subtree: true

    });

}


// ==========================================================
// MESSAGE COUNTER
// ==========================================================

function updateMessageCounter() {

    if (!messageCounter) return;

    const messages = document.querySelectorAll(".message");

    messageCounter.textContent = messages.length;

}


// ==========================================================
// STATUS
// ==========================================================

function updateStatus(text) {

    if (!statusText) return;

    statusText.textContent = text;

}


// ==========================================================
// TOAST NOTIFICATION
// ==========================================================

function showToast(message) {

    if (!toast) return;

    toast.textContent = message;

    toast.classList.add("show");

    setTimeout(() => {

        toast.classList.remove("show");

    }, 2500);

}
// ==========================================================
// VOICE INPUT
// ==========================================================

let recognition = null;

if ("webkitSpeechRecognition" in window) {

    recognition = new webkitSpeechRecognition();

    recognition.lang = "en-US";

    recognition.continuous = false;

    recognition.interimResults = false;

    if (voiceBtn) {

        voiceBtn.addEventListener("click", startVoiceInput);

    }

}

function startVoiceInput() {

    if (!recognition) {

        showToast("❌ Voice Recognition is not supported.");

        return;

    }

    updateStatus("🎤 Listening...");

    voiceBtn.classList.add("active");

    recognition.start();

}

if (recognition) {

    recognition.onresult = function (event) {

        const transcript = event.results[0][0].transcript;

        userInput.value = transcript;

        updateStatus("🟢 Ready");

        voiceBtn.classList.remove("active");

        showToast("🎤 Voice captured successfully.");

    };

    recognition.onerror = function () {

        updateStatus("⚠ Voice Error");

        voiceBtn.classList.remove("active");

        showToast("Voice recognition failed.");

    };

    recognition.onend = function () {

        voiceBtn.classList.remove("active");

        updateStatus("🟢 Ready");

    };

}


// ==========================================================
// COPY LAST AI RESPONSE
// ==========================================================

if (copyBtn) {

    copyBtn.addEventListener("click", copyLastResponse);

}

function copyLastResponse() {

    const aiMessages = document.querySelectorAll(".message.ai .bubble");

    if (!aiMessages.length) {

        showToast("No AI response available.");

        return;

    }

    const latest = aiMessages[aiMessages.length - 1].innerText;

    navigator.clipboard.writeText(latest)
        .then(() => {

            showToast("📋 Response copied.");

        })
        .catch(() => {

            showToast("Copy failed.");

        });

}


// ==========================================================
// EXPORT CHAT
// ==========================================================

if (downloadBtn) {

    downloadBtn.addEventListener("click", exportChat);

}

function exportChat() {

    const messages = document.querySelectorAll(".bubble");

    if (!messages.length) {

        showToast("Nothing to export.");

        return;

    }

    let text = "";

    messages.forEach((msg) => {

        text += msg.innerText + "\n\n";

    });

    const now = new Date();

    const filename =
        `PromptForge_${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,"0")}-${String(now.getDate()).padStart(2,"0")}.txt`;

    const blob = new Blob([text], {

        type: "text/plain"

    });

    const link = document.createElement("a");

    link.href = URL.createObjectURL(blob);

    link.download = filename;

    link.click();

    URL.revokeObjectURL(link.href);

    showToast("📥 Chat exported.");

}


// ==========================================================
// CLEAR CHAT
// ==========================================================

if (clearBtn) {

    clearBtn.addEventListener("click", clearChat);

}

function clearChat() {

    const answer = confirm("Clear the complete chat history?");

    if (!answer) return;

    localStorage.removeItem("promptforge_chat");

    chatArea.innerHTML = `

    <div class="message ai">

        <div class="avatar ai-avatar">

            <i class="fa-solid fa-robot"></i>

        </div>

        <div class="bubble">

            👋 Welcome back to <strong>PromptForge AI</strong>.

        </div>

    </div>

    `;

    updateMessageCounter();

    showToast("🗑 Chat cleared.");

}


// ==========================================================
// AUTO RESIZE TEXTAREA
// ==========================================================

function initializeAutoResize() {

    if (!userInput) return;

    userInput.addEventListener("input", function () {

        this.style.height = "auto";

        this.style.height = this.scrollHeight + "px";

    });

}


// ==========================================================
// GLOBAL UTILITIES
// ==========================================================

window.downloadChat = exportChat;

window.clearChat = clearChat;