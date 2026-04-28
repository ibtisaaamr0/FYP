import speech_recognition as sr
import re

class VoiceRecognizer:
    def __init__(self):
        self.recognizer = sr.Recognizer()
        self.samplerate = 16000
        self.sign_map = {
            "hello": "salaam",
            "salaam": "salaam",
            "how are you": "hal_chal",
            "thank you": "shukriya",
            "water": "paani",
            "goodbye": "khuda_hafiz"
        }

    def recognize(self, language="en-US"):
        try:
            # Explicitly use the default microphone
            with sr.Microphone() as source:
                print(f"🎙️ Listening in {language}...")
                
                # Shorter adjustment time to prevent the "NoneType" error
                self.recognizer.adjust_for_ambient_noise(source, duration=0.5)
                
                # capture the audio
                audio_obj = self.recognizer.listen(source, timeout=5, phrase_time_limit=5)
                
                print("🕓 Recognizing...")
                text_result = self.recognizer.recognize_google(audio_obj, language=language)
                
                return {
                    "text": text_result,
                    "labels": self.map_text_to_labels(text_result.lower()),
                    "language": language
                }

        except Exception as e:
            print(f"❌ Voice Error: {e}")
            return {"text": str(e), "labels": [], "language": language}

    def map_text_to_labels(self, text):
        found_labels = []
        for phrase, label in self.sign_map.items():
            if phrase in text:
                found_labels.append(label)
        return found_labels