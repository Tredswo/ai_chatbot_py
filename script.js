// ===============================
// PromptForge AI
// script.js
// ===============================

const chatArea = document.getElementById("chatArea");
const generateBtn = document.getElementById("generateBtn");
const userInput = document.getElementById("userInput");
const feature = document.getElementById("feature");
const statusText = document.getElementById("statusText");

// ===============================
// User Message
// ===============================

function addUserMessage(text) {
    chatArea.innerHTML += `
        <div class="message user">
            <div class="avatar user-avatar">
                <i class="fa-solid fa-user"></i>
            </div>
            <div class="bubble">
                ${text}
            </div>
        </div>
    `;
    scrollBottom();
}

// ===============================
// AI Message
// ===============================

function addAIMessage(text) {
    chatArea.innerHTML += `
        <div class="message ai">
            <div class="avatar ai-avatar">
                <i class="fa-solid fa-robot"></i>
            </div>
            <div class="bubble">
                ${text}
            </div>
        </div>
    `;
    scrollBottom();
}

// ===============================
// Scroll
// ===============================

function scrollBottom() {
    chatArea.scrollTop = chatArea.scrollHeight;
}

// ===============================
// Thinking Animation
// ===============================

function showThinking() {

    const thinking = `
        <div class="message ai thinking-message" id="thinkingMessage">

            <div class="avatar ai-avatar">
                <i class="fa-solid fa-robot"></i>
            </div>

            <div class="bubble">
                <span>.</span>
                <span>.</span>
                <span>.</span>
            </div>

        </div>
    `;

    chatArea.innerHTML += thinking;
    scrollBottom();
}

function removeThinking() {

    const thinking = document.getElementById("thinkingMessage");

    if (thinking) {
        thinking.remove();
    }

}

// ===============================
// Typewriter Effect
// ===============================

function typeWriter(text) {

    const id = "typing" + Date.now();

    chatArea.innerHTML += `
        <div class="message ai">

            <div class="avatar ai-avatar">
                <i class="fa-solid fa-robot"></i>
            </div>

            <div class="bubble" id="${id}"></div>

        </div>
    `;

    scrollBottom();

    const bubble = document.getElementById(id);

    let i = 0;

    function typing() {

        if (i < text.length) {

            bubble.innerHTML += text.charAt(i);

            i++;

            scrollBottom();

            setTimeout(typing, 15);

        }

    }

    typing();

}

// ===============================
// Generate Response
// ===============================

async function generateResponse() {

    const prompt = userInput.value.trim();

    if (prompt === "") return;

    addUserMessage(prompt);

    userInput.value = "";

    generateBtn.disabled = true;

    statusText.innerHTML = "Thinking...";

    showThinking();

    try {

        console.log("Sending request...");
        console.log("Feature:", feature.value);
        console.log("Prompt:", prompt);

        const response = await fetch("/generate", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({

                input: prompt,
                feature: feature.value

            })

        });

        console.log("Status:", response.status);

        const data = await response.json();

        console.log(data);

        removeThinking();

        typeWriter(data.response);

        statusText.innerHTML = "Ready";

    }

    catch (error) {

        console.error(error);

        removeThinking();

        addAIMessage("⚠️ Something went wrong while contacting the server.");

        statusText.innerHTML = "Offline";

    }

    generateBtn.disabled = false;

}

// ===============================
// Events
// ===============================

generateBtn.addEventListener("click", generateResponse);

userInput.addEventListener("keydown", function (e) {

    if (e.key === "Enter" && !e.shiftKey) {

        e.preventDefault();

        generateResponse();

    }

});