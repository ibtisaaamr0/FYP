import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const BACKEND_URL = 'http://10.0.2.2:5000'; // Emulator IP. Use your PC IP if on real device.

export default function Sign() {
  const [gesture, setGesture] = useState("Connecting...");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      fetch(`${BACKEND_URL}/gesture`)
        .then(res => res.json())
        .then(data => {
          setGesture(data.gesture);
          setLoading(false);
        })
        .catch(err => {
            // console.log(err);
            setGesture("Backend Disconnected"); 
        });
    }, 500); // Poll every 500ms

    return () => clearInterval(interval);
  }, []);

  return (
    <LinearGradient colors={['#ffffff', '#f0f0f0']} style={styles.container}>
      <Text style={styles.title}>Sign Language Recognition</Text>
      
      <View style={styles.cameraContainer}>
        <Image 
            source={{ uri: `${BACKEND_URL}/video_feed?t=${Date.now()}` }} 
            style={styles.camera} 
            resizeMode="contain"
            onError={() => setGesture("Camera Feed Error")}
        />
        {loading && (
            <View style={styles.loadingOverlay}>
                <ActivityIndicator size="large" color="#FF6B35" />
                <Text>Connecting to Server...</Text>
            </View>
        )}
      </View>

      <View style={styles.resultContainer}>
        <Text style={styles.label}>Detected Gesture:</Text>
        <Text style={styles.gestureText}>{gesture}</Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    marginTop: 10,
  },
  cameraContainer: {
    width: '100%',
    height: 300,
    backgroundColor: '#000',
    borderRadius: 20,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  camera: {
    width: '100%',
    height: '100%',
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  resultContainer: {
    marginTop: 30,
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 15,
    width: '100%',
    elevation: 3,
  },
  label: {
    fontSize: 16,
    color: '#666',
  },
  gestureText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FF6B35',
    marginTop: 10,
  },
});
