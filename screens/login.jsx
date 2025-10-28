import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  Pressable,
  Alert,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import * as Animatable from "react-native-animatable";
import Logo from "../logo.png";
import { loginUser } from "../component/auth";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      await loginUser(email, password);
      Alert.alert("Success", "Logged in successfully!");
      navigation.navigate("Tabs");
    } catch (error) {
      Alert.alert("Login Error", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={["#012d58", "#3b658f"]} style={styles.top}>
        <Animatable.Image
          source={Logo}
          style={styles.logo}
          animation="fadeInDown"
          delay={800}
          duration={600}
        />
        <Animatable.Text
          style={styles.text}
          animation="fadeInDown"
          delay={800}
          duration={600}
        >
          Silent Voice
        </Animatable.Text>
      </LinearGradient>

      <View style={styles.bottomBox}>
        <Text style={styles.heading}>Log In</Text>

        <Text style={styles.label}>EMAIL</Text>
        <TextInput
          placeholder="Enter email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Text style={styles.label}>PASSWORD</Text>
        <TextInput
          placeholder="Enter password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          style={styles.input}
        />

        <Pressable style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Log In</Text>
        </Pressable>

        <Text style={{ marginTop: 10, textAlign: "center" }}>
          If you don’t have an account then
        </Text>

        <Pressable
          style={[styles.button, { backgroundColor: "#012d58" }]}
          onPress={() => navigation.navigate("Signup")}
        >
          <Text style={styles.buttonText}>Sign up</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#bbb" },

  top: {
    paddingVertical: 40,
    display:"flex",
    flexDirection:"row",
    alignItems: "center",
    justifyContent: "center",
  },

  logo: { width: 70, height: 80, marginBottom: 5 },

  text: { fontSize: 22, fontWeight: "bold", color: "white" },

  bottomBox: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    padding: 25,
    marginTop: -30,
    elevation: 5,
  },

  heading: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 15,
    color: "#012d58",
  },

  label: { marginTop: 10, fontWeight: "bold", color: "#333" },

  input: {
    backgroundColor: "#eee",
    borderRadius: 10,
    padding: 10,
    marginTop: 5,
  },

  button: {
    backgroundColor: "#3b658f",
    borderRadius: 20,
    padding: 12,
    marginTop: 20,
    alignItems: "center",
  },

  buttonText: { color: "white", fontWeight: "bold" },
});
