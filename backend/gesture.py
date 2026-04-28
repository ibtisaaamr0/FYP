import cv2
import mediapipe as mp
import numpy as np
import threading
from collections import deque

class GestureRecognizer:
    def __init__(self):
        # Initialize variables to None/defaults first to avoid __del__ errors
        self.cap = None
        self.hands = None
        self.current_gesture = "Initializing..."
        self.buffer = deque(maxlen=5)
        self.lock = threading.Lock()

        try:
            # 1. Setup MediaPipe
            self.mp_hands = mp.solutions.hands
            self.mp_draw = mp.solutions.drawing_utils
            self.hands = self.mp_hands.Hands(
                static_image_mode=False,
                max_num_hands=1,
                min_detection_confidence=0.7,
                min_tracking_confidence=0.5
            )
            
            # 2. Setup Camera for local debugging
            # If your PC has NO camera, this will fail gracefully
            self.cap = cv2.VideoCapture(0)
            if not self.cap.isOpened():
                print("⚠️ Warning: No webcam detected. Mobile API will still work.")
            
            self.current_gesture = "Searching..."
            
        except AttributeError:
            print("❌ Error: MediaPipe 'solutions' not found. Ensure no file is named 'mediapipe.py'.")
        except Exception as e:
            print(f"❌ Initialization Error: {e}")

    def __del__(self):
        """Safe cleanup to prevent crashes if init failed"""
        if hasattr(self, 'cap') and self.cap is not None:
            if self.cap.isOpened():
                self.cap.release()

    def recognize_from_frame(self, frame):
        """
        Main processing logic used by mobile API (app.py)
        """
        if self.hands is None:
            return frame, "AI Model Error"

        # 1. Image Pre-processing
        frame = cv2.flip(frame, 1)
        img_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        results = self.hands.process(img_rgb)
        
        gesture = "Searching..."

        if results.multi_hand_landmarks:
            for hand_landmarks in results.multi_hand_landmarks:
                # Draw skeleton on the frame
                self.mp_draw.draw_landmarks(frame, hand_landmarks, self.mp_hands.HAND_CONNECTIONS)
                
                lm = hand_landmarks.landmark
                
                # --- PSL LOGIC (Finger Counting Base) ---
                fingers = []
                # Thumb: Horizontal check
                fingers.append(1 if lm[4].x < lm[3].x else 0)
                # Fingers: Tip Y vs Pip Y (In MediaPipe, lower Y is higher on screen)
                for tip, pip in [(8, 6), (12, 10), (16, 14), (20, 18)]:
                    fingers.append(1 if lm[tip].y < lm[pip].y else 0)

                total_fingers = sum(fingers)
                
                # Mapping simple gestures (Week 1-2 targets)
                if total_fingers == 5:
                    gesture = "Salaam / Hello"
                elif total_fingers == 0:
                    gesture = "Fist / Wait"
                elif fingers == [0, 1, 1, 0, 0]:
                    gesture = "Victory / Peace"
                elif fingers == [0, 1, 0, 0, 0]:
                    gesture = "Pointing / One"
                else:
                    gesture = "Analyzing PSL..."

        # Update buffer for stability (prevents flickering)
        with self.lock:
            self.buffer.append(gesture)
            self.current_gesture = max(set(self.buffer), key=self.buffer.count)

        return frame, self.current_gesture

    def get_frame(self):
        """
        Captures from PC webcam (if available) for the local dashboard
        """
        if self.cap is None or not self.cap.isOpened():
            return None, "No Camera"

        success, frame = self.cap.read()
        if not success:
            return None, "Hardware Error"

        processed_frame, gesture = self.recognize_from_frame(frame)

        # Overlay result for the local window
        cv2.rectangle(processed_frame, (0, 0), (processed_frame.shape[1], 70), (20, 20, 20), -1)
        cv2.putText(processed_frame, f"PSL: {gesture}", (30, 45), 
                    cv2.FONT_HERSHEY_DUPLEX, 1, (255, 255, 255), 2)

        ret, jpeg = cv2.imencode('.jpg', processed_frame)
        return jpeg.tobytes(), gesture