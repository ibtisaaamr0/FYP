import sounddevice as sd
import numpy as np
import speech_recognition as sr
import scipy.io.wavfile as wav
import os

class VoiceRecognizer:
    def __init__(self):
        self.recognizer = sr.Recognizer()
        self.samplerate = 16000
        self.channels = 1
        self.temp_filename = "temp_audio.wav"

    def record_audio(self, duration=5):
        print("🎙️ Recording... Speak now!")
        audio = sd.rec(int(duration * self.samplerate), samplerate=self.samplerate, channels=self.channels, dtype='int16')
        sd.wait()  # Wait until recording is finished
        return np.squeeze(audio)

    def recognize(self, language="en-US", duration=5):
        audio_data = self.record_audio(duration)
        
        # Save to temp wav file for compatibility with SpeechRecognition
        wav.write(self.temp_filename, self.samplerate, audio_data)
        
        text_result = "Could not understand audio"
        try:
            with sr.AudioFile(self.temp_filename) as source:
                audio_obj = self.recognizer.record(source)
                print("🕓 Recognizing...")
                text_result = self.recognizer.recognize_google(audio_obj, language=language)
                print(f"✅ Recognized Text ({language}): {text_result}")
        except sr.UnknownValueError:
            print("❌ Could not understand audio.")
            text_result = "Error: Could not understand audio"
        except sr.RequestError:
            print("⚠️ Speech Recognition service unavailable.")
            text_result = "Error: Service unavailable"
        except Exception as e:
            print(f"⚠️ Error: {e}")
            text_result = f"Error: {e}"
        
        # Cleanup
        if os.path.exists(self.temp_filename):
            os.remove(self.temp_filename)

        return text_result
