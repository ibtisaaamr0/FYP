import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, ActivityIndicator, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const BACKEND_URL = 'http://10.0.2.2:5000';

export default function Voice() {
  const [text, setText] = useState("Press the mic to start listening...");
  const [isListening, setIsListening] = useState(false);
  const [language, setLanguage] = useState("en-US");

  const startListening = async () => {
    setIsListening(true);
    setText("Listening...");
    
    try {
        const response = await fetch(`${BACKEND_URL}/listen?language=${language}&duration=5`);
        const data = await response.json();
        setText(data.text);
    } catch (error) {
        setText("Error: Could not connect to backend.");
    } finally {
        setIsListening(false);
    }
  };

  return (
    <LinearGradient colors={['#ffffff', '#e6e9f0']} style={styles.container}>
      <Text style={styles.title}>Voice to Text</Text>

      <View style={styles.langContainer}>
        <Pressable 
            style={[styles.langBtn, language === 'en-US' && styles.activeLang]} 
            onPress={() => setLanguage('en-US')}>
            <Text style={[styles.langText, language === 'en-US' && styles.activeLangText]}>English</Text>
        </Pressable>
        <Pressable 
            style={[styles.langBtn, language === 'ur-PK' && styles.activeLang]} 
            onPress={() => setLanguage('ur-PK')}>
            <Text style={[styles.langText, language === 'ur-PK' && styles.activeLangText]}>Urdu</Text>
        </Pressable>
      </View>

      <Pressable 
        style={({pressed}) => [styles.micButton, pressed && styles.micPressed, isListening && styles.micListening]}
        onPress={startListening}
        disabled={isListening}
      >
        {isListening ? (
            <ActivityIndicator size="large" color="#fff" />
        ) : (
            <MaterialIcons name="mic" size={50} color="#fff" />
        )}
      </Pressable>

      <View style={styles.resultBox}>
        <ScrollView>
            <Text style={styles.resultText}>{text}</Text>
        </ScrollView>
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
    marginBottom: 30,
    marginTop: 10,
  },
  langContainer: {
    flexDirection: 'row',
    marginBottom: 40,
    backgroundColor: '#fff',
    borderRadius: 25,
    padding: 5,
    elevation: 2,
  },
  langBtn: {
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 20,
  },
  activeLang: {
    backgroundColor: '#FF6B35',
  },
  langText: {
    color: '#666',
    fontWeight: '600',
  },
  activeLangText: {
    color: '#fff',
  },
  micButton: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#FF6B35',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10,
    shadowColor: '#FF6B35',
    shadowOpacity: 0.4,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    marginBottom: 40,
  },
  micPressed: {
    transform: [{scale: 0.95}],
    opacity: 0.9,
  },
  micListening: {
    backgroundColor: '#ff4757',
  },
  resultBox: {
    flex: 1,
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    elevation: 3,
  },
  resultText: {
    fontSize: 18,
    color: '#333',
    lineHeight: 28,
  },
});
