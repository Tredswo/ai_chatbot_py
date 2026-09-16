# PromptForge AI

## Overview

PromptForge AI is an AI-powered Prompt Engineering Assistant developed using **Python, Flask, HTML, CSS, JavaScript, and Google's Gemini API**.

The application provides an interactive chatbot interface that allows users to ask questions, summarize text, improve prompts, analyze prompts, and generate creative stories using Generative AI.

---
## Setup

1. Create a `.env` file in the project root.
2. Add your Google AI Studio API key:

```env
GEMINI_API_KEY=YOUR_API_KEY
```

3. Install dependencies:

```bash
pip install -r requirements.txt
```

4. Run the application:

```bash
python app.py
```



## Features

- 🤖 AI Question Answering
- 📝 Text Summarization
- ✨ Prompt Improvement
- 📖 Story Generation
- 🔍 Prompt Analysis
- 🎨 Modern and Responsive User Interface
- ⚡ Fast responses using Google Gemini API

---

## Technologies Used

### Frontend
- HTML5
- CSS3
- JavaScript
- Font Awesome

### Backend
- Python
- Flask

### AI
- Google Gemini API (`google-genai`)

---

## Project Structure

```
PromptForge-AI/
│
├── app.py
├── config.py
├── prompts.py
├── requirements.txt
├── README.md
├── .env.example
│
├── services/
│   └── gemini_service.py
│
├── templates/
│   └── index.html
│
├── static/
│   ├── css/
│   │   ├── styles.css
│   │   └── animations.css
│   │
│   └── js/
│       ├── script.js
│       └── ui.js
```

---

## Installation

### 1. Clone or Download the Project

```bash
git clone <repository-url>
```

or download the ZIP file.

### 2. Install Dependencies

```bash
pip install -r requirements.txt
```

### 3. Create a `.env` file

```env
GEMINI_API_KEY=YOUR_API_KEY
```

### 4. Run the Application

```bash
python app.py
```

The application will be available at:

```
http://127.0.0.1:5000
```

---

## Usage

Choose one of the available features:

- Ask AI
- Summarize Text
- Improve Prompt
- Analyze Prompt
- Story Generator

Enter your prompt and click the Send button.

---

## Future Improvements

- Voice Input
- Chat History
- PDF Export
- Image Upload
- File Upload
- Multiple AI Model Support
- Authentication
- Conversation Memory

---

## Author

Developed by **Tanishka Gupta**

---

## License

This project was developed for educational and internship evaluation purposes.