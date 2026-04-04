import cv2
import numpy as np
import math
from collections import deque
import threading

class GestureRecognizer:
    def __init__(self):
        self.cap = cv2.VideoCapture(0)
        self.buffer = deque(maxlen=5)
        self.current_gesture = "No hand"
        self.lock = threading.Lock()
        self.running = True

    def __del__(self):
        self.cap.release()

    def get_frame(self):
        success, frame = self.cap.read()
        if not success:
            return None, "Error"

        frame = cv2.flip(frame, 1)
        
        # --- UI Styling ---
        # Draw a semi-transparent overlay for the ROI
        overlay = frame.copy()
        cv2.rectangle(overlay, (95, 95), (405, 405), (0, 0, 0), -1)
        cv2.addWeighted(overlay, 0.3, frame, 0.7, 0, frame)
        
        # Draw the ROI border with a nice color (Cyan)
        cv2.rectangle(frame, (100, 100), (400, 400), (255, 255, 0), 2)

        roi = frame[100:400, 100:400]
        
        # Skin detection
        ycrcb = cv2.cvtColor(roi, cv2.COLOR_BGR2YCrCb)
        lower = np.array([0, 133, 77], np.uint8)
        upper = np.array([255, 173, 127], np.uint8)
        mask = cv2.inRange(ycrcb, lower, upper)
        
        mask = cv2.GaussianBlur(mask, (5, 5), 0)
        mask = cv2.erode(mask, None, iterations=2)
        mask = cv2.dilate(mask, None, iterations=2)

        contours, _ = cv2.findContours(mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
        gesture = "No hand"
        
        if contours:
            cnt = max(contours, key=cv2.contourArea)
            area = cv2.contourArea(cnt)
            
            if area > 2000:
                hull = cv2.convexHull(cnt)
                
                # Draw improved contours
                cv2.drawContours(roi, [cnt], -1, (0, 255, 0), 2) # Green for hand
                cv2.drawContours(roi, [hull], -1, (0, 200, 255), 2) # Orange for hull

                hull_indices = cv2.convexHull(cnt, returnPoints=False)
                defect_count = 0

                if len(hull_indices) > 3:
                    defects = cv2.convexityDefects(cnt, hull_indices)
                    if defects is not None:
                        for i in range(defects.shape[0]):
                            s, e, f, d = defects[i, 0]
                            start = tuple(cnt[s][0])
                            end = tuple(cnt[e][0])
                            far = tuple(cnt[f][0])
                            
                            a = math.dist(start, end)
                            b = math.dist(start, far)
                            c = math.dist(end, far)
                            
                            angle = math.acos((b ** 2 + c ** 2 - a ** 2) / (2 * b * c + 1e-5))
                            
                            if angle <= math.pi / 2:
                                defect_count += 1
                                # Draw nice defect points
                                cv2.circle(roi, far, 8, (0, 0, 255), -1) 
                                cv2.circle(roi, far, 3, (255, 255, 255), -1)

                x, y, w, h = cv2.boundingRect(cnt)
                aspect = h / w if w != 0 else 0

                # Gesture Logic
                if defect_count >= 4:
                    gesture = "✋ Open Palm"
                elif defect_count == 0 and area > 8000:
                    if aspect > 1.5 and w < 120:
                        gesture = "👍 Thumb Up"
                    else:
                        gesture = "✊ Fist"
        
        # Thread-safe buffer update
        with self.lock:
            self.buffer.append(gesture)
            if self.buffer:
                self.current_gesture = max(set(self.buffer), key=self.buffer.count)

        # --- Dashboard UI Overlay ---
        # Add a sleek top bar
        cv2.rectangle(frame, (0, 0), (frame.shape[1], 80), (30, 30, 30), -1)
        
        # Display Gesture Text with shadow for readability
        text = f"Gesture: {self.current_gesture}"
        cv2.putText(frame, text, (52, 52), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 0, 0), 4) # Shadow
        cv2.putText(frame, text, (50, 50), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0) if self.current_gesture != "No hand" else (100, 100, 100), 4)

        # Encode frame
        ret, jpeg = cv2.imencode('.jpg', frame)
        return jpeg.tobytes(), self.current_gesture
