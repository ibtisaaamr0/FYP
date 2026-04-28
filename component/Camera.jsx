import React, { useRef, useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, ActivityIndicator } from 'react-native';
import { Camera, useCameraDevice } from 'react-native-vision-camera';
import RNFS from 'react-native-fs';
import Tts from 'react-native-tts';
import { useDispatch, useSelector } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const { width, height } = Dimensions.get('window');

export default function CameraScreen({ navigation }) {
  const camera = useRef(null);
  const device = useCameraDevice('front');
  const dispatch = useDispatch();
  
  // Local state for real-time UI feel
  const [prediction, setPrediction] = useState("Align your hand...");
  const [isProcessing, setIsProcessing] = useState(false);
  const [lastSpoken, setLastSpoken] = useState("");

  // Laptop IP - UPDATE THIS to your ipconfig IPv4
const BACKEND_URL = "http://10.0.2.2:5000/process_frame";
  useEffect(() => {
    // Initialize TTS settings
    Tts.setDefaultLanguage('en-US'); // Change to 'ur-PK' if your phone supports Urdu TTS
    Tts.setDefaultRate(0.5);

    // Setup the processing loop (Every 800ms to prevent network congestion)
    const interval = setInterval(captureAndSend, 800);
    return () => clearInterval(interval);
  }, [lastSpoken]);

  const captureAndSend = async () => {
    if (!camera.current || isProcessing) return;

    try {
      setIsProcessing(true);
      
      // 1. Take Snapshot (Fast & Low Res for AI)
      const photo = await camera.current.takeSnapshot({
        flash: 'off',
        quality: 40,
        skipMetadata: true,
      });

      // 2. Convert to Base64
      const base64Image = await RNFS.readFile(photo.path, 'base64');

      // 3. POST to Flask Backend
      const response = await fetch(BACKEND_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: base64Image }),
      });

      const data = await response.json();

      if (data.gesture) {
        setPrediction(data.gesture);
        
        // 4. Voice Logic: Only speak if the word has changed
        if (data.gesture !== lastSpoken && data.gesture !== "Searching...") {
          Tts.stop();
          Tts.speak(data.gesture);
          setLastSpoken(data.gesture);
        }
      }
    } catch (error) {
      console.log("Pipeline Error:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  if (!device) return <ActivityIndicator size="large" color="#6366F1" style={{flex:1}} />;

  return (
    <View style={styles.container}>
      {/* FULL SCREEN CAMERA */}
      <Camera
        ref={camera}
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
        photo={true}
      />

      {/* --- ELEGANT UI OVERLAYS --- */}
      
      {/* Top Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <MaterialIcons name="arrow-back-ios" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>PSL Translator</Text>
        <View style={{width: 40}} /> 
      </View>

      {/* The Scanning ROI (Region of Interest) */}
      <View style={styles.focusFrame}>
        <View style={styles.cornerTopLeft} />
        <View style={styles.cornerTopRight} />
        <View style={styles.cornerBottomLeft} />
        <View style={styles.cornerBottomRight} />
        {isProcessing && <View style={styles.scanLine} />}
      </View>

      {/* Result Card */}
      <View style={styles.bottomContainer}>
        <LinearGradient colors={['rgba(99, 102, 241, 0.9)', 'rgba(139, 92, 246, 0.9)']} style={styles.resultCard}>
          <Text style={styles.resultLabel}>Detected Sign:</Text>
          <Text style={styles.resultText}>{prediction}</Text>
        </LinearGradient>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  header: {
    position: 'absolute',
    top: 50,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    alignItems: 'center',
    zIndex: 10,
  },
  headerTitle: { color: '#fff', fontSize: 20, fontWeight: '800' },
  backBtn: { backgroundColor: 'rgba(0,0,0,0.3)', padding: 10, borderRadius: 15 },

  focusFrame: {
    position: 'absolute',
    top: height * 0.2,
    alignSelf: 'center',
    width: width * 0.75,
    height: width * 0.75,
    borderWidth: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // Corners for the ROI
  cornerTopLeft: { position: 'absolute', top: 0, left: 0, width: 40, height: 40, borderTopWidth: 4, borderLeftWidth: 4, borderColor: '#6366F1' },
  cornerTopRight: { position: 'absolute', top: 0, right: 0, width: 40, height: 40, borderTopWidth: 4, borderRightWidth: 4, borderColor: '#6366F1' },
  cornerBottomLeft: { position: 'absolute', bottom: 0, left: 0, width: 40, height: 40, borderBottomWidth: 4, borderLeftWidth: 4, borderColor: '#8B5CF6' },
  cornerBottomRight: { position: 'absolute', bottom: 0, right: 0, width: 40, height: 40, borderBottomWidth: 4, borderRightWidth: 4, borderColor: '#8B5CF6' },

  scanLine: {
    width: '100%',
    height: 2,
    backgroundColor: '#6366F1',
    position: 'absolute',
    top: '50%',
    shadowColor: "#6366F1",
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 5,
  },

  bottomContainer: {
    position: 'absolute',
    bottom: 60,
    width: '100%',
    alignItems: 'center',
  },
  resultCard: {
    width: '85%',
    padding: 20,
    borderRadius: 25,
    alignItems: 'center',
    elevation: 10,
  },
  resultLabel: { color: 'rgba(255,255,255,0.7)', fontSize: 12, fontWeight: '700', textTransform: 'uppercase' },
  resultText: { color: '#fff', fontSize: 24, fontWeight: '900', marginTop: 5 },
});