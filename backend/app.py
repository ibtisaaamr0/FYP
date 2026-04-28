from flask import Flask, Response, jsonify, request
from flask_cors import CORS
import base64
import cv2
import numpy as np
import time
from gesture import GestureRecognizer
from voice_recognition import VoiceRecognizer

app = Flask(__name__)
CORS(app)

# Initialize modules
gesture_recognizer = GestureRecognizer()
voice_recognizer = VoiceRecognizer()

@app.route('/process_frame', methods=['POST'])
def process_frame():
    """
    Receives Base64 from React Native, processes it via gesture.py,
    and returns the prediction to the phone.
    """
    data = request.json
    if not data or 'image' not in data:
        return jsonify({"error": "No image data"}), 400

    try:
        # 1. Decode Base64 image string
        img_data = base64.b64decode(data['image'])
        nparr = np.frombuffer(img_data, np.uint8)
        frame = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

        if frame is None:
            return jsonify({"error": "Invalid image frame"}), 400

        # 2. Run AI Inference
        # Unpacking the tuple from your updated gesture.py
        _, prediction = gesture_recognizer.recognize_from_frame(frame)

        # 3. Return the prediction to the phone
        return jsonify({
            "gesture": prediction,
            "timestamp": time.time()
        })
        
    except Exception as e:
        print(f"Server Error during gesture processing: {e}")
        return jsonify({"error": "Internal Server Error"}), 500

@app.route('/listen', methods=['GET'])
def listen_audio():
    """
    Triggers the microphone on the PC/Server and returns recognized text 
    PLUS the sequence of animation labels for the Avatar.
    """
    # Use 'ur-PK' for Urdu or 'en-US' for English
    language = request.args.get('language', 'en-US')
    
    # This now returns: {"text": "...", "labels": [...], "language": "..."}
    result = voice_recognizer.recognize(language=language)
    
    return jsonify(result)

@app.route('/health', methods=['GET'])
def health():
    """Quick check to see if the server is reachable from the emulator/phone"""
    return jsonify({
        "status": "ready", 
        "server_time": time.time(),
        "modules": ["gesture", "voice"]
    })

if __name__ == '__main__':
    # host='0.0.0.0' is critical for mobile connectivity
    app.run(host='0.0.0.0', port=5000, debug=True, threaded=True, use_reloader=False)