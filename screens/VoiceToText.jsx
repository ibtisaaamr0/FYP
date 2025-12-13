
import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Pressable,
  Platform,
  PermissionsAndroid,
  ScrollView,
  Alert,
} from "react-native";
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import RNFS from 'react-native-fs';
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Bg from "../bg.jpeg";
import Bg1 from "../bg1.jpeg";

const audioRecorderPlayer = new AudioRecorderPlayer();

export default function VoiceToText({ navigation }) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [result, setResult] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [language, setLanguage] = useState("en-US");
  const [loading, setLoading] = useState(false);

  const BG = isDarkMode ? Bg1 : Bg;
  const textColor = isDarkMode ? "#ffffff" : "#2c3e50";
  const subTextColor = isDarkMode ? "#cccccc" : "#7f8c8d";
  const accentColor = isDarkMode ? "#c8e265" : "#2c3e50";

  useEffect(() => {
    if (Platform.OS === "android") {
      requestPermissions();
    }
  }, []);

  const requestPermissions = async () => {
    try {
      const grants = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      ]);
      if (
        grants["android.permission.WRITE_EXTERNAL_STORAGE"] ===
          PermissionsAndroid.RESULTS.GRANTED &&
        grants["android.permission.READ_EXTERNAL_STORAGE"] ===
          PermissionsAndroid.RESULTS.GRANTED &&
        grants["android.permission.RECORD_AUDIO"] ===
          PermissionsAndroid.RESULTS.GRANTED
      ) {
        console.log("Permissions granted");
      } else {
        console.log("All required permissions not granted");
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const onStartRecord = async () => {
    setIsRecording(true);
    setResult("");
    const path = Platform.select({
      ios: 'hello.m4a',
      android: `${RNFS.CachesDirectoryPath}/hello.mp4`,
    });
    
    try {
        await audioRecorderPlayer.startRecorder(path);
        audioRecorderPlayer.addRecordBackListener((e) => {
            console.log('Recording . . . ', e.currentPosition);
            return;
        });
    } catch (err) {
        console.log("Start recording error", err);
        setIsRecording(false);
        Alert.alert("Error", "Could not start recording.");
    }
  };

  const onStopRecord = async () => {
    if (!isRecording) return;
    setIsRecording(false);
    setLoading(true);
    
    try {
        const resultPath = await audioRecorderPlayer.stopRecorder();
        audioRecorderPlayer.removeRecordBackListener();
        console.log("Recording stopped at", resultPath);
        
        // Upload to server
        uploadAudio(resultPath);
    } catch (err) {
        console.log("Stop recording error", err);
        setLoading(false);
    }
  };

  const uploadAudio = async (path) => {
    const formData = new FormData();
    formData.append('audio', {
        uri: 'file://' + path,
        type: 'audio/mp4',
        name: 'voice_record.mp4',
    });
    formData.append('language', language);

    // 10.0.2.2 is localhost for Android Emulator
    const API_URL = 'http://10.0.2.2:5000/recognize'; 

    try {
      console.log(`Uploading to ${API_URL}...`);
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });

      const json = await response.json();
      console.log("Server response:", json);

      if (response.ok) {
        setResult(json.text);
      } else {
        setResult("Error: " + (json.error || "Unknown error"));
        Alert.alert("Recognition Error", json.error || "Server error");
      }
    } catch (error) {
      console.error(error);
      setResult("Network Error. Ensure server is running.");
      Alert.alert("Network Error", "Is the Python server running? \n" + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground source={BG} style={styles.background} resizeMode="cover">
      <View style={styles.overlay}>
        <View style={styles.header}>
          <Pressable onPress={() => navigation.goBack()} style={styles.backBtn}>
            <FontAwesome5 name="arrow-left" size={24} color={textColor} />
          </Pressable>
          <Text style={[styles.headerTitle, { color: textColor }]}>
            Voice to Text (API)
          </Text>
          <Pressable onPress={() => setIsDarkMode(!isDarkMode)}>
             <FontAwesome5 name={isDarkMode ? "sun" : "moon"} size={22} color={textColor} />
          </Pressable>
        </View>

        <View style={styles.langContainer}>
          <Pressable
            style={[
              styles.langBtn,
              language === "en-US" && styles.langBtnActive,
              { borderColor: accentColor },
            ]}
            onPress={() => setLanguage("en-US")}
          >
            <Text
              style={[
                styles.langText,
                language === "en-US" && styles.langTextActive,
                { color: language === "en-US" ? "#fff" : textColor },
              ]}
            >
              English
            </Text>
          </Pressable>
          <Pressable
            style={[
              styles.langBtn,
              language === "ur-PK" && styles.langBtnActive,
              { borderColor: accentColor },
            ]}
            onPress={() => setLanguage("ur-PK")}
          >
            <Text
               style={[
                styles.langText,
                language === "ur-PK" && styles.langTextActive,
                 { color: language === "ur-PK" ? "#fff" : textColor },
              ]}
            >
              Urdu
            </Text>
          </Pressable>
        </View>

        <ScrollView contentContainerStyle={styles.textContainer} showsVerticalScrollIndicator={false}>
          {loading ? (
             <Text style={[styles.placeholderText, { color: subTextColor }]}>
                 Processing... ⏳
             </Text>
          ) : result ? (
            <Text style={[styles.lyricsText, { color: textColor }]}>
              {result}
            </Text>
          ) : (
            <Text style={[styles.placeholderText, { color: subTextColor }]}>
             {isRecording ? "Recording... Release to send 📤" : "Hold button to record 🎙️"}
            </Text>
          )}
        </ScrollView>

        <View style={styles.controls}>
          <Pressable
            onPressIn={onStartRecord}
            onPressOut={onStopRecord}
            style={({ pressed }) => [
              styles.recordBtn,
              {
                backgroundColor: isRecording ? "#ff4757" : accentColor,
                transform: [{ scale: pressed ? 0.95 : 1 }],
              },
            ]}
          >
            <FontAwesome5
              name={isRecording ? "stop" : "microphone"}
              size={32}
              color="#fff"
            />
          </Pressable>
          <Text style={[styles.controlText, { color: subTextColor }]}>
            {isRecording ? "Release to Analyze" : "Hold to Record"}
          </Text>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.7)", 
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  backBtn: {
    padding: 5,
  },
  langContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 40,
    gap: 15,
  },
  langBtn: {
    paddingVertical: 8,
    paddingHorizontal: 25,
    borderRadius: 25,
    borderWidth: 1,
    backgroundColor: "transparent",
  },
  langBtnActive: {
    backgroundColor: "#2c3e50", 
  },
  langText: {
    fontSize: 14,
    fontWeight: "600",
  },
  langTextActive: {
    fontWeight: "bold",
  },
  textContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 50,
  },
  lyricsText: {
    fontSize: 32,
    fontWeight: "800",
    textAlign: "center",
    lineHeight: 40,
  },
  placeholderText: {
    fontSize: 24,
    fontWeight: "500",
    textAlign: "center",
    opacity: 0.7,
  },
  controls: {
    alignItems: "center",
    marginBottom: 20,
  },
  recordBtn: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
        shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
    marginBottom: 10,
  },
  controlText: {
    fontSize: 14,
    fontWeight: "500",
  },
});
