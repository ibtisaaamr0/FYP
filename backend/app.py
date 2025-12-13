from flask import Flask, Response, jsonify, request
from flask_cors import CORS
import threading
import time
from gesture import GestureRecognizer
from voice_recognition import VoiceRecognizer

app = Flask(__name__)
CORS(app)

# Initialize modules
gesture_recognizer = GestureRecognizer()
voice_recognizer = VoiceRecognizer()

def generate_frames():
    """Generator function for video streaming"""
    while True:
        frame_bytes, _ = gesture_recognizer.get_frame()
        if frame_bytes:
            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + frame_bytes + b'\r\n')
        else:
            time.sleep(0.01)

@app.route('/health', methods=['GET'])
def health():
    return jsonify({"status": "ok", "message": "Backend is running"})

@app.route('/video_feed')
def video_feed():
    """Video streaming route. Put this in the src of an img tag."""
    return Response(generate_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route('/gesture', methods=['GET'])
def get_gesture():
    """Get the current gesture prediction."""
    return jsonify({
        "gesture": gesture_recognizer.current_gesture,
        "timestamp": time.time()
    })

@app.route('/listen', methods=['GET'])
def listen_audio():
    """
    Trigger voice recording and return text.
    Query Params:
    - language: 'en-US' (default) or 'ur-PK'
    - duration: int (default 5)
    """
    language = request.args.get('language', 'en-US')
    try:
        duration = int(request.args.get('duration', 5))
    except ValueError:
        duration = 5

    text = voice_recognizer.recognize(language=language, duration=duration)
    return jsonify({
        "text": text,
        "language": language
    })

if __name__ == '__main__':
    # Run on 0.0.0.0 to be accessible from local network (emulator/device)
    app.run(host='0.0.0.0', port=5000, debug=True, threaded=True, use_reloader=False)
