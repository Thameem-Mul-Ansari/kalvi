import os
import asyncio
from flask import Flask, request, jsonify # type: ignore
from flask_cors import CORS # type: ignore
from groq import Groq # type: ignore
from dotenv import load_dotenv # type: ignore
from edge_tts import Communicate # type: ignore

# Load environment variables
load_dotenv()
api_key = os.getenv("GROQ_API_KEY")

if not api_key:
    raise ValueError("GROQ_API_KEY is missing. Add it to the .env file.")

app = Flask(__name__)
CORS(app)

client = Groq(api_key=api_key)

async def generate_speech(text, audio_path):
    """Generate Tamil speech with a male voice using Edge TTS."""
    communicate = Communicate(text, voice="ta-IN-ValluvarNeural")  # Tamil male voice
    await communicate.save(audio_path)

@app.route("/chat", methods=["POST"])
def chat():
    data = request.json
    user_message = data.get("message", "")

    if not user_message:
        return jsonify({"error": "Message cannot be empty"}), 400

    messages = [
        {"role": "system", "content": "உங்கள் பதில்களை அழகாக கட்டமைக்கப்பட்ட HTML வடிவில் தமிழில் மட்டும் வழங்கவும்."},
        {"role": "user", "content": user_message}
    ]

    completion = client.chat.completions.create(
        model="gemma2-9b-it",
        messages=messages,
        temperature=0.7,
        max_completion_tokens=1024,
        top_p=1,
        stream=False,
        stop=None,
    )

    bot_reply = completion.choices[0].message.content

    # Ensure static directory exists
    static_folder = os.path.join(os.getcwd(), "static")
    os.makedirs(static_folder, exist_ok=True)

    # Generate Tamil speech
    audio_path = os.path.join(static_folder, "response.mp3")
    if os.path.exists(audio_path):
        os.remove(audio_path)  # Remove previous file

    asyncio.run(generate_speech(bot_reply, audio_path))

    return jsonify({"response": bot_reply, "audio_url": "/static/response.mp3"})

@app.route("/transcribe", methods=["POST"])
def transcribe():
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    filename = os.path.join(os.getcwd(), "audio.m4a")
    file.save(filename)

    with open(filename, "rb") as audio_file:
        transcription = client.audio.transcriptions.create(
            file=(filename, audio_file.read()),
            model="whisper-large-v3-turbo",
            response_format="verbose_json",
        )
        text = transcription.text

    return jsonify({"transcription": text})

if __name__ == "__main__":
    app.run(debug=True)