print("APP STARTED")
from services.gemini_service import generate_response

from prompts import (
    QUESTION_PROMPT,
    SUMMARY_PROMPT,
    PROMPT_IMPROVER,
    STORY_PROMPT
)
from flask import Flask, render_template, request, jsonify

app = Flask(__name__)


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/generate", methods=["POST"])
def generate():

    
    data = request.get_json()

    feature = data.get("feature")
    user_input = data.get("input")

    if feature == "qa":
        prompt = QUESTION_PROMPT.format(user_input)

    elif feature == "summary":
        prompt = SUMMARY_PROMPT.format(user_input)

    elif feature == "prompt":
        prompt = PROMPT_IMPROVER.format(user_input)

    elif feature == "story":
        prompt = STORY_PROMPT.format(user_input)

    else:
        return jsonify({"response": "Invalid Feature"})

    ai_response = generate_response(prompt)

    return jsonify({"response": ai_response})


if __name__ == "__main__":
    app.run(debug=True)