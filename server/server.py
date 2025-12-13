import os
from flask import Flask, request, jsonify
import speech_recognition as sr
from pydub import AudioSegment

app = Flask(__name__)

# Ensure upload directory exists
UPLOAD_FOLDER = 'uploads'
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

def recognize_audio_from_file(file_path, language="en-US"):
    recognizer = sr.Recognizer()
    
    # Convert to WAV if needed (Android usually records in mp4/aac or m4a)
    # SpeechRecognition prefers WAV
    wav_path = file_path
    if not file_path.endswith(".wav"):
        try:
            audio = AudioSegment.from_file(file_path)
            wav_path = file_path + ".wav"
            audio.export(wav_path, format="wav")
        except Exception as e:
            print(f"Error converting audio: {e}")
            return None

    try:
        with sr.AudioFile(wav_path) as source:
            audio_data = recognizer.record(source)
            print(f"Recognizing with language: {language}...")
            text = recognizer.recognize_google(audio_data, language=language)
            print(f"Result: {text}")
            return text
    except sr.UnknownValueError:
        print("Could not understand audio")
        return None
    except sr.RequestError as e:
        print(f"Google Speech API error: {e}")
        return None
    except Exception as e:
        print(f"Error processing audio: {e}")
        return None

@app.route('/recognize', methods=['POST'])
def recognize():
    if 'audio' not in request.files:
        return jsonify({"error": "No audio file provided"}), 400
    
    file = request.files['audio']
    language = request.form.get('language', 'en-US')
    
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    filename = os.path.join(UPLOAD_FOLDER, file.filename)
    file.save(filename)
    print(f"Received file: {filename}, Language: {language}")

    text = recognize_audio_from_file(filename, language)
    
    if text:
        return jsonify({"text": text})
    else:
        return jsonify({"error": "Could not recognize speech"}), 500

if __name__ == '__main__':
    # Host 0.0.0.0 allows access from emulator via 10.0.2.2
    app.run(host='0.0.0.0', port=5000, debug=True)
